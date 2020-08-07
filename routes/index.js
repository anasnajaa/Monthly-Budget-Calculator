

module.exports = (router) => {

    router.route('/budgets/all').get(async (request, response) => {
        const t = request.__;
        try {
            const mResponse = await httpClient.post('/register', request.body);
            const data = mResponse.data;
            response.json(data);
        } catch (error) {
            log(TAG, error);
            response.json({ status: -1, error });
        }
    });
    
    router.route('/budgets/add').post(quran.toMongo);

    return router;
};