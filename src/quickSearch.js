$(function () {
    $.fn.quickSearch = function (options) {
        var settings = $.extend({
            searchOptions: [{
                url: "http://google.com/search?q=",
                placeholder: "Web Search",
                type: "text",
                newWindow: false
            }]
        }, options);

        var id = this.attr('id');
        var inputId = id + '-input-field';

        if (window.currentOption === undefined) {
            window.currentOption = [];
        }

        window.currentOption.push({ key: id, value: 0 });

        this.html(
            '<div class="input-group input-group-sm">' +
            '<input type="' + settings.searchOptions[0].type + '" id="' + inputId + '" placeholder="' + settings.searchOptions[0].placeholder + '" class="form-control" aria-describedby="' + id + '-sizing-addon" aria-label="..." />' +
            '<div class="input-group-btn">' +
            '<button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + settings.searchOptions[0].placeholder + ' <span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li><span class="changeOption">' + settings.searchOptions[0].placeholder + '</span></li>' +
            '</ul>' +
            '</div>' +
            '</div>');

        $('.changeOption')

        $("#" + inputId).keypress(function (e) {
            var currentOption = 0;
            for (var i = 0; i < window.currentOption.length; i++) {
                if (window.currentOption[i].key == id) {
                    currentOption = window.currentOption[i].value;
                }
            }

            var searchOption = settings.searchOptions[currentOption];

            if (e.which == 13) {
                if (searchOption.type == 'text' || (searchOption.type == 'number' && !isNaN($(this).val()))) {
                    $(this).val("");
                    if (searchOption.newWindow) {
                        window.open(searchOption.url + $(this).val());
                    } else {
                        window.location = searchOption.url + $(this).val();
                    }
                }
            }
        });
    };
});