let postHandler = function (api, req, res) {
    return api.post(req.path, req.body).then(resp => {
        console.log("Hello")
        res.status(resp.status).send(resp.data)
    }).catch((error) => {
        res.status(error.response.status).send(error.response.data);
    });
};

let getHandler = function (api, req, res) {
    return api.get(req.path).then(resp => {
        console.log(resp)
        res.status(resp.status).send(resp.data)
    }).catch((error) => {
        console.log(error)
        res.status(error.response.status).send(error.response.data);
    });
};

let putHandler = function (api, req, res) {
    return api.put(req.path, req.body).then(resp => {
        res.status(resp.status).send(resp.data)
    }).catch((error) => {
        res.status(error.response.status).send(error.response.data);
    });
};

module.exports = {
    postHandler: postHandler,
    putHandler: putHandler,
    getHandler: getHandler
};