import Image from "next/image";

/**
 * One of the two raster logos, rendered as a small self-contained tile. Both
 * source files carry their own opaque background, so the tile is the image
 * itself at 64px and nothing is drawn around it.
 */
export default function LogoTile({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={128}
      height={128}
      className="logo-tile"
    />
  );
}
