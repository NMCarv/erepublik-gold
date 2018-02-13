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

// Function to set "values" cookie
function setValues(a) {
	setCookie("values", JSON.stringify(a), 365);
}

// Function to get "values" cookie
function getValues() {
	return $.parseJSON(getCookie("values"));
}

// ---------------------------------------------

function promptDialog(fun) {
	BootstrapDialog.show({
		title: 'Insira um valor:',
       	message: '<input type="text" class="form-control" placeholder="Por exemplo, 432 PTE">',
       	description: 'Caixa de diálogo para inserção de valores',
       	type: BootstrapDialog.TYPE_DEFAULT,
       	draggable: true,
       	buttons: [{
	            label: 'OK',
	            action: function(dialogRef) {
				var value = dialogRef.getModalBody().find('input').val();
				if (value !== "") {
					fun({value: value, dialogRef: dialogRef});
				}
				else {
					BootstrapDialog.alert("Digite um valor");
				}
	            }
            }]
	});
}

// ---------------------------------------------

function showValues() {
	var values = getValues();
	for (i = 1; i <= values.length; i++) {
		$("#t3").append("<tr><td>" + values[i].id + "</td><td>" + values[i].value + " PTE " + getVariation($lower, values[i].value) + "</td><td><button type='button' class='btn btn-primary change-val'>Alterar</button> <button type='button' class='btn btn-danger delete'>Remover</button></td></tr>");
	}
}

function getVariation(lower, value) {
	var percent = ((lower - value) / value) * 100;

	if (lower > value) {
		// Positive
		var span = "<span class='glyphicon glyphicon-triangle-top text-success'> (" + percent.toFixed(2) + "%) " + (lower - value).toFixed(2) + " PTE</span>"
	}
	else if (value > lower) {
		// Negative
		var span = "<span class='glyphicon glyphicon-triangle-bottom text-danger'> (" + percent.toFixed(2) + "%) " + (lower - value).toFixed(2) + " PTE</span>"
	}
	return span;
}

// ---------------------------------------------

function sobre() {
	var message = "O eRepublik Gold é um serviço web livre que permite ver o preço do ouro do jogo eRepublik. <br><h3>O que é o eRepublik?</h3><a href='https://www.erepublik.com'>eRepublik</a> é um WBMMOG (Web Based Massive Multiplayer Online Game) de estratégia que pretende simular a vida real, ou seja, pretende recriar diversos sectores como a economia, política, meios de comunicação, actividade militar e a sociedade. O jogador é um cidadão que intervém em cada um destes sectores.<br><h3>O que o eRepublik Gold faz?</h3>O serviço informa ao jogador as seguintes informações:<br><ol><li>O preço do ouro (mais barato)</li><li>O preço do ouro (mais caro)</li><li>As 10 ofertas de ouro mais baratas</li><li>O nome (com hiperligação) do vendedor do ouro</li><li>A hora a que a oferta foi publicada</li><li>Inserção de valores personalizados para acompanhar a subida e descida de preços</li></ol><h3>Como posso contribuir?</h3>Qualquer um pode contribuir, visto que o serviço é livre e é amparado pela licença GPL, o que significa que qualquer um pode modificar e partilhar.<br><br>Para ajudares, faz um pull request com as tuas alterações. Pede-se para documentar o código escrito para os restantes contribuidores perceberem o mesmo.<br><br>Verifica sempre a aba Issues. Podes sempre encontrar algo por lá onde possas ser bom!<br><h3>Onde posso manter-me informado sobre o projeto?</h3>Caso sejas um jogador da comunidade portuguesa do eRepublik, podes sempre visitar o fórum eRepublikPT, em Desenvolvimento de Aplicações. Caso contribuas, deixa lá a tua marca.<br><h3>Licença</h3>O serviço é amparado sobre a <a href='https://www.gnu.org/licenses/gpl.html'>licença GPL</a>.";
	BootstrapDialog.show({
	    title: 'Sobre o projeto "eRepublik Gold"',
	    message: message,
	    description: 'Caixa de diálogo sobre o projeto',
	    type: BootstrapDialog.TYPE_DEFAULT,
	    draggable: true
	});
}