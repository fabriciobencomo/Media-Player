function Autoplay(){
    Autoplay.prototype.run = function(player){
        if(!player.getMute){
            player.sound = true;
        }
        player.mute();
        player.play();
    }
}

export default Autoplay;
