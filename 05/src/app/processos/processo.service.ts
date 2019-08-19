import { Injectable } from '@angular/core';
import Processo from './processo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResultadoPaginadoProcesso } from '../advogados/cadastro/resultado.paginado';
import { Advogado } from '../advogados/advogado';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
 
  constructor(private http: HttpClient) { }

  listar(pagina: number, tamanhoPagina: number, advogado: Advogado, filtroNumero = '', filtroDescricao = ''): 
      Observable<ResultadoPaginadoProcesso> {
        let urlFinal = '';
        let params = new HttpParams({fromObject : {page: String(pagina), 
                            size: String(tamanhoPagina),
                            advogado: advogado._links.self.href,
                            sort: 'id,desc'}});

        if (filtroNumero && filtroDescricao){
          urlFinal = `${environment.backend}/processos/search/findByNumeroContainingAndDescricaoIgnoreCaseContainingAndAdvogado`;
          params = params.append('numero',filtroNumero)
                .append('descricao',filtroDescricao)
        } else if (filtroNumero) {
          urlFinal = `${environment.backend}/processos/search/findByNumeroContainingAndAdvogado`;
          params =params.append('numero',filtroNumero);
        } else if (filtroDescricao){
          urlFinal = `${environment.backend}/processos/search/findByDescricaoIgnoreCaseContainingAndAdvogado`;
          params = params.append('descricao',filtroDescricao);
        } else {
          urlFinal = advogado._links.processos.href;
        }

        return this.http.get<ResultadoPaginadoProcesso>(urlFinal,{params});
  }

  salvar(advogado: Advogado, processo: Processo): Observable<any> {

    if ('_links' in processo && processo._links.self) {
      return this.http.put<void>(
        processo._links.self.href,
        processo,
        { observe: 'response' });
    } else {
      return this.http.post<void>(`${environment.backend}/processos`, processo, { observe: 'response' })
        .pipe(flatMap(res => {
          const { headers } = res;
          return this.associarProcesso(advogado,headers.get('Location'));
        }));

    }
  }

  excluir(processo: Processo): Observable<void> {
    return this.http.delete<void>(processo._links.self.href);
  }


  associarProcesso(advogado: Advogado, endpoint: string): Observable<any> {
    const headers = new HttpHeaders({ 'content-type': 'text/uri-list' })
    return this.http.put(endpoint + '/advogado',
      advogado._links.self.href,
      { headers, observe: 'response' });
  }


}
