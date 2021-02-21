import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as QrCode from 'qr-image';

@Injectable()
export class QrCodeService {
  async getQrCode(url: string, res: Response) {
    const erCode = QrCode.image(url, { type: 'png' });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    erCode.pipe(res);
  }
}
