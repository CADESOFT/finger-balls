
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.image('ball1', 'assets/ball1.png');
    this.load.image('ball2', 'assets/ball2.png');
    this.load.image('checkpoint', 'assets/checkpoint.png');

     this.load.tilemap('level1', 'assets/tile1.json', null, Phaser.Tilemap.TILED_JSON);
     this.load.image('gameTiles', 'assets/celianna_tileset_test_map_by_pinkfirefly-d4gfj5x.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
