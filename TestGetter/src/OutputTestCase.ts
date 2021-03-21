import { writeFileSync } from "fs";

export const outputTestCase = (html: string, testFileDirPath: string) => {
  const cheerio = require('cheerio');
  const $ = cheerio.load(html);

  const testCases = [];

  $('pre', '.lang-ja' ).each((i, element) => {
    if (i != 0) testCases.push($(element).text());
  })

  testCases.forEach((content, i) => {
    const fileName: string = i % 2 == 0 ? `test_${i / 2 + 1}.txt` : `test_${Math.floor(i / 2) + 1}__answer.txt`;

    writeFileSync(
      `${testFileDirPath}/${fileName}`,
      content,
      {flag: 'wx'}
    );
  })
}