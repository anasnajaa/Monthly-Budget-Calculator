const currentDatabaseId = document.cookie.split("=")[1] || util.uuid();
let budgetsList = [];
document.cookie = "id="+currentDatabaseId;
document.getElementById("session-id").innerHTML = currentDatabaseId;
const mContainer = document.getElementById("main-container");
const budgetTableId = "budget-table";
const btnSaveBudgetId = "btn-save-budget";
const btnCancelBudgetId = "btn-cancel-budget";
const budgetFormAlertId = "budget-form-alert";
const totalBalanceId = "txt-total-balance";
const totalCreditId = "txt-total-credit";
const totalDebitId = "txt-total-debit";

async function addBudget() {
    const title = util.getVal("txt-title");
    const notes = util.getVal("txt-notes");
    const amount = util.getVal("txt-amount");
    const rDebit = util.getVal("radio-debit");
    const type = rDebit ? "d" : "c";

    if(amount === "" || title === ""){
        util.setHtml(budgetFormAlertId, templates.alert("Please fill required fields", "warning"));
        return;
    } else { util.setHtml(budgetFormAlertId, ""); }

    util.setButton(btnSaveBudgetId, templates.loadingButton(), true);
    util.setButton(btnCancelBudgetId, "Cancel", true);

    const response = await api.addBudget({ amount, title, notes, groupId: currentDatabaseId, type });

    util.setButton(btnSaveBudgetId, "Save", false);
    util.setButton(btnCancelBudgetId, "Cancel", false);

    if(response){
        budgetsList.push(response);
        renderBudgetTable();
        util.triggerClick(btnCancelBudgetId);
    } else {
        util.setHtml(budgetFormAlertId, templates.alert("Error Saving Data", "danger"));
    }
};

const calculateBudget = () => {
    let totalBalance = 0;
    let totalCredit = 0;
    let totalDebit = 0;

    if(budgetsList.length !== 0){ 
        budgetsList.forEach(bObject => {
            if(bObject.type === "d"){
                totalDebit += bObject.amount;
            } else {
                totalCredit += bObject.amount;
            }
        });
    }

    totalBalance = totalCredit - totalDebit;

    util.setHtml(totalBalanceId, `${totalBalance} KWD`);
    util.setHtml(totalCreditId, `${totalCredit} KWD`);
    util.setHtml(totalDebitId, `${totalDebit} KWD`);
};

const renderBudgetTable = ()=>{
    util.setHtml(budgetTableId, "");
    if(budgetsList.length === 0){ util.setHtml(budgetTableId, templates.emptyTable()); }
    budgetsList.forEach(bObject => {
        bObject.btnEdit = util.uuid();
        bObject.btnDelete = util.uuid();
        bObject.btnInfo = util.uuid();
        bObject.containerId = util.uuid();

        util.appendHtml(budgetTableId, templates.budgetRecord(bObject));

        util.onClick(bObject.btnDelete, ()=>{
            if(confirm("Are you sure you want to delete this record?")){
                if(api.deleteBudget(bObject._id)){
                    for(let i = 0; i< budgetsList.length; i++){
                        if(budgetsList[i]._id === bObject._id){
                            budgetsList.splice(i, 1); break;
                        }
                    }
                    renderBudgetTable();
                }
            }
        });
    });
    calculateBudget();
};

async function loadBudget() {
    util.setHtml(budgetTableId, templates.loadingTable());
    budgetsList = await api.getBudgetsByGroup(currentDatabaseId);
    renderBudgetTable();
};

loadBudget();

util.onClick(btnSaveBudgetId, ()=>{
    addBudget();
});