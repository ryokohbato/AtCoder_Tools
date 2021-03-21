import { access } from "fs/promises";
import { constants, readFileSync } from "fs";
import { execSync } from "child_process";
import { help, permissionError } from "./Errors";
import { argError, runtimeError } from "../../__utilities/Errors__common";
import { formatPath } from "../../__utilities/Utilities";

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

// 実行ファイルとテストファイルのパスを読み込み
const executableFilePath: string|undefined = argv['e'] ? argv['e'] : argv['executableFilePath'];
let testFileDirPath: string|undefined = argv['t'] ? argv['t'] : argv['testFileDirPath'];

if (executableFilePath == null || testFileDirPath == null) {
  argError();
  process.exit(1);
}

// 実行ファイルの権限をチェック
access(executableFilePath, constants.F_OK | constants.X_OK).catch(err => {
  if (err) {
    permissionError(err);
    process.exit(1);
  }
})

formatPath(testFileDirPath);

// テストテキストファイルを読み込む
// ファイル名は[test_$__answer.txt] (1から連番)であるものとする
const testAnswerList: Array<string> = [];

let testCaseCount: number;
for (let i = 1 ; ; i ++) {
  try {
    testAnswerList.push(readFileSync(`${testFileDirPath}/test_${i}__answer.txt`, {encoding: 'utf-8'}));
  }
  catch (e) {
    // ファイルの存在確認をエラー処理で行うため、ランタイムエラーは発生させない
    testCaseCount = i - 1;
    break;
  }
}

const ACTestList: Array<number> = [];
const WATestList: Array<number> = [];

// 実行形式: [実行ファイル] < [テストファイル]
for (let i = 1; i <= testCaseCount; i ++) {
  try {
    if (testAnswerList[i - 1] == (new TextDecoder).decode(execSync(`${executableFilePath} < ${testFileDirPath}/test_${i}.txt`))) {
      ACTestList.push(i);
    }
    else {
      WATestList.push(i);
    }
  }
  catch(e) {
    runtimeError(e);
  }
}

// スタイル調整用
const setIndent = (width: number) => {
  return " ".repeat(width);
}

const getAllWAInformation = (WAList: Array<number>): string => {
  let WAInformation: string = "";

  for(let x of WAList) {
    WAInformation +=
      "\n\n" + setIndent(2) +"解答: ====== \n" + setIndent(2) + testAnswerList[x - 1] + "\n" + setIndent(2) +"============\n" +
      setIndent(2) + "出力: ======\n" + setIndent(2) +
      (new TextDecoder).decode(execSync(`${executableFilePath} < ${testFileDirPath}/test_${x}.txt`)) + "\n" + setIndent(2) +"============"
  }

  return WAInformation;
}

console.log(`
  テスト結果:

  テストケース: ${testCaseCount}
  成功   : ${ACTestList.length}
  失敗   : ${WATestList.length} (テストケース: ${WATestList.join(', ')})
  ${WATestList.length == 0 ? "" : getAllWAInformation(WATestList)}
`)