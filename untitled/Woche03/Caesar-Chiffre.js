var str = "HALLO";
var shift = 10;
var result = "";

console.log(str);

function encrypt(str, shift){
    for(let i = 0; i < str.length; i++){
        var c  = str.charCodeAt(i);

        if(c >= 65 && c <=  90){
            //uppercase letters
            result += String.fromCharCode((c - 65 + shift) % 26 + 65);

            //lowercase letters
        }else if(c >= 97 && c <= 122){
            result += String.fromCharCode((c - 97 + shift) % 26 + 97);

            //if it's not a letter, let it through
        }else {
            result += str.charAt(i);
        }
    }
    console.log(result);
}

encrypt(str, shift);

