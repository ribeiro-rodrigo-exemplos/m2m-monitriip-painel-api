let logger = require('../util/log');

module.exports = () => 
    class JornadaController{
        constructor(){}

        obterJornadas(req,res,next){

            const erros = this._validarParametrosDeConsulta(req);

            if (erros) {
                res.status(422)
                    .json(erros);

                return;
            }        

        }

        _validarParametrosDeConsulta(req) {
            req.checkQuery('dataInicial', 'deve estar no formato ISO').notEmpty();
            req.checkQuery('dataInicial', 'deve estar no formato ISO').isDate();
            req.checkQuery('dataFinal', 'deve estar no formato ISO').notEmpty();
            req.checkQuery('dataFinal', 'deve estar no formato ISO').isDate();
            req.checkQuery('cnpjCliente', 'deve estar preenchido').notEmpty();
            
            return req.validationErrors();
        }
    }