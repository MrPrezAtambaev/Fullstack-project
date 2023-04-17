import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
	res.status(200).send({ message: "ok" });
};

export default handler;
