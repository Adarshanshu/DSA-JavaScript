function removeDuplicate(str){
    let result = "";
    for(let i=0;i<str.length;i++){
        let flag = false;
        for(let j=0;j<result.length;j++){
            if(str[i]===result[j]){
                flag = true;
                break;
            }
        }
        if(!flag){
                result += str[i];
            }
    }
    return result;
};

let str = "Programming";
let answer = removeDuplicate(str);
console.log(answer);
otimized(str);

function otimized(str){
    let set = new Set();
    let result = "";
    for(let ch of str){
        if(set.has(ch)){
            continue;
        }else{
            set.add(ch);
        }
    }
    console.log(set);
}