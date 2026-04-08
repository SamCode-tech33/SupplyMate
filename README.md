# SupplyMate

A fullstack supplies purchase request application for internal use.
社内向けのフルスタック型資材発注依頼アプリケーション。

---

## Tech Stack

| Layer     | Technology              | Reason                                                                  |
| --------- | ----------------------- | ----------------------------------------------------------------------- |
| Frontend  | Next.js 15 + TypeScript | Familiar stack, App Router for clean layout separation                  |
| Styling   | Tailwind CSS            | Rapid UI development with consistent design tokens                      |
| Auth      | NextAuth v4             | First-class Next.js integration, credentials provider easy to configure |
| ORM       | Prisma 7                | Type-safe DB access, excellent migration tooling                        |
| Database  | PostgreSQL 16           | Robust relational DB, well suited to approval workflow data             |
| Container | Docker + Docker Compose | Reproducible DB environment, evaluator-friendly setup                   |

---

## 技術スタック

| レイヤー       | 技術                    | 理由                                                      |
| -------------- | ----------------------- | --------------------------------------------------------- |
| フロントエンド | Next.js 15 + TypeScript | 使い慣れたスタック、App Routerによる明確なレイアウト分離  |
| スタイリング   | Tailwind CSS            | 一貫したデザイントークンによる迅速なUI開発                |
| 認証           | NextAuth v4             | Next.jsとのシームレスな統合、設定が容易な認証プロバイダー |
| ORM            | Prisma 7                | 型安全なDBアクセス、優れたマイグレーションツール          |
| データベース   | PostgreSQL 16           | 堅牢なリレーショナルDB、承認ワークフローのデータに最適    |
| コンテナ       | Docker + Docker Compose | 再現性のあるDB環境、評価者にとって使いやすいセットアップ  |

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker + Docker Compose

> PostgreSQL is provided via Docker — no local installation required.

## はじめに

### 前提条件

- Node.js 20 以降
- Docker および Docker Compose

> PostgreSQL は Docker 経由で提供されるため、ローカルへのインストールは不要です。

### Setup

```bash
git clone <repo-url>
cd SupplyMate

npm install

cp .env.example .env
# Fill in values — see Environment Variables section below
```

### セットアップ

```bash
git clone <repo-url>
cd SupplyMate

npm install

cp .env.example .env
# 値を入力してください — 以下の「環境変数」セクションを参照

```

### Start the database

### データベースを起動する

```bash
docker compose up -d db
```

### Run migrations and seed

### マイグレーションの実行とシードデータの投入

```bash
npx prisma migrate deploy
npx prisma db seed
```

### Start the app

### アプリを起動する

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Credentials

| Role     | Email             | Password     |
| -------- | ----------------- | ------------ |
| Admin    | admin@example.com | admin1234    |
| Employee | alice@example.com | employee1234 |
| Employee | bob@example.com   | employee1234 |

---

## デモ用認証情報

| 役割   | メールアドレス    | パスワード   |
| ------ | ----------------- | ------------ |
| 管理者 | admin@example.com | admin1234    |
| 従業員 | alice@example.com | employee1234 |
| 従業員 | bob@example.com   | employee1234 |

---

## Environment Variables

Copy `.env.example` to `.env` and configure by following the instructions on `.env.example`

---

## 環境変数

`.env.example` を `.env` にコピーし、`.env.example` に記載されている手順に従って設定を行ってください。

---

## Data Model

## データモデル

### User

| Field    | Type          | Notes             |
| -------- | ------------- | ----------------- |
| id       | String (cuid) | Primary key       |
| email    | String        | Unique            |
| name     | String        |                   |
| password | String        | bcrypt hashed     |
| role     | Role          | EMPLOYEE or ADMIN |

### ユーザー

| フィールド | 型 | 備考 |

| -------- | ------------- | ---------------- - |

| id | 文字列 (cuid) | 主キー |

| email | 文字列 | 一意 |

| name | 文字列 | |

| password | 文字列 | bcrypt ハッシュ化 |

| role | ロール | EMPLOYEE または ADMIN |

### PurchaseRequest

| Field       | Type          | Notes                                                    |
| ----------- | ------------- | -------------------------------------------------------- |
| id          | String (cuid) | Primary key                                              |
| title       | String        |                                                          |
| description | String?       | Optional                                                 |
| amount      | Decimal       | 10,2 precision                                           |
| category    | Category      | OFFICE_SUPPLIES, ELECTRONICS, FURNITURE, SOFTWARE, OTHER |
| status      | RequestStatus | PENDING, APPROVED, REJECTED                              |
| requestDate | DateTime      | Auto set on creation                                     |
| reviewedAt  | DateTime?     | Set when admin acts                                      |
| reviewNote  | String?       | Optional admin comment                                   |
| requesterId | String        | FK → User                                                |
| reviewerId  | String?       | FK → User (admin)                                        |

### 購入リクエスト

| フィールド | 型 | 備考 |

| ----------- | ------------- | ------------------------------------------------- ------- |

| id | 文字列 (cuid) | 主キー |

| title | 文字列 | |

| description | 文字列? | オプション |

| amount | 10進数 | 10,2桁の精度 |

| category | カテゴリ | OFFICE_SUPPLIES, ELECTRONICS, FURNITURE, SOFTWARE, OTHER |

| status | リクエストステータス | PENDING, APPROVED, REJECTED |

| requestDate | 日時 | 作成時に自動設定 |

| reviewedAt | 日時? | 管理者が操作した際に設定 |

| 審査メモ | 文字列? | 任意の管理者コメント |

| 依頼者ID | 文字列 | 外部キー → ユーザー |

| 審査者ID | 文字列? | 外部キー → ユーザー (管理者) |

---

## Area of Focus — UI/UX & Frontend

The primary investment beyond core functionality was in crafting a polished,
production-feeling frontend experience.

## 重点分野 — UI/UX およびフロントエンド

コア機能以外の主な投資先は、洗練された、
本番環境のようなフロントエンド体験の構築でした。

### Landing page

- Full-screen video background with overlaid navigation and hero copy
- Poster image on video element eliminates blank flash during load
- Scroll-driven animations using Framer Motion — five feature cards converge
  to a central point as the user scrolls, followed by staggered headline reveals
- Pricing cards animate out from center on scroll with a sparkle effect on hover
- All CTAs link directly into the authenticated app

### ランディングページ

- ナビゲーションとヒーローコピーが重ねられたフルスクリーンの動画背景
- 動画要素にポスター画像を配置することで、読み込み時の空白表示を解消
- Framer Motion を使用したスクロール連動アニメーション — ユーザーがスクロールすると、5つの機能カードが中央に集まり、
  その後、見出しが順次表示される
- 価格カードはスクロール時に中央から飛び出すようにアニメーションし、ホバー時にはスパークル効果が表示される
- すべてのCTAは、認証済みのアプリに直接リンクしている

### Dashboard

- Staggered fade-in and slide-up entrance animation on each request row
- Skeleton loading state via `loading.tsx` renders instantly while server fetches data
- Status badges visually distinguish Pending, Approved, and Rejected states at a glance
- Approve and Reject actions are contextually shown only on pending requests
- Admin and employee views are role-aware with no layout shift between roles

### ダッシュボード

- 各リクエスト行で、フェードインとスライドアップを組み合わせた段階的な表示アニメーション
- `loading.tsx` によるスケルトンローディングにより、サーバーがデータを取得している間も画面が即座に表示される
- ステータスバッジにより、「保留中」「承認済み」「却下」の状態が一目で区別できる
- 「承認」および「却下」のアクションは、保留中のリクエストに対してのみ文脈に応じて表示される
- 管理者と従業員のビューは役割に応じて切り替わり、役割間の切り替え時にレイアウトが崩れることはない

### Microinteractions

- All interactive elements have hover and active state transitions
- Form submission states (loading, error) give immediate feedback
- Review confirmation page adapts copy and color to the action (green for approve, red for reject)

### マイクロインタラクション

- すべてのインタラクティブ要素には、ホバー時とアクティブ時の状態遷移が設定されています
- フォーム送信時の状態（読み込み中、エラー）では、即座にフィードバックが表示されます
- レビュー確認ページでは、アクションに応じてテキストや色が変化します（承認時は緑、却下時は赤）

### Performance

- Heavy Framer Motion components dynamically imported with `ssr: false` — code
  split into separate chunks downloaded only when needed, reducing initial bundle size
- `loading.tsx` skeleton gives instant visual feedback before data arrives
- Video poster image renders immediately while video streams in the background

### パフォーマンス

- `ssr: false` を指定して動的に読み込まれる Heavy Framer Motion コンポーネント — コードは
  個別のチャンクに分割され、必要なときにのみダウンロードされるため、初期のバンドルサイズが削減されます
- `loading.tsx` のスケルトンにより、データが到着する前に即座に視覚的なフィードバックが表示されます
- 動画がバックグラウンドでストリーミングされている間も、動画のサムネイル画像は即座に表示されます

### Component architecture

- Client/server boundary respected throughout — server components fetch data,
  client components handle interactivity and animation
- Serialization layer between server and client for Prisma types
- Reusable `RequestList` component with typed props handles both employee and admin views
- Named export dynamic imports using `.then((mod) => mod.ComponentName)` pattern

### コンポーネントアーキテクチャ

- クライアント／サーバーの境界を徹底して遵守 — サーバーコンポーネントがデータを取得し、
  クライアントコンポーネントがインタラクティブ機能とアニメーションを処理
- Prisma型用のサーバーとクライアント間のシリアライズ層
- 型付きプロパティを持つ再利用可能な`RequestList`コンポーネントが、従業員ビューと管理者ビューの両方を処理
- `.then((mod) => mod.ComponentName)`パターンを用いた、名前付きエクスポートによる動的インポート

---

## Compromises & Future Improvements

- Given more time, I would have liked to include the sign up ability for
  both admins and employees in order to create new accounts
- On the dashboard page, I would like to add pagination for performance improvements,
  especially for admins who would GET a large list of requests from the DB
- For a more professional feel, seed the DB with a list of supplies accessible on the
  dashboard so that a user could choose from a standard list of supplies offered and admins
  could add to this list, leaving the new request form only for custom requests
- Include a text JSON file with my own translations for English and Japanese with a
  state change toggle to view the site in English or Japanese.

  ## 妥協点と今後の改善点

- 時間があれば、管理者や従業員が新規アカウントを作成できるよう、
  両者向けの登録機能を追加したかった
- ダッシュボードページでは、パフォーマンス向上のためにページネーション機能を追加したい。
  特に、データベースから大量のリクエスト一覧を取得する管理者にとって有効である
- よりプロフェッショナルな印象を与えるため、ダッシュボード上でアクセス可能な備品リストを
  データベースに初期データとして登録し、ユーザーが提供されている標準的な備品リストから選択できるようにするとともに、
  管理者がこのリストに追加できるようにし、新規リクエストフォームはカスタムリクエスト専用にしておく
- 英語と日本語の独自翻訳を記載したテキスト形式のJSONファイルを含め、
  サイト表示言語を切り替えるトグル機能を追加し、英語または日本語でサイトを表示できるようにする。

---

## Time Spent

- A total of 7.5 hours

## 所要時間

- 合計7.5時間
