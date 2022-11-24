import GameCard from "../Components/GameCard/GameCard";
import GenreBox from "../Components/GenreBox/GenreBox";
import Header from "../Components/Header/Header";
import HProject from "../Components/HProduct/HProject";
import { fetchGenres, fetchPopularGames } from "../services/game.server";
import "../styles/routes/Home.scss";

export async function getServerSideProps(context) {
  const popularGames = await fetchPopularGames();
  const genreBased = JSON.parse(JSON.stringify(await fetchGenres()));

  return {
    props: {
      currentPath: context.req.url,
      popularGames,
      genreBased,
    },
  };
}

export default function Home({ popularGames, genreBased }) {
  return (
    <div className="LandingPage">
      <Header />
      <div className="LandingPage__container">
        {popularGames.map((game) => (
          <GameCard
            id={game.id}
            key={game.name}
            name={game.name}
            slug={game.slug}
            rating={game.rating}
            genre={game.theme}
            imageSrc={game.CoverImage[0].url.replace("t_thumb", "t_cover_big")}
          />
        ))}
      </div>
      <div className="LandingPage__genre">
        {genreBased.map((game) => (
          <GenreBox
            key={game.index}
            slug={game.slug}
            GenreType={game.name}
          />
        ))}
      </div>
    </div>
  );
}
