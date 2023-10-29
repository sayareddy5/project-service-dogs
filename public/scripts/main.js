document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll('.nav-item');
        menuItems.forEach(item => {
            try{
                const submenu = item.querySelector('.submenu');
                submenu.style.display = 'none';
            }catch(error){
                console.log("error")
            }
    })
});
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


     // ---------to display submenu respective to menu-------------------
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

            // max width value
            const thresholdWidth = 300;

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










document.addEventListener("DOMContentLoaded", function() {
    try{

    
        const form = document.getElementById("trainingForm");
        const submitBtn = document.getElementById("submitFormBtn");
        const successModal = document.getElementById("successModal");
        const closeFormBtn = document.getElementById("close-form");

        submitBtn.addEventListener("click", function() {
            
            var formData = new FormData(form);
            console.log("in jscript")
        
            fetch("/our-dogs/training-application", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                
                    successModal.style.display = "block";
                    setTimeout(function() {
                        successModal.style.display = "none";
                        
                        window.location.href = "/our-dogs/acquire-a-dog";
                    }, 2000);
                } else {
                    console.error("Form submission failed");
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
        });

        closeFormBtn.addEventListener("click", function() {
            successModal.style.display = "none";
        });
    }catch(error){
        console.error("some error in main js file")
    }
});






