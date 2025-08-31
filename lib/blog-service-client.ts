import { createClient } from '@/lib/supabase-client'
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '@/lib/types'

export class BlogServiceClient {
  static async getAllPosts(): Promise<BlogPost[]> {
    const supabase = createClient()
    
    try {
      console.log('🔍 Starting getAllPosts...')
      
      // First, check if the user is authenticated
      const { data: userData, error: userError } = await supabase.auth.getUser()
      console.log('👤 User data:', userData, 'Error:', userError)
      
      if (userError) {
        console.error('❌ Auth error:', userError)
        throw userError
      }
      
      if (userData.user) {
        console.log('✅ User authenticated:', userData.user.id)
        
        // Check if user is admin
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', userData.user.id)
          .single()
        
        console.log('👑 User profile:', userProfile, 'Error:', profileError)
        
        if (userProfile?.role === 'admin') {
          console.log('🛡️ User is admin, getting all posts...')
          // Admin can see all posts
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false })
          
          console.log('📝 Admin posts result:', data, 'Error:', error)
          if (error) throw error
          return data || []
        }
      }
      
      console.log('👤 Regular user, getting published + own posts...')
      // Regular users can only see published posts and their own drafts
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .or(`status.eq.published,author_id.eq.${userData.user?.id || '00000000-0000-0000-0000-000000000000'}`)
        .order('created_at', { ascending: false })
      
      console.log('📝 Regular user posts result:', data, 'Error:', error)
      if (error) throw error
      return data || []
      
    } catch (error) {
      console.error('💥 Error in getAllPosts:', error)
      throw error
    }
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const supabase = createClient()
    
    try {
      console.log('🔍 Fetching post with slug:', slug)
      
      // Get the post by slug
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error) {
        console.error('❌ Error fetching post by slug:', error)
        throw error
      }
      
      if (!data) {
        console.log('📝 No post found with slug:', slug)
        return null
      }
      
      console.log('✅ Post found:', data.title, 'Status:', data.status)
      
      // For now, allow viewing any post (we can add restrictions later)
      return data
      
    } catch (error) {
      console.error('💥 Error in getPostBySlug:', error)
      throw error
    }
  }

  static async getPublishedPosts(): Promise<BlogPost[]> {
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('💥 Error in getPublishedPosts:', error)
      throw error
    }
  }

  static async createPost(post: CreateBlogPost, authorId: string): Promise<BlogPost> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        ...post,
        author_id: authorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updatePost(id: string, updates: UpdateBlogPost): Promise<BlogPost> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async publishPost(id: string): Promise<BlogPost> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deletePost(id: string): Promise<void> {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  static async getPostById(id: string): Promise<BlogPost | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}
