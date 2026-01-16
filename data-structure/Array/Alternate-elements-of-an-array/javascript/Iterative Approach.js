// The idea is to start iterating from index 0, 
// print the element at that index, 
// and then increment the index by 2 to move to the next alternate element. 
// Keep on printing the elements till we reach the end of the array.

// Iterate JavaScript Program to print alternate elements
// of the array

function getAlternates(arr) {
    let res = [];
    
    // Iterate over all alternate elements
    for (let i = 0; i < arr.length; i += 2) {
        res.push(arr[i]);
    }
    return res;
}


// Driver Code
const arr = [10, 20, 30, 40, 50];
const res = getAlternates(arr);
console.log(res.join(" "));

// Time Complexity: O(n), where n is the number of elements in arr[].
// Auxiliary Space: O(1)