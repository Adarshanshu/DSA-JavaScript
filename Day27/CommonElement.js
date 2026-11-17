// we are given three array and , in these three there are some common element , so
// we have to find these common element
// after finding common element we have to print the common element in the separate array

let find = (arr1, arr2, arr3) => {
  let result = [];
  let index = 0;

  for (let i = 0; i < arr1.length; i++) {
    let foundSecond = false;
    let foundThird = false;
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        foundSecond = true;
        break;
      }
    }
    if (foundSecond) {
      for (let k = 0; k < arr3.length; k++) {
        if (arr1[i] === arr3[k]) {
          foundThird = true;
          break;
        }
      }
    }
   if(foundSecond && foundThird){
    result[index] = arr1[i];
    index++;
   }
  }
  return result;
};

let arr1 = [1,2,3,4,5];
let arr2 = [7,8,9,1,2,3];
let arr3 = [12,34,45,1,2,3];

console.log(find(arr1,arr2,arr3));
