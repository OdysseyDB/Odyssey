import "./GenreBox.scss";
import Link from "next/link";

export default function GenreBox({ GenreType,name, slug,  }) {
  return (
    <Link href={`/${GenreType}/${slug}`}>
      <a className="GenreBox">{name}</a>
    </Link>
  );
}
