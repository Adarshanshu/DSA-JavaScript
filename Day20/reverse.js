// if any given string is written in reverse order 
// change it in non-reverse order
// input = "olleh";
//output = "hello";


let find = (s)=>{
    let arr = s.split("");
    let start = 0;
    let end = arr.length-1;
    while(start<=end){
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
    return arr.join("");
};

let s = "hsrada";
console.log(find(s));