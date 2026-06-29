let majority = (nums) =>{
    // to solve this question we will use the boyer's moore algorithm which says that increase the frequency 
    // if you encounter same number otherwise decrease the frequebncy 
    let freq =0;
    let ans = 0;
    for(let i=0;i<nums.length;i++){
        if(freq===0){
            ans = nums[i];
        }
        if(ans===nums[i]){
            freq++;
        }
        else{
            freq--;
        }
    }
    return ans;
};

let nums = [1,2,3,4,2,2,1,2,4,2];
console.log(majority(nums));