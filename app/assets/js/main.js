$(document).ready(function() {
   
    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 100});
    
    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){
        
        //store hash
        var target = this.hash;
                
        e.preventDefault();
        
		$('body').scrollTo(target, 800, {offset: -55, 'axis':'y'});
        //Collapse mobile menu after clicking
		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
		
	}); 
     
    /* ======= jQuery Placeholder ======= */
    /* Ref: https://github.com/mathiasbynens/jquery-placeholder */
    
    $('input, textarea').placeholder();         
    
    /* ======= Countdown ========= */
	// set the date we're counting down to
    var target_date = new Date("2018-08-04 15:00").getTime();
     
    // variables for time units
    var days, hours, minutes, seconds;
     
    // get tag element
    var countdown =  document.getElementById("countdown-box");
    var days_span = document.createElement("SPAN");
    days_span.className = 'days';
    countdown.appendChild(days_span);
    var hours_span = document.createElement("SPAN");
    hours_span.className = 'hours';
    countdown.appendChild(hours_span);
    var minutes_span = document.createElement("SPAN");
    minutes_span.className = 'minutes';
    countdown.appendChild(minutes_span);
    var secs_span = document.createElement("SPAN");
    secs_span.className = 'secs';
    countdown.appendChild(secs_span);
     
    // update the tag with id "countdown" every 1 second
    setInterval(function () {
     
        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;
     
        // do some time calculations
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
         
        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
         
        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);
         
        // format countdown string + set tag value.
        days_span.innerHTML = '<span class="number">' + days + '</span>' + '<span class="unit script">Dagar</span>';
        hours_span.innerHTML = '<span class="number">' + hours + '</span>' + '<span class="unit script">Tim</span>';
        minutes_span.innerHTML = '<span class="number">' + minutes + '</span>' + '<span class="unit script">Min</span>';
        secs_span.innerHTML = '<span class="number">' + seconds + '</span>' + '<span class="unit script">Sek</span>';
        
      
        //countdown.innerHTML = days + "d, " + hours + "h, "
       // + minutes + "m, " + seconds + "s";  
     
    }, 1000);
     

    /* ======= Google Map ======= */
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 57.8189274, lng: 12.4191691 },
        scrollwheel: false,
        zoom: 17,
    });
    
    var iconBasePath = '/assets/images/',
        weddingIcon = iconBasePath+'marker-rings.png',
        partyIcon = iconBasePath+'marker-party.png',
        hotelIcon = iconBasePath+'marker-hotel.png',
        busIcon = iconBasePath+'marker-bus.png',
        trainIcon = iconBasePath+'marker-train.png',
        parkIcon = iconBasePath+'marker-park.png',
        footstepsIcon = iconBasePath+'marker-footsteps.png';

    var weddingContent = '\
        <div class="note">Vigsel & Fest</div>\
        <h4 class="map-title script">Gamla Övre Fabriken</h4>\
        <div class="address">\
            <span class="region">JT Bergsväg 16</span>\
            <br>\
            <span class="postal-code">448 50</span>\
            <br>\
            <span class="city-name">Tollered</span>\
        </div>';

    var hotel1Content = '\
        <div class="note">Nääs Fabriker</div>\
        <div>Dubbelrum fr 1690:-</div>\
        <div>Inkl frukost</div>\
        <br>\
        <div>\
            <a href="http://www.naasfabriker.se/bo/" target="_blank">Hemsida</a>\
            <br>\
            <a href="https://www.hotels.com/ho261753/naas-fabriker-hotell-och-restaurang-tollered-sweden/" target="_blank">Hotels.com</a> (kan vara billigare)\
        </div>';

    var hotel2Content = '\
        <div class="note">Tollereds Hotell</div>\
        <div>Dubbelrum fr 1100:-</div>\
        <div>Finns även 1-, 3- och 4-bäddsrum</div>\
        <br>\
        <div>\
            <a href="http://www.tolleredshotell.se/Våra%20rum.html" target="_blank">Hemsida</a>\
        </div>';

    var hotel3Content = '\
        <div class="note">Nääs Slott</div>\
        <div>Dubbelrum fr 795:-</div>\
        <div>Här finns även möjlighet att boka hela hus med flera rum.</div>\
        <div>Ingen frukost. Gemensamt kök, dusch & toalett i byggnaden.</div>\
        <br>\
        <div>\
            <a href="http://www.naas.se/paa-naeaes/boende/" target="_blank">Hemsida</a>\
        </div>';

    var busContent = '\
        <div class="note">Herreslia - Buss 533</div>\
        <div>50-60 min från/till Göteborg, via Floda Station.</div>\
        <div>Går 1 gång varannan timma</div>\
        <div>Avgår 15:05 från Göteborg</div>\
        <div>Sista turen till Göteborg är kl 02:56</div>\
        <br>\
        <div>\
            <a href="https://www.vasttrafik.se/#!/reseinformation/hallplatser/herreslia-lerum/" target="_blank">Hållplats info</a>\
        </div>';

    var trainContent = '\
        <div class="note">Floda Station - Västtågen</div>\
        <div>30 min från/till Göteborg.</div>\
        <div>Går 1 gång/halvtimma på dagen och 1 gång/timma på natten.</div>\
        <div>Sista turen kl 03:23</div>\
        <br>\
        <div>\
            <a href="https://www.vasttrafik.se/#!/reseinformation/hallplatser/floda-station-lerum/" target="_blank">Hållplats info</a>\
        </div>';

    var parkContent = '\
        <div class="note">Stor parkering</div>\
        <div>Följ anvisningar för att hitta till vigselplatsen.</div>';

    var activeInfo = null;

    createMarker('Gamla Övre Fabriken', { lat: 57.818200, lng: 12.420220 }, weddingIcon, weddingContent, true);
    createMarker('Gamla Övre Fabriken', { lat: 57.818318, lng: 12.419915 }, partyIcon, weddingContent);
    createMarker('Nääs Fabriker', { lat: 57.8199187, lng: 12.4167683 }, hotelIcon, hotel1Content);
    createMarker('Tollereds Hotell', { lat: 57.818593, lng: 12.4206548 }, hotelIcon, hotel2Content);
    createMarker('Nääs Slott', { lat: 57.8163351, lng: 12.4013127 }, hotelIcon, hotel3Content);
    createMarker('Herreslia - Buss', { lat: 57.817943, lng: 12.4205925 }, busIcon, busContent);
    createMarker('Floda Station - Pendeltåg', { lat: 57.8100649, lng: 12.3613318 }, trainIcon, trainContent);
    createMarker('Parkering', { lat: 57.818768, lng: 12.417407 }, parkIcon, parkContent);

    createLine([
        { lat: 57.818770, lng: 12.417490 }, 
        { lat: 57.819271, lng: 12.418724 }, 
        { lat: 57.818790, lng: 12.419735 }, 
        { lat: 57.818495, lng: 12.420002 }, 
        { lat: 57.818350, lng: 12.420120 }
    ]);

    createLine([
        { lat: 57.817943, lng: 12.4205925 },
        { lat: 57.818044, lng: 12.420587 },
        { lat: 57.818134, lng: 12.420233 },
        { lat: 57.818218, lng: 12.420210 },
    ]);

    function createMarker(title, position, icon, content, isMain) {
        var infoWindow = new google.maps.InfoWindow({ content: content });

        var marker = new google.maps.Marker({
            position: position,
            zIndex: isMain ? 10 : 1,
            map: map,
            title: title,
            icon: icon,
            infoWindow: infoWindow
        });

        marker.addListener('click', function() {
            if (activeInfo) {
                activeInfo.close();
            }
            infoWindow.open(map, marker);
            activeInfo = infoWindow;
        });

        if (isMain) {
            infoWindow.open(map, marker);
            activeInfo = infoWindow;
        }

        return marker;
    }

    function createLine(path) {

        var lineSymbol = {
            path: 'M 0, -1 0,1',
            strokeOpacity: 1,
            scale: 2
        };

        var line = new google.maps.Polyline({
            path: path,
            strokeOpacity: 0,
            icons: [{
                icon: lineSymbol,
                offset: '0%',
                repeat: '15px'
            }],
            map: map
        });

        return line;
    }

    
    /* ===== Packery ===== */
    //Ref: http://packery.metafizzy.co/
    //Ref: http://imagesloaded.desandro.com/

    var $container = $('#photos-wrapper');
    
    // init
    $container.imagesLoaded(function () {
        $container.packery({
            itemSelector: '.item',
            percentPosition: true
        });
    });
    

    $('#swish, #ica').on('click', function(e) {
        e.preventDefault();
        try {
            $(this).find('.number + input').select();
            var successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess($(this));
            }
        } 
        catch (err) {}
    });

    function showCopySuccess($el) {
        var $message = $el.siblings('.copy-message');
        $message.addClass('in');
        setTimeout(function() {
            $message.removeClass('in');
        }, 2000);
    }
    
    /* ======= RSVP Form (Dependent form field) ============ */
    $('#cguests').on("change", function(){
        
        if ($(this).val() == "") {
            $('.guestinfo-group').slideUp(); //hide
            console.log('not selected');
        } else if ($(this).val() == 'No Guests' ) {
            $('.guestinfo-group').slideUp(); //hide
            console.log('No guests');
            $('#cguestinfo').val('No Guests'); //Pass data to the field so mailer.php can send the form.
            
        } else {
            $('.guestinfo-group').slideDown(); //show
            $('#cguestinfo').val(''); //Clear data
            console.log('Has guests');
        }

       
    });
    
    /* ======= jQuery form validator ======= */ 
    /* Ref: http://jqueryvalidation.org/documentation/ */   
    $(".rsvp-form").validate({
		messages: {
		    name: {
    			required: 'Please enter your full name' //You can customise this message
			},
			email: {
				required: 'Please enter your email' //You can customise this message
			},
			events: {
				required: 'Are you attending?' //You can customise this message
			},
			guests: {
				required: 'How many guests?' //You can customise this message
			},
			guestinfo: {
				required: 'Please provide name(s)' //You can customise this message
			},
		}
	});
  

});