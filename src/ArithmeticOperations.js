var ArithmeticOperations = {

    '+': function(a, b){
        return a+b;
    },

    '-': function(a, b){
        return a-b;
    },

    '*': function(a, b){
        return a*b;
    },

    '/': function(a, b){
        let result = a/b;
        return result
    },

    "round": function(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

};

export default ArithmeticOperations;
