import { customAlphabet } from "nanoid";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { fetchFriendlyName, fetchUser } from "../../../services/user.server";
import { OTPTemplate } from "../../../public/Templates/OTP-template";

export default withIronSessionApiRoute(SendOtp, ironOptions);

async function SendOtp(req, res) {
  const { email, friendlyName, password, confirmPassword } = req.body;
  const isUser = await fetchUser(email);
  const isFriendlyName = await fetchFriendlyName(friendlyName);

  if (isUser !== null) {
    return res.status(400).json({
      status: 400,
      message: { email: "Account already exists, Try logging in..." },
    });
  }
  if (isFriendlyName !== null) {
    return res.status(400).json({
      status: 400,
      message: { name: "Username already in use, try a different one..." },
    });
  }

  if (password.trim() !== confirmPassword.trim()) {
    return res.status(400).json({
      status: 400,
      message: { password: "Passwords does not match" },
    });
  }

  
}
