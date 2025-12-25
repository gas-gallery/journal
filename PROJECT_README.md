# タスク管理システム - GAS版

Vite + React + React Router + vite-plugin-singlefileを使用した、Google Apps Script (GAS) 向けタスク管理システムです。

## 技術スタック

- **フロントエンド**: React 18, TypeScript
- **ルーティング**: React Router v6
- **ビルドツール**: Vite
- **バンドル**: vite-plugin-singlefile (単一HTMLファイル出力)
- **バックエンド**: Google Apps Script
- **データベース**: Google Spreadsheet

## プロジェクト構成

```
journal/
├── src/                    # フロントエンドソースコード
│   ├── components/         # Reactコンポーネント
│   │   └── Layout.tsx      # レイアウトコンポーネント
│   ├── pages/              # ページコンポーネント
│   │   ├── Dashboard.tsx   # ダッシュボード
│   │   ├── TaskList.tsx    # タスク一覧
│   │   └── TaskDetail.tsx  # タスク詳細
│   ├── App.tsx             # メインアプリ
│   ├── main.tsx            # エントリポイント
│   └── index.css           # グローバルスタイル
├── gas/                    # GASバックエンド
│   ├── Code.gs             # GASスクリプト
│   └── appsscript.json     # GAS設定
├── index.html              # HTMLテンプレート
├── vite.config.ts          # Vite設定
├── tsconfig.json           # TypeScript設定
└── package.json            # 依存関係

```

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

### 3. 本番ビルド

```bash
npm run build
```

ビルド後、`dist/index.html`に単一のHTMLファイルが生成されます。

## GASへのデプロイ手順

### 1. Google Spreadsheetの準備

1. 新しいGoogle Spreadsheetを作成
2. スプレッドシートのIDをコピー（URLの`/d/`と`/edit`の間の文字列）

### 2. GASプロジェクトの作成

1. [Google Apps Script](https://script.google.com/)にアクセス
2. 新しいプロジェクトを作成
3. `Code.gs`の内容を`gas/Code.gs`からコピー
4. `SPREADSHEET_ID`を実際のスプレッドシートIDに置き換え
5. `appsscript.json`の内容を`gas/appsscript.json`からコピー

### 3. HTMLファイルの追加

1. GASエディタで「ファイル」→「HTML」→「HTMLファイルを追加」
2. ファイル名を`index`に設定
3. `npm run build`で生成された`dist/index.html`の内容をコピー

### 4. 初期化

1. GASエディタで`initializeSheet`関数を実行
2. 権限の承認を行う

### 5. Webアプリとして公開

1. 「デプロイ」→「新しいデプロイ」
2. 種類を「ウェブアプリ」として選択
3. 「次のユーザーとして実行」: 自分
4. 「アクセスできるユーザー」: 全員（または必要に応じて設定）
5. デプロイ

## 機能

- ✅ ダッシュボード（タスク統計表示）
- ✅ タスク一覧表示
- ✅ タスク詳細表示
- ✅ タスク作成
- ✅ タスク編集
- ✅ タスク削除
- ✅ ステータス管理（未着手/進行中/完了）
- ✅ 期限管理

## 開発時の注意点

### React Routerについて

GASにデプロイする場合、サーバーサイドのルーティングが使えないため、HashRouterの使用を推奨します。
必要に応じて`src/main.tsx`で`BrowserRouter`を`HashRouter`に変更してください。

```tsx
import { HashRouter } from 'react-router-dom'

// BrowserRouter → HashRouter
<HashRouter>
  <App />
</HashRouter>
```

### GAS API呼び出し

フロントエンドからGASの関数を呼び出す場合：

```typescript
google.script.run
  .withSuccessHandler((result) => {
    console.log(result);
  })
  .withFailureHandler((error) => {
    console.error(error);
  })
  .getTasks();
```

## ライセンス

MIT

## 作成日

2025年12月25日
