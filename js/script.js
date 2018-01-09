/* global SearchResultsView, SearchResults, searchController:true, SearchController, locale */
/* exported onAjaxComplete, onAjaxBeforeSend*/

$(document).ready(function () {
    var view = new SearchResultsView();
    var model = new SearchResults(view);
    searchController = new SearchController(model, view);

    $("#lang-button").click(locale.toggleLang);
    $("#search-button").click(function () {
        searchController.search($("#search-text")[0].value);
    });
    $("#continue-button").click(function () {
        searchController.continue();
    });
    $("#random-button").click(function () {
        searchController.showRandom();
    });
});
