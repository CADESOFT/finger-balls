
    'use strict';
    function Play() {}
    Play.prototype = {
      create: function() {

        var that= this;
        this.gesture = {
          ev: undefined,
          //hammer: new Hammer(document.getElementById('finger-balls')),
          hammer: new Hammer(this.game.canvas),
          //isGameModeReady: false,
          reset: function() {
            that.gesture.ev = undefined;
          },
          init: function() {
        		this.hammer.on("panleft panright panup pandown panmove panend", function(ev) {
    	    		console.log( ev.type + " gesture detected.");
              if( (ev.type == 'panleft') || (ev.type == 'panright') || (ev.type == 'panup') || (ev.type == 'pandown') || (ev.type == 'panmove')) {
    	    			that.gesture.ev = ev
    	    		} else if(ev.type == 'panend') {
    	    			that.gesture.ev = undefined;
    	    		} else if(ev.type == 'tap') {
    	    			//world.cyclePlayer();
    	    		}
            });
          }
        };

        this.gesture.init();

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.restitution = 0.8;



        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tiles', 'gameTiles');
        //create layer
        this.backgroundlayer = this.map.createLayer('backgroundLayer0');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        //collision on blockedLayer
        this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();

        this.game.world.setBounds(0, 0, this.game.width, this.game.height);

        //this.worldCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.ballCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.checkPointCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.tilesCollisionGroup   = this.physics.p2.createCollisionGroup();

        //then below the collision set up have this
        var tileObjects = this.physics.p2.convertTilemap(this.map, this.blockedLayer);
        for (var i = 0; i < tileObjects.length; i++) {
          var tileBody = tileObjects[i];
          tileBody.setCollisionGroup(this.tilesCollisionGroup);
          tileBody.collides(this.playerCollisionGroup);
          tileBody.collides(this.ballCollisionGroup);

        }


        this.game.physics.p2.updateBoundsCollisionGroup();

        this.worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
        //  4 trues = the 4 faces of the world in left, right, top, bottom order
        this.game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);

        this.createSprites();

      },
      createSprites: function() {
        this.checkpoint = this.createSprite(this.game.width/2 + 100, this.game.height/2 - 100, 'checkpoint', 'checkpoint', {x:90, y:90});
        this.mainBall = this.createSprite(this.game.width/2, this.game.height/2, 'ball1', 'player', {x:10, y:10});
        for(var i=0; i<1; i++) {
          this.createSprite(this.game.width/2 - i*20, this.game.height/4, 'ball2', 'ball', {x:10, y:10});
        }
      },
      createSprite: function(x, y, name, type, size) {
          var ball = this.game.add.sprite(x, y, name);

          this.game.physics.p2.enable(ball, true);
          ball.anchor.setTo(0.5, 0.5);
          //ball.body.velocity.x = this.game.rnd.integerInRange(-150,120);
          //ball.body.velocity.y = this.game.rnd.integerInRange(-120,10);
          ball.body.velocity.x = 0;
          ball.body.velocity.y = 0;
          ball.body.collideWorldBounds = true;
          ball.body.damping = 0;
          ball.body.angularDamping = 0;
          ball.body.bounce = 1;

          if(type === 'player') {
            ball.body.setCircle(size.x);
            var spriteMaterial = this.game.physics.p2.createMaterial('spriteMaterial', ball.body);

            //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
            //  those 2 materials collide it uses the following settings.
            //  A single material can be used by as many different sprites as you like.
            var contactMaterial = this.game.physics.p2.createContactMaterial(spriteMaterial, this.worldMaterial);
            contactMaterial.friction = 0;     // Friction to use in the contact of these two materials.
            contactMaterial.restitution = 1.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
            contactMaterial.stiffness = 1e7;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
            contactMaterial.relaxation = 3;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
            contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
            contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
            contactMaterial.surfaceVelocity = 0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

            ball.body.setCollisionGroup(this.playerCollisionGroup);

            ball.body.collides(this.checkPointCollisionGroup, function(a,b) {
              console.log('player collided with check',a,b);
            });

            ball.body.collides(this.ballCollisionGroup, function(a,b) {
              console.log('player collided with ball',a,b);
            });

            ball.body.collides(this.tilesCollisionGroup, function(a,b) {
              console.log('player collided with layer',a,b);
            });

          } else if(type === 'ball') {
            ball.body.setCircle(size.x);
            var spriteMaterial = this.game.physics.p2.createMaterial('spriteMaterial', ball.body);

            //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
            //  those 2 materials collide it uses the following settings.
            //  A single material can be used by as many different sprites as you like.
            var contactMaterial = this.game.physics.p2.createContactMaterial(spriteMaterial, this.worldMaterial);
            contactMaterial.friction = 0;     // Friction to use in the contact of these two materials.
            contactMaterial.restitution = 1.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
            contactMaterial.stiffness = 1e7;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
            contactMaterial.relaxation = 3;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
            contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
            contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
            contactMaterial.surfaceVelocity = 0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

            ball.body.setCollisionGroup(this.ballCollisionGroup);

            ball.body.collides(this.checkPointCollisionGroup, function(a,b) {
              console.log('ball collided with check',a,b);
            });

            ball.body.collides(this.playerCollisionGroup, function(a,b) {
              console.log('ball collided with player',a,b);
            });

            ball.body.collides(this.tilesCollisionGroup, function(a,b) {
              console.log('ball collided with layer',a,b);
            });

          } else if(type === 'checkpoint') {
            ball.body.setRectangle(size.x, size.y);
            ball.body.setMaterial(this.worldMaterial);
            ball.body.kinematic = true; // Don't move

            ball.body.setCollisionGroup(this.checkPointCollisionGroup);

            ball.body.collides(this.playerCollisionGroup, function(a,b) {
              console.log('checkpoint collided',a,b);
            });
            ball.body.collides(this.ballCollisionGroup, function(a,b) {
              console.log('checkpoint collided',a,b);
            });

          }

          return ball;
      },
      update: function() {


    		if( this.gesture.ev && (this.gesture.ev.type === 'panleft' || this.gesture.ev.type === 'panright' || this.gesture.ev.type === 'panmove')) {

    			//console.log(this.gesture.ev);
    			this.mainBall.body.velocity.x -= this.gesture.ev.velocityX*300;
    			this.mainBall.body.velocity.y -= this.gesture.ev.velocityY*300;

    		}

          //this.game.physics.p2.collide(this.ball1, this.ball2, this.die, null, this);

          //this.ball1.body.velocity.x *= 0.99;
          //this.ball2.body.velocity.x *= 0.99;

      },
      clickListener: function() {
        this.game.state.start('gameover');
      }
    };

    module.exports = Play;
