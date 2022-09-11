score = 0;
cross = true;

audio = new Audio('gamemusic.mp3');
audiogo = new Audio('dead.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

window.addEventListener('keydown', checkkey)
function checkkey(e) {
    //console.log(e.key);
    if (e.key == 'ArrowUp') {
        human = document.querySelector('.human');
        human.classList.add('animateHuman');
        setTimeout(() => {
            human.classList.remove('animateHuman')
        }, 700);
    }
    if (e.key == 'ArrowRight') {
        human = document.querySelector('.human');
        humanX = parseInt(window.getComputedStyle(human, null).getPropertyValue('left'));
        human.style.left = humanX + 112 + "px";
    }
    if (e.key == 'ArrowLeft') {
        human = document.querySelector('.human');
        humanX = parseInt(window.getComputedStyle(human, null).getPropertyValue('left'));
        human.style.left = humanX - 112 + "px";
    }
}

setInterval(() => {
    human = document.querySelector('.human');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    hx = parseInt(window.getComputedStyle(human, null).getPropertyValue('left'));
    hy = parseInt(window.getComputedStyle(human, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(hx - ox);
    offsetY = Math.abs(hy - oy);
    //console.log(offsetX, offsetY)
    if (offsetX < 113 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to start over!";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 83 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.08;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}