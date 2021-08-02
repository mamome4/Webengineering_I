var myArray = [];
var temp;

for(let i = 0; i < 10; i++){
    myArray[i] = Math.round(Math.random() * 100);
}

for(let i = 0; i < myArray.length; i++){
    for(let j = 0; j < myArray.length; j++){
        if(myArray[j] >= myArray[j + 1]){
            temp = myArray[j];
            myArray[j] = myArray[j + 1];
            myArray[j + 1] = temp;
        }
    }
}

for(let i = 0; i < myArray.length; i++){
    console.log(myArray[i]);
}