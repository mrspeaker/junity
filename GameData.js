const scene = {
  entities: [{
      name: "player",
      pos: [50, 150, 67, 94, 10],
      comps: [
        ["KeyController"],
        ["KeyShooter", 0.15],
        ["Player"],
        ["Renderer", "transparent", "p1_jump.png"]
      ]
    },
    {
      name: "bullet",
      pos: [0, -20, 18, 18, 6],
      comps: [
        ["FlyRight"],
        ["Life", 2],
        ["Renderer", "#ffff00"]
      ]
    },
    {
      name: "ghost",
      pos: [320, 160, 69, 71, 5],
      comps: [
        ["ClickRegener", 10],
        ["Damage"],
        ["Life", 5],
        ["LifeRenderer"],
        ["Wander", 2],
        ["MoveTowards", "player", 1],
        ["Renderer", "transparent", "p3_duck.png"]
      ]
    },
    {
      name: "spawner",
      pos: [290, 120, 32, 32, 1],
      comps: [
        ["Damage", 5],
        ["Renderer", "#222222"],
        ["Spawner", "ghost", 2]
      ]
    },
    {
      name: "spawnerBoss",
      pos: [150, 50, 70, 70, 11],
      comps: [
        //["Damage", 10],
        ["Spawner", "spawner", 2.4],
        ["Renderer", "", "tochLit.png"],
        ["MoveSine", "x", 0.7, 4],
        ["MoveSine", "y", 0.3, 2],
        ["MoveSine", "y", 0.4, 2],
        //["ColorChange", 2.4]
      ]
    }
  ]
};

export default scene;
