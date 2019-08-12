import Dominio from './dominio';
import Dao from './dao';
import {RemessaSegundoGrauService} from './services';


const processoDao = new Dao.ProcessoDao();
const maria: Dominio.PessoaFisica = new Dominio.PessoaFisica(1, "Maria"); // forma completa de declarar variável
const adv123 = new Dominio.Advogado(2, "Advogado 123", "123"); // inferência automática de tipo

const joao = new Dominio.PessoaFisica(3, "Joao");
const adv456 = new Dominio.Advogado(4, "Advogado 456", "456");

const processo = new Dominio.Processo("123-45", [maria, adv123], [joao, adv456]);

// método aceita string ou array de numeros;
processo.adicionarDocumento('<h1> Petição inicial</h1>');
processo.adicionarDocumento([1,0,0,1,1,1,10,1,1,1,1,1,1]); // simulando pdf
// processo.adicionarDocumento(true); // ñ aceita o tipo booleano

new RemessaSegundoGrauService().remeter([processo]);

// const pessoa = new Dominio.Pessoa(1, "Pessoa 1"); //ñ permitido, pessao é privado do namespace
// pessoa.tipo = 'Fisica'; // ñ funciona
// processoDao.salvar(pessoa); // ñ funciona
// pessoa.tipo = Dominio.TipoPessoa.Fisica; // ñ permitido, TipoPessoa é privado
// processo.fase = Dominio.FaseProcesso.AnaliseDoConhecimento; ~n permitido, fase é privado
