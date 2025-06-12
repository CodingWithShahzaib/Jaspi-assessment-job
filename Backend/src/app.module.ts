import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, JobsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
