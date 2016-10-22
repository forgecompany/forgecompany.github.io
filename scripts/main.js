// background image follow mouse by OY
// bottom moto appears after 0.5s
$('#front_block').mousemove(function(e){
    if(!$(document).scrollTop()) {
        var liftDistance = Math.ceil(e.pageY*50/$(window).height());
        $('#front_block').css('background-position', "0px -" + liftDistance + "px");
    }
});

// background image slideshow
var backgroundImages = [
    'url("media/new-york.jpg")',
    'url("media/los-angeles.jpg")',
    'url("media/kyiv.jpg")',
    'url("media/london.jpg")'
];
var currentImage = 0;
function changeBackgroundImage(direction) {
    currentImage += direction;
    if (currentImage < 0) currentImage = 3;
    if (currentImage > 3) currentImage = 0;
    $('#front_block').css('background-image', backgroundImages[currentImage]);
    clearInterval(interval);
    timer();
}

// navbar
$(document).scroll(function () {
    var scrollPosition = $(this).scrollTop();
    if(scrollPosition > 0 && $('#navbar').css('display') != 'none')
    {
        $('#navbar').css('display', 'none');
        $('#sign').css({
            'display': 'none',
            'width': '100%',
            'height': '46px',
            'position': 'fixed',
            'font-size': '34px',
            'left': '0',
            'margin-left': '0',
            'color': 'white',
            'background-color': 'rgba(0, 0, 0, 0.5)'
        }).removeClass('animated_sign').fadeIn(200);
        $('#back_to_top, #menu').fadeIn().css('display', 'inline-block');
        $('#down_arrow').fadeOut();
    } else if(scrollPosition == 0){
        $('#sign').css({
            'display': 'none',
            'position': 'absolute',
            'font-size': '54px',
            'left': '18%',
            'margin-left': '-90px',
            'width': '180px',
            'height': '80px',
            'color': 'rgba(250, 250, 250, 0.95)',
            'background-color': 'transparent'
        }).addClass('animated_sign').fadeIn();
        $('#back_to_top, #menu, #menu_navbar, #hide_menu').css('display', 'none');
        if ($('#menu').hasClass('open')) $('#menu').toggleClass('open');
        $('#navbar').fadeIn();
        $('#down_arrow').fadeIn();
    }
});

// auto-play background
var interval;
var timer = function () {
    interval = setInterval(function () {
        changeBackgroundImage(1)
    }, 12000);
};
timer();

// show bottom moto
$('#bottom_moto').delay(1000).fadeIn();

// parallex effect
var backgroundImageDivider = [$('#subdivider1'), $('#divider1'), $('#subdivider2'), $('#divider2'), $('#divider3')];
var mainImage = $('#front_block');
$(window).scroll(function () {
    var st = $(this).scrollTop();
    for (var i = 0; i < 5; i++) {
        var topPosition = backgroundImageDivider[i].offset().top, mult;
        if (i == 0 || i == 2) {
            mult = .1;
        }else{
            mult = .25;
        }
        if (st > (topPosition-$(window).height()) && st < (topPosition+$(window).height()*mult)) {
            backgroundImageDivider[i].css({'background-position':'center calc('+0.5*(st-topPosition+$(window).height()*(1+mult))+'px)'});
        }
    }
    if (st > $(window).height()*0.5 && st < $(window).height()) {
        mainImage.css({'background-position':'0 calc('+((st*.5)-$(window).height()*0.5/2)+'px)'});
    }else{
        mainImage.css({'background-position': '0 0'});
    }
});

// smooth scroll
function scrollTo(to, speed) {
    var speed = speed ? speed : 500;
    $('html, body').animate({
        scrollTop: $(to).offset().top - 45
    }, speed);
    $('#menu').toggleClass('open');
    $('#menu_navbar').fadeOut();
    $('#hide_menu').hide();
}

// tools slide
var isDisplay = {
    backendlang: {
        current: 1,
        amount: 2
    },
    backendframe: {
        current: 1,
        amount: 2
    },
    database: {
        current: 1,
        amount: 3
    },
    frontendcore: {
        current: 1,
        amount: 3
    },
    frontendframe: {
        current: 1,
        amount: 3
    },
    frontendstyles: {
        current: 1,
        amount: 2
    }
};
$('.left_button, .right_button').click(function () {
    var thisID = $(this).attr('id').split('_');
    var thisSet = thisID[0], thisDir = thisID[1], direction;
    if (thisDir == 'left') direction = -1;
    if (thisDir == 'right') direction = 1;
    var currentSlide = isDisplay[thisSet].current, nextSlide;
    nextSlide = currentSlide + direction;
    if (nextSlide == 0) nextSlide = isDisplay[thisSet].amount;
    if (nextSlide > isDisplay[thisSet].amount) nextSlide = 1;
    var toHide = '#' + thisSet + currentSlide;
    var toShow = '#' + thisSet + nextSlide;
    $(toHide).fadeOut(300);
    setTimeout(function () {
        $(toShow).fadeIn(300);
    }, 300);
    isDisplay[thisSet].current = nextSlide;
});

// menu icon
$('#menu').click(function () {
    $(this).toggleClass('open');
    if($(this).hasClass('open')){
        $('#menu_navbar').fadeIn();
        $('#hide_menu').show();
    }else{
        $('#menu_navbar').fadeOut();
        $('#hide_menu').hide();
    }
});
$('#hide_menu').click(function () {
   $('#menu_navbar').fadeOut();
    $('#hide_menu').hide();
    $('#menu').toggleClass('open');
});

$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
};

$(['los-angeles.png','kyiv.png','london.png']).preload();

window.onload = function () {
    scrollTo('#front_block', 100);
    $(".loader").fadeOut("slow");
};
