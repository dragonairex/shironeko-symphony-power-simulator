var symphApp=(function () {
	return {
		depInterval:100,
		p:0,t:0,pWidth:0,tWidth:0,
		init:function(){

			$("#startButton").click(function(){$("#top").slideUp();});

			this.pWidth=$("#power1").width();
			this.tWidth=$("#time1").width();
			this.pTop=$("#plus1").position().top;
			this.poyon();
		},
		tDep:function(){
			$("#time2").width(this.t*(this.tWidth)/60000);
			$("#time0").text(("0"+(this.t/1000).toFixed(1)).slice (-4));
			if (this.t>=this.depInterval) {
				this.t-=this.depInterval;
				setTimeout("symphApp.tDep()",this.depInterval);
			}
			else {
				this.reset();
				$("#button4").fadeOut("fast");
			}
		},
		reset:function(){
			this.t=0; this.p=0;
			$("#power2").width(0);
			$("#power2").css({"background-color":"#fff"});
			$("#power0").text("");
			$("#effect1").text("0");
			$("#effect2").text("0");
			$("#effect3").text("0");
			$("#effect4").text("0");
			$("#power3").fadeOut();
			$("#plus2").stop().hide();
			$("#powerLabel").fadeOut("fast");
		},
		pAdd:function(x,y){
			this.p+=x;
			if (this.p>10) this.p=10;
			
			if (this.p>=8.5) {
				$("#power2").css({"background-color":"#fff"});
				$("#power0").text("finale");
				$("#power3").fadeIn();
			} else if (this.p>=6.5) {
				$("#power2").css({"background-color":"#FF0E0E"});
				$("#power0").text("IV");
			} else if (this.p>=4.5) {
				$("#power2").css({"background-color":"rgb(23, 216, 39)"});
				$("#power0").text("III");
			} else if (this.p>=2.5) {
				$("#power2").css({"background-color":"#110BFF"});
				$("#power0").text("II");
			} else {
				$("#power2").css({"background-color":"#fff"});
				$("#power0").text("I");
			}

			var stopped=true;
			if (this.t) stopped=false;
			this.t+=y;
			if (this.t>60000)this.t=60000;
			$("#time2").width(this.t*(this.tWidth)/60000);
			$("#time0").text(("0"+(this.t/1000).toFixed(1)).slice (-4));
			if(stopped) {
				setTimeout("symphApp.tDep()",this.depInterval);
				$("#button4").fadeIn("fast");
				$("#powerLabel").fadeIn("fast");
			}
			
			$("#power2").width(this.p*(this.pWidth)/10);
			$("#effect1").text(this.p*5);
			$("#effect2").text(this.p*5);
			$("#effect3").text(this.p*2);
			$("#effect4").text(this.p*10);
			
			var temp=this.pTop+30;
			temp+="px";
			$("#plus4").text(x*10);
			$("#plus6").text(y/1000);
			$("#plus1").stop().css({"top":temp});
			$("#plus2").stop(true,true).hide();
			$("#plus1").animate({"top":"140px"},200);
			$("#plus2").fadeIn(200).fadeTo(500,1).fadeOut(100);		
		},
		poyon:function(){
			$("#con2").stop().animate({"top":"20px"},400).animate({"top":"0px"},100).animate({"top":"10px"},100).animate({"top":"3px"},100).animate({"top":"7px"},100).animate({"top":"5px"},100,function(){setTimeout("symphApp.poyon()",3000)});
		}
	};
})();
$(document).ready(function (){

	symphApp.init();
	$("#button1").on("mouseup",function(){
		symphApp.pAdd(1,10000);
	});
	$("#button2").on("mouseup",function(){
		symphApp.pAdd(2.5,15000);
	});
	$("#button3").on("mouseup",function(){
		symphApp.pAdd(0.5,10000);
	});
	$("#button4").click(function(){
		symphApp.reset();
	});
	$("#con").on("mousedown", function(){
		if (Math.floor(Math.random()*100)==0) $("#button2 .icon").addClass("neta");
		$("#con").stop().fadeOut("fast");
		$("#button1").stop().fadeIn("fast");
		$("#button2").stop().fadeIn("fast");
		$("#button3").stop().fadeIn("fast");
		$("#back2").stop().fadeIn("fast");
		
	});
	$("#left").on("mouseup", function(){
		$("#con").stop().fadeIn();
		$("#button1").stop().fadeOut("fast");
		$("#button2").stop().fadeOut("fast",function(){$("#button2 .icon").removeClass("neta");});
		$("#button3").stop().fadeOut("fast");
		$("#back2").stop().fadeOut("fast");
	});
});