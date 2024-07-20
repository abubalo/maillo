# Maillo

This project is an attempt to build a simple Email service similar to Gmail. It offers capabilities such as creating a custom email address (johndoe@maillo.dev), sending and receiving emails in the inbox, spam filtering, and more.

## Main Features

- User authentication and registration
- Custom email addresses like johndoe@maillo.dev
- Compose, draft, send, star, delete, and receive emails
- Email organization (folders, labels, filters)
- Full-text search and indexing
- Email encryption and security
- Spam filtering 

## Main technologies used

To achieve this goal, several components need to be in place:

- DNS Configuration: Setting up MX (Mail Exchanger) records for the maillo.dev domain pointing to the Maillo server. Setting up SPF, DKIM, and DMARC records for better deliverability and security.
- Postfix: Configured as an MTA (Mail Transfer Agent) to accept emails for the maillo.dev domain and deliver them to Dovecot.
- Dovecot: Used for email storage and querying.
- Express.js: Powers the backend server.
- PostgreSQL: Handles user database management.
- IMAP client: Interacts with Dovecot for email retrieval and management.
- Docker: Used for containerization of the application components.

## Project Status

This is an exploratory project, aimed at understanding the intricacies of building an email service from the ground up. It's a work in progress, and features are being implemented and tested incrementally.

<!-- ## Getting Started

(Instructions for setting up the project locally will be added as the project progresses.) -->

<!-- ## Contributing

As this is an exploratory project, contributions, suggestions, and discussions are welcome. Please open an issue or submit a pull request if you'd like to contribute.

## Disclaimer

This project is for educational and experimental purposes. It's not intended for production use at this stage. -->