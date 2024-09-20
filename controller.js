import * as model from "./model.js";
import * as view from "./view.js";
import * as animation from "./animations.js";

// TODO: Export functions used by the view
export { addNewBall, addBallToChain, ballInserted, matchesRemoved };

window.addEventListener("load", init);

function init() {
  console.log("Controller init");
  model.init();
  view.init();

  createInitialChain();
  view.updateDisplay(model);
  // show debug info on the model
  // model.dump();

  // store "shortcuts" to model and view in window
  window.model = model;
  window.view = view;
}

function createInitialChain() {
  for (let i = 0; i < 5; i++) {
    model.addRandomBall();
  }
}

// TODO: Add controller functions to handle things happening in the view
function addNewBall() {
  const newBall = model.addRandomBall();
  view.updateDisplay(model);
  animation.animateNewBall(model, newBall);
}

function addBallToChain(ballNode) {
  const cannonBall = model.insertBallAfter(model.getCannonBall(), ballNode);
  view.updateDisplay(model);
  console.log(model.getCannonBall());
  animation.animateCannonBall(model, cannonBall);
}

// **** ANIMATIONS ****

// TODO: Add controller functions to be called when animations have completed
function ballInserted(insertedBall) {
  const matches = model.checkMatches(insertedBall);
  model.loadCannon();
  animation.animateRemoveBalls(model, matches);
  view.updateDisplay(model);
}

function matchesRemoved(insertedBall) {
  const matches = model.checkMatches(insertedBall);
  if (matches.length > 2) {
    return matches;
  }
}
