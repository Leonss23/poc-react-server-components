import { Suspense, createElement, useEffect, useState } from "react";
import { Album, getAlbums } from "../data/db";

export default function Page() {
  return (
    <>
      <h1>I'm the Page server component</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Albums />
      </Suspense>
    </>
  );
}

async function Albums() {
  console.log("fetching albums...");
  const albums = await getAlbums();
  console.log(albums);

  return (
    <ul>
      {albums.map((a) => (
        <li key={a.id}>
          <img src={a.cover} alt={a.title} />
          <div>
            <h3>{a.title}</h3>
            <p>{a.songs.length} songs</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function AlbumsClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      const albums = await getAlbums();
      setAlbums(albums);
      setIsLoading(false);
    };
    fetchAlbums();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {albums.map((a) => (
        <li key={a.id}>
          <img src={a.cover} alt={a.title} />
          <div>
            <h3>{a.title}</h3>
            <p>{a.songs.length} songs</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
