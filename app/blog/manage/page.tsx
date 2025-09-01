'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AuthGuard } from '@/components/auth-guard'
import { BlogPostForm } from '@/components/blog-post-form'
import { UserProfile } from '@/components/user-profile'
import { BlogServiceClient } from '@/lib/blog-service-client'
import { BlogPost } from '@/lib/types'
import { Plus, Edit, Trash2, Eye, Calendar, User, Shield } from 'lucide-react'
import Link from 'next/link'
import { AdminUserManagement } from '@/components/admin-user-management'
import { MainNavigation } from '@/components/main-navigation'

export default function BlogManagePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const allPosts = await BlogServiceClient.getAllPosts()
      setPosts(allPosts)
    } catch (err) {
      setError('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await BlogServiceClient.deletePost(id)
        await loadPosts()
      } catch (err) {
        setError('Failed to delete post')
      }
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setShowCreateForm(true)
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    setShowCreateForm(false)
  }



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (showCreateForm) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">
              {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <Button
              variant="outline"
              onClick={handleCancelEdit}
            >
              Back to Dashboard
            </Button>
          </div>
          <BlogPostForm 
            post={editingPost}
            onCancel={handleCancelEdit}
            onSuccess={() => {
              setEditingPost(null)
              setShowCreateForm(false)
              loadPosts()
            }}
          />
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <MainNavigation />
        
        {/* Page Title */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">Blog Management</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
              <p className="text-gray-600">Manage your blog content and create new posts</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Shield className="mr-2 h-4 w-4" />
                {showAdminPanel ? 'Hide Admin' : 'Show Admin'}
              </Button>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Admin Panel */}
          {showAdminPanel && (
            <div className="mb-8">
              <AdminUserManagement />
            </div>
          )}

          {/* Posts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Plus className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                <p className="text-gray-600 mb-4">Create your first blog post to get started</p>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2 mb-2">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>{post.author_name}</span>
                        </div>
                      </div>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3 mb-4 break-words overflow-hidden">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {post.tags?.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags && post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditPost(post)}
                          title="Edit post"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
