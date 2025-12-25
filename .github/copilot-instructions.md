# UI

**`言語`** 画面表示およびコメントは、すべて簡潔な英語を用いること。
**`デザイン`** vscode に酷似させること。
**`配色`** ダークモードを基準とし、アクセントカラーは #00ff00 を用いること。

# コード生成時の自動処理

**`git`** `git add .` と `git commit -m '{comment}'` を自動実行すること。

# ローカルデバッグ時の実装指針

## 実行環境の自動判別

ローカル開発環境とリモート（GAS）環境を自動的に判別すること。

## GAS API 呼び出しの抽象化

**`google.script.run`** の実行は、TypeScript のメソッド（ラッパー関数）経由で行うこと。

## 環境別の処理分岐

メソッド内で以下の分岐処理を実装すること：

- **ローカル環境**: モックデータを使用し、疑似的な応答を返す
- **リモート環境**: Google Spreadsheet、Gmail、Google Drive などの実際の GAS 処理を実行する

## 実装例

```typescript
// Environment detection
const isGASEnvironment = typeof google !== 'undefined' && google.script;

// API wrapper method
export function callGASFunction<T>(
  functionName: string,
  ...args: any[]
): Promise<T> {
  if (isGASEnvironment) {
    // Remote: Execute actual GAS function
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        [functionName](...args);
    });
  } else {
    // Local: Return mock data
    return Promise.resolve(getMockData(functionName, args) as T);
  }
}
```
