import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    res.send({
      content:
        "Puedes acceder con normalidad.",
    });
  } else {
    res.send({
      error: "Debes loguearte primero.",
    });
    res.status(403);
  }
}
