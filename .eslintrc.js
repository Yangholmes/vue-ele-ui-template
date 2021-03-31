/**
 * base on fecs
 * description
 * All code in any code-base should look like a single person typed it, no matter how many people contributed. — idiomatic.js
 * refs: [https://eslint.org/docs/user-guide/configuring]
 *
 * @author Yangholmes 2017-10-18
 * @file .eslintrc.js
 */

module.exports = {
    'root': true,
    // use babel
    'parserOptions': {
        'parser': 'babel-eslint',
        'ecmaVersion': 2017,
        'sourceType': 'module'
    },
    // run in browser, enable CommonJS and ES6
    'env': {
        browser: true,
        commonjs: true,
        es6: true
    },
    // global varibles
    'globals': {},
    // go vue
    'plugins': ['vue'],
    'extends': [
        'plugin:vue/base'
    ],
    /**
     * error level:
     * @param 'off' or 0 - turn the rule off
     * @param 'warn' or 1 - turn the rule on as a warning (doesn’t affect exit code)
     * @param 'error' or 2 - turn the rule on as an error (exit code will be 1)
     */
    // ↓↓↓ my rules ↓↓↓
    'rules': {
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'pro' ? 2 : 0,
        // 语句强制分号结尾
        'semi': [2, 'always'],
        // 缩进风格: 4个空格
        'indent': [2, 4, {
            SwitchCase: 1
        }],
        // `方法/属性` 以驼峰命名
        'camelcase': [2, {
            properties: 'always'
        }],
        // 大括号内不允许不必要的空格
        'object-curly-spacing': [2, 'never'],
        // 函数声明、具名函数表达式、函数调用中，函数名和 `(` 之间不允许有空格；匿名含树 `function` 和 `(` 之间必须存在空格
        'space-before-function-paren': [2, {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }],
        // 小括号里面不要有空格
        'space-in-parens': [2, 'never'],
        // sth is defined but never used
        'no-unused-vars': 1,
        // 不允许空的函数
        'no-empty-function': 1,
        // 不允许使用未定义变量
        'no-use-before-define': 2,
        // 允许对函数使用bind
        'no-extra-bind': 1,
        // enforces Stroustrup style 强制使用Stroustrup风格
        'brace-style': [1, 'stroustrup'],
        // 运算符置于行首
        'operator-linebreak': [2, 'before'],
        // 不要带逗号小尾巴
        'comma-dangle': [2, 'never'],
        // 不允许使用 `var` 声明变量，只允许使用 `let` 和 `const`
        'no-var': 2,
        // 不允许出现多余的括号
        'no-extra-parens': [1, 'all', {
            'nestedBinaryExpressions': false,
            'ignoreJSX': 'all',
            'enforceForArrowConditionals': false
        }],
        // 箭头函数参数在没有必要的情况下不允许带括号
        'arrow-parens': [2, 'as-needed'],
        // “,”和“;”前面不允许出现空格，若不位于行尾，“,”和“;”猴紧跟一个空格
        'comma-spacing': [2, {'before': false, 'after': true}],
        // 不允许出现多余的空格，行尾注释除外
        'no-multi-spaces': [2, {ignoreEOLComments: true}],
        // 不允许`return`、`throw`、`continue`和`break`后出现不可能执行的代码
        'no-unreachable': [2],
        // 强制`Array`方法回调返回状态
        'array-callback-return': [2],
        // 不允许返回变量定义
        'no-return-assign': [2, 'always'],
        // 回调函数不超过3层
        'max-nested-callbacks': [2, 3],
        // 每行不超过120个字符
        'max-len': [1, {'code': 120}]
    }
};
