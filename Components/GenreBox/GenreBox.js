import "./GenreBox.scss";
import Link from "next/link";

export default function GenreBox({ GenreType, slug }) {
  return (
    <Link href={`/genre/${slug}`}>
      <a className="GenreBox">
        {/* <div className="GenreBox__contents--bottom"></div> */}
        {GenreType}
        {/* <div className="GenreBox__contents--bottom">
          <ul className="GenreBox__contents--genres">
            {GenreType.map((GenreType,index)̵ => (
              <li key={index}>{GenreType.name}</li>
            ))}
          </ul>
        </div> */}
      </a>
    </Link>
  );
}
