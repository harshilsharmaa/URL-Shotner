(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{33:function(e,t,n){},34:function(e,t,n){},36:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),o=n(22),a=n.n(o),s=(n(33),n(25)),i=n(1),u=(n(34),n(23)),j=n(5),l=n(11),b=n.n(l),h=(n(36),n(24)),d=n.n(h),f=n(2),p=function(){var e=Object(c.useState)(""),t=Object(j.a)(e,2),n=t[0],r=t[1],o=Object(c.useState)(""),a=Object(j.a)(o,2),s=a[0],i=a[1],l=Object(c.useState)("Copy"),h=Object(j.a)(l,2),p=h[0],O=h[1],x=Object(c.useState)(!1),g=Object(j.a)(x,2),v=g[0],m=g[1];return Object(f.jsxs)("div",{className:"home",children:[Object(f.jsx)("h2",{children:"Urliy.com"}),Object(f.jsx)("p",{children:"Shorten Your Long Ugly URL \ud83e\udd2a"}),Object(f.jsxs)("form",{className:"form",onSubmit:function(e){e.preventDefault();var t=function(){var e=Object(u.a)(b.a.mark((function e(){var t,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/shorten",{originalUrl:n},{headers:{"Content-Type":"application/json"}});case 2:t=e.sent,c=t.data,i(window.location.href+c.urlId);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();t()},children:[Object(f.jsx)("input",{type:"text",label:"Enter URL",onChange:function(e){r(e.target.value)}}),Object(f.jsx)("button",{children:"Shorten"})]}),s&&s.length>0?Object(f.jsxs)("div",{className:"showUrl",children:[Object(f.jsx)("h3",{children:s}),Object(f.jsx)("button",{className:"copyBtn",style:{color:v?"#fff":"",background:v?"green":"#03031f",border:v?"none":""},onClick:function(){navigator.clipboard.writeText(s),O("Copied"),m(!0),setInterval((function(){O("Copy"),m(!1)}),3e3)},children:p})]}):null]})};var O=function(){return Object(f.jsx)(s.a,{children:Object(f.jsx)(i.c,{children:Object(f.jsx)(i.a,{path:"/",element:Object(f.jsx)(p,{})})})})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,67)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),o(e),a(e)}))};a.a.createRoot(document.getElementById("root")).render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(O,{})})),x()}},[[66,1,2]]]);
//# sourceMappingURL=main.f57ab8c7.chunk.js.map