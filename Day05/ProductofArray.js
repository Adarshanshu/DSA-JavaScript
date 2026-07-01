function product(nums){
    // first calculate the prefix of the array
    // for example array is -> [1,2,3,4,5,6];
    // prefix product is -> [1,2,6,24,120,720];
    let ans  = [];
    ans[0] = 1;
    for(let i=1;i<nums.length;i++){
        ans[i] = ans[i-1]*nums[i-1];
    }
    // now we will calculate the suffix of the array
    let suffix = 1;
    for(let i=nums.length-1;i>=0;i--){
       ans[i] *=suffix;
       suffix *=nums[i];    
    }

    console.log(...ans);


};

let nums =[1,2,3,4,5,6];
// product(nums);
brute(nums);


// now we will solve this question using brute force aproach 

function brute(nums){
    let ans = [];
    for(let i=0;i<nums.length;i++){
         let product =1;
        for(let j=0;j<nums.length;j++){
            if(i!==j){
                product *= nums[j];
            }
        }
        ans[i] = product;
        
    }
     console.log(...ans);
   
};