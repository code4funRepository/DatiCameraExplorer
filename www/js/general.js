	<script type="text/javascript">
		//<![CDATA[ 

		var newArray_XXXX=[];
		var currentItem_XXXX=0;
		var counter_XXXX=0;
		
		var per_page_XXXX = 10; //max images per page LIMIT FIXED
		var page_XXXX = 0; //initialize page number OFFSET
		var deltap_XXXX = 1000;
		var localStore_XXXX = false;
		var isList_XXXX = true;
		
		
		
		$(window).load(function(){



			$(document).ready(function () {
				loadPage_XXXX(per_page, page); //load some images onload
			});
			
			//Handler for scrolling toward end of document
			$(window).scroll(function() {
				if(isList)
				{
					if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
						//End of page, load next content here
						if (!loading) loadNextPage_XXXX();
					}
				}				
			});
			
			//Load content for next page
			function loadNextPage_XXXX() {
				loadPage_XXXX(per_page, ++page);
			}

			//Load images from Datasource (Flickr in this case)
			function loadPage_XXXX(per_page, page) {
				loading = true; //interlock to prevent multiple calls
				$.mobile.loading('show');

				per_page= ((page + 1 ) * deltap);
				page= (((page) * deltap) + 1);
				
				var loadPage_XXXX = "http://dati.camera.it/sparql?default-graph-uri=&query=SELECT+DISTINCT+%3Fpersona+%3Fcognome+%3Fnome+%3Fdepiction%0D%0A%3FdataNascita++%3Fnato+%3FluogoNascita+%3Fgenere+%0D%0A%3Fcollegio+%3FnomeGruppo+%3Fsigla+%3Faggiornamento++%0D%0AWHERE+%7B%0D%0A%3Fpersona+ocd%3Arif_mandatoCamera+%3Fmandato%3B+a+foaf%3APerson.%0D%0A%0D%0A%23%23+deputato%0D%0A%3Fd+a+ocd%3Adeputato%3B+ocd%3Aaderisce+%3Faderisce%3B%0D%0Aocd%3Arif_leg+%3Chttp%3A%2F%2Fdati.camera.it%2Focd%2Flegislatura.rdf%2Frepubblica_17%3E%3B%0D%0Aocd%3Arif_mandatoCamera+%3Fmandato.%0D%0A%0D%0A%23%23anagrafica%0D%0A%3Fd+foaf%3Asurname+%3Fcognome%3B+foaf%3Adepiction+%3Fdepiction%3B+foaf%3Agender+%3Fgenere%3Bfoaf%3AfirstName+%3Fnome.%0D%0AOPTIONAL%7B%0D%0A%3Fpersona+%3Chttp%3A%2F%2Fpurl.org%2Fvocab%2Fbio%2F0.1%2FBirth%3E+%3Fnascita.%0D%0A%3Fnascita+%3Chttp%3A%2F%2Fpurl.org%2Fvocab%2Fbio%2F0.1%2Fdate%3E+%3FdataNascita%3B+%0D%0Ardfs%3Alabel+%3Fnato%3B+ocd%3Arif_luogo+%3FluogoNascitaUri.+%0D%0A%3FluogoNascitaUri+dc%3Atitle+%3FluogoNascita.+%0D%0A%7D%0D%0A%0D%0A%23%23aggiornamento+del+sistema%0D%0AOPTIONAL%7B%3Fd+%3Chttp%3A%2F%2Flod.xdams.org%2Fontologies%2Fods%2Fmodified%3E+%3Faggiornamento.%7D%0D%0A%0D%0A%23%23+mandato%0D%0A%3Fmandato+ocd%3Arif_elezione+%3Felezione.++%0D%0AMINUS%7B%3Fmandato+ocd%3AendDate+%3FfineMandato.%7D%0D%0A%0D%0A%23%23+elezione%0D%0A%3Felezione+dc%3Acoverage+%3Fcollegio.%0D%0A%0D%0A%23%23+adesione+a+gruppo%0D%0A%3Faderisce+ocd%3Arif_gruppoParlamentare+%3Fgruppo.%0D%0A%3Fgruppo+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2Falternative%3E+%3Fsigla%3B+%0D%0Adc%3Atitle+%3FnomeGruppo.%0D%0AMINUS%7B%3Faderisce+ocd%3AendDate+%3FfineAdesione%7D%0D%0A%0D%0A%23%23+organo%0D%0A%3Fd+ocd%3Amembro+%3Fmembro.%3Fmembro+ocd%3Arif_organo+%3Forgano.+%0D%0A%3Forgano+dc%3Atitle+%3Fcommissione+.%0D%0AMINUS%7B%3Fmembro+ocd%3AendDate+%3FfineMembership%7D%0D%0A%7D+%0D%0AORDER+BY+ASC%28%3Fcognome%29%0D%0A";
				var nonQuery = "OFFSET+"+page+"+LIMIT+"+per_page+"&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on"+ "&callback=?";

				loadPage_XXXX = loadPage_XXXX + nonQuery;

				//alert(nonQuery);
				//Calling to service provider
				$.getJSON(loadPage_XXXX,{
										per_page: per_page,
										page: page
				}).done(function (data) {
					

					
					$.each(data.results.bindings, function (i, item) {
					

						newArray_XXXX.push(item);

						var persona = item.persona.value;
						var cognome = item.cognome.value;
						var nome = item.nome.value;
						var sigla = item.sigla.value;
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
						
						var txt1 = $("<h2/>").append(counter + ")" + cognome + " " + nome +" ("+ sigla+")" || 'No Dati');

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
						var url = newArray_XXXX[currentItem].depiction.value;
						var img = $("<img/>").attr("src", url);
			
						$(this).find('[data-role=header] .ui-title').text(newArray_XXXX[currentItem].cognome.value);
						$('#photo').html(img);
						
						$('#row1').html(newArray_XXXX[currentItem].nome.value);
						$('#row2').html(newArray_XXXX[currentItem].dataNascita.value);
						$('#row3').html(newArray_XXXX[currentItem].nato.value);
						$('#row4').html(newArray_XXXX[currentItem].luogoNascita.value);
						$('#row5').html(newArray_XXXX[currentItem].genere.value);
						$('#row6').html(newArray_XXXX[currentItem].collegio.value);
						$('#row7').html(newArray_XXXX[currentItem].nomeGruppo.value);
						$('#row8').html(newArray_XXXX[currentItem].sigla.value);
						$('#row9').html(newArray_XXXX[currentItem].aggiornamento.value);
					});                                                    
				});                                                        
			};
		});//]]>  

		</script>