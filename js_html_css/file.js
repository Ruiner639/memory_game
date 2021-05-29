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
    if(started) return;
    if(restart){
        const start_button = q.target.parentElement;
        start_button.classList.remove("flip");
        resetCards();
        cards.forEach(card => {
            card.classList.remove("disappear");
        });
        end_game.classList.remove("end");
        end_game.textContent = "";
        restart = false;

    }else{
        const start_button = q.target.parentElement;
        start_button.classList.add("flip");
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
};

const unflipCards = () => {
    setTimeout(()=>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        boardLocked = false;
        changePlayer();
        resetBoard();
    }, 500);
};

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
};

resetCards();


