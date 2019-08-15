import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { LoginService } from "./login.service";
import { environment } from "../../environments/environment";
import { map, mapTo, flatMap, delay, catchError } from "rxjs/operators";
import { Route, Router } from "@angular/router";
@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // se for requisição pro keycloak, deixa ir
    if (req.url === environment.keycloak_backend) return next.handle(req);

    const clonarRequisicao = () =>
      req.clone({ setHeaders: { Authorization: this.loginService.accessToken } });

    if (this.loginService.isLogado()) {
      const accessTokenPayload = this.loginService.accessTokenPayload;
      const _30Milisegundos = 30_000;

      // se o access_token estiver a menos de 30 segundos de expirar o token, renova logo
      if (accessTokenPayload.validade.getTime() - Date.now() < _30Milisegundos) {
        return this.loginService.atualizarToken().pipe(
          flatMap(resp => {
            if (resp.ok) {
              return next.handle(clonarRequisicao());
            }
          })
        );
      } else return next.handle(clonarRequisicao());
    } else return next.handle(clonarRequisicao());
  }
}
