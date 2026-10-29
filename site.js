
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

/* 261029 첫화면: 왼쪽 큰기사 옆 빈칸에 사진 기사 하나 더 */
(function(){
  function fill(){
    var t=document.querySelector('.ml-ko .top3'); if(!t) return;
    var l=t.querySelector('.col-l'), c=t.querySelector('.col-c'); if(!l||!c||l.querySelector('.card.extra')) return;
    var lc=l.lastElementChild; if(!lc||c.lastElementChild.getBoundingClientRect().bottom-lc.getBoundingClientRect().bottom<80) return;
    var used={}; t.querySelectorAll('a[href]').forEach(function(a){used[a.getAttribute('href')]=1});
    var pick=null, kick='';
    document.querySelectorAll('.ml-ko .secs .sec').forEach(function(s){
      if(pick) return;
      s.querySelectorAll('h5 a, li a').forEach(function(a){
        var h=a.getAttribute('href'); if(!pick&&h&&h.indexOf('a/')===0&&!used[h]){pick=a;kick=(s.querySelector('h4').firstChild.textContent||'').trim();}
      });
    });
    if(!pick) return;
    var h=pick.getAttribute('href'), d=document.createElement('div'); d.className='card extra';
    d.innerHTML='<div class="ph"><img src="'+h+'photo.jpg" alt="" loading="lazy"></div><div class="kick"></div><h3><a></a></h3>';
    d.querySelector('img').onerror=function(){this.parentNode.remove()};
    d.querySelector('.kick').textContent=kick; var a=d.querySelector('h3 a'); a.href=h; a.textContent=pick.textContent;
    l.appendChild(d);
    var cb=c.lastElementChild.getBoundingClientRect().bottom, p=d.querySelector('.ph');
    if(p){var hh=p.offsetHeight+(cb-d.getBoundingClientRect().bottom)+parseFloat(getComputedStyle(d).paddingBottom); if(hh>=110){p.style.aspectRatio='auto';p.style.height=hh+'px'}else p.remove();}
    if(d.getBoundingClientRect().bottom>cb+20) d.remove();
  }
  if(document.readyState==='complete') fill(); else window.addEventListener('load',fill);
})();

/* 261029 고객센터: 위 띠·맨 아래에 링크 (HTML을 다시 만들어도 남도록 여기서 넣음) */
(function(){
  var ad=document.querySelector('.topbar .adlink');if(!ad)return;
  var base=ad.getAttribute('href').replace(/ad\/?$/,'');
  var T='<span class="ml-ko">고객센터</span><span class="ml-ja">カスタマーセンター</span><span class="ml-zh">客服中心</span><span class="ml-en">Help Center</span>';
  var a=document.createElement('a');a.className='adlink';a.href=base+'help/';a.innerHTML=T;ad.parentNode.insertBefore(a,ad.nextSibling);
  var f=document.querySelector('.foot .wrap');if(f){f.appendChild(document.createTextNode(' · '));var b=document.createElement('a');b.href=base+'help/';b.innerHTML=T;f.appendChild(b);}
})();

/* 261029 광고문의 화면에도 고객센터 왼쪽 메뉴 (ad/는 생성기가 다시 만들어서 여기서 넣음) */
(function(){
  var pg=document.querySelector('main .adpage');if(!pg||pg.classList.contains('helppage')||document.querySelector('.helpnav'))return;
  if(!/\/ad\/?(index\.html)?$/.test(location.pathname))return;
  function ml(k,j,z,e){return '<span class="ml-ko">'+k+'</span><span class="ml-ja">'+j+'</span><span class="ml-zh">'+z+'</span><span class="ml-en">'+e+'</span>'}
  var M=[['help/',ml('고객센터 안내','カスタマーセンター','客服中心','Help Center'),''],['help/reporters/',ml('기자 소개','記者紹介','记者介绍','Our Reporters'),''],['ad/',ml('광고문의','広告のお問い合わせ','广告咨询','Advertising'),'on'],['help/partner/',ml('제휴문의','提携のお問い合わせ','合作咨询','Partnerships'),''],['help/copyright/',ml('저작권문의','著作権のお問い合わせ','版权咨询','Copyright'),''],['help/rules/',ml('보도준칙','報道準則','报道准则','Reporting Guidelines'),''],['help/press-ethics/',ml('언론윤리강령','言論倫理綱領','新闻伦理纲领','Press Code of Ethics'),'sub'],['help/reporter-ethics/',ml('기자윤리강령','記者倫理綱領','记者伦理纲领',"Journalists' Code of Ethics"),'sub']];
  var h='<strong>'+ml('고객센터','カスタマーセンター','客服中心','Help Center')+'</strong><ul>';
  for(var i=0;i<M.length;i++)h+='<li'+(M[i][2]?' class="'+M[i][2]+'"':'')+'><a href="../'+M[i][0]+'">'+M[i][1]+'</a></li>';
  var nav=document.createElement('nav');nav.className='helpnav';nav.innerHTML=h+'</ul>';
  var w=document.createElement('div');w.className='helpwrap';pg.parentNode.insertBefore(w,pg);w.appendChild(nav);w.appendChild(pg);pg.classList.add('helppage');
})();
