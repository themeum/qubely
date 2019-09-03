/**
 * Plugin Name: JS Slider
 * Version: 1.0.0
 * Author: Joomshaper
 * Company: Joomshaper
 * Website: https://www.joomshaper.com/
 * Description: Joomshaper Slider 
 */
;(function ( $, window, document, undefined ) {

    var pluginName = 'JsSlider';
    
   // Create the plugin constructor
   function Plugin ( element, options ) {
       /*
           Provide local access to the DOM node(s) that called the plugin,
           as well local access to the plugin name and default options.
       */
       this.element = element;
       this.elementWidth = 0
       this._name = pluginName;
       this.item = null;
       this.delta = 1;
       this.isAnimating = false;
       this.isDragging = false;
       
       //interval clear 
       this.timer = 0;
       this._timeoutId1 = 0;
       this._timeoutId2 = 0;
       this._dotControllerTimeId = 0;
       this._lastViewPort = 0
       
       
       this.itemWidth = 0
       this._clones = 0
       this._items = 0
       
       this._itemCoordinate = []
       this.coordinate = { x:0, y:0 };
       this.prevCoordinate = {x:0,y:0, diff: 0, dragPointer: -1 };

       this._defaults = $.fn.JsSlider.defaults;
       /*
           The "$.extend" method merges the contents of two or more objects,
           and stores the result in the first object.
       */
       this.options = $.extend( {}, this._defaults, options );
    
       // Check if has valid array nav_text 
        if( this.options.nav_text.length !==2 ){
            console.warn("nav text must be need two control element!")
            this.options.nav_text = ['<','>']
        }

        //Check if speed is bigger than interval then make they both equal
        if( this.options.speed > this.options.interval ){
            this.options.speed = this.options.interval 
        }

       /*
           The "init" method is the starting point for all plugin logic.
       */
       this.init();
   }

   $.extend(Plugin.prototype, {
        init: function () {

            // Build cache for first rendering and search target element
            this.buildCache();

            // Create necessary html DOM and element cache
            this.createHtmlDom();

            // Apply initial style for next initiative
            this.applyBasicStyle();

            // Apply all bind event into this function
            this.bindEvents();

            // On inital start animation
            this.triggerOnStart() 
            
            //Check if autoplay set true 
            if(this.options.autoplay){ 
                this.startLoop(); // Start auto play
            }
        },

        // Trigger animation element on inital time
        triggerOnStart: function(){
            // Trigger dot indicator if its enable 
            if(this.options.dot_indicator && this.options.dots){
                const currentActiveDot = this.$dotContainer.find('li.active');
                this.animateDotIndicator(currentActiveDot, 'start')
            }
        },

        /**
         * On browswer close or tab change 
         * Remove plugin instance completely
         */
        destroy: function() {
            this.unbindEvents();
            this.$element.removeData();
        },

        // Cache DOM nodes for performance
        buildCache: function () {
            this.$element = $(this.element);
        },

        // Unbind events that trigger methods
        unbindEvents: function() {
            /*
                Unbind all events in our plugin's namespace that are attached
                to "this.$element".
            */
            this.$element.off('.'+this._name);
        },

        /**
         * Create necessary html object for slider 
         * Definetly check user settings and create object based on it
         */
        createHtmlDom: function() {

            // Create outersatge for grab intire slider
            this.createOuterStage()

            // Do calculate total items and clone numbers
            this.itemProfessor()

            // Create nav element if nav setting enable
            if( this.options.nav ){ 
                this.createNavigationController()
            }

            // Create dots element if dots setting enable
            if(this.options.dots){
                this.createDotsController()
            }
            
            // Clone the items that counted before in itemProcessor
            this.cloneItems()
        },

        /**
         * Slider professor which calculate and mesure whole slider needs 
         * @elementWidth = Total slider width with margin 
         * @itemWidth = each item width 
         * @_clones = Need to clone number of items 
         * @_maxL = maximum length of items 
         * @_minL = minimum length of items
         */
        itemProfessor: function(){
            this._numberOfItems = this.$element.find('.qubely-slider-item').length 
            let viewPort = null
            if(typeof this.options.responsive !== 'undefined')
                viewPort = this.parseResponsiveViewPort()
                
            this.options.items = viewPort === null ? this.options.items : typeof viewPort.items === 'undefined' ? this.options.items : viewPort.items
            
            this.elementWidth = this.$element.outerWidth()+this.options.margin
            this.itemWidth = Math.abs(this.elementWidth/this.options.items)
            this._clones = this._numberOfItems > this.options.items ? Math.ceil(this._numberOfItems/2) : this.options.items
            this._maxL = this.itemWidth*(this._numberOfItems+(this._clones-1))
            this._minL = this.options.center === false ? this.itemWidth*this._clones : (this.itemWidth*this._clones)-(this.itemWidth/2)
        },

        /**
         * Clone items and set the clone ones before and after the current items 
         */
        cloneItems: function(){
            let cloneBefore = []
            let cloneAfter = []
            for(let i=0; i<this._clones; i++ ){                
                if(i < this.options.items ){ 
                    this.$element.find(`.qubely-slider-item:nth-child(${i+1})`).addClass('active')
                }
                cloneBefore.push(this.$element.find(`.qubely-slider-item:nth-child(${this._numberOfItems-i})`).clone(true).addClass('clone').removeClass('active'))
                cloneAfter.push(this.$element.find(`.qubely-slider-item:nth-child(${i+1})`).clone(true).addClass('clone').removeClass('active'))
            }
            this.appendBefore(cloneBefore)
            this.appendAfter(cloneAfter)

            // Calculate item coordinate 
            this.calculateItemCoordinate()
        },

        // Append before item
        appendBefore: function(clones){
            clones.map((item)=>{this.$outerStage.prepend(item);})
        },

        // Append after item
        appendAfter: function(clones){
            clones.map((item)=>{this.$outerStage.append(item);})
        },

        /**
         * Find each children width and do parallal sum operation and store in array
         */
        calculateItemCoordinate: function(){
            let JsSlider = this
            let child_ = this.$outerStage.children()
            child_.each(function(i, obj){
                JsSlider._itemCoordinate.push((i+1)*JsSlider.itemWidth)
            })
        },
        /**
         * Create outerstage for holding tightly and 
         * give slider a confortable apperance
         */
        createOuterStage: function(){
            this.sliderList = document.createElement('div')
                this.sliderList.setAttribute('class', 'qubely-slider-list')
            this.outerStage = document.createElement('div')
                            this.outerStage.setAttribute('class', 'qubely-slider-outer-stage')
                            this.outerStage.innerHTML= this.$element.html()

            this.sliderList.append(this.outerStage)
            this.$element.html(this.sliderList)
            this.$outerStage = $(this.outerStage)
        },

        /**
         * Add navigation controller arrow 
         * @options.nav = true
         */
        createNavigationController: function(){
               // build controlls
               let controllerBox = document.createElement('div')
               controllerBox.setAttribute('class','qubely-slider-nav-control')
               this.$element.append(controllerBox)
   
               this.nextBtn = document.createElement('span')
               this.nextBtn.setAttribute('class','qubely-next-control qubely-nav-control')
               this.prevBtn = document.createElement('span')
               this.prevBtn.setAttribute('class','qubely-prev-control qubely-nav-control')
               controllerBox.append(this.nextBtn)
               controllerBox.append(this.prevBtn)
   
               this.nextBtn.innerHTML = this.options.nav_text[1]; //this.nav_text[1]
               this.prevBtn.innerHTML = this.options.nav_text[0]; //this.nav_text[0]
   
               // Cache next and prev button 
               this.$nextBtn = $(this.nextBtn)
               this.$prevBtn = $(this.prevBtn)
        },

        /**
         * Add dots navigation
         * @options.dots = true 
         */
        createDotsController: function(){
            //Create dots navigation
            let dotBox = document.createElement('div')
            dotBox.setAttribute('class','qubely-slider-dots')
            this.$element.append(dotBox)
            let JsSlider = this;
            let dotContainer = document.createElement('ul')
            let viewPort = null
            if(typeof this.options.responsive !== 'undefined')
                viewPort = this.parseResponsiveViewPort()
            let items = viewPort === null ? this.options.items : typeof viewPort.items === 'undefined' ? this.options.items : viewPort.items
            let dotLength = Math.floor(this._numberOfItems/items)
            if(dotLength > 1 ){
                for(var i=0; i<dotLength; i++ ){
                    let dotItem = document.createElement('li')
                    dotItem.setAttribute('class', 'js-dot-'+i)
                    $(dotItem).css({'-webkit-transition': 'all 0.5s linear 0s'})
                    if(i===0){
                        $(dotItem).addClass('active')
                    }

                    // Dot indicator                        
                    if(JsSlider.options.dot_indicator){
                        let dotIndicator = document.createElement('span')
                            dotIndicator.setAttribute('class','dot-indicator')
                            dotItem.append(dotIndicator)                   
                    }
                    dotContainer.append(dotItem)
                }
            }
            dotBox.append(dotContainer)
            this.$element.append(dotBox)
            //Cache dot container
            this.$dotContainer = $(dotContainer)
        },

     

        /**
         * Apply base css property on initial hook 
         */ 
        applyBasicStyle: function(){
            let totalItems = 0;
            let cssPropety = {}
            cssPropety.width = this.itemWidth-(this.options.margin)+'px'
            if(this.options.margin > 0 ){
                cssPropety.marginRight = this.options.margin+'px'
            }

            this.$element.find('.qubely-slider-item').each(function(){
                totalItems++;
                $(this).css(cssPropety)
            })

            this._currentPosition = this._clones*this.itemWidth
            if(this.options.center === true ){
                this._currentPosition = this._clones*this.itemWidth-(this.itemWidth/2)
            }
            this.$outerStage.css({ 
                '-webkit-transition-duration': '0s',
                '-webkit-transform': `translate3D(-${this._currentPosition}px,0px,0px)`,
                width: totalItems*this.itemWidth+'px'
            })
            this._items = totalItems
            this.updateResponsiveView()
        },

         
        /**
         * Start auto play loop with user provided interval
         * @interval = options.interval or default interval 
         * save each interval for force stop the loop
         */
        startLoop: function(){
            this.timer = setInterval( ()=> {
                if(this.isAnimating === false )
                    this.Next()
            }, this.options.interval )
        },

        /**
         * Stop auto loop on trigger
         */
        stopLoop: function(){
            clearInterval(this.timer)
            this.timer = 0
        },

        /**
         * Go next slider item 
         * @if next slider item is last item 
         * @then go first item 
         * It will be looping one after another item continusely if you continusely click next nav controller
         * 
         * Save the active item to the item object (globally)
         */
        Next: function() {
            // this.isAnimating = true
            if(this.delta === -1)
                this.delta = 1
            this.updateItemStyle()
        },

        /**
         * Go prevouse slider item 
         * @if prevouse slider item is first one then go to last slider 
         * It will be looping on thread if you continousely click prev icon
         * 
         * Save the active item to the item object (globally) 
         */
        Prev: function(){
            // this.isAnimating = true
            if(this.delta === 1)
                this.delta = -1
            this.updateItemStyle()                
        },
        /**
         * Go exact slider position by index number
         * If you click on dots navication it will pick the index number of the dot controller
         * then search the slider index item and active that item 
         * 
         * Check also delta that will tell you where we should go (forword|backword)
         * 
         * Save the active item to the item object (globally)
         */
        slideFromPosition: function(position, delta) {
            // this.isAnimating = true
           let updatedPosition = this.itemWidth*(this.options.items*position)
           let newPosition = position === 0 ? this._minL : this._minL+updatedPosition
           this.$outerStage.css({
                '-webkit-transition': `all ${this.options.speed}ms ease 0s`,
                '-webkit-transform': `translate3D(-${newPosition}px,0px,0px)`,
           })
           this._currentPosition = newPosition
            /**
             * Detect am I click the next elment of active one or prev element
             * If prev element then slide from left otherwise from right
             */
            this.delta = delta
        },
        
        updateDotsFromPosition: function(position){
            let prevActiveDot = this.$dotContainer.find('li.active').removeClass('active')
            let currentActiveDot = this.$dotContainer.find('li:nth-child('+position+')').addClass('active');
            
            if(this.options.dot_indicator){ 
                this.animateDotIndicator(prevActiveDot, 'stop')
                if(this._dotControllerTimeId > 0 ){
                    clearTimeout(this._dotControllerTimeId )
                    this._dotControllerTimeId = 0;
                }
                this._dotControllerTimeId = setTimeout(()=>{
                    this.animateDotIndicator(currentActiveDot, 'start')
                },this.options.speed)
            }
            currentActiveDot.css({ '-webkit-transition':'all 0.5s linear 0s' })
        },

        /**
         * Check action 
         * If its start then get the speed between interval and slider speed 
         * Then set the transition duration
         * @param {DOM} dotItem 
         * @param {string} action 
         */
        animateDotIndicator: function(dotItem, action){
            if(action === 'stop'){
                dotItem.find('.dot-indicator').removeClass('active').css({
                    '-webkit-transition-duration': '0s'
                })
            }
            if( action === 'start' ){ 
                const speed = Math.abs(this.options.interval - this.options.speed);
                dotItem.find('.dot-indicator').addClass('active').css({
                    '-webkit-transition-duration': speed+'ms',
                })
            }
        },
       
        /**
         * Update active and prevouse item style when change the slider 
         * 
         * Check if the new position gretter then Maximum length 
         * Then set the new position to minimum length 
         * 
         * Check if the new position gretter then Minimum length 
         * Then set the new psoition to maximum length
         * 
         * Update the @_currentPosition with new position
         */
        updateItemStyle: function(){

            if(this._timeoutId1 > 0 ){
                clearTimeout(this._timeoutId1 )
                this._timeoutId1 = 0;
            }

            let dragEndPointer = this.prevCoordinate.dragPointer === -1 ? 0 : this.prevCoordinate.dragPointer
            
            let currentPosition = this._currentPosition     
            let thePosition = this.itemWidth + parseInt(dragEndPointer)
            
            let newPosition = this.delta === 1 ? currentPosition+thePosition : currentPosition-thePosition
            
            if(newPosition > this._maxL){
                this.$outerStage.css({
                    'transition': `0s`,
                    '-webkit-transform': `translate3D(-${this._minL-this.itemWidth}px,0px,0px)`,
                })
                newPosition = this._minL
            }
            if(currentPosition < this._minL ){
                this.$outerStage.css({
                    'transition': `0s`,
                    '-webkit-transform': `translate3D(-${this._maxL}px,0px,0px)`,
                })
                newPosition = this._maxL-this.itemWidth
            }

            if(this.isDragging){
                let itemCoordinate = this._itemCoordinate
                let found = false
                for(var i=0; i<itemCoordinate.length; i++){
                    if(itemCoordinate[i] > newPosition){
                        newPosition = this.options.center === true ? itemCoordinate[i]-(this.itemWidth/2) : itemCoordinate[i]
                        found = true
                    }
                    if(found === true )
                        break;
                }
            }

            this._timeoutId1 = setTimeout(()=>{
                this.$outerStage.css({
                    '-webkit-transition': `all ${this.options.speed}ms ease 0s`,
                    '-webkit-transform': `translate3D(-${newPosition}px,0px,0px)`,
                })
            },100)
          

            this._currentPosition = newPosition
            this.processActivationWorker()
            // Start loop if click on controller 
            if(this.options.autoplay && this.timer === 0){
                this.startLoop()
            }
        },

        /**
         * Add / Remove active class from visible elements  
         * 
         */
        processActivationWorker: function(){
            let currentStagePosition = this._currentPosition
            let startIndex = Math.floor(currentStagePosition/this.itemWidth)
            let endIndex = Math.floor(Math.abs(this.options.items + startIndex))
            this.$outerStage.find('.active').removeClass('active')
            for( let i = startIndex; i<endIndex; i++ ){
                this.$outerStage.children(':eq('+i+')').addClass('active')
            }
            let reminder = Math.floor(((startIndex-this._clones)/this.options.items))+1
            if(this.options.dots){ 
                this.$dotContainer.find('.active').removeClass('active')
                this.$dotContainer.find('li:nth-child('+reminder+')').addClass('active')
            }
        },

        
       
       
        /**
         * Change the opacity/x-axis based on dragPointer to the active item and next item vice versa
         * It will work only on dragging over the slider 
         * direction right side drag
         */
        dragoverActionToNextItem: function(dragPointer){
            let currentPosition = this._currentPosition
            let newPosition = currentPosition+parseInt(dragPointer)
            if(newPosition > this._maxL){
                newPosition = this._minL-this.itemWidth+parseInt(dragPointer)
            }
            if(this._timeoutId2 > 0 ){
                clearTimeout(this._timeoutId2 )
                this._timeoutId2 = 0;
            }
           
            this._timeoutId2 = setTimeout(()=>{
                this.$outerStage.css({
                    '-webkit-transition': `all 0s ease 0s`,
                    '-webkit-transform': `translate3D(-${newPosition}px,0px,0px)`,
                })
            },0)
        },

        /**
         * Change the opacity to the active item and prev item vice versa
         * Active the function only on dragging item 
         * direction left side drag
         */
        dragoverActionToPrevItem: function(dragPointer){
            let currentPosition = this._currentPosition
            let newPosition = currentPosition-parseInt(dragPointer)
            if(newPosition < this._minL-this.itemWidth){
                newPosition = this._maxL-parseInt(dragPointer)
            }

            if(this._timeoutId2 > 0 ){
                clearTimeout(this._timeoutId2 )
                this._timeoutId2 = 0;
            }
            this._timeoutId2 = setTimeout(()=>{
                this.$outerStage.css({
                    '-webkit-transition': `all 0s ease 0s`,
                    '-webkit-transform': `translate3D(-${newPosition}px,0px,0px)`,
                })
            },0)
        },

        /**
         * Reset coordination operation
         * When start dragging save some mouse coordinate for calculate the position 
         * So when release the drag it will reset the config to inital setting
         * 
         * Also check if some item already change the opacity on drag operation
         */
        resetCoordiante: function(){
            this.prevCoordinate = { x:0, y:0, diff:0, dragPointer:-1 };
            this.coordinate = {x:0,y:0 };
            if(this.options.autoplay && this.timer === 0){
                this.startLoop()
            }
        },  

        /**
         * Back to stage if not drag enough to satisfy condition
         */
        backToStage: function(){
           
        },
        // Bind events that trigger methods
        bindEvents: function() {
            const JsSlider = this; 

            if(JsSlider.options.nav){ 
                JsSlider.$nextBtn.on('click'+'.'+JsSlider._name, function(e){
                    if( JsSlider.isAnimating === false ){ 
                        if(JsSlider.options.autoplay){ 
                            JsSlider.stopLoop()
                        }
                        JsSlider.Next()
                        //Call JsSlider
                        JsSlider.checkCallBackMethod.call(JsSlider)
                    }
                })

                JsSlider.$prevBtn.on('click'+'.'+JsSlider._name, function(e){
                    if( JsSlider.isAnimating === false ){ 
                        JsSlider.Prev()
                        //Call JsSlider
                        if(JsSlider.options.autoplay){ 
                            JsSlider.stopLoop()
                        }
                        JsSlider.checkCallBackMethod.call(JsSlider)
                    }
                })
            }

            if(JsSlider.options.dots){
                JsSlider.$dotContainer.find('li').each(function(index){
                    $(this).on('click'+'.'+JsSlider._name, function(e){
                        if($(this).hasClass('active') || JsSlider.isAnimating === true)
                            return false
                        
                        if(JsSlider.options.autoplay){
                            JsSlider.stopLoop()
                        }

                        let activeDotNav = $(this).parent().find('li.active')
                        let activeIndex =  JsSlider.$dotContainer.find('li').index(activeDotNav)
                        let delta = activeIndex > index ? -1 : 1
                        JsSlider.slideFromPosition(index, delta)
                        JsSlider.updateDotsFromPosition(index+1)
                        
                        //Call JsSlider
                        JsSlider.checkCallBackMethod.call(JsSlider)
                    })
                })
            }

            JsSlider.$outerStage.on('mousedown'+'.'+JsSlider._name,$.proxy( JsSlider.onDragStart, JsSlider))
            JsSlider.$outerStage.on('mouseup'+'.'+JsSlider._name+' touchend'+'.'+JsSlider._name, $.proxy(JsSlider.onDragEnd, JsSlider))

            JsSlider.$outerStage.on('touchstart'+'.'+JsSlider._name, $.proxy(JsSlider.onDragStart, JsSlider));
			JsSlider.$outerStage.on('touchcancel'+'.'+JsSlider._name, $.proxy(JsSlider.onDragEnd, JsSlider));

            $(window).focus(function() {
                if(JsSlider.options.autoplay && JsSlider.timer === 0){ 
                    JsSlider.startLoop()
                }
            });    
            $(window).blur(function() {
                if(JsSlider.options.autoplay){ 
                    JsSlider.stopLoop()
                }
                JsSlider.destroy()
            });
            $(window).on('resize'+'.'+JsSlider._name, $.proxy(JsSlider.windowResize, JsSlider))
            
        },
        
        windowResize: function(e){
            if( typeof e === 'undefined')
                return; 
            this.updateResponsiveView()
        },
        parseResponsiveViewPort: function(){
            let responsiveProps = this.options.responsive
            if(typeof responsiveProps === 'undefined')
                return
            let activeView = null
            let wWidth = window.innerWidth
            for(let i = 0; i<responsiveProps.length; i++ ){
                if(wWidth > responsiveProps[i].viewport ){
                    activeView = responsiveProps[i]
                    break;
                }
            }
            if(activeView === null){
                activeView = responsiveProps[responsiveProps.length-1]
            }
            return activeView
        },
        updateResponsiveView: function(){
            if(typeof this.options.responsive === 'undefined')
                return
            let JsSlider = this
            let wHeight = window.innerHeight
            let viewPort = JsSlider.parseResponsiveViewPort()
            if(viewPort.height === 'full' ){
                if(this._lastViewPort === wHeight )
                    return
                this._lastViewPort = wHeight
                this.$outerStage.css({height:wHeight+'px'}) 
            }else {
                if(this._lastViewPort === viewPort.height )
                    return 
                this._lastViewPort = viewPort.height
                this.$outerStage.css({height:viewPort.height})
            }
            
        },
        /**
         * Get mouse position
         * @on touch device 
         * @on destkop
         */
        getPosition: function(event){
            let result = { x:null, y:null }
            event = event.originalEvent || event || window.event;
            event = event.touches && event.touches.length ?
			        event.touches[0] : event.changedTouches && event.changedTouches.length ?
                    event.changedTouches[0] : event;

            if (event.pageX) {
                result.x = event.pageX;
                result.y = event.pageY;
            } else {
                result.x = event.clientX;
                result.y = event.clientY;
            }
            return result;
        },
        /**
         * Initiate drag operation
         * Get the mouse position and drag position 
         * Release mouseMove and mouseTouch event
         * @param {object} event 
         */
        onDragStart: function(event){
            if(event.which === 3 || event.which  === 2){ 
                return false
            }
            const JsSlider =  this;
            
            let position = JsSlider.getPosition(event)
            
            JsSlider.coordinate.x = position.x
            JsSlider.coordinate.y = position.y
            
            $(document).one('mousemove'+'.'+JsSlider._name+' touchmove'+'.'+JsSlider._name, $.proxy(function(event){    
                $(document).on('mousemove'+'.'+JsSlider._name+' touchmove'+'.'+JsSlider._name,$.proxy(JsSlider.onDragMove, JsSlider)) 
                event.preventDefault();
            }, this))
            JsSlider.isDragging = true 
        },

        /**
         * OnDraging mouse calculate only X co-ordinate position
         * Check the delta point 
         * If delta positive then move slider to next item 
         * If delta negative then move slider to right item
         * @param {object} event 
         */
        onDragMove: function(event){
            const JsSlider = this
            if(JsSlider.isDragging === false ){ 
                return 
            }
            if(JsSlider.options.autoplay){ 
                JsSlider.stopLoop()
            }
            const position = JsSlider.getPosition(event)
            const coordinate = JsSlider.coordinate
            const prevCoordinate = JsSlider.prevCoordinate
            
            if( prevCoordinate.x !== position.x){
                
                const different =  coordinate.x-position.x
                let dragPercentage = (1 * Math.abs(different)).toFixed(0); 
                JsSlider.prevCoordinate = {
                    x: position.x, 
                    y: position.y,
                    diff: different,
                    dragPointer: dragPercentage
                }

                if( different > 0 ){
                    JsSlider.dragoverActionToNextItem(dragPercentage)
                }
                if(different < 0 ){ 
                    JsSlider.dragoverActionToPrevItem(dragPercentage)
                }
            }
            event.preventDefault()
        },

        /**
         * OnDragEnd event check the co-ordinate different 
         * If co-ordinate different value gretter than 0 then move the Next item 
         * Otherwise move the Prev item 
         * 
         * @param {object} event 
         */
        onDragEnd: function(event){
            const JsSlider = this
            if(JsSlider.isDragging){ 
                let differentCoordinate = JsSlider.prevCoordinate.diff 
                if( Math.abs(differentCoordinate) > 100 ){
                    if(differentCoordinate > 0 ){ 
                        JsSlider.Next()
                    }
                    if(differentCoordinate < 0 ){ 
                        JsSlider.Prev()
                    }
                }else{
                    JsSlider.backToStage()
                }
                JsSlider.isDragging = false 
            }

            JsSlider.resetCoordiante()
            
        },

        /**
         * Check if it has callback function 
         * If has then fire callback function
         */
        checkCallBackMethod: function() {
            this.callback()
        },
        
        /**
         * Fire callback function with current item 
         */
        callback: function(){
            let onChange = this.options.onChange
            if( typeof onChange === 'function'){
                const items = this.$element.find('.qubely-slider-item').length
                let option = { item: this.item, items: items, element: this.$element  }
                onChange.call(this.element, option )
            }
        }
        
    });

    /**
     * Initiate the js-coursel plugin 
     */
    $.fn.JsSlider = function ( options ) {
        this.each(function() {
            if ( !$.data( this, pluginName ) ) {
                $.data( this, pluginName, new Plugin( this, options ) );
            }
        });
        return this;
    };

    /**
     * Default setting for intire slide operation
     */
    $.fn.JsSlider.defaults = {

        // Number of item need to show
        items: 3,

        // Autoplay trigger
        autoplay: false,

        // Is item mode center
        center: false,

        // Margin between items 
        margin : 10,

        // Slide speed 
        speed: 800,

        // Slider interval 
        interval: 4500,

        // callback function in each onChnage event
        onChange: null,

        // Enable/Disable dots indicator
        dots: true,

        // Set inner span to each dot indicator
        dot_indicator: false,

        //Enable/Disable navigation
        nav: true,

        /**
         * Navigation text for next and previous
         * Its will be html or icon or text
         */
        nav_text : ['<','>']
    };
})( jQuery, window, document );