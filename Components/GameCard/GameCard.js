import { useState } from "react";
import PropTypes from "prop-types";
import "./GameCard.scss";
import Link from "next/link";

function GameCard({ name, id, genre, imageSrc }) {
  const [onHover, setOnHover] = useState(false);
  return (
    <div
      className="GameCard"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <img src={imageSrc} alt={name} />
      <Link href={`/game/${id}`}>
        <a
          className={`GameCard__hover GameCard__hover--${
            onHover ? "visible" : ""
          }`}
        >
          Learn More
        </a>
      </Link>
      <div className="GameCard__contents">
        <h3>{name}</h3>
        <ul className="GameCard__contents--genres">
          {genre.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GameCard;
