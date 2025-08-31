import { createClient } from '@/lib/supabase-server'
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '@/lib/types'

export class BlogService {
  static async getAllPosts(): Promise<BlogPost[]> {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (error) throw error
    return data
  }

  static async createPost(post: CreateBlogPost, authorId: string): Promise<BlogPost> {
    const supabase = await createClient()
    
    // Get user information to populate author details
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('email, full_name')
      .eq('id', authorId)
      .single()
    
    if (userError) {
      // If user not found in public.users table, try to get from auth.users
      const { data: authUser } = await supabase.auth.getUser()
      if (authUser.user) {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            ...post,
            author_id: authorId,
            author_name: authUser.user.user_metadata?.full_name || authUser.user.email || 'Unknown Author',
            author_email: authUser.user.email || 'unknown@example.com',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single()
        
        if (error) throw error
        return data
      }
      throw userError
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        ...post,
        author_id: authorId,
        author_name: userData.full_name || userData.email,
        author_email: userData.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updatePost(post: UpdateBlogPost): Promise<BlogPost> {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...post,
        updated_at: new Date().toISOString()
      })
      .eq('id', post.id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deletePost(id: string): Promise<void> {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  static async getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }
}
