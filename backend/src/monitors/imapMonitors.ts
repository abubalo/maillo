import { EventEmitter } from 'events';
import { logger } from '../utils/logger';
import { ImapConnectionPool } from '@/config/imapClient';

class ImapPoolMonitor extends EventEmitter {
  private pool: ImapConnectionPool;
  private metricsInterval: NodeJS.Timeout | null = null;
  private metrics: {
    activeConnections: number;
    waitingClients: number;
    availableConnections: number;
    maxConnections: number;
    createdConnections: number;
    destroyedConnections: number;
    errorCount: number;
  };

  constructor(pool: ImapConnectionPool) {
    super();
    this.pool = pool;
    this.metrics = {
      activeConnections: 0,
      waitingClients: 0,
      availableConnections: 0,
      maxConnections: 0,
      createdConnections: 0,
      destroyedConnections: 0,
      errorCount: 0,
    };

    this.setupListeners();
  }

  private setupListeners() {
    this.pool.on('factoryCreateError', (err) => {
      this.metrics.errorCount++;
      logger.error('IMAP connection creation error', { error: err });
      this.emit('error', err);
    });

    this.pool.on('factoryDestroyError', (err) => {
      this.metrics.errorCount++;
      logger.error('IMAP connection destruction error', { error: err });
      this.emit('error', err);
    });

    this.pool.on('create', () => {
      this.metrics.createdConnections++;
    });

    this.pool.on('destroy', () => {
      this.metrics.destroyedConnections++;
    });
  }

  startMonitoring(interval: number = 60000) { // Default to every minute
    this.metricsInterval = setInterval(() => {
      this.updateMetrics();
      this.logMetrics();
      this.checkThresholds();
    }, interval);
  }

  stopMonitoring() {
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
      this.metricsInterval = null;
    }
  }

  private updateMetrics() {
    const poolStats = this.pool.getPoolStats();
    this.metrics.activeConnections = poolStats.numUsed;
    this.metrics.waitingClients = poolStats.numWaitingClients;
    this.metrics.availableConnections = poolStats.numFree;
    this.metrics.maxConnections = poolStats.max;
  }

  private logMetrics() {
    logger.info('IMAP Connection Pool Metrics', { metrics: this.metrics });
  }

  private checkThresholds() {
    const utilizationRate = this.metrics.activeConnections / this.metrics.maxConnections;
    if (utilizationRate > 0.8) {
      logger.warn('High IMAP connection pool utilization', { utilizationRate });
      this.emit('highUtilization', utilizationRate);
    }

    if (this.metrics.waitingClients > 5) {
      logger.warn('High number of waiting clients for IMAP connections', { waitingClients: this.metrics.waitingClients });
      this.emit('highWaitingClients', this.metrics.waitingClients);
    }

    if (this.metrics.errorCount > 10) {
      logger.error('High error count in IMAP connection pool', { errorCount: this.metrics.errorCount });
      this.emit('highErrorCount', this.metrics.errorCount);
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }
}

// Usage
const imapPool = new ImapConnectionPool();
const monitor = new ImapPoolMonitor(imapPool);

monitor.startMonitoring();

monitor.on('highUtilization', (rate) => {
  // Consider increasing pool size or optimizing connection usage
});

monitor.on('highWaitingClients', (count) => {
  // Consider increasing pool size or investigating bottlenecks
});

monitor.on('highErrorCount', (count) => {
  // Investigate and address recurring errors
});

export { ImapPoolMonitor };