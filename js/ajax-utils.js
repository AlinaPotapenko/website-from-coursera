(function (global) {

let ajaxUtils = {};

// Creating an HTTP request to the server
function getRequestObject() {
	if (global.XMLHttpRequest) {
		return (new XMLHttpRequest());
	} else {
		global.alert("Ajax is not supported!");
		return(null); // we don't have anything, so instead of the 
		// object we return null
	}
}

// Making an AJAX "GET" request to "requestUrl"
ajaxUtils.sendGetRequest = function(requestUrl, responseHandler, 
	isJsonResponse) {
	let request = getRequestObject();
	request.onreadystatechange = function() {
		handleResponse(request, responseHandler, isJsonResponse); // we need to equal  
		// onreadystatechange to function's value (body), NOT a returned
		// result from the function. So that's why we write "= function() {...
	    // (function body) }". if we simply equal it as this: "= handleResponse",
	    // then it will equal to the returned result from the function.
	};
	request.open("GET", requestUrl, true);
	request.send(null); // for POST only
};

// Function if response is ready and not an error
function handleResponse(request, responseHandler, isJsonResponse) {
	if ((request.readyState == 4) && (request.status == 200)) {
		if (isJsonResponse == undefined) {
			isJsonResponse = true;
		} 
		if (isJsonResponse) {
			responseHandler(JSON.parse(request.responseText));
		}
		else {
			responseHandler(request.responseText);
		}
	}
}

global.$ajaxUtils = ajaxUtils;

})(window);