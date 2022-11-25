import HProduct from "../../Components/HProduct/HProduct";
import { fetchGenreBySlug } from "../../services/game.server";
import "../../styles/routes/GamePage.scss";

export async function getServerSideProps(context) {
  const { genreSlug } = context.query;

  const genreData = JSON.parse(
    JSON.stringify(await fetchGenreBySlug(genreSlug))
  );
  console.log(genreData);
  return {
    props: {
      currentPath: context.req.url,
      genreData,
    },
  };
}

export default function GenrePage({ genreData }) {
  return (
    <div className="GenrePage">
      {genreData.map((gameItem, key) => (
        <HProduct key={key} gameData={gameItem} />
      ))}
    </div>
  );
}
