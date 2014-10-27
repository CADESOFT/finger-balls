
    'use strict';
    function Play() {}
    Play.prototype = {
      create: function() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
  /*      this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
        this.sprite.inputEnabled = true;

        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(1,1);
        this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
        this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

        this.sprite.events.onInputDown.add(this.clickListener, this);
  */

    		this.ball1 = this.game.add.sprite(this.game.width/2, this.game.height/2, 'ball1');

        this.game.physics.p2.enable(this.ball1, true);
    		this.ball1.anchor.setTo(0.5, 0.5);
    		//this.ball1.body.bounce.setTo(1, 1);
  //    this.ball.body.velocity.x = this.game.rnd.integerInRange(-500,500);
        this.ball1.body.velocity.x = 180;
    		this.ball1.body.collideWorldBounds = true;
        //this.ball1.body.setRectangle(33, 78);
        this.ball1.body.setCircle(10);
        this.ball1.body.damping = 0.5;

        this.ball2 = this.game.add.sprite(this.game.width/2 + 50, this.game.height/2 + 15, 'ball2');
        this.game.physics.p2.enable(this.ball2, true);
        this.ball2.anchor.setTo(0.5, 0.5);
        //this.ball2.body.bounce.setTo(1, 1);
        this.ball2.body.setCircle(10);
  //    this.ball.body.velocity.x = this.game.rnd.integerInRange(-500,500);
        this.ball2.body.velocity.x = 0;
        this.ball2.body.collideWorldBounds = true;
        this.ball2.body.damping = 0.5;
        //this.ball2.body.setRectangle(33, 78);

        //this.ball2.body.collide(this.ball, this.die, this);


      },
      die: function(obj1, obj2) {
        console.log('die');
      },
      update: function() {
          //this.game.physics.p2.collide(this.ball1, this.ball2, this.die, null, this);

          //this.ball1.body.velocity.x *= 0.99;
          //this.ball2.body.velocity.x *= 0.99;

      },
      clickListener: function() {
        this.game.state.start('gameover');
      }
    };

    module.exports = Play;
