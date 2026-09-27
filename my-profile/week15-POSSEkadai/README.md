# Week 15 タスク管理アプリ

React と Vite のテンプレートを使ったタスク管理アプリです。Tailwind CSS は pnpm でインストールし、`@tailwindcss/vite` プラグインから読み込んでいます。

## セットアップ

新規作成する場合のコマンド:

```bash
pnpm create vite week15-POSSEkadai --template react
cd week15-POSSEkadai
pnpm install
pnpm add -D tailwindcss @tailwindcss/vite
```

このプロジェクトを起動する場合:

```bash
pnpm install
pnpm run dev
```

本番用ファイルの作成は `pnpm run build` で行います。

## 機能

- 入力欄からボタンまたは Enter でタスクを追加（空白だけの入力は追加しない）
- タスクの完了切り替えと削除
- すべて・未完了・完了済みの表示切り替え
- `useEffect` と `localStorage` による保存
- タスク1件の表示を `TaskItem` コンポーネントに分離

タスク配列は `setTasks` と `map`・`filter`・スプレッド構文で更新しています。
