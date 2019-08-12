"use strict";
exports.__esModule = true;
var Dao;
(function (Dao) {
    var ProcessoDao = /** @class */ (function () {
        function ProcessoDao() {
        }
        ProcessoDao.prototype.salvar = function (processo) {
            // ...
            //   return 1; // ñ funciona
        };
        return ProcessoDao;
    }());
    Dao.ProcessoDao = ProcessoDao;
})(Dao || (Dao = {}));
exports["default"] = Dao;
