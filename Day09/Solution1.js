// we have to find the sum of all the single digit number and sum of all double digit number
// if single digit sum is higher print single otherwise print double

let find = (nums)=>{
    let single =0;
    let double = 0;
    for(let num of nums){
        if(num<10){
            single += num;
        }
        else{
            double +=num;
        }
    }
    if(single>double){
        console.log("Single");
    }
    else if(single===double){
        console.log("Equal");
    }
    else{
        console.log("Double")
    }
}
let nums = [1,2,3,4,5,15]
find(nums)