class Person extends GameObject {
  constructor(config) {
    super(config);

    this.movingProgressRemaining = 16; //TRACKS MOVEMENT PROGRESS WITHIN GRID

    //DIRECTION SET
    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],
    };
  };

  //EXTEND UPDATEPOSITION OFF UPDATE METHOD DEFINED IN GAMEOBJECT.JS
  update(state) {
    this.updatePosition();
  };

  //HANDLING POSITION UPDATES FOR PLAYER / NPC MOVEMENT SPECIFICALLY
  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [props, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }
};