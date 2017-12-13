const safira = require('safira');

let aggregate = [
    {$group:{
        _id:"$idViagem",
        identificacaoLinha: {$first:"$identificacaoLinha"},
        dataInicial:{$first:"$dataInicial"},
        dataFinal:{$last:"$dataFinal"},
        descricaoLinha:{$first:"$descricaoDaLinha"},
        tipoTransporte:{$first:"$tipoTransporte"},
        totalKm:{$sum:"$totalKm"},
        tempo:{$sum:"$duracao"},
        totalBilhetes:{$sum:"$totalBilhetes"},
        totalParadas:{$sum:"$totalParadas"}
    }}
];

safira.defineObject(aggregate,'extratoAggregate');