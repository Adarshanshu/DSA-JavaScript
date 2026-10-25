let find = (num)=>{
    let mid = [];
    let ans = [];
    while(num>0){
        let a = num%2;
        mid.push(a);
        num = Math.floor(num/2);
    }
    while(mid.length>0){
        ans.push(mid.pop());
    }
    return ans.join("");

}

console.log(find(10));