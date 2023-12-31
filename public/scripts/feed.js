
document.addEventListener("DOMContentLoaded", function() {
    try {
        const commentButtons = document.querySelectorAll('.comment-btn');
        commentButtons.forEach(button => {
            button.addEventListener('click', function() {
                const toggleId = this.getAttribute('data-toggle-id');
                const commentsSection = document.getElementById(toggleId);
                commentsSection.classList.toggle('expanded'); 
            });
        });
    } catch(error) {
    
        console.error('Some error occurred in feedsds ew:', error);
    }

    
    const commentForms = document.querySelectorAll('[id^="comment-form-"]');

    commentForms.forEach(form => {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            const postId = form.getAttribute('id').split('-')[2];
            const commentText = form.elements.commentText.value;
            
            if(commentText){

                try {
                    const response = await fetch(`/feed/${postId}/comments`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ commentText: commentText }),
                            credentials: 'same-origin',
                        });
                        
                    if (response.status === 200 || response.status === 201) {
                        
                        const responseData = await response.json();
                        const totalComments = responseData.totalComments;
                        const newCommentData = responseData.newComment;
                        
                        updateCommentsSection(postId, newCommentData);
                        document.getElementById(`commentsButton-${postId}`).textContent = `Comments (${totalComments})`;
                        
                    } else if (response.status === 401) {
                       
                        console.log('User is not logged in. Redirecting to login page.');
                        
                        window.location.href = '/user/login';
                    } else {
                        
                        console.error('Failed to post comment:', response.statusText);
                    }
                    
                } catch (error) {
                    console.error('Error posting comment:', error);
                }
            }

            form.reset(); 
        });
            
    });

    function updateCommentsSection(postId, commentData) {
        const commentsContainer = document.getElementById(`comments-${postId}`);
        const commentItem = createCommentElement(commentData);
        const formElement = document.getElementById(`comment-form-${postId}`);
        if (commentsContainer) {
            if (commentsContainer.querySelector('.no-comments')) {
                //--------remove the no comments message
                commentsContainer.querySelector('.no-comments').remove();
            }
    
            commentsContainer.insertBefore(commentItem, formElement);
        }
    }

    function createCommentElement(commentData) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        
        const usernameElement = document.createElement('strong');
        usernameElement.className = 'comment-user';
        usernameElement.textContent = commentData.user.username;
        
        const commentTextElement = document.createElement('span');
        commentTextElement.textContent = `: ${commentData.comment}`;
        
        commentElement.appendChild(usernameElement);
        commentElement.appendChild(commentTextElement);
        
        return commentElement;
    }
    const mainDeleteButtons = document.querySelectorAll('.delete-btn');
    const cancelButtons = document.querySelectorAll('.popup-cancel-btn');

    mainDeleteButtons.forEach(button =>{
        button.addEventListener('click',(e) =>{
            e.preventDefault();
            // console.log("button",button);
            const deletePopup = button.previousElementSibling
            deletePopup.style.display = "flex";
        });
    })
    cancelButtons.forEach(button =>{
        button.addEventListener('click',(e) =>{
            e.preventDefault();
            // console.log("button",button);
            const deletePopup = button.closest(".delete-confirm-popup")
            deletePopup.style.display = "none";
        });
    })
    const deleteButtons = document.querySelectorAll('.delete-post-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function(event) {
            event.preventDefault();
            const postId = button.getAttribute('data-post-id');

            try {
                const response = await fetch(`/feed/${postId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    
                    button.closest('.post-container').remove();
                    
                    const containerElement = document.getElementById('userPostsMainContent')
                    
                    if (containerElement.childElementCount === 0) {
                        // Create a new div element with the desired HTML content
                        const noPostsContainer = document.createElement('div');
                        noPostsContainer.className = 'post-container no-posts-container';
                        noPostsContainer.innerHTML = `
                            <h1 class="no-posts-icon"><i class="fa-regular fa-face-frown"></i></h1>
                            <h1>No posts, Try creating a new post</h1>
                        `;
                    
                        // Append the new div to the container
                        containerElement.appendChild(noPostsContainer);
                    }
                } else {
                    console.error('Failed to delete post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        });
    
    });


});
