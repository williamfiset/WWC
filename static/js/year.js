// Reload the year for the usa chart
function loadYear(year) {
    console.log(map);
    map.dataLoader.url = "/heat_map/" + year;
    map.dataLoader.loadData();

}

// WHO LIKES GLOBALS!!!?
window.year = 2016;

(function($) {

    $("#yearSlider").on("change", function() {
        $(this).next().html($(this).val());
        window.year = $(this).val();
        loadYear($(this).val());
    });

})(jQuery);
