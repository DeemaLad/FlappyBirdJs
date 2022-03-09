let cvs = document.getElementById('canvas'); //загружаем canvas
let ctx = cvs.getContext('2d'); // игра в 2d

let bird = new Image(); //Птичка
let bg = new Image();  //background
let fg = new Image(); //foreground
let pipeUp = new Image(); // препятствие сверху
let pipeBottom = new Image(); // препятствие снизу
let gap = 90; //отступ между препятствиями
let xPos = 10; //Положение птички по х
let yPos = 150; //Положение птички по y
let grav = 1.5; //Значение Гравитации
let score = 0; //Счет



bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

document.addEventListener("keydown", moveUp); //Отслеживание на какое-либо действие

function moveUp() {
	yPos-=25;
	
}

//Создание блоков(Препятствий)
let pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}

function draw() {  //Отображаем предметы в Canvas
	ctx.drawImage(bg, 0, 0); //предмет(обьект, который мы рисуем, коорд.х, коорд.y)

	for (let i = 0; i < pipe.length; i++) {  //Цикл, который создает препятствия
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--; 

		if (pipe[i].x == 125) {
			pipe.push({ 						
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height   
																																				
			});
		}

		// Отслеживание прикосновений
		if(xPos + bird.width >= pipe[i].x
		 && xPos <= pipe[i].x + pipeUp.width
		 && (yPos <= pipe[i].y + pipeUp.height
		 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 			location.reload(); // Перезагрузка страницы
 		}

 		if (pipe[i].x == 5) {
 			score++;

 		}



	}
	
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos+=grav; 

	ctx.fillStyle = "#000";
 	ctx.font = "24px Times New Roman";
 	ctx.fillText("Счет: " + score, 10, cvs.height - 20);

	requestAnimationFrame(draw); 
}

pipeBottom.onload = draw;