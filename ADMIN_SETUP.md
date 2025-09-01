# Admin Account Setup

This document explains how to manually set up an admin account with the credentials:
- **Email**: elliot@trendbase.ai
- **Password**: iajgfhins32$$;8!

## Method 1: Using the Setup Script (Recommended)

### Prerequisites
1. Make sure you have the Supabase service role key
2. Add it to your `.env` file:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### Steps
1. Install dependencies if not already done:
   ```bash
   npm install
   ```

2. Run the setup script:
   ```bash
   node scripts/setup-admin.js
   ```

## Method 2: Manual Setup via Supabase Dashboard

### Step 1: Get Your Service Role Key
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** > **API**
4. Copy the **service_role** key (not the anon key)

### Step 2: Create the User
1. In your Supabase dashboard, go to **Authentication** > **Users**
2. Click **"Add User"**
3. Fill in the details:
   - **Email**: elliot@trendbase.ai
   - **Password**: iajgfhins32$$;8!
   - **Email Confirmed**: ✅ (check this)
4. Click **"Create User"**

### Step 3: Set Admin Role
1. Go to **SQL Editor** in your Supabase dashboard
2. Make sure you're using the **service role** (check the dropdown)
3. Run this SQL:

```sql
-- Update the user role to admin
UPDATE public.users 
SET role = 'admin', 
    full_name = 'Elliot Admin',
    updated_at = NOW()
WHERE email = 'elliot@trendbase.ai';

-- If the user doesn't exist in public.users yet, create them first:
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
```

## Method 3: Using Supabase CLI

If you have the Supabase CLI installed:

1. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

2. Reset the database (this will apply all migrations):
   ```bash
   supabase db reset --linked
   ```

3. Then manually create the user via the dashboard using Method 2.

## Verification

After setup, you should be able to:
1. Log in with elliot@trendbase.ai / iajgfhins32$$;8!
2. Access admin-only features
3. See the user listed in the admin dashboard

## Troubleshooting

### User Already Exists
If you get an error that the user already exists:
1. Check if the user exists in **Authentication** > **Users**
2. If yes, just update their role using the SQL from Method 2, Step 3

### Permission Denied
Make sure you're using the **service role** key, not the anon key. The service role has elevated privileges needed to create users and modify the database.

### Migration Issues
If you encounter migration issues:
1. Check the migration files in `supabase/migrations/`
2. Ensure all previous migrations have been applied
3. Consider resetting the database: `supabase db reset --linked`

## Security Notes

- The service role key has elevated privileges - keep it secure
- Don't commit the service role key to version control
- Consider using environment variables for sensitive configuration
- The admin user will have full access to all data and functions
