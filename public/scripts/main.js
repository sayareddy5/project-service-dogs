
//------------- when scrolled the header stays fixed-------------

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        var header = document.querySelector('.header');
        var menuLinks = document.querySelectorAll('.menu ul li a');
        var logoImage = document.getElementById('logoImage');

        if (window.scrollY > 100) {
            // header.style.backgroundColor = '#fff';
            // menuLinks.forEach(function(link) {
            //     link.style.color = '#000';
            // });
            logoImage.src = '../images/logo-black.png';
            logoImage.style.maxHeight = '60px';
            header.style.boxShadow = "4px 6px 6px grey";
        } else {
            // header.style.backgroundColor = 'transparent';
            // menuLinks.forEach(function(link) {
            //     link.style.color = 'var(--navbar-text-color)';
            // });

            logoImage.src = '../images/logo-primary.png';
            logoImage.style.maxHeight = '80px';
            
        }
    });
    logoImage.style.transition = 'max-height 0.3s ease';
});


// ---------to display submenu respective to menu-------------------
const menuItems = document.querySelectorAll('.nav-item');

menuItems.forEach(item => {
    const submenu = item.querySelector('.submenu');

    item.addEventListener('mouseenter', () => {
        if (submenu) {
            submenu.style.display = 'block';
        }
    });

    item.addEventListener('mouseleave', () => {
        if (submenu) {
            submenu.style.display = 'none';
        }
    });


});


// --------for opening image in big----------------
const menuIcon = document.getElementById('menuIcon');
        const menu = document.querySelector('.menu');

        menuIcon.addEventListener('click', () => {
            menu.classList.toggle('active');
        });


const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('close');

const photoItems = document.querySelectorAll('.photo-item');

//---------click event listeners to photos-----
photoItems.forEach(item => {
    item.addEventListener('click', function() {
        const imageUrl = this.querySelector('img').src;
        lightboxImage.src = imageUrl;
        lightbox.style.display = 'block';
    });
});

// -----------close images------------------
closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
});

// Close the lightbox when the user clicks outside the image
lightbox.addEventListener('click', function(event) {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Close the lightbox when the Escape key is pressed
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        lightbox.style.display = 'none';
    }
});
     



// ------------for big images------------------

document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');

    photoItems.forEach(item => {
        const img = item.querySelector('img');
        const imgWidth = img.width;

        // threshold value
        const thresholdWidth = 300;

        if (imgWidth > thresholdWidth) {
            item.classList.add('wide');
        }
    });

});

