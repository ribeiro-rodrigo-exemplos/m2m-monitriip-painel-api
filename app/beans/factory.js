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
        
        get viagemRepository() {
            return new app.repositorio.viagemRepository(this.viagem, this.detalheViagem, this.jornada, this.totalizadores, this.dateUtil);
        },
        
        get viagemController() {
            return new app.controladores.viagemController(this.viagemRepository);
        },

        get dateUtil() {
            return new app.util.dateUtil;
        }
    }
};