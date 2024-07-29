// index.js
/*fetch json data, append the image of each ramen on to the menu on top. 
each should be buttons that update the image below with the rating and comment.

then im going to need to create a new ramen, updating the json and page.

*/

//codejs
//eventlistener on the domcontent to update the featured
document.addEventListener("DOMContentLoaded",() => {
  console.log("We good.")
  fetchRamenData();
  fetch(`http://localhost:3000/ramens/2`)
  .then((res)=> res.json())
  .then((data)=>{
      let randomData = data;
     handleNaruto(randomData)
      
  })
})


// function that handle the initial
const handleNaruto = function(ramen){
  const ramenImg = document.createElement('img');
  const ramenUrl = ramen.image;   
  ramenImg.src= ramenUrl;
  ramenImg.alt= ramen.name;
  handle(ramen)
}

//function to display the ramen data in featured
const handle = (ramen) => {
  
  const ramenCommentLine = document.getElementById('comment-display');
  ramenCommentLine.textContent = ramen.comment;
  const ramenRatingLine = document.getElementById('rating-display');
  ramenRatingLine.textContent = ramen.rating;
  const ramenTitle = document.getElementsByClassName("name")[0];
  ramenTitle.textContent = ramen.name;
  const ramenRestuarant = document.getElementsByClassName("restaurant")[0];
  ramenRestuarant.textContent = ramen.restaurant;
  const ramenDetailImg = document.getElementsByClassName("detail-image")[0];
  ramenDetailImg.src = ramen.image;
};

//fetching the ramen menu and diplaying
const menu = document.getElementById("ramen-menu");
const submitForm = document.getElementById('new-ramen');
const submitButton = submitForm.querySelector('#submit-button');
submitButton.addEventListener("click",(e)=>{
  e.preventDefault();
  addSubmitListener(e);
})

// Object to store ramen data by ID

let ramenDataStore = {};

const fetchRamenData = () => {
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      ramenDataStore = data.reduce((acc, ramen) => {
        acc[ramen.id] = ramen;
        return acc;
      }, {});
      
      console.log("Stored data:", ramenDataStore);
      displayRamens(data);
    });
};

//function to hanble the click event on the menu images
let currentRamenId = "2";

const handleClick = (ramen) => {
  console.log('click');
  const ramenCommentLine = document.getElementById('comment-display');
  ramenCommentLine.textContent = ramen.comment;
  const ramenRatingLine = document.getElementById('rating-display');
  ramenRatingLine.textContent = ramen.rating;
  const ramenTitle = document.getElementsByClassName("name")[0];
  ramenTitle.textContent = ramen.name;
  const ramenRestuarant = document.getElementsByClassName("restaurant")[0];
  ramenRestuarant.textContent = ramen.restaurant;
  const ramenDetailImg = document.getElementsByClassName("detail-image")[0];
  ramenDetailImg.src = ramen.image;
  currentRamenId = ramen.id;
  
}; 

// grabbing the edit form elements
const editForm = document.getElementById("edit-ramen");
const editRating = editForm.children[2];
const editComment = editForm.children[4];
const editButton = editForm.children[5];

editButton.addEventListener('click', (e)=>{
  e.preventDefault();

  const editRatingValue = editRating.value;
  const editCommentValue = editComment.value;
  const ramenToUpdate = ramenDataStore[currentRamenId];

  const updatedRamen = {
    ...ramenToUpdate,
    rating: editRatingValue,
    comment: editCommentValue,
  };

 ramenDataStore[currentRamenId] = updatedRamen;
 console.log("click");
 updateRamen(updatedRamen)

})

//patch request to updat the currently featured ramen

const updateRamen = function(ramen){
  const configurationObj = {
    method: "PATCH",
    headers:{
      "Content-Type": "appliation/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(ramen)
  }

    fetch(`http://localhost:3000/ramens/${ramen.id}`, configurationObj)
    .then(response => response.json())
    .then(object => {
      console.log('Ramen updated:', object);

      handle(object);
    })
    .catch(function(error){
      alert("Something happened");
      console.log(error.message);
    })
}

let postingObj ={};

const addSubmitListener = (e) => {
  // Add code
  console.log('addSubmitListener called');
   
  console.log(e)
  const newRamen = document.createElement('img');
  newRamen.src = e.target.parentNode.children[6].value;
  menu.appendChild(newRamen);

  const ramenForm = e.target.parentNode;
  newRamen.addEventListener('click',()=>{

    console.log('click');
    const ramenCommentLine = document.getElementById('comment-display');
    ramenCommentLine.textContent = ramenForm.children[10].value;
    const ramenRatingLine = document.getElementById('rating-display');
    ramenRatingLine.textContent = ramenForm.children[8].value;
    const ramenTitle = document.getElementsByClassName("name")[0];
    ramenTitle.textContent= ramenForm.children[2].value;
    const ramenRestuarant= document.getElementsByClassName("restaurant")[0];
    ramenRestuarant.textContent= ramenForm.children[4].value;
    const ramenDetailImg= document.getElementsByClassName("detail-image")[0];
    ramenDetailImg.src= newRamen.src;
    
  })
  // postRamen()
}

const displayRamens = (ramenData) => {
  // Add code 
  ramenData.forEach((ramen)=>{
    const ramenImg = document.createElement('img');
    const ramenUrl = ramen.image;    
    ramenImg.src= ramenUrl;
    ramenImg.alt = ramen.Name;
    ramenImg.addEventListener('click', () => {
      handleClick(ramen);
    });
    menu.appendChild(ramenImg)
    //console.log(ramenImg)
    //console.log(ramenImg.innerHTML)
    
  })
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  fetch("http://localhost:3000/ramens")
  .then(res=> res.json())
  .then((ramenData) => {displayRamens(ramenData)}) // Invoke the displayRamens function
  addSubmitListener();
}

main() 

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
