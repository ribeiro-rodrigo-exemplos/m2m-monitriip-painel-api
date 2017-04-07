var request = require('supertest');
var assert = require('assert');
var app = require('../../app/bootstrap/express-bootstrap');


describe('Testando controlador viagemController.js',function(){
    
    it('Consultando por motorista, veiculo e data',done =>{

        let resultado = {
                            "viagens": [
                                {
                                "_id": "58dbf530d65b2c96e3d2460a",
                                "dataInicio": "2017-03-29T17:28:02.134Z",
                                "dataFim": "2017-03-30T17:28:02.134Z",
                                "idViagem": 1,
                                "motorista": "romario",
                                "veiculo": "ABC1234",
                                "linha": "Pingo DAgua x Alvorada",
                                "tipo": "Regular",
                                "tempo": "00:30:52",
                                "bilhetes": 87,
                                "paradas": 14,
                                "quilometro": 17.95,
                                "tempoMin": 60
                                },
                                {
                                "_id": "58dbf532d65b2c96e3d2460b",
                                "dataInicio": "2017-03-29T17:28:02.134Z",
                                "dataFim": "2017-03-31T17:28:02.134Z",
                                "idViagem": 3,
                                "motorista": "romario",
                                "veiculo": "ABC1234",
                                "linha": "Pingo DAgua x Alvorada",
                                "tipo": "Regular",
                                "tempo": "00:30:52",
                                "bilhetes": 87,
                                "paradas": 14,
                                "quilometro": 17.95,
                                "tempoMin": 40
                                }
                            ],
                            "jornada": [
                                {
                                "_id": "58dd65e1d65b2c96e3d2460d",
                                "dataInicio": "2017-03-29T17:28:02.134Z",
                                "dataFim": "2017-03-31T17:28:02.134Z",
                                "idViagem": 3,
                                "motorista": "romario",
                                "veiculo": "ABC1234",
                                "jornada": 8
                                }
                            ],
                            "totalizadores": [
                                {
                                "_id": {},
                                "totalParada": 28,
                                "totalBilhetes": 174,
                                "totalTempo": 100,
                                "totalQuilometragem": 35.9
                                }
                            ]
                        }

                                
                        
        request(app)
                    .get('/v1/viagens')
                    .query('dataInicial=2017-03-28+00:00:00&dataFinal=2017-03-31+00:00:00&motorista=romario&veiculo=abc1234')
                    .timeout(10000)
                    .expect('Content-Type', /json/)
                    .expect(200, resultado)
                    .end(done); 

    });

    // it('Consultando motorista pela data de atualização',done => {
    //      request(app)
    //                 .get('/v1/motoristas')
    //                 .set('X-AUTH-TOKEN',token)
    //                 .query('dataAtualizacao=2016-12-07+17:29:54')
    //                 .timeout(10000)
    //                 .expect('Content-Type', /json/)
    //                 .expect(200)
    //                 .end(done);

    // });

    // it('Consultando motorista com cpf não existente',done => {
    //     request(app)
    //                 .get('/v1/motoristas')
    //                 .set('X-AUTH-TOKEN',token)
    //                 .query('cpf=012367891')
    //                 .timeout(30000)
    //                 .expect(204)
    //                 .end(done);
    // });

    // it('Consultando motorista pela data de atualização não existente',done =>{
    //      request(app)
    //                 .get('/v1/motoristas')
    //                 .set('X-AUTH-TOKEN',token)
    //                 .query('dataAtualizacao=2050-12-09')
    //                 .timeout(10000)
    //                 .expect(204)
    //                 .end(done);
    // });
    
}); 