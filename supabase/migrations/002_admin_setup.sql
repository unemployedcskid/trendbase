-- Migration 002: Admin Setup and User Management
-- This migration sets up the admin system and improves user management

-- First, let's create a function to safely promote a user to admin
-- Only superusers (service role) can call this function
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_id UUID;
BEGIN
    -- Get the user ID from auth.users
    SELECT id INTO user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    -- If user doesn't exist, return false
    IF user_id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Update the user's role to admin
    UPDATE public.users 
    SET role = 'admin', updated_at = NOW()
    WHERE id = user_id;
    
    -- Return true if update was successful
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to demote an admin back to user
CREATE OR REPLACE FUNCTION public.demote_from_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_id UUID;
BEGIN
    -- Get the user ID from auth.users
    SELECT id INTO user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    -- If user doesn't exist, return false
    IF user_id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Update the user's role to user
    UPDATE public.users 
    SET role = 'user', updated_at = NOW()
    WHERE id = user_id;
    
    -- Return true if update was successful
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to list all admin users
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE (
    id UUID,
    email TEXT,
    full_name TEXT,
    role TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.email, u.full_name, u.role, u.created_at
    FROM public.users u
    WHERE u.role = 'admin'
    ORDER BY u.created_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to list all users with their roles
CREATE OR REPLACE FUNCTION public.get_all_users_with_roles()
RETURNS TABLE (
    id UUID,
    email TEXT,
    full_name TEXT,
    role TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.email, u.full_name, u.role, u.created_at
    FROM public.users u
    ORDER BY u.created_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policy for admins to view all users
CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Add RLS policy for admins to update user roles
CREATE POLICY "Admins can update user roles" ON public.users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Add RLS policy for admins to manage all blog posts
CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create a view for easy admin management
CREATE OR REPLACE VIEW public.admin_dashboard AS
SELECT 
    u.id,
    u.email,
    u.full_name,
    u.role,
    u.created_at,
    COUNT(b.id) as post_count
FROM public.users u
LEFT JOIN public.blog_posts b ON u.id = b.author_id
GROUP BY u.id, u.email, u.full_name, u.role, u.created_at
ORDER BY u.created_at DESC;

-- Grant appropriate permissions
GRANT SELECT ON public.admin_dashboard TO authenticated;
GRANT EXECUTE ON FUNCTION public.promote_to_admin(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.demote_from_admin(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_users() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_users_with_roles() TO authenticated;
