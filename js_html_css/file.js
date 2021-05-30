const cards = document.querySelectorAll('.memory_card');
const button = document.querySelectorAll('.button');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const counter = document.querySelector('.counter');
const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');
const end_game = document.querySelector('.end_game');
const front_button = document.querySelector('.front_button');

let countCurd = 0;
let started = false;
let turn = true;
let hasFlipCard = false;
let boardLocked = false;
let restart = false;
let firstCard, secondCard
const Cardflip = e => {
    if(!started)return;
    if(boardLocked) return;
    //these lines are needed to ensure that there are no bugs when the user selects more than 3 cards at a time,
    // or starts choosing cards before the game starts
    
    const target = e.target.parentElement;
    
    if(target === firstCard) return;

    target.classList.add("flip");
    if(!hasFlipCard){
        hasFlipCard = true;
        firstCard = target;
    }else{
        hasFlipCard = false;
        secondCard = target;
        boardLocked = true;
        checkForMath();
    }
};

const buttonFlip = q =>{
    //in addition to flipping the new game button and starting a new game, the restart function is written here
    if(started) return;
    if(restart){
        q.target.parentElement.classList.remove("flip");
        resetCards();
        cards.forEach(card => {
            card.classList.remove("disappear");
        });
        end_game.classList.remove("end");
        end_game.textContent = "";
        restart = false;
        setTimeout(()=>{
            document.getElementById("back_img").src="./images/button_score.jpg";
        }, 500);
    }else{
        q.target.parentElement.classList.add("flip");
        started = true;
        resetBoard();
    }
    changePlayer();
}

const checkForMath = () =>{
    if(firstCard.dataset.cat === secondCard.dataset.cat){
        if(!turn){
            score1.textContent++;
        }else{
            score2.textContent++;
        }
        disableCards();
        countCurd++;
        countCurd++;
        if(countCurd===12){
            end_game.classList.add("end");
            end();
        };
    }else{
        unflipCards();
    }
};

const end = () =>{
    boardLocked = true;
    if(score1.textContent > score2.textContent){
        end_game.textContent = "Player1 win!";
    }
    else if(score1.textContent < score2.textContent){
        end_game.textContent = "Player2 win!"
    }else{
        end_game.textContent = "DRAW";
    }
    restart_game();
}

const restart_game = () =>{
    document.getElementById("back_img").src="./images/button-restart.jpg";
    countCurd = 0;
    started = false;
    turn = true;
    restart = true;
}

const changePlayer = p =>{
if(turn){
try{
player2.classList.remove("selected");
}catch{};
player1.classList.add("selected");
turn = !turn;
}else{
player1.classList.remove("selected");
player2.classList.add("selected");
turn = !turn;

}
};

const disableCards = () =>{
    firstCard.removeEventListener("click", Cardflip);
    secondCard.removeEventListener("click", Cardflip);
    setTimeout(()=>{
        firstCard.classList.add("disappear");
        secondCard.classList.add("disappear");
    }, 1000);
    setTimeout(()=>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
        changePlayer();
    }, 1500);
};//if the cards converge, then the animation of how they disappear begins

const unflipCards = () => {
    setTimeout(()=>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        boardLocked = false;
        changePlayer();
        resetBoard();
    }, 500);
};//if the card is chosen incorrectly, then the animation is played back

const resetBoard = () =>{
    hasFlipCard = false;
    boardLocked = false;
    firstCard = null;
    secondCard = null;
};
const resetCards = () =>{
    cards.forEach(card =>{
        card.addEventListener("click", Cardflip);
        const randomIndex = Math.floor(Math.random() * 12);
        card.style.order = randomIndex;
    });
    button.forEach(button =>{
        button.addEventListener("click",buttonFlip);
        score1.textContent = score2.textContent = 0;
    
    });
};//I put it all in one algorithm, because it's much easier to start the game without taking up a lot of space with unnecessary code

resetCards();//The name doesn't fit a bit, however this line starts the whole game


