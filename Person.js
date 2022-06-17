class Person extends GameObject {
  constructor(config) {
    super(config);

    this.movingProgressRemaining = 16; //TRACKS MOVEMENT PROGRESS WITHIN GRID
  }
}