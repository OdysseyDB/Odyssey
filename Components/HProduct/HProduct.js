import "./HProduct.scss";
import Link from "next/link";

export default function HProduct({ gameData }) {
  console.log(gameData);
  return (
    <Link href={`/game/${gameData.slug}`}>
      <a className="HProduct">
        <div className="HProduct__left">
          <img
            src={`https:${gameData.CoverImage[0].url.replace(
              "t_thumb",
              "t_cover_big"
            )}`}
            alt={gameData.name}
            loading="lazy"
          />
        </div>
        <div className="HProduct__right">
          <h2 className="HProduct__rightTop">{gameData.name}</h2>
          <div className="HProduct__rightBottom">{gameData.summary}</div>
        </div>
      </a>
    </Link>
  );
}
