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
import{common as e}from"./common.js";import{util as t}from"./util.js";import{SETTINGS as a}from"./settings.js";import{dcLocalStorage as o}from"../common/local-storage.js";import{floodgate as s}from"./floodgate.js";import{loggingApi as n}from"../common/loggingApi.js";let i;i||(i=new function(){this.updateVariables=function(i){try{let l=0!=i&&1!=i&&-1!=i,r=!(!l||i===a.READER_VER||i===a.ERP_READER_VER);o.setItem("locale",t.getFrictionlessLocale(chrome.i18n.getMessage("@@ui_locale"))),o.setItem("cdnUrl",e.getAcrobatViewerUri()),o.setItem("isDeskTop",l),o.setItem("env",e.getEnv()),o.setItem("viewerImsClientId",e.getViewerIMSClientId()),o.setItem("imsContextId",e.getImsContextId()),o.setItem("viewerImsClientIdSocial",e.getViewerIMSClientIdSocial()),o.setItem("imsURL",e.getIMSurl()),o.setItem("imsLibUrl",e.getImsLibUrl()),o.setItem("dcApiUri",e.getDcApiUri()),o.setItem("isAcrobat",r);let m=[this.checkFeatureEnable({flagName:"dc-cv-modern-viewer",storageKey:"modernViewerEnable"}),this.checkFeatureEnable({flagName:"dc-cv-dark-mode",storageKey:"darkModeEnable"}),this.checkFeatureEnable({flagName:"dc-cv-read-aloud",storageKey:"isReadAloudEnable"}),this.checkFeatureEnable({flagName:"dc-cv-use-old-domain",storageKey:"oldDomainRollback"}),this.checkFeatureEnable({flagName:"dc-cv-save-location-on-options",storageKey:"isSaveLocationPrefEnabled"}),this.checkFeatureEnable({flagName:"dc-cv-enable-splunk-logging",storageKey:"splunkLoggingEnable"}),this.checkFeatureEnable({flagName:"dc-cv-extension-menu",storageKey:"enableNewExtensionMenu"}),this.checkFeatureEnable({flagName:"dc-cv-ext-menu-dark-mode",storageKey:"enableExtMenuDarkMode"})];return navigator.onLine&&m.push(this.checkFeatureEnable({flagName:"dc-cv-offline-support-disable",storageKey:"offlineSupportDisable"})),Promise.all(m).then((([e,a,i,l,r,m,c])=>{if(o.getItem("theme")&&!a?o.removeItem("theme"):a&&!o.getItem("theme")&&o.setItem("theme","auto"),!r&&o.getItem("saveLocation")?o.removeItem("saveLocation"):r&&!o.getItem("saveLocation")&&o.setItem("saveLocation","ask"),n.registerLogInterval(m),m){let e=s.getFeatureMeta("dc-cv-enable-splunk-logging");e=JSON.parse(e),o.setItem("allowedLogIndex",e.index)}t.enableNewExtensionMenu(c)}))}catch(e){}},this.checkFeatureEnable=async function(e){const{flagName:t,storageKey:a}=e,n=await s.hasFlag(t);return a&&o.setItem(a,!!n),n}});export const viewerModuleUtils=i;