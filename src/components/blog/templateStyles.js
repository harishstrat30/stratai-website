// Styles for the new blog post template. Prefix bt- keeps them away from every other page.
// Colours and fonts come from the site's CSS variables; dark areas use --bg-dark.
export const TEMPLATE_CSS = `
.bt{--bt-answer:var(--orange-light);color:var(--text)}
.bt-wrap{max-width:1280px;margin:0 auto;padding:0 24px}

/* hero: light, like the rest of the site (white page, charcoal text, orange accent) */
.bt-hero{background:var(--bg3);border-bottom:1px solid var(--border2);padding-top:36px;padding-bottom:44px}
.bt-crumbs{display:flex;flex-wrap:wrap;gap:6px;font-size:13px;color:var(--text2);margin:0 0 20px}
.bt-crumbs a{color:var(--text2);text-decoration:underline;text-underline-offset:2px}
.bt-crumbs a:hover{color:var(--orange)}
.bt-badge{display:inline-block;background:var(--orange-light);border:1px solid var(--orange-border);color:var(--orange);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:5px 14px;border-radius:99px;text-decoration:none;margin-bottom:20px}
.bt-h1{font-family:var(--font-display);font-size:clamp(30px,4.2vw,52px);line-height:1.1;letter-spacing:-.035em;font-weight:700;margin:0 0 20px;max-width:960px;color:var(--text);text-wrap:balance}
.bt-intro{font-size:clamp(16px,1.5vw,19px);line-height:1.65;color:var(--text2);max-width:860px;margin:0 0 26px;border-left:3px solid var(--orange);padding-left:18px}
.bt-by{display:flex;gap:14px;align-items:center;margin-bottom:32px}
.bt-by img,.bt-by .bt-ph{width:46px;height:46px;border-radius:50%;object-fit:cover;object-position:center 15%;flex:0 0 46px;background:var(--bg4);border:2px solid #fff;box-shadow:0 0 0 1px var(--border)}
.bt-by b{color:var(--text);font-size:14.5px}
.bt-by span{display:block;font-size:12.5px;color:var(--text2);line-height:1.5}
.bt-by a{color:var(--orange)}
.bt-heroimg{margin:0;display:block}
.bt-heroimg img{display:block;width:100%;height:auto;border-radius:16px;border:1px solid var(--border);background:#fff}

/* layout */
.bt-layout{display:grid;grid-template-columns:250px minmax(0,1fr);gap:56px;padding-top:48px;padding-bottom:72px;align-items:start}
.bt-aside{position:sticky;top:90px;max-height:calc(100vh - 110px);overflow:auto}
.bt-toc-h{font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text2);margin:0 0 12px}
.bt-toc ul{list-style:none;margin:0;padding:0;border-left:1px solid var(--border2)}
.bt-toc a{display:block;padding:6px 0 6px 12px;margin-left:-1px;border-left:2px solid transparent;font-size:13px;line-height:1.4;color:var(--text2);text-decoration:none}
.bt-toc a:hover{color:var(--text)}
.bt-toc a.on{color:var(--text);font-weight:600;border-left-color:var(--orange)}
.bt-sidecta{margin-top:22px;background:var(--bt-answer);border:1px solid var(--orange-border);border-radius:14px;padding:16px}
.bt-sidecta b{display:block;font-family:var(--font-display);font-size:15px;line-height:1.3;margin-bottom:6px}
.bt-sidecta p{font-size:12.5px;color:var(--text2);margin:0 0 12px;line-height:1.5}
.bt-btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 20px;border-radius:8px;font-weight:600;font-size:14.5px;text-decoration:none;text-align:center;border:1px solid transparent;transition:background .15s,transform .15s}
.bt-btn:hover{transform:translateY(-1px)}
.bt-btn-primary{background:var(--orange);color:#fff}
.bt-btn-primary:hover{background:var(--orange2)}
.bt-btn-light{background:#fff;color:var(--text)}
.bt-sidecta .bt-btn{width:100%}
.bt-main{max-width:780px;min-width:0}

/* key takeaways */
.bt-take{border:1px solid var(--border);border-radius:18px;padding:24px 26px;margin-bottom:8px;background:#fff}
.bt-take h2{font-family:var(--font-mono);font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin:0 0 16px}
.bt-take ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.bt-take li{display:flex;gap:14px;font-size:15.5px;line-height:1.6}
.bt-take li i{font-style:normal;font-family:var(--font-mono);font-weight:700;font-size:13px;color:var(--orange);padding-top:2px}

/* article body */
.bt-body h2{font-family:var(--font-display);font-size:clamp(23px,2.5vw,30px);line-height:1.2;letter-spacing:-.025em;font-weight:700;margin:52px 0 18px;color:var(--text)}
.bt-body h3{font-family:var(--font-display);font-size:19px;letter-spacing:-.015em;font-weight:700;margin:32px 0 12px}
.bt-body p{font-size:16.5px;line-height:1.75;margin:0 0 18px;color:#2a2927}
.bt-body p a,.bt-body li a{color:var(--orange);text-decoration:underline;text-underline-offset:2px}
.bt-body ul{margin:0 0 20px;padding-left:22px}
.bt-body li{font-size:16.5px;line-height:1.7;margin-bottom:8px;color:#2a2927}
.bt-answer{background:var(--bt-answer);border-radius:14px;padding:18px 22px;margin:0 0 22px;font-size:16px;line-height:1.7;font-weight:500;color:var(--text)}
.bt-body p.bt-strong{font-weight:700;color:var(--text)}

.bt-stat{display:grid;grid-template-columns:auto minmax(0,1fr);gap:22px;align-items:center;background:var(--bg2);border:1px solid var(--border);border-left:4px solid var(--orange);color:var(--text);border-radius:14px;padding:22px 28px;margin:6px 0 24px}
.bt-stat b{font-family:var(--font-display);font-size:clamp(34px,4.4vw,50px);line-height:1;letter-spacing:-.03em;color:var(--orange)}
.bt-stat p{margin:0 0 8px;color:var(--text);font-size:15px;line-height:1.55}
.bt-stat small{font-size:12px;color:var(--text2);display:block}

.bt-cards{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:6px 0 22px}
.bt-cards.c3{grid-template-columns:repeat(3,minmax(0,1fr))}
.bt-card{background:var(--bg2);border:1px solid transparent;border-radius:12px;padding:18px 20px}
.bt-card b{display:block;font-size:15px;margin-bottom:6px}
.bt-card p{margin:0;font-size:14px;line-height:1.6;color:var(--text2)}
.bt-card p strong{color:var(--text)}
.bt-card .bt-tag{display:block;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--orange);margin-bottom:8px}
.bt-card.hot{background:var(--orange-light);border-color:var(--orange)}
.bt-body p.bt-em{font-style:italic;color:var(--text2)}
.bt-body p.bt-note{font-size:12.5px;color:var(--text2);margin:-8px 0 20px}
.bt-roll.c4{grid-template-columns:repeat(4,minmax(0,1fr))}

.bt-tablewrap{overflow-x:auto;border:1px solid var(--border);border-radius:14px;margin:6px 0 26px}
.bt-table{width:100%;border-collapse:collapse;min-width:560px}
.bt-table th{background:var(--bg3);color:var(--text);text-align:left;font-size:13px;font-weight:700;padding:13px 16px;border-bottom:2px solid var(--orange)}
.bt-table td{padding:13px 16px;font-size:14px;line-height:1.5;color:var(--text2);border-top:1px solid var(--border);vertical-align:top}
.bt-table td:first-child{color:var(--text)}
.bt-table td strong{color:var(--text)}
.bt-table .bad{color:#9b1c1c;font-weight:700}
.bt-pill{display:inline-block;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:700;line-height:1.4}
.bt-pill.yes{background:#dcfce7;color:#166534}
.bt-pill.no{background:#fee2e2;color:#991b1b}
.bt-pill.weak{background:#fef3c7;color:#92400e}

.bt-callout{border:1.5px solid var(--orange);border-radius:14px;background:#FFFAF6;padding:20px 24px;margin:6px 0 24px}
.bt-callout b{display:block;font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin-bottom:8px}
.bt-callout p{margin:0 0 10px;font-size:16px;font-weight:500;color:var(--text)}
.bt-callout small{font-size:12px;color:var(--text2)}
.bt-stat small a,.bt-callout small a{color:var(--orange);font-weight:600;text-decoration:underline;text-underline-offset:2px}
.bt-closing{margin-top:44px}

.bt-loop{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;background:var(--bg2);border-radius:16px;padding:14px;margin:6px 0 24px}
.bt-step{background:#fff;border:1px solid var(--border);border-radius:12px;padding:16px}
.bt-step i{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--bg-dark);color:#fff;font-style:normal;font-size:12px;font-weight:700;margin-bottom:12px}
.bt-step.last i{background:var(--orange)}
.bt-step b{display:block;font-family:var(--font-display);font-size:15.5px;margin-bottom:6px}
.bt-step p{margin:0;font-size:13px;line-height:1.55;color:var(--text2)}

.bt-fig{margin:6px 0 26px}
.bt-fig img{display:block;width:100%;height:auto;border-radius:14px;border:1px solid var(--border)}
.bt-fig figcaption{font-size:13px;color:var(--text2);margin-top:10px}

.bt-tiers{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:6px 0 24px}
.bt-tier{border:1px solid var(--border);border-radius:14px;padding:18px;background:#fff}
.bt-tier.hot{border:1.5px solid var(--orange);background:#FFFAF6}
.bt-tier span{display:block;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text2);margin-bottom:8px}
.bt-tier.hot span{color:var(--orange)}
.bt-tier b{display:block;font-family:var(--font-display);font-size:17px;margin-bottom:8px}
.bt-tier p{margin:0;font-size:13.5px;line-height:1.6;color:var(--text2)}

.bt-roll{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:6px 0 26px}
.bt-rstep{background:var(--bg2);border-top:3px solid var(--bg-dark);border-radius:4px 4px 12px 12px;padding:16px 18px}
.bt-rstep:first-child{border-top-color:var(--orange)}
.bt-rstep.wide{grid-column:1/-1}
.bt-rstep span{display:block;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--orange);margin-bottom:8px}
.bt-rstep b{display:block;font-family:var(--font-display);font-size:16px;margin-bottom:6px}
.bt-rstep p{margin:0;font-size:13.5px;line-height:1.6;color:var(--text2)}

.bt-cta{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:26px;align-items:center;background:var(--orange);color:#fff;border-radius:16px;padding:26px 28px;margin:10px 0 8px}
.bt-cta h3{font-family:var(--font-display);font-size:22px;line-height:1.25;letter-spacing:-.02em;color:#fff;margin:0 0 8px}
.bt-body .bt-cta p{margin:0;color:rgba(255,255,255,.94);font-size:14px;line-height:1.6}
.bt-cta .bt-btns{display:flex;flex-direction:column;gap:10px}
.bt-cta .bt-btn{width:100%}
.bt-cta .bt-btn-primary{background:var(--bg-dark);color:#fff}
.bt-cta .bt-btn-primary:hover{background:#2b2a29}

.bt-horizon{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-radius:12px;overflow:hidden;margin:4px 0 22px}
.bt-horizon div{padding:14px 18px;font-size:13px;line-height:1.45}
.bt-horizon b{display:block;font-size:13px;margin-bottom:2px}
.bt-horizon div:nth-child(1){background:#e8e7e4;color:var(--text)}
.bt-horizon div:nth-child(2){background:#FFD2BA;color:var(--text)}
.bt-horizon div:nth-child(3){background:var(--orange);color:#fff}

/* FAQ + author */
.bt-faq{margin-top:52px}
.bt-faq h2{margin-top:0}
.bt-faq article{border-top:1px solid var(--border);padding:22px 0 8px}
.bt-faq article:last-child{border-bottom:1px solid var(--border);margin-bottom:0}
.bt-faq h3{font-family:var(--font-body);font-size:16.5px;font-weight:700;letter-spacing:0;margin:0 0 10px}
.bt-faq p{font-size:15.5px;line-height:1.7;color:var(--text2)}
.bt-author{display:grid;grid-template-columns:72px minmax(0,1fr);gap:20px;background:var(--bg2);border-radius:18px;padding:26px;margin-top:40px}
.bt-author img{width:72px;height:72px;border-radius:50%;object-fit:cover;object-position:center 15%}
.bt-author small{display:block;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin-bottom:6px}
.bt-author h3{font-family:var(--font-display);font-size:21px;letter-spacing:-.02em;margin:0 0 4px}
.bt-author .bt-cred{font-size:13px;color:var(--text2);margin:0 0 10px}
.bt-author .bt-cred a{color:var(--orange)}
.bt-author p.bt-bio{font-size:14.5px;line-height:1.7;color:var(--text2);margin:0}

/* posts rendered from the CMS HTML (database posts): the classes the editor already uses get the same look as the blocks above */
.bt-hero-flat{padding-bottom:44px}
.bt-ph{display:block;width:46px;height:46px;border-radius:50%;background:#2c2c2a}
.bt-author .bt-ph{width:72px;height:72px;background:#d4d3cf}
.bt-overview b{display:block;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin-bottom:8px}
.bt-soon{color:var(--text2);font-family:var(--font-mono);font-size:13px}
.bt-html > :first-child{margin-top:0}
.bt-html h4{font-family:var(--font-display);font-size:16.5px;font-weight:700;margin:24px 0 10px}
.bt-html ol{margin:0 0 20px;padding-left:22px}
.bt-html ol li{font-size:16.5px;line-height:1.7;margin-bottom:8px;color:#2a2927}
.bt-html blockquote{margin:26px 0;padding:6px 0 6px 20px;border-left:3px solid var(--orange);color:var(--text2);font-style:italic}
.bt-html blockquote p{margin:0 0 10px;color:var(--text2)}
.bt-html hr{border:0;border-top:1px solid var(--border);margin:36px 0}
.bt-html img{display:block;max-width:100%;height:auto;border-radius:12px;margin:20px 0}
.bt-html .standfirst,.bt-html .lead{font-size:19px;line-height:1.65;font-weight:500;color:var(--text)}
.bt-html .direct-answer{background:var(--bt-answer);border-radius:14px;padding:18px 22px;margin:0 0 24px}
.bt-html .direct-answer h2{font-size:18px;line-height:1.3;letter-spacing:-.01em;margin:0 0 10px}
.bt-html .direct-answer p{font-weight:500;color:var(--text);margin:0 0 10px}
.bt-html .direct-answer > :last-child{margin-bottom:0}
.bt-html .stat-callout{background:var(--bg2);border:1px solid var(--border);border-left:4px solid var(--orange);border-radius:14px;padding:22px 28px;margin:8px 0 26px}
.bt-html .stat-callout:has(.stat-figure){display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:24px;align-items:center}
.bt-html .stat-callout p{color:var(--text);margin:0 0 8px;font-size:15px;line-height:1.55}
.bt-html .stat-callout .stat-figure{grid-row:1 / span 2;margin:0;font-family:var(--font-display);font-size:clamp(34px,4.4vw,48px);line-height:1;letter-spacing:-.03em;font-weight:700;color:var(--orange)}
.bt-html .stat-callout .stat-source{color:var(--text2);font-size:12.5px;margin:0}
.bt-html .stat-callout a{color:var(--orange)}
.bt-html aside.stat{border:1.5px solid var(--orange);border-radius:14px;background:#FFFAF6;padding:20px 24px;margin:8px 0 24px}
.bt-html aside.stat p{margin:0 0 10px;font-weight:500;color:var(--text)}
.bt-html aside.stat p:last-child{margin:0;font-size:12.5px;font-weight:400;color:var(--text2)}
.bt-html .faq-item{border-top:1px solid var(--border);padding:20px 0 6px}
.bt-html .faq-item h3{font-family:var(--font-body);font-size:16.5px;font-weight:700;letter-spacing:0;margin:0 0 10px}
.bt-html .faq-item p{color:var(--text2)}
.bt-html .usecase-block{border-left:3px solid var(--orange);background:var(--bg2);border-radius:0 14px 14px 0;padding:20px 24px;margin:36px 0}
.bt-html .usecase-block h2{margin:0 0 14px;font-size:22px}
.bt-html section.step,.bt-html section.criterion{background:var(--bg2);border-radius:12px;padding:18px 22px;margin:0 0 14px}
.bt-html section.step h3,.bt-html section.criterion h3{margin:0 0 10px;font-size:17px}
.bt-html section.step > :last-child,.bt-html section.criterion > :last-child{margin-bottom:0}
.bt-html .cta-block{background:var(--orange);border-radius:16px;padding:26px 30px;margin:32px 0}
.bt-html .cta-block p{color:rgba(255,255,255,.94);margin:0 0 10px;font-size:15px}
.bt-html .cta-block p:first-child{color:#fff;font-family:var(--font-display);font-size:20px;line-height:1.3}
.bt-html .cta-block p:first-child strong{color:#fff}
.bt-html .cta-block a{display:inline-block;background:var(--bg-dark);color:#fff;text-decoration:none;font-weight:600;padding:11px 18px;border-radius:8px;margin:2px 0 6px}
.bt-html .about-stratai{background:var(--bg2);border-radius:14px;padding:20px 24px;margin:36px 0 0}
.bt-html .about-stratai h2{font-size:18px;margin:0 0 10px}
.bt-html .about-stratai p{font-size:14.5px;color:var(--text2)}
.bt-html .field-data{border:1px solid var(--border);border-left:3px solid var(--orange);border-radius:0 12px 12px 0;padding:14px 18px;margin:18px 0;background:#FFFAF6}
.bt-html .field-data p{margin:0 0 8px;font-size:15px}
.bt-html .field-data .field-label{font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--orange)}
.bt-table tbody th{background:var(--bg2);color:var(--text);font-weight:700}
.bt-table th,.bt-table td{border-top:1px solid var(--border)}
.bt-table thead th{border-top:0}
.bt-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-top:36px}
.bt-gallery figure{margin:0}
.bt-gallery img{display:block;width:100%;height:auto;border-radius:12px;border:1px solid var(--border)}
.bt-gallery figcaption{font-size:12.5px;color:var(--text2);margin-top:6px}

.bt-about{border:1px solid var(--border);border-radius:14px;background:#fff;padding:18px 22px;margin-top:16px}
.bt-about small{display:block;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin-bottom:8px}
.bt-about p{margin:0 0 8px;font-size:14.5px;line-height:1.65;color:var(--text2)}
.bt-about p:last-child{margin:0;font-size:13.5px}
.bt-about a{color:var(--orange);text-decoration:underline;text-underline-offset:2px}

/* keep reading */
.bt-more{background:var(--bg2);padding:64px 0}
.bt-more-head{display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-bottom:24px}
.bt-more-head h2{font-family:var(--font-display);font-size:28px;letter-spacing:-.025em;margin:0}
.bt-more-head a{color:var(--orange);font-weight:600;font-size:14px}
.bt-more-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.bt-more-card{display:flex;flex-direction:column;background:var(--orange-light);border:1px solid var(--orange-border);border-radius:14px;padding:20px 22px;text-decoration:none;color:inherit;transition:border-color .15s,background .15s,transform .15s}
.bt-more-card:hover{border-color:var(--orange);background:rgba(255,85,0,.12);transform:translateY(-2px)}
.bt-more-card span{font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--orange);margin-bottom:10px}
.bt-more-card b{font-family:var(--font-display);font-size:18px;line-height:1.3;letter-spacing:-.02em;margin-bottom:12px}
.bt-more-card i{font-style:normal;margin-top:auto;font-size:13.5px;font-weight:700;color:var(--orange)}

@media (max-width:1000px){
  .bt-layout{grid-template-columns:1fr;gap:0}
  .bt-aside{display:none}
  .bt-loop,.bt-tiers,.bt-roll,.bt-roll.c4,.bt-more-grid,.bt-cards.c3{grid-template-columns:1fr 1fr}
  .bt-rstep.wide{grid-column:1/-1}
}
@media (max-width:640px){
  .bt-wrap{padding:0 18px}
  .bt-cards,.bt-cards.c3,.bt-loop,.bt-tiers,.bt-roll,.bt-roll.c4,.bt-more-grid,.bt-horizon{grid-template-columns:1fr}
  .bt-stat{grid-template-columns:1fr;gap:10px;padding:20px}
  .bt-cta{grid-template-columns:1fr;padding:22px}
  .bt-author{grid-template-columns:1fr}
  .bt-take{padding:20px}
  .bt-heroimg img{border-radius:12px 12px 0 0}
}
`
