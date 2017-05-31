class GenericFilter{
    constructor(repository){
        this._repository = repository;
        this._filtro = {};
    }

    porCliente(filtroCliente){
        console.log(filtroCliente.cnpj);
        if(filtroCliente != undefined){
            if(filtroCliente.cnpj != undefined)
                this._filtro.cnpjCliente = filtroCliente.cnpj;
            else
                if(filtroCliente.id != undefined)
                    this._filtro.idCliente = filtroCliente.id; 
        }
            
        
        return this; 
    }

    porVeiculo(placa){
        if(placa != undefined)
            this._filtro.placaVeiculo = placa;

        return this;
    }

    porMotorista(cpf){
        if(cpf != undefined)
            this._filtro.cpfMotorista = cpf;

        return this;
    }

    comDataInicialIgualOuSuperior(data){
        if(data != undefined){
            this._filtro.dataInicial = this._filtro.dataInicial ? this._filtro.dataInicial : {};
            this._filtro.dataInicial.$gte = data; 
        }

        return this;
    }

    comDataInicialIgualOuInferior(data){
        if(data != undefined){
            this._filtro.dataInicial = this._filtro.dataInicial ? this._filtro.dataInicial : {};
            this._filtro.dataInicial.$lte = data;
        }

        return this;
    }

    obter(){
        return this._repository; 
    }

    get filtro(){
        return this._filtro;
    }
}

exports.class = GenericFilter;
