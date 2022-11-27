import db from "../lib/prisma";

async function fetchOneGameOfGenre(genre) {
  return await db.game.findMany({
    where: {
      OR: [
        {
          genres: {
            contains: `[${genre.id},`,
          },
        },
        {
          genres: {
            contains: ` ${genre.id},`,
          },
        },
        {
          genres: {
            contains: ` ${genre.id}]`,
          },
        },
      ],
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
    take: 1,
  });
}

export async function fetchGenres() {
  let genres = await db.genres.findMany();

  genres = genres.map(async (genre) => {
    return {
      ...genre,
      game: await fetchOneGameOfGenre(genre),
    };
  });

  return Promise.all(genres);
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
      platforms: true,
      created_at: true,
      age_ratings: true,
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

    gameItem.platforms =
      gameItem.platforms !== "" || gameItem.platforms
        ? eval(gameItem.platforms)
        : [];

    const platform = await db.platform.findMany({
      where: {
        id: {
          in: gameItem.platforms.map((item) => item),
        },
      },
      include: {
        PlatformLogos: true,
      },
    });
    delete gameItem.platforms;

    if (gameItem.age_ratings.length === 0) {
      gameItem.age_ratings = "[]";
    }

    const ageRatingDesc = await db.ageRatingDesc.findMany({
      where: {
        id: {
          in: eval(gameItem.age_ratings).map((item) => item),
        },
      },
      include: {
        AgeRatingCategory: true,
      },
    });
    // console.log(ageRatingDesc);

    delete gameItem.age_ratings;

    return {
      ...gameItem,
      platform,
      ageRatingDesc,
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
      summary: true,
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

    const Genres = await db.Genres.findMany({
      where: {
        id: {
          in: eval(gameItem.genres).map((item) => JSON.stringify(item)),
        },
      },
    });

    delete gameItem.genres;

    return {
      ...gameItem,
      theme,
      Genres,
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

export async function fetchGenreBySlug(slug, offset) {
  let genres = await db.genres.findMany({
    where: {
      slug: slug,
    },
  });
  genres = genres[0];

  if (genres === undefined) {
    genres = {};
  }
  if (!genres.id) {
    genres.id = "NO_ID";
  }

  const maxPage = await db.game.findMany({
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
  });


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
    skip: offset,
  });

  return {
    genre: genres,
    maxPage: Math.floor((maxPage.length)/10),
    games: await fetchGameCardData(game.map((item) => item.id)),
  };
}
