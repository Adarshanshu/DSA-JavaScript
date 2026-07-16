function findMissing(nums){
    let n = nums.length+1;
    let sum = 0;
    for(let i=0;i<nums.length;i++){
        sum += nums[i];
    }
    let calSum = n*(n+1)/2;
    let answer = calSum - sum ;
    console.log(answer)
}
let nums = [1,2,3,4,5,6,8];
findMissing(nums);
