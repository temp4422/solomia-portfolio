const content = document.querySelector('.content')
const navButton = document.querySelector('.nav__button')
const nav = document.querySelector('.nav')
const headerDim = document.querySelector('.header__dim')

/* Toggle menu */
function toggleMenu(e) {
  nav.classList.toggle('show')
  content.classList.toggle('lock')
  headerDim.classList.toggle('header__dim--active')
}
const navItems = [navButton, nav, headerDim]
navItems.forEach((item) => {
  item.addEventListener('click', toggleMenu, false)
})


/* 3D effect on hover */
let el = document.querySelector('.image')
/* Get the height and width of the element */
const height = el.clientHeight
const width = el.clientWidth
/* Add a listener for mousemove event which will trigger function 'handleMove' On mousemove */
el.addEventListener('mousemove', handleMove)

function handleMove(e) {
  /* Get position of mouse cursor with respect to the element on mouseover */
  const xVal = e.layerX // Store the x position
  const yVal = e.layerY // Store the y position
  /* Here the multiplier 20 is to. Control the rotation. You can change the value and see the results. */
  const yRotation = 20 * ((xVal - width / 2) / width) // Calculate rotation valuee along the Y-axis
  const xRotation = -20 * ((yVal - height / 2) / height) // Calculate the rotation along the X-axis
  /* Generate string for CSS transform property */
  const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
  /* Apply the calculated transformation */
  el.style.transform = string
}

/* Add listener for mouseout event, remove the rotation */
el.addEventListener('mouseout', () => {
  el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})
/* Add listener for mousedown event, to simulate click */
el.addEventListener('mousedown', () => {
  el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
})
/* Add listener for mouseup, simulate release of mouse click */
el.addEventListener('mouseup', () => {
  el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
})


/* Animate images on scroll */
const scrollElements = document.querySelectorAll('.js-scroll')

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top

  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
}

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top

  return elementTop > (window.innerHeight || document.documentElement.clientHeight)
}

const displayScrollElement = (element) => {
  element.classList.add('scrolled')
}

const hideScrollElement = (element) => {
  element.classList.remove('scrolled')
}

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el)
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

// content.addEventListener('scroll', () => {
//   handleScrollAnimation()
// })

/*Increasing Performance with Throttle*/
var throttleTimer

const throttle = (callback, time) => {
  if (throttleTimer) return

  throttleTimer = true
  setTimeout(() => {
    callback()
    throttleTimer = false
  }, time)
}

content.addEventListener('scroll', () => {
  throttle(() => {
    handleScrollAnimation()
  }, 250)
})