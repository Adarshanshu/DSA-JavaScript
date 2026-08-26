// 128. Longest Consecutive Sequence

// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

// You must write an algorithm that runs in O(n) time.

 

// Example 1:

// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.



// Example 2:

// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9


// Example 3:

// Input: nums = [1,0,1,2]
// Output: 3

let find = (nums)=>{
    let longest = 0;
    let set = new Set(nums);
    for(let num of set){
        if(!set.has(num-1)){
            let current = num;
            let length = 1;

            while(set.has(current+1)){
                length++;
                current++;
            }
            longest = Math.max(longest,length);
        }
    }
    return longest;
};

let nums = [0,3,7,2,5,8,4,6,0,1];
console.log(find(nums));