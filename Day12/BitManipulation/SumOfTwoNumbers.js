// 371. Sum of Two Integers

// Given two integers a and b, return the sum of the two integers without using the operators + and -.

 

// Example 1:

// Input: a = 1, b = 2
// Output: 3



// Example 2:

// Input: a = 2, b = 3
// Output: 5



let find = (a,b)=>{
    while(b>0){
        let sum = a^b;
        let carry = (a&b)>>1;
        a= sum;
        b= carry;
    }
    return a ;
}

console.log(find(3,4));