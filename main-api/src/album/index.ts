import { GetAlbumsByBand } from "./application/GetAlbumsByBand";
import type { AlbumsRepository } from "./domain/AlbumsRepository";
import { AlbumController } from "./infrastructure/AlbumController";
import { ProviderAAlbumsRepository } from "./infrastructure/ProviderAAlbumsRepository";

export function prepareAlbumModule() {
  const albumsRepository: AlbumsRepository = new ProviderAAlbumsRepository();

  const getAlbumsByBand = new GetAlbumsByBand(albumsRepository);
  const albumController = new AlbumController(getAlbumsByBand);

  return {
    albumController,
  };
}
