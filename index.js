var gpio = require('rpi-gpio');


function start(){
	gpio.setup(12, gpio.DIR_OUT, write);
}
var contador = 0;

function write(){
	gpio.write(12, contador & 1, function(err){
		if(err) throw err;
		console.log("Muda");
	});
	
	if(contador++ == 60)
		closeGPIO();
	else
		setTimeout(function(){ write(); },200);
}

function closeGPIO(){
	gpio.destroy(function(){
		console.log("Fim de programa");
	});
}

start();
