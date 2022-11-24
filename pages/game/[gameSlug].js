import Header from "../../Components/Header/Header";
import PercentCircle from "../../Components/PercentCircle/PercentCircle";
import { fetchGameFromSlug } from "../../services/game.server";
import "../../styles/routes/GamePage.scss";
export async function getServerSideProps(context) {
  const { gameSlug } = context.query;

  const gameData = JSON.parse(
    JSON.stringify(await fetchGameFromSlug(gameSlug))
  );

  return {
    props: {
      currentPath: context.req.url,
      gameData,
    },
  };
}

export default function GamePage({ currentPath, gameData }) {
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
          </div>
          <div className="GamePage__stage--right">
            <h1 className="GamePage__stage--title">{gameData.name}</h1>
            <div className="GamePage__stage--storyline">{gameData.summary}</div>
            <PercentCircle percent={Math.round(gameData.rating)} />
          </div>
        </div>
      </div>
    </div>
  );
}
