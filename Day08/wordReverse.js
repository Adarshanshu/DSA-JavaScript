let reverse = (str)=>{
    let result = "";
    let word = "";
    for(let i=str.length-1;i>=0;i--){
        if(str[i]!==" "){
            word = str[i] + word;
        }
        else{
            result += word +" ";
            word = " ";
        }
       
    }
     result = result + word;
    return result;
};

let str = "my name is Adarsh";
let a = reverse(str);
console.log(a);