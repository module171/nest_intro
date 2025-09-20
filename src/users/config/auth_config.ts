import { registerAs } from '@nestjs/config';

export default registerAs('authConfig', () => ({
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
}));

