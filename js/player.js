game.Player = me.Entity.extend({
    init: function () {
        this._super(me.Entity, "init", [me.game.viewport.width / 2 - game.Player.width / 2, 0,
          { width: game.Player.width, height: game.Player.height }]);
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.maxX = me.game.viewport.width - this.width;
        this.renderable = new (me.Renderable.extend({
            init : function () {
                this._super(me.Renderable, "init", [0, 0, game.Player.width, game.Player.height]);
            },
            destroy : function () {},
            draw : function (renderer) {
                var color = renderer.getColor();
                renderer.setColor('#5EFF7E');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));
        this.alwaysUpdate = true;
        this.body.setVelocity(3, 3);

    },

    update : function (dt) {

           if (me.input.isKeyPressed('left'))
           {
               this.body.vel.x -= this.body.accel.x;
           }
           else if (me.input.isKeyPressed('right'))
           {
               this.body.vel.x += this.body.accel.x;
           }
           else
           {
               this.body.vel.x = 0;
           }

           // apply physics to the body (this moves the entity)
           this.body.update(dt);

           // check for collisions
           me.collision.check(this);

           // return true if we moved or if the renderable was updated
           return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
       },

       onCollision : function (response, other) {
        switch (response.b.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                // Simulate a platform object
                if (other.type === "platform") {
                  console.log("ohshit");
                    if (this.body.falling &&
                        !me.input.isKeyPressed('down') &&
                        // Shortest overlap would move the player upward
                        (response.overlapV.y > 0) &&
                        // The velocity is reasonably fast enough to have penetrated to the overlap depth
                        (~~this.body.vel.y >= ~~response.overlapV.y)
                    ) {
                        // Disable collision on the x axis
                        response.overlapV.x = 0;
                        // Repond to the platform (it is solid)
                        return true;
                    }
                    // Do not respond to the platform (pass through)
                    return false;
                }
                break;

            default:
                // Do not respond to other objects (e.g. coins)
                return false;
        }

        // Make the object solid
        return true;
    }
});

game.Player.width = 20;
game.Player.height = 20;
