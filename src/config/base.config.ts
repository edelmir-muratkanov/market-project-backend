import { ConfigService } from '@nestjs/config'

export const getBaseConfig = async () => ({
	port: parseInt(process.env.PORT) || 5000
})
