// index.js
/*fetch json data, append the image of each ramen on to the menu on top. 
each should be buttons that update the image below with the rating and comment.

then im going to need to create a new ramen, updating the json and page.

*/

//codejs

const menu = document.getElementById("ramen-menu");
const submitForm = document.getElementById('new-ramen');
const submitButton = submitForm.querySelector('#submit-button');
submitButton.addEventListener('click',(e)=>{
  e.preventDefault();
  addSubmitListener(e);
})
fetch("http://localhost:3000/ramens")
.then(res=> res.json())
.then((ramenData) => {displayRamens(ramenData)})



console.log(submitButton)

// Callbacks
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
};

const addSubmitListener = (e) => {
  // Add code
  console.log('addSubmitListener called');
   
  console.log('click')
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
    
}

const displayRamens = (ramenData) => {
  // Add code 
  ramenData.forEach((ramen)=>{
    const ramenName = ramen.name;
    const ramenRest = ramen.restaurant;
    const ramenRating = ramen.rating;
    const ramenComment = ramen.comment;
    const ramenUrl = ramen.image; 
    
    const ramenImg = document.createElement('img');
    
    ramenImg.src= ramenUrl;
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
