
(function(){
var L=(window.SEN_L||'KO');
var D={KO:['일','월','화','수','목','금','토'],JA:['日','月','火','水','木','金','土'],ZH:['日','一','二','三','四','五','六'],EN:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']};
var TAG={KO:'시민이 만드는 에너지 전환 소식',JA:'市民がつくるエネルギー転換ニュース',ZH:'市民主导的能源转型新闻',EN:'News on the citizen-led energy transition'};
var FOOT={KO:'시민주도 에너지 전환·햇빛소득마을·사회연대경제 전문 매체',JA:'市民主導のエネルギー転換・太陽光所得村・社会連帯経済の専門メディア',ZH:'市民主导能源转型 · 阳光收入村 · 社会连带经济专业媒体',EN:'Citizen-led energy transition · Sunlight Income Villages · Social and solidarity economy'};
var HL={KO:'ko',JA:'ja',ZH:'zh-CN',EN:'en'};
function set(l){L=l;document.documentElement.setAttribute('data-l',l);document.documentElement.lang=HL[l];try{localStorage.setItem('sen-lang',l)}catch(e){}
 var d=new Date(),t=document.getElementById('today');if(t)t.textContent=d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0')+' ('+D[l][d.getDay()]+')';
 var g=document.getElementById('tagline');if(g)g.textContent=TAG[l];var f=document.getElementById('foot-txt');if(f)f.textContent=FOOT[l];
 var bs=document.querySelectorAll('#langs button');for(var i=0;i<bs.length;i++)bs[i].classList.toggle('on',bs[i].getAttribute('data-l')===l);
 var tt=document.querySelector('[data-title-'+l.toLowerCase()+']');if(tt)document.title=tt.getAttribute('data-title-'+l.toLowerCase());}
document.addEventListener('click',function(e){var b=e.target.closest('#langs button');if(b)set(b.getAttribute('data-l'))});
set(L);
})();

// 방문자 집계(구글 애널리틱스)
(function(){var id='G-CC8TZ9T7TV';var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);
window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',id);})();
// 공감·공유 (대표 지시 261023). 공감 수는 abacus.jasoncameron.dev 무료 카운터, 중복 공감은 브라우저에 기억
(function(){var as=document.querySelectorAll('.acts');if(!as.length)return;
var id=as[0].getAttribute('data-id'),NS='https://abacus.jasoncameron.dev/',K='citizenenergynews/'+id;
var done=false;try{done=localStorage.getItem('sen-like-'+id)==='1'}catch(e){}
function each(f){for(var i=0;i<as.length;i++)f(as[i])}
function show(v){if(typeof v==='number')each(function(a){a.querySelector('.like b').textContent=v})}
if(done)each(function(a){a.querySelector('.like').classList.add('on')});
fetch(NS+'get/'+K).then(function(r){return r.json()}).then(function(j){show(j.value||0)}).catch(function(){});
var MSG={KO:'URL이 복사되었습니다.',JA:'URLをコピーしました。',ZH:'网址已复制。',EN:'URL copied.'};
function lang(){return document.documentElement.getAttribute('data-l')||'KO'}
function url(){return location.origin+location.pathname+'?lang='+lang().toLowerCase()}
document.addEventListener('click',function(e){var b=e.target.closest('.acts [data-act]');if(!b)return;e.preventDefault();var a=b.closest('.acts'),t=b.getAttribute('data-act');
 if(t==='like'){if(done)return;done=true;each(function(x){x.querySelector('.like').classList.add('on')});try{localStorage.setItem('sen-like-'+id,'1')}catch(x){}
  show((parseInt(a.querySelector('.like b').textContent,10)||0)+1);fetch(NS+'hit/'+K).then(function(r){return r.json()}).then(function(j){show(j.value)}).catch(function(){});return}
 if(t==='copy'){var ts=a.querySelector('.toast'),ok=function(){ts.textContent=MSG[lang()];setTimeout(function(){ts.textContent=''},2500)};
  if(navigator.clipboard)navigator.clipboard.writeText(url()).then(ok,function(){prompt('URL',url())});else prompt('URL',url())}});
})();
