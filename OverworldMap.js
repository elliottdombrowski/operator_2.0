//HANDLES DYNAMICALLY RENDERED GAME MAPS

class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
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
    lowerSrc: "/assets/apt-1.png",
    upperSrc: "/assets/apt-1-upper.png",
    //CREATES GAME OBJECTS DYNAMICALLY PER MAP
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(16),
        y: utils.withGrid(12),
      }),
      // npc1: new Person({
      //   x: utils.withGrid(20),
      //   y: utils.withGrid(12),
      //   src: '/assets/sprite-template.png'
      // })
    }
  },
};