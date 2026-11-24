// Styles for the home page. Everything is prefixed hm- so nothing leaks into other pages.
// Colours/fonts come from the site's CSS variables in globals.css; dark sections use --bg-dark.
export const HOME_CSS = `
.hm{--hm-peach:#FF9A66;--hm-card-dark:#1A1A19;--hm-line-dark:rgba(255,255,255,.1)}
.hm-wrap{max-width:1280px;margin:0 auto;padding:0 24px}
.hm-sec{padding-top:96px;padding-bottom:96px}
.hm-sec-tight{padding-top:72px;padding-bottom:72px}
.hm-dark{background:var(--bg-dark);color:#fff}
.hm-alt{background:var(--bg2)}
.hm-eyebrow{font-family:var(--font-mono);font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin:0 0 16px}
.hm-dark .hm-eyebrow{color:var(--hm-peach)}
.hm-h2{font-family:var(--font-display);font-size:clamp(28px,3.3vw,42px);line-height:1.14;letter-spacing:-.03em;font-weight:700;margin:0 0 16px;max-width:780px;color:var(--text)}
.hm-dark .hm-h2{color:#fff}
.hm-lead{font-size:17px;line-height:1.65;color:var(--text2);max-width:680px;margin:0}
.hm-dark .hm-lead{color:rgba(255,255,255,.72)}
.hm-link{color:var(--orange);font-weight:600;font-size:14px;text-decoration:none}
.hm-link:hover{text-decoration:underline}
.hm-dark .hm-link{color:var(--hm-peach)}
.hm-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:40px}
.hm-head .hm-h2{margin-bottom:0}
.hm-btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border-radius:8px;border:1px solid transparent;font-family:var(--font-body);font-weight:600;font-size:15px;line-height:1.2;text-decoration:none;cursor:pointer;text-align:center;transition:background .15s,border-color .15s,transform .15s}
.hm-btn:hover{transform:translateY(-1px)}
.hm-btn-primary{background:var(--orange);color:#fff}
.hm-btn-primary:hover{background:var(--orange2)}
.hm-btn-ghost{background:transparent;border-color:rgba(255,255,255,.28);color:#fff}
.hm-btn-ghost:hover{border-color:#fff}
.hm-btn-light{background:#fff;color:var(--text)}
.hm-btn-dark{background:var(--bg-dark);color:#fff}
.hm-btn-row{display:flex;flex-wrap:wrap;gap:12px}
:target{scroll-margin-top:90px}

/* top strip + hero */
.hm-strip{border-bottom:1px solid var(--hm-line-dark);font-size:13px;color:rgba(255,255,255,.75)}
.hm-strip .hm-wrap{display:flex;justify-content:space-between;gap:16px;padding-top:11px;padding-bottom:11px;flex-wrap:wrap}
.hm-strip a{color:rgba(255,255,255,.9)}
.hm-strip a.hm-peach{color:var(--hm-peach)}
.hm-hero{padding-top:72px;padding-bottom:88px}
.hm-hero-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:72px;align-items:center}
.hm-h1{font-family:var(--font-display);font-size:clamp(34px,4.5vw,58px);line-height:1.08;letter-spacing:-.035em;font-weight:700;margin:0 0 24px;color:#fff}
.hm-hero-body{font-size:18px;line-height:1.65;color:rgba(255,255,255,.78);margin:0 0 30px;max-width:620px}
.hm-micro{font-size:13px;color:rgba(255,255,255,.6);margin:18px 0 0}
.hm-quote{margin-top:34px;padding-top:26px;border-top:1px solid var(--hm-line-dark)}
.hm-quote p{font-family:var(--font-display);font-size:20px;font-weight:600;letter-spacing:-.02em;margin:0 0 6px}
.hm-quote span{font-size:13px;color:rgba(255,255,255,.6)}

/* audit form */
.hm-form{background:#fff;color:var(--text);border-radius:18px;padding:30px;box-shadow:0 24px 60px rgba(0,0,0,.35)}
.hm-form h2{font-family:var(--font-display);font-size:22px;letter-spacing:-.02em;margin:0 0 4px}
.hm-form .hm-sub{font-size:14px;color:var(--text2);margin:0 0 20px}
.hm-fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.hm-field{display:flex;flex-direction:column;gap:6px}
.hm-field.full{grid-column:1/-1}
.hm-field label{font-size:13px;font-weight:600;color:var(--text)}
.hm-input{width:100%;padding:12px 13px;border-radius:8px;border:1px solid var(--border2);background:#fff;color:var(--text);font-family:var(--font-body);font-size:15px;outline:none}
.hm-input:focus{border-color:var(--orange);box-shadow:0 0 0 3px var(--orange-light)}
.hm-form .hm-btn{width:100%;margin-top:18px}
.hm-form .hm-alt-line{text-align:center;font-size:13px;color:var(--text2);margin:14px 0 0}
.hm-form .hm-alt-line a{color:var(--orange);font-weight:600}
.hm-form .hm-assure{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 18px;margin-top:18px;padding-top:16px;border-top:1px solid var(--border);font-size:12px;color:var(--text2)}
.hm-err{margin-top:14px;padding:10px 12px;border-radius:8px;background:rgba(220,38,38,.06);border:1px solid rgba(220,38,38,.2);color:var(--danger);font-size:13px}

/* client strip + stats */
.hm-clients{padding:48px 0 8px}
.hm-clients-label{font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text3);margin:0 0 18px}
.hm-clients-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.hm-client{display:flex;align-items:center;justify-content:center;height:96px;padding:14px 20px;background:#fff;border:1px solid var(--border);border-radius:14px;transition:border-color .15s,transform .15s}
.hm-client:hover{border-color:var(--orange);transform:translateY(-2px)}
.hm-client img{display:block;width:auto;height:auto;max-width:100%;max-height:100%;object-fit:contain}
.hm-client span{font-family:var(--font-display);font-weight:600;font-size:16px;line-height:1.25;color:var(--text);text-align:center}
.hm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;padding:36px 0 44px;border-bottom:1px solid var(--border)}
.hm-stat b{display:block;font-family:var(--font-display);font-size:34px;line-height:1.1;letter-spacing:-.03em;color:var(--text)}
.hm-stat span{display:block;margin-top:6px;font-size:14px;color:var(--text2);line-height:1.45}
.hm-stat em{font-style:normal;color:var(--text3);font-size:12px;display:block;margin-top:2px}

/* pains */
.hm-pains{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
.hm-pain{background:var(--bg2);border-radius:16px;padding:24px}
.hm-pain q{display:block;quotes:none;font-family:var(--font-display);font-size:19px;line-height:1.3;font-weight:600;letter-spacing:-.02em;margin:0 0 14px;color:var(--text)}
.hm-pain p{font-size:14px;line-height:1.6;color:var(--text2);margin:0}

/* systems */
.hm-sys{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
.hm-syscard{background:#fff;border:1px solid var(--border);border-radius:16px;padding:14px;display:flex;flex-direction:column}
.hm-syscard .hm-sbody{padding:18px 8px 8px;display:flex;flex-direction:column;flex:1}
.hm-syscard .hm-stag{font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin-bottom:8px}
.hm-syscard h3{font-family:var(--font-display);font-size:20px;line-height:1.25;letter-spacing:-.02em;margin:0 0 10px;color:var(--text)}
.hm-syscard p{font-size:14px;line-height:1.6;color:var(--text2);margin:0 0 12px}
.hm-syscard .hm-moves{font-size:13px;color:var(--text2);margin:0 0 14px}
.hm-syscard .hm-link{margin-top:auto}
.hm-stack{border:1px dashed var(--border2);border-radius:16px;padding:26px;background:transparent;display:flex;flex-direction:column}
.hm-stack h3{font-family:var(--font-display);font-size:20px;line-height:1.25;letter-spacing:-.02em;margin:0 0 18px}
.hm-chips{display:flex;flex-wrap:wrap;gap:8px}
.hm-chip{padding:8px 15px;border-radius:99px;border:1px solid var(--border2);background:#fff;font-size:13px;font-weight:500;color:var(--text)}
.hm-stack small{display:block;margin-top:auto;padding-top:20px;font-size:12px;line-height:1.5;color:var(--text2)}
.hm-d2c{margin:22px 0 0;font-size:14px;color:var(--text2)}
.hm-d2c a{color:var(--orange);text-decoration:underline;text-underline-offset:2px}
.hm-banner{margin-top:44px;border-radius:18px;padding:34px 40px;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap}
.hm-banner h3{font-family:var(--font-display);font-size:clamp(22px,2.4vw,30px);line-height:1.2;letter-spacing:-.025em;margin:0 0 8px}
.hm-banner p{font-size:15px;line-height:1.6;margin:0;max-width:620px}
.hm-banner-dark{background:var(--bg-dark);color:#fff}
.hm-banner-dark p{color:rgba(255,255,255,.75)}
.hm-banner-orange{background:var(--orange);color:#fff}
.hm-banner-orange p{color:rgba(255,255,255,.92)}

/* mini dashboards */
.hm-panel{background:#121212;border-radius:10px;padding:14px 14px 12px;color:#fff;font-size:12px;min-height:158px}
.hm-pl{display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:12px}
.hm-row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 0;border-top:1px solid rgba(255,255,255,.1)}
.hm-row small{display:block;font-size:10px;color:rgba(255,255,255,.5)}
.hm-pill{display:inline-flex;align-items:center;padding:3px 9px;border-radius:99px;font-size:10px;font-weight:700;white-space:nowrap}
.hm-pill.ok{background:#14452b;color:#86efac}
.hm-pill.risk{background:#5f1d1d;color:#fca5a5}
.hm-pill.hot{background:#FFB27A;color:#1a1917}
.hm-pill.warm,.hm-pill.cool{background:#3a3a38;color:#d4d3cf}
.hm-bar{height:6px;border-radius:99px;background:rgba(255,255,255,.14);margin:3px 0 8px;overflow:hidden}
.hm-bar i{display:block;height:100%;border-radius:99px;background:#8b8b88}
.hm-bar i.best{background:#FFB27A}

/* how we work */
.hm-two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.95fr);gap:72px;align-items:start}
.hm-steps{display:flex;flex-direction:column;gap:14px}
.hm-step{display:flex;gap:16px;align-items:flex-start;border:1px solid var(--border);border-radius:14px;padding:20px 22px;background:#fff}
.hm-step b{flex:0 0 36px;height:36px;border-radius:50%;background:var(--bg-dark);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:15px}
.hm-step:first-child b{background:var(--orange)}
.hm-step h3{font-family:var(--font-display);font-size:18px;letter-spacing:-.02em;margin:2px 0 6px}
.hm-step p{font-size:14px;line-height:1.6;color:var(--text2);margin:0}

/* cases */
.hm-cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.hm-case{background:var(--hm-card-dark);border:1px solid var(--hm-line-dark);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:border-color .15s,transform .15s}
.hm-case:hover{border-color:var(--orange);transform:translateY(-2px)}
.hm-case img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover}
.hm-case .hm-cbody{padding:22px 24px 24px;display:flex;flex-direction:column;flex:1}
.hm-case .hm-cmeta{font-size:12px;color:rgba(255,255,255,.55);margin-bottom:10px}
.hm-case h3{font-family:var(--font-display);font-size:20px;line-height:1.25;letter-spacing:-.02em;margin:0 0 10px;color:#fff}
.hm-case p{font-size:14px;line-height:1.6;color:rgba(255,255,255,.72);margin:0 0 14px}
.hm-case .hm-link{margin-top:auto}
.hm-case-lead{grid-row:span 2}
.hm-case-lead h3{font-size:24px}
.hm-big{font-family:var(--font-display);font-size:clamp(32px,3.4vw,44px);font-weight:700;letter-spacing:-.03em;color:var(--hm-peach);margin:0 0 12px;line-height:1.05}
.hm-case blockquote{margin:6px 0 14px;padding-top:16px;border-top:1px solid var(--hm-line-dark);font-size:14.5px;line-height:1.6;color:#fff}
.hm-case blockquote + span{font-size:12px;color:rgba(255,255,255,.55);margin-bottom:16px;display:block}

/* about */
.hm-about .hm-ap{font-size:16.5px;line-height:1.7;color:var(--text2);margin:0 0 18px;max-width:560px}
.hm-sign{font-family:var(--font-display);font-weight:600;color:var(--text);margin:26px 0 14px}
.hm-links{display:flex;gap:22px;flex-wrap:wrap}
.hm-mission{background:var(--bg-dark);color:#fff;border-radius:16px;padding:24px 26px;margin-bottom:16px}
.hm-mission p{font-family:var(--font-display);font-size:21px;line-height:1.35;letter-spacing:-.02em;font-weight:600;margin:0;color:#fff;max-width:none}
.hm-h1,.hm-h2,.hm-faq h2{text-wrap:balance}
/* the page ends with its own call to action, so the site footer's "Your next move" band is hidden here */
body:has(.hm) .footer-cta{display:none}
.hm-glance{border:1px solid var(--border);border-radius:16px;padding:22px 26px;background:#fff}
.hm-glance h3{font-family:var(--font-display);font-size:17px;margin:0 0 14px}
.hm-glance dl{display:grid;grid-template-columns:120px 1fr;gap:10px 16px;margin:0;font-size:14px}
.hm-glance dt{color:var(--text2)}
.hm-glance dd{margin:0;font-weight:600;color:var(--text)}
.hm-values{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:56px}
.hm-value{background:var(--bg2);border-radius:16px;padding:22px}
.hm-value h3{font-family:var(--font-display);font-size:17px;letter-spacing:-.02em;margin:0 0 8px}
.hm-value p{font-size:14px;line-height:1.55;color:var(--text2);margin:0}
.hm-journey{margin-top:48px;padding-top:34px;border-top:1px solid var(--border)}
.hm-journey h3{font-family:var(--font-display);font-size:19px;margin:0 0 20px}
.hm-jgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.hm-jitem{border-top:3px solid var(--bg-dark);padding-top:14px}
.hm-jitem:first-child{border-color:var(--orange)}
.hm-jitem b{display:block;font-family:var(--font-display);font-size:15px;margin-bottom:6px}
.hm-jitem span{font-size:14px;line-height:1.55;color:var(--text2)}

/* team */
.hm-team{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.hm-member{background:#fff;border-radius:16px;overflow:hidden;border:1px solid var(--border)}
.hm-photo{aspect-ratio:4/3;background:var(--bg4);display:flex;align-items:center;justify-content:center;overflow:hidden}
.hm-photo img{width:100%;height:100%;object-fit:cover;object-position:center 20%;display:block}
.hm-photo span{width:84px;height:84px;border-radius:50%;background:var(--bg-dark);color:var(--hm-peach);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:28px;font-weight:700}
.hm-mbody{padding:18px 20px 22px}
.hm-mbody h3{font-family:var(--font-display);font-size:20px;letter-spacing:-.02em;margin:0 0 4px}
.hm-mrole{font-size:13px;font-weight:700;color:var(--orange);margin-bottom:10px}
.hm-mbody p{font-size:14px;line-height:1.6;color:var(--text2);margin:0 0 12px}
.hm-hiring{margin-top:20px;background:#fff;border-radius:14px;padding:18px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;font-size:15px}

/* trust */
.hm-trust{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);gap:36px;align-items:start;margin-top:44px}
.hm-promise{background:#FFF8F2;color:var(--text);border-radius:18px;padding:28px 30px}
.hm-promise-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding-bottom:18px;border-bottom:1px solid var(--border);margin-bottom:6px;flex-wrap:wrap}
.hm-promise-head h3{font-family:var(--font-display);font-size:22px;letter-spacing:-.02em;margin:0}
.hm-stamp{font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);border:1.5px solid var(--orange);border-radius:99px;padding:5px 12px;transform:rotate(-3deg);white-space:nowrap}
.hm-prom{display:flex;gap:14px;align-items:flex-start;padding:16px 0;border-bottom:1px solid var(--border)}
.hm-prom i{flex:0 0 40px;height:40px;border-radius:10px;background:var(--orange-light);display:flex;align-items:center;justify-content:center;color:var(--orange)}
.hm-prom h4{font-family:var(--font-display);font-size:16px;letter-spacing:-.01em;margin:0 0 4px}
.hm-prom p{font-size:13.5px;line-height:1.55;color:var(--text2);margin:0}
.hm-signers{display:flex;gap:36px;padding-top:18px}
.hm-signers div{font-family:var(--font-display);font-style:italic;font-size:19px;font-weight:600}
.hm-signers small{display:block;font-family:var(--font-body);font-style:normal;font-size:12px;font-weight:400;color:var(--text2)}
.hm-reviews{display:flex;flex-direction:column;gap:14px}
.hm-review{background:var(--hm-card-dark);border:1px solid var(--hm-line-dark);border-radius:14px;padding:22px 24px}
.hm-stars{color:var(--hm-peach);letter-spacing:3px;font-size:14px;margin-bottom:12px}
.hm-review blockquote{margin:0 0 16px;font-size:15px;line-height:1.65;color:#fff}
.hm-who{display:flex;align-items:center;gap:12px}
.hm-who i{width:32px;height:32px;border-radius:50%;background:#2c2c2a;color:var(--hm-peach);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700}
.hm-who b{display:block;font-size:13.5px;color:#fff}
.hm-who span{font-size:12px;color:rgba(255,255,255,.6)}
.hm-verify{margin-top:44px}
.hm-verify > p{font-size:14px;color:rgba(255,255,255,.75);margin:0 0 14px}
.hm-verify-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.hm-vchip{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--hm-line-dark);border-radius:12px;padding:14px 16px;color:#fff;text-decoration:none}
a.hm-vchip:hover{border-color:var(--hm-peach)}
.hm-vchip svg{flex:0 0 20px;color:var(--hm-peach);margin-top:2px}
.hm-vchip b{display:block;font-size:13.5px}
.hm-vchip span{font-size:12px;color:rgba(255,255,255,.6)}

/* location */
.hm-addr{font-size:15px;line-height:1.7;color:var(--text2);margin:0 0 18px}
.hm-addr b{color:var(--text)}
.hm-addr a{color:var(--orange)}
.hm-map{border:1px solid var(--border);border-radius:16px;overflow:hidden;background:var(--bg3);min-height:320px}
.hm-map iframe{display:block;width:100%;height:100%;min-height:320px;border:0}

/* hub */
.hm-hub{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.hm-post{display:flex;flex-direction:column;border:1px solid var(--border);border-radius:14px;padding:22px 22px 20px;background:#fff;text-decoration:none;color:inherit;transition:border-color .15s,transform .15s}
.hm-post:hover{border-color:var(--orange);transform:translateY(-2px)}
.hm-post .hm-ptag{font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--orange);margin-bottom:12px}
.hm-post h3{font-family:var(--font-display);font-size:19px;line-height:1.28;letter-spacing:-.02em;margin:0 0 10px;color:var(--text)}
.hm-post p{font-size:14px;line-height:1.6;color:var(--text2);margin:0 0 14px}
.hm-post small{margin-top:auto;font-size:12px;color:var(--text3)}

/* faq */
.hm-faq{max-width:760px;margin:0 auto}
.hm-faq h2{font-family:var(--font-display);font-size:clamp(26px,3vw,34px);letter-spacing:-.03em;margin:0 0 28px}
.hm-faq details{border-top:1px solid var(--border2);padding:0}
.hm-faq details:last-child{border-bottom:1px solid var(--border2)}
.hm-faq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 0;font-weight:600;font-size:16px;color:var(--text)}
.hm-faq summary::-webkit-details-marker{display:none}
.hm-faq summary::after{content:'+';font-size:22px;font-weight:400;color:var(--orange);line-height:1}
.hm-faq details[open] summary::after{content:'−'}
.hm-faq details p{margin:0 0 18px;font-size:15px;line-height:1.7;color:var(--text2);max-width:680px}

/* resources */
.hm-res{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px}
.hm-resc{display:block;background:var(--bg2);border-radius:16px;padding:24px;text-decoration:none;color:inherit;transition:background .15s,transform .15s}
.hm-resc:hover{background:var(--bg3);transform:translateY(-2px)}
.hm-resc .hm-ptag{font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--orange);margin-bottom:10px;display:block}
.hm-resc h3{font-family:var(--font-display);font-size:19px;line-height:1.25;letter-spacing:-.02em;margin:0 0 8px;color:var(--text)}
.hm-resc p{font-size:14px;line-height:1.55;color:var(--text2);margin:0}

/* final cta */
.hm-final{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:56px;align-items:center}
.hm-final .hm-btn-row{flex-direction:column}
.hm-final .hm-btn{width:100%}

@media (max-width:1100px){
  .hm-pains,.hm-values,.hm-jgrid{grid-template-columns:repeat(2,1fr)}
  .hm-stats{grid-template-columns:repeat(2,1fr)}
  .hm-clients-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .hm-sys,.hm-hub,.hm-res,.hm-team{grid-template-columns:repeat(2,1fr)}
  .hm-cases{grid-template-columns:repeat(2,minmax(0,1fr))}
  .hm-case-lead{grid-row:auto;grid-column:1/-1}
  .hm-verify-row{grid-template-columns:1fr 1fr}
}
@media (max-width:900px){
  .hm-hero-grid,.hm-two,.hm-trust,.hm-final{grid-template-columns:1fr;gap:40px}
  .hm-sec{padding-top:72px;padding-bottom:72px}
  .hm-head{flex-direction:column;align-items:flex-start;gap:14px}
}
@media (max-width:620px){
  .hm-wrap{padding:0 18px}
  .hm-hero{padding-top:48px;padding-bottom:56px}
  .hm-pains,.hm-values,.hm-jgrid,.hm-sys,.hm-hub,.hm-res,.hm-team,.hm-cases,.hm-verify-row,.hm-stats{grid-template-columns:1fr}
  .hm-fgrid{grid-template-columns:1fr}
  .hm-clients-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .hm-client{height:84px;padding:12px 16px}
  .hm-form{padding:22px}
  .hm-banner{padding:26px 22px}
  .hm-glance dl{grid-template-columns:96px 1fr}
  .hm-strip .hm-wrap > span:last-child{display:none}
  .hm-btn-row .hm-btn{width:100%}
}
`
