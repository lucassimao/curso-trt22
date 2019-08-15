import { NgModule, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdvogadosRoutingModule } from "./advogados-routing.module";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { MaterialUiModule } from "../material-ui.module";
import { AdvogadoService } from './advogado.service';

@NgModule({
  declarations: [CadastroComponent],
  providers: [AdvogadoService],
  imports: [CommonModule, MaterialUiModule, AdvogadosRoutingModule, FormsModule]
})
export class AdvogadosModule {}
