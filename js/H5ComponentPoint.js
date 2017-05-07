//散点图表组件对象

var h5ComponentPoint = function(name, cfg) {
	var component = new h5ComponentBase(name, cfg);
	
	var base = cfg.data[0][1]; // 以第一个数据的比例为大小的100%
	
	//输出每一个point
	$.each(cfg.data, function(index, item){
		var point = $('<div class="point point_'+ index +'"></div>');
		
		var name = $('<div class="name">'+ item[0] +'</div>');
		var rate = $('<div class="per">'+ item[1]*100 +'%</div>');
		
		name.append(rate);
		point.append(name);
		
		var per = (item[1]/base*100) + '%';
		if (item[2]) {
			point.css('backgroundColor', item[2]);
		}
		if (item[3]!==undefined&&item[4]!==undefined) {
			point.css({
				'left': item[3],
				'top': item[4],
			});
		}
		point.css('transition','all 1s '+index*.5+'s');
		point.width(per).height(per);
		component.append(point);
	})
	
	component.find('.point').on('click',function(){

        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');

        return false;
   }).eq(0).addClass('point_focus')
	
	return component;
}
