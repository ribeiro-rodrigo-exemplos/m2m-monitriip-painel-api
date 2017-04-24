let logger = require('../util/log');
let moment = require('moment');

module.exports = () =>
    class viagemRepository {
            constructor(viagem, detalheViagem, jornada, empresa, dateUtil) {
                this._viagem = viagem;
                this._detalheViagem = detalheViagem;
                this._jornada = jornada;
                this._empresa = empresa;
                this._dateUtil = dateUtil;
            }

            montaQueryTotalizadores(objConsulta){
                let query = [];
                let match = {};
                let group = {};

                match ["dataInicial"] = {$gte: objConsulta.dataInicial, $lte: objConsulta.dataFinal}
                match["aberto"] = false;

                if(objConsulta.motorista){
                    match["cpfMotorista"] = objConsulta.motorista;
                }

                if(objConsulta.veiculo){
                    match["placaVeiculo"] = objConsulta.veiculo;
                }

                if(objConsulta.cnpjCliente){
                    match["cnpjCliente"] = objConsulta.cnpjCliente;
                }

                group = {$group: {_id: "$dataInicial", 
                            totalQuilometragem: {$sum: "$totalKm"},
                            totalBilhetes: {$sum: "$totalBilhetes"},
                            totalParadas: {$sum: "$totalParadas"}, 
                            totalTempo: {$sum: "$duracao"},
                            direcaoContinuaMaxima : {$max: "$direcaoContinuaMaxima"},
                            motoristas: {$push: "$cpfMotorista"}
                        }}

                query.push([{$match:match},group]);

                return query;

            }


            montaQueryViagens(objConsulta){
                let query = [];
                let match = {};
                let group = {};

                match ["dataInicial"] = {$gte: objConsulta.dataInicial, $lte: objConsulta.dataFinal}
                match["aberto"] = false;

                if(objConsulta.motorista){
                    match["cpfMotorista"] = objConsulta.motorista;
                }

                if(objConsulta.veiculo){
                    match["placaVeiculo"] = objConsulta.veiculo;
                }

                if(objConsulta.cnpjCliente){
                    match["cnpjCliente"] = objConsulta.cnpjCliente;
                }

                group = {$group: {_id: "$idViagem", 
                            descricaoLinha: {$first: "$descricaoLinha"},
                            tipoViagem: {$first: "$tipoViagem"},
                            totalKm: {$sum: "$totalKm"}, 
                            totalTempo: {$sum: "$duracao"},
                            totalBilhetes: {$sum: "$totalBilhetes"},
                            totalParadas: {$sum: "$totalParadas"}                            
                        }}

                query.push([{$match:match},group])
                
                return query;

            }


            montaQueryJornada(objConsulta){
                let query = [];
                let match = {};
                let group = {};

                match ["dataInicial"] = {$gte: objConsulta.dataInicial, $lte: objConsulta.dataFinal}
                match["aberto"] = false;

                if(objConsulta.motorista){
                    match["cpfMotorista"] = objConsulta.motorista;
                }

                if(objConsulta.veiculo){
                    match["placaVeiculo"] = objConsulta.veiculo;
                }

                if(objConsulta.cnpjCliente){
                    match["cnpjCliente"] = objConsulta.cnpjCliente;
                }

                group = {$group: {_id: "$dataInicial", 
                            totalHoras: {$sum: "$totalHoras"},
                            motoristas: {$push: "$cpfMotorista"}                            
                        }}

                query.push([{$match:match},group])

                return query;
            
            }    


            montaQueryViagemPorId(objConsulta){
                let query = {};
                
                if(objConsulta.motorista){
                    query["cpfMotorista"] = objConsulta.motorista;
                }
                
                if(objConsulta.veiculo){
                    query["placaVeiculo"] = objConsulta.veiculo;
                }

                if(objConsulta.cnpjCliente){
                    query["cnpjCliente"] = objConsulta.cnpjCliente;
                }
                
                query["idViagem"] = objConsulta.idViagem;
                query["$and"] = [{dataInicial: {$gte: objConsulta.dataInicial}},{dataInicial: {$lte: objConsulta.dataFinal}}];

                
                return query;        

            }

            
            buscarViagens(objConsulta){
                logger.info(`viagemRepository - buscarViagens - dataInicial: ${objConsulta.dataInicial} - dataFinal: ${objConsulta.dataFinal} - 
                            motorista: ${objConsulta.motorista} - cnpj: ${objConsulta.cnpjCliente} - veiculo: ${objConsulta.veiculo}`);

                return new Promise((resolve, reject) => {
                    objConsulta.dataInicial = this._dateUtil.formataDataHora(objConsulta.dataInicial, objConsulta.gmtCliente, this._dateUtil.formato.DATAHORA_AMD_TRACO, this._dateUtil.tipoRetorno.STRING);
                    objConsulta.dataFinal = this._dateUtil.formataDataHora(objConsulta.dataFinal, objConsulta.gmtCliente, this._dateUtil.formato.DATAHORA_AMD_TRACO, this._dateUtil.tipoRetorno.STRING);

                    let query = this.montaQueryViagens(objConsulta);

                    this._viagem.aggregate(query)
                        .then(result => {
                            resolve(result ? result : null)
                        })
                        .catch(erro => reject(erro));
                });
            }


            buscarViagemPorId(objConsulta){
                logger.info(`viagemRepository - buscarViagemPorId - idViagem: ${objConsulta.idViagem} - dataInicial: ${objConsulta.dataInicial} - 
                            dataFinal: ${objConsulta.dataFinal} - motorista: ${objConsulta.motorista} - cnpj: ${objConsulta.cnpjCliente} - veiculo: ${objConsulta.veiculo}`);

                return new Promise((resolve, reject) => {
                    objConsulta.dataInicial = this._dateUtil.formataDataHora(objConsulta.dataInicial, objConsulta.gmtCliente, this._dateUtil.formato.DATAHORA_AMD_TRACO, this._dateUtil.tipoRetorno.STRING);
                    objConsulta.dataFinal = this._dateUtil.formataDataHora(objConsulta.dataFinal, objConsulta.gmtCliente, this._dateUtil.formato.DATAHORA_AMD_TRACO, this._dateUtil.tipoRetorno.STRING);

                    let query = this.montaQueryViagemPorId(objConsulta);

                    this._viagem.find(query).lean().exec()
                        .then(result => {
                            resolve(result ? result : null)
                        })
                        .catch(erro => reject(erro));
                });
            }


            buscarJornadas(objConsulta){
                logger.info(`viagemRepository - buscarJornadas - dataInicial: ${objConsulta.dataInicial} - dataFinal: ${objConsulta.dataFinal} - 
                            motorista: ${objConsulta.motorista} - cnpj: ${objConsulta.cnpjCliente} - veiculo: ${objConsulta.veiculo}`);

                return new Promise((resolve, reject) => {
                    objConsulta.dataInicial = this._dateUtil.formataDataHora(objConsulta.dataInicial, objConsulta.gmtCliente, this._dateUtil.formato.DATAHORA_AMD_TRACO, this._dateUtil.tipoRetorno.STRING);
                    objConsulta.dataFinal = this._dateUtil.formataDataHora(objConsulta.dataFinal, objConsulta.gmtCliente, this._dateUtil.formato.DATAHORA_AMD_TRACO, this._dateUtil.tipoRetorno.STRING);

                    let query = this.montaQueryJornada(objConsulta);

                    this._jornada.aggregate(query)
                        .then(result => {
                            resolve(result ? result : null)
                        })
                        .catch(erro => reject(erro));
                });
            }


            buscarTotalizadores(objConsulta){
                logger.info(`viagemRepository - buscarTotalizadores - dataInicial: ${objConsulta.dataInicial} - dataFinal: ${objConsulta.dataFinal} - 
                            motorista: ${objConsulta.motorista} - cnpj: ${objConsulta.cnpjCliente} - veiculo: ${objConsulta.veiculo}`);

                return new Promise((resolve, reject) => {
                    objConsulta.dataInicial = this._dateUtil.formataDataHora(objConsulta.dataInicial, objConsulta.gmtCliente, this._dateUtil.formato.DATAHORA_AMD_TRACO, this._dateUtil.tipoRetorno.STRING);
                    objConsulta.dataFinal = this._dateUtil.formataDataHora(objConsulta.dataFinal, objConsulta.gmtCliente, this._dateUtil.formato.DATAHORA_AMD_TRACO, this._dateUtil.tipoRetorno.STRING);
                    
                    let query = this.montaQueryTotalizadores(objConsulta);
                    
                    this._viagem.aggregate(query)
                        .then(result => {
                            resolve(result ? result : null);
                        })
                        .catch(erro => reject(erro));
                });
            }


            consultaEmpresa(cnpj){
                logger.info(`viagemRepository - cnpj: ${cnpj}`);

                return new Promise((resolve, reject) => {
                    this._empresa.findAll({where: {cd_cnpj: cnpj}, attributes: ['id_cliente']})
                        .then(result => {
                            resolve(result.length ? result : null)})
                        .catch(erro => reject(erro))
                });
            }


    }
