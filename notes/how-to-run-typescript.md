# How to run a single TypeScript file without much setup

## Setup

```console
npm i -g nodemon ts-node
```

## Run and watch a single .ts file
```console
nodemon -x npx ts-node ./src/index.ts -w ./src/index.ts
```

## Run a single .ts file, watch a folder for change
```console
nodemon -x npx ts-node ./src/index.ts -w ./src
```
