/* exported SearchResultsView */
/* global locale */
/* eslint max-statements: [2, 10, {ignoreTopLevelFunctions: true}] */

function SearchResultsView() {
    var RESULTS_DIV = "#search-result";
    var PROGRESS_DIV = "#search-progress";
    var SEARCH_TEXT_INPUT = "#search-text";
    var CONTINUE_BUTTON = "#continue-button";

    // init popover for search hints.
    $(SEARCH_TEXT_INPUT).popover();

    this.clear = function () {
        $(RESULTS_DIV).html("");
    }

    this.text = function (data) {
        $(RESULTS_DIV).text(data);
    }

    // {
    //     "title": "Orenburg",
    //     "pageid": 483162,
    //     "snippet": "<span class=\"searchmatch\">Orenburg</span> (Russian: Оренбург, IPA: [ərʲɪnˈburk]) is the administrative center of <span class=\"searchmatch\">Orenburg</span> Oblast, Russia. It lies on the Ural River, 1,478 kilometers (918 mi)",
    // }
    this.addArticle = function (data) {
        var html = "<div class=\"panel panel-default\">" +
            "<a href=\"https://"+locale.currentLang()+".wikipedia.org/?curid=" + data.pageid + "\" target=\"_blank\"><div class=\"panel-heading\">" +
            "<h4 class=\"panel-title\">" + data.title + "</h4>" +
            "</div></a>" +
            "<div class=\"panel-body\">" + data.snippet +
            "</div></div>";
        $(RESULTS_DIV).append(html);
    }

    this.showProgress = function (state) {
        if (state.toLowerCase() == "show") $(PROGRESS_DIV).removeClass("hidden")
        else if (state.toLowerCase() == "hide") $(PROGRESS_DIV).addClass("hidden");
    }

    this.showSearchHint = function (state) {
        $(SEARCH_TEXT_INPUT).popover(state);
    }

    this.showMore = function (state) {
        if (state.toLowerCase() == "show") $(CONTINUE_BUTTON).removeClass("hidden")
        else if (state.toLowerCase() == "hide") $(CONTINUE_BUTTON).addClass("hidden");
    }
}