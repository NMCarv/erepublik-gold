/**
 * Created by Nuno Martins on 17-08-2017.
 */

// The lowest and highest prices
var $lower = 0;
var $higher = 0;

// Function to create cookies
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Function to get cookies
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Function to delete cookies
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

$(document).ready(function($) {
    var $apiKey = "Kljt3BmjypYsmedSl2Z3";

    var refreshed = getCookie("Refresh");

    // Check if the cookie "Refresh" exists => if the page refreshed
    if (refreshed != null && refreshed != "") {
        // If so, play the notification sound to alert the user that the page refreshed
        $("#ringtone").trigger('play');
        eraseCookie("Refresh");
    }
    else {
        // If not, create a cookie
        setCookie("Refresh", "true", 1);
    }

    $.ajax({
        url: "https://api.erepublik-deutschland.de/" + $apiKey + "/monetarymarket/gold",
        type: "get",
        datatype: 'json',
        success: function(data) {
            if (data.status == "ok") {
                $.each(data.offers, function(index, offer) {
                    /* This logs the offer object into your console */
                    console.log("Data/Hora (eRepublik): " + offer.added + " - Oferta: " + offer.offer.rate + " PTE");
                    // It creates a new row on the table with the information
                    $("#t1").append("<tr><td>" + offer.added + "</td><td><a href='https://www.erepublik.com/br/citizen/profile/" + offer.seller.id + "'>" + offer.seller.name + "</a></td><td>" + offer.offer.rate + " PTE</td></tr>");
                    if ($lower != 0) {
                        if (offer.offer.rate <= $lower) {
                            $lower = offer.offer.rate;
                        }
                    }
                    else {
                        $lower = offer.offer.rate;
                    }

                    if ($higher != 0) {
                        if (offer.offer.rate >= $higher) {
                            $higher = offer.offer.rate;
                        }
                    }
                    else {
                        $higher = offer.offer.rate;
                    }
                });

                // On the 2nd table, append the lowest and the highest prices
                $("#t2").append("<tr><td class='success'>" + $lower + " PTE</td><td class='danger'>" + $higher + " PTE</td></tr>");
            } else {
                console.log("An error occured: " + data.message);
            }
        },
        error: function() {
            console.log("An error occured");
        }
    });
});