class Sprite {
  constructor(config) {

    //SET UP IMAGES
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true; //WON'T TRY TO LOAD ASSETS UNTIL FLAG IS SET TO TRUE
    };

    //SET UP SHADOW
    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = '/assets/sprite-shadow.png';
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    //CONFIGURING ANIMATIONS / INITIAL STATE
    this.animations = config.animations || {
      "idle-down": [ [0,0] ],
      "idle-right": [ [0,1] ],
      "idle-up": [ [0,2] ],
      "idle-left": [ [0,3] ],
      "walk-down": [ [1,0], [0,0], [3,0], [0,0] ],
      "walk-right": [ [1,1], [0,1], [3,1], [0,1] ],
      "walk-up": [ [1,2], [0,2], [3,2], [0,2] ],
      "walk-left": [ [1,3], [0,3], [3,3], [0,3] ],

      // "fire-right": [ [0,4], [1,4], [2,4], [3,4] ],
    }

    this.currentAnimation = config.currentAnimation || "idleDown"; //EQUAL TO KEY IN ANIMATIONS SET
    this.currentAnimationFrame = 0; //WHICH ANIMATION FRAME IN ANIMATION ARRAY SHOULD BE SHOWING
    this.animationFrameLimit = config.animationFrameLimit || 16; //HOW MANY GAME LOOP FRAMES TO SHOW EACH SPRITE SHEET CUT FOR // CADENCE
    this.animationFrameProgress = this.animationFrameLimit; //HOW MUCH TIME LEFT BEFORE SHIFTING TO NEXT FRAME

    //REFERENCE GAME OBJECT
    this.gameObject = config.gameObject;
  };

  //SET UP IMAGE DRAWING
  draw(ctx) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, 0, 0, 32, 32, x + 7, y + 38, 16, 16); //NUDGING SHADOWS TO CENTER UNDER NPCS

    this.isLoaded && ctx.drawImage(this.image,
      0, 0, //LEFT / TOP CUT
      32, 48, //SIZE OF CUT
      x, y,
      32, 48 //SIZE OF DRAW
    )
  }
};