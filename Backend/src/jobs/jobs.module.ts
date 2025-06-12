import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobDescriptionService } from './job-description.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobDescriptionService],
})
export class JobsModule {} 