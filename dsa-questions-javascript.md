# DSA Questions & Solutions in JavaScript (Interview Revision Sheet)

A curated set of the most commonly asked DSA problems, solved in JavaScript, with time/space complexity and the key insight behind each. Organized by topic — revise in this order.

---

## 0. JS-Specific Cheat Sheet (read this first)

- **Stack** → array (`push`/`pop`, both O(1))
- **Queue** → array `push`/`shift` (shift is O(n)!) — for real O(1) dequeue, use a linked list or index pointer
- **HashMap** → `Map` (preserves insertion order, any key type) or `{}`
- **HashSet** → `Set`
- **Sorting numbers:** `arr.sort((a, b) => a - b)` — never `arr.sort()` alone for numbers
- **No built-in heap/priority queue** — must implement manually (shown below)
- **Recursion limit** ~10,000–15,000 stack frames — watch out on deep trees/graphs
- **Integer safety:** safe up to `Number.MAX_SAFE_INTEGER` (2^53 - 1); use `BigInt` beyond that
- **`Infinity` / `-Infinity`** are handy initial values for min/max tracking

---

## 1. Arrays & Strings

### Q1. Two Sum
**Problem:** Find indices of two numbers in an array that add up to a target.
```js
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}
```
**Key point:** Brute force is O(n²); using a hash map for the complement gets it to **O(n) time, O(n) space**. This "store what you need, look it up later" pattern is foundational.

---

### Q2. Maximum Subarray (Kadane's Algorithm)
**Problem:** Find the contiguous subarray with the largest sum.
```js
function maxSubArray(nums) {
  let maxSoFar = nums[0], maxEndingHere = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}
```
**Key point:** At each index, decide: extend the previous subarray, or start fresh. **O(n) time, O(1) space.** Classic DP-on-arrays pattern.

---

### Q3. Longest Substring Without Repeating Characters
```js
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0, start = 0;
  for (let end = 0; end < s.length; end++) {
    const ch = s[end];
    if (seen.has(ch) && seen.get(ch) >= start) {
      start = seen.get(ch) + 1;
    }
    seen.set(ch, end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}
```
**Key point:** Sliding window with a hash map to jump the `start` pointer directly instead of incrementing one by one — **O(n) time, O(min(n, charset)) space.**

---

### Q4. Two Pointers — Container With Most Water
```js
function maxArea(height) {
  let left = 0, right = height.length - 1, max = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);
    height[left] < height[right] ? left++ : right--;
  }
  return max;
}
```
**Key point:** Always move the pointer at the **shorter** line — moving the taller one can never increase the area. **O(n) time, O(1) space.**

---

### Q5. Group Anagrams
```js
function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return [...map.values()];
}
```
**Key point:** Sorted string as a canonical hash key — common trick for anagram/grouping problems. **O(n·k log k) time** (k = avg string length).

---

### Q6. Merge Intervals
```js
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    const curr = intervals[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      result.push(curr);
    }
  }
  return result;
}
```
**Key point:** Sort first, then greedily merge — a huge fraction of interval problems reduce to "sort + single pass." **O(n log n) time.**

---

## 2. Linked Lists

### Q7. Reverse a Linked List
```js
class ListNode {
  constructor(val, next = null) { this.val = val; this.next = next; }
}

function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
```
**Key point:** The classic "three-pointer" reversal — `prev`, `curr`, `next`. **O(n) time, O(1) space.** Know both iterative and recursive versions.

```js
// Recursive version
function reverseListRecursive(head) {
  if (!head || !head.next) return head;
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}
```

### Q8. Detect Cycle in Linked List (Floyd's Cycle Detection)
```js
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```
**Key point:** "Tortoise and hare" — if there's a cycle, the fast pointer will eventually lap the slow one. **O(n) time, O(1) space.** Extension: to find the cycle's *start node*, reset one pointer to head after detection and move both one step at a time until they meet again.

### Q9. Merge Two Sorted Linked Lists
```js
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}
```
**Key point:** Use a **dummy head node** to avoid special-casing the first insertion — a pattern used constantly in linked list problems.

---

## 3. Stacks & Queues

### Q10. Valid Parentheses
```js
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}
```
**Key point:** Stack is the natural structure for "matching/nesting" problems. **O(n) time, O(n) space.**

### Q11. Implement a Queue using Two Stacks
```js
class MyQueue {
  constructor() { this.inStack = []; this.outStack = []; }
  push(x) { this.inStack.push(x); }
  pop() {
    if (!this.outStack.length) {
      while (this.inStack.length) this.outStack.push(this.inStack.pop());
    }
    return this.outStack.pop();
  }
}
```
**Key point:** Amortized **O(1)** per operation — each element moves between stacks at most twice in its lifetime.

---

## 4. Trees

### Q12. Binary Tree Traversals (Inorder, Level Order)
```js
class TreeNode {
  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }
}

function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const levelSize = queue.length, level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```
**Key point:** DFS traversals (in/pre/post-order) use recursion or an explicit stack; **level order (BFS) always uses a queue.** Track `levelSize` before the inner loop to separate levels correctly.

### Q13. Maximum Depth of Binary Tree
```js
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```
**Key point:** Simplest recursive tree pattern — solve for a node in terms of its children. **O(n) time, O(h) space** (h = height, for the call stack).

### Q14. Validate Binary Search Tree
```js
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}
```
**Key point:** A common mistake is only checking immediate children — you must **pass down bounds** through recursion, since every node in the left subtree must be less than *all* ancestors above it, not just its direct parent.

### Q15. Lowest Common Ancestor of a Binary Tree
```js
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}
```
**Key point:** Post-order recursion — the answer bubbles up when one node is found in each subtree. **O(n) time.**

---

## 5. Graphs

### Q16. BFS and DFS on a Graph (Adjacency List)
```js
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start], order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) dfs(graph, neighbor, visited, order);
  }
  return order;
}
```
**Key point:** Represent graphs as `{ node: [neighbors] }` (object or `Map`). BFS = queue, explores level by level (shortest path in unweighted graphs). DFS = stack/recursion, explores depth-first. **O(V + E) time** for both.

### Q17. Number of Islands
```js
function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function sink(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // mark visited
    sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') { count++; sink(r, c); }
    }
  }
  return count;
}
```
**Key point:** Grid = implicit graph, where each cell connects to its 4 neighbors. DFS "sinks" (marks visited) an entire connected component per island found. **O(rows × cols) time.**

### Q18. Topological Sort (Kahn's Algorithm — BFS based)
```js
function topoSort(numNodes, edges) {
  const graph = Array.from({ length: numNodes }, () => []);
  const inDegree = new Array(numNodes).fill(0);
  for (const [u, v] of edges) { graph[u].push(v); inDegree[v]++; }

  const queue = [];
  for (let i = 0; i < numNodes; i++) if (inDegree[i] === 0) queue.push(i);

  const result = [];
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    for (const neighbor of graph[node]) {
      if (--inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return result.length === numNodes ? result : []; // empty = cycle exists
}
```
**Key point:** Used for dependency ordering (course scheduling, build systems). If the result doesn't include all nodes, **a cycle exists**. **O(V + E) time.**

---

## 6. Recursion & Backtracking

### Q19. Subsets (Power Set)
```js
function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop(); // undo the choice
    }
  }
  backtrack(0, []);
  return result;
}
```
**Key point:** The backtracking template: **choose → explore → un-choose**. This exact skeleton solves subsets, permutations, combinations, and N-Queens with minor tweaks.

### Q20. Permutations
```js
function permute(nums) {
  const result = [];
  function backtrack(path, remaining) {
    if (!remaining.length) { result.push([...path]); return; }
    for (let i = 0; i < remaining.length; i++) {
      path.push(remaining[i]);
      backtrack(path, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
      path.pop();
    }
  }
  backtrack([], nums);
  return result;
}
```
**Key point:** **O(n!) time** — inherent to generating all permutations. Watch for this complexity explicitly when asked in interviews.

---

## 7. Dynamic Programming

### Q21. Fibonacci — Memoization vs Tabulation
```js
// Top-down (memoization)
function fibMemo(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}

// Bottom-up (tabulation), O(1) space
function fibTab(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}
```
**Key point:** Naive recursion is O(2^n); memoization/tabulation brings it to **O(n)**. Always mention both approaches and their space trade-offs (memo: O(n) space via cache + call stack; tabulation can often be reduced to O(1)).

### Q22. Climbing Stairs
```js
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```
**Key point:** Recognizing this is literally Fibonacci in disguise is the "aha" the interviewer wants.

### Q23. Longest Common Subsequence
```js
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = text1[i - 1] === text2[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
```
**Key point:** Classic 2D DP — build a table where `dp[i][j]` represents the answer for prefixes of length `i` and `j`. **O(m·n) time and space.** Template for edit distance, LCS, and similar string DP problems.

### Q24. 0/1 Knapsack
```js
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]; // don't take item i
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}
```
**Key point:** "Include or exclude" at every step is the core DP decision — appears across knapsack, subset-sum, partition-equal-subset problems.

---

## 8. Heaps (implement from scratch — JS has no built-in)

### Q25. Min-Heap Implementation
```js
class MinHeap {
  constructor() { this.heap = []; }

  peek() { return this.heap[0]; }

  push(val) {
    this.heap.push(val);
    this._siftUp(this.heap.length - 1);
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = last;
      this._siftDown(0);
    }
    return top;
  }

  _siftUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}
```
**Key point:** Backed by an array; parent/child indices computed via `i`, `2i+1`, `2i+2`. `push`/`pop` are **O(log n)**. This exact class is frequently expected to be written from memory — practice it. Used for: Kth largest element, merge K sorted lists, Dijkstra's algorithm.

### Q26. Kth Largest Element in an Array
```js
function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}
// O(n log n) — simple. For O(n log k), maintain a MinHeap of size k instead.
```
**Key point:** Mention the trade-off: sorting is simple but O(n log n); a size-`k` min-heap gets you **O(n log k)**, better when k << n.

---

## 9. Binary Search

### Q27. Classic Binary Search
```js
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); // avoids overflow (habit from other langs)
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```
**Key point:** **O(log n) time.** Always use `left + Math.floor((right-left)/2)` instead of `(left+right)/2` as a good habit.

### Q28. Search in Rotated Sorted Array
```js
function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) { // left half sorted
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else { // right half sorted
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
```
**Key point:** At every step, **one half is always properly sorted** — identify which half and check if the target lies within it. **O(log n) time.**

---

## 10. Sorting (know the trade-offs, not just implementations)

| Algorithm | Time (avg) | Time (worst) | Space | Stable? |
|---|---|---|---|---|
| Quick Sort | O(n log n) | O(n²) | O(log n) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No |
| Bubble/Insertion | O(n²) | O(n²) | O(1) | Yes |

### Q29. Merge Sort Implementation
```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}
```
**Key point:** Guaranteed **O(n log n)**, stable, but uses O(n) extra space — good answer when asked for a *stable* sort or worst-case guarantee (unlike quicksort).

### Q30. Quick Sort Implementation
```js
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```
**Key point:** In-place, average O(n log n), but **worst case O(n²)** on already-sorted input with a naive pivot choice — mention random/median-of-three pivot selection to mitigate this.

---

## 11. Complexity Cheat Sheet (say this out loud in interviews)

| Big-O | Name | Example |
|---|---|---|
| O(1) | Constant | Array index access, hash map lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop, array traversal |
| O(n log n) | Linearithmic | Efficient sorting (merge/heap/quick avg) |
| O(n²) | Quadratic | Nested loops, bubble sort |
| O(2ⁿ) | Exponential | Naive recursive Fibonacci, subsets brute force |
| O(n!) | Factorial | Generating all permutations |

**Interview habit:** Always state time **and** space complexity after presenting a solution, and mention the brute-force approach briefly before jumping to the optimized one — interviewers want to see you can compare trade-offs, not just recite a memorized answer.

---

## 12. Final Checklist Before the Test

- [ ] Can write `MinHeap`/`MaxHeap` from scratch without looking it up
- [ ] Comfortable with both recursive and iterative tree/graph traversal
- [ ] Know the backtracking template (choose → explore → un-choose) cold
- [ ] Can convert a recursive DP solution to memoized, then to tabulated
- [ ] Know when to use two pointers vs sliding window vs hash map for array/string problems
- [ ] Comfortable with dummy-node pattern for linked lists
- [ ] Can state time/space complexity for every solution without prompting
- [ ] Know BFS = queue (shortest path, level order), DFS = stack/recursion (exhaustive search, connectivity)
- [ ] Remember: `sort()` needs a comparator for numbers in JS
- [ ] Practice explaining your approach out loud before coding — most interviewers grade reasoning as much as the final code

Good luck with the test — if you want, I can also generate a smaller **timed mock problem set** (5–10 problems, no solutions shown upfront) to simulate the actual interview.
