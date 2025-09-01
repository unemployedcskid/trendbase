const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// This script sets up an admin account with the specified credentials
// Run with: node scripts/setup-admin.js

async function setupAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to add this to your .env

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing required environment variables:');
    console.error('- NEXT_PUBLIC_SUPABASE_URL');
    console.error('- SUPABASE_SERVICE_ROLE_KEY');
    console.error('\nTo get the service role key:');
    console.error('1. Go to your Supabase dashboard');
    console.error('2. Navigate to Settings > API');
    console.error('3. Copy the "service_role" key (not the anon key)');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Create the user in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'elliot@trendbase.ai',
      password: 'iajgfhins32$$;8!',
      email_confirm: true,
      user_metadata: {
        full_name: 'Elliot Admin'
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return;
    }

    console.log('Auth user created:', authUser.user.id);

    // Create the corresponding entry in public.users with admin role
    const { data: publicUser, error: publicError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        email: 'elliot@trendbase.ai',
        full_name: 'Elliot Admin',
        role: 'admin'
      })
      .select()
      .single();

    if (publicError) {
      console.error('Error creating public user:', publicError);
      return;
    }

    console.log('Public user created:', publicUser);
    console.log('\n✅ Admin account setup complete!');
    console.log('Email: elliot@trendbase.ai');
    console.log('Password: iajgfhins32$$;8!');
    console.log('Role: admin');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

setupAdmin();
