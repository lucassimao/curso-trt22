import { Advogado } from "./../advogado";

export interface ResultadoPaginado {
  page: { size: number; totalElements: number; totalPages: number; number: number };
  _embedded: { advogados: Advogado[] };
}
