// We can also print the alternate elements using recursion. 
// We start from index = 0, 
// that is the first element of the array and print its value. 
// We then call the recursive function again with the (index + 2) as the current index.

// Recursive JavaScript Program to print alternate
// elements of the array

// Recursive function to store all alternate elements
function getAlternatesRec(arr, idx, res) {
    if (idx < arr.length) {
        res.push(arr[idx]);
        getAlternatesRec(arr, idx + 2, res);
    }
}

function getAlternates(arr) {
    let res = [];
    getAlternatesRec(arr, 0, res);
    return res;
}

// Driver Code
let arr = [10, 20, 30, 40, 50];
let res = getAlternates(arr);
console.log(res.join(" "));

// Time Complexity: O(n), where n is the number of elements in arr[].
// Auxiliary Space: O(n), for recursive call stack.