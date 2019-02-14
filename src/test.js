const LogService = require('./index')

const logger = new LogService({ label: 'test', minLevel: 'info', silent: false })

logger.log('log', 'message')
logger.debug('debug', 'message')
logger.info('info', 'message')
logger.warn('warn', 'message')
logger.error('error', 'message')
