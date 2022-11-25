import "./GenreBox.scss";
import Link from "next/link";

export default function GenreBox({ GenreType, slug }) {
  return (
    <Link href={`/genre/${slug}`}>
      <a className="GenreBox">{GenreType}</a>
    </Link>
  );
}
