import { Router } from './lib';

const r = new Router('https://example.com');

r.register('/todos', 'getAll');
r.register('/todos/:id', 'getOne');

r.debugRoutes();

const tests = [
  'https://example.com/todos?hello-there=general#kenobi',
  'https://example.com/todos/123?archives',
  'https://example.com/todos/42?the-question',
  'https://example.com/todos/11/22#nope',
  'https://example.com/todosss?just#noise',
];

console.log(
  tests.map(test => r.handle(test)),
);
