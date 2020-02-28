//Addon Animated Heading
(function ($) {

    var animatedHeading = function (options) {
        this.$heading = options.heading;
        this.type = typeof options.type === 'undefined' ? 'word' : options.type;
        this.animationDelay = 2500;
        //loading bar effect
        this.barAnimationDelay = 3800;
        this.barWaiting = this.barAnimationDelay - 3000; //3000 is the duration of the transition on the loading bar - set in the scss/css file
        //letters effect
        this.lettersDelay = 50;
        //type effect
        this.typeLettersDelay = 150;
        this.selectionDuration = 500;
        this.typeAnimationDelay = this.selectionDuration + 800;
        //text-clip effect
        this.revealDuration = 600;
        this.revealAnimationDelay = 1500;
        this.interval = 0;
        this._destroy = false;
        this.init()
    }
    animatedHeading.prototype.init = function () {
        //insert <i> element for each letter of a changing word
        var element = this.$heading.parent().find('.letters')
        this.singleLetters(element.find('.animated-text'));
        this.animateHeadline(this.$heading);
    }

    animatedHeading.prototype.destroy = function () {
        this.$heading.find('.animated-text').each(function (i) {
            $(this).addClass('is-hidden')
            $(this).removeClass('is-visible')
            if (i === 0) {
                $(this).removeClass('is-hidden').addClass('is-visible')
            }
            $(this).attr('style', '')
        })

        const $wrapperElement = this.$heading.find('.qubely-animated-text .animated-text-words-wrapper');
        $wrapperElement.attr('style', '');
        this._destroy = true;
        this.$heading = null;
    }

    animatedHeading.prototype.singleLetters = function ($words) {
        if (this._destroy) {
            return;
        }
        $words.each(function () {
            var word = $(this),
                letters = word.text().split(''),
                selected = word.hasClass('is-visible');
            for (i in letters) {
                if (word.parents('.animation-wave').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters).css('opacity', 1);
        });
    }

    animatedHeading.prototype.animateHeadline = function ($headlines) {
        var duration = this.animationDelay;
        var self = this;
        $headlines.each(function () {
            var headline = $(this);

            if (headline.hasClass('loading-bar')) {
                duration = self.barAnimationDelay;
                setTimeout(function () { headline.find('.qubely-animated-text .animated-text-words-wrapper').addClass('is-loading') }, self.barWaiting);
            } else if (headline.hasClass('text-clip')) {
                var spanWrapper = headline.find('.qubely-animated-text .animated-text-words-wrapper'),
                    newWidth = spanWrapper.width() + 5
                if(!$('.block-editor-block-list__layout').length){
                    spanWrapper.css('width', newWidth);
                }

            } else if (!headline.hasClass('type')) {
                //assign to .animated-text-words-wrapper the width of its longest word
                var words = headline.find('.qubely-animated-text .animated-text-words-wrapper .animated-text.is-visible');
                self.setParentClassWidth(words, delay = false);
            };

            //trigger animation
            setTimeout(function () {
                self.hideWord(headline.find('span.is-visible').eq(0));
            }, duration);

        });
    }

    animatedHeading.prototype.hideWord = function ($word) {
        var nextWord = this.takeNext($word);
        var self = this;
        if (this._destroy) {
            return;
        }
        if ($word.parents('.animated-heading-text').hasClass('type')) {
            var parentSpan = $word.parent('.animated-text-words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function () {
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, self.selectionDuration);
            setTimeout(function () { self.showWord(nextWord, self.typeLettersDelay) }, self.typeAnimationDelay);

        } else if ($word.parents('.animated-heading-text').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            self.hideLetter($word.find('i').eq(0), $word, bool, self.lettersDelay);
            self.showLetter(nextWord.find('i').eq(0), nextWord, bool, self.lettersDelay);
            self.setParentClassWidth(nextWord);

        } else if ($word.parents('.animated-heading-text').hasClass('text-clip')) {
            $word.parents('.animated-text-words-wrapper').animate({ width: '2px' }, self.revealDuration, function () {
                self.switchWord($word, nextWord);
                self.showWord(nextWord);
            });

        } else if ($word.parents('.animated-heading-text').hasClass('loading-bar')) {
            $word.parents('.animated-text-words-wrapper').removeClass('is-loading');
            this.switchWord($word, nextWord);
            setTimeout(function () { self.hideWord(nextWord) }, self.barAnimationDelay);
            setTimeout(function () { $word.parents('.animated-text-words-wrapper').addClass('is-loading') }, self.barWaiting);
            this.setParentClassWidth(nextWord);

        } else {
            this.switchWord($word, nextWord);
            setTimeout(function () { self.hideWord(nextWord) }, self.animationDelay);
            this.setParentClassWidth(nextWord);
        }

    }

    animatedHeading.prototype.showWord = function ($word, $duration) {
        var self = this;
        if (this._destroy) {
            return;
        }
        if ($word.parents('.animated-heading-text').hasClass('type')) {
            self.showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');

        } else if ($word.parents('.animated-heading-text').hasClass('text-clip')) {
            $word.parents('.animated-text-words-wrapper').animate({ 'width': $word.width() + 5 }, self.revealDuration, function () {
                setTimeout(function () { self.hideWord($word) }, self.revealAnimationDelay);
            });
        }
    }

    animatedHeading.prototype.hideLetter = function ($letter, $word, $bool, $duration) {
        if (this._destroy) {
            return;
        }
        $letter.removeClass('in').addClass('out');
        var self = this;
        if (!$letter.is(':last-child')) {
            setTimeout(function () { self.hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
        } else if ($bool) {
            setTimeout(function () { self.hideWord(self.takeNext($word)) }, self.animationDelay);
        }

        if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = self.takeNext($word);
            self.switchWord($word, nextWord);
        }
    }

    animatedHeading.prototype.showLetter = function ($letter, $word, $bool, $duration) {
        if (this._destroy) {
            return;
        }
        $letter.addClass('in').removeClass('out');
        var self = this;
        if (!$letter.is(':last-child')) {
            setTimeout(function () { self.showLetter($letter.next(), $word, $bool, $duration); }, $duration);
        } else {
            if ($word.parents('.animated-heading-text').hasClass('type')) { setTimeout(function () { $word.parents('.animated-text-words-wrapper').addClass('waiting'); }, 200); }
            if (!$bool) { setTimeout(function () { self.hideWord($word) }, self.animationDelay) }
        }
    }

    animatedHeading.prototype.takeNext = function ($word) {
        if (this._destroy) {
            return;
        }
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    animatedHeading.prototype.takePrev = function ($word) {
        if (this._destroy) {
            return;
        }
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    animatedHeading.prototype.switchWord = function ($oldWord, $newWord) {
        if (this._destroy) {
            return;
        }
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }

    animatedHeading.prototype.setParentClassWidth = function ($nextWord) {
        if (this._destroy) {
            return;
        }
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var parent = $nextWord.parents('.animated-text-words-wrapper');
        var currentWordWidth = $nextWord.width();
        var customDuration = delay ? this.revealDuration / 2 : 0;
        if (this.interval > 0) {
            clearInterval(this.interval);
            this.interval = 0;
        }
        var self = this;
        setTimeout(function () {
            parent.css({
                'transition-function': 'ease',
                'transitionDuration': self.revealDuration + 'ms',
                'transitionProperty': 'width',
                'width': currentWordWidth + 'px'
            });
        }, customDuration);
    };
    window.animatedHeading = animatedHeading;


    //ANIMATED HEADLINE BLOCK
    $(':not(.block-editor-block-list__layout) .qubely-block-animated-heading .animated-heading-text').each(function () {
        let animatedHeadline = $(this)
        if (window.animatedHeading) {
            new window.animatedHeading({ heading: $(animatedHeadline) })
        }
    });

})(jQuery);