import Link from "next/link";
import { Fragment } from "react";
import AccentButton from "../../Components/AccentButton/AccentButton";
import Footer from "../../Components/Footer/Footer";
import GameCard from "../../Components/GameCard/GameCard";
import Header from "../../Components/Header/Header";
import HorizontalScroll from "../../Components/HorizontalScroll/HorizontalScroll";

import {
  fetchGameFromSlug,
  fetchGenreBySlug,
} from "../../services/game.server";
import "../../styles/routes/GamePage.scss";
export async function getServerSideProps(context) {
  const { gameSlug } = context.query;

  const gameData = JSON.parse(
    JSON.stringify(await fetchGameFromSlug(gameSlug))
  );

  const genres = gameData.genre.map((genre) => genre.slug);
  const genreData = JSON.parse(
    JSON.stringify(await fetchGenreBySlug(genres, 10))
  );
  return {
    props: {
      currentPath: context.req.url,
      gameData,
      genreData,
    },
  };
}

export default function GamePage({ gameData, genreData }) {
  console.log(gameData);
  return (
    <div className="GamePage">
      <Header />
      <div className="GamePage__backgroundImage">
        <div
          className="GamePage__backgroundImage--image"
          style={{
            backgroundImage: `url(https:${gameData.CoverImage[0].url.replace(
              "t_thumb",
              "t_screenshot_big"
            )})`,
          }}
        />
      </div>
      <div className="GamePage__container">
        <div className="GamePage__stage">
          <div className="GamePage__stage--left">
            <img
              src={`https:${gameData.CoverImage[0].url.replace(
                "t_thumb",
                "t_cover_big"
              )}`}
            />
            <AccentButton
              style={{
                borderRadius: "4px",
              }}
            >
              Add to Library
            </AccentButton>
            {gameData.follows && (
              <span>{Number(gameData.follows)} people have added this!</span>
            )}
          </div>
          <div className="GamePage__stage--right">
            <div className="GamePage__stage--rightTop">
              <h1 className="GamePage__stage--title">{gameData.name}</h1>
              <span>{new Date(gameData.created_at).toDateString()}</span>
              <span>
                <label>
                  {gameData.playerPerspective.length > 0 ? (
                    <>
                      {gameData.playerPerspective
                        .map((item) => item.name)
                        .join(", ")}{" "}
                      based game
                    </>
                  ) : (
                    <>&nbsp;</>
                  )}
                </label>
              </span>
            </div>
            {gameData.summary !== "" && (
              <div
                className="GamePage__stage--row"
                style={{
                  marginTop: "40px",
                }}
              >
                <h4>Story / Summary</h4>
                <div className="GamePage__stage--rowContent">
                  {gameData.summary}
                </div>
              </div>
            )}
            <div className="GamePage__stage--row">
              <h4>Platforms</h4>
              <div className="GamePage__stage--rowContent">
                {gameData.platform.map((platform, index) => (
                  <a href={platform.url} key={index}>
                    {platform.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="GamePage__stage--row">
              <h4>Genres</h4>
              <div className="GamePage__stage--rowContent">
                {gameData.genre.map((genreItem, index) => (
                  <Link href={`/genre/${genreItem.slug}`} key={index}>
                    <a>{genreItem.name}</a>
                  </Link>
                ))}
              </div>
            </div>
            {gameData.VideoSet.length > 0 && (
              <div className="GamePage__stage--row">
                <h4>Videos</h4>
                <div className="GamePage__stage--rowContent">
                  {gameData.VideoSet.map((video, index) => (
                    <iframe
                      key={index}
                      src={`https://www.youtube.com/embed/${video.video_id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                  ))}
                </div>
              </div>
            )}
            {gameData.ageRatingDesc.length > 0 && (
              <div className="GamePage__stage--row">
                <h4>Age Rating</h4>
                <div className="GamePage__stage--rowContent">
                  <ul>
                    {gameData.ageRatingDesc.map((ageRating, index) => (
                      <Fragment key={index}>
                        {ageRating.description !== "" && (
                          <li>
                            {ageRating.AgeRatingCategory &&
                            ageRating.AgeRatingCategory.age_limit !== "NA"
                              ? `(${ageRating.AgeRatingCategory.age_limit})  `
                              : " "}
                            {ageRating.description}
                          </li>
                        )}
                      </Fragment>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="GamePage__stage--row">
              <h4>Related Games</h4>

              <HorizontalScroll
                slideItems={genreData.games.map((gameItem, index) => (
                  <GameCard
                    id={gameItem.id}
                    key={gameItem.name}
                    name={gameItem.name}
                    slug={gameItem.slug}
                    rating={gameItem.rating}
                    genre={gameItem.theme}
                    imageSrc={gameItem.CoverImage[0].url.replace(
                      "t_thumb",
                      "t_cover_big"
                    )}
                    style={{
                      flex: "0 0 252.5px",
                    }}
                  />
                ))}
              />
            </div>
            {gameData.theme.length !== 0 && (
              <div className="GamePage__stage--row">
                <h4>Themes</h4>

                <div className="GamePage__stage--rowContent">
                  <ul>
                    {gameData.theme.map((item, id) => (
                      <li key={id}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
