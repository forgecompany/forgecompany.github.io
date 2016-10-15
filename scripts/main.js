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
            'background-color': '#1D334A'
        }).removeClass('animated_sign').fadeIn(200);
        $('#back_to_top').fadeIn().css('display', 'inline-block');
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
        $('#back_to_top').css('display', 'none');
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
var backgroundImageDivider = [$('#divider1'), $('#divider2'), $('#divider3'), $('#subdivider1'), $('#subdivider2')];
$(window).scroll(function () {
    var st = $(this).scrollTop();
    backgroundImageDivider[0].css({'background-position':'center calc(0% + '+(st*.5)+'px)'});
    backgroundImageDivider[1].css({'background-position':'center calc(-45% + '+(st*.5)+'px)'});
    backgroundImageDivider[2].css({'background-position':'center calc(-130% + '+(st*.5)+'px)'});
    backgroundImageDivider[3].css({'background-position':'center calc(-130% + '+(st*.5)+'px)'});
    backgroundImageDivider[4].css({'background-position':'center calc(-130% + '+(st*.5)+'px)'});
});

// smooth scroll
function scrollTo(to) {
    $('html, body').animate({
        scrollTop: $(to).offset().top - 45
    }, 500);
}