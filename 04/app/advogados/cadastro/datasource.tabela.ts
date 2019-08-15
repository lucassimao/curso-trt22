import { MatTableDataSource } from "@angular/material/table";
import { Advogado } from "../advogado";
import { BehaviorSubject, of, Observable } from "rxjs";

export class DataSourceTabela extends MatTableDataSource<Advogado> {
  private subject = new BehaviorSubject<Advogado[]>([]);

  connect(): BehaviorSubject<Advogado[]> {
    return this.subject;
  }

  disconnect(): void {
    this.subject.complete();
  }

  atualizarDados(advogados: Advogado[]) {
    this.subject.next(advogados);
  }
}
