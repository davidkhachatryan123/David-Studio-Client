// jQuery to collapse the navbar on scroll
//let scroll = true;

$(window).scroll(function() {
    /*if ($(window).scrollTop() > 50 && $(window).scrollTop() < 150 && scroll) {
        $('html, body').stop().animate({
            scrollTop: $('#page').offset().top
        }, 1500, 'easeInOutExpo');

        scroll = false;
    }*/

    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// Get vh value
/*function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}*/

// jQuery to add padding for path
$( document ).ready(function() {
    if($('#path').length){
        $(".navbar-custom").addClass("path-padding");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});