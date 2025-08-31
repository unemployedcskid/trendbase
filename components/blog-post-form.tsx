'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/hooks/use-auth'
import { BlogServiceClient } from '@/lib/blog-service-client'
import { CreateBlogPost } from '@/lib/types'
import { Loader2, Plus, Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BlogPostFormProps {
  post?: BlogPost | null
  onCancel?: () => void
  onSuccess?: () => void
}

export function BlogPostForm({ post, onCancel, onSuccess }: BlogPostFormProps) {
  const [formData, setFormData] = useState<CreateBlogPost>({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    slug: post?.slug || '',
    author_name: post?.author_name || '',
    author_email: post?.author_email || '',
    status: post?.status || 'draft',
    tags: post?.tags || [],
    meta_description: post?.meta_description || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  const handleInputChange = (field: keyof CreateBlogPost, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    handleInputChange('title', title)
    handleInputChange('slug', generateSlug(title))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    setError('')

    try {
      if (post) {
        // Update existing post - ensure status is set to published when publishing
        const updateData = { ...formData }
        if (post.status === 'draft') {
          // If we're editing a draft and clicking publish, set status to published
          updateData.status = 'published'
        }
        await BlogServiceClient.updatePost(post.id, updateData)
        if (onSuccess) onSuccess()
      } else {
        // Create new post
        await BlogServiceClient.createPost(formData, user.id)
        if (onSuccess) onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${post ? 'update' : 'create'} blog post`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {post ? (
            <>
              <Edit className="h-5 w-5" />
              Edit Blog Post
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              Create New Blog Post
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="blog-post-slug"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags.join(', ')}
                onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
                placeholder="seo, marketing, business"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author_name">Author Name *</Label>
              <Input
                id="author_name"
                value={formData.author_name}
                onChange={(e) => handleInputChange('author_name', e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author_email">Author Email *</Label>
              <Input
                id="author_email"
                value={formData.author_email}
                onChange={(e) => handleInputChange('author_email', e.target.value)}
                placeholder="Enter author email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              placeholder="Brief description of the blog post"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Write your blog post content here..."
              rows={10}
              required
            />
          </div>



          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description || ''}
              onChange={(e) => handleInputChange('meta_description', e.target.value)}
              placeholder="SEO meta description"
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel || (() => router.push('/blog/manage'))}
            >
              Cancel
            </Button>
            
            {/* Save as Draft Button - Only show for new posts or draft posts */}
            {(post?.status === 'draft' || !post) && (
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={async () => {
                  if (!user) return
                  
                  setIsLoading(true)
                  setError('')
                  
                  try {
                    if (post) {
                      // Update existing draft post
                      const draftData = { ...formData, status: 'draft' }
                      await BlogServiceClient.updatePost(post.id, draftData)
                      if (onSuccess) onSuccess()
                    } else {
                      // Create new draft post
                      const draftData = { ...formData, status: 'draft' }
                      await BlogServiceClient.createPost(draftData, user.id)
                      if (onSuccess) onSuccess()
                    }
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to save draft')
                  } finally {
                    setIsLoading(false)
                  }
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save as Draft'
                )}
              </Button>
            )}
            
            {/* Publish/Update Button */}
            <Button
              type="button"
              disabled={isLoading}
              onClick={async () => {
                if (!user) return
                
                setIsLoading(true)
                setError('')
                
                try {
                  if (post) {
                    if (post.status === 'draft') {
                      // Publishing a draft - update with published status
                      const publishData = { ...formData, status: 'published' }
                      await BlogServiceClient.updatePost(post.id, publishData)
                      if (onSuccess) onSuccess()
                    } else {
                      // Updating a published post
                      await BlogServiceClient.updatePost(post.id, formData)
                      if (onSuccess) onSuccess()
                    }
                  } else {
                    // Creating a new post - submit the form normally
                    const form = document.querySelector('form')
                    if (form) form.requestSubmit()
                  }
                } catch (err) {
                  setError(err instanceof Error ? err.message : `Failed to ${post?.status === 'draft' ? 'publish' : 'update'} blog post`)
                } finally {
                  setIsLoading(false)
                }
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {post ? (post.status === 'draft' ? 'Publishing...' : 'Updating...') : 'Publishing...'}
                </>
              ) : (
                post ? (post.status === 'draft' ? 'Publish Post' : 'Update Post') : 'Publish Post'
              )}
            </Button>
          </div>
          
          {/* Hidden submit button for form validation */}
          <button type="submit" style={{ display: 'none' }} />
        </form>
      </CardContent>
    </Card>
  )
}
