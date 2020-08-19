const templates = {
    alert: (message, type)=>{ return `<div class="alert alert-${type}" role="alert">${message}</div>` },
    emptyTable: ()=>{ return `<tr><td colspan="3"><div class="alert alert-dark" role="alert">No records found</div></td></tr>`; },
    loadingTable: ()=>{ return `<tr><td colspan="3" class="text-center"><div class="spinner-border text-secondary" role="status"><span class="sr-only">Loading...</span></div>&nbsp;&nbsp; Loading...</td></tr>`; },
    loadingButton: () => { return `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...`; },
    budgetRecord: (budgetObject)=>{
        const tableClass = budgetObject.type === "c" ? "success" : "warning";
        const symb = budgetObject.type === "c" ? "+ " : "- ";
        return `
        <tr id="${budgetObject.containerId}" class="table-${tableClass}">
            <th scope="row">${symb}${budgetObject.amount} KWD</th>
            <td>${budgetObject.title}</td>
            <td>
                <button id="${budgetObject.btnEdit}" type="button" class="btn btn-sm btn-outline-primary"><i class="far fa-edit"></i></button>
                <button id="${budgetObject.btnDelete}" type="button" class="btn btn-sm btn-outline-danger"><i class="far fa-trash-alt"></i></button>
                <button id="${budgetObject.btnInfo}" type="button" class="btn btn-sm btn-outline-info"><i class="fas fa-sticky-note"></i></button>
            </td>
        </tr>`;
    },
    modal: (id, title, bodyId, footerId, closeId) => {
        return `
        <div class="modal fade" id="${id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="modal-${id}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-${id}">${title}</h5>
                    <button id="${closeId}" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div id="${bodyId}" class="modal-body p-0"></div>
                <div id="${footerId}" class="modal-footer"></div>
            </div>
        </div>
    </div>`;
    },
    formAddEditBudget: (radioDebitId, radioCreditId, titleId, notesId, amountId, alertId) => {
        const gridRadios = util.uuid();
        return `
        <div class="card p-0 m-0">
            <img src="./assets/expense-cover.jpg" class="card-img-top">
            <div class="card-body">
                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-3 pt-0">Operation Type</legend>
                        <div class="col-sm-9">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="${gridRadios}" id="${radioDebitId}" value="debit" checked>
                                <label class="form-check-label" for="${radioDebitId}">Debit</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="${gridRadios}" id="${radioCreditId}" value="credit">
                                <label class="form-check-label" for="${radioCreditId}">Credit</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div class="form-group row">
                    <label for="${titleId}" class="col-sm-3 col-form-label">Title <span class="text-danger">*</span></label>
                    <div class="col-sm-9"><input id="${titleId}" type="text" aria-label="Title" class="form-control"></div>
                </div>
                <div class="form-group row">
                    <label for="${notesId}" class="col-sm-3 col-form-label">Notes</label>
                    <div class="col-sm-9"><input id="${notesId}" type="text" aria-label="Notes" class="form-control"></div>
                </div>
                <div class="form-group row">
                    <label for="${amountId}" class="col-sm-3 col-form-label">Amount <span class="text-danger">*</span></label>
                    <div class="col-sm-9">
                        <div class="input-group">
                            <input id="${amountId}" type="number" class="form-control" aria-label="Amount">
                            <div class="input-group-append"><span class="input-group-text">KWD</span></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-1">
                        <small> <span class="text-danger">*</span> required</small>
                    </div>
                    <div class="col-12" id="${alertId}"> </div>
                </div>
            </div>
        </div>`;
    },
    button: (id, text, htmlClass) => {
        return `<button type="button" id="${id}" class="btn ${htmlClass}">${text}</button>`;
    },
    formBudgetSettings: (sessionId, sessionInputId)=>{
        return `
        <div class="card p-0 m-0">
            <img src="./assets/budget-cover.jpg" class="card-img-top">
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <h2>Current Budget ID</h2>
                        <div id="${sessionId}" class="alert alert-info" role="alert"></div>
                        <p>This session is saved by default on this device. To access it from different browser/device, copy this ID and paste it inside the Load ID box.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <div class="form-group row">
                            <label for="${sessionInputId}" class="col-sm-3 col-form-label">Load ID</label>
                            <div class="col-sm-9"><input id="${sessionInputId}" type="text" aria-label="Session ID" class="form-control"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    },
    aboutBudget: () => {
        return `
        <div class="card p-0 m-0">
            <img src="./assets/about-cover.jpg" class="card-img-top">
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <h2>Technology stack</h2>
                        <p>MongoDB, NodeJS, Express, Bootstrap, Vanilla Javascript</p>
                    </div>
                </div>
            </div>
        </div>`;
    },
    budgetInfo: (budgetObject) => {
        const typeName = budgetObject.type === "d" ? "Debit" : "Credit";
        const dateUpdated = budgetObject.createdAt === budgetObject.updatedAt ? "-" : util.formatDate(budgetObject.updatedAt);
        return `
        <div class="card p-0 m-0">
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <table class="table table-hover">
                            <tbody>
                                <tr><th scope="row">ID</th><td>${budgetObject._id}</td></tr>
                                <tr><th scope="row">Title</th><td>${budgetObject.title}</td></tr>
                                <tr><th scope="row">Type</th><td>${typeName}</td></tr>
                                <tr><th scope="row">Amount</th><td>${budgetObject.amount} KWD</td></tr>
                                <tr><th scope="row">Notes</th><td>${budgetObject.notes}</td></tr>
                                <tr><th scope="row">Date Created</th><td>${util.formatDate(budgetObject.createdAt)}</td></tr>
                                <tr><th scope="row">Date Updated</th><td>${dateUpdated}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    },
    navBar: (navContainerId) => {
        return `
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
            <a class="navbar-brand" href="#">Budget Calculator</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navId" aria-controls="navId" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navId">
                <ul class="navbar-nav mr-auto" id="${navContainerId}"></ul>
            </div>
        </nav>`;
    },
    mainPage: (totalBalanceId, totalCreditId, totalDebitId, budgetTableId) => {
        return `
        <div class="container">
            <div class="row mt-2">
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="alert alert-primary" role="alert">Balance:<span id="${totalBalanceId}" class="float-right">0 KWD</span></div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="alert alert-success" role="alert">Total Credit:<span id="${totalCreditId}" class="float-right">0 KWD</span>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="alert alert-warning" role="alert">Total Debit:<span id="${totalDebitId}" class="float-right">0 KWD</span></div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Amount</th>
                                <th scope="col">Title</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="${budgetTableId}"></tbody>
                    </table>
                </div>
            </div>
        </div>`;
    }
};