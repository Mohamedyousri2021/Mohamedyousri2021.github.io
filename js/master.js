//check if there is local storage color option
let mainColor = localStorage.getItem('color_option');

if (mainColor !== null) {
    // console.log('local storage is not empty');
    // console.log (mainColor);

    document.documentElement.style.setProperty('--main-color', mainColor);

    //remove active class from all colors list item
    document.querySelectorAll('.colors-list li').forEach(element => {
        element.classList.remove('active');

        // add active class on element with data-color === LocalStorage Item
        if(element.dataset.color === mainColor) {
            element.classList.add('active');
        }
    });
}

//random background option
let backgroundOption = true;

//variable to control background interval
let backgroundInterval;

//ckeck if there is local storage random background item
let backgroundLocalItem = localStorage.getItem('background_option');

//check if random background local storage is not empty
if (backgroundLocalItem !== null) {
        //remove active class from all spans
    document.querySelectorAll('.random-backgrounds span').forEach(element => {
        element.classList.remove('active');
    });
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
        document.querySelector('.random-backgrounds .yes').classList.add('active');
    } else {
        backgroundOption = false;
        document.querySelector('.random-backgrounds .no').classList.add('active');
    }
    // console.log(backgroundLocalItem)
}
// toggle spin class on icon 
document.querySelector('.toggle-settings i').onclick = function () {
    this.classList.toggle('fa-spin');

// toggle class opened on main settings box 
    document.querySelector('.settings-box').classList.toggle('opened');
};

//switch Colors
const colorsLi = document.querySelectorAll('.colors-list li');

//loop on all list items
colorsLi.forEach (li => {

    // click on every list item 
    li.addEventListener('click', (e) => {

        // set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //set color on local storage
        localStorage.setItem('color_option', e.target.dataset.color);

        handleActiveState(e);
    });
});

//switch Backgrounds
const backgroundsEl = document.querySelectorAll('.random-backgrounds span');

//loop on all spans
backgroundsEl.forEach (span => {

    // click on every span
    span.addEventListener('click', (e) => {
        handleActiveState(e);
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem('background_option', true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background_option', false);
        }
    });
});



// select landing page element
const landingPage = document.querySelector('.landing-page');

// create array of images
let imgsArray = ['img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg', 'img11.jpg'];


// function to randomize imgs
function randomizeImgs () {
    if (backgroundOption === true) {
        backgroundInterval = setInterval ( () => {

            // get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            // console.log(randomNumber);
            landingPage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`;
        },5000);

    }
}
randomizeImgs();



//select skills section 
let ourSkills = document.querySelector('.skills');
let bulletsLi = document.querySelectorAll('.nav-bullets .bullet');
let Sections = document.querySelectorAll('div[data-bullet]');

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
     // skills offset top
     let skillsOffsetTop = ourSkills.offsetTop;
     // skills section height
     let skillsHeight = ourSkills.offsetHeight;
     //window height
     let windowHeight = this.innerHeight;
     //window scroll top
     let windowScrollTop = this.scrollY; //this.pageYOffset is deprecated
     // console.log(windowScrollTop)
     if(windowScrollTop > (skillsOffsetTop + skillsHeight - windowHeight)) {
         let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
         allSkills.forEach(skill => {
             skill.style.width = skill.dataset.progress;
         })
     }

  Sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 20) {
       bulletsLi.forEach (bullet => {
        // add active class on bullet element on scroll
        bullet.classList.remove("active");
        bullet.querySelector('.tooltip').classList.remove('block');
        if(bullet.classList.contains(section.dataset.bullet)){
            // console.log(bullet.dataset.section + 'bull');
            // console.log(section.dataset.bullet);
            bullet.classList.add('active');
            bullet.querySelector('.tooltip').classList.add('block');
        } else {

        }
      }); 
    } else {
        // bulletTooltipActive.classList.remove('block');
       }
  })

  
}

//create popup with the image
let ourGallery = document.querySelectorAll('.gallery img, .Mypic img');
ourGallery.forEach (img => {
    img.addEventListener('click', (e) => {
        //create overlay element
        let overlay = document.createElement('div');

        //add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //create the popup box
        let popupBox = document.createElement('div');

        //add class to popup box
        popupBox.className = 'popup-box';
        
        //create link to template repo
        let tempLink = document.createElement('a');
            tempLink.setAttribute('href', img.dataset.link);
            tempLink.setAttribute('target', "_blank");
        //add class to tempLink
            tempLink.className = 'temp-link';
        if(img.alt !== null) {
            //Create heading
            let imgHeading = document.createElement('h3');

            //create text for heading
            let imgText = document.createTextNode(img.alt);
            //create text for link
            let linkText = document.createTextNode(img.dataset.link);

            //append the text to the heading
            imgHeading.appendChild(imgText);
            //append the heading to popup box
            popupBox.appendChild(imgHeading);

             //appent the text to the link
             tempLink.appendChild(linkText);
             //append the link to the popupbox
             popupBox.appendChild(tempLink);
        }

        //create the image
        let popupImage = document.createElement('img');

        //set image source
        popupImage.src = img.src;

        //add image to popup box
        popupBox.appendChild(popupImage);

        //append the poopup box to the body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton = document.createElement('span');

        //create the close button text
        let closeButtonText = document.createTextNode('x');

        //append text to close button
        closeButton.appendChild(closeButtonText);

        //add class to close button
        closeButton.className = 'close-button';
        
        //add close button to popup box
        popupBox.appendChild(closeButton);

    });

});

//CLose popup
document.addEventListener('click', (e) => {
    if(e.target.className == 'close-button') {
        //remove the current popup
        e.target.parentNode.remove();
        //remove the overlay
        document.querySelector('.popup-overlay').remove();
    }
})


// select all bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

// select all links
const allLinks = document.querySelectorAll('.links a');

function scrollToSection (elements) {
    elements.forEach(element => {
        element.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

}
scrollToSection(allBullets);
scrollToSection(allLinks);

//handle active state 
function handleActiveState (e) {
      //remove class active from all childrens
      e.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });

    //add active class on the target element
    e.target.classList.add('active'); 
}

//show and hide bullets
let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletsLocalItems = localStorage.getItem('bullets_option');
// save bullet option in local storage
if (bulletsLocalItems != null) {
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    });
    if (bulletsLocalItems === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener('click', e => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets_option', 'block')
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets_option', 'none')
        }
        handleActiveState(e);
    });
});

//reset button
document.querySelector('.reset-options').onclick = function () {
    localStorage.clear();
    // localStorage.removeItem('color_option');
    // localStorage.removeItem('background_option');
    // localStorage.removeItem('bullets_option');
    window.location.reload();
}

//toggle menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    //toggle class menu active on button
    this.classList.toggle('menu-active');

    //toggle class open on links
    tLinks.classList.toggle('open');
};
//click any where outside the menu and toggle button
document.addEventListener('click', (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks) {
        //check if menu is open
        if(tLinks.classList.contains('open')) {
            //toggle class menu active on button
            toggleBtn.classList.toggle('menu-active');

            //toggle class open on links
            tLinks.classList.toggle('open');
        }
    }
});
//stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}

  //loading screen
        //show the scroll
        $(document).ready(function () {
            "use strict";
                 
            $(".loading-overlay .ice-cube").fadeOut(3000, function () {
                
                    
                $(this).parent().fadeOut(2000, function () {
                    $("body").css("overflow", "auto");
                    $(this).remove();
                });
            });
        });

        //catching the scroll top element
    var scrollButton = $(".scroll-top");
    
    $(window).scroll(function () {
        
        // console.log($(this).scrollTop());
        
        if ($(this).scrollTop() >= 700) {
            scrollButton.show();
        } else {
            
            scrollButton.hide();
        }
         
     
    });
    
    scrollButton.click(function () {
        $("html,body").animate({scrollTop: 0}, 600); //يجب ان توضع هنا لكي يظهر الاسكرول قبل ما يخلص اللوودينج
    });




   