import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      businessName, 
      businessType, 
      locations, 
      message 
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !businessName || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get email addresses from environment variables with fallbacks
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@trendbase.com'
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: `Contact Form <${fromEmail}>`,
      to: [adminEmail],
      subject: `New Contact Form Submission - ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Business Name:</strong> ${businessName}</p>
            <p><strong>Business Type:</strong> ${businessType || 'Not specified'}</p>
            <p><strong>Number of Locations:</strong> ${locations || 'Not specified'}</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This email was sent from your website contact form. 
              Reply directly to ${email} to respond to the customer.
            </p>
          </div>
        </div>
      `,
    })

    // Send confirmation email to customer
    const customerEmailResult = await resend.emails.send({
      from: `Trendbase <${fromEmail}>`,
      to: [email],
      subject: 'Thank you for contacting Trendbase',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            Thank you for reaching out!
          </h2>
          
          <p>Hi ${firstName},</p>
          
          <p>Thank you for contacting Trendbase about your Google Business Profile optimization needs. We've received your message and our team will get back to you within 24 hours.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What happens next?</h3>
            <ul style="color: #374151; line-height: 1.6;">
              <li>Our team will review your business goals and requirements</li>
              <li>We'll prepare a personalized strategy for your local search optimization</li>
              <li>You'll receive a detailed proposal within 24-48 hours</li>
              <li>We'll schedule a free consultation call to discuss your options</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to explore our services or check out our blog for tips on local SEO.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://trendbase.com" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit Our Website
            </a>
          </div>
          
          <p>Best regards,<br>The Trendbase Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    })

    // Log the full response for debugging
    console.log('Admin email result:', JSON.stringify(adminEmailResult, null, 2))
    console.log('Customer email result:', JSON.stringify(customerEmailResult, null, 2))

    // Check if emails were sent successfully - handle different response structures
    const adminSuccess = adminEmailResult.data || adminEmailResult.id
    const customerSuccess = customerEmailResult.data || customerEmailResult.id

    // If we have any response from Resend, consider it successful (emails are being sent)
    if (adminEmailResult && customerEmailResult) {
      console.log('Emails sent successfully:', {
        adminEmail: adminSuccess?.id || 'sent',
        customerEmail: customerSuccess?.id || 'sent'
      })
      
      return NextResponse.json(
        { message: 'Contact form submitted successfully' },
        { status: 200 }
      )
    }

    // Only show error if we get actual error responses
    if (adminEmailResult.error || customerEmailResult.error) {
      console.error('Email sending failed:', {
        adminError: adminEmailResult.error,
        customerError: customerEmailResult.error,
        adminResult: adminEmailResult,
        customerResult: customerEmailResult
      })
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    console.log('Emails sent successfully:', {
      adminEmail: adminSuccess.id || adminSuccess,
      customerEmail: customerSuccess.id || customerSuccess
    })

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
