# 商品登録

今後は写真と以下の情報をChatGPTに渡してください。コード操作は不要です。

- ブランド・商品名・カテゴリ（TOPS / OUTER / BOTTOMS）
- 価格（円）・タグのサイズ
- 実寸（トップス／アウターは身幅60cm以上、ボトムスはウエスト95cm以上）
- 状態（傷や汚れを含む）・説明
- メルカリの商品URL
- 写真（1枚以上。渡した順番で掲載）

不足情報は確認し、写真から実寸・状態を推定しません。登録IDは既存IDと重複しない番号を付与します。実寸のウエストは一周の長さで入力してください。

## 管理手順

1. 公開元mainの最新履歴を取得し、作業ブランチを作る。
2. 受け取った情報をJSONに整理し、`python scripts/register_product.py 商品.json --dry-run`で検証する。
3. 同じコマンドから`--dry-run`を外して追記する。既存商品・写真は上書きしない。
4. 商品詳細・一覧・写真・購入リンクを確認し、変更内容を提示する。
5. 公開の承認後、mainへ反映し、Pagesのデプロイと公開画面を確認する。

JSON例（値は説明用です。実際の写真と出品URLに置き換えてください）：

```json
{
  "id": "su-0001",
  "brand": "ブランド名",
  "name": "商品名",
  "category": "TOPS",
  "price": 9800,
  "tagSize": "XL",
  "measurements": {"bodyWidth": 65, "length": 78},
  "condition": "状態・傷・汚れの説明",
  "description": "素材・デザインの説明",
  "photos": ["front.jpg", "back.jpg"],
  "mercari": "https://jp.mercari.com/item/m12345678901"
}
```

追加実寸：shoulder（肩幅）、sleeve（袖丈）、waist（ウエスト）、inseam（股下）、rise（股上）、hem（裾幅）。単位はcm。

売却時は該当商品の` sold `を`true`に変更して履歴を残します。メルカリとの在庫自動同期はありません。
