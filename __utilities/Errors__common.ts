// 呼び出し時の引数エラー
export const argError = () => {
  console.log(`
    呼び出し時の引数が不正です。

    使い方は、helpオプションを参照してください。
  `);
}

export const runtimeError = (err) => {
  console.log(`
    ランタイムエラー:

    ${err}
  `)
}
