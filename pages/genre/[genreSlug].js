import Header from "../../Components/Header/Header";
import HProduct from "../../Components/HProduct/HProduct";
import { fetchGenreBySlug } from "../../services/game.server";
import "../../styles/routes/GenrePage.scss";

export async function getServerSideProps(context) {
  const { genreSlug } = context.query;

  const genreData = JSON.parse(
    JSON.stringify(await fetchGenreBySlug(genreSlug))
  );
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
      <Header />
      <section className="GenrePage__container">
        <h2  className="GenrePage__container--title">{genreData.genre.name} Games</h2>
        <div className="GenrePage__container--verticalView">
          {genreData.games.map((game, index) => (
            <HProduct gameData={game} key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
