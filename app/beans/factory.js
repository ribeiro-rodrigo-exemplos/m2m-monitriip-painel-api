module.exports = app => {
    return {
                
        get viagem() {
            return app.modelo.viagem;
        },

         get jornada() {
            return app.modelo.jornada;
        },

        get viagemRepository() {
            return new app.repositorio.viagemRepository(this.viagem, this.jornada, this.dateUtil);
        },

        get viagemController() {
            return new app.controladores.viagemController(this.viagemRepository);
        },
        
        get totalizadores() {
            return app.modelo.totalizadores;
        },

        get dateUtil() {
            return new app.util.dateUtil;
        }
    }
};