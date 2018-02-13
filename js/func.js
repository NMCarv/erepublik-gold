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

function setValues(a) {
	setCookie("values", JSON.stringify(a), 365);
}

function getValues() {
	return $.parseJSON(getCookie("values"));
}

// ---------------------------------------------

function promptDialog(fun) {
	BootstrapDialog.show({
		title: 'Insira um valor:',
       	message: '<input type="text" class="form-control">',
       	description: 'Caixa de diálogo para inserção de valores',
       	type: BootstrapDialog.TYPE_DEFAULT,
       	draggable: true,
       	buttons: [{
	            label: 'OK',
	            action: function(dialogRef) {
				var value = dialogRef.getModalBody().find('input').val();
				if (value !== "") {
					fun({value: value, dialogRef: dialogRef});
					dialogRef.close();
				}
				else {
					BootstrapDialog.alert("Digite um valor");
				}
	            }
            }]
	});
}

function addValuesTab() {

}