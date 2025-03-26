interface ContactFormEmailProps {
  name: string;
  phone: string;
  location: string;
  message: string;
}

export function ContactFormEmail({
  name,
  phone,
  location,
  message,
}: ContactFormEmailProps) {
  // Render the email template as HTML string
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    /* Base styles */
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      background-color: #f8fafc;
      color: #334155;
      line-height: 1.5;
    }
    
    /* Container */
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    /* Header */
    .header {
      background-color: #013344;
      padding: 24px 0;
      text-align: center;
    }
    
    .logo {
      width: 200px;
      height: auto;
      margin: 0 auto;
    }
    
    /* Content */
    .content {
      padding: 32px;
    }
    
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #013344;
      margin-top: 0;
      margin-bottom: 24px;
      text-align: center;
    }
    
    /* Card */
    .card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 24px;
    }
    
    .card-title {
      font-size: 18px;
      font-weight: bold;
      color: #013344;
      margin-top: 0;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
    }
    
    .card-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    
    /* Info row */
    .info-row {
      display: flex;
      margin-bottom: 12px;
    }
    
    .info-label {
      width: 30%;
      font-size: 14px;
      font-weight: bold;
      color: #64748b;
    }
    
    .info-value {
      width: 70%;
      font-size: 14px;
      color: #334155;
    }
    
    /* Message */
    .message-text {
      font-size: 14px;
      color: #334155;
      line-height: 1.6;
      margin: 0;
    }
    
    /* Action */
    .action-card {
      background-color: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 24px;
      text-align: center;
    }
    
    .action-title {
      font-size: 18px;
      font-weight: bold;
      color: #0369a1;
      margin-top: 0;
      margin-bottom: 12px;
    }
    
    .action-text {
      font-size: 14px;
      color: #0c4a6e;
      margin: 0 0 20px;
    }
    
    .button {
      display: inline-block;
      background-color: #013344;
      color: #ffffff;
      font-size: 14px;
      font-weight: bold;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
    }
    
    /* Footer */
    .footer {
      background-color: #f1f5f9;
      padding: 20px;
      text-align: center;
    }
    
    .footer-text {
      font-size: 12px;
      color: #64748b;
      margin: 4px 0;
    }

        /* Banner */
    .banner {
      background-color: #0c4a6e;
      padding: 30px;
      text-align: center;
    }
    
    .banner-title {
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      margin: 0 0 12px;
    }
    
    .banner-subtitle {
      font-size: 16px;
      color: #e0f2fe;
      margin: 0;
    }
      .email-container {
        background-color: #f8fafc;
        padding: 0px;
        text-align: center;

      }
  </style>
</head>
<body>
<div class="email-container">
  <div class="container">
     <!-- Banner -->
    <div class="banner">
      <h1 class="banner-title">New Request</h1>
      <p class="banner-subtitle">New Contact Form Submission </p>
    </div>


    <!-- Content -->
    <div class="content">
      <!-- Client Info Card -->
      <div class="card">
        <h2 class="card-title">
          Client Information
        </h2>
        <div class="info-row">
          <div class="info-label">Name:</div>
          <div class="info-value">${name}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Phone:</div>
          <div class="info-value">${phone}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Location:</div>
          <div class="info-value">${location}</div>
        </div>
      </div>
      
      <!-- Message Card -->
      <div class="card">
        <h2 class="card-title">
          Client Message
        </h2>
        <p class="message-text">${message}</p>
      </div>
      
      <!-- Action Card -->
      <div class="action-card">
        <h2 class="action-title">Action Required</h2>
        <p class="action-text">Please contact the client to discuss their inquiry.</p>
        <a href="tel:${phone}" class="button">Call Client Now</a>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">© ${new Date().getFullYear()} Real Estate Company. All rights reserved.</p>
      <p class="footer-text">This email was sent from the contact form.</p>
    </div>
  </div>
   </div>
</body>
</html>`;
}
