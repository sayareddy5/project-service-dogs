// ----------for feed-------------------
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    // console.log(currentPath)
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkParent = link.closest('li');
        if (currentPath.endsWith(href)) {
            // console.log("parent ele", linkParent)
            linkParent.classList.add('active');
        } else {
            linkParent.classList.remove('active');
        }
    });

        // ------uploaded image preview----------------
    try{
        const fileInput = document.getElementById('image');
        const imagePreview = document.getElementById('image-preview');

        fileInput.addEventListener('change', function() {
            const file = fileInput.files[0]; 

            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagePreview.src = event.target.result;
                    imagePreview.style.display = 'block';
                };

                // read the image file as base64 encoded string
                reader.readAsDataURL(file);
            } else {
                
                imagePreview.style.display = 'none';
            }
    
        });
    }catch(error){
        console.error("Image file not provided to render the preview")
    }
});