var Express = require("express");
var app = new Express();

var gpio = require('rpi-gpio');

var contador = 0;

app.get('nodejs/rpi-liga-led/inicia',function(req,res){
	startGPIO();
	res.end("Iniciou porta");
});

app.get('/nodejs/rpi-liga-led/muda',function(req,res){
	write();
	res.end("Mudou");
});

app.get('nodejs/rpi-liga-led/finaliza',function(req,res){
	closeGPIO();
	res.end("Fechou porta");
});


function write(){
	gpio.write(12, contador & 1, function(err){
		if(err) throw err;
		console.log("Muda");
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
	console.log("iniciou");
});