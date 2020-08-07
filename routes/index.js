
const Budget = require('../models/budget.model');

module.exports = (router) => {

    router.route('/all').get(async (request, response) => {
        const strip = { '__v': 0};
        try {
            const list = await Budget.find({}, strip).exec();
            response.json({ status: 1, list });
        } catch (error) {
            console.log(error);
            response.json({ status: -1, error });
        }
    });

    router.route('/byId').get(async (request, response) => {
        const {id} = request.query;
        const strip = { '__v': 0};
        try {
            const record = await Budget.find({ _id: id }, strip).exec();
            if(record.length > 0){
                response.json({
                    status: 1,
                    record: record[0]
                });
            } else {
                response.json({
                    status: -1,
                    error: "not found"
                });
            }
            
        } catch (error) {
            response.json({ status: -1, error });
        }
    });

    router.route('/add').post(async (request, response) => {
        try {
            const newRecord = await new Budget(request.body).save();
            response.json({
                status: 1,
                newRecord
            });
        } catch (error) {
            response.json({
                status: -1,
                error
            });
        }
    });

    router.route('/delete').delete(async (request, response) => {
        const {id} = request.query;
        try {
            const records = await Budget.deleteOne({ _id: id }).exec();
            if(records.deletedCount > 0){
                response.json({
                    status: 1,
                    deleted: records.deletedCount
                });
            } else {
                response.json({
                    status: -1,
                    error: "not found"
                });
            }
        } catch (error) {
            response.json({
                status: -1,
                error
            });
        }
    });

    router.route('/update').put(async (request, response) => {
        const object = request.body;

        try {
            const budgets = await Budget.updateOne({ _id: object.id }, object).exec();
            if(budgets.n > 0 || budgets.nModified > 0){
                response.json({
                    status: 1,
                    updated: budgets.nModified
                });
            } else {
                response.json({
                    status: -1,
                    error: "not found"
                });
            }
        } catch (error) {
            response.json({
                status: -1,
                error
            });
        }
    });

    return router;
};