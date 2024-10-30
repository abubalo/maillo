import cron from 'node-cron';
import { logger } from '../utils/logger';
import { 
  getSecureImapClient, 
  releaseImapClient, 
  ImapClient 
} from '@/config/imapClient';
import { getUserFromCache } from '../cache/user.cache';
import { Email } from '../types';
import { sendEmail } from '../services/email.service';

interface ScheduledEmail extends Email {
  scheduledDate: Date;
  userId: string;
}

let scheduledEmails: ScheduledEmail[] = [];

export function addScheduledEmail(email: ScheduledEmail) {
  scheduledEmails.push(email);
}

export const scheduleEmailJob = cron.schedule('* * * * *', async () => {
  logger.info('Running scheduled email job');
  const now = new Date();
  
  const emailsToSend = scheduledEmails.filter(
    email => email.scheduledDate <= now
  );
  
  // Remove these emails from the queue
  scheduledEmails = scheduledEmails.filter(
    email => email.scheduledDate > now
  );
  
  for (const email of emailsToSend) {
    try {
      const result = await sendEmail(email.userId, email);
      if (result === true) {
        logger.info(`Successfully sent scheduled email for user ${email.userId}`);
      } else {
        logger.error(`Failed to send scheduled email`, { error: result });
      }
    } catch (error) {
      logger.error('Error processing scheduled email', { error });
    }
  }
});


export const cleanTrashJob = cron.schedule('0 0 * * *', async () => {
  logger.info('Running trash cleanup job');
  
  try {
    // Get all users from cache
    // Note: In production, you might want to get this from a database
    const users = await getAllUsers();
    
    for (const user of users) {
      let imapClient: ImapClient | null = null;
      
      try {
        imapClient = await getSecureImapClient(
          user.id,
          user.email,
          user.password
        );
        
        if (!imapClient) {
          throw new Error('Failed to acquire IMAP client');
        }
        
        const mailboxLock = await imapClient.client.getMailboxLock('Trash', {
          readonly: false
        });
        
        try {
          // Get messages older than 30 days
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          const messages = await imapClient.client.search(
            { before: thirtyDaysAgo },
            { uid: true }
          );
          
          if (messages.length > 0) {
            // Delete messages permanently
            await imapClient.client.messageDelete(messages.map(String));
            logger.info(`Deleted ${messages.length} old messages from trash for user ${user.id}`);
          }
        } finally {
          mailboxLock.release();
        }
      } catch (error) {
        logger.error(`Error cleaning trash for user ${user.id}`, { error });
      } finally {
        if (imapClient) {
          await releaseImapClient(imapClient);
        }
      }
    }
  } catch (error) {
    logger.error('Error in trash cleanup job', { error });
  }
});

// Helper function to get all users (implement based on your user storage)
async function getAllUsers() {
  const user = await getUserFromCache()
  throw new Error('getAllUsers not implemented');
}

export function startEmailCronJobs() {
  scheduleEmailJob.start();
  cleanTrashJob.start();
  logger.info('Email cron jobs started');
}

export function stopEmailCronJobs() {
  scheduleEmailJob.stop();
  cleanTrashJob.stop();
  logger.info('Email cron jobs stopped');
}

