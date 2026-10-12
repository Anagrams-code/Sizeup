# SIZE UP. website

2026年10月13日に更新内容とGitHub Pages公開の承認を受けたサイトです。変更内容・検証状況は`CHANGE_REVIEW.md`、継続管理の商品登録手順は`PRODUCT_REGISTRATION.md`を参照してください。

GitHub Pages向け静的サイトです。`index.html`（小文字）をリポジトリのルートに配置し、`style.css`、`app.js`、`products.js`、`assets/hero-industrial.webp`を同じ構成でアップロードしてください。

- TOP → ITEMS → 商品詳細 → MERCARI の導線です。
- 商品は `products.js` の `SIZEUP_PRODUCTS` 配列に登録します。
- 新規登録は` scripts/register_product.py `で検証・追記できます。旧版全体は`archive/20261010-index.html`に保存しています。EDITORIALの仮記事も引き継いでいます。
- Instagramアイコンは https://www.instagram.com/sizeup20270101/ にリンクしています。
- 実際の写真・価格・メルカリURLが未登録のため、商品一覧は準備中です。
- メイン画像は生成したコンセプトビジュアルから右側の商品写真部分を切り出しています。テキストはHTMLとして表示します。
