# Email Setup Guide for Motzz Laboratory Website

## Overview
The website now uses EmailJS to send real emails when users submit quote requests. This guide will help you set up EmailJS to receive emails at yacinadl@gmail.com.

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" as your email service
4. Connect your Gmail account (yacinadl@gmail.com)
5. Note down the **Service ID** (you'll need this)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Quote Request from Motzz Laboratory Website

**Content:**
```
New Quote Request from Motzz Laboratory Website

Contact Information:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}

Test Details:
Urgency: {{urgency}}
Number of Samples: {{quantity}}
Sample Collection: {{sample_collection}}

Selected Tests:
{{selected_tests}}

Additional Comments:
{{comments}}

---
This email was sent from the Motzz Laboratory website contact form.
```

4. Save the template and note down the **Template ID**

## Step 4: Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** in the API Keys section

## Step 5: Update Website Code
Replace the following placeholders in `script.js`:

1. **Line 444:** Replace `'YOUR_PUBLIC_KEY'` with your actual public key
2. **Line 1407:** Replace `'YOUR_SERVICE_ID'` with your Gmail service ID
3. **Line 1407:** Replace `'YOUR_TEMPLATE_ID'` with your template ID

Example:
```javascript
// Line 444
emailjs.init('user_abc123def456ghi789');

// Line 1407
emailjs.send('service_gmail123', 'template_quote456', templateParams)
```

## Step 6: Test the Setup
1. Open your website
2. Fill out the quote form
3. Submit it
4. Check yacinadl@gmail.com for the email

## Troubleshooting

### If emails don't arrive:
1. Check your Gmail spam folder
2. Verify all IDs are correct in the code
3. Check the browser console for error messages
4. Make sure your Gmail account is properly connected in EmailJS

### If you get errors:
1. Ensure your EmailJS account is verified
2. Check that your service is active
3. Verify the template syntax is correct

## EmailJS Limits (Free Plan)
- 200 emails per month
- 2 email services
- 2 email templates

## Alternative: Contact Form Services
If you prefer not to use EmailJS, you can also use:
- Formspree
- Netlify Forms
- Getform
- FormSubmit

## Support
If you need help setting this up, the EmailJS documentation is available at: https://www.emailjs.com/docs/

---

**Important:** Keep your EmailJS credentials secure and don't share them publicly.





