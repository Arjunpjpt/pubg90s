var AM = new AssetManager();

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;

    //console.log(this.spriteSheet.width);

    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}


// no inheritance
function NotMovingElement(game, spritesheet,thex,they, theimgwidth,theimgheight,speed) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.myspeed = speed;
};

NotMovingElement.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight);
};

NotMovingElement.prototype.update = function () {
    //this.x-=this.myspeed;
    if(this.x< -this.myimgwidth) this.x = 800;
};
//



function Background(game) {
    Entity.call(this, game, 0, 0);
    this.r = 135;
    this.b = 206;
    this.g = 250;
    this.radius = 200;
    dayandnight = 1;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
    this.r-=dayandnight;
    this.b -=dayandnight;
    this.g -=dayandnight;

    if(this.r <= 0 &&this.b <= 0 &&this.g <= 0) {
        dayandnight = -1;
    }

    if(this.r >= 135 &&this.b >= 206 &&this.g >= 250) {
        dayandnight = 1;
    }

    Entity.prototype.update.call(this);
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "rgb("+ this.r+","+ this.b+","+this.g+")";
    ctx.fillRect(0,0,1400,750);
    //ctx.drawImage(bgImg,0,0);
    Entity.prototype.draw.call(this);
}

function Gound(game, spritesheet) {
    this.x = 0;
    this.y = 400;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;

};

Gound.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Gound.prototype.update = function () {
    // this.x-=this.myspeed;
    // if(this.x< -this.myimgwidth) this.x = 800;
};



// no inheritance
function Sun(game, spritesheet,thex,they, theimgwidth,theimgheight,speed) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.myspeed = speed;
};

Sun.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight);
};

Sun.prototype.update = function () {
    this.y+=this.myspeed;
    if(this.y>  550) this.y = -200;

    this.x+=this.myspeed;
    if(this.x> 800) this.x = -300;
};








// no inheritance
function Land(game, spritesheet
    ,thex,they, theimgwidth,theimgheight
    ,sheetX, sheetY, sheetW, sheetH) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;


    this.sheetX = sheetX;
    this.sheetY = sheetY;
    this.sheetW = sheetW;
    this.sheetH = sheetH;

    //this.myspeed = speed;
};

Land.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight,
                   this.sheetX, this.sheetY,this.sheetW,this.sheetH);
};

Land.prototype.update = function () {
    // this.y+=this.myspeed;
    // if(this.y>  550) this.y = -200;

    // this.x+=this.myspeed;
    // if(this.x> 800) this.x = -300;
};


function Player(sx,sy,sw,sh,cx,cy,cw,ch,img) {
    this.sheetX = sx;
    this.sheetY = sy;
    this.sheetWidth = sw;
    this.sheetHeight = sh;
    this.canvasX = cx;
    this.canvasY = cy;
    this.canvasWidth = cw;
    this.canvasHeight = ch;
    this.img =img;
    this.lastDir = 38;
    this.speed = 15;
}

Player.prototype.goForward = function(dir) {
    //console.log("go");
    switch(dir) {
      case 38:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;

            var temp = this.canvasY;
            temp-=this.speed;
            //var temp = -1;
            if (temp >-30) {
                console.log(temp);
                this.canvasY -=this.speed;
            }
            // var temp = this.canvasY;

            // if(this.outOfBound(100,temp)) this.canvasY -=this.speed;
            
            if(this.sheetX >= 576) {
                this.sheetX =0;
            }
        } else {
            this.sheetX = 0;
            this.sheetY = 0;
            this.lastDir =dir;
        }
        break;
      case 40:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            var temp = this.canvasY;
            temp+=this.speed + this.canvasHeight;
            //var temp = -1;
            if (temp < 750) {
                console.log(temp);
                this.canvasY +=this.speed;
            }
            if(this.sheetX >= 576) {
                this.sheetX =0;
            }
        } else {
            this.sheetX = 0;
            this.sheetY = 128;
            this.lastDir =dir;
        }
        break;
      case 37:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            var temp = this.canvasX;
            temp-=this.speed;
            //var temp = -1;
            if (temp >-20) {
                console.log(temp);
                this.canvasX -=this.speed;
            }
            if(this.sheetX >= 576) {
                this.sheetX =0;
            }
        } else {
            this.sheetX = 0;
            this.sheetY = 64;
            this.lastDir =dir;
        }
        break;
      case 39:
        if(this.lastDir == dir) {
            //console.log("yes");
            this.sheetX += 64;
            var temp = this.canvasX;
            temp+=this.speed + this.canvasWidth;
            //var temp = -1;
            if (temp < 1410) {
                console.log(temp);
                this.canvasX +=this.speed;
            }
            if(this.sheetX >= 576) {
                this.sheetX =0;
            }
        } else {
            this.sheetX = 0;
            this.sheetY = 192;
            this.lastDir =dir;
        }
        break;
      default:
        // code block
    }
}

Player.prototype.update = function() {

}

Player.prototype.draw = function (ctx) {
    //console.log("inside draw");
    ctx.drawImage(this.img,
        this.sheetX, this.sheetY,  // source from sheet
        this.sheetWidth, this.sheetHeight, // width and height of source
        this.canvasX, this.canvasY, // destination coordinates
        this.canvasWidth, this.canvasHeight); // destination width and height
}

function Redstone(game, spritesheet,thex,they, theimgwidth,theimgheight,speed) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.myspeed = speed;
    this.bulletFire="2";
};
Redstone.prototype.bulletFireOn = function(direction){
    this.bulletFire = direction;

    // console.log(this.bulletFire+"-----"+this.x);
    // this.bulletFire = direction;
}
Redstone.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight);
};

Redstone.prototype.update = function () { 
    //83 = down //87=up //68=right // 65=left
    console.log("from inside----==="+ this.bulletFire);
    if(this.x<0 || this.x>1400|| this.y<0 || this.y>750){
        this.x = 1450;
        this.y = 790;
    }
    // this.x +=1;
    if(this.bulletFire=="83"){
        this.y += 60;
    }
    if(this.bulletFire=="87"){
        this.y -= 60;
    }
    if(this.bulletFire=="68"){
        this.x += 60;
        
    }
    if(this.bulletFire=="65"){
        this.x -=60;
    }
    // if(this.x>600) this.x=100;
    //this.x-=this.myspeed;
    // if(this.x< -this.myimgwidth) this.x = 800;
};
//Redstone 2
function Redstone1(game, spritesheet,thex,they, theimgwidth,theimgheight,speed) {
    this.x = thex;
    this.y = they;
    this.myimgwidth = theimgwidth;
    this.myimgheight = theimgheight;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.myspeed = speed;
    this.bulletFire="2";
};
Redstone1.prototype.bulletFireOn = function(direction){
    this.bulletFire = direction;

    // console.log(this.bulletFire+"-----"+this.x);
    // this.bulletFire = direction;
}
Redstone1.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,this.myimgwidth,this.myimgheight);
};

Redstone1.prototype.update = function () { 
    //83 = down //87=up //68=right // 65=left
    console.log("from inside----==="+ this.bulletFire);
    if(this.x<0 || this.x>1400|| this.y<0 || this.y>750){
        this.x = 1450;
        this.y = 790;
    }
    // this.x +=1;
    if(this.bulletFire=="40"){
        this.y += 60;
    }
    if(this.bulletFire=="38"){
        this.y -= 60;
    }
    if(this.bulletFire=="39"){
        this.x += 60;
        
    }
    if(this.bulletFire=="37"){
        this.x -=60;
    }
    // if(this.x>600) this.x=100;
    //this.x-=this.myspeed;
    // if(this.x< -this.myimgwidth) this.x = 800;
};





AM.queueDownload("./img/suitMan.png");


AM.queueDownload("./img/416.png");
AM.queueDownload("./img/akm.png");
AM.queueDownload("./img/drink.png");
AM.queueDownload("./img/firstaid.png");
AM.queueDownload("./img/grenade.png");
AM.queueDownload("./img/groza.png");
AM.queueDownload("./img/m9.png");
AM.queueDownload("./img/painkiller.png");

AM.queueDownload("./img/bush.png");
AM.queueDownload("./img/land.png");

AM.queueDownload("./img/sk.png");
AM.queueDownload("./img/redstone.png");





var bgname = "./img/bgfinal.png";

AM.queueDownload(bgname);

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    //canvas.style.backgroundColor

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset(bgname),0,0,1400,750,1));


    var glasssize = 90;




// gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
//     ,353,288,94,94
//     ,0,660,glasssize,glasssize));

//         gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
//         ,353,288,94,94
//         ,1310,660,glasssize,glasssize));

//         gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
//         ,353,288,94,94
//         ,0,0,glasssize,glasssize));

//         gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
//         ,353,288,94,94
//         ,1310,0,glasssize,glasssize));



//     for(var i=0; i<28 ; i++) {
//         gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
//         ,381,290,40,94
//         ,47 + 47*i,0,47,glasssize));
//     }




//     for(var i=0; i<28 ; i++) {
//         gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
//         ,381,290,40,94
//         ,47 + 47*i,660,47,glasssize));
//     }

//     for(var i=0; i<13 ; i++) {
//         gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
//         ,353,330,94,36
//         ,0,73 + 47*i,glasssize,48));
//     }

//     for(var i=0; i<13 ; i++) {
//         gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
//         ,353,330,94,36
//         ,1310,73 + 47*i,glasssize,48));
//     }

    // for(var i=0; i<28 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,381,290,40,94
    //     ,47 + 47*i,650,47,glasssize));
    // }

    //     for(var j=0; j<15 ; j++) {
    //         gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png"),448,128,63,62,0 + 63*i,0+62*j,63,62));
    //     }
    // }

    // for(var i=0; i<27 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,381,290,40,94
    //     ,60+47*i,300,47,glasssize));
    // }


    // for(var i=0; i<5 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,353,330,94,36
    //     ,600,73 + 47*i,glasssize,48));
    // }

    // for(var i=0; i<6 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,353,330,94,36
    //     ,600,380 + 47*i,glasssize,48));
    // }

    // for(var i=0; i<5 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,353,330,94,36
    //     ,900,73 + 47*i,glasssize,48));
    // }

    // for(var i=0; i<6 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,353,330,94,36
    //     ,1100,380 + 47*i,glasssize,48));
    // }



    // for(var i=0; i<8 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,381,290,40,94
    //     ,75+47*i,500,47,glasssize));
    // }



    //tree


    // top left
    for(var i=0; i<9 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,225,425,61,81
        ,80 + 58 * i,75,61,81));
    }

    for(var i=0; i<3 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,225,425,61,81
        ,80, 120 + 50 * i,61,81));
    }

    //bottom right
    for(var i=0; i<5 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,225,425,61,81
        ,1180, 380 + 50 *i,61,81));
    }

    for(var i=0; i<5 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,225,425,61,81
        ,1250, 380 + 50 *i,61,81));
    }


    // gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    // ,351,382,33,67
    // ,600, 300,33,67));

    // sharp stone
    for(var i=0; i<6 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,351,385,33,67
        ,80 + 33*i *3, 380,33,67));
    }

    for(var i=0; i<16 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,351,385,33,67
        ,80 + 33*i, 440,33,67));
    }

    for(var i=0; i<6 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,351,385,33,67
        ,80 + 33*i *3, 590,33,67));
    }


    // circle stone
    for(var i=0; i<10 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,460,460,42,54
        ,680 + 42*i, 605,42,54));
    }

    for(var i=0; i<10 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,460,460,42,54
        ,680 + 42*i, 380,42,54));
    }

 

    for(var i=0; i<2 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,460,460,42,54
        ,740 + 42*i*6, 540,42,54));
    }

    for(var i=0; i<2 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,460,460,42,54
        ,740 + 42*i*6, 580,42,54));
    }


    for(var i=0; i<2 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,460,460,42,54
        ,860, 420 + 54*i,42,54));
    }

    //flowers
    for(var i=0; i<6 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,224,318,30,30
        ,1060 + 30*i, 145,30,30));
    }
    for(var i=0; i<6 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,224,318,30,30
        ,1060 + 30*i, 170,30,30));
    }

    for(var i=0; i<6 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,224,318,30,30
        ,1060 + 30*i, 190,30,30));
    }

    for(var i=0; i<2 ; i++) {
        gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
        ,128,385,93,125
        ,750 , 80 + 100*i,93,125));
    }


    // for(var i=0; i<6 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,224,318,30,30
    //     ,1060 + 30*i, 210,30,30));
    // }
    
    // status
    gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    ,415,451,35,63
    ,1130, 150, 35,63));


    // for(var i=0; i<2 ; i++) {
    //     gameEngine.addEntity(new Land(gameEngine, AM.getAsset("./img/land.png")
    //     ,225,417,63,93
    //     ,400, 60 + 60 * i,63,93));
    // }




        gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/416.png"),300,150,50,50,1));
    gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/akm.png"),300,200,50,50,1));
    gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/drink.png"),150,150,50,50,1));
    gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/firstaid.png"),200,150,50,50,1));

    gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/grenade.png"),250,150,50,50,1));
    gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/groza.png"),300,250,50,50,1));
    gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/m9.png"),350,150,50,50,1));
    gameEngine.addEntity(new NotMovingElement(gameEngine, AM.getAsset("./img/painkiller.png"),150,200,50,50,1));
    
    gameEngine.addEntity(new Redstone1(gameEngine, AM.getAsset("./img/redstone.png"),1401,751,50,50,1));
    gameEngine.addEntity(new Redstone(gameEngine, AM.getAsset("./img/redstone.png"),1401,751,50,50,1));
    gameEngine.addEntity(new Player
        (0,0,64,64,100,100,100,100,AM.getAsset("./img/sk.png")));


    gameEngine.addEntity(new Player
        (0,0,64,64,100,100,100,100,AM.getAsset("./img/suitMan.png")));
    // gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/guy.jpg")));

    gameEngine.start();
    console.log("All Done!");
});

// var keysDown = {};
// try {
//     if (window.addEventListener) {
//         window.addEventListener("keydown", function (v) {keysDown[v.keyCode] = true;}, false);
//         window.addEventListener("keyup", function (v) {delete keysDown[v.keyCode];}, false);
//     } else if (document.attachEvent) {
//         document.attachEvent("onkeydown", function (v) {keysDown[v.keyCode] = true;});
//         document.attachEvent("onkeyup", function (v) {delete keysDown[v.keyCode];});
//     } else if (window.attachEvent) {
//         window.attachEvent("onkeydown", function (v) {keysDown[v.keyCode] = true;});
//         window.attachEvent("onkeyup", function (v) {delete keysDown[v.keyCode];});
//     } else {
//         document.addEventListener("keydown", function (v) {keysDown[v.keyCode] = true;}, false);
//         document.addEventListener("keyup", function (v) {delete keysDown[v.keyCode];}, false);
//     }
// } catch (e) {
//     alert("Keys don't work!\nError: "+e);
// }

// var update = function () {
//     if (38 in keysDown) { // Player holding up
//         console.log("Key Up Event - Char " );
//     }
//     if (40 in keysDown) { // Player holding down
       
//     }
//     if (37 in keysDown) { // Player holding left
       
//     }
//     if (39 in keysDown) { // Player holding right
        
//     }
// };
// setInterval(update,10);







// function Player(game) {
//     this.animation = new Animation(AM.getAsset("./img/sk.png"), 64, 0, 64, 64, 0.05, 1, true, false);

//     this.northanimation = new Animation(AM.getAsset("./img/sk.png"), 64, 0, 64, 64, 0.05, 8, true, false);

//     this.jumpAnimation = new Animation(AM.getAsset("./img/runingman.png"), 0, 885, 165, 295, 0.05, 28, false, false);
//     this.jumping = false;
//     this.north = false;
//     this.radius = 100;
//     this.ground = 400;
//     Entity.call(this, game, 100, 400);
// }

// Player.prototype = new Entity();
// Player.prototype.constructor = Player;

// Player.prototype.update = function () {
//     if (this.game.space) this.jumping = true;
//     if (this.jumping) {
//         if (this.jumpAnimation.isDone()) {
//             this.jumpAnimation.elapsedTime = 0;
//             this.jumping = false;
//         }
//         var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
//         var totalHeight = 100;

//         if (jumpDistance > 0.5)
//             jumpDistance = 1 - jumpDistance;

//         //var height = jumpDistance * 2 * totalHeight;
//         var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
//         this.y = this.ground - height;
//     } 
//     Entity.prototype.update.call(this);
// }

// Player.prototype.draw = function (ctx) {
//     // if (this.jumping) {
//     //     this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1);
//     // }
//     // else {
//     //     this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1.5);
//     // }
//     if (this.north) {
//         this.northnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1);
//     }
//     else {
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1.5);
//     }
//     Entity.prototype.draw.call(this);
// }


// function Unicorn(game) {
//     this.animation = new Animation(AM.getAsset("./img/runingman.png"), 0, 0, 165, 295, 0.05, 25, true, false);
//     this.jumpAnimation = new Animation(AM.getAsset("./img/runingman.png"), 0, 885, 165, 295, 0.05, 28, false, false);
//     this.jumping = false;
//     this.radius = 100;
//     this.ground = 400;
//     Entity.call(this, game, 100, 400);
// }

// Unicorn.prototype = new Entity();
// Unicorn.prototype.constructor = Unicorn;

// Unicorn.prototype.update = function () {
//     if (this.game.space) this.jumping = true;
//     if (this.jumping) {
//         if (this.jumpAnimation.isDone()) {
//             this.jumpAnimation.elapsedTime = 0;
//             this.jumping = false;
//         }
//         var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
//         var totalHeight = 100;

//         if (jumpDistance > 0.5)
//             jumpDistance = 1 - jumpDistance;

//         //var height = jumpDistance * 2 * totalHeight;
//         var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
//         this.y = this.ground - height;
//     }
//     Entity.prototype.update.call(this);
// }

// Unicorn.prototype.draw = function (ctx) {
//     if (this.jumping) {
//         this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y,0.5);
//     }
//     else {
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,0.5);
//     }
//     Entity.prototype.draw.call(this);
// }

// inheritance 
// function Cheetah(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 165, 295, 12, 0.05, 26, true, 0.5);
//     this.speed = 000;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 100, 390);
// }

// Cheetah.prototype = new Entity();
// Cheetah.prototype.constructor = Cheetah;

// Cheetah.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }

// Cheetah.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }


// function Fire(game) {
//     this.animation = new Animation(AM.getAsset("./img/fire.png"), 0, 0, 64, 128, 0.05, 32, true, false);
//     //this.jumpAnimation = new Animation(AM.getAsset("./img/fire.png"), 0, 885, 165, 295, 0.05, 28, false, false);
//     this.jumping = false;
//     this.radius = 100;
//     this.ground = 100;
//     Entity.call(this, game, 500, 370);
// }

// Fire.prototype = new Entity();
// Fire.prototype.constructor = Fire;

// Fire.prototype.update = function () {
//     this.x -= 3;
//     if (this.x < -64) this.x = 864;
//     Entity.prototype.update.call(this);
// }

// Fire.prototype.draw = function (ctx) {
//     this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,1.5);
//     Entity.prototype.draw.call(this);
// }