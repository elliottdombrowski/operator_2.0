class DirectionInput {
  constructor() {
    this.heldDirections = [];

    this.map = {
      "KeyW": "up",
      "KeyS": "down",
      "KeyA": "left",
      "KeyD": "right",
      "KeyE": "nw",
      
      // "ArrowUp": "up",
      // "ArrowDown": "down",
      // "ArrowLeft": "left",
      // "ArrowRight": "right",
      "ArrowUp": "ne",
      "ArrowDown": "sw",
      "ArrowLeft": "nw",
      "ArrowRight": "se",
    }
  }

  get direction() {
    return this.heldDirections[0]; //RETURN MOST CURRENT VALID INPUT
  };

  init() {
    //TRACK INPUTS ENTERING HELDDIRECTIONS ARRAY
    document.addEventListener("keydown", e => {
      const dir = this.map[e.code]; //CHECK IF KEY PRESSED IS VALID INPUT

      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      };
    });

    //TRACK INPUTS EXITING HELDDIRECTIONS ARRAY
    document.addEventListener("keyup", e => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      };
    });
  };
};