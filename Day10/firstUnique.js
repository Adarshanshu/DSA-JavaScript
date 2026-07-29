let unique = (str)=>{
    for(let i=0;i<str.length;i++){
        let flag = true;
        for(let j=0;j<str.length;j++){
            if(i!==j && str[i]===str[j]){
                flag = false;
                break;
            }
        }
        if(flag){
            return str[i];
        }
    }
    return "not any unique Character"
};

let str = "aadaacbbbbb";
let result = unique(str);
console.log(result);
