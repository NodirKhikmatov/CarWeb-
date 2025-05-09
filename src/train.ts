/**TASK-ZJ:

Shunday function yozing, u berilgan arrayni ichidagi numberlarni qiymatini hisoblab qaytarsin.
MASALAN: reduceNestedArray([1, [1, 2, [4]]]) return 8
**/

function reduceNestedArray(str: any[]) {
  return str
    .flat(Infinity)
    .reduce((sum, num) => sum + (typeof num === "number" ? num : 0), 0);
}

console.log(reduceNestedArray([1, [1, 2, [4]]]));

/** 

TASK-ZH:
Shunday function yozing, u berilgan array parametrni ichidagi eng katta raqamgacha tushib qolgan raqamlarni bir arrayda qaytarsin. 
MASALAN: findDisappearedNumbers([1, 3, 4, 7]) return [2, 5, 6]


function findDisappearedNumbers(str: number[]) {
  const a = str.sort((a, b) => a - b);

  let missingNum: number[] = [];
  let num = a[0];

  for (const ele of a) {
    while (num < ele) {
      missingNum.push(num);
      num++;
    }
  }
  return missingNum;
}

console.log(findDisappearedNumbers([1, 3, 4, 7]));
*/
/**
TASK-ZG:

Shunday function yozing, u berilgan string parametrni snake casega otkazib qaytarsin. 
MASALAN: capitalizeWords('name should be a string') return 'name_should_be_a_string'


function capitalizeWords(sentence: string): string {
  return sentence
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

console.log(capitalizeWords("name should be a string"));
*/
/**TASK-ZF:

Shunday function yozing, uni string parametri bolsin. String ichidagi har bir sozni bosh harflarini katta harf qilib 
qaytarsin lekin 1 yoki 2 harfdan iborat sozlarni esa oz holicha qoldirsin.
MASALAN: capitalizeWords('name should be a string') return 'Name Should be a String'

function capitalizeWords(input: string): string {
  return input
    .split(" ")
    .map((word) =>
      word.length > 2 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join(" ");
}

console.log(capitalizeWords("name should be a string"));
 */
/**
 * TASK ZE

Shunday function yozing, uniygona string parametri mavjud bo'lsin.
Bu function string tarkibidagi takrorlangan xarflarni olib tashlab qolgan
qiymatni qaytarsin.

MASALAN: removeDuplicate('stringg') return 'string'

Yuqoridagi misolda, 'stringg' so'zi tarkibida 'g' harfi takrorlanmoqda
funktsiyamiz shu bittadan ortiq takrorlangan harfni olib natijani
qaytarmoqda.


function removeDuplicate(str: string): string {
  return Array.from(new Set(str)).join("");
}

console.log(removeDuplicate("stringg")); // 'string'
 */
/**
 * TASK ZD

Shunday function yozing. Bu function o'ziga, parametr sifatida
birinchi oddiy number, keyin yagona array va uchinchi bo'lib oddiy number
qabul qilsin. Berilgan birinchi number parametr, arrayning tarkibida indeks bo'yicha hisoblanib,
shu aniqlangan indeksni uchinchi number parametr bilan alashtirib, natija sifatida
yangilangan arrayni qaytarsin.

MASALAN: changeNumberInArray(1, [1,3,7,2], 2) return [1,2,7,2];

Yuqoridagi misolda, birinchi raqam bu '1' va arrayning '1'chi indeksi bu 3.
Bizning function uchinchi berilgan '2' raqamini shu '3' bilan almashtirib,
yangilangan arrayni qaytarmoqda.

function changeNumberInArray(index: number, arr: number[], newValue: number): number[] {
  if (index < 0 || index >= arr.length) {
      throw new Error("Index out of bounds");
  }
  
  const newArr = [...arr];
  newArr[index] = newValue;
  return newArr;
}


console.log(changeNumberInArray(1, [1, 3, 7, 2], 2)); // [1, 2, 7, 2]
 */
/**TASK ZC

Selisy (°C) shkalasi bo'yicha raqam qabul qilib, uni
Ferenhayt (°F) shkalisaga o'zgaritib beradigan function yozing.

MASALAN: celsiusToFahrenheit(0) return 32;
MASALAN: celsiusToFahrenheit(10) return 50;

Yuqoridagi misolda, 0°C, 32°F'ga teng.
Yoki 10 gradus Selsiy, 50 Farenhaytga teng.

°C va °F => Tempraturani o'lchashda ishlatiladigan o'lchov birligi. 

function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}


console.log(celsiusToFahrenheit(0));  // 32
console.log(celsiusToFahrenheit(10)); // 50
console.log(celsiusToFahrenheit(25)); // 77
*/
/*TASK-ZB:

Shunday function yozing, uni 2 ta number parametri bolsin va berilgan sonlar orasidan random raqam return qilsin
MASALAN: randomBetween(30, 50) return 45


function randomBetween(num1: number, num2: number) {
  if (num1 > num2) {
    throw new Error("num1 should be less than or equal to num2");
  }
  return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
}

console.log(randomBetween(30, 50));
*/
/*TASK-Z:

Shunday function yozing. Bu function sonlardan iborat array
qabul qilsin. Function'ning vazifasi array tarkibidagi juft
sonlarni topib ularni yig'disini qaytarsin.

MASALAN:
sumEvens([1, 2, 3]); return 2;
sumEvens([1, 2, 3, 2]); return 4;

Yuqoridagi misolda, bizning funktsiya
berilayotgan array tarkibidagi sonlar ichidan faqatgina juft bo'lgan
sonlarni topib, ularni hisoblab yig'indisini qaytarmoqda.

function sumEvens(numbers: number[]): number {
  return numbers.reduce((sum, num) => (num % 2 === 0 ? sum + num : sum), 0);
}

console.log(sumEvens([1, 2, 3])); // Output: 2
console.log(sumEvens([1, 2, 3, 2])); // Output: 4
console.log(sumEvens([4, 5, 6, 7, 8])); // Output: 18
console.log(sumEvens([1, 3, 5, 7])); // Output: 0
*/
/*TASK Y

Shunday function yozing, uni 2'ta array parametri bo'lsin.
Bu function ikkala arrayda ham ishtirok etgan bir xil
qiymatlarni yagona arrayga joylab qaytarsin.

MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3]

Yuqoridagi misolda, argument sifatida berilayotgan array'larda
o'xshash sonlar mavjud. Function'ning vazifasi esa ana shu
ikkala array'da ishtirok etgan o'xshash sonlarni yagona arrayga
joylab return qilmoqda.


function findIntersection(arr1: number[], arr2: number[]) {
  return arr1.filter((value) => arr2.includes(value));
}

console.log(findIntersection([1, 4, 3], [3, 4, 0]));
*/

/**
 * TASK-X

Shunday function yozing, uni object va string parametrlari bo'lsin.
Bu function, birinchi object parametri tarkibida, kalit sifatida ikkinchi string parametri
necha marotaba takrorlanganlini sanab qaytarsin.

Eslatma => Nested object'lar ham sanalsin

MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2

Yuqoridagi misolda, birinchi argument object, ikkinchi argument 'model'.
Funktsiya, shu ikkinchi argument 'model', birinchi argument object
tarkibida kalit sifatida 2 marotaba takrorlanganligi uchun 2 soni return qilmoqda

 

function countOccurrences(obj: any, key: string): number {
  if (typeof obj !== "object" || obj === null) return 0;

  return Object.keys(obj).reduce((count, currentKey) => {
    const isMatch = currentKey == key ? 1 : 0;
    const nestedCount = countOccurrences(obj[currentKey], key);
    return count + isMatch + nestedCount;
  }, 0);
}

const example = {
  model: "Bugatti",
  steer: {
    model: "HANKOOK",
    size: 30,
  },
};

console.log(
  countOccurrences(
    { model: "Bugatti", steer: { model: "HANKOOK", size: 30 } },
    "model"
  )
);
*/
/*TASK-W:

Shunday function yozing, uni array va number parametrlari bolsin. Function arrayni numberda berilgan uzunlikda kesib bolaklarga ajratilgan array holatida qaytarsin
MASALAN: chunkArray([1,2,3,4,5,6,7,8,9,10], 3) return [[1,2,3], [4,5,6], [7,8,9], [10]]


function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("err");
  }

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const size = 3;
const chunked = chunkArray(array, size);
console.log(chunked); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
*/
/*TASK-V:

Shunday function yozing, uni string parametri bolsin va stringdagi harf va u harf necha marta takrorlangani sonidan tashkil topgan object qaytarsin.
MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}


function countChars(str: string): Record<string, number> {
  const charCount: Record<string, number> = {};
  for (const char of str) {
    if (charCount[char]) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }
  return charCount;
}
console.log(countChars("hello"));
*/
/**
 TASK-T:

Shunday function yozing, u sonlardan tashkil topgan 2 ta array qabul qilsin va ikkala arraydagi sonlarni tartiblab bir arrayda qaytarsin
MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]); return [0,3,4,4,6,30,31]


function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
  const mergedArray: number[] = [];
  let i = 0; 
  let j = 0;

  
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      mergedArray.push(arr1[i]);
      i++;
    } else {
      mergedArray.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    mergedArray.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    mergedArray.push(arr2[j]);
    j++;
  }

  return mergedArray;
}

console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));

 */
/* TASK-

Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin va osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin
MASALAN: missingNumber([3, 0, 1]) return 2


function missingNumber(str: number[]) {
  const a = str.sort();
  let num = a[0];
  for (const ele of a) {
    if (num !== ele) return num;
    num++;
  }
}

console.log(missingNumber([3, 5, 2, 1]));*/
/*TASK R 

Shunday function yozing, u string parametrga ega bo'lsin.
Agar argument sifatida berilayotgan string, "1 + 2" bo'lsa,
string ichidagi sonlarin yig'indisni hisoblab, number holatida qaytarsin

MASALAN: calculate("1 + 3"); return 4;
1 + 3 = 4, shu sababli 4 natijani qaytarmoqda

const calculate = (str: string): number => {
  return eval(str);
};
console.log(calculate("1 + 3"));
*/

/*TASK-Q:

Shunday function yozing, u 2 ta parametrgga ega bolib birinchisi object, ikkinchisi string. Agar string parametr objectni propertysi bolsa true bolmasa false qaytarsin.
MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") return true; hasProperty({name: "BMW", model: "M3"}, "year") return false


function hasProperty(obj: object, prop: string): boolean {
  return obj.hasOwnProperty(prop);
}

console.log(hasProperty({ name: "BMW", model: "M3" }, "model"));
console.log(hasProperty({ name: "BMW", model: "M3" }, "year"));
*/

/* TASK-P
Shunday function yozing, u object qabul qilsin va arrayni object arrayga otkazib arrayni qaytarsin qaytarsin.
MASALAN: objectToArray( {a: 10, b: 20}) return [['a', 10], ['b', 20]]


const objectToArray = (obj) => {
  return Object.entries(obj);
  
}

console.log(objectToArray({ a: 10, b: 20 })); // [ ['a', 10], ['b', 20] ]
*/
/*TASK-O:
Shunday function yozing, u har xil valuelardan iborat array qabul qilsin va array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin.
MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45

function calculateSumOfNumbers(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") {
      sum += arr[i];
    }
  }
  return sum;
}
console.log(calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]));
*/
/*TASK-N: 

Shunday function yozing, u string qabul qilsin va string palindrom yani togri oqilganda ham, orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin.
MASALAN: palindromCheck("dad") return true;  palindromCheck("son") return false;



function palindromCheck(str) {
  const cleanedStr = str.toLowerCase().replace(/\s+/g, "");
  const reversedStr = cleanedStr.split("").reverse().join("");
  return cleanedStr === reversedStr;
}

console.log(palindromCheck("dad"));
console.log(palindromCheck("son"));
*/
/*
TASK M: 

Shunday function yozing, u raqamlardan tashkil topgan array qabul qilsin va array ichidagi har bir raqam uchun raqamni ozi va hamda osha raqamni kvadratidan tashkil topgan object hosil qilib, hosil bolgan objectlarni array ichida qaytarsin.
MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}];


function getSquareNumbers(numbers) {
  return numbers.map(number => ({
      number: number,
      square: number * number
  }));
}


console.log(getSquareNumbers([1, 2, 3]));*/

/*TASK L: 

Shunday function yozing, u string qabul qilsin va string ichidagi hamma sozlarni chappasiga yozib va sozlar ketma-ketligini buzmasdan stringni qaytarsin.
MASALAN: reverseSentence("we like coding!") return "ew ekil gnidoc";



const reverseSentence = (sentence) => {
  let words = sentence.split(" ");

  let reversWords = words.map((word) => {
    return word.split("").reverse().join("");
  });
  return reversWords.join(" ");
};
console.log(reverseSentence("we like coding"));
*/
/*
TASK K: 

Shunday function yozing, u string qabul qilsin va string ichidagi unli harflar sonini qaytarsin.
MASALAN: countVowels("string") return 1;


const countVowels = (str) => {
  let vowels = ["i", "u", "a", "e", "o"];
  // let str = "string";
  let count = 0;

  for (let i of str) {
    if (vowels.includes(i)) {
      count++;
    }
  }
  return count;
};
console.log(countVowels("mitsila "));
*/
/*
traditional FD => BSSR (ADMINKA) => EJS
MODERN FD => SPA (USER) => REACT 
*/

/*TASK J:

Shunday function tuzing, u string qabul qilsin.
Va string ichidagi eng uzun so'zni qaytarsin.

MASALAN: findLongestWord("I came from Uzbekistan!"); return "Uzbekistan!"

Yuqoridagi text tarkibida 'Uzbekistan'
eng uzun so'z bo'lganligi uchun 'Uzbekistan'ni qaytarmoqda



function findLongestWord(str) {
  let words = str.split(/\s+/);

  let longestWord = "";
  for (let word of words) {
    let cleanedWord = word.replace(/[^a-zA-Z']/g, "");
    if (cleanedWord.length > longestWord.length) {
      longestWord = cleanedWord;
    }
  }

  return longestWord;
}

console.log(findLongestWord("I came from Uzbekistan!")); // "Uzbekistan"
*/

/*TASK I:

Shunday function tuzing, u parametrdagi array ichida eng ko'p
takrorlangan raqamni topib qaytarsin.

MASALAN: majorityElement([1, 2, 3, 4, 5, 4, 3, 4]); return 4

Yuqoridag misolda argument sifatida kiritilayotgan array tarkibida 4 soni ko'p takrorlanganligi uchun 4'ni return qilmoqda.


const majorityElement = (arr) => {
  const count = {};
  const majorityCount = Math.(arr.length / 2);


  for (let num of arr) {
    count[num] = (count[num] || 0) + 3;
    if (count[num] > majorityCount) {
      return num;
    }
  }
  return null;
};

console.log(majorityElement([1, 2, 3, 4, 5, 4, 4, 3]));
*/
/*PROJECT STANDARDS:

--Logging standards,
--Naming standards,
--function,method,variable => Camel,
--class => Pascal, MemberType
--folder => kebab,
--css =>snake

-ERROR HANDLING



*/

/**H2-TASK: 

Shunday function tuzing, unga string argument pass bolsin. Function ushbu agrumentdagi digitlarni yangi stringda return qilsin
MASALAN: getDigits("m14i1t") return qiladi "141"

const getDigits = (arr) => {
  const number = arr.match(/\d+/g);
  return number;
};

console.log(getDigits("MIT22"));
 */

/*H-TASK: 

shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib, faqat positive qiymatlarni olib string holatda return qilsin
MASALAN: getPositive([1, -4, 2]) return qiladi "12"


function getPositive(arr){
    return arr.filter(num => num > 0).join("");
}

console.log(getPositive([2,-5,5]));
*/

/*task G
Yagona parametrga ega function tuzing.
Va bu function parametr orqalik integer ma'lumot turlariga ega bo'lgan bir arrayni qabul qilsin.
Ushbu function bizga arrayning tarkibidagi birinchi eng katta qiymatning indeksini qaytarsin.

MASALAN: getHighestIndex([5, 21, 12, 21 ,8]); return qiladi 1 sonini
Yuqoridagi misolda, birinchi indeksda 21 joylashgan.
Va bu 21 soni arrayning tarkibidagi birinchi eng katta son hisobladi va bizga uning indeksi 1 qaytadi.*/

// function findMax(numbers){
// let highestNumber = Math.max(...numbers);

// return numbers.indexOf(highestNumber)
// }
// const results = findMax([4,25,89,5])
// console.log(results);
