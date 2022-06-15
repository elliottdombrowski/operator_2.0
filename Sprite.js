class Sprite {
  constructor(config) {

    //SET UP IMAGES
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true; //WON'T TRY TO LOAD ASSETS UNTIL FLAG IS SET TO TRUE
    };

    //CONFIGURING ANIMATIONS / INITIAL STATE
    this.animations = config.animations || {
      idleDown: [ [0, 0] ]
    }

    this.currentAnimation = config.currentAnimation || "idleDown"; //EQUAL TO KEY IN ANIMATIONS SET
    this.currentAnimationFrame = 0; //WHICH ANIMATION FRAME IN ANIMATION ARRAY SHOULD BE SHOWING

    //REFERENCE GAME OBJECT
    this.gameObject = config.gameObject;
  };

  //SET UP IMAGE DRAWING
  draw(ctx) {
    const x = this.gameObject.x * 32 - 8;
    const y = this.gameObject.y * 32 - 18;

    ctx.drawImage(this.image,
      0, 0, //LEFT / TOP CUT
      32, 48, //SIZE OF CUT
      x, y,
      32, 48 //SIZE OF DRAW
    )
  }
};