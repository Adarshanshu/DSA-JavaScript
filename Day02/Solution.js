var longestSequence = function(nums){
    let set = new Set(nums);
    let longest = 0 ;

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

let nums = [100,4,200,1,2,3];
console.log(longestSequence(nums));