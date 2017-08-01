$(document).ready(function () {
    'use strict';

    $('select').niceSelect();

    if ($('#serviceList').length) {
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
    }

    if ($('#enquiryList').length) {
        var request = $.ajax({
            url: "http://504080.com/api/v1/directories/enquiry-types",
            method: 'GET',
            //headers: {'Authorization': 'fd8e7278c477cd6f785c6d14c7b2606aad619ecd'}
        });
        request.done(function (data) {
            $.each(data.data, function (key, value) {
                $('#enquiryList').append($('<option>', {
                    value: key,
                    text: value.name
                }));
            });

            $('#enquiryList').niceSelect('update');
        });
        //request.fail(function (jqXHR, textStatus) {
        //    alert("Request failed: " + textStatus);
        //});
    }

    $('#enquiryList').on('change', function () {
        if ($(this).val() === '6') {
            $('#enquiryOther').removeClass('hidden');
        } else {
            if (!$('#enquiryOther').hasClass('hidden')) {
                $('#enquiryOther').addClass('hidden')
            }
        }
    });

    $("#contactUsForm").validate();


    $("#fileUpload").on('change', function () {

        var imgPath = $(this)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        var image_holder = $("#image-holder"),
            image_size = $(this)[0].files[0].size;
        image_holder.empty();
        //console.log($(this)[0].files[0]);

        if ((extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") && image_size <  5 * 1024 * 1024){
            if (typeof (FileReader) != "undefined") {

                var reader = new FileReader();
                reader.onload = function (e) {
                    $("<img />", {
                        "src": e.target.result,
                        "class": "thumb-image"
                    }).appendTo(image_holder);
                }

                image_holder.show();
                reader.readAsDataURL($(this)[0].files[0]);

            } else {
                alert("This browser does not support FileReader.");
            }
        } else {
            alert("Pls select only images");
        }
    });

    ellipsizeBoxByHeight('.text-overflow-double-line', 2);
    ellipsizeBoxByHeight('.text-overflow-five-line', 5);
});

function ellipsizeBoxByHeight(selector, linesNum) {
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