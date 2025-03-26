interface MeetingRequestEmailProps {
  name: string;
  phone: string;
  preferredDate: string;
  meetingType: "in-person" | "virtual";
  message: string;
}

export function MeetingRequestEmail({
  name,
  phone,
  preferredDate,
  meetingType,
  message,
}: MeetingRequestEmailProps) {
  // Get meeting type badge color
  const meetingTypeColor = meetingType === "in-person" ? "#0891b2" : "#7c3aed";
  const meetingTypeLabel =
    meetingType === "in-person" ? "In-person Visit" : "Virtual Tour";

  // Render the email template as HTML string
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Property Visit Request</title>
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
    
    /* Content */
    .content {
      padding: 32px;
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
    
    /* Meeting type badge */
    .meeting-type-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      background-color: ${meetingTypeColor};
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
      background-color: #fef2f2;
      border: 1px solid #fee2e2;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 24px;
      text-align: center;
    }
    
    .action-title {
      font-size: 18px;
      font-weight: bold;
      color: #b91c1c;
      margin-top: 0;
      margin-bottom: 12px;
    }
    
    .action-text {
      font-size: 14px;
      color: #7f1d1d;
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
  </style>
</head>
<body>
  <div class="container">
    <!-- Header with Logo -->
    
    
    <!-- Banner -->
    <div class="banner">
      <h1 class="banner-title">New Property Visit Request</h1>
      <p class="banner-subtitle">A client has requested to schedule a ${meetingTypeLabel.toLowerCase()}.</p>
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
      </div>
      
      <!-- Meeting Details Card -->
      <div class="card">
        <h2 class="card-title">
          Meeting Details
        </h2>
        <div class="info-row">
          <div class="info-label">Meeting Type:</div>
          <div class="info-value">
            <span class="meeting-type-badge">${meetingTypeLabel}</span>
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">Date & Time:</div>
          <div class="info-value">${preferredDate}</div>
        </div>
      </div>
      
      ${
        message
          ? `
      <!-- Message Card -->
      <div class="card">
        <h2 class="card-title">
          Additional Message
        </h2>
        <p class="message-text">${message}</p>
      </div>
      `
          : ""
      }
      
      <!-- Action Card -->
      <div class="action-card">
        <h2 class="action-title">Action Required</h2>
        <p class="action-text">Please contact the client to confirm the appointment details.</p>
        <a href="tel:${phone}" class="button">Call Client Now</a>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">© ${new Date().getFullYear()} Real Estate Company. All rights reserved.</p>
      <p class="footer-text">This email was sent from the property visit request form.</p>
    </div>
  </div>
</body>
</html>`;
}
