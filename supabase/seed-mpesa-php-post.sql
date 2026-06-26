-- Blog Post: "How to Integrate M-Pesa STK Push with PHP"
-- Run this in your Supabase SQL Editor to add this blog post

INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  cover_image_url,
  tags,
  published,
  created_at,
  updated_at
) VALUES (
  'How to Integrate M-Pesa STK Push with PHP',
  'how-to-integrate-mpesa-with-php',
  'A step-by-step guide to integrating Safaricom M-Pesa STK Push into a PHP application using the Daraja API — covering token generation, STK initiation, callback handling, and a production checklist.',
  '# How to Integrate M-Pesa STK Push with PHP

M-Pesa is Kenya''s dominant mobile money platform, and if you''re building a payment system for a Kenyan audience, integrating it is non-negotiable. In this guide I''ll walk you through integrating M-Pesa STK Push using Safaricom''s Daraja API and plain PHP — no framework required.

I built this exact integration for [Shena Companion Welfare Association](https://shenacompanion.co.ke/), a production welfare management platform handling real member payments daily.

## What is STK Push?

STK Push sends a payment prompt directly to a customer''s phone. The customer enters their M-Pesa PIN and the payment is processed — no paybill number needed on their end.

The flow works like this:

1. Your server sends a request to Safaricom''s Daraja API
2. Safaricom pushes a payment prompt to the customer''s phone
3. Customer enters their PIN
4. Safaricom sends a callback to your server with the result

## Prerequisites

- A Safaricom Daraja account at [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
- A Daraja app with **Lipa na M-Pesa Online** enabled
- Your **Consumer Key**, **Consumer Secret**, **Business Shortcode**, and **Passkey**
- A publicly accessible callback URL (use ngrok for local development)

## Step 1: Get an Access Token

Every Daraja API request requires a Bearer token. Tokens expire after 1 hour so fetch a fresh one per session.

```php
function getMpesaToken(): string {
    $key    = getenv(''MPESA_CONSUMER_KEY'');
    $secret = getenv(''MPESA_CONSUMER_SECRET'');
    $creds  = base64_encode($key . '':'' . $secret);

    $ch = curl_init(''https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [''Authorization: Basic '' . $creds]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = json_decode(curl_exec($ch), true);
    curl_close($ch);

    return $response[''access_token''];
}
```

## Step 2: Generate the Password

The password is a base64-encoded combination of your shortcode, passkey, and a timestamp:

```php
function getMpesaPassword(string $shortcode, string $passkey): array {
    $timestamp = date(''YmdHis'');
    $password  = base64_encode($shortcode . $passkey . $timestamp);
    return [''password'' => $password, ''timestamp'' => $timestamp];
}
```

## Step 3: Initiate the STK Push

```php
function initiateSTKPush(string $phone, int $amount, string $reference): array {
    $shortcode   = getenv(''MPESA_SHORTCODE'');
    $passkey     = getenv(''MPESA_PASSKEY'');
    $callbackUrl = ''https://yourdomain.com/mpesa/callback.php'';

    $token = getMpesaToken();
    $auth  = getMpesaPassword($shortcode, $passkey);

    // Normalize: 0712345678 → 254712345678
    $phone = ''254'' . ltrim($phone, ''0'');

    $payload = [
        ''BusinessShortCode'' => $shortcode,
        ''Password''          => $auth[''password''],
        ''Timestamp''         => $auth[''timestamp''],
        ''TransactionType''   => ''CustomerPayBillOnline'',
        ''Amount''            => $amount,
        ''PartyA''            => $phone,
        ''PartyB''            => $shortcode,
        ''PhoneNumber''       => $phone,
        ''CallBackURL''       => $callbackUrl,
        ''AccountReference''  => $reference,
        ''TransactionDesc''   => ''Payment for '' . $reference,
    ];

    $ch = curl_init(''https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        ''Authorization: Bearer '' . $token,
        ''Content-Type: application/json'',
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = json_decode(curl_exec($ch), true);
    curl_close($ch);

    return $response;
}
```

A successful response returns a `CheckoutRequestID` — save this to your database to match against the incoming callback.

## Step 4: Handle the Callback

Safaricom POSTs the payment result to your callback URL:

```php
$data   = json_decode(file_get_contents(''php://input''), true);
$result = $data[''Body''][''stkCallback''];

$checkoutRequestId = $result[''CheckoutRequestID''];
$resultCode        = $result[''ResultCode''];

if ($resultCode === 0) {
    $items     = $result[''CallbackMetadata''][''Item''];
    $amount    = $items[0][''Value''];
    $receiptNo = $items[1][''Value''];
    $phone     = $items[4][''Value''];

    updatePayment($checkoutRequestId, ''completed'', $receiptNo, $amount);
} else {
    updatePayment($checkoutRequestId, ''failed'');
}

http_response_code(200);
echo json_encode([''ResultCode'' => 0, ''ResultDesc'' => ''Accepted'']);
```

Always respond with HTTP 200 — Safaricom will retry the callback repeatedly if you don''t.

## Common Errors

| Code | Meaning | Fix |
|---|---|---|
| `400.002.02` | Invalid access token | Token expired — re-fetch it |
| `400.002.05` | Invalid shortcode | Check shortcode in Daraja portal |
| `17` | Internal error | Usually a wrong passkey |
| `1032` | Request cancelled | Customer dismissed the STK prompt |
| `1` | Insufficient funds | Customer M-Pesa balance too low |

## Going to Production

Replace every `sandbox.safaricom.co.ke` with `api.safaricom.co.ke` and switch to your live credentials from the Daraja portal.

## Security Checklist

- Store all credentials in environment variables — never hardcode them
- Use HTTPS for your callback URL — Safaricom rejects plain HTTP in production
- Log every transaction with its `CheckoutRequestID` for reconciliation
- Validate callback payloads before updating your database

## Conclusion

M-Pesa STK Push follows a simple three-step pattern: get a token, send the push, handle the callback. I''ve used this exact approach in a production system processing hundreds of member payments monthly. Once you understand the flow it becomes straightforward to extend — adding retry logic, reconciliation cron jobs, or multi-paybill support.',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
  ARRAY['PHP', 'M-Pesa', 'Daraja API', 'Payments', 'Kenya'],
  true,
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '10 days'
);

-- Verify the post was created
SELECT id, title, slug, published, created_at FROM public.blog_posts WHERE slug = 'how-to-integrate-mpesa-with-php';
