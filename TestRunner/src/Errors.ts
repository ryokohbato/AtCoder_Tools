export const permissionError = (err) => {
  console.log(`
    権限エラー:

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
