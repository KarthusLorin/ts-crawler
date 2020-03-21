import { Request, Response, Router } from "express";
import Crowller from "./crowler";
import Analyzer from "./analyzer";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

router.get("/getData", (req: Request, res: Response) => {
  const secret = "x3b174jsx";
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = Analyzer.getInstance();
  new Crowller(url, analyzer);
  res.send("getData Success!");
});

export default router;
