class MailloError extends Error {
    constructor(message: string, public code?: string) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class ImapError extends MailloError {
    constructor(message: string, public imapCode?: string) {
      super(message, 'IMAP_ERROR');
      this.imapCode = imapCode;
    }
  }
  
  export class WebSocketError extends MailloError {
    constructor(message: string, public wsCode?: number) {
      super(message, 'WEBSOCKET_ERROR');
      this.wsCode = wsCode;
    }
  }
  
  export class RedisError extends MailloError {
    constructor(message: string, public redisCommand?: string) {
      super(message, 'REDIS_ERROR');
      this.redisCommand = redisCommand;
    }
  }
  
  export class MailloServiceError extends MailloError {
    constructor(message: string, public serviceType?: string) {
      super(message, 'MAILLO_SERVICE_ERROR');
      this.serviceType = serviceType;
    }
  }
  
  export class AttachmentError extends MailloError {
    constructor(message: string, public attachmentId?: string) {
      super(message, 'ATTACHMENT_ERROR');
      this.attachmentId = attachmentId;
    }
  }
  
  export { MailloError };
  