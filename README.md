# Maillo

This project is an attempt to build a simple email service similar to Gmail, with the goal of understanding the underlying architecture of how email works. The aim is to create a lightweight email service that offers core functionalities such as custom email addresses (e.g., johndoe@maillo.dev), sending and receiving emails, managing an inbox, implementing spam filtering, and more.

This project explores various components and protocols that make up a modern email system. This project serves as a practical way to learn about email server configuration, message transfer agents, storage solutions, and the apsect of email protocols like SMTP, IMAP, and POP3.

## Main Features

- User authentication and registration
- Custom email addresses like johndoe@maillo.dev
- Compose, draft, send, star, archive, delete, and receive emails.
- Email organization (folders, labels, filters)
- Full-text search and indexing.
- Email encryption and security.
- Spam emails clasification.

## Main technologies used

Maillo leverages a carefully selected suite of technologies to create a comprehensive email ecosystem:

- Domain: maillo.dev
- DNS Configuration: Setting up MX (Mail Exchanger) records for the maillo.dev domain pointing to the Maillo server. Setting up SPF, DKIM, and DMARC records for better deliverability and security.
- Postfix: Configured as an MTA (Mail Transfer Agent) to accept emails for the maillo.dev domain and deliver them to Dovecot.
- Dovecot: Used for email storage and querying.
- Express.js: Powers the backend server.
- MongoDB: Handles user database management.
- IMAP client: Imapflow interacts with Dovecot for email retrieval and management.
- AWS EC2: Used for production server and postfix and Dovecot configuration.
- React.js: For user interface
- Redis: For caching frequently accessed data like search inboxes, results, and more

## Getting Started

(Instructions for setting up the project locally will be added as the project progresses.)

## Project Status

This is an exploratory project, aimed at understanding the intricacies of building an email service from the ground up. It's a work in progress, and features are being implemented and tested incrementally.

## Contribution

As this is an exploratory project, contributions, suggestions, and discussions are welcome. Please open an issue or submit a pull request if you'd like to contribute.
Have an idea or suggestions that can improvement the existing implementation? Feel free to open PR


## Disclaimer

This project is for educational and experimental purposes. It's not intended for production use at this stage. -->

## License

This project is licensed uder [Apache License](/LICENSE). license.
