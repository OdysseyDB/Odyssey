import "./Hproject.scss";
import Link from "next/link";




export default function HProject({ gameData}) {
  return (
    <Link href={`/game/${gameData.slug}`}>
      <a className="HProject">
        <div className="HProject__left"></div>
        <img src={gameData.img} alt={gameData.name} className="HProject__img" loading="lazy"/>
        <div className="HProject__right">
            <div className="HProject__righttop">{gameData.name}</div>
            <div className="HProject__rightbottom">{gameData.summary}</div>
        </div>
      </a>
    </Link>
  );
}
