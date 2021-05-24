const cards = document.querySelectorAll('.memory_card');

let hasFlipCard = false;
let boardLocked = false;
let firstCard, secondCard

const Cardflip = e => {
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
        checkForMath();
    }
};

const checkForMath = () =>{
    if(firstCard.dataset.cat === secondCard.dataset.cat){
        disableCards();
    }else{
        unflipCards();
    }
};

const disableCards = () =>{
    firstCard.removeEventListener("click", Cardflip);
    secondCard.removeEventListener("click", Cardflip);
};

const unflipCards = () => {
    setTimeout(()=>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        boardLocked = false;

        resetBoard();
    }, 500);
};

const resetBoard = () =>{
    hasFlipCard = false;
    boardLocked = false;
    firstCard = null;
    secondCard = null;
};

cards.forEach(card =>{
    card.addEventListener("click", Cardflip);

    const randomIndex = Math.floor(Math.random() * 12);
    card.style.order = randomIndex;
});