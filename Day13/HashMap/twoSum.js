 // solving two sum through the hashMap 

 function answer(nums,target){
    let map = new Map();
    for(let i=0;i<nums.length;i++){
        let complement = target - nums[i];
        if(map.has(complement)){
            return [nums[i],complement];
        }
        map.set(nums[i],i);
    }
    return [];
 }

 let nums = [16,4,23,8,15,42,1,2];
 let target = 19;

 console.log(answer(nums,target));
