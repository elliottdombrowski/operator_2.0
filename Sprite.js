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
      //4 DIRECTIONAL IDLE / WALK ANIMATIONS
      "idle-down": [ [0,0] ],
      "idle-right": [ [0,1] ],
      "idle-up": [ [0,2] ],
      "idle-left": [ [0,3] ],
      "walk-down": [ [1,0], [0,0], [3,0], [0,0] ],
      "walk-right": [ [1,1], [0,1], [3,1], [0,1] ],
      "walk-up": [ [1,2], [0,2], [3,2], [0,2] ],
      "walk-left": [ [1,3], [0,3], [3,3], [0,3] ],
      
      //8 DIRECTIONAL IDLE / WALK ANIMATIONS
      "idle-ne": [ [0,1] ],
      "idle-nw": [ [0,3] ],
      "idle-se": [ [0,1] ],
      "idle-sw": [ [0,3] ],
      "walk-ne": [ [1,1], [0,1], [3,1], [0,1] ],
      "walk-nw": [ [1,3], [0,3], [3,3], [0,3] ],
      "walk-se": [ [1,1], [0,1], [3,1], [0,1] ],
      "walk-sw": [ [1,3], [0,3], [3,3], [0,3] ],
      
      // "fire-right": [ [0,4], [1,4], [2,4], [3,4] ],
    }

    this.currentAnimation = config.currentAnimation || "idle-down"; //EQUAL TO KEY IN ANIMATIONS SET
    this.currentAnimationFrame = 0; //WHICH ANIMATION FRAME IN ANIMATION ARRAY SHOULD BE SHOWING
    this.animationFrameLimit = config.animationFrameLimit || 16; //HOW MANY GAME LOOP FRAMES TO SHOW EACH SPRITE SHEET CUT FOR // CADENCE
    this.animationFrameProgress = this.animationFrameLimit; //HOW MUCH TIME LEFT BEFORE SHIFTING TO NEXT FRAME

    //REFERENCE GAME OBJECT
    this.gameObject = config.gameObject;
  };

  //FIGURE OUT WHICH ANIMATION AND ANIMATION FRAMES ARE CURRENT
  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  };

  //CALCULATE INTENDED ANIMATION VIA ANIMATIONS OBJECT KEY
  setAnimation(key) {
    //CHECK IF ANIMATION IS CHANGING
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  };

  updateAnimationProgress() {
    //DOWNTICK PROGRESS ON CURRENT FRAME
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }
    this.animationFrameProgress = this.animationFrameLimit; //IF 0, RESET COUNTER
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  };

  //SET UP IMAGE DRAWING
  draw(ctx) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, 0, 0, 32, 32, x + 7, y + 38, 16, 16); //NUDGING SHADOWS TO CENTER UNDER NPCS

    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32, frameY * 48, //LEFT / TOP CUT
      32, 48, //SIZE OF CUT
      x, y,
      32, 48 //SIZE OF DRAW
    )
    this.updateAnimationProgress();
  }
};