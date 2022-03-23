exports.middlewareGlobal = (req, res, next) => {
    console.log('middleglobal');
    next();
}


exports.middlewareOutro = (req, res, next) => {
    console.log('outro middleware');

    next();
}

