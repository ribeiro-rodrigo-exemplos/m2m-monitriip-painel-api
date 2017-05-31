const safira = require('safira');

class ErrorInterceptor {

    constructor(logger,app){
        this._logger = logger;
        
        app.use(this.intercept.bind(this));
    }

    intercept(error, req, res, next) {
        
        next(error)
    }
}

safira.define(ErrorInterceptor);
safira.bean('errorInterceptor');



