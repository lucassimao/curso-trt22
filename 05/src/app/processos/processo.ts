interface Processo{
    numero:string;
    descricao:string;
    
    _links?:{
        self: {href:string},
        advogado: {href:string}
    }
}

export default Processo;