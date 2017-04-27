//雷达图
var h5ComponentRadar = function(name, cfg) {

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
	
	var r = w/2;
	var side = cfg.data.length;
	
	// 计算多边形的顶点坐标
	// 已知圆心坐标(a,b) 半径 r 角度 deg
	// rad = (2*Math.PI/360) * (360/side) * i;
	// x = a + Math.sin(rad) * r;
	// y = b + Math.cos(rad) * r;
	
	//绘制网格背景
	var isBlue = false;
	for(var s=10; s>0; s--) {
		ctx.beginPath();
		for (var i=0; i<side; i++) {
			var rad = ( 2*Math.PI / 360) * (360/side) * i;
			var x = r + Math.sin(rad) * r * (s/10);
			var y = r + Math.cos(rad) * r * (s/10);
			
			ctx.lineTo(x, y);
		}
		ctx.closePath();
		ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#fff';
		ctx.fill();
	}
	
	//绘制伞骨
	for (var i=0; i<side; i++) {
		var rad = ( 2*Math.PI / 360) * (360/side) * i;
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		
		ctx.moveTo(r, r);
		ctx.lineTo(x, y);
		
		//输出项目文字
		var texts = $('<div class="text"></div>');
		texts.text(cfg.data[i][0]);
		texts.css('transition', 'all .5s ' + i*.1 + 's');
		if (x > w/2) {
			texts.css('left', x/2+5);
		} else {
			texts.css('right', (w-x)/2+5);
		}
		
		if (y > h/2) {
			texts.css('top', y/2+5);
		} else {
			texts.css('bottom', (h-y)/2+5);
		}
		
		if (cfg.data[i][2]) {
			texts.css('color', cfg.data[i][2]);
		}
		texts.css('opacity', 0);
		component.append(texts);
	}
	ctx.strokeStyle = '#e0e0e0';
	ctx.stroke();
	
	//数据层
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);
		
	function draw(per) {
		
		if (per >= 1){
			component.find('.text').css('opacity', 1);
		}
		if (per <= 1){
			component.find('.text').css('opacity', 0);
		}
		
		ctx.clearRect(0, 0, w, h);
		//输出数据折线
		ctx.beginPath();
		ctx.strokeStyle = '#f00';
		for (var i=0; i<side; i++) {
			var rad = ( 2*Math.PI / 360) * (360/side) * i;
			var rate = cfg.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;
			
			
			ctx.lineTo(x, y);
		}
		ctx.closePath()
		ctx.stroke();
		
		//输出点
		ctx.fillStyle = '#ff7676';
		for (var i=0; i<side; i++) {
			var rad = ( 2*Math.PI / 360) * (360/side) * i;
			var rate = cfg.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;
			
			ctx.beginPath();
			ctx.arc(x, y, 5, 0, 2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}
		
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