import type { Album } from "../domain/Album";
import type { AlbumsRepository } from "../domain/AlbumsRepository";

export class ProviderAAlbumsRepository implements AlbumsRepository {
  private readonly baseUrl = new URL("http://localhost:3001");
  constructor() {}

  async getByBandName(band: string): Promise<Album[]> {
    const url = new URL("/v1/discography", this.baseUrl);
    url.searchParams.set("band", band);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Provider A request failed with status ${response.status}`,
      );
    }

    const payload = (await response.json()) as ProviderAResponse;
    return this.responseToAlbum(payload);
  }

  private responseToAlbum(response: ProviderAResponse): Album[] {
    return response.records.map((record) => ({
      name: record.album_title,
      author: record.contributing_artist,
      year: new Date(record.released_at).getUTCFullYear(),
    }));
  }
}

interface ProviderAResponse {
  artist_lookup: string;
  records_found: number;
  records: Array<{
    album_title: string;
    released_at: string;
    contributing_artist: string;
    pressing_code: string;
  }>;
  source_meta: {
    generation: string;
    served_at: string;
  };
}
