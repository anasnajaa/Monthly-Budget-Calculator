const app = document.getElementById("app");

const initApp = () => {
    const navContainerId = util.uuid();
    const btnAddEntryId = util.uuid();
    const btnSettingsId = util.uuid();
    const btnAboutId = util.uuid();
    const totalBalanceId = util.uuid(); 
    const totalCreditId = util.uuid(); 
    const totalDebitId = util.uuid(); 
    const budgetTableId = util.uuid();
    
    let showAddEditBudgetForm = ()=>{};
    let budgetsList = [];
    
    util.setHtml(app.id, "");

    util.appendHtml(app.id, templates.navBar(navContainerId));
    util.appendHtml(navContainerId, templates.button(btnAddEntryId, "Add Entry", "btn-primary m-1"));
    util.appendHtml(navContainerId, templates.button(btnSettingsId, "Budget Settings", "btn-dark m-1"));
    util.appendHtml(navContainerId, templates.button(btnAboutId, "About", "btn-light m-1"));

    util.appendHtml(app.id, templates.mainPage(totalBalanceId, totalCreditId, totalDebitId, budgetTableId));

    const setDbId = (newId)=>{
        let id = newId || util.uuid();
        document.cookie = "id="+id;
        return id;
    };

    let currentDatabaseId = setDbId(document.cookie.split("=")[1]);

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

    const updateBudget = (updatedBudgetObject) => {
        for(let i = 0; i < budgetsList.length; i++){
            if(budgetsList[i]._id === updatedBudgetObject._id){
                budgetsList[i] = updatedBudgetObject;
                break;
            }
        }
    };
    
    const renderBudgetTable = ()=>{
        util.setHtml(budgetTableId, "");
        if(budgetsList.length === 0){ util.setHtml(budgetTableId, templates.emptyTable()); }
        const debitList = [];
        const creditList = [];

        budgetsList.forEach(bObj =>{
            bObj.btnEdit = util.uuid();
            bObj.btnDelete = util.uuid();
            bObj.btnInfo = util.uuid();
            bObj.containerId = util.uuid();

            if(bObj.type === "d"){
                debitList.push(bObj);
            } else {
                creditList.push(bObj);
            }
        });

        const tempOrderedList = [...creditList, ...debitList];

        tempOrderedList.forEach(bObject => {    
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

            util.onClick(bObject.btnInfo, ()=>{
                const modalId = util.uuid();
                const footerId = util.uuid();
                const bodyId = util.uuid();
                const btnCancelId = util.uuid();

                util.initModal(modalId, 
                    "Details", 
                    bodyId,
                    footerId);

                util.setHtml(bodyId, templates.budgetInfo(bObject));

                util.setHtml(footerId, templates.button(btnCancelId, "Close", "btn-secondary"));

                util.onClick(btnCancelId, ()=>{
                    util.hideModal(modalId);
                });
                
                util.showModal(modalId);
            });

            util.onClick(bObject.btnEdit, ()=>{
                showAddEditBudgetForm(bObject);
            });
        });
        calculateBudget();
    };
    
    const loadBudget = async () => {
        util.setHtml(budgetTableId, templates.loadingTable());
        budgetsList = await api.getBudgetsByGroup(currentDatabaseId);
        renderBudgetTable();
    };
    
    showAddEditBudgetForm = async (formObject) => {
        const modalId = util.uuid();
        const footerId = util.uuid();
        const bodyId = util.uuid();
        const radioCreditId = util.uuid();
        const radioDebitId = util.uuid();
        const titleId = util.uuid();
        const notesId = util.uuid();
        const amountId = util.uuid();
        const alertId = util.uuid();
        const btnCancelId = util.uuid();
        const btnSaveId = util.uuid();
    
        const editMode = formObject ? true : false;
    
        util.initModal(modalId, 
            editMode ? "Edit Budget" : "Add Budget", 
            bodyId,
            footerId);
        
        util.setHtml(bodyId, templates.formAddEditBudget(radioDebitId, radioCreditId, titleId, notesId, amountId, alertId));
        util.setHtml(footerId, templates.button(btnCancelId, "Cancel", "btn-secondary") + templates.button(btnSaveId, editMode ? "Save" : "Add", "btn-primary"));
        
        util.onClick(btnCancelId, ()=>{
            util.hideModal(modalId);
        });
    
        if(editMode){
            util.setVal(titleId, formObject.title);
            util.setVal(notesId, formObject.notes);
            util.setVal(amountId, formObject.amount);
            util.setVal(radioDebitId, formObject.type === "d");
            util.setVal(radioCreditId, formObject.type === "c");
        }

        util.onClick(btnSaveId, async () => {
            const title = util.getVal(titleId);
            const notes = util.getVal(notesId);
            const amount = util.getVal(amountId);
            const rDebit = util.getVal(radioDebitId);
            const type = rDebit ? "d" : "c";
        
            if(amount === "" || title === ""){
                util.setHtml(alertId, templates.alert("Please fill required fields", "warning"));
                return;
            } else { util.setHtml(alertId, ""); }
        
            util.setButton(btnSaveId, templates.loadingButton(), true);
            util.setButton(btnCancelId, "Cancel", true);
        
            let serverBudgetObject = null;
    
            if(editMode) {
                serverBudgetObject = await api.updateBudget({ id: formObject._id, amount, title, notes, type });
            } else {
                serverBudgetObject = await api.addBudget({ amount, title, notes, groupId: currentDatabaseId, type });
            }
        
            util.setButton(btnSaveId, "Save", false);
            util.setButton(btnCancelId, "Cancel", false);
        
            if(serverBudgetObject){
                if(editMode){
                    updateBudget(serverBudgetObject);
                } else {
                    budgetsList.push(serverBudgetObject);
                }
                
                renderBudgetTable();
                util.hideModal(modalId);
            } else {
                console.log(editMode);
                util.setHtml(alertId, templates.alert("Error Saving Data", "danger"));
            }
        });
    
        util.showModal(modalId);
    };
    
    const showBudgetSettingsForm = () => {
        const modalId = util.uuid();
        const footerId = util.uuid();
        const bodyId = util.uuid();
        const btnCancelId = util.uuid();
        const btnSaveId = util.uuid();
        const sessionId = util.uuid();
        const sessionInputId = util.uuid();
    
        util.initModal(modalId, 
            "Budget Settings", 
            bodyId,
            footerId);
        
        util.setHtml(bodyId, templates.formBudgetSettings(sessionId, sessionInputId));
    
        util.setHtml(footerId, templates.button(btnCancelId, "Cancel", "btn-secondary") + templates.button(btnSaveId, "Save", "btn-primary"));
        
        util.setHtml(sessionId, currentDatabaseId);
    
        util.onClick(btnCancelId, ()=>{
            util.hideModal(modalId);
        });

        util.onClick(btnSaveId, ()=>{
            currentDatabaseId = setDbId(util.getVal(sessionInputId));
            util.hideModal(modalId);
            loadBudget();
        });
        
        util.showModal(modalId);
    };
    
    const showAbout = () => {
        const modalId = util.uuid();
        const footerId = util.uuid();
        const bodyId = util.uuid();
        const btnCancelId = util.uuid();
    
        util.initModal(modalId, 
            "About", 
            bodyId,
            footerId);
    
        util.setHtml(bodyId, templates.aboutBudget());
    
        util.setHtml(footerId, templates.button(btnCancelId, "Close", "btn-secondary"));
              
        util.onClick(btnCancelId, ()=>{
            util.hideModal(modalId);
        });
        
        util.showModal(modalId);
    };
    
    util.onClick(btnAddEntryId, ()=>{
        showAddEditBudgetForm(null);
    });
    
    util.onClick(btnSettingsId, ()=>{
        showBudgetSettingsForm();
    });
    
    util.onClick(btnAboutId, ()=>{
        showAbout();
    });
    
    loadBudget();
    
    util.initMobileMenu();
};

initApp();