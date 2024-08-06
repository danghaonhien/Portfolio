///Scroll

var y = $(window).scrollTop();

$(function () {
  $(".down__button").on("click", function () {
    $("html, body").animate({ scrollTop: y + 750 });
  });
});
// let checkbox = $("#navi-toggle");
// const navItems = $(".navigation__item");

// $(navItems).each((e) =>
//   e.addEventListener("click", function () {
//     checkbox.checked = false;
//   })
// );
//Toggle
// $("#theDiv").show();
// $(document).on("click", function (e) {
//   if ($(e.target).closest("#showDivBtn").length) {
//     $("#theDiv").addClass("showDiv");
//   } else if (!$(e.target).closest("#theDiv").length) {
//     $("#theDiv").show();
//   }
// });

/////Read more

$(function () {
  var maxLength = 300;
  $(".show-read-more").each(function () {
    var myStr = $(this).text();
    if ($.trim(myStr).length > maxLength) {
      var newStr = myStr.substring(0, maxLength);
      var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
      $(this).empty().html(newStr);
      $(this).append(
        ' <a href="javascript:void(0);" class="read-more">read more...</a>'
      );
      $(this).append('<span class="more-text">' + removedStr + "</span>");
    }
  });
  $(".read-more").on("click", function () {
    $(this).siblings(".more-text").contents().unwrap();
    $(this).remove();
  });
});

///Tab
$(function (e) {
  $(".tabgroup .tab").on("click", function (e) {
    let index = $(this).index();

    $(this).addClass("active").siblings().removeClass("active");

    $(this)
      .closest(".tabgroup")
      .find(".content")
      .eq(index)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
});
//Carousel

const trueNumber = function (num, max) {
  return num < 0 ? num + max : num;
};

const signNumber = function (num, max) {
  return num > max * 0.5 ? (num % max) - max : num;
};

const wrapNumber = function (num, max) {
  return trueNumber(signNumber(num, max), max);
};

class Carousel {
  constructor(o) {
    Object.assign(this, o);

    let carousel = this;

    this.currentSlide = 0;

    this.slides = this.element.find(".slide");
    this.dots = this.element.find(".control-dot");

    if (this.timing) {
      this.startSlideShow();
    }

    this.element.find(".control-left").on("click", function () {
      carousel.changeSlide(false);
      carousel.restartSlideShow();
    });

    this.element.find(".control-right").on("click", function () {
      carousel.changeSlide(true);
      carousel.restartSlideShow();
    });

    this.element.find(".control-dot").on("click", function () {
      let index = $(this).index();
      carousel.changeSlide(index);
      carousel.restartSlideShow();
    });
  }
  changeSlide(direction) {
    this.previousSlide = this.currentSlide;

    if (direction == true) {
      this.currentSlide++;
    } else if (direction == false) {
      this.currentSlide--;
    } else {
      if (this.currentSlide == direction) {
        return;
      }
      this.currentSlide = direction;

      direction = this.currentSlide > this.previousSlide;
    }

    this.currentSlide = wrapNumber(this.currentSlide, this.slides.length);

    this.showSlide(direction);
  }

  showSlide(direction) {
    let c = this;
    this.slides.removeClass("moving left right center");

    this.slides.eq(this.previousSlide).addClass("center");
    if (direction) {
      this.slides.eq(this.currentSlide).addClass("right");
    } else {
      this.slides.eq(this.currentSlide).addClass("left");
    }

    setTimeout(function () {
      c.dots
        .eq(c.currentSlide)
        .addClass("active")
        .siblings()
        .removeClass("active");

      c.slides
        .eq(c.currentSlide)
        .removeClass("left right")
        .addClass("center moving");

      if (direction) {
        c.slides
          .eq(c.previousSlide)
          .removeClass("center")
          .addClass("left moving");
      } else {
        c.slides
          .eq(c.previousSlide)
          .removeClass("center")
          .addClass("right moving");
      }
    }, 10);
  }

  startSlideShow() {
    let c = this;

    c.stopSlideShow();

    c.timer = setTimeout(function () {
      c.changeSlide(true);
      c.showSlide(true);
      c.startSlideShow();
    }, c.timing);
  }

  stopSlideShow() {
    clearTimeout(this.timer);
  }

  restartSlideShow() {
    let c = this;
    this.stopSlideShow();

    if (this.timing) {
      this.timer = setTimeout(function () {
        c.startSlideShow();
      }, 5000);
    }
  }
}

///Accordian
$(".accordion dt").on("click", function () {
  $(this).next().slideToggle();
});

//lightbox
const openLightBox = function (event) {
  $(".lightbox-content").html(
    '<img src="' + event.target.src + '" style="width: 100%; height:100%">'
  );

  $(".lightbox").addClass("active");
};

$(function () {
  $("body").on("click", ".gallery img", openLightBox);

  $(".lightbox-back").on("click", function () {
    $(".lightbox").removeClass("active");
  });
});

//Time

setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":"
        + min + ":" + sec + am_pm;

    document.getElementById("clock")
        .innerHTML = currentTime;
}

showTime();



// Nav
function openNav() {
  document.getElementById("mySidenav").style.width = "20rem";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("main").style.animationName = "fadeZoomOut";
  document.getElementById("main").style.animationDuration = "2.5s";
  document.getElementById("main").style.animationTimingFunction = "ease-out";
  document.body.style.backgroundColor = "rgba(0,0,0,1)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("main").style.animationName = "moveInLeft";
  document.getElementById("main").style.animationDuration = "1s";
  document.getElementById("main").style.animationTimingFunction = "ease-out";
  document.body.style.backgroundColor = "rgba(0,0,0,1)";
}





function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}