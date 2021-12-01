const inititialColor = [];
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const quarterSelector = (idOfQuarter) => {
  return document.getElementById(`quarter${idOfQuarter}`);
};
const randomizer = (maxValue) => {
  const min = 0;
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const addSequence = (array) => {
  array.push(randomizer(3));
  return array;
};
const initialiseSimonsArray = (array) => {
  return addSequence(array);
};
const compareArray = (array, array2) => {
  return (
    array.length === array2.length && array.every((v, i) => v === array2[i])
  );
};
const inputPlayer = (gameArray, playerArray) => {
  return new Promise((resolve) => {
    console.log(gameArray.length === playerArray.length);
    if (gameArray.length === playerArray.length) {
      resolve(true);
    }
  });
};

const getColor = (array) => {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    inititialColor.push(
      getComputedStyle(quarterSelector(value)).backgroundColor
    );
  }
};

let stopGame;
let simonsArray = [];
let playerArray = [];
let playerScore = 0;

async function simonsDisplay(array) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    const inititialColor = (quarterSelector(value).style.backgroundColor =
      "rgba(255,255,255,0.1)");
    await sleep(1000).then(
      () => (quarterSelector(value).style.backgroundColor = inititialColor)
    );
  }
}

// document.getElementById("addSequence").onclick = () => {
//   addSequence(simonsArray);
// };

function getId(id) {
  id = id.substr(id.length - 1);
  playerArray.push(id);
  console.log(inputPlayer(simonsArray, playerArray));
}

async function gameplayLoop() {
  initialiseSimonsArray(simonsArray);
  while (stopGame === false) {
    stopGame = true;
    simonsDisplay(simonsArray);
    await inputPlayer(simonsArray, playerArray);
    if (compareArray(simonsArray, playerArray)) {
      addSequence(simonsArray);
      playerScore++;
      stopGame = false;
    }
  }
}
document.getElementById("clickMe").onclick = () => {
  stopGame = false;
  gameplayLoop(simonsArray);
};
