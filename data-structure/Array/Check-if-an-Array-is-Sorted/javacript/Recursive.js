function isSortedhelper(arr, n) {

    // Base case
    if (n == 1 || n == 0) {
        return true;
    }
    
    // Check if current and previous elements are in order
    // and recursively check the rest of the array
    return arr[n - 1] >= arr[n - 2] && isSortedhelper(arr, n - 1);
}

function isSorted(arr){
    
    let n = arr.length;
    return isSortedhelper(arr, n);
}
// Driver Code
let arr = [10, 20, 30, 40, 50];
let n = arr.length;

if (isSorted(arr)) {
    console.log("true");
} 
else {
    console.log("false");
}