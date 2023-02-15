/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 138:
/***/ ((module) => {

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 94:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 64:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ }),

/***/ 833:
/***/ ((module) => {

module.exports = eval("require")("moment");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require2_(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require2_);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require2_.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require2_.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require2_.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require2_.o(definition, key) && !__nccwpck_require2_.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require2_.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require2_.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require2_ !== 'undefined') __nccwpck_require2_.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__nccwpck_require2_.r(__webpack_exports__);
/* harmony export */ __nccwpck_require2_.d(__webpack_exports__, {
/* harmony export */   "run": () => (/* binding */ run)
/* harmony export */ });
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require2_(94);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nccwpck_require2_.n(_actions_core__WEBPACK_IMPORTED_MODULE_0__);


const core = __nccwpck_require2_(94);
const axios = __nccwpck_require2_(64);
const moment = __nccwpck_require2_(833);

const run = () => {
    try {
        let globalAnnotation = true;
        const grafanaHost = core.getInput("grafanaHost", {required: true});
        const grafanaToken = core.getInput("grafanaToken", {required: true});
        const grafanaTags = core.getInput("grafanaTags").split("\n").filter(x => x !== "");
        const grafanaDashboardID = Number.parseInt(core.getInput("grafanaDashboardID"), 10) || undefined;
        const grafanaPanelID = Number.parseInt(core.getInput("grafanaPanelID"),10) || undefined;
        const grafanaText = core.getInput("grafanaText", {required: true});
        const grafanaAnnotationID = Number.parseInt(core.getInput("grafanaAnnotationID"), 10) || undefined;
        const ignoreSslCert = (core.getInput("grafanaAnnotationID") || "false").toLowerCase() === 'true';

        const httpsAgent = new https.Agent({ rejectUnauthorized: ignoreSslCert })

        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${grafanaToken}`
        };

        if (grafanaAnnotationID === undefined) {
            console.log("creating a new annotation")

            if ((grafanaDashboardID === undefined && grafanaPanelID !== undefined) ||
                (grafanaDashboardID !== undefined && grafanaPanelID === undefined)) {
                return (0,_actions_core__WEBPACK_IMPORTED_MODULE_0__.error)('must supply both grafanaDashboardID, grafanaPanelID or none.')
            }

            if (grafanaDashboardID !== undefined && grafanaPanelID !== undefined) {
                console.log("Dashboard and panel specified, non global annotation will be created.")
                globalAnnotation = false
            }

            let payload = {
                tags: grafanaTags,
                text: grafanaText
            };

            if (!globalAnnotation) {
                payload.dashboardId = grafanaDashboardID;
                payload.panelId = grafanaPanelID;
            }

            console.log("payload: " + JSON.stringify(payload));

            axios.post(
                `${grafanaHost}/api/annotations`,
                payload,
                {
                    headers: headers,
                    httpsAgent: httpsAgent
                }
            ).then((response) => {
                if (response.status !== 200) {
                    console.warn("non 200 status code from post /api/annotations: " + response.status)
                    core.setFailed("post request had failed");
                }

                const annotationId = response.data.id;
                console.log(`successfully created an annotation with the following id [${annotationId}]`)
                core.setOutput("annotation-id", annotationId);
            }).catch((err) => {
                console.error(err);
                core.setFailed(err.message);
            });

        } else {
            console.log("updating the end time of existing annotation");
            let payload = {
                timeEnd: moment.now().valueOf()
            };

            console.log(`updating the 'time-end' of annotation [${grafanaAnnotationID}]`);
            axios.patch(
                `${grafanaHost}/api/annotations/${grafanaAnnotationID}`,
                payload,
                {
                    headers: headers,
                    httpsAgent: httpsAgent
                }
            ).then((response) => {
                if (response.status !== 200) {
                    console.warn("non 200 status code from patch /api/annotations: " + response.status)
                    core.setFailed("patch request had failed");
                }
                console.log("successfully updated the annotation with time-end");
            }).catch((err) => {
                console.error(err);
                core.setFailed(err.message);
            });
        }
    } catch (error) {
        core.setFailed(error.message);
    }
};

run();
})();

module.exports = __webpack_exports__;
/******/ })()
;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(138);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;