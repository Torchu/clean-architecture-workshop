import type { Album } from "../domain/Album";
import type { ProviderAAlbumsRepository } from "../infrastructure/ProviderAAlbumsRepository";

export class GetAlbumsByBand {
  constructor(private readonly albumsRepository: ProviderAAlbumsRepository) {}

  async execute(band: string): Promise<Album[]> {
    const response = await this.albumsRepository.getByBandName(band.trim());
    return response.records.map((record) => ({
      name: record.album_title,
      author: record.contributing_artist,
      year: new Date(record.released_at).getUTCFullYear(),
    }));
  }
}
