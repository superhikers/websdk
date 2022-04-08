!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.jPlayer=t():e.jPlayer=t()}(window,(function(){return function(e){var t={};function i(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(o,r,function(t){return e[t]}.bind(null,r));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t,i){var o,r;o="undefined"!=typeof window?window:this,r=function(e,t){const i={kFileData:1,kInitDecoderReq:0,kUninitDecoderReq:1,kOpenDecoderReq:2,kCloseDecoderReq:3,kFeedDataReq:4,kStartDecodingReq:5,kPauseDecodingReq:6,kInitDecoderRsp:0,kUninitDecoderRsp:1,kOpenDecoderRsp:2,kCloseDecoderRsp:10,kVideoFrame:4,kAudioFrame:5,kDecodeFinishedEvt:8,cmdCallback:11,kGetParamRsp:12,sendDataCallback:13,socketLinkState:14,getHeartBeatRequest:15,DownloaderHeartBeat:16,closeWebsocket:17,fetchStream:18,resetDecoderFifo:19,getSetPlayBackSpeedReq:20,getSetPlayBackStartReq:21,deviceReady:22,getSetPlayBackStartTimeReq:23,responseCurDateTime:24,eventTypeFifoFull:25,eventTypeFifoEnough:26,playbakcRecordList:27,socketActiveClose:28,serverDataTimeout:29,heartPingResp:30,serverDecoderError:31,socketNoActive:32,getHandsharkReq:33,getHandsharkRes:34,onWasmLoaded:35,serverDeviceUnLink:36,errorStrLog:37,bareStream:38};return e.common=i,i},"object"==typeof e.exports?e.exports=o.document?r(o):function(e){if(!e.document)throw new Error("common requires a window with a document");return r(e)}:r(o)},function(e,t,i){var o,r;o="undefined"!=typeof window?window:this,r=function(e,t){function i(e){this.module=e}return i.prototype.log=function(e){},i.prototype.logError=function(e){},i.prototype.logInfo=function(e){},i.prototype.logDebug=function(e){},i.prototype.currentTimeStr=function(){var e=new Date(Date.now());return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+":"+e.getMilliseconds()},e.Logger=i,i},"object"==typeof e.exports?e.exports=o.document?r(o):function(e){if(!e.document)throw new Error("Logger requires a window with a document");return r(e)}:r(o)},function(e,t,i){"use strict";function o(e){this.init(e)}i.r(t),i.d(t,"playerStateIdle",(function(){return E})),i.d(t,"playerStatePlaying",(function(){return y})),i.d(t,"playerStatePausing",(function(){return R})),o.prototype.init=function(e){this.option={encoding:"16bitInt",channels:1,sampleRate:8e3,flushingTime:5e3,...e},this.samples=new Float32Array,this.flush=this.flush.bind(this),this.interval=setInterval(this.flush,this.option.flushingTime),this.volumeNumber=this.option.volumeNumber||0,this.maxValue=this.getMaxValue(),this.TypedArray=this.getTypedArray(),this.createContext()},o.prototype.getMaxValue=function(){var e={"8bitInt":128,"16bitInt":32768,"32bitInt":2147483648,"32bitFloat":1};return e[this.option.encoding]?e[this.option.encoding]:e["16bitInt"]},o.prototype.getTypedArray=function(){var e={"8bitInt":Int8Array,"16bitInt":Int16Array,"32bitInt":Int32Array,"32bitFloat":Float32Array};return e[this.option.encoding]?e[this.option.encoding]:e["16bitInt"]},o.prototype.createContext=function(){this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.gainNode=this.audioCtx.createGain(),this.gainNode.gain.value=this.volumeNumber,this.gainNode.connect(this.audioCtx.destination),this.startTime=this.audioCtx.currentTime},o.prototype.isTypedArray=function(e){return e.byteLength&&e.buffer&&e.buffer.constructor==ArrayBuffer},o.prototype.feed=function(e){if(this.isTypedArray(e)){e=this.getFormatedValue(e);var t=new Float32Array(this.samples.length+e.length);t.set(this.samples,0),t.set(e,this.samples.length),this.samples=t}},o.prototype.getFormatedValue=function(e){e=new this.TypedArray(e.buffer);var t,i=new Float32Array(e.length);for(t=0;t<e.length;t++)i[t]=e[t]/this.maxValue;return i},o.prototype.volume=function(e){this.gainNode.gain.value=e},o.prototype.destroy=function(){this.interval&&clearInterval(this.interval),this.samples=null,this.audioCtx.close(),this.audioCtx=null},o.prototype.createAudioAssembly=function(e){var t,i,o,r,s,n=this.audioCtx.createBufferSource(),a=e.length/this.option.channels,h=this.audioCtx.createBuffer(this.option.channels,a,this.option.sampleRate);for(i=0;i<this.option.channels;i++)for(t=h.getChannelData(i),o=i,s=50,r=0;r<a;r++)t[r]=e[o],r<50&&(t[r]=t[r]*r/50),r>=a-51&&(t[r]=t[r]*s--/50),o+=this.option.channels;this.startTime<this.audioCtx.currentTime&&(this.startTime=this.audioCtx.currentTime),n.buffer=h,n.connect(this.gainNode),n.start(this.startTime),this.startTime+=h.duration},o.prototype.flush=function(){this.samples.length&&(this.createAudioAssembly(this.samples),this.samples=new Float32Array)},o.prototype.getTimestamp=function(){return this.audioCtx?this.audioCtx.currentTime:0},o.prototype.play=function(e){this.isTypedArray(e)&&(e=this.getFormatedValue(e)).length&&this.createAudioAssembly(e)},o.prototype.pause=function(){"running"===this.audioCtx.state&&this.audioCtx.suspend()},o.prototype.resume=function(){"suspended"===this.audioCtx.state&&this.audioCtx.resume()};var r=o;function s(e){this.gl=e,this.texture=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.texture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}function n(e,t){this.canvas=e,this.gl=e.getContext("webgl",t)||e.getContext("experimental-webgl"),this.program=null,this.verticesBuffer=null,this.texCoordBuffer=null,this.initGL(t)}s.prototype.fill=function(e,t,i){var o=this.gl;o.bindTexture(o.TEXTURE_2D,this.texture),o.texImage2D(o.TEXTURE_2D,0,o.LUMINANCE,e,t,0,o.LUMINANCE,o.UNSIGNED_BYTE,i)},n.prototype.initGL=function(e){if(this.gl){var t=this.gl;t.pixelStorei(t.UNPACK_ALIGNMENT,1);var i=t.createProgram();this.program=i;var o=["attribute highp vec4 aVertexPosition;","attribute vec2 aTextureCoord;","varying highp vec2 vTextureCoord;","void main(void) {"," gl_Position = aVertexPosition;"," vTextureCoord = aTextureCoord;","}"].join("\n"),r=t.createShader(t.VERTEX_SHADER);t.shaderSource(r,o),t.compileShader(r);var n=["precision highp float;","varying lowp vec2 vTextureCoord;","uniform sampler2D YTexture;","uniform sampler2D UTexture;","uniform sampler2D VTexture;","const mat4 YUV2RGB = mat4","("," 1.1643828125, 0, 1.59602734375, -.87078515625,"," 1.1643828125, -.39176171875, -.81296875, .52959375,"," 1.1643828125, 2.017234375, 0, -1.081390625,"," 0, 0, 0, 1",");","void main(void) {"," gl_FragColor = vec4( texture2D(YTexture, vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;","}"].join("\n"),a=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(a,n),t.compileShader(a),t.attachShader(i,r),t.attachShader(i,a),t.linkProgram(i),t.deleteShader(r),t.deleteShader(a),t.useProgram(i),t.getProgramParameter(i,t.LINK_STATUS);var h=t.getAttribLocation(i,"aVertexPosition");t.enableVertexAttribArray(h);var l=t.getAttribLocation(i,"aTextureCoord");t.enableVertexAttribArray(l);var c=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,c),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0]),t.STATIC_DRAW),t.vertexAttribPointer(h,3,t.FLOAT,!1,0,0);var u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,0,0,0,1,1,0,1]),t.STATIC_DRAW),t.vertexAttribPointer(l,2,t.FLOAT,!1,0,0),this.verticesBuffer=c,this.texCoordBuffer=u,t.y=new s(t),t.u=new s(t),t.v=new s(t),t.y.bind(0,i,"YTexture"),t.u.bind(1,i,"UTexture"),t.v.bind(2,i,"VTexture")}},n.prototype.renderFrame=function(e,t,i,o,r){if(this.gl){var s=this.gl;s.viewport(0,0,s.canvas.width,s.canvas.height),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT|s.DEPTH_BUFFER_BIT),s.y.fill(t,i,e.subarray(0,o)),s.u.fill(t>>1,i>>1,e.subarray(o,o+r)),s.v.fill(t>>1,i>>1,e.subarray(o+r,e.length)),s.drawArrays(s.TRIANGLE_STRIP,0,4)}},n.prototype.fullscreen=function(){var e=this.canvas;e.RequestFullScreen?e.RequestFullScreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen?e.msRequestFullscreen():alert("This browser doesn't supporter fullscreen")},s.prototype.bind=function(e,t,i){var o=this.gl;o.activeTexture([o.TEXTURE0,o.TEXTURE1,o.TEXTURE2][e]),o.bindTexture(o.TEXTURE_2D,this.texture),o.uniform1i(o.getUniformLocation(t,i),e)},n.prototype.exitfullscreen=function(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen?document.msExitFullscreen():alert("Exit fullscreen doesn't work")},n.prototype.webGLDestroy=function(){var e=this.gl,t=this.program;e.deleteProgram(t);var i=this.verticesBuffer,o=this.texCoordBuffer;e.deleteBuffer(i),e.deleteBuffer(o);var r=e.y.texture,s=e.u.texture,n=e.v.texture;e.deleteTexture(r),e.deleteTexture(s),e.deleteTexture(n),this.canvas=null,this.gl=null};var a=n,h=i(1),l=i.n(h);new l.a("Event").logInfo("Event.js 已加载");class c{constructor(e){this.target={},this.eventsQueue={},this.disallowRepeat=!1}add(e=[],t,i){for(let o of e)this.on(o,t,i)}on(e,t,i){if(void 0===this.eventsQueue[e]&&(this.eventsQueue[e]={methods:[],once:!1}),"function"==typeof t){if(!this.disallowRepeat||!this.eventsQueue[e].methods.includes(t))return this.eventsQueue[e].methods.push(t),void 0!==i&&(this.eventsQueue[e].once=i),this.target}else logger.error("on","the argument is not function.",t)}once(e,t){this.on(e,t,!0)}off(e,t){let i=this.eventsQueue[e];if(!i)return;let o=i.methods;if(t){let e=o.length;for(;e--;)o[e]===t&&o.splice(e,1)}else delete this.eventsQueue[e];return this.target}emit(e,...t){let i=this.eventsQueue[e];if(i)return i.methods.forEach((e=>{e.apply(this.target,t)})),i.once&&this.off(e),this.target}clear(e){delete this.eventsQueue[e]}clearAll(){this.eventsQueue={}}}var u=function(e){const t=new c(e);return e=>(t.target=e,t)};var d=i(0),p=i.n(d);function m(e){if(!e)return;this.canvasContainer=e,e.style.position="relative";const t=parseInt(getComputedStyle(e).width),i=parseInt(getComputedStyle(e).height);this.conW=t,this.conH=i;const o=document.createElement("canvas");o.width=t,o.height=i,o.style.cssText="transform: scale(1);transform-origin: 0 0;",o.setAttribute("class","videoCanvas"),this.msg="链接已断开";const r=document.createElement("div");r.style.cssText="position: absolute;z-index: 2;background-color: rgba(0, 0, 0, 0);margin: 0;top: 0;right: 0;bottom: 0;left: 0;",e.appendChild(o),r.setAttribute("class","videoCanvasMsg"),e.appendChild(r);this.container_el=e,this.canvas=o,this.stateContainer_el=r,this.loading_el_str='<div style="top: 50%;margin-top: -21px;width: 100%;text-align: center;position: absolute;"><svg t="1607391066926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1837" width="20" height="20"><path d="M512 64q14.016 0 23.008 8.992T544 96v192q0 14.016-8.992 23.008T512 320t-23.008-8.992T480 288V96q0-14.016 8.992-23.008T512 64z m0 640q14.016 0 23.008 8.992T544 736v192q0 14.016-8.992 23.008T512 960t-23.008-8.992T480 928v-192q0-14.016 8.992-23.008T512 704z m448-192q0 14.016-8.992 23.008T928 544h-192q-14.016 0-23.008-8.992T704 512t8.992-23.008T736 480h192q14.016 0 23.008 8.992T960 512z m-640 0q0 14.016-8.992 23.008T288 544H96q-14.016 0-23.008-8.992T64 512t8.992-23.008T96 480h192q14.016 0 23.008 8.992T320 512zM195.008 195.008q10.016-8.992 23.008-8.992t22.016 8.992l136 136q8.992 10.016 8.992 22.496t-9.504 22.016-22.016 9.504-22.496-8.992l-136-136q-8.992-8.992-8.992-22.016t8.992-23.008zM648 648q10.016-10.016 22.496-10.016t22.496 10.016l136 136q8.992 8.992 8.992 22.016t-9.504 22.496-22.496 9.504-22.016-8.992l-136-136q-10.016-10.016-10.016-22.496t10.016-22.496z m180.992-452.992q8.992 10.016 8.992 23.008t-8.992 22.016l-136 136q-10.016 8.992-22.496 8.992t-22.016-9.504-9.504-22.016 8.992-22.496l136-136q8.992-8.992 22.016-8.992t23.008 8.992zM376 648q10.016 10.016 10.016 22.496t-10.016 22.496l-136 136q-8.992 8.992-22.016 8.992t-22.496-9.504-9.504-22.496 8.992-22.016l136-136q10.016-10.016 22.496-10.016t22.496 10.016z" p-id="1838" fill="#409EFF"></path></svg><p style="color: #409EFF;margin: 3px 0;font-size: 14px;">视频拼命加载中...</p></div>',this.pauseimg_el_str='<div id="iconPlay" style="width: 120px;height: 120px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);" class="iconPlay"><svg t="1606101743943" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2807" width="120" height="120"><path d="M195.68 960c-14.19 0-28.37-3.73-41.31-11.2-25.86-14.93-41.3-41.68-41.3-71.54V146.74c0-29.86 15.44-56.61 41.3-71.54s56.74-14.94 82.6 0l632.66 365.27c25.86 14.93 41.3 41.66 41.3 71.52 0.01 29.87-15.43 56.61-41.3 71.54L236.97 948.8c-12.93 7.47-27.12 11.2-41.29 11.2z m0.13-840.9c-6.35 0-11.39 2.33-13.91 3.78-4.13 2.39-13.77 9.5-13.77 23.85v730.53c0 14.34 9.63 21.46 13.77 23.85 4.14 2.39 15.1 7.17 27.53 0L842.1 535.85c12.43-7.18 13.77-19.07 13.77-23.85 0-4.78-1.34-16.67-13.77-23.84L209.44 122.89c-4.88-2.81-9.53-3.79-13.63-3.79z m660.05 440.59h0.14-0.14z" fill="#333333" p-id="2808"></path></svg></div>',this.msg_el_str="",this.stateContainer_el.innerHTML=""}m.prototype._showOrHideShade=function(e){this.stateContainer_el.style.backgroundColor=e},m.prototype.showPauseIcon=function(){this._showOrHideShade("rgba(0,0,0,0)"),this.stateContainer_el.innerHTML=this.pauseimg_el_str},m.prototype.showLoading=function(){this._showOrHideShade("rgba(0,0,0,0)")},m.prototype.showMsg=function(e){this._showOrHideShade("rgba(0,0,0,0)")},m.prototype.hideAll=function(){this._showOrHideShade("rgba(0,0,0,0)"),this.msg="",this.stateContainer_el.innerHTML=""};var f=m;var g={4:{code:4,code16:4,eventStr:"SERVER_UNKNOWN_ERROR",msg:"服务器未知错误"},5:{code:5,code16:5,eventStr:"SERVER_NOT_READY",msg:"服务器未准备好"},6:{code:6,code16:6,eventStr:"SERVER_USER_ABORT",msg:"服务器端用户主动断开"},7:{code:7,code16:7,eventStr:"SERVER_STOPPED",msg:"服务器服务已停止"},8:{code:8,code16:8,eventStr:"SERVER_ABORT",msg:"服务器服务已中断"},9:{code:9,code16:9,eventStr:"SERVER_STREAM_STOP",msg:"服务器流停止"},10:{code:10,code16:10,eventStr:"SERVER_CONNECT_DEV_FAILED",msg:"连接设备失败"},11:{code:11,code16:11,eventStr:"SERVER_SUBDEV_STREAM_ERR",msg:"订阅设备流失败"},12:{code:12,code16:12,eventStr:"SERVER_INVALID_CONTEXT",msg:"不合法的上下文"},13:{code:13,code16:13,eventStr:"SERVER_DEVICE_TIMEOUT",msg:"设备超时"},14:{code:14,code16:14,eventStr:"SERVER_CLIENT_TIMEOUT",msg:"客户端超时"},15:{code:15,code16:15,eventStr:"SERVER_OVER_DEV_LIMIT",msg:"超过设备最大连接数"},16:{code:16,code16:16,eventStr:"SERVER_PERM_DENIED",msg:"无权限"},17:{code:17,code16:17,eventStr:"SERVER_DATA_TIMEOUT",msg:"数据超时"},18:{code:18,code16:18,eventStr:"SERVER_DEVICE_ABORT",msg:"服务器端设备主动断开"}};const E=0,y=1,R=2;function v(e){this.url=e.url,this.endtime=e.endtime,this.isStream=e.isStream,this.k=e.encrypted_key,this.i=e.encrypted_iv,this.ct=e.encrypted_type,this.streamHighWaterFrame=e.streamHighWaterFrame?e.streamHighWaterFrame:25,this.playbackHighWaterFrame=e.playbackHighWaterFrame?e.playbackHighWaterFrame:25,this.playbackLowWaterFrame=e.playbackLowWaterFrame?e.playbackLowWaterFrame:10}function S(e){var t;this.version="1.1.3.20210715",this.el=e,this.observer=null,this.event=u(this)(),(t=this.event).on("SERVER_UNKNOWN_ERROR",(e=>{t.emit("UNKNOWN_ERROR",e)})),t.on("SERVER_NOT_READY",(e=>{t.emit("NOT_READY",e)})),t.on("SERVER_USER_ABORT",(e=>{t.emit("USER_ABORT",e)})),t.on("SERVER_STOPPED",(e=>{t.emit("STOPPED",e)})),t.on("SERVER_ABORT",(e=>{t.emit("ABORT",e)})),t.on("SERVER_STREAM_STOP",(e=>{t.emit("STREAM_STOP",e)})),t.on("SERVER_CONNECT_DEV_FAILED",(e=>{t.emit("CONNECT_DEV_FAILED",e)})),t.on("SERVER_SUBDEV_STREAM_ERR",(e=>{t.emit("SUBDEV_STREAM_ERR",e)})),t.on("SERVER_INVALID_CONTEXT",(e=>{t.emit("INVALID_CONTEXT",e)})),t.on("SERVER_DEVICE_TIMEOUT",(e=>{t.emit("DEVICE_TIMEOUT",e)})),t.on("SERVER_CLIENT_TIMEOUT",(e=>{t.emit("CLIENT_TIMEOUT",e)})),t.on("SERVER_OVER_DEV_LIMIT",(e=>{t.emit("OVER_DEV_LIMIT",e)})),t.on("SERVER_PERM_DENIED",(e=>{t.emit("PERM_DENIED",e)})),t.on("SERVER_DATA_TIMEOUT",(e=>{t.emit("DATA_TIMEOUT",e)})),t.on("SERVER_DEVICE_ABORT",(e=>{t.emit("DEVICE_ABORT",e)})),t.on("CLIENT_lINK_ERROR_ONE",(e=>{t.emit("CLIENT_LINK_ERROR",e)})),t.on("CLIENT_lINK_ERROR_THREE",(e=>{t.emit("CLIENT_LINK_ERROR_THREE",e)})),t.on("MEDIA_ERROR",(e=>{t.emit("GET_MEDIA_ERROR",e)})),t.on("MEDIA_PROGRESS_INFO",(e=>{t.emit("GET_MEDIA_PROGRESS_INFO",e)})),t.on("DEVICE_RECORD_LIST",(e=>{t.emit("GET_DEVICE_RECORD_LIST",e)})),t.on("MEDIA_PLAY",(()=>{t.emit("GET_MEDIA_PLAY")})),t.on("MEDIA_PAUSE",(()=>{t.emit("GET_MEDIA_PAUSE")})),t.on("MEDIA_STOP",(()=>{t.emit("GET_MEDIA_STOP")})),t.on("MEDIA_INFO",(e=>{t.emit("GET_MEDIA_INFO",e)})),t.on("MEDIA_BARE_STREAM",(e=>{t.emit("GET_MEDIA_BARE_STREAM",e)})),this.configInfo=null,this.pcmPlayer=null,this.canvas=null,this.webglPlayer=null,this.frameRate=0,this.pixFmt=0,this.videoWidth=0,this.videoHeight=0,this.yLength=0,this.uvLength=0,this.playerState=E,this.socketSending=!1,this.decoding=!1,this.currentTimestamp="",this.audioEncoding="",this.audioChannels=0,this.audioSampleRate=0,this.sampleFmt=0,this.speedNum=2,this.setFrameRate=1,this.seeking=!1,this.loadingDiv=null,this.loadingState=!0,this.buffering=!1,this.frameBuffer=[],this.isStream=!1,this.logger=new l.a("Player"),this.drawingState=!1,this.speeding=!1,this.playInitState=!0,this.playFirstGetParams=!0,this.requestAnimationFrame=null,this.serverDeviceUnLinkCode=null,this.decoderErrorFlag=!1,this.endtime=null,this.isBareStream=1,this.volumeNumber=1;const i=new f(e);this.showPauseIcon=()=>{i.showPauseIcon()},this.showLoading=()=>{i.showLoading()},this.showMsg=e=>{i.showMsg(e)},this.hideAll=()=>{i.hideAll()},this._msgController=i;this.observer=new MutationObserver((e=>{if(this.videoHeight&&this.videoWidth&&this._msgController){let e=Math.ceil(1e5*parseInt(getComputedStyle(this.el).width)/this.videoWidth)/1e5,t=Math.ceil(1e5*parseInt(getComputedStyle(this.el).height)/this.videoHeight)/1e5;this.canvas.style.cssText=`transform: scale(${e},${t});transform-origin: 0 0;`}})),this.observer.observe(this._msgController.canvasContainer,{attributes:!0})}S.prototype.initDownloadWorker=function(e){var t=this;this.downloadWorker=new Worker(e+"downloader.worker.js"),this.downloadWorker.onmessage=function(e){var i=e.data;switch(i.t){case p.a.kFileData:t.onFileData(i.d);break;case p.a.socketActiveClose:t.onsocketActiveClose(i.d,i.w);break;case p.a.socketNoActive:t.onsocketNoActive()}}},S.prototype.initDecodeWorker=function(e){var t=this;this.decodeWorker=new Worker(e+"decoder.worker.js",{name:e}),this.decodeWorker.onmessage=function(e){var i=e.data;const o={[p.a.kInitDecoderRsp]:"onInitDecoder",[p.a.kOpenDecoderRsp]:"onOpenDecoder",[p.a.kVideoFrame]:"onVideoFrame",[p.a.kAudioFrame]:"onAudioFrame",[p.a.kDecodeFinishedEvt]:"onDecodeFinished",[p.a.sendDataCallback]:"onSendDataCallback",[p.a.kGetParamRsp]:"onGetParam",[p.a.socketLinkState]:"onSocketLinkState",[p.a.getHeartBeatRequest]:"onGetHeartBeatRequest",[p.a.getSetPlayBackSpeedReq]:"onGetSetPlayBackSpeedReq",[p.a.getSetPlayBackStartReq]:"onGetSetPlayBackStartReq",[p.a.deviceReady]:"onDeviceReady",[p.a.getSetPlayBackStartTimeReq]:"onGetSetPlayBackStartTimeReq",[p.a.responseCurDateTime]:"onResponseCurDateTime",[p.a.eventTypeFifoFull]:"onEventTypeFifoFull",[p.a.eventTypeFifoEnough]:"onEventTypeFifoEnough",[p.a.playbakcRecordList]:"onPlaybakcRecordList",[p.a.serverDataTimeout]:"onServerDataTimeout",[p.a.serverDecoderError]:"onDecoderError",[p.a.heartPingResp]:"onHeartPingResp",[p.a.getHandsharkRes]:"onGetHandsharkRes",[p.a.kCloseDecoderRsp]:"onCloseDecoderRsp",[p.a.onWasmLoaded]:"onWasmLoaded",[p.a.serverDeviceUnLink]:"onserverDeviceUnLink",[p.a.errorStrLog]:"onErrorCodeLog",[p.a.bareStream]:"onBareStream"};o[i.t]&&t[o[i.t]](i)}},S.prototype.onErrorCodeLog=function(e){this.event.emit("onErrorCodeLog",e)},S.prototype.onserverDeviceUnLink=function(e){this.event.emit("onErrorCodeLog",e.s),this.serverDeviceUnLinkCode=e.s},S.prototype.play=function(e){this.frameBuffer.length=0,this.frameBuffer=[];let{url:t,endtime:i,isStream:o,i:r,k:s,t:n,isBareStream:h,prefixPath:l}=e;l||(l="/"),this.isBareStream=h||0===h?h:1;let c={e:0,m:"Success"},u=this;{if(this.playerState==R)return c=this.resume(),c;if(this.playerState==y)return c;if(!t)return c={e:-1,m:"Invalid url"},this.logger.logError("[ER] playVideo error, url empty."),c;if(!o&&!i)return c={e:-1,m:"Invalid endtime"},this.logger.logError("[ER] playVideo error, endtime empty."),c;if(!("AES-256-GCM"!=n||r&&s))return c={e:-1,m:"Invalid params"},this.logger.logError("[ER] playVideo error, params empty."),c;this.initDownloadWorker(l),this.initDecodeWorker(l),this.canvas=this._msgController.canvas,this.configInfo=new v(e),this.playerState=y,this.isStream=o,this.endtime=i,this.webglPlayer=new a(this.canvas,{preserveDrawingBuffer:!0,antialias:!0}),this.displayLoop();const h={t:p.a.kInitDecoderReq,s:this.isStream?0:1,c:4194304,k:this.configInfo.k,i:this.configInfo.i,ct:this.configInfo.ct};this.decodeWorker.postMessage(h);let d=!1;this.registerVisibilityEvent((function(e){e&&u.playerState==y?u.isStream?1==d&&(u.pcmPlayer&&u.pcmPlayer.resume(),u.decodeWorker.postMessage({t:p.a.resetDecoderFifo}),u.startDecoding(),d=!1):1==d&&(u.resume(),d=!1):u.isStream&&u.playerState==y?(d=!0,u.pcmPlayer&&u.pcmPlayer.pause(),u.pauseDecoding()):u.playerState==y&&(u.pause(),d=!0)})),this.buffering=!0,this.loadingState=!0,this.hideAll(),this.event.emit("MEDIA_PLAY")}return c},S.prototype.seekTo=function(e){let t={e:-1,m:"Parameter Null."};if(!e)return this.logger.logError("[ER] seekTo error, time empty."),t;if(this.playerState!=y)return t.m="Player Is NotPlaying",t;this.seeking=!0,this.speeding=!1,this.pauseDecoding(),this.decodeWorker.postMessage({t:p.a.resetDecoderFifo}),this.frameBuffer.length=0;const i={t:p.a.getSetPlayBackStartTimeReq,s:e};return this.decodeWorker.postMessage(i),t.e=0,t.m="SeekTo Success.",t},S.prototype.setSpeed=function(e){let t={e:-1,m:"Parameter Null."};if(!e)return this.logger.logError("[ER] seekTo error, time empty."),t;if(["0","0.125","0.25","0.5","1","2","4","8"].findIndex((t=>t==e))>-1){this.speed(e),this.event.emit("speedNum",e);const i=parseFloat(e);return i>1&&(this.speeding=!0,this.setFrameRate=this.setFrameRateFn(),this.speedNum=2*i,this.restartAudio()),i>0&&i<1&&(this.speeding=!0,this.speedNum=2,0!=this.frameRate&&(this.setFrameRate=Math.floor(this.setFrameRateFn()/i)),this.restartAudio()),1!=i&&0!=i||(this.speeding=!1,this.speedNum=2,this.setFrameRate=this.setFrameRateFn()),t.e=0,t.m="SetSpeed Success.",t}return t.m="Invalid Parameter.",t},S.prototype.pause=function(){let e={e:-1,m:"Not playing"};if(!this.isStream)return this.playerState!=y||(this.playerState=R,this.pcmPlayer&&this.pcmPlayer.pause(),this.setSpeed("0"),this.pauseDecoding(),this.showPauseIcon(),this.event.emit("MEDIA_PAUSE"),e.e=0,e.m="Pause Success."),e},S.prototype.resume=function(){this.logger.logInfo("Resume.");let e={e:-1,m:"Not pausing"};return this.playerState!=R||(this.playerState=y,this.pcmPlayer&&this.pcmPlayer.resume(),this.startDecoding(),this.setSpeed("1"),this.hideAll(),this.event.emit("MEDIA_PLAY"),e.e=0,e.m="Resume Success."),e},S.prototype.stop=function(){this.logger.logInfo("Stop.");let e={e:-1,m:"Not playing."};return this.playerState==E||(this.playerState=E,this.configInfo=null,this.resetPlayer(),e.e=0,e.m="Stop Success."),e},S.prototype.resetPlayer=function(){this.closeWebsocket(),(window.cancelAnimationFrame||window.mozCancelAnimationFrame)(this.requestAnimationFrame),this.webglPlayer.webGLDestroy(),this.loadingState=!1,this.canvas=null,this.webglPlayer=null,this.frameRate=0,this.pixFmt=0,this.videoWidth=0,this.videoHeight=0,this.yLength=0,this.uvLength=0,this.audioEncoding="",this.audioChannels=0,this.audioSampleRate=0,this.sampleFmt=0,this.speedNum=2,this.setFrameRate=1,this.playerState=E,this.socketSending=!1,this.decoding=!1,this.currentTimestamp="",this.frameBuffer.length=0,this.frameBuffer=[],this.buffering=!1,this.drawingState=!1,this.speeding=!1,this.playInitState=!0,this.playFirstGetParams=!0,this.requestAnimationFrame=null,this.endtime=null,this.pcmPlayer&&(this.pcmPlayer.destroy(),this.pcmPlayer=null,this.logger.logInfo("Pcm player released.")),this.logger.logInfo("Closing decoder."),this.decodeWorker.postMessage({t:p.a.kUninitDecoderReq}),this.logger.logInfo("Uniniting decoder."),this.observer=null},S.prototype.reconnection=function(){const e={url:this.configInfo.url,endtime:this.configInfo.endtime,isStream:this.configInfo.isStream,k:this.configInfo.k,i:this.configInfo.i,ct:this.configInfo.ct,streamHighWaterFrame:this.configInfo.streamHighWaterFrame,playbackHighWaterFrame:this.configInfo.playbackHighWaterFrame,playbackLowWaterFrame:this.configInfo.playbackLowWaterFrame};this.play(e)},S.prototype.getCurTimestamp=function(){return this.currentTimestamp},S.prototype.fullscreen=function(){this.webglPlayer&&this.webglPlayer.fullscreen()},S.prototype.getState=function(){return this.playerState},S.prototype.volume=function(e){let t={e:-1,m:"Parameter Null"};return null===e||(null!==this.pcmPlayer&&this.pcmPlayer.volume(e),this.volumeNumber=e,t.e=0,t.m="Set Volume Success."),t},S.prototype.setFrameRateFn=function(){return 1},S.prototype.displayLoop=function(){if(this.playerState!=E){let e=window.requestAnimationFrame||window.mozRequestAnimationFrame;this.requestAnimationFrame=e(this.displayLoop.bind(this))}if(this.playerState==y&&0!=this.frameBuffer.length&&!this.buffering){var e;this.loadingState=!1;for(let t=0;t<this.speedNum;++t){switch((e=this.frameBuffer[0]).t){case p.a.kAudioFrame:this.displayAudioFrame(e)&&this.frameBuffer.shift();break;case p.a.kVideoFrame:this.displayVideoFrame(e)&&this.frameBuffer.shift();break;default:return}if(0==this.frameBuffer.length)break}!this.isStream&&this.frameBuffer.length>=this.configInfo.playbackHighWaterFrame&&this.socketSending&&this.speed("0"),!this.isStream&&this.frameBuffer.length<this.configInfo.playbackLowWaterFrame&&(this.socketSending||this.speed("1")),this.isStream&&this.frameBuffer.length>=this.configInfo.streamHighWaterFrame&&(this.frameBuffer=[])}},S.prototype.displayAudioFrame=function(e){return this.playerState==y&&(this.speeding||(this.seeking&&(this.restartAudio(),this.loadingState=!1,this.seeking=!1),this.pcmPlayer&&this.pcmPlayer.feed(e.d)),!0)},S.prototype.displayVideoFrame=function(e){if(this.playerState!=y)return!1;if(this.seeking&&(this.restartAudio(),this.loadingState=!1,this.seeking=!1),this.drawingState){this.canvas.toBlob((t=>{e(t,`screencapture-${this.canvas.width}x${this.canvas.height}.png`)})),this.drawingState=!1;const e=function(){const e=document.createElement("a");return document.body.appendChild(e),e.style.display="none",function(t,i){const o=window.URL.createObjectURL(t);e.href=o,e.download=i,e.click()}}()}var t=e.d;return this.renderVideoFrame(t),!0},S.prototype.renderVideoFrame=function(e){this.webglPlayer.renderFrame(e,this.videoWidth,this.videoHeight,this.yLength,this.uvLength)},S.prototype.onFileData=function(e){var t;this.playerState==y&&(t={t:p.a.kFeedDataReq,d:e},this.decodeWorker.postMessage(t,[t.d]))},S.prototype.onsocketActiveClose=function(e,t){this.serverDataTimeout?(this.serverDataTimeout=!1,this.decoderErrorFlag&&(this.event.emit("CLIENT_lINK_ERROR_ONE"),this.logger.logError("[ER] 数据接收超时(0x"+this.serverDeviceUnLinkCode.toString(16)+")"),this.decoderErrorFlag=!1)):this.socketNoActive?(this.event.emit("CLIENT_lINK_ERROR_THREE"),this.logger.logError("[ER] 视频加载失败，请检查设备或网络配置!."),this.socketNoActive=!1):1005==e||1e3==e||t?(this.logger.logInfo("[success] 链接已断开."),this.decoderErrorFlag&&(this.event.emit("CLIENT_lINK_ERROR_ONE"),this.logger.logError("[ER] 数据接收超时(0x"+this.serverDeviceUnLinkCode.toString(16)+")"),this.decoderErrorFlag=!1)):this.serverDeviceUnLinkCode?(this.event.emit("CLIENT_lINK_ERROR_ONE"),this.logger.logError("[ER] 数据接收超时(0x"+this.serverDeviceUnLinkCode.toString(16)+")")):(this.event.emit("CLIENT_lINK_ERROR_ONE"),this.logger.logError("[ER] 链接异常 ("+e+")")),this.stop()},S.prototype.onsocketNoActive=function(){this.stop(),this.socketNoActive=!0},S.prototype.onInitDecoder=function(e){if(this.playerState!=E)if(this.logger.logInfo("Init decoder response "+e.e+"."),0==e.e){const e={t:p.a.fetchStream,url:this.configInfo.url,msg:"start"};this.downloadWorker.postMessage(e),this.socketSending=!0,this.showLoading()}else this.reportPlayError(e.e)},S.prototype.onSendDataCallback=function(){const e={t:p.a.kOpenDecoderReq,isBareStream:this.isBareStream};this.decodeWorker.postMessage(e)},S.prototype.onOpenDecoder=function(e){this.startDecoding()},S.prototype.startDecoding=function(){var e={t:p.a.kStartDecodingReq,i:5};this.decodeWorker.postMessage(e),this.decoding=!0},S.prototype.onGetParam=function(e){if(this.playerState!=E&&this.playerState!=R)if(0==e.e){if(!this.playFirstGetParams&&("video"==e.type&&(this.frameRate!=e.v.d||this.pixFmt!=e.v.p||this.videoWidth!=e.v.w||this.videoHeight!=e.v.h)||"audio"==e.type&&(this.audioChannels!=e.a.c||this.audioSampleRate!=e.a.r||this.sampleFmt!=e.a.f)))return this.resetPlayer(),void setTimeout((()=>{this.reconnection()}),1e3);"audio"==e.type?this.onAudioParam(e.a):this.onVideoParam(e.v),this.decoding=!0,this.buffering=!1,this.loadingState=!1,this.hideAll(),this.event.emit("MEDIA_INFO",e)}else this.reportPlayError(e.e)},S.prototype.onVideoParam=function(e){if(this.playerState==E)return;this.logger.logInfo("Video param duation:"+e.d+" pixFmt:"+e.p+" width:"+e.w+" height:"+e.h+"."),this.frameRate=e.d,this.pixFmt=e.p,this.canvas.width=e.w,this.canvas.height=e.h;let t=Math.ceil(1e5*this._msgController.conW/e.w)/1e5,i=Math.ceil(1e5*this._msgController.conH/e.h)/1e5;this.canvas.style.cssText=`transform: scale(${t},${i});transform-origin: 0 0;`,this.videoWidth=e.w,this.videoHeight=e.h,this.yLength=this.videoWidth*this.videoHeight,this.uvLength=this.videoWidth/2*(this.videoHeight/2)},S.prototype.onAudioParam=function(e){if(this.playerState!=E&&(this.logger.logInfo("Audio param sampleFmt:"+e.f+" channels:"+e.c+" sampleRate:"+e.r+"."),0!=e.r&&0!=e.c)){var t=e.f;this.sampleFmt=e.f;var i=e.c,o=e.r,s="16bitInt";switch(t){case 0:s="8bitInt";break;case 1:s="16bitInt";break;case 2:s="32bitInt";break;case 3:s="32bitFloat";break;default:this.logger.logError("Unsupported audio sampleFmt "+t+"!")}this.logger.logInfo("Audio encoding "+s+"."),this.playInitState&&(this.pcmPlayer=new r({encoding:s,channels:i,sampleRate:o,flushingTime:1e3,volumeNumber:this.volumeNumber}),this.audioEncoding=s,this.audioChannels=i,this.audioSampleRate=o,this.playInitState=!1)}},S.prototype.onAudioFrame=function(e){this.bufferFrame(e)},S.prototype.onVideoFrame=function(e){if(this.frameBuffer.filter((e=>4==e.t)).length>5){let e=this.frameBuffer.filter((e=>5==e.t));this.frameBuffer=e}this.bufferFrame(e)},S.prototype.bufferFrame=function(e){this.frameBuffer.push(e),this.getBufferTimerLength()>=500&&this.buffering&&(this.buffering=!1,this.loadingState=!1)},S.prototype.onSocketLinkState=function(e){var t;switch(this.logger.logInfo("Open socket response "+e.s+"."),e.s){case 1:t={t:p.a.getHeartBeatRequest},this.decodeWorker.postMessage(t);break;case 2:case 3:this.stop()}},S.prototype.onGetHeartBeatRequest=function(e){const t={t:p.a.DownloaderHeartBeat,b:e.b,l:e.l};this.downloadWorker.postMessage(t)},S.prototype.onGetSetPlayBackSpeedReq=function(e){const t={t:p.a.getSetPlayBackSpeedReq,b:e.b};this.downloadWorker.postMessage(t)},S.prototype.onGetSetPlayBackStartReq=function(e){const t={t:p.a.getSetPlayBackStartReq,b:e.b};this.downloadWorker.postMessage(t)},S.prototype.onDeviceReady=function(){const e={t:p.a.getSetPlayBackStartReq};this.decodeWorker.postMessage(e)},S.prototype.onGetSetPlayBackStartTimeReq=function(e){this.startDecoding();const t={t:p.a.getSetPlayBackStartTimeReq,b:e.b};this.downloadWorker.postMessage(t)},S.prototype.onResponseCurDateTime=function(e){this.currentTimestamp=e.d;const t=new Date(this.endtime).getTime();parseInt(e.d)>t&&this.stop(),this.event.emit("MEDIA_PROGRESS_INFO",parseInt(e.d))},S.prototype.onEventTypeFifoFull=function(e){this.playerState==y&&this.speed("0")},S.prototype.onEventTypeFifoEnough=function(e){this.playerState==y&&this.speed("1")},S.prototype.onPlaybakcRecordList=function(e){let t=JSON.parse(e.d);t.rec_file_infos?this.isStream||this.event.emit("DEVICE_RECORD_LIST",t):this.showMsg("数据列表为空！")},S.prototype.onServerDataTimeout=function(e){this.serverDataTimeout=!0,this.stop()},S.prototype.onHeartPingResp=function(){const e={t:p.a.heartPingResp};this.downloadWorker.postMessage(e)},S.prototype.onGetHandsharkRes=function(e){const t=window.btoa(String.fromCharCode(...e.b)),i={t:p.a.fetchStream,url:this.configInfo.url+"&public_key="+t,msg:"start"};this.downloadWorker.postMessage(i),this.socketSending=!0,this.showLoading()},S.prototype.onCloseDecoderRsp=function(){this.event.emit("MEDIA_STOP"),this.decodeWorker.terminate(),this.downloadWorker.terminate()},S.prototype.onWasmLoaded=function(){this.event.emit("WASMLOADED")},S.prototype.onDecoderError=function(e){this.serverDeviceUnLinkCode=e.s,g[e.s]&&g[e.s].eventStr&&(this.event.emit(g[e.s].eventStr,g[e.s]),this.stop(),this.decoderErrorFlag=!0)},S.prototype.speed=function(e){if(!e)return;this.socketSending="0"!=e;const t={t:p.a.getSetPlayBackSpeedReq,l:e};this.decodeWorker.postMessage(t)},S.prototype.restartAudio=function(){this.pcmPlayer&&(this.pcmPlayer.destroy(),this.pcmPlayer=null),0!=this.audioSampleRate&&0!=this.audioChannels&&(this.pcmPlayer=new r({encoding:this.audioEncoding,channels:this.audioChannels,sampleRate:this.audioSampleRate,flushingTime:1e3,volumeNumber:this.volumeNumber}))},S.prototype.onDecodeFinished=function(e){this.pauseDecoding()},S.prototype.getBufferTimerLength=function(){if(!this.frameBuffer||0==this.frameBuffer.length)return 0;let e=this.frameBuffer[0],t=this.frameBuffer[this.frameBuffer.length-1];return Math.abs(t.s-e.s)},S.prototype.closeWebsocket=function(){const e={t:p.a.closeWebsocket};this.downloadWorker.postMessage(e)},S.prototype.pauseDecoding=function(){var e={t:p.a.kPauseDecodingReq};this.decodeWorker.postMessage(e),this.decoding=!1},S.prototype.formatTime=function(e){return(Math.floor(e/3600)<10?"0"+Math.floor(e/3600):Math.floor(e/3600))+":"+(Math.floor(e/60%60)<10?"0"+Math.floor(e/60%60):Math.floor(e/60%60))+":"+(e=Math.floor(e%60)<10?"0"+Math.floor(e%60):Math.floor(e%60))},S.prototype.reportPlayError=function(e,t,i){},S.prototype.registerVisibilityEvent=function(e){var t="hidden";function i(i){var o=!0,r=!1,s={focus:o,focusin:o,pageshow:o,blur:r,focusout:r,pagehide:r},n=o;n=(i=i||window.event).type in s?s[i.type]:document[t]?r:o,e(n)}t in document?document.addEventListener("visibilitychange",i):(t="mozHidden")in document?document.addEventListener("mozvisibilitychange",i):(t="webkitHidden")in document?document.addEventListener("webkitvisibilitychange",i):(t="msHidden")in document?document.addEventListener("msvisibilitychange",i):"onfocusin"in document?document.onfocusin=document.onfocusout=i:window.onpageshow=window.onpagehide=window.onfocus=window.onblur=i,void 0!==document[t]&&i({type:document[t]?"blur":"focus"})},S.prototype.snapshot=function(){this.drawingState=!0},S.prototype.getVersion=function(){return"1.1.3.20210715"},S.prototype.onBareStream=function(e){this.event.emit("MEDIA_BARE_STREAM",e)};t.default=S}])}));