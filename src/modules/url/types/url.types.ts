export interface UrlObj {
  id: string;
  shortUrl: string;
  originalUrl: string;
  visitCount: number;
  createdAt: Date;
  lastVisitedAt?: Date | null;
}

export interface NewUrl {
  shortUrl: string;
  originalUrl: string;
  visitCount: number;
  createdAt: Date;
  lastVisitedAt: Date | null;
}
