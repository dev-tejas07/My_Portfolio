// Edit these lists to add or change content
const projects=[
 {name:"Python-based Expense Tracker",desc:"Tracks daily expenses and shows them in a simple, easy-to-read interface.",points:["Records daily expenses","Displays them with a simple UI"],tech:["Python","MongoDB"]},
 {name:"Python-based Event Management System",desc:"Keeps details of upcoming events along with information about each specific event.",points:["Stores upcoming event details","Shows information for each event"],tech:["Python","MongoDB"]},
 {name:"Career Forge",desc:"Online smart resume analyzer and interview preparation system.",points:["Takes your resume and analyzes it","Extracts skills and compares them with job roles","Gives personalized suggestions","Includes interview preparation"],tech:["HTML","CSS","JavaScript","Python","Flask","GitHub"]},
 {name:"Personal Portfolio Website",desc:"Shows my personal and professional details to everyone in one place.",points:["Home, About, Projects and Contact sections","Responsive on phones and desktops"],tech:["HTML","CSS","JavaScript","React"]}
];
const skills=["HTML","CSS","JavaScript","Python","GitHub","React","Flask","SQL"];
const GH="https://github.com/dev-tejas07";
const $=id=>document.getElementById(id);

// Skills + project cards
$("skills").innerHTML=skills.map(s=>`<li><button>${s}</button></li>`).join("");
$("projectGrid").innerHTML=projects.map((p,i)=>`
 <article class="card" tabindex="0" data-i="${i}">
  <h3>${p.name}</h3><p>${p.desc}</p>
  <div class="tags">${p.tech.map(t=>`<span>${t}</span>`).join("")}</div>
  <div class="more">View details &rarr;</div>
 </article>`).join("");
const cards=[...document.querySelectorAll(".card")];

// Click a skill to highlight matching projects
let active=null;
document.querySelectorAll(".skills button").forEach(b=>b.onclick=()=>{
  active=active===b.textContent?null:b.textContent;
  document.querySelectorAll(".skills button").forEach(x=>x.classList.toggle("on",x.textContent===active));
  let n=0;
  cards.forEach((c,i)=>{const hit=!active||projects[i].tech.includes(active);c.classList.toggle("dim",!hit);if(hit)n++;});
  $("filterNote").textContent=active?(n?`${n} project${n>1?"s":""} use ${active}.`:`No projects tagged with ${active} yet.`):"";
  if(active)location.hash="projects";
});

// 3D tilt on cards
cards.forEach(c=>{
  c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`;});
  c.addEventListener("mouseleave",()=>c.style.transform="");
  const open=()=>{const p=projects[c.dataset.i];
    $("mTitle").textContent=p.name;$("mDesc").textContent=p.desc;
    $("mPoints").innerHTML=p.points.map(x=>`<li>${x}</li>`).join("");
    $("mTech").innerHTML=p.tech.map(t=>`<span>${t}</span>`).join("");
    $("mLink").href=GH;$("modal").showModal();};
  c.onclick=open;c.onkeydown=e=>{if(e.key==="Enter")open();};
});
$("close").onclick=()=>$("modal").close();
$("modal").onclick=e=>{if(e.target===$("modal"))$("modal").close();};

// Typing effect
const roles=["B.Voc. in Software Development","Web Developer in the making","Python and Flask learner"];
let r=0,ch=0,del=false;
(function type(){
  const t=roles[r];ch+=del?-1:1;$("typed").textContent=t.slice(0,ch);
  let d=del?35:70;
  if(!del&&ch===t.length){del=true;d=1600;}
  else if(del&&ch===0){del=false;r=(r+1)%roles.length;d=400;}
  setTimeout(type,d);
})();

// Scroll: progress bar, back-to-top, active nav, reveal, counters
const links=[...document.querySelectorAll("nav a")];
addEventListener("scroll",()=>{
  const h=document.documentElement;
  $("progress").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";
  $("top").classList.toggle("show",h.scrollTop>500);
  let cur="home";document.querySelectorAll("section").forEach(s=>{if(s.getBoundingClientRect().top<150)cur=s.id;});
  links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur));
});
$("top").onclick=()=>scrollTo({top:0});
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;e.target.classList.add("show");
  e.target.querySelectorAll("[data-n]").forEach(el=>{let n=0,end=+el.dataset.n;
    const t=setInterval(()=>{el.textContent=++n;if(n>=end)clearInterval(t);},250);});
  io.unobserve(e.target);
}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(s=>io.observe(s));

// Cursor glow
addEventListener("mousemove",e=>{$("glow").style.left=e.clientX+"px";$("glow").style.top=e.clientY+"px";});

// Theme toggle (remembers choice)
const root=document.documentElement;
try{const s=localStorage.getItem("theme");if(s)root.dataset.theme=s;}catch(e){}
const icon=()=>$("theme").innerHTML=root.dataset.theme==="light"?"&#9790;":"&#9728;";icon();
$("theme").onclick=()=>{root.dataset.theme=root.dataset.theme==="light"?"dark":"light";
  try{localStorage.setItem("theme",root.dataset.theme);}catch(e){}icon();};

// Mobile menu + footer year
$("menuBtn").onclick=()=>$("menu").classList.toggle("open");
$("menu").onclick=()=>$("menu").classList.remove("open");
$("year").textContent=new Date().getFullYear();

// Contact form: validates, then opens the visitor's email app
$("form").addEventListener("submit",e=>{
  e.preventDefault();
  const n=$("name"),m=$("email"),g=$("msg"),st=$("status");let ok=true;
  [n,m,g].forEach(f=>{const bad=!f.value.trim()||(f===m&&!/^\S+@\S+\.\S+$/.test(f.value));f.classList.toggle("error",bad);if(bad)ok=false;});
  if(!ok){st.textContent="Please fill in all fields with a valid email.";st.style.color="#e5484d";return;}
  location.href=`mailto:tejasgupta787@gmail.com?subject=${encodeURIComponent("Portfolio message from "+n.value)}&body=${encodeURIComponent(g.value+"\n\nFrom: "+n.value+" ("+m.value+")")}`;
  st.textContent="Opening your email app...";st.style.color="var(--b)";e.target.reset();
});
