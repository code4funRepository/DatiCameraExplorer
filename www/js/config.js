$('#btnSalva').click(function() {
						saveData();
					});
		
				
		
		 function setObject(key,objArray){
			 localStorage.setItem(key, JSON.stringify(objArray));
		 }
		 
		 function getObject(nome) {
		 
			var stringifiedObject = localStorage.getItem(nome);
			var reconstitutedObject = JSON.parse(stringifiedObject);
			 
			return reconstitutedObject;
		 }
		 
		function saveData()
		{
			//setObject("timeout",$("#timeout").val());
			setObject("timeout",$('select[name=timeout]').val());
			setObject("legislatura",$('select[name=legislatura]').val());
			//setObject("totalerighe",$("#totalerighe").val());
			setObject("totalerighe",$('select[name=maxrow]').val());
			var s = getObject("timeout");
			var t = getObject("legislatura");
			var r = getObject("totalerighe");
			
			alert("Modifiche Salvate");
		}