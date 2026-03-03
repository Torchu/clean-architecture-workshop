import { GetAlbumsByBand } from "../application/GetAlbumsByBand";

export class AlbumController {
  constructor(private readonly getAlbumsByBand: GetAlbumsByBand) {}

  async handle(request: Request): Promise<Response | null> {
    const url = new URL(request.url);

    if (url.pathname !== "/albums" || request.method !== "GET") {
      return null;
    }

    const band = (url.searchParams.get("band") ?? "").trim();

    if (!band) {
      return Response.json(
        { error: "Missing query param: band" },
        { status: 400 },
      );
    }

    try {
      const albums = await this.getAlbumsByBand.execute(band);
      return Response.json(albums);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      return Response.json({ error: message }, { status: 502 });
    }
  }
}
