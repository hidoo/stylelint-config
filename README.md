# @hidoo/stylelint-config

[![Test](https://github.com/hidoo/stylelint-config/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/hidoo/stylelint-config/actions/workflows/test.yml)

> Shareable stylelint config for my projects.

## Installation

```sh
npm install --save-dev stylelint @hidoo/stylelint-config
```

## Usage

### Basic rules for CSS syntax

```json
{
  "extends": ["@hidoo/stylelint-config"]
}
```

### Basic rules with the order of properties

```json
{
  "extends": ["@hidoo/stylelint-config", "@hidoo/stylelint-config/+order"]
}
```

### Basic rules with the browser compatibility check

```json
{
  "extends": [
    "@hidoo/stylelint-config",
    "@hidoo/stylelint-config/+compatibility"
  ]
}
```

### Basic rules with the performance check

```json
{
  "extends": ["@hidoo/stylelint-config", "@hidoo/stylelint-config/+performance"]
}
```

### Basic rules with SCSS syntax

```json
{
  "extends": ["@hidoo/stylelint-config", "@hidoo/stylelint-config/+scss"]
}
```

## Test

```sh
$ pnpm test
```

## License

MIT
