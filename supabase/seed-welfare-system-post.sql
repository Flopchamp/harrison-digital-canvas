-- Blog Post: "How to Build a Welfare Management System with PHP and MySQL"
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
  'How to Build a Welfare Management System with PHP and MySQL',
  'build-welfare-management-system-mysql',
  'A practical guide to designing and building a welfare management system with PHP and MySQL — covering member registration, M-Pesa payment reconciliation, claims processing, and automated lapsed-member detection.',
  '# How to Build a Welfare Management System with PHP and MySQL

A welfare or mutual aid society manages member contributions, benefit claims, and payouts. Digitizing these operations — replacing paper registers and manual bank reconciliations — is one of the most impactful systems you can build for community organizations in East Africa.

I built a full production system for [Shena Companion Welfare Association](https://shenacompanion.co.ke/), a Kenyan funeral benefit society. This post covers the database design and core modules that power it.

## What the System Manages

- Member registration and coverage tracking
- M-Pesa payment collection and reconciliation
- Funeral claims submission and multi-stage approval
- Agent recruitment commissions and payout requests
- Bulk SMS and email notifications

## Database Design

The foundation is a well-normalized MySQL schema. Here are the core tables:

```sql
CREATE TABLE plans (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    monthly_amount  DECIMAL(10,2) NOT NULL,
    cover_amount    DECIMAL(10,2) NOT NULL,
    maturity_months INT NOT NULL DEFAULT 3
);

CREATE TABLE members (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    member_no    VARCHAR(20) UNIQUE NOT NULL,
    full_name    VARCHAR(100) NOT NULL,
    phone        VARCHAR(15) UNIQUE NOT NULL,
    id_number    VARCHAR(20) UNIQUE NOT NULL,
    plan_id      INT UNSIGNED NOT NULL,
    status       ENUM(''active'',''suspended'',''lapsed'') DEFAULT ''active'',
    joined_at    DATE NOT NULL,
    maturity_at  DATE NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);

CREATE TABLE payments (
    id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    member_id           INT UNSIGNED NOT NULL,
    amount              DECIMAL(10,2) NOT NULL,
    mpesa_receipt       VARCHAR(20),
    checkout_request_id VARCHAR(100),
    status              ENUM(''pending'',''completed'',''failed'') DEFAULT ''pending'',
    payment_month       DATE NOT NULL,
    paid_at             TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id)
);

CREATE TABLE claims (
    id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    member_id      INT UNSIGNED NOT NULL,
    deceased_name  VARCHAR(100) NOT NULL,
    relationship   VARCHAR(50) NOT NULL,
    death_date     DATE NOT NULL,
    claim_amount   DECIMAL(10,2) NOT NULL,
    status         ENUM(''submitted'',''under_review'',''approved'',''paid'',''rejected'') DEFAULT ''submitted'',
    submitted_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id)
);

CREATE TABLE commissions (
    id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    agent_id  INT UNSIGNED NOT NULL,
    member_id INT UNSIGNED NOT NULL,
    type      ENUM(''registration'',''monthly'',''renewal'') NOT NULL,
    amount    DECIMAL(10,2) NOT NULL,
    status    ENUM(''pending'',''paid'') DEFAULT ''pending'',
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Member Registration

When a member registers, generate a unique member number and calculate their maturity date based on the selected plan:

```php
function registerMember(array $data, int $planId): int {
    $pdo  = getDB();
    $plan = getPlanById($planId);

    $memberNo   = generateMemberNo();
    $joinedAt   = date(''Y-m-d'');
    $maturityAt = date(''Y-m-d'', strtotime(''+''. $plan[''maturity_months''] .'' months''));

    $stmt = $pdo->prepare(''
        INSERT INTO members (member_no, full_name, phone, id_number, plan_id, joined_at, maturity_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    '');
    $stmt->execute([
        $memberNo, $data[''full_name''], $data[''phone''],
        $data[''id_number''], $planId, $joinedAt, $maturityAt
    ]);

    return (int) $pdo->lastInsertId();
}

function generateMemberNo(): string {
    $pdo   = getDB();
    $count = (int) $pdo->query(''SELECT COUNT(*) FROM members'')->fetchColumn();
    return ''SHN'' . str_pad($count + 1, 5, ''0'', STR_PAD_LEFT);
}
```

## Payment Reconciliation

After M-Pesa confirms a payment via the callback, reconcile it against the member''s account:

```php
function reconcilePayment(string $checkoutRequestId, string $receiptNo, float $amount): void {
    $pdo = getDB();

    $stmt = $pdo->prepare(''
        SELECT id, member_id FROM payments
        WHERE checkout_request_id = ? AND status = ?
    '');
    $stmt->execute([$checkoutRequestId, ''pending'']);
    $payment = $stmt->fetch();

    if (!$payment) return;

    $pdo->prepare(''
        UPDATE payments SET status = ?, mpesa_receipt = ?, paid_at = NOW() WHERE id = ?
    '')->execute([''completed'', $receiptNo, $payment[''id'']]);

    $pdo->prepare(''
        UPDATE members SET status = ? WHERE id = ?
    '')->execute([''active'', $payment[''member_id'']]);
}
```

## Claims Submission

A claim can only be submitted by an active member who has passed their maturity period:

```php
function submitClaim(int $memberId, array $data): int {
    $pdo    = getDB();
    $member = getMemberById($memberId);

    if ($member[''status''] !== ''active'') {
        throw new Exception(''Member account is not active.'');
    }

    if (new DateTime() < new DateTime($member[''maturity_at''])) {
        throw new Exception(''Member has not completed the maturity period.'');
    }

    $stmt = $pdo->prepare(''
        INSERT INTO claims (member_id, deceased_name, relationship, death_date, claim_amount)
        VALUES (?, ?, ?, ?, ?)
    '');
    $stmt->execute([
        $memberId,
        $data[''deceased_name''],
        $data[''relationship''],
        $data[''death_date''],
        $member[''plan''][''cover_amount''],
    ]);

    return (int) $pdo->lastInsertId();
}
```

Administrators then move claims through statuses: `submitted → under_review → approved → paid`.

## Lapsed Member Detection (Cron Job)

Run this daily to automatically suspend members who have missed a payment:

```php
// cron: 0 8 * * * php /var/www/cron/check_lapsed.php

$stmt = $pdo->query(''
    SELECT m.id, m.phone FROM members m
    WHERE m.status = ''''active''''
    AND NOT EXISTS (
        SELECT 1 FROM payments p
        WHERE p.member_id = m.id
        AND p.status = ''''completed''''
        AND p.paid_at >= DATE_SUB(NOW(), INTERVAL 35 DAY)
    )
'');

foreach ($stmt->fetchAll() as $member) {
    $pdo->prepare(''UPDATE members SET status = ? WHERE id = ?'')
        ->execute([''lapsed'', $member[''id'']]);

    sendSMS($member[''phone''], ''Your welfare membership has lapsed. Pay now to reactivate your coverage.'');
}
```

## Key Lessons from Production

**Use PDO prepared statements everywhere.** A welfare system holds sensitive personal and financial data — SQL injection is not acceptable.

**Log every payment attempt.** Even failed STK pushes should be recorded with their `CheckoutRequestID`. This makes reconciliation and dispute resolution straightforward.

**Separate maturity from activation.** A common mistake is granting coverage immediately on registration. The maturity period (typically 3 months) protects the association from fraudulent same-day claims.

**Build the audit log from day one.** Every status change — member, payment, claim — should record who made it and when. You will always need this.

## Conclusion

A welfare management system is a CRUD application at its core, but the real complexity is in the business rules: maturity periods, claim eligibility, payment reconciliation, and commission calculations. Getting the database design right from the start saves significant refactoring later.

The full Shena system now manages hundreds of members and processes claims end-to-end without manual intervention.',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
  ARRAY['PHP', 'MySQL', 'Database Design', 'Web Development', 'Kenya'],
  true,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
);

-- Verify the post was created
SELECT id, title, slug, published, created_at FROM public.blog_posts WHERE slug = 'build-welfare-management-system-mysql';
