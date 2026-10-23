
(function(){
var L=(window.SEN_L||'KO');
var D={KO:['일','월','화','수','목','금','토'],ZH:['日','一','二','三','四','五','六'],EN:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']};
var TAG={KO:'시민이 만드는 에너지 전환 소식',ZH:'市民主导的能源转型新闻',EN:'News on the citizen-led energy transition'};
var FOOT={KO:'시민주도 에너지 전환·햇빛소득마을·사회연대경제 전문 매체',ZH:'市民主导能源转型 · 阳光收入村 · 社会连带经济专业媒体',EN:'Citizen-led energy transition · Sunlight Income Villages · Social and solidarity economy'};
var HL={KO:'ko',ZH:'zh-CN',EN:'en'};
function set(l){L=l;document.documentElement.setAttribute('data-l',l);document.documentElement.lang=HL[l];try{localStorage.setItem('sen-lang',l)}catch(e){}
 var d=new Date(),t=document.getElementById('today');if(t)t.textContent=d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0')+' ('+D[l][d.getDay()]+')';
 var g=document.getElementById('tagline');if(g)g.textContent=TAG[l];var f=document.getElementById('foot-txt');if(f)f.textContent=FOOT[l];
 var bs=document.querySelectorAll('#langs button');for(var i=0;i<bs.length;i++)bs[i].classList.toggle('on',bs[i].getAttribute('data-l')===l);
 var tt=document.querySelector('[data-title-'+l.toLowerCase()+']');if(tt)document.title=tt.getAttribute('data-title-'+l.toLowerCase());}
document.addEventListener('click',function(e){var b=e.target.closest('#langs button');if(b)set(b.getAttribute('data-l'))});
set(L);
})();
