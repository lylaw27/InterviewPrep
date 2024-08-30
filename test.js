function romanToInt(s) {
    let roman = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }
    let value = 0;
    for(let i = 0; i<s.length-1 ; i++){
        if(roman[s.charAt(i)] >= roman[s.charAt(i+1)]){
            value += roman[s.charAt(i)];
        }
        else{
            value -= roman[s.charAt(i)];
        }
        console.log(s.charAt(i))
    }
    value += roman[s.charAt(s.length-1)];
    return value
};

console.log(romanToInt("LVIII"))