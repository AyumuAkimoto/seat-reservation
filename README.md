This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## コーディングルール

### 命名規則

#### 変数・関数名
- 変数名と関数名はキャメルケース（camelCase）を使用する
    - 例: `userId`, `getPatientData()`
- 定数は大文字のスネークケース（SNAKE_CASE）を使用する
    - 例: `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`

#### クラス名
- クラス名はパスカルケース（PascalCase）を使用する
    - 例: `UserService`, `MealController`
- インターフェースも同様にパスカルケースを使用する
    - 例: `UserInterface`, `EventHandler`

#### DTO（Data Transfer Object）
- DTOクラス名はパスカルケースで**Dtoは付けない**
    - 例: `CreateUser`, `UpdateMeal`
- REST APIのリクエスト/レスポンスを目的としている為、スネークケースを使用する
    - 例: `{ "user_id": 1, "first_name": "太郎" }`
    - `@ApiProperty`を使用してREST APIの仕様を記述すること
- `data_source?: string;`のような`optional`なプロパティだった場合、`@NullToUndefined()`デコレータを忘れずにつけること

#### ファイル名
- ファイル名はケバブケース（kebab-case）を使用する
    - 例: `user.service.ts`, `meal-plan.controller.ts`
- ファイル名には役割を示す接尾辞をつける
    - コントローラー: `.controller.ts`
    - サービス: `.service.ts`
    - リポジトリ: `.repository.ts`
    - モジュール: `.module.ts`
    - DTOクラス: `.dto.ts`

### ディレクトリ構造
- 機能ごとにディレクトリを作成し、関連するファイルをグループ化する
    - 例: `src/domains/users/`
- 各機能ディレクトリ内では、役割ごとにファイルを作成する
    - 例: `src/domains/users/users.service.ts`, `src/domains/users/users.repository.ts`

### 依存関係

以下の依存関係は絶対に守ってください。

- `routes` → `features` → `domains` → `shared`
- `batches` → `shared`

### コードスタイル
- 関数やクラスには適切なJSDocコメントを記述する
- 複雑なロジックには説明コメントを追加する
- Prettierを使用してコードを整形する

### その他のルール
- テストコードはソースコードと同じディレクトリ構造に従い、`.spec.ts`の拡張子を使用する
    - 例: `users.service.spec.ts`