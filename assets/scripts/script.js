window.onscroll = () => {
 	var elementScroll = document.documentElement.scrollTop;
	var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

	document.querySelector("#progress").style.width = `${(elementScroll / windowHeight) * 100}%`;
	document.querySelector("#progress").style.transition = ".4s"
}

var typed = new Typed('#welcome', 
	{
		strings: [
			"Hi !",
			"Hi^1000, I am Ashot Muradyan^2000",
			"I am a Frontend Developer^2000", 
			"So..^500 Let's Dive In !"],
		typeSpeed: 50,
		backSpeed: 35,
		startDelay: 500,
		onComplete: (self) => {
			let welcome = document.querySelector(".welcome__wrapper")
			let arrow = document.querySelector(".arrow__wrapper")
			arrow.style.opacity = "1"
			arrow.style.transform = "translateY(-10px)"
			welcome.style.transform = "translateY(0px)"
		}
})

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});