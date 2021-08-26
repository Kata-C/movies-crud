const pool = require('../database.config');

const queries = {};

queries.getMovies = (callback) => {

    // const query = `SELECT 
    // p.id AS ID, 
    // p.titulo AS titulo, 
    // p.descripcion AS descripcion,
    // GROUP_CONCAT(g.nombre) AS genero
    // FROM peliculas AS p
    // INNER JOIN genero_pelicula AS gp ON gp.idpelicula = p.id
    // INNER JOIN genero AS g ON gp.idgenero = g.id
    // GROUP BY p.id;`;

    const query =` 
    SELECT
    id,
    titulo,
    descripcion,
    genero1,
    genero2,
    genero3,
    promedio
    FROM peliculas;
    `

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
            callback(results);
            
        });
    });


};

queries.getMovieById = (body, callback) => {
    const query =` 
    SELECT
    id,
    titulo,
    descripcion,
    genero1,
    genero2,
    genero3,
    promedio
    FROM peliculas
    WHERE id = ${body.movie}
    `

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
            callback(results);
            
        });
    });
}


queries.addMovie = (data, callback) => {

    const query = `INSERT INTO peliculas 
    (titulo, descripcion, genero1, genero2, genero3) 
    VALUES ("${data.titulo}", "${data.descripcion}", "${data.genero1}","${data.genero2}","${data.genero3}")`;

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
    
            callback(results);
        });
    });

};

queries.updateMovie = (body, params, callback) => {

    const query = `UPDATE peliculas 
    SET titulo = "${body.titulo}", 
    descripcion = "${body.descripcion}",
    genero1 = "${body.genero1}",
    genero2 = "${body.genero2}",
    genero3 = "${body.genero3}"
    WHERE id = ${params.movie}
    `;

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
    
            callback(results);
        });
    });

};

queries.deleteMovie = (params, callback) => {

    const query = `DELETE FROM peliculas 
    WHERE id = ${params.movie}
    `;

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
    
            callback(results);
        });
    });

};

queries.addComment = (body, params, callback) => {
    const query = `INSERT INTO comentarios SET 
    idusuario = ${body.idusuario},
    idpelicula = ${params.movie},
    comentario = "${body.comentario}"
    `;

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
    
            callback(results);
        });
    });
}

queries.rate = (body, params, callback) => {
    const query = `INSERT INTO calificaciones SET 
    idusuario = ${body.idusuario},
    idpelicula = ${params.movie},
    calificacion = "${body.rate}"
    `;

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
            callback(results);
        });
    });
}

queries.updateRate = (params, rate, callback) => {
    const query = `UPDATE peliculas
    SET promedio = ${rate}
    WHERE id = ${params.movie}`;

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, result) => {
            connection.release();
            if (error)
                throw error;
            //console.log(result[0].idpelicula);
            callback(result);
        });
    });
}


queries.getRatingAverage = (callbackResponse) => {


    getLastRate(callbackResponse, (callbackResponse, idmovie) => {
        getRates(callbackResponse, idmovie);

    });
}

const getRates = (callbackResponse, idmovie) => {
    const query = `SELECT calificacion FROM calificaciones 
    WHERE idpelicula = ${idmovie}
    `;

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, results) => {
            connection.release();
            if (error)
                throw error;
            callbackResponse(calculateRatingAverage(results));
        });
    });

}

const calculateRatingAverage = (results) => {
    let rates = Object.values(JSON.parse(JSON.stringify(results)));
    let average = 0;
    rates.forEach(rate => {
        average += rate.calificacion;
    })
    average = average / rates.length;
    return average;

}

const getLastRate = (callbackResponse, callback) => {
    const query = `SELECT idpelicula FROM calificaciones 
    ORDER BY id DESC LIMIT 1
    `;

    pool.getConnection((err, connection) => {
        if (err)
                throw error;
        connection.query(query, (error, result) => {
            connection.release();
            if (error)
                throw error;
            //console.log(result[0].idpelicula);
            callback(callbackResponse, result[0].idpelicula);
        });
    });
}




module.exports = queries;