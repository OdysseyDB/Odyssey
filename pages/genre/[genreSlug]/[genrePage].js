import { Fragment } from "react";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";
import HProduct from "../../../Components/HProduct/HProduct";
import PaginationBlocks from "../../../Components/PaginationBlocks/PaginationBlocks";
import { fetchGenreBySlug } from "../../../services/game.server";
import "../../../styles/routes/GenrePage.scss";

export async function getServerSideProps(context) {
  const { genreSlug, genrePage } = context.query;

  const genreData = JSON.parse(
    JSON.stringify(await fetchGenreBySlug(genreSlug, (genrePage - 1) * 10))
  );
  return {
    props: {
      currentPath: context.req.url,
      genreData,
      genrePage,
    },
  };
}

export default function GenrePage({ genreData, genrePage }) {
  return (
    <div className="GenrePage">
      <Header />
      <section className="GenrePage__container">
        <h2 className="GenrePage__container--title">
          {genreData.genre.name} Games
        </h2>
        <PaginationBlocks
          pageType="genre"
          slug={genreData.genre.slug}
          currentPage={genrePage}
          maxBlocks={genreData.maxPage}
        />
        <div className="GenrePage__container--verticalView">
          {genreData.games.map((game, index) => (
            <Fragment key={index}>
              <HProduct gameData={game} />
              {index !== genreData.games.length - 1 && <hr />}
            </Fragment>
          ))}
        </div>
        <PaginationBlocks
          pageType="genre"
          slug={genreData.genre.slug}
          currentPage={genrePage}
          maxBlocks={genreData.maxPage}
        />
      </section>
      <Footer />
    </div>
  );
}
