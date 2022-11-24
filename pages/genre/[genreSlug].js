import HProject from "../../Components/HProduct/HProject";
import { fetchGenrebySlug } from "../../services/game.server";
import "../../styles/routes/GamePage.scss";

export async function getServerSideProps(context) {
  const { genreSlug } = context.query;

  const genreData = JSON.parse(
    JSON.stringify(await fetchGenrebySlug(genreSlug))
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
      <HProject gameData={genreData[0]}/>
    </div>
  );
}
