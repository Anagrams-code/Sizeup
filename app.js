const app=document.getElementById('app');
const products=window.SIZEUP_PRODUCTS||[];
const safeMercari=s=>{try{const u=new URL(s);return u.protocol==='https:'&&u.hostname==='jp.mercari.com'&&/^\/item\/m[0-9]+\/?$/.test(u.pathname)?u.href:null}catch{return null}};const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const yen=n=>'¥'+Number(n||0).toLocaleString('ja-JP');
const photo=(p,cls='product-photo')=>`<div class="${cls}">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.brand)} ${esc(p.name)}">`:'<span>PHOTO COMING SOON</span>'}${p.sold?'<span class="sold">SOLD OUT</span>':''}</div>`;
const card=p=>`<a class="product" href="${p.url?esc(p.url):'#/item/'+encodeURIComponent(p.id)}">${photo(p)}<p class="product-name">${esc(p.brand)} / ${esc(p.name)}</p><p class="product-meta">${yen(p.price)} · ${esc(p.category||'SELECTED VINTAGE')}</p></a>`;
function home(){app.innerHTML=`<section class="hero"><div class="hero-copy"><p class="eyebrow">CURATED VINTAGE & USED CLOTHING</p><h1><span>SIZE UP.</span><span>NEVER</span><span>DRESS DOWN.</span></h1><p class="jp">サイズに妥協しない。<br>スタイルにも妥協しない。</p><p class="hero-sub">SIZE IS NOT A LIMIT.<br>大きなサイズを、妥協ではなく選択肢に。</p><div class="actions"><a class="outline-button" href="#/items">VIEW ITEMS <span>↗</span></a><a class="textlink" href="#/story">OUR STORY ↗</a></div></div><div class="hero-image" role="img" aria-label="コンクリートとスチールラックを背景にしたSIZE UP.のビジュアル"></div></section>
<section class="content home-section"><div class="section-head"><h2>SELECTED ITEMS</h2><a class="textlink" href="#/items">ALL ITEMS ↗</a></div>${products.length?`<div class="grid">${products.slice(0,4).map(card).join('')}</div>`:'<div class="notice">選定した古着を順次公開します。商品は準備中です。</div>'}</section>
<section class="statement-section"><div class="statement-inner"><p class="eyebrow">OUR PHILOSOPHY</p><h2>SIZE IS<br>NOT A LIMIT.</h2><p>着たい服を、サイズで諦めない。<br>大きさだけでなく、シルエット、素材、佇まいまで。<br>自分のスタイルを選ぶ自由を。</p><a class="outline-button light" href="#/story">READ OUR STORY <span>↗</span></a></div></section>
<section class="content split-section"><div><p class="eyebrow">OUR ROOTS</p><h2>ROOTED IN HIPHOP.<br>OPEN TO EVERY STYLE.</h2></div><div><p>受け継いだ服を自分のスタイルに変える。限られた選択肢の中でも、誇りを持って装う。HIPHOPから受け取った姿勢を、ミリタリー、ワーク、トラッドなど、ジャンルを問わない古着の選定へ。</p><a class="textlink" href="#/story">OUR STORY ↗</a></div></section>
<section class="content standard-teaser"><div class="section-head"><h2>OUR STANDARD</h2><a class="textlink" href="#/standard">READ THE STANDARD ↗</a></div><div class="standard-grid"><div><span>TOPS</span><strong>60<span>cm+</span></strong><p>身幅を実寸で確認</p></div><div><span>BOTTOMS</span><strong>95<span>cm+</span></strong><p>ウエストを実寸で確認</p></div><div><span>BEYOND SIZE</span><strong>FIT.</strong><p>シルエット・素材・状態も選定基準</p></div></div></section>
<section class="social-strip"><div><p class="eyebrow">FOLLOW THE SELECTION</p><h2>STAY FRESH.</h2><p>着こなし、選定理由、服のディテールをInstagramで。</p></div><a class="outline-button" href="https://www.instagram.com/sizeup20270101/" target="_blank" rel="noopener noreferrer">INSTAGRAM <span>↗</span></a></section>`}
function items(){app.innerHTML=`<section class="content"><div class="section-head"><h1>ITEMS</h1><p>SELECTED VINTAGE & USED / ${products.length} ITEMS</p></div>${products.length?`<div class="grid">${products.map(card).join('')}</div>`:'<div class="notice">現在、商品を準備しています。<br>販売開始後、こちらに掲載します。</div>'}</section>`}
function detail(id){const p=products.find(p=>p.id===id);if(!p){items();return}app.innerHTML=`<section class="content"><a class="back" href="#/items">← ALL ITEMS</a><div class="detail"><div><div class="detail-photo">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}" style="width:100%;height:100%;object-fit:cover" tabindex="0" role="button" aria-label="写真を拡大">`:'PHOTO COMING SOON'}</div>${(p.images||[]).length>1?`<div class="gallery">${p.images.slice(1).map((src,i)=>`<figure><img src="${esc(src)}" alt="${esc(p.brand)} ${esc(p.name)}：${esc(p.imageLabels?.[i+1]||'追加写真')}" loading="lazy" tabindex="0" role="button" aria-label="写真${i+2}を拡大"></figure>`).join('')}</div>`:''}</div><div><p class="eyebrow">${esc(p.category||'SELECTED VINTAGE')}</p><h1>${esc(p.brand)}<br>${esc(p.name)}</h1><p class="price">¥${Number(p.price).toLocaleString('ja-JP')}</p><p>${esc(p.description||'')}</p>${p.stylingNotice?`<p class="styling-notice">${esc(p.stylingNotice)}</p>`:''}${p.selectionReason?`<div class="selection-note"><h2>WHY WE SELECTED IT</h2><p>${esc(p.selectionReason)}</p></div>`:''}<div class="spec">${[['MODEL',p.model],['MATERIAL',p.material],['MADE IN',p.origin],['COLOR',p.color]].filter(x=>x[1]).map(x=>`<div><b>${x[0]}</b><span>${esc(x[1])}</span></div>`).join('')}<div><b>TAG SIZE</b><span>${esc(p.tagSize||'未記載')}</span></div><div><b>ACTUAL SIZE</b><span>${esc(p.size||'計測中')}</span></div><div><b>CONDITION</b><span>${esc(p.condition||'確認中')}</span></div><div><b>STATUS</b><span>${p.sold?'SOLD OUT':safeMercari(p.mercari)?'AVAILABLE':'販売準備中'}</span></div></div>${p.care?`<details><summary>お手入れについて</summary><p>${esc(p.care)}</p></details>`:''}${p.photoNotice?`<p class="muted">${esc(p.photoNotice)}</p>`:''}${safeMercari(p.mercari)&&!p.sold?`<a class="buy" href="${esc(safeMercari(p.mercari))}" target="_blank" rel="noopener noreferrer">BUY ON MERCARI ↗</a>`:'<span class="buy disabled">'+(p.sold?'SOLD OUT':'販売準備中')+'</span>'}</div></div></section>`}function story(){app.innerHTML=`<section class="content editorial"><p class="eyebrow">THE STORY BEHIND SIZE UP.</p><h1>OUR STORY<span class="period">.</span></h1><div class="story-lead"><h2>NEVER<br>DRESS DOWN.</h2><p>欲しい服がある。けれど、サイズが合わない。<br>着たいスタイルがある。けれど、選べる服がない。<br><br>SIZE UP.は、そんな経験から生まれた。</p></div><div class="prose story-body"><p>私たちの原点には、HIPHOPカルチャーがある。</p><p>受け継いだ服を、自分のスタイルに変える。限られた選択肢の中でも、自分らしさを表現する。そして、誇りを持って装う。</p><p>私たちがそこから受け取った精神は、特定の服装やジャンルだけに宿るものではない。</p><p>ミリタリーでも、ワークでも、トラッドでも。</p><p>サイズ、シルエット、素材、経年変化。一着ずつに向き合い、今のスタイルにふさわしい服を選ぶ。</p><p><strong>STAY FRESH.</strong><br>古着であっても、装いに誇りを持つ。</p><p><strong>DEFINE YOUR OWN STYLE.</strong><br>誰かの基準ではなく、自分のスタイルを選ぶ。</p><p>大きなサイズを、妥協ではなく選択肢に。</p><h2>SIZE IS NOT A LIMIT.</h2><a class="outline-button" href="#/items">VIEW ITEMS <span>↗</span></a></div></section>`}
function standard(){app.innerHTML=`<section class="content editorial"><p class="eyebrow">THE REASON WE SELECT</p><h1>OUR STANDARD<span class="period">.</span></h1><div class="prose"><h2>大きければ、何でもいいわけじゃない。</h2><p>SIZE UP.は、タグのサイズ表記よりも実寸を優先します。</p><div class="standard-grid standard-pair"><div><span>TOPS / CHEST WIDTH</span><strong>60<span>cm+</span></strong><p>トップスの身幅</p></div><div><span>BOTTOMS / WAIST</span><strong>95<span>cm+</span></strong><p>ボトムスのウエスト</p></div></div><h2>BEYOND THE NUMBERS.</h2><p>数字を満たしていても、必ず仕入れるわけではありません。シルエット、素材、コンディション、経年変化、スタイリングの可能性を一着ずつ確認します。</p><p>商品ページでは実寸・状態・選定理由を明示し、購入判断に必要な情報を提供します。</p><a class="outline-button" href="#/items">VIEW ITEMS <span>↗</span></a></div></section>`}
function guide(){app.innerHTML=`<section class="content editorial"><p class="eyebrow">HOW TO SHOP</p><h1>GUIDE<span class="period">.</span></h1><div class="prose"><h2>SIZE GUIDE</h2><p>タグのサイズ表記ではなく、各商品ページに記載した実寸をご確認ください。古着は製造年代や洗濯によって個体差があります。</p><h2>CONDITION</h2><p>状態・使用感・特筆すべきダメージは商品情報と写真でご案内します。気になる点は購入前にご確認ください。</p><h2>HOW TO BUY</h2><p>商品詳細の「BUY ON MERCARI」からメルカリの出品ページへ移動します。送料・決済・返品等の条件は、各メルカリ出品ページをご確認ください。</p><h2>CONTACT</h2><p>商品に関するお問い合わせは、<a class="underlink" href="https://www.instagram.com/sizeup20270101/" target="_blank" rel="noopener noreferrer">公式Instagram</a>をご参照ください。</p></div></section>`}
function route(){let path;try{path=decodeURIComponent(location.hash.slice(1)||(document.body.dataset.productId?'/item/'+document.body.dataset.productId:'/'))}catch{path='/items'};const aliases={home:'/',shop:'/items',about:'/about',editorial:'/editorial',product:'/items'};path=aliases[path]||path;if(path==='/items')items();else if(path.startsWith('/item/'))detail(path.slice(6));else if(path==='/story'||path==='/about')story();else if(path==='/standard')standard();else if(path==='/guide')guide();else if(path==='/editorial')editorial();else home();window.scrollTo(0,0)}window.addEventListener('hashchange',route);route();

function editorial(){app.innerHTML="<section class=\"content\"><div class=\"section-head\"><h1>EDITORIAL</h1><p>NOTES ON STYLE</p></div><div class=\"prose\"><img class=\"editorial-image\" src=\"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85\" alt=\"スタイリング参考写真\"><div class=\"eyebrow\" style=\"margin-top:20px\">ISSUE 001 / STYLE NOTES</div><h2>SIZE IS A NUMBER.<br>FIT IS A CHOICE.</h2><p>サイズ表記にとらわれず、肩の落ち方、身幅、丈、素材の落ち感で選ぶ。ゆとりのある服には、ゆとりのある服ならではの美しさがある。</p><p>このページはパイロット用の仮記事です。今後、実際の仕入れ商品とスタイリング写真に置き換えます。</p></div></section>"}

// 商品写真をクリックまたはタップすると拡大。左右キー・Escapeにも対応。
let lightboxIndex=0,lightboxImages=[],lightboxFocus=null;
function showLightbox(index){
  lightboxIndex=(index+lightboxImages.length)%lightboxImages.length;
  const box=document.querySelector('.lightbox');
  box.querySelector('img').src=lightboxImages[lightboxIndex];
  box.querySelector('.lightbox-count').textContent=`${lightboxIndex+1} / ${lightboxImages.length}`;
}
function closeLightbox(){document.querySelector('.lightbox')?.remove();document.body.classList.remove('lightbox-open');lightboxFocus?.focus()}
app.addEventListener('click',e=>{
  const photo=e.target.closest('.detail-photo img,.gallery img');
  if(!photo)return;
  const p=products.find(p=>(location.hash.endsWith('/'+p.id)||(!location.hash&&document.body.dataset.productId===p.id)));
  if(!p)return;
  lightboxImages=p.images?.length?p.images:[p.image];
  lightboxFocus=photo;
  const index=lightboxImages.findIndex(src=>photo.getAttribute('src')===src);
  document.body.insertAdjacentHTML('beforeend','<div class="lightbox" role="dialog" aria-modal="true" aria-label="商品写真の拡大表示"><button type="button" class="lightbox-close" aria-label="閉じる">×</button><button type="button" class="lightbox-prev" aria-label="前の写真">‹</button><img alt="拡大した商品写真"><button type="button" class="lightbox-next" aria-label="次の写真">›</button><span class="lightbox-count"></span></div>');
  document.body.classList.add('lightbox-open');
  showLightbox(Math.max(0,index));
  document.querySelector('.lightbox-close').focus();
});
document.addEventListener('click',e=>{
  if(e.target.matches('.lightbox-close')||e.target.matches('.lightbox'))closeLightbox();
  if(e.target.matches('.lightbox-prev'))showLightbox(lightboxIndex-1);
  if(e.target.matches('.lightbox-next'))showLightbox(lightboxIndex+1);
});
document.addEventListener('keydown',e=>{
  if(!document.querySelector('.lightbox'))return;
  if(e.key==='Escape')closeLightbox();
  if(e.key==='ArrowLeft')showLightbox(lightboxIndex-1);
  if(e.key==='ArrowRight')showLightbox(lightboxIndex+1);
});

document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches(".detail-photo img,.gallery img")){e.preventDefault();e.target.click()}});
