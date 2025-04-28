# hdi

## ローカルでのサーバー起動方法
1. コマンド「`python -m http.server 8000`」をterminalで実行
1. ブラウザで http://localhost:8000/index.html などにアクセス

## データ
### munistepalities.csv
市区町村データ。
https://www.soumu.go.jp/denshijiti/code.html を元に手動で順を入れ替えた

### N01-07L-2K_Road.csv
道路データ。
https://nlftp.mlit.go.jp/ksj/gmlold/datalist/gmlold_KsjTmplt-N01.html のデータをmapshaperで変換した。

### N03-20240101.json
自治体データ。
https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-2024.html のデータをmapshaperで変換した。

