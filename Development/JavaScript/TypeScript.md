# TypeScript

https://www.typescriptlang.org/docs/handbook/

    yarn global add typescript
    npm install -g typescript

## Run & Compile

    npx ts-node myfile.ts
    ts-node

Compile:

    tsc greeter.ts

## Types

- boolean
- number / bigint
- string
- tuple
- enum
- Array: `let list: number[] = [1, 2, 3]`
- object: not not number, string, boolean, bigint, symbol, null, or undefined.
- symbol
- void
- any / unknown
- null / undefined
- never

### enum

    enum Color { Red, Green, Blue }
    let c: Color = Color.Green

    enum LetterNumbers { A = 1, B = 2, C = 3 }

### tuple

    let order: [string, number] = ['apple', 2]

### interface

    interface order {
      product: string
      amount: number
      completed?: boolean
    }

    const myOrder = { product: 'apple', amount: 2 }

### Function types

    interface SearchFunction {
      (source: string, subString: string): boolean
    }


## Standard.js for TypeScript

https://standardjs.com/#can-i-use-a-javascript-language-variant-like-flow-or-typescript

    yarn add ts-standard --save-dev
