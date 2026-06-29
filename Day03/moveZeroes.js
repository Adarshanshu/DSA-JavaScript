let move = (nums) =>{
    let j =0;
    for(let i=0;i<nums.length;i++){
        if(nums[i]!==0){
            let temp = nums[j];
            nums[j] = nums[i];
            nums[i] = temp;
            j++;
        }
    }
    console.log(...nums);
}
let nums = [10,0,2,0,3,0,5];
move(nums);


// in this question we do swapping of number which are not zero , 