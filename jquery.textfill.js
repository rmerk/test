(function($) {
    $.fn.textfill = function() {
        function convertUnits(fontSize, unit){
            var value = '';
            switch(unit){
                case 'pt':
                    value = fontSize * .75+'pt'
                break;
                case 'mm':
                    value = fontSize * 0.264583+'mm'
                break;
                default:
                    value = fontSize+'px';
                break;
            }
            return value;
        }
        return this.each(function() {
            var el = $(this);
            var options = {
                maxFontSize: (el.attr('data-max-font-size')) ? parseInt(el.attr('data-max-font-size')) : 32,
                minFontSize: (el.attr('data-min-font-size')) ? parseInt(el.attr('data-min-font-size')) : 1,
                unitType: (el.attr('data-font-unit-type')) ? el.attr('data-font-unit-type') : 'pt'
            };
            var innerElements = el.children(':visible'),
                fontSize = options.maxFontSize || innerElements.css("font-size"),
                maxHeight = el.height(),
                maxWidth = el.width(),
                innerHeight,
                innerWidth;
            do {
                innerElements.css('font-size',  convertUnits(fontSize, options.unitType));
                innerHeight = $.map(innerElements, function(e) {
                    return $(e).outerHeight();
                }).reduce(function(p, c) {
                    return p + c;
                }, 0);
                innerWidth = innerElements.outerWidth();
                fontSize = fontSize - .1;
            } while ((innerWidth > maxWidth || innerHeight > maxHeight) && fontSize >= options.minFontSize);
        });
    };
})(jQuery);