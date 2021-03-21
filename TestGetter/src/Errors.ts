// Httpリクエストエラー
export const requestError = (code: number) => {
  console.log(`
    リクエストエラー:

    ステータスコード: ${code}
  `)
}

// ヘルプ
export const help = () => {
  console.log(`
    実行時オプション:

    --url                (-u) : 取得対象URL (AtCoderのコンテスト問題ページにのみ対応)
    --testFileDirPath    (-t) : テストファイルの保管ディレクトリを絶対パスで指定.
  `)
}
