
// 205. Isomorphic Strings

// Given two strings s and t, determine if they are isomorphic.

// Two strings s and t are isomorphic if the characters in s can be replaced to get t.

// All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

 

// Example 1:

// Input: s = "egg", t = "add"

// Output: true

// Explanation:

// The strings s and t can be made identical by:

// Mapping 'e' to 'a'.
// Mapping 'g' to 'd'.



// Example 2:

// Input: s = "f11", t = "b23"

// Output: false

// Explanation:

// The strings s and t can not be made identical as '1' needs to be mapped to both '2' and '3'.




// Example 3:

// Input: s = "paper", t = "title"

// Output: true


let find = (s,t)=>{
    if(s.length!==t.length){
        return false;
    }    

        let mapST = {};
        let mapTS = {};

        for(let i=0;i<s.length;i++){
            let charS = s[i];
            let charT = t[i];

            if((mapST[charS] && mapST[charS]!==charT)|| (mapTS[charT] && mapTS[charT]!==charS)){
                return false;
            }
            mapST[charS] = charT;
            mapTS[charT] = charS;
        }
        return true;
    
}

let s = "paper", t = "title";
console.log(find(s,t));