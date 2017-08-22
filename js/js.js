/**
 * Created by Nuno Martins on 17-08-2017.
 */
$(document).ready(function($) {
    var $apiKey = "Kljt3BmjypYsmedSl2Z3";
    var $lower = 0;
    var $higher = 0;

    $.ajax({
        url: "https://api.erepublik-deutschland.de/" + $apiKey + "/monetarymarket/gold",
        type: "get",
        datatype: 'json',
        success: function(data) {
            if (data.status == "ok") {
                $.each(data.offers, function(index, offer) {
                    /* This logs the offer object into your console */
                    console.log("Data/Hora (eRepublik): " + offer.added + " - Oferta: " + offer.offer.rate + " PTE");
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
                $("#t2").append("<tr><td class='success'>" + $lower + "</td><td class='danger'>" + $higher + "</td></tr>");
            } else {
                console.log("An error occured: "+data.message);
            }
        },
        error: function() {
            console.log("An error occured");
        }
    });
    
    var audio = {};
    audio["sino"] = new Audio();
    audio["sino"].src = "inserirSomAqui"
    audio["sino"].addEventListener('load', function () {
        audio["sino"].play();
    });
    
});
