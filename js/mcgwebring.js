import sites from "./sites.js";



const fuseOptions = {
    includeScore : false,
    threshold : 0.25,
    keys : ['name', 'year', 'website']
}

const fuse = new Fuse(sites, fuseOptions);

function fillSiteTable(type){
    const searchBar = document.getElementById("searchbar");
    const divSiteList = document.getElementById("searchsection");
    let siteArray = [];
    
    if (type == "fromLoading" || (type == "fromSearch" && !searchBar.value)) {
        siteArray = sites;
    }
    else if (type == "fromSearch" && searchBar.value){
        let results = [];
        if (Number.parseInt(searchBar.value)){
            results = fuse.search("=" + searchBar.value);
        }
        else{
            results = fuse.search(searchBar.value);
        }
        for (let i = 0; i < results.length; i++){
            siteArray.push(results[i]["item"]);
        }
    }
    if (document.getElementById("mainTable")){
        const oldTable = document.getElementById("mainTable");
        oldTable.remove();
    }

    let htmlContent = [];
    htmlContent.push("<ul class=\"siteslist\" id=\"mainTable\">");
    for (let i = 0; i < siteArray.length; i++){
        let cleanSite = new URL(siteArray[i]["website"]);
        let host = cleanSite.hostname;
        if (host.substring(0,4) === "www."){
            host = host.substring(4, host.length);
        }
        htmlContent.push("<li><a target=\"_blank\" href=\"" + cleanSite.toString() + "\">" + host + "</a></li>");
    }
    htmlContent.push("</ul>");
    divSiteList.insertAdjacentHTML(
        "afterend",
        htmlContent.join('')
    );
}
window.fillSiteTable = fillSiteTable;

function displayName() {
    let index = 0;

    function nextSite() {
        const user = sites[index];
        userInfo.innerHTML = `<a href="${user.website}">${user.name}, ${user.year}</a><img src="./assets/martlet.png" id="martlet">`;
        userInfo.className = 'fade-in';

        setTimeout(() => {
            userInfo.className = 'fade-out';

            setTimeout(() => {
                index = (index + 1) % sites.length;
                nextSite();
            }, 2000);
        }, 4000);
    }

    nextSite();
}

window.displayName = displayName;
