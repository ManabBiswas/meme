const genMemeBtn = document.querySelector(".meme-button");
const memeImage = document.querySelector(".memeImage");
const memeTitle = document.querySelector(".loadingClass");
const backImage = document.querySelector(".gen-meme");
let page =1;
const updateDetails = (url, title) => {
    memeImage.setAttribute("src",url);
    memeTitle.innerHTML = title;
};

const genMemeFunc = () => {
    fetch("https://meme-api.com/gimme/wholesomememes")
    .then((response) => response.json())
    .then((data) => {
        updateDetails(data.url, data.title);
    });
    removeBackground();
    showImageFunc();
};
function removeBackground() {
    backImage.style.background = 'none';
}

function showImageFunc() {
    memeImage.style.display = "inline-block"
}

genMemeBtn.addEventListener("click", genMemeFunc);


