
const Budget = require('../models/budget.model');

module.exports = (router) => {

    router.route('/budget').get(async (request, response) => {
        const strip = { '__v': 0};
        try {
            const list = await Budget.find({}, strip).exec();
            response.json({ status: 1, list });
        } catch (error) {
            console.log(error);
            response.json({ status: -1, error });
        }
    });

    router.route('/budget/group/:id').get(async (request, response) => {
        const {id} = request.params;
        try {
            const records = await Budget.find({ groupId: id }).exec();
            if(records.length > 0){
                response.json({
                    status: 1,
                    list: records
                });
            } else {
                response.json({
                    status: 1,
                    list: []
                });
            }
            
        } catch (error) {
            response.json({ status: -1, error });
        }
    });

    router.route('/budget').post(async (request, response) => {
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

    router.route('/budget/:id').delete(async (request, response) => {
        const {id} = request.params;
        try {
            const records = await Budget.deleteOne({_id: id}).exec();
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

    router.route('/budget').put(async (request, response) => {
        const object = request.body;

        try {
            const budgets = await Budget.updateOne({ _id: object.id }, object).exec();
            if(budgets.n > 0 || budgets.nModified > 0){
                const records = await Budget.findOne({ _id: object.id }).exec();
                response.json({
                    status: 1,
                    updatedRecord: records
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