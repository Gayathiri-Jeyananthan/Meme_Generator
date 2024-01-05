// const generateMemeBtn = document.querySelector(
//   ".meme-generator .generate-meme-btn"
// );
// const memeImage = document.querySelector(".meme-generator img");
// const memeTitle = document.querySelector(".meme-generator .meme-title");
// const memeAuthor = document.querySelector(".meme-generator .meme-author");

// const updateDetails =(url,title,author) =>{
//     memeImage.setAttribute("src",url);
//     memeTitle.innerHTML = title;
//     memeAuthor.innerHTML = `Meme By: ${author}`;
    
// }

// const generateMeme = () => {  // This is like saying, "Hey, let's create a special button that, when pressed, will do something fun!"
//   fetch("https://api.imgflip.com/get_memes") 
//     .then((response) => response.json()) //It is like transltaing the response
//     .then((data) => {    //Once the response is converted to a format JavaScript can understand (which is what response.json() does), this part says, "Now, with the understandable data, do something with it." The data here refers to the data returned by the API, and the code inside the curly braces {...} is where you define what to do with that data.
//       updateDetails(data.url, data.title, data.author) //Now that we have the meme data, let's update the details on our page. The data.url, data.title, and data.author are pieces of information about the meme that we received from the API."
//     });
// };

// generateMemeBtn.addEventListener("click", generateMeme);

// generateMeme();
const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");

const updateDetails = (url, title, author) => {
  if (url && typeof url === "string" && url.trim() !== "") {
    memeImage.setAttribute("src", url);
  } else {
    console.error("Invalid or undefined image URL. Using a placeholder or default image.");
    memeImage.setAttribute("src", "https://example.com/placeholder.jpg");
  }
  memeTitle.innerHTML = title || "Meme Title";
  memeAuthor.innerHTML = author || "Unknown Author";
};

const generateMeme = () => {
  fetch("https://api.imgflip.com/get_memes")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Choose a random meme from the received data
      const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
      updateDetails(randomMeme.url, randomMeme.name, randomMeme.author);
    })
    .catch((error) => {
      console.error("Error fetching meme:", error);
      memeImage.setAttribute("src", "https://example.com/placeholder.jpg");
    });
};

generateMemeBtn.addEventListener("click", generateMeme);
