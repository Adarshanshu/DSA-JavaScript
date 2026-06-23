var moveZeroes = function(nums){
    let j = 0;
    for(let i=0;i<nums.length;i++){
        if(nums[i]!=0){
            let temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
            j++;
        }
       
    }
    console.log(nums);
};
let arr = [0, 1, 0, 3, 12];
moveZeroes(arr);
// During loop: prints each element step by step
// After loop: arr is modified to [1, 3, 12, 0, 0]
