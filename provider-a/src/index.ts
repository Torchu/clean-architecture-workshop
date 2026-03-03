type ProviderAAlbum = {
  album_title: string;
  released_at: string;
  contributing_artist: string;
  pressing_code: string;
};

const catalog: Record<string, ProviderAAlbum[]> = {
  metallica: [
    {
      album_title: "Master of Puppets",
      released_at: "1986-03-03",
      contributing_artist: "Metallica",
      pressing_code: "A-100",
    },
    {
      album_title: "Ride the Lightning",
      released_at: "1984-07-27",
      contributing_artist: "Metallica",
      pressing_code: "A-101",
    },
  ],
  queen: [
    {
      album_title: "A Night at the Opera",
      released_at: "1975-11-21",
      contributing_artist: "Queen",
      pressing_code: "A-200",
    },
    {
      album_title: "News of the World",
      released_at: "1977-10-28",
      contributing_artist: "Queen",
      pressing_code: "A-201",
    },
  ],
  radiohead: [
    {
      album_title: "OK Computer",
      released_at: "1997-06-16",
      contributing_artist: "Radiohead",
      pressing_code: "A-300",
    },
  ],
};

const port = Number(process.env.PORT ?? 3001);

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ status: "ok", provider: "provider-a" });
    }

    if (url.pathname === "/v1/discography" && request.method === "GET") {
      const band = (url.searchParams.get("band") ?? "").trim().toLowerCase();

      if (!band) {
        return Response.json(
          { error: "Missing query param: band" },
          { status: 400 },
        );
      }

      const records = catalog[band] ?? [];

      return Response.json({
        artist_lookup: band,
        records_found: records.length,
        records,
        source_meta: {
          generation: "legacy-a",
          served_at: new Date().toISOString(),
        },
      });
    }

    return Response.json({ error: "Not found" }, { status: 404 });
  },
});

console.log(`[provider-a] running on http://localhost:${port}`);
