import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.'
  }, 300)

  if (element.textContent === '....') {
    element.textContent = ''
  }
}

function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

function generateUniqueId() {
  const timestamp = Date.now();
  const xecadecimalString = Math.random().toString(16)

  return `id-${timestamp}-${xecadecimalString}`
}

function chatStripe (isAi, value, uniqueId) {
  console.log(isAi, value, uniqueId)
  return(
    `
    <div class='wrapper ${isAi && 'ai'}'>
      <div class='chat'>
        <div class='profile'>
          <img 
            src='${isAi ? bot : user}'
            alt='${isAi ? 'bot' : 'user'}'
          />
        </div>
        <div class='message' id=${uniqueId}>${value}</div>
      </div>
    </div>
  `
  )
  
}

const handleSubmit = async(e) => {
  e.preventDefault()
  const data = new FormData(form)
  //user's chatStrip
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))
  form.reset()

  //bot's chatStrip
  const uniqueId = generateUniqueId();
  console.log(chatStripe(true, '', uniqueId))
  chatContainer.innerHTML += chatStripe(true, '', uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight

  const messageDiv = document.getElementById(uniqueId)
  console.log(messageDiv)
  loader(messageDiv)
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) {
    handleSubmit(e)
  }
})
