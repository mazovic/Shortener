import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { urls } from '../../../db/schema/url.schema';
import { generateShortUrl } from '../../../utils/generateShortUrl';
import { CreateUrlInput } from '../schemas/url.schema';
import { NewUrl, UrlObj } from '../types/url.types';

export class UrlService {
  async createShortUrl(input: CreateUrlInput): Promise<UrlObj> {
    const { originalUrl } = input;

    let shortUrl: string;
    const existingUrls = await db.query.urls.findMany();
    shortUrl = generateShortUrl(existingUrls);

    const newUrl: NewUrl = {
      shortUrl,
      originalUrl,
      visitCount: 0,
      createdAt: new Date(),
      lastVisitedAt: null,
    };

    const [result] = await db.insert(urls).values(newUrl).returning();

    return result;
  }

  async findAll(): Promise<UrlObj[]> {
    return await db.select().from(urls);
  }
}

export const urlService = new UrlService();
