let same = (arr1,arr2)=>{
    let answer = [];
    let index = 0;
    for(let i=0;i<arr1.length;i++){
        for(let j=0;j<arr2.length;j++){
            if(arr1[i]===arr2[j]){
                answer[index] = arr1[i];
                index++;
                break;
            }
        }
    }
    return answer;
};

let  arr1 = [1,2,3,4,5,6,7];
let arr2 = [1,23,45,78,5,4];
let result = same(arr1,arr2);
console.log(result);