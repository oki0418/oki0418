# License
The source code is licensed MIT.

## Versions
講師の npm 及び Node.js のバージョンは以下の通りです。  

| Name | Version |
| --- | --- |
| npm | 8.19.2 |
| Node.js | 18.12.0 |

以下のコマンドでバージョンを確認することができます。
```shell
npm -v
node -v
```

指定バージョンの Node.js（npm同梱）は以下からダウンロードしてください。  
nodenv などのバージョン管理ツールを使用している場合、ツールに従ってインストールしてください。  
https://nodejs.org/download/release/v18.12.0/

## Get Started
1. `npm install`を実行してパッケージをインストール
2. `tsc`または`npm run build`を実行して build ディレクトリが生成されることを確認する
3. `node build/index.js`を実行して`Hello World!`が表示されることを確認する
