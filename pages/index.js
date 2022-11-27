import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import AccentButton from "../Components/AccentButton/AccentButton";
import Footer from "../Components/Footer/Footer";
import GameCard from "../Components/GameCard/GameCard";
import GenreBox from "../Components/GenreBox/GenreBox";
import Header from "../Components/Header/Header";
import HorizontalScroll from "../Components/HorizontalScroll/HorizontalScroll";
import SmallHProduct from "../Components/SmallHProduct/SmallHProduct";
import {
  fetchGamesByPlatform,
  fetchGenres,
  fetchPopularGames,
} from "../services/game.server";
import "../styles/routes/Home.scss";

export async function getServerSideProps(context) {
  const popularGames = JSON.parse(JSON.stringify(await fetchPopularGames()));

  const popularGames2 = JSON.parse(
    JSON.stringify(await fetchPopularGames(40, Math.floor(Math.random() * 100)))
  );
  const genreBased = JSON.parse(JSON.stringify(await fetchGenres()));
  const platformBased = JSON.parse(
    JSON.stringify(await fetchGamesByPlatform())
  );

  return {
    props: {
      currentPath: context.req.url,
      popularGames,
      popularGames2,
      genreBased,
      platformBased,
    },
  };
}

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Home({
  popularGames,
  popularGames2,
  genreBased,
  platformBased,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="LandingPage">
      <Header />
      <section className="HeroSection" ref={emblaRef}>
        <div className="HeroSection__slider">
          {popularGames.map((gameItem, index) => (
            <div className="HeroSection__slideItem embla__slide" key={index}>
              <img
                src={gameItem.CoverImage[0].url.replace("t_thumb", "t_1080p")}
              />
              <div className="HeroSection__slideItem--content">
                <h2>{gameItem.name}</h2>
                <p>{gameItem.summary}</p>

                <div className="HeroSection__slideItem--row">
                  <label>Genres: </label>
                  <ul>
                    {gameItem.Genres.map((genre, id) => (
                      <Link key={id} href={`genre/${genre.slug}`}>
                        <a>
                          <li>{genre.name}</li>
                        </a>
                      </Link>
                    ))}
                  </ul>
                </div>
                {gameItem.theme.length !== 0 && (
                  <div className="HeroSection__slideItem--row">
                    <label>Themes: </label>
                    <ul>
                      {gameItem.theme.map((item, id) => (
                        <li key={id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <AccentButton
                  isLink={true}
                  href={`game/${gameItem.slug}`}
                  style={{
                    height: "33px",
                    width: "140px",
                    marginTop: "25px",
                    backgroundColor: "#9147ff",
                  }}
                >
                  Learn More
                </AccentButton>
              </div>
            </div>
          ))}
        </div>
        <div className="HeroSection__slider--controls">
          <button
            data-icon={String.fromCharCode(58090)}
            onClick={() => emblaApi.scrollNext()}
          />

          <button
            data-icon={String.fromCharCode(58090)}
            onClick={() => emblaApi.scrollPrev()}
          />
        </div>
      </section>
      <section className="PopularSection">
        <h2>POPULAR GAMES RIGHT NOW</h2>
        <HorizontalScroll
          slideItems={popularGames2.map((gameItem, index) => (
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
      </section>
      <section className="GenreSection" id="genre ">
        <h2>GENRES</h2>
        <div className="GenreSection__listing">
          {genreBased.map((game, index) => (
            <GenreBox
              key={index}
              slug={game.slug}
              game={game.game[0]}
              GenreType={game.name}
            />
          ))}
        </div>
      </section>
      <section className="TripleSection">
        <div className="TripleSection__container">
          <section className="TripleSection__item">
            <h2>Linux</h2>
            <div className="TripleSection__item--listing">
              {platformBased.linux.map((game, index) => (
                <SmallHProduct key={index} product={game} />
              ))}
            </div>
          </section>
          <section className="TripleSection__item">
            <h2>Nintendo 64</h2>
            <div className="TripleSection__item--listing">
              {platformBased.n64.map((game, index) => (
                <SmallHProduct key={index} product={game} />
              ))}
            </div>
          </section>
          <section className="TripleSection__item">
            <h2>PlayStation</h2>
            <div className="TripleSection__item--listing">
              {platformBased.ps.map((game, index) => (
                <SmallHProduct key={index} product={game} />
              ))}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}
