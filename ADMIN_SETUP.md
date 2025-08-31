# Admin User Setup Guide

## Step 1: Create Your First User Account

1. Go to `http://localhost:3000/signup`
2. Create an account with your email and password
3. Sign in at `http://localhost:3000/login`

## Step 2: Set Up Admin Role in Supabase

1. In your Supabase dashboard, go to **SQL Editor**
2. Run this SQL command to make your user an admin:

```sql
-- Replace 'your-email@example.com' with your actual email
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

## Step 3: Verify Admin Access

1. Sign out and sign back in
2. You should now have full admin access to:
   - View all blog posts
   - Edit any user's posts
   - Manage user roles
   - Access admin features

## Alternative: Create Admin User Directly

If you prefer to create an admin user directly in the database:

```sql
-- Insert admin user directly (replace with your details)
INSERT INTO public.users (id, email, full_name, role, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'admin@trendbase.com',
    'Admin User',
    'admin',
    NOW(),
    NOW()
);

-- You'll also need to create the auth user
-- This is done through the signup process, then update the role
```

## User Roles

- **admin**: Full access to everything
- **author**: Can create, edit, and delete their own posts
- **user**: Can view published posts only

## Security Notes

- Only admins can change user roles
- Users can only access their own data
- Row Level Security (RLS) is enabled for all tables
- Admin users bypass RLS restrictions
