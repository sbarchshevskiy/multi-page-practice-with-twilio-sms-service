//jQuery on-submit listener triggering css slider feature
// linked with animatedFunctions.css
// adjust menuForm
$(document).ready(function(delay) {

  $(".menuForm").on('submit', (event) => {

    event.preventDefault();

    if ("condition") {
      $("#slideMessage").slideDown();
      setTimeout(() => {
        $("#slideMessage").slideUp();
      }, delay);
    }
  });
});
