exports.paginaInicial = (req, res) => {
    //req.session.usuario = {nome: 'Luiz', logado: true};
    //console.log(req.session.usuario );
    res.render('index',{
        titulo: 'Este sera o titulo',
        numeros: [0, 1, 3, 4, 5, 6, 7, 8, 9]
    });
    return;
};

exports.trataPost = (req, res) => {
    res.send(req.body);
    return;
};

