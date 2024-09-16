import SimpleLinkedList from "./simplelinkedlist.js";

export { init, getFirstBall, getCannonBall, getNextBall, loadCannon, addRandomBall, addBall, insertBallAfter, numberOfBalls, checkMatches, removeMatches, dump };

const list = new SimpleLinkedList();

function init() {
  console.log("Model init");
  loadCannon();
}

function dump() {
  let node = list.head;
  let output = "";
  while (node != null) {
    output += '"' + node.data + node.id + '"';
    output += " -> ";

    node = node.next;
  }
  output += "null";
  console.log(output);
}

// **** WRAPPERS ****
function addRandomBall() {
  list.add(randomBall());
}

function addBall(ball) {
  list.add(ball);
}

function getFirstBall() {
  return list.head;
}

function getNextBall(ball) {
  return ball.next;
}

// TODO: Implement more functions
function insertBallAfter(ball, node) {
  const lookAt = list.insertAfter(ball, node);
  const matches = checkMatches(lookAt);
  if (matches.length > 2) {
    removeMatches(matches);
  }
}

function numberOfBalls() {
  return list.size();
}

// **** CANNON ****
let cannonBall;

function loadCannon() {
  cannonBall = randomBall();
}

function getCannonBall() {
  return cannonBall;
}

// **** MATCHES ****

// TODO: Implement functions to find and remove matches

function checkMatches(node) {
  const matches = [node];

  let lookAt = node.prev;

  while (lookAt && lookAt.data == node.data) {
    matches.push(lookAt);
    lookAt = lookAt.prev;
  }
  while (lookAt && lookAt.data == node.data) {
    matches.push(lookAt);
    lookAt = lookAt.next;
  }

  return matches;
}

function removeMatches(matches) {
  for (let i = 0; i < matches.length; i++) {
    list.remove(matches[i]);
  }
}

// **** BALLS ****

const balls = ["🔴", "🔵", "🟡", "🟢"];

function randomBall() {
  return balls[Math.floor(Math.random() * balls.length)];
}

function red() {
  return balls[0];
}

function blue() {
  return balls[1];
}

function yellow() {
  return balls[2];
}

function green() {
  return balls[3];
}

// debugger;
