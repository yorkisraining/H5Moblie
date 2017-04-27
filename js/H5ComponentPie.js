//饼图
var h5ComponentPie = function(name, cfg) {

	var component = new h5ComponentBase(name, cfg);

	
	var w = cfg.width;
	var h = cfg.height;
	
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	$(canvas).css('z-index', 1);
	component.append(canvas);
	
	var r = w/2;
	
	// 底图层
	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.lineWidth = 1;
	ctx.arc(r, r, r, 0, 2*Math.PI);
	ctx.fill();
	
	//数据层
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	$(canvas).css('z-index', 2);
	component.append(canvas);
	
	var colors = ['red', 'green', 'blue', 'orange', 'gray'];
	var starAngle = 1.5 * Math.PI;
	var endAngle = 0;
	var allAngle = 2*Math.PI;
	
	

	var num = cfg.data.length;
	for (var i=0; i<num; i++) {
		var item = cfg.data[i];
		var color = item[2] || (item[2] = colors.pop());
		
		endAngle = starAngle + allAngle * item[1];
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = .1;
		
		ctx.moveTo(r, r);
		ctx.arc(r, r, r-2, starAngle, endAngle);
		ctx.fill();
		ctx.stroke();
		starAngle = endAngle;
		
		//加入文本
		var texts = $('<div class="text"></div>');
		texts.text(cfg.data[i][0]);
		var per = $('<div class="per"></div>');
		per.text(cfg.data[i][1] * 100 + '%');
		texts.append(per);
		
		var x = r + Math.sin(.5*Math.PI - starAngle) * r;
		var y = r + Math.cos(.5*Math.PI - starAngle) * r;
		
		if (x > w/2) {
			texts.css('left', x/2 + 5);
		} else {
			texts.css('right', (w-x)/2 + 5);
		}
		if (y > h/2) {
			texts.css('top', y/2 + 5);
		} else {
			texts.css('bottom', (h-y)/2 + 5);
		}
		if (cfg.data[i][2]) {
			texts.css('color', cfg.data[i][2]);
		}
		texts.css('opacity', 0);
		texts.css('transition', 'all 1s ' + i*.1 +'s');
		component.append(texts);
	}
	
	//蒙版层
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	$(canvas).css('z-index', 3);
	component.append(canvas);
	
	ctx.fillStyle = '#fff';
	ctx.lineWidth = 1;
	
	function draw(per) {
		
		ctx.clearRect(0, 0, w, h);
		
		ctx.beginPath();
		
		ctx.moveTo(r, r);
		if (per <= 0) {
			ctx.arc(r, r, r, 0, 2*Math.PI);
		} else {
			ctx.arc(r, r, r, starAngle, starAngle+2*Math.PI*per, true);
		}
		
		
		ctx.fill();
		
		if (per >= 1 ) {
			component.find('.text').css('opacity', 1);
		}
		if (per <= 0 ) {
			component.find('.text').css('opacity', 0);
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