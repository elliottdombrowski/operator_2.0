class GameObject {
  constructor(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/assets/characters/sprite-top-template.png",
    });
  };

  //HANDLE UPDATING STATE FOR GAME OBJECTS
  update() {

  };
};