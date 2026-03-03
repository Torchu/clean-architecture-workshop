type ProviderBAlbum = {
  release_name: string;
  issued_year: number;
  performers: string[];
  tags: string[];
};

const inventory: Record<string, ProviderBAlbum[]> = {
  metallica: [
    {
      release_name: "...And Justice for All",
      issued_year: 1988,
      performers: [
        "James Hetfield",
        "Lars Ulrich",
        "Kirk Hammett",
        "Jason Newsted",
      ],
      tags: ["thrash", "metal"],
    },
    {
      release_name: "Black Album",
      issued_year: 1991,
      performers: ["Metallica"],
      tags: ["metal", "heavy"],
    },
  ],
  queen: [
    {
      release_name: "Jazz",
      issued_year: 1978,
      performers: [
        "Freddie Mercury",
        "Brian May",
        "Roger Taylor",
        "John Deacon",
      ],
      tags: ["rock"],
    },
  ],
  radiohead: [
    {
      release_name: "Kid A",
      issued_year: 2000,
      performers: ["Radiohead"],
      tags: ["alternative", "electronic"],
    },
  ],
};

const port = Number(process.env.PORT ?? 3002);

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ status: "ok", provider: "provider-b" });
    }

    if (url.pathname.startsWith("/catalog/") && request.method === "GET") {
      const band = decodeURIComponent(url.pathname.replace("/catalog/", ""))
        .trim()
        .toLowerCase();

      if (!band) {
        return Response.json(
          { error_message: "band path param is required" },
          { status: 400 },
        );
      }

      const items = inventory[band] ?? [];

      return Response.json({
        lookup_key: band,
        item_count: items.length,
        items,
        extra_blob: {
          provider_revision: 2,
          fetched_at: Date.now(),
        },
      });
    }

    return Response.json({ error_message: "Route not found" }, { status: 404 });
  },
});

console.log(`[provider-b] running on http://localhost:${port}`);
