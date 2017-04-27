//基本图文组建对象
var h5ComponentBase = function(name, cfg) {
	var cfg = cfg || {};
	var id = ('h2_c_' + Math.random()).replace('0.', '');
	var clsN ='h5_component_' + cfg.type;
	var component = $('<div class="h5_component ' + clsN + ' h5_component_name_' + name + '" id="'+ id +'">');
	
	cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.css && component.css( cfg.css );
	cfg.bg && component.css('background-image', 'url('+ cfg.bg +')')
	
	if(cfg.center === true) {
		component.css({
			'margin-left': (cfg.width/4 * -1),
			left: 50 + '%'
		});
	}
	
	
	component.on('onload', function() {
		component.addClass(clsN + '_load').removeClass(clsN  + '_leave');
		cfg.animateIn && component.animate(cfg.animateIn);
	});
	component.on('onleave', function() {
		component.addClass(clsN + '_leave').removeClass(clsN +'_load');
		cfg.animateOut && component.animate(cfg.animateOut);
	});
	
	
	
	return component;
}
