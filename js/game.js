const rows = [];
const tips = [];
let letter = 0;
let row = 0;
let finished = false;
const randNumber = Math.floor(Math.random() * slova.length);
let slovo = {
    number: randNumber,
    letters: slova[randNumber]
};
slovo.letters = slovo.letters.split("");
let tip = [];
for (let i = 0; i < 5; i++) {
    rows.push(document.getElementById("row" + (i+1)));
}

document.addEventListener("keydown", function(event) {
    type(event);
})

function type(event) {
    if(finished){
        return;
    }
    const key = event.key;
    if (key == 'Backspace') {
        erraseLetter();
    }else if (key != ' ' && key.length === 1) {
        typeLetter(key);
    }
}
function erraseLetter() {
    if(letter > 0){
        letter--;
        tip = tip.slice(0, -1);
        console.log(tip)
    }
    setCurrentLetterText("");
}
function typeLetter(key) {
    setCurrentLetterText(key);
    tip.push(key);
    letter++
    if(row == 4 & letter === 5){
        endGame(false);
        console.log(letter);
        return;
    }
    else if(letter === 5){
        control(tip, slovo.letters);
        tip = [];
        letter = 0;
        row++;
        console.log(letter);
    }
}
function setCurrentLetterText(str) {
    rows[row].children[letter].textContent = str;
}
function control(tip, word){
    let correctCounter = 0;
    for(let i = 0; i < word.length; i++){
        if(tip === word){
            endGame(true);
            break;
        }
        console.log(tip+ ":" +slovo.letters);
        if(slovo.letters[i] === tip[i]){
            rows[row].children[i].style.backgroundColor = "green";
            correctCounter++;
        }else{
            for(let j = 0; j < 5; j++){
                if(tip[j] == slovo.letters[i]){
                    console.log("tip[" + j + "] = " + tip[j]+", slovo.letters[" + i +"] = "+slovo.letters[i]);
                    console.log(tip[j]+":"+slovo.letters[i]);
                    rows[row].children[j].style.backgroundColor = "yellow";
                }
            }
        }
        setTimeout(1000);
    }
    if(correctCounter === 5){
        endGame(true);
    }
}

function endGame(correct) {
        const result = document.getElementById("vysledek");
        console.log(correct);
        if(correct){
            result.innerHTML = "Správně";
            result.style.color = "gold";
        }
        else{
            console.log(correct);
            result.innerHTML = 'Spávné slovo je: "' + slova[slovo.number].toUpperCase() + '"!';
            result.style.color = "red";
        }
}