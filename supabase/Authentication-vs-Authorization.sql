-- Blog Post: "Authentication vs Authorization: Understanding the Difference"
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
  'Authentication vs Authorization: Understanding the Difference',
  'authentication-vs-authorization-understanding-the-difference',
  'Authentication and authorization are often confused, yet they serve different purposes in application security. Authentication verifies a user''s identity, while authorization determines what they are allowed to access. Understanding the distinction is essential for building secure APIs and web applications.',
  '# Authentication vs Authorization: Understanding the Difference

Authentication and authorization are two of the most fundamental concepts in application security, yet they''re often mistaken for the same thing.

A secure login system doesn''t automatically mean an application is secure. Even when users successfully authenticate, an application can still expose sensitive information if it fails to verify what each user is allowed to access.

Understanding the difference between authentication and authorization is essential for building secure APIs and preventing common security vulnerabilities.

## Authentication: "Who Are You?"

Authentication is the process of verifying a user''s identity.

It answers one question:

*Who are you?*

Common authentication methods include:

- Passwords
- Multi-Factor Authentication (MFA)
- JSON Web Tokens (JWT)
- Session Cookies
- OAuth 2.0
- OpenID Connect
- API Keys

Once a user''s identity has been verified, the application can trust that they are who they claim to be.

Here''s a simple authentication middleware in Express.js:

```javascript
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Not logged in"
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      error: "Invalid session"
    });
  }
}
```

Notice what this middleware does.

It confirms the user''s identity.

It does not determine what resources the user is allowed to access.

That is the responsibility of authorization.

## Authorization: "What Are You Allowed to Do?"

Authorization happens after authentication.

It answers a different question:

*What are you allowed to access or do?*

Authorization determines whether an authenticated user has permission to:

- View a resource
- Modify data
- Delete records
- Access administrative features
- Perform sensitive operations

Consider the following FastAPI example.

**Vulnerable Version**

```python
@app.get("/invoices/{invoice_id}")
def get_invoice(invoice_id: int, user: User = Depends(authenticate)):
    return db.query(Invoice).filter(
        Invoice.id == invoice_id
    ).first()
```

Although the user is authenticated, any logged-in user could retrieve another user''s invoice simply by changing the invoice ID.

**Secure Version**

```python
@app.get("/invoices/{invoice_id}")
def get_invoice(invoice_id: int, user: User = Depends(authenticate)):
    invoice = db.query(Invoice).filter(
        Invoice.id == invoice_id,
        Invoice.user_id == user.id
    ).first()

    if not invoice:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found"
        )

    return invoice
```

The additional ownership check ensures users can only access resources they own.

Authorization is what prevents unauthorized access to sensitive data.

## Role-Based Authorization

Authorization isn''t limited to resource ownership.

Many applications use roles. For example:

- Admin
- Manager
- Employee
- Customer

Laravel provides authorization middleware for this.

```php
Route::delete(''/users/{id}'', [UserController::class, ''destroy''])
    ->middleware(''can:delete,user'');
```

Only users with the required permission can perform the action.

## Authentication vs Authorization

| Authentication | Authorization |
|---|---|
| Verifies identity | Verifies permissions |
| Answers "Who are you?" | Answers "What can you do?" |
| Happens first | Happens after authentication |
| Uses passwords, tokens, MFA | Uses roles, permissions, ownership |
| Prevents unauthorized login | Prevents unauthorized access |

## Why the Difference Matters

Many applications have strong authentication systems but weak authorization checks.

Developers often assume that because a user is logged in, they should automatically have access to requested resources.

Unfortunately, this assumption leads to vulnerabilities.

One of the most common examples is Broken Object Level Authorization (BOLA), listed in the OWASP API Security Top 10.

BOLA occurs when an API verifies that a user is authenticated but fails to verify that the requested resource belongs to them.

This vulnerability is responsible for many real-world data leaks.

A useful way to think about it is:

- Authentication happens once when establishing identity.
- Authorization should be evaluated every time a user attempts to access a protected resource or perform a sensitive action.

## Best Practices

When building secure applications:

- Authenticate every protected request.
- Always verify ownership before returning data.
- Use Role-Based Access Control (RBAC) where appropriate.
- Follow the principle of least privilege.
- Never rely on frontend validation for authorization.
- Test APIs using multiple user accounts to verify access controls.
- Review endpoints that retrieve resources by ID.

## Final Thoughts

Authentication and authorization work together, but they solve different problems.

Authentication establishes who the user is.

Authorization determines what that user is permitted to access.

Strong authentication without proper authorization still leaves applications vulnerable to unauthorized data access.

By consistently implementing both identity verification and permission checks, developers can build APIs and applications that are significantly more secure and resilient.

## Further Reading

- [OWASP API Security Top 10](https://owasp.org/API-Security/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OAuth 2.0 Documentation](https://oauth.net/2/)
- [OpenID Connect](https://openid.net/connect/)
- [FastAPI Security Documentation](https://fastapi.tiangolo.com/tutorial/security/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop',
  ARRAY['Authentication', 'Authorization', 'API Security', 'Backend Development', 'Software Engineering', 'FastAPI', 'Express.js', 'Laravel', 'OWASP', 'Cybersecurity'],
  true,
  NOW(),
  NOW()
);

-- Verify the post was created
SELECT id, title, slug, published, created_at FROM public.blog_posts WHERE slug = 'authentication-vs-authorization-understanding-the-difference';