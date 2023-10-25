$(document).ready(function(){
    // Show the modal when the button is clicked
    $("#volunteer-application-btn").click(function(){
        $("#volunteer-form-modal").css("display", "block");
    });

    // Close the modal when the close button is clicked
    $(".close").click(function(){
        $("#volunteer-form-modal").css("display", "none");
    });

    // Close the modal if the user clicks outside of it
    $(window).click(function(event) {
        if (event.target.id === "volunteer-form-modal") {
            $("#volunteer-form-modal").css("display", "none");
        }
    });

    // Close the modal if the user presses the "Esc" key
    $(document).keydown(function(event) {
        if (event.key === "Escape") {
            $("#volunteer-form-modal").css("display", "none");
        }
    });
});
