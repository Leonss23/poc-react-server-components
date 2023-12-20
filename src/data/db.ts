export type Album = {
  id: number;
  title: string;
  cover: string;
  songs: Song[];
};

export type Song = {
  id: number;
  title: string;
};

export async function getAlbums() {
  const albums: Album[] = [
    {
      id: 0,
      title: "Flowerman",
      cover: "img1",
      songs: [
        { id: 0, title: "Spooned hopper" },
        { id: 1, title: "Mommy's jade" },
      ],
    },
    {
      id: 1,
      title: "Mankind's fall",
      cover: "img2",
      songs: [{ id: 0, title: "Bottled lover" }],
    },
  ];
  return albums;
}
