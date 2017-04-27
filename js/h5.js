//内容管理对象

var H5 = function() {
	this.id = ('h5_' + Math.random()).replace('.0','_');
	this.el = $('<div class="h5" id"' + this.id + '"></div>').hide();
	this.pages = [];
	$('body').append(this.el);
	
	//新增页
	// name 组件名称，加入className中
	//text 页内默认文本（测试用）
	// return H5对象，可以重复使用H5对象支持的方法
	this.addPage = function(name, text) {
		var page = $('<div class="h5_page section"></div>');
		
		if (name != undefined) {
			page.addClass('h5_page_' + name);
		}
		if (text != undefined) {
			page.text(text);
		}
		
		this.el.append(page);
		this.pages.push(page);
		return this;
	};
	
	//新增组件
	this.addComponent = function(name, cfg) {
		var cfg = cfg || {};
		cfg = $.extend({
			type: 'base'
		},cfg);
		
		var component;
		var page = this.pages.slice(-1)[0];
		switch (cfg.type) {
			case 'base':
				component = new h5ComponentBase(name, cfg);
			break;
			
			default:
		}
		page.append(component);
		
		return this;
	};
	
	//H5对象初始化呈现
	this.loader = function() {
		this.el.fullpage({
			onLeave: function(index, nextIndex, direction){
				$(this).find('.h5_component').trigger('onleave');
			},
			afterLoad: function(anchorLink, index){
				$(this).find('.h5_component').trigger('onload');
			}
		});
		this.pages[0].find('.h5_component').trigger('onload');
		this.el.show();
		
	}
	
	return this;
}
