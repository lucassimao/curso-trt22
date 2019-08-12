
let contador = 0;

function somar(a,b){
    console.log(`${contador++} operações realizadas`);
    return a+b;
}
function multiplicar(a,b){
    console.log(`${contador++} operações realizadas`);
    return a*b;
}

// funções somar e multiplicar encapsuladas
// exportando apenas a função calculadora
export default function calculadora(operacao,a,b){
    switch(operacao){
        case '+':
            return somar(a,b);
        case '*':
            return  multiplicar(a,b);
    }
}



