const uuid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
const router = new Router({mode: 'history', root: '/'});
const mContainer = document.getElementById("main-container");
const mNav = document.getElementById("main-nav");
const url = document.URL.toLowerCase();
const currentDatabaseId = document.cookie.split("=")[1] || uuid();
document.cookie = "id="+currentDatabaseId;

const pages = [
    {id: uuid(), title: "Home", path: "home", show: true, module:  ()=>{homePage()} },
    {id: uuid(), title: "Budget", path:"budget", show: true, module: ()=>{budgetPage()}},
    {id: uuid(), title: "Expenses", path:"expenses", show: true, module: ()=>{expensesPage()}},
    {id: uuid(), title: "Charts", path:"charts", show: true, module: ()=>{chartsPage()}},
    {id: uuid(), title: "About", path:"about", show: true, module: ()=>{aboutPage}}
];

let currentPage = pages[0];

const menuItemTempl = (page, isCurrent)=>{
    const menuSelector = `<span class="sr-only">(current)</span>`;
    return `
<li id="${page.id}" class="nav-item ${isCurrent ? "active" : ""}">
    <a class="nav-link" style="cursor: pointer;">
        ${page.title} ${isCurrent ? menuSelector : ""}
    </a>
</li>`;
};

const renderMenu = (currentPage)=>{
    mNav.innerHTML = "";
    pages.forEach(page => {
        mNav.insertAdjacentHTML("beforeend", menuItemTempl(page,  page.id === currentPage.id));
        document.getElementById(page.id).addEventListener("click", ()=>{
            router.navigate(page.path);
        });
    });
}

let mainTemplate = (title)=>{
    return `
    <h1>${title}</h1>
    <p class="lead">Current ID: <span class="badge badge-primary"><b>${currentDatabaseId}</b></span></p>
    <p>Use this ID to access your budget across devices.</p>`;
};

pages.forEach(page => {
    router.add(page.path, () => {
        renderMenu(page);
        page.module();
    });

    if(url.indexOf(page.path) >-1){
        currentPage = page;
    }
});

renderMenu(currentPage);

function homePage() {
    console.log("ok");
    mContainer.innerHTML = mainTemplate("Home");
};

function budgetPage(){

};

function expensesPage(){

};

function chartsPage(){

};

function aboutPage(){

};

