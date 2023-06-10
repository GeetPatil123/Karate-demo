/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
import{dcLocalStorage as e,dcSessionStorage as t}from"../../../common/local-storage.js";import{dcTabStorage as a}from"../tab-storage.js";import{util as n}from"../content-util.js";import{signInUtil as r}from"./signInUtils.js";import{privateApi as i}from"../content-privateApi.js";import{OptionPageActions as s}from"../../../common/constant.js";import{indexedDBScript as o}from"../../../common/indexDB.js";import{loggingApi as c}from"../../../common/loggingApi.js";import l from"./ResponseHeaders.js";await e.init(),await t.init();let d=!1;!function(){let m,u,f,g,p,h,w,I,b,y,_,v,S,L,E,D,P,C,R,U;const T=chrome.runtime.getURL("viewer.html"),B=chrome.runtime.getURL("signInHandler.html"),x="file:",k=["https:","http:",x],F=e=>{if(!e)return!1;try{const t=new URL(e),a=t.protocol;let n=-1!==k.indexOf(a);return n=a===x?t.pathname.toLowerCase().endsWith(".pdf"):n,n}catch(e){return!1}};function V(e){const t=a.getItem("search");return new URLSearchParams(t).get(e)}function M(e,t){return L?(E=E||1,e.tabId=E,e.mimeHandled=!0,chrome.runtime.sendMessage(e,t)):chrome.runtime.sendMessage(e,t)}function A(e,t){return new URLSearchParams(e).get(t)||""}function O(){if(g=A(document.location.search,"pdfurl"),!F(g))return void(p=!1);!function(){const e=new URLSearchParams(document.location.search),a=t.getItem("rtParams");if(a){const n=a.split(",").map((t=>e.has(t)?`&${t}=${e.get(t)}`:null)).join("")||"";t.setItem("payPalUrl",n),t.removeItem("rtParams")}}();const e=a.getItem("search");(!e||A(e,"pdfurl")!==g||e.length<document.location.search)&&a.setItem("search",document.location.search),f=A(document.location.search,"pdffilename")||A(e,"pdffilename")||ne(g),document.title=f;const n="/"+g+location.hash;history.replaceState({},f,n)}function N(t=!1){if(L)try{t||M({main_op:"viewer-type",viewer:"mime-native"}),setTimeout((()=>{i.reloadWithNativeViewer({contentLength:parseInt(m)||0})}),100)}catch(e){z("DCBrowserExt:Viewer:FallbackToNative:Failed")}else try{setTimeout((()=>{chrome.tabs.getCurrent((function(t){e.setItem(`reloadurl-${t.id}`,g),window.location.href=g}))}),500)}catch(e){z("DCBrowserExt:Viewer:FallbackToNative:Failed")}}const H=t=>{try{const a=new URL(e.getItem("cdnUrl")),n=[/^https:\/\/([a-zA-Z\d-]+\.){0,}(adobe|acrobat)\.com(:[0-9]*)?$/];return t===a.origin&&!!n.find((e=>e.test(t)))}catch(e){return!1}};function z(e){const t={main_op:"analytics"};t.analytics=[[e]],M(t)}function $(){let e,t=T;return L?(e="?mimePdfUrl="+encodeURIComponent(g),t=B):(e=a.getItem("search"),e||(e="?pdfurl="+g)),new URL(t+e)}const W=["AdobeID","openid","DCAPI","sign_user_read","sign_user_write","sign_user_login","sign_library_read","sign_library_write","agreement_send","agreement_read","agreement_write","ab.manage","additional_info.account_type","sao.ACOM_ESIGN_TRIAL","widget_read","widget_write","workflow_read","workflow_write"];function q(t={}){const r=e.getItem("imsURL"),i=e.getItem("viewerImsClientId"),s=e.getItem("imsContextId"),o=new URL(r+"/ims/authorize/v1?"),c=$(),l=n.uuid(),d={csrf:l};t.sign_up?(o.searchParams.append("idp_flow","create_account"),c.hash=c.hash+"signUp=true"):c.hash=c.hash+"signIn=true",a.setItem("csrf",l),o.searchParams.append("response_type","token"),o.searchParams.append("client_id",i),o.searchParams.append("redirect_uri",c),o.searchParams.append("scope",W.join(",")),o.searchParams.append("dctx_id",s),o.searchParams.append("locale",e.getItem("locale")),o.searchParams.append("state",JSON.stringify(d)),chrome.tabs.update({url:o.href,active:!0})}function j(){let e;e=L?$().href:window.location.href,r.sign_out(e)}function G(e){let t=new URL(B);return t.searchParams.append("socialSignIn","true"),t.searchParams.append("mimePdfUrl",encodeURIComponent(g)),a.setItem("idp_token",e),t.href}function Y(e){L?chrome.tabs.update({url:G(e),active:!0}):r.socialSignIn(e,$())}function J(t="google"){const r=e.getItem("viewerImsClientIdSocial"),i=e.getItem("imsURL"),s=n.uuid(),o=$();o.hash=o.hash+"signIn=true";const c=new URL(i+"/ims/authorize/v1"),l={ac:n.isEdge()?"adobe.com_acrobatextension_edge_login":"adobe.com_acrobatextension_chrome_login",csrf:s};a.setItem("csrf",s),c.searchParams.append("response_type","token"),c.searchParams.append("idp_flow","social.deep_link.web"),c.searchParams.append("client_id",r),c.searchParams.append("provider_id",t),c.searchParams.append("redirect_uri",o),c.searchParams.append("scope",W.join(",")),c.searchParams.append("locale",e.getItem("locale")),c.searchParams.append("state",JSON.stringify(l)),c.searchParams.append("xApiClientId",r),c.searchParams.append("xApiClientLocation ",t),chrome.tabs.update({url:c.href,active:!0})}const K={isSharePointURL:!1,isSharePointFeatureEnabled:!1,isFrictionlessEnabled:!0,featureFlags:[],isFillAndSignRegisteryEnabled:!1};class X{constructor(e){this.iframeElement=void 0,this.parentDiv=e}createIframe=t=>{const a=window.document,n=(e.getItem("cdnUrl"),a.createElement("iframe"));n.setAttribute("src",t),n.setAttribute("id","dc-view-frame"),n.setAttribute("allowfullscreen","allowfullscreen"),n.setAttribute("allow","clipboard-read; clipboard-write;"),n.style.width="100vw",n.style.height="100vh",n.style.border="none",n.style.overflow="hidden",this.parentDiv.appendChild(n),c.info({message:"Viewer Iframe created"}),this.iframeElement=a.getElementById("dc-view-frame")};_sendMessage=(e,t)=>{this.iframeElement&&H(t)&&function(e){let t=Date.now();return new Promise((function a(n,r){h&&(p||L)?n(p||L):e&&Date.now()-t>=e?r(new Error("timeout")):setTimeout(a.bind(this,n,r),30)}))}(1e6).then((a=>a&&this.iframeElement.contentWindow.postMessage(e,t)))};sendStartupConfigs=(e,a)=>{this._sendMessage({type:"nativeConfigs",nativeConfigs:K,extUrl:encodeURI(e),returnParamsUrl:t.getItem("payPalUrl"),isInstallTypeUpsell:d},a)};sendFileMetaData=(e,t,a,n,r,i,s,o)=>{this._sendMessage({fileUrl:r,fileName:i,fileSize:a,acceptRanges:n,handShakeTime:t,type:e,isFrictionlessEnabled:K.isFrictionlessEnabled,isReloadOrBackForward:o,isMimeHandled:L},s)};sendSubmitFormResponse=(e,t)=>{this._sendMessage({type:"submitForm",response:e},t)};sendRecentUrl=async(e,t,a,n=!1)=>{await chrome.extension.isAllowedFileSchemeAccess()||(t=t?.filter((e=>!e.url.startsWith(`chrome-extension://${chrome.runtime.id}/viewer.html?pdfurl=file`)))),this._sendMessage({type:"RecentUrls",permission:e,showOverlay:n,recentUrls:t},a)};sendProgress=(e,t,a,n)=>{this._sendMessage({total:t,loaded:a,type:e},n)};sendInitialBuffer=(e,t,a,n,r)=>{this._sendMessage({type:e,downLoadstartTime:t,downLoadEndTime:a,buffer:n},r)};sendBufferRanges=(e,t,a,n)=>{this._sendMessage({type:e,range:t,buffer:a},n)};preview=(e,t,a,n,r,i,s)=>{this._sendMessage({fileSize:a,type:e,fileBuffer:t,fileName:n,downLoadstartTime:r,downLoadEndTime:i},s)};openInAcrobatResponse=(e,t,a)=>{this._sendMessage({type:e,res:t},a)};postLog=(e,t,a,n,r)=>{this._sendMessage({type:e,reqId:t,message:a,error:n},r)}}function Z(t,a){try{_=void 0!==_?_:"false"!==e.getItem("logAnalytics")&&"false"!==e.getItem("ANALYTICS_OPT_IN_ADMIN"),_&&(b&&u?b.postLog("log",y,t,a,u.origin):setTimeout((()=>{b&&u&&b.postLog("log",y,t,a,u.origin)}),500))}catch(e){}}function Q(){let e;return e=L?g:window.location.href,e}function ee(t,a,n,r,i){i&&t.forEach((e=>{n.has(e)&&a.searchParams.append(e,n.get(e))})),r&&t.forEach((t=>{""!==e.getItem(t)&&a.searchParams.append(t,e.getItem(t))}))}const te=(a,n,r="localStorage")=>{if(n){const i="localStorage"===r?e.getItem(a):t.getItem(a);let s;i&&i.tabsInfo?(s=i.tabsInfo,s.includes(n)||s.push(n)):s=[n],"localStorage"===r?e.setItem(a,{tabsInfo:s}):t.setItem(a,{tabsInfo:s})}},ae=()=>{try{!function(){const e=Q();if(e.indexOf("access_token")>-1&&a.getItem("signInSource")){const t=a.getItem("csrf"),n=r.parseCSRF(new URL(e));a.removeItem("csrf"),(!t||!n||n!==t)&&(z("DCBrowserExt:Viewer:User:Error:NonMatchingCsrfToken:FailedToLogin"),j())}}(),function(){try{let e=Q();e&&e.indexOf("#")>-1&&(r.signInAnalyticsLogging(e),e=e.split("#")[0],L?g=e:window.location.href=e)}catch(e){}}();const t=window.document.getElementById("Adobe-dc-view");L||(m=V("clen")||-1),b=new X(t);const n=(()=>{try{const t=e.getItem("cdnUrl"),n=new URL(t);if(!H(n.origin))return Z("Invalid CDN URL detected","Invalid Origin"),void N();u||(u=n);let r=e.getItem("viewer-locale");r||(r=e.getItem("locale"));const i="false"!==e.getItem("logAnalytics"),s="false"!==e.getItem("ANALYTICS_OPT_IN_ADMIN"),o="true"===e.getItem("betaOptOut");n.searchParams.append("locale",r),n.searchParams.append("logAnalytics",i&&s),n.searchParams.append("callingApp",chrome.runtime.id),n.searchParams.append("betaOptOut",o),n.searchParams.append("enableCaretMode",C),n.searchParams.append("rvu",e.getItem("userState")?.rvu??null);const c=e.getItem("installType")||"update",l=e.getItem("installSource");n.searchParams.append("version",`${chrome.runtime.getManifest().version}:${c}`),n.searchParams.append("installSource",l),"false"===e.getItem("staticFteCoachmarkShown")&&n.searchParams.append("showFTECoachmark","true"),"true"!==V("googlePrint")&&!0!==D||"false"===a.getItem("googleAppsPrint")||n.searchParams.append("googleAppsPrint","true");const d=["dropin!","provider!","app!"],m=["analytics","logToConsole","enableLogging","frictionless","sessionId","linearization"],f=["isReadAloudEnable","isModernViewerEnable","isDeskTop","isAcrobat","theme","defaultOwnerShipExperiment","sessionId"];let p;e.getItem("env"),p=L?new URLSearchParams(new URL(g).search):new URLSearchParams(window.location.search),ee(m,n,p,!1,!0),ee(f,n,p,!0,!1);let h=n.href;return d.forEach((e=>{p.forEach(((t,a)=>{a.startsWith(e)&&(h=h+"&"+a+"="+t)}))})),h}catch(e){z("DCBrowserExt:Viewer:Iframe:Creation:Failed"),N()}})();b.createIframe(n),window.addEventListener("message",(t=>{!t.data||!H(t.origin)||w||"hsready"!==t.data.type&&"ready"!==t.data.type||(w=!0,I=(new Date).getTime(),y=t.data.requestId,"on"===t.data.killSwitch?(z("DCBrowserExt:Viewer:KillSwitch:Turned:On"),e.setItem("pdfViewer","false"),i.setViewerState("disabled"),e.setItem("killSwitch","on"),L?N(!0):setTimeout((()=>{window.location.href=g}),200)):e.getItem("killSwitch")&&(z("DCBrowserExt:Viewer:KillSwitch:Turned:Off"),e.removeItem("killSwitch")))}))}catch(e){Z("Error create Iframe",e)}};function ne(e){if(f)return f;let t=e;try{const a=e.split("?")[0].split("/").filter((e=>e.length>0)),n=a.length>0?a[a.length-1]:"untitled";t=n;const r=n.length-4;(n.length<4||n.toLowerCase().indexOf(".pdf")!==r)&&(t+=".pdf")}catch(e){Z("Error in getFileNameFromURL",e)}return t}function re(e,t){return new Promise(((a,n)=>{const r=(new Date).getTime(),i=new XMLHttpRequest;i.open("GET",e.url),i.responseType="arraybuffer",i.setRequestHeader("Range",`bytes=${t.start}-${t.end}`),i.onload=()=>{if(4===i.readyState&&206===i.status)a({buffer:i.response,startTime:r,endTime:(new Date).getTime()});else if(200===i.status){const e={status:i.status,statusText:i.statusText,fileSize:m,rangeBufferSize:i.response.byteLength,range:t};n({message:"Unexpected response to get file buffer range",error:e})}else{const e={status:i.status,statusText:i.statusText,fileSize:m,range:t};n({message:"Invalid response to get file buffer ranger",error:e})}},i.onerror=e=>{n({message:"Error to get file buffer range",error:e})},i.ontimeout=e=>{n({message:"Timeout to get file buffer range due to timeout",error:e})},i.send()}))}function ie(e,t){"PDF"===function(e){if(e)try{let t=new URL(e).pathname;return t.substr(t.lastIndexOf(".")+1).toUpperCase()}catch(e){return""}return""}(e)&&(p=!0);const a=new XMLHttpRequest;a.open("GET",e),a.responseType="arraybuffer",a.onreadystatechange=function(){4===a.readyState&&(200!==a.status&&0!=a.status||t({buffer:a.response,mimeType:a.getResponseHeader("content-type")}))},a.send(null)}async function se(){try{const e=a.getItem("bufferTabId");if(e){const t=await o.getDataFromIndexedDB(e);if(t&&t.fileBuffer)return p=!0,{buffer:t.fileBuffer}}}catch(e){}return{}}function oe(e,t,a){return new Promise(((n,r)=>{const i=g;if(i.startsWith("file://"))return void ie(i,n);const s=new XMLHttpRequest;var o;s.open("GET",i),s.responseType="arraybuffer",t&&s.setRequestHeader("If-Range","randomrange"),s.onreadystatechange=(o=s,function(e){if(this.readyState==this.HEADERS_RECEIVED){if(!function(e,t){const a=e.getResponseHeader("content-type"),n=e.getResponseHeader("content-disposition");if(a){const e=a.toLowerCase().split(";",1)[0].trim();if(n&&/^\s*attachment[;]?/i.test(n))return!1;if("application/pdf"===e)return!0;if("application/octet-stream"===e&&n&&/\.pdf(["']|$)/i.test(n))return!0}return!1}(o))return Z("Fall back to native - not pdf from headers"),N();p=!0}}),s.onprogress=function(e,t){return function(a){a.lengthComputable&&(m=a.total,e.sendProgress("progress",a.total,a.loaded,t))}}(e,a),s.onload=()=>{if(s.status>=200&&s.status<400)n({buffer:s.response,mimeType:s.getResponseHeader("content-type"),downLoadEndTime:(new Date).getTime()});else{const e={status:s.status,statusText:s.statusText};r({message:"Invalid response fetching content",error:e})}},s.onerror=e=>{r({message:"Error to download file contents",error:e})},s.ontimeout=e=>{r({message:"Timeout to download file contents",error:e})},s.send()}))}function ce(e){z(`DCBrowserExt:Viewer:SignIn:AdobeYolo:${e}:clicked`),chrome.tabs.query({active:!0,currentWindow:!0},(function(e){var t=e[0]&&e[0].id;te("adobeYoloTabsInfo",t,"sessionStorage")})),M({main_op:"launchJumpUrl",source:e},(t=>{b._sendMessage({type:"adobeYoloJumpResponse",response:t,source:e},u.origin)}))}function le(e,t,...a){L?o.storeBufferAndCall(e,t,E,...a):chrome.tabs.getCurrent((function(n){o.storeBufferAndCall(e,t,n.id,...a)}))}function de(t,a,n=!1){if(L){const r=e.getItem("recentFilesData");if(r&&r.isSyncedWithHistory){const e=r.recentFilesPath?[...r.recentFilesPath]:[],i=[];for(let t=e.length-1;t>=0;t--)i.push({...e[t],chromeHistory:!0,url:`chrome-extension://${chrome.runtime.id}/viewer.html?pdfurl=${e[t].url}`,mimeUrl:e[t].url});t.sendRecentUrl(!0,i,a,n)}}else chrome.history.search({text:chrome.runtime.getURL("viewer.html"),startTime:0,maxResults:1e3},(e=>{const r=e.filter((e=>e.url.startsWith(chrome.runtime.getURL("viewer.html")))),i=[];for(let e=0;e<r.length;++e){const{url:t,title:a}=r[e],{lastVisitTime:n}=r[e];i.push({filename:a,url:t,lastVisited:n,chromeHistory:!0})}t.sendRecentUrl(!0,i,a,n)}))}function me(r,i){switch(i.data.main_op){case"open_in_acrobat":case"fillsign":!async function(t,a){const r={main_op:"open_in_acrobat"};if("fillsign"===a.data.main_op&&(r.paramName="FillnSign"),r.url=a.data.url,r.click_context="pdfviewer",r.timeStamp=Date.now(),a.data.fileBuffer){const e=new Blob([a.data.fileBuffer],{type:"application/pdf"});r.dataURL=URL.createObjectURL(e)}if(P=function(e){"fillsign"===a.data.main_op?t.openInAcrobatResponse("FILLSIGN_IN_DESKTOP_APP",e,a.origin):t.openInAcrobatResponse("OPEN_IN_DESKTOP_APP",e,a.origin),Z(`Open In Acrobat - (${a.data.main_op}) response- ${e}`)},e.getItem("isSharepointFeatureEnabled"))if(K.isSharePointURL)r.workflow_name="SharePoint",r.isSharePointURL=!0,M(r,P);else{const e=await n.checkForSharePointURL(r.url);r.isSharePointURL=e,e&&(r.workflow_name="SharePoint"),M(r,P)}else M(r,P)}(r,i);break;case"complete_conversion":z("DCBrowserExt:Viewer:Verbs:Conversion:Redirection"),function(e){const t={};t.main_op=e.data.main_op,t.conversion_url=decodeURIComponent(e.data.conversion_url),t.timeStamp=Date.now(),M(t)}(i);break;case"updateLocale":z("DCBrowserExt:Viewer:User:Locale:Updated"),e.setItem("viewer-locale",i.data.locale),M({main_op:"localeChange",locale:i.data.locale}),chrome.tabs.reload();break;case"setInitialLocale":let c=!1;e.getItem("viewer-locale")||(c=!0,e.setItem("viewer-locale",i.data.locale),z("DCBrowserExt:Viewer:User:Locale:Initial")),i.data.reloadReq&&c&&chrome.tabs.reload();break;case"error-sign-in":!function(e){const t=n.uuid();a.setItem("csrf",t);const r=new URL(e),i=$();i.hash=i.hash+`state=${t}&signInError=true`,r.searchParams.set("redirect_uri",i),chrome.tabs.update({url:r.href,active:!0})}(i.data.url);break;case"deleteViewerLocale":e.getItem("viewer-locale")&&(e.removeItem("viewer-locale"),chrome.tabs.reload());break;case"signin":z("DCBrowserExt:Viewer:Ims:Sign:In"),a.setItem("signInSource",i.data.source),z(`DCBrowserExt:Viewer:Ims:Sign:In:${i.data.source}`),le(i.data.fileBuffer,q);break;case"googleSignIn":z("DCBrowserExt:Viewer:Ims:Sign:In"),z(`DCBrowserExt:Viewer:Ims:Sign:In:${i.data.source}`),a.setItem("signInSource",i.data.source),le(i.data.fileBuffer,J,i.data.application);break;case"signup":z("DCBrowserExt:Viewer:Ims:Sign:Up"),a.setItem("signUpSource",i.data.source),z(`DCBrowserExt:Viewer:Ims:Sign:Up:${i.data.source}`),le(i.data.fileBuffer,q,{sign_up:!0});break;case"reload_viewer":chrome.tabs.reload();break;case"upsell_event":!function(e){if(e&&e.url){const a=new URL(decodeURIComponent(e.url));e.returnUrlParams&&t.setItem("rtParams",e.returnUrlParams.toString()),"_blank"===e.target?chrome.tabs.create({url:a.href,active:!0}):chrome.tabs.update({url:a.href,active:!0})}}(i.data);break;case"upsell_remove_urlParams":t.removeItem("rtParams"),t.removeItem("payPalUrl");break;case"fetchLocalRecents":const l=new URL(e.getItem("cdnUrl")).origin;chrome.permissions.contains({permissions:["history"],origins:["https://www.google.com/"]},(e=>{if(i.data.fetchRecents){const t=i.data.showOverlay;e||L?de(b,l,t):(z("DCBrowserExt:Permissions:History:DialogTriggered"),chrome.permissions.request({permissions:["history"],origins:["https://www.google.com/"]},(e=>{e?(z("DCBrowserExt:Permissions:History:Granted"),de(b,l,t)):(z("DCBrowserExt:Permissions:History:Denied"),b.sendRecentUrl(!1,null,l))})))}else e||L?b.sendRecentUrl(!0,null,l):b.sendRecentUrl(!1,null,l)}));break;case"socialSignIn":z("DCBrowserExt:Viewer:Ims:Sign:In"),z(`DCBrowserExt:Viewer:Ims:Sign:In:${i.data.source}`),a.setItem("signInSource",i.data.source),le(i.data.fileBuffer,Y,i.data.idp_token);break;case"openRecentFileLink":const d={};d.main_op=i.data.main_op,d.recent_file_url=decodeURIComponent(i.data.recent_file_url),M(d);break;case"userSubscriptionData":if(L){const e={};e.eventType=i.data.main_op,e.userSubscriptionData=i.data.userSubscriptionData,e.data=i.data,e.main_op=i.data.main_op;M(e,(function(e){e&&"showUninstallPopUp"===e.main_op&&b._sendMessage({type:"showUninstallPopUp"},u.origin)}))}break;case"uninstall":L&&M({main_op:"uninstall",defaultUrl:g});break;case"submit_form":fetch(i.data.resource,i.data.options).then((e=>{b.sendSubmitFormResponse(e.ok,i.origin)})).catch((()=>{b.sendSubmitFormResponse(!1,i.origin)}));break;case"ownerShipExperimentShown":e.removeItem("defaultOwnerShipExperiment");break;case"openAcrobatOptions":chrome.runtime.openOptionsPage(),z(`DCBrowserExt:Viewer:ManagePref:clicked:${i.data.source}`);break;case"encryptedWriteFile":document.title.endsWith(i.data.secureString)||(document.title+=i.data.secureString);break;case"launchJump":le(i.data.fileBuffer,ce,i.data.source);break;case"saveAsEvent":!async function(e){try{let t;if(z("DCBrowserExt:Viewer:SaveToMyComputer:"+(U?"fileHandlerExist":"fileHandlerNotExist")),!U){const a={suggestedName:`${e.fileName}.pdf`,types:[{description:"PDF file",accept:{"application/pdf":[".pdf"]}}]};U=await window.showSaveFilePicker(a),t=!0}b._sendMessage({type:"saveToLocalResponse",newAsset:t},u.origin)}catch(e){U=null,Z("Save As Handler Error",e),b._sendMessage({type:"saveToLocalResponse",error:e},u.origin)}}(i.data);break;case"downloadFile":!async function(e){try{const t=new Blob([e.fileBuffer],{type:"application/pdf"}),a=URL.createObjectURL(t);chrome.downloads.download({url:a,filename:`${e.fileName}.pdf`,conflictAction:"uniquify",saveAs:!0})}catch(e){Z("downloadFile error",e),b._sendMessage({type:"downloadFileError"},u.origin)}}(i.data);break;case"rememberSaveLocationPreference":!function(t){let a="";t.cloudStorage&&!e.getItem("selectedSaveLocationPreference")?a="PreferenceMigrationSuccess":t.cloudStorage||(a="SaveDialogRememberMe");a&&z(`DCBrowserExt:Viewer:ChangeSaveLocationPreference:${a}`);(!t.cloudStorage||t.cloudStorage&&!e.getItem("selectedSaveLocationPreference"))&&(e.setItem("saveLocation",t.saveLocation),e.setItem("selectedSaveLocationPreference",!0),M({panel_op:"options_page",requestType:s.OPTIONS_UPDATE_TOGGLE,toggleId:"saveLocationPreferenceTitle",toggleVal:t.saveLocation}))}(i.data);break;case"appRenderingDone":Se();break;case"saveFileBuffer":le(i.data.fileBuffer);break;case"deleteFileBuffer":const m=a.getItem("bufferTabId");m&&o.deleteDataFromIndexedDB(m),a.removeItem("bufferTabId");case"appRenderingDone":Se();break;case"writeToLocalSavedFile":!async function(e){try{const t=await U.createWritable();await t.write(e.fileBuffer),await t.close()}catch(e){U=null,Z("Write to Local File Error",e),b._sendMessage({type:"saveToLocalResponse",error:e},u.origin)}}(i.data)}}function ue(e){try{const t=new TextDecoder("utf-8").decode(e.buffer);let a=!1;-1!=t.indexOf("Linearized 1")?(a=!0,z("DCBrowserExt:Viewer:Linearization:Linearized:Version:1")):-1!=t.indexOf("Linearized")?z("DCBrowserExt:Viewer:Linearization:Linearized:Version:Other"):z("DCBrowserExt:Viewer:Linearization:Linearized:False"),b._sendMessage({type:"Linearization",linearized:a},u.origin)}catch(e){z("DCBrowserExt:Viewer:Linearization:Linearized:Detection:Failed"),Z("Linearization Detection failed",e)}}function fe(t,a,n,r){n.then((n=>{const i=n.downLoadEndTime,s=n.buffer;n.buffer.byteLength;t.preview("preview",s,m,f,r,i,a.origin),b._sendMessage({type:"NavigationStartTime",time:window.performance&&window.performance.timing&&window.performance.timing.navigationStart},u.origin),!0===e.getItem("isSaveLocationPrefEnabled")&&b._sendMessage({type:"changeSaveLocationPreference",saveLocation:e.getItem("saveLocation"),onLoad:!0},u.origin)})).catch((e=>(z("DCBrowserExt:Viewer:Error:FallbackToNative:FileDownload:Failed"),N()))).finally((()=>{e.removeItem("sessionStarted")}))}class ge{constructor(){this.request={main_op:"analytics"}}analytics=e=>{this.request.analytics||(this.request.analytics=[]),this.request.analytics.push([e])};sendAnalytics=()=>{M(this.request)}}function pe(t,n,r,i){return s=>{try{if(s.data&&s.origin&&H(s.origin)&&(e=>{try{return e&&e.source&&e.source.top.location.origin==="chrome-extension://"+chrome.runtime.id}catch(e){return!1}})(s)){if(s.data.main_op)return me(t,s);switch(s.data.type){case"ready":if(L?async function(t,n,r,i){let s=new ge;h=!0;const o=g;document.title=f;const c=R.getHeaderValue("accept-ranges"),l=!a.getItem("bufferTabId")&&c&&"bytes"===c.toLowerCase()?"true":"false";t.sendFileMetaData("metadata",I,m,l,o,f,n.origin,!1),Ie(),r?(s.analytics("DCBrowserExt:Viewer:Linearization:Range:Supported"),r.then((e=>{t.sendInitialBuffer("initialBuffer",e.startTime,e.endTime,e.buffer,n.origin),ue(e)})).catch((e=>{t.sendInitialBuffer("initialBuffer",0,0,-1,n.origin),s.analytics("DCBrowserExt:Viewer:Error:Linearization:InitialBufiled")}))):s.analytics("DCBrowserExt:Viewer:Linearization:Range:Not:Supported"),e.removeItem("isReload"),e.removeItem("isBackForward");const d=window.performance&&window.performance.timing&&window.performance.timing.navigationStart,u=se();(await u).buffer?fe(t,n,u,d):(fetch(i.streamUrl).then((e=>{let a=0;return new Response(new ReadableStream({start(r){const i=e.body.getReader();!function e(){i.read().then((({done:i,value:s})=>{i?r.close():(a+=s.byteLength,t.sendProgress("progress",m,a,n.origin),r.enqueue(s),e())})).catch((e=>{r.error(e)}))}()}}))})).then((e=>e.arrayBuffer())).then((a=>{m=a.byteLength,t.preview("preview",a,a.byteLength,f,d,(new Date).getTime(),n.origin),b._sendMessage({type:"NavigationStartTime",time:window.performance&&window.performance.timing&&window.performance.timing.navigationStart},n.origin),!0===e.getItem("isSaveLocationPrefEnabled")&&b._sendMessage({type:"changeSaveLocationPreference",saveLocation:e.getItem("saveLocation"),onLoad:!0},n.origin)})).catch((e=>(s.analytics("DCBrowserExt:Viewer:Error:FallbackToNative:FileDownload:Failed"),N()))),s.sendAnalytics()),Z("Viewer loaded")}(t,s,r,n):function(e,t,n,r,i){h=!0;const s=g,o=!a.getItem("bufferTabId")&&V("chunk")||"false",c=window.performance.getEntriesByType("navigation").map((e=>e.type)).includes("reload"),l=window.performance.getEntriesByType("navigation").map((e=>e.type)).includes("back_forward");e.sendFileMetaData("metadata",I,m,o,encodeURI(s),f,t.origin,c||l),Ie(),n?(z("DCBrowserExt:Viewer:Linearization:Range:Supported"),n.then((a=>{e.sendInitialBuffer("initialBuffer",a.startTime,a.endTime,a.buffer,t.origin),ue(a)})).catch((a=>{e.sendInitialBuffer("initialBuffer",0,0,-1,t.origin),z("DCBrowserExt:Viewer:Error:Linearization:InitialBuffer:Failed")}))):(z("DCBrowserExt:Viewer:Linearization:Range:Not:Supported"),e.sendInitialBuffer("initialBuffer",0,0,-1,t.origin)),fe(e,t,r,i),Z("Viewer loaded")}(t,s,r,n,i),M({main_op:"getUserInfoFromAcrobat"},(e=>{b._sendMessage({type:"adobeYoloUserData",...e},u.origin)})),s.data.visitorID){const t=e.getItem("viewerVisitorID");e.setItem("viewerVisitorID",s.data.visitorID),t&&t!==s.data.visitorID&&z("DCBrowserExt:Analytics:viewerVisitorID:MCMID:Changed")}break;case"getFileBufferRange":!function(e,t){re({url:g},e.data.range).then((a=>{S||(z("DCBrowserExt:Viewer:Linearization:Range:Called"),S=!0),t.sendBufferRanges("bufferRanges",`${e.data.range.start}-${e.data.range.end}`,a.buffer,e.origin)})).catch((a=>{z("DCBrowserExt:Viewer:Error:Linearization:Range:Failed"),t.sendBufferRanges("bufferRanges",`${e.data.range.start}-${e.data.range.end}`,-1,e.origin)}))}(s,t);break;case"previewFailed":v||(z("DCBrowserExt:Viewer:Error:FallbackToNative:Preview:Failed"),v=!0,N());break;case"signin":z("DCBrowserExt:Viewer:Ims:Sign:In"),q();break;case"signout":z("DCBrowserExt:Viewer:Ims:Sign:Out"),e.removeItem("viewer-locale"),e.removeItem("userDetailsFetchedTimeStamp"),e.removeItem("discoveryExpiryTime"),e.removeItem("viewer-locale"),le(s.data.fileBuffer,j);break;case"coachMarkClosed":e.setItem("staticFteCoachmarkShown","true"),z("DCBrowserExt:Staticpdf:fte:CoachMark:Closed");break;case"coachmarkManageSettings":chrome.runtime.openOptionsPage(),e.setItem("staticFteCoachmarkShown","true"),z("DCBrowserExt:Staticpdf:fte:CoachMark:ManageSettings:clicked");break;case"coachMarkDisplayed":e.setItem("staticFteCoachmarkShown","true"),z("DCBrowserExt:Staticpdf:fte:CoachMark:Shown");break;case"googleAppsPrintShown":a.setItem("googleAppsPrint","false"),z("DCBrowserExt:Viewer:GoogleApps:Print:Shown");break;case"signInExperimentShown":chrome.tabs.query({active:!0,currentWindow:!0},(function(t){const a=t[0],n=(new Date).getTime();e.setItem("signInExperimentShown",JSON.stringify({currTabId:a.id,timestamp:n}))}));break;case"disableViewer":e.setItem("pdfViewer","false"),chrome.tabs.reload();break;case"signInExperimentClosed":case"signInExperimentSkipped":e.setItem("signInExperimentSuppressed","true");break;case"enableBeta":e.setItem("betaOptOut","false"),chrome.tabs.reload();break;case"disableBeta":e.setItem("betaOptOut","true"),chrome.tabs.reload()}}}catch(e){z("DCBrowserExt:Viewer:Error:MessageHandler:Unknown")}}}function he(){if(!w)return z("DCBrowserExt:Viewer:Error:Handshake:TimedOut"),N(),!1}const we=t=>{try{const n=R.getHeaderValue("content-length");m=n;const r=R.getHeaderValue("accept-ranges"),i=r&&"bytes"===r.toLowerCase();g=t.originalUrl,ae(),f=function(){let e;const t=R.getHeaderValue("content-disposition");if(t&&/\.pdf(["']|$)/i.test(t)){const a=/filename[^;=\n\*]?=((['"]).*?\2|[^;\n]*)/.exec(t);null!=a&&a.length>1&&(e=a[1].replace(/['"]/g,""))}return e||(e=ne(g)),decodeURIComponent(e)}();const s={url:g},o=new URL(e.getItem("cdnUrl"));u||(u=o);let c=null;const l="false"!==V("linearization")&&!a.getItem("bufferTabId");l&&i&&n>0&&(c=re(s,{start:0,end:1024})),window.addEventListener("message",pe(b,t,c)),be(),setTimeout(he,25e3)}catch(e){Z("InitMimeHandlerScript failed",e),N()}};function Ie(){if(a.getItem("signInAction")){const e=a.getItem("signInAction");b._sendMessage({type:"signInInformation",action:e,source:"signIn"===e?a.getItem("signInSource"):a.getItem("signUpSource")},u.origin),a.removeItem("signInSource"),a.removeItem("signUpSource"),a.removeItem("signInAction")}}async function be(){chrome.storage.onChanged.addListener(((t,a)=>{"local"===a&&Object.entries(t).forEach((([t,{newValue:a}])=>{if("theme"===t&&b._sendMessage({type:"themeChange",theme:a},u.origin),"ANALYTICS_OPT_IN_ADMIN"===t){const t="false"!==e.getItem("logAnalytics"),n="false"!==a;b._sendMessage({type:"analyticsTrackingChange",value:t&&n},u.origin)}"saveLocation"===t&&b._sendMessage({type:"changeSaveLocationPreference",saveLocation:a},u.origin)}))})),await async function(){return d=await i.isInstalledViaUpsell(),d}(),M({main_op:"viewer-startup",url:g,startup_time:Date.now(),viewer:!0},(e=>{K.isSharePointURL=!!e.isSharePointURL,K.isSharePointFeatureEnabled=!!e.isSharePointEnabled,K.isFrictionlessEnabled=!!e.isFrictionlessEnabled,K.featureFlags=e.featureFlags,K.isFillAndSignRegisteryEnabled=e.isFillnSignEnabled;const t=$().href;b.sendStartupConfigs(t,u.origin)})),M({main_op:"get-features&groups",cachePurge:"LAZY"},(e=>{b._sendMessage({type:"featureGroups",featureGroups:e.featureGroups,featureFlags:e.featureFlags,ffResponse:e.ffResponse},u.origin)})),L&&(setTimeout((()=>te("loadedTabsInfo",E)),2e3),function(){const t=e.getItem("recentFilesData");if(t&&t.isSyncedWithHistory){const a=t.recentFilesPath?[...t.recentFilesPath]:[];1e3===a.length&&a.shift(),a.push({url:g,filename:f,lastVisited:Date.now()}),t.recentFilesPath=a,e.setItem("recentFilesData",t)}else chrome.permissions.contains({permissions:["history"],origins:["https://www.google.com/"]},(t=>{if(t)chrome.history.search({text:chrome.runtime.getURL("viewer.html"),startTime:0,maxResults:999},(t=>{const a=t.filter((e=>e.url.startsWith(chrome.runtime.getURL("viewer.html")))),n=[];for(let e=a.length-1;e>=0;e--){const{url:t,title:r,lastVisitTime:i}=a[e];let s=t;const o=t.split("viewer.html");o[1]&&(s=A(o[1],"pdfurl"),n.push({url:s,filename:r,lastVisited:i}))}n.push({url:g,filename:f,lastVisited:Date.now()}),e.setItem("recentFilesData",{recentFilesPath:n,isSyncedWithHistory:!0})}));else{const t=[];t.push({url:g,filename:f,lastVisited:Date.now()}),e.setItem("recentFilesData",{recentFilesPath:t,isSyncedWithHistory:!0})}}))}())}function ye(e){const t=document.getElementById("__acrobatDialog__");t&&0!==t.length?t&&"none"===t.style.display&&"visible"===e.frame_visibility?t.style.display="block":t&&e.trefoilClick&&(delete e.trefoilClick,t.remove()):function(e){const t=e.base64PDF;delete e.base64PDF;const a=`message=${encodeURIComponent(JSON.stringify(e))}`;e.base64PDF=t;const n=null===e.locale;let r=e.version>13||n?"210px":"130px",i="block";"hidden"===e.frame_visibility&&(i="none");const s=document.createElement("iframe");s.setAttribute("src",`${chrome.runtime.getURL("browser/js/frame.html")}?${a}`),s.setAttribute("id","__acrobatDialog__"),s.style.border="0px",s.style.zIndex="999999999999",s.style.position="fixed",s.style.top="-5px",s.style.right="80px",s.style.width="294px",s.style.height=r,s.style.display=i,s.style.margin="auto",document.getElementById("trefoil_m").appendChild(s)}(e)}function _e(e){M({main_op:"caret_mode_toggle_handler",toggleCaretModeValue:e})}function ve(e){if(e.panel_op&&(1==e.trefoilClick?(delete e.trefoilUI,delete e.newUI,ye(e)):!0===e.reload_in_native&&(delete e.is_viewer,chrome.tabs.reload(e.tabId))),"relay_to_content"!==e.main_op||"dismiss"!==e.content_op)return"relay_to_content"===e.main_op&&"caret_mode_toggle_handler"===e.content_op?b._sendMessage({type:"toggleCaretMode",toggleCaretModeValue:e.status},u.origin):"reset"===e.main_op?b._sendMessage({type:"toggleAnalytics",logAnalytics:e.analytics_on},u.origin):"showUninstallPopUp"===e.main_op?b._sendMessage({type:"showUninstallPopUp"},u.origin):"jumpUrlSuccess"===e.main_op&&(!L||e.tabInfo&&e.tabInfo.includes(E))&&b._sendMessage({type:"adobeYoloJumpUrlSuccess"},u.origin),!1;{delete e.content_op,delete e.trefoilClick,delete e.reload_in_native;let t=document.getElementById("__acrobatDialog__");t&&(t.remove(),t=null)}}function Se(){const t=e.getItem("userState");let a=!1;if(void 0!==t?.rvu&&(a=!0),!0!==t.rvu){const t={rvu:a};e.setItem("userState",t)}}document.addEventListener("DOMContentLoaded",function(e){const t=(new Date).getTime();let a=window.setInterval((function(){(function(){const e=document.getElementById("dc-view-frame");return e&&e.contentWindow&&1===e.contentWindow.length}()||(new Date).getTime()-t>15e3)&&(window.clearInterval(a),e.call(this))}),200)}((function(){const e=document.getElementById("dc-view-frame");e&&e.contentWindow&&e.contentWindow.focus()}))),void 0!==chrome.runtime&&i.isMimeHandlerAvailable().then((async function(t){if(chrome.runtime.onMessage.addListener(ve),t){if(L=!0,!window.navigator.onLine&&e.getItem("offlineSupportDisable"))return void N();e.getItem("sessionStarted")||(e.setItem("sessionId",n.uuid()),e.setItem("sessionStarted",!0));const t=await i.getStreamInfo()||{};R=new l(t.responseHeaders),E=t.tabId;let a=await M({main_op:"check-is-google-print"});D=a&&a.isGooglePrint,C=await i.caretModeStatus(),i.addCaretModeListener(_e),M({main_op:"viewer-preview",startup_time:Date.now(),viewer:!0},(()=>we(t)))}else O(),(async()=>{try{if(!F(g))return void(p=!1);ae();const t=V("clen")||-1,n=V("chunk")||!1,r="false"!==V("linearization")&&!a.getItem("bufferTabId"),i={url:g},s=(new Date).getTime(),o=new URL(e.getItem("cdnUrl"));f=V("pdffilename")||ne(g),document.title=decodeURIComponent(f),u||(u=o);let c=null;const l=r&&n&&t>0;l&&(c=re(i,{start:0,end:1024}));const d=se(),m=(await d).buffer?d:oe(b,l,o.origin);window.addEventListener("message",pe(b,m,c,s)),setTimeout(he,25e3)}catch(e){Z("InitScript failed",e),N()}})(),be()}))}();