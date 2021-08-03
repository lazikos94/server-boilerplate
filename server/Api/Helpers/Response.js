function Response (res, status, data) {
    let local_data = data ? data : {data: null};

    switch (status) {
        case 200:
            res.status(status).json({status: status, message: 'Request finished successfully', data:local_data});
            break;
        case 201:
            res.status(status).json({status: status, message: 'Request finished successfully', data:local_data});
            break;
        case 400:
            res.status(status).json({status: status, message: 'Bad Request', data:local_data});
            break;
        case 404:
            res.status(status).json({status: status, message: 'not found || 404'});
            break;
        case 403:
            res.status(status).json({status: status, message: 'Forbitten || 403'});
            break;
        case 401:
            res.status(status).json({status: status, message: 'not autheticated'});
            break;
        default:
            res.status(500).json({status: 500, message: 'Internal Server Error'});
            break;
    }
}


module.exports = Response;