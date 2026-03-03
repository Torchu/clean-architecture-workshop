import { GetAlbumsByBand } from "./application/GetAlbumsByBand";
import { AlbumController } from "./infrastructure/AlbumController";
import { ProviderAAlbumsRepository } from "./infrastructure/ProviderAAlbumsRepository";

export function prepareAlbumModule() {
  const getAlbumsByBand = new GetAlbumsByBand(new ProviderAAlbumsRepository());
  const albumController = new AlbumController(getAlbumsByBand);

  return {
    albumController,
  };
}
