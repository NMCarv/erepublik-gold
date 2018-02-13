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
	                console.log("Data/Hora (eRepublik): " + offer.added + " - Oferta: " + offer.offer.rate.toFixed(2) + " PTE");
	                // It creates a new row on the table with the information
	                $("#t1").append("<tr><td>" + offer.added + "</td><td><a href='https://www.erepublik.com/br/citizen/profile/" + offer.seller.id + "'>" + offer.seller.name + "</a></td><td>" + offer.offer.rate.toFixed(2) + " PTE</td></tr>");
	                if ($lower != 0) {
	                    if (offer.offer.rate.toFixed(2) <= $lower) {
	                        $lower = offer.offer.rate.toFixed(2);
	                    }
	                }
	                else {
	                    $lower = offer.offer.rate.toFixed(2);
	                }

	                if ($higher != 0) {
	                    if (offer.offer.rate.toFixed(2) >= $higher) {
	                        $higher = offer.offer.rate.toFixed(2);
	                    }
	                }
	                else {
	                    $higher = offer.offer.rate.toFixed(2);
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

	$("#table-val").on('click', 'tr .change-val', function(event) {
		event.preventDefault();
		var id = parseInt($(this).parents('tr').children(':first').html());
		var val_cell = $(this).parents("tr").children(':nth-child(2)');
		var c = getValues();
		promptDialog(function(options) {
			try {
				var find = c.indexOf(c.find(item => item.id === id));
				c[find].value = options.value;

				setValues(c);
				val_cell.html(options.value + " PTE " + getVariation($lower, options.value));
				options.dialogRef.close();
			}
			catch(ex) {
				alert("Erro: " + ex.message);
			}
		});
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

			$("#t3").append("<tr><td>" + values[0].number + "</td><td>" + options.value + " PTE " + getVariation($lower, options.value) + "</td><td><button type='button' class='btn btn-primary change-val'>Alterar</button> <button type='button' class='btn btn-danger delete'>Remover</button></td></tr>");

			setValues(values);
			options.dialogRef.close();
		}
		catch (ex) {
			alert("Erro: " + ex.message);
		}
	});
};