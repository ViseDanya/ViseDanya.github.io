game.PlayScreen = me.Stage.extend({
    checkIfLoss: function (y) {
        if (y >= this.player.pos.y) {
            this.reset();
        }
    },
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.ColorLayer("background", "#ff0000"), 0);
        this.player = me.pool.pull("player");
        me.game.world.addChild(this.player);

        this.platformManager = new game.PlatformManager();
        me.game.world.addChild(this.platformManager);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.SPACE);
    }
});
