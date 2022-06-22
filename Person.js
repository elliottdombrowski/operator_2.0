class Person extends GameObject {
  constructor(config) {
    super(config);

    this.movingProgressRemaining = 16; //TRACKS MOVEMENT PROGRESS WITHIN GRID
    this.isPlayerControlled = config.isPlayerControlled || false; //FLAGGING WHETHER OR NOT CHARACTER IS PLAYER CONTROLLED

    //DIRECTION SET
    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],
      "ne": ["x", 0.7, "y", -0.7],
      "nw": ["x", -0.7, "y", -0.7],
      "sw": ["x", -0.7, "y", 0.7],
      "se": ["x", 0.7, "y", 0.7],
    };
  };

  //EXTEND UPDATEPOSITION OFF UPDATE METHOD DEFINED IN GAMEOBJECT.JS
  update(state) {
    this.updatePosition();
    this.updateSprite(state);

    //CHECK THAT PLAYER IS NOT CURRENTLY MOVING THROUGH GRID SPACE AND HAS DIRECTION INPUT
    //THEN UPDATE DIRECTION w/ HELD DIRECTION
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
      this.direction = state.arrow;
      this.movingProgressRemaining = 16; //RESET MOVINGPROGRESS COUNTER
    }
  };

  //HANDLING POSITION UPDATES FOR PLAYER / NPC MOVEMENT SPECIFICALLY
  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [prop1, change1, prop2, change2] = this.directionUpdate[this.direction];
      this[prop1] += change1;
      this[prop2] += change2;
      this.movingProgressRemaining -= 1;
    }
  }

  //HANDLING SPRITESHEET UPDATES
  updateSprite(state) {
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
      this.sprite.setAnimation("idle-"+this.direction);
      return;
    }
    
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-"+this.direction);
    };
  };
};