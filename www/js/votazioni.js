<script type="text/javascript">
		//<![CDATA[ 

		var newArray_votazione=[];
		var currentItem_votazione=0;
		var counter=0;
		
		var per_page = 10; //max images per page LIMIT FIXED
		var page = 0; //initialize page number OFFSET
		var deltap= 1000;
		var localStore_votazione = false;
		var isList = true;
		
		
		
		$(window).load(function(){



			$(document).ready(function () {
				loadPage_votazione(per_page, page); //load some images onload
			});
			
			$("#button2").click(function (){
				alert("calling loadPage_votazione");
				loadPage_votazione(per_page, page);
			}
			)
			
			//Handler for scrolling toward end of document
			$(window).scroll(function() {
				if(isList)
				{
					if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
						//End of page, load next content here
						if (!loading) loadNextPage_votazione();
					}
				}				
			});
			
			//Load content for next page
			function loadNextPage_votazione() {
				loadPage_votazione(per_page, ++page);
			}

			//Load images from Datasource (Flickr in this case)
			function loadPage_votazione(per_page, page) {
				loading = true; //interlock to prevent multiple calls
				$.mobile.loading('show');

				per_page= ((page + 1 ) * deltap);
				page= (((page) * deltap) + 1);
				
				var loadPage_votazione = "http://dati.camera.it/sparql?default-graph-uri=&query=SELECT+distinct+*+WHERE+%7B%0D%0A%3Fvotazione+a+ocd%3Avotazione%3B+%0D%0Adc%3Adate+%3Fdata%3B+%0D%0Adc%3Atitle+%3Fdenominazione%3B+%0D%0Adc%3Adescription+%3Fdescrizione%3B%0D%0Aocd%3Avotanti+%3Fvotanti%3B%0D%0Aocd%3AvotazioneFinale+1%3B%0D%0Aocd%3Afavorevoli+%3Ffavorevoli%3B%0D%0Aocd%3Acontrari+%3Fcontrari%3B%0D%0Aocd%3Aastenuti+%3Fastenuti%3B%0D%0Aocd%3ArichiestaFiducia+%3Ffiducia%3B%0D%0Aocd%3Arif_leg+%3Chttp%3A%2F%2Fdati.camera.it%2Focd%2Flegislatura.rdf%2Frepubblica_17%3E%7D+%0D%0AORDER+BY+DESC%28%3Fdata%29";
				var nonQuery = "OFFSET+"+page+"+LIMIT+"+per_page+"&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on"+ "&callback=?";

				loadPage_votazione = loadPage_votazione + nonQuery;

				//alert(nonQuery);
				//Calling to service provider
				$.getJSON(loadPage_votazione,{
										per_page: per_page,
										page: page
				}).done(function (data) {
					

					$.each(data.results.bindings, function (i, item) {
					

						newArray_votazione.push(item);

						var votazione = item.votazione.value;
						var data = item.data.value;
						var denominazione = item.denominazione.value;
						var descrizione = item.descrizione.value;
						
						var votanti = item.votanti.value;
						var favorevoli = item.favorevoli.value;
						var contrari = item.contrari.value;
						var astenuti = item.astenuti.value;
						var fiducia = item.fiducia.value;
						
						counter++;

						var link = $("<a/>").attr("href", "#display");
						
						var txt1 = $("<h2/>").append(counter + ")" + denominazione + " " + data);

						link.append(txt1);

						
						var li = $("<li/>").append(link);
						li.appendTo("#list-lazyloader");
					});
					
					//refresh listview
					$('#list-lazyloader').listview('refresh');
					loading = false;
					$.mobile.loading('hide');
					$('#photoCount').text($('#list-lazyloader li').size());
					
					$('#list-lazyloader li').click(function() {
						currentItem = $(this).index();
						//alert(currentItem);
						isList = false;
					});
					
					$('#backBtn').click(function() {
						
						isList = true;
						
					});
					
				
					//alert("page: "+page+"per_page:"+per_page);
					
					$('#display').on('pagebeforeshow', function() {
					    
						//var url = String.format("http://farm{0}.staticflickr.com/{1}/{2}_{3}_{4}.jpg", item.farm, item.server, item.id, item.secret, 't');
						var url = newArray_votazione[currentItem].depiction.value;
						var img = $("<img/>").attr("src", url);
			
						$(this).find('[data-role=header] .ui-title').text(newArray_votazione[currentItem].cognome.value);
						$('#photo').html(img);
						
						$('#row1').html(newArray_votazione[currentItem].denominazione.value);
						$('#row2').html(newArray_votazione[currentItem].data.value);
						$('#row3').html(newArray_votazione[currentItem].descrizione.value);
						$('#row4').html(newArray_votazione[currentItem].votanti.value);
						$('#row5').html(newArray_votazione[currentItem].favorevoli.value);
						$('#row6').html(newArray_votazione[currentItem].contrari.value);
						$('#row7').html(newArray_votazione[currentItem].astenuti.value);
						if(newArray_votazione[currentItem].fiducia.value == 1)
							$('#row8').html("si");
						else
							$('#row8').html("no");
					});                                                    
				});                                                        
			};
		});//]]>  

		</script>