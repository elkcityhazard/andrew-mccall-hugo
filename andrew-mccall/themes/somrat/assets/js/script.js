(function ($) {
	'use strict';

	/*--------------------------------
	 Start Preloader Animation
	----------------------------------*/
	$(window).on('load', function () {
		$('.preloader').fadeOut(100);
	});

	/*--------------------------------
			End Preloader Animation
		----------------------------------*/

	// -----------------------------
	//  Count Up
	// -----------------------------
	function counter() {
		var oTop;
		if ($('.count').length !== 0) {
			oTop = $('.count').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.count').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 1000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}
	// -----------------------------
	//  On Scroll
	// -----------------------------
	$(window).on('scroll', function () {
		counter();
	});



	/*--------------------------------
	 Start Smooth Scrolling
	----------------------------------*/
	function smoothScroll() {
		// Select all links with hashes
		$('a[href*="#"]')
			// Remove links that don't actually link to anything
			.not('[href="#"]')
			.not('[href="#0"]')
			.on("click", function (event) {
				// On-page links
				if (
					location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
					location.hostname == this.hostname
				) {
					// Figure out element to scroll to
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					// Does a scroll target exist?
					if (target.length) {
						// Only prevent default if animation is actually gonna happen
						event.preventDefault();
						$('html, body').animate({
							scrollTop: target.offset().top
						}, 1000, "easeInOutExpo", function () {
							// Callback after animation
							// Must change focus!
							var $target = $(target);
							$target.focus();
							if ($target.is(":focus")) { // Checking if the target was focused
								return false;
							} else {
								$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
								$target.focus(); // Set focus again
							}
						});
					}
				}
			});
		jQuery.extend(jQuery.easing, {
			easeInOutExpo: function (x, t, b, c, d) {
				if (t == 0) return b;
				if (t == d) return b + c;
				if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		});
	}
	// Applying Smooth Scroll When The Browser Is Not Opera Mini Or UC Browser
	if (navigator.userAgent.indexOf('Opera Mini') == -1 || navigator.userAgent.indexOf('UCBrowser') != -1) {
		smoothScroll();
	}
	/*--------------------------------
			End Smooth Scrolling
	----------------------------------*/

	/*--------------------------------
	 Start Header
		----------------------------------*/
	// Initiating Background Slider
	var backgroundSlide = $('#background-slide');
	backgroundSlide.owlCarousel({
		loop: true,
		items: 1,
		dots: false,
		autoplay: true,
		autoplayTimeout: 5000,
		animateOut: 'fadeOut'
	});
	$('.slider-prev-button').on("click", function () {
		backgroundSlide.trigger('prev.owl.carousel');
	});
	$('.slider-next-button').on("click", function () {
		backgroundSlide.trigger('next.owl.carousel');
	});
	// Setting Up Background Images
	function SliderBackground() {
		if ($(".owl-full-width .slider").length) {
			$(".owl-full-width .slider").each(function () {
				var $this = $(this);
				var img = $this.children(img);
				var imgSrc = img.attr("src");
				$this.css({
					backgroundImage: "url(" + imgSrc + ")",
					backgroundSize: "cover",
					backgroundPosition: "center center"
				});
			});
		}
	}
	// Initializing Background Setting Function
	SliderBackground();
	// Toggle Fullscreen Navigation
	$('#burger').on("click", function () {
		$(".fullscreen-nav-container").slideToggle(300);
	});
	$(".fullscreen-nav-holder a, .turn-home").on("click", function () {
		$("#burger").trigger("click");
	});
	/*--------------------------------
		 End Header
	----------------------------------*/

	/*--------------------------------
	Start Menu
		----------------------------------*/
	// Highlighting Menu on Scroll Through Sections
	$(window).on('scroll', function () {
		$('section').each(function () {
			if ($(window).scrollTop() + 50 >= $(this).offset().top) {
				var id = $(this).attr('id');
				$('.menu-item').removeClass('active');
				$(".menu-item." + id).addClass("active");
				$(".mobile-menu-item").removeClass("active");
				$(".mobile-menu-item." + id).addClass("active");
			}
		});
	});

	// Styling Menu on Scroll
	$('.about-me').waypoint({
		handler: function (direction) {
			// Fixing Menu after leaving Header Section
			$(".menu").toggleClass("menu-fix");
			// Changing Menu background after leaving Header Section
			$(".menu-container").toggleClass("menu-normal");
			$(".menu-item").toggleClass("menu-item-transparent");
			$(".desktop-menu .hvr-underline-from-left").toggleClass("dark");
			// Toggling Mobile Menu Visibility
			$(".mobile-menu").toggleClass("mobile-menu-fix");
			// Auto-Collapsing Mobile Menu When Left Open
			var a = $(".menu-link").attr("class");
			if (direction == "up" && a == "menu-link active") {
				$(".menu-link").trigger("click");
			}
		}
	});

	// Toggle Mobile Menu
	$('.mobile-menu a').on("click", function () {
		$(".menu-link").toggleClass("active");
		$(".menu-slider").slideToggle(500);
	});
	/*--------------------------------
			 End Menu
		----------------------------------*/

	/*--------------------------------
			Start About Me
	----------------------------------*/
	// Initializing Skillbar Animation
	$('.skill h3').waypoint({
		handler: function (direction) {
			if (direction == "up") {
				$('.skillbar').each(function () {
					$(this).find('.skillbar-bar').css("width", "0");
				});
			} else if (direction == "down") {
				$('.skillbar').each(function () {
					$(this).find('.skillbar-bar').animate({
						width: jQuery(this).attr('data-percent')
					}, 2000);
				});
			}
		},
		offset: 'bottom-in-view'
	});
	/*--------------------------------
			End About Me
	----------------------------------*/

	/*--------------------------------
			 Start Portfolio
	----------------------------------*/
	// Shuffle js filter 
	var containerEl = document.querySelector('.filtr-wrapper');
	if (containerEl) {
		var Shuffle = window.Shuffle;
		var myShuffle = new Shuffle(document.querySelector('.filtr-wrapper'), {
			itemSelector: '.filtr-item',
			buffer: 1
		});

		jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
			var input = evt.currentTarget;
			if (input.checked) {
				myShuffle.filter(input.value);
			}
		});
	}

	// Initialize MagnificPopup Plugin
	$('.filtr-wrapper').magnificPopup({
		type: 'image',
		delegate: '.image-pop',
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out'
		}
	});
	/*--------------------------------
			 End Portfolio
	----------------------------------*/

	/*--------------------------------
			 Start Testimonials
	----------------------------------*/
	// Configure and Initialize Owl Carousel
	$(".owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		autoplay: true,
		autoplayTimeout: 3000
	});
	/*--------------------------------
			End Testimonials
	----------------------------------*/

	/*--------------------------------
			Start Code for Mobile Devices
	----------------------------------*/
	// Code for Opera Mini
	var vh = $(window).height();
	if (navigator.userAgent.indexOf('Opera Mini') != -1) {
		// Setting Fun Facts Value Immediately 
		work.start();
		happyClient.start();
		projects.start();
		coffee.start();
		// Setting Skillbar Value Immediately
		$('.skillbar').each(function () {
			$(this).find('.skillbar-bar').animate({
				width: jQuery(this).attr('data-percent')
			}, 0);
		});
		// Removing Bootstrap Class and Re-Style Input
		$("input").removeClass("form-control");
		$("input").css({
			"width": "100%",
			"height": "50px",
			"background": "#fff"
		});
		// Removing Full-Screen Nav
		$(".navigation-icon").css("display", "none");
	}

	// Code For UC Browser
	if (navigator.userAgent.indexOf('UCBrowser') != -1) {
		// Removing Full-Screen Nav
		$(".navigation-icon").css("display", "none");
		$(".fun-facts").css({
			"display": "table",
			"margin": "auto"
		});
		// Setting Fun Facts Value Immediately 
		work.start();
		happyClient.start();
		projects.start();
		coffee.start();
		// Setting Skillbar Value Immediately
		$('.skillbar').each(function () {
			$(this).find('.skillbar-bar').animate({
				width: jQuery(this).attr('data-percent')
			}, 0);
		});
	}
	/*--------------------------------
			End Code for Mobile Devices
	----------------------------------*/

	/*--------------------------------
			Others
	----------------------------------*/
	// Code for Internet Explorer
	if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
		$(".header, .fullscreen-nav-container, .like-me, .contact").css("background-attachment", "scroll");
		$(".fullscreen-nav-holder").css("width", "100vw");
	}

	// Wow Plugin Initialization
	var wow = new WOW({
		animateClass: 'animated',
		offset: 70,
		mobile: false
	});
	wow.init();

	// Toggling Visibility of Scroll Up Button
	$(".about-me-images").waypoint({
		handler: function (direction) {
			$(".scroll-up").toggleClass("scroll-up-show");
		},
		offset: "bottom-in-view"
	});
	$(".sub-button").waypoint({
		handler: function (direction) {
			$(".scroll-up").toggleClass("scroll-up-show");
		},
		offset: "bottom-in-view"
	});
	/*--------------------------------
			Others
	----------------------------------*/
}(jQuery));


const video = document.querySelector('.cta-video');


video && video.addEventListener('click', (e) => {
	e.preventDefault()
	e.target.paused ? e.target.play() : e.target.pause()

})

if (video) {
	window.onload = async function() {
		const video = document.querySelector('.cta-video');
		if (!video) {
			return null
		}
		video.src = await video.firstElementChild.getAttribute('data-src')
		video.play()
	}
}



const parallax = (id, rate) => {
	let objectToParallax = document.getElementById(id);

	if (!objectToParallax) {
		return null
	}
	const initParallax = () => {
	  let x = objectToParallax.getBoundingClientRect().top / rate;
	  let y = Math.round((x * 100) / 100);
	  objectToParallax.style.backgroundPosition = `center ${y}px`;
	}
  
	initParallax(id, rate);
	window.addEventListener('scroll', function() {
	  initParallax(id, rate);
	})
  }
  
  parallax('palmTree', 3)




  const images = document.querySelectorAll('.lazy');

observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.src = entry.target.getAttribute('data-src')
	  observer.unobserve(entry.target)
    }
  });
});

images.forEach(image => {
  observer.observe(image);
});


async function getTwitterData(url) {

	try {

		const request = await fetch(url, {
		})
		const data = await request.json()

		return data

	} catch (err) {
		console.log(err)
		return null

	}

} 

async function parseTwitterData (url) {
	try {

		const container = document.querySelector('.twitter-data')
		const classArr = ['text-light', 'p-0', 'mx-auto', 'list-style-none']


		classArr.forEach(classEl => container.classList.add(classEl))


		const list = document.createElement('ol')

		const liClasses = new Array("p-2", "mb-3", "text-left", "tweet")

		const linkClasses = new Array("d-block", "text-uppercase", "text-warning", "text-center")


		const request = await getTwitterData(url)

		const {profile_image_url, username, name, id } = request.image.data


		const twitterImage = document.getElementById("twitter-image")

		const newImage = document.createElement('img')

		newImage.setAttribute('src', profile_image_url)

		newImage.style.float = "left"
		newImage.style.marginRight = "10px"

		twitterImage.append(newImage)

		const byline = document.createElement('a')
		byline.setAttribute("href", `https://www.twitter.com/${username}`)
		byline.setAttribute("title", name)
		byline.setAttribute("rel", "nofollow noreferrer")
		byline.textContent = username

		twitterImage.append(byline)

		const myname = document.createElement("p")
		myname.textContent = name

		myname.classList.add("pl-3")
		myname.classList.add("pt-1")

		twitterImage.appendChild(myname)

		request.tweets.data.forEach((tweet, index) => {
			if (index <= 2) {
				const li = document.createElement("li")
			const a = document.createElement('a')
			a.setAttribute("href", `https://twitter.com/elkcityhazard/status/${tweet.id}` )
			linkClasses.forEach(classEl => a.classList.add(classEl))
			a.textContent = "view tweet"
			li.textContent = tweet.text
			liClasses.forEach((classEl) => li.classList.add(classEl))
			li.appendChild(a)
			list.append(li)


			console.log(tweet.text, tweet.id)
			} else {
				return
			}
		})


		container.appendChild(list)
		

	} catch (err) {
		console.log(err)
		return null
	}
}

parseTwitterData("https://twitter.andrew-mccall.com/")



async function getReviews (url) {
	try {

		let response 

		const request = await fetch(url)
		if (request.status !== 200) {
			const request = await fetch(`${url}/data.json`)
			response = await request.json()
			return response 
		}

		response = await request.json();


		return response

	} catch (err) {
		throw new Error(err)
	}
}


function reviewStars(starRating) {
	switch (starRating) {
		case "ONE":
			return "🔥"
			break;
		case "TWO":
			return "🔥🔥"
			break;
		case "THREE":
			return "🔥🔥🔥"
			break;
		case "FOUR":
			return "🔥🔥🔥🔥"
			break;
		case "FIVE":
			return "🔥🔥🔥🔥🔥"
			break;
		default:
			return "🔥🔥🔥🔥🔥"
	}
}


async function parseReviews () {
	try {

	const data = await getReviews("https://twitter.andrew-mccall.com/reviews")
	const reviewContainer = document.getElementById("reviews")

	if (!reviewContainer || !data) {
		return null
	}

	console.log("Review Data: ", data)

	const {reviews, averageRating, totalReviewCount} = data

	// request a weekday along with a long date
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };	

	reviews.forEach((review, index) => {

		const reviewHTML = `
	<div class="col-12 col-md-4 card mx-auto opacity-0 wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="${.5 * index + "s"}">
                <div class="card-header text-center">
                    <span class="star-rating d-block mb-2 text-center">${reviewStars(review.starRating)}</span>
                    <img src="${review.reviewer.profilePhotoUrl}" alt="avatar" class="fluid-img reviewer-image d-block mx-auto mb-3">
                    <h3 class="name d-block">${review.reviewer.displayName}</h3>
                </div>
                <div class="card-body">
                    <p class="mb-3 text-left mx-auto">${review.comment}</p>
					<details>
						<summary class="text-uppercase"><strong>Response</strong></summary>
						<p>${review.reviewReply.comment}</p>
					</details>
                </div>
                <div class="footer">
                    ${new Date(review.createTime).toLocaleDateString("en-US", options)}
                </div>
            </div>
	`

	reviewContainer.innerHTML += reviewHTML

	})



	} catch (err) {
		throw new Error(err)
	}
}

parseReviews()
