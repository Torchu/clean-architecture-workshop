import { prepareAlbumModule } from "./album";

const port = Number(process.env.PORT ?? 3000);

const { albumController } = prepareAlbumModule();

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ status: "ok", service: "main-api" });
    }

    if (url.pathname === "/albums") {
      const albumResponse = await albumController.handle(request);
      if (albumResponse) {
        return albumResponse;
      }
    }

    return Response.json({ error: "Not found" }, { status: 404 });
  },
});

console.log(`[main-api] running on http://localhost:${port}`);
