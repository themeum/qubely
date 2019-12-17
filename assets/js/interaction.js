(function ($) {
    'use strict';
    if( typeof qubelyInteraction === 'undefined')
        return
    /*
     * ====================
     * INTERACTION MATH
     * ====================
     */

    function InteractionMath (animationProperty){
        this.actions = animationProperty
        this.actionProperty = ['move','rotate','scale','skew','opacity', 'blur']
        this.actionSortList = {}
    }
    InteractionMath.prototype.bindCustomAnimation = function(){
        this.actionProperty.map(ActionName=> {
            this.actionSortList[ActionName] = this.actions.filter(action => action.name === ActionName)
        })
    }
    InteractionMath.prototype.getCustomAnimationActionByName = function(actionName, keyframe=null){
        if( keyframe === null ) {
            return typeof this.actionSortList[actionName] !== "undefined" ? this.actionSortList[actionName] : []
        }else{
            let animation = { from: null, to: null }
            let actions = typeof this.actionSortList[actionName] !== "undefined" ? this.actionSortList[actionName] : []
            if( actions.length === 0 ){
                return animation;
            }
            let found = false;
            actions.map((action, index)=> {
                if(keyframe < parseInt(action.keyframe) && animation.to === null ){
                    if( typeof animation.fixed !== 'undefined' ) delete animation.fixed;
                    action.toKF = 0
                    animation.to = action
                    if(typeof actions[index-1] !== 'undefined'){
                        actions[index-1].scroll = 0
                        animation.from = actions[index-1]
                    }
                    found = true
                }
                if( index === actions.length-1 && found === false ){
                    animation.fixed = true
                    animation.to = action
                    if(typeof actions[index-1] !== 'undefined'){
                        actions[index-1].scroll = 0
                        animation.from = actions[index-1]
                    }
                }
            })
            return animation;
        }
    }
    InteractionMath.prototype.getTAxis = function(from, to, scrollPercentage, combinedPercentage){
        let { toKF, fromKF } = combinedPercentage
        let tf = fromKF === 0 ? scrollPercentage : scrollPercentage - fromKF
        return from - (((from-to)/toKF)*tf)
    }

    InteractionMath.prototype.getMoveTransform = function(key, nextTriggerActions, scrollPercentage){
        let keyframe = nextTriggerActions.to.keyframe
        let Fkeyframe = nextTriggerActions.from.keyframe
        let toKF = (isNaN(keyframe)) ? 100 : Math.abs(Fkeyframe-keyframe)
        let combinedPercentage = {toKF, fromKF: Fkeyframe, totalKF: keyframe }
        
        let Xfrom = nextTriggerActions.from.x
        let Xto = nextTriggerActions.to.x
        let Yfrom = nextTriggerActions.from.y
        let Yto = nextTriggerActions.to.y
        let Zfrom = nextTriggerActions.from.z
        let Zto = nextTriggerActions.to.z
        nextTriggerActions.goal.x = this.getTAxis(Xfrom, Xto, scrollPercentage, combinedPercentage)
        nextTriggerActions.goal.y = this.getTAxis(Yfrom, Yto, scrollPercentage, combinedPercentage) //IM.getTAxis(Yfrom, Yto, scrollPercentage, combinedPercentage)
        nextTriggerActions.goal.z = this.getTAxis(Zfrom, Zto, scrollPercentage, combinedPercentage)
        return nextTriggerActions
    }
    InteractionMath.prototype.getSkew = function(key, nextTriggerActions, scrollPercentage){
        let keyframe = nextTriggerActions.to.keyframe
        let Fkeyframe = nextTriggerActions.from.keyframe
        let toKF = (isNaN(keyframe)) ? 100 : Math.abs(Fkeyframe-keyframe)

        let combinedPercentage = {toKF, fromKF: Fkeyframe, totalKF: keyframe }
        let Xfrom = nextTriggerActions.from.x
        let Xto = nextTriggerActions.to.x
        let Yfrom = nextTriggerActions.from.y
        let Yto = nextTriggerActions.to.y
        nextTriggerActions.goal.x = this.getTAxis(Xfrom, Xto, scrollPercentage, combinedPercentage)
        nextTriggerActions.goal.y = this.getTAxis(Yfrom, Yto, scrollPercentage, combinedPercentage)
        return nextTriggerActions
    }
    InteractionMath.prototype.getOpacity = function(key, nextTriggerActions, scrollPercentage){
        let keyframe = nextTriggerActions.to.keyframe
        let Fkeyframe = nextTriggerActions.from.keyframe
        let toKF = (isNaN(keyframe)) ? 100 : Math.abs(Fkeyframe-keyframe)

        let combinedPercentage = {toKF, fromKF: Fkeyframe, totalKF: keyframe }
        let Ofrom = nextTriggerActions.from.value
        let Oto = nextTriggerActions.to.value
        nextTriggerActions.goal.value = this.getTAxis(Ofrom, Oto, scrollPercentage, combinedPercentage)
        return nextTriggerActions
    }
    
    class MouseTilt {
        constructor(element, settings = {}) {
      
          this.width = null;
          this.height = null;
          this.clientWidth = null;
          this.clientHeight = null;
          this.left = null;
          this.top = null;
      
          // for Gyroscope sampling
          this.gammazero = null;
          this.betazero = null;
          this.lastgammazero = null;
          this.lastbetazero = null;
      
          this.transitionTimeout = null;
          this.updateCall = null;
          this.event = null;

          this.updateBind = this.update.bind(this);
          this.resetBind = this.reset.bind(this);
          
          this.element = element;
          
          this.settings = this.extendSettings(settings);
      
          this.reverse = this.settings.reverse ? -1 : 1;
          this.glare = MouseTilt.isSettingTrue(this.settings.glare);
          this.glarePrerender = MouseTilt.isSettingTrue(this.settings["glare-prerender"]);
          this.fullPageListening = MouseTilt.isSettingTrue(this.settings["full-page-listening"]);
          this.gyroscope = MouseTilt.isSettingTrue(this.settings.gyroscope);
          this.gyroscopeSamples = this.settings.gyroscopeSamples;
      
          this.elementListener = this.getElementListener();
          
          if (this.glare) {
            this.prepareGlare();
          }
      
          if (this.fullPageListening) {
            this.updateClientSize();
          }
      
          this.addEventListeners();
          this.updateInitialPosition();
        }
      
        static isSettingTrue(setting) {
          return setting === "" || setting === true || setting === 1;
        }
      
        /**
         * Method returns element what will be listen mouse events
         * @return {Node}
         */
        getElementListener() {
          return this.element;
        }
      
        /**
         * Method set listen methods for this.elementListener
         * @return {Node}
         */
        addEventListeners() {
          this.onMouseEnterBind = this.onMouseEnter.bind(this);
          this.onMouseMoveBind = this.onMouseMove.bind(this);
          this.onMouseLeaveBind = this.onMouseLeave.bind(this);
          this.onWindowResizeBind = this.onWindowResize.bind(this);
          this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);
      
          this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind);
          this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind);
          this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);
      
          if (this.glare || this.fullPageListening) {
            window.addEventListener("resize", this.onWindowResizeBind);
          }
      
          if (this.gyroscope) {
            window.addEventListener("deviceorientation", this.onDeviceOrientationBind);
          }
        }
      
        /**
         * Method remove event listeners from current this.elementListener
         */
        removeEventListeners() {
          this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind);
          this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind);
          this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind);
      
          if (this.gyroscope) {
            window.removeEventListener("deviceorientation", this.onDeviceOrientationBind);
          }
      
          if (this.glare || this.fullPageListening) {
            window.removeEventListener("resize", this.onWindowResizeBind);
          }
        }
      
        destroy() {
          clearTimeout(this.transitionTimeout);
          if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
          }
      
          this.reset();
      
          this.removeEventListeners();
          this.element.vanillaTilt = null;
          delete this.element.vanillaTilt;
      
          this.element = null;
        }
      
        onDeviceOrientation(event) {
          if (event.gamma === null || event.beta === null) {
            return;
          }
      
          this.updateElementPosition();
      
          if (this.gyroscopeSamples > 0) {
            this.lastgammazero = this.gammazero;
            this.lastbetazero = this.betazero;
      
            if (this.gammazero === null) {
              this.gammazero = event.gamma;
              this.betazero = event.beta;
            } else {
              this.gammazero = (event.gamma + this.lastgammazero) / 2;
              this.betazero = (event.beta + this.lastbetazero) / 2;
            }
      
            this.gyroscopeSamples -= 1;
          }
      
          const totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
          const totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;
      
          const degreesPerPixelX = totalAngleX / this.width;
          const degreesPerPixelY = totalAngleY / this.height;
      
          const angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
          const angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);
      
          const posX = angleX / degreesPerPixelX;
          const posY = angleY / degreesPerPixelY;
      
          if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
          }
      
          this.event = {
            clientX: posX + this.left,
            clientY: posY + this.top,
          };
      
          this.updateCall = requestAnimationFrame(this.updateBind);
        }
      
        onMouseEnter() {
          this.updateElementPosition();
          this.element.style.willChange = "transform";
          this.setTransition();
        }
      
        onMouseMove(event) {
          if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
          }
      
          this.event = event;
          this.updateCall = requestAnimationFrame(this.updateBind);
        }
      
        onMouseLeave() {
          this.setTransition();
      
          if (this.settings.reset) {
            requestAnimationFrame(this.resetBind);
          }
        }
      
        reset() {
          this.event = {
            clientX: this.left + this.width / 2,
            clientY: this.top + this.height / 2
          };
      
          if(this.element.parentElement !== null && this.element.parentElement.className === 'qubley-interaction-wrapper' ){
            this.element = this.element.parentElement
          }
          if( this.element.className !== 'qubley-interaction-wrapper'){ 
            return
          }

          if (this.element && this.element.style) {
            this.element.style.transform = `perspective(${this.settings.perspective}px) ` +
              `rotateX(0deg) ` +
              `rotateY(0deg) ` +
              `scale3d(1, 1, 1)`;
          }
      
          this.resetGlare();
        }
      
        resetGlare() {
          if (this.glare) {
            this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)";
            this.glareElement.style.opacity = "0";
          }
        }
      
        updateInitialPosition() {
          if (this.settings.startX === 0 && this.settings.startY === 0) {
            return;
          }

          
          this.onMouseEnter();
      
          if (this.fullPageListening) {
            this.event = {
              clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
              clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
            };
          } else {
            this.event = {
              clientX: this.left + ((this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width),
              clientY: this.top + ((this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height)
            };
          }
      
      
          let backupScale = this.settings.scale;
          this.settings.scale = 1;
          this.update();
          this.settings.scale = backupScale;
          this.resetGlare();
        }
      
        getValues() {
          let x, y;
      
          if (this.fullPageListening) {
            x = this.event.clientX / this.clientWidth;
            y = this.event.clientY / this.clientHeight;
          } else {
            x = (this.event.clientX - this.left) / this.width;
            y = (this.event.clientY - this.top) / this.height;
          }
      
          x = Math.min(Math.max(x, 0), 1);
          y = Math.min(Math.max(y, 0), 1);
      
          let tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
          let tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
          let angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);
      
          return {
            tiltX: tiltX,
            tiltY: tiltY,
            percentageX: x * 100,
            percentageY: y * 100,
            angle: angle
          };
        }
      
        updateElementPosition() {
          let rect = this.element.getBoundingClientRect();
      
          this.width = this.element.offsetWidth;
          this.height = this.element.offsetHeight;
          this.left = rect.left;
          this.top = rect.top;
        }
      
        update() {
          let values = this.getValues();
      
          this.element.style.transform = "perspective(" + this.settings.perspective + "px) " +
            "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " +
            "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " +
            "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";
      
          if (this.glare) {
            this.glareElement.style.transform = `rotate(${values.angle}deg) translate(-50%, -50%)`;
            this.glareElement.style.opacity = `${values.percentageY * this.settings["max-glare"] / 100}`;
          }
      
          this.element.dispatchEvent(new CustomEvent("tiltChange", {
            "detail": values
          }));
      
          this.updateCall = null;
        }
      
        /**
         * Appends the glare element (if glarePrerender equals false)
         * and sets the default style
         */
        prepareGlare() {
          // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
          if (!this.glarePrerender) {
            // Create glare element
            const jsTiltGlare = document.createElement("div");
            jsTiltGlare.classList.add("js-tilt-glare");
      
            const jsTiltGlareInner = document.createElement("div");
            jsTiltGlareInner.classList.add("js-tilt-glare-inner");
      
            jsTiltGlare.appendChild(jsTiltGlareInner);
            this.element.appendChild(jsTiltGlare);
          }
      
          this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
          this.glareElement = this.element.querySelector(".js-tilt-glare-inner");
      
          if (this.glarePrerender) {
            return;
          }
      
          Object.assign(this.glareElementWrapper.style, {
            "position": "absolute",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%",
            "overflow": "hidden",
            "pointer-events": "none"
          });
      
          Object.assign(this.glareElement.style, {
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "pointer-events": "none",
            "background-image": `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
            "width": `${this.element.offsetWidth * 2}px`,
            "height": `${this.element.offsetWidth * 2}px`,
            "transform": "rotate(180deg) translate(-50%, -50%)",
            "transform-origin": "0% 0%",
            "opacity": "0",
          });
        }
      
        updateGlareSize() {
          if (this.glare) {
            Object.assign(this.glareElement.style, {
              "width": `${this.element.offsetWidth * 2}`,
              "height": `${this.element.offsetWidth * 2}`,
            });
          }
        }
      
        updateClientSize() {
          this.clientWidth = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
      
          this.clientHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        }
      
        onWindowResize() {
          this.updateGlareSize();
          this.updateClientSize();
        }
      
        setTransition() {
          clearTimeout(this.transitionTimeout);
          this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
          if (this.glare) this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;
      
          this.transitionTimeout = setTimeout(() => {
            this.element.style.transition = "";
            if (this.glare) {
              this.glareElement.style.transition = "";
            }
          }, this.settings.speed);
      
        }
      
        
        extendSettings(settings) {
          let defaultSettings = {
            reverse: false,
            max: 15,
            startX: 0,
            startY: 0,
            perspective: 1000,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            scale: 1,
            speed: 300,
            transition: true,
            axis: null,
            glare: false,
            "max-glare": 1,
            "glare-prerender": false,
            "full-page-listening": false,
            "mouse-event-element": null,
            reset: true,
            gyroscope: true,
            gyroscopeMinAngleX: -45,
            gyroscopeMaxAngleX: 45,
            gyroscopeMinAngleY: -45,
            gyroscopeMaxAngleY: 45,
            gyroscopeSamples: 10
          };
      
          let newSettings = {};
          for (var property in defaultSettings) {
            if (property in settings) {
              newSettings[property] = settings[property];
            } else if (this.element.hasAttribute("data-tilt-" + property)) {
              let attribute = this.element.getAttribute("data-tilt-" + property);
              try {
                newSettings[property] = JSON.parse(attribute);
              } catch (e) {
                newSettings[property] = attribute;
              }
      
            } else {
              newSettings[property] = defaultSettings[property];
            }
          }
      
          return newSettings;
        }
      
        static init(element, settings) {
          element.vanillaTilt = new MouseTilt(element, settings);
        }
      }
    

    /*
     * ===========
     * START
     * ===========
     */
    let $window = $(window);
    let windowWidth = $window.width(); 

    // Calculate percentage when element on-view
    function percentageSeen ($element, $window ) {
        var viewportHeight = $(window).height(),
            scrollTop = $window.scrollTop(),
            elementOffsetTop = $element.offset().top,
            elementHeight = $element.height();
        if (elementOffsetTop > (scrollTop + viewportHeight)) {
            return -1;
        } else if ((elementOffsetTop + elementHeight) < scrollTop) {
            return 101;
        } else {
            var distance = (scrollTop + viewportHeight) - elementOffsetTop;
            var percentage = distance / ((viewportHeight + elementHeight) / 100);
            return percentage > 100 ? 100 : percentage;
        }
    }

    let mouseTiltInstance = {}

    initiateTiltAnimation(windowWidth)

    function initiateTiltAnimation( windowWidth ){
      if( typeof qubelyInteraction['mouse_movement'] !== 'undefined' ){
          let mouseMovementList = qubelyInteraction['mouse_movement']
          mouseMovementList.map( tiltOpt => { 
              let $addonElem = $(`.qubely-block-${tiltOpt.blockId}`)
              if( !$addonElem.parent().hasClass('qubley-interaction-wrapper')){
                $addonElem.wrap('<div class="qubley-interaction-wrapper"></div>')
              } 

              //For mobile viewport
              if( windowWidth < 768 && ( typeof tiltOpt.animation.enable_mobile === 'undefined' || tiltOpt.animation.enable_mobile === false) ){
                if( typeof mouseTiltInstance[tiltOpt.blockId] !== 'undefined' ){
                    mouseTiltInstance[tiltOpt.blockId].tiltIntance.destroy()
                    delete mouseTiltInstance[tiltOpt.blockId]
                }
                return false;
              }
              //For tablet viewport
              if( windowWidth > 767 && windowWidth < 991 && ( typeof tiltOpt.animation.enable_tablet === 'undefined' || tiltOpt.animation.enable_tablet === false )){
                if( typeof mouseTiltInstance[tiltOpt.blockId] !== 'undefined' ){
                    mouseTiltInstance[tiltOpt.blockId].tiltIntance.destroy()
                    delete mouseTiltInstance[tiltOpt.blockId]
                }
                return false;
              }


              if( typeof mouseTiltInstance[tiltOpt.blockId] !== 'undefined' ){
                return false;
              }

              let element =  document.getElementsByClassName(`qubely-block-${tiltOpt.blockId}`)
              if( element.length > 0 ){
                element = element[0].parentElement
                let settings = {
                        speed: parseFloat(tiltOpt.animation.mouse_tilt_speed)*1000,
                        max: parseFloat(tiltOpt.animation.mouse_tilt_max),
                        reverse: tiltOpt.animation.mouse_tilt_direction === 'opposite',
                        easing: "cubic-bezier(.03,.98,.52,.99)",
                        scale: 1.05,
                        transition: true,
                        perspective: 1000
                      }
                const tiltIntance = new MouseTilt( element, settings ) // MouseTilt.init(element, settings)
                mouseTiltInstance[tiltOpt.blockId] = {tiltIntance: tiltIntance}
              }
          })
      }
    }

    if(typeof qubelyInteraction['while_scroll_view'] !== 'undefined'){

    // /**
    //  * Do auto scroll 5 px up and down for fix the element position with jquery animate function on window.load
    //  * set initialLoader = false and when element position fixed then enable it to true for load element smothly in view
    //  * Make initialLoader = true on second animation
    //  */
    // let initialLoader = false
    // window.onload = function() {
    //     var doc = document.documentElement;
    //     var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    //     $('html, body').animate({ scrollTop: top-5 }, 10, function(){
    //       $('html, body').animate({ scrollTop: top },'slow', ()=> { initialLoader = true })
    //     })
    //  }

      //Cache the global animation action object
      let scrollActionList = qubelyInteraction['while_scroll_view']         
      let $window = $(window)
      
      /**
       * Set the initial position of each element when page load
       * Hide the element to avoid zigzag trouble for the element
       * Trigger animation with scrollPercentage if element in view port 
       * When object fit show the element with some smoth animate after 5 milisecond
       */
      $(document).ready(function(){
        scrollActionList.map( animationProperty => {
          if( windowWidth < 768 && (typeof animationProperty.enable_mobile === 'undefined' || animationProperty.enable_mobile === false) ){
            return false;
          }
          if( windowWidth > 767 && windowWidth < 991 && ( typeof animationProperty.enable_tablet === 'undefined' || animationProperty.enable_tablet === false) ){
            return false;
          }
          let $addonElem = $(`.qubely-block-${animationProperty.blockId}`)
          $addonElem.addClass('qubley-interaction-hide')
          if( !$addonElem.parent().hasClass('qubley-interaction-wrapper')){
            $addonElem.wrap('<div class="qubley-interaction-wrapper"></div>')
          } 
          let scrollPercentage =  percentageSeen($addonElem.parent('.qubley-interaction-wrapper'), $window)
          initiateOnScrollTrigger($addonElem, animationProperty, scrollPercentage, true)
          setTimeout(()=>{
            $addonElem.removeClass('qubley-interaction-hide')
          }, 500)
        })
      })
      
      /**
       * When scroll document calculate each element view-port position with exact percentage 
       * And triger the scroll animation based on properties (move, scale, rotate, opacity, skew)
       */
      $(window).on('load',function(){
        $(document).on("scroll", function () {
          windowWidth = $window.width();
          scrollActionList.map( animationProperty => {
              let $addonElem = $(`.qubely-block-${animationProperty.blockId}`)

              if( windowWidth < 768 && (typeof animationProperty.enable_mobile === 'undefined' || animationProperty.enable_mobile === false) ){
                $addonElem.removeAttr('style');
                return false;
              }
              if( windowWidth > 767 && windowWidth < 991 && ( typeof animationProperty.enable_tablet === 'undefined' || animationProperty.enable_tablet === false) ){
                $addonElem.removeAttr('style');
                return false;
              }
              if( $addonElem.parent().hasClass('qubley-interaction-wrapper')){
                let scrollPercentage =  percentageSeen($addonElem.parent('.qubley-interaction-wrapper'), $window)
                initiateOnScrollTrigger($addonElem, animationProperty, scrollPercentage)
              }
          })
        })
      })

        
      function initiateOnScrollTrigger($addonElem, animationProperty, scrollPercentage, withoutPercentage = false ){
          if( withoutPercentage ){
            let cssProperty = parseInteractionCss(animationProperty, scrollPercentage)
            cssProperty['transitionDuration'] = '.1s'
            $addonElem.css( cssProperty )
          }
          if( scrollPercentage > -1 && scrollPercentage <= 100){
            $addonElem.css( parseInteractionCss(animationProperty, scrollPercentage) )
          }
      }

      function parseInteractionCss(animationProperty, scrollPercentage){
        let nextTriggerActions = {
          move: {
              from: { x:0, y:0, z:0, keyframe:0, f: false },
              to: { x:0, y:0, z:0, keyframe:0, f: false },
              goal: { x:0, y:0, z:0, keyframe:0 }
          },
          scale: {
              from: { x:1, y:1, z:1, keyframe:0 },
              to: { x:1, y:1, z:1, keyframe:0 },
              goal: { x:1, y:1, z:1, keyframe:0 },
          },
          skew: {
              from: { x:0, y:0, keyframe:0 },
              to: { x:0, y:0, keyframe:0 },
              goal: { x:0, y:0, keyframe:0 },
          },
          rotate: {
              from: { x:0, y:0, z:0, keyframe:0 },
              to: { x:0, y:0, z:0, keyframe:0 },
              goal: { x:0, y:0, z:0, keyframe:0 },
          },
          opacity: {
              from: { value:0, keyframe:0 },
              to: { value:0, keyframe:0 },
              goal: { value:1, keyframe:0 },
          },
          blur: {
              from: { value:0, keyframe:0 },
              to: { value:0, keyframe:0 },
              goal: { value: 0, keyframe:0 },
          }
      }
    
        let { animation, origin } = animationProperty
        if( typeof origin === 'undefined' ){
          origin = { x_offset: 'center', y_offset: 'center' }
        }
        let IM = new InteractionMath(animation)
        IM.bindCustomAnimation()
        IM.actionProperty.map(key=> {
            let action = IM.getCustomAnimationActionByName(key, scrollPercentage) // Grater than current keyframe/scrollPercentage
            
            if( action.from !== null ) {
              
                Object.assign(nextTriggerActions[key].from, action.from.property)
                
                nextTriggerActions[key].from.f = true
                nextTriggerActions[key].from.keyframe = parseInt(action.from.keyframe)

                if( typeof nextTriggerActions[key].from.x !== "undefined" )
                    nextTriggerActions[key].from.x = nextTriggerActions[key].from.x === "" || nextTriggerActions[key].from.x === null ? 0 : parseFloat(nextTriggerActions[key].from.x)
                if( typeof nextTriggerActions[key].from.y !== "undefined" )
                    nextTriggerActions[key].from.y = nextTriggerActions[key].from.y === "" || nextTriggerActions[key].from.y === null ? 0 : parseFloat(nextTriggerActions[key].from.y)
                if( typeof nextTriggerActions[key].from.z !== "undefined" ){ 
                    nextTriggerActions[key].from.z = nextTriggerActions[key].from.z === "" || nextTriggerActions[key].from.z === null ? 0 : parseFloat(nextTriggerActions[key].from.z)
                }
                if( typeof nextTriggerActions[key].from.value !== "undefined" )
                    nextTriggerActions[key].from.value = nextTriggerActions[key].from.value === "" ? 0 : parseFloat(nextTriggerActions[key].from.value)
            }
            if( action.to !== null ) {
                Object.assign(nextTriggerActions[key].to, action.to.property)
                
                if( typeof nextTriggerActions[key].to.x !== "undefined" ) {
                    nextTriggerActions[key].to.x = nextTriggerActions[key].to.x === "" || nextTriggerActions[key].to.x === null ? 0 : parseFloat(nextTriggerActions[key].to.x)
                    nextTriggerActions[key].goal.x = nextTriggerActions[key].to.x
                }
                if( typeof nextTriggerActions[key].to.y !== "undefined" ) {
                    nextTriggerActions[key].to.y = nextTriggerActions[key].to.y === "" || nextTriggerActions[key].to.y === null ? 0 : parseFloat(nextTriggerActions[key].to.y)
                    nextTriggerActions[key].goal.y = nextTriggerActions[key].to.y
                }
                if( typeof nextTriggerActions[key].to.z !== "undefined" ) {
                    nextTriggerActions[key].to.z = nextTriggerActions[key].to.z === "" || nextTriggerActions[key].to.z === null? 0 : parseFloat(nextTriggerActions[key].to.z)
                    nextTriggerActions[key].goal.z = nextTriggerActions[key].to.z
                }
                if( typeof nextTriggerActions[key].to.value !== "undefined" ) {
                    nextTriggerActions[key].to.value = nextTriggerActions[key].to.value === "" || nextTriggerActions[key].to.value === null ? 0 : parseFloat(nextTriggerActions[key].to.value)
                    nextTriggerActions[key].goal.value = nextTriggerActions[key].to.value
                }
                nextTriggerActions[key].to.keyframe = parseInt(action.to.keyframe)
                nextTriggerActions[key].to.f = true
            }

            if( nextTriggerActions[key].to.f === true && nextTriggerActions[key].from.f === true && typeof action.fixed === 'undefined'){
                if( key === 'opacity' || key === 'blur' ){
                    nextTriggerActions[key] = IM.getOpacity(key,nextTriggerActions[key], scrollPercentage)
                }else if( key === 'skew'){
                    nextTriggerActions[key] = IM.getSkew(key,nextTriggerActions[key], scrollPercentage)
                }else{
                    nextTriggerActions[key] = IM.getMoveTransform(key,nextTriggerActions[key], scrollPercentage)
                }
            }

        })
  
        return {
            "willChange":"transform",
            // "transitionDuration": initialLoader ? '0s' : '0.1s',
            '-webkit-transition-timing-function':'linear',
            "transitionProperty": "transform, opacity, filter",
            "transformOrigin":`${origin.x_offset} ${origin.y_offset}`,
            "transformStyle":"preserve-3d",
            'opacity': `${nextTriggerActions.opacity.goal.value}`,
            "filter": `blur(${nextTriggerActions.blur.goal.value}px)`,
            "-webkit-filter": `blur(${nextTriggerActions.blur.goal.value}px)`,
            'transform':`perspective(1000px) translate3d(${nextTriggerActions.move.goal.x}px, ${nextTriggerActions.move.goal.y}px, ${nextTriggerActions.move.goal.z}px) 
                    scale3d(${nextTriggerActions.scale.goal.x}, ${nextTriggerActions.scale.goal.y}, ${nextTriggerActions.scale.goal.z})
                    rotateX(${nextTriggerActions.rotate.goal.x}deg) rotateY(${nextTriggerActions.rotate.goal.y}deg) rotateZ(${nextTriggerActions.rotate.goal.z}deg) 
                    skew(${nextTriggerActions.skew.goal.x}deg, ${nextTriggerActions.skew.goal.y}deg)`
        }
      }

    }

    $window.resize( function(){
      initiateTiltAnimation($window.width());
    })

})(jQuery);