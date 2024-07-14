export const data = [
  {
    id: 1,
    subject: "Weekly Team Meeting",
    sender: "John Doe",
    address: "john.doe@example.com",
    preview: "🎬 Let's discuss our progress this Friday at 2 PM.",
    timestamp: 1689375600,
    isUnread: true,
    isStarred: true,
    isSelected: false,
    detailUrl: "dnhsjkbbdhd",
    isDraft: true,
    isSpam: true,
    isDeleted: false,
    isArchived: false,
    labels: ["Work"],
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
            <td style="padding: 20px; background-color: #f4f4f4;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                    <tr>
                        <td style="text-align: center; padding-bottom: 20px;">
                            <h1 style="font-size: 24px; color: #333;">Weekly Team Meeting</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                Hi Team,
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                Let's discuss our progress this Friday at 2 PM. Please find the attached proposal document for review before the meeting.
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
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
    id: 2,
    subject: "New Project Proposal",
    sender: "Jane Smith",
    address: "jane.smith@example.com",
    preview: `📎 I've attached the new project proposal for your review. `,
    timestamp: 1689649200,
    isUnread: false,
    isStarred: false,
    isSelected: false,
    detailUrl: "dckjshbmkshhdoo",
    isDraft: false,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
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
            <td style="padding: 20px; background-color: #f4f4f4;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                    <tr>
                        <td style="text-align: center; padding-bottom: 20px;">
                            <h1 style="font-size: 24px; color: #333;">New Project Proposal</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                Hi Team,
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                I've attached the new project proposal for your review. Please go through it and let me know your thoughts.
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
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
    id: 3,
    subject: "Lunch Catch-Up?",
    sender: "Michael Brown",
    address: " michael.brown@example.com",
    preview: "🍉 Hey, are you free for lunch tomorrow? Let me know!",
    timestamp: 1689930000,
    isUnread: true,
    isStarred: false,
    isSelected: false,
    detailUrl: "klshdfhsdlf",
    isDraft: true,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
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
            <td style="padding: 20px; background-color: #f4f4f4;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                    <tr>
                        <td style="text-align: center; padding-bottom: 20px;">
                            <h1 style="font-size: 24px; color: #333;">Lunch Catch-Up?</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                Hey,
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                Are you free for lunch tomorrow? Let me know!
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
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
    id: 4,
    subject: "Quarterly Financial Report",
    sender: "Emily White",
    address: "emily.white@example.com",
    preview: "💵 The quarterly financial report is ready for review.",
    timestamp: 1690214400,
    isUnread: true,
    isStarred: false,
    isSelected: false,
    detailUrl: "aslkdfjwelk",
    isDraft: false,
    isSpam: true,
    isDeleted: true,
    isArchived: false,
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
            <td style="padding: 20px; background-color: #f4f4f4;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                    <tr>
                        <td style="text-align: center; padding-bottom: 20px;">
                            <h1 style="font-size: 24px; color: #333;">Quarterly Financial Report</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                Hi Team,
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                The quarterly financial report is ready for review. Please find the attached document and go through it before our next meeting.
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
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
    id: 5,
    subject: "Project Deadline Extension",
    sender: "David Green",
    address: "david.green@example.com",
    preview: "📅 The project deadline has been extended to next Friday.",
    timestamp: 1690300800,
    isUnread: true,
    isStarred: true,
    isSelected: false,
    detailUrl: "fkdlfksjdfl",
    isDraft: false,
    isSpam: false,
    isDeleted: false,
    isArchived: false,
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
<!DOCTYPE html>
<html>
<head>
    <title>Project Deadline Extension</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px; background-color: #f4f4f4;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                    <tr>
                        <td style="text-align: center; padding-bottom: 20px;">
                            <h1 style="font-size: 24px; color: #333;">Project Deadline Extension</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                Hi Team,
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
                                The project deadline has been extended to next Friday. Please make sure to finalize your tasks by then.
                            </p>
                            <p style="font-size: 16px; color: #666; line-height: 1.5;">
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
];
