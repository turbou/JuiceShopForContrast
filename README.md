# JuiceShopForContrast

v24.22.2 で検証

### 事前準備
```bash
npm install @contrast/agent
npm install
```

ContrastSecurityのチームサーバから、CONTRAST__API__TOKENをコピペして  
ターミナルに貼り付けるなどしてください。
または、contrast_security.yamlをDLして、本プロジェクト直下に配置してください。  
その際にオブザーバビリティも有効にしておきます。  
```yaml
observe:
  enable: true
```

### JuiceShopの起動
```bash
PORT=3001 npm run contrast
```

### チャットボット用のollamaを起動
https://pwning.owasp-juice.shop/companion-guide/snapshot/part1/running.html#_setting_up_external_dependencies
に沿って、ollamaをインストールして起動
```bash
# 以下で起動確認
lsof -i :11434
```

### スコアボードの表示
これも課題の１つとなっています。  
http://localhost:3001/#/score-board

### テスト実施
#### cypressの実行
```bash
npm run test:e2e
```
途中、JuiceShopがダウンする場合もあるので、再起動してください。

#### api向けのテストを実施
```bash
npm run test:api
```
#### api向けのテストを実施（もう１回）
よくわからないですが、もう一度回すとカバレッジが増えます。  
```bash
npm run test:api
```
#### 追加したオマケapiテストを実施
```bash
npm run test:api2
```

### 画面でポチポチで課題解決
#### SSTi
- 適当なユーザーでログインしてプロフィールを表示
- usernameに以下、どちらも入れて保存してみる。  
  `#{6*6}`, `#{global.process.mainModule.require('child_process').execSync('id').toString()} `

#### DOM XSS
- 検索ボックスに以下を入力して検索  
  `<iframe src="javascript:alert(`xss`)">`
  ※エスケープされないようにしてください。

#### Reflected XSS
https://cysec148.hatenablog.com/entry/2021/06/26/085030 を参考に購入まで完了します。  
そして、注文追跡画面を開いてから、URLが以下のようになるように`id`クエリパラメータにペイロードを入れて実行します。  
`localhost:3001/#/track-result/new?id=<iframe src="javascript:alert(`xss`)">`



以上
