/**
 *  @name carousel
 *  @description
 *  @version 1.0
 *  @options
 *  @events
 *    no event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'search-dropdown';
  var doc = $(document);
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          el = that.element,
          inputEl = el.find('input'),
          selectEl = el.find('ul'),
          valueSelectEl = selectEl.find('li');

      inputEl.on('click.' + pluginName, function(){
        selectEl.removeClass('hidden');
      });

      inputEl.on('keyup.'+ pluginName, function(){
        for (var iLi = 0; iLi < valueSelectEl.length; iLi++) {
          if (valueSelectEl.eq(iLi).html().toUpperCase().indexOf($(this).val().toUpperCase()) > -1) {
            valueSelectEl.eq(iLi).removeClass('hidden');
          } else {
            valueSelectEl.eq(iLi).addClass('hidden');
          }
        }
      });
      
      valueSelectEl.on('click.'+ pluginName, function(){
        selectEl.addClass('hidden');
        inputEl.val($(this).html());
      });

      doc.off('click.' + pluginName).on('click.' + pluginName, function (e) {
        var target = $(e.target);
        !target.closest(inputEl).length && selectEl.addClass('hidden');
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({});
  });

}(jQuery, window));
