# JuiceShopForContrast

v24.22.2 で検証

```bash
npm install @contrast/agent
npm install
```

ContrastSecurityのチームサーバから、CONTRAST__API__TOKENをコピペして  
ターミナルに貼り付けるなどしてください。
```bash
PORT=3001 npm run contrast
```

https://pwning.owasp-juice.shop/companion-guide/snapshot/part1/running.html#_setting_up_external_dependencies
に沿って、ollamaをインストールして起動
```bash
# 以下で起動確認
lsof -i :11434
```

http://localhost:3001/#/score-board

```bash
npm run test:e2e
```
