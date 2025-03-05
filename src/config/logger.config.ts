const logger = {
    redact: ['req.headers.authorization'],
    level: 'info', // nível alterado para info para exibir mais logs
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss'
      }
    }
  };
  
  export default logger;  