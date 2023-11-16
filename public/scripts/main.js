
const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(item => {
        try{
            const submenu = item.querySelector('.submenu');
            submenu.style.display = 'none';
        }catch(error){
            console.log("error")
        }
})

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
            logoImage.src = '/images/logo-black.png';
            logoImage.style.maxHeight = '60px';
            // header.style.boxShadow = "4px 6px 6px grey";
        } else {
            // header.style.backgroundColor = 'transparent';
            // menuLinks.forEach(function(link) {
            //     link.style.color = 'var(--navbar-text-color)';
            // });

            logoImage.src = '/images/logo-primary.png';
            logoImage.style.maxHeight = '80px';
            
        }
    });
    logoImage.style.transition = 'max-height 0.3s ease';


     // ---------to display submenu respective to menu-------------------
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        const navElement = item.querySelector('.nav-link')
    
        
        if (submenu) {
            item.addEventListener('mouseenter', () => {
            submenu.style.display = 'block';
            navElement.style.border = "2px solid var(--primary-color)";
            navElement.style.borderRadius = "20px";
        });
        }
        if (submenu) {
            item.addEventListener('mouseleave', () => {
            submenu.style.display = 'none';
            navElement.style.border = "2px solid white";
            // navElement.style.borderRadius = "20px";

        });
        }
    });
    
    // ----------for grid images--------------
    try{


        const photoItems = document.querySelectorAll('.photo-item');

        photoItems.forEach(item => {
            const img = item.querySelector('img');

            const imgWidth = img.width;
            console.log("image width: ",imgWidth)

            // max width value
            const thresholdWidth = 200;

            if (imgWidth > thresholdWidth) {
                item.classList.add('wide');
            }
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


        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
            lightbox.style.display = 'none';
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
            lightbox.style.display = 'none';
            }
        });

        
    }catch(error){
        console.error("some error in main js first acript")
    }
});









