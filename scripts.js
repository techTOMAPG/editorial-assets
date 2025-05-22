// Gallery carousel
document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll(".notion-collection-gallery.large");

  galleries.forEach((gallery) => {
    let index = 0;
    const cards = gallery.querySelectorAll(".notion-collection-card");
    const count = cards.length;

    if (count <= 1) return;

    const scrollToIndex = (i, behavior = "smooth") => {
      gallery.scrollTo({
        left: i * gallery.clientWidth,
        behavior: behavior
      });
    };

    function autoSlide() {
      index++;
      if (index >= count) {
        index = 0;
        scrollToIndex(index, "smooth");
      } else {
        scrollToIndex(index, "smooth");
      }
    }

    let interval = setInterval(autoSlide, 4000);

    gallery.onmouseover = () => clearInterval(interval);
    gallery.onmouseout = () => interval = setInterval(autoSlide, 4000);

    let resumeTimeout;
    gallery.ontouchstart = () => {
      clearInterval(interval);
      clearTimeout(resumeTimeout);
    };
    gallery.ontouchend = () => {
      resumeTimeout = setTimeout(() => {
        interval = setInterval(autoSlide, 4000);
      }, 1500);
    };
    gallery.ontouchcancel = () => {
      resumeTimeout = setTimeout(() => {
        interval = setInterval(autoSlide, 4000);
      }, 1500);
    };
  });
});
