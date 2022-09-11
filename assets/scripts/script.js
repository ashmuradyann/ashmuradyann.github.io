const scrollElements = document.querySelectorAll(".js-scroll");
const downloadButtonsWrapper = document.querySelector(".download__resume")
const message = document.querySelector(".message")
const likeBtns = document.querySelector(".like__btns")
const likeCount = document.querySelector(".like__count")
const likeTitleWrapper = document.querySelector(".like__title__wrapper")

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

let count
let KEY = "$2b$10$.cM.jejY.OkO4SvcEUU.F.WaQuAl8SF3ewJoAOZKb6ZO.3ChhgjVW"

const like = async (state) => {

	localStorage.setItem("liked", state)
	likeBtns.innerHTML = `<img src='https://img.icons8.com/material-${state ? 'rounded' : 'outlined'}/50/ffffff/facebook-like--v1.svg' onclick='like(${state ? false : true})' />`
	likeTitleWrapper.innerHTML = `<h2 class="like__title" data-title="${state ? 'already liked' : 'sure, like!'}">Like my portfolio site</h2>`
	// likeCount.innerHTML = state ? count + 1 + " likes" : count == undefined ? count - 1 : count + " likes"
	
	await fetch("https://api.jsonbin.io/v3/b/631df3ec5c146d63ca979518", {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
			"X-Master-Key": KEY
		},
		body: JSON.stringify({ "count": state ? count + 1 : count - 1 })
	}).then(res => res.json()).then(res => console.log(res))
}

likeTitleWrapper.innerHTML = `<h2 class="like__title" data-title="${localStorage.getItem("liked") === "false" ? 'sure, like!' : 'already liked'}">Like my portfolio site</h2>`

window.addEventListener("load", async () => {
	localStorage.setItem("liked", localStorage.getItem("liked") == null ? false : localStorage.getItem("liked"))
	console.log(localStorage.getItem("liked"))
	const headers = {
		"X-Master-Key": KEY
	}
	await fetch("https://api.jsonbin.io/v3/b/631df3ec5c146d63ca979518/latest", { headers })
		.then(res => res.json()).then(res => {
			count = res.record.count
		})

	likeCount.innerHTML = count + " likes"
	
	if (localStorage.getItem("liked") === "true") {
		likeBtns.innerHTML = "<img src='https://img.icons8.com/material-rounded/50/ffffff/facebook-like--v1.svg' onclick='like(false)' />"
	} else {
		likeBtns.innerHTML = "<img src='https://img.icons8.com/material-outlined/50/ffffff/facebook-like--v1.svg' onclick='like(true)' />"
	}
})