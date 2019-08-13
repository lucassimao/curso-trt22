"use strict";
exports.__esModule = true;
var dominio_1 = require("./dominio");
var dao_1 = require("./dao");
var services_1 = require("./services");
var processoDao = new dao_1["default"].ProcessoDao();
var maria = new dominio_1["default"].PessoaFisica(1, "Maria"); // forma completa de declarar variável
var adv123 = new dominio_1["default"].Advogado(2, "Advogado 123", "123"); // inferência automática de tipo
var joao = new dominio_1["default"].PessoaFisica(3, "Joao");
var adv456 = new dominio_1["default"].Advogado(4, "Advogado 456", "456");
var processo = new dominio_1["default"].Processo("123-45", [maria, adv123], [joao, adv456]);
// método aceita string ou array de numeros;
processo.adicionarDocumento('<h1> Petição inicial</h1>');
processo.adicionarDocumento([1, 0, 0, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1]); // simulando pdf
// processo.adicionarDocumento(true); // ñ aceita o tipo booleano
new services_1.RemessaSegundoGrauService().remeter([processo]);
var pessoa = new dominio_1["default"].Pessoa(1, "Pessoa 1"); //ñ permitido, pessao é privado do namespace
pessoa.tipo = 'Fisica'; // ñ funciona
// processoDao.salvar(pessoa); // ñ funciona
// pessoa.tipo = Dominio.TipoPessoa.Fisica; // ñ permitido, TipoPessoa é privado
// processo.fase = Dominio.FaseProcesso.AnaliseDoConhecimento; ~n permitido, fase é privado
