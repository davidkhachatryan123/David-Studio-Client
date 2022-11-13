// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

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
$( document ).ready(function() {
    $('.navbar-collapse a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    let navbar_a = document.getElementsByClassName('navbar-collapse')[0];
    //console.log(navbar_a);
    navbar_a.addEventListener('touchend', function(e) {
        $('.navbar-toggle:visible').click();
    }, false);
});