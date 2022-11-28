// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    var nav = $('.navbar');
    if (nav.length) {
        if (nav.offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    }
});

// jQuery to add padding for path
// jQuery for page scrolling feature - requires jQuery Easing plugin
$( document ).ready(function() {
    if($('#path').length) {
        $(".navbar-custom").addClass("path-padding");
    }
});

$(document).on('click', '#pagebutton', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});
