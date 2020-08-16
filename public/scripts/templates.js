const templates = {
    alert: (message, type)=>{ return `<div class="alert alert-${type}" role="alert">${message}</div>` },
    emptyTable: ()=>{ return `<tr><td colspan="3"><div class="alert alert-dark" role="alert">No records found</div></td></tr>`; },
    loadingTable: ()=>{ return `<tr><td colspan="3" class="text-center"><div class="spinner-border text-secondary" role="status"><span class="sr-only">Loading...</span></div>&nbsp;&nbsp; Loading...</td></tr>`; },
    loadingButton: () => { return `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...`; },
    budgetRecord: (budgetObject)=>{
        const tableClass = budgetObject.type === "c" ? "success" : "warning";
    
        return `
        <tr id="${budgetObject.containerId}" class="table-${tableClass}">
            <th scope="row">${budgetObject.amount} KWD</th>
            <td>${budgetObject.title}</td>
            <td>
                <button id="${budgetObject.btnEdit}" type="button" class="btn btn-sm btn-outline-primary m-1"><i class="far fa-edit"></i></button>
                <button id="${budgetObject.btnDelete}" type="button" class="btn btn-sm btn-outline-danger m-1"><i class="far fa-trash-alt"></i></button>
                <button id="${budgetObject.btnInfo}" type="button" class="btn btn-sm btn-outline-info m-1"><i class="fas fa-sticky-note"></i></button>
            </td>
        </tr>
        `;
    }
};