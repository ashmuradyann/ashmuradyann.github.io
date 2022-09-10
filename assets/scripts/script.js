const scrollElements = document.querySelectorAll(".js-scroll");
const downloadButtonsWrapper = document.querySelector(".download__resume")
const message = document.querySelector(".message")

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
			"Hi^1000, I am Ashot Muradyan^1500",
			"I am a React JS Developer^1500", 
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


const showWrapper = () => {
	downloadButtonsWrapper.style.opacity = 1
	downloadButtonsWrapper.style.zIndex = 999
	downloadButtonsWrapper.style.pointerEvents = "auto"
}

downloadButtonsWrapper.onclick = () => {
	downloadButtonsWrapper.style.opacity = 0
	downloadButtonsWrapper.style.zIndex = 0
	downloadButtonsWrapper.style.pointerEvents = "none"
}

const copy = () => {
	navigator.clipboard.writeText('ashot.muradyan16@gmail.com')
	message.style.transition = ".5s"
	message.style.opacity = 1
	setTimeout(() => {
		message.style.opacity = 0
		message.style.transition = "1s"
	}, 4000)
}