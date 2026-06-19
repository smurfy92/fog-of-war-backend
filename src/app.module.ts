import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LocationsModule } from './locations/locations.module';
import { User } from './users/user.entity';
import { Location } from './locations/location.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER ?? 'postgres',
      password: process.env.DATABASE_PASSWORD ?? 'postgres',
      database: process.env.DATABASE_NAME ?? 'fog_of_war',
      entities: [User, Location],
      // NEVER enable in production: schema auto-sync can cause data loss.
      // Defaults to false. Opt-in for local dev only via DB_SYNC=true.
      // In production, manage the schema with TypeORM migrations instead.
      synchronize: process.env.DB_SYNC === 'true',
    }),
    // Global rate limiting: 100 requests / 60s per IP by default.
    // Sensitive auth routes are throttled more aggressively at the controller.
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 100,
      },
    ]),
    UsersModule,
    AuthModule,
    LocationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
