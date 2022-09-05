# TypeScript

https://www.typescriptlang.org/docs/handbook/

    yarn global add typescript
    npm install -g typescript


## Run & Compile

    npx ts-node myfile.ts
    ts-node

Compile:

    tsc greeter.ts


## Organize your project

    types/global.d.ts


## Types

- boolean
- number / bigint
- string
- tuple
- enum
- Array: `Array<string>` same as `string[]`. `let list: number[] = [1, 2, 3]`
- object: see also `Record<string, string>`. Not number, string, boolean, bigint, symbol, null, or undefined.
- function: `(param: string) => void`
- symbol
- void
- any / unknown
- null / undefined
- never
- Date
- AND/Combined: Human & Customer
- OR: string | null

### enum

    enum Color { Red, Green, Blue }
    let c: Color = Color.Green

    enum LetterNumber {
      A = 1,
      B = 2,
      C = 3
    }
    let n: LetterNumber = LetterNumber.B

### tuple

    let order: [string, number] = ['apple', 2]

### type

`type` vs `interface` vs `class`:

Always `interface`, except for: tuples, unions, mapped types, function types, overloading functions.

See https://stackoverflow.com/a/65948871 and https://javascript.plainenglish.io/when-to-best-use-type-class-or-interface-in-typescript-73bf66de19e9

### interface

    interface Order {
      product: string
      amount: number
    }

    interface OrderCompleted extends Order {
      completed?: boolean
    }

    const myOrder = { product: 'apple', amount: 2 }

    interface CartProps {
      items: CartItem[];
      price: number;
      text: string;
      handleRemoveCoupon?: (...args: any) => void;
      currencySymbol: {
        before: string | null;
        after: string | null;
      };
    }

### Functions

Function type:

    interface SearchFunction {
      (source: string, subString: string): boolean
    }

Defining a function:

    const myAdd = function (x: number, y: number): number {
      return x + y
    }

    const myAdd = (x: number, y: number): number => x + y

Function in interface:

    interface MenuPopoverProps {
      open: boolean;
      onClose: (event: React.SyntheticEvent) => void;
      anchorEl: HTMLFormElement;
    }

### More types

    Record<string, object>
    Array<Record<string, object>>

    type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
    type ThreeStringProps = { prop1: string, prop2: string, prop3: string }

    interface IHash {
      [details: string]: string[];
    }

#### HTML types

- https://www.typescriptlang.org/docs/handbook/dom-manipulation.html#an-exploration-into-the-htmlelement-type
- https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts

    HTMLAllCollection, HTMLAnchorElement, HTMLAppletElement, HTMLAreaElement, HTMLAudioElement, HTMLBaseElement, HTMLBaseFontElement, HTMLBlockElement, HTMLBodyElement, HTMLBodyElementEventMap, HTMLBRElement, HTMLButtonElement, HTMLCanvasElement, HTMLCollection, HTMLCollectionBase, HTMLCollectionOf, HTMLDataElement, HTMLDataListElement, HTMLDetailsElement, HTMLDialogElement, HTMLDirectoryElement, HTMLDivElement, HTMLDListElement, HTMLDocument, HTMLElement, HTMLElementDeprecatedTagNameMap, HTMLElementEventMap, HTMLElementTagNameMap, HTMLEmbedElement, HTMLFieldSetElement, HTMLFontElement, HTMLFormControlsCollection, HTMLFormElement, HTMLFrameElement, HTMLFrameSetElement, HTMLFrameSetElementEventMap, HTMLHeadElement, HTMLHeadingElement, HTMLHRElement, HTMLHtmlElement, HTMLHyperlinkElementUtils, HTMLIframeElement, HTMLIFrameElement, HTMLImageElement, HTMLInputElement, HTMLLabelElement, HTMLLegendElement, HTMLLIElement, HTMLLinkElement, HTMLMapElement, HTMLMarqueeElement, HTMLMarqueeElementEventMap, HTMLMediaElement, HTMLMediaElementEventMap, HTMLMenuElement, HTMLMetaElement, HTMLMeterElement, HTMLModElement, HTMLObjectElement, HTMLOListElement, HTMLOptGroupElement, HTMLOptionElement, HTMLOptionsCollection, HTMLOrSVGElement, HTMLOrSVGImageElement, HTMLOrSVGScriptElement, HTMLOutputElement, HTMLParagraphElement, HTMLParamElement, HTMLPictureElement, HTMLPreElement, HTMLProgressElement, HTMLQuoteElement, HTMLScriptElement, HTMLSelectElement, HTMLSlotElement, HTMLSourceElement, HTMLSpanElement, HTMLStyleElement, HTMLTableCaptionElement, HTMLTableCellElement, HTMLTableColElement, HTMLTableDataCellElement, HTMLTableElement, HTMLTableHeaderCellElement, HTMLTableRowElement, HTMLTableSectionElement, HTMLTemplateElement, HTMLTextAreaElement, HTMLTimeElement, HTMLTitleElement, HTMLTrackElement, HTMLUListElement, HTMLUnknownElement, HTMLVideoElement

## Patterns

### Combining types

    interface RentalInputs extends ProductVariant, Customer, Rental {}
    type RentalInputs = ProductVariant & Customer & Rental

    interface RentalFieldsProps {
      inputs: ProductVariant & Customer & Rental
    }

### Partial/optional

    export const AppContext = React.createContext<Partial<ContextProps>>({})

Omit:

    type TodoInfo = Omit<Todo, 'completed' | 'createdAt'>

### Interface as Array

    interface MyArrayInterface {
      0: number,
      1: (startValue: number) => void
    }

### Cast with 'as'

    const elementRef = useRef() as React.MutableRefObject<HTMLButtonElement>
    const elementRef = useRef<HTMLButtonElement>();
    const stringObj = String(myObj)

### Non-null assertion operator (!)

    // I’m sure 'obj' is not null or undefined:
    let sampleVar = obj!.field

### Nested destructuring

    const { name, age }: { name: string, age: number } = personObject

With `type`-definition:

    type Item = {
      id: number;
      name: string;
      stock: {
        month: number;
        week: number;
        day: number;
      };
    }

    const response = {
      items: [{
        id: 1,
        name: 'TV',
        stock: {
          month: 10,
          week: 5,
          day: 4
        }
      }]
    };

    response.items.map(
      ({ id, name, stock: { day: dayStock } }: Item) => dayStock
    );


## TypeScript in React

    interface MyComponentProps = {
      name: string
      value: number
    }

    // Variants on how to declare types:
    const MyComponent: React.FunctionComponent<MyComponentProps> = ({ name, value }): React.ReactElement => ()
    const MyComponent: React.FunctionComponent = ({ name, value }: MyComponentProps): React.ReactElement => ()
    const MyComponent = ({} : MyComponentProps) => ()
    const MyComponent = ({ name } : { name: string }) => ()

### Important React types

- component: React.FunctionComponent (alias React.FC)
- component return value: React.ReactElement
- element/children: React.ReactNode (not JSX.Element)
- event:
  - React.SyntheticEvent
  - React.MouseEventHandler<HTMLImageElement>
  - React.ChangeEvent: (event: React.SyntheticEvent) => void
- event.target: Element or HTMLInputElement

Custom HTMLElementEvent:

    interface HTMLSimpleElementEvent {
      target: {
        name: string
        type?: string
        value?: string
        checked?: boolean
      }
    }

`React.FormEvent` (form submit): https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/

https://stackoverflow.com/a/42066698
Usage: `event: HTMLElementEvent<HTMLTextAreaElement>`

    type HTMLElementEvent<T extends HTMLElement> = Event & {
      target: T; 
      // probably you might want to add the currentTarget as well
      // currentTarget: T;
    }

useState:

    const [productInfo, setProductInfo] = useState<ProductInfo>({ sku: '', name: ''})

## TypeScript in React Native

## Tools

### ESLint for TypeScript

https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md

    yarn add -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin

### Standard.js for TypeScript

https://standardjs.com/#can-i-use-a-javascript-language-variant-like-flow-or-typescript

    yarn add -D ts-standard
