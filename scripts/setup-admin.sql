-- Admin Account Setup SQL Script
-- Run this in your Supabase dashboard SQL editor with service role privileges

-- First, create the user in auth.users (this must be done via the dashboard UI)
-- Go to Authentication > Users > Add User
-- Email: elliot@trendbase.ai
-- Password: iajgfhins32$$;8!
-- Check "Email Confirmed"

-- After creating the user above, run this SQL to set the admin role:

-- Update existing user to admin role
UPDATE public.users 
SET role = 'admin', 
    full_name = 'Elliot Admin',
    updated_at = NOW()
WHERE email = 'elliot@trendbase.ai';

-- If the user doesn't exist in public.users yet, create them
INSERT INTO public.users (id, email, full_name, role, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    'Elliot Admin',
    'admin',
    NOW(),
    NOW()
FROM auth.users au
WHERE au.email = 'elliot@trendbase.ai'
ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    full_name = 'Elliot Admin',
    updated_at = NOW();

-- Verify the admin user was created
SELECT 
    u.id,
    u.email,
    u.full_name,
    u.role,
    u.created_at
FROM public.users u
WHERE u.email = 'elliot@trendbase.ai';
