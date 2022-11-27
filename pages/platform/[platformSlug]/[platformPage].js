import { Fragment } from "react";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";
import HProduct from "../../../Components/HProduct/HProduct";
import PaginationBlocks from "../../../Components/PaginationBlocks/PaginationBlocks";
import { fetchGamesByPlatformSlug } from "../../../services/game.server";
import "../../../styles/routes/PlatformPage.scss";

export async function getServerSideProps(context) {
  const { platformSlug, platformPage } = context.query;

  const platformData = JSON.parse(
    JSON.stringify(
      await fetchGamesByPlatformSlug(platformSlug, (platformPage - 1) * 10)
    )
  );
  return {
    props: {
      currentPath: context.req.url,
      platformData,
      platformSlug,
      platformPage,
    },
  };
}

export default function PlatformPage({
  platformData,
  platformSlug,
  platformPage,
}) {
  console.log(platformData);
  return (
    <div className="PlatformPage">
      <Header />
      <section className="PlatformPage__container">
        <h2 className="PlatformPage__container--title">
          {platformData.platform.name} Based Games
        </h2>
        {platformData.platform.summary.length !== 0 && (
          <p>{platformData.platform.summary}</p>
        )}
        <PaginationBlocks
          pageType="platform"
          slug={platformSlug}
          currentPage={platformPage}
          maxBlocks={platformData.maxPage}
        />
        <div className="PlatformPage__container--verticalView">
          {platformData.games.map((game, index) => (
            <Fragment key={index}>
              <HProduct gameData={game} />
              {index !== platformData.games.length - 1 && <hr />}
            </Fragment>
          ))}
        </div>
        <PaginationBlocks
          pageType="platform"
          slug={platformSlug}
          currentPage={platformPage}
          maxBlocks={platformData.maxPage}
        />
      </section>
      <Footer />
    </div>
  );
}
