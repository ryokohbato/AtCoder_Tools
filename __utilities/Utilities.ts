export const formatPath = (path: string) => {
  // \ を / に置換
  path.replace(/\\/g, "/");

  // テストファイルのパスを整形(末尾に\または/があれば削除)
  const lastCharOfPath = path.substring(path.length - 1);
  if (lastCharOfPath == "\\" || lastCharOfPath == "/") {
    path = path.substring(0, path.length - 1);
  }
}