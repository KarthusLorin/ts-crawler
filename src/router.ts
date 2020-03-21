import { Request, Response, Router } from "express";
import Crowller from "./crowler";
import Analyzer from "./analyzer";
import fs from "fs";
import path from "path";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;

  if (isLogin) {
    res.send(`
      <html>
        <body>
          <a href="/getData">爬取内容</a>
          <a href="/showData">展示内容</a>
          <a href="/logout">退出</a>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/getData">
            <input type="password" name="password" />
            <button>登录</button>
          </form>
        </body>
      </html>
    `);
  }
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;

  if (isLogin) {
    res.send("已经登录过");
  } else {
    if (password === "123" && req.session) {
      req.session.login = true;
      res.send("登录成功！");
    } else {
      res.send("登录失败");
    }
  }
});

router.post("/logout", (req: RequestWithBody, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }

  res.redirect("/");
});

router.get("/getData", (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    const secret = "x3b174jsx";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.send("getData Success!");
  } else {
    res.send("请登录后爬取内容");
  }
});

router.get("/showData", (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    try {
      const position = path.resolve(__dirname, "../data/course.json");
      const result = fs.readFileSync(position, "utf8");
      res.json(JSON.parse(result));
    } catch (e) {
      res.send("尚未爬取到内容");
    }
  } else {
    res.send("请登录后查看内容");
  }
});

export default router;
