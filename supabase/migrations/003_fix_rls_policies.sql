-- Migration 003: Fix RLS Policies for Blog Posts
-- This migration fixes the overly restrictive RLS policies that prevent blog posts from loading

-- First, drop the existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authors can view their own posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authors can create their own posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authors can update their own posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authors can delete their own posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins have full access to blog posts" ON public.blog_posts;

-- Create new, more appropriate RLS policies for blog_posts

-- Policy 1: Anyone can view published blog posts (for public reading)
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

-- Policy 2: Authenticated users can view their own posts (including drafts)
CREATE POLICY "Users can view their own posts" ON public.blog_posts
    FOR SELECT USING (auth.uid() = author_id);

-- Policy 3: Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts" ON public.blog_posts
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Policy 4: Authors can update their own posts
CREATE POLICY "Authors can update their own posts" ON public.blog_posts
    FOR UPDATE USING (auth.uid() = author_id);

-- Policy 5: Authors can delete their own posts
CREATE POLICY "Authors can delete their own posts" ON public.blog_posts
    FOR DELETE USING (auth.uid() = author_id);

-- Policy 6: Admins can view all posts (including drafts from other users)
CREATE POLICY "Admins can view all posts" ON public.blog_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy 7: Admins can update any post
CREATE POLICY "Admins can update any post" ON public.blog_posts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy 8: Admins can delete any post
CREATE POLICY "Admins can delete any post" ON public.blog_posts
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Also fix the users table policies to be less restrictive
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins have full access" ON public.users;

-- Create new user policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Admins can view all users (this is handled by the admin migration)
-- The admin policies from 002_admin_setup.sql will handle admin access

-- Test the policies by creating a simple function to check access
CREATE OR REPLACE FUNCTION public.test_blog_access()
RETURNS TABLE (
    can_view_published BOOLEAN,
    can_view_own BOOLEAN,
    can_create BOOLEAN,
    is_admin BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TRUE as can_view_published, -- Everyone can view published posts
        auth.uid() IS NOT NULL as can_view_own, -- Authenticated users can view their own
        auth.uid() IS NOT NULL as can_create, -- Authenticated users can create
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        ) as is_admin;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.test_blog_access() TO authenticated;
