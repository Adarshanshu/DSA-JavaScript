// group character on the basis of the frequency
// just like s = "aabbccc"
//output = {a:2,b:2,c:3}

function answer1(s){
  let result = s.split("").reduce((acc,val)=>{
  acc[val] = (acc[val]||0)+1;
  return acc;
  },{})
  return result;
}

let s = "aabbccc";
console.log(answer1(s));



let answer2 = (s)=>{
    let freq = {};
  for(let ch of s){
    if(freq[ch]){
        freq[ch]++;
    }
    else{
        freq[ch] = 1;
    }
  }
  console.log(freq);
}

answer2(s);