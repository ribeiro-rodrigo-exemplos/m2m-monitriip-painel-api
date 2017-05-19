module.exports = app => {
    return {
                
        get viagem() {
            return app.modelo.viagem;
        },
 
        get detalheViagem() {
            return app.modelo.detalheViagem;
        },

        get jornada() {
            return app.modelo.jornada;
        },

        get totalizadores() {
            return app.modelo.totalizadores;
        },

        get empresa() {
            return app.modelo.empresa;
        },

        get viagemRepository() {
            return new app.repositorio.viagemRepository(this.viagem,this.dateUtil);
        },

        get jornadaRepository(){
            return new app.repositorio.jornadaRepository(this.jornada);
        },
        
        get viagemService(){
            return new app.servico.viagemService(this.viagemRepository);
        },
        
        get viagemController() {
            return new app.controladores.viagemController(this.viagemRepository, this.viagemService);
        },

        get jornadaController(){
            return new app.controladores.jornadaController(this.jornadaRepository);
        },

        get ssoService() {
            return new app.servico.ssoService();
        },

        get apiTokenInterceptor() {
            return new app.middleware.apiTokenInterceptor(this.ssoService);
        },

        get dateUtil() {
            return new app.util.dateUtil;
        }
    }
};