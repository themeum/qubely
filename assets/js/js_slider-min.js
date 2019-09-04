!function(t,i,e,s){var n="jsSlider";function o(i,e){this.element=i,this.elementWidth=0,this._name=n,this.item=null,this.delta=1,this.isAnimating=!1,this.isDragging=!1,this.timer=0,this._timeoutId1=0,this._timeoutId2=0,this._dotControllerTimeId=0,this._lastViewPort=0,this.itemWidth=0,this._clones=0,this._items=0,this._itemCoordinate=[],this.coordinate={x:0,y:0},this.prevCoordinate={x:0,y:0,diff:0,dragPointer:-1},this._defaults=t.fn.jsSlider.defaults,this.options=t.extend({},this._defaults,e),2!==this.options.nav_text.length&&(console.warn("nav text must be need two control element!"),this.options.nav_text=["<",">"]),this.init()}t.extend(o.prototype,{init:function(){this.buildCache(),this.createHtmlDom(),this.applyBasicStyle(),this.bindEvents(),this.triggerOnStart(),this.options.autoplay&&this.startLoop()},triggerOnStart:function(){if(this.options.dot_indicator&&this.options.dots){const t=this.$dotContainer.find("li.active");this.animateDotIndicator(t,"start")}},destroy:function(){this.unbindEvents(),this.$element.removeData()},buildCache:function(){this.$element=t(this.element)},unbindEvents:function(){this.$element.off("."+this._name)},createHtmlDom:function(){this.createOuterStage(),this.itemProfessor(),this.options.nav&&this.createNavigationController(),this.options.dots&&this.createDotsController(),this.cloneItems()},itemProfessor:function(){this._numberOfItems=this.$element.find(".js-item").length;let t=null;void 0!==this.options.responsive&&(t=this.parseResponsiveViewPort()),this.options.items=null===t?this.options.items:void 0===t.items?this.options.items:t.items,this.elementWidth=this.$element.outerWidth()+this.options.margin,this.itemWidth=Math.abs(this.elementWidth/this.options.items),this._clones=this._numberOfItems>this.options.items?Math.ceil(this._numberOfItems/2):this.options.items,this._maxL=this.itemWidth*(this._numberOfItems+(this._clones-1)),this._minL=!1===this.options.center?this.itemWidth*this._clones:this.itemWidth*this._clones-this.itemWidth/2},cloneItems:function(){let t=[],i=[];for(let e=0;e<this._clones;e++)e<this.options.items&&this.$element.find(`.js-item:nth-child(${e+1})`).addClass("active"),t.push(this.$element.find(`.js-item:nth-child(${this._numberOfItems-e})`).clone(!0).addClass("clone").removeClass("active")),i.push(this.$element.find(`.js-item:nth-child(${e+1})`).clone(!0).addClass("clone").removeClass("active"));this.appendBefore(t),this.appendAfter(i),this.calculateItemCoordinate()},appendBefore:function(t){t.map(t=>{this.$outerStage.prepend(t)})},appendAfter:function(t){t.map(t=>{this.$outerStage.append(t)})},calculateItemCoordinate:function(){let t=this;this.$outerStage.children().each(function(i,e){t._itemCoordinate.push((i+1)*t.itemWidth)})},createOuterStage:function(){this.sliderList=e.createElement("div"),this.sliderList.setAttribute("class","js-slider-list"),this.outerStage=e.createElement("div"),this.outerStage.setAttribute("class","js-slider-outer-stage"),this.outerStage.innerHTML=this.$element.html(),this.sliderList.append(this.outerStage),this.$element.html(this.sliderList),this.$outerStage=t(this.outerStage)},createNavigationController:function(){let i=e.createElement("div");i.setAttribute("class","js-nav-control"),this.$element.append(i),this.nextBtn=e.createElement("span"),this.nextBtn.setAttribute("class","next-control nav-control"),this.prevBtn=e.createElement("span"),this.prevBtn.setAttribute("class","prev-control nav-control"),i.append(this.nextBtn),i.append(this.prevBtn),this.nextBtn.innerHTML=this.options.nav_text[1],this.prevBtn.innerHTML=this.options.nav_text[0],this.$nextBtn=t(this.nextBtn),this.$prevBtn=t(this.prevBtn)},createDotsController:function(){let i=e.createElement("div");i.setAttribute("class","js-dots"),this.$element.append(i);let s=this,n=e.createElement("ul"),o=null;void 0!==this.options.responsive&&(o=this.parseResponsiveViewPort());let a=null===o?this.options.items:void 0===o.items?this.options.items:o.items,r=Math.floor(this._numberOfItems/a);if(r>1)for(var h=0;h<r;h++){let i=e.createElement("li");if(i.setAttribute("class","js-dot-"+h),t(i).css({"-webkit-transition":"all 0.5s linear 0s"}),0===h&&t(i).addClass("active"),s.options.dot_indicator){let t=e.createElement("span");t.setAttribute("class","dot-indicator"),i.append(t)}n.append(i)}i.append(n),this.$element.append(i),this.$dotContainer=t(n)},applyBasicStyle:function(){let i=0,e={};e.width=this.itemWidth-this.options.margin+"px",this.options.margin>0&&(e.marginRight=this.options.margin+"px"),this.$element.find(".js-item").each(function(){i++,t(this).css(e)}),this._currentPosition=this._clones*this.itemWidth,!0===this.options.center&&(this._currentPosition=this._clones*this.itemWidth-this.itemWidth/2),this.$outerStage.css({"-webkit-transition-duration":"0s","-webkit-transform":`translate3D(-${this._currentPosition}px,0px,0px)`,width:i*this.itemWidth+"px"}),this._items=i,this.updateResponsiveView()},startLoop:function(){this.timer=setInterval(()=>{!1===this.isAnimating&&this.Next()},this.options.interval)},stopLoop:function(){clearInterval(this.timer),this.timer=0},Next:function(){-1===this.delta&&(this.delta=1),this.updateItemStyle()},Prev:function(){1===this.delta&&(this.delta=-1),this.updateItemStyle()},slideFromPosition:function(t,i){let e=this.itemWidth*(this.options.items*t),s=0===t?this._minL:this._minL+e;this.$outerStage.css({"-webkit-transition":"all 0.25s ease 0s","-webkit-transform":`translate3D(-${s}px,0px,0px)`}),this._currentPosition=s,this.delta=i},updateDotsFromPosition:function(t){let i=this.$dotContainer.find("li.active").removeClass("active"),e=this.$dotContainer.find("li:nth-child("+t+")").addClass("active");this.options.dot_indicator&&(this.animateDotIndicator(i,"stop"),this._dotControllerTimeId>0&&(clearTimeout(this._dotControllerTimeId),this._dotControllerTimeId=0),this._dotControllerTimeId=setTimeout(()=>{this.animateDotIndicator(e,"start")},this.options.speed)),e.css({"-webkit-transition":"all 0.5s linear 0s"})},animateDotIndicator:function(t,i){if("stop"===i&&t.find(".dot-indicator").removeClass("active").css({"-webkit-transition-duration":"0s"}),"start"===i){const i=Math.abs(this.options.interval-this.options.speed);t.find(".dot-indicator").addClass("active").css({"-webkit-transition-duration":i+"ms"})}},updateItemStyle:function(){let t=-1===this.prevCoordinate.dragPointer?0:this.prevCoordinate.dragPointer,i=this._currentPosition,e=this.itemWidth+parseInt(t),s=1===this.delta?i+e:i-e;if(s>this._maxL&&(this.$outerStage.css({transition:"0s","-webkit-transform":`translate3D(-${this._minL-this.itemWidth}px,0px,0px)`}),s=this._minL),i<this._minL&&(this.$outerStage.css({transition:"0s","-webkit-transform":`translate3D(-${this._maxL}px,0px,0px)`}),s=this._maxL-this.itemWidth),this.isDragging){let t=this._itemCoordinate,i=!1;for(var n=0;n<t.length&&(t[n]>s&&(s=!0===this.options.center?t[n]-this.itemWidth/2:t[n],i=!0),!0!==i);n++);}this._timeoutId1>0&&(clearTimeout(this._timeoutId1),this._timeoutId1=0),this._timeoutId1=setTimeout(()=>{this.$outerStage.css({"-webkit-transition":"all 0.25s ease 0s","-webkit-transform":`translate3D(-${s}px,0px,0px)`})},0),this._currentPosition=s,this.processActivationWorker(),this.options.autoplay&&0===this.timer&&this.startLoop()},processActivationWorker:function(){let t=this._currentPosition,i=Math.floor(t/this.itemWidth),e=Math.floor(Math.abs(this.options.items+i));this.$outerStage.find(".active").removeClass("active");for(let t=i;t<e;t++)this.$outerStage.children(":eq("+t+")").addClass("active");let s=Math.floor((i-this._clones)/this.options.items)+1;this.options.dots&&(this.$dotContainer.find(".active").removeClass("active"),this.$dotContainer.find("li:nth-child("+s+")").addClass("active"))},dragoverActionToNextItem:function(t){let i=this._currentPosition+parseInt(t);i>this._maxL&&(i=this._minL-this.itemWidth+parseInt(t)),this._timeoutId2>0&&(clearTimeout(this._timeoutId2),this._timeoutId2=0),this._timeoutId2=setTimeout(()=>{this.$outerStage.css({"-webkit-transition":"all 0s ease 0s","-webkit-transform":`translate3D(-${i}px,0px,0px)`})},0)},dragoverActionToPrevItem:function(t){let i=this._currentPosition-parseInt(t);i<this._minL-this.itemWidth&&(i=this._maxL-parseInt(t)),this._timeoutId2>0&&(clearTimeout(this._timeoutId2),this._timeoutId2=0),this._timeoutId2=setTimeout(()=>{this.$outerStage.css({"-webkit-transition":"all 0s ease 0s","-webkit-transform":`translate3D(-${i}px,0px,0px)`})},0)},resetCoordiante:function(){this.prevCoordinate={x:0,y:0,diff:0,dragPointer:-1},this.coordinate={x:0,y:0},this.options.autoplay&&0===this.timer&&this.startLoop()},backToStage:function(){},bindEvents:function(){const e=this;e.options.nav&&(e.$nextBtn.on("click."+e._name,function(t){!1===e.isAnimating&&(e.options.autoplay&&e.stopLoop(),e.Next(),e.checkCallBackMethod.call(e))}),e.$prevBtn.on("click."+e._name,function(t){!1===e.isAnimating&&(e.Prev(),e.options.autoplay&&e.stopLoop(),e.checkCallBackMethod.call(e))})),e.options.dots&&e.$dotContainer.find("li").each(function(i){t(this).on("click."+e._name,function(s){if(t(this).hasClass("active")||!0===e.isAnimating)return!1;e.options.autoplay&&e.stopLoop();let n=t(this).parent().find("li.active"),o=e.$dotContainer.find("li").index(n)>i?-1:1;e.slideFromPosition(i,o),e.updateDotsFromPosition(i+1),e.checkCallBackMethod.call(e)})}),e.$outerStage.on("mousedown."+e._name,t.proxy(e.onDragStart,e)),e.$outerStage.on("mouseup."+e._name+" touchend."+e._name,t.proxy(e.onDragEnd,e)),e.$outerStage.on("touchstart."+e._name,t.proxy(e.onDragStart,e)),e.$outerStage.on("touchcancel."+e._name,t.proxy(e.onDragEnd,e)),t(i).focus(function(){e.options.autoplay&&0===e.timer&&e.startLoop()}),t(i).blur(function(){e.options.autoplay&&e.stopLoop(),e.destroy()}),t(i).on("resize."+e._name,t.proxy(e.windowResize,e))},windowResize:function(t){void 0!==t&&this.updateResponsiveView()},parseResponsiveViewPort:function(){let t=this.options.responsive;if(void 0===t)return;let e=null,s=i.innerWidth;for(let i=0;i<t.length;i++)if(s>t[i].viewport){e=t[i];break}return null===e&&(e=t[t.length-1]),e},updateResponsiveView:function(){if(void 0===this.options.responsive)return;let t=i.innerHeight,e=this.parseResponsiveViewPort();if("full"===e.height){if(this._lastViewPort===t)return;this._lastViewPort=t,this.$outerStage.css({height:t+"px"})}else{if(this._lastViewPort===e.height)return;this._lastViewPort=e.height,this.$outerStage.css({height:e.height})}},getPosition:function(t){let e={x:null,y:null};return(t=(t=t.originalEvent||t||i.event).touches&&t.touches.length?t.touches[0]:t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t).pageX?(e.x=t.pageX,e.y=t.pageY):(e.x=t.clientX,e.y=t.clientY),e},onDragStart:function(i){if(3===i.which||2===i.which)return!1;const s=this;let n=s.getPosition(i);s.coordinate.x=n.x,s.coordinate.y=n.y,t(e).one("mousemove."+s._name+" touchmove."+s._name,t.proxy(function(i){t(e).on("mousemove."+s._name+" touchmove."+s._name,t.proxy(s.onDragMove,s)),i.preventDefault()},this)),s.isDragging=!0},onDragMove:function(t){const i=this;if(!1===i.isDragging)return;i.options.autoplay&&i.stopLoop();const e=i.getPosition(t),s=i.coordinate;if(i.prevCoordinate.x!==e.x){const t=s.x-e.x;let n=(1*Math.abs(t)).toFixed(0);i.prevCoordinate={x:e.x,y:e.y,diff:t,dragPointer:n},t>0&&i.dragoverActionToNextItem(n),t<0&&i.dragoverActionToPrevItem(n)}t.preventDefault()},onDragEnd:function(t){const i=this;if(i.isDragging){let t=i.prevCoordinate.diff;Math.abs(t)>100?(t>0&&i.Next(),t<0&&i.Prev()):i.backToStage(),i.isDragging=!1}i.resetCoordiante()},checkCallBackMethod:function(){this.callback()},callback:function(){let t=this.options.onChange;if("function"==typeof t){const i=this.$element.find(".js-item").length;let e={item:this.item,items:i,element:this.$element};t.call(this.element,e)}}}),t.fn.jsSlider=function(i){return this.each(function(){t.data(this,n)||t.data(this,n,new o(this,i))}),this},t.fn.jsSlider.defaults={items:4,autoplay:!1,center:!1,margin:10,speed:800,interval:4500,onChange:null,dots:!0,dot_indicator:!1,nav:!0,nav_text:["<",">"]}}(jQuery,window,document);