# TestUtility
AtCoderコンテストのテストをローカル環境で走らせるツール (Linux環境用)

## 使用方法
`TestUtility/bin/*.js`を`~/local/bin/`に配置し、パスを通して使用。異なるパスに配置する場合は、シェルスクリプトの該当コードを手動で書き換えて使用可能。
プロジェクトルートごとにSetUp.shとBuild.shを配置する。コードは`main.cpp`に記述する。

```bash
$ tree

Hoge
├── Build.sh
├── main.cpp
└── SetUp.sh

$ ./SetUp.sh [コンテスト問題ページURL]

$ ./Build.sh
```

### SetUp.sh
テストケースの配置とビルドの設定を行う。実行はビルド前の１回のみ。

### Build.sh
コンパイルとテスト実行を行う。
