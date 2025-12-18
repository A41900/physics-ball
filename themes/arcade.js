const ThemeDefault = {
  name: "arcade",

  background: {
    image: "./assets/fundo.png",
    size: "cover",
    position: "center",
  },

  player: {
    size: {
      width: 30,
      height: 30,
    },

    sprites: {
      idle: "./assets/pinkbear.png",
      walk: "./assets/pinkbear.png",
      run: "./assets/run.png",
      jump: "./assets/jump.png",
    },

    flipX: true,
  },

  platform: {
    sprite: "./assets/cloud.png",
    scale: 1.4,
    offsetY: -55,
  },

  obstacle: {
    hazard: {
      sprite: "",
    },
    goal: {
      sprite: "./assets/castle.png",
    },
  },
};

export default ThemeDefault;
