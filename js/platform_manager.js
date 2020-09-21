game.PlatformManager = me.Container.extend({
    init: function () {
        this._super(me.Container, "init");

        this.onChildChange = function () {
            this.updateChildBounds();
        };

        for(ypos = 0; ypos < me.game.viewport.height; ypos+= 2 * game.Platform.height){
          this.generatePlatform(ypos);
        }

    },


    update: function (time) {
        this._super(me.Container, "update", [time]);

        if (this.childBounds.bottom <= me.game.viewport.height) {
          this.generatePlatform(this.childBounds.bottom + game.Platform.height);
        }

        this.updateChildBounds();

        return true;
    },

    generatePlatform: function(ypos) {
      xpos = me.Math.random(0,me.game.viewport.width-game.Platform.width);
      new_platform = me.pool.pull("platform", xpos, ypos);
      this.addChild(new_platform);
    }
});
