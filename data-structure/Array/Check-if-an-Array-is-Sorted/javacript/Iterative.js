function isSorted(arr){
    
    let n = arr.length;
    // Iterate over the array and check if 
    // every element is greater than or
    // equal to previous element.
    for (let i = 1; i < n; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    
    return true;
}

// Driver Code
let arr = [10, 20, 30, 40, 50];
let n = arr.length;

if (isSorted(arr)) {
    console.log("true");
} else {
    console.log("false");
}