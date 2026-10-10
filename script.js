const PASSWORD="galludi";
const pages=[...document.querySelectorAll(".page[data-page]")];
const lock=document.getElementById("lock"),site=document.getElementById("site"),error=document.getElementById("error");
const music=document.getElementById("music"), musicBtn=document.getElementById("musicBtn");

function go(n){
  pages.forEach(p=>p.classList.toggle("active",p.dataset.page===String(n)));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));

document.getElementById("unlock").addEventListener("click",unlock);
document.getElementById("password").addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});
function unlock(){
  if(document.getElementById("password").value===PASSWORD){
    lock.classList.remove("active"); lock.classList.add("hidden");
    site.classList.remove("hidden"); go(1);
    music.play().then(()=>{musicBtn.textContent="🎵 Music: On"}).catch(()=>{});
  }else{
    error.textContent="Wrong password — try again ✨";
  }
}
musicBtn.addEventListener("click",()=>{
  if(music.paused){music.play();musicBtn.textContent="🎵 Music: On"}
  else{music.pause();musicBtn.textContent="🎵 Music: Off"}
});

const gift=document.getElementById("gift"), reveal=document.getElementById("reveal"), hint=document.getElementById("giftHint");
function openGift(){
  gift.classList.add("open"); reveal.classList.remove("hidden"); hint.textContent="✨ Surprise unlocked!";
  burst();
}
gift.addEventListener("click",openGift);
gift.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openGift()}});

function burst(){
  for(let i=0;i<22;i++){
    const s=document.createElement("span"); s.textContent=["♥","✦","✨","🎉"][i%4];
    s.style.position="fixed";s.style.left="50%";s.style.top="50%";s.style.zIndex=30;
    s.style.fontSize=(14+Math.random()*18)+"px";s.style.pointerEvents="none";
    document.body.appendChild(s);
    const x=(Math.random()-.5)*80, y=(Math.random()-.5)*70;
    s.animate([{transform:"translate(-50%,-50%) scale(.4)",opacity:1},{transform:`translate(calc(-50% + ${x}vw),calc(-50% + ${y}vh)) scale(1.3)`,opacity:0}],{duration:1200+Math.random()*700,easing:"cubic-bezier(.2,.8,.2,1)"}).onfinish=()=>s.remove();
  }
}