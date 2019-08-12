namespace Dominio {

    // são internos ao namespace
    enum TipoPessoa {
      Fisica,
      Juridica
    }
    class Pessoa {
      nome: string;
      id: number;
      tipo: TipoPessoa;
  
      constructor(id: number, nome: string, tipo: TipoPessoa) {
        this.nome = nome;
        this.id = 1;
        this.tipo = tipo;
      }
    }
  
    // com export podem ser acessaos externamente
    export class PessoaFisica extends Pessoa {
      constructor(id: number, nome: string) {
        super(id, nome, TipoPessoa.Fisica);
      }
    }
  
    export enum FaseProcesso {
      AnaliseDoConhecimento,
      DarCiencia,
      Arquivar
    }
  
    export class Advogado extends Pessoa {
      oab: string;
  
      constructor(id: number, nome: string, oab: string) {
        super(id, nome, TipoPessoa.Fisica);
        this.oab = oab;
      }
  
    }
  
    export class Processo {
      static regional = 22; // propriedades estáticas
  
      numero: string; //tipos básicos string, bool, number
      poloAtivo: [Pessoa, Advogado]; //tupla
      poloPassivo: [Pessoa, Advogado]; // atributos publicos por padrão
      private fase: FaseProcesso; // atributo privado
      private documentos: Array<string | number[]> = []; // array com multiplos tipos e inicializado com array vazio
  
      constructor(numero: string, poloAtivo: [Pessoa, Advogado], poloPassivo: [Pessoa, Advogado]) {
        this.numero = numero;
        this.poloAtivo = poloAtivo;
        this.poloPassivo = poloPassivo;
      }
  
      // constructor(poloAtivo: [Pessoa,Advogado]){
      //  ñ permite sobrecarga de construtores
      // }
  
      // tipos de paramatro e retorno
      tramitar(fase: FaseProcesso): void {
        this.fase = fase;
      }
  
      adicionarDocumento(documento: string | number[]): void {
        this.documentos.push(documento);
      }
    }
  }

  export default Dominio;