(function(window){

    var win         = window,
        doc         = win.document,
        drop        = null,
        imgs        = null,
        borderColor = null;

    function initApp(event) {
        //RECUPERA OS ELEMENTOS
        drop = doc.getElementById('drop');
        imgs = doc.querySelectorAll('#images img');
        borderColor = drop.style.borderColor;		
        initEvents();		
    }

    function initEvents() {		
        drop.addEventListener('drop', dropArea, false);
        drop.addEventListener('dragenter', styleDrop, false);
        drop.addEventListener('dragleave', styleDrop, false);
        drop.addEventListener('dragover', styleDrop, false);

        for (var i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener('dragstart', dragItems, false);
            imgs[i].id = 'image'+i;
        }
    }

    function dragItems(event) {		
        event.dataTransfer.setData('Text', this.id)
    }

    function dropArea(event) {	
        drop.style.borderColor = borderColor;

        var target = doc.getElementById(event.dataTransfer.getData('Text'));
        target.parentNode.removeChild(target);

        var img = doc.createElement('img');
        img.src = target.src;
        img.setAttribute('draggable', false)

        drop.appendChild(img);

        event.preventDefault();
    }

    function styleDrop(event) {	
        if(event.type == 'dragenter') {
            drop.style.borderColor = 'red';
        } else if(event.type == 'dragleave') {
            drop.style.borderColor = borderColor;
        }		
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    //DOM ESTÁ PRONTO
    doc.addEventListener('DOMContentLoaded', initApp, false);
})(window)