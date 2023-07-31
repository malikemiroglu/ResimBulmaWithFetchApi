const formWrapper = document.querySelector('.formWrapper');
const form = document.querySelector('#form');
const searchInput = document.querySelector('#searchInput');
const buttonWrapper = document.querySelectorAll('.buttonWrapper');
const searchButton = document.querySelector('#searchButton');
const clearButton = document.querySelector('#clearButton');
const imageWrapper = document.querySelector('.imageWrapper');


runEventListener();
function runEventListener() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}

function clear() {
    searchInput.value = "";
    Array.from(imageWrapper.children).forEach((child => child.remove()))
}

function search(e) {
    const value = searchInput.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method : "GET",
        headers : {
            Authorization : "Client-ID miQl88Cn0s_YhG-m8lksFgoAvZwZMpusyLj7ZM5n6Ws"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        Array.from(data.results).forEach((image) => {
            addImageToUI(image.urls.small)
        })
    })
    .catch((err) => console.log(err))

    e.preventDefault();
}

function addImageToUI(url) {
    const div = document.createElement('div');
    div.className = "card";
    div.height = '260';

    const img = document.createElement('img');
    img.setAttribute("src", url);
    img.height = '260';
    img.width = '260';

    div.append(img);
    imageWrapper.append(div);
}