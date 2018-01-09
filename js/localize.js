/* exported locale */

var locale = new Locale();

function Locale() {
    var _currentLang = "en";

    var _translatable = [
        {
            selector: "#search-text",
            property: "placeholder",
            method: "prop",
            translations: {
                "en": "Search text",
                "ru": "Текст для поиска"
            }
        },
        {
            selector: "#search-text",
            property: "data-content",
            method: "attr",
            translations: {
                "en": "Please enter some text",
                "ru": "Пожалуйста, введите какой-нибудь текст"
            }
        },
        {
            selector: "#search-button",
            property: "",
            method: "text",
            translations: {
                "en": "Go!",
                "ru": "Поехали!"
            }
        },
        {
            selector: "#random-button",
            property: "",
            method: "text",
            translations: {
                "en": "Get random article",
                "ru": "Случайная статья"
            }
        },
        {
            selector: "#continue-button",
            property: "",
            method: "text",
            translations: {
                "en": "More...",
                "ru": "Ещё..."
            }
        },
        {
            selector: "#lang-button",
            property: "",
            method: "html",
            translations: {
                "en": "En&rarr;Ru",
                "ru": "Ru&rarr;En"
            }
        }
    ];

    function translateElements() {
        _translatable.forEach(function (elem) {
            switch (elem.method) {
                case "prop":
                    $(elem.selector).prop(elem.property, elem.translations[_currentLang]);
                    break;
                case "attr":
                    $(elem.selector).attr(elem.property, elem.translations[_currentLang]);
                    break;
                case "text":
                    $(elem.selector).text(elem.translations[_currentLang]);
                    break;
                case "html":
                    $(elem.selector).html(elem.translations[_currentLang]);
                    break;
            }


        })
    }

    this.toggleLang = function () {
        if (_currentLang == "en") _currentLang = "ru";
        else _currentLang = "en";
        translateElements();
    }

    this.currentLang = function () {
        return _currentLang;
    }
}