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
      this.shadow.src = '/assets/characters/sprite-shadow.png';
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    //CONFIGURING ANIMATIONS / INITIAL STATE
    this.animations = config.animations || {
      //4 DIRECTIONAL IDLE / WALK ANIMATIONS
      "idle-right": [ [0,0] ],
      "idle-left": [ [0,1] ],
      "idle-up": [ [0,2] ],
      "idle-down": [ [0,3] ],
      "walk-right": [ [0,0], [1,0], [2,0], [0,0], [3,0], [4,0] ],
      "walk-left": [ [0,1], [1,1], [2,1], [0,1], [3,1], [4,1] ],
      "walk-up": [ [0,2], [1,2], [2,2], [0,2], [3,2], [4,2] ],
      "walk-down": [ [0,3], [1,3], [2,3], [0,3], [3,3], [4,3] ],
      
      //8 DIRECTIONAL IDLE / WALK ANIMATIONS
      "idle-ne": [ [0,6] ],
      "idle-nw": [ [0,5] ],
      "idle-se": [ [0,7] ],
      "idle-sw": [ [0,4] ],
      "walk-ne": [ [0,6], [1,6], [2,6], [0,6], [3,6], [4,6] ],
      "walk-nw": [ [0,5], [1,5], [2,5], [0,5], [3,5], [4,5] ],
      "walk-se": [ [0,7], [1,7], [2,7], [0,7], [3,7], [4,7] ],
      "walk-sw": [ [0,4], [1,4], [2,4], [0,4], [3,4], [4,4] ],
      
      // "fire": [ [0,4], [1,4], [2,4], [3,4] ],
    }

    this.currentAnimation = config.currentAnimation || "idle-down"; //EQUAL TO KEY IN ANIMATIONS SET
    this.currentAnimationFrame = 0; //WHICH ANIMATION FRAME IN ANIMATION ARRAY SHOULD BE SHOWING
    this.animationFrameLimit = config.animationFrameLimit || 18; //HOW MANY GAME LOOP FRAMES TO SHOW EACH SPRITE SHEET CUT FOR // CADENCE
    this.animationFrameProgress = this.animationFrameLimit; //HOW MUCH TIME LEFT BEFORE SHIFTING TO NEXT FRAME

    //REFERENCE GAME OBJECT
    this.gameObject = config.gameObject;
  };

  //FIGURE OUT WHICH ANIMATION AND ANIMATION FRAMES ARE CURRENT
  get frame() {
    let idx = this.currentAnimationFrame % (this.animations[this.currentAnimation].length);
    return this.animations[this.currentAnimation][idx];
  };

  //CALCULATE INTENDED ANIMATION VIA ANIMATIONS OBJECT KEY
  setAnimation(key) {
    console.log('key- ', key);
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

    this.isShadowLoaded && ctx.drawImage(this.shadow, 0, 0, 32, 32, x + 5, y + 5, 23, 23); //NUDGING SHADOWS TO CENTER UNDER NPCS

    // console.log("current pre: " + this.currentAnimationFrame);
    // console.log("frame pre: " + this.frame);
    const [frameX, frameY] = this.frame;

    // console.log("frameX, frameY: " + frameX + "," + frameY);

    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32, frameY * 32, //LEFT / TOP CUT
      32, 32, //SIZE OF CUT
      x, y,
      32, 32 //SIZE OF DRAW
    )
    
    this.updateAnimationProgress();

  }
};