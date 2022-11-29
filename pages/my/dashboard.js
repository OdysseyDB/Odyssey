import { Fragment } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import HProduct from "../../Components/HProduct/HProduct";
import { fetchGamesFollowedByUser } from "../../services/game.server";
import "../../styles/routes/PlatformPage.scss";

export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/#login",
      },
    };
  }

  const userFollowedGame = await fetchGamesFollowedByUser(
    context.req.session.user.id
  );

  return {
    props: {
      userFollowedGame: JSON.parse(JSON.stringify(userFollowedGame)),
    },
  };
}

export default function MyDashBoard({ userFollowedGame }) {
  return (
    <main className="PlatformPage">
      <Header />
      <section
        className="PlatformPage__container"
        style={{
          minHeight: "575px",
        }}
      >
        <h2 className="PlatformPage__container--title">
          Games that you follow!
        </h2>
        <div className="PlatformPage__container--verticalView">
          {userFollowedGame.length > 0 ? (
            <>
              {userFollowedGame.map((game, index) => (
                <Fragment key={index}>
                  <HProduct gameData={game} />
                  {index !== userFollowedGame.length - 1 && <hr />}
                </Fragment>
              ))}
            </>
          ) : (
            <h2>Explore and add more games to your library!</h2>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
