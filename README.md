# JavaScript/TypeScript Park

![JS Park Logo](https://raw.githubusercontent.com/alaindet/js-park/main/js-park-logo.png)

This repository contains JavaScript and TypeScript benchmarks, utilities, tips, experiments, library ideas and gotchas I come up with (or find online, with sources wherever possible). Basically, it's a digital playground so to say.

## TypeScript

## Functions
- `rotate2d`: Functions to rotate a 2d-array clock-wise and counter-clock-wise
- `days-in-month`: Returns all days in a given month as array of `Date`s
- `ranges`: TypeScript-equivalent of JavaScript's `ranges` below
- `2d-movements`: Returns a collection of functions to move on a 2D board represented as a monodimensional array

## Libraries
- `date-sneaker`: A library to manage calendars (date pickers, month pickers, year pickers)
- `router`: A simple router class to match a string with patterns

## JavaScript

### Functions

- `random`: A collection of balanced random functions based on `Math.random()` where boundary values have the same probability as any other value inside the range
- `christmas-tree`: The classic Christmas tree exercise
- `rot13`: Simple cipher used in forums [https://it.wikipedia.org/wiki/ROT13](https://it.wikipedia.org/wiki/ROT13)
- `ranges`: It's a bummer something like `const nums = range(2, 42);` does not exist in JavaScript. Now it does.

### Benchmarks
- `loops`: Comparison between different kind of loops (TL;DR: classic `for` wins, `for..of` is slower, `for..in` is slowest)
- `objects-search`: Comparison of several search methods for large arrays of simple objects
- `strings concatentation`: TL;DR: Use `String.concat()`
