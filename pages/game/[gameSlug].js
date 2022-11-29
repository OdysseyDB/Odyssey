import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import AccentButton from "../../Components/AccentButton/AccentButton";
import Footer from "../../Components/Footer/Footer";
import GameCard from "../../Components/GameCard/GameCard";
import Header from "../../Components/Header/Header";
import HorizontalScroll from "../../Components/HorizontalScroll/HorizontalScroll";
import useAuth from "../../hooks/useAuth";
import {
  followGameFetch,
  unFollowGameFetch,
} from "../../operations/user.fetch";

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
  const { user, setUser } = useAuth();
  let isFollowedGameId;
  const [localGameData, setLocalGameData] = useState(gameData);

  const [isUserFollowingGame, setIsUserFollowingGame] = useState(
    user
      ? user.UserFollows.map((item) => item.gameId).includes(gameData.id)
      : false
  );

  useEffect(() => {
    if (user) {
      isFollowedGameId = user.UserFollows.filter(
        (item) => item.gameId === gameData.id
      );

      if (isFollowedGameId.length > 0) {
        isFollowedGameId = isFollowedGameId[0].id;
      } else {
        isFollowedGameId = "69420";
      }
    }
  }, [user]);

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
            {isUserFollowingGame ? (
              <AccentButton
                style={{
                  borderRadius: "4px",
                }}
                onClick={async () => {
                  if (!user) {
                    window.location.hash = "#login";
                    return;
                  }
                  const response = await unFollowGameFetch({
                    id: isFollowedGameId,
                    email: user.email,
                    gameSlug: gameData.slug,
                  });
                  if (response.status === 200) {
                    setIsUserFollowingGame(false);
                    setUser(response.user);
                    setLocalGameData(response.gameData);
                  }
                }}
              >
                Remove from Library
              </AccentButton>
            ) : (
              <AccentButton
                style={{
                  borderRadius: "4px",
                  backgroundColor: "lightgreen",
                  color: "black",
                }}
                onClick={async () => {
                  if (!user) {
                    window.location.hash = "#login";
                    return;
                  }
                  const response = await followGameFetch({
                    userId: user.id,
                    gameId: gameData.id,
                    email: user.email,
                    gameSlug: gameData.slug,
                  });

                  if (response.status === 200) {
                    setIsUserFollowingGame(true);
                    setUser(response.user);
                    setLocalGameData(response.gameData);
                  }
                }}
              >
                Add to Library
              </AccentButton>
            )}
            {localGameData.follows && (
              <span>{localGameData.follows} people have added this!</span>
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
