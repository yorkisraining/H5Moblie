/* 环图组件对象 */

var h5ComponentRing =function ( name, cfg ) {
  cfg.type = 'pie';
  if(cfg.data.length>1){  //  环图应该只有一个数据
    cfg.data = [cfg.data[0]];
  }
  var component =  new h5ComponentPie( name ,cfg );

  var mask = $('<div class="mask"></div>');
  component.addClass('h5_component_ring');

  component.append(mask);

  var texts = component.find('.text');

  texts.attr('style','');
  if(cfg.data[0][2]){
    texts.css('color',cfg.data[0][2]);
  }
  mask.append( texts );

  return component;
}