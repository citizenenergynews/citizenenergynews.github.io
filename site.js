
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
window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',id);gtag('config','G-FRN7DSNL76');})();  // 261112 사용자 계정 GA 추가(기존 CC8T는 다른 계정 것이라 유지)
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
  var ad=document.querySelector('.topbar .adlink');if(!ad||document.querySelector('.topbar a[href$="help/"]'))return;/* 261110 생성기 쪽은 정적 링크 — help 쪽만 */
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
  var M=[['help/',ml('고객센터 안내','カスタマーセンター','客服中心','Help Center'),''],['help/reporters/',ml('기자 소개','記者紹介','记者介绍','Our Reporters'),''],['ad/',ml('광고문의','広告のお問い合わせ','广告咨询','Advertising'),'on'],['help/partner/',ml('제휴문의','提携のお問い合わせ','合作咨询','Partnerships'),''],['help/tip/',ml('기사제보','情報提供','新闻爆料','News Tips'),''],['help/copyright/',ml('저작권문의','著作権のお問い合わせ','版权咨询','Copyright'),''],['help/rules/',ml('보도준칙','報道準則','报道准则','Reporting Guidelines'),''],['help/press-ethics/',ml('언론윤리강령','言論倫理綱領','新闻伦理纲领','Press Code of Ethics'),'sub'],['help/reporter-ethics/',ml('기자윤리강령','記者倫理綱領','记者伦理纲领',"Journalists' Code of Ethics"),'sub']];
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
/* 261110 기사 바이라인은 생성기가 정적으로 넣음(BYLINE_DEFAULT) */
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
  var w=document.querySelector('.foot .wrap');if(!w||w.querySelector('.legal'))return;/* 261110 생성기 쪽은 정적 — help 쪽만 */
  var d=document.createElement('div');d.className='legal';
  d.textContent='등록번호 부산,아00715 · 등록일 2026.11.09 · 발행인 김재호 · 편집인 김대오 · 청소년보호책임자 김대오 · 주소 부산광역시 사하구 하신중앙로 180 · 전화 1644-2358';
  var s=w.querySelector('strong');w.insertBefore(d,s?s.nextSibling:w.firstChild);
})();
/* 261029 인터넷신문 등록 전 기사 숨김 — 등록 나오면 HIDE=false 로 바꾸면 그대로 되돌아옴 */
(function(){
  var HIDE=false;/* 261102 대표 지시: 첫화면·기사 다시 공개 + 시험 운영 안내창(아래) */if(!HIDE)return;
  if(/\/(help|privacy|ad|sec)\//.test(location.pathname))return;
  var r=document.createElement('meta');r.name='robots';r.content='noindex';document.head.appendChild(r);
  /* 261102 대표 지시: 기사 링크(/a/…)로 직접 들어오면 기사는 보이게 — 첫화면·목록만 숨김 */
  if(/\/a\/[^\/]+/.test(location.pathname))return;
  var m=document.querySelector('main');if(!m)return;
  m.innerHTML='<div class="prep"><p>시민에너지신문은 인터넷신문 등록 준비 중입니다.<br>등록 후 기사를 다시 공개합니다.</p><p lang="en">Citizen Energy News is preparing its registration as an internet newspaper. Articles will be available again soon.</p></div>';
})();
/* 261102 대표 지시: 테스트 기간 — 첫화면 메인 기사 2개(큰기사+왼쪽 첫 기사)만 보이고 나머지 숨김. 기사 쪽도 그 2개만. 끝나면 ONLY2=false */
(function(){
  var ONLY2=false;/* 261112 등록증 나옴 *//* 261106 대표 지시: 숨긴 기사 전부 공개 → 같은 날 다시 가림 */if(!ONLY2)return;
  if(/\/(help|privacy|ad)\//.test(location.pathname))return;
  var css=document.createElement('style');
  css.textContent='.front .leadmore,.front .col-l .card~.card,.front .col-r,main .secs,main .hband,.cen-tk,.topbar .cen-srch{display:none!important}';
  document.head.appendChild(css);
  function keep(doc){var a=[],l=doc.querySelector('.front .lead h2 a'),c=doc.querySelector('.front .col-l .card h3 a');if(l)a.push(l.getAttribute('href'));if(c)a.push(c.getAttribute('href'));return a.map(function(h){return h.replace(/^\.?\/?/,'').replace(/\/?$/,'/')})}
  var root=location.origin+'/';
  var p=location.pathname.replace(/^\//,'');
  if(document.querySelector('.front'))return;
  var m=document.querySelector('main');if(!m)return;
  m.style.visibility='hidden';
  var msg='<div class="prep"><p>테스트 중입니다. 지금은 메인 기사만 공개합니다.</p><p><a href="'+root+'">첫화면으로</a></p></div>';
  if(!/^a\/[^\/]+/.test(p)){m.innerHTML=msg;m.style.visibility='';return}
  fetch(root+'index.html',{cache:'no-store'}).then(function(r){return r.text()}).then(function(t){
    var ok=keep(new DOMParser().parseFromString(t,'text/html'));
    var me=p.match(/^a\/[^\/]+\//);me=me?me[0]:p;
    if(ok.indexOf(me)<0)m.innerHTML=msg;
    m.style.visibility='';
  }).catch(function(){m.style.visibility=''});
})();
/* 261102 대표 지시: 시험 운영 안내창 — 등록 나오면 TEST=false */
(function(){
  var TEST=false;/* 261112 등록증 나옴 *//* 261106 대표 지시: 안내창 없앰 → 같은 날 다시 띄움 */if(!TEST)return;
  if(/\/(help|privacy|ad|sec)\//.test(location.pathname))return;
  /* 261102 대표 지시: 안내창 매번 띄움(닫아도 쪽 옮기면 다시) */
  var c=document.createElement('style');c.textContent='.cen-test{position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px}.cen-test div{background:#fff;color:#222;max-width:420px;border-radius:10px;padding:22px 20px;line-height:1.6;font-size:15px;box-shadow:0 8px 30px rgba(0,0,0,.25)}.cen-test b{display:block;font-size:18px;margin-bottom:8px}.cen-test small{display:block;color:#666;margin-top:8px}.cen-test button{margin-top:14px;width:100%;padding:10px;border:0;border-radius:6px;background:#1f6f43;color:#fff;font-size:15px;cursor:pointer}';
  document.head.appendChild(c);
  var o=document.createElement('div');o.className='cen-test';
  o.innerHTML='<div role="dialog" aria-modal="true"><b>테스트 중입니다</b>시민에너지신문은 인터넷신문 등록을 신청 중이며, 지금은 정식 창간 전 시험 운영 기간입니다. 기사 내용은 바뀔 수 있습니다.<small>試験運用中です · 试运行中 · Trial operation — registration pending</small><button type="button">확인</button></div>';
  function close(){o.remove()}
  o.querySelector('button').onclick=close;o.onclick=function(e){if(e.target===o)close()};
  document.body.appendChild(o);
})();
/* 261106 대표 지시: 기사 검색·최신 기사 줄·기사제보(누르면 바로 구글폼) (search.json = 생성기가 만듦, help/tip/ = 김재호 관리) */
(function(){
  var me=document.querySelector('script[src*="site.js"]');if(!me)return;
  var src=me.getAttribute('src'),base=src.replace(/site\.js.*$/,''),ver=(src.split('v=')[1]||'');
  function lg(){return (document.documentElement.getAttribute('data-l')||'KO').toLowerCase()}
  function ml(k,j,z,e){return '<span class="ml-ko">'+k+'</span><span class="ml-ja">'+j+'</span><span class="ml-zh">'+z+'</span><span class="ml-en">'+e+'</span>'}
  function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  var st=document.createElement('style');st.textContent=
   '.cen-tk{border-bottom:1px solid #e3e3e3;background:#fafafa;font-size:14px}.cen-tk .wrap{display:flex;align-items:center;gap:12px;height:38px;overflow:hidden}'+
   '.cen-tk b{flex:none;color:#fff;background:var(--accent,#1f6f43);padding:2px 10px;border-radius:3px;font-size:13px}'+
   '.cen-tk a{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#222}.cen-tk time{flex:none;color:#888;font-size:13px}'+
   '.cen-sq{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:flex;justify-content:center;align-items:flex-start;padding:60px 16px 16px}'+
   '.cen-sq>div{background:#fff;width:100%;max-width:640px;max-height:80vh;display:flex;flex-direction:column;border-radius:8px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.25)}'+
   '.cen-sq input{border:0;border-bottom:2px solid var(--accent,#1f6f43);padding:16px;font-size:17px;outline:0;width:100%;box-sizing:border-box}'+
   '.cen-sq ul{list-style:none;margin:0;padding:0;overflow:auto}.cen-sq li a{display:block;padding:12px 16px;border-bottom:1px solid #eee;color:#222}'+
   '.cen-sq li a:hover{background:#f4f8f5;text-decoration:none}.cen-sq li small{display:block;color:#888;font-size:13px;margin-top:2px}.cen-sq .none{padding:16px;color:#888}';
  document.head.appendChild(st);
  var DB=null,wait=[];
  function db(f){if(DB)return f(DB);wait.push(f);if(wait.length>1)return;
    fetch(base+'search.json?v='+ver).then(function(r){return r.json()}).then(function(j){DB=j;var w=wait;wait=[];w.forEach(function(g){g(DB)})}).catch(function(){wait=[]})}
  function T(p,f){var l=lg();return (p[f]&&(p[f][l]||p[f].ko))||''}
  /* 위 띠 링크: 검색 · 기사제보 */
  var ad=document.querySelector('.topbar .adlink');
  if(ad){
    var s=document.createElement('a');s.className='adlink cen-srch';s.href='#';s.innerHTML=ml('검색','検索','搜索','Search');ad.parentNode.insertBefore(s,ad);
    var t=document.createElement('a');t.className='adlink';t.href='https://docs.google.com/forms/d/e/1FAIpQLSfmD1UmAwErXru4BHybowZTTHaM6JYe-ZCpUG8xjVyhc6ycPQ/viewform';t.target='_blank';t.rel='noopener';t.innerHTML=ml('기사제보','情報提供','新闻爆料','News Tips');ad.parentNode.insertBefore(t,ad);
    s.addEventListener('click',function(e){e.preventDefault();open()});
  }
  var f=document.querySelector('.foot .wrap');
  if(f){f.appendChild(document.createTextNode(' · '));var b=document.createElement('a');b.href='https://docs.google.com/forms/d/e/1FAIpQLSfmD1UmAwErXru4BHybowZTTHaM6JYe-ZCpUG8xjVyhc6ycPQ/viewform';b.target='_blank';b.rel='noopener';b.innerHTML=ml('기사제보','情報提供','新闻爆料','News Tips');f.appendChild(b)}
  /* 검색 창 */
  var PH={ko:'기사 제목·부제로 찾기',ja:'記事のタイトルで検索',zh:'按标题搜索',en:'Search headlines'};
  var NO={ko:'찾는 기사가 없습니다.',ja:'該当する記事はありません。',zh:'没有找到相关文章。',en:'No matching articles.'};
  function open(){
    var o=document.createElement('div');o.className='cen-sq';
    o.innerHTML='<div role="dialog" aria-modal="true"><input type="search" placeholder="'+PH[lg()]+'"><ul></ul></div>';
    var i=o.querySelector('input'),u=o.querySelector('ul');
    function close(){o.remove();document.removeEventListener('keydown',k)}
    function k(e){if(e.key==='Escape')close()}
    o.addEventListener('click',function(e){if(e.target===o)close()});document.addEventListener('keydown',k);
    function run(){var q=i.value.trim().toLowerCase();if(!q){u.innerHTML='';return}
      db(function(d){var w=q.split(/\s+/),r=[];
        for(var n=0;n<d.length&&r.length<40;n++){var p=d[n],h=(T(p,'t')+' '+T(p,'u')).toLowerCase(),ok=true;
          for(var m=0;m<w.length;m++)if(h.indexOf(w[m])<0){ok=false;break}
          if(ok)r.push(p)}
        u.innerHTML=r.length?r.map(function(p){return '<li><a href="'+base+'a/'+p.i+'/"><b>'+esc(T(p,'t'))+'</b><small>'+esc(p.d.replace(/-/g,'.'))+' · '+esc(T(p,'u').slice(0,80))+'</small></a></li>'}).join(''):'<li class="none">'+NO[lg()]+'</li>'})}
    i.addEventListener('input',run);document.body.appendChild(o);i.focus();db(function(){});
  }
  /* 첫 화면: 메뉴 아래 최신 기사 줄 */
  var nav=document.querySelector('nav.nav');
  if(nav&&document.querySelector('main .front')){
    var bar=document.createElement('div');bar.className='cen-tk';
    bar.innerHTML='<div class="wrap"><b>'+ml('최신','最新','最新','Latest')+'</b><a href="#"></a><time></time></div>';
    nav.parentNode.insertBefore(bar,nav.nextSibling);
    var a=bar.querySelector('a'),tm=bar.querySelector('time'),idx=0,tmr=0;
    db(function(d){var L=d.slice(0,10);if(!L.length){bar.remove();return}
      function show(){var p=L[idx%L.length];a.href=base+'a/'+p.i+'/';a.textContent=T(p,'t');tm.textContent=p.d.replace(/-/g,'.');idx++}
      show();tmr=setInterval(show,4000);
      bar.addEventListener('mouseenter',function(){clearInterval(tmr)});bar.addEventListener('mouseleave',function(){clearInterval(tmr);tmr=setInterval(show,4000)});
      document.addEventListener('click',function(e){if(e.target.closest('#langs button')){idx=Math.max(0,idx-1);show()}})});
  }
  // 칸 목록 전체/국내/해외 버튼 (261112 사용자)
  document.addEventListener('click',function(e){var b=e.target.closest('.rgn button');if(!b)return;
    var box=b.closest('.list');box.setAttribute('data-show',b.getAttribute('data-r'));
    box.querySelectorAll('.rgn button').forEach(function(x){x.classList.toggle('on',x===b)})});
})();
