# Profile Functionality Setup Guide

## ✅ Implementation Complete

The profile functionality has been successfully implemented! All hardcoded personal information has been replaced with dynamic data from Supabase.

## 🎯 What Was Changed

### 1. **Created Profile Hook** (`src/hooks/useProfile.ts`)
- Fetches profile data from Supabase
- Provides TypeScript types
- Includes 5-minute caching
- Graceful error handling

### 2. **Updated Components**
All components now use dynamic profile data:

- **Hero.tsx**
  - ✅ Full name
  - ✅ Professional title
  - ✅ Social links (GitHub, LinkedIn, Twitter, Email)

- **Footer.tsx**
  - ✅ Full name
  - ✅ Bio
  - ✅ Social links
  - ✅ Copyright name

- **Contact.tsx**
  - ✅ Email address
  - ✅ Location
  - ✅ Notification recipient email

- **About.tsx**
  - ✅ Biography/description

## 📝 Next Steps: Add Your Profile Data

### Option 1: Using Supabase SQL Editor (Recommended)

1. **Get Your User ID**
   - Go to your Supabase Dashboard
   - Navigate to **Authentication** → **Users**
   - Copy your user ID (UUID)

2. **Run the Seed Script**
   - Go to **SQL Editor** in Supabase Dashboard
   - Copy the content from `supabase/seed-profile.sql`
   - Replace `'YOUR_USER_ID_HERE'` with your actual user ID
   - Click **Run**

### Option 2: Using Supabase Table Editor

1. Go to **Table Editor** → **profiles**
2. Click **Insert** → **Insert row**
3. Fill in the fields:
   - **id**: Your user ID from auth.users
   - **full_name**: "Harrison Onyango Aloo"
   - **title**: "Software Engineer & Full Stack Developer"
   - **bio**: Your bio text (supports multi-line)
   - **github_url**: "https://github.com/Flopchamp"
   - **linkedin_url**: "https://www.linkedin.com/in/harrison-aloo-1ba4a73a1"
   - **twitter_url**: "https://twitter.com/Harriso41240001"
   - **email**: "alooharrison7@gmail.com"
   - **location**: "Kisumu, Kenya"
   - **avatar_url**: (optional) URL to profile picture
4. Click **Save**

## 🔄 Fallback Behavior

If profile data is not in the database, the site will display default values:
- Full name: "Harrison Onyango Aloo"
- Title: "Software Engineer & Full Stack Developer"
- Bio: Default bio text
- Social links: Current hardcoded URLs
- Email: "alooharrison7@gmail.com"
- Location: "Kisumu, Kenya"

## ✨ Benefits of This Implementation

1. **Single Source of Truth**: Update once in Supabase, reflect everywhere
2. **No Code Changes**: Modify personal info without deploying
3. **Type-Safe**: Full TypeScript support
4. **Cached**: 5-minute cache reduces database calls
5. **Scalable**: Ready for multi-user support in the future

## 🧪 Testing

After adding profile data:

1. **Clear browser cache** or open in incognito
2. **Check all pages**:
   - Hero section (name, title, social links)
   - About section (bio)
   - Contact section (email, location)
   - Footer (name, bio, social links)
3. **Verify social links** work correctly
4. **Test contact form** sends to correct email

## 🛠️ Future Enhancements

Consider adding:
- Profile edit interface
- Avatar image upload
- Multiple social media accounts
- Custom taglines/quotes
- Skills list from database
- Resume/CV upload

## 📚 Database Schema Reference

```typescript
Profile {
  id: string;              // UUID from auth.users
  full_name: string;       // Required
  title: string | null;    // Job title
  bio: string | null;      // Multi-line biography
  avatar_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  email: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}
```

## ⚠️ Important Notes

- Profile table uses Row Level Security (RLS)
- Public can read profiles
- Only authenticated users can update their own profile
- The `id` must match a user in `auth.users` table
- If you don't have a user in auth.users, you may need to create one first

## 🚀 Ready to Go!

Your portfolio is now fully dynamic and ready for production. All personal information is centralized in the Supabase profiles table.
