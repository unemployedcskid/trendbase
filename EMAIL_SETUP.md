# Email Setup Guide for Contact Form

## Prerequisites

1. **Resend Account**: Sign up at [resend.com](https://resend.com)
2. **Domain Verification**: Verify your domain with Resend for sending emails

## Setup Steps

### 1. Install Dependencies
```bash
npm install resend
```

### 2. Environment Variables
Create a `.env.local` file in your project root with:

```env
# Resend API Key for sending emails
RESEND_API_KEY=your_resend_api_key_here

# Update these email addresses
ADMIN_EMAIL=admin@trendbase.com
FROM_EMAIL=noreply@yourdomain.com
```

### 3. Get Your Resend API Key
1. Go to [resend.com](https://resend.com)
2. Sign up/Login to your account
3. Go to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env.local` file

### 4. Update Email Addresses
In the `.env.local` file, update:
- `ADMIN_EMAIL`: Your email where you want to receive contact form notifications
- `FROM_EMAIL`: The email address that will appear as the sender (must be verified with Resend)

### 5. Domain Verification
1. In Resend dashboard, go to Domains
2. Add your domain (e.g., `yourdomain.com`)
3. Follow the DNS verification steps
4. Wait for verification (usually takes a few minutes)

## How It Works

1. **User submits contact form** → Form data is sent to `/api/contact`
2. **Admin notification email** → Sent to your admin email with all form details
3. **Customer confirmation email** → Sent to the person who filled out the form
4. **Form validation** → Required fields are checked before sending

## Email Templates

The system sends two emails:

### Admin Notification Email
- Subject: "New Contact Form Submission - [Business Name]"
- Contains: All form data, contact information, and message
- Purpose: Immediate notification of new leads

### Customer Confirmation Email
- Subject: "Thank you for contacting Trendbase"
- Contains: Confirmation message and next steps
- Purpose: Professional follow-up and expectation setting

## Customization

You can customize the email templates by editing:
- `app/api/contact/route.ts` - Email content and styling
- `app/contact/page.tsx` - Form fields and validation

## Testing

1. Fill out the contact form on your website
2. Check your admin email for the notification
3. Check the customer email for the confirmation
4. Verify all form data is captured correctly

## Troubleshooting

- **Emails not sending**: Check your Resend API key and domain verification
- **Form not working**: Check browser console for errors
- **Validation issues**: Ensure all required fields are filled

## Security Notes

- The API key is stored in environment variables (never commit to git)
- Form validation happens on both client and server side
- Rate limiting can be added to prevent spam
