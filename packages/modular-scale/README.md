# Modular Scale

A modular scale is a list of values that share the same relationship. These values are often used to size type and create a sense of harmony in a design. Proportions within modular scales are all around us from the spacing of the joints on our fingers to branches on trees. These natural proportions have been used since the time of the ancient Greeks in architecture and design and can be a tremendously helpful tool to leverage for web designers.

Rems / ems work especially well with modular scales as their recursive properties mimic modular scales making them more predictable and easier to manage. Pixels and other units work just fine and breakpoints in responsive web design can naturally fall on your scale to create better relevance to your text as all the values in your layout harmonize with each other.

To get started, you need to select a ratio and a base value. The base value is usually your text font size or 1em. Optionally you can add another value to create a double stranded modular scale which might be useful to create more options for in-between values. This base size paired with a ratio such as the golden ratio or any musical proportion will create your scale of values which all share this proportion.

## Installation

```
yarn add @typographist/modular-scale
```

or

```
npm i @typographist/modular-scale
```

## Getting Started

Use modularscale.com to visualize the parameters passed to the function.



## API

**step**

Type: `number`

**base**

Type: `Array<number>`

**ratio**

Type: `number`

### One Base

You need to select a step, base value and ratio. The base value is usually your text font size.

```js
modularScale(6, [16], 1.125) === 32.435
```

<img src="images/modular-scale.png"/>

### Multiple Bases

Multiple bases can be defined for creating multi stranded scales. There is no limit here to the number of strands you use.

```js
modularScale(6, [18, 32], 1.125) === 35.156
```

<img src="images/multiple-bases.png"/>


## License

MIT License

Copyright (c) 2019 [Maxim Alyoshin](https://github.com/mg901).

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/typographist/modular-scale/blob/master/LICENSE) file for details.
