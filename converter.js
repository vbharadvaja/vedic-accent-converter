/**
 * Converts the text to a phonetic representation with one character per phoneme.
 *
 * @param {String} input text
 * @return text in char/phoneme phonetic representation
 * @customfunction
 */
function toPhonetic(input) {
  var line = String(input);

  line = line.split("ā́").join("Á");
  line = line.split("ā̀").join("À");
  line = line.split("ā").join("A");
  line = line.split("ī́").join("Í");
  line = line.split("ī̀").join("Ì");
  line = line.split("ī").join("I");
  line = line.split("ū́").join("Ú");
  line = line.split("ū̀").join("Ù");
  line = line.split("ū").join("U");

  line = line.split("r̥̄́").join("Ṙ");
  line = line.split("r̥̄̀").join("Ṝ");
  line = line.split("r̥̄").join("Ṛ");
  line = line.split("ŕ̥").join("ṙ");
  line = line.split("r̥̀").join("ṝ");
  line = line.split("r̥").join("ṛ");
  line = line.split("l̥̄́").join("Ḻ");
  line = line.split("l̥̄̀").join("Ḹ");
  line = line.split("l̥̄").join("Ḽ");
  line = line.split("ĺ̥").join("ḻ");
  line = line.split("l̥̀").join("ḹ");
  line = line.split("l̥").join("ḽ");

  line = line.split("aí").join("Ý");
  line = line.split("aú").join("Ẃ");
  line = line.split("aì").join("Ỳ");
  line = line.split("aù").join("Ẁ");
  line = line.split("ai").join("Y");
  line = line.split("au").join("W");


  line = line.split("kh").join("K");
  line = line.split("gh").join("G");
  line = line.split("ch").join("C");
  line = line.split("jh").join("J");
  line = line.split("ṭh").join("Ṭ");
  line = line.split("ḍh").join("Ḍ");
  line = line.split("th").join("T");
  line = line.split("dh").join("D");
  line = line.split("ph").join("P");
  line = line.split("bh").join("B");

  return line;
}

/**
 * Gets all vowels from a text (written in char/phoneme representation)
 *
 * @param input text
 * @return String of all vowels in input text
 * @customfunction
 */
function getVowels(input) {
  var line = String(input);
  var vowels = ["a", "i", "u", "e", "o", "á", "à", "í", "ì", "ú", "ù", "é", "è", "ó", "ò", "Á", "À", "A", "Í", "Ì", "I", "Ú", "Ù", "U", "Ṙ", "Ṝ", "Ṛ", "ṙ", "ṝ", "ṛ", "Ḻ", "Ḹ", "Ḽ", "ḻ", "ḹ", "ḽ", "Ý", "Ẃ", "Ỳ", "Ẁ", "Y", "W"];

  var vowelString = "";

  for (var i = 0; i < line.length; i++) {
    if ((vowels.indexOf((line.substring(i, i + 1))) >= 0)) {
      vowelString = vowelString + line.substring(i, i + 1);
    }
  }

  return vowelString;
}

/**
 * Gets grammatical accent (U = udatta, I = independent svarita, * = unaccented) of each vowel in input
 *
 * @param input text
 * @return String of accents (U, I, *) of each vowel in input
 * @customfunction
 */
function getAccents(input) {
  var line = String(input);
  var udatta = ["á", "í", "ú", "é", "ó", "Á", "Í", "Ú", "Ṙ", "ṙ", "Ḻ", "ḻ", "Ý", "Ẃ"];
  var indSvarita = ["à", "ì", "ù", "è", "ò", "À", "Ì", "Ù", "Ṝ", "ṝ", "Ḹ", "ḹ", "Ỳ", "Ẁ"];
  var unaccented = ["a", "i", "u", "e", "o", "A", "I", "U", "Ṛ", "ṛ", "Ḽ", "ḽ", "Y", "W"];

  var accents = "";
  for (var i = 0; i < line.length; i++) {
    if ((udatta.indexOf((line.substring(i, i + 1))) >= 0)) {
      accents = accents + "U";
    }
    if ((indSvarita.indexOf((line.substring(i, i + 1))) >= 0)) {
      accents = accents + "I";
    }
    if ((unaccented.indexOf((line.substring(i, i + 1))) >= 0)) {
      accents = accents + "*";
    }
  }

  return accents;
}

/**
 * Converts string of grammatical accents to string of pronounced accents (-, Anudatta, Svarita, Independent svarita)
 *
 * @param input string of grammatical accents
 * @return the corresponding pronounced accents
 * @customfunction
 */
function convertAccents(input) {
  var line = String(input);

  line = line.split("*U").join("AU");
  line = line.split("*I").join("AI");
  line = line.split("U*").join("US");

  var current = 0;
  var initialA = "";
  while (line.substring(current, current + 1) == "*") {
    initialA = initialA + "A";
    current = current + 1;
  }
  if (initialA.length != 0) {
    line = initialA + line.substring(current);
  }

  line = line.split("U").join("*");
  line = line.split("*").join("-");

  return line;
}

/**
 * Replaces vowels in input text with same vowels in IAST with the provided svaras
 *
 * @param phonemic the input text (formatted in char/phoneme representation)
 * @param svara the string containing the pronounced svaras (-, A, S, I)
 * @param dirgha whether to mark dirgha svaritas (not implemented)
 * @param markInd whether to mark independent svaritas with an *
 * @return The input text with vowels replaced with the appropriate IAST representation carrying the svara
 * @customfunction
 */
function addSvaras(phonemic, svara, dirgha, markInd) {
  var udatta = ["á", "í", "ú", "é", "ó", "Á", "Í", "Ú", "Ṙ", "ṙ", "Ḻ", "ḻ", "Ý", "Ẃ"];
  var indSvarita = ["à", "ì", "ù", "è", "ò", "À", "Ì", "Ù", "Ṝ", "ṝ", "Ḹ", "ḹ", "Ỳ", "Ẁ"];
  var unaccented = ["a", "i", "u", "e", "o", "A", "I", "U", "Ṛ", "ṛ", "Ḽ", "ḽ", "Y", "W"];
  //var anudatta =   ["a̱", "i̱", "u̱", "e̱", "o̱", "ā̱", "ī̱", "ū̱", "ṝ̱", "ṛ̱", "ḹ̱", "ḷ̱", "ai̱", "au̱"];
  var unmarked = ["a", "i", "u", "e", "o", "ā", "ī", "ū", "ṝ", "ṛ", "ḹ", "ḷ", "ai", "au"];
  //var svarita =    ["a̍", "i̍", "u̍", "e̍", "o̍", "ā̍", "ī̍", "ū̍", "ṝ̍", "ṛ̍", "ḹ̍", "ḷ̍", "ai̍", "au̍"];

  var vowel = ([]);
  /* addAll */ (function (l1, l2) { return l1.push.apply(l1, l2); })(vowel, udatta);
  /* addAll */ (function (l1, l2) { return l1.push.apply(l1, l2); })(vowel, indSvarita);
  /* addAll */ (function (l1, l2) { return l1.push.apply(l1, l2); })(vowel, unaccented);

  var long = ["Á", "Í", "Ú", "Ṙ", "Ḻ", "Ý", "Ẃ", "À", "Ì", "Ù", "Ṝ", "Ḹ", "Ỳ", "Ẁ", "A", "I", "U", "Ṛ", "Ḽ", "Y", "W"];

  var line = String(phonemic);
  var svaras = String(svara);

  for (var i = 0; i < line.length; i++) {
    var pos = vowel.indexOf(line.substring(i, i + 1));

    if (pos >= 0) {
      pos = pos % 14;
      var thisSvara = svaras.substring(0, 1);
      svaras = svaras.substring(1);

      var letter = unmarked[pos];
      if (thisSvara == "A") {
        letter = letter + "̱";
      }
      else if (thisSvara == "-") {
        letter = letter;
      }
      else if (thisSvara == "I") {
        letter = letter + "̍";
        if (markInd) {
          letter = letter + "*";
        }
      }
      else if (thisSvara == "S") {
        letter = letter + "̍";
      }

      var elongate = false;

      /*if (dirgha)
      {
        if (long.indexOf(line.substring(i, i + 1)) >= 0)
        {
          if (i == line.length - 1)
          {
            elongate = true;
          }
          else if (i == line.length - 2)
          {
            if (line.substring(i+1,i+2) != "n")
            {
              elongate = true;
            }
          }
        }
      }*/

      line = line.substring(0, i) + letter + line.substring(i + 1);
    }
  }


  return line;
}

/**
 * converts consonants in char/phoneme representation to IAST
 *
 * @param input text
 * @return input text with all consonants in IAST
 * @customfunction
 */
function toIAST(input) {
  var line = String(input);

  line = line.split("K").join("kh");
  line = line.split("G").join("gh");
  line = line.split("C").join("ch");
  line = line.split("J").join("jh");
  line = line.split("Ṭ").join("ṭh");
  line = line.split("Ḍ").join("ḍh");
  line = line.split("T").join("th");
  line = line.split("D").join("dh");
  line = line.split("P").join("ph");
  line = line.split("B").join("bh");

  return line;
}

/**
 * Takes a sentence with grammatical markings and returns it in IAST with pronounced svaras
 *
 * @param input the input text (formatted in char/phoneme representation)
 * @param dirgha whether to mark dirgha svaritas (not implemented)
 * @param markInd whether to mark independent svaritas with an *
 * @return Sentence in IAST with svara markings
 * @customfunction
 */
function convertSentence(input, dirgha, markInd) {
  if (input.map) {
    return input.map(convertSentence);
  }
  else {
    var sentence = String(input);

    sentence = toPhonetic(sentence);
    var svaras = convertAccents(getAccents(sentence));

    sentence = addSvaras(sentence, svaras, dirgha, markInd);
    sentence = toIAST(sentence);

    return sentence;
  }
}
