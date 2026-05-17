window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>60)
})

// INTERSECTION OBSERVER FOR REVEALS
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}})
},{threshold:0.12})
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))

// COUNT UP ANIMATION
const countObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el=entry.target
      const target=parseInt(el.getAttribute('data-target'))
      let start=0
      const duration=1600
      const step=()=>{
        const elapsed=performance.now()-startTime
        const progress=Math.min(elapsed/duration,1)
        const eased=1-Math.pow(1-progress,3)
        el.textContent=Math.floor(eased*target)
        if(progress<1)requestAnimationFrame(step)
        else el.textContent=target
      }
      const startTime=performance.now()
      requestAnimationFrame(step)
      countObserver.unobserve(el)
    }
  })
},{threshold:0.5})
document.querySelectorAll('.count-target').forEach(el=>countObserver.observe(el))

// FORM SUBMIT
function handleSubmit(e){
  e.preventDefault()
  const btn=e.target.querySelector('.form-submit')
  btn.textContent='Sending...'
  btn.disabled=true
  setTimeout(()=>{
    document.getElementById('form-success').style.display='block'
    btn.textContent='Sent ✓'
    btn.style.background='#25D366'
  },1200)
}

// PARALLAX HERO
window.addEventListener('scroll',()=>{
  const y=window.scrollY
  const bg=document.querySelector('.hero-bg')
  if(bg)bg.style.transform=`translateY(${y*.35}px)`
})
