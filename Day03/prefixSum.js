function prefix(nums){
    let sum = new Array(nums.lenngth);
    sum[0] = nums[0];
    for(let i=1;i<nums.length;i++){
        sum[i] = sum[i-1] +nums[i];
       
    }
      console.log(...sum);
   
}
nums = [1,2,3,4,5,6,7];
prefix(nums);