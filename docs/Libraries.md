# PROJECT DEPENDENCIES

## ESLINT && PRETTIER

ESLint is the most popular JavaScript linter, a tool that analyzes code for errors, which can include stylistic errors but also coding errors that lead to bugs. While Prettier will do little to stop you making coding mistakes, ESLint can be a huge help in this regard.

### Development Dependencies

```shell
 yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslin@6.6.0 eslint-config-airbnb eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks husky lint-staged prettier
```

> eslint@6.6.0 required cause CRA doesn't supports Eslint version 6.7 or Higher. When they update the version in react-scripts then it could be possible update the ESLINT version.

#### Typescript EsLint Plugin @typescript-eslint/eslint-plugin

> https://www.npmjs.com/package/@typescript-eslint/eslint-plugin

An ESLint plugin which provides lint rules for TypeScript codebases.

#### Typescript Parser => @typescript-eslint/parser

> https://www.npmjs.com/package/@typescript-eslint/parser

An ESLint parser which leverages TypeScript ESTree to allow for ESLint to lint TypeScript source code.

#### ESLINT => eslint

> https://www.npmjs.com/package/eslint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways

#### AirBNB ESLint Popular Template => eslint-config-airbnb

> https://www.npmjs.com/package/eslint-config-airbnb

> https://www.npmjs.com/package/eslint-config-airbnb-base

This package provides Airbnb's .eslintrc as an extensible shared config.

#### Estlint Prettier Config => eslint-config-prettier

> https://www.npmjs.com/package/eslint-config-prettier

This lets you use your favorite shareable config without letting its stylistic choices get in the way when using Prettier.

#### ESlint Typescript Import Support => eslint-import-resolver-typescript

> https://www.npmjs.com/package/eslint-import-resolver-typescript

This plugin adds TypeScript support to eslint-plugin-import

#### ESLint Plugin Import => eslint-plugin-import

> https://www.npmjs.com/package/eslint-plugin-import

Support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names

#### Eslint Accessibility => eslint-plugin-jsx-a11y

> https://www.npmjs.com/package/eslint-plugin-jsx-a11y

Static AST checker for accessibility rules on JSX elements.

#### EsLint Prettier Plugin => eslint-plugin-prettier

> https://www.npmjs.com/package/eslint-plugin-prettier

Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

#### EsLint=> eslint-plugin-react

> https://www.npmjs.com/package/eslint-plugin-react

React specific linting rules for ESLint

#### EsLint => eslint-plugin-react-hooks

> https://www.npmjs.com/package/eslint-plugin-react-hooks

This ESLint plugin enforces the Rules of Hooks

#### Husky PreCommit Tool => husky

> https://www.npmjs.com/package/husky

Husky can prevent bad git commit, git push and more.

#### Linter for Staged Files => lint-staged"

> https://www.npmjs.com/package/lint-staged

Ultimately you only want to lint files that will be committed.

#### Code Format Library => prettier": "^2.1.2"

> https://www.npmjs.com/package/prettier

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

### FILES

For the proper functioning of the linter and the formater, the following files must be created in the root folder of the project:

#### eslintrc.json

The structure of rules that the linter will use is defined here, as well as the import of plugins to do the linting of the application.

#### .prettierrc

Configuration file with the formatting rules, the rules will be in json format in a simple way in which these rules can be interpreted. This must be integrated into the workspace configuration file if VSCode is being used with the Format on Save option.

#### .eslintignore

To omit some of the files in the linter, it is allowed to place the path to the folders, extensions or files that will not be evaluated by the linter.

#### (Edit) package.json

The following scripts should be included:

```json
...
  "scripts": {
    ...
    "format": "prettier --write src/**/*.{ts,tsx}",
    "lint": "tsc --noEmit && eslint src/**/*.ts{,x} --color --fix",
    "eject": "react-scripts eject"
    ...
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  ...
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx,json}": [
      "prettier --write ./src/**/*.{ts,tsx}",
      "tslint ./src/**/*.{ts,tsx} --fix --color"
    ]
  }
```

#### (Edit) xxxx.code-workspace

xxxx is the name of the project file, the option for format on save must be added in this json:

```json
...
  "settings": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "html.format.endWithNewline": true
  }
...
```
