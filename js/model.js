/* exported SearchResults */
/* global locale */
/* eslint max-statements: [2, 10, {ignoreTopLevelFunctions: true}] */

function SearchResults(view) {

    var _searchText = "";
    var _resultsArray = [];
    var _view = view;
    var _completed = false;
    var _continue = {
        sroffset: 0,
        continue: ""
    };
    var _inSearch = false;
    var that = this;

    this.isInSearch = function () {
        return _inSearch;
    }

    this.isCompleted = function () {
        return _completed;
    }

    this.clear = function () {
        _resultsArray = [];
        _view.clear();
        _completed = false;
        _continue.sroffset = 0;
        _continue.continue = "";
        _inSearch = false;
    }

    // data: result record or array of it
    this.append = function (data) {
        if (Array.isArray(data)) {
            data.forEach(function (val) {
                that.append(val);
            })
        } else {
            _resultsArray.push(data);
            _view.addArticle(data);
        }
    }

    function doAjaxRequest(callback) {
        $.ajax({
            url: "https://" + locale.currentLang() + ".wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + encodeURIComponent(_searchText),
            dataType: "jsonp",
            beforeSend: function (jqXHR, settings) {
                _inSearch = true;
                if (_continue.sroffset > 0) {
                    settings.url += "&sroffset=" + _continue.sroffset;
                }
            },
            complete: function () {
                /* eslint-disable callback-return */
                _inSearch = false;
                if (callback) callback();
                /* eslint-enable callback-return */
            },
            success: function (data) {
                _completed = !data.continue;
                if (!_completed) {
                    _continue.sroffset = data.continue.sroffset;
                    _continue.continue = data.continue.continue;
                }
                that.append(data.query.search);
            }
        });
    }

    this.search = function (searchText, callback) {
        that.clear();
        _searchText = searchText;
        doAjaxRequest(callback);
    }

    this.continue = function (callback) {
        if (_completed) return;
        doAjaxRequest(callback);
    }

}