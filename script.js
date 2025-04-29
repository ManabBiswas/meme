const genMemeBtn = document.querySelector(".meme-button");
const memeImage = document.querySelector(".memeImage");
const memeTitle = document.querySelector(".title");
const loader = document.querySelector(".loadingClass");
const backImage = document.querySelector(".gen-meme");

const updateDetails = (url, title) => {
    // Create a new image object to check when image is loaded
    const img = new Image();
    img.src = url;
    
    img.onload = () => {
        // Image is loaded, now update UI
        memeImage.setAttribute("src", url);
        memeTitle.innerHTML = title;
        removeBackgroundAndShowImage();
        // Hide loader and show title only after image is loaded
        loader.style.display = 'none';
        memeTitle.style.display = "block";
    };

    img.onerror = () => {
        // Handle image loading error
        loader.innerHTML = "Failed to load meme. Please try again.";
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);
    };
};

const genMemeFunc = async () => {
    try {
        const response = await fetch("https://meme-api.com/gimme/wholesomememes");
        const data = await response.json();
        updateDetails(data.url, data.title);
    } catch (error) {
        loader.innerHTML = "Error loading meme. Please try again.";
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);
    }
};

function removeBackgroundAndShowImage() {
    backImage.style.background = 'none';
    backImage.style.opacity = '100%';
    memeImage.style.display = "inline-block";
}

function delayForLoading() {
    // Reset states
    memeImage.style.display = "none";
    memeTitle.style.display = "none";
    loader.style.display = 'block';
    loader.innerHTML = "Loading...."; // Reset loader text
    
    // Call genMemeFunc immediately
    genMemeFunc();
}

genMemeBtn.addEventListener("click", delayForLoading);

document.getElementById('currentYear').textContent = new Date().getFullYear();

