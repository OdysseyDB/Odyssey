import { hashSync } from "bcrypt";
import { ironOptions } from "../../../lib/ironOptions";
import { createUser, fetchUser } from "../../../services/user.server";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(Register, ironOptions);

async function Register(req, res) {
  const { friendlyName, email, password, confirmPassword } = req.body;
  const isUser = await fetchUser(email);

  if (isUser !== null) {
    return res.status(400).json({
      status: 400,
      message: { email: "Account already exists, Try logging in..." },
    });
  }

  if (password.trim() !== confirmPassword.trim()) {
    return res.status(400).json({
      status: 400,
      message: { password: "Passwords does not match" },
    });
  }

  const response = await createUser({
    name: friendlyName,
    email: email,
    password: hashSync(password, 10),
  });

  const user = await fetchUser(email);
  req.session.user = user;
  await req.session.save();
  res.send({ status: 200, message: JSON.stringify(response) });
}
