# JavaScript Interview Questions & Answers (SDE Prep)

A curated list of the most commonly asked JavaScript interview questions, organized by topic, with clear answers and code examples. Use this alongside DSA practice in JavaScript.

---

## 1. Core Language Fundamentals

### Q1. What are the different data types in JavaScript?
**Answer:** JS has 8 data types:
- **Primitives (7):** `Number`, `String`, `Boolean`, `Undefined`, `Null`, `BigInt`, `Symbol`
- **Non-primitive (1):** `Object` (includes arrays, functions, dates, etc.)

Primitives are immutable and compared by value; objects are compared by reference.

### Q2. Difference between `var`, `let`, and `const`?
| Feature | var | let | const |
|---|---|---|---|
| Scope | Function-scoped | Block-scoped | Block-scoped |
| Hoisting | Hoisted, initialized as `undefined` | Hoisted but in "temporal dead zone" | Hoisted, TDZ |
| Redeclare | Allowed | Not allowed | Not allowed |
| Reassign | Allowed | Allowed | Not allowed |

```js
console.log(a); // undefined (hoisted)
var a = 10;

console.log(b); // ReferenceError (TDZ)
let b = 20;
```

### Q3. What is the Temporal Dead Zone (TDZ)?
**Answer:** The period between entering a scope and the actual declaration of a `let`/`const` variable, during which accessing it throws a `ReferenceError`. It exists because the variable is hoisted but not initialized.

### Q4. Explain `==` vs `===`.
**Answer:** `==` performs type coercion before comparing (loose equality); `===` compares both value and type (strict equality). Always prefer `===` unless coercion is intentional.
```js
0 == '0'   // true (coercion)
0 === '0'  // false
null == undefined  // true
null === undefined // false
```

### Q5. What is NaN and how do you check for it?
**Answer:** `NaN` (Not-a-Number) is a special numeric value representing an invalid number operation. `NaN !== NaN`, so use `Number.isNaN(x)` (not the global `isNaN`, which coerces its argument).

### Q6. Explain type coercion with examples.
**Answer:** JS automatically converts types in certain operations.
```js
'5' + 3   // '53' (number → string)
'5' - 3   // 2   (string → number)
true + 1  // 2
[] + []   // ''
[] + {}   // '[object Object]'
```

---

## 2. Scope, Closures, and Hoisting

### Q7. What is a closure? Give a practical example.
**Answer:** A closure is a function that retains access to its lexical scope (outer variables) even after the outer function has returned.
```js
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const increment = counter();
increment(); // 1
increment(); // 2
```
**Use cases:** data privacy/encapsulation, memoization, currying, event handlers, module patterns.

### Q8. What is hoisting?
**Answer:** JS moves declarations (not initializations) to the top of their scope during the compile phase. `var` and function declarations are hoisted with their definitions (functions fully, vars as `undefined`); `let`/`const` are hoisted but stay uninitialized (TDZ).

### Q9. Explain lexical scope vs dynamic scope.
**Answer:** JS uses **lexical (static) scoping** — a function's scope is determined by where it's *written* in the code, not where it's *called*. Closures rely on this.

### Q10. Classic closure-in-loop interview trap:
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}
```
**Why:** `var` is function-scoped (one shared binding); `let` creates a new binding per iteration.

---

## 3. Functions & `this`

### Q11. How does `this` work in JavaScript?
**Answer:** `this` is determined by **how a function is called**, not where it's defined (except arrow functions):
- Regular function call → `this` is `undefined` (strict) or global object
- Method call (`obj.fn()`) → `this` is `obj`
- Constructor call (`new Fn()`) → `this` is the new object
- `call`/`apply`/`bind` → explicitly set
- Arrow functions → inherit `this` from enclosing lexical scope

### Q12. Difference between `call`, `apply`, and `bind`?
```js
function greet(greeting) { console.log(greeting + ', ' + this.name); }
const user = { name: 'Alex' };

greet.call(user, 'Hi');        // invokes immediately, args individually
greet.apply(user, ['Hi']);     // invokes immediately, args as array
const bound = greet.bind(user); // returns new function, invoke later
bound('Hi');
```

### Q13. Arrow functions vs regular functions — key differences?
**Answer:**
- Arrow functions don't have their own `this`, `arguments`, or `super` — they inherit from enclosing scope.
- Cannot be used as constructors (`new` throws error).
- No `prototype` property.
- Cannot be used as generator functions.

### Q14. What is currying? Implement a curry function.
```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...next) => curried(...args, ...next);
  };
}
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
curriedSum(1)(2)(3); // 6
curriedSum(1, 2)(3); // 6
```

### Q15. What are higher-order functions?
**Answer:** Functions that take other functions as arguments or return functions (e.g., `map`, `filter`, `reduce`, `debounce`, `throttle`).

### Q16. Implement `debounce` and `throttle`.
```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```
**Use case:** debounce for search-input API calls, throttle for scroll/resize handlers.

---

## 4. Objects, Prototypes & OOP

### Q17. Explain prototypal inheritance.
**Answer:** Every object has an internal link (`[[Prototype]]`, accessible via `__proto__`) to another object. Property lookups traverse this "prototype chain" until found or `null` is reached.
```js
const animal = { eats: true };
const rabbit = Object.create(animal);
console.log(rabbit.eats); // true (inherited)
```

### Q18. Difference between `Object.create()`, class-based inheritance, and constructor functions?
**Answer:** All achieve prototypal inheritance:
```js
// Constructor function
function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return this.name + ' makes a sound'; };

// ES6 class (syntactic sugar over prototypes)
class Dog extends Animal {
  speak() { return this.name + ' barks'; }
}
```

### Q19. What is the difference between `__proto__` and `prototype`?
**Answer:** `prototype` is a property on constructor functions used to build the prototype chain for instances. `__proto__` is the actual link an object uses internally to look up inherited properties, present on every object.

### Q20. How does `new` keyword work internally?
**Answer:** `new Fn()`:
1. Creates a new empty object.
2. Sets its `__proto__` to `Fn.prototype`.
3. Executes `Fn` with `this` bound to the new object.
4. Returns the new object (unless `Fn` explicitly returns another object).

### Q21. Explain `Object.freeze()` vs `Object.seal()`.
**Answer:** `freeze()` prevents adding, removing, or modifying properties (fully immutable, shallow). `seal()` prevents adding/removing properties but allows modifying existing ones.

### Q22. Shallow copy vs deep copy?
```js
const shallow = { ...original };              // top-level only
const deep = structuredClone(original);        // deep copy (modern)
const deep2 = JSON.parse(JSON.stringify(original)); // deep copy, loses functions/undefined/dates
```

---

## 5. Asynchronous JavaScript

### Q23. Explain the JavaScript event loop.
**Answer:** JS is single-threaded. The **call stack** executes synchronous code. Async callbacks go to the **task queues**:
- **Microtask queue** (Promises, `queueMicrotask`) — higher priority
- **Macrotask queue** (`setTimeout`, `setInterval`, I/O)

The event loop checks: if the call stack is empty, run **all** microtasks, then one macrotask, repeat.
```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

### Q24. What are Promises? Explain their states.
**Answer:** A Promise represents the eventual result of an async operation. States: `pending` → `fulfilled` or `rejected` (once settled, immutable).
```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
}).then(console.log).catch(console.error);
```

### Q25. Difference between `Promise.all`, `Promise.allSettled`, `Promise.race`, `Promise.any`?
| Method | Resolves when | Rejects when |
|---|---|---|
| `all` | all resolve | any one rejects |
| `allSettled` | all settle (never rejects) | never |
| `race` | first settles (resolve or reject) | — |
| `any` | first resolves | all reject (AggregateError) |

### Q26. How does `async/await` work under the hood?
**Answer:** Syntactic sugar over Promises. An `async` function always returns a Promise; `await` pauses execution until the Promise settles, without blocking the main thread (it yields control back to the event loop).
```js
async function fetchData() {
  try {
    const res = await fetch('/api');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

### Q27. What is a microtask vs macrotask? Give examples of each.
**Answer:** Microtasks: Promise callbacks, `MutationObserver`, `queueMicrotask`. Macrotasks: `setTimeout`, `setInterval`, `setImmediate`, I/O, UI rendering. All microtasks run before the next macrotask.

### Q28. How do you handle multiple async operations in parallel vs sequentially?
```js
// Sequential (slower, one after another)
const a = await fetchA();
const b = await fetchB();

// Parallel (faster)
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

---

## 6. ES6+ Features

### Q29. Explain destructuring with examples.
```js
const { name, age = 18 } = user;
const [first, , third] = arr;
const { a: { b } } = nested; // nested destructuring
```

### Q30. What are template literals and tagged templates?
```js
const name = 'Sam';
console.log(`Hello, ${name}!`); // template literal

function tag(strings, ...values) { return strings.raw.join('|'); }
tag`Hi ${name}, welcome`; // tagged template
```

### Q31. Spread vs Rest operator?
```js
// Spread — expands
const arr2 = [...arr1, 4, 5];
const obj2 = { ...obj1, key: 'val' };

// Rest — collects
function sum(...nums) { return nums.reduce((a, b) => a + b); }
const [first, ...rest] = [1, 2, 3];
```

### Q32. What are generators? When would you use them?
```js
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}
const gen = idGenerator();
gen.next().value; // 1
gen.next().value; // 2
```
**Use case:** lazy evaluation, infinite sequences, custom iterators, controlling async flow before `async/await` existed.

### Q33. Symbol and its use cases?
**Answer:** `Symbol` creates unique, immutable identifiers — used to avoid property name collisions and to define well-known behaviors like `Symbol.iterator` for making objects iterable.

### Q34. Map/Set vs Object/Array — when to use which?
**Answer:** `Map` allows any key type, maintains insertion order, and has `.size` — better for frequent additions/removals and non-string keys. `Set` stores unique values. Use plain objects/arrays for simple, JSON-serializable data.

### Q35. What is optional chaining (`?.`) and nullish coalescing (`??`)?
```js
const city = user?.address?.city; // undefined if any link is null/undefined
const val = input ?? 'default';   // only falls back on null/undefined (not 0, '', false)
```

---

## 7. Array & Object Methods (also core to DSA)

### Q36. `map` vs `forEach` vs `filter` vs `reduce`?
- `map` → transforms each element, returns new array
- `forEach` → iterates, no return value (side effects only)
- `filter` → returns subset matching a condition
- `reduce` → accumulates a single value from array elements

```js
const nums = [1, 2, 3, 4];
nums.map(n => n * 2);              // [2,4,6,8]
nums.filter(n => n % 2 === 0);     // [2,4]
nums.reduce((acc, n) => acc + n, 0); // 10
```

### Q37. Implement `Array.prototype.map` from scratch (common polyfill question).
```js
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
```

### Q38. How do you remove duplicates from an array?
```js
const unique = [...new Set(arr)];
```

### Q39. Flatten a nested array (important for DSA too).
```js
const flat = arr.flat(Infinity);
// or manually:
function flatten(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
```

### Q40. `for...in` vs `for...of`?
**Answer:** `for...in` iterates over **enumerable keys** (good for objects, includes inherited enumerable props). `for...of` iterates over **values** of iterables (arrays, strings, Maps, Sets).

---

## 8. Memory, Performance & Miscellaneous

### Q41. Explain garbage collection in JS (mark-and-sweep).
**Answer:** JS engines periodically identify objects unreachable from the "root" (global object, call stack) and free their memory. The dominant algorithm is **mark-and-sweep**: mark all reachable objects, then sweep (free) unmarked ones.

### Q42. What causes memory leaks in JS? How to avoid them?
**Answer:** Common causes: uncleared timers/intervals, detached DOM references kept in variables, global variables, forgotten event listeners, closures unintentionally holding large objects. Fix: clean up listeners/timers, use `WeakMap`/`WeakSet` for caches tied to object lifecycles.

### Q43. `WeakMap`/`WeakSet` vs `Map`/`Set`?
**Answer:** `WeakMap`/`WeakSet` hold **weak references** to object keys — they don't prevent garbage collection and aren't iterable. Useful for metadata tied to an object's lifecycle without causing leaks.

### Q44. Explain event delegation.
**Answer:** Attaching a single event listener to a parent element to handle events on its children (via bubbling), instead of attaching listeners to each child individually — better performance for dynamic lists.
```js
document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') console.log(e.target.textContent);
});
```

### Q45. Explain the concept of "pure function" and immutability.
**Answer:** A pure function always returns the same output for the same input and has no side effects (doesn't mutate external state). Favors predictability, easier testing, and works well with functional patterns.

### Q46. What is currying vs partial application? (nuance question)
**Answer:** Currying transforms `f(a,b,c)` into `f(a)(b)(c)` — always one argument at a time. Partial application fixes some arguments upfront and returns a function for the rest, e.g., `f(a, b, c)` → `partial(f, a)` → `g(b, c)`.

### Q47. Explain `null` vs `undefined`.
**Answer:** `undefined` means a variable has been declared but not assigned a value (default state). `null` is an explicit assignment representing "no value" / intentional absence.

### Q48. What's the difference between synchronous and asynchronous code execution?
**Answer:** Synchronous code runs line-by-line, blocking further execution until done. Asynchronous code (via callbacks, Promises, async/await) allows the engine to continue executing other code while waiting for an operation (I/O, timers, network) to complete.

---

## 9. Common Coding/Polyfill Questions (frequently asked)

- Implement `debounce`, `throttle` (see Q16)
- Implement your own `Promise` (basic version)
- Implement `bind`, `call`, `apply` polyfills
- Deep clone an object without `structuredClone`
- Implement an event emitter (`on`, `off`, `emit`)
- Flatten nested arrays/objects
- Implement `curry` (see Q14)
- Memoize a function
- Implement a simple pub/sub pattern
- Implement `Array.prototype.reduce` from scratch

```js
// Basic memoize
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

```js
// Simple Event Emitter
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, listener) {
    (this.events[event] ||= []).push(listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
  off(event, listener) {
    this.events[event] = (this.events[event] || []).filter(l => l !== listener);
  }
}
```

---

## 10. DSA in JavaScript — What to Focus On

Since you're preparing DSA alongside interview theory, here's how JS-specific knowledge maps to DSA prep:

### Data structures — native JS tools to use
| Structure | JS Implementation |
|---|---|
| Stack | Array (`push`/`pop`) |
| Queue | Array (`push`/`shift`) — or better, a linked-list-based queue for O(1) shift |
| Hash Map | `Map` or plain object `{}` |
| Hash Set | `Set` |
| Priority Queue / Heap | No built-in — implement manually with an array |
| Linked List / Tree / Graph | Implement with objects/classes (no built-ins) |

### Key JS gotchas that matter in DSA interviews
- **`Array.shift()`/`unshift()` are O(n)** — avoid in tight loops; use index pointers instead.
- **No built-in heap/priority queue** — you're expected to implement one using an array with `siftUp`/`siftDown`.
- **Sorting:** `Array.prototype.sort()` is **not purely numeric by default** — `[10, 2, 1].sort()` gives `[1, 10, 2]` unless you pass a comparator: `.sort((a, b) => a - b)`.
- **Integer overflow:** JS numbers are floating point (safe integers up to `2^53 - 1`); for very large numbers use `BigInt`.
- **Recursion depth:** JS has a call stack limit (~10,000-15,000 depending on engine) — deep recursion (e.g., naive recursion on large trees) can cause a stack overflow; consider iterative solutions or tail-call-style rewrites.
- **Default object key iteration order:** integer-like keys are iterated in ascending numeric order first, then insertion order for the rest — can bite you in hash-map-based problems.
- **Two-pointer / sliding window patterns:** implement with plain arrays and indices — no special JS syntax needed, just clean index math.

### Suggested DSA practice pattern (JS-specific)
1. Arrays & Strings — two pointers, sliding window, prefix sums
2. Hashing — `Map`/`Set` based frequency counting, grouping
3. Recursion & Backtracking — watch stack depth
4. Linked Lists — build your own `Node` class
5. Trees & Graphs — BFS/DFS with `Map`/`Set`/arrays as adjacency lists
6. Heaps — implement a `MinHeap`/`MaxHeap` class (very commonly asked to write from scratch in JS since there's no built-in)
7. Dynamic Programming — memoization via `Map`, tabulation via arrays

If you'd like, I can also generate a separate practice set of **DSA coding problems in JavaScript** (with solutions), or a **from-scratch MinHeap/LinkedList/Graph implementation** as a follow-up.
