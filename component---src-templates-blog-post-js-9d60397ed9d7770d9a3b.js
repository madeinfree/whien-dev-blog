(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{149:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return p});a(34);var n=a(7),A=a.n(n),r=a(0),i=a.n(r),o=a(153),c=a(183),l=a(167),s=a(160),d=a(161),u=a(154),m=function(e){function t(){return e.apply(this,arguments)||this}return A()(t,e),t.prototype.render=function(){var e=this.props.data.markdownRemark,t=this.props.data.site.siteMetadata.title,a=this.props.pageContext,n=a.previous,A=a.next,r={identifier:e.id,title:e.frontmatter.title},m=[{name:"og:image",content:e.frontmatter.featuredImage?e.frontmatter.featuredImage.publicURL:""}];return i.a.createElement(s.a,{location:this.props.location,title:t},i.a.createElement(d.a,{meta:m,title:e.frontmatter.title,description:e.frontmatter.description||e.excerpt}),i.a.createElement("h1",null,e.frontmatter.title),i.a.createElement("p",{style:Object.assign({},Object(u.b)(-.2),{display:"block",marginBottom:Object(u.a)(1),marginTop:Object(u.a)(-1)})},e.frontmatter.date),i.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.html}}),i.a.createElement("hr",{style:{marginBottom:Object(u.a)(1)}}),i.a.createElement(c.DiscussionEmbed,{shortname:"whien-dev-blog",config:r}),i.a.createElement(l.a,null),i.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},i.a.createElement("li",null,n&&i.a.createElement(o.a,{to:n.fields.slug,rel:"prev"},"← ",n.frontmatter.title)),i.a.createElement("li",null,A&&i.a.createElement(o.a,{to:A.fields.slug,rel:"next"},A.frontmatter.title," →"))))},t}(i.a.Component);t.default=m;var p="768243568"},153:function(e,t,a){"use strict";a.d(t,"b",function(){return s});var n=a(0),A=a.n(n),r=a(4),i=a.n(r),o=a(33),c=a.n(o);a.d(t,"a",function(){return c.a}),a.d(t,"c",function(){return o.withPrefix});a(155);var l=A.a.createContext({}),s=function(e){return A.a.createElement(l.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):A.a.createElement("div",null,"Loading (StaticQuery)")})};s.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},154:function(e,t,a){"use strict";a.d(t,"a",function(){return c}),a.d(t,"b",function(){return l});var n=a(171),A=a.n(n),r=a(172),i=a.n(r);i.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete i.a.googleFonts;var o=new A.a(i.a);var c=o.rhythm,l=o.scale},155:function(e,t,a){var n;e.exports=(n=a(157))&&n.default||n},157:function(e,t,a){"use strict";a.r(t);a(34);var n=a(0),A=a.n(n),r=a(4),i=a.n(r),o=a(56),c=a(2),l=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return A.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json))};l.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=l},160:function(e,t,a){"use strict";a(34);var n=a(7),A=a.n(n),r=a(0),i=a.n(r),o=a(153),c=a(154),l=function(e){function t(){return e.apply(this,arguments)||this}return A()(t,e),t.prototype.render=function(){var e,t=this.props,a=t.location,n=t.title,A=t.children;return e="/whien-dev-blog/"===a.pathname?i.a.createElement("h1",{style:Object.assign({textAlign:"center"},Object(c.b)(1.5),{marginBottom:Object(c.a)(1.5),marginTop:0})},i.a.createElement(o.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},n)):i.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0}},i.a.createElement(o.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},n)),i.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(c.a)(25),padding:Object(c.a)(1.5)+" "+Object(c.a)(.75)}},i.a.createElement("header",null,e),i.a.createElement("main",null,A),i.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))},t}(i.a.Component);t.a=l},161:function(e,t,a){"use strict";var n=a(162),A=a(0),r=a.n(A),i=a(4),o=a.n(i),c=a(173),l=a.n(c);function s(e){var t=e.description,a=e.lang,A=e.meta,i=e.keywords,o=e.title,c=n.data.site,s=t||c.siteMetadata.description;return r.a.createElement(l.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:s},{property:"og:title",content:o},{property:"og:description",content:s},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:s}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(A)})}s.defaultProps={lang:"en",meta:[],keywords:[],description:""},s.propTypes={description:o.a.string,lang:o.a.string,meta:o.a.arrayOf(o.a.object),keywords:o.a.arrayOf(o.a.string),title:o.a.string.isRequired},t.a=s},162:function(e){e.exports={data:{site:{siteMetadata:{title:"Whien's Dev Blog",description:"Do right things.",author:"Whien"}}}}},167:function(e,t,a){"use strict";a(168),a(169);var n=a(170),A=a(0),r=a.n(A),i=a(153),o=a(164),c=a.n(o),l=a(154);function s(e){var t=e.link,a=e.children;return r.a.createElement("a",{style:{color:"#757575"},href:t,target:"_blank"},a)}var d="1712774675";t.a=function(){return r.a.createElement(i.b,{query:d,render:function(e){var t=e.site.siteMetadata,a=t.author,n=t.social;return r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement(c.a,{fixed:e.avatar.childImageSharp.fixed,alt:a,style:{marginRight:Object(l.a)(.5),marginBottom:0,minWidth:50,borderRadius:"100%"},imgStyle:{borderRadius:"50%"}}),r.a.createElement("div",null,"嗨，我是懷恩，專注於 JavaScript 多年的開發者，",r.a.createElement(s,{link:"https://jioukou.yosgo.com/"},"目前在 YOSGO 擔任開發領導"),"，空閒時也會舉辦一些 Workshop 分享實體活動，您可以透過"," ",r.a.createElement(s,{link:n.facebook},"Facebook"),","," ",r.a.createElement(s,{link:n.github},"Github")," 或"," ",r.a.createElement(s,{link:"mailto:sal95610@gmail.com"},"寫信")," ","與我聯繫。"))},data:n})}},170:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAMEAv/EABcBAAMBAAAAAAAAAAAAAAAAAAABAgP/2gAMAwEAAhADEAAAAeZ67qs7chxuaRwA/8QAHBAAAgICAwAAAAAAAAAAAAAAAAECBAMREjEy/9oACAEBAAEFApYJMdfRCu9YE5p98kV/Bo//xAAXEQADAQAAAAAAAAAAAAAAAAAAARAR/9oACAEDAQE/AUbf/8QAFhEAAwAAAAAAAAAAAAAAAAAAABAh/9oACAECAQE/ASv/xAAdEAABBAIDAAAAAAAAAAAAAAABABARMQITITJx/9oACAEBAAY/AsaV8rtC2EmZc+v/AP/EABoQAAMBAQEBAAAAAAAAAAAAAAABESExQcH/2gAIAQEAAT8hik61Sj0yvSgh8g0NOCpelBNXYaZJXxD2iWH/2gAMAwEAAgADAAAAENvQf//EABgRAQEAAwAAAAAAAAAAAAAAAAEAEDFB/9oACAEDAQE/EAO4ncf/xAAYEQEAAwEAAAAAAAAAAAAAAAABABARMf/aAAgBAgEBPxB2JqHK/8QAHhABAQADAAEFAAAAAAAAAAAAAREAITFRQXGBwfD/2gAIAQEAAT8QAFEXZAVPfuHawqAnzcFh23ar57+mBZaRgEPvNShhrDC09ScyZajwDnMBB8YkLeZ//9k=",width:50,height:50,src:"/whien-dev-blog/static/dce59051884d00d8b5cec2942a81542e/7e494/profile-pic.jpg",srcSet:"/whien-dev-blog/static/dce59051884d00d8b5cec2942a81542e/7e494/profile-pic.jpg 1x,\n/whien-dev-blog/static/dce59051884d00d8b5cec2942a81542e/36cc2/profile-pic.jpg 1.5x,\n/whien-dev-blog/static/dce59051884d00d8b5cec2942a81542e/0a3a6/profile-pic.jpg 2x,\n/whien-dev-blog/static/dce59051884d00d8b5cec2942a81542e/75d16/profile-pic.jpg 3x"}}},site:{siteMetadata:{author:"Whien",social:{facebook:"https://www.facebook.com/haowei.liou",github:"https://github.com/madeinfree",email:"sal95610@gmail.com"}}}}}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-9d60397ed9d7770d9a3b.js.map