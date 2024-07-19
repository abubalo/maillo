import { Attachment, Email } from "src/types";
const attachments: Attachment[] = [
  {
    id: 1,
    name: "document1.pdf",
    size: 245678,
    type: "application/pdf",
    url: "https://www.example.com/attachments/document1.pdf",
  },
  {
    id: 2,
    name: "image1.jpg",
    size: 345678,
    type: "image/jpeg",
    url: "https://www.example.com/attachments/image1.jpg",
  },
  {
    id: 3,
    name: "spreadsheet1.xlsx",
    size: 145678,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    url: "https://www.example.com/attachments/spreadsheet1.xlsx",
  },
  {
    id: 4,
    name: "presentation1.pptx",
    size: 545678,
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    url: "https://www.example.com/attachments/presentation1.pptx",
  },
  {
    id: 5,
    name: "archive1.zip",
    size: 1045678,
    type: "application/zip",
    url: "https://www.example.com/attachments/archive1.zip",
  },
];

export { attachments };

export const dummyData: Email[] = [
  {
    id: "ayfilrpqn3gl0ba",
    subject: "Weekly Team Meeting",
    sender: "Allan Smith",
    address: "allan.smith@example.com",
    preview: "🎬 Let's discuss our progress this Friday at 2 PM.",
    timestamp: 1689375600,
    isUnread: true,
    isStarred: true,
    isSelected: false,
    isDraft: true,
    isSpam: true,
    isDeleted: false,
    isArchived: false,
    folder: "",
    isPermanentlyDelete: false,
    // labels: ["Work"],
    labels: ["Important"],
    attachments: [
      {
        id: 1,
        name: "proposal.pdf",
        size: 1024,
        url: "path/to/proposal.pdf",
        type: "pdf",
      },
    ],
    cc: ["team.member@example.com"],
    bcc: [],
    body: String.raw`
<!DOCTYPE html>
<html>
<head>
    <title>Weekly Team Meeting</title>
</head>
<body style="width: 100%;  background-color: #177; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; max-width: 100%; border-collapse: collapse;">
        <tr>
            <td style="">
                <table role="presentation" style="width: 600px; background-color: transparent; border-radius: 8px;">
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; line-height: 1.5;">
                                Hi Team,
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                Let's discuss our progress this Friday at 2 PM. Please find the attached proposal document for review before the meeting.
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                Best Regards,<br />
                                John Doe
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding-top: 20px;">
                            <p style="font-size: 14px; color: #999;">&copy; 2024 Company Inc.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,
    inReplyTo: [],
  },
  {
    id: "42yotj5mmrgkc09",

    subject: "New Project Proposal",
    sender: "Jane Smith",
    address: "jane.smith@example.com",
    preview: `📎 I've attached the new project proposal for your review. `,
    timestamp: 1689649200,
    isUnread: false,
    isStarred: false,
    isSelected: false,
    isDraft: false,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
    folder: "",
    isPermanentlyDelete: false,
    labels: ["Important"],
    attachments: [
      {
        id: 2,
        name: "meeting_notes.docx",
        size: 102400, // 100 KB
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        url: "https://example.com/attachments/meeting_notes.docx",
      },
    ],
    cc: [],
    bcc: [],
    body: String.raw`
<!DOCTYPE html>
<html>
<head>
    <title>New Project Proposal</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px;">
                <table role="presentation" style="width: 600px; margin: 0; background-color: transparent; padding: 20px; border-radius: 8px;">
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; line-height: 1.5;">
                                Hi Team,
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                I've attached the new project proposal for your review. Please go through it and let me know your thoughts.
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                Best Regards,<br />
                                Jane Smith
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding-top: 20px;">
                            <p style="font-size: 14px; color: #999;">&copy; 2024 Company Inc.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,
    inReplyTo: [],
  },
  {
    id: "kymu7m1jk9a95v1",

    subject: "Lunch Catch-Up?",
    sender: "Michael Brown",
    address: " michael.brown@example.com",
    preview: "🍉 Hey, are you free for lunch tomorrow? Let me know!",
    timestamp: 1689930000,
    isUnread: true,
    isStarred: false,
    isSelected: false,
    isDraft: true,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
    folder: "",
    isPermanentlyDelete: false,
    labels: ["Personal"],
    attachments: [
      {
        id: 3,
        name: "financial_report.xlsx",
        size: 307200, // 300 KB
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        url: "https://example.com/attachments/financial_report.xlsx",
      },
    ],
    cc: [],
    bcc: [],
    body: String.raw`
<!DOCTYPE html>
<html>
<head>
    <title>Lunch Catch-Up?</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px;">
                <table role="presentation" style="width: 600px; background-color: transparent; padding: 20px; border-radius: 8px;">
                   
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; line-height: 1.5;">
                                Hey,
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                Are you free for lunch tomorrow? Let me know!
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                Best,<br />
                                Michael Brown
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding-top: 20px;">
                            <p style="font-size: 14px; color: #999;">&copy; 2024 Company Inc.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,

    inReplyTo: [],
  },
  {
    id: "01st58rinulkb0d",

    subject: "Quarterly Financial Report",
    sender: "Emily White",
    address: "emily.white@example.com",
    preview: "💵 The quarterly financial report is ready for review.",
    timestamp: 1690214400,
    isUnread: true,
    isStarred: false,
    isSelected: false,
    isDraft: false,
    isSpam: true,
    isDeleted: false,
    isArchived: false,
    folder: "",
    isPermanentlyDelete: false,
    labels: ["Finance"],
    attachments: [
      {
        id: 4,
        name: "logo.png",
        size: 51200, // 50 KB
        type: "image/png",
        url: "https://example.com/attachments/logo.png",
      },
    ],
    cc: ["finance.team@example.com"],
    bcc: [],
    body: String.raw`
<!DOCTYPE html>
<html>
<head>
    <title>Quarterly Financial Report</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px;">
                <table role="presentation" style="width: 600px; background-color: transparent; padding: 20px; border-radius: 8px;">
                    
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; line-height: 1.5;">
                                Hi Team,
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                The quarterly financial report is ready for review. Please find the attached document and go through it before our next meeting.
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                Best Regards,<br />
                                Emily White
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding-top: 20px;">
                            <p style="font-size: 14px; color: #999;">&copy; 2024 Company Inc.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,

    inReplyTo: [],
  },
  {
    id: "jyzjw49pqmuiy4k",
    subject: "Project Deadline Extension",
    sender: "David Green",
    address: "david.green@example.com",
    preview: "📅 The project deadline has been extended to next Friday.",
    timestamp: 1690300800,
    isUnread: true,
    isStarred: true,
    isSelected: false,
    isDraft: false,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
    folder: "",
    isPermanentlyDelete: false,
    labels: ["Work"],
    attachments: [
      {
        id: 5,
        name: "notes.txt",
        size: 1024,
        url: "path/to/notes.txt",
        type: "text/plain",
      },
    ],
    cc: [],
    bcc: [],
    body: String.raw`
<!DOCTYPE
folder: "", html>
<html>
<head>
    <title>Project Deadline Extension</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px;">
                <table role="presentation" style="width: 600px; background-color: transparent; border-radius: 8px;">
                   
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; line-height: 1.5;">
                                Hi Team,
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                The project deadline has been extended to next Friday. Please make sure to finalize your tasks by then.
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                Best Regards,<br />
                                David Green
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding-top: 20px;">
                            <p style="font-size: 14px; color: #999;">&copy; 2024 Company Inc.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,
    inReplyTo: [],
  },

  {
    id: "6zcrw19q9jonuxb",
    subject: "Monthly Newsletter - July Edition",
    sender: "newsletter@fakemail.com",
    address: "newsletter@fakemail.com",
    preview: "Catch up with the latest updates and stories...",
    timestamp: Date.now() - 86400000,
    isUnread: true,
    isStarred: false,
    isSelected: false,
    isDraft: false,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
    folder: "",
    isPermanentlyDelete: false,
    labels: ["Newsletter"],
    body: `
      <ht
      folder: "",ml>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .header { background-color: #f2f2f2; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f2f2f2; padding: 10px; text-align: center; font-size: 12px; }
          h1 { color: #333; }
          p { color: #555; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Monthly Newsletter - July Edition</h1>
        </div>
        <div class="content">
          <p>Dear Subscriber,</p>
          <p>Welcome to our July newsletter! Here are the latest updates and stories from our community:</p>
          <ul>
            <li><strong>New Feature:</strong> Check out our new project management tool!</li>
            <li><strong>Blog Highlight:</strong> How to stay productive while working from home.</li>
            <li><strong>Upcoming Events:</strong> Join us for our summer webinar series.</li>
          </ul>
          <p>Stay tuned for more exciting news next month!</p>
          <p>Best Regards,<br>The FakeMail Team</p>
          <img src="https://source.unsplash.com/800x400/?newsletter" alt="Newsletter Image" />
        </div>
        <div class="footer">
          <p>If you no longer wish to receive these emails, you can <a href="#">unsubscribe</a> at any time.</p>
        </div>
      </body>
      </html>
    `,
    inReplyTo: [],
  },
  {
    id: "n7839dnmjs828ud8",
    subject: "Special Promotion - 50% Off!",
    sender: "promo@fakestore.com",
    address: "promo@fakestore.com",
    preview: "Don't miss out on our exclusive offer...",
    timestamp: Date.now() - 43200000,
    isUnread: true,
    isStarred: false,
    isSelected: false,
    isDraft: false,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
    folder: "",
    isPermanentlyDelete: false,
    labels: ["Promotions"],
    body: `
      <ht
      folder: "",ml>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #fff; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; }
          .header { background-color: #ff9800; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .button { display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #ff9800; text-align: center; text-decoration: none; border-radius: 5px; }
          .footer { text-align: center; font-size: 12px; color: #555; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Special Promotion - 50% Off!</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>We are excited to offer you an exclusive 50% discount on all our products. Don't miss out!</p>
            <a href="https://fakestore.com/promo" class="button" target="_blank">Shop Now</a>
            <p>Offer valid until the end of the month.</p>
            <p>Happy Shopping,<br>The FakeStore Team</p>
            <img src="https://source.unsplash.com/800x400/?sale" alt="Sale Image" />
          </div>
          <div class="footer">
            <p>If you no longer wish to receive these emails, you can <a href="#">unsubscribe</a> at any time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    inReplyTo: [],
  },
  {
    id: "j77884k72wjukkt",
    subject: "You're Invited: Annual Company Gala",
    sender: "events@fakecorp.com",
    address: "events@fakecorp.com",
    preview: "Join us for an evening of celebration and networking...",
    timestamp: Date.now() - 7200000,
    isUnread: true,
    isStarred: true,
    isSelected: false,
    isDraft: false,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
    folder: "",
    isPermanentlyDelete: false,
    labels: ["Events"],
    body: `
      <ht
      folder: "",ml>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f2f2f2; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; }
          .header { background-color: #333; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #333; color: white; padding: 10px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>You're Invited: Annual Company Gala</h1>
          </div>
          <div class="content">
            <p>Dear Valued Partner,</p>
            <p>We are thrilled to invite you to our Annual Company Gala. Join us for an evening of celebration and networking with industry leaders.</p>
            <p><strong>Date:</strong> August 15, 2024<br>
            <strong>Time:</strong> 7:00 PM - 11:00 PM<br>
            <strong>Venue:</strong> Grand Ballroom, FakeCorp Headquarters</p>
            <p>Please RSVP by clicking the link below:</p>
            <p><a href="https://fakecorp.com/rsvp" target="_blank">RSVP Now</a></p>
            <p>We look forward to seeing you there!</p>
            <p>Sincerely,<br>The FakeCorp Events Team</p>
            <img src="https://source.unsplash.com/800x400/?event" alt="Event Image" />
          </div>
          <div class="footer">
            <p>If you no longer wish to receive these emails, you can <a href="#">unsubscribe</a> at any time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    inReplyTo: [],
  },
  {
    id: "oitfpjhmq01fdzd",
    subject: "Important: Service Update Notification",
    sender: "support@fakeapp.com",
    address: "support@fakeapp.com",
    preview: "We are making some updates to improve your experience...",
    timestamp: Date.now() - 3600000,
    isUnread: false,
    isStarred: false,
    isSelected: false,
    isDraft: false,
    isSpam: false,
    isDeleted: false,
    isArchived: true,
    folder: "",
    isPermanentlyDelete: false,
    labels: ["Updates"],
    body: `
      <ht
      folder: "",ml>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f2f2f2; padding: 10px; text-align: center; font-size: 12px; }
          h1 { color: #007bff; }
          p { color: #333; }
          ul { list-style-type: square; margin: 0; padding: 0 0 0 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Important: Service Update Notification</h1>
        </div>
        <div class="content">
          <p>Dear User,</p>
          <p>We are making some updates to improve your experience with our service. These changes will take effect on July 20, 2024.</p>
          <p>What's New:</p>
          <ul>
            <li>Enhanced security features</li>
            <li>Improved user interface</li>
            <li>Faster load times</li>
          </ul>
          <p>If you have any questions or concerns, please feel free to reach out to our support team.</p>
          <p>Thank you for your continued support.</p>
          <p>Best Regards,<br>The FakeApp Support Team</p>
        </div>
        <div class="footer">
          <p>If you no longer wish to receive these emails, you can <a href="#">unsubscribe</a> at any time.</p>
        </div>
      </body>
      </html>
    `,
    inReplyTo: [],
  },
  {
    id: "olh75ue3sumxe4m",
    subject: "Catching Up!",
    sender: "jane.doe@fakemail.com",
    address: "jane.doe@fakemail.com",
    preview: "Hey, it's been a while since we last talked...",
    timestamp: Date.now() - 10800000,
    isUnread: true,
    isStarred: true,
    isSelected: false,
    isDraft: false,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
    folder: "",
    isPermanentlyDelete: false,
    // labels: ["Personal"],
    labels: ["Important"],
    body: `
      <ht
      folder: "",ml>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { padding: 20px; }
          h1 { color: #333; }
          p { color: #555; }
          .signature { margin-top: 20px; font-style: italic; color: #333; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Catching Up!</h1>
          <p>Hey,</p>
          <p>It's been a while since we last talked. How have you been? I've been quite busy with work, but I wanted to take some time to catch up with you.</p>
          <p>Let me know if you're free to grab a coffee sometime next week.</p>
          <p>Looking forward to hearing from you!</p>
          <p class="signature">Best,<br>Jane</p>
          <img src="https://source.unsplash.com/800x400/?coffee" alt="Coffee Image" />
        </div>
      </body>
      </html>
    `,
    attachments: [
      {
        id: 5,
        name: "archive1.zip",
        size: 1045678,
        type: "application/zip",
        url: "https://www.example.com/attachments/archive1.zip",
      },
    ],
    inReplyTo: [],
  },
];
