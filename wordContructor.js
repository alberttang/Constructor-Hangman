

function Word(word){
        this.lettersInChosenWord = word.split("");
        this.numBlanks = this.lettersInChosenWord.length;
    
    };


module.exports = Word;

    