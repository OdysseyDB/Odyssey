import db from "../lib/prisma";

export async function userFollowGame(data) {
  return db.userFollows.create({
    data,
  });
}

export async function userUnFollowGame(data) {
  return db.userFollows.delete({
    where: {
      id: data.id,
    },
  });
}

export async function fetchUser(email) {
  return db.user.findUnique({
    where: {
      email,
    },
    include: {
      UserFollows: true,
    },
  });
}

export async function createUser(data) {
  return db.user.create({
    data,
  });
}

export async function changeUserPassword(data) {
  return db.user.update({
    where: {
      email: data.email,
    },
    data: {
      password: data.password,
    },
  });
}

export async function fetchFriendlyName(name) {
  return db.user.findUnique({
    where: {
      name,
    },
  });
}
