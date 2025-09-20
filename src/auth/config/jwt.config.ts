import { registerAs } from '@nestjs/config';

export default registerAs('jwtConfig', () => ({
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    audience: process.env.JWT_TOKEN_AUDIENCE || 'localhost:3000',
    issuer: process.env.JWT_TOKEN_ISSUER || 'localhost:3000',
    accessTokenTtl : parseInt(process.env.JWT_ACCESS_TOKEN_TTL || '3600', 10),
    refreshTokenTtl : parseInt(process.env.JWT_REFRESH_TOKEN_TTL || '86400', 10),
    googleClientId: process.env.GOOGLE_CLIENT_ID || 'google_client_id',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || 'google_client_secret',
}));
