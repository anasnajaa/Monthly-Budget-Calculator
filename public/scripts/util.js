const util = {
    uuid: () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)),
    setHtml: (id, html)=>{ document.getElementById(id).innerHTML = html; },
    appendHtml: (id, html) => { document.getElementById(id).insertAdjacentHTML("beforeend", html); },
    enableElement: (id) => { document.getElementById(id).disabled = false; },
    disableElement: (id) => { document.getElementById(id).disabled = true; },
    onClick: (id, func) => { document.getElementById(id).addEventListener("click", func); },
    getVal: (id) => { 
        const el = document.getElementById(id);
        if(el.type === "number") {
            return (el.value === "" || el.value === null) ? 0 : el.value;
        } else if (el.type === "text"){
            return (el.value === "" || el.value === null) ? "" : el.value;
        } else if (el.type === "radio"){
            return el.checked;
        }
    },
    setButton: (id, html, disabled)=> {
        util.setHtml(id, html);
        document.getElementById(id).disabled = disabled;
    },
    triggerClick: (id) => {
        document.getElementById(id).click();
    }
};