const error = (err, req, res, next) => {
    
    // Verificar si hay codigo de error
    const statusCode = err.statusCode || 500;
    
    // Objeto de respuesta de error
    const errorResponse = {
        error: {
            message: err.message || "Error interno del servidor",
            code: err.code || "internal_error",
        },
    };
    
    // envia en formato json
    res.status(statusCode).json(errorResponse);
};

module.exports = error;