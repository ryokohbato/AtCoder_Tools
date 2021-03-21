import { get } from "https";
import { help, requestError } from "./Errors";
import { argError, runtimeError } from "../../__utilities/Errors__common";
import { formatPath } from "../../__utilities/Utilities";
import { outputTestCase } from "./OutputTestCase";

const argv = require('minimist')(process.argv.slice(2));

const isHelp = argv['h'] == true
                ? true
                : argv['help'] == true
                  ? true
                  : false;

if (isHelp) {
  help();
  process.exit(0);
}

let url: string|undefined = argv['u'] ? argv['u'] : argv['url'];
let testFileDirPath: string|undefined = argv['t'] ? argv['t'] : argv['testFileDirPath'];
let problemPageHtml: string = "";

if (url == null || testFileDirPath == null) {
  argError();
  process.exit(1);
}

formatPath(testFileDirPath);

outputTestCase(problemPageHtml, testFileDirPath);

get(url, (res) => {
  const { statusCode } = res;

  if (statusCode != 200) {
    requestError(statusCode);
    process.exit(1);
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    problemPageHtml = rawData;
    outputTestCase(problemPageHtml, testFileDirPath);
  });
}).on('error', (err) => {
  runtimeError(err);
  process.exit(1);
});
