import { Component, OnInit, ViewChild } from '@angular/core';
import Processo from '../processo';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Advogado } from 'src/app/advogados/advogado';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  processo = new Processo();
  advogado: Advogado;

  @ViewChild("formulario") formulario: NgForm;


  constructor(public router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    this.advogado = <Advogado>navigation.extras.state.data;
  }


  isModoEdicao(): boolean {
    return Boolean("_links" in this.processo && this.processo._links.self && this.processo._links.self.href);
  }

  resetarFormulario(): void {
    if (this.formulario) {
      this.formulario.resetForm();
    }
  }

}
