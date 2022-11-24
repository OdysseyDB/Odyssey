import db from "../lib/prisma";

export async function fetchGenres() {
  return db.genres.findMany();
}

export async function fetchGameCardData(gameIds) {
  let game = await db.game.findMany({
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
      summary: true,
      CoverImage: true,
    },
  });

  const final = game.map(async (gameItem) => {
    gameItem.themes =
      gameItem.themes !== "" || gameItem.themes ? eval(gameItem.themes) : [];

    const theme = await db.themes.findMany({
      where: {
        id: {
          in: gameItem.themes.map((item) => JSON.stringify(item)),
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
  game.themes = game.themes ? eval(game.themes) : [];

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

export async function fetchGenreBySlug(slug) {
  let genres = await db.genres.findMany({
    where: {
      slug: slug,
    },
  });
  genres = genres[0];

  let game = await db.game.findMany({
    where: {
      OR: [
        {
          genres: {
            contains: `[${genres.id},`,
          },
        },
        {
          genres: {
            contains: ` ${genres.id},`,
          },
        },
        {
          genres: {
            contains: ` ${genres.id}]`,
          },
        },
      ],
    },
    take: 10,
  });

  return await fetchGameCardData(game.map((item) => item.id));
}
