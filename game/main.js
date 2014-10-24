'use strict';

//global variables
var BootState, GameoverState, MenuState, PlayState, PreloadState, game;
window.onload = function () {
  game = new Phaser.Game(320, 320, Phaser.AUTO, 'finger-balls');

  // Game States
  
  game.state.add('boot', BootState);
  
  game.state.add('gameover', GameoverState);
  
  game.state.add('menu', MenuState);
  
  game.state.add('play', PlayState);
  
  game.state.add('preload', PreloadState);
  

  game.state.start('boot');
};