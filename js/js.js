/**
 * Created by Nuno Martins on 17-08-2017.
 */

// The lowest and highest prices
var $lower = 0;
var $higher = 0;

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

	            showValues();
	        } else {
	            console.log("An error occured: " + data.message);
	        }
	    },
	    error: function() {
	        console.log("An error occured");
	    }
	});

	$("#table-val").on('click', 'tr .delete', function(event) {
		event.preventDefault();
		var id = parseInt($(this).parents('tr').children(':first').html());
		var c = getValues();
		$(this).parents("tr").remove();
		var filtered = c.filter(function(item) {
			return item.id !== id;
		});
		filtered[0].number = filtered.length - 1;
		setValues(filtered);
	});
});

function addValue() {
	promptDialog(function(options) {
		try  {
			if (isNaN(parseInt(options.value))) {
				throw "Digite um número";
			}

			var values = getValues();
			if (values === null || values.length === 0) {
				var set = [{number: 0}];
				setValues(set);
				var values = getValues();
			}

			values.push({'id': ++values[0].number, 'value': options.value});

			$("#t3").append("<tr><td>" + values[0].number + "</td><td>" + options.value + " PTE</td><td><button type='button' class='btn btn-primary change-val'>Alterar</button> <button type='button' class='btn btn-danger delete'>Remover</button></td></tr>");

			setValues(values);
			options.dialogRef.close();
		}
		catch (ex) {
			alert("Erro: " + ex.message);
		}
	});
};

function sobre() {
    BootstrapDialog.show({
        title: 'Sobre o projeto "eRepublik Gold"',
        message: 'O eRepublik Gold é um projeto com o objetivo de facilitar a negociação de ouro no jogo eRepublik.',
        description: 'Caixa de diálogo sobre o projeto',
        type: BootstrapDialog.TYPE_DEFAULT,
        draggable: true
    });
}