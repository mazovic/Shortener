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
      res.status(200).json({
        status: 'success',
        data: urls,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByShortUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { shortUrl } = req.params;
      const url = await urlService.findByShortUrl(shortUrl);

      if (!url) {
        res.status(404).json({
          status: 'error',
          message: 'URL not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: url,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const urlController = new UrlController();
