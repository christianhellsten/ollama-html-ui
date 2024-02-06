// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3pyWu":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "2751c5c64de9b498";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"4pp4s":[function(require,module,exports) {
var _appJs = require("./App.js");
var _chatJs = require("./models/Chat.js");
var _chatMessageJs = require("./models/ChatMessage.js");
// TODO: refactor
async function initialize() {
    await (0, _chatJs.Chat).initialize();
    await (0, _chatMessageJs.ChatMessage).initialize();
}
initialize().then(()=>{
    (0, _appJs.App).run();
});

},{"./App.js":"7e9X2","./models/Chat.js":"7uLfP","./models/ChatMessage.js":"bRKed"}],"7e9X2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// TODO: Review and refactor
parcelHelpers.export(exports, "App", ()=>App);
var _uinotificationJs = require("./UINotification.js");
var _settingsJs = require("./models/Settings.js");
var _eventJs = require("./Event.js");
var _domJs = require("./Dom.js");
var _sidebarJs = require("./Sidebar.js");
var _appControllerJs = require("./AppController.js");
var _copyButtonJs = require("./CopyButton.js");
var _ollamaApiJs = require("./OllamaApi.js");
// import { OpenAiApi } from './OpenAiApi.js';
var _downloadButtonJs = require("./DownloadButton.js");
var _dropDownMenuJs = require("./DropDownMenu.js");
var _settingsDialogJs = require("./SettingsDialog.js");
var _chatSettingsDialogJs = require("./ChatSettingsDialog.js");
// import { MarkdownFormatter } from './MarkdownFormatter.js'
var _chatAreaJs = require("./ChatArea.js");
class App {
    static run() {
        (0, _uinotificationJs.UINotification).initialize();
        const app = new App();
        return app;
    }
    constructor(){
        this.sidebar = new (0, _sidebarJs.Sidebar)();
        this.chatArea = new (0, _chatAreaJs.ChatArea)();
        this.api = new (0, _ollamaApiJs.OllamaApi)();
        // this.api = new OpenAiApi();
        this.settingsDialog = new (0, _settingsDialogJs.SettingsDialog)({
            domId: "settings-dialog",
            buttonId: "settings-button",
            title: "Global settings",
            templateId: "settings-dialog-template"
        });
        this.chatSettingsDialog = new (0, _chatSettingsDialogJs.ChatSettingsDialog)({
            domId: "chat-settings-dialog",
            buttonId: "chat-settings-button",
            title: "Chat settings",
            templateId: "settings-dialog-template"
        });
        this.downloadButton = new (0, _downloadButtonJs.DownloadButton)();
        this.copyButton = new (0, _copyButtonJs.CopyButton)();
        this.dropDownMenu = new (0, _dropDownMenuJs.DropDownMenu)();
        this.initializeElements();
        this.bindEventListeners();
        this.logInitialization();
    }
    initializeElements() {
        // this.sendButton = document.getElementById('send-button');
        this.abortButton = document.getElementById("abort-button");
        this.messageInput = document.getElementById("message-input");
        this.chatHistory = document.getElementById("chat-history");
    }
    logInitialization() {
        const msg = `~~~~\nChat\n~~~~
Model:       ${(0, _settingsJs.Settings).getModel()}
URL:         ${(0, _settingsJs.Settings).getUrl()}
Chat:        ${(0, _settingsJs.Settings).getCurrentChatId()}
Parameters:  ${JSON.stringify((0, _settingsJs.Settings).getModelParameters())}
`;
        console.log(msg);
    }
    bindEventListeners() {
        (0, _eventJs.Event).listen("chatSelected", this.handleChatSelected);
        // this.sendButton.addEventListener('click', this.sendMessage.bind(this));
        this.abortButton.addEventListener("click", this.handleAbort.bind(this));
        this.messageInput.addEventListener("keypress", this.handleKeyPress.bind(this));
    }
    handleChatSelected = (chat)=>{
        window.history.pushState({}, "", `/chats/${chat.id}`);
    };
    handleAbort = ()=>{
        this.api.abort();
        this.enableForm();
        console.log("Request aborted");
    };
    handleKeyPress = (event)=>{
        if (event.key === "Enter" && !event.shiftKey) this.sendMessage();
    };
    enableForm() {
        (0, _domJs.DOM).hideElement(this.abortButton).enableInput(this.messageInput);
        this.messageInput.focus();
    }
    disableForm() {
        (0, _domJs.DOM).showElement(this.abortButton).disableInput(this.messageInput);
    }
    // https://github.com/jmorganca/ollama/blob/main/docs/api.md#generate-a-completion
    async sendMessage() {
        const userPrompt = this.messageInput.value.trim();
        // Get the current chat
        let chat = await (0, _appControllerJs.AppController).getCurrentChat();
        const url = (0, _settingsJs.Settings).getUrl("/api/chat");
        if (!url) {
            (0, _uinotificationJs.UINotification).show("Please update the URL in the settings to continue. ");
            return null;
        }
        if (userPrompt) {
            // Reset input
            this.messageInput.value = "";
            // Create new chat
            if (!chat) chat = await (0, _appControllerJs.AppController).createChat({
                title: "Untitled",
                model: (0, _settingsJs.Settings).getModel()
            });
            // Store user message
            const userMessage = await chat.addMessage({
                role: "user",
                content: userPrompt
            });
            const systemMessage = await chat.addMessage({
                role: "assistant",
                content: ""
            });
            const systemPrompt = (0, _settingsJs.Settings).getSystemPrompt();
            const modelParameters = (0, _settingsJs.Settings).getModelParameters();
            // Disable form
            this.disableForm();
            // Create user message
            this.createChatMessage(userMessage);
            // Create system message container
            const responseElement = this.createChatMessage(systemMessage);
            const requestContext = {
                chat,
                userMessage,
                systemMessage,
                responseElement
            };
            const requestData = await this.api.makeRequest(chat, userMessage, systemPrompt, modelParameters);
            /*
      console.dir(requestData);
      const requestData = {
        prompt: userMessage,
        model: chat.model,
        messages: (await chat.getMessages()).map((message) => ({
          role: message.role,
          content: message.content,
        })),
      };
      // Add system prompt
      if (systemPrompt) {
        requestData.system = systemPrompt;
      }
      // Add model parameters
      if (modelParameters) {
        requestData.options = modelParameters;
      }
      */ // Show spinner
            responseElement.textElement.innerHTML = '<div class="waiting"></div>';
            this.chatArea.scrollToEnd();
            // Make request
            this.api.send(url, requestData, (request, response)=>this.handleResponse(request, response, requestContext), (request, error)=>this.handleResponseError(request, error), (request, response)=>this.handleDone(request, response, requestContext));
        }
    }
    createChatMessage(message) {
        return this.chatArea.createMessageDiv(message);
    }
    handleResponse(request, response, context) {
        const responseElement = context.responseElement;
        const sanitizedContent = this.sanitizeContent(response);
        // Remember original response
        context.systemMessage.content += sanitizedContent;
        responseElement.textElement.textContent += sanitizedContent;
        this.chatArea.scrollToEnd();
    }
    handleResponseError(request, error) {
        // Ignore "Abort" button
        if (error !== undefined && error.name !== "AbortError") console.error(`Error: ${error.message}`);
        this.chatArea.scrollToEnd();
        this.enableForm();
    }
    async handleDone(request, response, context) {
        const chat = context.chat;
        console.log(`Chat ${chat.id} done`);
        await context.systemMessage.save();
        this.enableForm();
    }
    sanitizeContent = (content)=>{
        // TODO: Sanitization logic here
        return content;
    };
    getIdParam = ()=>{
        return new URL(window.location.href).pathname.split("/").pop();
    };
}

},{"./UINotification.js":"13HP4","./models/Settings.js":"5L05Z","./Event.js":"ZKUT3","./Dom.js":"gX2rl","./Sidebar.js":"fU3V9","./AppController.js":"dUrsU","./CopyButton.js":"56ZFC","./OllamaApi.js":"jkUug","./DownloadButton.js":"P5Doy","./DropDownMenu.js":"7c60o","./SettingsDialog.js":"jwtg2","./ChatSettingsDialog.js":"fQbdz","./ChatArea.js":"bIyr7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"13HP4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Show all uncaught errors as UI notifications
/*
window.onerror = function (message, source, lineno, colno, error) {
  const errorDetails = `${message} at ${source}:${lineno}:${colno}`;
  UINotification.show(errorDetails, 'error');
  return true;
};
*/ parcelHelpers.export(exports, "UINotification", ()=>UINotification);
function simpleHash(str) {
    let hash = 0;
    for(let i = 0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
class UINotification {
    constructor(message, type, autoDismiss){
        const id = simpleHash(JSON.stringify(message));
        this.type = type;
        this.domId = `notification-${id}`;
        this.container = document.body;
        this.template = document.getElementById("notification-template").content;
        this._bindEventListeners();
        if (autoDismiss) this.autoDismiss();
    }
    _bindEventListeners() {
        window.addEventListener("keydown", (event)=>{
            if (event.key === "Escape") this.hide();
        });
    }
    autoDismiss() {
        setTimeout(()=>{
            this.hide();
        }, 2000); // 2000 milliseconds (2 seconds)
    }
    static show(message, type) {
        const notification = new UINotification(message, type);
        notification.show(message);
        return notification;
    }
    static initialize() {
        // Store the original console.error function
        const originalConsoleError = console.error;
        // Override console.error
        console.error = function(...args) {
            UINotification.show(args);
            // Call the original console.error with all arguments
            originalConsoleError.apply(console, args);
        };
    }
    static handleApplicationError(error) {
        console.debug("caught error");
        console.error(error);
        UINotification.show(error);
    }
    show(message) {
        // Clone the template
        const clone = this.template.cloneNode(true);
        // Find the root element of the notification in the clone
        const notificationElement = clone.querySelector(".notification");
        if (!notificationElement) {
            console.error("Notification root element not found in template");
            return;
        }
        // Set the message
        clone.querySelector(".notification-message").textContent = message;
        notificationElement.id = this.domId; // Set ID on the actual element, not the fragment
        // Add type, for example, error
        if (this.type) notificationElement.classList.add(`notification-${this.type}`);
        // Add close functionality
        const closeButton = clone.querySelector(".close-notification-button");
        closeButton.onclick = ()=>this.hide();
        // Don't show the same notification twice
        if (!document.getElementById(this.domId)) // Append to the container and display
        this.container.appendChild(clone);
    }
    hide() {
        document.getElementById(this.domId)?.remove();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"5L05Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Settings", ()=>Settings);
class Settings {
    // Static method to set a value in localStorage
    static set(key, value) {
        try {
            const stringValue = JSON.stringify(value);
            localStorage.setItem(key, stringValue);
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }
    // Static method to get a value from localStorage
    static get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error("Error reading from localStorage", e);
            return defaultValue;
        }
    }
    // Static method to remove a value from localStorage
    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error("Error removing from localStorage", e);
        }
    }
    static getUrl(uri) {
        try {
            const baseUrl = Settings.get("url");
            if (uri) return new URL(uri, baseUrl).href;
            else return baseUrl;
        } catch (error) {
            return null;
        }
    }
    static setUrl(url) {
        Settings.set("url", url);
    }
    static getModel() {
        return Settings.get("model");
    }
    static setModel(model) {
        Settings.set("model", model);
    }
    static getSystemPrompt() {
        return Settings.get("system-prompt");
    }
    static setSystemPrompt(systemPrompt) {
        if (systemPrompt === "") systemPrompt = null;
        Settings.set("system-prompt", systemPrompt);
    }
    static getModelParameters() {
        return Settings.get("model-parameters");
    }
    static setModelParameters(modelParameters) {
        if (modelParameters === "") modelParameters = null;
        Settings.set("model-parameters", modelParameters);
    }
    static getCurrentChatId() {
        return Settings.get("currentChatId");
    }
    static setCurrentChatId(chatId) {
        if (chatId === undefined) chatId = null;
        Settings.set("currentChatId", chatId);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ZKUT3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Event", ()=>Event);
class Event {
    static listen(eventName, handler, target) {
        if (target === null || target === undefined) target = window;
        target.addEventListener(eventName, (event)=>{
            handler(event.detail);
        });
    }
    static emit(eventName, data, target) {
        if (target === null || target === undefined) target = window;
        let log = `${eventName}`;
        if (data?.id) log += ` id: ${data.id}`;
        console.log(log);
        const event = new CustomEvent(eventName, {
            detail: data || {},
            bubbles: true
        });
        target.dispatchEvent(event);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gX2rl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DOM", ()=>DOM);
class DOM {
    static showElement(element) {
        element.classList.remove("hidden");
        return this;
    }
    static hideElement(element) {
        element.classList.add("hidden");
        return this;
    }
    static enableInput(element) {
        element.removeAttribute("disabled");
        return this;
    }
    static disableInput(element) {
        element.setAttribute("disabled", "disabled");
        return this;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fU3V9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Sidebar", ()=>Sidebar);
var _debounceJs = require("./debounce.js");
var _eventJs = require("./Event.js");
var _chatJs = require("./models/Chat.js");
var _appControllerJs = require("./AppController.js");
var _chatListJs = require("./ChatList.js");
var _downloadChatsButtonJs = require("./DownloadChatsButton.js");
var _localStorageJs = require("./models/LocalStorage.js");
class Sidebar {
    constructor(){
        this.settings = new (0, _localStorageJs.LocalStorage)();
        this.chatList = new (0, _chatListJs.ChatList)();
        this.element = document.getElementById("sidebar");
        this.newChatButton = this.element.querySelector("#new-chat-button");
        this.clearButton = this.element.querySelector("#clear-button");
        this.hamburgerButton = document.getElementById("hamburger-menu");
        this.searchButton = document.getElementById("search-button");
        this.downloadChatsButton = new (0, _downloadChatsButtonJs.DownloadChatsButton)();
        this.searchRow = document.getElementById("search-row");
        this.searchInput = document.getElementById("search-input");
        if (this.settings.get("sidebar-collapsed") === true) this.element.classList.add("collapsed");
        this.bindEventListeners();
        this.render();
    }
    render() {
        this.chatList.render();
    }
    bindEventListeners() {
        (0, _eventJs.Event).listen("chatSelected", this.handleChatSelected);
        this.searchButton.addEventListener("click", this.toggleSearch.bind(this));
        this.searchInput.addEventListener("keypress", (0, _debounceJs.debounce)(this.performSearch.bind(this), 50));
        this.searchInput.addEventListener("keyup", (0, _debounceJs.debounce)(this.performSearch.bind(this), 50));
        this.newChatButton.addEventListener("click", this.handleNewChat.bind(this));
        this.clearButton.addEventListener("click", this.handleClear.bind(this));
        this.hamburgerButton.addEventListener("click", this.toggle.bind(this));
    }
    // TODO: Fix
    handleChatSelected = (chat)=>{
        const listItem = this.element.querySelector(`chat${chat.id}`);
        if (listItem) listItem.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    };
    toggleSearch() {
        const searchRow = document.getElementById("search-row");
        searchRow.classList.toggle("hidden");
        this.searchInput.focus();
    }
    performSearch() {
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters
        }
        const query = escapeRegExp(this.searchInput.value.trim()).replace(/\s+/g, ".*");
        const queryContent = query.length > 2; // Nobody wants to query content based on one character?
        const regex = new RegExp(query, "i"); // 'i' for case-insensitive matching
        console.log(`Search ${query}`);
        (0, _chatJs.Chat).getAll().then((chats)=>{
            const matches = chats.filter((chat)=>{
                let match = regex.test(chat.title);
                if (queryContent) match ||= regex.test(chat.content);
                return match;
            }).map((chat)=>chat.id);
            this.element.querySelectorAll(".chat-list-item").forEach((item)=>{
                if (matches.includes(item.data.id)) // Now matches the type
                item.classList.remove("hidden");
                else item.classList.add("hidden");
            });
        });
    }
    toggle() {
        this.element.classList.toggle("collapsed");
        this.hamburgerButton.classList.toggle("collapsed");
        if (this.element.classList.contains("collapsed")) this.settings.set("sidebar-collapsed", true);
        else this.settings.set("sidebar-collapsed", false);
    }
    async handleNewChat() {
        await (0, _appControllerJs.AppController).createChat();
    }
    async handleClear() {
        await (0, _appControllerJs.AppController).clearChats();
    }
}

},{"./debounce.js":"cnymS","./Event.js":"ZKUT3","./models/Chat.js":"7uLfP","./AppController.js":"dUrsU","./ChatList.js":"a7snp","./DownloadChatsButton.js":"hWz3M","./models/LocalStorage.js":"1bkpB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cnymS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "debounce", ()=>debounce);
function debounce(func, wait) {
    let timeout;
    return function funcWrapper(...args) {
        const later = ()=>{
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7uLfP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Chat", ()=>Chat);
var _baseModelJs = require("./BaseModel.js");
var _chatMessageJs = require("./ChatMessage.js");
class Chat extends (0, _baseModelJs.BaseModel) {
    async addMessage(data) {
        data.chatId = this.id;
        return await new (0, _chatMessageJs.ChatMessage)(data).create();
    }
    async getMessages() {
        const messages = await (0, _chatMessageJs.ChatMessage).getAllByChatId(this.id);
        this.messages = messages;
        return this.messages;
    }
    static async initialize() {
        await this.database("ChatApp", [
            "chats"
        ]);
    }
    static async clear() {
        await (0, _chatMessageJs.ChatMessage).clear();
        await super.clear();
    }
    static async get(id) {
        const chat = await super.get(id);
        /*
    if (chat) {
      // Fetch all messages for this chat
      const messages = await ChatMessage.getAllByChatId(id);
      chat.messages = messages;
    }
    */ return chat;
    }
    static async delete(id) {
        // Delete the chat instance
        await super.delete(id);
        // Delete all associated messages
        const messages = await (0, _chatMessageJs.ChatMessage).getAllByChatId(id);
        for (const message of messages)await message.delete();
    }
}

},{"./BaseModel.js":"8yfmU","./ChatMessage.js":"bRKed","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8yfmU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseModel", ()=>BaseModel);
var _databaseJs = require("../Database.js");
var _migrationsJs = require("../Migrations.js");
class BaseModel {
    constructor(data){
        Object.assign(this, data);
    }
    async create() {
        const key = await this.constructor.db.add(this.constructor.storeName, this);
        if (!this.id) this.id = key;
        return this;
    }
    async save() {
        return await this.constructor.db.put(this.constructor.storeName, this);
    }
    async delete() {
        return await this.constructor.db.delete(this.constructor.storeName, this.id);
    }
    jsonify() {
        return JSON.stringify(this);
    }
    static async database(name, store) {
        this.dbName = name;
        this.storeName = store;
        this.db = new (0, _databaseJs.Database)(name, [
            store
        ], (0, _migrationsJs.Migrations));
        await this.db.open();
    }
    static async transaction(mode) {
        return await this.db.transaction(this.storeName, mode);
    }
    async transaction(mode) {
        return await this.constructor.transaction(mode);
    }
    static async get(id) {
        const data = await this.db.get(this.storeName, id);
        return new this(data);
    }
    static async clear() {
        return await this.db.clear(this.storeName);
    }
    // TODO: sorting and selecting only certain attributes
    static async getAll() {
        const records = await this.db.getAll(this.storeName);
        return records.map((data)=>new this(data));
    }
    /**
   * Retrieves all objects associated with a given ID and index.
   *
   * @param {number|string} chatId - The ID of the chat.
   * @returns {Promise<Array>} A promise that resolves to an array.
   */ static async getAllByIndexAndId(indexName, id) {
        // Open a transaction and access the messages store
        const transaction = await this.transaction("readonly");
        // Use an index to find objects with the specified id
        const index = transaction.index(indexName);
        const request = index.getAll(id);
        return new Promise((resolve, reject)=>{
            request.onsuccess = ()=>{
                // Convert the result into instances
                const messages = request.result.map((data)=>new this(data));
                resolve(messages);
            };
            request.onerror = ()=>{
                reject(request.error);
            };
        });
    }
    // Exports the whole store
    static async export() {
        let transaction = await this.db.transaction(this.storeName, "readonly");
        let store = await transaction.transaction.objectStore(this.storeName);
        return store.getAll();
    }
}

},{"../Database.js":"fN3ar","../Migrations.js":"4uD6o","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fN3ar":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Database", ()=>Database);
class Database {
    constructor(dbName, objectStores, migrations){
        this.dbName = dbName;
        this.objectStores = objectStores;
        this.dbConnection = null; // Initialized in open
        this.migrations = migrations;
    }
    async open() {
        if (this.dbConnection) throw new Error("Connection already open");
        return new Promise((resolve, reject)=>{
            const request = indexedDB.open(this.dbName, this.migrations.version);
            request.onerror = (event)=>reject(event.target.error);
            request.onupgradeneeded = (event)=>{
                const db = event.target.result;
                const transaction = event.currentTarget.transaction;
                this.migrations.upgrade(db, transaction, event.oldVersion);
            };
            request.onsuccess = (event)=>{
                this.dbConnection = event.target.result;
                resolve(this.dbConnection);
            };
        });
    }
    async transaction(storeName, mode) {
        return this.dbConnection.transaction([
            storeName
        ], mode).objectStore(storeName);
    }
    async add(storeName, data) {
        const store = await this.transaction(storeName, "readwrite");
        return this.handleRequest("add", store.add(data));
    }
    async get(storeName, id) {
        const store = await this.transaction(storeName, "readonly");
        return this.handleRequest("get", store.get(id));
    }
    async put(storeName, data) {
        const store = await this.transaction(storeName, "readwrite");
        return this.handleRequest("put", store.put(data));
    }
    async delete(storeName, id) {
        const store = await this.transaction(storeName, "readwrite");
        return this.handleRequest("delete", store.delete(id));
    }
    async getAll(storeName) {
        const store = await this.transaction(storeName, "readwrite");
        return this.handleRequest("getAll", store.getAll());
    }
    async clear(storeName) {
        const store = await this.transaction(storeName, "readwrite");
        return this.handleRequest("deleteAll", store.clear());
    }
    handleRequest(type, request) {
        return new Promise((resolve, reject)=>{
            request.onsuccess = ()=>resolve(request.result);
            request.onerror = (event)=>{
                const error = `Database ${type} operation failed: ${event.target.error.message}`;
                reject(new Error(JSON.stringify(error)));
            };
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4uD6o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Migrations", ()=>Migrations);
class Migrations {
    static version = 2;
    static upgrade(database, transaction, oldVersion) {
        console.debug(`Migration needed. Old version ${oldVersion}. New version ${this.version}.`);
        const funcName = `upgradeToVersion${this.version}`;
        const upgradeFunc = this[funcName];
        if (!upgradeFunc) throw new Error(`Upgrade function missing for ${funcName}`);
        if (this.version >= oldVersion) upgradeFunc({
            database,
            transaction
        });
    }
    static upgradeToVersion2(context) {
        // Create chats
        context.database.createObjectStore("chats", {
            keyPath: "id",
            autoIncrement: true
        });
        // Create chat_messages
        const chatMessages = context.database.createObjectStore("chat_messages", {
            keyPath: "id",
            autoIncrement: true
        });
        chatMessages.createIndex("by_chat", "chatId", {
            unique: false
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bRKed":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChatMessage", ()=>ChatMessage);
var _baseModelJs = require("./BaseModel.js");
class ChatMessage extends (0, _baseModelJs.BaseModel) {
    static async initialize() {
        await this.database("ChatApp", "chat_messages");
    }
    static async getAllByChatId(chatId) {
        return this.getAllByIndexAndId("by_chat", chatId);
    }
}

},{"./BaseModel.js":"8yfmU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dUrsU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// TODO: Move all actions here?
// TODO: Cache current chat here
parcelHelpers.export(exports, "AppController", ()=>AppController);
var _uinotificationJs = require("./UINotification.js");
var _eventJs = require("./Event.js");
var _chatJs = require("./models/Chat.js");
var _chatMessageJs = require("./models/ChatMessage.js");
var _settingsJs = require("./models/Settings.js");
class AppController {
    static async updateChat(chat, data) {
        Object.assign(chat, data);
        await chat.save();
        // TODO: Move to BaseModel
        (0, _eventJs.Event).emit("chatUpdated", chat);
    }
    static async createChat(data) {
        if (!data) data = {};
        if (!data.title) data.title = "Untitled";
        if (!data.model) data.model = (0, _settingsJs.Settings).getModel();
        const chat = await new (0, _chatJs.Chat)(data).create();
        (0, _settingsJs.Settings).setCurrentChatId(chat.id);
        (0, _eventJs.Event).emit("chatCreated", chat);
        (0, _eventJs.Event).emit("chatSelected", chat);
        return chat;
    }
    static async deleteChatMessage(messageId) {
        (0, _uinotificationJs.UINotification).show("Deleted message").autoDismiss();
        const message = await (0, _chatMessageJs.ChatMessage).get(messageId);
        message.delete();
    }
    static async deleteChat(chat) {
        await chat.delete();
        if ((0, _settingsJs.Settings).getCurrentChatId() === chat.id) (0, _settingsJs.Settings).setCurrentChatId(null);
        (0, _eventJs.Event).emit("chatDeleted", chat);
    }
    static async getCurrentChat() {
        const chatId = this.getCurrentChatId();
        if (chatId) return await (0, _chatJs.Chat).get(chatId);
        return null;
    }
    static getCurrentChatId() {
        return (0, _settingsJs.Settings).get("currentChatId");
    }
    static async setCurrentChat(chat) {
        (0, _settingsJs.Settings).setCurrentChatId(chat.id);
        (0, _eventJs.Event).emit("chatSelected", chat);
    }
    static async setCurrentChatId(chatId) {
        const chat = await (0, _chatJs.Chat).get(chatId);
        if (chat) await this.setCurrentChat(chat);
    }
    static async clearChats() {
        (0, _settingsJs.Settings).setCurrentChatId(null);
        await (0, _chatJs.Chat).clear();
        (0, _eventJs.Event).emit("chatsCleared");
    }
}

},{"./UINotification.js":"13HP4","./Event.js":"ZKUT3","./models/Chat.js":"7uLfP","./models/ChatMessage.js":"bRKed","./models/Settings.js":"5L05Z","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a7snp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChatList", ()=>ChatList);
var _eventJs = require("./Event.js");
var _chatListItemJs = require("./ChatListItem.js");
var _dragAndDropJs = require("./DragAndDrop.js");
var _chatJs = require("./models/Chat.js");
var _appControllerJs = require("./AppController.js");
class ChatList {
    constructor(){
        this.element = document.getElementById("chat-list");
        this.template = document.getElementById("chat-list-item-template").content;
        this.bindEventListeners();
        (0, _appControllerJs.AppController).getCurrentChat().then((chat)=>{
            this.chat = chat;
        });
    }
    bindEventListeners() {
        (0, _eventJs.Event).listen("chatCreated", this.handleChatCreated.bind(this));
        (0, _eventJs.Event).listen("chatDeleted", this.handleChatDeleted.bind(this));
        (0, _eventJs.Event).listen("chatsCleared", this.handleChatsCleared.bind(this));
        (0, _eventJs.Event).listen("chatUpdated", this.handleChatUpdated.bind(this));
        (0, _eventJs.Event).listen("chatSelected", this.handleChatSelected.bind(this));
    }
    async selectChat(chatId) {
        await (0, _appControllerJs.AppController).setCurrentChatId(chatId);
    }
    handleChatCreated(chat) {
        this.appendChat(chat, true);
    }
    handleChatDeleted(chat) {
        if (this.chat?.id === chat.id) this.chat = null;
        this.element.querySelector(`.chat${chat.id}`)?.remove();
    }
    handleChatsCleared() {
        const elements = this.element.querySelectorAll(".chat-list-item");
        elements.forEach((element)=>element.remove());
    }
    handleChatUpdated(chat) {
        const listElement = this.element.querySelector(`.chat${chat.id} .chat-title`);
        if (listElement) listElement.textContent = chat.title;
    }
    handleChatSelected(chat) {
        if (this.chat) {
            const previousListElement = this.element.querySelector(`.chat${this.chat.id}`);
            if (previousListElement) previousListElement.classList.remove("selected");
        }
        const newListElement = this.element.querySelector(`.chat${chat.id}`);
        if (newListElement) newListElement.classList.add("selected");
        // Remember selected chat
        this.chat = chat;
    }
    render() {
        const currentChatId = (0, _appControllerJs.AppController).getCurrentChatId();
        this.element.innerHTML = "";
        (0, _chatJs.Chat).getAll().then((chats)=>{
            chats.forEach((chat)=>{
                const selected = chat.id === currentChatId;
                this.appendChat(chat, selected);
            });
            new (0, _dragAndDropJs.DragAndDrop)(".chat-list-item");
        });
    }
    appendChat(chat, selected) {
        const chatListItem = new (0, _chatListItemJs.ChatListItem)(chat, this, selected);
        this.element.appendChild(chatListItem.element);
        return chatListItem;
    }
}

},{"./Event.js":"ZKUT3","./ChatListItem.js":"fmc7d","./DragAndDrop.js":"b1yfh","./models/Chat.js":"7uLfP","./AppController.js":"dUrsU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fmc7d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChatListItem", ()=>ChatListItem);
var _appControllerJs = require("./AppController.js");
class ChatListItem {
    constructor(chat, chatList, selected){
        this.chat = chat;
        this.chatList = chatList;
        this.content = document.getElementById("chat-list-item-template").content.cloneNode(true);
        this.element = this.content.querySelector(".chat-list-item");
        this.element.title = this.chat.title;
        this.element.data = {
            id: this.chat.id
        };
        this.element.classList.add(`chat${this.chat.id}`);
        if (selected === true) this.element.classList.add("selected");
        this.setTitle();
        this.bindEventListeners();
    }
    render() {}
    bindEventListeners() {
        this.element.addEventListener("mouseover", this.onMouseover.bind(this));
        this.element.addEventListener("mouseout", this.onMouseout.bind(this));
        this.element.addEventListener("click", this.onClick.bind(this));
        this.element.querySelector(".list-item-delete").addEventListener("click", this.deleteChat.bind(this));
    }
    onMouseover() {
        this.element.classList.add("hover");
    }
    onMouseout() {
        this.element.classList.remove("hover");
    }
    onClick() {
        this.chatList.selectChat(this.chat.id);
    }
    setTitle() {
        const chatTitle = this.content.querySelector(".chat-title");
        chatTitle.textContent = this.chat.title;
    }
    deleteChat() {
        (0, _appControllerJs.AppController).deleteChat(this.chat);
        this.element.remove();
    }
}

},{"./AppController.js":"dUrsU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b1yfh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DragAndDrop", ()=>DragAndDrop);
class DragAndDrop {
    constructor(selector){
        this.listItems = document.querySelectorAll(selector);
        this.draggedItem = null;
        this.initializeDragAndDrop();
    }
    initializeDragAndDrop() {
        this.listItems.forEach((item)=>{
            item.addEventListener("dragstart", this.handleDragStart.bind(this, item));
            item.addEventListener("dragover", this.handleDragOver.bind(this));
            item.addEventListener("drop", this.handleDrop.bind(this, item));
            item.addEventListener("dragend", this.handleDragEnd.bind(this));
        });
    }
    handleDragStart(item) {
        this.draggedItem = item;
    }
    handleDragOver(e) {
        e.preventDefault();
    }
    handleDrop(item) {
        if (item !== this.draggedItem) {
            let currentHTML = item.innerHTML;
            item.innerHTML = this.draggedItem.innerHTML;
            this.draggedItem.innerHTML = currentHTML;
            console.debug("dnd drop");
        }
    }
    handleDragEnd() {
        this.draggedItem = null;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hWz3M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DownloadChatsButton", ()=>DownloadChatsButton);
var _chatJs = require("./models/Chat.js");
var _chatMessageJs = require("./models/ChatMessage.js");
class DownloadChatsButton {
    constructor(){
        this.button = document.querySelector("#export-button");
        this.bindEventListeners();
    }
    bindEventListeners() {
        this.button.addEventListener("click", ()=>{
            this.exportChat();
            this.exportChatMessages();
        });
    }
    async exportChat() {
        const request = await (0, _chatJs.Chat).export();
        request.onsuccess = function() {
            let data = request.result;
            // Convert the data to JSON format
            let jsonData = JSON.stringify(data, 2);
            // Export the JSON data by creating a file to download
            let blob = new Blob([
                jsonData
            ], {
                type: "application/json"
            });
            let url = URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = "chats.json";
            a.click();
            URL.revokeObjectURL(url);
        };
        request.onerror = function(event) {
            console.error("Error reading data: ", event.target.errorCode);
        };
    }
    async exportChatMessages() {
        const request = await (0, _chatMessageJs.ChatMessage).export();
        request.onsuccess = function() {
            let data = request.result;
            // Convert the data to JSON format
            let jsonData = JSON.stringify(data, 2);
            // Export the JSON data by creating a file to download
            let blob = new Blob([
                jsonData
            ], {
                type: "application/json"
            });
            let url = URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = "chat_messages.json";
            a.click();
            URL.revokeObjectURL(url);
        };
        request.onerror = function(event) {
            console.error("Error reading data: ", event.target.errorCode);
        };
    }
}

},{"./models/Chat.js":"7uLfP","./models/ChatMessage.js":"bRKed","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1bkpB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LocalStorage", ()=>LocalStorage);
class LocalStorage {
    // Set a value in localStorage
    set(key, value) {
        try {
            const stringValue = JSON.stringify(value);
            localStorage.setItem(key, stringValue);
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }
    // Get a value from localStorage, return defaultValue if key doesn't exist
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error("Error reading from localStorage", e);
            return defaultValue;
        }
    }
    // Remove a value from localStorage
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error("Error removing from localStorage", e);
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"56ZFC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CopyButton", ()=>CopyButton);
var _uinotificationJs = require("./UINotification.js");
class CopyButton {
    constructor(){
        document.addEventListener("click", (event)=>{
            // Check if the clicked element has the class 'copy-button'
            if (event.target.classList.contains("copy-button")) {
                const targetSelector = event.target.getAttribute("data-target");
                if (!targetSelector) {
                    console.error("The data-target attribute is not set");
                    return;
                }
                const textToCopy = document.getElementById(targetSelector).innerText;
                // Create a temporary textarea element
                const textarea = document.createElement("textarea");
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                // Select the text and copy it
                textarea.select();
                document.execCommand("copy");
                // Remove the temporary textarea
                document.body.removeChild(textarea);
                // Optional: Display a message or change the button text/content
                (0, _uinotificationJs.UINotification).show("Text copied to clipboard").autoDismiss();
            }
        });
    }
}

},{"./UINotification.js":"13HP4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jkUug":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OllamaApi", ()=>OllamaApi);
class OllamaApi {
    constructor(){
        this.abortController = null;
    }
    async makeRequest(chat, userMessage, systemPrompt, modelParameters) {
        const requestData = {
            prompt: userMessage,
            model: chat.model,
            messages: (await chat.getMessages()).map((message)=>({
                    role: message.role,
                    content: message.content
                }))
        };
        // Add system prompt
        if (systemPrompt) requestData.system = systemPrompt;
        // Add model parameters
        if (modelParameters) requestData.options = modelParameters;
        return requestData;
    }
    async send(url, data, onResponse, onError, onDone) {
        const request = {
            data
        };
        try {
            const response = await this.postChatMessage(url, data);
            await this.handleResponse(request, response, onResponse, onDone);
        } catch (error) {
            onError(request, error);
        }
    }
    async postChatMessage(url, data) {
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        const response = await fetch(url, {
            signal,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`${url} failed with status ${response.status}`);
        return response;
    }
    async handleResponse(request, response, onResponse, onDone) {
        const reader = response.body.getReader();
        let partialLine = "";
        var isRequestDone = false;
        while(!isRequestDone){
            const { done, value } = await reader.read();
            if (done) {
                onDone(request, response);
                isRequestDone = true;
                continue;
            }
            const textChunk = new TextDecoder().decode(value);
            const lines = (partialLine + textChunk).split("\n");
            partialLine = lines.pop();
            lines.forEach((line)=>{
                const responseData = JSON.parse(line);
                if (line.trim()) {
                    // TODO: Move this line:
                    this.printResponseStats(responseData);
                    onResponse(request, responseData.message.content);
                }
            });
        }
        if (partialLine.trim()) onResponse(request, partialLine);
    }
    abort() {
        if (this.abortController) this.abortController.abort();
    }
    printResponseStats(data) {
        if (!data.total_duration) return;
        // Convert nanoseconds to seconds for durations
        const totalDurationInSeconds = data.total_duration / 1e9;
        const loadDurationInSeconds = data.load_duration / 1e9;
        const promptEvalDurationInSeconds = data.prompt_eval_duration / 1e9;
        const responseEvalDurationInSeconds = data.eval_duration / 1e9;
        // Calculate tokens per second (token/s)
        const tokensPerSecond = data.eval_count / responseEvalDurationInSeconds;
        const output = `
Model: ${data.model}
Created At: ${data.created_at}
Total Duration (s): ${totalDurationInSeconds.toFixed(2)}
Load Duration (s): ${loadDurationInSeconds.toFixed(2)}
Prompt Evaluation Count: ${data.prompt_eval_count}
Prompt Evaluation Duration (s): ${promptEvalDurationInSeconds.toFixed(2)}
Response Evaluation Count: ${data.eval_count}
Response Evaluation Duration (s): ${responseEvalDurationInSeconds.toFixed(2)}
Tokens Per Second: ${tokensPerSecond.toFixed(2)} token/s
    `;
        console.log(output);
    }
    static getModels(url, onResponse) {
        if (!url) return null;
        return fetch(url).then((response)=>{
            if (!response.ok) throw new Error(`Unable to fetch models from ${url}`);
            return response.json();
        }).then((data)=>{
            onResponse(data.models);
        }).catch((error)=>{
            console.debug(error);
            console.error(`Please ensure the server is running at: ${url}. Error code: 39847`);
            onResponse([]);
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"P5Doy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DownloadButton", ()=>DownloadButton);
class DownloadButton {
    constructor(){
        document.addEventListener("click", (event)=>{
            // Check if the clicked element has the class 'copy-button'
            if (event.target.classList.contains("download-button")) {
                // Get the index from the data-target attribute
                const targetId = event.target.getAttribute("data-target");
                this.downloadElementContent(targetId, "chat.html");
            }
        });
    }
    downloadElementContent(elementId, filename) {
        // Get the element
        const element = document.getElementById(elementId);
        if (!element) {
            console.error("Element not found");
            return;
        }
        // Get the contents of the element
        const content = element.innerText;
        // Create a Blob with the content
        const blob = new Blob([
            content
        ], {
            type: "text/html"
        });
        // Create an anchor element and set the href to the blob
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        // Append the anchor to the document, trigger a click, and then remove it
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Revoke the blob URL
        URL.revokeObjectURL(a.href);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7c60o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DropDownMenu", ()=>DropDownMenu);
class DropDownMenu {
    constructor(){
        this.buttonSelector = ".drop-down-menu";
        this.dropDownMenus = document.querySelectorAll(this.buttonSelector);
        this.init();
    }
    init() {
        // Add a click listener to the whole document
        document.addEventListener("click", (event)=>{
            // Check if the clicked element or any of its parents has the 'drop-down-menu' class
            const menuElement = event.target.closest(this.buttonSelector);
            if (menuElement) {
                const dropDownMenu = menuElement.querySelector(".drop-down-menu-items");
                if (dropDownMenu) this.toggleMenu(dropDownMenu);
            }
        });
    }
    toggleMenu(menu) {
        menu.classList.toggle("hidden");
        menu.classList.toggle("visible");
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jwtg2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SettingsDialog", ()=>SettingsDialog);
var _modalJs = require("./Modal.js");
var _uinotificationJs = require("./UINotification.js");
var _modelsListJs = require("./ModelsList.js");
var _modelsJs = require("./models/Models.js");
var _settingsJs = require("./models/Settings.js");
class SettingsDialog extends (0, _modalJs.Modal) {
    constructor(options){
        super(options);
        this.showButton = document.getElementById(options.buttonId);
        this.urlInput = this.modal.querySelector("#input-url");
        this.modelInput = this.modal.querySelector("#input-model");
        this.systemPromptInput = this.modal.querySelector("#input-system-prompt");
        this.modelParametersInput = this.modal.querySelector("#input-model-parameters");
        this.refreshModelsButton = this.modal.querySelector(".refresh-models-button");
        this.modelList = new (0, _modelsListJs.ModelsList)(this.modal.querySelector("#model-list"));
        this.bindEventListeners();
    }
    getSelected() {
        return (0, _settingsJs.Settings).getModel();
    }
    bindEventListeners() {
        this.urlInput.addEventListener("blur", this.handleUrlUpdated.bind(this));
        this.systemPromptInput.addEventListener("blur", this.handleSystemPromptUpdated.bind(this));
        this.modelParametersInput.addEventListener("blur", ()=>this.handleModelParametersUpdated.bind(this));
        this.modelList.onClick(this.handleModelUpdated.bind(this));
        this.showButton.addEventListener("click", this.show.bind(this));
        this.refreshModelsButton.addEventListener("click", this.refreshModels.bind(this));
        this.closeButton.addEventListener("click", this.hide.bind(this));
    }
    handleSystemPromptUpdated() {
        (0, _settingsJs.Settings).setSystemPrompt(this.systemPromptInput.value.trim());
    }
    handleModelUpdated() {
        (0, _settingsJs.Settings).setModel(this.modelList.getSelected());
    }
    handleModelParametersUpdated() {
        const value = this.modelParametersInput.value.trim();
        if (value === "") return;
        try {
            const parsedValue = JSON.parse(value);
            const prettyJSON = JSON.stringify(parsedValue, 2);
            (0, _settingsJs.Settings).setModelParameters(parsedValue);
            this.modelParametersInput.value = prettyJSON;
            this.modelParametersInput.classList.remove("error");
        } catch (error) {
            if (error.name === "SyntaxError") this.modelParametersInput.classList.add("error");
            else console.error(error);
        }
    }
    handleUrlUpdated() {
        const value = this.urlInput.value.trim();
        (0, _settingsJs.Settings).setUrl(value);
    }
    show() {
        this.loadSettings();
        (0, _modelsJs.Models).load();
        this.handleShow();
    }
    refreshModels() {
        if (!(0, _modelsJs.Models).getUrl()) (0, _uinotificationJs.UINotification).show("Please update the URL in the settings to continue.");
        else (0, _modelsJs.Models).load();
    }
    loadSettings() {
        this.modelList.setSelected(this.getSelected());
        this.urlInput.value = (0, _settingsJs.Settings).getUrl();
        const modelParameters = (0, _settingsJs.Settings).getModelParameters();
        if (modelParameters) this.modelParametersInput.value = JSON.stringify(modelParameters, 2);
    }
}

},{"./Modal.js":"cSC7v","./UINotification.js":"13HP4","./ModelsList.js":"3Iv7p","./models/Models.js":"grZYv","./models/Settings.js":"5L05Z","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cSC7v":[function(require,module,exports) {
// Modal base class
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Modal", ()=>Modal);
class Modal {
    constructor(options){
        this.domId = options.domId;
        this.templateId = options.templateId;
        this.modal = this.createDialogElement();
        this.titleElement = this.modal.querySelector(".modal-title");
        this.closeButton = this.modal.querySelector(".button-close");
        this.closeButton.onclick = ()=>this.hide();
        this._bindEventListeners();
        this.setTitle(options.title);
    }
    setTitle(title) {
        this.titleElement.textContent = title;
    }
    _bindEventListeners() {
        this.modal.addEventListener("click", (event)=>{
            if (event.target == this.modal) this.hide();
        });
        window.addEventListener("keydown", (event)=>{
            if (event.key === "Escape") this.hide();
        });
    }
    createDialogElement() {
        const template = document.getElementById(this.templateId);
        if (!template) {
            console.error(`Template with ID ${this.templateId} not found.`);
            return;
        }
        const clone = template.content.cloneNode(true);
        const modalElement = clone.firstElementChild;
        modalElement.id = this.domId;
        if (!modalElement) {
            console.error(`No modal element found in the template with ID ${this.templateId}.`);
            return;
        }
        document.body.appendChild(modalElement);
        return modalElement;
    }
    show() {
        this.handleShow();
    }
    hide() {
        this.handleHide();
    }
    handleShow() {
        this.modal.classList.add("show");
    }
    handleHide() {
        this.modal.classList.remove("show");
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3Iv7p":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ModelsList", ()=>ModelsList);
var _filteredListJs = require("./FilteredList.js");
var _eventJs = require("./Event.js");
var _modelsJs = require("./models/Models.js");
class ModelsList extends (0, _filteredListJs.FilteredList) {
    constructor(container){
        super(container, (0, _modelsJs.Models).getNames());
        this.bindEventListeners();
    }
    bindEventListeners() {
        (0, _eventJs.Event).listen("modelsLoaded", this.handleModelsLoaded.bind(this));
    }
    handleModelsLoaded() {
        this.setItems((0, _modelsJs.Models).getNames());
    }
    static getModels() {
        return (0, _modelsJs.Models).getNames();
    }
}

},{"./FilteredList.js":"evx1C","./Event.js":"ZKUT3","./models/Models.js":"grZYv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"evx1C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FilteredList", ()=>FilteredList);
var _listJs = require("./List.js");
var _domJs = require("./DOM.js");
class FilteredList extends (0, _listJs.List) {
    constructor(ul, items){
        super(ul, items); // Call the constructor of the parent class
        this.div = document.createElement("small");
        this.div.classList.add("hidden", "p-2");
        this.ul.prepend(this.div);
        this.query = null;
    }
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters
    }
    render() {
        super.render();
    }
    selectFirst() {
        alert(document.querySelector(".chat-model-list li:not(.hidden)").textContent);
    }
    filter(searchTerm) {
        this.query = searchTerm;
        if (searchTerm === null || searchTerm === undefined) {
            this.clearFilter();
            this.filtered = false;
            return null;
        }
        const query = this.escapeRegExp(searchTerm).replace(/\s+/g, ".*");
        const regex = new RegExp(query, "i"); // 'i' for case-insensitive matching
        // Loop through the list items
        const matches = this.li.map((listItemElement)=>{
            const text = listItemElement.textContent;
            const match = regex.test(text);
            if (match) {
                (0, _domJs.DOM).showElement(listItemElement);
                return text;
            } else {
                (0, _domJs.DOM).hideElement(listItemElement);
                return null;
            }
        }).filter((match)=>match);
        console.log(`Search ${query}. Matches: ${matches}`);
        // Update text
        (0, _domJs.DOM).showElement(this.div);
        let message = null;
        if (searchTerm.length < 1) message = `Continue typing to search models. Showing all models:`;
        else if (matches.length != 0) message = `Found ${matches.length} model(s) matching '${this.query}'. Click to change chat's model, or press tab to change prompt's model:`;
        else message = `Did not find any models that match '${this.query}'.`;
        this.div.textContent = message;
        return matches;
    }
    clearFilter() {
        (0, _domJs.DOM).hideElement(this.div);
        this.query = null;
        this.li.forEach((listItemElement)=>{
            (0, _domJs.DOM).showElement(listItemElement);
        });
    }
}

},{"./List.js":"gy1Ga","./DOM.js":"EyUfz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gy1Ga":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "List", ()=>List);
var _eventJs = require("./Event.js");
var _uielementJs = require("./UIElement.js");
class List extends (0, _uielementJs.UIElement) {
    constructor(ul, items){
        super(ul);
        this.ul = ul;
        this.items = items;
        this.render();
        this.clickHandler = null;
        this.ul.classList.add("list");
    }
    onClick(handler) {
        this.clickHandler = handler;
        return this; // Allow chaining
    }
    setItems(items) {
        this.items = items;
        this.render();
    }
    setSelected(selected) {
        console.debug(`Select ${selected}`);
        this.selected = selected;
        this.li.forEach((item)=>{
            if (item.textContent === selected) item.classList.add("selected");
            else item.classList.remove("selected");
        });
        (0, _eventJs.Event).emit("select", selected, this.ul);
    }
    getSelected() {
        return this.selected;
    }
    render() {
        this.ul.innerHTML = ""; // Clear existing content
        this.li = this.items.map((item)=>{
            const li = document.createElement("li");
            li.classList.add("list-item");
            if (item === this.selected) li.classList.add("selected");
            li.textContent = item;
            li.item = item;
            li.addEventListener("click", ()=>{
                this.setSelected(item);
                if (this.clickHandler) this.clickHandler(item);
            });
            this.ul.appendChild(li);
            return li;
        });
    }
}

},{"./Event.js":"ZKUT3","./UIElement.js":"efCjh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"efCjh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UIElement", ()=>UIElement);
var _domJs = require("./DOM.js");
class UIElement {
    constructor(element){
        this.element = element;
    }
    show() {
        (0, _domJs.DOM).showElement(this.element);
    }
    hide() {
        (0, _domJs.DOM).hideElement(this.element);
    }
}

},{"./DOM.js":"EyUfz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"EyUfz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DOM", ()=>DOM);
class DOM {
    static showElement(element) {
        element.classList.remove("hidden");
        return this;
    }
    static hideElement(element) {
        element.classList.add("hidden");
        return this;
    }
    static enableInput(element) {
        element.removeAttribute("disabled");
        return this;
    }
    static disableInput(element) {
        element.setAttribute("disabled", "disabled");
        return this;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"grZYv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Models", ()=>Models);
var _eventJs = require("../Event.js");
var _settingsJs = require("./Settings.js");
var _ollamaApiJs = require("../OllamaApi.js");
class Models {
    // TODO: Get this from the settings?
    static models = [];
    static getUrl() {
        return (0, _settingsJs.Settings).getUrl("/api/tags");
    }
    static load() {
        if (!this.getUrl()) return null;
        return (0, _ollamaApiJs.OllamaApi).getModels(this.getUrl(), (models)=>{
            Models.models = models;
            // Cache list of models
            (0, _settingsJs.Settings).set("models", Models.models);
            (0, _eventJs.Event).emit("modelsLoaded", Models.models);
        });
    }
    static getAll() {
        return (0, _settingsJs.Settings).get("models");
    }
    static getNames() {
        const models = this.getAll();
        if (!models) return [];
        return models.map((model)=>model.name);
    }
    static findModelByName(name) {
        return this.getAll().find((model)=>model.name === name);
    }
}

},{"../Event.js":"ZKUT3","./Settings.js":"5L05Z","../OllamaApi.js":"jkUug","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fQbdz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChatSettingsDialog", ()=>ChatSettingsDialog);
var _appControllerJs = require("./AppController.js");
var _settingsDialogJs = require("./SettingsDialog.js");
var _settingsJs = require("./models/Settings.js");
class ChatSettingsDialog extends (0, _settingsDialogJs.SettingsDialog) {
    constructor(options){
        super(options);
    }
    getSelected() {
        return this.chat?.model;
    }
    async handleSystemPromptUpdated() {
        this.chat.systemPrompt = this.systemPromptInput.value.trim();
        await this.chat.save();
    }
    async handleModelUpdated() {
        this.chat.model = this.modelList.getSelected();
        await this.chat.save();
    }
    async handleModelParametersUpdated() {
        this.chat.modelParameters = this.modelParametersInput.value.trim();
        await this.chat.save();
    }
    async handleUrlUpdated() {
        this.chat.url = this.urlInput.value.trim();
        await this.chat.save();
    }
    loadSettings() {
        (0, _appControllerJs.AppController).getCurrentChat().then((chat)=>{
            this.modelList.setSelected(chat.model);
            this.chat = chat;
            this.urlInput.value = this.chat.url || (0, _settingsJs.Settings).getUrl();
            const modelParameters = this.chat.modelParameters || (0, _settingsJs.Settings).getModelParameters();
            if (modelParameters) this.modelParametersInput.value = JSON.stringify(modelParameters, 2);
        });
    }
}

},{"./AppController.js":"dUrsU","./SettingsDialog.js":"jwtg2","./models/Settings.js":"5L05Z","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bIyr7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChatArea", ()=>ChatArea);
var _uinotificationJs = require("./UINotification.js");
var _appControllerJs = require("./AppController.js");
var _atSymbolListenerJs = require("./AtSymbolListener.js");
var _exportChatJs = require("./ExportChat.js");
var _eventJs = require("./Event.js");
var _hoverableJs = require("./Hoverable.js");
var _chatTitleJs = require("./ChatTitle.js");
var _chatFormJs = require("./ChatForm.js");
var _modelsListJs = require("./ModelsList.js");
class ChatArea {
    constructor(){
        this.chatTitle = new (0, _chatTitleJs.ChatTitle)();
        this.chatForm = new (0, _chatFormJs.ChatForm)();
        this.chatHistory = document.getElementById("chat-history");
        this.messageInput = document.getElementById("message-input");
        this.editChatButton = document.getElementById("edit-chat-button");
        this.chatModel = document.getElementById("chat-model");
        this.modelName = this.chatModel.querySelector(".chat-model-name");
        this.scrollToTopButton = document.getElementById("scroll-to-top-button");
        this.scrollToEndButton = document.getElementById("scroll-to-end-button");
        this.deleteChatButton = document.getElementById("delete-chat-button");
        this.exportChatButton = document.getElementById("export-chat-button");
        this.modelList = new (0, _modelsListJs.ModelsList)(this.chatModel.querySelector(".chat-model-list")).onClick(this.handleModelSelected.bind(this));
        new (0, _atSymbolListenerJs.AtSymbolListener)(this.messageInput, this.modelList, this.handleModelSelected.bind(this));
        (0, _appControllerJs.AppController).getCurrentChat().then((chat)=>{
            if (!chat) return;
            this.chat = chat;
            this.render();
        });
        this.bindEventListeners();
    }
    render() {
        // Clear history view
        this.chatHistory.innerText = "";
        if (this.chat) {
            // Show model name in "talking to"
            this.modelName.textContent = this.chat.model;
            // Update list of models
            this.modelList.setSelected(this.chat.model);
            this.chat // Render chat history
            .getMessages().then((messages)=>{
                messages.forEach((message)=>{
                    this.createMessageDiv(message);
                });
            });
            this.scrollToEnd();
        }
        this.messageInput.focus();
    }
    bindEventListeners() {
        (0, _eventJs.Event).listen("chatSelected", this.handleChatSelected.bind(this));
        (0, _eventJs.Event).listen("chatDeleted", this.handleChatDeleted.bind(this));
        this.scrollToTopButton.addEventListener("click", this.scrollToTop.bind(this));
        this.scrollToEndButton.addEventListener("click", this.scrollToEnd.bind(this));
        this.editChatButton.addEventListener("click", this.handleEditChat.bind(this));
        this.deleteChatButton.addEventListener("click", this.handleDeleteChat.bind(this));
        this.exportChatButton.addEventListener("click", ()=>{
            (0, _exportChatJs.ExportChat).exportChat(this.chat, `chat-${this.chat.id}.json`);
        });
        this.currentMessage = this.chatHistory.querySelector(".selected");
        // Select chat message with arrow up and arrow down keys
        document.addEventListener("keydown", (event1)=>{
            let next, previous;
            if (event1.key === "ArrowDown") {
                next = this.currentMessage ? this.currentMessage.nextElementSibling : this.chatHistory.firstElementChild;
                if (next) {
                    if (this.currentMessage) this.currentMessage.classList.remove("hover");
                    next.classList.add("hover");
                    this.currentMessage = next; // Update currentMessage
                    this.currentMessage.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    }); // Scroll into view
                }
            } else if (event1.key === "ArrowUp") {
                previous = this.currentMessage ? this.currentMessage.previousElementSibling : this.chatHistory.lastElementChild;
                if (previous) {
                    if (this.currentMessage) this.currentMessage.classList.remove("hover");
                    previous.classList.add("hover");
                }
                this.currentMessage = previous; // Update currentMessage
                this.currentMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                }); // Scroll into view
            }
        });
    }
    createMessageDiv(message) {
        const domId = `chat-message-${message.id}`;
        const role = message.role;
        const content = message.content;
        // Get the template and its content
        const template = document.getElementById("chat-message-template");
        const messageClone = template.content.cloneNode(true);
        // Find the div and span elements within the cloned template
        const messageDiv = messageClone.querySelector(".chat-message");
        const textSpan = messageClone.querySelector(".chat-message-text");
        const deleteButton = messageClone.querySelector(".delete-chat-message-button");
        const copyButton = messageClone.querySelector(".copy-chat-message-button .copy-button");
        const goodButton = messageClone.querySelector(".good-chat-message-button");
        const badButton = messageClone.querySelector(".bad-chat-message-button");
        const flagButton = messageClone.querySelector(".flag-chat-message-button");
        if (message.quality == "bad") badButton.classList.add("selected");
        else if (message.quality == "good") goodButton.classList.add("selected");
        else if (message.quality == "flagged") flagButton.classList.add("selected");
        // Set the class for role and text content
        messageDiv.classList.add(`${role}-chat-message`);
        messageDiv.id = domId;
        textSpan.textContent = content;
        messageDiv.spellcheck = false;
        // Append to chatHistory and adjust scroll
        this.chatHistory.appendChild(messageDiv);
        messageDiv.dataset["id"] = message.id;
        new (0, _hoverableJs.Hoverable)(messageDiv);
        deleteButton.addEventListener("click", async ()=>{
            await (0, _appControllerJs.AppController).deleteChatMessage(message.id);
            messageDiv.remove();
        });
        copyButton.dataset["target"] = domId;
        flagButton.addEventListener("click", async ()=>{
            (0, _uinotificationJs.UINotification).show("Flagged message").autoDismiss();
            message.quality = "flagged";
            await message.save();
        });
        goodButton.addEventListener("click", async ()=>{
            (0, _uinotificationJs.UINotification).show("Marked message as good").autoDismiss();
            message.quality = "good";
            await message.save();
        });
        badButton.addEventListener("click", async ()=>{
            (0, _uinotificationJs.UINotification).show("Marked message as bad").autoDismiss();
            message.quality = "bad";
            await message.save();
        });
        return {
            element: messageDiv,
            textElement: textSpan
        };
    }
    handleChatDeleted(chat) {
        if (chat.id === this.chat?.id) this.chat = null;
        else this.chat = chat;
        this.render();
    }
    async handleModelSelected(selected) {
        const chat = await (0, _appControllerJs.AppController).getCurrentChat();
        this.modelName.textContent = selected;
        (0, _appControllerJs.AppController).updateChat(chat, {
            model: selected
        });
    }
    handleChatSelected(chat) {
        this.chat = chat;
        this.render();
    }
    handleEditChat() {
        this.chatTitle.focus();
        event.stopPropagation();
    }
    async handleDeleteChat() {
        const chat = await (0, _appControllerJs.AppController).getCurrentChat();
        if (chat) await (0, _appControllerJs.AppController).deleteChat(chat);
    }
    scrollToTop() {
        this.chatHistory.scrollTop = 0;
    }
    scrollToEnd() {
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }
}

},{"./UINotification.js":"13HP4","./AppController.js":"dUrsU","./AtSymbolListener.js":"kas7Q","./ExportChat.js":"56vtJ","./Event.js":"ZKUT3","./Hoverable.js":"6urlE","./ChatTitle.js":"38Gm9","./ChatForm.js":"2VTSS","./ModelsList.js":"3Iv7p","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kas7Q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AtSymbolListener", ()=>AtSymbolListener);
var _eventJs = require("./Event.js");
class AtSymbolListener {
    constructor(input, target, onSelected){
        if (!target) throw Error("No target element specified");
        this.active = false;
        this.onSelected = onSelected;
        this.input = input;
        this.target = target;
        this.bindEventListeners();
    }
    bindEventListeners() {
        this.input.addEventListener("input", ()=>this.handleInput());
        this.input.addEventListener("keydown", (e)=>this.handleKeydown(e));
        (0, _eventJs.Event).listen("select", this.handleSelected.bind(this), this.ul);
    }
    handleInput() {
        const text = this.getText();
        const lastChar = text[text.length - 1];
        // Handle show and hide using special characters
        if (lastChar === "@") this.showTarget();
        // Handle search if active
        if (this.active) {
            const searchTerm = this.getSearchTerm();
            if (!this.target.filter(searchTerm)) // TODO: Show ”No matches” instead of hiding
            this.hideTarget();
        }
    }
    getText() {
        return this.input.value.trim();
    }
    getSearchTerm() {
        const text = this.getText();
        const lastAtPos = text.lastIndexOf("@");
        const query = lastAtPos !== -1 ? text.substring(lastAtPos + 1) : null;
        return query;
    }
    handleKeydown(event) {
        const key = event.key;
        // Select first item on tab
        if (event.which == 9 && this.active) {
            this.target.selectFirst();
            event.preventDefault();
        } else if (key === " " || key === "Enter" || key === "Escape") this.hideTarget();
    }
    handleSelected(selected) {
        if (selected === null || selected === undefined) return;
        if (!this.active) return;
        const text = this.getText();
        const lastAtPos = text.lastIndexOf("@");
        if (lastAtPos !== -1) {
            this.input.value = text.substring(0, lastAtPos + 1) + selected;
            this.input.focus();
            this.input.setSelectionRange(this.input.value.length, this.input.value.length);
            this.onSelected(selected);
            this.hideTarget();
        }
    }
    showTarget() {
        this.active = true;
        this.target.element.classList.add("active");
        this.target.show();
    }
    hideTarget() {
        this.active = false;
        this.target.element.classList.remove("active");
        this.target.hide();
    }
}

},{"./Event.js":"ZKUT3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"56vtJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ExportChat", ()=>ExportChat);
class ExportChat {
    static exportChat(chat, filename) {
        // Get the contents of the element
        const content = chat.jsonify();
        // Create a Blob with the content
        const blob = new Blob([
            content
        ], {
            type: "application/json"
        });
        // Create an anchor element and set the href to the blob
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        // Append the anchor to the document, trigger a click, and then remove it
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Revoke the blob URL
        URL.revokeObjectURL(a.href);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6urlE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Hoverable", ()=>Hoverable);
class Hoverable {
    constructor(element){
        this.element = element;
        element.hoverable = this;
        this.bindEventListeners();
    }
    bindEventListeners() {
        this.element.addEventListener("mouseover", ()=>this.onMouseover());
        this.element.addEventListener("mouseout", ()=>this.onMouseout());
    }
    onMouseover() {
        this.element.classList.add("hover");
    }
    onMouseout() {
        this.element.classList.remove("hover");
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"38Gm9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChatTitle", ()=>ChatTitle);
var _eventJs = require("./Event.js");
var _appControllerJs = require("./AppController.js");
class ChatTitle {
    constructor(){
        this.defaultTitle = "Untitled";
        this.element = document.getElementById("chat-title");
        this.bindEventListeners();
        this.render();
    }
    render() {
        (0, _appControllerJs.AppController).getCurrentChat().then((chat)=>{
            this.chat = chat;
            this.setTitle(chat?.title);
        });
    }
    setTitle(title) {
        this.element.textContent = title || this.defaultTitle;
    }
    focus() {
        const hasFocus = document.activeElement === this.element;
        if (!hasFocus) this.element.focus();
    }
    bindEventListeners() {
        (0, _eventJs.Event).listen("chatDeleted", this.handleChatDeleted.bind(this));
        (0, _eventJs.Event).listen("chatSelected", this.handleChatSelected.bind(this));
        this.element.addEventListener("blur", this.handleSave.bind(this));
        this.element.addEventListener("keypress", (e)=>{
            if (e.key === "Enter") {
                e.preventDefault();
                this.element.blur();
            }
        });
    }
    handleChatSelected(chat) {
        this.chat = chat;
        this.setTitle(chat.title);
    }
    handleChatDeleted(chat) {
        if (chat.id === this.chat.id) this.setTitle(this.defaultTitle);
    }
    async handleSave() {
        let title = this.element.textContent.trim();
        if (title.length === 0) {
            title = this.defaultTitle;
            this.element.classList.add("error");
        } else this.element.classList.remove("error");
        const chat = await (0, _appControllerJs.AppController).getCurrentChat();
        if (chat) await (0, _appControllerJs.AppController).updateChat(chat, {
            title
        });
        else await (0, _appControllerJs.AppController).createChat({
            title
        });
    }
}

},{"./Event.js":"ZKUT3","./AppController.js":"dUrsU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2VTSS":[function(require,module,exports) {
// TODO: Move code here from App.js and ChatArea.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChatForm", ()=>ChatForm);
class ChatForm {
    constructor(){
        this.chatHistory = document.getElementById("chat-history");
        this.messageInput = document.getElementById("message-input");
        this.sendButton = document.getElementById("send-button");
        this.abortButton = document.getElementById("abort-button");
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["3pyWu","4pp4s"], "4pp4s", "parcelRequire461f")

//# sourceMappingURL=index.4de9b498.js.map
