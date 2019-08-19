import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessosRoutingModule } from './processos-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MaterialUiModule } from '../material-ui.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CadastroComponent],
  imports: [
    CommonModule,
    ProcessosRoutingModule,
    MaterialUiModule,
    FormsModule
  ]
})
export class ProcessosModule { }
