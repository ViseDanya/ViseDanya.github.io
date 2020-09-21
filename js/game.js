/*!
 *
 *   melonJS
 *   http://www.melonjs.org
 *
 *   Step by step game creation tutorial
 *
 **/

var game = {

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {parent : "screen", scale : 'auto'})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        // set the "Play/Ingame" Screen Object
        this.playScreen = new game.PlayScreen();
        me.state.set(me.state.PLAY, this.playScreen);

        // add our player entity in the entity pool
        me.pool.register("player", game.Player);
        me.pool.register("platform", game.Platform);

        // start the game
        me.state.change(me.state.PLAY);
    }
};
