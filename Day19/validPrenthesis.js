
// 678. Valid Parenthesis String

// Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

// The following rules define a valid string:

// Any left parenthesis '(' must have a corresponding right parenthesis ')'.
// Any right parenthesis ')' must have a corresponding left parenthesis '('.
// Left parenthesis '(' must go before the corresponding right parenthesis ')'.
// '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".
 

// Example 1:

// Input: s = "()"
// Output: true


// Example 2:

// Input: s = "(*)"
// Output: true


// Example 3:

// Input: s = "(*))"
// Output: true


// Example 4:

// Input: s = "("
// Output: false


let answer = (s)=>{
     let leftStack = [];
    let starStack = [];
    for(let i=0;i<s.length;i++){
        if(s[i]==='('){
            leftStack.push(i);
        }
        else if(s[i]==='*'){
            starStack.push(i);
        }
        else{
            if(leftStack.length>0){
                leftStack.pop();
            }
            else if(starStack.length>0){
                starStack.pop();
            }
            else{
                return false;
            }
        }
    }

    while(leftStack.length>0 && starStack.length>0){
        if(leftStack[leftStack.length-1]<starStack[starStack.length-1]){
            leftStack.pop();
            starStack.pop();
        }
        else{
            return false;
        }
    }
    return leftStack.length===0;
}

let s = "(*))";
console.log(answer(s));