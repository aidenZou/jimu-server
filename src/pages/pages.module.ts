import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';

@Module({
  providers: [PagesService],
  controllers: [PagesController]
})
export class PagesModule {}
