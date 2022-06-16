// OVERWORLD IS TOP-LEVEL PARENT COMPONENT
// KEEPS TRACK OF STATE AND SENDS TO SUB-COMPONENTS

class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  };

  //GAME LOOP
  startGameLoop() {
    const step = () => {
      requestAnimationFrame(() => {
        step(); //CALL STEP EVERY TIME BROWSER DETECTS NEW FRAME
      });
    };
    step();
  };

  init() {
    //TELL OVERWORLD WHICH CONTENT MAP TO DRAW DATA FROM
    this.map = new OverworldMap(window.OverworldMaps.ApartmentOne);
    //ON INIT, CALL STARTGAMELOOP 
    this.startGameLoop();
  };
};