jQuery(function ($) {
	"use strict";
	// Magnific Popup
	if (typeof $(document).magnificPopup !== "undefined") {
		$(".qubely-video-popup").magnificPopup({
			type: "iframe",
			rtl: true,
			mainClass: "mfp-fade",
			removalDelay: 300,
			preloader: false,
			fixedContentPos: false,
		});
	}

	//Table of Contents
	if (document.getElementsByClassName("qubely-table-of-contents").length > 0) {
		let tocOffsetTop = $(".qubely-table-of-contents").data("scroll-offset");
		tocOffsetTop = typeof tocOffsetTop !== "undefined" && tocOffsetTop ? parseInt(tocOffsetTop) : 0;

		$(".qubely-table-of-contents-body a").on("click", function () {
			let currentAnchor = $(this).attr("href");
			currentAnchor = $(`${currentAnchor}`)[0].offsetTop;
			$("html, body").animate(
				{
					scrollTop: currentAnchor > tocOffsetTop ? currentAnchor + tocOffsetTop : currentAnchor,
				},
				400
			);
		});

		$(".qubely-table-of-contents-toggle a").on("click", function () {
			const parentElem = $(this).parent(".qubely-table-of-contents-toggle");
			parentElem.toggleClass("qubely-toc-collapsed");

			parentElem.closest(".qubely-table-of-contents").find(".qubely-table-of-contents-body").slideToggle(300);
		});

		if (!$(".block-editor-block-list__layout").length) {
			$(".qubely-back-to-top-button").on("click", function (e) {
				e.preventDefault();
				$("html, body").animate(
					{
						scrollTop: 0,
					},
					800
				);
			});

			const backToTop = $(".qubely-back-to-top-button");

			if (typeof backToTop[0] !== "undefined") {
				window.onscroll = () => {
					if ($(window).scrollTop() > 300) {
						backToTop[0].classList.add("qubely-show-scroll");
					} else {
						backToTop[0].classList.remove("qubely-show-scroll");
					}
				};
			}
		}
	}
	//ACCORDION BLOCK
	$(".qubely-block-accordion:not(.qubely-accordion-ready)").each(function () {
		const $accordion = $(this);
		const itemToggle = $accordion.attr("data-item-toggle");
		$accordion.addClass("qubely-accordion-ready");
		$accordion.on("click", ".qubely-accordion-item .qubely-accordion-panel", function (e) {
			e.preventDefault();

			const $selectedItem = $(this).parent(".qubely-accordion-item");
			const $selectedItemContent = $selectedItem.find(".qubely-accordion-body");
			const isActive = $selectedItem.hasClass("qubely-accordion-active");

			if (isActive) {
				$selectedItemContent.css("display", "block").slideUp(150);
				$selectedItem.removeClass("qubely-accordion-active");
			} else {
				$selectedItemContent.css("display", "none").slideDown(150);
				$selectedItem.addClass("qubely-accordion-active");
			}

			if (itemToggle == "true") {
				const $collapseItems = $accordion.find(".qubely-accordion-active").not($selectedItem);
				if ($collapseItems.length) {
					$collapseItems.find(".qubely-accordion-body").css("display", "block").slideUp(150);
					$collapseItems.removeClass("qubely-accordion-active");
				}
			}
		});
	});

	//TAB BLOCK
	function progress(parentElement, elem, delay) {
		if (typeof elem === "undefined") {
			return;
		}
		$(".qubely-tab-item", parentElement).each(function () {
			$(this).find(".progress").css({
				width: "0%",
				transition: "width 0s",
			});
		});
		elem.style.width = "100%";
		elem.style.transition = "width " + delay + "s";
	}

	var timeouts = [];
	function clearTimeouts() {
		for (let i = 0; i < timeouts.length; i++) {
			clearTimeout(timeouts[i]);
		}
	}
	$(".qubely-tab-title").on("click", function (event) {
		clearTimeouts();
		var $qubelyTab = $(this).parent();
		var qubelyTabNav = $($qubelyTab).parent();
		$(".qubely-tab-item.qubely-active .progress", qubelyTabNav).css({
			width: "0%",
			transition: "width 0s",
		});
		var qubelyIndex = $qubelyTab.index();
		if ($qubelyTab.hasClass("qubely-active")) {
			return;
		}
		$qubelyTab.closest(".qubely-tab-nav").find(".qubely-active").removeClass("qubely-active");
		$qubelyTab.addClass("qubely-active");
		$qubelyTab.closest(".qubely-block-tab").find(".qubely-tab-content.qubely-active").removeClass("qubely-active");
		$qubelyTab.closest(".qubely-block-tab").find(".qubely-tab-content").eq(qubelyIndex).addClass("qubely-active");
	});

	$(".qubely-block-tab.with-auto-swithing").each(function () {
		const currentElement = $(this)[0];
		let defaultdelay = parseInt(currentElement.dataset.defaultdelay);
		let tabs = parseInt(currentElement.dataset.tabs);
		let effectiveDelays = Array(tabs).fill(defaultdelay);
		let tabIndex = 0;

		$(".qubely-tab-item", currentElement).each(function (index) {
			if (typeof $(this)[0].dataset.customdelay !== "undefined") {
				effectiveDelays[index] = parseInt($(this)[0].dataset.customdelay);
			}
		});

		let changeTab = function () {
			let activeTab = $(".qubely-tab-item.qubely-active", currentElement);
			let current = $(".qubely-tab-item", currentElement).index(activeTab);
			tabIndex++;
			let idx = current;
			let max = $(".qubely-tab-item", currentElement).length - 1;
			idx = current < max ? idx + 1 : 0;
			// $('.qubely-tab-item:not(.qubely-backend):eq(' + idx + ') .qubely-tab-title', currentElement).click();
			var $qubelyTab = $(
				".qubely-tab-item:not(.qubely-backend):eq(" + idx + ") .qubely-tab-title",
				currentElement
			).parent();
			var qubelyIndex = $qubelyTab.index();
			if ($qubelyTab.hasClass("qubely-active")) {
				return;
			}

			$qubelyTab.closest(".qubely-tab-nav").find(".qubely-active").removeClass("qubely-active");
			$qubelyTab.addClass("qubely-active");
			$qubelyTab
				.closest(".qubely-block-tab")
				.find(".qubely-tab-content.qubely-active")
				.removeClass("qubely-active");
			$qubelyTab
				.closest(".qubely-block-tab")
				.find(".qubely-tab-content")
				.eq(qubelyIndex)
				.addClass("qubely-active");
			progress(currentElement, $qubelyTab.find(".progress")[0], parseInt($qubelyTab[0].dataset.customdelay));
			timeouts.push(setTimeout(changeTab, effectiveDelays[tabIndex % tabs] * 1000));
		};
		timeouts.push(setTimeout(changeTab, effectiveDelays[0] * 1000));
		progress(
			currentElement,
			$(".qubely-tab-item.qubely-active", currentElement).find(".progress")[0],
			effectiveDelays[0]
		);
	});

	//Vertical TAB BLOCK
	$(".qubely-vertical-tab-item-button").on("click", function (event) {
		var $that = $(this);
		var $currentNav = $that.parent();
		if ($currentNav.hasClass("qubely-vertical-active")) {
			return;
		}

		var $parentTab = $that.closest(".qubely-block-vertical-tab");
		var $currentNavIndex = $currentNav.index();

		// nav
		$parentTab.find(".qubely-vertical-tab-item").removeClass("qubely-vertical-active");
		$currentNav.addClass("qubely-vertical-active");

		// nav content
		$parentTab.find(".qubely-vertical-tab-nav-text").slideUp(300);
		$that.find(".qubely-vertical-tab-nav-text").slideDown(300);

		// body
		var $currentTabBody = $currentNav.closest(".qubely-vertical-tab-nav").next();
		var $currentVerticalContent = $currentTabBody.find(".qubely-tab-content").eq($currentNavIndex);

		$parentTab.find(".qubely-tab-content").removeClass("qubely-vertical-active").fadeOut(0);
		$currentVerticalContent.addClass("qubely-vertical-active").fadeIn();
	});

	//Carousel BLOCK
	$(".qubely-carousel-title").on("click", function (event) {
		var $qubelyCarousel = $(this).parent();
		var qubelyCarouselIndex = $qubelyCarousel.index();

		if ($qubelyCarousel.hasClass("qubely-active")) {
			return;
		}
		$qubelyCarousel.closest(".qubely-carousel-nav-wraper").find(".qubely-active").removeClass("qubely-active");
		$qubelyCarousel.addClass("qubely-active");
		$qubelyCarousel
			.closest(".qubely-block-carousel")
			.find(".qubely-carousel-item.qubely-active")
			.hide()
			.removeClass("qubely-active");
		$qubelyCarousel
			.closest(".qubely-block-carousel")
			.find(".qubely-carousel-item")
			.eq(qubelyCarouselIndex)
			.fadeIn(400, function () {
				$(this).addClass("qubely-active");
			});
	});
	$(".qubely-carousel-nav").on("click", function (event) {
		let $qubelyCarouselBody = $(this).parent();
		let $qubelyCarouselBlock = $qubelyCarouselBody.closest(".qubely-block-carousel");
		let $nav = $(this);
		let direction = $nav.attr("data-direction");
		let items = $nav.attr("data-items");

		let activeItemlIndex = $(".qubely-carousel-item-indicator.qubely-active").index(
			".qubely-carousel-item-indicator"
		);
		let nextActiveItem =
			direction === "next"
				? activeItemlIndex < items - 1
					? activeItemlIndex + 1
					: 0
				: activeItemlIndex > 0
				? activeItemlIndex - 1
				: items - 1;

		$qubelyCarouselBlock.find(".qubely-carousel-item.qubely-active").hide().removeClass("qubely-active");
		$qubelyCarouselBlock.find(".qubely-carousel-item-indicator.qubely-active").removeClass("qubely-active");
		$qubelyCarouselBlock
			.find(".qubely-carousel-item")
			.eq(nextActiveItem)
			.fadeIn(400, function () {
				$(this).addClass("qubely-active");
			});
		$qubelyCarouselBlock.find(".qubely-carousel-item-indicator").eq(nextActiveItem).addClass("qubely-active");
	});
});

(function ($) {
	var inviewObjects = {},
		viewportSize,
		viewportOffset,
		d = document,
		w = window,
		documentElement = d.documentElement,
		expando = $.expando,
		timer;

	$.event.special.inview = {
		add: function (data) {
			inviewObjects[data.guid + "-" + this[expando]] = { data: data, $element: $(this) };
			if (!timer && !$.isEmptyObject(inviewObjects)) {
				timer = setInterval(checkInView, 250);
			}
		},

		remove: function (data) {
			try {
				delete inviewObjects[data.guid + "-" + this[expando]];
			} catch (e) {}
			if ($.isEmptyObject(inviewObjects)) {
				clearInterval(timer);
				timer = null;
			}
		},
	};

	function getViewportSize() {
		var mode,
			domObject,
			size = { height: w.innerHeight, width: w.innerWidth };
		if (!size.height) {
			mode = d.compatMode;
			if (mode || !$.support.boxModel) {
				// IE, Gecko
				domObject =
					mode === "CSS1Compat"
						? documentElement // Standards
						: d.body; // Quirks
				size = {
					height: domObject.clientHeight,
					width: domObject.clientWidth,
				};
			}
		}

		return size;
	}

	function getViewportOffset() {
		return {
			top: w.pageYOffset || documentElement.scrollTop || d.body.scrollTop,
			left: w.pageXOffset || documentElement.scrollLeft || d.body.scrollLeft,
		};
	}

	function checkInView() {
		var $elements = $(),
			elementsLength,
			i = 0;

		$.each(inviewObjects, function (i, inviewObject) {
			var selector = inviewObject.data.selector,
				$element = inviewObject.$element;
			$elements = $elements.add(selector ? $element.find(selector) : $element);
		});

		elementsLength = $elements.length;
		if (elementsLength) {
			viewportSize = viewportSize || getViewportSize();
			viewportOffset = viewportOffset || getViewportOffset();

			for (; i < elementsLength; i++) {
				if (!$.contains(documentElement, $elements[i])) {
					continue;
				}

				var $element = $($elements[i]),
					elementSize = { height: $element.height(), width: $element.width() },
					elementOffset = $element.offset(),
					inView = $element.data("inview"),
					visiblePartX,
					visiblePartY,
					visiblePartsMerged;

				if (!viewportOffset || !viewportSize) {
					return;
				}

				if (
					elementOffset.top + elementSize.height > viewportOffset.top &&
					elementOffset.top < viewportOffset.top + viewportSize.height &&
					elementOffset.left + elementSize.width > viewportOffset.left &&
					elementOffset.left < viewportOffset.left + viewportSize.width
				) {
					visiblePartX =
						viewportOffset.left > elementOffset.left
							? "right"
							: viewportOffset.left + viewportSize.width < elementOffset.left + elementSize.width
							? "left"
							: "both";
					visiblePartY =
						viewportOffset.top > elementOffset.top
							? "bottom"
							: viewportOffset.top + viewportSize.height < elementOffset.top + elementSize.height
							? "top"
							: "both";
					visiblePartsMerged = visiblePartX + "-" + visiblePartY;
					if (!inView || inView !== visiblePartsMerged) {
						$element
							.data("inview", visiblePartsMerged)
							.trigger("inview", [true, visiblePartX, visiblePartY]);
					}
				} else if (inView) {
					$element.data("inview", false).trigger("inview", [false]);
				}
			}
		}
	}

	$(w).bind("scroll resize scrollstop", function () {
		viewportSize = viewportOffset = null;
	});

	if (!documentElement.addEventListener && documentElement.attachEvent) {
		documentElement.attachEvent("onfocusin", function () {
			viewportOffset = null;
		});
	}

	$(document).on("inview", "[data-qubelyanimation]", function (event, visible, visiblePartX, visiblePartY) {
		var $this = $(this);
		if (visible) {
			let animation = $this.data("qubelyanimation");
			if (animation && typeof animation.name != "undefined" && animation.openAnimation != 0) {
				setTimeout(() => {
					$this.css({ opacity: 1 });
				}, parseInt(animation.delay) + 100);
				$this.css({
					"animation-name": animation.name,
					"animation-timing-function": animation.curve,
					"animation-duration": animation.duration + "ms",
					"animation-delay": animation.delay + "ms",
					"animation-iteration-count": animation.repeat === "once" ? 1 : "infinite",
				});
			}
		}
		$this.unbind("inview");
	});

	// Parallax
	var $window = $(window);
	var windowHeight = $window.height();
	$window.resize(function () {
		windowHeight = $window.height();
	});
	$.fn.parallax = function (xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		$this.each(function () {
			firstTop = $this.offset().top;
		});
		if (outerHeight) {
			getHeight = function (jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function (jqo) {
				return jqo.height();
			};
		}
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		function update() {
			var pos = $window.scrollTop();
			$this.each(function () {
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}
				$this.css("backgroundPosition", xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}
		$window.bind("scroll", update).resize(update);
		update();
	};
	if (typeof jQuery.fn.parallax !== "undefined") {
		$(document).ready(function () {
			$(".qubely-row-parallax").each(function () {
				$(this).parallax("center", 0.4);
			});
		});
	}

	// check if element in viewport
	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	$(document).on("ready", function () {
		//Countdown Block
		$(".qubely-block-pie-progress").each(function () {
			var $that = $(this);
			var circle = $that.find("circle:last-child");
			var pieOffset = circle.data("dashoffset");
			var transition = circle.data("transition");
			var duration = circle.data("transition-duration");
			var progressCount = $that.find(".qubely-pie-counter");
			var number = parseInt(circle.data("percent"));

			if (parseInt(duration) > 0) {
				progressCount.html(0);
			}

			var pieEvent = function () {
				if (isElementInViewport($that.find("svg")[0])) {
					circle.css("transition", transition);
					circle.attr("stroke-dashoffset", pieOffset);
					if (parseInt(duration) > 0) {
						progressCounter();
					}
					window.removeEventListener("scroll", pieEvent, true);
				}
			};

			var progressCounter = function () {
				var current = 0;
				var time = parseInt(duration);
				var interval = Math.ceil(time / number);

				var timer = function () {
					if (current >= number) {
						intvlId && clearInterval(intvlId);
					}
					progressCount.html(current);
					current++;
				};
				var intvlId = setInterval(timer, interval);
			};

			window.addEventListener("scroll", pieEvent, true);
			pieEvent();
		});

		//Counter Block
		$(".qubely-block-counter-number").each(function () {
			const currentElement = $(this)[0];
			let start = parseInt(currentElement.dataset.start),
				limit = parseInt(currentElement.dataset.limit),
				counterDuration = parseInt(currentElement.dataset.counterduration),
				increment = Math.ceil((limit / counterDuration) * 10);

			const invokeCounter = () => {
				if (isElementInViewport(currentElement)) {
					if (start < limit) {
						let intervalId = setInterval(function () {
							let difference = limit - start;
							difference >= increment ? (start += increment) : difference >= 50 ? (start += 50) : start++;
							currentElement.innerText = start;
							if (start >= limit) {
								clearInterval(intervalId);
							}
						}, 10);
					}
					window.removeEventListener("scroll", invokeCounter, true);
				}
			};
			invokeCounter();
			window.addEventListener("scroll", invokeCounter, true);
		});
	});

	/**
	 * Settings tab
	 */

	var qubelySettingsTabContent = $("#qubely-settings-tabs-content");
	var qubelySettingTabs = $("#qubely-settings-tabs a");

	qubelySettingTabs.on("click", function (e) {
		e.preventDefault();
		history.pushState({}, "", this.href);
		var anchor = $(this).attr("href");
		qubelySettingsTabContent.find(".qubely-settings-inner").hide();
		qubelySettingsTabContent.find(anchor).show();

		qubelySettingTabs.removeClass("nav-tab-active");
		$(this).addClass("nav-tab-active");
	});

	if (qubelySettingsTabContent.length) {
		if (window.location.hash) {
			qubelySettingTabs.removeClass("nav-tab-active");
			$("#qubely-settings-tabs a[href=" + window.location.hash + "]").addClass("nav-tab-active");
			qubelySettingsTabContent.find(".qubely-settings-inner").hide();
			qubelySettingsTabContent.find(window.location.hash).show();
		} else {
			qubelySettingTabs.removeClass("nav-tab-active");
			qubelySettingTabs.first().addClass("nav-tab-active");
			qubelySettingsTabContent.find(".qubely-settings-inner").hide();
			qubelySettingsTabContent.find(".qubely-settings-inner").first().show();
		}
	}
	// postgrid-pro loadmore

	/*$('.qubely-postgrid-loadmore').on('click', function () {
        var self = $(this);
        var page = parseInt(self.data('page'));
        var maxPage = parseInt(self.data('max-page'));
        $.ajax({
            url: qubely_urls.ajax,
            data: {
                action: 'post_grid_loadmore',
                page: page
            }
        }).success(function (response) {
            /!*$('.qubely-postgrid-wrapper').html(response);
            self.data('page', page + 1);
            if(page === maxPage) {
                self.remove();
            }*!/
            console.log(response);
        })
    });*/

	var qubelyGsPostWrap = $(".qubely-gs-card-blog-posts");
	if (qubelyGsPostWrap.length) {
		function generatePostMarkup(post) {
			var div = document.createElement("div");
			div.classList.add("qubely-gs-post-card");

			var anchor1 = document.createElement("a");
			anchor1.setAttribute("href", post.link);

			var img = document.createElement("img");
			if (post.qubely_featured_image_url && post.qubely_featured_image_url.medium_large) {
				img.setAttribute("src", post.qubely_featured_image_url.medium_large[0]);
			}

			anchor1.appendChild(img);

			var span = document.createElement("span");
			var date = new Date(post.date);
			span.innerText = `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`;

			var anchor2 = document.createElement("a");
			anchor2.setAttribute("href", post.link);

			$(anchor2).html(post.title.rendered);

			div.appendChild(anchor1);
			div.appendChild(span);
			div.appendChild(anchor2);
			return div;
		}

		function printPostMarkup(posts) {
			$(".qubely-gs-post-items-wrap").empty();
			posts.forEach((post) => {
				$(".qubely-gs-post-items-wrap").append(generatePostMarkup(post));
			});
		}

		function fetchPost() {
			var cacheTime = localStorage.getItem("__qubely_themeum_post_time");
			var cachedPost = localStorage.getItem("__qubely_themeum_post");

			if (!cachedPost || !parseInt(cacheTime) > Date.now()) {
				var endpoint =
					"https://www.themeum.com/wp-json/wp/v2/posts?per_page=3&status=publish&orderby=date&categories=1486";
				fetch(endpoint)
					.then((response) => response.json())
					.then((res) => {
						if (Array.isArray(res)) {
							printPostMarkup(res);
							localStorage.setItem("__qubely_themeum_post_time", Date.now() + 3600e3);
							localStorage.setItem("__qubely_themeum_post", JSON.stringify(res));
						} else {
							qubelyGsPostWrap.remove();
						}
					})
					.catch((e) => {
						qubelyGsPostWrap.remove();
					});
			} else {
				var posts = JSON.parse(cachedPost);
				printPostMarkup(posts);
			}
		}

		// fetchPost();
	}

	var sectionCount = $(".qubely-gs-section-count");
	if (sectionCount.length) {
		var endpoint = "https://qubely.io/wp-json/wp/v2/sections";
		var cacheTime = localStorage.getItem("__qubely_section_count_time");
		var cachedCount = localStorage.getItem("__qubely_section_count");
		if (!cachedCount || !parseInt(cacheTime) > Date.now()) {
			fetch(endpoint)
				.then((response) => {
					var count = response.headers.get("X-WP-Total");
					if (count) {
						count = count + "+";
						sectionCount.html(count);
						localStorage.setItem("__qubely_section_count_time", Date.now() + 3600e3);
						localStorage.setItem("__qubely_section_count", count);
					}
				})
				.catch((e) => {
					// debug
				});
		} else {
			sectionCount.html(cachedCount);
		}
	}

	var blockCount = $(".qubely-gs-block-count");
	if (blockCount.length) {
		var endpoint = "https://qubely.io/wp-json/wp/v2/block";
		var cacheTime = localStorage.getItem("__qubely_block_count_time");
		var cachedCount = localStorage.getItem("__qubely_block_count");
		if (!cachedCount || !parseInt(cacheTime) > Date.now()) {
			fetch(endpoint)
				.then((response) => {
					var count = response.headers.get("X-WP-Total");
					if (count) {
						count = count + "+";
						blockCount.html(count);
						localStorage.setItem("__qubely_block_count_time", Date.now() + 3600e3);
						localStorage.setItem("__qubely_block_count", count);
					}
				})
				.catch((e) => {
					// debug
				});
		} else {
			blockCount.html(cachedCount);
		}
	}

	var layoutCount = $(".qubely-gs-layout-count");
	if (layoutCount.length) {
		var endpoint = "https://qubely.io/wp-json/restapi/v2/layouts";
		var cacheTime = localStorage.getItem("__qubely_layout_count_time");
		var cachedCount = localStorage.getItem("__qubely_layout_count");
		if (!cachedCount || !parseInt(cacheTime) > Date.now()) {
			fetch(endpoint, {
				method: "post",
			})
				.then((response) => {
					response.json().then((response) => {
						var count = response.filter((item) => item.parentID === 0).length + "+";
						layoutCount.html(count);
						localStorage.setItem("__qubely_layout_count_time", Date.now() + 3600e3);
						localStorage.setItem("__qubely_layout_count", count);
					});
				})
				.catch((e) => {
					// debug
				});
		} else {
			layoutCount.html(cachedCount);
		}
	}
})(jQuery);
