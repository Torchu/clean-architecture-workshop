import type { Album } from "../domain/Album";
import type { AlbumsRepository } from "../domain/AlbumsRepository";

export class GetAlbumsByBand {
  constructor(private readonly albumsRepository: AlbumsRepository) {}

  async execute(band: string): Promise<Album[]> {
    return this.albumsRepository.getByBandName(band.trim());
  }
}
