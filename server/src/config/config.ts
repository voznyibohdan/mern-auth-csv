export const config = {
    api: {
        port: process.env.PORT || 3000,
    },
    db: {
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017',
    },
    jwt: {
        accessToken: {
            secret: process.env.JWT_SECRET || 'secret',
            expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '15m',
        },
        refreshToken: {
            secret: process.env.JWT_REFRESH_SECRET || 'secret',
            expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '30d',
        },
    }
} as const;
