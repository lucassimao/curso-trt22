import { Component, OnInit, ViewChild } from "@angular/core";
import { Advogado } from "../advogado";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { AdvogadoService } from "../advogado.service";
import { Router } from "@angular/router";
import { DataSourceTabela } from "./datasource.tabela";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"]
})
export class CadastroComponent implements OnInit {
  advogado: Advogado = { nome: "", email: "", oab: "", telefone: "" };
  colunas: string[] = ["nome", "oab", "email", "telefone", "editar", "excluir","processos"];
  dataSource: DataSourceTabela;
  exibirSpinner = false;
  tamanhoPagina = 10;
  totalDeAdvogados = 0;
  paginaAtual = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("formulario") formulario: NgForm;

  constructor(private advogadoService: AdvogadoService, private router: Router) {
    this.resetarFormulario();
  }

  ngOnInit() {
    this.dataSource = new DataSourceTabela();
    this.dataSource.paginator = this.paginator;
    this.atualizarListaDeAdvogados({});
  }

  // recebe um PageEvent
  atualizarListaDeAdvogados({ pageIndex: pagina = 0, pageSize: tamanhoPagina = this.tamanhoPagina }) {
    this.exibirSpinner = true;

    return this.advogadoService.listar(pagina, tamanhoPagina).subscribe(
      resultadoPaginado => {
        this.totalDeAdvogados = resultadoPaginado.page.totalElements;
        this.tamanhoPagina = resultadoPaginado.page.size;
        this.paginaAtual = resultadoPaginado.page.number;
        this.dataSource.atualizarDados(resultadoPaginado._embedded.advogados);
        this.exibirSpinner = false;
      },
      erro => {
        this.exibirSpinner = false;
        alert(erro.message);
        if (erro.forcarNovaAutenticacao) this.router.navigate(["/login"]);
      }
    );
  }

  editar(advogado: Advogado): void {
    this.advogado = { ...advogado };
    // this.formulario.form.markAsDirty();
  }

  excluir(advogado: Advogado): void {
    const resposta = confirm(`Deseja realmente excluir ${advogado.nome}?`);
    if (resposta) {
      //   this.exibirSpinner = true;
      this.advogadoService
        .excluir(advogado)
        // .pipe(tap(_ => (this.exibirSpinner = false)))
        .subscribe(
          () => {
            alert("Advogado excluído com sucesso");
            this.atualizarListaDeAdvogados({
              pageIndex: this.paginaAtual,
              pageSize: this.tamanhoPagina
            });
          },
          erro => {
            console.log(erro);
            alert(erro.message);
          }
        );
    }
  }

  salvarAdvogado(evento): void {
    evento.preventDefault();
    this.exibirSpinner = true;

    this.advogadoService.salvar(this.advogado).subscribe(
      response => {
        this.exibirSpinner = false;
        if (response.ok) {
          if (this.isModoEdicao()) alert("Advogado atualizado com sucesso");
          else alert("Advogado salvo com sucesso");

          this.atualizarListaDeAdvogados({
            pageIndex: this.isModoEdicao() ? this.paginaAtual : 0,
            pageSize: this.tamanhoPagina
          });
          this.resetarFormulario();
        }
      },
      httpErrorResponse => {
        this.exibirSpinner = false;
        console.log(httpErrorResponse);

        switch (httpErrorResponse.status) {
          case 0:
            alert("Não foi possível enviar requisição: verifique conexão da sua máquina");
            break;
          case 403:
            alert(httpErrorResponse.message);
            if (httpErrorResponse.forcarNovaAutenticacao) {
              this.router.navigate(["/login"]);
              return;
            }
            break;
          case 412:
            let msg = "Erro de validação: ";
            for (const key in httpErrorResponse.error) msg += httpErrorResponse.error[key];
            alert(msg);
            break;
          case 500:
            alert(httpErrorResponse.error.message);
          default:
        }
      }
    );
  }

  isModoEdicao(): boolean {
    return Boolean("_links" in this.advogado && this.advogado._links.self && this.advogado._links.self.href);
  }

  resetarFormulario(): void {
    if (this.formulario) {
      this.formulario.resetForm();
    }
  }
}
