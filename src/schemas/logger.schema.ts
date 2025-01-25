import { FastifyRequest } from "fastify"

const logger = {
    redact: ['req.headers.authorization'],
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:dd-mm-yyyy HH:MM:ss'
        }
    },
    serializers: {
        req(request: FastifyRequest) {
            return {
                method: request.method,
                url: request.url,
                headers: request.headers,
                host: request.host,
                remoteAddress: request.ip,
                remotePort: request.socket.remotePort
            }
        }
    }
}
export default logger;