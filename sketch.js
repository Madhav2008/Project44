var target;
var arrow;
var arrowImg;
var finalPoint;
var finalPointImg;
var man;
var manImg;
var arrowGroup;
var score = 0;
var chances = 6;
var instructionText;
var gameState = 0;

function preload() {
    arrowImg = loadImage("./Images/arrow.png");
    finalPointImg = loadImage("./Images/circle.png");
    manImg = loadImage("./Images/boy.png");
    back = loadImage("./Images/back.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    finalPoint = createSprite(windowWidth - 10, 150, 20, 20);
    finalPoint.addImage(finalPointImg);
    finalPoint.scale = 0.5;
    finalPoint.velocityY = 20;

    target = createSprite(windowWidth - 10, height / 2, 30, 300);
    target.velocityY = 20;
    target.shapeColor = "magenta";

    man = createSprite(100, windowHeight / 2, 10, 10);
    man.addImage(manImg)
    man.scale = 1.2;

    arrow = createSprite(100, windowHeight / 2.5, 10, 10);
    arrow.addImage(arrowImg)
    arrow.scale = 0.3;

    arrowGroup = new Group();
}

function draw() {
    if (gameState === 0) {
        background(back);

        edges = createEdgeSprites();
        finalPoint.bounceOff(edges);

        target.bounceOff(edges);

        fill("white")
        textFont('Tahoma');
        textSize(40)
        instructionText = text("Note = Press 'RIGHT_ARROW' To Aim the blue point", windowWidth / 5, 100);

        finalPoint.y = target.y;

        if (touches.length = 0 || keyDown("RIGHT_ARROW")) {
            chances = chances - 1;
            createArrow();
        }
        if (arrowGroup.isTouching(finalPoint)) {
            score = score + 10;
            arrowGroup.destroyEach();
        }
        fill("white");
        textSize(40);
        textFont('Loopiejuice Regular');
        text("Score : " + score, width / 3, 40);
        text("Chances Left : " + chances, width / 2.2, 40);

        drawSprites();
        if (chances === 0) {
            gameState = 1;
        }
    }
    if (gameState === 1) {
        fill("white");
        textSize(60);
        textFont('Loopiejuice Regular');
        text("GAME OVER", windowWidth / 2.5, windowHeight / 2);
        arrowGroup.visible = false;

    }
}

function createArrow() {
    var arrow = createSprite(100, windowHeight / 2.5, 60, 10);
    arrow.addImage(arrowImg);
    arrow.x = 100;
    arrow.y = windowHeight / 2.5;
    arrow.velocityX = 50;
    arrow.scale = 0.3;
    arrowGroup.add(arrow);
}