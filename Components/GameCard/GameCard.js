import { useState } from "react";
import "./GameCard.scss";
import Link from "next/link";

function GameCard({ name, id, slug, genre, imageSrc, rating, ...props }) {
  const [onHover, setOnHover] = useState(false);
  return (
    <Link href={`/game/${slug}`}>
      <a
        className="GameCard"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        {...props}
      >
        <div className="GameCard__imageBox">
          <span
            className={`GameCard__hover GameCard__hover--${
              onHover ? "visible" : ""
            }`}
          >
            Learn More
          </span>
          <img src={imageSrc} alt={name} loading="lazy" />
        </div>
        <div className="GameCard__contents">
          <h3>{name}</h3>
          <div className="GameCard__contents--bottom">
            <ul className="GameCard__contents--genres">
              {genre.map((genre, id) => (
                <li key={id}>{genre.name}</li>
              ))}
              {genre.length === 0 && <i />}
            </ul>
            {rating && <pre>{Math.round(rating)}%</pre>}
          </div>
        </div>
      </a>
    </Link>
  );
}

export default GameCard;
