window.addEventListener("load",(()=>{const e=document.getElementById("search-mask"),t=document.querySelector("#algolia-search .search-dialog"),a=()=>{const a=document.body.style;a.width="100%",a.overflow="hidden",btf.animateIn(e,"to_show 0.5s"),btf.animateIn(t,"titleScale 0.5s"),setTimeout((()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()}),100),document.addEventListener("keydown",(function e(t){"Escape"===t.code&&(i(),document.removeEventListener("keydown",e))})),n(),window.addEventListener("resize",n)},i=()=>{const a=document.body.style;a.width="",a.overflow="",btf.animateOut(t,"search_close .5s"),btf.animateOut(e,"to_hide 0.5s"),window.removeEventListener("resize",n)},n=()=>{window.innerWidth<768&&t.style.setProperty("--search-height",window.innerHeight+"px")},s=()=>{btf.addEventListenerPjax(document.querySelector("#search-button > .search"),"click",a)},o=GLOBAL_CONFIG.algolia;if(!(o.appId&&o.apiKey&&o.indexName))return console.error("Algolia setting is invalid!");const r=instantsearch({indexName:o.indexName,searchClient:algoliasearch(o.appId,o.apiKey),searchFunction(e){e.state.query&&e.search()}}),l=instantsearch.widgets.configure({hitsPerPage:o.per_page||5}),d=instantsearch.widgets.searchBox({container:"#algolia-search-input",showReset:!1,showSubmit:!1,searchAsYouType:!1,showLoadingIndicator:!0,autofocus:!0,placeholder:GLOBAL_CONFIG.algolia.languages.input_placeholder}),c=instantsearch.widgets.hits({container:"#algolia-hits",templates:{item(e){const t=e.permalink?e.permalink:GLOBAL_CONFIG.root+e.path,a=e._snippetResult.contentStrip.value;return`\n          <a href="${t}#:~:text=${a.substring(a.indexOf("<mark>")-3,a.indexOf("<mark>"))}-,${a.substring(a.indexOf("<mark>")+6,a.indexOf("</mark>"))},-${a.substring(a.indexOf("</mark>")+7,a.indexOf("</mark>")+10)}" class="algolia-hit-item-link">\n          <b>${e._highlightResult.title.value||"no-title"}</b>\n          <br>${a}</br>\n          匹配字词: <em><mark>${e._highlightResult.contentStrip.matchedWords}</mark></em> | 匹配等级: <em><mark>${e._highlightResult.contentStrip.matchLevel}</mark></em>\n          </a>`},empty:function(e){return'<div id="algolia-hits-empty">'+GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/,e.query)+"</div>"}}}),h=instantsearch.widgets.stats({container:"#algolia-info > .algolia-stats",templates:{text:function(e){return`<hr>${GLOBAL_CONFIG.algolia.languages.hits_stats.replace(/\$\{hits}/,e.nbHits).replace(/\$\{time}/,e.processingTimeMS)}`}}}),g=instantsearch.widgets.poweredBy({container:"#algolia-info > .algolia-poweredBy"}),u=instantsearch.widgets.pagination({container:"#algolia-pagination",totalPages:o.totalPages,templates:{first:'<i class="fa-solid fa-angle-double-left" title="第一页"></i>',last:'<i class="fa-solid fa-angle-double-right" title="最后一页"></i>',previous:'<i class="fa-solid fa-angle-left" title="上一页"></i>',next:'<i class="fa-solid fa-angle-right" title="下一页"></i>'}});r.addWidgets([l,d,c,h,g,u]),r.start(),s(),e.addEventListener("click",i),document.querySelector("#algolia-search .search-close-button").addEventListener("click",i),window.addEventListener("pjax:complete",(()=>{!btf.isHidden(e)&&i(),s()})),window.pjax&&r.on("render",(()=>{window.pjax.refresh(document.getElementById("algolia-hits"))}))}));