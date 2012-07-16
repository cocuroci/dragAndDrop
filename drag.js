(function(window,$){

	var win 		= window,
		doc 		= win.document,
		file 		= null,
		area 		= null,
		imgs		= null,
		date  		= null;
		borderColor = null;

	function initApp(event) {
		//RECUPERA OS ELEMENTOS
		area = doc.querySelector('#area');
		imgs = doc.querySelector('#imgs');
		date = doc.querySelector('#date');
		borderColor = area.style.borderColor;
		initEvents();
		startDate();
	}

	function initEvents() {
		doc.addEventListener('drop', dropCancel, false);
		area.addEventListener('drop', dropArea, false);
		area.addEventListener('dragenter', styleDrop, false);
		area.addEventListener('dragleave', styleDrop, false);
	}

	function dropCancel(event) {			
		event.preventDefault();	
	}

	function dropArea(event) {	
		area.style.borderColor = borderColor;

		if(event.dataTransfer.files.length) {
			file = new FileReader();
			file.addEventListener('load', fileLoad);
			file.readAsDataURL(event.dataTransfer.files[0]);	
		}		

		event.preventDefault();	
	}

	function fileLoad(event) {	
		var img = doc.createElement('img');
		img.src = event.target.result;
		img.className = 'itens';
		imgs.appendChild(img);

	}

	function styleDrop(event) {	
		if(event.type == 'dragenter') {
			area.style.borderColor = 'red';
		} else if(event.type == 'dragleave') {
			area.style.borderColor = borderColor;
		}
	}

	function startDate() {	
		var d = new Date();
		date.innerHTML = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		setTimeout(startDate,1000)
	}

	//DOM ESTÁ PRONTO
	doc.addEventListener('DOMContentLoaded', initApp, false);
})(window,jQuery)