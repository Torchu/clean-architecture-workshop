import type { Album } from "./Album";

export interface AlbumsRepository {
  getByBandName(band: string): Promise<Album[]>;
}
