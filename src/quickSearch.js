$(function () {
    $.fn.quickSearch = function (options) {
        var settings = $.extend({
            searchOptions: [{
                url: "http://google.com/search?q=",
                placeholder: "Google Search",
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

        var html =
            '<input type="' + settings.searchOptions[0].type + '" id="' + inputId + '" placeholder="' + settings.searchOptions[0].placeholder + '" class="form-control form-control-sm" />';

        if (settings.searchOptions.length > 1) {
            $('#' + id).addClass('input-group');
            $('#' + id).addClass('input-group-sm');

            html +=
                '<div class="input-group-btn">' +
                '<button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">&nbsp;<span class="caret"></span></button>' +
                '<ul class="dropdown-menu dropdown-menu-right">';

            for (var i = 0; i < settings.searchOptions.length; i++) {
                html += '<li><span class="changeOption dropdown-item" data-optionIndex="' + i + '">' + settings.searchOptions[i].placeholder + '</span></li>';
            }

            html += '</ul></div>';
        }

        this.html(html);

        $('.changeOption').css('cursor', 'pointer').click(function () {
            var optionIndex = $(this).attr('data-optionIndex');
            for (var i = 0; i < window.currentOption.length; i++) {
                if (window.currentOption[i].key == id) {
                    window.currentOption[i].value = optionIndex;
                }
            }
            $('#' + inputId).attr('placeholder', settings.searchOptions[optionIndex].placeholder);
            $('#' + inputId).attr('type', settings.searchOptions[optionIndex].type);
            $('#' + inputId).val("");
        });

        $("#" + inputId).keypress(function (e) {
            var currentOption = 0;
            for (var i = 0; i < window.currentOption.length; i++) {
                if (window.currentOption[i].key == id) {
                    currentOption = window.currentOption[i].value;
                }
            }

            var searchOption = settings.searchOptions[currentOption];

            if (e.which == 13) {
                e.preventDefault();
                var value = $(this).val();
                if (searchOption.type == 'text' || (searchOption.type == 'number' && !isNaN(value))) {
                    $(this).val("");
                    if (searchOption.newWindow) {
                        window.open(searchOption.url + value);
                    } else {
                        window.location = searchOption.url + value;
                    }
                }
            }
        });
    };
});