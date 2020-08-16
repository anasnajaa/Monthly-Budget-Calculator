const api = {
    endpoint: "/api/v1",
    deleteBudget: async (id) => {
        try {
            const response = await fetch(`${api.endpoint}/budget/${id}`, {method: "DELETE"});
            if(response.ok){
                let data = await response.json();
                if(data.deleted === 1) {
                    return true;
                }
            }
        } catch (error) { return false; }
    },
    addBudget: async (objectToAdd) => {
        try {
            const response = await fetch(`${api.endpoint}/budget`,
            { method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(objectToAdd)});
            if(response.ok){
                let data = await response.json();
                return data.newRecord;
            }
        } catch (error) {
            return null; 
        }
    },
    getBudgetsByGroup: async (groupId)=>{
        try {
            const response = await fetch(`${api.endpoint}/budget/group/${groupId}`);
            if(response.ok){
                const data = await response.json();
                if(data.list.length > 0){
                    return data.list;
                }
                return [];
            }
            return [];
        } catch (error) { 
            return [];
        }
    }
};