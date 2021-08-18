
 
 AOS.init({
  duration: 800,
  easing: 'slide-up',
  once: true
 });

(function($) {

	'use strict';

	// bootstrap dropdown hover

  // loader
  var loader = function() {
    setTimeout(function() { 
      if($('#loader').length > 0) {
        $('#loader').removeClass('show');
      }
    }, 1);
  };
  loader();

	
	$('nav .dropdown').hover(function(){
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			$this.find('.dropdown-menu').removeClass('show');
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

  $('.navbar .dropdown > a').click(function(){
    location.href = this.href;
  });


	// home slider
	$('.home-slider').owlCarousel({
    loop:true,
    autoplay: true,
    margin:0,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 1000,
    nav:true,
    autoplayHoverPause: true,
    items: 1,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:1,
        nav:false
      },
      1000:{
        items:1,
        nav:true
      }
    }
	});

  $('.home-slider-loop-false').owlCarousel({
    loop:false,
    autoplay: true,
    margin:0,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav:true,
    autoplayHoverPause: true,
    items: 1,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:1,
        nav:false
      },
      1000:{
        items:1,
        nav:true
      }
    }
  });

	// owl carousel
	var majorCarousel = $('.js-carousel-1');
	majorCarousel.owlCarousel({
    loop:true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 1000,
    nav: true,
    autoplayHoverPause: true,
    items: 3,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:3,
        nav:true,
        loop:false
      }
  	}
	});

	// owl carousel
	var major2Carousel = $('.js-carousel-2');
	major2Carousel.owlCarousel({
    loop:true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 4,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:3,
        nav:false
      },
      1000:{
        items:4,
        nav:true,
        loop:false
      }
  	}
	});


  $('.centernonloop').owlCarousel({
    center: true,
    items: 1,
    loop: false,
    margin: 30,
    smartSpeed: 1000,
    dots: true,
    responsive:{
      600:{
        items: 2
      },
      900:{
        items: 3
      }
    }
  });

  $('.centernonloop2').owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    autoplay: true,
    smartSpeed: 1000,
    dots: true,
  });



	var contentWayPoint = function() {
		var i = 0;
		$('.element-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('element-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .element-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn element-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft element-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight element-animated');
							} else {
								el.addClass('fadeInUp element-animated');
							}
							el.removeClass('item-animate');
						},  k * 100);
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();



})(jQuery);



$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
$(document)
  .keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
          $('#show-previous-image')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
          $('#show-next-image')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

// set lang arabic/english/spain
let arabic = document.getElementById("arabic");
let english = document.getElementById("english");
let spain = document.getElementById("spain");
let title = document.getElementById("title");
let contact = document.getElementById("contact");
let about = document.getElementById("about");
let product = document.getElementById("product");
let gallery = document.getElementById("gallery");

let aboutText = document.getElementById("aboutText");
let welcoh1 = document.getElementById("welcoh1");


arabic.onclick = ()=>{
    setLanugage("arabic");
    localStorage.setItem("Lang","arabic");
};

english.onclick = ()=>{
    setLanugage("english");
    localStorage.setItem("Lang","english");
};
spain.onclick = ()=>{
    setLanugage("spain");
    localStorage.setItem("Lang","spain");
};

onload = ()=>{
    setLanugage(localStorage.getItem("Lang","arabic"));
};
function setLanugage(getLanuage){
if(getLanuage === "arabic"){
    title.innerHTML =  "اوليف جاردنز" ;
    contact.innerHTML = "تواصل معنا";
    home.innerHTML = "الصفحه الرئيسيه";
    about.innerHTML = "من نحن ";
    product.innerHTML = " منتجاتنا ";
    gallery.innerHTML = " معرض الصور ";
    welcoh1.innerHTML = " مرحبا بكم فى اوليف جاردنز ";
    aboutText.innerHTML = " اوليف جاردنز هى شركة متخصصة فى انتاج زيتون المائدة والمخللات المتنوعة طبقا للمعايير الاروبيه";
    contactinfo.innerHTML = " معلومات الاتصال";
    openhour.innerHTML = " ساعات العمل";
    addrress.innerHTML = " :العنوان ";
    phone.innerHTML = " :رقم الهاتف ";
    mail.innerHTML = " الايميل";
    aboutfooter.innerHTML = " معلومات عنا";
    abfooter.innerHTML = "نحن شركة حدائق الزيتون للصناعات الغذائية المتخصصة<br> في تصنيع الزيتون منذ عام 1980 <br>حصلنا على شهادتي <br>ISO 9001-2000 (رقم التسجيل: 0604004 Q) و HACCP (رقم التسجيل: 0604004 H).";
    addr.innerHTML = " :المنطقه الصناعيه كوم اوشيم <br> المجموعه الثانيه : 115 &136 --جمهورية مصر العربيه - الفيوم ";
    secabout.innerHTML = " من نجن";
    title1.innerHTML = " اوليف جاردنز هى شركة متخصصة فى انتاج زيتون المائدة والمخللات المتنوعة طبقا للمعايير الاروبيه";
    client1.innerHTML = " عملاؤنا ";
    clienttit.innerHTML = " عملاؤنا هم سر نجاحنا لدينا عملاء فى اكثر من بلد مثل (اسبانيا- انجلترا -العراق- الاردن -السعوديه - ايطاليا) ";

    
   


    document.getElementById("arabic").style.visibility = "collapse";
    document.getElementById("english").style.visibility = "visible";
    document.getElementById("spain").style.visibility = "visible";

    document.getElementById("navdir"). dir ="rtl";
    document.getElementById("section1"). dir ="rtl";
    document.getElementById("lido").className += " service-blockar h3 p";    

    document.getElementById("navdir").style.fontFamily = "'Lalezar', cursive";
    document.getElementById("texthd").style.fontSize = "5rem";




// set lang /english
}else if(getLanuage ==="english"){
    title.innerHTML = "Olive Gardens";
    home.innerHTML = "Home";
    about.innerHTML = "About US";
    product.innerHTML = " Products ";
    gallery.innerHTML = " Gallery ";
    contact.innerHTML = "Contact Us";
    contactinfo.innerHTML = "Contact Info";
    openhour.innerHTML = " Opening Hours";
    addrress.innerHTML = "Address:";
    phone.innerHTML = "Phone:";
    mail.innerHTML = "Email:";
    addr.innerHTML = "Industrial Zone . Qum Oshem .Group 2. Half 115&136 Hif 4 .Elfayoum. Egypt";
    aboutfooter.innerHTML = " About Us";
    abfooter.innerHTML = "We are Olive Gardens Co. For Food Industries  Specialized In Olives Manufacture Since 1980 We have got ISO 9001-2000( registration no. : 0604004 Q ) & HACCP ( registration no. : 0604004 H) Certifications.";
    secabout.innerHTML = " About US";
    title1.innerHTML = "Olive Gardens is a company specialized in the production of table olives and various pickles according to European standards";




    document.getElementById("section1"). dir ="ltr";

    welcoh1.innerHTML = "  Welcome To Olive Gardens Co   ";
    aboutText.innerHTML = "is a company specialized in table olives production.  ";
    document.getElementById("english").style.visibility = "collapse";
    document.getElementById("arabic").style.visibility = "visible";
    document.getElementById("spain").style.visibility = "visible";
    document.getElementById("navdir"). dir ="ltr";
    document.getElementById("navdir").style.fontFamily = "'Lalezar', cursive";


    // set lang /spain

}else if(getLanuage ==="spain"){
    title.innerHTML = "Jardines de Olivos";
    home.innerHTML = "Página principal";
    about.innerHTML = "Sobre nosotros";
    product.innerHTML = " Productos ";
    gallery.innerHTML = " productos ";
    welcoh1.innerHTML = "Bienvenido a Olive Gardens Co";
    aboutText.innerHTML = "is a company specialized in table olives production.";
    contactinfo.innerHTML = "Datos de contacto"
    openhour.innerHTML = " Horario de apertura"
    addrress.innerHTML = "Dirección:"
    phone.innerHTML = "Teléfono:"
    mail.innerHTML = "E-mail:"
    addr.innerHTML = "Zona industrial . Qum Oshem .Grupo 2. Mitad 115 y 136 Hif 4 .Elfayoum. Egipto"
    aboutfooter.innerHTML = " Sobre nosotros";
    abfooter.innerHTML = "Somos Olive Gardens Co. Para Industrias Alimentarias Especializadas en la Fabricación de Aceitunas Desde 1980 Tenemos Certificaciones ISO 9001-2000 (número de registro: 0000000 Q) y HACCP (número de registro: 0000000 H).";
    secabout.innerHTML = " About US";
    title1.innerHTML = "Olive Gardens es una empresa especializada en la producción de aceitunas de mesa y encurtidos diversos según las normas europeas.";


    
    document.getElementById("spain").style.visibility = "collapse";
    document.getElementById("english").style.visibility = "visible";
    document.getElementById("arabic").style.visibility = "visible";
    document.getElementById("navdir"). dir ="ltr";
    document.getElementById("section1"). dir ="ltr";
    document.getElementById("navdir").style.fontFamily = "'Lalezar', cursive";

    contact.innerHTML = "Contact Us";

    
}

}







































