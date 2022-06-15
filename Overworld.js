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

    //PLACE GAME OBJECTS
    const hero = new GameObject({
      x: 8,
      y: 6,
    });
    const npc1 = new GameObject({
      x: 10,
      y: 6,
      src: '/assets/sprite-template.png'
    });

    setTimeout(() => {
      //CALL DRAW FUNCT IN SPRITE.JS, DRAW SPRITE TO SCREEN
      hero.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);
  };
};