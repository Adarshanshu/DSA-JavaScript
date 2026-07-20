let copy = function(arr1,arr2){
    let index = 0;
    let answer = [];
    for(let i=0;i<arr1.length;i++){
        answer[index] = arr1[i];
        index++;
    }
    for(let i=0;i<arr2.length;i++){
        answer[index] = arr2[i];
        index++;
    }
    return answer;
};

let arr1 = [1,2,3,4,5];
let arr2 = [6,7,8,9];
let result = copy(arr1 , arr2);
console.log(result);
