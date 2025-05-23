module.exports = {
  printWidth: 100, // 每行最大字符数
  tabWidth: 2, // tab 宽度
  useTabs: false, // 不使用 tab，使用空格
  semi: true, // 句末需要分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 对象属性的引号按需添加
  jsxSingleQuote: false, // JSX 中不使用单引号
  trailingComma: 'es5', // 多行时，在 ES5 有效的地方尽可能打印尾逗号 (对象、数组等)
  bracketSpacing: true, // 对象大括号内两边是否需要空格 { foo: bar }
  bracketSameLine: false, // (曾用名 jsxBracketSameLine) 将 > 多行 HTML (HTML, JSX, Vue, Angular) 元素放在最后一行的末尾，而不是单独放在下一行
  arrowParens: 'always', // 箭头函数参数始终需要括号 (x) => x
  // vueIndentScriptAndStyle: false, // (可选) 是否缩进 <script> 和 <style> 标签中的代码，默认为 false
  // endOfLine: 'lf', // (可选) 行尾换行符，'lf' | 'crlf' | 'cr' | 'auto'
};