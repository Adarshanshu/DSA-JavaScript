
// 856. Score of Parentheses

// Given a balanced parentheses string s, return the score of the string.

// The score of a balanced parentheses string is based on the following rule:

// "()" has score 1.
// AB has score A + B, where A and B are balanced parentheses strings.
// (A) has score 2 * A, where A is a balanced parentheses string.
 

// Example 1:

// Input: s = "()"
// Output: 1


// Example 2:

// Input: s = "(())"
// Output: 2


// Example 3:

// Input: s = "()()"
// Output: 2

var scoreOfParentheses = function(s) {
    let stack = [0]; // base frame

    for (let ch of s) {
        if (ch === '(') {
            stack.push(0); // new frame
        } else {
            let v = stack.pop(); // score inside ()
            let top = stack.pop();
            stack.push(top + Math.max(2 * v, 1));
        }
    }

    return stack[0];
};

 s = "()()";

 console.log(scoreOfParenthesis(s));
