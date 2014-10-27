
    'use strict';
    function Play() {}
    Play.prototype = {
      create: function() {
        this.game.physics.startSystem(Phaser.Physics.P2);
  /*      this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
        this.sprite.inputEnabled = true;

        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(1,1);
        this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
        this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

        this.sprite.events.onInputDown.add(this.clickListener, this);
  */

    		this.ball = this.game.add.sprite(this.game.width/2, this.game.height/2, 'ball');
        this.game.physics.arcade.enable(this.ball);
    		this.ball.anchor.setTo(0.5, 0.5);
    		this.ball.body.bounce.setTo(1, 1);
  //  		this.ball.body.setCircle(11, 12, 12);
  //  		this.ball.body.linearDamping = 0.5;
  //    this.ball.body.velocity.x = this.game.rnd.integerInRange(-500,500);
        this.ball.body.velocity.x = 40;
    		this.ball.body.collideWorldBounds = true;

      },
      update: function() {
        if(this.ball.body.velocity.x > 0)
          this.ball.body.velocity.x -= 0.4;
        else
          this.ball.body.velocity.x -= 0;
      },
      clickListener: function() {
        this.game.state.start('gameover');
      }
    };

    module.exports = Play;
