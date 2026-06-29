var rotate = (nums,k)=>{
    // in this question we have to rotate array by k steps
    //for example if nums =[1,2,3,4,5,6,7];
    // then output must be = [5,6,7,1,2,3,4];
    //to chive this we have to roate the array
     k = k%nums.length;
     revNumbers(nums,0,nums.length-1);
     revNumbers(nums,0,k-1);
     revNumbers(nums,k,nums.length-1);
    console.log(...nums);
};

let revNumbers = (nums,start,end )=>{
    while(start<end){
        let temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

let nums= [1,2,3,4,5,6,7];
let k = 3;
rotate(nums,k);

