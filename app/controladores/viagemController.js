let logger = require('../util/log');

module.exports = () =>
    
    class Viagem{
        constructor(viagemRepository, viagemService){
            this._viagemRepository = viagemRepository;
            this._viagemService = viagemService;
        }

      
        obter(req, res, next){

            const erros = this._validarParametrosDeConsulta(req);

            if (erros) {
                res.status(400)
                    .json(erros);

                return;
            }

            let objetoRetorno = {};
            let objetoConsulta = {};

            objetoConsulta.dataInicial = req.query.dataInicial ? req.query.dataInicial : null ;
            objetoConsulta.dataFinal = req.query.dataFinal ? req.query.dataFinal : null ;
            objetoConsulta.motorista = req.query.motorista ? req.query.motorista : null;
            objetoConsulta.cnpjCliente = req.query.cnpjCliente ? req.query.cnpjCliente : null ;
            objetoConsulta.veiculo = req.query.veiculo ? req.query.veiculo.toUpperCase() : null;
            objetoConsulta.gmtCliente = req.gmtCliente ? req.gmtCliente : null;

            this._viagemService.validaIdCliente(req.idCliente, objetoConsulta.cnpjCliente)
                .then((mensagem)=>{
                    if (mensagem){
                        res.status(400)
                            .json(mensagem);
                        return;
                    }

                    logger.info(`viagemController - obter - dataInicial: ${objetoConsulta.dataInicial} - dataFinal: ${objetoConsulta.dataFinal} - 
                        motorista: ${objetoConsulta.motorista} - cnpj: ${objetoConsulta.cnpjCliente} - veiculo: ${objetoConsulta.veiculo} `);

                    let promises = [
                        this._viagemRepository.buscarViagens(objetoConsulta),
                        this._viagemRepository.buscarJornadas(objetoConsulta),
                        this._viagemRepository.buscarTotalizadores(objetoConsulta)
                    ];

                    
                    Promise.all(promises)
                        .then(result => {
                            objetoRetorno.viagens = result[0];
                            objetoRetorno.jornada = result[1];
                            objetoRetorno.totalizadores = result[2];
                        }).then(() => {
                            res.json(objetoRetorno);
                        }).catch(erro => next(erro));
                })
        }


      
        obterPorId(req, res, next){

            const erros = this._validarParametrosDeConsulta(req);

            if (erros) {
                res.status(400)
                    .json(erros);

                return;
            }

            let objeto = {};
            let objetoConsulta = {};

            req.checkQuery('dataInicial', 'deve estar no formato ISO').isDate();
            req.checkQuery('dataFinal', 'deve estar no formato ISO').isDate();

            objetoConsulta.idViagem = req.params.id;
            objetoConsulta.dataInicial = req.query.dataInicial ? req.query.dataInicial : null ;
            objetoConsulta.dataFinal = req.query.dataFinal ? req.query.dataFinal : null ;
            objetoConsulta.motorista = req.query.motorista ? req.query.motorista : null;
            objetoConsulta.cnpjCliente = req.query.cnpjCliente ? req.query.cnpjCliente : null ;
            objetoConsulta.veiculo = req.query.veiculo ? req.query.veiculo.toUpperCase() : null;
            objetoConsulta.gmtCliente = req.gmtCliente ? req.gmtCliente : null;
            
            this._viagemService.validaIdCliente(req.idCliente, objetoConsulta.cnpjCliente)
                .then((mensagem)=>{
                    if (mensagem){
                        res.status(400)
                            .json(mensagem);
                        return;
                    }

                    logger.info(`viagemController - obterPorId - idViagem: ${objetoConsulta.idViagem} - dataInicial: ${objetoConsulta.dataInicial} - 
                                dataFinal: ${objetoConsulta.dataFinal} - motorista: ${objetoConsulta.motorista} - cnpj: ${objetoConsulta.cnpjCliente} - veiculo: ${objetoConsulta.veiculo}`);

                    this._viagemRepository.buscarViagemPorId(objetoConsulta)
                        .then(result => {
                            res.json(result);
                        }).catch(erro => next(erro));
                });

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