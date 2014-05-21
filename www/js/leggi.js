	<script type="text/javascript">
		//<![CDATA[ 

		var newArray_legge=[];
		var currentItem_legge=0;
		var counter_legge=0;
		
		var per_page_legge = 10; //max images per page LIMIT FIXED
		var page_legge = 0; //initialize page number OFFSET
		var deltap_legge = 1000;
		var localStore_legge = false;
		var isList_legge = true;
		
		
		
		$(window).load(function(){



			$(document).ready(function () {
				loadPage_legge(per_page, page); //load some images onload
			});
			
			//Handler for scrolling toward end of document
			$(window).scroll(function() {
				if(isList)
				{
					if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
						//End of page, load next content here
						if (!loading) loadNextPage_legge();
					}
				}				
			});
			
			//Load content for next page
			function loadNextPage_legge() {
				loadPage_legge(per_page, ++page);
			}

			//Load images from Datasource (Flickr in this case)
			function loadPage_legge(per_page, page) {
				loading = true; //interlock to prevent multiple calls
				$.mobile.loading('show');

				per_page= ((page + 1 ) * deltap);
				page= (((page) * deltap) + 1);
				
				var loadPage_legge = "http://dati.camera.it/sparql?default-graph-uri=&query=select+distinct+*+where+%7B%0D%0A%3Fatto+a+ocd%3Aatto.%0D%0A%3Fatto+dc%3Atitle+%3FnomeAtto.%0D%0A%3Flegge+a+ocd%3Alegge%3B+ocd%3Arif_leg+%3Chttp%3A%2F%2Fdati.camera.it%2Focd%2Flegislatura.rdf%2Frepubblica_17%3E.%0D%0A%3Flegge+ocd%3AlavoriPreparatori+%5B%3Flavoro+%3Fatto%5D%0D%0A%7D&format=text%2Fhtml&timeout=0&debug=on";
				var nonQuery = "OFFSET+"+page+"+LIMIT+"+per_page+"&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on"+ "&callback=?";

				loadPage_legge = loadPage_legge + nonQuery;

				//alert(nonQuery);
				//Calling to service provider
				$.getJSON(loadPage_legge,{
										per_page: per_page,
										page: page
				}).done(function (data) {
					

					
					$.each(data.results.bindings, function (i, item) {
					

						newArray_legge.push(item);

						var atto = item.atto.value;
						var nomeatto = item.nomeatto.value;
						var legge = item.legge.value;
						counter++;
						/*
						var dataNascita = item.dataNascita.value;
						var nato = item.nato.value;
						var luogoNascita = item.luogoNascita.value;
						var genere = item.genere.value;
						var collegio = item.collegio.value;
						var nomeGruppo = item.nomeGruppo.value;
						
						var commissione = item.commissione.value;
						var aggiornamento = item.aggiornamento.value;
						*/
						var link = $("<a/>").attr("href", "#display");
						
						var txt1 = $("<h2/>").append(counter + ")" + atto + " " + nomeatto +" ("+ legge+")" || 'No Dati');

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
						var url = newArray_legge[currentItem].depiction.value;
						var img = $("<img/>").attr("src", url);
			
						$(this).find('[data-role=header] .ui-title').text(newArray_legge[currentItem].nomeatto.value);
						$('#photo').html(img);
						
						$('#row1').html(newArray_legge[currentItem].atto.value);
						$('#row2').html(newArray_legge[currentItem].legge.value);
					});                                                    
				});                                                        
			};
		});//]]>  

		</script>