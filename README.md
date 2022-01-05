# async-kv

Resolves promises in key-value pairs maintaining type information.

## Prerequisites

- NodeJS 12 or later

## Installation

```sh
npm i async-kv
```

```sh
yarn add async-kv
```

## Usage

```ts
import { all } from "async-kv"
```

### all

Assumes all values are functions that return promises and resolves them in parallel.

Since this is using [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) under the hood it follows the same behaviour.
> This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.

#### Basic
```ts
const data = await all({
  news: getNews,
  music: getMusic,
  movies: getMovies,
  games: getGames,
})
```
#### With parameters
```ts
const data = await all({
  news: getNews,
  music: () => getMusic("optional", "parameters"),
  movies: getMovies,
  games: getGames,
})
```

The really important information here is that the return types of the functions are mapped back to the `data` object and Typescript can continue knowing they've all been resolved.

## Contributing

Please do!

## Credits

 - [@brendan-jefferis](https://github.com/brendan-jefferis)
 
## License

[MIT License](https://andreasonny.mit-license.org/2019) 














































