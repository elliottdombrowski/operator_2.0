// OVERWORLD IS TOP-LEVEL PARENT COMPONENT
// KEEPS TRACK OF STATE AND SENDS TO SUB-COMPONENTS

class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  };

  init() {
    // ON INIT, CREATE NEW INSTANCE OF IMAGE
    // BROWSER MUST PRE-LOAD IMAGES IN MEMORY TO DISPLAY IN CANVAS

    //MAP LOWER LAYER
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "assets/size-test-export.png";



    //MAIN CHARACTER SPRITE SHEET
    const x = 8;
    const y = 6;


    //SHADOW SPRITE
    const shadow = new Image();
    shadow.onload = () => {
      this.ctx.drawImage(
        shadow,
        0,
        0,
        32,
        32,
        x * 32 - 1,
        y * 32 + 20,
        16,
        16
      );
    };
    shadow.src="assets/sprite-shadow.png";


    const hero = new Image();
    hero.onload = () => {
      this.ctx.drawImage(
        hero, //IMAGE SRC
        0, //LEFT CUT
        0, //TOP CUT
        32, //WIDTH OF CUT
        48, //HEIGHT OF CUT
        x * 32 - 8, //WHERE WE DRAW CHARACTER WITHIN CANVAS, MULTIPLIED BY MAP GRID, MINUS NUDGING
        y * 32 - 18,
        32, //DRAWING CHARACTER AT SAME SIZE OF CUT
        48
      );
    };
    hero.src="assets/sprite-template.png";


  };

};