let validadorDeData = new (require('./validadorDeData')());

module.exports = {
    isDate: value => validadorDeData.validarData(value),
    isDateTime: value => validadorDeData.validarDataEHora(value) || validadorDeData.validarData(value)
}

