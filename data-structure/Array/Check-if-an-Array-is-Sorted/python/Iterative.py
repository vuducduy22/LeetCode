def isSorted(arr):
    
    n = len(arr)
    # Iterate over the array and check if 
    # every element is greater than or
    # equal to previous element.
    for i in range(1, n):
        if (arr[i-1] > arr[i]):
            return False

    return True


if __name__ == "__main__":
  arr = [10, 20, 30, 40, 50]
  n = len(arr)
  if (isSorted(arr)):
     print("true")
  else:
     print("false")