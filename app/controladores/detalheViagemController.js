let logger = require('../util/log');

module.exports = () =>
    
    class Viagem{
        constructor(detalheViagemRepository){
            this._detalheViagemRepository = detalheViagemRepository;
        }

        obterDetalheViagem(req, res, next){
            let objeto = {};
            let idViagem = req.params.id ? req.query.dataInicial : null ;

            //validar se o id veio preenchido
            
            logger.info(`detalheViagemController - obterDetalheViagem - idViagem: ${idViagem}`);
           
            this.detalheViagemRepository.buscarDetalheViagem(dataInicial, dataFinal, motorista, veiculo)
                .then(result => {
                    
                }).catch(erro => next(erro));

        }

    }