
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
  var T={'ml-ko':'광고문의','ml-ja':'広告のお問い合わせ','ml-zh':'广告咨询','ml-en':'Advertising'};
  for(var c in T){var t=pg.querySelector('.'+c+' h1.story-title');if(t)t.textContent=T[c]}
  document.title=document.title.replace(/광고·제휴 문의/,'광고문의');
  var nav=document.createElement('nav');nav.className='helpnav';nav.innerHTML=h+'</ul>';
  var w=document.createElement('div');w.className='helpwrap';pg.parentNode.insertBefore(w,pg);w.appendChild(nav);w.appendChild(pg);pg.classList.add('helppage');
})();
/* 261029 광고 링크 이름 = 광고문의 (생성기 글자는 광고·제휴 문의) */
(function(){
  var T={'ml-ko':'광고문의','ml-ja':'広告のお問い合わせ','ml-zh':'广告咨询','ml-en':'Advertising'};
  var a=document.querySelectorAll('a[href$="ad/"]');
  for(var i=0;i<a.length;i++)for(var c in T){var s=a[i].querySelector('.'+c);if(s)s.textContent=T[c]}
})();
/* 261029 기사 바이라인 = AI 기자 김기자 (생성기 글자는 시민에너지신문) → 기자 소개로 연결 */
(function(){
  var ad=document.querySelector('.topbar .adlink');if(!ad)return;
  var base=ad.getAttribute('href').replace(/ad\/?$/,'');
  var T={'ml-ko':'AI 기자 김기자','ml-ja':'AI記者 キム記者','ml-zh':'AI记者 金记者','ml-en':'AI Reporter Kim'};
  for(var c in T){var m=document.querySelectorAll('.story .'+c+' .story-meta > span:first-child');
    for(var i=0;i<m.length;i++){if(m[i].classList.contains('acts'))continue;m[i].innerHTML='<a class="byline" href="'+base+'help/reporters/"></a>';m[i].firstChild.textContent=T[c];}}
})();
/* 261029 문체 담당 기자: help/reporters/mentors.json에서 그림 (withdrawn 날부터 빠짐) */
(function(){
  var box=document.querySelectorAll('[data-mentors]');if(!box.length)return;
  var today=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
  var E={'ml-ko':['문체 담당 기자','준비 중입니다.'],'ml-ja':['文体担当記者','準備中です。'],'ml-zh':['文风指导记者','准备中。'],'ml-en':['Style mentor','Coming soon.']};
  fetch('mentors.json',{cache:'no-store'}).then(function(r){return r.json()}).then(function(d){
    var on=(d.mentors||[]).filter(function(m){return m.posted&&m.posted<=today&&!(m.withdrawn&&m.withdrawn<=today)});
    for(var i=0;i<box.length;i++){
      var lg=box[i].closest('[class^="ml-"]').className.split(' ')[0],e=E[lg]||E['ml-ko'];
      if(!on.length){box[i].outerHTML='<p>'+e[1]+'</p>';continue}
      on.forEach(function(m){
        var c=document.createElement('div');c.className='rcard';
        c.innerHTML='<div class="rph"></div><em></em><b></b><ul class="rcv"></ul>';
        if(m.photo){var im=document.createElement('img');im.src='img/'+m.photo;im.alt='';c.firstChild.appendChild(im)}
        c.querySelector('em').textContent=e[0];c.querySelector('b').textContent=m.name;
        (m.cv||[]).forEach(function(x){var li=document.createElement('li');li.textContent=x;c.querySelector('ul').appendChild(li)});
        box[i].appendChild(c);
      });
    }
  });
})();
/* 261029 사진 + 제목 = 한 기사: 사진을 눌러도 그 기사로 (생성기 HTML은 사진에 링크가 없어서 여기서 연결) */
(function(){
  function link(img){
    if(img.closest('a,.story,.helppage'))return null;
    for(var p=img.parentNode,i=0;p&&i<3;p=p.parentNode,i++){var a=p.querySelector('h2 a[href],h3 a[href],h4 a[href]');if(a)return a}
    return null;
  }
  var css=document.createElement('style');css.textContent='main .ph img{cursor:pointer}';document.head.appendChild(css);
  document.addEventListener('click',function(e){
    if(e.target.tagName!=='IMG')return;var a=link(e.target);if(!a)return;
    if(e.ctrlKey||e.metaKey||e.button===1)window.open(a.href);else location.href=a.href;
  });
})();
/* 261029 법정 표기(신문법): 발행인·편집인·청소년보호책임자·주소 — 등록번호·등록일·전화는 등록 후 추가 */
(function(){
  var w=document.querySelector('.foot .wrap');if(!w)return;
  var d=document.createElement('div');d.className='legal';
  d.textContent='발행인 김재호 · 편집인 김대오 · 청소년보호책임자 김대오 · 주소 부산광역시 사하구 하신중앙로 180, 103동 1302호';
  var s=w.querySelector('strong');w.insertBefore(d,s?s.nextSibling:w.firstChild);
})();
/* 261029 인터넷신문 등록 전 기사 숨김 — 등록 나오면 HIDE=false 로 바꾸면 그대로 되돌아옴 */
(function(){
  var HIDE=true;if(!HIDE)return;
  if(/\/(help|privacy|ad|sec)\//.test(location.pathname))return;
  var m=document.querySelector('main');if(!m)return;
  var r=document.createElement('meta');r.name='robots';r.content='noindex';document.head.appendChild(r);
  m.innerHTML='<div class="prep"><p>시민에너지신문은 인터넷신문 등록 준비 중입니다.<br>등록 후 기사를 다시 공개합니다.</p><p lang="en">Citizen Energy News is preparing its registration as an internet newspaper. Articles will be available again soon.</p></div>';
})();
