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
                    callback({
                        success: false,
                        results: []
                    });
                callback({
                    success: true,
                    results
                });
                
            });
        }
    });
};

queries.getMovieById = (params, callback) => {
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
    FROM peliculas
    WHERE id = ${params.movie}
    `

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    callback({
                        success: false,
                        results: []
                    });
                callback({
                    success: true,
                    results
                });
            });
        }
    });
}


queries.addMovie = (data, callback) => {

    // let genero1 = data.genero1 !== undefined ? data.genero1 : '';
    // let genero2 = data.genero2 !== undefined ? data.genero2 : '';
    // let genero3 = data.genero3 !== undefined ? data.genero3 : '';

    const query = `INSERT INTO peliculas 
    (titulo, descripcion, genero1, genero2, genero3, portada) 
    VALUES ("${data.titulo}", "${data.descripcion}", "${data.genero1}","${data.genero2}","${data.genero3}", "${data.portada}")`;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    callback({
                        success: false,
                        results: error
                    });
        
                callback({
                    success: true,
                    results: results
                });
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


    if(body.portada == '') {
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
                        callback({
                            success:false,
                            results: error
                        }) 
                    else {
                        callback({
                            success:true,
                            results
                        });
                    }
                });
            }
        });
    } else {
        
        query = `UPDATE peliculas 
        SET titulo = "${body.titulo}", 
        descripcion = "${body.descripcion}",
        genero1 = "${body.genero1}",
        genero2 = "${body.genero2}",
        genero3 = "${body.genero3}",
        portada = "${body.portada}"
        WHERE id = ${params.movie}
        `;
        pool.getConnection((err, connection) => {
            if (err)
                console.error(err);
            else {
                connection.query(query, (error, results) => {
                    connection.release();
                    if (error)
                        callback({
                            success:false,
                            results
                        })
                    else {
                        callback({
                            success:true,
                            results
                        });
                    }
                });
            }
        });
    }
    
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
                    callback({
                        success: false,
                        results: error
                    });
                    callback({
                        success: true,
                        results
                    });
            });
        }

    });

};

queries.addComment = (body, params, callback) => {
    const query = `UPDATE calificaciones SET
    comentario = "${body.comentario}"
    WHERE idusuario = ${body.idusuario} AND idpelicula = ${params.movie}
    `;

    pool.getConnection((err, connection) => {
        if (err)
            console.error(err);
        else {
            connection.query(query, (error, results) => {
                connection.release();
                if (error) {
                    console.error(error);
                    let response={
                        success: false,
                        message: error
                    };
                }
                let response={
                    success: true,
                    message: results
                };
                callback(response);
            });
        }
    });
}

queries.addRateAndComment = (body, callback) => {
    console.log('model add rate and comm newrate' + body.newrate);
    if(body.newrate === true) {
        const query = `INSERT INTO calificaciones SET 
        idusuario = ${body.idusuario},
        idpelicula = ${body.idpelicula},
        comentario = "${body.comentario}",
        calificacion = ${body.calificacion}
        `;
        pool.getConnection((err, connection) => {
            if (err)
                console.error(err);
            else {
                connection.query(query, (error, results) => {
                    connection.release();
                    if (error)
                        callback({
                            success: false,
                            results: error
                        });
                    callback({
                        success: true,
                        results
                    });
                });
            }
     
        });
    } else {
        const query = `UPDATE calificaciones SET 
        comentario = "${body.comentario}",
        calificacion = ${body.calificacion}
        WHERE idusuario = ${body.idusuario} AND idpelicula = ${body.idpelicula}
        `;
        pool.getConnection((err, connection) => {
            if (err)
                console.error(err);
            else {
                connection.query(query, (error, results) => {
                    connection.release();
                    if (error)
                        callback({
                            success: false,
                            results: error
                        });
                    callback({
                        success: true,
                        results
                    });
                });
            }
        });
    }
    
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
                    callback({
                        success: false,
                        result
                    });
                callback({
                    success: true,
                    result
                });
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
                    callback({
                        success: false,
                        results
                    });
                callback({
                    success: true,
                    results
                });
            });
        }
    });
}

queries.getRateByUser = (params, callback) => {
    const query = `SELECT 
    * FROM calificaciones
    WHERE idpelicula = ${params.movie} AND idusuario = ${params.user}`;

    pool.getConnection((err, connection) => {
        if (err)
            console.log(err);
        else { 
            connection.query(query, (error, results) => {
                connection.release();
                if (error)
                    callback({
                        success: false,
                        results
                    });
                callback({
                    success: true,
                    results
                });
            });
        }
        
    });
}

queries.updateRate = (params, rate, callback) => {
    const query = `UPDATE peliculas
    SET promedio = ${rate}
    WHERE id = ${params.movie}`;

    pool.getConnection((err, connection) => {
        if (err)
            console.log(err);
        else { 
            connection.query(query, (error, results) => {
                connection.release();
                if (error) {
                    callback({
                        success: false,
                        results
                    });
                } else {
                    callback({
                        success: true,
                        results
                    });
                }
            });
        }   
    });
}


queries.getRatingAverage = (firstrate, callbackResponse) => {
    getLastRate(callbackResponse, (callbackResponse, idmovie) => {
        getRates(callbackResponse, idmovie, firstrate);
    });
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
                if (error) {
                    console.log(error);
                    callbackResponse({
                        succes: false,
                        error
                    });
                } else {
                    const idpelicula = result.length > 0 ? result[0].idpelicula : 0;
                    callback(callbackResponse, idpelicula);
                }
            });
        }
        
    });
}


const getRates = (callbackResponse, idmovie, firstrate) => {

    console.log('idmovie en get rates  ' + idmovie)
    if(idmovie === 0) {
        callbackResponse({
            success: true,
            rate: firstrate
        });
    } else {
        const query = `SELECT calificacion FROM calificaciones 
        WHERE idpelicula = ${idmovie}
        `;
        pool.getConnection((err, connection) => {
            if (err)
                console.log(err);
            else {
                connection.query(query, (error, results) => {
                    connection.release();

                    if (error) {
                        callback({
                            success: false,
                            error
                        }) 
                    } else {
                        if(results.length > 0) {
                            callbackResponse({
                                success: true,
                                rate: calculateRatingAverage(results)
                            });
                        } else {
                            callbackResponse({
                                succes: false,
                                error: 'No se encontraron resultados con ese id (idpelicula)'
                            });
                        }
                    }
                });
            }
            
        });
    }

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




module.exports = queries;