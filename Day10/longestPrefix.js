let longest = (arr)=>{
    if(arr.length===0){
        return "";
    }
    let prefix ="";
    for(let i=0;i<arr[0].length;i++){
        let currChar = arr[0][i];
        for(let j=1;j<arr.length;j++){
            if(arr[j][i]!==currChar){
                return prefix;
            }
        }
        prefix += currChar;
    }
    return prefix;
};

let arr = ["flower","flow","fly"];
let result = longest(arr);
console.log(result);