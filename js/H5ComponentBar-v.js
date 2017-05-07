//柱状图表组件对象
var h5ComponentBarV = function(name, cfg) {
	var component = new h5ComponentBase(name, cfg);
	
	$.each(cfg.data, function (index, item) {
		var line = $('<div class="line"></div>');
		var name = $('<div class="name"></div>');
		var rate = $('<div class="rate"></div>');
		var per = $('<div class="per"></div>');
		var width = item[1] * 100 + '%';
		var bgStyle = '';
		
		if (item[2]) {
			var bgStyle = 'style="background-color:' + item[2] + '"';
		}
		
		var margin = (cfg.height/2) / cfg.data.length / 2;
		line.css('margin-top', margin + 'px');
		rate.css('width', width);//固定宽度
		rate.html('<div class="bg"'+ bgStyle +'></div>');//生长动画
		name.text(item[0]);
		per.text(width);
		
		line.append(name).append(rate).append(per);
		component.append(line);
	});
	
	return component;
}
