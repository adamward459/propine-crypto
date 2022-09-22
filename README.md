# Propine crypto

## Installation

Install dependencies

```sh
 yarn
```

Build the code

```sh
yarn build
```

Run the code

```sh
chmod +x build/index.js
./build/index.js -h
```

## Usage

```sh
Usage: index [options] <csvFile>

Arguments:
  csvFile          Log transactions csv file

Options:
  --date <date>    Get the portfolio value per token in USD on that date
  --token <token>  Get the latest portfolio value for that token in USD
  -h, --help       Output usage information
```

## Explanation

Source code use `commander` to create a cli

Each `command` implements base class `abstract.command.ts` and injected with one action.

Each action for each command implements base class `abstract.action.ts`

## Examples

Get portfolio of token `BTC`

```sh
./build/index.js --token BTC ~/Downloads/transactions.csv
Running...
Token BTC portfolios: 22457637776.518166
```

Get portfolio of token `ETH` on `2019-10-25`

```sh
./build/index.js --date 2019-10-25 --token ETH ~/Downloads/transactions.csv
Running...
Token ETH portfolios: 22317.00302485
```
