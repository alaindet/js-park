# JavaScript/TypeScript Park

This repository contains JavaScript and TypeScript benchmarks, utilities, tips and gotchas I come up with (or find online, with sources wherever possible)

## TypeScript

## Functions
- `rotate2d`: Functions to rotate a 2d-array clock-wise and counter-clock-wise
- `days-in-month`: Returns all days in a given month as array of `Date`s
- `ranges`: TypeScript-equivalent of JavaScript's `ranges` below

## JavaScript

### Functions

- `random`: A collection of balanced random functions based on `Math.random()` where boundary values have the same probability as any other value inside the range
- `christmas-tree`: The classic Christmas tree exercise
- `rot13`: Simple cipher used in forums [https://it.wikipedia.org/wiki/ROT13](https://it.wikipedia.org/wiki/ROT13)
- `ranges`: It's a bummer something like `const nums = range(2, 42);` does not exist in JavaScript. Now it does.

###Benchmarks
- `loops`: Comparison between different kind of loops (TL;DR: classic `for` wins, `for..of` is slower, `for..in` is slowest)
- `objects-search`: Comparison of several search methods for large arrays of simple objects
