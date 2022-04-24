import Autopause from "./plugins/Autopause.js";
import Autoplay from "./plugins/Autoplay.js";

function MediaPlayer(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];

    this._initPlugins();
}

MediaPlayer.prototype._initPlugins = function(){
    const player = {
        play: () => this.play,
        pause: () => this.pause,
        media: this.media,
        get getMute(){
            return this.media.muted;
        },
        set sound(value){
            this.media.muted === value 
        }
    }
    this.plugins.forEach(plugin => {
        plugin.run(this);
    })
}

MediaPlayer.prototype.play = function() {
    this.media.play();
};

MediaPlayer.prototype.pause = function() {
    this.media.pause();
};

MediaPlayer.prototype.togglePlay = function() {
    if (this.media.paused) {
        this.play();
    } else {
        this.pause();
    }
};

MediaPlayer.prototype.mute = function() {
    this.media.muted = true
}

MediaPlayer.prototype.unmute = function() {
    this.media.muted = false;
}

const video = document.querySelector('video');
const player = new MediaPlayer({ el: video, plugins: [new Autoplay(), new Autopause()] });

const button = document.querySelector('button');
button.onclick = () => player.togglePlay();

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(error => {
        console.message(error);
    });
}