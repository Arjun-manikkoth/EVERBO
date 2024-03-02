//dashboard
let menuicn = document.querySelector(".menuicn"); 
let nav = document.querySelector(".navcontainer"); 

  menuicn.addEventListener("click", () => { 
    console.log("itshappeningg")
    nav.classList.toggle("navclose"); 
  })