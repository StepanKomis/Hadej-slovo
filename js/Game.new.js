class game {
  constructor() {
    this.vysledek = document.getElementById("vysledek");
    this.rows = [];
    this.tips = [];
    this.letter = 0;
    this.row = 0;
    this.finished = false;
    this.slovo = {};
    this.tip = [];
    this.getRandomWord();
    this.setRows();
    document.addEventListener("keydown", (event) => {
      this.type(event);
    });
  }
  /**
   * Nastaví náhodné slovo na začátku hry.
   */
  getRandomWord() {
    const randNumber = Math.floor(Math.random() * slova.length);
    const slovo = {
      number: randNumber,
      letters: slova[randNumber],
    };
    slovo.letters = slovo.letters.split("");
    this.slovo = slovo;
  }
  /**
   * Přiřazuje jednotlivá písmena k buňkám v HTML dokumentu.
   */
  setRows() {
    for (let i = 0; i < 5; i++) {
      this.rows.push(document.getElementById("row" + (i + 1)));
    }
  }
  /**
   * Stará se o zpracování uživatelského vstupu.
   */
  type(event) {
    if (this.finished) {
      return;
    }
    const key = event.key;
    if (key == "Backspace") {
      this.erraseLetter();
    } else if (key != " " && key.length === 1) {
      this.typeLetter(key);
    }
  }
  /**
   * Smaže poslední napsané písmeno.
   */
  erraseLetter() {
    if (this.letter > 0) {
      this.letter--;
      this.tip = this.tip.slice(0, -1);
    }
    this.setCurrentLetterText("");
  }
  /**
   * Přidá písmeno k uživatelskému tipu
   * @param {string} key Letter you want to add to your tip. 
   */
  typeLetter(key) {
    this.setCurrentLetterText(key);
    this.tip.push(key);
    this.letter++;
    if (this.row == 4 & this.letter === 5) {
      this.endGame(false);
      return;
    } else if (this.letter === 5) {
      this.control();
      this.tip = [];
      this.letter = 0;
      this.row++;
    }
  }
  /**
   * Přidá písmeno k tipu.
   * @param {string} str Charakter který chcete přidat.  
   */
  setCurrentLetterText(str) {
    this.rows[this.row].children[this.letter].textContent = str;
  }
  /**
   * zkontroluje zda tip odpovídá náhodnému slovu
   */
  control() {
    let word = this.slovo.letters;
    let correctCounter = 0;
    for (let i = 0; i < word.length; i++) {
      if (this.tip === word) {
        this.endGame(true);
        break;
      }
      if (this.slovo.letters[i] === this.tip[i]) {
        //správně i s místem
        this.rows[this.row].children[i].style.backgroundColor = "#00b509";
        correctCounter++;
      } else {
        //špatně
        for (let j = 0; j < 5; j++) {
          if (this.tip[j] == this.slovo.letters[i]) {
            this.rows[this.row].children[j].style.backgroundColor = "#eda600";
          }
        }
      }
      setTimeout(1000);
    }
    if (correctCounter === 5) {
      this.endGame(true);
    }
  }
  /**
   * Podle výsledku nataví vzhled stránky
   * @param {boolean} correct výsledek
   */
  endGame(correct) {
    if (correct) {
      this.vysledek.innerHTML = "Správně";
      this.vysledek.style.color = "#ffd700";
    } else {
      this.vysledek.innerHTML =
        'Spávné slovo je: "' + slova[this.slovo.number].toUpperCase() + '"!';
      this.vysledek.style.color = "#c90000";
    }
  }

}

const test = new game();