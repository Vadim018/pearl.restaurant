document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("backToTopBtn");
    backToTopBtn.addEventListener("click", scrollToTopWithEasing);

    function scrollToTopWithEasing() {
        const scrollDuration = 1000;
        const startTime = performance.now();
        const startScrollTop = document.documentElement.scrollTop;

        function scrollStep(timestamp) {
            const currentTime = timestamp - startTime;
            const scrollProgress = Math.min(currentTime / scrollDuration, 1);
            const easeInOutProgress = easeInOutQuad(scrollProgress);

            window.scrollTo(0, startScrollTop * (1 - easeInOutProgress));
            if (currentTime < scrollDuration) {
                requestAnimationFrame(scrollStep);
            }
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }
        requestAnimationFrame(scrollStep);
    }

    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    window.addEventListener('load', function () {
        const slider = document.querySelector('.news-slider');
        slider.style.animationPlayState = 'running';
    });

    const buttons = document.querySelectorAll(".btn-group-menu");
    const icons = document.querySelectorAll(".icon");

    buttons.forEach((button, index) => {
        button.addEventListener("mouseover", () => {
            icons[index].style.display = "inline-block";
        });
        button.addEventListener("mouseout", () => {
            icons[index].style.display = "none";
        });
    });

    $(document).ready(function () {
        $(".btn-group-menu").hover(function () {
            $(this).find(".menu-text").css("opacity", 0);
            $(this).find(".menu-icon").css("opacity", 1);
        }, function () {
            $(this).find(".menu-text").css("opacity", 1);
            $(this).find(".menu-icon").css("opacity", 0);
        });
    });

    let ang = 0;

    $("#prev").click(function () {
        ang = ang + 22.5;
        $("*").css("--ang", ang);
    });

    $("#next").click(function () {
        ang = ang - 22.5;
        $("*").css("--ang", ang);
    });
});

const lightbulbContainer = document.getElementById('lightbulb-container');
const lightbulb = document.getElementById('lightbulb');
const lightbulbImage = document.getElementById('lightbulb-image');
const toggleButton = document.querySelector('.hide-lightbulb-button');
const body = document.body;
const audioElement = document.getElementById('light-switch-sound');

function saveThemeState(isLightOn) {
    localStorage.setItem('isLightOn', isLightOn.toString());
}

function setInitialState() {
    const isLightOn = localStorage.getItem('isLightOn');

    if (isLightOn === 'true') {
        turnOffLight();
    } else {
        turnOnLight();
    }
}

function turnOnLight() {
    lightbulbImage.src = 'https://cdn-icons-png.flaticon.com/128/3073/3073665.png?uid=R77081381&ga=GA1.1.1848467976.1701626084&semt=ais';
    body.classList.remove('dark-background');
    saveThemeState(false);
}

function turnOffLight() {
    lightbulbImage.src = 'https://cdn-icons-png.flaticon.com/128/3592/3592067.png?uid=R77081381&ga=GA1.1.1848467976.1701626084&semt=ais';
    body.classList.add('dark-background');
    saveThemeState(true);
}

function toggleLightbulb() {
    const isLightOn = body.classList.contains('dark-background');
    audioElement.currentTime = 0;

    if (isLightOn) {
        turnOnLight();
    } else {
        turnOffLight();
    }
    setTimeout(() => {
        audioElement.play();
    }, 0);
}

window.addEventListener('beforeunload', () => {
    saveThemeState(body.classList.contains('dark-background'));
});

setInitialState();

lightbulbContainer.addEventListener('mouseenter', () => {
    lightbulbContainer.classList.add('show-lightbulb');
});

lightbulbContainer.addEventListener('mouseleave', () => {
    lightbulbContainer.classList.remove('show-lightbulb');
});

lightbulb.addEventListener('click', toggleLightbulb);
toggleButton.addEventListener('click', () => {
    lightbulbContainer.classList.remove('show-lightbulb');
});

document.addEventListener('DOMContentLoaded', setInitialState);