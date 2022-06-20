class Person extends GameObject {
  constructor(config) {
    super(config);

    this.movingProgressRemaining = 16; //TRACKS MOVEMENT PROGRESS WITHIN GRID
    this.isPlayerControlled = config.isPlayerControlled || false; //FLAGGING WHETHER OR NOT CHARACTER IS PLAYER CONTROLLED

    //DIRECTION SET
    this.directionUpdate = {
      // "up": ["y", -1, "x", -1],
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],
    };
  };

  //EXTEND UPDATEPOSITION OFF UPDATE METHOD DEFINED IN GAMEOBJECT.JS
  update(state) {
    // console.log(state);
    this.updatePosition();

    //CHECK THAT PLAYER IS NOT CURRENTLY MOVING THROUGH GRID SPACE AND HAS DIRECTION INPUT
    //THEN UPDATE DIRECTION w/ HELD DIRECTION
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
      this.direction = state.arrow;
      this.movingProgressRemaining = 16; //RESET MOVINGPROGRESS CONTAINER
    }
  };

  //HANDLING POSITION UPDATES FOR PLAYER / NPC MOVEMENT SPECIFICALLY
  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }
};