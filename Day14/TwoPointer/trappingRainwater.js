// 42. Trapping Rain Water

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

// Example 2:

// Input: height = [4,2,0,3,2,5]
// Output: 9


var trap = function(height){
    let left = 0;
    let right = height.length-1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
    while(left<right){
        if(height[left]<height[right]){
            if(height[left]>leftMax){
                leftMax = height[left];
            }
            else{
                water += leftMax - height[left];
            }
            left++;
        }
        else{
            if(height[right]>rightMax){
                rightMax = height[right];
            }
            else{
                water += rightMax - height[right];
            }
            right--;
        }
    }
    return water;
};

let height = [0,1,0,2,1,0,1,3,2,1,2,1];

console.log(trap(height));