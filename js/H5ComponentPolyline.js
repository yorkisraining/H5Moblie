//折线图
var h5ComponentPolyline = function(name, cfg) {

	var component = new h5ComponentBase(name, cfg);
	
	// 绘制网格线
	// 背景层
	var w = cfg.width;
	var h = cfg.height;
	
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);
	
	// 水平分成 10 份
	// 垂直（根据项目个数分）
	var horzlLine = 10;
	var vertclLine = cfg.data.length + 1;
	var text_w = (w/cfg.data.length >> 0)/2;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#aaa';
	for (var i=0; i<horzlLine + 1; i++) {
		var y = (h/horzlLine) * i;
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
	}
	for (var i=0; i<vertclLine + 1; i++) {
		var x = (w/vertclLine) * i;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		
		if (cfg.data[i]) {
			var texts = $('<div class="text"></div>');
			texts.text( cfg.data[i][0] );
			
			texts.css({
				'width': text_w,
				'left': (x/2 + text_w/4 + 5)>>0,
				'top': h/2
			});
			
			component.append(texts);
		}
		
	}
	ctx.stroke();
	ctx.closePath();
	
	//绘制折线
	//数据层
	var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = ctx.width = w;
		canvas.height = ctx.height = h;
		component.append(canvas);
		
	function draw(per) {
		ctx.clearRect(0, 0, w, h);	
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#ff8878';
		ctx.fillStyle = 'rgba(0, 0, 0, 1)';
		//画点和数据
		var xdata = 0;
		var ydata = 0;
		for ( i in cfg.data) {
			var item = cfg.data[i][1];
			xdata = (w/vertclLine) * i + w/vertclLine;
			ydata = h - (item * h * per);
			ctx.moveTo(xdata, ydata);
			ctx.arc(xdata, ydata, 5, .5*Math.PI, 2.5*Math.PI);
			ctx.fillText((item * 100)+'%', xdata - 10, ydata - 10);
		}
		
	//	ctx.fillStyle = 'rgba(255, 135, 120, 0.3)';
	//	ctx.lineTo(xdata, h);
	//	ctx.lineTo(w/vertclLine, h);
	//	ctx.fill();
	
		//画线
		ctx.moveTo(w/vertclLine, h-(cfg.data[0][1]*h*per));
		for ( i in cfg.data) {
			var item = cfg.data[i][1];
			xdata = (w/vertclLine) * i + w/vertclLine;
			ydata = h - (item * h * per);
			ctx.lineTo(xdata, ydata + 5);
		}
		
		ctx.stroke();
		
		ctx.fillStyle = 'rgba(255, 135, 120, 0.3)';
		ctx.lineTo(xdata, h);
		ctx.lineTo(w/vertclLine, h);
		ctx.fill();
		
		ctx.closePath();
	}
	
	
	component.on('onload', function() {
		// 生长动画
		var s = 0;
		for (i=0; i<100; i++) {
			setTimeout(function() {
				s += .01;
				draw(s);
			}, i*10 + 500)
		}
	});
	component.on('onleave', function() {
		// 退场动画
		var s = 1;
		for (i=0; i<100; i++) {
			setTimeout(function() {
				s -= .01;
				draw(s);
			}, i*10)
		}
	});
	
	return component;
}