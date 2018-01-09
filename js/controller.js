/* exported searchController, SearchController */
/* global locale */

var searchController;

function SearchController(model, view) {

    var _model = model;
    var _view = view;

    function searchCallback() {
        _view.showProgress("hide");
        if (_model.isCompleted()) _view.showMore("hide");
        else _view.showMore("show");
    }

    this.search = function(text) {
        if (_model.isInSearch()) return;
        if (text == "") {
            _view.showSearchHint("show");
            return;
        }
        _view.showSearchHint("hide");
        _view.showProgress("show");
        _model.search(text, searchCallback)
    };

    this.continue = function() {
        if (_model.isCompleted() || _model.isInSearch()) return;
        _view.showProgress("show");
        _model.continue(searchCallback);
    };

    this.showRandom = function() {
        window.open("https://" + locale.currentLang() + ".wikipedia.org/wiki/Special:Random");
    }

}