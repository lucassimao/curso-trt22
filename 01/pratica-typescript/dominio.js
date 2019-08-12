"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Dominio;
(function (Dominio) {
    // são internos ao namespace
    var TipoPessoa;
    (function (TipoPessoa) {
        TipoPessoa[TipoPessoa["Fisica"] = 0] = "Fisica";
        TipoPessoa[TipoPessoa["Juridica"] = 1] = "Juridica";
    })(TipoPessoa || (TipoPessoa = {}));
    var Pessoa = /** @class */ (function () {
        function Pessoa(id, nome, tipo) {
            this.nome = nome;
            this.id = 1;
            this.tipo = tipo;
        }
        return Pessoa;
    }());
    // com export podem ser acessaos externamente
    var PessoaFisica = /** @class */ (function (_super) {
        __extends(PessoaFisica, _super);
        function PessoaFisica(id, nome) {
            return _super.call(this, id, nome, TipoPessoa.Fisica) || this;
        }
        return PessoaFisica;
    }(Pessoa));
    Dominio.PessoaFisica = PessoaFisica;
    var FaseProcesso;
    (function (FaseProcesso) {
        FaseProcesso[FaseProcesso["AnaliseDoConhecimento"] = 0] = "AnaliseDoConhecimento";
        FaseProcesso[FaseProcesso["DarCiencia"] = 1] = "DarCiencia";
        FaseProcesso[FaseProcesso["Arquivar"] = 2] = "Arquivar";
    })(FaseProcesso = Dominio.FaseProcesso || (Dominio.FaseProcesso = {}));
    var Advogado = /** @class */ (function (_super) {
        __extends(Advogado, _super);
        function Advogado(id, nome, oab) {
            var _this = _super.call(this, id, nome, TipoPessoa.Fisica) || this;
            _this.oab = oab;
            return _this;
        }
        return Advogado;
    }(Pessoa));
    Dominio.Advogado = Advogado;
    var Processo = /** @class */ (function () {
        function Processo(numero, poloAtivo, poloPassivo) {
            this.documentos = []; // array com multiplos tipos e inicializado com array vazio
            this.numero = numero;
            this.poloAtivo = poloAtivo;
            this.poloPassivo = poloPassivo;
        }
        // constructor(poloAtivo: [Pessoa,Advogado]){
        //  ñ permite sobrecarga de construtores
        // }
        // tipos de paramatro e retorno
        Processo.prototype.tramitar = function (fase) {
            this.fase = fase;
        };
        Processo.prototype.adicionarDocumento = function (documento) {
            this.documentos.push(documento);
        };
        Processo.regional = 22; // propriedades estáticas
        return Processo;
    }());
    Dominio.Processo = Processo;
})(Dominio || (Dominio = {}));
exports["default"] = Dominio;
