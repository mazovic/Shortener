import { Request, Response, NextFunction } from 'express';
import { urlService } from '../services/url.service';

export class UrlController {
  async createShortUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const shortUrl = await urlService.createShortUrl(req.body);
      res.status(201).json({
        status: 'success',
        data: shortUrl,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const urls = await urlService.findAll();
      res.status(201).json({
        status: 'success',
        data: urls,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const urlController = new UrlController();
