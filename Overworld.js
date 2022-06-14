// OVERWORLD IS TOP-LEVEL PARENT COMPONENT
// KEEPS TRACK OF STATE AND SENDS TO SUB-COMPONENTS

class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  };

  init() {
    // console.log("hello overworld", this);

    // ON INIT, CREATE NEW INSTANCE OF IMAGE
    // BROWSER MUST PRE-LOAD IMAGES IN MEMORY TO DISPLAY IN CANVAS

    //MAP LOWER LAYER
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/size-test-export.png";

    //MAIN CHARACTER
    const hero = new Image();
    hero.onload = () => {
      this.ctx.drawImage(hero, 0, 0);
    };
    hero.src="assets/sprite-template.png";
  };
};