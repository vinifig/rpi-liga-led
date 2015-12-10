var Express = require("express");
var app = new Express();

var gpio = require('rpi-gpio');

var contador = 0;

app.get('/nodejs/rpi-liga-led/inicia',function(req,res){
	res.end("Iniciou gpio");
	startGPIO();
});

app.get('/nodejs/rpi-liga-led/muda',function(req,res){
	res.end("Mudou");
	write();
});

app.get('/nodejs/rpi-liga-led/finaliza',function(req,res){
	res.end("Fechou porta");
	closeGPIO();
});


function write(){
	gpio.write(12, !(contador++ & 1), function(err){
		if(err) throw err;
		console.log("Muda" + contador);
	});
}

function startGPIO(){
	gpio.setup(12, gpio.DIR_OUT, write);
}

function closeGPIO(){
	gpio.destroy(function(){
		console.log("Fim de programa");
	});
}

app.listen(3000,function(){
	console.log("iniciou porta 3000");
});
