'use strict';

const limparFormulario = (endereco) => {
    
    document.getElementById('endereco').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

const preencherFormulario = (endereco) => {
    
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('numero').value = endereco.complemento;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const isNumber = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && isNumber(cep);

const pesquisarCep = async() => {

    limparFormulario();
    
    const cep = document.getElementById('cep').value;
    
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if(cepValido(cep)){
    const dados = await fetch(url);

    const endereco = await dados.json();

    if(endereco.hasOwnProperty('erro')){
        alert('CEP invalido! Por Favor, verifique se não esqueceu de nenhum número!')
    }else{
        preencherFormulario(endereco);
    }

}else{
    alert('CEP invalido! Por Favor, verifique se não esqueceu de nenhum número!')
}
    
    //metodo antigo
    //fetch(url).then(response => (response.json()).then(console.log));
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

