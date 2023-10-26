document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.querySelector(".main-content");

    // Example data (you can replace this with data from your server)
    const posts = [
        {
            username: "user1",
            profilePic: "../images/image.jpg",
            image: "../images/hero-new-11.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            likes: 10,
            comments: [
                { username: "user2", text: "Nice post!" },
                { username: "user3", text: "Great pic!" }
            ]
        },
        {
            username: "user2",
            profilePic: "profile2.jpg",
            image: "post2.jpg",
            description: "Suspendisse potenti. Vivamus vel malesuada odio.",
            likes: 15,
            comments: [
                { username: "user1", text: "Love it!" }
            ]
        },
        {
            username: "user2",
            profilePic: "profile2.jpg",
            image: "post2.jpg",
            description: "Suspendisse potenti. Vivamus vel malesuada odio.",
            likes: 15,
            comments: [
                { username: "user1", text: "Love it!" }
            ]
        },
        {
            username: "user2",
            profilePic: "profile2.jpg",
            image: "post2.jpg",
            description: "Suspendisse potenti. Vivamus vel malesuada odio.",
            likes: 15,
            comments: [
                { username: "user1", text: "Love it!" }
            ]
        },
        {
            username: "user2",
            profilePic: "profile2.jpg",
            image: "post2.jpg",
            description: "Suspendisse potenti. Vivamus vel malesuada odio.",
            likes: 15,
            comments: [
                { username: "user1", text: "Love it!" }
            ]
        },
        {
            username: "user2",
            profilePic: "profile2.jpg",
            image: "post2.jpg",
            description: "Suspendisse potenti. Vivamus vel malesuada odio.",
            likes: 15,
            comments: [
                { username: "user1", text: "Love it!" }
            ]
        }
    ];

    // Render posts
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post-container";
        postElement.innerHTML = `
            <div class="profile-pic-container">
                <img class="profile-pic" src="${post.profilePic}" alt="Profile Pic">
                <span class="user-name" >${post.username}</span>
            </div>
            <div class="post-content-container">
                <div class="post-image-container">
                <img class="post-image" src="${post.image}" alt="Post Image">
                </div>
                <div class="post-des">${post.description}</div>
            </div>
            <div class="post-details">
                <button class="like-btn btn">Like (${post.likes})</button>
                <button class="comment-btn btn">Comments</button>
                <div class="comments">
                    ${post.comments.map(comment => `<div class="comment-item"><strong>${comment.username}</strong>: ${comment.text}</div>`).join("")}
                    <textarea placeholder="Write a comment"></textarea>
                    <button class="post-comment-btn">Post Comment</button>
                </div>
            </div>

        `;

        mainContent.appendChild(postElement);

        const commentBtn = postElement.querySelector(".comment-btn");
        const commentsSection = postElement.querySelector(".comments");
        
        // ----for smooth transiton when expanding comments---------
        commentBtn.addEventListener("click", function() {
            commentsSection.classList.toggle("expanded"); 
        });

        // ----for displaying comments when clicked-------------
        commentBtn.addEventListener("click", function() {
            commentsSection.style.display = commentsSection.style.display === "none" || commentsSection.style.display === "" ? "block" : "none";
        });

        const postCommentBtn = postElement.querySelector(".post-comment-btn");
        const commentTextarea = postElement.querySelector("textarea");

        postCommentBtn.addEventListener("click", function() {
            const commentText = commentTextarea.value;
            if (commentText) {
                const commentItem = document.createElement("div");
                commentItem.className = "comment-item";
                commentItem.innerHTML = `<strong>User</strong>: ${commentText}`;
                commentsSection.insertBefore(commentItem, commentTextarea);
                commentTextarea.value = "";
            }
        });
    });
});
