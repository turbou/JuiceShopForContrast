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

以上
