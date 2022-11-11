"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
          step: function step() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function complete() {
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
    .not('[href="#"]').not('[href="#0"]').on("click", function (event) {
      // On-page links
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
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
            if ($target.is(":focus")) {
              // Checking if the target was focused
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
      easeInOutExpo: function easeInOutExpo(x, t, b, c, d) {
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
    handler: function handler(direction) {
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
    handler: function handler(direction) {
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
  if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || typeof $.browser !== "undefined" && $.browser.msie == 1) {
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
    handler: function handler(direction) {
      $(".scroll-up").toggleClass("scroll-up-show");
    },
    offset: "bottom-in-view"
  });
  $(".sub-button").waypoint({
    handler: function handler(direction) {
      $(".scroll-up").toggleClass("scroll-up-show");
    },
    offset: "bottom-in-view"
  });
  /*--------------------------------
  		Others
  ----------------------------------*/
})(jQuery);
var video = document.querySelector('.cta-video');
video && video.addEventListener('click', function (e) {
  e.preventDefault();
  e.target.paused ? e.target.play() : e.target.pause();
});
if (video) {
  window.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var video;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            video = document.querySelector('.cta-video');
            if (video) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return", null);
          case 3:
            _context.next = 5;
            return video.firstElementChild.getAttribute('data-src');
          case 5:
            video.src = _context.sent;
            video.play();
          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}
var parallax = function parallax(id, rate) {
  var objectToParallax = document.getElementById(id);
  if (!objectToParallax) {
    return null;
  }
  var initParallax = function initParallax() {
    var x = objectToParallax.getBoundingClientRect().top / rate;
    var y = Math.round(x * 100 / 100);
    objectToParallax.style.backgroundPosition = "center ".concat(y, "px");
  };
  initParallax(id, rate);
  window.addEventListener('scroll', function () {
    initParallax(id, rate);
  });
};
parallax('palmTree', 3);
var images = document.querySelectorAll('.lazy');
observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > 0) {
      entry.target.src = entry.target.getAttribute('data-src');
      observer.unobserve(entry.target);
    }
  });
});
images.forEach(function (image) {
  observer.observe(image);
});
function getTwitterData(_x) {
  return _getTwitterData.apply(this, arguments);
}
function _getTwitterData() {
  _getTwitterData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url) {
    var request, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetch(url, {});
          case 3:
            request = _context2.sent;
            _context2.next = 6;
            return request.json();
          case 6:
            data = _context2.sent;
            return _context2.abrupt("return", data);
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", null);
          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _getTwitterData.apply(this, arguments);
}
function parseTwitterData(_x2) {
  return _parseTwitterData.apply(this, arguments);
}
function _parseTwitterData() {
  _parseTwitterData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url) {
    var container, classArr, list, liClasses, linkClasses, request, _request$image$data, profile_image_url, username, name, id, twitterImage, newImage, byline, myname;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            container = document.querySelector('.twitter-data');
            classArr = ['text-light', 'p-0', 'mx-auto', 'list-style-none'];
            classArr.forEach(function (classEl) {
              return container.classList.add(classEl);
            });
            list = document.createElement('ol');
            liClasses = new Array("p-2", "mb-3", "text-left", "tweet");
            linkClasses = new Array("d-block", "text-uppercase", "text-warning", "text-center");
            _context3.next = 9;
            return getTwitterData(url);
          case 9:
            request = _context3.sent;
            _request$image$data = request.image.data, profile_image_url = _request$image$data.profile_image_url, username = _request$image$data.username, name = _request$image$data.name, id = _request$image$data.id;
            twitterImage = document.getElementById("twitter-image");
            newImage = document.createElement('img');
            newImage.setAttribute('src', profile_image_url);
            newImage.style["float"] = "left";
            newImage.style.marginRight = "10px";
            twitterImage.append(newImage);
            byline = document.createElement('a');
            byline.setAttribute("href", "https://www.twitter.com/".concat(username));
            byline.setAttribute("title", name);
            byline.setAttribute("rel", "nofollow noreferrer");
            byline.textContent = username;
            twitterImage.append(byline);
            myname = document.createElement("p");
            myname.textContent = name;
            myname.classList.add("pl-3");
            myname.classList.add("pt-1");
            twitterImage.appendChild(myname);
            request.tweets.data.forEach(function (tweet, index) {
              if (index <= 2) {
                var li = document.createElement("li");
                var a = document.createElement('a');
                a.setAttribute("href", "https://twitter.com/elkcityhazard/status/".concat(tweet.id));
                linkClasses.forEach(function (classEl) {
                  return a.classList.add(classEl);
                });
                a.textContent = "view tweet";
                li.textContent = tweet.text;
                liClasses.forEach(function (classEl) {
                  return li.classList.add(classEl);
                });
                li.appendChild(a);
                list.append(li);
                console.log(tweet.text, tweet.id);
              } else {
                return;
              }
            });
            container.appendChild(list);
            _context3.next = 36;
            break;
          case 32:
            _context3.prev = 32;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", null);
          case 36:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 32]]);
  }));
  return _parseTwitterData.apply(this, arguments);
}
parseTwitterData("https://twitter.andrew-mccall.com/");
function getReviews(_x3) {
  return _getReviews.apply(this, arguments);
}
function _getReviews() {
  _getReviews = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(url) {
    var response, request, _request;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return fetch(url);
          case 3:
            request = _context4.sent;
            if (!(request.status !== 200)) {
              _context4.next = 12;
              break;
            }
            _context4.next = 7;
            return fetch("".concat(url, "/data.json"));
          case 7:
            _request = _context4.sent;
            _context4.next = 10;
            return _request.json();
          case 10:
            response = _context4.sent;
            return _context4.abrupt("return", response);
          case 12:
            _context4.next = 14;
            return request.json();
          case 14:
            response = _context4.sent;
            return _context4.abrupt("return", response);
          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);
          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return _getReviews.apply(this, arguments);
}
function reviewStars(starRating) {
  switch (starRating) {
    case "ONE":
      return "🔥";
      break;
    case "TWO":
      return "🔥🔥";
      break;
    case "THREE":
      return "🔥🔥🔥";
      break;
    case "FOUR":
      return "🔥🔥🔥🔥";
      break;
    case "FIVE":
      return "🔥🔥🔥🔥🔥";
      break;
    default:
      return "🔥🔥🔥🔥🔥";
  }
}
function parseReviews() {
  return _parseReviews.apply(this, arguments);
}
function _parseReviews() {
  _parseReviews = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var data, reviewContainer, reviews, averageRating, totalReviewCount, options;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return getReviews("https://twitter.andrew-mccall.com/reviews/data.json");
          case 3:
            data = _context5.sent;
            reviewContainer = document.getElementById("reviews");
            if (!(!reviewContainer || !data)) {
              _context5.next = 7;
              break;
            }
            return _context5.abrupt("return", null);
          case 7:
            console.log("Review Data: ", data);
            reviews = data.reviews, averageRating = data.averageRating, totalReviewCount = data.totalReviewCount; // request a weekday along with a long date
            options = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            };
            reviews.forEach(function (review, index) {
              var reviewHTML = "\n\t<div class=\"col-12 col-md-4 col-lg-3 card mx-auto opacity-0 wow fadeInUp\" data-wow-duration=\"1.5s\" data-wow-delay=\"".concat(.5 * index + "s", "\">\n                <div class=\"card-header text-center\">\n                    <span class=\"star-rating d-block mb-2 text-center\">").concat(reviewStars(review.starRating), "</span>\n                    <img src=\"").concat(review.reviewer.profilePhotoUrl, "\" alt=\"avatar\" class=\"fluid-img reviewer-image d-block mx-auto mb-3\">\n                    <h3 class=\"name d-block\">").concat(review.reviewer.displayName, "</h3>\n                </div>\n                <div class=\"card-body\">\n                    <p class=\"mb-3 text-left mx-auto\">").concat(review.comment, "</p>\n\t\t\t\t\t<details>\n\t\t\t\t\t\t<summary class=\"text-uppercase\"><strong>Response</strong></summary>\n\t\t\t\t\t\t<p>").concat(review.reviewReply.comment, "</p>\n\t\t\t\t\t</details>\n                </div>\n                <div class=\"footer\">\n                    ").concat(new Date(review.createTime).toLocaleDateString("en-US", options), "\n                </div>\n            </div>\n\t");
              reviewContainer.innerHTML += reviewHTML;
            });
            _context5.next = 16;
            break;
          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            throw new Error(_context5.t0);
          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 13]]);
  }));
  return _parseReviews.apply(this, arguments);
}
parseReviews();
