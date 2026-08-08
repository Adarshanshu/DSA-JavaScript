// 383. Ransom Note

// Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

// Each letter in magazine can only be used once in ransomNote.

 

// Example 1:

// Input: ransomNote = "a", magazine = "b"
// Output: false


// Example 2:

// Input: ransomNote = "aa", magazine = "ab"
// Output: false


// Example 3:

// Input: ransomNote = "aa", magazine = "aab"
// Output: true

let find = (ransomNote,magazine)=>{
    let freq = {};
    for(let ch of magazine){
        freq[ch] = (freq[ch]||0)+1;
    }
    for(let ch of magazine){
        if(freq[ch]===0 || freq[ch]===undefined){
            return false;
        }
        freq[ch]--;
    }
    return true;
}

let ransomNote = 'aa' ,  magazine = 'aab';
console.log(find(ransomNote,magazine));