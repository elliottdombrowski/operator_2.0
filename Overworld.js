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
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //CLEAR CANVAS EVERY FRAME

      this.map.drawLowerImage(this.ctx); //DRAW MAP LOWER LAYER

      //MAP OVER AND DRAW ALL GAME OBJECTS FOR MAP
      Object.values(this.map.gameObjects).forEach(object => {
        // object.x += 0.5;
        object.sprite.draw(this.ctx);
      });

      this.map.drawUpperImage(this.ctx); //DRAW MAP UPPER LAYER

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