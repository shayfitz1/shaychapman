const navContainer = document.querySelector(".navigation-container");
const mainContainer = document.querySelector(".main-container");
const aboutContainer = document.querySelector(".about-container");
const projectContainer = document.querySelector(".project-container");
const contactContainer = document.querySelector(".contact-container");
const aboutInfoContainer = document.querySelector(".about-info-container");
const downArrowBox = document.querySelector("#down-arrow-box");
const downArrow = document.querySelector(".fa-angle-double-down");
const navButtons = document.querySelectorAll(".nav-buttons");
const profilePhoto = document.querySelector("img[alt=profile-photo");
const aboutHeader = document.querySelector("#about-head");
const projectHeader = document.querySelector("#project-head");
const contactHeader = document.querySelector("#contact-head");
const aboutButtons = document.querySelectorAll(".about-tabs button");
const aboutInfos = document.querySelectorAll(".about-info");
const skillsFill = document.querySelectorAll(".skills-fill");
const skillsFullWidth = document.querySelectorAll(".skills-full-width");
const projects = document.querySelectorAll(".project");
const projectFront = document.querySelectorAll(".project-front");
const aboutLeftDivs = document.querySelectorAll(".about-left div");
const aboutRightDivs = document.querySelectorAll(".about-right");
const percents = document.querySelectorAll(".percent");
const submitButton = document.querySelector("input[type='submit']");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const thankYouMessage = document.querySelector("#thank-you");
const hamburgerFullRow = document.querySelector("#hamburger");
const hamburgerBars = document.querySelector(".fa-bars");
let percentInterval;
let konami = [];


// if window is larger than phone screen width,
// nav bar turns to sticky nav once scrolling past the main section
window.addEventListener("scroll", function(e){
    let amountScrolled = e.target.scrollingElement.scrollTop
    let mainSectionScroll = mainContainer.offsetHeight - downArrowBox.offsetHeight;
    if (document.body.offsetWidth > 420){
        if (amountScrolled >= mainSectionScroll){
            navContainer.classList.add("sticky");
            navContainer.style.top = `${downArrowBox.offsetHeight}px`;
        } else {
            navContainer.classList.remove("sticky");
            navContainer.style.top = `${mainContainer.offsetHeight}px`;
        }
    }
    if (amountScrolled >= (contactContainer.offsetTop - 35)) {navHighlight(3)} 
    else if (amountScrolled >= (projectContainer.offsetTop - 35)) {navHighlight(2)} 
    else if (amountScrolled >= (aboutContainer.offsetTop - 32)) {navHighlight(1)} 
    else {navHighlight(0)}
})


//highlights section of the nav bar when scrolling in that section
function navHighlight(index){
    for(let i = 0; i < navButtons.length; i++){
        navButtons[i].removeAttribute("data-active");
        navButtons[index].setAttribute("data-active", "active");
    }
}


// bouncing arrow animation
let interval = setInterval(function(){
    downArrow.style.transform = "translateY(4px)";
    setTimeout(() => downArrow.style.transform = "translateY(0)", 350);
}, 700)


//hamburger dropdown on mobile
hamburgerFullRow.addEventListener("click", function(){
    hamburgerBars.classList.toggle("opened");
    navContainer.classList.toggle("mobile-dropdown");
    window.addEventListener("click", function(e){
        if (e.target.classList.contains("nav-buttons") || e.target.tagName === "H3" || e.target.classList.contains("fa-angle-double-up")){
            navContainer.classList.remove("mobile-dropdown");
            hamburgerBars.classList.remove("opened");
        }
    })
})


//function to determine Personal or Professional info in the about section
//refills skills each time button is pressed
function aboutDisplay(index1, index2){
    skillsFill.forEach(function(skill){
        skill.classList.remove("filled");
        skill.style.width = "0";
    })
    aboutInfos[index1].style.display = "flex";
    aboutInfos[index2].style.display = "none";
    generateFill();
}


//fills each of the skills accordingly with correct %
function generateFill(){
    setTimeout(function(){
        skillsFill.forEach(function(skill){
            skill.classList.add("filled");
            skill.style.width = `${skill.dataset.fill}%`;
        })
    }, 900)
    generatePercent();
}

function generatePercent(){
    for (let i = 0; i < percents.length; i++){
        percentInterval = setInterval(function(){
            percents[i].textContent = `${Math.round((skillsFill[i].offsetWidth / skillsFullWidth[i].offsetWidth) * 100)}%`;
        }, 25)
    }
}


//Selects the chosen About section tab and displays the information / skills accordingly
aboutButtons.forEach(function(button){
    button.addEventListener("click", function(){
        for (let i = 0; i < aboutButtons.length; i++){
            aboutButtons[i].removeAttribute("data-selected")
            this.setAttribute("data-selected", "true");
        }
        button.textContent === "Professional" ? aboutDisplay(0,1) : aboutDisplay(1,0);
    });
});


//intersection observers for section headers
let obCallbackAbout = (payload) => payload[0].intersectionRatio > 0 ? setTimeout(() => aboutHeader.classList.add("visible"), 500) : null;
const obAbout = new IntersectionObserver(obCallbackAbout);
obAbout.observe(aboutContainer);

let obCallbackProjects = (payload) => payload[0].intersectionRatio > 0 ? setTimeout(() => projectHeader.classList.add("visible"), 500) : null;
const obProjects = new IntersectionObserver(obCallbackProjects);
obProjects.observe(projectContainer);

let obCallbackContact = (payload) => payload[0].intersectionRatio > 0 ? setTimeout(() => contactHeader.classList.add("visible"), 500) : null;
const obContact = new IntersectionObserver(obCallbackContact);
obContact.observe(contactContainer);


//intersection observer for skills animation
let obCallbackSkills = (payload) => payload[0].intersectionRatio > 0 ? generateFill() : null;
const obSkills = new IntersectionObserver(obCallbackSkills);
obSkills.observe(aboutInfoContainer);


// // Project front fades away when hovered or clicked on a mobile device
for(let i = 0; i < projects.length; i++){
    if (document.body.offsetWidth > 1024){
        projects[i].addEventListener("mouseenter", () => projectFront[i].classList.add("faded"))
        projects[i].addEventListener("mouseleave", () => projectFront[i].classList.remove("faded"))
    } else if (document.body.offsetWidth <= 2014){
        projects[i].addEventListener("click", () => projectFront[i].classList.toggle("faded"))
    }
}


//Konami Code to change profile pic
document.body.addEventListener("keydown", function(e){
    konami.push(e.key);
    if (konami.join("").includes("feazy")){
        profilePhoto.src = "Assets/new.jpeg";
        console.log("WELL DONE 👏");
        konami = [];
    }
})


// form submit. Doesn't work if any of fields are blank
submitButton.addEventListener("click", function(e){
    if (nameInput.value === "" || emailInput.value === "" || messageInput.value === ""){
        e.preventDefault();
    } else {
        thankYouMessage.style.display = "flex";
        setTimeout(() => thankYouMessage.style.display = "none", 3000);
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    }
})