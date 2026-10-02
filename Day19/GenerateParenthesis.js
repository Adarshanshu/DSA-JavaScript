
// 22. Generate Parentheses

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

// Example 1:

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]


// Example 2:

// Input: n = 1
// Output: ["()"]

let answer = (n)=>{
 let stack = [];
 function backTrack(current,open,close){
    if(open===0 && close===0){
        stack.push(current);
    }
    if(open>0){
        backTrack(current+'(',open-1,close);
    }
    if(close>open){
        backTrack(current+')',open,close-1);
    }
 }
 backTrack("",n,n);
 return stack;
}

let n= 3;
console.log(answer(n));