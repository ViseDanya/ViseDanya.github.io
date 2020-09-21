game.Platform = me.Entity.extend({
    init: function (x,y) {
        this._super(me.Entity, "init", [x, y,
          { width: game.Platform.width, height: game.Platform.height }]);
        this.body.collisionType = me.collision.types.WORLD_SHAPE;

        this.renderable = new (me.Renderable.extend({
            init : function () {
                this._super(me.Renderable, "init", [0, 0, game.Platform.width, game.Platform.height]);
            },
            destroy : function () {},
            draw : function (renderer) {
                var color = renderer.getColor();
                renderer.setColor('#0000ff');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));

        this.alwaysUpdate = true;
        this.body.ignoreGravity = true;
        this.body.setVelocity(0,-2);

    },

    update : function (dt) {
           this.body.vel.y -= this.body.accel.y;

           if (this.pos.y < -game.Platform.height) {
             game.playScreen.platformManager.removeChild(this);
           }

           // apply physics to the body (this moves the entity)
           this.body.update(dt);

           return true;
       },
});

game.Platform.width = 100;
game.Platform.height = 20;
