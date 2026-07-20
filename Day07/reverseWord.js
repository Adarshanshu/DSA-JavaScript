// in this we will reverse the array without using the inbuilt method

let reverse = (arr)=>{
    let start = 0;
    let end = arr.length-1;
    while(start<end){
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;

        start++;
        end--;
    }
    return arr;
};

let arr = [1,2,3,4,5,6,7];
let result = reverse(arr);
console.log(result);