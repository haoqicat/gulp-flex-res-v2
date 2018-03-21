const selector = '.footer a'
const elements = document.querySelectorAll(selector)

Array.prototype.forEach.call(elements, function(el) {
  const path = document.location.pathname.split('/')
  const page = path[path.length - 1]
  const href = el.getAttribute('href')
  if (href === page) {
    const className = 'active'
    if (el.classList) el.classList.add(className)
    else el.className += ' ' + className
  }
})
