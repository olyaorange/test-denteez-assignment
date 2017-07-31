(function () {
    'use strict';

    (function () {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    var serviceList = JSON.parse(xhttp.responseText).data,
                        serviceContainer = document.getElementById('serviceList');

                    serviceContainer.innerHTML = '';
                    serviceList.map(function (item) {
                        var temp = document.createElement('div');
                        temp.className = "services-item";
                        temp.innerHTML = '<a class="services-link" href="#"><span class="services-image"><img src="' + item.icon + '" alt=""></span><span class="services-title">' + item.title + '</span></a>';

                        return serviceContainer.appendChild(temp);
                    });
                } else {
                    var errorTitle = JSON.parse(xhttp.responseText).error.message,
                        errorText = JSON.parse(xhttp.responseText).error.description;
                    document.getElementById('error-title').innerHTML = errorTitle;
                    document.getElementById('error-text').innerHTML = errorText;
                }
            }
        };

        xhttp.open("GET", "http://504080.com/api/v1/services/categories", true);
        xhttp.setRequestHeader('Authorization', 'fd8e7278c477cd6f785c6d14c7b2606aad619ecd');
        xhttp.send();
    })();

    ellipsizeBoxByHeight('.text-overflow-double-line', 2);
    ellipsizeBoxByHeight('.text-overflow-five-line', 5);
})();


function ellipsizeBoxByHeight (selector, linesNum) {
    var matches = document.querySelectorAll(selector);

    for (var i = 0; i < Object.keys(matches).length; i++) {
        var elementLineHeight = window.getComputedStyle(matches[i], null).getPropertyValue('line-height'),
            elementHeight = matches[i].offsetHeight;

        if (elementHeight > parseInt(elementLineHeight) * linesNum) {
            ellipsizeTextBox(matches[i], parseInt(elementLineHeight) * linesNum);
        }
    }
}
function ellipsizeTextBox(element, maxHeight) {
    var wordArray = element.innerHTML.split(' ');

    while (element.offsetHeight > maxHeight) {
        wordArray.pop();
        element.innerHTML = wordArray.join(' ') + '...';
    }
}