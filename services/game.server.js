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

async function fetchOneGameOfPlatform(platform) {
  return await db.game.findMany({
    where: {
      OR: [
        {
          platforms: {
            contains: `[${platform.id},`,
          },
        },
        {
          platforms: {
            contains: ` ${platform.id},`,
          },
        },
        {
          platforms: {
            contains: ` ${platform.id}]`,
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

export async function fetchPlatforms() {
  return await db.platform.findMany();
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

export async function fetchPopularGames(count = 10, skip = 10) {
  const game = await db.game.findMany({
    orderBy: {
      rating: "desc",
    },
    take: count,
    skip: skip,
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

    if (gameItem.genres === undefined) {
      gameItem.genres = {};
    }
    if (gameItem.genres.length === 0) {
      gameItem.genres = "[]";
    }
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

  const ageRatingDesc = await db.ageRatingDesc.findMany({
    where: {
      id: {
        in: eval(game.age_ratings),
      },
    },
    take: 20,
    include: {
      AgeRatingCategory: true,
    },
  });

  delete game.age_ratings;

  delete game.genres;

  if (game.player_perspectives === "") {
    game.player_perspectives = "[]";
  }

  const playerPerspective = await db.playerPerspective.findMany({
    where: {
      id: {
        in: eval(game.player_perspectives).map((item) => JSON.stringify(item)),
      },
    },
  });

  const platform = await db.platform.findMany({
    where: {
      id: {
        in: eval(game.platforms).map((item) => item),
      },
    },
    include: {
      PlatformLogos: true,
    },
  });
  delete game.platforms;
  return {
    ...game,
    theme,
    platform,
    ageRatingDesc,
    playerPerspective,
    genre,
  };
}

export async function fetchGenreBySlug(slug, offset) {
  const nSlug = typeof slug === "string" ? [slug] : [...slug];
  let genres = await db.genres.findMany({
    where: {
      slug: {
        in: [...nSlug],
      },
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
    maxPage: Math.ceil(maxPage.length / 10),
    games: await fetchGameCardData(game.map((item) => item.id)),
  };
}

// Can replace with just 3 procedures - Done (FetchPlatformGame)
export async function fetchGamesByPlatform() {
  let linux = await db.game.findMany({
    where: {
      OR: [
        {
          platforms: {
            contains: `[3,`,
          },
        },
        {
          platforms: {
            contains: ` 3,`,
          },
        },
        {
          platforms: {
            contains: ` 3]`,
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
      platforms: true,
      created_at: true,
      age_ratings: true,
    },
    take: 10,
  });

  let n64 = await db.game.findMany({
    where: {
      OR: [
        {
          platforms: {
            contains: `[4,`,
          },
        },
        {
          platforms: {
            contains: ` 4,`,
          },
        },
        {
          platforms: {
            contains: ` 4]`,
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
      platforms: true,
      created_at: true,
      age_ratings: true,
    },
    take: 10,
  });

  let ps = await db.game.findMany({
    where: {
      OR: [
        {
          platforms: {
            contains: `[7,`,
          },
        },
        {
          platforms: {
            contains: ` 7,`,
          },
        },
        {
          platforms: {
            contains: ` 7]`,
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
      platforms: true,
      created_at: true,
      age_ratings: true,
    },
    take: 10,
  });

  return {
    linux,
    n64,
    ps,
  };
}

// can replace max page with a procedure - Done (GetMaxPagesForPlatform)
export async function fetchGamesByPlatformSlug(slug, offset) {
  let platform = await db.platform.findMany({
    where: {
      slug: slug,
    },
  });
  platform = platform[0];
  if (platform === undefined) {
    platform = {};
  }
  if (!platform.id) {
    platform.id = "NO_ID";
  }
  const maxPage = await db.game.findMany({
    where: {
      OR: [
        {
          platforms: {
            contains: `[${platform.id},`,
          },
        },
        {
          platforms: {
            contains: ` ${platform.id},`,
          },
        },
        {
          platforms: {
            contains: ` ${platform.id}]`,
          },
        },
      ],
    },
  });

  let game = await db.game.findMany({
    where: {
      OR: [
        {
          platforms: {
            contains: `[${platform.id},`,
          },
        },
        {
          platforms: {
            contains: ` ${platform.id},`,
          },
        },
        {
          platforms: {
            contains: ` ${platform.id}]`,
          },
        },
      ],
    },
    take: 10,
    skip: offset,
  });

  return {
    platform: platform,
    maxPage: Math.ceil(maxPage.length / 10),
    games: await fetchGameCardData(game.map((item) => item.id)),
  };
}
