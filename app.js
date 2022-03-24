let scrollBTN = document.getElementById("btn-back-to-top");

let header = document.getElementById("navBar");

let homeLink = document.getElementById("homeLink");
let expLink = document.getElementById("expLink");
let workLink = document.getElementById("workLink");

let homeZone = document.getElementById("home");
let expZone = document.getElementById("exp");
let workZone = document.getElementById("work");

window.addEventListener("scroll", () => {
  let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  homeZone_height = homeZone.offsetHeight;
  expZone_height = expZone.offsetHeight;
  workZone_height = workZone.offsetHeight;

  //navbar sticky
  if (scroll > 50) {
    header.classList.add("fixed-top");

    // add padding top to show content behind navbar
    navbar_height = header.offsetHeight;
    document.body.style.paddingTop = navbar_height + "px";
  } else {
    header.classList.remove("fixed-top");

    // remove padding top from body
    document.body.style.paddingTop = "0";
  }

  //scroll top btn
  if (scroll > 25) {
    scrollBTN.style.display = "block";
  } else {
    scrollBTN.style.display = "none";
  }

  if (scroll <= 350) {
    //home link active
    homeLink.classList.add("active");
    workLink.classList.remove("active");
  } else if ((scroll = workZone_height)) {
    //work link active
    homeLink.classList.remove("active");
    workLink.classList.add("active");
  }
});

scrollBTN.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
