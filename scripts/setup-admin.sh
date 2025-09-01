#!/bin/bash

echo "Setting up admin account..."
echo
echo "This script will create an admin account with:"
echo "Email: elliot@trendbase.ai"
echo "Password: iajgfhins32\$\$;8!"
echo
echo "Make sure you have:"
echo "1. Added SUPABASE_SERVICE_ROLE_KEY to your .env file"
echo "2. Installed dependencies with: npm install"
echo
read -p "Press Enter to continue..."

node scripts/setup-admin.js
