function playVideo() {document.querySelector("body").addEventListener("click",() =>{
  document.querySelector("video").play();
  console.log("hey")
})
}
playVideo();


function sliderAnimation(){
  var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
  });
}
sliderAnimation()


function locoScroll() {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

locoScroll();



function locoScroll () {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


}
locoScroll();

function cursorEffect() {
    var page1Content = document.querySelector("#page1-content");
var cursor = document.querySelector("#cursor");
page1Content.addEventListener("mousemove", function(dets){
    gsap.to(cursor,{
        x:dets.x,
        y:dets.y
    })
})
page1Content.addEventListener("mouseenter",function(){
    gsap.to(cursor,{
        scale:1,
        opacity:1,
    });
})
page1Content.addEventListener("mouseleave",function(){
    gsap.to(cursor,{
        scale:0,
        opacity:0
    });
})
}
cursorEffect();
function page2Animation(){
    gsap.from(".elem h1",{
        y:100,
        stagger:0.2,
        duration:1,
        scrollTrigger:{
            trigger:"#page2",
            scroller:"#main",
            start:"top 47%",
            end:"top 45%",
            // markers:true,
            scrub:1
        }
    })
}
page2Animation();

var tl = gsap.timeline()

tl.from("#loader h3",{
  x:40,
  opacity:0,
  duration:1,
  stagger:0.2
})
tl.to("#loader h3",{
  x:-40,
  opacity:0,
  duration:1,
  stagger:-0.2
})
tl.to("#loader",{
  opacity:0,
  display:"none",
})
tl.from("#page1-content span",{
  y:100,
  opacity:0,
  stagger:0.1
})

// page3Animation();

// var tl = gsap.timeline()

// tl.from("#loader h3",{
//   x:40,
//   opacity:0,
//   duration:1,
//   stagger:0.2
// })
// tl.to("#loader h3",{
//   x:-40,
//   opacity:0,
//   duration:1,
//   stagger:-0.2
// })
// tl.to("#loader",{
//   opacity:0,
//   display:"none",
// })
// tl.from("#page1-content span",{
//   y:100,
//   opacity:0,
//   stagger:0.1
// })
// <------

const gsTitle = {
  init() {
      this._root = document.querySelector( "#Title" );
      this._titles = this._root.querySelectorAll( ".Title-title" );
      this._frame = this._frame.bind( this );
      this.setTexts( [
          "D⎑▽",
          "D⎑D",
          "▽OD",
          "DOD",
          "DOD",
          "⏃⎑⎅",
          "⏃▽⎑⎅",
          
      ] );
  },
  on() {
      if ( !this._frameId ) {
          this._frame();
      }
  },
  off() {
      clearTimeout( this._frameId );
      this._textContent( this._text );
      delete this._frameId;
  },
  setTexts( [ text, ...alt ] ) {
      this._text = text;
      this._textAlt = alt;
  },

  // private:
  _text: "",
  _textAlt: [],
  _rand( n ) {
      return Math.random() * n | 0;
  },
  _textContent( txt ) {
      this._titles.forEach( el => el.textContent = txt );
  },
  _frame() {
      const txt = Array.from( this._text );

      for ( let i = 0; i < 6; ++i ) {
          const ind = this._rand( this._text.length );

          txt[ ind ] = this._textAlt[ this._rand( this._textAlt.length ) ][ ind ];
      }
      this._textContent( txt.join( "" ) );
      this._root.classList.add( "Title-glitch" );
      setTimeout( () => {
          this._textContent( this._text );
          this._root.classList.remove( "Title-glitch" );
      }, 50 + Math.random() * 200 );
      this._frameId = setTimeout( this._frame, 250 + Math.random() * 500 );
  },
};

gsTitle.init();
gsTitle.on();

// <--------

document.addEventListener("DOMContentLoaded", function() {
  const soundToggleBtn = document.getElementById("sound-toggle");
  const backgroundMusic = document.getElementById("background-music");

  // Start playing music automatically when the page loads
  backgroundMusic.play();

  soundToggleBtn.addEventListener("click", function() {
      // Toggle between sound on and off states
      if (backgroundMusic.paused) {
          backgroundMusic.play();
          soundToggleBtn.textContent = "🔊 Sound On";
          soundToggleBtn.classList.remove("sound-off");
          soundToggleBtn.classList.add("sound-on");
      } else {
          backgroundMusic.pause();
          soundToggleBtn.textContent = "🔇 Sound Off";
          soundToggleBtn.classList.remove("sound-on");
          soundToggleBtn.classList.add("sound-off");
      }
  });
});

// <-------

var demoButtons;

function start () {
  
  // Add event "click" to "demo buttons"
  demoButtons = document.querySelectorAll ('.js-modify');
  for (var i = 0; i < demoButtons.length; i++) {
    demoButtons[i].addEventListener ('click', toggleEffect);
  }
  
  // Add event "click" to "save buttons"
  var saveButtons = document.querySelectorAll ('.js-save');
  for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener ('click', toggleActive);
  }
  
}

// Toggle "effect" classes
function toggleEffect () {
  var target = document.querySelector (this.dataset.target);
      target.dataset.effect = this.dataset.effect;
  
  for (var i= 0; i < demoButtons.length; i++) {
    demoButtons[i].classList.remove ('active');
  }
  
  toggleActive.call (this);
}

// Toggle "active" class
function toggleActive () {
  this.classList.toggle ('active');
}

// Invoke "start ()" function
window.addEventListener ('load', start);


// ----------------

