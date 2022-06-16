//HANDLES DYNAMICALLY RENDERED GAME MAPS

class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerImage.src;

    this.upperImage = new Image();
    this.upperImage.src = config.upperImage.src;
  };

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0);
  };

  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0);
  };
};

window.OverworldMaps = {
  ApartmentOne: {
    lowerSrc: "assets/size-test-export.png",
    upperSrc: "",
    //CREATES GAME OBJECTS DYNAMICALLY PER MAP
    gameObjects: {
      hero: new GameObject({
        x: 8,
        y: 6,
      }),
      npc1: new GameObject({
        x: 10,
        y: 6,
        src: '/assets/sprite-template.png'
      })
    }
  },
};