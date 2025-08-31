export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  featured_image?: string
  author_id: string
  author_name: string
  author_email: string
  published_at: string
  created_at: string
  updated_at: string
  status: 'draft' | 'published'
  tags?: string[]
  meta_description?: string
}

export interface CreateBlogPost {
  title: string
  content: string
  excerpt: string
  slug: string
  featured_image?: string
  author_name: string
  author_email: string
  status: 'draft' | 'published'
  tags?: string[]
  meta_description?: string
}

export interface UpdateBlogPost extends Partial<CreateBlogPost> {
  id: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'admin' | 'author' | 'user'
  created_at: string
  updated_at: string
}
