
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gravity = 0.5 ;

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player{
    constructor(){
        this.position = {
            x : 100 , y :150
        }
        this.width = 30;
        this.height = 60;
        this.velocity = {
            x : 0, y : 0
        }
    }
    draw(){
        c.fillStyle = "purple";
        c.fillRect(this.position.x , this.position.y , this.width, this.height)
    }
    update(){
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }
        else{
            this.velocity.y = 0;
        }
    }
}
class Platform {
    constructor({ x , y }){
        this.position = {
            x : x , y : y
        }
        this.width = 200;
        this.height = 20;
    }
    draw(){
        c.fillStyle = "brown";
        c.fillRect(this.position.x , this.position.y , this.width, this.height)
    }
}


const player = new Player();
const platforms = [new Platform({x : 300 , y : 350}) , new Platform({x : 720 , y : 150}), new Platform({x : 1140 , y : 225})];
const keys = {
    right: {
        pressed : false
    },
    left: {
        pressed : false
    }
}

let scrollOffset = 0;

function animate(){ 
    requestAnimationFrame(animate)
    c.clearRect(0 , 0 , canvas.width , canvas.height);
    player.update();
    platforms.forEach(platform =>{platform.draw();})
    //side scroller
    if(keys.right.pressed && player.position.x < 450){
        player.velocity.x = 3;
    }
    else if(keys.left.pressed && player.position.x > 50){
        player.velocity.x = -3;
    }
    else{
        player.velocity.x = 0;
      
    }
    if (keys.right.pressed){
        scrollOffset += 3;
        platforms.forEach(platform =>{platform.position.x += -3;})
    }
    else if (keys.left.pressed){
        scrollOffset += -3;
        platforms.forEach(platform =>{platform.position.x += 3;})
    }
    //platform collision detector
    platforms.forEach(platform =>{
    if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0;
    }
    })
 
    if (scrollOffset > 2900){
        console.log("You win!");
    }
}
animate();
addEventListener(
    "keydown" , 
    ({keyCode}) => {
    switch (keyCode){
        case 65 :
            {
                console.log("left");
                keys.left.pressed = true;
                break;
            }
        case 87 :
            {
                console.log("up");
                player.velocity.y += -22;
                break;
            }
        case 83 :
            {
                console.log("down");
                break;
            }
        case 68 :
            {
                console.log("right");
                keys.right.pressed = true;
                break;
            }    
    }

}  
)
addEventListener(
    "keyup" , 
    ({keyCode}) => {
    switch (keyCode){
        case 65 :
            {
                console.log("left");
                keys.left.pressed = false;
                break;
            }
        case 87 :
            {
                console.log("up");
                
                break;
            }
        case 83 :
            {
                console.log("down");
                break;
            }
        case 68 :
            {
                console.log("right");
                keys.right.pressed = false;
                break;
            }    
    }

}  
)