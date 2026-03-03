export class ProviderAAlbumsRepository {
  private readonly baseUrl = new URL("http://localhost:3001");
  constructor() {}

  async getByBandName(band: string): Promise<ProviderAResponse> {
    const url = new URL("/v1/discography", this.baseUrl);
    url.searchParams.set("band", band);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Provider A request failed with status ${response.status}`
      );
    }

    const payload = (await response.json()) as ProviderAResponse;
    return payload;
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
