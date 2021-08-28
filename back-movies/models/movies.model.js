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
    id as idpelicula,
    titulo,
    descripcion,
    genero1,
    genero2,
    genero3,
    promedio,
    portada
    FROM peliculas;
    `

    pool.getConnection((err, connection) => {
        if (err) 
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(erorr);
                callback(results);
                
            });
        }
    });

    // const query =` 
    // SELECT
    // id,
    // titulo,
    // descripcion,
    // genero1,
    // genero2,
    // genero3,
    // promedio,
    // portada
    // FROM peliculas;
    // `

    // pool.getConnection(async (err, connection) => {
    //     if (err) 
    //         console.error(err);
    //     else {
    //         const results = await connection.query(query);
    //         console.log(results);
    //         //callback(JSON.stringify(results));
    //     }
    // });
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
    promedio,
    portada
    FROM peliculas
    WHERE id = ${body.movie}
    `

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
                callback(results);
            });
        }
    });
}


queries.addMovie = (data, callback) => {

    const query = `INSERT INTO peliculas 
    (titulo, descripcion, genero1, genero2, genero3) 
    VALUES ("${data.titulo}", "${data.descripcion}", "${data.genero1}","${data.genero2}","${data.genero3}")`;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
        
                callback(results);
            });
        }
    });
};

queries.validateMovie = (body, callback) => {
    const query = `SELECT * FROM peliculas
    WHERE titulo = "${body.titulo}"
    `;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
                if(results.length > 0) callback(true);
                else callback(false);
    
            });
        }
    });
} 

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
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
        
                callback(results);
            });
        }
    });
};

queries.deleteMovie = (params, callback) => {

    const query = `DELETE FROM peliculas 
    WHERE id = ${params.movie}
    `;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
        
                callback(results);
            });
        }

    });

};

queries.addComment = (body, params, callback) => {
    const query = `UPDATE INTO calificaciones SET
    comentario = "${body.comentario}
    WHERE idusuario = ${body.idusuario} AND idpelicula = ${body.movie}"
    `;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
        
                callback(results);
            });
        }
    });
}

queries.addRateAndComment = (body, callback) => {
    const query = `INSERT INTO calificaciones SET 
    idusuario = ${body.idusuario},
    idpelicula = ${body.idpelicula},
    comentario = "${body.comentario}",
    calificacion = "${body.calificacion}"
    `;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
                callback(results);
            });
        }
 
    });
}

queries.getCommentByUser = (params, callback) => {
    const query = `SELECT 
    c.comentario AS comentario,
    c.calificacion as calificacion,
    p.id as idpelicula,
    p.titulo AS pelicula,
    u.nombre AS usuario
    FROM calificaciones AS c 
    INNER JOIN peliculas AS p ON c.idpelicula = p.id
    INNER JOIN usuarios AS u ON c.idusuario = u.id
    WHERE u.id = ${params.user}`;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, result) => {
                connection.release();
                if (error)
                    console.error(error);
                //console.log(result[0].idpelicula);
                callback(result);
            });
        }
    });
}

queries.getCommentsByMovie = (params, callback) => {
    const query = `SELECT 
    c.comentario AS comentario,
    c.calificacion as calificacion,
    p.id as idpelicula,
    p.titulo AS pelicula,
    u.nombre AS usuario
    FROM calificaciones AS c 
    INNER JOIN peliculas AS p ON c.idpelicula = p.id
    INNER JOIN usuarios AS u ON c.idusuario = u.id
    WHERE p.id = ${params.movie}`;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
                //console.log(result[0].idpelicula);
                callback(results);
            });
        }
    });
}

// In case it is needed
queries.updateRate = (params, rate, callback) => {
    const query = `UPDATE peliculas
    SET promedio = ${rate}
    WHERE id = ${params.movie}`;

    pool.getConnection((err, connection) => {
        if (err)
            console.log(err);
        else { 
            connection.query(query, (error, result) => {
                connection.release();
                if (error)
                    console.error(error);
                //console.log(result[0].idpelicula);
                callback(result);
            });
        }
        
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
            console.log(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    console.error(error);
                callbackResponse(calculateRatingAverage(results));
            });
        }
        
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
            console.log(err)
        else {
            connection.query(query, (error, result) => {
                connection.release();
                if (error)
                    console.error(error);
                //console.log(result[0].idpelicula);
                callback(callbackResponse, result[0].idpelicula);
            });
        }
        
    });
}




module.exports = queries;