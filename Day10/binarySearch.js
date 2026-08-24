let find = (nums,target)=>{
    let start =0;
    let end = nums.length-1;
    while(start<end){
        let mid = Math.floor((start+end)/2);
        if(nums[mid]===target){
            return mid;
        }
        else if(nums[mid]>target){
            end = mid-1;
        }
        else{
            start = start+1;
        }
    }
    return -1;
};

let nums = [1,2,3,4,5,6,7,8,9];
let target = 7;
console.log(find(nums,target));