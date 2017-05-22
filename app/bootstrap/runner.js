const safira = require('safira');

class Runner{
    constructor(app,config,logger){
        this._app = app;
        this._port = config.server.port; 
        this._logger = logger;

        this._run();
    }

    _run(){
        this._app.listen(this._port, () =>{
            this._logger.debug(`Servidor rodando na porta ${this._port}`);
            this._logger.info(`Servidor rodando na porta ${this._port}`);
        });
    }
}

safira.define(Runner);
safira.bean('runner');

