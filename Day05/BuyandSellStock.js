function stock(prices){
    let buyPrice = Infinity;
    let maxProfit = 0;

    for(let i=0;i<prices.length;i++){
        if(prices[i]>buyPrice){
            let profit = prices[i]-buyPrice;
            maxProfit =  Math.max(maxProfit,profit);
        }
        else{
            buyPrice = prices[i];
        }
    }
    return maxProfit;
};

let prices = [12,2,3,5,7,31,19];
console.log(stock(prices));