class DirectionInput {
  constructor() {
    this.heldDirections = [];

    this.map = {
      "KeyW": "up",
      "KeyS": "down",
      "KeyA": "left",
      "KeyD": "right",
      
      "ArrowUp": "up",
      "ArrowDown": "down",
      "ArrowLeft": "left",
      "ArrowRight": "right",

      "KeyF": "fire", //fire right
    }
  }

  get direction() {
    //REFACTOR LATER.

    //CHECKING 0TH AND 1ST ARRAY POSITIONS TO SUPPORT 8 DIRECTIONAL MOVEMENT.
    //IF NO VALID COMBINATION OF KEYS, RETURN FIRST VALID DIRECTION
    if (this.heldDirections[0] === 'up' && this.heldDirections[1] === 'right' || this.heldDirections[0] === 'right' && this.heldDirections[1] === 'up') {
      return 'ne';
    } else if (this.heldDirections[0] === 'up' && this.heldDirections[1] === 'left' || this.heldDirections[0] === 'left' && this.heldDirections[1] === 'up') {
      return 'nw';
    } else if (this.heldDirections[0] === 'down' && this.heldDirections[1] === 'left' || this.heldDirections[0] === 'left' && this.heldDirections[1] === 'down') {
      return 'sw';
    } else if (this.heldDirections[0] === 'down' && this.heldDirections[1] === 'right' || this.heldDirections[0] === 'right' && this.heldDirections[1] === 'down') {
      return 'se';
    } else return this.heldDirections[0];
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