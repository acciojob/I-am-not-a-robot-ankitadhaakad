//your code here
const images = [
  "https://picsum.photos/id/237/200/300",          // img1
  "https://picsum.photos/seed/picsum/200/300",     // img2
  "https://picsum.photos/200/300?grayscale",       // img3
  "https://picsum.photos/200/300/",                 // img4
  "https://picsum.photos/200/300.jpg"               // img5
];

const imageContainer = document.getElementById("imageContainer");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const messageH3 = document.getElementById("h");
const resultPara = document.getElementById("para");

let selectedImages = [];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function init() {
  imageContainer.innerHTML = "";
  resultPara.textContent = "";
  messageH3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  selectedImages = [];

  // Pick one random image to duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const duplicateImage = images[duplicateIndex];

  // Prepare 5 unique images + 1 duplicate
  let imgArray = [...images];
  // Remove duplicate image once from array to avoid 2 duplicates
  imgArray.splice(duplicateIndex, 1);
  // Pick 4 images + the duplicate image twice (total 6)
  imgArray = [duplicateImage, ...imgArray.slice(0,4), duplicateImage];

  // Shuffle images before displaying
  shuffleArray(imgArray);

  // Create image elements with required classes (.img1 to .img5)
  imgArray.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.src = src; // For comparison
    // Assign class based on original images array index
    const classIndex = images.indexOf(src) + 1; // 1-based index
    img.classList.add("img" + classIndex);
    img.addEventListener("click", () => onImageClick(img));
    imageContainer.appendChild(img);
  });
}

function onImageClick(img) {
  if (selectedImages.length >= 2) return; // Ignore clicks after 2 selected

  // Prevent selecting the same image twice
  if (selectedImages.includes(img)) return;

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length === 1) {
    resetBtn.style.display = "inline-block";
    verifyBtn.style.display = "none";
    resultPara.textContent = "";
  } else if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  resultPara.textContent = "";
  messageH3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  if (selectedImages.length !== 2) return;

  const [img1, img2] = selectedImages;

  verifyBtn.style.display = "none";

  if (img1.dataset.src === img2.dataset.src) {
    messageH3.textContent = "You are a human. Congratulations!";
  } else {
    messageH3.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.onload = init;
