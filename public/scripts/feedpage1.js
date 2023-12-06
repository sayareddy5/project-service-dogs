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
        const deleteButton = document.getElementById('deleteImage');
        
        fileInput.addEventListener('change', function() {
            const file = fileInput.files[0]; 

            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagePreview.src = event.target.result;
                    imagePreview.style.display = 'block';
                    deleteButton.style.display = 'block';
                };

                // read the image file as base64 encoded string
                reader.readAsDataURL(file);
            } else {
                
                imagePreview.style.display = 'none';
                deleteButton.style.display = 'none';
            }
    
        });

        deleteButton.addEventListener('click', function (e) {
            // reset file input and hide image preview and delete button
            e.preventDefault();
            fileInput.value = null;
            imagePreview.src = '#';
            imagePreview.style.display = 'none';
            deleteButton.style.display = 'none';
        });

    }catch(err){
        
    }
});