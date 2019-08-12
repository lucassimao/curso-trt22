import Dominio from './dominio';

namespace Dao {
    // restrito apenas ao namesapce
    // interface generica
    interface DaoGenerico<T> {
      salvar(objeto: T): void;
    }
  
    export class ProcessoDao implements DaoGenerico<Dominio.Processo> {
      salvar(processo: Dominio.Processo): void {
        // ...
        //   return 1; // ñ funciona
      }
    }
  }

  export default Dao;