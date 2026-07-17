-- Blog Post: "API Security Best Practices Every Developer Should Know"
-- Run this in your Supabase SQL Editor

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
  'API Security Best Practices Every Developer Should Know',
  'api-security-best-practices-every-developer-should-know',
  'APIs power modern applications by connecting web clients, mobile apps, databases, and third-party services. Because they often expose sensitive data and business logic, securing them is essential. This article explores practical API security best practices—from authentication and authorization to monitoring and secret management—that every backend developer should understand.',
  '# API Security Best Practices Every Developer Should Know

One lesson I''ve learned while building and studying backend systems is that API security is often treated as something to address later. It''s easy to focus on getting features working first, but small oversights—like a missing authorization check or exposing too much data in a response—can create serious security risks.

APIs are the backbone of modern software. They connect web applications, mobile apps, microservices, and third-party platforms. Because they sit at the center of so many systems, they are also one of the most common targets for attackers.

The good news is that many API vulnerabilities are preventable. By following a set of proven security practices throughout development, you can significantly reduce risk and build more resilient applications.

## 1. Authenticate Every Request

Never assume a request is trustworthy simply because it came from your frontend application.

Every endpoint that accesses protected resources should require authentication.

Using JSON Web Tokens (JWTs) is a common approach.

```javascript
const jwt = require(''jsonwebtoken'');

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split('' '')[1];

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.get("/api/orders", requireAuth, getOrders);
```

**Best Practices**

- Use short-lived access tokens.
- Rotate and revoke credentials regularly.
- Store secrets in environment variables or a secrets manager.
- Never rely on hidden URLs as a security mechanism.

## 2. Enforce Authorization, Not Just Authentication

Authentication answers: *Who are you?*

Authorization answers: *What are you allowed to access?*

One of the most common API vulnerabilities is Broken Object Level Authorization (BOLA).

**Vulnerable Example**

```python
@app.get("/orders/{order_id}")
def get_order(order_id: int, user: User = Depends(get_current_user)):
    return db.query(Order).filter(Order.id == order_id).first()
```

Any authenticated user could retrieve another user''s order simply by changing the ID.

**Secure Version**

```python
@app.get("/orders/{order_id}")
def get_order(order_id: int, user: User = Depends(get_current_user)):
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.user_id == user.id
    ).first()

    if not order:
        raise HTTPException(status_code=404, detail=''Order not found'')

    return order
```

Always verify ownership before returning protected resources.

## 3. Validate and Sanitize Every Input

Every request should be treated as untrusted.

Validate:

- Request bodies
- Query parameters
- Headers
- Uploaded files

Laravel makes validation straightforward.

```php
public function rules(): array
{
    return [
        ''email''  => ''required|email|max:255'',
        ''amount'' => ''required|numeric|min:0|max:100000'',
        ''notes''  => ''nullable|string|max:1000'',
    ];
}
```

**Remember**

- Reject malformed requests.
- Use parameterized queries.
- Avoid SQL string concatenation.
- Validate data before business logic executes.

## 4. Use HTTPS Everywhere

Always encrypt traffic using TLS.

HTTPS protects:

- Login credentials
- API tokens
- Personal information
- Payment information

Configure automatic HTTP → HTTPS redirects and enable HSTS where appropriate.

Never expose production APIs over plain HTTP.

## 5. Implement Rate Limiting

Without rate limiting, attackers can:

- Brute-force login endpoints
- Launch denial-of-service attacks
- Scrape your API

Example using Express:

```javascript
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts."
});

app.post("/api/login", loginLimiter, loginHandler);
```

Combine this with:

- IP limits
- User limits
- Temporary lockouts
- Traffic monitoring

## 6. Prevent Excessive Data Exposure

Avoid returning entire database objects.

Instead, define response models.

FastAPI example:

```python
class OrderOut(BaseModel):
    id: int
    status: str
    total: float

@app.get("/orders/{order_id}", response_model=OrderOut)
def get_order(...):
    ...
```

Notice what''s missing:

- Password hashes
- Internal notes
- Private metadata

Return only the information clients actually need.

## 7. Avoid Detailed Error Messages

Detailed errors help developers—but they also help attackers.

Instead of exposing stack traces, return a generic message:

```json
{
  "error": "Something went wrong."
}
```

Log the full details internally.

```javascript
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Something went wrong."
    });
});
```

Use standard HTTP status codes consistently.

## 8. Keep Track of Every API

Many organizations forget about:

- Deprecated APIs
- Old versions
- Internal endpoints

These "shadow APIs" often become security risks.

Maintain:

- OpenAPI documentation
- API inventories
- Version history

Remove APIs that are no longer needed.

## 9. Secure the Infrastructure

Security doesn''t stop at application code.

Protect your infrastructure with:

- API Gateways
- Firewalls
- Network segmentation
- Web Application Firewalls (WAFs)

Centralizing security controls makes systems easier to manage and audit.

## 10. Monitor and Audit Continuously

Deployment isn''t the finish line.

Monitor:

- Authentication failures
- Authorization failures
- Error rates
- Suspicious traffic
- Unusual request patterns

Set alerts for abnormal behavior and review logs regularly.

Continuous monitoring helps detect attacks before they become major incidents.

## 11. Manage Secrets Properly

Never commit secrets to source control.

Instead, use:

- Environment variables
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault

Rotate secrets regularly and scan repositories for exposed credentials.

## 12. Keep Dependencies Updated

Many vulnerabilities originate from outdated libraries.

Automate dependency scanning using tools like:

- Dependabot
- Snyk
- npm audit
- pip-audit

Update packages regularly, especially those handling:

- Authentication
- Serialization
- Request parsing

## Actionable Takeaways

If you''re improving your API security this week, start with these five tasks:

✅ Add ownership checks to every endpoint that retrieves resources by ID.

✅ Enable rate limiting on login and authentication endpoints.

✅ Review API responses and remove unnecessary fields.

✅ Run a dependency security scan and apply important updates.

✅ Search your repositories for exposed API keys or credentials and rotate them immediately if found.

These improvements require relatively little effort but significantly strengthen your application''s security posture.

## Final Thoughts

Building secure APIs isn''t about adding a single security feature.

It''s about adopting secure engineering practices throughout the software development lifecycle.

Authentication, authorization, input validation, monitoring, dependency management, and proper secret handling all work together to reduce risk.

No application is completely immune to attacks, but consistently applying these best practices makes your APIs far more resilient and trustworthy.

Security should never be treated as a feature that''s added at the end of development.

It should be part of every design decision from the very beginning.

## Further Reading

- [OWASP API Security Top 10](https://owasp.org/API-Security/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [FastAPI Security Documentation](https://fastapi.tiangolo.com/tutorial/security/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [OAuth 2.0 Framework](https://oauth.net/2/)
- [OpenID Connect](https://openid.net/connect/)',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop',
  ARRAY['API Security', 'Backend Development', 'Software Engineering', 'REST API', 'FastAPI', 'Express.js', 'OWASP', 'Cybersecurity', 'Web Development'],
  true,
  NOW(),
  NOW()
);

-- Verify the post was created
SELECT id, title, slug, published, created_at FROM public.blog_posts WHERE slug = 'api-security-best-practices-every-developer-should-know';
