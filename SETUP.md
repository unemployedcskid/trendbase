# Supabase Setup Guide

Follow these steps to set up your Supabase integration:

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `trendbase-blog` (or your preferred name)
   - Database Password: Choose a strong password
   - Region: Select closest to your users
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

## Step 3: Set Environment Variables

1. Create a `.env.local` file in your project root
2. Add these lines (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 4: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Choose **Web application**
6. Add these authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://your-domain.com/auth/callback` (for production)
7. Copy the **Client ID** and **Client Secret**

## Step 5: Configure Supabase Google OAuth

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click **Edit**
3. Enable Google provider
4. Enter your Google OAuth credentials:
   - **Client ID**: Your Google OAuth client ID
   - **Client Secret**: Your Google OAuth client secret
5. Save the configuration

## Step 6: Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content of `supabase/migrations/001_initial_schema.sql`
3. Paste it into the SQL editor
4. Click **Run** to execute the migration

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/login`
3. Click "Sign in with Google"
4. Complete the Google OAuth flow
5. You should be redirected to the blog management dashboard

## Troubleshooting

### Common Issues:

1. **"Foreign key constraint violation"**
   - Make sure you've run the complete migration file
   - The migration now automatically creates users when they sign up

2. **"Invalid redirect URI"**
   - Check your Google OAuth redirect URIs
   - Make sure they match exactly (including http vs https)

3. **"Supabase client not initialized"**
   - Verify your environment variables are set correctly
   - Check that `.env.local` is in your project root

4. **"Authentication failed"**
   - Verify Google OAuth is enabled in Supabase
   - Check that your Google OAuth credentials are correct

### Environment Variables Check:

Make sure your `.env.local` file has:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` (starts with https://)
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` (starts with eyJ...)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (starts with eyJ...)

### Google OAuth Check:

In Supabase dashboard:
- ✅ Google provider is enabled
- ✅ Client ID is set
- ✅ Client Secret is set
- ✅ Redirect URL matches your callback route

## Next Steps

Once everything is working:
1. Create your first blog post
2. Test the authentication flow
3. Deploy to production (remember to update Google OAuth redirect URIs)
4. Set production environment variables

## Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Verify all environment variables are set
3. Make sure the database migration ran successfully
4. Check Supabase logs in the dashboard
