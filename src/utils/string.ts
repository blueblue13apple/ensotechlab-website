// src/utils/string.ts

/**
 * HTMLタグを除去し、テキストのみを抽出します。
 * @param htmlString HTML文字列
 * @returns タグを除去した純粋なテキスト
 */
export function stripHtmlTags(htmlString: string | null | undefined): string {
  if (!htmlString) return '';
  // シンプルな正規表現でHTMLタグを除去します。
  // これは全ての複雑なHTMLケースに対応するわけではありませんが、
  // <p>タグなどのシンプルな構造には有効で、サーバーサイドとクライアントサイドの両方で安全に動作します。
  return htmlString.replace(/<[^>]*>/g, '');
}

/**
 * HTML文字列をAstroがHTMLとして解釈して表示できるようにします。
 * @param htmlString HTML文字列
 * @returns set:html ディレクティブで使用できるオブジェクト
 */
export function renderHtmlContent(htmlString: string | null | undefined) {
  if (!htmlString) {
    return null;
  }
  return { set: 'html', value: htmlString };
}