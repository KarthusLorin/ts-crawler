import fs from "fs";
import path from "path";
import superagent from "superagent";

export interface AnalyzerType {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, "../data/course.json");

  constructor(private url: string, private analyzer: AnalyzerType) {
    this.initSpiderProcess();
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    // 调用分析类，传入html，返回分析结果
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  // 发起请求，获取html
  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
}

export default Crowller;
