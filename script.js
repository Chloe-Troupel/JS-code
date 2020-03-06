/*author:chloe troupel
 */

	function check(input) {
	  if (input.value != document.getElementById('email_addr').value) {
		input.setCustomValidity('Les deux adresses e-mail ne correspondent pas.');
	  } else {
		input.setCustomValidity(''); //reset of error message
	  }
	}
	
	function getTotal(form){
		form.total.value = ((parseFloat(form.prix_nights.value)) * form.nights.valueAsNumber) + 
		((form.guests.valueAsNumber - 1) * 10);
	}

/* this function returns the price of a hotel room which can change depending on the season*/

function getPrix(fm){
	
	var xhr = new XMLHttpRequest(); //creation of an object allowing requests to distant services
	
	prepareXHR(xhr,fm);//verification if possible to send request
	
	xhr.open("GET", "http://bruno.mascret.fr/tli/ressources/prix.php?nb="+fm.nights.valueAsNumber.toString(), true);//opening of the request
	xhr.send(null);
	
}

function traitement(reponse,fm){
	fm.prix_nights.value=reponse;
	getTotal(fm);
}


function prepareXHR(xhr,fm){
	//function triggered every change of XHR's state:
	// readyState = 4 means the server answered and the answer was given
	// status = 200 means the request was sent (404 means there is no resources at this address)
	// status = 0 means there is no request sent yet
	xhr.onreadystatechange = function() {
		
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			
            traitement(xhr.responseText,fm);//xhr.responseText contains the distant server's answer
			
		}
		
	};	
}
