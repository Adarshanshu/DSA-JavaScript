let intersaction = (arr1,arr2,arr3)=>{
    let result = [];
    let index =0;
    for(let i=0;i<arr1.length;i++){
        let secondFound = false;
        let thirdFound = false;
        for(let j=0;j<arr2.length;j++){
            if(arr1[i]===arr2[j]){
                secondFound = true;
                break;
            }
        }
        for(let k=0;k<arr3.length;k++){
            if(arr1[i]===arr3[k]){
                thirdFound = true;
                break;
            }
        }
        if(secondFound && thirdFound){
            result[index] = arr1[i];
            index++;
        }
    }
    return result;
}

let arr1 = [1,2,3,4,5,6,7,8];
let arr2 = [90,98,45,6,7,8];
let arr3 = [12,13,14,6,7,8];

let answer = intersaction(arr1,arr2,arr3);
console.log(answer);