'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase-client'
import { User, Shield, UserMinus, UserPlus, Loader2 } from 'lucide-react'

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
  post_count: number
}

export function AdminUserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [promotingEmail, setPromotingEmail] = useState('')
  const [demotingEmail, setDemotingEmail] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      console.log('🔍 Loading users...')
      
      // First, check if we're authenticated and what our role is
      const { data: userData, error: userError } = await supabase.auth.getUser()
      console.log('👤 Current user:', userData, 'Error:', userError)
      
      if (userError) {
        console.error('❌ Auth error:', userError)
        throw userError
      }
      
      if (!userData.user) {
        console.error('❌ No authenticated user')
        throw new Error('Not authenticated')
      }
      
      // Check our role in the users table
      const { data: roleData, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', userData.user.id)
        .single()
      
      console.log('👑 Our role:', roleData, 'Error:', roleError)
      
      // Direct query instead of RPC function
      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, role, created_at')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('❌ Error fetching users:', error)
        throw error
      }
      
      console.log('✅ Users loaded:', data)
      
      // Get post counts for each user
      const usersWithPostCounts = await Promise.all(
        data.map(async (user: any) => {
          const { count } = await supabase
            .from('blog_posts')
            .select('*', { count: 'exact', head: true })
            .eq('author_id', user.id)
          
          return {
            ...user,
            post_count: count || 0
          }
        })
      )
      
      setUsers(usersWithPostCounts)
    } catch (err) {
      console.error('Error loading users:', err)
      setMessage('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const promoteToAdmin = async (email: string) => {
    if (!email.trim()) return
    
    setActionLoading(true)
    setMessage('')
    
    try {
      console.log('🔍 Promoting user to admin:', email)
      
      // Direct update instead of RPC function
      const { error } = await supabase
        .from('users')
        .update({ role: 'admin', updated_at: new Date().toISOString() })
        .eq('email', email.trim())
      
      if (error) {
        console.error('❌ Error promoting user:', error)
        throw error
      }
      
      setMessage(`Successfully promoted ${email} to admin`)
      setPromotingEmail('')
      await loadUsers() // Refresh the list
    } catch (err) {
      console.error('Error promoting user:', err)
      setMessage('Failed to promote user')
    } finally {
      setActionLoading(false)
    }
  }

  const demoteFromAdmin = async (email: string) => {
    if (!email.trim()) return
    
    setActionLoading(true)
    setMessage('')
    
    try {
      console.log('🔍 Demoting user from admin:', email)
      
      // Direct update instead of RPC function
      const { error } = await supabase
        .from('users')
        .update({ role: 'user', updated_at: new Date().toISOString() })
        .eq('email', email.trim())
      
      if (error) {
        console.error('❌ Error demoting user:', error)
        throw error
      }
      
      setMessage(`Successfully demoted ${email} from admin`)
      setDemotingEmail('')
      await loadUsers() // Refresh the list
    } catch (err) {
      console.error('Error demoting user:', err)
      setMessage('Failed to demote user')
    } finally {
      setActionLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-2 text-gray-600">Loading users...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin User Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <div className={`p-3 rounded-md ${
              message.includes('Successfully') 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {/* Promote User to Admin */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="promote-email">Email to promote to admin</Label>
              <Input
                id="promote-email"
                type="email"
                placeholder="user@example.com"
                value={promotingEmail}
                onChange={(e) => setPromotingEmail(e.target.value)}
              />
            </div>
            <Button
              onClick={() => promoteToAdmin(promotingEmail)}
              disabled={actionLoading || !promotingEmail.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              {actionLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Promote
                </>
              )}
            </Button>
          </div>

          {/* Demote Admin to User */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="demote-email">Email to demote from admin</Label>
              <Input
                id="demote-email"
                type="email"
                placeholder="admin@example.com"
                value={demotingEmail}
                onChange={(e) => setDemotingEmail(e.target.value)}
              />
            </div>
            <Button
              onClick={() => demoteFromAdmin(demotingEmail)}
              disabled={actionLoading || !demotingEmail.trim()}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              {actionLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <UserMinus className="h-4 w-4 mr-2" />
                  Demote
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            All Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.full_name || 'No name'}</span>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {user.email} • {formatDate(user.created_at)} • {user.post_count} posts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
