
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
(function(){var a=document.querySelector('.acts');if(!a)return;
var id=a.getAttribute('data-id'),NS='https://abacus.jasoncameron.dev/',K='citizenenergynews/'+id,lk=a.querySelector('.like'),n=a.querySelector('.like b'),tst=a.querySelector('.toast');
var done=false;try{done=localStorage.getItem('sen-like-'+id)==='1'}catch(e){}
function show(v){if(typeof v==='number')n.textContent=v}
if(done)lk.classList.add('on');
fetch(NS+'get/'+K).then(function(r){return r.json()}).then(function(j){show(j.value||0)}).catch(function(){});
var MSG={KO:'URL이 복사되었습니다.',JA:'URLをコピーしました。',ZH:'网址已复制。',EN:'URL copied.'};
function lang(){return document.documentElement.getAttribute('data-l')||'KO'}
function title(){var t=document.querySelector('[data-title-'+lang().toLowerCase()+']');return t?t.getAttribute('data-title-'+lang().toLowerCase()):document.title}
function url(){return location.origin+location.pathname+'?lang='+lang().toLowerCase()}
a.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b)return;var t=b.getAttribute('data-act'),u=encodeURIComponent(url()),ti=encodeURIComponent(title());
 if(t==='like'){e.preventDefault();if(done)return;done=true;lk.classList.add('on');try{localStorage.setItem('sen-like-'+id,'1')}catch(x){}
  n.textContent=(parseInt(n.textContent,10)||0)+1;fetch(NS+'hit/'+K).then(function(r){return r.json()}).then(function(j){show(j.value)}).catch(function(){});return}
 if(t==='share'){e.preventDefault();if(navigator.share){navigator.share({title:title(),url:url()}).catch(function(){})}else{t='copy'}}
 if(t==='copy'){e.preventDefault();var ok=function(){tst.textContent=MSG[lang()];setTimeout(function(){tst.textContent=''},2500)};
  if(navigator.clipboard)navigator.clipboard.writeText(url()).then(ok,function(){prompt('URL',url())});else prompt('URL',url());return}
 var W={fb:'https://www.facebook.com/sharer/sharer.php?u='+u,x:'https://twitter.com/intent/tweet?url='+u+'&text='+ti,line:'https://social-plugins.line.me/lineit/share?url='+u,weibo:'https://service.weibo.com/share/share.php?url='+u+'&title='+ti,band:'https://band.us/plugin/share?body='+ti+'%0A'+u+'&route='+u};
 if(W[t]){e.preventDefault();window.open(W[t],'_blank','noopener,width=600,height=560')}});
})();
