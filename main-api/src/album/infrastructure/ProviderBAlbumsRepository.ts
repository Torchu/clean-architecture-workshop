import type { Album } from "../domain/Album";
import type { AlbumsRepository } from "../domain/AlbumsRepository";

export class ProviderBAlbumsRepository implements AlbumsRepository {
  private readonly baseUrl = new URL("http://localhost:3002");
  constructor() {}

  async getByBandName(band: string): Promise<Album[]> {
    const safeBand = encodeURIComponent(band);
    const url = new URL(`/catalog/${safeBand}`, this.baseUrl);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Provider B request failed with status ${response.status}`,
      );
    }

    const payload = (await response.json()) as ProviderBResponse;
    return this.responseToAlbum(payload, band);
  }

  private responseToAlbum(response: ProviderBResponse, band: string): Album[] {
    return response.items.map((item) => ({
      name: item.release_name,
      author: band,
      year: item.issued_year,
    }));
  }
}

type ProviderBResponse = {
  lookup_key: string;
  item_count: number;
  items: Array<{
    release_name: string;
    issued_year: number;
    performers: string[];
    tags: string[];
  }>;
  extra_blob: {
    provider_revision: number;
    fetched_at: number;
  };
};
