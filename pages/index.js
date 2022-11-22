import GameCard from "../Components/GameCard/GameCard";
import Header from "../Components/Header/Header";
import { fetchPopularGames } from "../services/game.server";
import "../styles/routes/Home.scss";

export async function getServerSideProps(context) {
  const popularGames = await fetchPopularGames();
  return {
    props: {
      currentPath: context.req.url,
      popularGames,
    },
  };
}

export default function Home({ popularGames }) {
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
    </div>
  );
}
