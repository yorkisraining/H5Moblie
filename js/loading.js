//loading
var H5_loading = function(images, nowpage) {
	var id = this.id;
	if (this._images === undefined) {
		//第一次进入
		this._images = (images || []).length;
		this._loaded = 0;
		
		for (s in images) {
			var item = images[s];
			var img = new Image;
			
			window[id] = this; //把当前对象存储在全局对象中
			img.onload = function() {
				window[id].loader();
			}
			img.src = item;
		}
		
		$('#rate').text('0%');
		return this;
		
	} else {
		
		this._loaded++;
		$('#rate').text( (this._loaded/this._images*100 >> 0)+ '%' 
		);
		if (this._loaded < this._images) {
			return this;
		}
		
	}
	
	window[id] = null;
	
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
		if (nowpage) {
			$.fn.fullpage.moveTo(nowpage);
		}
}
