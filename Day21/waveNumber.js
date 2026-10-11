// we have to find the pattern in which there is wave like patten
//   =>  /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//   number shoulbe greater then the previous and upcoming number 


// let nums = [2,5,6,7,4,1];
// output = [2,6,5,7,1,4]


let find = (nums)=>{
    let n =  nums.length;
   for(let i=1;i<nums.length;i +=2){
    if(i-1>=0 && nums[i]<nums[i-1]){
        [nums[i],nums[i-1]] = [nums[i-1],nums[i]];
    }
    if(i+1<n && nums[i]<nums[i+1]){
        [nums[i],nums[i+1]] = [nums[i+1],nums[i]];
    }
   }
   return nums;
}

let nums = [2,5,6,7,4,1];
console.log(find(nums));