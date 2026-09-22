import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue){

  // Do you already have something saved under this key?
  const savedValue = localStorage.getItem(key);

  let startingValue;

  // if save value exists turn it from a string back into javascript data
  if(savedValue){
    startingValue = JSON.parse(savedValue)
  } else{
    startingValue = initialValue;
  }

  const [value, setValue] = useState(startingValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue];
}

export default useLocalStorage;