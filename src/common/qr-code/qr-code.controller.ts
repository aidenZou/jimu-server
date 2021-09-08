import { Controller, Get, Query, Res } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { Response } from 'express';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}
  @Get()
  async getQrCode(@Query('url') url: string, @Res() res: Response) {
    this.qrCodeService.getQrCode(url, res);
  }
}
