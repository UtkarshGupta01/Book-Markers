// Add new website

let website_id = 1;
let websites = [];
let selectedWebsiteId = ""    //To create bookmark unnder each selected website
const new_web_div = () => {
    let web_name = prompt("Enter name of website");
    const sanitizeName = web_name.replace(" ", "_")
    if (web_name) {
        let new_div = document.createElement("div");
        new_div.className = "website";
        let unique_id = `${sanitizeName}_${website_id}`
        new_div.innerHTML = `<li id="${unique_id}" class="website_list_item" onclick="web_click('${unique_id}')">${web_name}</li>`;
        document.getElementsByClassName("website_list")[0].appendChild(new_div);

        let webObj = {
            id: unique_id,
            website_name: web_name
        };

        websites.push(webObj);

        localStorage.setItem('web_array', JSON.stringify(websites));

        website_id++;

        alert(`Created ${web_name} with id : ${unique_id}`)
    }
};

document.addEventListener('DOMContentLoaded', () => {
    let storedWebArray = JSON.parse(localStorage.getItem('web_array'));
    if (storedWebArray) {
        websites = storedWebArray;
        websites.forEach(website => {
            let new_div = document.createElement("div");
            new_div.className = "website";
            let unique_id = `${website.id}`;
            new_div.innerHTML = `<li id="${unique_id}" class="website_list_item" onclick="web_click('${website.id}')">${website.website_name}</li>`;
            document.getElementsByClassName("website_list")[0].appendChild(new_div);
        });
    }
});

function web_click(web_id) {
    //first remove border style from other website item
    let previousSelectedEle = document.getElementById(selectedWebsiteId)
    if (previousSelectedEle) {
        previousSelectedEle.style.border = "none"
    }
    selectedWebsiteId = web_id;

    let ele = document.getElementById(web_id)
    ele.style.border = "2px solid black"
    loadBookmarks()
}

// Add new Bookmark
const new_mark_div = () => {
    if (selectedWebsiteId === "") {
        alert("Please first select or create a website to create a bookmark under it")
        return;
    }
    let page_link = prompt("Enter or paste link of the page");
    let page_name = prompt("Enter name of the page");
    if (page_link && page_name) {
        let new_div = document.createElement("div");
        new_div.className = "bookmark";
        new_div.innerHTML = `<li class="bookmark_list_item"><a href="${page_link}" target="_blank">${page_name}</a></li>`;
        document.getElementsByClassName("bookmark_list")[0].appendChild(new_div);

        // Retrieve existing bookmarks array or create a new one
        let storedPageArray = JSON.parse(localStorage.getItem(`${selectedWebsiteId}`)) || [];
        storedPageArray.push({ link: page_link, name: page_name });

        localStorage.setItem(`${selectedWebsiteId}`, JSON.stringify(storedPageArray));
    }
};

const loadBookmarks = () => {
    let storedPageArray = JSON.parse(localStorage.getItem(`${selectedWebsiteId}`));
    let bookMarkList = document.getElementsByClassName("bookmark_list")[0]
    bookMarkList.innerHTML = ``
    if (storedPageArray) {
        storedPageArray.forEach(page => {
            let new_div = document.createElement("div");
            new_div.className = "bookmark";
            new_div.innerHTML = `<li class="bookmark_list_item"><a href="${page.link}" target="_blank">${page.name}</a></li>`;
            bookMarkList.appendChild(new_div);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadBookmarks());
