import { UrlObj } from '../modules/url/types/url.types';

export function generateShortUrl(existingUrls: UrlObj[]): string {
  const length = 6;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const existingSet = new Set(existingUrls.map(url => url.shortUrl));

  let result = '';
  let isUnique = false;

  while (!isUnique) {
    result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    if (!existingSet.has(result)) {
      isUnique = true;
    }
  }

  return result;
}
