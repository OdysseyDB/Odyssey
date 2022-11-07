import GameCard from "../Components/GameCard/GameCard";
import Header from "../Components/Header/Header";
import "../styles/routes/Home.scss";

export default function Home() {
  const games = [
    {
      id: 1393,
      name: "The Last of Us",
      genre: ["Action", "Adventure", "Survival"],
      imageSrc:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ukb.png",
    },
    {
      id: 1393,
      name: "The Last of Us",
      genre: ["Action", "Adventure", "Survival"],
      imageSrc:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ukb.png",
    },
    {
      id: 1393,
      name: "The Last of Us",
      genre: ["Action", "Adventure", "Survival"],
      imageSrc:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ukb.png",
    },
  ];
  return (
    <div className="LandingPage">
      <Header />
      <div className="LandingPage__container">
        {games.map((game) => (
          <GameCard
            id={game.id}
            key={game.name}
            name={game.name}
            genre={game.genre}
            imageSrc={game.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
