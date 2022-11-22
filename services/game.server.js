import db from "../lib/prisma";

export async function fetchGameCardData(gameIds) {
  const game = await db.game.findMany({
    where: {
      id: {
        in: gameIds,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      rating: true,
      themes: true,
      CoverImage: true,
    },
  });
  // co20gb
  const final = game.map(async (game) => {
    const theme = await db.themes.findMany({
      where: {
        id: {
          in: eval(game.themes).map((item) => JSON.stringify(item)),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    delete game.themes;

    return {
      ...game,
      theme,
    };
  });

  return Promise.all(final);
}

export async function fetchPopularGames() {
  // convert sql to prisma
  // select name, rating from Game order by rating DESC limit 10;
  const game = await db.game.findMany({
    orderBy: {
      rating: "desc",
    },
    take: 10,
    select: {
      id: true,
      name: true,
      slug: true,
      rating: true,
      themes: true,
      genres: true,
      CoverImage: true,
    },
  });

  const final = game.map(async (gameItem) => {
    if (!gameItem.themes) {
      gameItem.themes = [];
    }
    const theme = await db.themes.findMany({
      where: {
        id: {
          in: eval(gameItem.themes).map((item) => JSON.stringify(item)),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    delete gameItem.themes;

    return {
      ...gameItem,
      theme,
    };
  });

  return Promise.all(final);
}

export async function fetchGameFromSlug(slug) {
  let game = await db.game.findMany({
    where: {
      slug: slug,
    },
    include: {
      CoverImage: true,
      Artwork: true,
      VideoSet: true,
    },
  });
  game = game[0];
  game.themes  = game.themes ? eval(game.themes) : [];
  
  const theme = await db.themes.findMany({
    where: {
      id: {
        in: eval(game.themes).map((item) => JSON.stringify(item)),
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
  delete game.themes;

  const genre = await db.genres.findMany({
    where: {
      id: {
        in: eval(game.genres).map((item) => JSON.stringify(item)),
      },
    },
  });

  delete game.genres;

  return {
    ...game,
    theme,
    genre,
  };
}
