import { Request, Response, Router } from "express";
import Crowller from "./crowler";
import Analyzer from "./analyzer";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password" />
          <button>提交</button>
        </form>
      </body>
    </html>
  `);
});

router.post("/getData", (req: Request, res: Response) => {
  if (req.body.password === "123") {
    const secret = "x3b174jsx";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.send("getData Success!");
  } else {
    res.send("password error!");
  }
});

export default router;
