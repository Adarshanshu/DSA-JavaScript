// remove duplicate from the array
// arr = [1,2,3,3,4,4,5,6,6,7]

let find1 = (nums)=>{
    let set = new Set();
    for(let i=0;i<nums.length;i++){
        set.add(nums[i]);
    }
    return Array.from(set);
}

// now removing the duplicates through different methods
// without using the set
// find2 function removes only consecutive duplicates 

let find2 = (nums)=>{
    let result = [];
    result[0] = nums[0];
    for(let i=1;i<nums.length;i++){
        if(nums[i]!==result[result.length-1]){
            result.push(nums[i])
        }
    }
    return result;
}
let nums = [1,2,3,3,4,4,5,6,6,7]
console.log(find1(nums));
console.log(find2(nums));