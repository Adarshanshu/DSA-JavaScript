let remove = function(nums){
    let j = 0;
    for(let i=1;i<nums.length;i++){
        if(nums[i]!=nums[j]){
            nums[j] = nums[i];
            j++;
        }
    }
    return j+1;
};

let nums = [1,1,1,1,1,2];
console.log(remove(nums));