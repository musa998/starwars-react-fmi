
export type FilmModel = {
  title: string | undefined;
  episode_id?: number;
  opening_crawl: string | undefined;
  director?: string | undefined;
  producer?: string;
  release_date?: Date;
};