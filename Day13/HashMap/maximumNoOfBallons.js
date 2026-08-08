// 1189. Maximum Number of Balloons

// Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.

// You can use each character in text at most once. Return the maximum number of instances that can be formed.

 

// Example 1:



// Input: text = "nlaebolko"
// Output: 1



// Example 2:



// Input: text = "loonbalxballpoon"
// Output: 2




// Example 3:

// Input: text = "leetcode"
// Output: 0



let find = (text)=>{
    let freq = {};
    for(let ch of text){
        freq[ch] = (freq[ch]||0)+1;
    }
    let b = freq['b']||0;
    let a = freq['a']||0;
    let l = Math.floor((freq['l']||0)/2);
    let o = Math.floor((freq['o']||0)/2);
    let n = freq['n']||0;

    return Math.min(b,a,l,o,n);
}

let  text = "loonbalxballpoon";
console.log(find(text));