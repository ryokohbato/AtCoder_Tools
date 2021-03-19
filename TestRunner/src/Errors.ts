// 呼び出し時の引数エラー
export const argError = () => {
  console.log(`
    呼び出し時の引数が不正です。

    使い方は、helpオプションを参照してください。
  `);
}

export const permissionError = (err) => {
  console.log(`
    権限エラー:

    ${err}
  `)
}

export const runtimeError = (err) => {
  console.log(`
    ランタイムエラー:

    ${err}
  `)
}

// ヘルプ
export const help = () => {
  console.log(`
    実行時オプション:

    --executableFilePath (-e) : 実行ファイルの絶対パスを指定.
    --testFileDirPath    (-t) : テストファイルの保管ディレクトリを絶対パスで指定.
  `)
}

