import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { fetchGameFromSlug } from "../../../services/game.server";
import { fetchUser, userUnFollowGame } from "../../../services/user.server";

export default withIronSessionApiRoute(followGameApi, ironOptions);

async function followGameApi(req, res) {
  const { id, email, gameSlug } = await req.body;

  const response = await userUnFollowGame({
    id,
  });
  const user = await fetchUser(email);
  const gameData = JSON.parse(
    JSON.stringify(await fetchGameFromSlug(gameSlug))
  );
  req.session.user = user;
  await req.session.save();
  res.send({ status: 200, user, gameData });

  // if (isMatch) {
  //   req.session.user = user;
  //   await req.session.save();
  //   res.json({ status: 200, user });
  // } else {
  //   res.statusCode = 401;
  //   res.send({ status: 401, message: "Invalid email or password" });
  // }
}
