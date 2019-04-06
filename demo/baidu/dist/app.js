/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Animator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Animator.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _Queue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Queue.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Queue.js");



const Animator = {
  nextDraw: null,
  frames: new _Queue_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
  timeouts: new _Queue_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
  immediates: new _Queue_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
  timer: () => _utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].window.performance || _utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].window.Date,
  transforms: [],

  frame (fn) {
    // Store the node
    var node = Animator.frames.push({ run: fn })

    // Request an animation frame if we don't have one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].window.requestAnimationFrame(Animator._draw)
    }

    // Return the node so we can remove it easily
    return node
  },

  timeout (fn, delay) {
    delay = delay || 0

    // Work out when the event should fire
    var time = Animator.timer().now() + delay

    // Add the timeout to the end of the queue
    var node = Animator.timeouts.push({ run: fn, time: time })

    // Request another animation frame if we need one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].window.requestAnimationFrame(Animator._draw)
    }

    return node
  },

  immediate (fn) {
    // Add the immediate fn to the end of the queue
    var node = Animator.immediates.push(fn)
    // Request another animation frame if we need one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].window.requestAnimationFrame(Animator._draw)
    }

    return node
  },

  cancelFrame (node) {
    node != null && Animator.frames.remove(node)
  },

  clearTimeout (node) {
    node != null && Animator.timeouts.remove(node)
  },

  cancelImmediate (node) {
    node != null && Animator.immediates.remove(node)
  },

  _draw (now) {
    // Run all the timeouts we can run, if they are not ready yet, add them
    // to the end of the queue immediately! (bad timeouts!!! [sarcasm])
    var nextTimeout = null
    var lastTimeout = Animator.timeouts.last()
    while ((nextTimeout = Animator.timeouts.shift())) {
      // Run the timeout if its time, or push it to the end
      if (now >= nextTimeout.time) {
        nextTimeout.run()
      } else {
        Animator.timeouts.push(nextTimeout)
      }

      // If we hit the last item, we should stop shifting out more items
      if (nextTimeout === lastTimeout) break
    }

    // Run all of the animation frames
    var nextFrame = null
    var lastFrame = Animator.frames.last()
    while ((nextFrame !== lastFrame) && (nextFrame = Animator.frames.shift())) {
      nextFrame.run(now)
    }

    var nextImmediate = null
    while ((nextImmediate = Animator.immediates.shift())) {
      nextImmediate()
    }

    // If we have remaining timeouts or frames, draw until we don't anymore
    Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first()
      ? _utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].window.requestAnimationFrame(Animator._draw)
      : null
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Animator);


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Controller.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Controller.js ***!
  \*******************************************************************/
/*! exports provided: easing, Stepper, Ease, Controller, Spring, PID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easing", function() { return easing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stepper", function() { return Stepper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ease", function() { return Ease; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spring", function() { return Spring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PID", function() { return PID; });
/* harmony import */ var _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/defaults.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");



/***
Base Class
==========
The base stepper class that will be
***/

function makeSetterGetter (k, f) {
  return function (v) {
    if (v == null) return this[v]
    this[k] = v
    if (f) f.call(this)
    return this
  }
}

let easing = {
  '-': function (pos) {
    return pos
  },
  '<>': function (pos) {
    return -Math.cos(pos * Math.PI) / 2 + 0.5
  },
  '>': function (pos) {
    return Math.sin(pos * Math.PI / 2)
  },
  '<': function (pos) {
    return -Math.cos(pos * Math.PI / 2) + 1
  },
  bezier: function (x1, y1, x2, y2) {
    // see https://www.w3.org/TR/css-easing-1/#cubic-bezier-algo
    return function (t) {
      if (t < 0) {
        if (x1 > 0) {
          return y1 / x1 * t
        } else if (x2 > 0) {
          return y2 / x2 * t
        } else {
          return 0
        }
      } else if (t > 1) {
        if (x2 < 1) {
          return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2)
        } else if (x1 < 1) {
          return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1)
        } else {
          return 1
        }
      } else {
        return 3 * t * (1 - t) ** 2 * y1 + 3 * t ** 2 * (1 - t) * y2 + t ** 3
      }
    }
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function (steps, stepPosition = 'end') {
    // deal with "jump-" prefix
    stepPosition = stepPosition.split('-').reverse()[0]

    let jumps = steps
    if (stepPosition === 'none') {
      --jumps
    } else if (stepPosition === 'both') {
      ++jumps
    }

    // The beforeFlag is essentially useless
    return (t, beforeFlag = false) => {
      // Step is called currentStep in referenced url
      let step = Math.floor(t * steps)
      const jumping = (t * step) % 1 === 0

      if (stepPosition === 'start' || stepPosition === 'both') {
        ++step
      }

      if (beforeFlag && jumping) {
        --step
      }

      if (t >= 0 && step < 0) {
        step = 0
      }

      if (t <= 1 && step > jumps) {
        step = jumps
      }

      return step / jumps
    }
  }
}

class Stepper {
  done () {
    return false
  }
}

/***
Easing Functions
================
***/

class Ease extends Stepper {
  constructor (fn) {
    super()
    this.ease = easing[fn || _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_0__["timeline"].ease] || fn
  }

  step (from, to, pos) {
    if (typeof from !== 'number') {
      return pos < 1 ? from : to
    }
    return from + (to - from) * this.ease(pos)
  }
}

/***
Controller Types
================
***/

class Controller extends Stepper {
  constructor (fn) {
    super()
    this.stepper = fn
  }

  step (current, target, dt, c) {
    return this.stepper(current, target, dt, c)
  }

  done (c) {
    return c.done
  }
}

function recalculate () {
  // Apply the default parameters
  var duration = (this._duration || 500) / 1000
  var overshoot = this._overshoot || 0

  // Calculate the PID natural response
  var eps = 1e-10
  var pi = Math.PI
  var os = Math.log(overshoot / 100 + eps)
  var zeta = -os / Math.sqrt(pi * pi + os * os)
  var wn = 3.9 / (zeta * duration)

  // Calculate the Spring values
  this.d = 2 * zeta * wn
  this.k = wn * wn
}

class Spring extends Controller {
  constructor (duration, overshoot) {
    super()
    this.duration(duration || 500)
      .overshoot(overshoot || 0)
  }

  step (current, target, dt, c) {
    if (typeof current === 'string') return current
    c.done = dt === Infinity
    if (dt === Infinity) return target
    if (dt === 0) return current

    if (dt > 100) dt = 16

    dt /= 1000

    // Get the previous velocity
    var velocity = c.velocity || 0

    // Apply the control to get the new position and store it
    var acceleration = -this.d * velocity - this.k * (current - target)
    var newPosition = current
      + velocity * dt
      + acceleration * dt * dt / 2

    // Store the velocity
    c.velocity = velocity + acceleration * dt

    // Figure out if we have converged, and if so, pass the value
    c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002
    return c.done ? target : newPosition
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(Spring, {
  duration: makeSetterGetter('_duration', recalculate),
  overshoot: makeSetterGetter('_overshoot', recalculate)
})

class PID extends Controller {
  constructor (p, i, d, windup) {
    super()

    p = p == null ? 0.1 : p
    i = i == null ? 0.01 : i
    d = d == null ? 0 : d
    windup = windup == null ? 1000 : windup
    this.p(p).i(i).d(d).windup(windup)
  }

  step (current, target, dt, c) {
    if (typeof current === 'string') return current
    c.done = dt === Infinity

    if (dt === Infinity) return target
    if (dt === 0) return current

    var p = target - current
    var i = (c.integral || 0) + p * dt
    var d = (p - (c.error || 0)) / dt
    var windup = this.windup

    // antiwindup
    if (windup !== false) {
      i = Math.max(-windup, Math.min(i, windup))
    }

    c.error = p
    c.integral = i

    c.done = Math.abs(p) < 0.001

    return c.done ? target : current + (this.P * p + this.I * i + this.D * d)
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(PID, {
  windup: makeSetterGetter('windup'),
  p: makeSetterGetter('P'),
  i: makeSetterGetter('I'),
  d: makeSetterGetter('D')
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Morphable.js":
/*!******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Morphable.js ***!
  \******************************************************************/
/*! exports provided: default, NonMorphable, TransformBag, ObjectBag, registerMorphableType, makeMorphable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Morphable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonMorphable", function() { return NonMorphable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformBag", function() { return TransformBag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectBag", function() { return ObjectBag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerMorphableType", function() { return registerMorphableType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeMorphable", function() { return makeMorphable; });
/* harmony import */ var _Controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Controller.js");
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _types_Color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/Color.js */ "./node_modules/@svgdotjs/svg.js/src/types/Color.js");
/* harmony import */ var _types_PathArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/PathArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js");
/* harmony import */ var _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types/SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");








class Morphable {
  constructor (stepper) {
    this._stepper = stepper || new _Controller_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]('-')

    this._from = null
    this._to = null
    this._type = null
    this._context = null
    this._morphObj = null
  }

  from (val) {
    if (val == null) {
      return this._from
    }

    this._from = this._set(val)
    return this
  }

  to (val) {
    if (val == null) {
      return this._to
    }

    this._to = this._set(val)
    return this
  }

  type (type) {
    // getter
    if (type == null) {
      return this._type
    }

    // setter
    this._type = type
    return this
  }

  _set (value) {
    if (!this._type) {
      var type = typeof value

      if (type === 'number') {
        this.type(_types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_6__["default"])
      } else if (type === 'string') {
        if (_types_Color_js__WEBPACK_IMPORTED_MODULE_3__["default"].isColor(value)) {
          this.type(_types_Color_js__WEBPACK_IMPORTED_MODULE_3__["default"])
        } else if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_1__["delimiter"].test(value)) {
          this.type(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_1__["pathLetters"].test(value)
            ? _types_PathArray_js__WEBPACK_IMPORTED_MODULE_4__["default"]
            : _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_5__["default"]
          )
        } else if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_1__["numberAndUnit"].test(value)) {
          this.type(_types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_6__["default"])
        } else {
          this.type(NonMorphable)
        }
      } else if (morphableTypes.indexOf(value.constructor) > -1) {
        this.type(value.constructor)
      } else if (Array.isArray(value)) {
        this.type(_types_SVGArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])
      } else if (type === 'object') {
        this.type(ObjectBag)
      } else {
        this.type(NonMorphable)
      }
    }

    var result = (new this._type(value))
    if (this._type === _types_Color_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      result = this._to ? result[this._to[4]]()
        : this._from ? result[this._from[4]]()
        : result
    }
    result = result.toArray()

    this._morphObj = this._morphObj || new this._type()
    this._context = this._context
      || Array.apply(null, Array(result.length))
        .map(Object)
        .map(function (o) {
          o.done = true
          return o
        })
    return result
  }

  stepper (stepper) {
    if (stepper == null) return this._stepper
    this._stepper = stepper
    return this
  }

  done () {
    var complete = this._context
      .map(this._stepper.done)
      .reduce(function (last, curr) {
        return last && curr
      }, true)
    return complete
  }

  at (pos) {
    var _this = this

    return this._morphObj.fromArray(
      this._from.map(function (i, index) {
        return _this._stepper.step(i, _this._to[index], pos, _this._context[index], _this._context)
      })
    )
  }
}

class NonMorphable {
  constructor (...args) {
    this.init(...args)
  }

  init (val) {
    val = Array.isArray(val) ? val[0] : val
    this.value = val
    return this
  }

  valueOf () {
    return this.value
  }

  toArray () {
    return [ this.value ]
  }
}

class TransformBag {
  constructor (...args) {
    this.init(...args)
  }

  init (obj) {
    if (Array.isArray(obj)) {
      obj = {
        scaleX: obj[0],
        scaleY: obj[1],
        shear: obj[2],
        rotate: obj[3],
        translateX: obj[4],
        translateY: obj[5],
        originX: obj[6],
        originY: obj[7]
      }
    }

    Object.assign(this, TransformBag.defaults, obj)
    return this
  }

  toArray () {
    var v = this

    return [
      v.scaleX,
      v.scaleY,
      v.shear,
      v.rotate,
      v.translateX,
      v.translateY,
      v.originX,
      v.originY
    ]
  }
}

TransformBag.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
}

class ObjectBag {
  constructor (...args) {
    this.init(...args)
  }

  init (objOrArr) {
    this.values = []

    if (Array.isArray(objOrArr)) {
      this.values = objOrArr
      return
    }

    objOrArr = objOrArr || {}
    var entries = []

    for (let i in objOrArr) {
      entries.push([i, objOrArr[i]])
    }

    entries.sort((a, b) => {
      return a[0] - b[0]
    })

    this.values = entries.reduce((last, curr) => last.concat(curr), [])
    return this
  }

  valueOf () {
    var obj = {}
    var arr = this.values

    for (var i = 0, len = arr.length; i < len; i += 2) {
      obj[arr[i]] = arr[i + 1]
    }

    return obj
  }

  toArray () {
    return this.values
  }
}

const morphableTypes = [
  NonMorphable,
  TransformBag,
  ObjectBag
]

function registerMorphableType (type = []) {
  morphableTypes.push(...[].concat(type))
}

function makeMorphable () {
  Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__["extend"])(morphableTypes, {
    to (val) {
      return new Morphable()
        .type(this.constructor)
        .from(this.valueOf())
        .to(val)
    },
    fromArray (arr) {
      this.init(arr)
      return this
    }
  })
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Queue.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Queue.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Queue; });
class Queue {
  constructor () {
    this._first = null
    this._last = null
  }

  push (value) {
    // An item stores an id and the provided value
    var item = value.next ? value : { value: value, next: null, prev: null }

    // Deal with the queue being empty or populated
    if (this._last) {
      item.prev = this._last
      this._last.next = item
      this._last = item
    } else {
      this._last = item
      this._first = item
    }

    // Return the current item
    return item
  }

  shift () {
    // Check if we have a value
    var remove = this._first
    if (!remove) return null

    // If we do, remove it and relink things
    this._first = remove.next
    if (this._first) this._first.prev = null
    this._last = this._first ? this._last : null
    return remove.value
  }

  // Shows us the first item in the list
  first () {
    return this._first && this._first.value
  }

  // Shows us the last item in the list
  last () {
    return this._last && this._last.value
  }

  // Removes the item that was returned from the push
  remove (item) {
    // Relink the previous item
    if (item.prev) item.prev.next = item.next
    if (item.next) item.next.prev = item.prev
    if (item === this._last) this._last = item.prev
    if (item === this._first) this._first = item.next

    // Invalidate item
    item.prev = null
    item.next = null
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Runner.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Runner.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Runner; });
/* harmony import */ var _Controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Controller.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/gradiented.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/defaults.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/circled.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js");
/* harmony import */ var _Animator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Animator.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Animator.js");
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../types/EventTarget.js */ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _Morphable_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Morphable.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Morphable.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Timeline_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Timeline.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Timeline.js");
















class Runner extends _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_9__["default"] {
  constructor (options) {
    super()

    // Store a unique id on the runner, so that we can identify it later
    this.id = Runner.id++

    // Ensure a default value
    options = options == null
      ? _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__["timeline"].duration
      : options

    // Ensure that we get a controller
    options = typeof options === 'function'
      ? new _Controller_js__WEBPACK_IMPORTED_MODULE_0__["Controller"](options)
      : options

    // Declare all of the variables
    this._element = null
    this._timeline = null
    this.done = false
    this._queue = []

    // Work out the stepper and the duration
    this._duration = typeof options === 'number' && options
    this._isDeclarative = options instanceof _Controller_js__WEBPACK_IMPORTED_MODULE_0__["Controller"]
    this._stepper = this._isDeclarative ? options : new _Controller_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]()

    // We copy the current values from the timeline because they can change
    this._history = {}

    // Store the state of the runner
    this.enabled = true
    this._time = 0
    this._lastTime = 0

    // At creation, the runner is in reseted state
    this._reseted = true

    // Save transforms applied to this runner
    this.transforms = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]()
    this.transformId = 1

    // Looping variables
    this._haveReversed = false
    this._reverse = false
    this._loopsDone = 0
    this._swing = false
    this._wait = 0
    this._times = 1

    this._frameId = null

    // Stores how long a runner is stored after beeing done
    this._persist = this._isDeclarative ? true : null
  }

  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */

  element (element) {
    if (element == null) return this._element
    this._element = element
    element._prepareRunner()
    return this
  }

  timeline (timeline) {
    // check explicitly for undefined so we can set the timeline to null
    if (typeof timeline === 'undefined') return this._timeline
    this._timeline = timeline
    return this
  }

  animate (duration, delay, when) {
    var o = Runner.sanitise(duration, delay, when)
    var runner = new Runner(o.duration)
    if (this._timeline) runner.timeline(this._timeline)
    if (this._element) runner.element(this._element)
    return runner.loop(o).schedule(delay, when)
  }

  schedule (timeline, delay, when) {
    // The user doesn't need to pass a timeline if we already have one
    if (!(timeline instanceof _Timeline_js__WEBPACK_IMPORTED_MODULE_14__["default"])) {
      when = delay
      delay = timeline
      timeline = this.timeline()
    }

    // If there is no timeline, yell at the user...
    if (!timeline) {
      throw Error('Runner cannot be scheduled without timeline')
    }

    // Schedule the runner on the timeline provided
    timeline.schedule(this, delay, when)
    return this
  }

  unschedule () {
    var timeline = this.timeline()
    timeline && timeline.unschedule(this)
    return this
  }

  loop (times, swing, wait) {
    // Deal with the user passing in an object
    if (typeof times === 'object') {
      swing = times.swing
      wait = times.wait
      times = times.times
    }

    // Sanitise the values and store them
    this._times = times || Infinity
    this._swing = swing || false
    this._wait = wait || 0

    // Allow true to be passed
    if (this._times === true) { this._times = Infinity }

    return this
  }

  delay (delay) {
    return this.animate(0, delay)
  }

  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */

  queue (initFn, runFn, retargetFn, isTransform) {
    this._queue.push({
      initialiser: initFn || _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__["noop"],
      runner: runFn || _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__["noop"],
      retarget: retargetFn,
      isTransform: isTransform,
      initialised: false,
      finished: false
    })
    var timeline = this.timeline()
    timeline && this.timeline()._continue()
    return this
  }

  during (fn) {
    return this.queue(null, fn)
  }

  after (fn) {
    return this.on('finished', fn)
  }

  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */

  time (time) {
    if (time == null) {
      return this._time
    }
    let dt = time - this._time
    this.step(dt)
    return this
  }

  duration () {
    return this._times * (this._wait + this._duration) - this._wait
  }

  loops (p) {
    var loopDuration = this._duration + this._wait
    if (p == null) {
      var loopsDone = Math.floor(this._time / loopDuration)
      var relativeTime = (this._time - loopsDone * loopDuration)
      var position = relativeTime / this._duration
      return Math.min(loopsDone + position, this._times)
    }
    var whole = Math.floor(p)
    var partial = p % 1
    var time = loopDuration * whole + this._duration * partial
    return this.time(time)
  }

  persist (dtOrForever) {
    if (dtOrForever == null) return this._persist
    this._persist = dtOrForever
    return this
  }

  position (p) {
    // Get all of the variables we need
    var x = this._time
    var d = this._duration
    var w = this._wait
    var t = this._times
    var s = this._swing
    var r = this._reverse
    var position

    if (p == null) {
      /*
      This function converts a time to a position in the range [0, 1]
      The full explanation can be found in this desmos demonstration
        https://www.desmos.com/calculator/u4fbavgche
      The logic is slightly simplified here because we can use booleans
      */

      // Figure out the value without thinking about the start or end time
      const f = function (x) {
        var swinging = s * Math.floor(x % (2 * (w + d)) / (w + d))
        var backwards = (swinging && !r) || (!swinging && r)
        var uncliped = Math.pow(-1, backwards) * (x % (w + d)) / d + backwards
        var clipped = Math.max(Math.min(uncliped, 1), 0)
        return clipped
      }

      // Figure out the value by incorporating the start time
      var endTime = t * (w + d) - w
      position = x <= 0 ? Math.round(f(1e-5))
        : x < endTime ? f(x)
        : Math.round(f(endTime - 1e-5))
      return position
    }

    // Work out the loops done and add the position to the loops done
    var loopsDone = Math.floor(this.loops())
    var swingForward = s && (loopsDone % 2 === 0)
    var forwards = (swingForward && !r) || (r && swingForward)
    position = loopsDone + (forwards ? p : 1 - p)
    return this.loops(position)
  }

  progress (p) {
    if (p == null) {
      return Math.min(1, this._time / this.duration())
    }
    return this.time(p * this.duration())
  }

  step (dt) {
    // If we are inactive, this stepper just gets skipped
    if (!this.enabled) return this

    // Update the time and get the new position
    dt = dt == null ? 16 : dt
    this._time += dt
    var position = this.position()

    // Figure out if we need to run the stepper in this frame
    var running = this._lastPosition !== position && this._time >= 0
    this._lastPosition = position

    // Figure out if we just started
    var duration = this.duration()
    var justStarted = this._lastTime <= 0 && this._time > 0
    var justFinished = this._lastTime < duration && this._time >= duration

    this._lastTime = this._time
    if (justStarted) {
      this.fire('start', this)
    }

    // Work out if the runner is finished set the done flag here so animations
    // know, that they are running in the last step (this is good for
    // transformations which can be merged)
    var declarative = this._isDeclarative
    this.done = !declarative && !justFinished && this._time >= duration

    // Runner is running. So its not in reseted state anymore
    this._reseted = false

    // Call initialise and the run function
    if (running || declarative) {
      this._initialise(running)

      // clear the transforms on this runner so they dont get added again and again
      this.transforms = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]()
      var converged = this._run(declarative ? dt : position)

      this.fire('step', this)
    }
    // correct the done flag here
    // declaritive animations itself know when they converged
    this.done = this.done || (converged && declarative)
    if (justFinished) {
      this.fire('finished', this)
    }
    return this
  }

  reset () {
    if (this._reseted) return this
    this.time(0)
    this._reseted = true
    return this
  }

  finish () {
    return this.step(Infinity)
  }

  reverse (reverse) {
    this._reverse = reverse == null ? !this._reverse : reverse
    return this
  }

  ease (fn) {
    this._stepper = new _Controller_js__WEBPACK_IMPORTED_MODULE_0__["Ease"](fn)
    return this
  }

  active (enabled) {
    if (enabled == null) return this.enabled
    this.enabled = enabled
    return this
  }

  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */

  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher (method, morpher) {
    this._history[method] = {
      morpher: morpher,
      caller: this._queue[this._queue.length - 1]
    }

    // We have to resume the timeline in case a controller
    // is already done without beeing ever run
    // This can happen when e.g. this is done:
    //    anim = el.animate(new SVG.Spring)
    // and later
    //    anim.move(...)
    if (this._isDeclarative) {
      var timeline = this.timeline()
      timeline && timeline.play()
    }
  }

  // Try to set the target for a morpher if the morpher exists, otherwise
  // do nothing and return false
  _tryRetarget (method, target, extra) {
    if (this._history[method]) {
      // if the last method wasnt even initialised, throw it away
      if (!this._history[method].caller.initialised) {
        let index = this._queue.indexOf(this._history[method].caller)
        this._queue.splice(index, 1)
        return false
      }

      // for the case of transformations, we use the special retarget function
      // which has access to the outer scope
      if (this._history[method].caller.retarget) {
        this._history[method].caller.retarget(target, extra)
        // for everything else a simple morpher change is sufficient
      } else {
        this._history[method].morpher.to(target)
      }

      this._history[method].caller.finished = false
      var timeline = this.timeline()
      timeline && timeline.play()
      return true
    }
    return false
  }

  // Run each initialise function in the runner if required
  _initialise (running) {
    // If we aren't running, we shouldn't initialise when not declarative
    if (!running && !this._isDeclarative) return

    // Loop through all of the initialisers
    for (var i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current initialiser
      var current = this._queue[i]

      // Determine whether we need to initialise
      var needsIt = this._isDeclarative || (!current.initialised && running)
      running = !current.finished

      // Call the initialiser if we need to
      if (needsIt && running) {
        current.initialiser.call(this)
        current.initialised = true
      }
    }
  }

  // Run each run function for the position or dt given
  _run (positionOrDt) {
    // Run all of the _queue directly
    var allfinished = true
    for (var i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current function to run
      var current = this._queue[i]

      // Run the function if its not finished, we keep track of the finished
      // flag for the sake of declarative _queue
      var converged = current.runner.call(this, positionOrDt)
      current.finished = current.finished || (converged === true)
      allfinished = allfinished && current.finished
    }

    // We report when all of the constructors are finished
    return allfinished
  }

  addTransform (transform, index) {
    this.transforms.lmultiplyO(transform)
    return this
  }

  clearTransform () {
    this.transforms = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]()
    return this
  }

  // TODO: Keep track of all transformations so that deletion is faster
  clearTransformsFromQueue () {
    if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
      this._queue = this._queue.filter((item) => {
        return !item.isTransform
      })
    }
  }

  static sanitise (duration, delay, when) {
    // Initialise the default parameters
    var times = 1
    var swing = false
    var wait = 0
    duration = duration || _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__["timeline"].duration
    delay = delay || _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__["timeline"].delay
    when = when || 'last'

    // If we have an object, unpack the values
    if (typeof duration === 'object' && !(duration instanceof _Controller_js__WEBPACK_IMPORTED_MODULE_0__["Stepper"])) {
      delay = duration.delay || delay
      when = duration.when || when
      swing = duration.swing || swing
      times = duration.times || times
      wait = duration.wait || wait
      duration = duration.duration || _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_4__["timeline"].duration
    }

    return {
      duration: duration,
      delay: delay,
      swing: swing,
      times: times,
      wait: wait,
      when: when
    }
  }
}

Runner.id = 0

class FakeRunner {
  constructor (transforms = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"](), id = -1, done = true) {
    this.transforms = transforms
    this.id = id
    this.done = done
  }

  clearTransformsFromQueue () { }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["extend"])([ Runner, FakeRunner ], {
  mergeWith (runner) {
    return new FakeRunner(
      runner.transforms.lmultiply(this.transforms),
      runner.id
    )
  }
})

// FakeRunner.emptyRunner = new FakeRunner()

const lmultiply = (last, curr) => last.lmultiplyO(curr)
const getRunnerTransform = (runner) => runner.transforms

function mergeTransforms () {
  // Find the matrix to apply to the element and apply it
  let runners = this._transformationRunners.runners
  let netTransform = runners
    .map(getRunnerTransform)
    .reduce(lmultiply, new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]())

  this.transform(netTransform)

  this._transformationRunners.merge()

  if (this._transformationRunners.length() === 1) {
    this._frameId = null
  }
}

class RunnerArray {
  constructor () {
    this.runners = []
    this.ids = []
  }

  add (runner) {
    if (this.runners.includes(runner)) return
    let id = runner.id + 1

    this.runners.push(runner)
    this.ids.push(id)

    return this
  }

  getByID (id) {
    return this.runners[this.ids.indexOf(id + 1)]
  }

  remove (id) {
    let index = this.ids.indexOf(id + 1)
    this.ids.splice(index, 1)
    this.runners.splice(index, 1)
    return this
  }

  merge () {
    let lastRunner = null
    this.runners.forEach((runner, i) => {

      const condition = lastRunner
        && runner.done && lastRunner.done
        // don't merge runner when persisted on timeline
        && (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id))
        && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id))

      if (condition) {
        // the +1 happens in the function
        this.remove(runner.id)
        this.edit(lastRunner.id, runner.mergeWith(lastRunner))
      }

      lastRunner = runner
    })

    return this
  }

  edit (id, newRunner) {
    let index = this.ids.indexOf(id + 1)
    this.ids.splice(index, 1, id + 1)
    this.runners.splice(index, 1, newRunner)
    return this
  }

  length () {
    return this.ids.length
  }

  clearBefore (id) {
    let deleteCnt = this.ids.indexOf(id + 1) || 1
    this.ids.splice(0, deleteCnt, 0)
    this.runners.splice(0, deleteCnt, new FakeRunner())
      .forEach((r) => r.clearTransformsFromQueue())
    return this
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_5__["registerMethods"])({
  Element: {
    animate (duration, delay, when) {
      var o = Runner.sanitise(duration, delay, when)
      var timeline = this.timeline()
      return new Runner(o.duration)
        .loop(o)
        .element(this)
        .timeline(timeline.play())
        .schedule(delay, when)
    },

    delay (by, when) {
      return this.animate(0, by, when)
    },

    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwfrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore (currentRunner) {
      this._transformationRunners.clearBefore(currentRunner.id)
    },

    _currentTransform (current) {
      return this._transformationRunners.runners
        // we need the equal sign here to make sure, that also transformations
        // on the same runner which execute before the current transformation are
        // taken into account
        .filter((runner) => runner.id <= current.id)
        .map(getRunnerTransform)
        .reduce(lmultiply, new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]())
    },

    _addRunner (runner) {
      this._transformationRunners.add(runner)

      // Make sure that the runner merge is executed at the very end of
      // all Animator functions. Thats why we use immediate here to execute
      // the merge right after all frames are run
      _Animator_js__WEBPACK_IMPORTED_MODULE_7__["default"].cancelImmediate(this._frameId)
      this._frameId = _Animator_js__WEBPACK_IMPORTED_MODULE_7__["default"].immediate(mergeTransforms.bind(this))
    },

    _prepareRunner () {
      if (this._frameId == null) {
        this._transformationRunners = new RunnerArray()
          .add(new FakeRunner(new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"](this)))
      }
    }
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(Runner, {
  attr (a, v) {
    return this.styleAttr('attr', a, v)
  },

  // Add animatable styles
  css (s, v) {
    return this.styleAttr('css', s, v)
  },

  styleAttr (type, name, val) {
    // apply attributes individually
    if (typeof name === 'object') {
      for (var key in name) {
        this.styleAttr(type, key, name[key])
      }
      return this
    }

    var morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper).to(val)

    this.queue(function () {
      morpher = morpher.from(this.element()[type](name))
    }, function (pos) {
      this.element()[type](name, morpher.at(pos))
      return morpher.done()
    })

    return this
  },

  zoom (level, point) {
    if (this._tryRetarget('zoom', _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_2__["to"], point)) return this

    var morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper).to(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__["default"](level))

    this.queue(function () {
      morpher = morpher.from(this.element().zoom())
    }, function (pos) {
      this.element().zoom(morpher.at(pos), point)
      return morpher.done()
    }, function (newLevel, newPoint) {
      point = newPoint
      morpher.to(newLevel)
    })

    this._rememberMorpher('zoom', morpher)
    return this
  },

  /**
   ** absolute transformations
   **/

  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)

  transform (transforms, relative, affine) {
    // If we have a declarative function, we should retarget it if possible
    relative = transforms.relative || relative
    if (this._isDeclarative && !relative && this._tryRetarget('transform', transforms)) {
      return this
    }

    // Parse the parameters
    var isMatrix = _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"].isMatrixLike(transforms)
    affine = transforms.affine != null
      ? transforms.affine
      : (affine != null ? affine : !isMatrix)

    // Create a morepher and set its type
    const morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper)
      .type(affine ? _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["TransformBag"] : _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"])

    let origin
    let element
    let current
    let currentAngle
    let startTransform

    function setup () {
      // make sure element and origin is defined
      element = element || this.element()
      origin = origin || Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["getOrigin"])(transforms, element)

      startTransform = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"](relative ? undefined : element)

      // add the runner to the element so it can merge transformations
      element._addRunner(this)

      // Deactivate all transforms that have run so far if we are absolute
      if (!relative) {
        element._clearTransformRunnersBefore(this)
      }
    }

    function run (pos) {
      // clear all other transforms before this in case something is saved
      // on this runner. We are absolute. We dont need these!
      if (!relative) this.clearTransform()

      let { x, y } = new _types_Point_js__WEBPACK_IMPORTED_MODULE_12__["default"](origin).transform(element._currentTransform(this))

      let target = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"]({ ...transforms, origin: [ x, y ] })
      let start = this._isDeclarative && current
        ? current
        : startTransform

      if (affine) {
        target = target.decompose(x, y)
        start = start.decompose(x, y)

        // Get the current and target angle as it was set
        const rTarget = target.rotate
        const rCurrent = start.rotate

        // Figure out the shortest path to rotate directly
        const possibilities = [ rTarget - 360, rTarget, rTarget + 360 ]
        const distances = possibilities.map(a => Math.abs(a - rCurrent))
        const shortest = Math.min(...distances)
        const index = distances.indexOf(shortest)
        target.rotate = possibilities[index]
      }

      if (relative) {
        // we have to be careful here not to overwrite the rotation
        // with the rotate method of Matrix
        if (!isMatrix) {
          target.rotate = transforms.rotate || 0
        }
        if (this._isDeclarative && currentAngle) {
          start.rotate = currentAngle
        }
      }

      morpher.from(start)
      morpher.to(target)

      let affineParameters = morpher.at(pos)
      currentAngle = affineParameters.rotate
      current = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_10__["default"](affineParameters)

      this.addTransform(current)
      element._addRunner(this)
      return morpher.done()
    }

    function retarget (newTransforms) {
      // only get a new origin if it changed since the last call
      if (
        (newTransforms.origin || 'center').toString()
        !== (transforms.origin || 'center').toString()
      ) {
        origin = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["getOrigin"])(transforms, element)
      }

      // overwrite the old transformations with the new ones
      transforms = { ...newTransforms, origin }
    }

    this.queue(setup, run, retarget, true)
    this._isDeclarative && this._rememberMorpher('transform', morpher)
    return this
  },

  // Animatable x-axis
  x (x, relative) {
    return this._queueNumber('x', x)
  },

  // Animatable y-axis
  y (y) {
    return this._queueNumber('y', y)
  },

  dx (x) {
    return this._queueNumberDelta('x', x)
  },

  dy (y) {
    return this._queueNumberDelta('y', y)
  },

  _queueNumberDelta (method, to) {
    to = new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__["default"](to)

    // Try to change the target if we have this method already registerd
    if (this._tryRetarget(method, to)) return this

    // Make a morpher and queue the animation
    var morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper).to(to)
    var from = null
    this.queue(function () {
      from = this.element()[method]()
      morpher.from(from)
      morpher.to(from + to)
    }, function (pos) {
      this.element()[method](morpher.at(pos))
      return morpher.done()
    }, function (newTo) {
      morpher.to(from + new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__["default"](newTo))
    })

    // Register the morpher so that if it is changed again, we can retarget it
    this._rememberMorpher(method, morpher)
    return this
  },

  _queueObject (method, to) {
    // Try to change the target if we have this method already registerd
    if (this._tryRetarget(method, to)) return this

    // Make a morpher and queue the animation
    var morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper).to(to)
    this.queue(function () {
      morpher.from(this.element()[method]())
    }, function (pos) {
      this.element()[method](morpher.at(pos))
      return morpher.done()
    })

    // Register the morpher so that if it is changed again, we can retarget it
    this._rememberMorpher(method, morpher)
    return this
  },

  _queueNumber (method, value) {
    return this._queueObject(method, new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_13__["default"](value))
  },

  // Animatable center x-axis
  cx (x) {
    return this._queueNumber('cx', x)
  },

  // Animatable center y-axis
  cy (y) {
    return this._queueNumber('cy', y)
  },

  // Add animatable move
  move (x, y) {
    return this.x(x).y(y)
  },

  // Add animatable center
  center (x, y) {
    return this.cx(x).cy(y)
  },

  // Add animatable size
  size (width, height) {
    // animate bbox based size for all other elements
    var box

    if (!width || !height) {
      box = this._element.bbox()
    }

    if (!width) {
      width = box.width / box.height * height
    }

    if (!height) {
      height = box.height / box.width * width
    }

    return this
      .width(width)
      .height(height)
  },

  // Add animatable width
  width (width) {
    return this._queueNumber('width', width)
  },

  // Add animatable height
  height (height) {
    return this._queueNumber('height', height)
  },

  // Add animatable plot
  plot (a, b, c, d) {
    // Lines can be plotted with 4 arguments
    if (arguments.length === 4) {
      return this.plot([ a, b, c, d ])
    }

    if (this._tryRetarget('plot', a)) return this

    var morpher = new _Morphable_js__WEBPACK_IMPORTED_MODULE_11__["default"](this._stepper)
      .type(this._element.MorphArray).to(a)

    this.queue(function () {
      morpher.from(this._element.array())
    }, function (pos) {
      this._element.plot(morpher.at(pos))
      return morpher.done()
    })

    this._rememberMorpher('plot', morpher)
    return this
  },

  // Add leading method
  leading (value) {
    return this._queueNumber('leading', value)
  },

  // Add animatable viewbox
  viewbox (x, y, width, height) {
    return this._queueObject('viewbox', new _types_Box_js__WEBPACK_IMPORTED_MODULE_8__["default"](x, y, width, height))
  },

  update (o) {
    if (typeof o !== 'object') {
      return this.update({
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      })
    }

    if (o.opacity != null) this.attr('stop-opacity', o.opacity)
    if (o.color != null) this.attr('stop-color', o.color)
    if (o.offset != null) this.attr('offset', o.offset)

    return this
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(Runner, { rx: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_6__["rx"], ry: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_6__["ry"], from: _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_2__["from"], to: _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_2__["to"] })
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["register"])(Runner)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/animation/Timeline.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/animation/Timeline.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timeline; });
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Animator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Animator.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Animator.js");
/* harmony import */ var _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/EventTarget.js */ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js");





var makeSchedule = function (runnerInfo) {
  var start = runnerInfo.start
  var duration = runnerInfo.runner.duration()
  var end = start + duration
  return { start: start, duration: duration, end: end, runner: runnerInfo.runner }
}

const defaultSource = function () {
  let w = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].window
  return (w.performance || w.Date).now()
}

class Timeline extends _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Construct a new timeline on the given element
  constructor (timeSource = defaultSource) {
    super()

    this._timeSource = timeSource

    // Store the timing variables
    this._startTime = 0
    this._speed = 1.0

    // Determines how long a runner is hold in memory. Can be a dt or true/false
    this._persist = 0

    // Keep track of the running animations and their starting parameters
    this._nextFrame = null
    this._paused = true
    this._runners = []
    this._runnerIds = []
    this._lastRunnerId = -1
    this._time = 0
    this._lastSourceTime = 0
    this._lastStepTime = 0

    // Make sure that step is always called in class context
    this._step = this._stepFn.bind(this, false)
    this._stepImmediate = this._stepFn.bind(this, true)
  }

  // schedules a runner on the timeline
  schedule (runner, delay, when) {
    if (runner == null) {
      return this._runners.map(makeSchedule)
    }

    // The start time for the next animation can either be given explicitly,
    // derived from the current timeline time or it can be relative to the
    // last start time to chain animations direclty

    var absoluteStartTime = 0
    var endTime = this.getEndTime()
    delay = delay || 0

    // Work out when to start the animation
    if (when == null || when === 'last' || when === 'after') {
      // Take the last time and increment
      absoluteStartTime = endTime
    } else if (when === 'absolute' || when === 'start') {
      absoluteStartTime = delay
      delay = 0
    } else if (when === 'now') {
      absoluteStartTime = this._time
    } else if (when === 'relative') {
      let runnerInfo = this._runners[runner.id]
      if (runnerInfo) {
        absoluteStartTime = runnerInfo.start + delay
        delay = 0
      }
    } else {
      throw new Error('Invalid value for the "when" parameter')
    }

    // Manage runner
    runner.unschedule()
    runner.timeline(this)

    const persist = runner.persist()
    const runnerInfo = {
      persist: persist === null ? this._persist : persist,
      start: absoluteStartTime + delay,
      runner
    }

    this._lastRunnerId = runner.id

    this._runners.push(runnerInfo)
    this._runners.sort((a, b) => a.start - b.start)
    this._runnerIds = this._runners.map(info => info.runner.id)

    this.updateTime()._continue()
    return this
  }

  // Remove the runner from this timeline
  unschedule (runner) {
    var index = this._runnerIds.indexOf(runner.id)
    if (index < 0) return this

    this._runners.splice(index, 1)
    this._runnerIds.splice(index, 1)

    runner.timeline(null)
    return this
  }

  // Calculates the end of the timeline
  getEndTime () {
    var lastRunnerInfo = this._runners[this._runnerIds.indexOf(this._lastRunnerId)]
    var lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0
    var lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : 0
    return lastStartTime + lastDuration
  }

  // Makes sure, that after pausing the time doesn't jump
  updateTime () {
    if (!this.active()) {
      this._lastSourceTime = this._timeSource()
    }
    return this
  }

  play () {
    // Now make sure we are not paused and continue the animation
    this._paused = false
    return this.updateTime()._continue()
  }

  pause () {
    this._paused = true
    return this._continue()
  }

  stop () {
    // Go to start and pause
    this.time(0)
    return this.pause()
  }

  finish () {
    // Go to end and pause
    this.time(this.getEndTime() + 1)
    return this.pause()
  }

  speed (speed) {
    if (speed == null) return this._speed
    this._speed = speed
    return this
  }

  reverse (yes) {
    var currentSpeed = this.speed()
    if (yes == null) return this.speed(-currentSpeed)

    var positive = Math.abs(currentSpeed)
    return this.speed(yes ? positive : -positive)
  }

  seek (dt) {
    return this.time(this._time + dt)
  }

  time (time) {
    if (time == null) return this._time
    this._time = time
    return this._continue(true)
  }

  persist (dtOrForever) {
    if (dtOrForever == null) return this._persist
    this._persist = dtOrForever
    return this
  }

  source (fn) {
    if (fn == null) return this._timeSource
    this._timeSource = fn
    return this
  }

  _stepFn (immediateStep = false) {
    // Get the time delta from the last time and update the time
    var time = this._timeSource()
    var dtSource = time - this._lastSourceTime

    if (immediateStep) dtSource = 0

    var dtTime = this._speed * dtSource + (this._time - this._lastStepTime)
    this._lastSourceTime = time

    // Only update the time if we use the timeSource.
    // Otherwise use the current time
    if (!immediateStep) {
      // Update the time
      this._time += dtTime
      this._time = this._time < 0 ? 0 : this._time
    }
    this._lastStepTime = this._time
    this.fire('time', this._time)

    // This is for the case that the timeline was seeked so that the time
    // is now before the startTime of the runner. Thats why we need to set
    // the runner to position 0

    // FIXME:
    // However, reseting in insertion order leads to bugs. Considering the case,
    // where 2 runners change the same attriute but in different times,
    // reseting both of them will lead to the case where the later defined
    // runner always wins the reset even if the other runner started earlier
    // and therefore should win the attribute battle
    // this can be solved by reseting them backwards
    for (var k = this._runners.length; k--;) {
      // Get and run the current runner and ignore it if its inactive
      let runnerInfo = this._runners[k]
      let runner = runnerInfo.runner

      // Make sure that we give the actual difference
      // between runner start time and now
      let dtToStart = this._time - runnerInfo.start

      // Dont run runner if not started yet
      // and try to reset it
      if (dtToStart <= 0) {
        runner.reset()
      }
    }

    // Run all of the runners directly
    var runnersLeft = false
    for (var i = 0, len = this._runners.length; i < len; i++) {
      // Get and run the current runner and ignore it if its inactive
      let runnerInfo = this._runners[i]
      let runner = runnerInfo.runner
      let dt = dtTime

      // Make sure that we give the actual difference
      // between runner start time and now
      let dtToStart = this._time - runnerInfo.start

      // Dont run runner if not started yet
      if (dtToStart <= 0) {
        runnersLeft = true
        continue
      } else if (dtToStart < dt) {
        // Adjust dt to make sure that animation is on point
        dt = dtToStart
      }

      if (!runner.active()) continue

      // If this runner is still going, signal that we need another animation
      // frame, otherwise, remove the completed runner
      var finished = runner.step(dt).done
      if (!finished) {
        runnersLeft = true
        // continue
      } else if (runnerInfo.persist !== true) {
        // runner is finished. And runner might get removed
        var endTime = runner.duration() - runner.time() + this._time

        if (endTime + runnerInfo.persist < this._time) {
          // Delete runner and correct index
          runner.unschedule()
          --i
          --len
        }
      }
    }

    // Basically: we continue when there are runners right from us in time
    // when -->, and when runners are left from us when <--
    if ((runnersLeft && !(this._speed < 0 && this._time === 0)) || (this._runnerIds.length && this._speed < 0 && this._time > 0)) {
      this._continue()
    } else {
      this.pause()
      this.fire('finished')
    }

    return this
  }

  // Checks if we are running and continues the animation
  _continue (immediateStep = false) {
    _Animator_js__WEBPACK_IMPORTED_MODULE_2__["default"].cancelFrame(this._nextFrame)
    this._nextFrame = null

    if (immediateStep) return this._stepImmediate()
    if (this._paused) return this

    this._nextFrame = _Animator_js__WEBPACK_IMPORTED_MODULE_2__["default"].frame(this._step)
    return this
  }

  active () {
    return !!this._nextFrame
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Element: {
    timeline: function (timeline) {
      if (timeline == null) {
        this._timeline = (this._timeline || new Timeline())
        return this._timeline
      } else {
        this._timeline = timeline
        return this
      }
    }
  }
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/A.js":
/*!*********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/A.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return A; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");





class A extends _Container_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('a', node), node)
  }

  // Link url
  to (url) {
    return this.attr('href', url, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__["xlink"])
  }

  // Link target attribute
  target (target) {
    return this.attr('target', target)
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    // Create a hyperlink element
    link: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (url) {
      return this.put(new A()).to(url)
    })
  },
  Element: {
    // Create a hyperlink element
    linkTo: function (url) {
      var link = new A()

      if (typeof url === 'function') {
        url.call(link, link)
      } else {
        link.to(url)
      }

      return this.parent().put(link).put(this)
    }
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(A)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Circle.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Circle.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Circle; });
/* harmony import */ var _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/circled.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");






class Circle extends _Shape_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["nodeOrNew"])('circle', node), node)
  }

  radius (r) {
    return this.attr('r', r)
  }

  // Radius x value
  rx (rx) {
    return this.attr('r', rx)
  }

  // Alias radius x value
  ry (ry) {
    return this.rx(ry)
  }

  size (size) {
    return this.radius(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__["default"](size).divide(2))
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(Circle, { x: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__["x"], y: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__["y"], cx: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__["cx"], cy: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__["cy"], width: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__["width"], height: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_0__["height"] })

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__["registerMethods"])({
  Container: {
    // Create circle element
    circle: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["wrapWithAttrCheck"])(function (size) {
      return this.put(new Circle())
        .size(size)
        .move(0, 0)
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["register"])(Circle)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/ClipPath.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/ClipPath.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClipPath; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");





class ClipPath extends _Container_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('clipPath', node), node)
  }

  // Unclip all clipped elements and remove itself
  remove () {
    // unclip all targets
    this.targets().forEach(function (el) {
      el.unclip()
    })

    // remove clipPath from parent
    return super.remove()
  }

  targets () {
    return Object(_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_3__["default"])('svg [clip-path*="' + this.id() + '"]')
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    // Create clipping element
    clip: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function () {
      return this.defs().put(new ClipPath())
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipWith (element) {
      // use given clip or create a new one
      let clipper = element instanceof ClipPath
        ? element
        : this.parent().clip().add(element)

      // apply mask
      return this.attr('clip-path', 'url("#' + clipper.id() + '")')
    },

    // Unclip element
    unclip () {
      return this.attr('clip-path', null)
    },

    clipper () {
      return this.reference('clip-path')
    }
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(ClipPath)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Container.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Container; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");



class Container extends _Element_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  flatten (parent) {
    this.each(function () {
      if (this instanceof Container) return this.flatten(parent).ungroup(parent)
      return this.toParent(parent)
    })

    // we need this so that the root does not get removed
    this.node.firstElementChild || this.remove()

    return this
  }

  ungroup (parent) {
    parent = parent || this.parent()

    this.each(function () {
      return this.toParent(parent)
    })

    this.remove()

    return this
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Container)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Defs.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Defs.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Defs; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");



class Defs extends _Container_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('defs', node), node)
  }

  flatten () {
    return this
  }
  ungroup () {
    return this
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Defs)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Dom.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Dom.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dom; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types/EventTarget.js */ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js");
/* harmony import */ var _types_List_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/List.js */ "./node_modules/@svgdotjs/svg.js/src/types/List.js");
/* harmony import */ var _modules_core_attr_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../modules/core/attr.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/attr.js");









class Dom extends _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_5__["default"] {
  constructor (node, attrs) {
    super(node)
    this.node = node
    this.type = node.nodeName

    if (attrs && node !== attrs) {
      this.attr(attrs)
    }
  }

  // Add given element at a position
  add (element, i) {
    element = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["makeInstance"])(element)

    if (i == null) {
      this.node.appendChild(element.node)
    } else if (element.node !== this.node.childNodes[i]) {
      this.node.insertBefore(element.node, this.node.childNodes[i])
    }

    return this
  }

  // Add element to given container and return self
  addTo (parent) {
    return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["makeInstance"])(parent).put(this)
  }

  // Returns all child elements
  children () {
    return new _types_List_js__WEBPACK_IMPORTED_MODULE_6__["default"](Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["map"])(this.node.children, function (node) {
      return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(node)
    }))
  }

  // Remove all elements in this container
  clear () {
    // remove children
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild)
    }

    return this
  }

  // Clone element
  clone () {
    // write dom data to the dom so the clone can pickup the data
    this.writeDataToDom()

    // clone element and assign new id
    return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["assignNewId"])(this.node.cloneNode(true))
  }

  // Iterates over all children and invokes a given block
  each (block, deep) {
    var children = this.children()
    var i, il

    for (i = 0, il = children.length; i < il; i++) {
      block.apply(children[i], [ i, children ])

      if (deep) {
        children[i].each(block, deep)
      }
    }

    return this
  }

  element (nodeName) {
    return this.put(new Dom(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["create"])(nodeName)))
  }

  // Get first child
  first () {
    return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(this.node.firstChild)
  }

  // Get a element at the given index
  get (i) {
    return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(this.node.childNodes[i])
  }

  getEventHolder () {
    return this.node
  }

  getEventTarget () {
    return this.node
  }

  // Checks if the given element is a child
  has (element) {
    return this.index(element) >= 0
  }

  // Get / set id
  id (id) {
    // generate new id if no id set
    if (typeof id === 'undefined' && !this.node.id) {
      this.node.id = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["eid"])(this.type)
    }

    // dont't set directly width this.node.id to make `null` work correctly
    return this.attr('id', id)
  }

  // Gets index of given element
  index (element) {
    return [].slice.call(this.node.childNodes).indexOf(element.node)
  }

  // Get the last child
  last () {
    return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(this.node.lastChild)
  }

  // matches the element vs a css selector
  matches (selector) {
    const el = this.node
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector)
  }

  // Returns the parent element instance
  parent (type) {
    var parent = this

    // check for parent
    if (!parent.node.parentNode) return null

    // get parent element
    parent = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(parent.node.parentNode)

    if (!type) return parent

    // loop trough ancestors if type is given
    while (parent) {
      if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent
      if (!parent.node.parentNode || parent.node.parentNode.nodeName === '#document' || parent.node.parentNode.nodeName === '#document-fragment') return null // #759, #720
      parent = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(parent.node.parentNode)
    }
  }

  // Basically does the same as `add()` but returns the added element instead
  put (element, i) {
    this.add(element, i)
    return element
  }

  // Add element to given container and return container
  putIn (parent) {
    return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["makeInstance"])(parent).add(this)
  }

  // Remove element
  remove () {
    if (this.parent()) {
      this.parent().removeElement(this)
    }

    return this
  }

  // Remove a given child
  removeElement (element) {
    this.node.removeChild(element.node)

    return this
  }

  // Replace this with element
  replace (element) {
    element = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["makeInstance"])(element)
    this.node.parentNode.replaceChild(element.node, this.node)
    return element
  }

  round (precision = 2, map) {
    const factor = 10 ** precision
    const attrs = this.attr()

    // If we have no map, build one from attrs
    if (!map) {
      map = Object.keys(attrs)
    }

    // Holds rounded attributes
    const newAttrs = {}
    map.forEach((key) => {
      newAttrs[key] = Math.round(attrs[key] * factor) / factor
    })

    this.attr(newAttrs)
    return this
  }

  // Return id on string conversion
  toString () {
    return this.id()
  }

  // Import raw svg
  svg (svgOrFn, outerHTML) {
    var well, len, fragment

    if (svgOrFn === false) {
      outerHTML = false
      svgOrFn = null
    }

    // act as getter if no svg string is given
    if (svgOrFn == null || typeof svgOrFn === 'function') {
      // The default for exports is, that the outerNode is included
      outerHTML = outerHTML == null ? true : outerHTML

      // write svgjs data to the dom
      this.writeDataToDom()
      let current = this

      // An export modifier was passed
      if (svgOrFn != null) {
        current = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(current.node.cloneNode(true))

        // If the user wants outerHTML we need to process this node, too
        if (outerHTML) {
          let result = svgOrFn(current)
          current = result || current

          // The user does not want this node? Well, then he gets nothing
          if (result === false) return ''
        }

        // Deep loop through all children and apply modifier
        current.each(function () {
          let result = svgOrFn(this)
          let _this = result || this

          // If modifier returns false, discard node
          if (result === false) {
            this.remove()

            // If modifier returns new node, use it
          } else if (result && this !== _this) {
            this.replace(_this)
          }
        }, true)
      }

      // Return outer or inner content
      return outerHTML
        ? current.node.outerHTML
        : current.node.innerHTML
    }

    // Act as setter if we got a string

    // The default for import is, that the current node is not replaced
    outerHTML = outerHTML == null ? false : outerHTML

    // Create temporary holder
    well = _utils_window_js__WEBPACK_IMPORTED_MODULE_2__["globals"].document.createElementNS(_modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_4__["ns"], 'svg')
    fragment = _utils_window_js__WEBPACK_IMPORTED_MODULE_2__["globals"].document.createDocumentFragment()

    // Dump raw svg
    well.innerHTML = svgOrFn

    // Transplant nodes into the fragment
    for (len = well.children.length; len--;) {
      fragment.appendChild(well.firstElementChild)
    }

    let parent = this.parent()

    // Add the whole fragment at once
    return outerHTML
      ? this.replace(fragment) && parent
      : this.add(fragment)
  }

  words (text) {
    // This is faster than removing all children and adding a new one
    this.node.textContent = text
    return this
  }

  // write svgjs data to the dom
  writeDataToDom () {
    // dump variables recursively
    this.each(function () {
      this.writeDataToDom()
    })

    return this
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Dom, { attr: _modules_core_attr_js__WEBPACK_IMPORTED_MODULE_7__["default"], find: _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_1__["find"], findOne: _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_1__["findOne"] })
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Dom)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Element.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _Dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Dom.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Dom.js");
/* harmony import */ var _types_List_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../types/List.js */ "./node_modules/@svgdotjs/svg.js/src/types/List.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");











class Element extends _Dom_js__WEBPACK_IMPORTED_MODULE_7__["default"] {
  constructor (node, attrs) {
    super(node, attrs)

    // initialize data object
    this.dom = {}

    // create circular reference
    this.node.instance = this

    if (node.hasAttribute('svgjs:data')) {
      // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
      this.setData(JSON.parse(node.getAttribute('svgjs:data')) || {})
    }
  }

  // Move element by its center
  center (x, y) {
    return this.cx(x).cy(y)
  }

  // Move by center over x-axis
  cx (x) {
    return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2)
  }

  // Move by center over y-axis
  cy (y) {
    return y == null
      ? this.y() + this.height() / 2
      : this.y(y - this.height() / 2)
  }

  // Get defs
  defs () {
    return this.root().defs()
  }

  // Relative move over x and y axes
  dmove (x, y) {
    return this.dx(x).dy(y)
  }

  // Relative move over x axis
  dx (x) {
    return this.x(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__["default"](x).plus(this.x()))
  }

  // Relative move over y axis
  dy (y) {
    return this.y(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__["default"](y).plus(this.y()))
  }

  // Get parent document
  root () {
    let p = this.parent(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__["getClass"])(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__["root"]))
    return p && p.root()
  }

  getEventHolder () {
    return this
  }

  // Set height of element
  height (height) {
    return this.attr('height', height)
  }

  // Checks whether the given point inside the bounding box of the element
  inside (x, y) {
    let box = this.bbox()

    return x > box.x
      && y > box.y
      && x < box.x + box.width
      && y < box.y + box.height
  }

  // Move element to given x and y values
  move (x, y) {
    return this.x(x).y(y)
  }

  // return array of all ancestors of given type up to the root svg
  parents (until = _utils_window_js__WEBPACK_IMPORTED_MODULE_3__["globals"].document) {
    until = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__["makeInstance"])(until)
    let parents = new _types_List_js__WEBPACK_IMPORTED_MODULE_8__["default"]()
    let parent = this

    while (
      (parent = parent.parent())
      && parent.node !== until.node
      && parent.node !== _utils_window_js__WEBPACK_IMPORTED_MODULE_3__["globals"].document
    ) {
      parents.push(parent)
    }

    return parents
  }

  // Get referenced element form attribute value
  reference (attr) {
    attr = this.attr(attr)
    if (!attr) return null

    const m = attr.match(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_6__["reference"])
    return m ? Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__["makeInstance"])(m[1]) : null
  }

  // set given data to the elements data property
  setData (o) {
    this.dom = o
    return this
  }

  // Set element size to given width and height
  size (width, height) {
    let p = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_5__["proportionalSize"])(this, width, height)

    return this
      .width(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__["default"](p.width))
      .height(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_9__["default"](p.height))
  }

  // Set width of element
  width (width) {
    return this.attr('width', width)
  }

  // write svgjs data to the dom
  writeDataToDom () {
    // remove previously set data
    this.node.removeAttribute('svgjs:data')

    if (Object.keys(this.dom).length) {
      this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)) // see #428
    }

    return super.writeDataToDom()
  }

  // Move over x-axis
  x (x) {
    return this.attr('x', x)
  }

  // Move over y-axis
  y (y) {
    return this.attr('y', y)
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__["extend"])(Element, {
  bbox: _types_Box_js__WEBPACK_IMPORTED_MODULE_0__["bbox"], rbox: _types_Box_js__WEBPACK_IMPORTED_MODULE_0__["rbox"], point: _types_Point_js__WEBPACK_IMPORTED_MODULE_4__["point"], ctm: _types_Matrix_js__WEBPACK_IMPORTED_MODULE_1__["ctm"], screenCTM: _types_Matrix_js__WEBPACK_IMPORTED_MODULE_1__["screenCTM"]
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__["register"])(Element)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Ellipse.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Ellipse.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ellipse; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/circled.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js");







class Ellipse extends _Shape_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('ellipse', node), node)
  }

  size (width, height) {
    var p = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["proportionalSize"])(this, width, height)

    return this
      .rx(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__["default"](p.width).divide(2))
      .ry(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__["default"](p.height).divide(2))
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Ellipse, _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_5__)

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__["registerMethods"])('Container', {
  // Create an ellipse
  ellipse: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (width = 0, height = width) {
    return this.put(new Ellipse()).size(width, height).move(0, 0)
  })
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Ellipse)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/ForeignObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/ForeignObject.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ForeignObject; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");




class ForeignObject extends _Element_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('foreignObject', node), node)
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    foreignObject: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (width, height) {
      return this.put(new ForeignObject()).size(width, height)
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(ForeignObject)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/G.js":
/*!*********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/G.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return G; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");







class G extends _Container_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('g', node), node)
  }

  x (x, box = this.bbox()) {
    if (x == null) return box.x
    return this.move(x, box.y, box)
  }

  y (y, box = this.bbox()) {
    if (y == null) return box.y
    return this.move(box.x, y, box)
  }

  move (x = 0, y = 0, box = this.bbox()) {
    const dx = x - box.x
    const dy = y - box.y

    return this.dmove(dx, dy)
  }

  dx (dx) {
    return this.dmove(dx, 0)
  }

  dy (dy) {
    return this.dmove(0, dy)
  }

  dmove (dx, dy) {
    this.children().forEach((child, i) => {
      // Get the childs bbox
      const bbox = child.bbox()
      // Get childs matrix
      const m = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"](child)
      // Translate childs matrix by amount and
      // transform it back into parents space
      const matrix = m.translate(dx, dy).transform(m.inverse())
      // Calculate new x and y from old box
      const p = new _types_Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](bbox.x, bbox.y).transform(matrix)
      // Move element
      child.move(p.x, p.y)
    })

    return this
  }

  width (width, box = this.bbox()) {
    if (width == null) return box.width
    return this.size(width, box.height, box)
  }

  height (height, box = this.bbox()) {
    if (height == null) return box.height
    return this.size(box.width, height, box)
  }

  size (width, height, box = this.bbox()) {
    const p = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["proportionalSize"])(this, width, height, box)
    const scaleX = p.width / box.width
    const scaleY = p.height / box.height

    this.children().forEach((child, i) => {
      const o = new _types_Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](box).transform(new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"](child).inverse())
      child.scale(scaleX, scaleY, o.x, o.y)
    })

    return this
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__["registerMethods"])({
  Container: {
    // Create a group element
    group: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function () {
      return this.put(new G())
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(G)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Gradient.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Gradient.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Gradient; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _Stop_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stop.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Stop.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");
/* harmony import */ var _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/gradiented.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js");








class Gradient extends _Container_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor (type, attrs) {
    super(
      Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])(type + 'Gradient', typeof type === 'string' ? null : type),
      attrs
    )
  }

  // Add a color stop
  stop (offset, color, opacity) {
    return this.put(new _Stop_js__WEBPACK_IMPORTED_MODULE_4__["default"]()).update(offset, color, opacity)
  }

  // Update gradient
  update (block) {
    // remove all stops
    this.clear()

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this)
    }

    return this
  }

  // Return the fill id
  url () {
    return 'url(#' + this.id() + ')'
  }

  // Alias string convertion to fill
  toString () {
    return this.url()
  }

  // custom attr to handle transform
  attr (a, b, c) {
    if (a === 'transform') a = 'gradientTransform'
    return super.attr(a, b, c)
  }

  targets () {
    return Object(_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_5__["default"])('svg [fill*="' + this.id() + '"]')
  }

  bbox () {
    return new _types_Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Gradient, _modules_core_gradiented_js__WEBPACK_IMPORTED_MODULE_6__)

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    // Create gradient element in defs
    gradient: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (type, block) {
      return this.defs().gradient(type, block)
    })
  },
  // define gradient
  Defs: {
    gradient: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (type, block) {
      return this.put(new Gradient(type)).update(block)
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Gradient)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Image.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Image.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Image; });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _modules_core_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/event.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/event.js");
/* harmony import */ var _modules_core_attr_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/core/attr.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/attr.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _Pattern_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Pattern.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Pattern.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");










class Image extends _Shape_js__WEBPACK_IMPORTED_MODULE_7__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["nodeOrNew"])('image', node), node)
  }

  // (re)load image
  load (url, callback) {
    if (!url) return this

    var img = new _utils_window_js__WEBPACK_IMPORTED_MODULE_8__["globals"].window.Image()

    Object(_modules_core_event_js__WEBPACK_IMPORTED_MODULE_2__["on"])(img, 'load', function (e) {
      var p = this.parent(_Pattern_js__WEBPACK_IMPORTED_MODULE_6__["default"])

      // ensure image size
      if (this.width() === 0 && this.height() === 0) {
        this.size(img.width, img.height)
      }

      if (p instanceof _Pattern_js__WEBPACK_IMPORTED_MODULE_6__["default"]) {
        // ensure pattern size if not set
        if (p.width() === 0 && p.height() === 0) {
          p.size(this.width(), this.height())
        }
      }

      if (typeof callback === 'function') {
        callback.call(this, e)
      }
    }, this)

    Object(_modules_core_event_js__WEBPACK_IMPORTED_MODULE_2__["on"])(img, 'load error', function () {
      // dont forget to unbind memory leaking events
      Object(_modules_core_event_js__WEBPACK_IMPORTED_MODULE_2__["off"])(img)
    })

    return this.attr('href', (img.src = url), _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_5__["xlink"])
  }
}

Object(_modules_core_attr_js__WEBPACK_IMPORTED_MODULE_3__["registerAttrHook"])(function (attr, val, _this) {
  // convert image fill and stroke to patterns
  if (attr === 'fill' || attr === 'stroke') {
    if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["isImage"].test(val)) {
      val = _this.root().defs().image(val)
    }
  }

  if (val instanceof Image) {
    val = _this.root().defs().pattern(0, 0, (pattern) => {
      pattern.add(val)
    })
  }

  return val
})

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_4__["registerMethods"])({
  Container: {
    // create image element, load image and set its size
    image: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["wrapWithAttrCheck"])(function (source, callback) {
      return this.put(new Image()).size(0, 0).load(source, callback)
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["register"])(Image)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Line.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Line.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Line; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/pointed.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js");







class Line extends _Shape_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('line', node), node)
  }

  // Get array
  array () {
    return new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_3__["default"]([
      [ this.attr('x1'), this.attr('y1') ],
      [ this.attr('x2'), this.attr('y2') ]
    ])
  }

  // Overwrite native plot() method
  plot (x1, y1, x2, y2) {
    if (x1 == null) {
      return this.array()
    } else if (typeof y1 !== 'undefined') {
      x1 = { x1: x1, y1: y1, x2: x2, y2: y2 }
    } else {
      x1 = new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_3__["default"](x1).toLine()
    }

    return this.attr(x1)
  }

  // Move by left top corner
  move (x, y) {
    return this.attr(this.array().move(x, y).toLine())
  }

  // Set element size to given width and height
  size (width, height) {
    var p = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["proportionalSize"])(this, width, height)
    return this.attr(this.array().size(p.width, p.height).toLine())
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Line, _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_5__)

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__["registerMethods"])({
  Container: {
    // Create a line element
    line: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (...args) {
      // make sure plot is called as a setter
      // x1 is not necessarily a number, it can also be an array, a string and a PointArray
      return Line.prototype.plot.apply(
        this.put(new Line())
        , args[0] != null ? args : [ 0, 0, 0, 0 ]
      )
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Line)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Marker.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Marker.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Marker; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");




class Marker extends _Container_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('marker', node), node)
  }

  // Set width of element
  width (width) {
    return this.attr('markerWidth', width)
  }

  // Set height of element
  height (height) {
    return this.attr('markerHeight', height)
  }

  // Set marker refX and refY
  ref (x, y) {
    return this.attr('refX', x).attr('refY', y)
  }

  // Update marker
  update (block) {
    // remove all content
    this.clear()

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this)
    }

    return this
  }

  // Return the fill id
  toString () {
    return 'url(#' + this.id() + ')'
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    marker (...args) {
      // Create marker element in defs
      return this.defs().marker(...args)
    }
  },
  Defs: {
    // Create marker
    marker: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (width, height, block) {
      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
      return this.put(new Marker())
        .size(width, height)
        .ref(width / 2, height / 2)
        .viewbox(0, 0, width, height)
        .attr('orient', 'auto')
        .update(block)
    })
  },
  marker: {
    // Create and attach markers
    marker (marker, width, height, block) {
      var attr = [ 'marker' ]

      // Build attribute name
      if (marker !== 'all') attr.push(marker)
      attr = attr.join('-')

      // Set marker attribute
      marker = arguments[1] instanceof Marker
        ? arguments[1]
        : this.defs().marker(width, height, block)

      return this.attr(attr, marker)
    }
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Marker)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Mask.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Mask.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mask; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");





class Mask extends _Container_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('mask', node), node)
  }

  // Unmask all masked elements and remove itself
  remove () {
    // unmask all targets
    this.targets().forEach(function (el) {
      el.unmask()
    })

    // remove mask from parent
    return super.remove()
  }

  targets () {
    return Object(_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_3__["default"])('svg [mask*="' + this.id() + '"]')
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    mask: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function () {
      return this.defs().put(new Mask())
    })
  },
  Element: {
    // Distribute mask to svg element
    maskWith (element) {
      // use given mask or create a new one
      var masker = element instanceof Mask
        ? element
        : this.parent().mask().add(element)

      // apply mask
      return this.attr('mask', 'url("#' + masker.id() + '")')
    },

    // Unmask element
    unmask () {
      return this.attr('mask', null)
    },

    masker () {
      return this.reference('mask')
    }
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Mask)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Path.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Path.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Path; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/PathArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");







class Path extends _Shape_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('path', node), node)
  }

  // Get array
  array () {
    return this._array || (this._array = new _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.attr('d')))
  }

  // Plot new path
  plot (d) {
    return (d == null) ? this.array()
      : this.clear().attr('d', typeof d === 'string' ? d : (this._array = new _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__["default"](d)))
  }

  // Clear array cache
  clear () {
    delete this._array
    return this
  }

  // Move by left top corner
  move (x, y) {
    return this.attr('d', this.array().move(x, y))
  }

  // Move by left top corner over x-axis
  x (x) {
    return x == null ? this.bbox().x : this.move(x, this.bbox().y)
  }

  // Move by left top corner over y-axis
  y (y) {
    return y == null ? this.bbox().y : this.move(this.bbox().x, y)
  }

  // Set element size to given width and height
  size (width, height) {
    var p = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["proportionalSize"])(this, width, height)
    return this.attr('d', this.array().size(p.width, p.height))
  }

  // Set width of element
  width (width) {
    return width == null ? this.bbox().width : this.size(width, this.bbox().height)
  }

  // Set height of element
  height (height) {
    return height == null ? this.bbox().height : this.size(this.bbox().width, height)
  }

  targets () {
    return Object(_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_5__["default"])('svg textpath [href*="' + this.id() + '"]')
  }
}

// Define morphable array
Path.prototype.MorphArray = _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__["default"]

// Add parent method
Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__["registerMethods"])({
  Container: {
    // Create a wrapped path element
    path: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (d) {
      // make sure plot is called as a setter
      return this.put(new Path()).plot(d || new _types_PathArray_js__WEBPACK_IMPORTED_MODULE_3__["default"]())
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Path)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Pattern.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Pattern.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pattern; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");






class Pattern extends _Container_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('pattern', node), node)
  }

  // Return the fill id
  url () {
    return 'url(#' + this.id() + ')'
  }

  // Update pattern by rebuilding
  update (block) {
    // remove content
    this.clear()

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this)
    }

    return this
  }

  // Alias string convertion to fill
  toString () {
    return this.url()
  }

  // custom attr to handle transform
  attr (a, b, c) {
    if (a === 'transform') a = 'patternTransform'
    return super.attr(a, b, c)
  }

  targets () {
    return Object(_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_4__["default"])('svg [fill*="' + this.id() + '"]')
  }

  bbox () {
    return new _types_Box_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    // Create pattern element in defs
    pattern (...args) {
      return this.defs().pattern(...args)
    }
  },
  Defs: {
    pattern: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (width, height, block) {
      return this.put(new Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width,
        height: height,
        patternUnits: 'userSpaceOnUse'
      })
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Pattern)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Polygon.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Polygon.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Polygon; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/pointed.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js");
/* harmony import */ var _modules_core_poly_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/poly.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/poly.js");







class Polygon extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('polygon', node), node)
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    // Create a wrapped polygon element
    polygon: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polygon()).plot(p || new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_2__["default"]())
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Polygon, _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_4__)
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Polygon, _modules_core_poly_js__WEBPACK_IMPORTED_MODULE_5__)
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Polygon)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Polyline.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Polyline.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Polyline; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/core/pointed.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js");
/* harmony import */ var _modules_core_poly_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/poly.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/poly.js");







class Polyline extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('polyline', node), node)
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    // Create a wrapped polygon element
    polyline: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polyline()).plot(p || new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_2__["default"]())
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Polyline, _modules_core_pointed_js__WEBPACK_IMPORTED_MODULE_4__)
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Polyline, _modules_core_poly_js__WEBPACK_IMPORTED_MODULE_5__)
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Polyline)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Rect.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Rect.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rect; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/circled.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");





class Rect extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('rect', node), node)
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Rect, { rx: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_2__["rx"], ry: _modules_core_circled_js__WEBPACK_IMPORTED_MODULE_2__["ry"] })

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    // Create a rect element
    rect: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (width, height) {
      return this.put(new Rect()).size(width, height)
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Rect)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Shape.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shape; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");



class Shape extends _Element_js__WEBPACK_IMPORTED_MODULE_1__["default"] {}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Shape)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Stop.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Stop.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stop; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");




class Stop extends _Element_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('stop', node), node)
  }

  // add color stops
  update (o) {
    if (typeof o === 'number' || o instanceof _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      o = {
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      }
    }

    // set attributes
    if (o.opacity != null) this.attr('stop-opacity', o.opacity)
    if (o.color != null) this.attr('stop-color', o.color)
    if (o.offset != null) this.attr('offset', new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](o.offset))

    return this
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Stop)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Style.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Style.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Style; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");





function cssRule (selector, rule) {
  if (!selector) return ''
  if (!rule) return selector

  var ret = selector + '{'

  for (var i in rule) {
    ret += Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["unCamelCase"])(i) + ':' + rule[i] + ';'
  }

  ret += '}'

  return ret
}

class Style extends _Element_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('style', node), node)
  }

  addText (w = '') {
    this.node.textContent += w
    return this
  }

  font (name, src, params = {}) {
    return this.rule('@font-face', {
      fontFamily: name,
      src: src,
      ...params
    })
  }

  rule (selector, obj) {
    return this.addText(cssRule(selector, obj))
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])('Dom', {
  style: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (selector, obj) {
    return this.put(new Style()).rule(selector, obj)
  }),
  fontface: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (name, src, params) {
    return this.put(new Style()).font(name, src, params)
  })
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Style)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Svg.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Svg.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Svg; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _Defs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Defs.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Defs.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");







class Svg extends _Container_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('svg', node), node)
    this.namespace()
  }

  isRoot () {
    return !this.node.parentNode
      || !(this.node.parentNode instanceof _utils_window_js__WEBPACK_IMPORTED_MODULE_5__["globals"].window.SVGElement)
      || this.node.parentNode.nodeName === '#document'
  }

  // Check if this is a root svg
  // If not, call docs from this element
  root () {
    if (this.isRoot()) return this
    return super.root()
  }

  // Add namespaces
  namespace () {
    if (!this.isRoot()) return this.root().namespace()
    return this
      .attr({ xmlns: _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__["ns"], version: '1.1' })
      .attr('xmlns:xlink', _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__["xlink"], _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__["xmlns"])
      .attr('xmlns:svgjs', _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__["svgjs"], _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_1__["xmlns"])
  }

  // Creates and returns defs element
  defs () {
    if (!this.isRoot()) return this.root().defs()

    return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(this.node.querySelector('defs'))
      || this.put(new _Defs_js__WEBPACK_IMPORTED_MODULE_4__["default"]())
  }

  // custom parent method
  parent (type) {
    if (this.isRoot()) {
      return this.node.parentNode.nodeName === '#document'
        ? null
        : Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(this.node.parentNode)
    }

    return super.parent(type)
  }

  clear () {
    // remove children
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild)
    }

    // remove defs reference
    delete this._defs

    return this
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__["registerMethods"])({
  Container: {
    // Create nested svg document
    nested: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function () {
      return this.put(new Svg())
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Svg, 'Svg', true)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Symbol.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Symbol.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Symbol; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");




class Symbol extends _Container_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('symbol', node), node)
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    symbol: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function () {
      return this.put(new Symbol())
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Symbol)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Text.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Text.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Text; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _modules_core_textable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/textable.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/textable.js");







class Text extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('text', node), node)

    this.dom.leading = new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](1.3) // store leading value for rebuilding
    this._rebuild = true // enable automatic updating of dy values
    this._build = false // disable build mode for adding multiple lines
  }

  // Move over x-axis
  // Text is moved its bounding box
  // text-anchor does NOT matter
  x (x, box = this.bbox()) {
    if (x == null) {
      return box.x
    }

    return this.attr('x', this.attr('x') + x - box.x)
  }

  // Move over y-axis
  y (y, box = this.bbox()) {
    if (y == null) {
      return box.y
    }

    return this.attr('y', this.attr('y') + y - box.y)
  }

  move (x, y, box = this.bbox()) {
    return this.x(x, box).y(y, box)
  }

  // Move center over x-axis
  cx (x, box = this.bbox()) {
    if (x == null) {
      return box.cx
    }

    return this.attr('x', this.attr('x') + x - box.cx)
  }

  // Move center over y-axis
  cy (y, box = this.bbox()) {
    if (y == null) {
      return box.cy
    }

    return this.attr('y', this.attr('y') + y - box.cy)
  }

  center (x, y, box = this.bbox()) {
    return this.cx(x, box).cy(y, box)
  }

  // Set the text content
  text (text) {
    // act as getter
    if (text === undefined) {
      var children = this.node.childNodes
      var firstLine = 0
      text = ''

      for (var i = 0, len = children.length; i < len; ++i) {
        // skip textPaths - they are no lines
        if (children[i].nodeName === 'textPath') {
          if (i === 0) firstLine = 1
          continue
        }

        // add newline if its not the first child and newLined is set to true
        if (i !== firstLine && children[i].nodeType !== 3 && Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(children[i]).dom.newLined === true) {
          text += '\n'
        }

        // add content of this node
        text += children[i].textContent
      }

      return text
    }

    // remove existing content
    this.clear().build(true)

    if (typeof text === 'function') {
      // call block
      text.call(this, this)
    } else {
      // store text and make sure text is not blank
      text = text.split('\n')

      // build new lines
      for (var j = 0, jl = text.length; j < jl; j++) {
        this.tspan(text[j]).newLine()
      }
    }

    // disable build mode and rebuild lines
    return this.build(false).rebuild()
  }

  // Set / get leading
  leading (value) {
    // act as getter
    if (value == null) {
      return this.dom.leading
    }

    // act as setter
    this.dom.leading = new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](value)

    return this.rebuild()
  }

  // Rebuild appearance type
  rebuild (rebuild) {
    // store new rebuild flag if given
    if (typeof rebuild === 'boolean') {
      this._rebuild = rebuild
    }

    // define position of all lines
    if (this._rebuild) {
      var self = this
      var blankLineOffset = 0
      var leading = this.dom.leading

      this.each(function () {
        var fontSize = _utils_window_js__WEBPACK_IMPORTED_MODULE_4__["globals"].window.getComputedStyle(this.node)
          .getPropertyValue('font-size')
        var dy = leading * new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](fontSize)

        if (this.dom.newLined) {
          this.attr('x', self.attr('x'))

          if (this.text() === '\n') {
            blankLineOffset += dy
          } else {
            this.attr('dy', dy + blankLineOffset)
            blankLineOffset = 0
          }
        }
      })

      this.fire('rebuild')
    }

    return this
  }

  // Enable / disable build mode
  build (build) {
    this._build = !!build
    return this
  }

  // overwrite method from parent to set data properly
  setData (o) {
    this.dom = o
    this.dom.leading = new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"](o.leading || 1.3)
    return this
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Text, _modules_core_textable_js__WEBPACK_IMPORTED_MODULE_5__)

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    // Create text element
    text: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (text) {
      return this.put(new Text()).text(text)
    }),

    // Create plain text element
    plain: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (text) {
      return this.put(new Text()).plain(text)
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Text)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/TextPath.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/TextPath.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextPath; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _Path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Path.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Path.js");
/* harmony import */ var _types_PathArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/PathArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js");
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Text.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Text.js");
/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");








class TextPath extends _Text_js__WEBPACK_IMPORTED_MODULE_5__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('textPath', node), node)
  }

  // return the array of the path track element
  array () {
    var track = this.track()

    return track ? track.array() : null
  }

  // Plot path if any
  plot (d) {
    var track = this.track()
    var pathArray = null

    if (track) {
      pathArray = track.plot(d)
    }

    return (d == null) ? pathArray : this
  }

  // Get the path element
  track () {
    return this.reference('href')
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    textPath: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (text, path) {
      // Convert text to instance if needed
      if (!(text instanceof _Text_js__WEBPACK_IMPORTED_MODULE_5__["default"])) {
        text = this.text(text)
      }

      return text.path(path)
    })
  },
  Text: {
    // Create path for text to run on
    path: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (track, importNodes = true) {
      var textPath = new TextPath()

      // if track is a path, reuse it
      if (!(track instanceof _Path_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
        // create path element
        track = this.defs().path(track)
      }

      // link textPath to path and add content
      textPath.attr('href', '#' + track, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__["xlink"])

      // Transplant all nodes from text to textPath
      let node
      if (importNodes) {
        while ((node = this.node.firstChild)) {
          textPath.node.appendChild(node)
        }
      }

      // add textPath element as child node and return textPath
      return this.put(textPath)
    }),

    // Get the textPath children
    textPath () {
      return this.findOne('textPath')
    }
  },
  Path: {
    // creates a textPath from this path
    text: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (text) {
      // Convert text to instance if needed
      if (!(text instanceof _Text_js__WEBPACK_IMPORTED_MODULE_5__["default"])) {
        text = new _Text_js__WEBPACK_IMPORTED_MODULE_5__["default"]().addTo(this.parent()).text(text)
      }

      // Create textPath from text and path and return
      return text.path(this)
    }),

    targets () {
      return Object(_modules_core_selector_js__WEBPACK_IMPORTED_MODULE_6__["default"])('svg [href*="' + this.id() + '"]')
    }
  }
})

TextPath.prototype.MorphArray = _types_PathArray_js__WEBPACK_IMPORTED_MODULE_4__["default"]
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(TextPath)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Tspan.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Tspan.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tspan; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Text.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Text.js");
/* harmony import */ var _modules_core_textable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/textable.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/textable.js");







class Tspan extends _Text_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  // Initialize node
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('tspan', node), node)
  }

  // Set text content
  text (text) {
    if (text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '')

    typeof text === 'function' ? text.call(this, this) : this.plain(text)

    return this
  }

  // Shortcut dx
  dx (dx) {
    return this.attr('dx', dx)
  }

  // Shortcut dy
  dy (dy) {
    return this.attr('dy', dy)
  }

  x (x) {
    return this.attr('x', x)
  }

  y (y) {
    return this.attr('x', y)
  }

  move (x, y) {
    return this.x(x).y(y)
  }

  // Create new line
  newLine () {
    // fetch text parent
    var t = this.parent(_Text_js__WEBPACK_IMPORTED_MODULE_4__["default"])

    // mark new line
    this.dom.newLined = true

    var fontSize = _utils_window_js__WEBPACK_IMPORTED_MODULE_1__["globals"].window.getComputedStyle(this.node)
      .getPropertyValue('font-size')
    var dy = t.dom.leading * new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_3__["default"](fontSize)

    // apply new position
    return this.dy(dy).attr('x', t.x())
  }
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Tspan, _modules_core_textable_js__WEBPACK_IMPORTED_MODULE_5__)

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__["registerMethods"])({
  Tspan: {
    tspan: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (text) {
      var tspan = new Tspan()

      // clear if build mode is disabled
      if (!this._build) {
        this.clear()
      }

      // add new tspan
      this.node.appendChild(tspan.node)

      return tspan.text(text)
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Tspan)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/elements/Use.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/elements/Use.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Use; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");





class Use extends _Shape_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor (node) {
    super(Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["nodeOrNew"])('use', node), node)
  }

  // Use element as a reference
  element (element, file) {
    // Set lined element
    return this.attr('href', (file || '') + '#' + element, _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__["xlink"])
  }
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])({
  Container: {
    // Create a use element
    use: Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["wrapWithAttrCheck"])(function (element, file) {
      return this.put(new Use()).element(element, file)
    })
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["register"])(Use)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/main.js":
/*!***************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/main.js ***!
  \***************************************************/
/*! exports provided: Morphable, registerMorphableType, makeMorphable, TransformBag, ObjectBag, NonMorphable, defaults, utils, namespaces, regex, SVG, parser, find, registerWindow, Animator, Controller, Ease, PID, Spring, easing, Queue, Runner, Timeline, Array, Box, Color, EventTarget, Matrix, Number, PathArray, Point, PointArray, List, Circle, ClipPath, Container, Defs, Dom, Element, Ellipse, ForeignObject, Gradient, G, A, Image, Line, Marker, Mask, Path, Pattern, Polygon, Polyline, Rect, Shape, Stop, Style, Svg, Symbol, Text, TextPath, Tspan, Use, on, off, dispatch, root, create, makeInstance, nodeOrNew, adopt, mockAdopt, register, getClass, eid, assignNewId, extend, wrapWithAttrCheck, invent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVG", function() { return SVG; });
/* harmony import */ var _modules_optional_arrange_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/optional/arrange.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/arrange.js");
/* harmony import */ var _modules_optional_class_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/optional/class.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/class.js");
/* harmony import */ var _modules_optional_css_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/optional/css.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/css.js");
/* harmony import */ var _modules_optional_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/optional/data.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/data.js");
/* harmony import */ var _modules_optional_memory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/optional/memory.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/memory.js");
/* harmony import */ var _modules_optional_sugar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/optional/sugar.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/sugar.js");
/* harmony import */ var _modules_optional_transform_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/optional/transform.js */ "./node_modules/@svgdotjs/svg.js/src/modules/optional/transform.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Box_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./types/Box.js */ "./node_modules/@svgdotjs/svg.js/src/types/Box.js");
/* harmony import */ var _elements_Circle_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./elements/Circle.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Circle.js");
/* harmony import */ var _types_Color_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./types/Color.js */ "./node_modules/@svgdotjs/svg.js/src/types/Color.js");
/* harmony import */ var _elements_Container_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./elements/Container.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Container.js");
/* harmony import */ var _elements_Defs_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./elements/Defs.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Defs.js");
/* harmony import */ var _elements_Dom_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./elements/Dom.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Dom.js");
/* harmony import */ var _elements_Element_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./elements/Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");
/* harmony import */ var _elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./elements/Ellipse.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Ellipse.js");
/* harmony import */ var _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./types/EventTarget.js */ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js");
/* harmony import */ var _elements_Gradient_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./elements/Gradient.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Gradient.js");
/* harmony import */ var _elements_Image_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./elements/Image.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Image.js");
/* harmony import */ var _elements_Line_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./elements/Line.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Line.js");
/* harmony import */ var _types_List_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./types/List.js */ "./node_modules/@svgdotjs/svg.js/src/types/List.js");
/* harmony import */ var _elements_Marker_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./elements/Marker.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Marker.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./animation/Morphable.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Morphable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Morphable", function() { return _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerMorphableType", function() { return _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__["registerMorphableType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeMorphable", function() { return _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__["makeMorphable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransformBag", function() { return _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__["TransformBag"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectBag", function() { return _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__["ObjectBag"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NonMorphable", function() { return _animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__["NonMorphable"]; });

/* harmony import */ var _elements_Path_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./elements/Path.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Path.js");
/* harmony import */ var _types_PathArray_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./types/PathArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js");
/* harmony import */ var _elements_Pattern_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./elements/Pattern.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Pattern.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");
/* harmony import */ var _elements_Polygon_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./elements/Polygon.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Polygon.js");
/* harmony import */ var _elements_Polyline_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./elements/Polyline.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Polyline.js");
/* harmony import */ var _elements_Rect_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./elements/Rect.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Rect.js");
/* harmony import */ var _animation_Runner_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./animation/Runner.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Runner.js");
/* harmony import */ var _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./types/SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");
/* harmony import */ var _elements_Shape_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./elements/Shape.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Shape.js");
/* harmony import */ var _elements_Svg_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./elements/Svg.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Svg.js");
/* harmony import */ var _elements_Symbol_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./elements/Symbol.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Symbol.js");
/* harmony import */ var _elements_Text_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./elements/Text.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Text.js");
/* harmony import */ var _elements_Tspan_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./elements/Tspan.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Tspan.js");
/* harmony import */ var _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./modules/core/defaults.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "defaults", function() { return _modules_core_defaults_js__WEBPACK_IMPORTED_MODULE_40__; });
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return _utils_utils_js__WEBPACK_IMPORTED_MODULE_41__; });
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "namespaces", function() { return _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_42__; });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "regex", function() { return _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_43__; });
/* harmony import */ var _modules_core_parser_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./modules/core/parser.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parser", function() { return _modules_core_parser_js__WEBPACK_IMPORTED_MODULE_44__["default"]; });

/* harmony import */ var _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./modules/core/selector.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "find", function() { return _modules_core_selector_js__WEBPACK_IMPORTED_MODULE_45__["default"]; });

/* harmony import */ var _modules_core_event_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./modules/core/event.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "on", function() { return _modules_core_event_js__WEBPACK_IMPORTED_MODULE_46__["on"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "off", function() { return _modules_core_event_js__WEBPACK_IMPORTED_MODULE_46__["off"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return _modules_core_event_js__WEBPACK_IMPORTED_MODULE_46__["dispatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "root", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["root"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "create", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["create"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeInstance", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["makeInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeOrNew", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["nodeOrNew"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "adopt", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["adopt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mockAdopt", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["mockAdopt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "register", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["register"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getClass", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["getClass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eid", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["eid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assignNewId", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["assignNewId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrapWithAttrCheck", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["wrapWithAttrCheck"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invent", function() { return _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["invent"]; });

/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerWindow", function() { return _utils_window_js__WEBPACK_IMPORTED_MODULE_47__["registerWindow"]; });

/* harmony import */ var _animation_Animator_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./animation/Animator.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Animator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animator", function() { return _animation_Animator_js__WEBPACK_IMPORTED_MODULE_48__["default"]; });

/* harmony import */ var _animation_Controller_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./animation/Controller.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Controller.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return _animation_Controller_js__WEBPACK_IMPORTED_MODULE_49__["Controller"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ease", function() { return _animation_Controller_js__WEBPACK_IMPORTED_MODULE_49__["Ease"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PID", function() { return _animation_Controller_js__WEBPACK_IMPORTED_MODULE_49__["PID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spring", function() { return _animation_Controller_js__WEBPACK_IMPORTED_MODULE_49__["Spring"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easing", function() { return _animation_Controller_js__WEBPACK_IMPORTED_MODULE_49__["easing"]; });

/* harmony import */ var _animation_Queue_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./animation/Queue.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Queue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Queue", function() { return _animation_Queue_js__WEBPACK_IMPORTED_MODULE_50__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Runner", function() { return _animation_Runner_js__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _animation_Timeline_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./animation/Timeline.js */ "./node_modules/@svgdotjs/svg.js/src/animation/Timeline.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return _animation_Timeline_js__WEBPACK_IMPORTED_MODULE_51__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Array", function() { return _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return _types_Box_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return _types_Color_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventTarget", function() { return _types_EventTarget_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix", function() { return _types_Matrix_js__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Number", function() { return _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PathArray", function() { return _types_PathArray_js__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return _types_Point_js__WEBPACK_IMPORTED_MODULE_52__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PointArray", function() { return _types_PointArray_js__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "List", function() { return _types_List_js__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return _elements_Circle_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _elements_ClipPath_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./elements/ClipPath.js */ "./node_modules/@svgdotjs/svg.js/src/elements/ClipPath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClipPath", function() { return _elements_ClipPath_js__WEBPACK_IMPORTED_MODULE_53__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return _elements_Container_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Defs", function() { return _elements_Defs_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dom", function() { return _elements_Dom_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return _elements_Element_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ellipse", function() { return _elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _elements_ForeignObject_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./elements/ForeignObject.js */ "./node_modules/@svgdotjs/svg.js/src/elements/ForeignObject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForeignObject", function() { return _elements_ForeignObject_js__WEBPACK_IMPORTED_MODULE_54__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Gradient", function() { return _elements_Gradient_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _elements_G_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./elements/G.js */ "./node_modules/@svgdotjs/svg.js/src/elements/G.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "G", function() { return _elements_G_js__WEBPACK_IMPORTED_MODULE_55__["default"]; });

/* harmony import */ var _elements_A_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./elements/A.js */ "./node_modules/@svgdotjs/svg.js/src/elements/A.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "A", function() { return _elements_A_js__WEBPACK_IMPORTED_MODULE_56__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _elements_Image_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return _elements_Line_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Marker", function() { return _elements_Marker_js__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _elements_Mask_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./elements/Mask.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Mask.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mask", function() { return _elements_Mask_js__WEBPACK_IMPORTED_MODULE_57__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Path", function() { return _elements_Path_js__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pattern", function() { return _elements_Pattern_js__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return _elements_Polygon_js__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polyline", function() { return _elements_Polyline_js__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return _elements_Rect_js__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _elements_Shape_js__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony import */ var _elements_Stop_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./elements/Stop.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Stop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stop", function() { return _elements_Stop_js__WEBPACK_IMPORTED_MODULE_58__["default"]; });

/* harmony import */ var _elements_Style_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./elements/Style.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Style.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Style", function() { return _elements_Style_js__WEBPACK_IMPORTED_MODULE_59__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Svg", function() { return _elements_Svg_js__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Symbol", function() { return _elements_Symbol_js__WEBPACK_IMPORTED_MODULE_37__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return _elements_Text_js__WEBPACK_IMPORTED_MODULE_38__["default"]; });

/* harmony import */ var _elements_TextPath_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./elements/TextPath.js */ "./node_modules/@svgdotjs/svg.js/src/elements/TextPath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextPath", function() { return _elements_TextPath_js__WEBPACK_IMPORTED_MODULE_60__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tspan", function() { return _elements_Tspan_js__WEBPACK_IMPORTED_MODULE_39__["default"]; });

/* harmony import */ var _elements_Use_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./elements/Use.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Use.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Use", function() { return _elements_Use_js__WEBPACK_IMPORTED_MODULE_61__["default"]; });

/* Optional Modules */

















































const SVG = _utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["makeInstance"]






/* Animation Modules */






/* Types */











/* Elements */






























Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])([
  _elements_Svg_js__WEBPACK_IMPORTED_MODULE_36__["default"],
  _elements_Symbol_js__WEBPACK_IMPORTED_MODULE_37__["default"],
  _elements_Image_js__WEBPACK_IMPORTED_MODULE_19__["default"],
  _elements_Pattern_js__WEBPACK_IMPORTED_MODULE_27__["default"],
  _elements_Marker_js__WEBPACK_IMPORTED_MODULE_22__["default"]
], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('viewbox'))

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])([
  _elements_Line_js__WEBPACK_IMPORTED_MODULE_20__["default"],
  _elements_Polyline_js__WEBPACK_IMPORTED_MODULE_30__["default"],
  _elements_Polygon_js__WEBPACK_IMPORTED_MODULE_29__["default"],
  _elements_Path_js__WEBPACK_IMPORTED_MODULE_25__["default"]
], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('marker'))

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])(_elements_Text_js__WEBPACK_IMPORTED_MODULE_38__["default"], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('Text'))
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])(_elements_Path_js__WEBPACK_IMPORTED_MODULE_25__["default"], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('Path'))

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])(_elements_Defs_js__WEBPACK_IMPORTED_MODULE_13__["default"], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('Defs'))

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])([
  _elements_Text_js__WEBPACK_IMPORTED_MODULE_38__["default"],
  _elements_Tspan_js__WEBPACK_IMPORTED_MODULE_39__["default"]
], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('Tspan'))

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])([
  _elements_Rect_js__WEBPACK_IMPORTED_MODULE_31__["default"],
  _elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_16__["default"],
  _elements_Circle_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  _elements_Gradient_js__WEBPACK_IMPORTED_MODULE_18__["default"]
], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('radius'))

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])(_types_EventTarget_js__WEBPACK_IMPORTED_MODULE_17__["default"], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('EventTarget'))
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])(_elements_Dom_js__WEBPACK_IMPORTED_MODULE_14__["default"], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('Dom'))
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])(_elements_Element_js__WEBPACK_IMPORTED_MODULE_15__["default"], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('Element'))
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])(_elements_Shape_js__WEBPACK_IMPORTED_MODULE_35__["default"], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('Shape'))
// extend(Element, getConstructor('Memory'))
Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])(_elements_Container_js__WEBPACK_IMPORTED_MODULE_12__["default"], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('Container'))

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_7__["extend"])(_animation_Runner_js__WEBPACK_IMPORTED_MODULE_32__["default"], Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodsFor"])('Runner'))

_types_List_js__WEBPACK_IMPORTED_MODULE_21__["default"].extend(Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_8__["getMethodNames"])())

Object(_animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__["registerMorphableType"])([
  _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_34__["default"],
  _types_Color_js__WEBPACK_IMPORTED_MODULE_11__["default"],
  _types_Box_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  _types_Matrix_js__WEBPACK_IMPORTED_MODULE_23__["default"],
  _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_33__["default"],
  _types_PointArray_js__WEBPACK_IMPORTED_MODULE_28__["default"],
  _types_PathArray_js__WEBPACK_IMPORTED_MODULE_26__["default"]
])

Object(_animation_Morphable_js__WEBPACK_IMPORTED_MODULE_24__["makeMorphable"])()


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/attr.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/attr.js ***!
  \****************************************************************/
/*! exports provided: registerAttrHook, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerAttrHook", function() { return registerAttrHook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return attr; });
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js");
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _types_Color_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/Color.js */ "./node_modules/@svgdotjs/svg.js/src/types/Color.js");
/* harmony import */ var _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");






const hooks = []
function registerAttrHook (fn) {
  hooks.push(fn)
}

// Set svg element attribute
function attr (attr, val, ns) {
  // act as full getter
  if (attr == null) {
    // get an object of attributes
    attr = {}
    val = this.node.attributes

    for (let node of val) {
      attr[node.nodeName] = _regex_js__WEBPACK_IMPORTED_MODULE_1__["isNumber"].test(node.nodeValue)
        ? parseFloat(node.nodeValue)
        : node.nodeValue
    }

    return attr
  } else if (attr instanceof Array) {
    // loop through array and get all values
    return attr.reduce((last, curr) => {
      last[curr] = this.attr(curr)
      return last
    }, {})
  } else if (typeof attr === 'object' && attr.constructor === Object) {
    // apply every attribute individually if an object is passed
    for (val in attr) this.attr(val, attr[val])
  } else if (val === null) {
    // remove value
    this.node.removeAttribute(attr)
  } else if (val == null) {
    // act as a getter if the first and only argument is not an object
    val = this.node.getAttribute(attr)
    return val == null ? _defaults_js__WEBPACK_IMPORTED_MODULE_0__["attrs"][attr]
      : _regex_js__WEBPACK_IMPORTED_MODULE_1__["isNumber"].test(val) ? parseFloat(val)
      : val
  } else {
    // Loop through hooks and execute them to convert value
    val = hooks.reduce((_val, hook) => {
      return hook(attr, _val, this)
    }, val)

    // ensure correct numeric values (also accepts NaN and Infinity)
    if (typeof val === 'number') {
      val = new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_4__["default"](val)
    } else if (_types_Color_js__WEBPACK_IMPORTED_MODULE_2__["default"].isColor(val)) {
      // ensure full hex color
      val = new _types_Color_js__WEBPACK_IMPORTED_MODULE_2__["default"](val)
    } else if (val.constructor === Array) {
      // Check for plain arrays and parse array values
      val = new _types_SVGArray_js__WEBPACK_IMPORTED_MODULE_3__["default"](val)
    }

    // if the passed attribute is leading...
    if (attr === 'leading') {
      // ... call the leading method instead
      if (this.leading) {
        this.leading(val)
      }
    } else {
      // set given attribute on node
      typeof ns === 'string' ? this.node.setAttributeNS(ns, attr, val.toString())
        : this.node.setAttribute(attr, val.toString())
    }

    // rebuild if required
    if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
      this.rebuild()
    }
  }

  return this
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/circled.js ***!
  \*******************************************************************/
/*! exports provided: rx, ry, x, y, cx, cy, width, height */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rx", function() { return rx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ry", function() { return ry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cx", function() { return cx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cy", function() { return cy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "width", function() { return width; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "height", function() { return height; });
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");


// Radius x value
function rx (rx) {
  return this.attr('rx', rx)
}

// Radius y value
function ry (ry) {
  return this.attr('ry', ry)
}

// Move over x-axis
function x (x) {
  return x == null
    ? this.cx() - this.rx()
    : this.cx(x + this.rx())
}

// Move over y-axis
function y (y) {
  return y == null
    ? this.cy() - this.ry()
    : this.cy(y + this.ry())
}

// Move by center over x-axis
function cx (x) {
  return x == null
    ? this.attr('cx')
    : this.attr('cx', x)
}

// Move by center over y-axis
function cy (y) {
  return y == null
    ? this.attr('cy')
    : this.attr('cy', y)
}

// Set width of element
function width (width) {
  return width == null
    ? this.rx() * 2
    : this.rx(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](width).divide(2))
}

// Set height of element
function height (height) {
  return height == null
    ? this.ry() * 2
    : this.ry(new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](height).divide(2))
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js":
/*!********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/defaults.js ***!
  \********************************************************************/
/*! exports provided: noop, timeline, attrs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeline", function() { return timeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attrs", function() { return attrs; });

function noop () {}

// Default animation values
let timeline = {
  duration: 400,
  ease: '>',
  delay: 0
}

// Default attribute values
let attrs = {

  // fill and stroke
  'fill-opacity': 1,
  'stroke-opacity': 1,
  'stroke-width': 0,
  'stroke-linejoin': 'miter',
  'stroke-linecap': 'butt',
  fill: '#000000',
  stroke: '#000000',
  opacity: 1,

  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,

  // size
  width: 0,
  height: 0,

  // radius
  r: 0,
  rx: 0,
  ry: 0,

  // gradient
  offset: 0,
  'stop-opacity': 1,
  'stop-color': '#000000',

  // text
  'text-anchor': 'start'
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/event.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/event.js ***!
  \*****************************************************************/
/*! exports provided: on, off, dispatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return dispatch; });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");




let listenerId = 0
let windowEvents = {}

function getEvents (instance) {
  let n = instance.getEventHolder()

  // We dont want to save events in global space
  if (n === _utils_window_js__WEBPACK_IMPORTED_MODULE_2__["globals"].window) n = windowEvents
  if (!n.events) n.events = {}
  return n.events
}

function getEventTarget (instance) {
  return instance.getEventTarget()
}

function clearEvents (instance) {
  const n = instance.getEventHolder()
  if (n.events) n.events = {}
}

// Add event binder in the SVG namespace
function on (node, events, listener, binding, options) {
  var l = listener.bind(binding || node)
  var instance = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["makeInstance"])(node)
  var bag = getEvents(instance)
  var n = getEventTarget(instance)

  // events can be an array of events or a string of events
  events = Array.isArray(events) ? events : events.split(_regex_js__WEBPACK_IMPORTED_MODULE_0__["delimiter"])

  // add id to listener
  if (!listener._svgjsListenerId) {
    listener._svgjsListenerId = ++listenerId
  }

  events.forEach(function (event) {
    var ev = event.split('.')[0]
    var ns = event.split('.')[1] || '*'

    // ensure valid object
    bag[ev] = bag[ev] || {}
    bag[ev][ns] = bag[ev][ns] || {}

    // reference listener
    bag[ev][ns][listener._svgjsListenerId] = l

    // add listener
    n.addEventListener(ev, l, options || false)
  })
}

// Add event unbinder in the SVG namespace
function off (node, events, listener, options) {
  var instance = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["makeInstance"])(node)
  var bag = getEvents(instance)
  var n = getEventTarget(instance)

  // listener can be a function or a number
  if (typeof listener === 'function') {
    listener = listener._svgjsListenerId
    if (!listener) return
  }

  // events can be an array of events or a string or undefined
  events = Array.isArray(events) ? events : (events || '').split(_regex_js__WEBPACK_IMPORTED_MODULE_0__["delimiter"])

  events.forEach(function (event) {
    var ev = event && event.split('.')[0]
    var ns = event && event.split('.')[1]
    var namespace, l

    if (listener) {
      // remove listener reference
      if (bag[ev] && bag[ev][ns || '*']) {
        // removeListener
        n.removeEventListener(ev, bag[ev][ns || '*'][listener], options || false)

        delete bag[ev][ns || '*'][listener]
      }
    } else if (ev && ns) {
      // remove all listeners for a namespaced event
      if (bag[ev] && bag[ev][ns]) {
        for (l in bag[ev][ns]) {
          off(n, [ ev, ns ].join('.'), l)
        }

        delete bag[ev][ns]
      }
    } else if (ns) {
      // remove all listeners for a specific namespace
      for (event in bag) {
        for (namespace in bag[event]) {
          if (ns === namespace) {
            off(n, [ event, ns ].join('.'))
          }
        }
      }
    } else if (ev) {
      // remove all listeners for the event
      if (bag[ev]) {
        for (namespace in bag[ev]) {
          off(n, [ ev, namespace ].join('.'))
        }

        delete bag[ev]
      }
    } else {
      // remove all listeners on a given node
      for (event in bag) {
        off(n, event)
      }

      clearEvents(instance)
    }
  })
}

function dispatch (node, event, data) {
  var n = getEventTarget(node)

  // Dispatch event
  if (event instanceof _utils_window_js__WEBPACK_IMPORTED_MODULE_2__["globals"].window.Event) {
    n.dispatchEvent(event)
  } else {
    event = new _utils_window_js__WEBPACK_IMPORTED_MODULE_2__["globals"].window.CustomEvent(event, { detail: data, cancelable: true })
    n.dispatchEvent(event)
  }
  return event
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/gradiented.js ***!
  \**********************************************************************/
/*! exports provided: from, to */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "to", function() { return to; });
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");


function from (x, y) {
  return (this._element || this).type === 'radialGradient'
    ? this.attr({ fx: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](x), fy: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](y) })
    : this.attr({ x1: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](x), y1: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](y) })
}

function to (x, y) {
  return (this._element || this).type === 'radialGradient'
    ? this.attr({ cx: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](x), cy: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](y) })
    : this.attr({ x2: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](x), y2: new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"](y) })
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js ***!
  \**********************************************************************/
/*! exports provided: ns, xmlns, xlink, svgjs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ns", function() { return ns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xmlns", function() { return xmlns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xlink", function() { return xlink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgjs", function() { return svgjs; });
// Default namespaces
let ns = 'http://www.w3.org/2000/svg'
let xmlns = 'http://www.w3.org/2000/xmlns/'
let xlink = 'http://www.w3.org/1999/xlink'
let svgjs = 'http://svgjs.com/svgjs'


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js":
/*!******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parser; });
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");



function parser () {
  // Reuse cached element if possible
  if (!parser.nodes) {
    let svg = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["makeInstance"])().size(2, 0)
    svg.node.style.cssText = [
      'opacity: 0',
      'position: absolute',
      'left: -100%',
      'top: -100%',
      'overflow: hidden'
    ].join(';')

    svg.attr('focusable', 'false')

    let path = svg.path().node

    parser.nodes = { svg, path }
  }

  if (!parser.nodes.svg.node.parentNode) {
    let b = _utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].document.body || _utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].document.documentElement
    parser.nodes.svg.addTo(b)
  }

  return parser.nodes
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/pointed.js ***!
  \*******************************************************************/
/*! exports provided: MorphArray, x, y, width, height */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MorphArray", function() { return MorphArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "width", function() { return width; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "height", function() { return height; });
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");


let MorphArray = _types_PointArray_js__WEBPACK_IMPORTED_MODULE_0__["default"]

// Move by left top corner over x-axis
function x (x) {
  return x == null ? this.bbox().x : this.move(x, this.bbox().y)
}

// Move by left top corner over y-axis
function y (y) {
  return y == null ? this.bbox().y : this.move(this.bbox().x, y)
}

// Set width of element
function width (width) {
  let b = this.bbox()
  return width == null ? b.width : this.size(width, b.height)
}

// Set height of element
function height (height) {
  let b = this.bbox()
  return height == null ? b.height : this.size(b.width, height)
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/poly.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/poly.js ***!
  \****************************************************************/
/*! exports provided: array, plot, clear, move, size */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array", function() { return array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plot", function() { return plot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return clear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "move", function() { return move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "size", function() { return size; });
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _types_PointArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/PointArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js");



// Get array
function array () {
  return this._array || (this._array = new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.attr('points')))
}

// Plot new path
function plot (p) {
  return (p == null) ? this.array()
    : this.clear().attr('points', typeof p === 'string' ? p
    : (this._array = new _types_PointArray_js__WEBPACK_IMPORTED_MODULE_1__["default"](p)))
}

// Clear array cache
function clear () {
  delete this._array
  return this
}

// Move by left top corner
function move (x, y) {
  return this.attr('points', this.array().move(x, y))
}

// Set element size to given width and height
function size (width, height) {
  let p = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["proportionalSize"])(this, width, height)
  return this.attr('points', this.array().size(p.width, p.height))
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js ***!
  \*****************************************************************/
/*! exports provided: numberAndUnit, hex, rgb, reference, transforms, whitespace, isHex, isRgb, isCss, isBlank, isNumber, isPercent, isImage, delimiter, hyphen, pathLetters, isPathLetter, numbersWithDots, dots */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberAndUnit", function() { return numberAndUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex", function() { return hex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reference", function() { return reference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transforms", function() { return transforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whitespace", function() { return whitespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHex", function() { return isHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRgb", function() { return isRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCss", function() { return isCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBlank", function() { return isBlank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPercent", function() { return isPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isImage", function() { return isImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delimiter", function() { return delimiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hyphen", function() { return hyphen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathLetters", function() { return pathLetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPathLetter", function() { return isPathLetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbersWithDots", function() { return numbersWithDots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dots", function() { return dots; });
// Parse unit value
let numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i

// Parse hex value
let hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

// Parse rgb value
let rgb = /rgb\((\d+),(\d+),(\d+)\)/

// Parse reference id
let reference = /(#[a-z0-9\-_]+)/i

// splits a transformation chain
let transforms = /\)\s*,?\s*/

// Whitespace
let whitespace = /\s/g

// Test hex value
let isHex = /^#[a-f0-9]{3,6}$/i

// Test rgb value
let isRgb = /^rgb\(/

// Test css declaration
let isCss = /[^:]+:[^;]+;?/

// Test for blank string
let isBlank = /^(\s+)?$/

// Test for numeric string
let isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i

// Test for percent value
let isPercent = /^-?[\d.]+%$/

// Test for image url
let isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i

// split at whitespace and comma
let delimiter = /[\s,]+/

// The following regex are used to parse the d attribute of a path

// Matches all hyphens which are not after an exponent
let hyphen = /([^e])-/gi

// Replaces and tests for all path letters
let pathLetters = /[MLHVCSQTAZ]/gi

// yes we need this one, too
let isPathLetter = /[MLHVCSQTAZ]/i

// matches 0.154.23.45
let numbersWithDots = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi

// matches .
let dots = /\./g


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js":
/*!********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/selector.js ***!
  \********************************************************************/
/*! exports provided: default, find, findOne */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return baseFind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findOne", function() { return findOne; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _types_List_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/List.js */ "./node_modules/@svgdotjs/svg.js/src/types/List.js");





function baseFind (query, parent) {
  return new _types_List_js__WEBPACK_IMPORTED_MODULE_3__["default"](Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["map"])((parent || _utils_window_js__WEBPACK_IMPORTED_MODULE_1__["globals"].document).querySelectorAll(query), function (node) {
    return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(node)
  }))
}

// Scoped find method
function find (query) {
  return baseFind(query, this.node)
}

function findOne (query) {
  return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["adopt"])(this.node.querySelector(query))
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/core/textable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/core/textable.js ***!
  \********************************************************************/
/*! exports provided: plain, length */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plain", function() { return plain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");


// Create plain text node
function plain (text) {
  // clear if build mode is disabled
  if (this._build === false) {
    this.clear()
  }

  // create text node
  this.node.appendChild(_utils_window_js__WEBPACK_IMPORTED_MODULE_0__["globals"].document.createTextNode(text))

  return this
}

// Get length of text element
function length () {
  return this.node.getComputedTextLength()
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/arrange.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/arrange.js ***!
  \***********************************************************************/
/*! exports provided: siblings, position, next, prev, forward, backward, front, back, before, after, insertBefore, insertAfter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "siblings", function() { return siblings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "position", function() { return position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "next", function() { return next; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prev", function() { return prev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forward", function() { return forward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backward", function() { return backward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "front", function() { return front; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "back", function() { return back; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "before", function() { return before; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "after", function() { return after; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertBefore", function() { return insertBefore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertAfter", function() { return insertAfter; });
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");



// Get all siblings, including myself
function siblings () {
  return this.parent().children()
}

// Get the curent position siblings
function position () {
  return this.parent().index(this)
}

// Get the next element (will return null if there is none)
function next () {
  return this.siblings()[this.position() + 1]
}

// Get the next element (will return null if there is none)
function prev () {
  return this.siblings()[this.position() - 1]
}

// Send given element one step forward
function forward () {
  var i = this.position() + 1
  var p = this.parent()

  // move node one step forward
  p.removeElement(this).add(this, i)

  // make sure defs node is always at the top
  if (typeof p.isRoot === 'function' && p.isRoot()) {
    p.node.appendChild(p.defs().node)
  }

  return this
}

// Send given element one step backward
function backward () {
  var i = this.position()

  if (i > 0) {
    this.parent().removeElement(this).add(this, i - 1)
  }

  return this
}

// Send given element all the way to the front
function front () {
  var p = this.parent()

  // Move node forward
  p.node.appendChild(this.node)

  // Make sure defs node is always at the top
  if (typeof p.isRoot === 'function' && p.isRoot()) {
    p.node.appendChild(p.defs().node)
  }

  return this
}

// Send given element all the way to the back
function back () {
  if (this.position() > 0) {
    this.parent().removeElement(this).add(this, 0)
  }

  return this
}

// Inserts a given element before the targeted element
function before (element) {
  element = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["makeInstance"])(element)
  element.remove()

  var i = this.position()

  this.parent().add(element, i)

  return this
}

// Inserts a given element after the targeted element
function after (element) {
  element = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["makeInstance"])(element)
  element.remove()

  var i = this.position()

  this.parent().add(element, i + 1)

  return this
}

function insertBefore (element) {
  element = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["makeInstance"])(element)
  element.before(this)
  return this
}

function insertAfter (element) {
  element = Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["makeInstance"])(element)
  element.after(this)
  return this
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])('Dom', {
  siblings,
  position,
  next,
  prev,
  forward,
  backward,
  front,
  back,
  before,
  after,
  insertBefore,
  insertAfter
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/class.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/class.js ***!
  \*********************************************************************/
/*! exports provided: classes, hasClass, addClass, removeClass, toggleClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classes", function() { return classes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleClass", function() { return toggleClass; });
/* harmony import */ var _core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");



// Return array of classes on the node
function classes () {
  var attr = this.attr('class')
  return attr == null ? [] : attr.trim().split(_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["delimiter"])
}

// Return true if class exists on the node, false otherwise
function hasClass (name) {
  return this.classes().indexOf(name) !== -1
}

// Add class to the node
function addClass (name) {
  if (!this.hasClass(name)) {
    var array = this.classes()
    array.push(name)
    this.attr('class', array.join(' '))
  }

  return this
}

// Remove class from the node
function removeClass (name) {
  if (this.hasClass(name)) {
    this.attr('class', this.classes().filter(function (c) {
      return c !== name
    }).join(' '))
  }

  return this
}

// Toggle the presence of a class on the node
function toggleClass (name) {
  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name)
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])('Dom', {
  classes, hasClass, addClass, removeClass, toggleClass
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/css.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/css.js ***!
  \*******************************************************************/
/*! exports provided: css, show, hide, visible */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "show", function() { return show; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return hide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visible", function() { return visible; });
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _core_regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");




// Dynamic style generator
function css (style, val) {
  let ret = {}
  if (arguments.length === 0) {
    // get full style as object
    this.node.style.cssText.split(/\s*;\s*/)
      .filter(function (el) {
        return !!el.length
      })
      .forEach(function (el) {
        let t = el.split(/\s*:\s*/)
        ret[t[0]] = t[1]
      })
    return ret
  }

  if (arguments.length < 2) {
    // get style properties in the array
    if (Array.isArray(style)) {
      for (let name of style) {
        let cased = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["camelCase"])(name)
        ret[cased] = this.node.style[cased]
      }
      return ret
    }

    // get style for property
    if (typeof style === 'string') {
      return this.node.style[Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["camelCase"])(style)]
    }

    // set styles in object
    if (typeof style === 'object') {
      for (let name in style) {
        // set empty string if null/undefined/'' was given
        this.node.style[Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["camelCase"])(name)]
          = (style[name] == null || _core_regex_js__WEBPACK_IMPORTED_MODULE_1__["isBlank"].test(style[name])) ? '' : style[name]
      }
    }
  }

  // set style for property
  if (arguments.length === 2) {
    this.node.style[Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["camelCase"])(style)]
      = (val == null || _core_regex_js__WEBPACK_IMPORTED_MODULE_1__["isBlank"].test(val)) ? '' : val
  }

  return this
}

// Show element
function show () {
  return this.css('display', '')
}

// Hide element
function hide () {
  return this.css('display', 'none')
}

// Is element visible?
function visible () {
  return this.css('display') !== 'none'
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__["registerMethods"])('Dom', {
  css, show, hide, visible
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/data.js":
/*!********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/data.js ***!
  \********************************************************************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");


// Store data values on svg nodes
function data (a, v, r) {
  if (typeof a === 'object') {
    for (v in a) {
      this.data(v, a[v])
    }
  } else if (arguments.length < 2) {
    try {
      return JSON.parse(this.attr('data-' + a))
    } catch (e) {
      return this.attr('data-' + a)
    }
  } else {
    this.attr('data-' + a,
      v === null ? null
      : r === true || typeof v === 'string' || typeof v === 'number' ? v
      : JSON.stringify(v)
    )
  }

  return this
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__["registerMethods"])('Dom', { data })


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/memory.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/memory.js ***!
  \**********************************************************************/
/*! exports provided: remember, forget, memory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remember", function() { return remember; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forget", function() { return forget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memory", function() { return memory; });
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");


// Remember arbitrary data
function remember (k, v) {
  // remember every item in an object individually
  if (typeof arguments[0] === 'object') {
    for (var key in k) {
      this.remember(key, k[key])
    }
  } else if (arguments.length === 1) {
    // retrieve memory
    return this.memory()[k]
  } else {
    // store memory
    this.memory()[k] = v
  }

  return this
}

// Erase a given memory
function forget () {
  if (arguments.length === 0) {
    this._memory = {}
  } else {
    for (var i = arguments.length - 1; i >= 0; i--) {
      delete this.memory()[arguments[i]]
    }
  }
  return this
}

// This triggers creation of a new hidden class which is not performant
// However, this function is not rarely used so it will not happen frequently
// Return local memory object
function memory () {
  return (this._memory = this._memory || {})
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_0__["registerMethods"])('Dom', { remember, forget, memory })


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/sugar.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/sugar.js ***!
  \*********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/event.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/event.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Color_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/Color.js */ "./node_modules/@svgdotjs/svg.js/src/types/Color.js");
/* harmony import */ var _elements_Element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../elements/Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _types_Point_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../types/Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../types/SVGNumber.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js");








// Define list of available attributes for stroke and fill
var sugar = {
  stroke: [ 'color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset' ],
  fill: [ 'color', 'opacity', 'rule' ],
  prefix: function (t, a) {
    return a === 'color' ? t : t + '-' + a
  }
}

// Add sugar for fill and stroke
;[ 'fill', 'stroke' ].forEach(function (m) {
  var extension = {}
  var i

  extension[m] = function (o) {
    if (typeof o === 'undefined') {
      return this.attr(m)
    }
    if (typeof o === 'string' || o instanceof _types_Color_js__WEBPACK_IMPORTED_MODULE_2__["default"] || _types_Color_js__WEBPACK_IMPORTED_MODULE_2__["default"].isRgb(o) || (o instanceof _elements_Element_js__WEBPACK_IMPORTED_MODULE_3__["default"])) {
      this.attr(m, o)
    } else {
      // set all attributes from sugar.fill and sugar.stroke list
      for (i = sugar[m].length - 1; i >= 0; i--) {
        if (o[sugar[m][i]] != null) {
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]])
        }
      }
    }

    return this
  }

  Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])([ 'Element', 'Runner' ], extension)
})

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])([ 'Element', 'Runner' ], {
  // Let the user set the matrix directly
  matrix: function (mat, b, c, d, e, f) {
    // Act as a getter
    if (mat == null) {
      return new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"](this)
    }

    // Act as a setter, the user can pass a matrix or a set of numbers
    return this.attr('transform', new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"](mat, b, c, d, e, f))
  },

  // Map rotation to transform
  rotate: function (angle, cx, cy) {
    return this.transform({ rotate: angle, ox: cx, oy: cy }, true)
  },

  // Map skew to transform
  skew: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3
      ? this.transform({ skew: x, ox: y, oy: cx }, true)
      : this.transform({ skew: [ x, y ], ox: cx, oy: cy }, true)
  },

  shear: function (lam, cx, cy) {
    return this.transform({ shear: lam, ox: cx, oy: cy }, true)
  },

  // Map scale to transform
  scale: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3
      ? this.transform({ scale: x, ox: y, oy: cx }, true)
      : this.transform({ scale: [ x, y ], ox: cx, oy: cy }, true)
  },

  // Map translate to transform
  translate: function (x, y) {
    return this.transform({ translate: [ x, y ] }, true)
  },

  // Map relative translations to transform
  relative: function (x, y) {
    return this.transform({ relative: [ x, y ] }, true)
  },

  // Map flip to transform
  flip: function (direction, around) {
    var directionString = typeof direction === 'string' ? direction
      : isFinite(direction) ? 'both'
      : 'both'
    var origin = (direction === 'both' && isFinite(around)) ? [ around, around ]
      : (direction === 'x') ? [ around, 0 ]
      : (direction === 'y') ? [ 0, around ]
      : isFinite(direction) ? [ direction, direction ]
      : [ 0, 0 ]
    return this.transform({ flip: directionString, origin: origin }, true)
  },

  // Opacity
  opacity: function (value) {
    return this.attr('opacity', value)
  }
})

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])('radius', {
  // Add x and y radius
  radius: function (x, y) {
    var type = (this._element || this).type
    return type === 'radialGradient' || type === 'radialGradient'
      ? this.attr('r', new _types_SVGNumber_js__WEBPACK_IMPORTED_MODULE_6__["default"](x))
      : this.rx(x).ry(y == null ? x : y)
  }
})

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])('Path', {
  // Get path length
  length: function () {
    return this.node.getTotalLength()
  },
  // Get point at length
  pointAt: function (length) {
    return new _types_Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.node.getPointAtLength(length))
  }
})

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])([ 'Element', 'Runner' ], {
  // Set font
  font: function (a, v) {
    if (typeof a === 'object') {
      for (v in a) this.font(v, a[v])
      return this
    }

    return a === 'leading'
      ? this.leading(v)
      : a === 'anchor'
        ? this.attr('text-anchor', v)
        : a === 'size' || a === 'family' || a === 'weight' || a === 'stretch' || a === 'variant' || a === 'style'
          ? this.attr('font-' + a, v)
          : this.attr(a, v)
  }
})

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])('Text', {
  ax (x) {
    return this.attr('x', x)
  },
  ay (y) {
    return this.attr('y', y)
  },
  amove (x, y) {
    return this.ax(x).ay(y)
  }
})

// Add events to elements
const methods = [ 'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mousemove',
  'mouseenter',
  'mouseleave',
  'touchstart',
  'touchmove',
  'touchleave',
  'touchend',
  'touchcancel' ].reduce(function (last, event) {
  // add event to Element
  const fn = function (f) {
    if (f === null) {
      Object(_core_event_js__WEBPACK_IMPORTED_MODULE_0__["off"])(this, event)
    } else {
      Object(_core_event_js__WEBPACK_IMPORTED_MODULE_0__["on"])(this, event, f)
    }
    return this
  }

  last[event] = fn
  return last
}, {})

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_1__["registerMethods"])('Element', methods)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/modules/optional/transform.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/modules/optional/transform.js ***!
  \*************************************************************************/
/*! exports provided: untransform, matrixify, toParent, toRoot, transform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "untransform", function() { return untransform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matrixify", function() { return matrixify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toParent", function() { return toParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRoot", function() { return toRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return transform; });
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _core_regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");





// Reset all transformations
function untransform () {
  return this.attr('transform', null)
}

// merge the whole transformation chain into one matrix and returns it
function matrixify () {
  var matrix = (this.attr('transform') || '')
    // split transformations
    .split(_core_regex_js__WEBPACK_IMPORTED_MODULE_1__["transforms"]).slice(0, -1).map(function (str) {
      // generate key => value pairs
      var kv = str.trim().split('(')
      return [ kv[0],
        kv[1].split(_core_regex_js__WEBPACK_IMPORTED_MODULE_1__["delimiter"])
          .map(function (str) {
            return parseFloat(str)
          })
      ]
    })
    .reverse()
    // merge every transformation into one matrix
    .reduce(function (matrix, transform) {
      if (transform[0] === 'matrix') {
        return matrix.lmultiply(_types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"].fromArray(transform[1]))
      }
      return matrix[transform[0]].apply(matrix, transform[1])
    }, new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"]())

  return matrix
}

// add an element to another parent without changing the visual representation on the screen
function toParent (parent) {
  if (this === parent) return this
  var ctm = this.screenCTM()
  var pCtm = parent.screenCTM().inverse()

  this.addTo(parent).untransform().transform(pCtm.multiply(ctm))

  return this
}

// same as above with parent equals root-svg
function toRoot () {
  return this.toParent(this.root())
}

// Add transformations
function transform (o, relative) {
  // Act as a getter if no object was passed
  if (o == null || typeof o === 'string') {
    var decomposed = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"](this).decompose()
    return decomposed[o] || decomposed
  }

  if (!_types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"].isMatrixLike(o)) {
    // Set the origin according to the defined transform
    o = { ...o, origin: Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["getOrigin"])(o, this) }
  }

  // The user can pass a boolean, an Element or an Matrix or nothing
  var cleanRelative = relative === true ? this : (relative || false)
  var result = new _types_Matrix_js__WEBPACK_IMPORTED_MODULE_3__["default"](cleanRelative).transform(o)
  return this.attr('transform', result)
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_2__["registerMethods"])('Element', {
  untransform, matrixify, toParent, toRoot, transform
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/svg.js":
/*!**************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/svg.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SVG; });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ "./node_modules/@svgdotjs/svg.js/src/main.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");



// The main wrapping element
function SVG (element) {
  return Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["makeInstance"])(element)
}

Object.assign(SVG, _main_js__WEBPACK_IMPORTED_MODULE_0__)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/ArrayPolyfill.js":
/*!******************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/ArrayPolyfill.js ***!
  \******************************************************************/
/*! exports provided: subClassArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subClassArray", function() { return subClassArray; });
/* eslint no-new-func: "off" */
const subClassArray = (function () {
  try {
    // try es6 subclassing
    return Function('name', 'baseClass', '_constructor', [
      'baseClass = baseClass || Array',
      'return {',
      '  [name]: class extends baseClass {',
      '    constructor (...args) {',
      '      super(...args)',
      '      _constructor && _constructor.apply(this, args)',
      '    }',
      '  }',
      '}[name]'
    ].join('\n'))
  } catch (e) {
    // Use es5 approach
    return (name, baseClass = Array, _constructor) => {
      const Arr = function () {
        baseClass.apply(this, arguments)
        _constructor && _constructor.apply(this, arguments)
      }

      Arr.prototype = Object.create(baseClass.prototype)
      Arr.prototype.constructor = Arr

      Arr.prototype.map = function (fn) {
        const arr = new Arr()
        arr.push.apply(arr, Array.prototype.map.call(this, fn))
        return arr
      }

      return Arr
    }
  }
})()


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Base.js":
/*!*********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Base.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
class Base {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Box.js":
/*!********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Box.js ***!
  \********************************************************/
/*! exports provided: default, bbox, rbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Box; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bbox", function() { return bbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rbox", function() { return rbox; });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _utils_methods_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _Matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _modules_core_parser_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/core/parser.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js");








function isNulledBox (box) {
  return !box.width && !box.height && !box.x && !box.y
}

function domContains (node) {
  return node === _utils_window_js__WEBPACK_IMPORTED_MODULE_1__["globals"].document
    || (_utils_window_js__WEBPACK_IMPORTED_MODULE_1__["globals"].document.documentElement.contains || function (node) {
      // This is IE - it does not support contains() for top-level SVGs
      while (node.parentNode) {
        node = node.parentNode
      }
      return node === _utils_window_js__WEBPACK_IMPORTED_MODULE_1__["globals"].document
    }).call(_utils_window_js__WEBPACK_IMPORTED_MODULE_1__["globals"].document.documentElement, node)
}

class Box {
  constructor (...args) {
    this.init(...args)
  }

  init (source) {
    var base = [ 0, 0, 0, 0 ]
    source = typeof source === 'string' ? source.split(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["delimiter"]).map(parseFloat)
      : Array.isArray(source) ? source
      : typeof source === 'object' ? [ source.left != null ? source.left
      : source.x, source.top != null ? source.top : source.y, source.width, source.height ]
      : arguments.length === 4 ? [].slice.call(arguments)
      : base

    this.x = source[0] || 0
    this.y = source[1] || 0
    this.width = this.w = source[2] || 0
    this.height = this.h = source[3] || 0

    // Add more bounding box properties
    this.x2 = this.x + this.w
    this.y2 = this.y + this.h
    this.cx = this.x + this.w / 2
    this.cy = this.y + this.h / 2

    return this
  }

  // Merge rect box with another, return a new instance
  merge (box) {
    let x = Math.min(this.x, box.x)
    let y = Math.min(this.y, box.y)
    let width = Math.max(this.x + this.width, box.x + box.width) - x
    let height = Math.max(this.y + this.height, box.y + box.height) - y

    return new Box(x, y, width, height)
  }

  transform (m) {
    if (!(m instanceof _Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"])) {
      m = new _Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"](m)
    }

    let xMin = Infinity
    let xMax = -Infinity
    let yMin = Infinity
    let yMax = -Infinity

    let pts = [
      new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.x, this.y),
      new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.x2, this.y),
      new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.x, this.y2),
      new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.x2, this.y2)
    ]

    pts.forEach(function (p) {
      p = p.transform(m)
      xMin = Math.min(xMin, p.x)
      xMax = Math.max(xMax, p.x)
      yMin = Math.min(yMin, p.y)
      yMax = Math.max(yMax, p.y)
    })

    return new Box(
      xMin, yMin,
      xMax - xMin,
      yMax - yMin
    )
  }

  addOffset () {
    // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
    this.x += _utils_window_js__WEBPACK_IMPORTED_MODULE_1__["globals"].window.pageXOffset
    this.y += _utils_window_js__WEBPACK_IMPORTED_MODULE_1__["globals"].window.pageYOffset
    return this
  }

  toString () {
    return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height
  }

  toArray () {
    return [ this.x, this.y, this.width, this.height ]
  }

  isNulled () {
    return isNulledBox(this)
  }
}

function getBox (cb, retry) {
  let box

  try {
    box = cb(this.node)

    if (isNulledBox(box) && !domContains(this.node)) {
      throw new Error('Element not in the dom')
    }
  } catch (e) {
    box = retry(this)
  }

  return box
}

function bbox () {
  return new Box(getBox.call(this, (node) => node.getBBox(), (el) => {
    try {
      let clone = el.clone().addTo(Object(_modules_core_parser_js__WEBPACK_IMPORTED_MODULE_6__["default"])().svg).show()
      let box = clone.node.getBBox()
      clone.remove()
      return box
    } catch (e) {
      throw new Error('Getting bbox of element "' + el.node.nodeName + '" is not possible. ' + e.toString())
    }
  }))
}

function rbox (el) {
  let box = new Box(getBox.call(this, (node) => node.getBoundingClientRect(), (el) => {
    throw new Error('Getting rbox of element "' + el.node.nodeName + '" is not possible')
  }))
  if (el) return box.transform(el.screenCTM().inverse())
  return box.addOffset()
}

Object(_utils_methods_js__WEBPACK_IMPORTED_MODULE_3__["registerMethods"])({
  viewbox: {
    viewbox (x, y, width, height) {
      // act as getter
      if (x == null) return new Box(this.attr('viewBox'))

      // act as setter
      return this.attr('viewBox', new Box(x, y, width, height))
    },

    zoom (level, point) {
      let width = this.node.clientWidth
      let height = this.node.clientHeight
      const v = this.viewbox()

      // Firefox does not support clientHeight and returns 0
      // https://bugzilla.mozilla.org/show_bug.cgi?id=874811
      if (!width && !height) {
        var style = window.getComputedStyle(this.node)
        width = parseFloat(style.getPropertyValue('width'))
        height = parseFloat(style.getPropertyValue('height'))
      }

      const zoomX = width / v.width
      const zoomY = height / v.height
      const zoom = Math.min(zoomX, zoomY)

      if (level == null) {
        return zoom
      }

      let zoomAmount = zoom / level
      if (zoomAmount === Infinity) zoomAmount = Number.MIN_VALUE

      point = point || new _Point_js__WEBPACK_IMPORTED_MODULE_5__["default"](width / 2 / zoomX + v.x, height / 2 / zoomY + v.y)

      const box = new Box(v).transform(
        new _Matrix_js__WEBPACK_IMPORTED_MODULE_4__["default"]({ scale: zoomAmount, origin: point })
      )

      return this.viewbox(box)
    }
  }
})

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__["register"])(Box)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Color.js":
/*!**********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Color.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Color; });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");



function sixDigitHex (hex) {
  return hex.length === 4
    ? [ '#',
      hex.substring(1, 2), hex.substring(1, 2),
      hex.substring(2, 3), hex.substring(2, 3),
      hex.substring(3, 4), hex.substring(3, 4)
    ].join('')
    : hex
}

function componentHex (component) {
  const integer = Math.round(component)
  const bounded = Math.max(0, Math.min(255, integer))
  const hex = bounded.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

function is (object, space) {
  for (let i = space.length; i--;) {
    if (object[space[i]] == null) {
      return false
    }
  }
  return true
}

function getParameters (a, b) {
  const params = is(a, 'rgb') ? { _a: a.r, _b: a.g, _c: a.b, space: 'rgb' }
    : is(a, 'xyz') ? { _a: a.x, _b: a.y, _c: a.z, _d: 0, space: 'xyz' }
    : is(a, 'hsl') ? { _a: a.h, _b: a.s, _c: a.l, _d: 0, space: 'hsl' }
    : is(a, 'lab') ? { _a: a.l, _b: a.a, _c: a.b, _d: 0, space: 'lab' }
    : is(a, 'lch') ? { _a: a.l, _b: a.c, _c: a.h, _d: 0, space: 'lch' }
    : is(a, 'cmyk') ? { _a: a.c, _b: a.m, _c: a.y, _d: a.k, space: 'cmyk' }
    : { _a: 0, _b: 0, _c: 0, space: 'rgb' }

  params.space = b || params.space
  return params
}

function cieSpace (space) {
  if (space === 'lab' || space === 'xyz' || space === 'lch') {
    return true
  } else {
    return false
  }
}

function hueToRgb (p, q, t) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

class Color {
  constructor (...inputs) {
    this.init(...inputs)
  }

  init (a = 0, b = 0, c = 0, d = 0, space = 'rgb') {
    // This catches the case when a falsy value is passed like ''
    a = !a ? 0 : a

    // Reset all values in case the init function is rerun with new color space
    if (this.space) {
      for (let component in this.space) {
        delete this[this.space[component]]
      }
    }

    if (typeof a === 'number') {
      // Allow for the case that we don't need d...
      space = typeof d === 'string' ? d : space
      d = typeof d === 'string' ? 0 : d

      // Assign the values straight to the color
      Object.assign(this, { _a: a, _b: b, _c: c, _d: d, space })
    // If the user gave us an array, make the color from it
    } else if (a instanceof Array) {
      this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb'
      Object.assign(this, { _a: a[0], _b: a[1], _c: a[2], _d: a[3] || 0 })
    } else if (a instanceof Object) {
      // Set the object up and assign its values directly
      const values = getParameters(a, b)
      Object.assign(this, values)
    } else if (typeof a === 'string') {
      if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["isRgb"].test(a)) {
        const noWhitespace = a.replace(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["whitespace"], '')
        const [ _a, _b, _c ] = _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["rgb"].exec(noWhitespace)
          .slice(1, 4).map(v => parseInt(v))
        Object.assign(this, { _a, _b, _c, _d: 0, space: 'rgb' })
      } else if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["isHex"].test(a)) {
        const hexParse = v => parseInt(v, 16)
        const [ , _a, _b, _c ] = _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["hex"].exec(sixDigitHex(a)).map(hexParse)
        Object.assign(this, { _a, _b, _c, _d: 0, space: 'rgb' })
      } else throw Error(`Unsupported string format, can't construct Color`)
    }

    // Now add the components as a convenience
    const { _a, _b, _c, _d } = this
    const components = this.space === 'rgb' ? { r: _a, g: _b, b: _c }
      : this.space === 'xyz' ? { x: _a, y: _b, z: _c }
      : this.space === 'hsl' ? { h: _a, s: _b, l: _c }
      : this.space === 'lab' ? { l: _a, a: _b, b: _c }
      : this.space === 'lch' ? { l: _a, c: _b, h: _c }
      : this.space === 'cmyk' ? { c: _a, m: _b, y: _c, k: _d }
      : {}
    Object.assign(this, components)
  }

  /*
  Conversion Methods
  */

  rgb () {
    if (this.space === 'rgb') {
      return this
    } else if (cieSpace(this.space)) {
      // Convert to the xyz color space
      let { x, y, z } = this
      if (this.space === 'lab' || this.space === 'lch') {
        // Get the values in the lab space
        let { l, a, b } = this
        if (this.space === 'lch') {
          let { c, h } = this
          const dToR = Math.PI / 180
          a = c * Math.cos(dToR * h)
          b = c * Math.sin(dToR * h)
        }

        // Undo the nonlinear function
        const yL = (l + 16) / 116
        const xL = a / 500 + yL
        const zL = yL - b / 200

        // Get the xyz values
        const ct = 16 / 116
        const mx = 0.008856
        const nm = 7.787
        x = 0.95047 * ((xL ** 3 > mx) ? xL ** 3 : (xL - ct) / nm)
        y = 1.00000 * ((yL ** 3 > mx) ? yL ** 3 : (yL - ct) / nm)
        z = 1.08883 * ((zL ** 3 > mx) ? zL ** 3 : (zL - ct) / nm)
      }

      // Convert xyz to unbounded rgb values
      const rU = x * 3.2406 + y * -1.5372 + z * -0.4986
      const gU = x * -0.9689 + y * 1.8758 + z * 0.0415
      const bU = x * 0.0557 + y * -0.2040 + z * 1.0570

      // Convert the values to true rgb values
      let pow = Math.pow
      let bd = 0.0031308
      const r = (rU > bd) ? (1.055 * pow(rU, 1 / 2.4) - 0.055) : 12.92 * rU
      const g = (gU > bd) ? (1.055 * pow(gU, 1 / 2.4) - 0.055) : 12.92 * gU
      const b = (bU > bd) ? (1.055 * pow(bU, 1 / 2.4) - 0.055) : 12.92 * bU

      // Make and return the color
      const color = new Color(255 * r, 255 * g, 255 * b)
      return color
    } else if (this.space === 'hsl') {
      // https://bgrins.github.io/TinyColor/docs/tinycolor.html
      // Get the current hsl values
      let { h, s, l } = this
      h /= 360
      s /= 100
      l /= 100

      // If we are grey, then just make the color directly
      if (s === 0) {
        l *= 255
        let color = new Color(l, l, l)
        return color
      }

      // TODO I have no idea what this does :D If you figure it out, tell me!
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      // Get the rgb values
      const r = 255 * hueToRgb(p, q, h + 1 / 3)
      const g = 255 * hueToRgb(p, q, h)
      const b = 255 * hueToRgb(p, q, h - 1 / 3)

      // Make a new color
      const color = new Color(r, g, b)
      return color
    } else if (this.space === 'cmyk') {
      // https://gist.github.com/felipesabino/5066336
      // Get the normalised cmyk values
      const { c, m, y, k } = this

      // Get the rgb values
      const r = 255 * (1 - Math.min(1, c * (1 - k) + k))
      const g = 255 * (1 - Math.min(1, m * (1 - k) + k))
      const b = 255 * (1 - Math.min(1, y * (1 - k) + k))

      // Form the color and return it
      const color = new Color(r, g, b)
      return color
    } else {
      return this
    }
  }

  lab () {
    // Get the xyz color
    const { x, y, z } = this.xyz()

    // Get the lab components
    const l = (116 * y) - 16
    const a = 500 * (x - y)
    const b = 200 * (y - z)

    // Construct and return a new color
    const color = new Color(l, a, b, 'lab')
    return color
  }

  xyz () {

    // Normalise the red, green and blue values
    const { _a: r255, _b: g255, _c: b255 } = this.rgb()
    const [ r, g, b ] = [ r255, g255, b255 ].map(v => v / 255)

    // Convert to the lab rgb space
    const rL = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
    const gL = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
    const bL = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

    // Convert to the xyz color space without bounding the values
    const xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047
    const yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.00000
    const zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883

    // Get the proper xyz values by applying the bounding
    const x = (xU > 0.008856) ? Math.pow(xU, 1 / 3) : (7.787 * xU) + 16 / 116
    const y = (yU > 0.008856) ? Math.pow(yU, 1 / 3) : (7.787 * yU) + 16 / 116
    const z = (zU > 0.008856) ? Math.pow(zU, 1 / 3) : (7.787 * zU) + 16 / 116

    // Make and return the color
    const color = new Color(x, y, z, 'xyz')
    return color
  }

  lch () {

    // Get the lab color directly
    const { l, a, b } = this.lab()

    // Get the chromaticity and the hue using polar coordinates
    const c = Math.sqrt(a ** 2 + b ** 2)
    let h = 180 * Math.atan2(b, a) / Math.PI
    if (h < 0) {
      h *= -1
      h = 360 - h
    }

    // Make a new color and return it
    const color = new Color(l, c, h, 'lch')
    return color
  }

  hsl () {

    // Get the rgb values
    const { _a, _b, _c } = this.rgb()
    const [ r, g, b ] = [ _a, _b, _c ].map(v => v / 255)

    // Find the maximum and minimum values to get the lightness
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2

    // If the r, g, v values are identical then we are grey
    const isGrey = max === min

    // Calculate the hue and saturation
    const delta = max - min
    const s = isGrey ? 0
      : l > 0.5 ? delta / (2 - max - min)
      : delta / (max + min)
    const h = isGrey ? 0
      : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6
      : max === g ? ((b - r) / delta + 2) / 6
      : max === b ? ((r - g) / delta + 4) / 6
      : 0

    // Construct and return the new color
    const color = new Color(360 * h, 100 * s, 100 * l, 'hsl')
    return color
  }

  cmyk () {

    // Get the rgb values for the current color
    const { _a, _b, _c } = this.rgb()
    const [ r, g, b ] = [ _a, _b, _c ].map(v => v / 255)

    // Get the cmyk values in an unbounded format
    const k = Math.min(1 - r, 1 - g, 1 - b)

    if (k === 1) {
      // Catch the black case
      return new Color(0, 0, 0, 1, 'cmyk')
    }

    const c = (1 - r - k) / (1 - k)
    const m = (1 - g - k) / (1 - k)
    const y = (1 - b - k) / (1 - k)

    // Construct the new color
    const color = new Color(c, m, y, k, 'cmyk')
    return color
  }

  /*
  Input and Output methods
  */

  _clamped () {
    let { _a, _b, _c } = this.rgb()
    let { max, min, round } = Math
    let format = v => max(0, min(round(v), 255))
    return [ _a, _b, _c ].map(format)
  }

  toHex () {
    let [ r, g, b ] = this._clamped().map(componentHex)
    return `#${r}${g}${b}`
  }

  toString () {
    return this.toHex()
  }

  toRgb () {
    let [ rV, gV, bV ] = this._clamped()
    let string = `rgb(${rV},${gV},${bV})`
    return string
  }

  toArray () {
    let { _a, _b, _c, _d, space } = this
    return [ _a, _b, _c, _d, space ]
  }

  /*
  Generating random colors
  */

  static random (mode = 'vibrant', t, u) {

    // Get the math modules
    const { random, round, sin, PI: pi } = Math

    // Run the correct generator
    if (mode === 'vibrant') {

      const l = (81 - 57) * random() + 57
      const c = (83 - 45) * random() + 45
      const h = 360 * random()
      const color = new Color(l, c, h, 'lch')
      return color

    } else if (mode === 'sine') {

      t = t == null ? random() : t
      const r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150)
      const g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200)
      const b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150)
      const color = new Color(r, g, b)
      return color

    } else if (mode === 'pastel') {

      const l = (94 - 86) * random() + 86
      const c = (26 - 9) * random() + 9
      const h = 360 * random()
      const color = new Color(l, c, h, 'lch')
      return color

    } else if (mode === 'dark') {

      const l = 10 + 10 * random()
      const c = (125 - 75) * random() + 86
      const h = 360 * random()
      const color = new Color(l, c, h, 'lch')
      return color

    } else if (mode === 'rgb') {

      const r = 255 * random()
      const g = 255 * random()
      const b = 255 * random()
      const color = new Color(r, g, b)
      return color

    } else if (mode === 'lab') {

      const l = 100 * random()
      const a = 256 * random() - 128
      const b = 256 * random() - 128
      const color = new Color(l, a, b, 'lab')
      return color

    } else if (mode === 'grey') {

      const grey = 255 * random()
      const color = new Color(grey, grey, grey)
      return color

    }
  }

  /*
  Constructing colors
  */

  // Test if given value is a color string
  static test (color) {
    return (typeof color === 'string')
      && (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["isHex"].test(color) || _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["isRgb"].test(color))
  }

  // Test if given value is an rgb object
  static isRgb (color) {
    return color && typeof color.r === 'number'
      && typeof color.g === 'number'
      && typeof color.b === 'number'
  }

  // Test if given value is a color
  static isColor (color) {
    return color && (
      color instanceof Color
      || this.isRgb(color)
      || this.test(color)
    )
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js":
/*!****************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/EventTarget.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventTarget; });
/* harmony import */ var _modules_core_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/event.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/event.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Base.js */ "./node_modules/@svgdotjs/svg.js/src/types/Base.js");




class EventTarget extends _Base_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor ({ events = {} } = {}) {
    super()
    this.events = events
  }

  addEventListener () {}

  dispatch (event, data) {
    return Object(_modules_core_event_js__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(this, event, data)
  }

  dispatchEvent (event) {
    const bag = this.getEventHolder().events
    if (!bag) return true

    const events = bag[event.type]

    for (let i in events) {
      for (let j in events[i]) {
        events[i][j](event)
      }
    }

    return !event.defaultPrevented
  }

  // Fire given event
  fire (event, data) {
    this.dispatch(event, data)
    return this
  }

  getEventHolder () {
    return this
  }

  getEventTarget () {
    return this
  }

  // Unbind event from listener
  off (event, listener) {
    Object(_modules_core_event_js__WEBPACK_IMPORTED_MODULE_0__["off"])(this, event, listener)
    return this
  }

  // Bind given event to listener
  on (event, listener, binding, options) {
    Object(_modules_core_event_js__WEBPACK_IMPORTED_MODULE_0__["on"])(this, event, listener, binding, options)
    return this
  }

  removeEventListener () {}
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["register"])(EventTarget)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/List.js":
/*!*********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/List.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _ArrayPolyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArrayPolyfill.js */ "./node_modules/@svgdotjs/svg.js/src/types/ArrayPolyfill.js");



const List = Object(_ArrayPolyfill_js__WEBPACK_IMPORTED_MODULE_1__["subClassArray"])('List', Array, function (arr = []) {
  // This catches the case, that native map tries to create an array with new Array(1)
  if (typeof arr === 'number') return this
  this.length = 0
  this.push(...arr)
})

/* harmony default export */ __webpack_exports__["default"] = (List);

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(List, {
  each (fnOrMethodName, ...args) {
    if (typeof fnOrMethodName === 'function') {
      return this.map((el) => {
        return fnOrMethodName.call(el, el)
      })
    } else {
      return this.map(el => {
        return el[fnOrMethodName](...args)
      })
    }
  },

  toArray () {
    return Array.prototype.concat.apply([], this)
  }
})

const reserved = ['toArray', 'constructor', 'each']

List.extend = function (methods) {
  methods = methods.reduce((obj, name) => {
    // Don't overwrite own methods
    if (reserved.includes(name)) return obj

    // Don't add private methods
    if (name[0] === '_') return obj

    // Relay every call to each()
    obj[name] = function (...attrs) {
      return this.each(name, ...attrs)
    }
    return obj
  }, {})

  Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(List, methods)
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Matrix.js ***!
  \***********************************************************/
/*! exports provided: default, ctm, screenCTM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Matrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ctm", function() { return ctm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "screenCTM", function() { return screenCTM; });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _elements_Element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../elements/Element.js */ "./node_modules/@svgdotjs/svg.js/src/elements/Element.js");
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");






function closeEnough (a, b, threshold) {
  return Math.abs(b - a) < (threshold || 1e-6)
}

class Matrix {
  constructor (...args) {
    this.init(...args)
  }

  // Initialize
  init (source) {
    var base = Matrix.fromArray([ 1, 0, 0, 1, 0, 0 ])

    // ensure source as object
    source = source instanceof _elements_Element_js__WEBPACK_IMPORTED_MODULE_3__["default"] ? source.matrixify()
      : typeof source === 'string' ? Matrix.fromArray(source.split(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["delimiter"]).map(parseFloat))
      : Array.isArray(source) ? Matrix.fromArray(source)
      : (typeof source === 'object' && Matrix.isMatrixLike(source)) ? source
      : (typeof source === 'object') ? new Matrix().transform(source)
      : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments))
      : base

    // Merge the source matrix with the base matrix
    this.a = source.a != null ? source.a : base.a
    this.b = source.b != null ? source.b : base.b
    this.c = source.c != null ? source.c : base.c
    this.d = source.d != null ? source.d : base.d
    this.e = source.e != null ? source.e : base.e
    this.f = source.f != null ? source.f : base.f

    return this
  }

  // Clones this matrix
  clone () {
    return new Matrix(this)
  }

  // Transform a matrix into another matrix by manipulating the space
  transform (o) {
    // Check if o is a matrix and then left multiply it directly
    if (Matrix.isMatrixLike(o)) {
      var matrix = new Matrix(o)
      return matrix.multiplyO(this)
    }

    // Get the proposed transformations and the current transformations
    var t = Matrix.formatTransforms(o)
    var current = this
    let { x: ox, y: oy } = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](t.ox, t.oy).transform(current)

    // Construct the resulting matrix
    var transformer = new Matrix()
      .translateO(t.rx, t.ry)
      .lmultiplyO(current)
      .translateO(-ox, -oy)
      .scaleO(t.scaleX, t.scaleY)
      .skewO(t.skewX, t.skewY)
      .shearO(t.shear)
      .rotateO(t.theta)
      .translateO(ox, oy)

    // If we want the origin at a particular place, we force it there
    if (isFinite(t.px) || isFinite(t.py)) {
      const origin = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](ox, oy).transform(transformer)
      // TODO: Replace t.px with isFinite(t.px)
      const dx = t.px ? t.px - origin.x : 0
      const dy = t.py ? t.py - origin.y : 0
      transformer.translateO(dx, dy)
    }

    // Translate now after positioning
    transformer.translateO(t.tx, t.ty)
    return transformer
  }

  // Applies a matrix defined by its affine parameters
  compose (o) {
    if (o.origin) {
      o.originX = o.origin[0]
      o.originY = o.origin[1]
    }
    // Get the parameters
    var ox = o.originX || 0
    var oy = o.originY || 0
    var sx = o.scaleX || 1
    var sy = o.scaleY || 1
    var lam = o.shear || 0
    var theta = o.rotate || 0
    var tx = o.translateX || 0
    var ty = o.translateY || 0

    // Apply the standard matrix
    var result = new Matrix()
      .translateO(-ox, -oy)
      .scaleO(sx, sy)
      .shearO(lam)
      .rotateO(theta)
      .translateO(tx, ty)
      .lmultiplyO(this)
      .translateO(ox, oy)
    return result
  }

  // Decomposes this matrix into its affine parameters
  decompose (cx = 0, cy = 0) {
    // Get the parameters from the matrix
    var a = this.a
    var b = this.b
    var c = this.c
    var d = this.d
    var e = this.e
    var f = this.f

    // Figure out if the winding direction is clockwise or counterclockwise
    var determinant = a * d - b * c
    var ccw = determinant > 0 ? 1 : -1

    // Since we only shear in x, we can use the x basis to get the x scale
    // and the rotation of the resulting matrix
    var sx = ccw * Math.sqrt(a * a + b * b)
    var thetaRad = Math.atan2(ccw * b, ccw * a)
    var theta = 180 / Math.PI * thetaRad
    var ct = Math.cos(thetaRad)
    var st = Math.sin(thetaRad)

    // We can then solve the y basis vector simultaneously to get the other
    // two affine parameters directly from these parameters
    var lam = (a * c + b * d) / determinant
    var sy = ((c * sx) / (lam * a - b)) || ((d * sx) / (lam * b + a))

    // Use the translations
    let tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy)
    let ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy)

    // Construct the decomposition and return it
    return {
      // Return the affine parameters
      scaleX: sx,
      scaleY: sy,
      shear: lam,
      rotate: theta,
      translateX: tx,
      translateY: ty,
      originX: cx,
      originY: cy,

      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    }
  }

  // Left multiplies by the given matrix
  multiply (matrix) {
    return this.clone().multiplyO(matrix)
  }

  multiplyO (matrix) {
    // Get the matrices
    var l = this
    var r = matrix instanceof Matrix
      ? matrix
      : new Matrix(matrix)

    return Matrix.matrixMultiply(l, r, this)
  }

  lmultiply (matrix) {
    return this.clone().lmultiplyO(matrix)
  }

  lmultiplyO (matrix) {
    var r = this
    var l = matrix instanceof Matrix
      ? matrix
      : new Matrix(matrix)

    return Matrix.matrixMultiply(l, r, this)
  }

  // Inverses matrix
  inverseO () {
    // Get the current parameters out of the matrix
    var a = this.a
    var b = this.b
    var c = this.c
    var d = this.d
    var e = this.e
    var f = this.f

    // Invert the 2x2 matrix in the top left
    var det = a * d - b * c
    if (!det) throw new Error('Cannot invert ' + this)

    // Calculate the top 2x2 matrix
    var na = d / det
    var nb = -b / det
    var nc = -c / det
    var nd = a / det

    // Apply the inverted matrix to the top right
    var ne = -(na * e + nc * f)
    var nf = -(nb * e + nd * f)

    // Construct the inverted matrix
    this.a = na
    this.b = nb
    this.c = nc
    this.d = nd
    this.e = ne
    this.f = nf

    return this
  }

  inverse () {
    return this.clone().inverseO()
  }

  // Translate matrix
  translate (x, y) {
    return this.clone().translateO(x, y)
  }

  translateO (x, y) {
    this.e += x || 0
    this.f += y || 0
    return this
  }

  // Scale matrix
  scale (x, y, cx, cy) {
    return this.clone().scaleO(...arguments)
  }

  scaleO (x, y = x, cx = 0, cy = 0) {
    // Support uniform scaling
    if (arguments.length === 3) {
      cy = cx
      cx = y
      y = x
    }

    let { a, b, c, d, e, f } = this

    this.a = a * x
    this.b = b * y
    this.c = c * x
    this.d = d * y
    this.e = e * x - cx * x + cx
    this.f = f * y - cy * y + cy

    return this
  }

  // Rotate matrix
  rotate (r, cx, cy) {
    return this.clone().rotateO(r, cx, cy)
  }

  rotateO (r, cx = 0, cy = 0) {
    // Convert degrees to radians
    r = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["radians"])(r)

    let cos = Math.cos(r)
    let sin = Math.sin(r)

    let { a, b, c, d, e, f } = this

    this.a = a * cos - b * sin
    this.b = b * cos + a * sin
    this.c = c * cos - d * sin
    this.d = d * cos + c * sin
    this.e = e * cos - f * sin + cy * sin - cx * cos + cx
    this.f = f * cos + e * sin - cx * sin - cy * cos + cy

    return this
  }

  // Flip matrix on x or y, at a given offset
  flip (axis, around) {
    return this.clone().flipO(axis, around)
  }

  flipO (axis, around) {
    return axis === 'x' ? this.scaleO(-1, 1, around, 0)
      : axis === 'y' ? this.scaleO(1, -1, 0, around)
      : this.scaleO(-1, -1, axis, around || axis) // Define an x, y flip point
  }

  // Shear matrix
  shear (a, cx, cy) {
    return this.clone().shearO(a, cx, cy)
  }

  shearO (lx, cx = 0, cy = 0) {
    let { a, b, c, d, e, f } = this

    this.a = a + b * lx
    this.c = c + d * lx
    this.e = e + f * lx - cy * lx

    return this
  }

  // Skew Matrix
  skew (x, y, cx, cy) {
    return this.clone().skewO(...arguments)
  }

  skewO (x, y = x, cx = 0, cy = 0) {
    // support uniformal skew
    if (arguments.length === 3) {
      cy = cx
      cx = y
      y = x
    }

    // Convert degrees to radians
    x = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["radians"])(x)
    y = Object(_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["radians"])(y)

    let lx = Math.tan(x)
    let ly = Math.tan(y)

    let { a, b, c, d, e, f } = this

    this.a = a + b * lx
    this.b = b + a * ly
    this.c = c + d * lx
    this.d = d + c * ly
    this.e = e + f * lx - cy * lx
    this.f = f + e * ly - cx * ly

    return this
  }

  // SkewX
  skewX (x, cx, cy) {
    return this.skew(x, 0, cx, cy)
  }

  skewXO (x, cx, cy) {
    return this.skewO(x, 0, cx, cy)
  }

  // SkewY
  skewY (y, cx, cy) {
    return this.skew(0, y, cx, cy)
  }

  skewYO (y, cx, cy) {
    return this.skewO(0, y, cx, cy)
  }

  // Transform around a center point
  aroundO (cx, cy, matrix) {
    var dx = cx || 0
    var dy = cy || 0
    return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy)
  }

  around (cx, cy, matrix) {
    return this.clone().aroundO(cx, cy, matrix)
  }

  // Check if two matrices are equal
  equals (other) {
    var comp = new Matrix(other)
    return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b)
      && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d)
      && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f)
  }

  // Convert matrix to string
  toString () {
    return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')'
  }

  toArray () {
    return [ this.a, this.b, this.c, this.d, this.e, this.f ]
  }

  valueOf () {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    }
  }

  static fromArray (a) {
    return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
  }

  static isMatrixLike (o) {
    return (
      o.a != null
      || o.b != null
      || o.c != null
      || o.d != null
      || o.e != null
      || o.f != null
    )
  }

  static formatTransforms (o) {
    // Get all of the parameters required to form the matrix
    var flipBoth = o.flip === 'both' || o.flip === true
    var flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1
    var flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1
    var skewX = o.skew && o.skew.length ? o.skew[0]
      : isFinite(o.skew) ? o.skew
      : isFinite(o.skewX) ? o.skewX
      : 0
    var skewY = o.skew && o.skew.length ? o.skew[1]
      : isFinite(o.skew) ? o.skew
      : isFinite(o.skewY) ? o.skewY
      : 0
    var scaleX = o.scale && o.scale.length ? o.scale[0] * flipX
      : isFinite(o.scale) ? o.scale * flipX
      : isFinite(o.scaleX) ? o.scaleX * flipX
      : flipX
    var scaleY = o.scale && o.scale.length ? o.scale[1] * flipY
      : isFinite(o.scale) ? o.scale * flipY
      : isFinite(o.scaleY) ? o.scaleY * flipY
      : flipY
    var shear = o.shear || 0
    var theta = o.rotate || o.theta || 0
    var origin = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](o.origin || o.around || o.ox || o.originX, o.oy || o.originY)
    var ox = origin.x
    var oy = origin.y
    var position = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](o.position || o.px || o.positionX, o.py || o.positionY)
    var px = position.x
    var py = position.y
    var translate = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](o.translate || o.tx || o.translateX, o.ty || o.translateY)
    var tx = translate.x
    var ty = translate.y
    var relative = new _Point_js__WEBPACK_IMPORTED_MODULE_4__["default"](o.relative || o.rx || o.relativeX, o.ry || o.relativeY)
    var rx = relative.x
    var ry = relative.y

    // Populate all of the values
    return {
      scaleX, scaleY, skewX, skewY, shear, theta, rx, ry, tx, ty, ox, oy, px, py
    }
  }

  // left matrix, right matrix, target matrix which is overwritten
  static matrixMultiply (l, r, o) {
    // Work out the product directly
    var a = l.a * r.a + l.c * r.b
    var b = l.b * r.a + l.d * r.b
    var c = l.a * r.c + l.c * r.d
    var d = l.b * r.c + l.d * r.d
    var e = l.e + l.a * r.e + l.c * r.f
    var f = l.f + l.b * r.e + l.d * r.f

    // make sure to use local variables because l/r and o could be the same
    o.a = a
    o.b = b
    o.c = c
    o.d = d
    o.e = e
    o.f = f

    return o
  }
}

function ctm () {
  return new Matrix(this.node.getCTM())
}

function screenCTM () {
  /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
     This is needed because FF does not return the transformation matrix
     for the inner coordinate system when getScreenCTM() is called on nested svgs.
     However all other Browsers do that */
  if (typeof this.isRoot === 'function' && !this.isRoot()) {
    var rect = this.rect(1, 1)
    var m = rect.node.getScreenCTM()
    rect.remove()
    return new Matrix(m)
  }
  return new Matrix(this.node.getScreenCTM())
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_2__["register"])(Matrix)


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/PathArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/PathArray.js ***!
  \**************************************************************/
/*! exports provided: default, pathRegReplace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathRegReplace", function() { return pathRegReplace; });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _ArrayPolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArrayPolyfill.js */ "./node_modules/@svgdotjs/svg.js/src/types/ArrayPolyfill.js");
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Point.js */ "./node_modules/@svgdotjs/svg.js/src/types/Point.js");
/* harmony import */ var _SVGArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");
/* harmony import */ var _modules_core_parser_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/core/parser.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/parser.js");







const PathArray = Object(_ArrayPolyfill_js__WEBPACK_IMPORTED_MODULE_2__["subClassArray"])('PathArray', _SVGArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])

/* harmony default export */ __webpack_exports__["default"] = (PathArray);

function pathRegReplace (a, b, c, d) {
  return c + d.replace(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["dots"], ' .')
}

function arrayToString (a) {
  for (var i = 0, il = a.length, s = ''; i < il; i++) {
    s += a[i][0]

    if (a[i][1] != null) {
      s += a[i][1]

      if (a[i][2] != null) {
        s += ' '
        s += a[i][2]

        if (a[i][3] != null) {
          s += ' '
          s += a[i][3]
          s += ' '
          s += a[i][4]

          if (a[i][5] != null) {
            s += ' '
            s += a[i][5]
            s += ' '
            s += a[i][6]

            if (a[i][7] != null) {
              s += ' '
              s += a[i][7]
            }
          }
        }
      }
    }
  }

  return s + ' '
}

const pathHandlers = {
  M: function (c, p, p0) {
    p.x = p0.x = c[0]
    p.y = p0.y = c[1]

    return [ 'M', p.x, p.y ]
  },
  L: function (c, p) {
    p.x = c[0]
    p.y = c[1]
    return [ 'L', c[0], c[1] ]
  },
  H: function (c, p) {
    p.x = c[0]
    return [ 'H', c[0] ]
  },
  V: function (c, p) {
    p.y = c[0]
    return [ 'V', c[0] ]
  },
  C: function (c, p) {
    p.x = c[4]
    p.y = c[5]
    return [ 'C', c[0], c[1], c[2], c[3], c[4], c[5] ]
  },
  S: function (c, p) {
    p.x = c[2]
    p.y = c[3]
    return [ 'S', c[0], c[1], c[2], c[3] ]
  },
  Q: function (c, p) {
    p.x = c[2]
    p.y = c[3]
    return [ 'Q', c[0], c[1], c[2], c[3] ]
  },
  T: function (c, p) {
    p.x = c[0]
    p.y = c[1]
    return [ 'T', c[0], c[1] ]
  },
  Z: function (c, p, p0) {
    p.x = p0.x
    p.y = p0.y
    return [ 'Z' ]
  },
  A: function (c, p) {
    p.x = c[5]
    p.y = c[6]
    return [ 'A', c[0], c[1], c[2], c[3], c[4], c[5], c[6] ]
  }
}

let mlhvqtcsaz = 'mlhvqtcsaz'.split('')

for (var i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
  pathHandlers[mlhvqtcsaz[i]] = (function (i) {
    return function (c, p, p0) {
      if (i === 'H') c[0] = c[0] + p.x
      else if (i === 'V') c[0] = c[0] + p.y
      else if (i === 'A') {
        c[5] = c[5] + p.x
        c[6] = c[6] + p.y
      } else {
        for (var j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x)
        }
      }

      return pathHandlers[i](c, p, p0)
    }
  })(mlhvqtcsaz[i].toUpperCase())
}

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(PathArray, {
  // Convert array to string
  toString () {
    return arrayToString(this)
  },

  // Move path string
  move (x, y) {
    // get bounding box of current situation
    var box = this.bbox()

    // get relative offset
    x -= box.x
    y -= box.y

    if (!isNaN(x) && !isNaN(y)) {
      // move every point
      for (var l, i = this.length - 1; i >= 0; i--) {
        l = this[i][0]

        if (l === 'M' || l === 'L' || l === 'T') {
          this[i][1] += x
          this[i][2] += y
        } else if (l === 'H') {
          this[i][1] += x
        } else if (l === 'V') {
          this[i][1] += y
        } else if (l === 'C' || l === 'S' || l === 'Q') {
          this[i][1] += x
          this[i][2] += y
          this[i][3] += x
          this[i][4] += y

          if (l === 'C') {
            this[i][5] += x
            this[i][6] += y
          }
        } else if (l === 'A') {
          this[i][6] += x
          this[i][7] += y
        }
      }
    }

    return this
  },

  // Resize path string
  size (width, height) {
    // get bounding box of current situation
    var box = this.bbox()
    var i, l

    // recalculate position of all points according to new size
    for (i = this.length - 1; i >= 0; i--) {
      l = this[i][0]

      if (l === 'M' || l === 'L' || l === 'T') {
        this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x
        this[i][2] = ((this[i][2] - box.y) * height) / box.height + box.y
      } else if (l === 'H') {
        this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x
      } else if (l === 'V') {
        this[i][1] = ((this[i][1] - box.y) * height) / box.height + box.y
      } else if (l === 'C' || l === 'S' || l === 'Q') {
        this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x
        this[i][2] = ((this[i][2] - box.y) * height) / box.height + box.y
        this[i][3] = ((this[i][3] - box.x) * width) / box.width + box.x
        this[i][4] = ((this[i][4] - box.y) * height) / box.height + box.y

        if (l === 'C') {
          this[i][5] = ((this[i][5] - box.x) * width) / box.width + box.x
          this[i][6] = ((this[i][6] - box.y) * height) / box.height + box.y
        }
      } else if (l === 'A') {
        // resize radii
        this[i][1] = (this[i][1] * width) / box.width
        this[i][2] = (this[i][2] * height) / box.height

        // move position values
        this[i][6] = ((this[i][6] - box.x) * width) / box.width + box.x
        this[i][7] = ((this[i][7] - box.y) * height) / box.height + box.y
      }
    }

    return this
  },

  // Test if the passed path array use the same path data commands as this path array
  equalCommands (pathArray) {
    var i, il, equalCommands

    pathArray = new PathArray(pathArray)

    equalCommands = this.length === pathArray.length
    for (i = 0, il = this.length; equalCommands && i < il; i++) {
      equalCommands = this[i][0] === pathArray[i][0]
    }

    return equalCommands
  },

  // Make path array morphable
  morph (pathArray) {
    pathArray = new PathArray(pathArray)

    if (this.equalCommands(pathArray)) {
      this.destination = pathArray
    } else {
      this.destination = null
    }

    return this
  },

  // Get morphed path array at given position
  at (pos) {
    // make sure a destination is defined
    if (!this.destination) return this

    var sourceArray = this
    var destinationArray = this.destination.value
    var array = []
    var pathArray = new PathArray()
    var i, il, j, jl

    // Animate has specified in the SVG spec
    // See: https://www.w3.org/TR/SVG11/paths.html#PathElement
    for (i = 0, il = sourceArray.length; i < il; i++) {
      array[i] = [ sourceArray[i][0] ]
      for (j = 1, jl = sourceArray[i].length; j < jl; j++) {
        array[i][j] = sourceArray[i][j] + (destinationArray[i][j] - sourceArray[i][j]) * pos
      }
      // For the two flags of the elliptical arc command, the SVG spec say:
      // Flags and booleans are interpolated as fractions between zero and one, with any non-zero value considered to be a value of one/true
      // Elliptical arc command as an array followed by corresponding indexes:
      // ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
      //   0    1   2        3                 4             5      6  7
      if (array[i][0] === 'A') {
        array[i][4] = +(array[i][4] !== 0)
        array[i][5] = +(array[i][5] !== 0)
      }
    }

    // Directly modify the value of a path array, this is done this way for performance
    pathArray.value = array
    return pathArray
  },

  // Absolutize and parse path to array
  parse (array = [ [ 'M', 0, 0 ] ]) {
    // if it's already a patharray, no need to parse it
    if (array instanceof PathArray) return array

    // prepare for parsing
    var s
    var paramCnt = { 'M': 2, 'L': 2, 'H': 1, 'V': 1, 'C': 6, 'S': 4, 'Q': 4, 'T': 2, 'A': 7, 'Z': 0 }

    if (typeof array === 'string') {
      array = array
        .replace(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["numbersWithDots"], pathRegReplace) // convert 45.123.123 to 45.123 .123
        .replace(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["pathLetters"], ' $& ') // put some room between letters and numbers
        .replace(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["hyphen"], '$1 -') // add space before hyphen
        .trim() // trim
        .split(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["delimiter"]) // split into array
    } else {
      array = array.reduce(function (prev, curr) {
        return [].concat.call(prev, curr)
      }, [])
    }

    // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]
    var result = []
    var p = new _Point_js__WEBPACK_IMPORTED_MODULE_3__["default"]()
    var p0 = new _Point_js__WEBPACK_IMPORTED_MODULE_3__["default"]()
    var index = 0
    var len = array.length

    do {
      // Test if we have a path letter
      if (_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["isPathLetter"].test(array[index])) {
        s = array[index]
        ++index
        // If last letter was a move command and we got no new, it defaults to [L]ine
      } else if (s === 'M') {
        s = 'L'
      } else if (s === 'm') {
        s = 'l'
      }

      result.push(pathHandlers[s].call(null,
        array.slice(index, (index = index + paramCnt[s.toUpperCase()])).map(parseFloat),
        p, p0
      )
      )
    } while (len > index)

    return result
  },

  // Get bounding box of path
  bbox () {
    Object(_modules_core_parser_js__WEBPACK_IMPORTED_MODULE_5__["default"])().path.setAttribute('d', this.toString())
    return _modules_core_parser_js__WEBPACK_IMPORTED_MODULE_5__["default"].nodes.path.getBBox()
  }
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/Point.js":
/*!**********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/Point.js ***!
  \**********************************************************/
/*! exports provided: default, point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "point", function() { return point; });
/* harmony import */ var _Matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Matrix.js */ "./node_modules/@svgdotjs/svg.js/src/types/Matrix.js");


class Point {
  // Initialize
  constructor (...args) {
    this.init(...args)
  }

  init (x, y) {
    let source
    let base = { x: 0, y: 0 }

    // ensure source as object
    source = Array.isArray(x) ? { x: x[0], y: x[1] }
      : typeof x === 'object' ? { x: x.x, y: x.y }
      : { x: x, y: y }

    // merge source
    this.x = source.x == null ? base.x : source.x
    this.y = source.y == null ? base.y : source.y

    return this
  }

  // Clone point
  clone () {
    return new Point(this)
  }

  transform (m) {
    return this.clone().transformO(m)
  }

  // Transform point with matrix
  transformO (m) {
    if (!_Matrix_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMatrixLike(m)) {
      m = new _Matrix_js__WEBPACK_IMPORTED_MODULE_0__["default"](m)
    }

    let { x, y } = this

    // Perform the matrix multiplication
    this.x = m.a * x + m.c * y + m.e
    this.y = m.b * x + m.d * y + m.f

    return this
  }

  toArray () {
    return [ this.x, this.y ]
  }
}

function point (x, y) {
  return new Point(x, y).transform(this.screenCTM().inverse())
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/PointArray.js":
/*!***************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/PointArray.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _ArrayPolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArrayPolyfill.js */ "./node_modules/@svgdotjs/svg.js/src/types/ArrayPolyfill.js");
/* harmony import */ var _SVGArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SVGArray.js */ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js");





const PointArray = Object(_ArrayPolyfill_js__WEBPACK_IMPORTED_MODULE_2__["subClassArray"])('PointArray', _SVGArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])

/* harmony default export */ __webpack_exports__["default"] = (PointArray);

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(PointArray, {
  // Convert array to string
  toString () {
    // convert to a poly point string
    for (var i = 0, il = this.length, array = []; i < il; i++) {
      array.push(this[i].join(','))
    }

    return array.join(' ')
  },

  // Convert array to line object
  toLine () {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    }
  },

  // Get morphed array at given position
  at (pos) {
    // make sure a destination is defined
    if (!this.destination) return this

    // generate morphed point string
    for (var i = 0, il = this.length, array = []; i < il; i++) {
      array.push([
        this[i][0] + (this.destination[i][0] - this[i][0]) * pos,
        this[i][1] + (this.destination[i][1] - this[i][1]) * pos
      ])
    }

    return new PointArray(array)
  },

  // Parse point string and flat array
  parse (array = [ [ 0, 0 ] ]) {
    var points = []

    // if it is an array
    if (array instanceof Array) {
      // and it is not flat, there is no need to parse it
      if (array[0] instanceof Array) {
        return array
      }
    } else { // Else, it is considered as a string
      // parse points
      array = array.trim().split(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["delimiter"]).map(parseFloat)
    }

    // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.
    if (array.length % 2 !== 0) array.pop()

    // wrap points in two-tuples
    for (var i = 0, len = array.length; i < len; i = i + 2) {
      points.push([ array[i], array[i + 1] ])
    }

    return points
  },

  // transform points with matrix (similar to Point.transform)
  transform (m) {
    const points = []

    for (let i = 0; i < this.length; i++) {
      const point = this[i]
      // Perform the matrix multiplication
      points.push([
        m.a * point[0] + m.c * point[1] + m.e,
        m.b * point[0] + m.d * point[1] + m.f
      ])
    }

    // Return the required point
    return new PointArray(points)
  },

  // Move point string
  move (x, y) {
    var box = this.bbox()

    // get relative offset
    x -= box.x
    y -= box.y

    // move every point
    if (!isNaN(x) && !isNaN(y)) {
      for (var i = this.length - 1; i >= 0; i--) {
        this[i] = [ this[i][0] + x, this[i][1] + y ]
      }
    }

    return this
  },

  // Resize poly string
  size (width, height) {
    var i
    var box = this.bbox()

    // recalculate position of all points according to new size
    for (i = this.length - 1; i >= 0; i--) {
      if (box.width) this[i][0] = ((this[i][0] - box.x) * width) / box.width + box.x
      if (box.height) this[i][1] = ((this[i][1] - box.y) * height) / box.height + box.y
    }

    return this
  },

  // Get bounding box of points
  bbox () {
    var maxX = -Infinity
    var maxY = -Infinity
    var minX = Infinity
    var minY = Infinity
    this.forEach(function (el) {
      maxX = Math.max(el[0], maxX)
      maxY = Math.max(el[1], maxY)
      minX = Math.min(el[0], minX)
      minY = Math.min(el[1], minY)
    })
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  }
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js":
/*!*************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/SVGArray.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");
/* harmony import */ var _utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/adopter.js */ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js");
/* harmony import */ var _ArrayPolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArrayPolyfill.js */ "./node_modules/@svgdotjs/svg.js/src/types/ArrayPolyfill.js");




const SVGArray = Object(_ArrayPolyfill_js__WEBPACK_IMPORTED_MODULE_2__["subClassArray"])('SVGArray', Array, function (arr) {
  this.init(arr)
})

/* harmony default export */ __webpack_exports__["default"] = (SVGArray);

Object(_utils_adopter_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(SVGArray, {
  init (arr) {
    // This catches the case, that native map tries to create an array with new Array(1)
    if (typeof arr === 'number') return this
    this.length = 0
    this.push(...this.parse(arr))
    return this
  },

  toArray () {
    return Array.prototype.concat.apply([], this)
  },

  toString () {
    return this.join(' ')
  },

  // Flattens the array if needed
  valueOf () {
    const ret = []
    ret.push(...this)
    return ret
  },

  // Parse whitespace separated string
  parse (array = []) {
    // If already is an array, no need to parse it
    if (array instanceof Array) return array

    return array.trim().split(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["delimiter"]).map(parseFloat)
  },

  clone () {
    return new this.constructor(this)
  },

  toSet () {
    return new Set(this)
  }
})


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js":
/*!**************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/types/SVGNumber.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SVGNumber; });
/* harmony import */ var _modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/core/regex.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/regex.js");


// Module for unit convertions
class SVGNumber {
  // Initialize
  constructor (...args) {
    this.init(...args)
  }

  init (value, unit) {
    unit = Array.isArray(value) ? value[1] : unit
    value = Array.isArray(value) ? value[0] : value

    // initialize defaults
    this.value = 0
    this.unit = unit || ''

    // parse value
    if (typeof value === 'number') {
      // ensure a valid numeric value
      this.value = isNaN(value) ? 0 : !isFinite(value) ? (value < 0 ? -3.4e+38 : +3.4e+38) : value
    } else if (typeof value === 'string') {
      unit = value.match(_modules_core_regex_js__WEBPACK_IMPORTED_MODULE_0__["numberAndUnit"])

      if (unit) {
        // make value numeric
        this.value = parseFloat(unit[1])

        // normalize
        if (unit[5] === '%') {
          this.value /= 100
        } else if (unit[5] === 's') {
          this.value *= 1000
        }

        // store unit
        this.unit = unit[5]
      }
    } else {
      if (value instanceof SVGNumber) {
        this.value = value.valueOf()
        this.unit = value.unit
      }
    }

    return this
  }

  toString () {
    return (this.unit === '%' ? ~~(this.value * 1e8) / 1e6
      : this.unit === 's' ? this.value / 1e3
      : this.value
    ) + this.unit
  }

  toJSON () {
    return this.toString()
  }

  toArray () {
    return [ this.value, this.unit ]
  }

  valueOf () {
    return this.value
  }

  // Add number
  plus (number) {
    number = new SVGNumber(number)
    return new SVGNumber(this + number, this.unit || number.unit)
  }

  // Subtract number
  minus (number) {
    number = new SVGNumber(number)
    return new SVGNumber(this - number, this.unit || number.unit)
  }

  // Multiply number
  times (number) {
    number = new SVGNumber(number)
    return new SVGNumber(this * number, this.unit || number.unit)
  }

  // Divide number
  divide (number) {
    number = new SVGNumber(number)
    return new SVGNumber(this / number, this.unit || number.unit)
  }

  convert (unit) {
    return new SVGNumber(this.value, unit)
  }
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/utils/adopter.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/utils/adopter.js ***!
  \************************************************************/
/*! exports provided: root, create, makeInstance, nodeOrNew, adopt, mockAdopt, register, getClass, eid, assignNewId, extend, wrapWithAttrCheck, invent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "root", function() { return root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeInstance", function() { return makeInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeOrNew", function() { return nodeOrNew; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adopt", function() { return adopt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mockAdopt", function() { return mockAdopt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClass", function() { return getClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eid", function() { return eid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignNewId", function() { return assignNewId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapWithAttrCheck", function() { return wrapWithAttrCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invent", function() { return invent; });
/* harmony import */ var _methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods.js */ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js");
/* harmony import */ var _modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/core/namespaces.js */ "./node_modules/@svgdotjs/svg.js/src/modules/core/namespaces.js");
/* harmony import */ var _utils_window_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/window.js */ "./node_modules/@svgdotjs/svg.js/src/utils/window.js");
/* harmony import */ var _types_Base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/Base.js */ "./node_modules/@svgdotjs/svg.js/src/types/Base.js");






const elements = {}
const root = '___SYMBOL___ROOT___'

// Method for element creation
function create (name) {
  // create element
  return _utils_window_js__WEBPACK_IMPORTED_MODULE_3__["globals"].document.createElementNS(_modules_core_namespaces_js__WEBPACK_IMPORTED_MODULE_2__["ns"], name)
}

function makeInstance (element) {
  if (element instanceof _types_Base_js__WEBPACK_IMPORTED_MODULE_4__["default"]) return element

  if (typeof element === 'object') {
    return adopter(element)
  }

  if (element == null) {
    return new elements[root]()
  }

  if (typeof element === 'string' && element.charAt(0) !== '<') {
    return adopter(_utils_window_js__WEBPACK_IMPORTED_MODULE_3__["globals"].document.querySelector(element))
  }

  var node = create('svg')
  node.innerHTML = element

  // We can use firstChild here because we know,
  // that the first char is < and thus an element
  element = adopter(node.firstChild)

  return element
}

function nodeOrNew (name, node) {
  return node instanceof _utils_window_js__WEBPACK_IMPORTED_MODULE_3__["globals"].window.Node ? node : create(name)
}

// Adopt existing svg elements
function adopt (node) {
  // check for presence of node
  if (!node) return null

  // make sure a node isn't already adopted
  if (node.instance instanceof _types_Base_js__WEBPACK_IMPORTED_MODULE_4__["default"]) return node.instance

  // initialize variables
  var className = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["capitalize"])(node.nodeName || 'Dom')

  // Make sure that gradients are adopted correctly
  if (className === 'LinearGradient' || className === 'RadialGradient') {
    className = 'Gradient'

  // Fallback to Dom if element is not known
  } else if (!elements[className]) {
    className = 'Dom'
  }

  return new elements[className](node)
}

let adopter = adopt

function mockAdopt (mock = adopt) {
  adopter = mock
}

function register (element, name = element.name, asRoot = false) {
  elements[name] = element
  if (asRoot) elements[root] = element

  Object(_methods_js__WEBPACK_IMPORTED_MODULE_0__["addMethodNames"])(Object.getOwnPropertyNames(element.prototype))

  return element
}

function getClass (name) {
  return elements[name]
}

// Element id sequence
let did = 1000

// Get next named element id
function eid (name) {
  return 'Svgjs' + Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["capitalize"])(name) + (did++)
}

// Deep new id assignment
function assignNewId (node) {
  // do the same for SVG child nodes as well
  for (var i = node.children.length - 1; i >= 0; i--) {
    assignNewId(node.children[i])
  }

  if (node.id) {
    return adopt(node).id(eid(node.nodeName))
  }

  return adopt(node)
}

// Method for extending objects
function extend (modules, methods, attrCheck) {
  var key, i

  modules = Array.isArray(modules) ? modules : [ modules ]

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) {
      let method = methods[key]
      if (attrCheck) {
        method = wrapWithAttrCheck(methods[key])
      }
      modules[i].prototype[key] = method
    }
  }
}

// export function extendWithAttrCheck (...args) {
//   extend(...args, true)
// }

function wrapWithAttrCheck (fn) {
  return function (...args) {
    let o = args[args.length - 1]

    if (o && o.constructor === Object && !(o instanceof Array)) {
      return fn.apply(this, args.slice(0, -1)).attr(o)
    } else {
      return fn.apply(this, args)
    }
  }
}

function invent (config) {
  // Create element initializer
  var initializer = typeof config.create === 'function'
    ? config.create
    : function (node) {
      this.constructor(node || create(config.create))
    }

  // Inherit prototype
  if (config.inherit) {
    /* eslint new-cap: off */
    initializer.prototype = new config.inherit()
    initializer.prototype.constructor = initializer
  }

  // Extend with methods
  if (config.extend) { extend(initializer, config.extend) }

  // Attach construct method to parent
  if (config.construct) { extend(config.parent || elements['Container'], config.construct) }

  return initializer
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/utils/methods.js":
/*!************************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/utils/methods.js ***!
  \************************************************************/
/*! exports provided: registerMethods, getMethodsFor, getMethodNames, addMethodNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerMethods", function() { return registerMethods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMethodsFor", function() { return getMethodsFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMethodNames", function() { return getMethodNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMethodNames", function() { return addMethodNames; });
const methods = {}
const names = []

function registerMethods (name, m) {
  if (Array.isArray(name)) {
    for (let _name of name) {
      registerMethods(_name, m)
    }
    return
  }

  if (typeof name === 'object') {
    for (let _name in name) {
      registerMethods(_name, name[_name])
    }
    return
  }

  addMethodNames(Object.getOwnPropertyNames(m))
  methods[name] = Object.assign(methods[name] || {}, m)
}

function getMethodsFor (name) {
  return methods[name] || {}
}

function getMethodNames () {
  return [ ...new Set(names) ]
}

function addMethodNames (_names) {
  names.push(..._names)
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/utils/utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/utils/utils.js ***!
  \**********************************************************/
/*! exports provided: map, filter, radians, degrees, camelCase, unCamelCase, capitalize, proportionalSize, getOrigin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radians", function() { return radians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degrees", function() { return degrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelCase", function() { return camelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unCamelCase", function() { return unCamelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalize", function() { return capitalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proportionalSize", function() { return proportionalSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrigin", function() { return getOrigin; });
// Map function
function map (array, block) {
  var i
  var il = array.length
  var result = []

  for (i = 0; i < il; i++) {
    result.push(block(array[i]))
  }

  return result
}

// Filter function
function filter (array, block) {
  var i
  var il = array.length
  var result = []

  for (i = 0; i < il; i++) {
    if (block(array[i])) {
      result.push(array[i])
    }
  }

  return result
}

// Degrees to radians
function radians (d) {
  return d % 360 * Math.PI / 180
}

// Radians to degrees
function degrees (r) {
  return r * 180 / Math.PI % 360
}

// Convert dash-separated-string to camelCase
function camelCase (s) {
  return s.toLowerCase().replace(/-(.)/g, function (m, g) {
    return g.toUpperCase()
  })
}

// Convert camel cased string to string seperated
function unCamelCase (s) {
  return s.replace(/([A-Z])/g, function (m, g) {
    return '-' + g.toLowerCase()
  })
}

// Capitalize first letter of a string
function capitalize (s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Calculate proportional width and height values when necessary
function proportionalSize (element, width, height, box) {
  if (width == null || height == null) {
    box = box || element.bbox()

    if (width == null) {
      width = box.width / box.height * height
    } else if (height == null) {
      height = box.height / box.width * width
    }
  }

  return {
    width: width,
    height: height
  }
}

function getOrigin (o, element) {
  // Allow origin or around as the names
  let origin = o.origin // o.around == null ? o.origin : o.around
  let ox, oy

  // Allow the user to pass a string to rotate around a given point
  if (typeof origin === 'string' || origin == null) {
    // Get the bounding box of the element with no transformations applied
    const string = (origin || 'center').toLowerCase().trim()
    const { height, width, x, y } = element.bbox()

    // Calculate the transformed x and y coordinates
    let bx = string.includes('left') ? x
      : string.includes('right') ? x + width
      : x + width / 2
    let by = string.includes('top') ? y
      : string.includes('bottom') ? y + height
      : y + height / 2

    // Set the bounds eg : "bottom-left", "Top right", "middle" etc...
    ox = o.ox != null ? o.ox : bx
    oy = o.oy != null ? o.oy : by
  } else {
    ox = origin[0]
    oy = origin[1]
  }

  // Return the origin as it is if it wasn't a string
  return [ ox, oy ]
}


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/src/utils/window.js":
/*!***********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/src/utils/window.js ***!
  \***********************************************************/
/*! exports provided: globals, registerWindow, saveWindow, restoreWindow, withWindow, getWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globals", function() { return globals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerWindow", function() { return registerWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveWindow", function() { return saveWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "restoreWindow", function() { return restoreWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withWindow", function() { return withWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWindow", function() { return getWindow; });
const globals = {
  window: typeof window === 'undefined' ? null : window,
  document: typeof document === 'undefined' ? null : document
}

function registerWindow (win = null, doc = null) {
  globals.window = win
  globals.document = doc
}

const save = {}

function saveWindow () {
  save.window = globals.window
  save.document = globals.document
}

function restoreWindow () {
  globals.window = save.window
  globals.document = save.document
}

function withWindow (win, fn) {
  saveWindow()
  registerWindow(win, win.document)
  fn(win, win.document)
  restoreWindow()
}

function getWindow () {
  return globals.window
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/bottom.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/bottom.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".footer{\r\n  z-index:1002;\r\n  height: 30px;\r\n  background-color: transparent;\r\n  margin-top: -57px;\r\n  position: relative;\r\n  text-align: center;\r\n}\r\n.footer>ul{\r\n  display: inline-block;\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style: none;\r\n  line-height: 30px;\r\n}\r\n.footer>ul>li{\r\n  float: left;\r\n}\r\n.footer>ul>li>a{\r\n  font-family: \"宋体\";\r\n  font-size: 12px;\r\n  color: rgba(255, 255, 255, 0.9);\r\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/test.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/test.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "html{\r\n  height: 100%;\r\n}\r\nbody{\r\n  margin: 0px;\r\n  height: 100%;\r\n  font-family: \"Microsoft YaHei\";\r\n}\r\nol,ul{\r\n\tlist-style-type: none;\r\n}\r\na{\r\n\tcolor: #666;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n.left{\r\n  float: left;\r\n}\r\n.right{\r\n  float: right;\r\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/top.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/top.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../img/home-icon.png */ "./src/img/home-icon.png"));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! ./../img/cs-head.png */ "./src/img/cs-head.png"));

// Module
exports.push([module.i, ".wrap{\r\n  position: relative;\r\n  min-height: 100%;\r\n  height: auto;\r\n  padding-bottom: 30px;\r\n  background-color: #f9f9f9;\r\n}\r\n.wrap .header{\r\n  position: relative;\r\n  z-index: 1003;\r\n  height: 56px;\r\n  text-align: center;\r\n  background-color: #18223d;\r\n}\r\n.wrap .header a{\r\n  color: rgba(255, 255, 255, 0.5);\r\n}\r\n.wrap .pull-left{\r\n  padding: 6px 0 0 33px;\r\n  line-height: 0;\r\n  float: left;\r\n}\r\n.wrap .menu-wrap{\r\n  position: relative;\r\n  width: 684px;\r\n  margin: auto;\r\n}\r\n.wrap .menu-wrap>ul{\r\n  line-height: 56px;\r\n  color: #fff;\r\n  margin: 0px;\r\n}\r\n.wrap .menu-wrap>ul>li{\r\n  float: left;\r\n}\r\n.wrap .menu-wrap li:first-child span{\r\n  position: absolute;\r\n  top: 23px;\r\n  left: -3px;\r\n  display: inline-block;\r\n  width: 12px;\r\n  height: 12px;\r\n  background-color: #4090ff;\r\n}\r\n.wrap .menu-wrap li>a{\r\n  position: relative;\r\n  display: inline-block;\r\n  height: 56px;\r\n  padding: 0 17px;\r\n}\r\n.wrap .menu-wrap li>a:hover{\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n#header-blue-block{\r\n  display: inline-block;\r\n  position: absolute;\r\n  top: 52px;\r\n  overflow: hidden;\r\n  background-color: #4090ff;\r\n  height: 4px;\r\n  left:57px;\r\n  width: 32px;\r\n  transition: left 1s ease, width 0.3s;\r\n}\r\n.wrap .pull-right div{\r\n  display: inline-block;\r\n}\r\n.header-share-box{\r\n  position: relative;\r\n  margin: 15px 10px 0 10px;\r\n}\r\n.weixin-icon {\r\n  display: inline-block;\r\n  width: 30px;\r\n  height: 30px;\r\n  background: url(" + ___CSS_LOADER_URL___0___ + ") -136px -38px;\r\n  /*transition: all 0.3s;*/\r\n}\r\n.weixin-icon:hover{\r\n  transform: translateY(2px);\r\n}\r\n#weixin-code.hide{\r\n  display: none;\r\n}\r\n.weibo-icon {\r\n  display: inline-block;\r\n  width: 30px;\r\n  height: 30px;\r\n  background: url(" + ___CSS_LOADER_URL___0___ + ") -175px -38px;\r\n  /*transition: all 0.3s;*/\r\n}\r\n.weibo-icon:hover{\r\n  transform: translateY(2px);\r\n}\r\n#weixin-code {\r\n  position: absolute;\r\n  top: 43px;\r\n  right: 0;\r\n  background-color: #fff;\r\n}\r\n.wrap .logo-icon{\r\n  display: inline-block;\r\n  width: 104px;\r\n  height: 38px;\r\n  background: url(" + ___CSS_LOADER_URL___0___ + ");\r\n}\r\n.header-account {\r\n  padding-top: 13.5px;\r\n  height: 29px;\r\n}\r\n.unlogin a {\r\n  padding: 3px 10px 5px;\r\n  border: 1px solid #fff;\r\n  font-size: 13px;\r\n  line-height: 29px;\r\n  border-radius: 15px;\r\n  transition: .2s;\r\n}\r\n.u-d {\r\n  display: none;\r\n  font-size: 13px;\r\n  line-height: 29px;\r\n  color: rgba(255, 255, 255, 0.5);\r\n}\r\n.unlogin a:hover{\r\n  color: #fff;\r\n}\r\n.wrap .body{\r\n  min-height: 100%;\r\n}\r\n.wrap .body .customer-service{\r\n  display: inline-block;\r\n  cursor: pointer;\r\n  position: fixed;\r\n  top: 390px;\r\n  right: 0;\r\n  z-index: 9999;\r\n  width: 51px;\r\n  height: 136px;\r\n  background-color: #318CF2;\r\n  border-radius: 6px 0 0 6px;\r\n}\r\n.wrap .body .customer-service .icon{\r\n  background-image: url(" + ___CSS_LOADER_URL___1___ + ");\r\n  width: 24px;\r\n  height: 21px;\r\n  margin: 0 auto;\r\n  display: block;\r\n  margin-top: 13px;\r\n}\r\n.wrap .body .customer-service .text{\r\n  font-size: 16px;\r\n  margin-left: 18px;\r\n  color: #fff;\r\n  width: 18px;\r\n  line-height: 20px;\r\n  margin-top: 10px;\r\n}\r\n\r\n/*滚动的小圆*/\r\n#canvas{\r\n  position: absolute;\r\n  z-index: 1001;\r\n  top: 0;\r\n  overflow: hidden;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n#canvas .imgA{\r\n  width: 696.173px;\r\n  height: 696.173px;\r\n  margin-left: -362.01px;\r\n  margin-top: -360.618px;\r\n}\r\n#canvas .imgB{\r\n  width: 696.173px;\r\n  height: 696.173px;\r\n  margin-left: -348.086px;\r\n  margin-top: -348.086px;\r\n}\r\n#canvas .imgC{\r\n  width: 1161.3px;\r\n  height: 1161.3px;\r\n  margin-left: -580.652px;\r\n  margin-top: -580.652px;\r\n}\r\n#canvas .imgD{\r\n  width: 373.996px;\r\n  height: auto;\r\n  margin-left: -254.317px;\r\n  margin-top: -344.076px;\r\n}\r\n#canvas .circle{\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n}\r\n/*svg*/\r\n#canvas svg{\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/url-escape.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/url-escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/css/bottom.css":
/*!****************************!*\
  !*** ./src/css/bottom.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./bottom.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/bottom.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/css/test.css":
/*!**************************!*\
  !*** ./src/css/test.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./test.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/test.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/css/top.css":
/*!*************************!*\
  !*** ./src/css/top.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./top.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/top.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/img/12cm.jpg":
/*!**************************!*\
  !*** ./src/img/12cm.jpg ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6537d51435c4d66e07a66e12106bd71d.jpg";

/***/ }),

/***/ "./src/img/c3-ignore.png":
/*!*******************************!*\
  !*** ./src/img/c3-ignore.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4deeeb298e5c7d801b040fd720200f2e.png";

/***/ }),

/***/ "./src/img/cs-head.png":
/*!*****************************!*\
  !*** ./src/img/cs-head.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d5eeb9c211b9ca8537d000d8ff9a94a3.png";

/***/ }),

/***/ "./src/img/earth-ignore.png":
/*!**********************************!*\
  !*** ./src/img/earth-ignore.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7e362802b2901ac56f71cb871d9a93cb.png";

/***/ }),

/***/ "./src/img/home-bigtitle-ignore.png":
/*!******************************************!*\
  !*** ./src/img/home-bigtitle-ignore.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "63505bcd68e85f5da915f66f83b02b05.png";

/***/ }),

/***/ "./src/img/home-black-bg.jpg":
/*!***********************************!*\
  !*** ./src/img/home-black-bg.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "976e3f4230e204b7827d2d4d5228a389.jpg";

/***/ }),

/***/ "./src/img/home-icon.png":
/*!*******************************!*\
  !*** ./src/img/home-icon.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "524d4b2940d2e334550e47a3dfdfcf11.png";

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_test_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/test.css */ "./src/css/test.css");
/* harmony import */ var _css_test_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_test_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_top_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/top.css */ "./src/css/top.css");
/* harmony import */ var _css_top_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_top_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_bottom_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/bottom.css */ "./src/css/bottom.css");
/* harmony import */ var _css_bottom_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_bottom_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _img_12cm_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/12cm.jpg */ "./src/img/12cm.jpg");
/* harmony import */ var _img_12cm_jpg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_img_12cm_jpg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _img_home_black_bg_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/home-black-bg.jpg */ "./src/img/home-black-bg.jpg");
/* harmony import */ var _img_home_black_bg_jpg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_img_home_black_bg_jpg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _img_earth_ignore_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./img/earth-ignore.png */ "./src/img/earth-ignore.png");
/* harmony import */ var _img_earth_ignore_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_img_earth_ignore_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _img_c3_ignore_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./img/c3-ignore.png */ "./src/img/c3-ignore.png");
/* harmony import */ var _img_c3_ignore_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_img_c3_ignore_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _img_home_bigtitle_ignore_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./img/home-bigtitle-ignore.png */ "./src/img/home-bigtitle-ignore.png");
/* harmony import */ var _img_home_bigtitle_ignore_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_img_home_bigtitle_ignore_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _svgdotjs_svg_js_src_svg_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @svgdotjs/svg.js/src/svg.js */ "./node_modules/@svgdotjs/svg.js/src/svg.js");









document.querySelector('#weixin-code>img').src=_img_12cm_jpg__WEBPACK_IMPORTED_MODULE_3___default.a;
document.querySelector('.home_view>img').src=_img_home_black_bg_jpg__WEBPACK_IMPORTED_MODULE_4___default.a;
document.querySelector('.imgA').src=_img_earth_ignore_png__WEBPACK_IMPORTED_MODULE_5___default.a;
document.querySelector('.imgB').src=_img_c3_ignore_png__WEBPACK_IMPORTED_MODULE_6___default.a;
document.querySelector('.imgC').src=_img_c3_ignore_png__WEBPACK_IMPORTED_MODULE_6___default.a;
document.querySelector('.imgD').src=_img_home_bigtitle_ignore_png__WEBPACK_IMPORTED_MODULE_7___default.a;
//鼠标悬停，使微信二维码显示出来
let oWeixinA=document.querySelector('.weixin-icon');
let oWeixinCode=document.querySelector('#weixin-code');
oWeixinA.onmouseover=function(){
  oWeixinCode.style.display="block"
}
oWeixinA.onmouseout=function(){
  oWeixinCode.style.display="none"
}
//导航条鼠标悬停事件
let oUl=document.querySelector('.menu-wrap>ul');
let oNavBlock=document.querySelector("#header-blue-block");
oUl.onmouseover=function(event){
  let text=event.target.textContent;
  switch(text){
    case '社会招聘':
        oNavBlock.style.left='123px';
        oNavBlock.style.width='64px';
        break;
    case '校园招聘':
        oNavBlock.style.left='221px';
        oNavBlock.style.width='64px';
        break;      
    case '实习生招聘':
        oNavBlock.style.left='319px';
        oNavBlock.style.width='80px';
        break;      
    case 'Global Talent':
        oNavBlock.style.left='433px';
        oNavBlock.style.width='102px';
        break;
    case '了解百度':
        oNavBlock.style.left='568.563px';
        oNavBlock.style.width='64px';
        break;
    default:
        break;
  }
}
oUl.onmouseout=function(){
  oNavBlock.style.left='57px';
  oNavBlock.style.width='32px';
}
//定义圆窗旋转 每秒钟逆时针旋转1度
let oImaB=document.querySelector('.imgB');
let oImaC=document.querySelector('.imgC');
let degB=0;
let degC=0;
setInterval(() => {
  oImaB.style.transform=`rotate(${degB}deg)`
  oImaC.style.transform=`rotate(${degC}deg)`
  degB-=0.2
  degC+=0.2
}, 100);
//SVG部分
let oSvg=document.querySelector("#mysvg");
let draw=new _svgdotjs_svg_js_src_svg_js__WEBPACK_IMPORTED_MODULE_8__["default"].Svg(oSvg).size('100%','100%');
let polygonLeft=draw.polygon('246.9,552.4 226.9,472.4 276.9,422.4 340.9,562.4 356.9,482.4').attr({
  fill:'rgba(255,255,255,0)',
  "fill-opacity": 0.5,
  stroke: '#fff',
  'stroke-width': 0
})
//一个完整的点 智能汽车
let ellipseA=draw.ellipse((246.9+6)*2,(559.4-16)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkA=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/%E6%99%BA%E8%83%BD%E6%B1%BD%E8%BD%A6%E4%BA%8B%E4%B8%9A%E9%83%A8").target('_self').text(function(add){
  add.tspan("智能汽车").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '246.9',
  y: '559.4',
  'font-size': '10',
})
//一个完整的点 自动驾驶
let ellipseB=draw.ellipse((226.9+50)*2,(479.4-3)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkB=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/%E8%87%AA%E5%8A%A8%E9%A9%BE%E9%A9%B6%E4%BA%8B%E4%B8%9A%E9%83%A8|%E8%87%AA%E5%8A%A8%E9%A9%BE%E9%A9%B6%E6%8A%80%E6%9C%AF%E9%83%A8").target('_self').text(function(add){
  add.tspan("自动驾驶").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '226.9',
  y: '479.4',
  'font-size': '10',
})
//一个完整的点 车联网
let ellipseC=draw.ellipse((276.9+40)*2,(434.4-8)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkC=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/车联网事业部").target('_self').text(function(add){
  add.tspan("车联网").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '276.9',
  y: '429.4',
  'font-size': '10',
})
//一个完整的点 智能驾驶 大字体
let ellipseD=draw.ellipse((420)*2,(489.4-5)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkD=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/IDG合作发展部|IDG综合管理部|IDG智能驾驶体验设计中心|车联网事业部|自动驾驶事业部|自动驾驶技术部|智能汽车事业部").target('_self').text(function(add){
  add.tspan("智能驾驶").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '356.9',
  y: '489.4',
  'font-size': '13',
})
//一个完整的点 智能驾驶 小字体
let ellipseE=draw.ellipse((335)*2,(569.4-3)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkE=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/IDG合作发展部|IDG综合管理部|IDG智能驾驶体验设计中心").target('_self').text(function(add){
  add.tspan("智能驾驶").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '340.9',
  y: '569.4',
  'font-size': '10',
})
//鼠标移到椭圆上的点触发，我们只需要知道椭圆的中心坐标即可
let small=draw.ellipse(0,0).radius(0,0).attr({
  fill:'rgba(255,255,255,0.4)',
  stroke: 'rgba(255,255,255,0.5)',
  opacity: 0
})
let big=draw.ellipse(0,0).radius(0,0).attr({
  fill:'rgba(255,255,255,0.4)',
  stroke: 'rgba(255,255,255,0.5)',
  opacity: 0
})
//鼠标移上来时进行划线操作
let lineA = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineB = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineC = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineD = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineE = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineF = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineG = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
//初始化直线操作
function initLineAll(){
  lineA.attr({
    x1:420,
    y1:484.4,
    x2:420,
    y2:484.4
  })
  lineB.attr({
    x1:420,
    y1:484.4,
    x2:420,
    y2:484.4
  })
  lineC.attr({
    x1:420,
    y1:484.4,
    x2:420,
    y2:484.4
  })
  lineD.attr({
    x1:420,
    y1:484.4,
    x2:420,
    y2:484.4
  })
  lineE.attr({
    x1:335,
    y1:566.4,
    x2:335,
    y2:566.4
  })
  lineF.attr({
    x1:252.9,
    y1:543.4,
    x2:252.9,
    y2:543.4
  })
  lineG.attr({
    x1:276.9,
    y1:476.4,
    x2:276.9,
    y2:476.4
  })
}
function circleChange(obj,small,big){
  obj.mouseover(function(event) {
    let cx=this.node.cx.baseVal.value;
    let cy=this.node.cy.baseVal.value;
    small.attr({
      cx:cx,
      cy:cy,
    })
    big.attr({
      cx:cx,
      cy:cy,
    })
    initLineAll();
    lineA.animate(1000).attr({
      x2:316.9,
      y2:426.4
    })
    lineB.animate(1000).attr({
      x2:276.9,
      y2:476.4
    })
    lineC.animate(1000).attr({
      x2:252.9,
      y2:543.4
    })
    lineD.animate(1000).attr({
      x2:335,
      y2:566.4
    })
    lineE.animate(1000).attr({
      x2:252.9,
      y2:543.4
    })
    lineF.animate(1000).attr({
      x2:276.9,
      y2:476.4
    })
    lineG.animate(1000).attr({
      x2:316.9,
      y2:426.4
    })
    small.animate(1000,'bounce').attr({
      rx:14,
      ry:14,
      opacity: 1,
    }).loop()
    big.animate(1000,'bounce').attr({
      rx:24,
      ry:24,
      opacity: 1,
    }).loop()
  })
  obj.mouseout(function(event) {
    small._timeline.stop();
    big._timeline.stop();
    lineA._timeline.stop();
    lineB._timeline.stop();
    lineC._timeline.stop();
    lineD._timeline.stop();
    lineE._timeline.stop();
    lineF._timeline.stop();
    lineG._timeline.stop();
    initLineAll();
  })
}
circleChange(ellipseA,small,big)
circleChange(ellipseB,small,big)
circleChange(ellipseC,small,big)
circleChange(ellipseD,small,big)
circleChange(ellipseE,small,big)

function linkAChange(obj){
  obj.mouseover(function(event) {
    initLineAll();
    lineA.animate(1000).attr({
      x2:316.9,
      y2:426.4
    })
    lineB.animate(1000).attr({
      x2:276.9,
      y2:476.4
    })
    lineC.animate(1000).attr({
      x2:252.9,
      y2:543.4
    })
    lineD.animate(1000).attr({
      x2:335,
      y2:566.4
    })
    lineE.animate(1000).attr({
      x2:252.9,
      y2:543.4
    })
    lineF.animate(1000).attr({
      x2:276.9,
      y2:476.4
    })
    lineG.animate(1000).attr({
      x2:316.9,
      y2:426.4
    })
  })
  obj.mouseout(function(event) {
    lineA._timeline.stop();
    lineB._timeline.stop();
    lineC._timeline.stop();
    lineD._timeline.stop();
    lineE._timeline.stop();
    lineF._timeline.stop();
    lineG._timeline.stop();
    initLineAll();
  })
}
linkAChange(linkA)
linkAChange(linkB)
linkAChange(linkC)
linkAChange(linkD)
linkAChange(linkE)

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2FuaW1hdGlvbi9BbmltYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvYW5pbWF0aW9uL0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2FuaW1hdGlvbi9Nb3JwaGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2FuaW1hdGlvbi9RdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvYW5pbWF0aW9uL1J1bm5lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvYW5pbWF0aW9uL1RpbWVsaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9BLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9DaXJjbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0NsaXBQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0RlZnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0RvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvRWxsaXBzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvRm9yZWlnbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvRy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvR3JhZGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL0ltYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9MaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9NYXJrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL01hc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1BhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1BhdHRlcm4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1BvbHlsaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9SZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9TaGFwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvU3RvcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvU3R5bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1N2Zy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9UZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9lbGVtZW50cy9UZXh0UGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvZWxlbWVudHMvVHNwYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL2VsZW1lbnRzL1VzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL2F0dHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS9jaXJjbGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL2dyYWRpZW50ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS9uYW1lc3BhY2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvcGFyc2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvcG9pbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL3BvbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvY29yZS9yZWdleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9tb2R1bGVzL2NvcmUvdGV4dGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvb3B0aW9uYWwvYXJyYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9vcHRpb25hbC9jbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9vcHRpb25hbC9jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvb3B0aW9uYWwvZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvbW9kdWxlcy9vcHRpb25hbC9tZW1vcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvb3B0aW9uYWwvc3VnYXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL21vZHVsZXMvb3B0aW9uYWwvdHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy9zdmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL0FycmF5UG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL0Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL0JveC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdHlwZXMvQ29sb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL0V2ZW50VGFyZ2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9MaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9NYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL1BhdGhBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvdHlwZXMvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL1BvaW50QXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3R5cGVzL1NWR0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy90eXBlcy9TVkdOdW1iZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3V0aWxzL2Fkb3B0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3V0aWxzL21ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bzdmdkb3Rqcy9zdmcuanMvc3JjL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3ZnZG90anMvc3ZnLmpzL3NyYy91dGlscy93aW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9ib3R0b20uY3NzIiwid2VicGFjazovLy8uL3NyYy9jc3MvdGVzdC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy90b3AuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3VybC1lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9ib3R0b20uY3NzPzg2MGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy90ZXN0LmNzcz9hZDhjIiwid2VicGFjazovLy8uL3NyYy9jc3MvdG9wLmNzcz8zYTVhIiwid2VicGFjazovLy8uL3NyYy9pbWcvMTJjbS5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9jMy1pZ25vcmUucG5nIiwid2VicGFjazovLy8uL3NyYy9pbWcvY3MtaGVhZC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9lYXJ0aC1pZ25vcmUucG5nIiwid2VicGFjazovLy8uL3NyYy9pbWcvaG9tZS1iaWd0aXRsZS1pZ25vcmUucG5nIiwid2VicGFjazovLy8uL3NyYy9pbWcvaG9tZS1ibGFjay1iZy5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9ob21lLWljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQTRDO0FBQ2Q7O0FBRTlCO0FBQ0E7QUFDQSxjQUFjLGlEQUFLO0FBQ25CLGdCQUFnQixpREFBSztBQUNyQixrQkFBa0IsaURBQUs7QUFDdkIsZUFBZSx3REFBTyx1QkFBdUIsd0RBQU87QUFDcEQ7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQyxVQUFVOztBQUUvQztBQUNBO0FBQ0EsMEJBQTBCLHdEQUFPO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QyxzQkFBc0I7O0FBRTdEO0FBQ0E7QUFDQSwwQkFBMEIsd0RBQU87QUFDakM7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsd0RBQU87QUFDakM7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsd0RBQU87QUFDZjtBQUNBO0FBQ0E7O0FBRWUsdUVBQVE7Ozs7Ozs7Ozs7Ozs7QUNwR3ZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzRDtBQUNWOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSw2QkFBNkIsa0VBQVE7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0VBQU07QUFDTjtBQUNBO0FBQ0EsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdFQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDOU9EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0M7QUFLTDtBQUNXO0FBQ1A7QUFDUTtBQUNGO0FBQ0U7O0FBRTlCO0FBQ2Y7QUFDQSxtQ0FBbUMsbURBQUk7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLDJEQUFTO0FBQzNCLE9BQU87QUFDUCxZQUFZLHVEQUFLO0FBQ2pCLG9CQUFvQix1REFBSztBQUN6QixTQUFTLFVBQVUsZ0VBQVM7QUFDNUIsb0JBQW9CLGtFQUFXO0FBQy9CLGNBQWMsMkRBQVM7QUFDdkIsY0FBYywwREFBUTtBQUN0QjtBQUNBLFNBQVMsVUFBVSxvRUFBYTtBQUNoQyxvQkFBb0IsMkRBQVM7QUFDN0IsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1Asa0JBQWtCLDBEQUFRO0FBQzFCLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsdURBQUs7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQLEVBQUUsZ0VBQU07QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDeFFBO0FBQUE7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTJEO0FBQ0w7QUFDRTtBQUNYO0FBQ2U7QUFDUDtBQUNGO0FBQ2Y7QUFDSDtBQUNnQjtBQUNWO0FBQ2lCO0FBQ25CO0FBQ1E7QUFDVDs7QUFFckIscUJBQXFCLDZEQUFXO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxrRUFBUTtBQUNoQjs7QUFFQTtBQUNBO0FBQ0EsWUFBWSx5REFBVTtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMseURBQVU7QUFDdkQsd0RBQXdELG1EQUFJOztBQUU1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIseURBQU07QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIscURBQVE7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQjs7QUFFL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCLDhEQUFJO0FBQ2pDLHVCQUF1Qiw4REFBSTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLHlEQUFNO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsbURBQUk7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0EsVUFBVSx3REFBTztBQUNqQjtBQUNBOztBQUVlLHVCQUF1Qiw2REFBVztBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNzQztBQUNGO0FBQ0Y7QUFDQztBQUNFO0FBQ0Q7QUFDSTs7QUFFaUI7QUFDUztBQUNsQztBQUNTO0FBQ0w7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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsZUFBZSxPQUFPLGlEQUFLOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLGlEQUFLO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxtQkFBbUI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLCtEQUFPOztBQUVmO0FBQ0E7O0FBRUEsU0FBUyxtQkFBbUI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLG1CQUFtQjs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLCtEQUFPO0FBQ2YsUUFBUSwrREFBTzs7QUFFZjtBQUNBOztBQUVBLFNBQVMsbUJBQW1COztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaURBQUs7QUFDMUI7QUFDQTtBQUNBLHVCQUF1QixpREFBSztBQUM1QjtBQUNBO0FBQ0Esd0JBQXdCLGlEQUFLO0FBQzdCO0FBQ0E7QUFDQSx1QkFBdUIsaURBQUs7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtFQUFROzs7Ozs7Ozs7Ozs7O0FDdGZSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPaUM7QUFDVztBQUNNO0FBQ3BCO0FBQ007QUFDVTs7QUFFOUMsa0JBQWtCLHVFQUFhLGNBQWMsb0RBQVE7O0FBRXRDLHdFQUFTOztBQUVqQjtBQUNQLHVCQUF1QiwyREFBSTtBQUMzQjs7QUFFQTtBQUNBLHdDQUF3QyxRQUFRO0FBQ2hEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxnRUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixRQUFRO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsaUNBQWlDLHlCQUF5QjtBQUMxRDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQSxpQkFBaUIsc0VBQWU7QUFDaEMsaUJBQWlCLGtFQUFXO0FBQzVCLGlCQUFpQiw2REFBTTtBQUN2QjtBQUNBLGVBQWUsZ0VBQVM7QUFDeEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixpREFBSztBQUNyQixpQkFBaUIsaURBQUs7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxtRUFBWTtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUksdUVBQU07QUFDVixXQUFXLCtEQUFNO0FBQ2pCO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2hWRDtBQUFBO0FBQUE7QUFBQTtBQUFnQzs7QUFFakI7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsa0RBQU07QUFDZixjQUFjLGtEQUFNO0FBQ3BCOztBQUVBLFNBQVMsT0FBTzs7QUFFaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0Q7QUFDUjtBQUNNO0FBQ2Q7O0FBRXBDLG1CQUFtQix1RUFBYSxlQUFlLG9EQUFROztBQUV4Qyx5RUFBVTs7QUFFekIsZ0VBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsUUFBUTtBQUN6RDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxRQUFRO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBLGlDQUFpQyxnRUFBUztBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLFlBQVk7QUFDWjtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4SUQ7QUFBQTtBQUFBO0FBQUE7QUFBb0Q7QUFDUjtBQUNNOztBQUVsRCxpQkFBaUIsdUVBQWE7QUFDOUI7QUFDQSxDQUFDOztBQUVjLHVFQUFROztBQUV2QixnRUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLGdFQUFTO0FBQ3ZDLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2pERDtBQUFBO0FBQUE7QUFBd0Q7O0FBRXhEO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHlCQUF5QixvRUFBYTs7QUFFdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5RkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFDTjtBQUNXO0FBQ047QUFDVDs7QUFFbkM7QUFDTzs7QUFFUDtBQUNPO0FBQ1A7QUFDQSxTQUFTLHdEQUFPLDBCQUEwQiw4REFBRTtBQUM1Qzs7QUFFTztBQUNQLHlCQUF5QixzREFBSTs7QUFFN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQix3REFBTztBQUMxQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1AseUJBQXlCLHdEQUFPO0FBQ2hDOztBQUVBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLHNEQUFJOztBQUVuQztBQUNBLGtCQUFrQiw0REFBVTs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBLEVBQUUsa0VBQWM7O0FBRWhCO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDTztBQUNQLG1CQUFtQiw0REFBVTtBQUM3Qjs7QUFFQTtBQUNPO0FBQ1A7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ087QUFDUDs7QUFFQTs7QUFFQSw4QkFBOEIsUUFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjs7QUFFdEI7QUFDQSx5QkFBeUI7O0FBRXpCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1EO0FBQ25EOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsc0JBQXNCOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7OztBQy9CQSwyQkFBMkIsbUJBQU8sQ0FBQyx3R0FBbUQ7QUFDdEY7QUFDQSxjQUFjLFFBQVMsV0FBVyxtQkFBbUIsbUJBQW1CLG9DQUFvQyx3QkFBd0IseUJBQXlCLHlCQUF5QixLQUFLLGVBQWUsNEJBQTRCLGdCQUFnQixpQkFBaUIsdUJBQXVCLHdCQUF3QixLQUFLLGtCQUFrQixrQkFBa0IsS0FBSyxvQkFBb0IsMEJBQTBCLHNCQUFzQixzQ0FBc0MsS0FBSzs7Ozs7Ozs7Ozs7OztBQ0ZuZCwyQkFBMkIsbUJBQU8sQ0FBQyx3R0FBbUQ7QUFDdEY7QUFDQSxjQUFjLFFBQVMsUUFBUSxtQkFBbUIsS0FBSyxTQUFTLGtCQUFrQixtQkFBbUIsdUNBQXVDLEtBQUssVUFBVSw0QkFBNEIsS0FBSyxNQUFNLGtCQUFrQiw0QkFBNEIsc0JBQXNCLEtBQUssVUFBVSxrQkFBa0IsS0FBSyxXQUFXLG1CQUFtQixLQUFLOzs7Ozs7Ozs7Ozs7O0FDRi9VLDJCQUEyQixtQkFBTyxDQUFDLHdHQUFtRDtBQUN0RjtBQUNBLGdCQUFnQixtQkFBTyxDQUFDLHNIQUEwRDtBQUNsRix5Q0FBeUMsbUJBQU8sQ0FBQyxxREFBc0I7QUFDdkUseUNBQXlDLG1CQUFPLENBQUMsbURBQXNCOztBQUV2RTtBQUNBLGNBQWMsUUFBUyxTQUFTLHlCQUF5Qix1QkFBdUIsbUJBQW1CLDJCQUEyQixnQ0FBZ0MsS0FBSyxrQkFBa0IseUJBQXlCLG9CQUFvQixtQkFBbUIseUJBQXlCLGdDQUFnQyxLQUFLLG9CQUFvQixzQ0FBc0MsS0FBSyxxQkFBcUIsNEJBQTRCLHFCQUFxQixrQkFBa0IsS0FBSyxxQkFBcUIseUJBQXlCLG1CQUFtQixtQkFBbUIsS0FBSyx3QkFBd0Isd0JBQXdCLGtCQUFrQixrQkFBa0IsS0FBSywyQkFBMkIsa0JBQWtCLEtBQUsseUNBQXlDLHlCQUF5QixnQkFBZ0IsaUJBQWlCLDRCQUE0QixrQkFBa0IsbUJBQW1CLGdDQUFnQyxLQUFLLDBCQUEwQix5QkFBeUIsNEJBQTRCLG1CQUFtQixzQkFBc0IsS0FBSyxnQ0FBZ0Msb0NBQW9DLEtBQUssdUJBQXVCLDRCQUE0Qix5QkFBeUIsZ0JBQWdCLHVCQUF1QixnQ0FBZ0Msa0JBQWtCLGdCQUFnQixrQkFBa0IsMkNBQTJDLEtBQUssMEJBQTBCLDRCQUE0QixLQUFLLHNCQUFzQix5QkFBeUIsK0JBQStCLEtBQUssa0JBQWtCLDRCQUE0QixrQkFBa0IsbUJBQW1CLHFFQUFxRSw2QkFBNkIsT0FBTyx1QkFBdUIsaUNBQWlDLEtBQUssc0JBQXNCLG9CQUFvQixLQUFLLGlCQUFpQiw0QkFBNEIsa0JBQWtCLG1CQUFtQixxRUFBcUUsNkJBQTZCLE9BQU8sc0JBQXNCLGlDQUFpQyxLQUFLLGtCQUFrQix5QkFBeUIsZ0JBQWdCLGVBQWUsNkJBQTZCLEtBQUsscUJBQXFCLDRCQUE0QixtQkFBbUIsbUJBQW1CLHdEQUF3RCxLQUFLLHFCQUFxQiwwQkFBMEIsbUJBQW1CLEtBQUssZ0JBQWdCLDRCQUE0Qiw2QkFBNkIsc0JBQXNCLHdCQUF3QiwwQkFBMEIsc0JBQXNCLEtBQUssVUFBVSxvQkFBb0Isc0JBQXNCLHdCQUF3QixzQ0FBc0MsS0FBSyxxQkFBcUIsa0JBQWtCLEtBQUssZ0JBQWdCLHVCQUF1QixLQUFLLGtDQUFrQyw0QkFBNEIsc0JBQXNCLHNCQUFzQixpQkFBaUIsZUFBZSxvQkFBb0Isa0JBQWtCLG9CQUFvQixnQ0FBZ0MsaUNBQWlDLEtBQUssd0NBQXdDLDhEQUE4RCxrQkFBa0IsbUJBQW1CLHFCQUFxQixxQkFBcUIsdUJBQXVCLEtBQUssd0NBQXdDLHNCQUFzQix3QkFBd0Isa0JBQWtCLGtCQUFrQix3QkFBd0IsdUJBQXVCLEtBQUssNkJBQTZCLHlCQUF5QixvQkFBb0IsYUFBYSx1QkFBdUIsbUJBQW1CLGtCQUFrQixLQUFLLGtCQUFrQix1QkFBdUIsd0JBQXdCLDZCQUE2Qiw2QkFBNkIsS0FBSyxrQkFBa0IsdUJBQXVCLHdCQUF3Qiw4QkFBOEIsNkJBQTZCLEtBQUssa0JBQWtCLHNCQUFzQix1QkFBdUIsOEJBQThCLDZCQUE2QixLQUFLLGtCQUFrQix1QkFBdUIsbUJBQW1CLDhCQUE4Qiw2QkFBNkIsS0FBSyxvQkFBb0IseUJBQXlCLGVBQWUsZ0JBQWdCLEtBQUssMkJBQTJCLHlCQUF5QixlQUFlLGdCQUFnQixLQUFLOzs7Ozs7Ozs7Ozs7OztBQ1BqbUk7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsZ0JBQWdCO0FBQ3ZELE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxvQkFBb0I7QUFDbkMsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxjQUFjO0FBQ25FO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxtQkFBTyxDQUFDLHVEQUFROztBQUU5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0EsbUJBQW1CLDJCQUEyQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTs7QUFFQSxRQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQSxLQUFLLEtBQXdDLEVBQUUsRUFFN0M7O0FBRUYsUUFBUSxzQkFBaUI7QUFDekI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkZBLGNBQWMsbUJBQU8sQ0FBQywySEFBMEQ7O0FBRWhGLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxzR0FBbUQ7O0FBRXhFOztBQUVBLEdBQUcsS0FBVSxFQUFFLEU7Ozs7Ozs7Ozs7OztBQ2xCZixjQUFjLG1CQUFPLENBQUMsdUhBQXdEOztBQUU5RSw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsc0dBQW1EOztBQUV4RTs7QUFFQSxHQUFHLEtBQVUsRUFBRSxFOzs7Ozs7Ozs7Ozs7QUNsQmYsY0FBYyxtQkFBTyxDQUFDLHFIQUF1RDs7QUFFN0UsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNHQUFtRDs7QUFFeEU7O0FBRUEsR0FBRyxLQUFVLEVBQUUsRTs7Ozs7Ozs7Ozs7QUNuQmYsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7O0FDQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF3QjtBQUNEO0FBQ0U7QUFDZTtBQUNVO0FBQ0Q7QUFDTjtBQUNxQjtBQUNwQjtBQUM1QywrQ0FBK0Msb0RBQVU7QUFDekQsNkNBQTZDLDZEQUFXO0FBQ3hELG9DQUFvQyw0REFBVztBQUMvQyxvQ0FBb0MseURBQVE7QUFDNUMsb0NBQW9DLHlEQUFRO0FBQzVDLG9DQUFvQyxvRUFBa0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLEtBQUs7QUFDdkMsa0NBQWtDLEtBQUs7QUFDdkM7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsYUFBYSxtRUFBRztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4uanNcIik7XG4iLCJpbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xyXG5pbXBvcnQgUXVldWUgZnJvbSAnLi9RdWV1ZS5qcydcclxuXHJcbmNvbnN0IEFuaW1hdG9yID0ge1xyXG4gIG5leHREcmF3OiBudWxsLFxyXG4gIGZyYW1lczogbmV3IFF1ZXVlKCksXHJcbiAgdGltZW91dHM6IG5ldyBRdWV1ZSgpLFxyXG4gIGltbWVkaWF0ZXM6IG5ldyBRdWV1ZSgpLFxyXG4gIHRpbWVyOiAoKSA9PiBnbG9iYWxzLndpbmRvdy5wZXJmb3JtYW5jZSB8fCBnbG9iYWxzLndpbmRvdy5EYXRlLFxyXG4gIHRyYW5zZm9ybXM6IFtdLFxyXG5cclxuICBmcmFtZSAoZm4pIHtcclxuICAgIC8vIFN0b3JlIHRoZSBub2RlXHJcbiAgICB2YXIgbm9kZSA9IEFuaW1hdG9yLmZyYW1lcy5wdXNoKHsgcnVuOiBmbiB9KVxyXG5cclxuICAgIC8vIFJlcXVlc3QgYW4gYW5pbWF0aW9uIGZyYW1lIGlmIHdlIGRvbid0IGhhdmUgb25lXHJcbiAgICBpZiAoQW5pbWF0b3IubmV4dERyYXcgPT09IG51bGwpIHtcclxuICAgICAgQW5pbWF0b3IubmV4dERyYXcgPSBnbG9iYWxzLndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoQW5pbWF0b3IuX2RyYXcpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIHRoZSBub2RlIHNvIHdlIGNhbiByZW1vdmUgaXQgZWFzaWx5XHJcbiAgICByZXR1cm4gbm9kZVxyXG4gIH0sXHJcblxyXG4gIHRpbWVvdXQgKGZuLCBkZWxheSkge1xyXG4gICAgZGVsYXkgPSBkZWxheSB8fCAwXHJcblxyXG4gICAgLy8gV29yayBvdXQgd2hlbiB0aGUgZXZlbnQgc2hvdWxkIGZpcmVcclxuICAgIHZhciB0aW1lID0gQW5pbWF0b3IudGltZXIoKS5ub3coKSArIGRlbGF5XHJcblxyXG4gICAgLy8gQWRkIHRoZSB0aW1lb3V0IHRvIHRoZSBlbmQgb2YgdGhlIHF1ZXVlXHJcbiAgICB2YXIgbm9kZSA9IEFuaW1hdG9yLnRpbWVvdXRzLnB1c2goeyBydW46IGZuLCB0aW1lOiB0aW1lIH0pXHJcblxyXG4gICAgLy8gUmVxdWVzdCBhbm90aGVyIGFuaW1hdGlvbiBmcmFtZSBpZiB3ZSBuZWVkIG9uZVxyXG4gICAgaWYgKEFuaW1hdG9yLm5leHREcmF3ID09PSBudWxsKSB7XHJcbiAgICAgIEFuaW1hdG9yLm5leHREcmF3ID0gZ2xvYmFscy53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKEFuaW1hdG9yLl9kcmF3KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBub2RlXHJcbiAgfSxcclxuXHJcbiAgaW1tZWRpYXRlIChmbikge1xyXG4gICAgLy8gQWRkIHRoZSBpbW1lZGlhdGUgZm4gdG8gdGhlIGVuZCBvZiB0aGUgcXVldWVcclxuICAgIHZhciBub2RlID0gQW5pbWF0b3IuaW1tZWRpYXRlcy5wdXNoKGZuKVxyXG4gICAgLy8gUmVxdWVzdCBhbm90aGVyIGFuaW1hdGlvbiBmcmFtZSBpZiB3ZSBuZWVkIG9uZVxyXG4gICAgaWYgKEFuaW1hdG9yLm5leHREcmF3ID09PSBudWxsKSB7XHJcbiAgICAgIEFuaW1hdG9yLm5leHREcmF3ID0gZ2xvYmFscy53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKEFuaW1hdG9yLl9kcmF3KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBub2RlXHJcbiAgfSxcclxuXHJcbiAgY2FuY2VsRnJhbWUgKG5vZGUpIHtcclxuICAgIG5vZGUgIT0gbnVsbCAmJiBBbmltYXRvci5mcmFtZXMucmVtb3ZlKG5vZGUpXHJcbiAgfSxcclxuXHJcbiAgY2xlYXJUaW1lb3V0IChub2RlKSB7XHJcbiAgICBub2RlICE9IG51bGwgJiYgQW5pbWF0b3IudGltZW91dHMucmVtb3ZlKG5vZGUpXHJcbiAgfSxcclxuXHJcbiAgY2FuY2VsSW1tZWRpYXRlIChub2RlKSB7XHJcbiAgICBub2RlICE9IG51bGwgJiYgQW5pbWF0b3IuaW1tZWRpYXRlcy5yZW1vdmUobm9kZSlcclxuICB9LFxyXG5cclxuICBfZHJhdyAobm93KSB7XHJcbiAgICAvLyBSdW4gYWxsIHRoZSB0aW1lb3V0cyB3ZSBjYW4gcnVuLCBpZiB0aGV5IGFyZSBub3QgcmVhZHkgeWV0LCBhZGQgdGhlbVxyXG4gICAgLy8gdG8gdGhlIGVuZCBvZiB0aGUgcXVldWUgaW1tZWRpYXRlbHkhIChiYWQgdGltZW91dHMhISEgW3NhcmNhc21dKVxyXG4gICAgdmFyIG5leHRUaW1lb3V0ID0gbnVsbFxyXG4gICAgdmFyIGxhc3RUaW1lb3V0ID0gQW5pbWF0b3IudGltZW91dHMubGFzdCgpXHJcbiAgICB3aGlsZSAoKG5leHRUaW1lb3V0ID0gQW5pbWF0b3IudGltZW91dHMuc2hpZnQoKSkpIHtcclxuICAgICAgLy8gUnVuIHRoZSB0aW1lb3V0IGlmIGl0cyB0aW1lLCBvciBwdXNoIGl0IHRvIHRoZSBlbmRcclxuICAgICAgaWYgKG5vdyA+PSBuZXh0VGltZW91dC50aW1lKSB7XHJcbiAgICAgICAgbmV4dFRpbWVvdXQucnVuKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBBbmltYXRvci50aW1lb3V0cy5wdXNoKG5leHRUaW1lb3V0KVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiB3ZSBoaXQgdGhlIGxhc3QgaXRlbSwgd2Ugc2hvdWxkIHN0b3Agc2hpZnRpbmcgb3V0IG1vcmUgaXRlbXNcclxuICAgICAgaWYgKG5leHRUaW1lb3V0ID09PSBsYXN0VGltZW91dCkgYnJlYWtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSdW4gYWxsIG9mIHRoZSBhbmltYXRpb24gZnJhbWVzXHJcbiAgICB2YXIgbmV4dEZyYW1lID0gbnVsbFxyXG4gICAgdmFyIGxhc3RGcmFtZSA9IEFuaW1hdG9yLmZyYW1lcy5sYXN0KClcclxuICAgIHdoaWxlICgobmV4dEZyYW1lICE9PSBsYXN0RnJhbWUpICYmIChuZXh0RnJhbWUgPSBBbmltYXRvci5mcmFtZXMuc2hpZnQoKSkpIHtcclxuICAgICAgbmV4dEZyYW1lLnJ1bihub3cpXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG5leHRJbW1lZGlhdGUgPSBudWxsXHJcbiAgICB3aGlsZSAoKG5leHRJbW1lZGlhdGUgPSBBbmltYXRvci5pbW1lZGlhdGVzLnNoaWZ0KCkpKSB7XHJcbiAgICAgIG5leHRJbW1lZGlhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHdlIGhhdmUgcmVtYWluaW5nIHRpbWVvdXRzIG9yIGZyYW1lcywgZHJhdyB1bnRpbCB3ZSBkb24ndCBhbnltb3JlXHJcbiAgICBBbmltYXRvci5uZXh0RHJhdyA9IEFuaW1hdG9yLnRpbWVvdXRzLmZpcnN0KCkgfHwgQW5pbWF0b3IuZnJhbWVzLmZpcnN0KClcclxuICAgICAgPyBnbG9iYWxzLndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoQW5pbWF0b3IuX2RyYXcpXHJcbiAgICAgIDogbnVsbFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5pbWF0b3JcclxuIiwiaW1wb3J0IHsgdGltZWxpbmUgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvZGVmYXVsdHMuanMnXHJcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXHJcblxyXG4vKioqXHJcbkJhc2UgQ2xhc3NcclxuPT09PT09PT09PVxyXG5UaGUgYmFzZSBzdGVwcGVyIGNsYXNzIHRoYXQgd2lsbCBiZVxyXG4qKiovXHJcblxyXG5mdW5jdGlvbiBtYWtlU2V0dGVyR2V0dGVyIChrLCBmKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICBpZiAodiA9PSBudWxsKSByZXR1cm4gdGhpc1t2XVxyXG4gICAgdGhpc1trXSA9IHZcclxuICAgIGlmIChmKSBmLmNhbGwodGhpcylcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGVhc2luZyA9IHtcclxuICAnLSc6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgIHJldHVybiBwb3NcclxuICB9LFxyXG4gICc8Pic6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgIHJldHVybiAtTWF0aC5jb3MocG9zICogTWF0aC5QSSkgLyAyICsgMC41XHJcbiAgfSxcclxuICAnPic6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgIHJldHVybiBNYXRoLnNpbihwb3MgKiBNYXRoLlBJIC8gMilcclxuICB9LFxyXG4gICc8JzogZnVuY3Rpb24gKHBvcykge1xyXG4gICAgcmV0dXJuIC1NYXRoLmNvcyhwb3MgKiBNYXRoLlBJIC8gMikgKyAxXHJcbiAgfSxcclxuICBiZXppZXI6IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgLy8gc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9jc3MtZWFzaW5nLTEvI2N1YmljLWJlemllci1hbGdvXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgaWYgKHQgPCAwKSB7XHJcbiAgICAgICAgaWYgKHgxID4gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHkxIC8geDEgKiB0XHJcbiAgICAgICAgfSBlbHNlIGlmICh4MiA+IDApIHtcclxuICAgICAgICAgIHJldHVybiB5MiAvIHgyICogdFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gMFxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0ID4gMSkge1xyXG4gICAgICAgIGlmICh4MiA8IDEpIHtcclxuICAgICAgICAgIHJldHVybiAoMSAtIHkyKSAvICgxIC0geDIpICogdCArICh5MiAtIHgyKSAvICgxIC0geDIpXHJcbiAgICAgICAgfSBlbHNlIGlmICh4MSA8IDEpIHtcclxuICAgICAgICAgIHJldHVybiAoMSAtIHkxKSAvICgxIC0geDEpICogdCArICh5MSAtIHgxKSAvICgxIC0geDEpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAzICogdCAqICgxIC0gdCkgKiogMiAqIHkxICsgMyAqIHQgKiogMiAqICgxIC0gdCkgKiB5MiArIHQgKiogM1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL2Nzcy1lYXNpbmctMS8jc3RlcC10aW1pbmctZnVuY3Rpb24tYWxnb1xyXG4gIHN0ZXBzOiBmdW5jdGlvbiAoc3RlcHMsIHN0ZXBQb3NpdGlvbiA9ICdlbmQnKSB7XHJcbiAgICAvLyBkZWFsIHdpdGggXCJqdW1wLVwiIHByZWZpeFxyXG4gICAgc3RlcFBvc2l0aW9uID0gc3RlcFBvc2l0aW9uLnNwbGl0KCctJykucmV2ZXJzZSgpWzBdXHJcblxyXG4gICAgbGV0IGp1bXBzID0gc3RlcHNcclxuICAgIGlmIChzdGVwUG9zaXRpb24gPT09ICdub25lJykge1xyXG4gICAgICAtLWp1bXBzXHJcbiAgICB9IGVsc2UgaWYgKHN0ZXBQb3NpdGlvbiA9PT0gJ2JvdGgnKSB7XHJcbiAgICAgICsranVtcHNcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGUgYmVmb3JlRmxhZyBpcyBlc3NlbnRpYWxseSB1c2VsZXNzXHJcbiAgICByZXR1cm4gKHQsIGJlZm9yZUZsYWcgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAvLyBTdGVwIGlzIGNhbGxlZCBjdXJyZW50U3RlcCBpbiByZWZlcmVuY2VkIHVybFxyXG4gICAgICBsZXQgc3RlcCA9IE1hdGguZmxvb3IodCAqIHN0ZXBzKVxyXG4gICAgICBjb25zdCBqdW1waW5nID0gKHQgKiBzdGVwKSAlIDEgPT09IDBcclxuXHJcbiAgICAgIGlmIChzdGVwUG9zaXRpb24gPT09ICdzdGFydCcgfHwgc3RlcFBvc2l0aW9uID09PSAnYm90aCcpIHtcclxuICAgICAgICArK3N0ZXBcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGJlZm9yZUZsYWcgJiYganVtcGluZykge1xyXG4gICAgICAgIC0tc3RlcFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodCA+PSAwICYmIHN0ZXAgPCAwKSB7XHJcbiAgICAgICAgc3RlcCA9IDBcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHQgPD0gMSAmJiBzdGVwID4ganVtcHMpIHtcclxuICAgICAgICBzdGVwID0ganVtcHNcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHN0ZXAgLyBqdW1wc1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXBwZXIge1xyXG4gIGRvbmUgKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcblxyXG4vKioqXHJcbkVhc2luZyBGdW5jdGlvbnNcclxuPT09PT09PT09PT09PT09PVxyXG4qKiovXHJcblxyXG5leHBvcnQgY2xhc3MgRWFzZSBleHRlbmRzIFN0ZXBwZXIge1xyXG4gIGNvbnN0cnVjdG9yIChmbikge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5lYXNlID0gZWFzaW5nW2ZuIHx8IHRpbWVsaW5lLmVhc2VdIHx8IGZuXHJcbiAgfVxyXG5cclxuICBzdGVwIChmcm9tLCB0bywgcG9zKSB7XHJcbiAgICBpZiAodHlwZW9mIGZyb20gIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiBwb3MgPCAxID8gZnJvbSA6IHRvXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogdGhpcy5lYXNlKHBvcylcclxuICB9XHJcbn1cclxuXHJcbi8qKipcclxuQ29udHJvbGxlciBUeXBlc1xyXG49PT09PT09PT09PT09PT09XHJcbioqKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgU3RlcHBlciB7XHJcbiAgY29uc3RydWN0b3IgKGZuKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnN0ZXBwZXIgPSBmblxyXG4gIH1cclxuXHJcbiAgc3RlcCAoY3VycmVudCwgdGFyZ2V0LCBkdCwgYykge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RlcHBlcihjdXJyZW50LCB0YXJnZXQsIGR0LCBjKVxyXG4gIH1cclxuXHJcbiAgZG9uZSAoYykge1xyXG4gICAgcmV0dXJuIGMuZG9uZVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVjYWxjdWxhdGUgKCkge1xyXG4gIC8vIEFwcGx5IHRoZSBkZWZhdWx0IHBhcmFtZXRlcnNcclxuICB2YXIgZHVyYXRpb24gPSAodGhpcy5fZHVyYXRpb24gfHwgNTAwKSAvIDEwMDBcclxuICB2YXIgb3ZlcnNob290ID0gdGhpcy5fb3ZlcnNob290IHx8IDBcclxuXHJcbiAgLy8gQ2FsY3VsYXRlIHRoZSBQSUQgbmF0dXJhbCByZXNwb25zZVxyXG4gIHZhciBlcHMgPSAxZS0xMFxyXG4gIHZhciBwaSA9IE1hdGguUElcclxuICB2YXIgb3MgPSBNYXRoLmxvZyhvdmVyc2hvb3QgLyAxMDAgKyBlcHMpXHJcbiAgdmFyIHpldGEgPSAtb3MgLyBNYXRoLnNxcnQocGkgKiBwaSArIG9zICogb3MpXHJcbiAgdmFyIHduID0gMy45IC8gKHpldGEgKiBkdXJhdGlvbilcclxuXHJcbiAgLy8gQ2FsY3VsYXRlIHRoZSBTcHJpbmcgdmFsdWVzXHJcbiAgdGhpcy5kID0gMiAqIHpldGEgKiB3blxyXG4gIHRoaXMuayA9IHduICogd25cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyBleHRlbmRzIENvbnRyb2xsZXIge1xyXG4gIGNvbnN0cnVjdG9yIChkdXJhdGlvbiwgb3ZlcnNob290KSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmR1cmF0aW9uKGR1cmF0aW9uIHx8IDUwMClcclxuICAgICAgLm92ZXJzaG9vdChvdmVyc2hvb3QgfHwgMClcclxuICB9XHJcblxyXG4gIHN0ZXAgKGN1cnJlbnQsIHRhcmdldCwgZHQsIGMpIHtcclxuICAgIGlmICh0eXBlb2YgY3VycmVudCA9PT0gJ3N0cmluZycpIHJldHVybiBjdXJyZW50XHJcbiAgICBjLmRvbmUgPSBkdCA9PT0gSW5maW5pdHlcclxuICAgIGlmIChkdCA9PT0gSW5maW5pdHkpIHJldHVybiB0YXJnZXRcclxuICAgIGlmIChkdCA9PT0gMCkgcmV0dXJuIGN1cnJlbnRcclxuXHJcbiAgICBpZiAoZHQgPiAxMDApIGR0ID0gMTZcclxuXHJcbiAgICBkdCAvPSAxMDAwXHJcblxyXG4gICAgLy8gR2V0IHRoZSBwcmV2aW91cyB2ZWxvY2l0eVxyXG4gICAgdmFyIHZlbG9jaXR5ID0gYy52ZWxvY2l0eSB8fCAwXHJcblxyXG4gICAgLy8gQXBwbHkgdGhlIGNvbnRyb2wgdG8gZ2V0IHRoZSBuZXcgcG9zaXRpb24gYW5kIHN0b3JlIGl0XHJcbiAgICB2YXIgYWNjZWxlcmF0aW9uID0gLXRoaXMuZCAqIHZlbG9jaXR5IC0gdGhpcy5rICogKGN1cnJlbnQgLSB0YXJnZXQpXHJcbiAgICB2YXIgbmV3UG9zaXRpb24gPSBjdXJyZW50XHJcbiAgICAgICsgdmVsb2NpdHkgKiBkdFxyXG4gICAgICArIGFjY2VsZXJhdGlvbiAqIGR0ICogZHQgLyAyXHJcblxyXG4gICAgLy8gU3RvcmUgdGhlIHZlbG9jaXR5XHJcbiAgICBjLnZlbG9jaXR5ID0gdmVsb2NpdHkgKyBhY2NlbGVyYXRpb24gKiBkdFxyXG5cclxuICAgIC8vIEZpZ3VyZSBvdXQgaWYgd2UgaGF2ZSBjb252ZXJnZWQsIGFuZCBpZiBzbywgcGFzcyB0aGUgdmFsdWVcclxuICAgIGMuZG9uZSA9IE1hdGguYWJzKHRhcmdldCAtIG5ld1Bvc2l0aW9uKSArIE1hdGguYWJzKHZlbG9jaXR5KSA8IDAuMDAyXHJcbiAgICByZXR1cm4gYy5kb25lID8gdGFyZ2V0IDogbmV3UG9zaXRpb25cclxuICB9XHJcbn1cclxuXHJcbmV4dGVuZChTcHJpbmcsIHtcclxuICBkdXJhdGlvbjogbWFrZVNldHRlckdldHRlcignX2R1cmF0aW9uJywgcmVjYWxjdWxhdGUpLFxyXG4gIG92ZXJzaG9vdDogbWFrZVNldHRlckdldHRlcignX292ZXJzaG9vdCcsIHJlY2FsY3VsYXRlKVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFBJRCBleHRlbmRzIENvbnRyb2xsZXIge1xyXG4gIGNvbnN0cnVjdG9yIChwLCBpLCBkLCB3aW5kdXApIHtcclxuICAgIHN1cGVyKClcclxuXHJcbiAgICBwID0gcCA9PSBudWxsID8gMC4xIDogcFxyXG4gICAgaSA9IGkgPT0gbnVsbCA/IDAuMDEgOiBpXHJcbiAgICBkID0gZCA9PSBudWxsID8gMCA6IGRcclxuICAgIHdpbmR1cCA9IHdpbmR1cCA9PSBudWxsID8gMTAwMCA6IHdpbmR1cFxyXG4gICAgdGhpcy5wKHApLmkoaSkuZChkKS53aW5kdXAod2luZHVwKVxyXG4gIH1cclxuXHJcbiAgc3RlcCAoY3VycmVudCwgdGFyZ2V0LCBkdCwgYykge1xyXG4gICAgaWYgKHR5cGVvZiBjdXJyZW50ID09PSAnc3RyaW5nJykgcmV0dXJuIGN1cnJlbnRcclxuICAgIGMuZG9uZSA9IGR0ID09PSBJbmZpbml0eVxyXG5cclxuICAgIGlmIChkdCA9PT0gSW5maW5pdHkpIHJldHVybiB0YXJnZXRcclxuICAgIGlmIChkdCA9PT0gMCkgcmV0dXJuIGN1cnJlbnRcclxuXHJcbiAgICB2YXIgcCA9IHRhcmdldCAtIGN1cnJlbnRcclxuICAgIHZhciBpID0gKGMuaW50ZWdyYWwgfHwgMCkgKyBwICogZHRcclxuICAgIHZhciBkID0gKHAgLSAoYy5lcnJvciB8fCAwKSkgLyBkdFxyXG4gICAgdmFyIHdpbmR1cCA9IHRoaXMud2luZHVwXHJcblxyXG4gICAgLy8gYW50aXdpbmR1cFxyXG4gICAgaWYgKHdpbmR1cCAhPT0gZmFsc2UpIHtcclxuICAgICAgaSA9IE1hdGgubWF4KC13aW5kdXAsIE1hdGgubWluKGksIHdpbmR1cCkpXHJcbiAgICB9XHJcblxyXG4gICAgYy5lcnJvciA9IHBcclxuICAgIGMuaW50ZWdyYWwgPSBpXHJcblxyXG4gICAgYy5kb25lID0gTWF0aC5hYnMocCkgPCAwLjAwMVxyXG5cclxuICAgIHJldHVybiBjLmRvbmUgPyB0YXJnZXQgOiBjdXJyZW50ICsgKHRoaXMuUCAqIHAgKyB0aGlzLkkgKiBpICsgdGhpcy5EICogZClcclxuICB9XHJcbn1cclxuXHJcbmV4dGVuZChQSUQsIHtcclxuICB3aW5kdXA6IG1ha2VTZXR0ZXJHZXR0ZXIoJ3dpbmR1cCcpLFxyXG4gIHA6IG1ha2VTZXR0ZXJHZXR0ZXIoJ1AnKSxcclxuICBpOiBtYWtlU2V0dGVyR2V0dGVyKCdJJyksXHJcbiAgZDogbWFrZVNldHRlckdldHRlcignRCcpXHJcbn0pXHJcbiIsImltcG9ydCB7IEVhc2UgfSBmcm9tICcuL0NvbnRyb2xsZXIuanMnXHJcbmltcG9ydCB7XHJcbiAgZGVsaW1pdGVyLFxyXG4gIG51bWJlckFuZFVuaXQsXHJcbiAgcGF0aExldHRlcnNcclxufSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXHJcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXHJcbmltcG9ydCBDb2xvciBmcm9tICcuLi90eXBlcy9Db2xvci5qcydcclxuaW1wb3J0IFBhdGhBcnJheSBmcm9tICcuLi90eXBlcy9QYXRoQXJyYXkuanMnXHJcbmltcG9ydCBTVkdBcnJheSBmcm9tICcuLi90eXBlcy9TVkdBcnJheS5qcydcclxuaW1wb3J0IFNWR051bWJlciBmcm9tICcuLi90eXBlcy9TVkdOdW1iZXIuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3JwaGFibGUge1xyXG4gIGNvbnN0cnVjdG9yIChzdGVwcGVyKSB7XHJcbiAgICB0aGlzLl9zdGVwcGVyID0gc3RlcHBlciB8fCBuZXcgRWFzZSgnLScpXHJcblxyXG4gICAgdGhpcy5fZnJvbSA9IG51bGxcclxuICAgIHRoaXMuX3RvID0gbnVsbFxyXG4gICAgdGhpcy5fdHlwZSA9IG51bGxcclxuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsXHJcbiAgICB0aGlzLl9tb3JwaE9iaiA9IG51bGxcclxuICB9XHJcblxyXG4gIGZyb20gKHZhbCkge1xyXG4gICAgaWYgKHZhbCA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9mcm9tXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZnJvbSA9IHRoaXMuX3NldCh2YWwpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgdG8gKHZhbCkge1xyXG4gICAgaWYgKHZhbCA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl90b1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3RvID0gdGhpcy5fc2V0KHZhbClcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICB0eXBlICh0eXBlKSB7XHJcbiAgICAvLyBnZXR0ZXJcclxuICAgIGlmICh0eXBlID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3R5cGVcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXR0ZXJcclxuICAgIHRoaXMuX3R5cGUgPSB0eXBlXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgX3NldCAodmFsdWUpIHtcclxuICAgIGlmICghdGhpcy5fdHlwZSkge1xyXG4gICAgICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZVxyXG5cclxuICAgICAgaWYgKHR5cGUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgdGhpcy50eXBlKFNWR051bWJlcilcclxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmIChDb2xvci5pc0NvbG9yKHZhbHVlKSkge1xyXG4gICAgICAgICAgdGhpcy50eXBlKENvbG9yKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVsaW1pdGVyLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgICB0aGlzLnR5cGUocGF0aExldHRlcnMudGVzdCh2YWx1ZSlcclxuICAgICAgICAgICAgPyBQYXRoQXJyYXlcclxuICAgICAgICAgICAgOiBTVkdBcnJheVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtYmVyQW5kVW5pdC50ZXN0KHZhbHVlKSkge1xyXG4gICAgICAgICAgdGhpcy50eXBlKFNWR051bWJlcilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy50eXBlKE5vbk1vcnBoYWJsZSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAobW9ycGhhYmxlVHlwZXMuaW5kZXhPZih2YWx1ZS5jb25zdHJ1Y3RvcikgPiAtMSkge1xyXG4gICAgICAgIHRoaXMudHlwZSh2YWx1ZS5jb25zdHJ1Y3RvcilcclxuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgIHRoaXMudHlwZShTVkdBcnJheSlcclxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHRoaXMudHlwZShPYmplY3RCYWcpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50eXBlKE5vbk1vcnBoYWJsZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXN1bHQgPSAobmV3IHRoaXMuX3R5cGUodmFsdWUpKVxyXG4gICAgaWYgKHRoaXMuX3R5cGUgPT09IENvbG9yKSB7XHJcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3RvID8gcmVzdWx0W3RoaXMuX3RvWzRdXSgpXHJcbiAgICAgICAgOiB0aGlzLl9mcm9tID8gcmVzdWx0W3RoaXMuX2Zyb21bNF1dKClcclxuICAgICAgICA6IHJlc3VsdFxyXG4gICAgfVxyXG4gICAgcmVzdWx0ID0gcmVzdWx0LnRvQXJyYXkoKVxyXG5cclxuICAgIHRoaXMuX21vcnBoT2JqID0gdGhpcy5fbW9ycGhPYmogfHwgbmV3IHRoaXMuX3R5cGUoKVxyXG4gICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NvbnRleHRcclxuICAgICAgfHwgQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkocmVzdWx0Lmxlbmd0aCkpXHJcbiAgICAgICAgLm1hcChPYmplY3QpXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAobykge1xyXG4gICAgICAgICAgby5kb25lID0gdHJ1ZVxyXG4gICAgICAgICAgcmV0dXJuIG9cclxuICAgICAgICB9KVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH1cclxuXHJcbiAgc3RlcHBlciAoc3RlcHBlcikge1xyXG4gICAgaWYgKHN0ZXBwZXIgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX3N0ZXBwZXJcclxuICAgIHRoaXMuX3N0ZXBwZXIgPSBzdGVwcGVyXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgZG9uZSAoKSB7XHJcbiAgICB2YXIgY29tcGxldGUgPSB0aGlzLl9jb250ZXh0XHJcbiAgICAgIC5tYXAodGhpcy5fc3RlcHBlci5kb25lKVxyXG4gICAgICAucmVkdWNlKGZ1bmN0aW9uIChsYXN0LCBjdXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGxhc3QgJiYgY3VyclxyXG4gICAgICB9LCB0cnVlKVxyXG4gICAgcmV0dXJuIGNvbXBsZXRlXHJcbiAgfVxyXG5cclxuICBhdCAocG9zKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzXHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX21vcnBoT2JqLmZyb21BcnJheShcclxuICAgICAgdGhpcy5fZnJvbS5tYXAoZnVuY3Rpb24gKGksIGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzLl9zdGVwcGVyLnN0ZXAoaSwgX3RoaXMuX3RvW2luZGV4XSwgcG9zLCBfdGhpcy5fY29udGV4dFtpbmRleF0sIF90aGlzLl9jb250ZXh0KVxyXG4gICAgICB9KVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vbk1vcnBoYWJsZSB7XHJcbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcclxuICAgIHRoaXMuaW5pdCguLi5hcmdzKVxyXG4gIH1cclxuXHJcbiAgaW5pdCAodmFsKSB7XHJcbiAgICB2YWwgPSBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWxbMF0gOiB2YWxcclxuICAgIHRoaXMudmFsdWUgPSB2YWxcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICB2YWx1ZU9mICgpIHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlXHJcbiAgfVxyXG5cclxuICB0b0FycmF5ICgpIHtcclxuICAgIHJldHVybiBbIHRoaXMudmFsdWUgXVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybUJhZyB7XHJcbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcclxuICAgIHRoaXMuaW5pdCguLi5hcmdzKVxyXG4gIH1cclxuXHJcbiAgaW5pdCAob2JqKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgIG9iaiA9IHtcclxuICAgICAgICBzY2FsZVg6IG9ialswXSxcclxuICAgICAgICBzY2FsZVk6IG9ialsxXSxcclxuICAgICAgICBzaGVhcjogb2JqWzJdLFxyXG4gICAgICAgIHJvdGF0ZTogb2JqWzNdLFxyXG4gICAgICAgIHRyYW5zbGF0ZVg6IG9ials0XSxcclxuICAgICAgICB0cmFuc2xhdGVZOiBvYmpbNV0sXHJcbiAgICAgICAgb3JpZ2luWDogb2JqWzZdLFxyXG4gICAgICAgIG9yaWdpblk6IG9ials3XVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBUcmFuc2Zvcm1CYWcuZGVmYXVsdHMsIG9iailcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICB0b0FycmF5ICgpIHtcclxuICAgIHZhciB2ID0gdGhpc1xyXG5cclxuICAgIHJldHVybiBbXHJcbiAgICAgIHYuc2NhbGVYLFxyXG4gICAgICB2LnNjYWxlWSxcclxuICAgICAgdi5zaGVhcixcclxuICAgICAgdi5yb3RhdGUsXHJcbiAgICAgIHYudHJhbnNsYXRlWCxcclxuICAgICAgdi50cmFuc2xhdGVZLFxyXG4gICAgICB2Lm9yaWdpblgsXHJcbiAgICAgIHYub3JpZ2luWVxyXG4gICAgXVxyXG4gIH1cclxufVxyXG5cclxuVHJhbnNmb3JtQmFnLmRlZmF1bHRzID0ge1xyXG4gIHNjYWxlWDogMSxcclxuICBzY2FsZVk6IDEsXHJcbiAgc2hlYXI6IDAsXHJcbiAgcm90YXRlOiAwLFxyXG4gIHRyYW5zbGF0ZVg6IDAsXHJcbiAgdHJhbnNsYXRlWTogMCxcclxuICBvcmlnaW5YOiAwLFxyXG4gIG9yaWdpblk6IDBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdEJhZyB7XHJcbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcclxuICAgIHRoaXMuaW5pdCguLi5hcmdzKVxyXG4gIH1cclxuXHJcbiAgaW5pdCAob2JqT3JBcnIpIHtcclxuICAgIHRoaXMudmFsdWVzID0gW11cclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpPckFycikpIHtcclxuICAgICAgdGhpcy52YWx1ZXMgPSBvYmpPckFyclxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBvYmpPckFyciA9IG9iak9yQXJyIHx8IHt9XHJcbiAgICB2YXIgZW50cmllcyA9IFtdXHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiBvYmpPckFycikge1xyXG4gICAgICBlbnRyaWVzLnB1c2goW2ksIG9iak9yQXJyW2ldXSlcclxuICAgIH1cclxuXHJcbiAgICBlbnRyaWVzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgcmV0dXJuIGFbMF0gLSBiWzBdXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMudmFsdWVzID0gZW50cmllcy5yZWR1Y2UoKGxhc3QsIGN1cnIpID0+IGxhc3QuY29uY2F0KGN1cnIpLCBbXSlcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICB2YWx1ZU9mICgpIHtcclxuICAgIHZhciBvYmogPSB7fVxyXG4gICAgdmFyIGFyciA9IHRoaXMudmFsdWVzXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMikge1xyXG4gICAgICBvYmpbYXJyW2ldXSA9IGFycltpICsgMV1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqXHJcbiAgfVxyXG5cclxuICB0b0FycmF5ICgpIHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlc1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbW9ycGhhYmxlVHlwZXMgPSBbXHJcbiAgTm9uTW9ycGhhYmxlLFxyXG4gIFRyYW5zZm9ybUJhZyxcclxuICBPYmplY3RCYWdcclxuXVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTW9ycGhhYmxlVHlwZSAodHlwZSA9IFtdKSB7XHJcbiAgbW9ycGhhYmxlVHlwZXMucHVzaCguLi5bXS5jb25jYXQodHlwZSkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlTW9ycGhhYmxlICgpIHtcclxuICBleHRlbmQobW9ycGhhYmxlVHlwZXMsIHtcclxuICAgIHRvICh2YWwpIHtcclxuICAgICAgcmV0dXJuIG5ldyBNb3JwaGFibGUoKVxyXG4gICAgICAgIC50eXBlKHRoaXMuY29uc3RydWN0b3IpXHJcbiAgICAgICAgLmZyb20odGhpcy52YWx1ZU9mKCkpXHJcbiAgICAgICAgLnRvKHZhbClcclxuICAgIH0sXHJcbiAgICBmcm9tQXJyYXkgKGFycikge1xyXG4gICAgICB0aGlzLmluaXQoYXJyKVxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVldWUge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHRoaXMuX2ZpcnN0ID0gbnVsbFxyXG4gICAgdGhpcy5fbGFzdCA9IG51bGxcclxuICB9XHJcblxyXG4gIHB1c2ggKHZhbHVlKSB7XHJcbiAgICAvLyBBbiBpdGVtIHN0b3JlcyBhbiBpZCBhbmQgdGhlIHByb3ZpZGVkIHZhbHVlXHJcbiAgICB2YXIgaXRlbSA9IHZhbHVlLm5leHQgPyB2YWx1ZSA6IHsgdmFsdWU6IHZhbHVlLCBuZXh0OiBudWxsLCBwcmV2OiBudWxsIH1cclxuXHJcbiAgICAvLyBEZWFsIHdpdGggdGhlIHF1ZXVlIGJlaW5nIGVtcHR5IG9yIHBvcHVsYXRlZFxyXG4gICAgaWYgKHRoaXMuX2xhc3QpIHtcclxuICAgICAgaXRlbS5wcmV2ID0gdGhpcy5fbGFzdFxyXG4gICAgICB0aGlzLl9sYXN0Lm5leHQgPSBpdGVtXHJcbiAgICAgIHRoaXMuX2xhc3QgPSBpdGVtXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9sYXN0ID0gaXRlbVxyXG4gICAgICB0aGlzLl9maXJzdCA9IGl0ZW1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgaXRlbVxyXG4gICAgcmV0dXJuIGl0ZW1cclxuICB9XHJcblxyXG4gIHNoaWZ0ICgpIHtcclxuICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYSB2YWx1ZVxyXG4gICAgdmFyIHJlbW92ZSA9IHRoaXMuX2ZpcnN0XHJcbiAgICBpZiAoIXJlbW92ZSkgcmV0dXJuIG51bGxcclxuXHJcbiAgICAvLyBJZiB3ZSBkbywgcmVtb3ZlIGl0IGFuZCByZWxpbmsgdGhpbmdzXHJcbiAgICB0aGlzLl9maXJzdCA9IHJlbW92ZS5uZXh0XHJcbiAgICBpZiAodGhpcy5fZmlyc3QpIHRoaXMuX2ZpcnN0LnByZXYgPSBudWxsXHJcbiAgICB0aGlzLl9sYXN0ID0gdGhpcy5fZmlyc3QgPyB0aGlzLl9sYXN0IDogbnVsbFxyXG4gICAgcmV0dXJuIHJlbW92ZS52YWx1ZVxyXG4gIH1cclxuXHJcbiAgLy8gU2hvd3MgdXMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGxpc3RcclxuICBmaXJzdCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmlyc3QgJiYgdGhpcy5fZmlyc3QudmFsdWVcclxuICB9XHJcblxyXG4gIC8vIFNob3dzIHVzIHRoZSBsYXN0IGl0ZW0gaW4gdGhlIGxpc3RcclxuICBsYXN0ICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0ICYmIHRoaXMuX2xhc3QudmFsdWVcclxuICB9XHJcblxyXG4gIC8vIFJlbW92ZXMgdGhlIGl0ZW0gdGhhdCB3YXMgcmV0dXJuZWQgZnJvbSB0aGUgcHVzaFxyXG4gIHJlbW92ZSAoaXRlbSkge1xyXG4gICAgLy8gUmVsaW5rIHRoZSBwcmV2aW91cyBpdGVtXHJcbiAgICBpZiAoaXRlbS5wcmV2KSBpdGVtLnByZXYubmV4dCA9IGl0ZW0ubmV4dFxyXG4gICAgaWYgKGl0ZW0ubmV4dCkgaXRlbS5uZXh0LnByZXYgPSBpdGVtLnByZXZcclxuICAgIGlmIChpdGVtID09PSB0aGlzLl9sYXN0KSB0aGlzLl9sYXN0ID0gaXRlbS5wcmV2XHJcbiAgICBpZiAoaXRlbSA9PT0gdGhpcy5fZmlyc3QpIHRoaXMuX2ZpcnN0ID0gaXRlbS5uZXh0XHJcblxyXG4gICAgLy8gSW52YWxpZGF0ZSBpdGVtXHJcbiAgICBpdGVtLnByZXYgPSBudWxsXHJcbiAgICBpdGVtLm5leHQgPSBudWxsXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbnRyb2xsZXIsIEVhc2UsIFN0ZXBwZXIgfSBmcm9tICcuL0NvbnRyb2xsZXIuanMnXG5pbXBvcnQgeyBleHRlbmQsIHJlZ2lzdGVyIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IGZyb20sIHRvIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2dyYWRpZW50ZWQuanMnXG5pbXBvcnQgeyBnZXRPcmlnaW4gfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IG5vb3AsIHRpbWVsaW5lIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2RlZmF1bHRzLmpzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcbmltcG9ydCB7IHJ4LCByeSB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9jaXJjbGVkLmpzJ1xuaW1wb3J0IEFuaW1hdG9yIGZyb20gJy4vQW5pbWF0b3IuanMnXG5pbXBvcnQgQm94IGZyb20gJy4uL3R5cGVzL0JveC5qcydcbmltcG9ydCBFdmVudFRhcmdldCBmcm9tICcuLi90eXBlcy9FdmVudFRhcmdldC5qcydcbmltcG9ydCBNYXRyaXggZnJvbSAnLi4vdHlwZXMvTWF0cml4LmpzJ1xuaW1wb3J0IE1vcnBoYWJsZSwgeyBUcmFuc2Zvcm1CYWcgfSBmcm9tICcuL01vcnBoYWJsZS5qcydcbmltcG9ydCBQb2ludCBmcm9tICcuLi90eXBlcy9Qb2ludC5qcydcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xuaW1wb3J0IFRpbWVsaW5lIGZyb20gJy4vVGltZWxpbmUuanMnXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVubmVyIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xyXG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XHJcbiAgICBzdXBlcigpXHJcblxyXG4gICAgLy8gU3RvcmUgYSB1bmlxdWUgaWQgb24gdGhlIHJ1bm5lciwgc28gdGhhdCB3ZSBjYW4gaWRlbnRpZnkgaXQgbGF0ZXJcclxuICAgIHRoaXMuaWQgPSBSdW5uZXIuaWQrK1xyXG5cclxuICAgIC8vIEVuc3VyZSBhIGRlZmF1bHQgdmFsdWVcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zID09IG51bGxcclxuICAgICAgPyB0aW1lbGluZS5kdXJhdGlvblxyXG4gICAgICA6IG9wdGlvbnNcclxuXHJcbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSBnZXQgYSBjb250cm9sbGVyXHJcbiAgICBvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbidcclxuICAgICAgPyBuZXcgQ29udHJvbGxlcihvcHRpb25zKVxyXG4gICAgICA6IG9wdGlvbnNcclxuXHJcbiAgICAvLyBEZWNsYXJlIGFsbCBvZiB0aGUgdmFyaWFibGVzXHJcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxyXG4gICAgdGhpcy5fdGltZWxpbmUgPSBudWxsXHJcbiAgICB0aGlzLmRvbmUgPSBmYWxzZVxyXG4gICAgdGhpcy5fcXVldWUgPSBbXVxyXG5cclxuICAgIC8vIFdvcmsgb3V0IHRoZSBzdGVwcGVyIGFuZCB0aGUgZHVyYXRpb25cclxuICAgIHRoaXMuX2R1cmF0aW9uID0gdHlwZW9mIG9wdGlvbnMgPT09ICdudW1iZXInICYmIG9wdGlvbnNcclxuICAgIHRoaXMuX2lzRGVjbGFyYXRpdmUgPSBvcHRpb25zIGluc3RhbmNlb2YgQ29udHJvbGxlclxyXG4gICAgdGhpcy5fc3RlcHBlciA9IHRoaXMuX2lzRGVjbGFyYXRpdmUgPyBvcHRpb25zIDogbmV3IEVhc2UoKVxyXG5cclxuICAgIC8vIFdlIGNvcHkgdGhlIGN1cnJlbnQgdmFsdWVzIGZyb20gdGhlIHRpbWVsaW5lIGJlY2F1c2UgdGhleSBjYW4gY2hhbmdlXHJcbiAgICB0aGlzLl9oaXN0b3J5ID0ge31cclxuXHJcbiAgICAvLyBTdG9yZSB0aGUgc3RhdGUgb2YgdGhlIHJ1bm5lclxyXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxyXG4gICAgdGhpcy5fdGltZSA9IDBcclxuICAgIHRoaXMuX2xhc3RUaW1lID0gMFxyXG5cclxuICAgIC8vIEF0IGNyZWF0aW9uLCB0aGUgcnVubmVyIGlzIGluIHJlc2V0ZWQgc3RhdGVcclxuICAgIHRoaXMuX3Jlc2V0ZWQgPSB0cnVlXHJcblxyXG4gICAgLy8gU2F2ZSB0cmFuc2Zvcm1zIGFwcGxpZWQgdG8gdGhpcyBydW5uZXJcclxuICAgIHRoaXMudHJhbnNmb3JtcyA9IG5ldyBNYXRyaXgoKVxyXG4gICAgdGhpcy50cmFuc2Zvcm1JZCA9IDFcclxuXHJcbiAgICAvLyBMb29waW5nIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5faGF2ZVJldmVyc2VkID0gZmFsc2VcclxuICAgIHRoaXMuX3JldmVyc2UgPSBmYWxzZVxyXG4gICAgdGhpcy5fbG9vcHNEb25lID0gMFxyXG4gICAgdGhpcy5fc3dpbmcgPSBmYWxzZVxyXG4gICAgdGhpcy5fd2FpdCA9IDBcclxuICAgIHRoaXMuX3RpbWVzID0gMVxyXG5cclxuICAgIHRoaXMuX2ZyYW1lSWQgPSBudWxsXHJcblxyXG4gICAgLy8gU3RvcmVzIGhvdyBsb25nIGEgcnVubmVyIGlzIHN0b3JlZCBhZnRlciBiZWVpbmcgZG9uZVxyXG4gICAgdGhpcy5fcGVyc2lzdCA9IHRoaXMuX2lzRGVjbGFyYXRpdmUgPyB0cnVlIDogbnVsbFxyXG4gIH1cclxuXHJcbiAgLypcclxuICBSdW5uZXIgRGVmaW5pdGlvbnNcclxuICA9PT09PT09PT09PT09PT09PT1cclxuICBUaGVzZSBtZXRob2RzIGhlbHAgdXMgZGVmaW5lIHRoZSBydW50aW1lIGJlaGF2aW91ciBvZiB0aGUgUnVubmVyIG9yIHRoZXlcclxuICBoZWxwIHVzIG1ha2UgbmV3IHJ1bm5lcnMgZnJvbSB0aGUgY3VycmVudCBydW5uZXJcclxuICAqL1xyXG5cclxuICBlbGVtZW50IChlbGVtZW50KSB7XHJcbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSByZXR1cm4gdGhpcy5fZWxlbWVudFxyXG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnRcclxuICAgIGVsZW1lbnQuX3ByZXBhcmVSdW5uZXIoKVxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIHRpbWVsaW5lICh0aW1lbGluZSkge1xyXG4gICAgLy8gY2hlY2sgZXhwbGljaXRseSBmb3IgdW5kZWZpbmVkIHNvIHdlIGNhbiBzZXQgdGhlIHRpbWVsaW5lIHRvIG51bGxcclxuICAgIGlmICh0eXBlb2YgdGltZWxpbmUgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gdGhpcy5fdGltZWxpbmVcclxuICAgIHRoaXMuX3RpbWVsaW5lID0gdGltZWxpbmVcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBhbmltYXRlIChkdXJhdGlvbiwgZGVsYXksIHdoZW4pIHtcclxuICAgIHZhciBvID0gUnVubmVyLnNhbml0aXNlKGR1cmF0aW9uLCBkZWxheSwgd2hlbilcclxuICAgIHZhciBydW5uZXIgPSBuZXcgUnVubmVyKG8uZHVyYXRpb24pXHJcbiAgICBpZiAodGhpcy5fdGltZWxpbmUpIHJ1bm5lci50aW1lbGluZSh0aGlzLl90aW1lbGluZSlcclxuICAgIGlmICh0aGlzLl9lbGVtZW50KSBydW5uZXIuZWxlbWVudCh0aGlzLl9lbGVtZW50KVxyXG4gICAgcmV0dXJuIHJ1bm5lci5sb29wKG8pLnNjaGVkdWxlKGRlbGF5LCB3aGVuKVxyXG4gIH1cclxuXHJcbiAgc2NoZWR1bGUgKHRpbWVsaW5lLCBkZWxheSwgd2hlbikge1xyXG4gICAgLy8gVGhlIHVzZXIgZG9lc24ndCBuZWVkIHRvIHBhc3MgYSB0aW1lbGluZSBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXHJcbiAgICBpZiAoISh0aW1lbGluZSBpbnN0YW5jZW9mIFRpbWVsaW5lKSkge1xyXG4gICAgICB3aGVuID0gZGVsYXlcclxuICAgICAgZGVsYXkgPSB0aW1lbGluZVxyXG4gICAgICB0aW1lbGluZSA9IHRoaXMudGltZWxpbmUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vIHRpbWVsaW5lLCB5ZWxsIGF0IHRoZSB1c2VyLi4uXHJcbiAgICBpZiAoIXRpbWVsaW5lKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdSdW5uZXIgY2Fubm90IGJlIHNjaGVkdWxlZCB3aXRob3V0IHRpbWVsaW5lJylcclxuICAgIH1cclxuXHJcbiAgICAvLyBTY2hlZHVsZSB0aGUgcnVubmVyIG9uIHRoZSB0aW1lbGluZSBwcm92aWRlZFxyXG4gICAgdGltZWxpbmUuc2NoZWR1bGUodGhpcywgZGVsYXksIHdoZW4pXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgdW5zY2hlZHVsZSAoKSB7XHJcbiAgICB2YXIgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lKClcclxuICAgIHRpbWVsaW5lICYmIHRpbWVsaW5lLnVuc2NoZWR1bGUodGhpcylcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBsb29wICh0aW1lcywgc3dpbmcsIHdhaXQpIHtcclxuICAgIC8vIERlYWwgd2l0aCB0aGUgdXNlciBwYXNzaW5nIGluIGFuIG9iamVjdFxyXG4gICAgaWYgKHR5cGVvZiB0aW1lcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgc3dpbmcgPSB0aW1lcy5zd2luZ1xyXG4gICAgICB3YWl0ID0gdGltZXMud2FpdFxyXG4gICAgICB0aW1lcyA9IHRpbWVzLnRpbWVzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2FuaXRpc2UgdGhlIHZhbHVlcyBhbmQgc3RvcmUgdGhlbVxyXG4gICAgdGhpcy5fdGltZXMgPSB0aW1lcyB8fCBJbmZpbml0eVxyXG4gICAgdGhpcy5fc3dpbmcgPSBzd2luZyB8fCBmYWxzZVxyXG4gICAgdGhpcy5fd2FpdCA9IHdhaXQgfHwgMFxyXG5cclxuICAgIC8vIEFsbG93IHRydWUgdG8gYmUgcGFzc2VkXHJcbiAgICBpZiAodGhpcy5fdGltZXMgPT09IHRydWUpIHsgdGhpcy5fdGltZXMgPSBJbmZpbml0eSB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIGRlbGF5IChkZWxheSkge1xyXG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSgwLCBkZWxheSlcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgQmFzaWMgRnVuY3Rpb25hbGl0eVxyXG4gID09PT09PT09PT09PT09PT09PT1cclxuICBUaGVzZSBtZXRob2RzIGFsbG93IHVzIHRvIGF0dGFjaCBiYXNpYyBmdW5jdGlvbnMgdG8gdGhlIHJ1bm5lciBkaXJlY3RseVxyXG4gICovXHJcblxyXG4gIHF1ZXVlIChpbml0Rm4sIHJ1bkZuLCByZXRhcmdldEZuLCBpc1RyYW5zZm9ybSkge1xyXG4gICAgdGhpcy5fcXVldWUucHVzaCh7XHJcbiAgICAgIGluaXRpYWxpc2VyOiBpbml0Rm4gfHwgbm9vcCxcclxuICAgICAgcnVubmVyOiBydW5GbiB8fCBub29wLFxyXG4gICAgICByZXRhcmdldDogcmV0YXJnZXRGbixcclxuICAgICAgaXNUcmFuc2Zvcm06IGlzVHJhbnNmb3JtLFxyXG4gICAgICBpbml0aWFsaXNlZDogZmFsc2UsXHJcbiAgICAgIGZpbmlzaGVkOiBmYWxzZVxyXG4gICAgfSlcclxuICAgIHZhciB0aW1lbGluZSA9IHRoaXMudGltZWxpbmUoKVxyXG4gICAgdGltZWxpbmUgJiYgdGhpcy50aW1lbGluZSgpLl9jb250aW51ZSgpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgZHVyaW5nIChmbikge1xyXG4gICAgcmV0dXJuIHRoaXMucXVldWUobnVsbCwgZm4pXHJcbiAgfVxyXG5cclxuICBhZnRlciAoZm4pIHtcclxuICAgIHJldHVybiB0aGlzLm9uKCdmaW5pc2hlZCcsIGZuKVxyXG4gIH1cclxuXHJcbiAgLypcclxuICBSdW5uZXIgYW5pbWF0aW9uIG1ldGhvZHNcclxuICA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuICBDb250cm9sIGhvdyB0aGUgYW5pbWF0aW9uIHBsYXlzXHJcbiAgKi9cclxuXHJcbiAgdGltZSAodGltZSkge1xyXG4gICAgaWYgKHRpbWUgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdGltZVxyXG4gICAgfVxyXG4gICAgbGV0IGR0ID0gdGltZSAtIHRoaXMuX3RpbWVcclxuICAgIHRoaXMuc3RlcChkdClcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBkdXJhdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGltZXMgKiAodGhpcy5fd2FpdCArIHRoaXMuX2R1cmF0aW9uKSAtIHRoaXMuX3dhaXRcclxuICB9XHJcblxyXG4gIGxvb3BzIChwKSB7XHJcbiAgICB2YXIgbG9vcER1cmF0aW9uID0gdGhpcy5fZHVyYXRpb24gKyB0aGlzLl93YWl0XHJcbiAgICBpZiAocCA9PSBudWxsKSB7XHJcbiAgICAgIHZhciBsb29wc0RvbmUgPSBNYXRoLmZsb29yKHRoaXMuX3RpbWUgLyBsb29wRHVyYXRpb24pXHJcbiAgICAgIHZhciByZWxhdGl2ZVRpbWUgPSAodGhpcy5fdGltZSAtIGxvb3BzRG9uZSAqIGxvb3BEdXJhdGlvbilcclxuICAgICAgdmFyIHBvc2l0aW9uID0gcmVsYXRpdmVUaW1lIC8gdGhpcy5fZHVyYXRpb25cclxuICAgICAgcmV0dXJuIE1hdGgubWluKGxvb3BzRG9uZSArIHBvc2l0aW9uLCB0aGlzLl90aW1lcylcclxuICAgIH1cclxuICAgIHZhciB3aG9sZSA9IE1hdGguZmxvb3IocClcclxuICAgIHZhciBwYXJ0aWFsID0gcCAlIDFcclxuICAgIHZhciB0aW1lID0gbG9vcER1cmF0aW9uICogd2hvbGUgKyB0aGlzLl9kdXJhdGlvbiAqIHBhcnRpYWxcclxuICAgIHJldHVybiB0aGlzLnRpbWUodGltZSlcclxuICB9XHJcblxyXG4gIHBlcnNpc3QgKGR0T3JGb3JldmVyKSB7XHJcbiAgICBpZiAoZHRPckZvcmV2ZXIgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX3BlcnNpc3RcclxuICAgIHRoaXMuX3BlcnNpc3QgPSBkdE9yRm9yZXZlclxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIHBvc2l0aW9uIChwKSB7XHJcbiAgICAvLyBHZXQgYWxsIG9mIHRoZSB2YXJpYWJsZXMgd2UgbmVlZFxyXG4gICAgdmFyIHggPSB0aGlzLl90aW1lXHJcbiAgICB2YXIgZCA9IHRoaXMuX2R1cmF0aW9uXHJcbiAgICB2YXIgdyA9IHRoaXMuX3dhaXRcclxuICAgIHZhciB0ID0gdGhpcy5fdGltZXNcclxuICAgIHZhciBzID0gdGhpcy5fc3dpbmdcclxuICAgIHZhciByID0gdGhpcy5fcmV2ZXJzZVxyXG4gICAgdmFyIHBvc2l0aW9uXHJcblxyXG4gICAgaWYgKHAgPT0gbnVsbCkge1xyXG4gICAgICAvKlxyXG4gICAgICBUaGlzIGZ1bmN0aW9uIGNvbnZlcnRzIGEgdGltZSB0byBhIHBvc2l0aW9uIGluIHRoZSByYW5nZSBbMCwgMV1cclxuICAgICAgVGhlIGZ1bGwgZXhwbGFuYXRpb24gY2FuIGJlIGZvdW5kIGluIHRoaXMgZGVzbW9zIGRlbW9uc3RyYXRpb25cclxuICAgICAgICBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvdTRmYmF2Z2NoZVxyXG4gICAgICBUaGUgbG9naWMgaXMgc2xpZ2h0bHkgc2ltcGxpZmllZCBoZXJlIGJlY2F1c2Ugd2UgY2FuIHVzZSBib29sZWFuc1xyXG4gICAgICAqL1xyXG5cclxuICAgICAgLy8gRmlndXJlIG91dCB0aGUgdmFsdWUgd2l0aG91dCB0aGlua2luZyBhYm91dCB0aGUgc3RhcnQgb3IgZW5kIHRpbWVcclxuICAgICAgY29uc3QgZiA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgdmFyIHN3aW5naW5nID0gcyAqIE1hdGguZmxvb3IoeCAlICgyICogKHcgKyBkKSkgLyAodyArIGQpKVxyXG4gICAgICAgIHZhciBiYWNrd2FyZHMgPSAoc3dpbmdpbmcgJiYgIXIpIHx8ICghc3dpbmdpbmcgJiYgcilcclxuICAgICAgICB2YXIgdW5jbGlwZWQgPSBNYXRoLnBvdygtMSwgYmFja3dhcmRzKSAqICh4ICUgKHcgKyBkKSkgLyBkICsgYmFja3dhcmRzXHJcbiAgICAgICAgdmFyIGNsaXBwZWQgPSBNYXRoLm1heChNYXRoLm1pbih1bmNsaXBlZCwgMSksIDApXHJcbiAgICAgICAgcmV0dXJuIGNsaXBwZWRcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRmlndXJlIG91dCB0aGUgdmFsdWUgYnkgaW5jb3Jwb3JhdGluZyB0aGUgc3RhcnQgdGltZVxyXG4gICAgICB2YXIgZW5kVGltZSA9IHQgKiAodyArIGQpIC0gd1xyXG4gICAgICBwb3NpdGlvbiA9IHggPD0gMCA/IE1hdGgucm91bmQoZigxZS01KSlcclxuICAgICAgICA6IHggPCBlbmRUaW1lID8gZih4KVxyXG4gICAgICAgIDogTWF0aC5yb3VuZChmKGVuZFRpbWUgLSAxZS01KSlcclxuICAgICAgcmV0dXJuIHBvc2l0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgLy8gV29yayBvdXQgdGhlIGxvb3BzIGRvbmUgYW5kIGFkZCB0aGUgcG9zaXRpb24gdG8gdGhlIGxvb3BzIGRvbmVcclxuICAgIHZhciBsb29wc0RvbmUgPSBNYXRoLmZsb29yKHRoaXMubG9vcHMoKSlcclxuICAgIHZhciBzd2luZ0ZvcndhcmQgPSBzICYmIChsb29wc0RvbmUgJSAyID09PSAwKVxyXG4gICAgdmFyIGZvcndhcmRzID0gKHN3aW5nRm9yd2FyZCAmJiAhcikgfHwgKHIgJiYgc3dpbmdGb3J3YXJkKVxyXG4gICAgcG9zaXRpb24gPSBsb29wc0RvbmUgKyAoZm9yd2FyZHMgPyBwIDogMSAtIHApXHJcbiAgICByZXR1cm4gdGhpcy5sb29wcyhwb3NpdGlvbilcclxuICB9XHJcblxyXG4gIHByb2dyZXNzIChwKSB7XHJcbiAgICBpZiAocCA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLm1pbigxLCB0aGlzLl90aW1lIC8gdGhpcy5kdXJhdGlvbigpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudGltZShwICogdGhpcy5kdXJhdGlvbigpKVxyXG4gIH1cclxuXHJcbiAgc3RlcCAoZHQpIHtcclxuICAgIC8vIElmIHdlIGFyZSBpbmFjdGl2ZSwgdGhpcyBzdGVwcGVyIGp1c3QgZ2V0cyBza2lwcGVkXHJcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuIHRoaXNcclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIHRpbWUgYW5kIGdldCB0aGUgbmV3IHBvc2l0aW9uXHJcbiAgICBkdCA9IGR0ID09IG51bGwgPyAxNiA6IGR0XHJcbiAgICB0aGlzLl90aW1lICs9IGR0XHJcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uKClcclxuXHJcbiAgICAvLyBGaWd1cmUgb3V0IGlmIHdlIG5lZWQgdG8gcnVuIHRoZSBzdGVwcGVyIGluIHRoaXMgZnJhbWVcclxuICAgIHZhciBydW5uaW5nID0gdGhpcy5fbGFzdFBvc2l0aW9uICE9PSBwb3NpdGlvbiAmJiB0aGlzLl90aW1lID49IDBcclxuICAgIHRoaXMuX2xhc3RQb3NpdGlvbiA9IHBvc2l0aW9uXHJcblxyXG4gICAgLy8gRmlndXJlIG91dCBpZiB3ZSBqdXN0IHN0YXJ0ZWRcclxuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb24oKVxyXG4gICAgdmFyIGp1c3RTdGFydGVkID0gdGhpcy5fbGFzdFRpbWUgPD0gMCAmJiB0aGlzLl90aW1lID4gMFxyXG4gICAgdmFyIGp1c3RGaW5pc2hlZCA9IHRoaXMuX2xhc3RUaW1lIDwgZHVyYXRpb24gJiYgdGhpcy5fdGltZSA+PSBkdXJhdGlvblxyXG5cclxuICAgIHRoaXMuX2xhc3RUaW1lID0gdGhpcy5fdGltZVxyXG4gICAgaWYgKGp1c3RTdGFydGVkKSB7XHJcbiAgICAgIHRoaXMuZmlyZSgnc3RhcnQnLCB0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFdvcmsgb3V0IGlmIHRoZSBydW5uZXIgaXMgZmluaXNoZWQgc2V0IHRoZSBkb25lIGZsYWcgaGVyZSBzbyBhbmltYXRpb25zXHJcbiAgICAvLyBrbm93LCB0aGF0IHRoZXkgYXJlIHJ1bm5pbmcgaW4gdGhlIGxhc3Qgc3RlcCAodGhpcyBpcyBnb29kIGZvclxyXG4gICAgLy8gdHJhbnNmb3JtYXRpb25zIHdoaWNoIGNhbiBiZSBtZXJnZWQpXHJcbiAgICB2YXIgZGVjbGFyYXRpdmUgPSB0aGlzLl9pc0RlY2xhcmF0aXZlXHJcbiAgICB0aGlzLmRvbmUgPSAhZGVjbGFyYXRpdmUgJiYgIWp1c3RGaW5pc2hlZCAmJiB0aGlzLl90aW1lID49IGR1cmF0aW9uXHJcblxyXG4gICAgLy8gUnVubmVyIGlzIHJ1bm5pbmcuIFNvIGl0cyBub3QgaW4gcmVzZXRlZCBzdGF0ZSBhbnltb3JlXHJcbiAgICB0aGlzLl9yZXNldGVkID0gZmFsc2VcclxuXHJcbiAgICAvLyBDYWxsIGluaXRpYWxpc2UgYW5kIHRoZSBydW4gZnVuY3Rpb25cclxuICAgIGlmIChydW5uaW5nIHx8IGRlY2xhcmF0aXZlKSB7XHJcbiAgICAgIHRoaXMuX2luaXRpYWxpc2UocnVubmluZylcclxuXHJcbiAgICAgIC8vIGNsZWFyIHRoZSB0cmFuc2Zvcm1zIG9uIHRoaXMgcnVubmVyIHNvIHRoZXkgZG9udCBnZXQgYWRkZWQgYWdhaW4gYW5kIGFnYWluXHJcbiAgICAgIHRoaXMudHJhbnNmb3JtcyA9IG5ldyBNYXRyaXgoKVxyXG4gICAgICB2YXIgY29udmVyZ2VkID0gdGhpcy5fcnVuKGRlY2xhcmF0aXZlID8gZHQgOiBwb3NpdGlvbilcclxuXHJcbiAgICAgIHRoaXMuZmlyZSgnc3RlcCcsIHRoaXMpXHJcbiAgICB9XHJcbiAgICAvLyBjb3JyZWN0IHRoZSBkb25lIGZsYWcgaGVyZVxyXG4gICAgLy8gZGVjbGFyaXRpdmUgYW5pbWF0aW9ucyBpdHNlbGYga25vdyB3aGVuIHRoZXkgY29udmVyZ2VkXHJcbiAgICB0aGlzLmRvbmUgPSB0aGlzLmRvbmUgfHwgKGNvbnZlcmdlZCAmJiBkZWNsYXJhdGl2ZSlcclxuICAgIGlmIChqdXN0RmluaXNoZWQpIHtcclxuICAgICAgdGhpcy5maXJlKCdmaW5pc2hlZCcsIHRoaXMpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgcmVzZXQgKCkge1xyXG4gICAgaWYgKHRoaXMuX3Jlc2V0ZWQpIHJldHVybiB0aGlzXHJcbiAgICB0aGlzLnRpbWUoMClcclxuICAgIHRoaXMuX3Jlc2V0ZWQgPSB0cnVlXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgZmluaXNoICgpIHtcclxuICAgIHJldHVybiB0aGlzLnN0ZXAoSW5maW5pdHkpXHJcbiAgfVxyXG5cclxuICByZXZlcnNlIChyZXZlcnNlKSB7XHJcbiAgICB0aGlzLl9yZXZlcnNlID0gcmV2ZXJzZSA9PSBudWxsID8gIXRoaXMuX3JldmVyc2UgOiByZXZlcnNlXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgZWFzZSAoZm4pIHtcclxuICAgIHRoaXMuX3N0ZXBwZXIgPSBuZXcgRWFzZShmbilcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBhY3RpdmUgKGVuYWJsZWQpIHtcclxuICAgIGlmIChlbmFibGVkID09IG51bGwpIHJldHVybiB0aGlzLmVuYWJsZWRcclxuICAgIHRoaXMuZW5hYmxlZCA9IGVuYWJsZWRcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKlxyXG4gIFByaXZhdGUgTWV0aG9kc1xyXG4gID09PT09PT09PT09PT09PVxyXG4gIE1ldGhvZHMgdGhhdCBzaG91bGRuJ3QgYmUgdXNlZCBleHRlcm5hbGx5XHJcbiAgKi9cclxuXHJcbiAgLy8gU2F2ZSBhIG1vcnBoZXIgdG8gdGhlIG1vcnBoZXIgbGlzdCBzbyB0aGF0IHdlIGNhbiByZXRhcmdldCBpdCBsYXRlclxyXG4gIF9yZW1lbWJlck1vcnBoZXIgKG1ldGhvZCwgbW9ycGhlcikge1xyXG4gICAgdGhpcy5faGlzdG9yeVttZXRob2RdID0ge1xyXG4gICAgICBtb3JwaGVyOiBtb3JwaGVyLFxyXG4gICAgICBjYWxsZXI6IHRoaXMuX3F1ZXVlW3RoaXMuX3F1ZXVlLmxlbmd0aCAtIDFdXHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2UgaGF2ZSB0byByZXN1bWUgdGhlIHRpbWVsaW5lIGluIGNhc2UgYSBjb250cm9sbGVyXHJcbiAgICAvLyBpcyBhbHJlYWR5IGRvbmUgd2l0aG91dCBiZWVpbmcgZXZlciBydW5cclxuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiB3aGVuIGUuZy4gdGhpcyBpcyBkb25lOlxyXG4gICAgLy8gICAgYW5pbSA9IGVsLmFuaW1hdGUobmV3IFNWRy5TcHJpbmcpXHJcbiAgICAvLyBhbmQgbGF0ZXJcclxuICAgIC8vICAgIGFuaW0ubW92ZSguLi4pXHJcbiAgICBpZiAodGhpcy5faXNEZWNsYXJhdGl2ZSkge1xyXG4gICAgICB2YXIgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lKClcclxuICAgICAgdGltZWxpbmUgJiYgdGltZWxpbmUucGxheSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUcnkgdG8gc2V0IHRoZSB0YXJnZXQgZm9yIGEgbW9ycGhlciBpZiB0aGUgbW9ycGhlciBleGlzdHMsIG90aGVyd2lzZVxyXG4gIC8vIGRvIG5vdGhpbmcgYW5kIHJldHVybiBmYWxzZVxyXG4gIF90cnlSZXRhcmdldCAobWV0aG9kLCB0YXJnZXQsIGV4dHJhKSB7XHJcbiAgICBpZiAodGhpcy5faGlzdG9yeVttZXRob2RdKSB7XHJcbiAgICAgIC8vIGlmIHRoZSBsYXN0IG1ldGhvZCB3YXNudCBldmVuIGluaXRpYWxpc2VkLCB0aHJvdyBpdCBhd2F5XHJcbiAgICAgIGlmICghdGhpcy5faGlzdG9yeVttZXRob2RdLmNhbGxlci5pbml0aWFsaXNlZCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3F1ZXVlLmluZGV4T2YodGhpcy5faGlzdG9yeVttZXRob2RdLmNhbGxlcilcclxuICAgICAgICB0aGlzLl9xdWV1ZS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGZvciB0aGUgY2FzZSBvZiB0cmFuc2Zvcm1hdGlvbnMsIHdlIHVzZSB0aGUgc3BlY2lhbCByZXRhcmdldCBmdW5jdGlvblxyXG4gICAgICAvLyB3aGljaCBoYXMgYWNjZXNzIHRvIHRoZSBvdXRlciBzY29wZVxyXG4gICAgICBpZiAodGhpcy5faGlzdG9yeVttZXRob2RdLmNhbGxlci5yZXRhcmdldCkge1xyXG4gICAgICAgIHRoaXMuX2hpc3RvcnlbbWV0aG9kXS5jYWxsZXIucmV0YXJnZXQodGFyZ2V0LCBleHRyYSlcclxuICAgICAgICAvLyBmb3IgZXZlcnl0aGluZyBlbHNlIGEgc2ltcGxlIG1vcnBoZXIgY2hhbmdlIGlzIHN1ZmZpY2llbnRcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9oaXN0b3J5W21ldGhvZF0ubW9ycGhlci50byh0YXJnZXQpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX2hpc3RvcnlbbWV0aG9kXS5jYWxsZXIuZmluaXNoZWQgPSBmYWxzZVxyXG4gICAgICB2YXIgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lKClcclxuICAgICAgdGltZWxpbmUgJiYgdGltZWxpbmUucGxheSgpXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIC8vIFJ1biBlYWNoIGluaXRpYWxpc2UgZnVuY3Rpb24gaW4gdGhlIHJ1bm5lciBpZiByZXF1aXJlZFxyXG4gIF9pbml0aWFsaXNlIChydW5uaW5nKSB7XHJcbiAgICAvLyBJZiB3ZSBhcmVuJ3QgcnVubmluZywgd2Ugc2hvdWxkbid0IGluaXRpYWxpc2Ugd2hlbiBub3QgZGVjbGFyYXRpdmVcclxuICAgIGlmICghcnVubmluZyAmJiAhdGhpcy5faXNEZWNsYXJhdGl2ZSkgcmV0dXJuXHJcblxyXG4gICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBvZiB0aGUgaW5pdGlhbGlzZXJzXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5fcXVldWUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IGluaXRpYWxpc2VyXHJcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5fcXVldWVbaV1cclxuXHJcbiAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHdlIG5lZWQgdG8gaW5pdGlhbGlzZVxyXG4gICAgICB2YXIgbmVlZHNJdCA9IHRoaXMuX2lzRGVjbGFyYXRpdmUgfHwgKCFjdXJyZW50LmluaXRpYWxpc2VkICYmIHJ1bm5pbmcpXHJcbiAgICAgIHJ1bm5pbmcgPSAhY3VycmVudC5maW5pc2hlZFxyXG5cclxuICAgICAgLy8gQ2FsbCB0aGUgaW5pdGlhbGlzZXIgaWYgd2UgbmVlZCB0b1xyXG4gICAgICBpZiAobmVlZHNJdCAmJiBydW5uaW5nKSB7XHJcbiAgICAgICAgY3VycmVudC5pbml0aWFsaXNlci5jYWxsKHRoaXMpXHJcbiAgICAgICAgY3VycmVudC5pbml0aWFsaXNlZCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gUnVuIGVhY2ggcnVuIGZ1bmN0aW9uIGZvciB0aGUgcG9zaXRpb24gb3IgZHQgZ2l2ZW5cclxuICBfcnVuIChwb3NpdGlvbk9yRHQpIHtcclxuICAgIC8vIFJ1biBhbGwgb2YgdGhlIF9xdWV1ZSBkaXJlY3RseVxyXG4gICAgdmFyIGFsbGZpbmlzaGVkID0gdHJ1ZVxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX3F1ZXVlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIC8vIEdldCB0aGUgY3VycmVudCBmdW5jdGlvbiB0byBydW5cclxuICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLl9xdWV1ZVtpXVxyXG5cclxuICAgICAgLy8gUnVuIHRoZSBmdW5jdGlvbiBpZiBpdHMgbm90IGZpbmlzaGVkLCB3ZSBrZWVwIHRyYWNrIG9mIHRoZSBmaW5pc2hlZFxyXG4gICAgICAvLyBmbGFnIGZvciB0aGUgc2FrZSBvZiBkZWNsYXJhdGl2ZSBfcXVldWVcclxuICAgICAgdmFyIGNvbnZlcmdlZCA9IGN1cnJlbnQucnVubmVyLmNhbGwodGhpcywgcG9zaXRpb25PckR0KVxyXG4gICAgICBjdXJyZW50LmZpbmlzaGVkID0gY3VycmVudC5maW5pc2hlZCB8fCAoY29udmVyZ2VkID09PSB0cnVlKVxyXG4gICAgICBhbGxmaW5pc2hlZCA9IGFsbGZpbmlzaGVkICYmIGN1cnJlbnQuZmluaXNoZWRcclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSByZXBvcnQgd2hlbiBhbGwgb2YgdGhlIGNvbnN0cnVjdG9ycyBhcmUgZmluaXNoZWRcclxuICAgIHJldHVybiBhbGxmaW5pc2hlZFxyXG4gIH1cclxuXHJcbiAgYWRkVHJhbnNmb3JtICh0cmFuc2Zvcm0sIGluZGV4KSB7XHJcbiAgICB0aGlzLnRyYW5zZm9ybXMubG11bHRpcGx5Tyh0cmFuc2Zvcm0pXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgY2xlYXJUcmFuc2Zvcm0gKCkge1xyXG4gICAgdGhpcy50cmFuc2Zvcm1zID0gbmV3IE1hdHJpeCgpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogS2VlcCB0cmFjayBvZiBhbGwgdHJhbnNmb3JtYXRpb25zIHNvIHRoYXQgZGVsZXRpb24gaXMgZmFzdGVyXHJcbiAgY2xlYXJUcmFuc2Zvcm1zRnJvbVF1ZXVlICgpIHtcclxuICAgIGlmICghdGhpcy5kb25lIHx8ICF0aGlzLl90aW1lbGluZSB8fCAhdGhpcy5fdGltZWxpbmUuX3J1bm5lcklkcy5pbmNsdWRlcyh0aGlzLmlkKSkge1xyXG4gICAgICB0aGlzLl9xdWV1ZSA9IHRoaXMuX3F1ZXVlLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAhaXRlbS5pc1RyYW5zZm9ybVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNhbml0aXNlIChkdXJhdGlvbiwgZGVsYXksIHdoZW4pIHtcclxuICAgIC8vIEluaXRpYWxpc2UgdGhlIGRlZmF1bHQgcGFyYW1ldGVyc1xyXG4gICAgdmFyIHRpbWVzID0gMVxyXG4gICAgdmFyIHN3aW5nID0gZmFsc2VcclxuICAgIHZhciB3YWl0ID0gMFxyXG4gICAgZHVyYXRpb24gPSBkdXJhdGlvbiB8fCB0aW1lbGluZS5kdXJhdGlvblxyXG4gICAgZGVsYXkgPSBkZWxheSB8fCB0aW1lbGluZS5kZWxheVxyXG4gICAgd2hlbiA9IHdoZW4gfHwgJ2xhc3QnXHJcblxyXG4gICAgLy8gSWYgd2UgaGF2ZSBhbiBvYmplY3QsIHVucGFjayB0aGUgdmFsdWVzXHJcbiAgICBpZiAodHlwZW9mIGR1cmF0aW9uID09PSAnb2JqZWN0JyAmJiAhKGR1cmF0aW9uIGluc3RhbmNlb2YgU3RlcHBlcikpIHtcclxuICAgICAgZGVsYXkgPSBkdXJhdGlvbi5kZWxheSB8fCBkZWxheVxyXG4gICAgICB3aGVuID0gZHVyYXRpb24ud2hlbiB8fCB3aGVuXHJcbiAgICAgIHN3aW5nID0gZHVyYXRpb24uc3dpbmcgfHwgc3dpbmdcclxuICAgICAgdGltZXMgPSBkdXJhdGlvbi50aW1lcyB8fCB0aW1lc1xyXG4gICAgICB3YWl0ID0gZHVyYXRpb24ud2FpdCB8fCB3YWl0XHJcbiAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24uZHVyYXRpb24gfHwgdGltZWxpbmUuZHVyYXRpb25cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24sXHJcbiAgICAgIGRlbGF5OiBkZWxheSxcclxuICAgICAgc3dpbmc6IHN3aW5nLFxyXG4gICAgICB0aW1lczogdGltZXMsXHJcbiAgICAgIHdhaXQ6IHdhaXQsXHJcbiAgICAgIHdoZW46IHdoZW5cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblJ1bm5lci5pZCA9IDBcclxuXHJcbmNsYXNzIEZha2VSdW5uZXIge1xyXG4gIGNvbnN0cnVjdG9yICh0cmFuc2Zvcm1zID0gbmV3IE1hdHJpeCgpLCBpZCA9IC0xLCBkb25lID0gdHJ1ZSkge1xyXG4gICAgdGhpcy50cmFuc2Zvcm1zID0gdHJhbnNmb3Jtc1xyXG4gICAgdGhpcy5pZCA9IGlkXHJcbiAgICB0aGlzLmRvbmUgPSBkb25lXHJcbiAgfVxyXG5cclxuICBjbGVhclRyYW5zZm9ybXNGcm9tUXVldWUgKCkgeyB9XHJcbn1cclxuXHJcbmV4dGVuZChbIFJ1bm5lciwgRmFrZVJ1bm5lciBdLCB7XHJcbiAgbWVyZ2VXaXRoIChydW5uZXIpIHtcclxuICAgIHJldHVybiBuZXcgRmFrZVJ1bm5lcihcclxuICAgICAgcnVubmVyLnRyYW5zZm9ybXMubG11bHRpcGx5KHRoaXMudHJhbnNmb3JtcyksXHJcbiAgICAgIHJ1bm5lci5pZFxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbi8vIEZha2VSdW5uZXIuZW1wdHlSdW5uZXIgPSBuZXcgRmFrZVJ1bm5lcigpXHJcblxyXG5jb25zdCBsbXVsdGlwbHkgPSAobGFzdCwgY3VycikgPT4gbGFzdC5sbXVsdGlwbHlPKGN1cnIpXHJcbmNvbnN0IGdldFJ1bm5lclRyYW5zZm9ybSA9IChydW5uZXIpID0+IHJ1bm5lci50cmFuc2Zvcm1zXHJcblxyXG5mdW5jdGlvbiBtZXJnZVRyYW5zZm9ybXMgKCkge1xyXG4gIC8vIEZpbmQgdGhlIG1hdHJpeCB0byBhcHBseSB0byB0aGUgZWxlbWVudCBhbmQgYXBwbHkgaXRcclxuICBsZXQgcnVubmVycyA9IHRoaXMuX3RyYW5zZm9ybWF0aW9uUnVubmVycy5ydW5uZXJzXHJcbiAgbGV0IG5ldFRyYW5zZm9ybSA9IHJ1bm5lcnNcclxuICAgIC5tYXAoZ2V0UnVubmVyVHJhbnNmb3JtKVxyXG4gICAgLnJlZHVjZShsbXVsdGlwbHksIG5ldyBNYXRyaXgoKSlcclxuXHJcbiAgdGhpcy50cmFuc2Zvcm0obmV0VHJhbnNmb3JtKVxyXG5cclxuICB0aGlzLl90cmFuc2Zvcm1hdGlvblJ1bm5lcnMubWVyZ2UoKVxyXG5cclxuICBpZiAodGhpcy5fdHJhbnNmb3JtYXRpb25SdW5uZXJzLmxlbmd0aCgpID09PSAxKSB7XHJcbiAgICB0aGlzLl9mcmFtZUlkID0gbnVsbFxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUnVubmVyQXJyYXkge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHRoaXMucnVubmVycyA9IFtdXHJcbiAgICB0aGlzLmlkcyA9IFtdXHJcbiAgfVxyXG5cclxuICBhZGQgKHJ1bm5lcikge1xyXG4gICAgaWYgKHRoaXMucnVubmVycy5pbmNsdWRlcyhydW5uZXIpKSByZXR1cm5cclxuICAgIGxldCBpZCA9IHJ1bm5lci5pZCArIDFcclxuXHJcbiAgICB0aGlzLnJ1bm5lcnMucHVzaChydW5uZXIpXHJcbiAgICB0aGlzLmlkcy5wdXNoKGlkKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBnZXRCeUlEIChpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMucnVubmVyc1t0aGlzLmlkcy5pbmRleE9mKGlkICsgMSldXHJcbiAgfVxyXG5cclxuICByZW1vdmUgKGlkKSB7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLmlkcy5pbmRleE9mKGlkICsgMSlcclxuICAgIHRoaXMuaWRzLnNwbGljZShpbmRleCwgMSlcclxuICAgIHRoaXMucnVubmVycy5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgbWVyZ2UgKCkge1xyXG4gICAgbGV0IGxhc3RSdW5uZXIgPSBudWxsXHJcbiAgICB0aGlzLnJ1bm5lcnMuZm9yRWFjaCgocnVubmVyLCBpKSA9PiB7XHJcblxyXG4gICAgICBjb25zdCBjb25kaXRpb24gPSBsYXN0UnVubmVyXHJcbiAgICAgICAgJiYgcnVubmVyLmRvbmUgJiYgbGFzdFJ1bm5lci5kb25lXHJcbiAgICAgICAgLy8gZG9uJ3QgbWVyZ2UgcnVubmVyIHdoZW4gcGVyc2lzdGVkIG9uIHRpbWVsaW5lXHJcbiAgICAgICAgJiYgKCFydW5uZXIuX3RpbWVsaW5lIHx8ICFydW5uZXIuX3RpbWVsaW5lLl9ydW5uZXJJZHMuaW5jbHVkZXMocnVubmVyLmlkKSlcclxuICAgICAgICAmJiAoIWxhc3RSdW5uZXIuX3RpbWVsaW5lIHx8ICFsYXN0UnVubmVyLl90aW1lbGluZS5fcnVubmVySWRzLmluY2x1ZGVzKGxhc3RSdW5uZXIuaWQpKVxyXG5cclxuICAgICAgaWYgKGNvbmRpdGlvbikge1xyXG4gICAgICAgIC8vIHRoZSArMSBoYXBwZW5zIGluIHRoZSBmdW5jdGlvblxyXG4gICAgICAgIHRoaXMucmVtb3ZlKHJ1bm5lci5pZClcclxuICAgICAgICB0aGlzLmVkaXQobGFzdFJ1bm5lci5pZCwgcnVubmVyLm1lcmdlV2l0aChsYXN0UnVubmVyKSlcclxuICAgICAgfVxyXG5cclxuICAgICAgbGFzdFJ1bm5lciA9IHJ1bm5lclxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgZWRpdCAoaWQsIG5ld1J1bm5lcikge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5pZHMuaW5kZXhPZihpZCArIDEpXHJcbiAgICB0aGlzLmlkcy5zcGxpY2UoaW5kZXgsIDEsIGlkICsgMSlcclxuICAgIHRoaXMucnVubmVycy5zcGxpY2UoaW5kZXgsIDEsIG5ld1J1bm5lcilcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBsZW5ndGggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWRzLmxlbmd0aFxyXG4gIH1cclxuXHJcbiAgY2xlYXJCZWZvcmUgKGlkKSB7XHJcbiAgICBsZXQgZGVsZXRlQ250ID0gdGhpcy5pZHMuaW5kZXhPZihpZCArIDEpIHx8IDFcclxuICAgIHRoaXMuaWRzLnNwbGljZSgwLCBkZWxldGVDbnQsIDApXHJcbiAgICB0aGlzLnJ1bm5lcnMuc3BsaWNlKDAsIGRlbGV0ZUNudCwgbmV3IEZha2VSdW5uZXIoKSlcclxuICAgICAgLmZvckVhY2goKHIpID0+IHIuY2xlYXJUcmFuc2Zvcm1zRnJvbVF1ZXVlKCkpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBFbGVtZW50OiB7XHJcbiAgICBhbmltYXRlIChkdXJhdGlvbiwgZGVsYXksIHdoZW4pIHtcclxuICAgICAgdmFyIG8gPSBSdW5uZXIuc2FuaXRpc2UoZHVyYXRpb24sIGRlbGF5LCB3aGVuKVxyXG4gICAgICB2YXIgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lKClcclxuICAgICAgcmV0dXJuIG5ldyBSdW5uZXIoby5kdXJhdGlvbilcclxuICAgICAgICAubG9vcChvKVxyXG4gICAgICAgIC5lbGVtZW50KHRoaXMpXHJcbiAgICAgICAgLnRpbWVsaW5lKHRpbWVsaW5lLnBsYXkoKSlcclxuICAgICAgICAuc2NoZWR1bGUoZGVsYXksIHdoZW4pXHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGF5IChieSwgd2hlbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5hbmltYXRlKDAsIGJ5LCB3aGVuKVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB0aGlzIGZ1bmN0aW9uIHNlYXJjaGVzIGZvciBhbGwgcnVubmVycyBvbiB0aGUgZWxlbWVudCBhbmQgZGVsZXRlcyB0aGUgb25lc1xyXG4gICAgLy8gd2hpY2ggcnVuIGJlZm9yZSB0aGUgY3VycmVudCBvbmUuIFRoaXMgaXMgYmVjYXVzZSBhYnNvbHV0ZSB0cmFuc2Zvcm1hdGlvbnNcclxuICAgIC8vIG92ZXJ3ZnJpdGUgYW55dGhpbmcgYW55d2F5IHNvIHRoZXJlIGlzIG5vIG5lZWQgdG8gd2FzdGUgdGltZSBjb21wdXRpbmdcclxuICAgIC8vIG90aGVyIHJ1bm5lcnNcclxuICAgIF9jbGVhclRyYW5zZm9ybVJ1bm5lcnNCZWZvcmUgKGN1cnJlbnRSdW5uZXIpIHtcclxuICAgICAgdGhpcy5fdHJhbnNmb3JtYXRpb25SdW5uZXJzLmNsZWFyQmVmb3JlKGN1cnJlbnRSdW5uZXIuaWQpXHJcbiAgICB9LFxyXG5cclxuICAgIF9jdXJyZW50VHJhbnNmb3JtIChjdXJyZW50KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1hdGlvblJ1bm5lcnMucnVubmVyc1xyXG4gICAgICAgIC8vIHdlIG5lZWQgdGhlIGVxdWFsIHNpZ24gaGVyZSB0byBtYWtlIHN1cmUsIHRoYXQgYWxzbyB0cmFuc2Zvcm1hdGlvbnNcclxuICAgICAgICAvLyBvbiB0aGUgc2FtZSBydW5uZXIgd2hpY2ggZXhlY3V0ZSBiZWZvcmUgdGhlIGN1cnJlbnQgdHJhbnNmb3JtYXRpb24gYXJlXHJcbiAgICAgICAgLy8gdGFrZW4gaW50byBhY2NvdW50XHJcbiAgICAgICAgLmZpbHRlcigocnVubmVyKSA9PiBydW5uZXIuaWQgPD0gY3VycmVudC5pZClcclxuICAgICAgICAubWFwKGdldFJ1bm5lclRyYW5zZm9ybSlcclxuICAgICAgICAucmVkdWNlKGxtdWx0aXBseSwgbmV3IE1hdHJpeCgpKVxyXG4gICAgfSxcclxuXHJcbiAgICBfYWRkUnVubmVyIChydW5uZXIpIHtcclxuICAgICAgdGhpcy5fdHJhbnNmb3JtYXRpb25SdW5uZXJzLmFkZChydW5uZXIpXHJcblxyXG4gICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgcnVubmVyIG1lcmdlIGlzIGV4ZWN1dGVkIGF0IHRoZSB2ZXJ5IGVuZCBvZlxyXG4gICAgICAvLyBhbGwgQW5pbWF0b3IgZnVuY3Rpb25zLiBUaGF0cyB3aHkgd2UgdXNlIGltbWVkaWF0ZSBoZXJlIHRvIGV4ZWN1dGVcclxuICAgICAgLy8gdGhlIG1lcmdlIHJpZ2h0IGFmdGVyIGFsbCBmcmFtZXMgYXJlIHJ1blxyXG4gICAgICBBbmltYXRvci5jYW5jZWxJbW1lZGlhdGUodGhpcy5fZnJhbWVJZClcclxuICAgICAgdGhpcy5fZnJhbWVJZCA9IEFuaW1hdG9yLmltbWVkaWF0ZShtZXJnZVRyYW5zZm9ybXMuYmluZCh0aGlzKSlcclxuICAgIH0sXHJcblxyXG4gICAgX3ByZXBhcmVSdW5uZXIgKCkge1xyXG4gICAgICBpZiAodGhpcy5fZnJhbWVJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtYXRpb25SdW5uZXJzID0gbmV3IFJ1bm5lckFycmF5KClcclxuICAgICAgICAgIC5hZGQobmV3IEZha2VSdW5uZXIobmV3IE1hdHJpeCh0aGlzKSkpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5leHRlbmQoUnVubmVyLCB7XHJcbiAgYXR0ciAoYSwgdikge1xyXG4gICAgcmV0dXJuIHRoaXMuc3R5bGVBdHRyKCdhdHRyJywgYSwgdilcclxuICB9LFxyXG5cclxuICAvLyBBZGQgYW5pbWF0YWJsZSBzdHlsZXNcclxuICBjc3MgKHMsIHYpIHtcclxuICAgIHJldHVybiB0aGlzLnN0eWxlQXR0cignY3NzJywgcywgdilcclxuICB9LFxyXG5cclxuICBzdHlsZUF0dHIgKHR5cGUsIG5hbWUsIHZhbCkge1xyXG4gICAgLy8gYXBwbHkgYXR0cmlidXRlcyBpbmRpdmlkdWFsbHlcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcclxuICAgICAgICB0aGlzLnN0eWxlQXR0cih0eXBlLCBrZXksIG5hbWVba2V5XSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtb3JwaGVyID0gbmV3IE1vcnBoYWJsZSh0aGlzLl9zdGVwcGVyKS50byh2YWwpXHJcblxyXG4gICAgdGhpcy5xdWV1ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIG1vcnBoZXIgPSBtb3JwaGVyLmZyb20odGhpcy5lbGVtZW50KClbdHlwZV0obmFtZSkpXHJcbiAgICB9LCBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudCgpW3R5cGVdKG5hbWUsIG1vcnBoZXIuYXQocG9zKSlcclxuICAgICAgcmV0dXJuIG1vcnBoZXIuZG9uZSgpXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfSxcclxuXHJcbiAgem9vbSAobGV2ZWwsIHBvaW50KSB7XHJcbiAgICBpZiAodGhpcy5fdHJ5UmV0YXJnZXQoJ3pvb20nLCB0bywgcG9pbnQpKSByZXR1cm4gdGhpc1xyXG5cclxuICAgIHZhciBtb3JwaGVyID0gbmV3IE1vcnBoYWJsZSh0aGlzLl9zdGVwcGVyKS50byhuZXcgU1ZHTnVtYmVyKGxldmVsKSlcclxuXHJcbiAgICB0aGlzLnF1ZXVlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbW9ycGhlciA9IG1vcnBoZXIuZnJvbSh0aGlzLmVsZW1lbnQoKS56b29tKCkpXHJcbiAgICB9LCBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudCgpLnpvb20obW9ycGhlci5hdChwb3MpLCBwb2ludClcclxuICAgICAgcmV0dXJuIG1vcnBoZXIuZG9uZSgpXHJcbiAgICB9LCBmdW5jdGlvbiAobmV3TGV2ZWwsIG5ld1BvaW50KSB7XHJcbiAgICAgIHBvaW50ID0gbmV3UG9pbnRcclxuICAgICAgbW9ycGhlci50byhuZXdMZXZlbClcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKCd6b29tJywgbW9ycGhlcilcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICoqIGFic29sdXRlIHRyYW5zZm9ybWF0aW9uc1xyXG4gICAqKi9cclxuXHJcbiAgLy9cclxuICAvLyBNIHYgLS0tLS18LS0tLS0oRCBNIHYgPSBGIHYpLS0tLS0tfC0tLS0tPiAgVCB2XHJcbiAgLy9cclxuICAvLyAxLiBkZWZpbmUgdGhlIGZpbmFsIHN0YXRlIChUKSBhbmQgZGVjb21wb3NlIGl0IChvbmNlKVxyXG4gIC8vICAgIHQgPSBbdHgsIHR5LCB0aGUsIGxhbSwgc3ksIHN4XVxyXG4gIC8vIDIuIG9uIGV2ZXJ5IGZyYW1lOiBwdWxsIHRoZSBjdXJyZW50IHN0YXRlIG9mIGFsbCBwcmV2aW91cyB0cmFuc2Zvcm1zXHJcbiAgLy8gICAgKE0gLSBtIGNhbiBjaGFuZ2UpXHJcbiAgLy8gICBhbmQgdGhlbiB3cml0ZSB0aGlzIGFzIG0gPSBbdHgwLCB0eTAsIHRoZTAsIGxhbTAsIHN5MCwgc3gwXVxyXG4gIC8vIDMuIEZpbmQgdGhlIGludGVycG9sYXRlZCBtYXRyaXggRihwb3MpID0gbSArIHBvcyAqICh0IC0gbSlcclxuICAvLyAgIC0gTm90ZSBGKDApID0gTVxyXG4gIC8vICAgLSBOb3RlIEYoMSkgPSBUXHJcbiAgLy8gNC4gTm93IHlvdSBnZXQgdGhlIGRlbHRhIG1hdHJpeCBhcyBhIHJlc3VsdDogRCA9IEYgKiBpbnYoTSlcclxuXHJcbiAgdHJhbnNmb3JtICh0cmFuc2Zvcm1zLCByZWxhdGl2ZSwgYWZmaW5lKSB7XHJcbiAgICAvLyBJZiB3ZSBoYXZlIGEgZGVjbGFyYXRpdmUgZnVuY3Rpb24sIHdlIHNob3VsZCByZXRhcmdldCBpdCBpZiBwb3NzaWJsZVxyXG4gICAgcmVsYXRpdmUgPSB0cmFuc2Zvcm1zLnJlbGF0aXZlIHx8IHJlbGF0aXZlXHJcbiAgICBpZiAodGhpcy5faXNEZWNsYXJhdGl2ZSAmJiAhcmVsYXRpdmUgJiYgdGhpcy5fdHJ5UmV0YXJnZXQoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybXMpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGFyc2UgdGhlIHBhcmFtZXRlcnNcclxuICAgIHZhciBpc01hdHJpeCA9IE1hdHJpeC5pc01hdHJpeExpa2UodHJhbnNmb3JtcylcclxuICAgIGFmZmluZSA9IHRyYW5zZm9ybXMuYWZmaW5lICE9IG51bGxcclxuICAgICAgPyB0cmFuc2Zvcm1zLmFmZmluZVxyXG4gICAgICA6IChhZmZpbmUgIT0gbnVsbCA/IGFmZmluZSA6ICFpc01hdHJpeClcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBtb3JlcGhlciBhbmQgc2V0IGl0cyB0eXBlXHJcbiAgICBjb25zdCBtb3JwaGVyID0gbmV3IE1vcnBoYWJsZSh0aGlzLl9zdGVwcGVyKVxyXG4gICAgICAudHlwZShhZmZpbmUgPyBUcmFuc2Zvcm1CYWcgOiBNYXRyaXgpXHJcblxyXG4gICAgbGV0IG9yaWdpblxyXG4gICAgbGV0IGVsZW1lbnRcclxuICAgIGxldCBjdXJyZW50XHJcbiAgICBsZXQgY3VycmVudEFuZ2xlXHJcbiAgICBsZXQgc3RhcnRUcmFuc2Zvcm1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cCAoKSB7XHJcbiAgICAgIC8vIG1ha2Ugc3VyZSBlbGVtZW50IGFuZCBvcmlnaW4gaXMgZGVmaW5lZFxyXG4gICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLmVsZW1lbnQoKVxyXG4gICAgICBvcmlnaW4gPSBvcmlnaW4gfHwgZ2V0T3JpZ2luKHRyYW5zZm9ybXMsIGVsZW1lbnQpXHJcblxyXG4gICAgICBzdGFydFRyYW5zZm9ybSA9IG5ldyBNYXRyaXgocmVsYXRpdmUgPyB1bmRlZmluZWQgOiBlbGVtZW50KVxyXG5cclxuICAgICAgLy8gYWRkIHRoZSBydW5uZXIgdG8gdGhlIGVsZW1lbnQgc28gaXQgY2FuIG1lcmdlIHRyYW5zZm9ybWF0aW9uc1xyXG4gICAgICBlbGVtZW50Ll9hZGRSdW5uZXIodGhpcylcclxuXHJcbiAgICAgIC8vIERlYWN0aXZhdGUgYWxsIHRyYW5zZm9ybXMgdGhhdCBoYXZlIHJ1biBzbyBmYXIgaWYgd2UgYXJlIGFic29sdXRlXHJcbiAgICAgIGlmICghcmVsYXRpdmUpIHtcclxuICAgICAgICBlbGVtZW50Ll9jbGVhclRyYW5zZm9ybVJ1bm5lcnNCZWZvcmUodGhpcylcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1biAocG9zKSB7XHJcbiAgICAgIC8vIGNsZWFyIGFsbCBvdGhlciB0cmFuc2Zvcm1zIGJlZm9yZSB0aGlzIGluIGNhc2Ugc29tZXRoaW5nIGlzIHNhdmVkXHJcbiAgICAgIC8vIG9uIHRoaXMgcnVubmVyLiBXZSBhcmUgYWJzb2x1dGUuIFdlIGRvbnQgbmVlZCB0aGVzZSFcclxuICAgICAgaWYgKCFyZWxhdGl2ZSkgdGhpcy5jbGVhclRyYW5zZm9ybSgpXHJcblxyXG4gICAgICBsZXQgeyB4LCB5IH0gPSBuZXcgUG9pbnQob3JpZ2luKS50cmFuc2Zvcm0oZWxlbWVudC5fY3VycmVudFRyYW5zZm9ybSh0aGlzKSlcclxuXHJcbiAgICAgIGxldCB0YXJnZXQgPSBuZXcgTWF0cml4KHsgLi4udHJhbnNmb3Jtcywgb3JpZ2luOiBbIHgsIHkgXSB9KVxyXG4gICAgICBsZXQgc3RhcnQgPSB0aGlzLl9pc0RlY2xhcmF0aXZlICYmIGN1cnJlbnRcclxuICAgICAgICA/IGN1cnJlbnRcclxuICAgICAgICA6IHN0YXJ0VHJhbnNmb3JtXHJcblxyXG4gICAgICBpZiAoYWZmaW5lKSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LmRlY29tcG9zZSh4LCB5KVxyXG4gICAgICAgIHN0YXJ0ID0gc3RhcnQuZGVjb21wb3NlKHgsIHkpXHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBhbmQgdGFyZ2V0IGFuZ2xlIGFzIGl0IHdhcyBzZXRcclxuICAgICAgICBjb25zdCByVGFyZ2V0ID0gdGFyZ2V0LnJvdGF0ZVxyXG4gICAgICAgIGNvbnN0IHJDdXJyZW50ID0gc3RhcnQucm90YXRlXHJcblxyXG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIHNob3J0ZXN0IHBhdGggdG8gcm90YXRlIGRpcmVjdGx5XHJcbiAgICAgICAgY29uc3QgcG9zc2liaWxpdGllcyA9IFsgclRhcmdldCAtIDM2MCwgclRhcmdldCwgclRhcmdldCArIDM2MCBdXHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2VzID0gcG9zc2liaWxpdGllcy5tYXAoYSA9PiBNYXRoLmFicyhhIC0gckN1cnJlbnQpKVxyXG4gICAgICAgIGNvbnN0IHNob3J0ZXN0ID0gTWF0aC5taW4oLi4uZGlzdGFuY2VzKVxyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gZGlzdGFuY2VzLmluZGV4T2Yoc2hvcnRlc3QpXHJcbiAgICAgICAgdGFyZ2V0LnJvdGF0ZSA9IHBvc3NpYmlsaXRpZXNbaW5kZXhdXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZWxhdGl2ZSkge1xyXG4gICAgICAgIC8vIHdlIGhhdmUgdG8gYmUgY2FyZWZ1bCBoZXJlIG5vdCB0byBvdmVyd3JpdGUgdGhlIHJvdGF0aW9uXHJcbiAgICAgICAgLy8gd2l0aCB0aGUgcm90YXRlIG1ldGhvZCBvZiBNYXRyaXhcclxuICAgICAgICBpZiAoIWlzTWF0cml4KSB7XHJcbiAgICAgICAgICB0YXJnZXQucm90YXRlID0gdHJhbnNmb3Jtcy5yb3RhdGUgfHwgMFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faXNEZWNsYXJhdGl2ZSAmJiBjdXJyZW50QW5nbGUpIHtcclxuICAgICAgICAgIHN0YXJ0LnJvdGF0ZSA9IGN1cnJlbnRBbmdsZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgbW9ycGhlci5mcm9tKHN0YXJ0KVxyXG4gICAgICBtb3JwaGVyLnRvKHRhcmdldClcclxuXHJcbiAgICAgIGxldCBhZmZpbmVQYXJhbWV0ZXJzID0gbW9ycGhlci5hdChwb3MpXHJcbiAgICAgIGN1cnJlbnRBbmdsZSA9IGFmZmluZVBhcmFtZXRlcnMucm90YXRlXHJcbiAgICAgIGN1cnJlbnQgPSBuZXcgTWF0cml4KGFmZmluZVBhcmFtZXRlcnMpXHJcblxyXG4gICAgICB0aGlzLmFkZFRyYW5zZm9ybShjdXJyZW50KVxyXG4gICAgICBlbGVtZW50Ll9hZGRSdW5uZXIodGhpcylcclxuICAgICAgcmV0dXJuIG1vcnBoZXIuZG9uZSgpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmV0YXJnZXQgKG5ld1RyYW5zZm9ybXMpIHtcclxuICAgICAgLy8gb25seSBnZXQgYSBuZXcgb3JpZ2luIGlmIGl0IGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgY2FsbFxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKG5ld1RyYW5zZm9ybXMub3JpZ2luIHx8ICdjZW50ZXInKS50b1N0cmluZygpXHJcbiAgICAgICAgIT09ICh0cmFuc2Zvcm1zLm9yaWdpbiB8fCAnY2VudGVyJykudG9TdHJpbmcoKVxyXG4gICAgICApIHtcclxuICAgICAgICBvcmlnaW4gPSBnZXRPcmlnaW4odHJhbnNmb3JtcywgZWxlbWVudClcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gb3ZlcndyaXRlIHRoZSBvbGQgdHJhbnNmb3JtYXRpb25zIHdpdGggdGhlIG5ldyBvbmVzXHJcbiAgICAgIHRyYW5zZm9ybXMgPSB7IC4uLm5ld1RyYW5zZm9ybXMsIG9yaWdpbiB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5xdWV1ZShzZXR1cCwgcnVuLCByZXRhcmdldCwgdHJ1ZSlcclxuICAgIHRoaXMuX2lzRGVjbGFyYXRpdmUgJiYgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKCd0cmFuc2Zvcm0nLCBtb3JwaGVyKVxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9LFxyXG5cclxuICAvLyBBbmltYXRhYmxlIHgtYXhpc1xyXG4gIHggKHgsIHJlbGF0aXZlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXIoJ3gnLCB4KVxyXG4gIH0sXHJcblxyXG4gIC8vIEFuaW1hdGFibGUgeS1heGlzXHJcbiAgeSAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyKCd5JywgeSlcclxuICB9LFxyXG5cclxuICBkeCAoeCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyRGVsdGEoJ3gnLCB4KVxyXG4gIH0sXHJcblxyXG4gIGR5ICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXJEZWx0YSgneScsIHkpXHJcbiAgfSxcclxuXHJcbiAgX3F1ZXVlTnVtYmVyRGVsdGEgKG1ldGhvZCwgdG8pIHtcclxuICAgIHRvID0gbmV3IFNWR051bWJlcih0bylcclxuXHJcbiAgICAvLyBUcnkgdG8gY2hhbmdlIHRoZSB0YXJnZXQgaWYgd2UgaGF2ZSB0aGlzIG1ldGhvZCBhbHJlYWR5IHJlZ2lzdGVyZFxyXG4gICAgaWYgKHRoaXMuX3RyeVJldGFyZ2V0KG1ldGhvZCwgdG8pKSByZXR1cm4gdGhpc1xyXG5cclxuICAgIC8vIE1ha2UgYSBtb3JwaGVyIGFuZCBxdWV1ZSB0aGUgYW5pbWF0aW9uXHJcbiAgICB2YXIgbW9ycGhlciA9IG5ldyBNb3JwaGFibGUodGhpcy5fc3RlcHBlcikudG8odG8pXHJcbiAgICB2YXIgZnJvbSA9IG51bGxcclxuICAgIHRoaXMucXVldWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICBmcm9tID0gdGhpcy5lbGVtZW50KClbbWV0aG9kXSgpXHJcbiAgICAgIG1vcnBoZXIuZnJvbShmcm9tKVxyXG4gICAgICBtb3JwaGVyLnRvKGZyb20gKyB0bylcclxuICAgIH0sIGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgdGhpcy5lbGVtZW50KClbbWV0aG9kXShtb3JwaGVyLmF0KHBvcykpXHJcbiAgICAgIHJldHVybiBtb3JwaGVyLmRvbmUoKVxyXG4gICAgfSwgZnVuY3Rpb24gKG5ld1RvKSB7XHJcbiAgICAgIG1vcnBoZXIudG8oZnJvbSArIG5ldyBTVkdOdW1iZXIobmV3VG8pKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBSZWdpc3RlciB0aGUgbW9ycGhlciBzbyB0aGF0IGlmIGl0IGlzIGNoYW5nZWQgYWdhaW4sIHdlIGNhbiByZXRhcmdldCBpdFxyXG4gICAgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKG1ldGhvZCwgbW9ycGhlcilcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfSxcclxuXHJcbiAgX3F1ZXVlT2JqZWN0IChtZXRob2QsIHRvKSB7XHJcbiAgICAvLyBUcnkgdG8gY2hhbmdlIHRoZSB0YXJnZXQgaWYgd2UgaGF2ZSB0aGlzIG1ldGhvZCBhbHJlYWR5IHJlZ2lzdGVyZFxyXG4gICAgaWYgKHRoaXMuX3RyeVJldGFyZ2V0KG1ldGhvZCwgdG8pKSByZXR1cm4gdGhpc1xyXG5cclxuICAgIC8vIE1ha2UgYSBtb3JwaGVyIGFuZCBxdWV1ZSB0aGUgYW5pbWF0aW9uXHJcbiAgICB2YXIgbW9ycGhlciA9IG5ldyBNb3JwaGFibGUodGhpcy5fc3RlcHBlcikudG8odG8pXHJcbiAgICB0aGlzLnF1ZXVlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbW9ycGhlci5mcm9tKHRoaXMuZWxlbWVudCgpW21ldGhvZF0oKSlcclxuICAgIH0sIGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgdGhpcy5lbGVtZW50KClbbWV0aG9kXShtb3JwaGVyLmF0KHBvcykpXHJcbiAgICAgIHJldHVybiBtb3JwaGVyLmRvbmUoKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBSZWdpc3RlciB0aGUgbW9ycGhlciBzbyB0aGF0IGlmIGl0IGlzIGNoYW5nZWQgYWdhaW4sIHdlIGNhbiByZXRhcmdldCBpdFxyXG4gICAgdGhpcy5fcmVtZW1iZXJNb3JwaGVyKG1ldGhvZCwgbW9ycGhlcilcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfSxcclxuXHJcbiAgX3F1ZXVlTnVtYmVyIChtZXRob2QsIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcXVldWVPYmplY3QobWV0aG9kLCBuZXcgU1ZHTnVtYmVyKHZhbHVlKSlcclxuICB9LFxyXG5cclxuICAvLyBBbmltYXRhYmxlIGNlbnRlciB4LWF4aXNcclxuICBjeCAoeCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyKCdjeCcsIHgpXHJcbiAgfSxcclxuXHJcbiAgLy8gQW5pbWF0YWJsZSBjZW50ZXIgeS1heGlzXHJcbiAgY3kgKHkpIHtcclxuICAgIHJldHVybiB0aGlzLl9xdWV1ZU51bWJlcignY3knLCB5KVxyXG4gIH0sXHJcblxyXG4gIC8vIEFkZCBhbmltYXRhYmxlIG1vdmVcclxuICBtb3ZlICh4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy54KHgpLnkoeSlcclxuICB9LFxyXG5cclxuICAvLyBBZGQgYW5pbWF0YWJsZSBjZW50ZXJcclxuICBjZW50ZXIgKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmN4KHgpLmN5KHkpXHJcbiAgfSxcclxuXHJcbiAgLy8gQWRkIGFuaW1hdGFibGUgc2l6ZVxyXG4gIHNpemUgKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIC8vIGFuaW1hdGUgYmJveCBiYXNlZCBzaXplIGZvciBhbGwgb3RoZXIgZWxlbWVudHNcclxuICAgIHZhciBib3hcclxuXHJcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHtcclxuICAgICAgYm94ID0gdGhpcy5fZWxlbWVudC5iYm94KClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXdpZHRoKSB7XHJcbiAgICAgIHdpZHRoID0gYm94LndpZHRoIC8gYm94LmhlaWdodCAqIGhlaWdodFxyXG4gICAgfVxyXG5cclxuICAgIGlmICghaGVpZ2h0KSB7XHJcbiAgICAgIGhlaWdodCA9IGJveC5oZWlnaHQgLyBib3gud2lkdGggKiB3aWR0aFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgICAgIC53aWR0aCh3aWR0aClcclxuICAgICAgLmhlaWdodChoZWlnaHQpXHJcbiAgfSxcclxuXHJcbiAgLy8gQWRkIGFuaW1hdGFibGUgd2lkdGhcclxuICB3aWR0aCAod2lkdGgpIHtcclxuICAgIHJldHVybiB0aGlzLl9xdWV1ZU51bWJlcignd2lkdGgnLCB3aWR0aClcclxuICB9LFxyXG5cclxuICAvLyBBZGQgYW5pbWF0YWJsZSBoZWlnaHRcclxuICBoZWlnaHQgKGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlTnVtYmVyKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgfSxcclxuXHJcbiAgLy8gQWRkIGFuaW1hdGFibGUgcGxvdFxyXG4gIHBsb3QgKGEsIGIsIGMsIGQpIHtcclxuICAgIC8vIExpbmVzIGNhbiBiZSBwbG90dGVkIHdpdGggNCBhcmd1bWVudHNcclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBsb3QoWyBhLCBiLCBjLCBkIF0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX3RyeVJldGFyZ2V0KCdwbG90JywgYSkpIHJldHVybiB0aGlzXHJcblxyXG4gICAgdmFyIG1vcnBoZXIgPSBuZXcgTW9ycGhhYmxlKHRoaXMuX3N0ZXBwZXIpXHJcbiAgICAgIC50eXBlKHRoaXMuX2VsZW1lbnQuTW9ycGhBcnJheSkudG8oYSlcclxuXHJcbiAgICB0aGlzLnF1ZXVlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbW9ycGhlci5mcm9tKHRoaXMuX2VsZW1lbnQuYXJyYXkoKSlcclxuICAgIH0sIGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgdGhpcy5fZWxlbWVudC5wbG90KG1vcnBoZXIuYXQocG9zKSlcclxuICAgICAgcmV0dXJuIG1vcnBoZXIuZG9uZSgpXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuX3JlbWVtYmVyTW9ycGhlcigncGxvdCcsIG1vcnBoZXIpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH0sXHJcblxyXG4gIC8vIEFkZCBsZWFkaW5nIG1ldGhvZFxyXG4gIGxlYWRpbmcgKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcXVldWVOdW1iZXIoJ2xlYWRpbmcnLCB2YWx1ZSlcclxuICB9LFxyXG5cclxuICAvLyBBZGQgYW5pbWF0YWJsZSB2aWV3Ym94XHJcbiAgdmlld2JveCAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlT2JqZWN0KCd2aWV3Ym94JywgbmV3IEJveCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSlcclxuICB9LFxyXG5cclxuICB1cGRhdGUgKG8pIHtcclxuICAgIGlmICh0eXBlb2YgbyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKHtcclxuICAgICAgICBvZmZzZXQ6IGFyZ3VtZW50c1swXSxcclxuICAgICAgICBjb2xvcjogYXJndW1lbnRzWzFdLFxyXG4gICAgICAgIG9wYWNpdHk6IGFyZ3VtZW50c1syXVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvLm9wYWNpdHkgIT0gbnVsbCkgdGhpcy5hdHRyKCdzdG9wLW9wYWNpdHknLCBvLm9wYWNpdHkpXHJcbiAgICBpZiAoby5jb2xvciAhPSBudWxsKSB0aGlzLmF0dHIoJ3N0b3AtY29sb3InLCBvLmNvbG9yKVxyXG4gICAgaWYgKG8ub2Zmc2V0ICE9IG51bGwpIHRoaXMuYXR0cignb2Zmc2V0Jywgby5vZmZzZXQpXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcbn0pXHJcblxyXG5leHRlbmQoUnVubmVyLCB7IHJ4LCByeSwgZnJvbSwgdG8gfSlcclxucmVnaXN0ZXIoUnVubmVyKVxyXG4iLCJpbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vdXRpbHMvd2luZG93LmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgQW5pbWF0b3IgZnJvbSAnLi9BbmltYXRvci5qcydcclxuaW1wb3J0IEV2ZW50VGFyZ2V0IGZyb20gJy4uL3R5cGVzL0V2ZW50VGFyZ2V0LmpzJ1xyXG5cclxudmFyIG1ha2VTY2hlZHVsZSA9IGZ1bmN0aW9uIChydW5uZXJJbmZvKSB7XHJcbiAgdmFyIHN0YXJ0ID0gcnVubmVySW5mby5zdGFydFxyXG4gIHZhciBkdXJhdGlvbiA9IHJ1bm5lckluZm8ucnVubmVyLmR1cmF0aW9uKClcclxuICB2YXIgZW5kID0gc3RhcnQgKyBkdXJhdGlvblxyXG4gIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZHVyYXRpb246IGR1cmF0aW9uLCBlbmQ6IGVuZCwgcnVubmVyOiBydW5uZXJJbmZvLnJ1bm5lciB9XHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRTb3VyY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IHcgPSBnbG9iYWxzLndpbmRvd1xyXG4gIHJldHVybiAody5wZXJmb3JtYW5jZSB8fCB3LkRhdGUpLm5vdygpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVsaW5lIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xyXG4gIC8vIENvbnN0cnVjdCBhIG5ldyB0aW1lbGluZSBvbiB0aGUgZ2l2ZW4gZWxlbWVudFxyXG4gIGNvbnN0cnVjdG9yICh0aW1lU291cmNlID0gZGVmYXVsdFNvdXJjZSkge1xyXG4gICAgc3VwZXIoKVxyXG5cclxuICAgIHRoaXMuX3RpbWVTb3VyY2UgPSB0aW1lU291cmNlXHJcblxyXG4gICAgLy8gU3RvcmUgdGhlIHRpbWluZyB2YXJpYWJsZXNcclxuICAgIHRoaXMuX3N0YXJ0VGltZSA9IDBcclxuICAgIHRoaXMuX3NwZWVkID0gMS4wXHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lcyBob3cgbG9uZyBhIHJ1bm5lciBpcyBob2xkIGluIG1lbW9yeS4gQ2FuIGJlIGEgZHQgb3IgdHJ1ZS9mYWxzZVxyXG4gICAgdGhpcy5fcGVyc2lzdCA9IDBcclxuXHJcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBydW5uaW5nIGFuaW1hdGlvbnMgYW5kIHRoZWlyIHN0YXJ0aW5nIHBhcmFtZXRlcnNcclxuICAgIHRoaXMuX25leHRGcmFtZSA9IG51bGxcclxuICAgIHRoaXMuX3BhdXNlZCA9IHRydWVcclxuICAgIHRoaXMuX3J1bm5lcnMgPSBbXVxyXG4gICAgdGhpcy5fcnVubmVySWRzID0gW11cclxuICAgIHRoaXMuX2xhc3RSdW5uZXJJZCA9IC0xXHJcbiAgICB0aGlzLl90aW1lID0gMFxyXG4gICAgdGhpcy5fbGFzdFNvdXJjZVRpbWUgPSAwXHJcbiAgICB0aGlzLl9sYXN0U3RlcFRpbWUgPSAwXHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgc3RlcCBpcyBhbHdheXMgY2FsbGVkIGluIGNsYXNzIGNvbnRleHRcclxuICAgIHRoaXMuX3N0ZXAgPSB0aGlzLl9zdGVwRm4uYmluZCh0aGlzLCBmYWxzZSlcclxuICAgIHRoaXMuX3N0ZXBJbW1lZGlhdGUgPSB0aGlzLl9zdGVwRm4uYmluZCh0aGlzLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgLy8gc2NoZWR1bGVzIGEgcnVubmVyIG9uIHRoZSB0aW1lbGluZVxyXG4gIHNjaGVkdWxlIChydW5uZXIsIGRlbGF5LCB3aGVuKSB7XHJcbiAgICBpZiAocnVubmVyID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3J1bm5lcnMubWFwKG1ha2VTY2hlZHVsZSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGUgc3RhcnQgdGltZSBmb3IgdGhlIG5leHQgYW5pbWF0aW9uIGNhbiBlaXRoZXIgYmUgZ2l2ZW4gZXhwbGljaXRseSxcclxuICAgIC8vIGRlcml2ZWQgZnJvbSB0aGUgY3VycmVudCB0aW1lbGluZSB0aW1lIG9yIGl0IGNhbiBiZSByZWxhdGl2ZSB0byB0aGVcclxuICAgIC8vIGxhc3Qgc3RhcnQgdGltZSB0byBjaGFpbiBhbmltYXRpb25zIGRpcmVjbHR5XHJcblxyXG4gICAgdmFyIGFic29sdXRlU3RhcnRUaW1lID0gMFxyXG4gICAgdmFyIGVuZFRpbWUgPSB0aGlzLmdldEVuZFRpbWUoKVxyXG4gICAgZGVsYXkgPSBkZWxheSB8fCAwXHJcblxyXG4gICAgLy8gV29yayBvdXQgd2hlbiB0byBzdGFydCB0aGUgYW5pbWF0aW9uXHJcbiAgICBpZiAod2hlbiA9PSBudWxsIHx8IHdoZW4gPT09ICdsYXN0JyB8fCB3aGVuID09PSAnYWZ0ZXInKSB7XHJcbiAgICAgIC8vIFRha2UgdGhlIGxhc3QgdGltZSBhbmQgaW5jcmVtZW50XHJcbiAgICAgIGFic29sdXRlU3RhcnRUaW1lID0gZW5kVGltZVxyXG4gICAgfSBlbHNlIGlmICh3aGVuID09PSAnYWJzb2x1dGUnIHx8IHdoZW4gPT09ICdzdGFydCcpIHtcclxuICAgICAgYWJzb2x1dGVTdGFydFRpbWUgPSBkZWxheVxyXG4gICAgICBkZWxheSA9IDBcclxuICAgIH0gZWxzZSBpZiAod2hlbiA9PT0gJ25vdycpIHtcclxuICAgICAgYWJzb2x1dGVTdGFydFRpbWUgPSB0aGlzLl90aW1lXHJcbiAgICB9IGVsc2UgaWYgKHdoZW4gPT09ICdyZWxhdGl2ZScpIHtcclxuICAgICAgbGV0IHJ1bm5lckluZm8gPSB0aGlzLl9ydW5uZXJzW3J1bm5lci5pZF1cclxuICAgICAgaWYgKHJ1bm5lckluZm8pIHtcclxuICAgICAgICBhYnNvbHV0ZVN0YXJ0VGltZSA9IHJ1bm5lckluZm8uc3RhcnQgKyBkZWxheVxyXG4gICAgICAgIGRlbGF5ID0gMFxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgZm9yIHRoZSBcIndoZW5cIiBwYXJhbWV0ZXInKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1hbmFnZSBydW5uZXJcclxuICAgIHJ1bm5lci51bnNjaGVkdWxlKClcclxuICAgIHJ1bm5lci50aW1lbGluZSh0aGlzKVxyXG5cclxuICAgIGNvbnN0IHBlcnNpc3QgPSBydW5uZXIucGVyc2lzdCgpXHJcbiAgICBjb25zdCBydW5uZXJJbmZvID0ge1xyXG4gICAgICBwZXJzaXN0OiBwZXJzaXN0ID09PSBudWxsID8gdGhpcy5fcGVyc2lzdCA6IHBlcnNpc3QsXHJcbiAgICAgIHN0YXJ0OiBhYnNvbHV0ZVN0YXJ0VGltZSArIGRlbGF5LFxyXG4gICAgICBydW5uZXJcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9sYXN0UnVubmVySWQgPSBydW5uZXIuaWRcclxuXHJcbiAgICB0aGlzLl9ydW5uZXJzLnB1c2gocnVubmVySW5mbylcclxuICAgIHRoaXMuX3J1bm5lcnMuc29ydCgoYSwgYikgPT4gYS5zdGFydCAtIGIuc3RhcnQpXHJcbiAgICB0aGlzLl9ydW5uZXJJZHMgPSB0aGlzLl9ydW5uZXJzLm1hcChpbmZvID0+IGluZm8ucnVubmVyLmlkKVxyXG5cclxuICAgIHRoaXMudXBkYXRlVGltZSgpLl9jb250aW51ZSgpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLy8gUmVtb3ZlIHRoZSBydW5uZXIgZnJvbSB0aGlzIHRpbWVsaW5lXHJcbiAgdW5zY2hlZHVsZSAocnVubmVyKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLl9ydW5uZXJJZHMuaW5kZXhPZihydW5uZXIuaWQpXHJcbiAgICBpZiAoaW5kZXggPCAwKSByZXR1cm4gdGhpc1xyXG5cclxuICAgIHRoaXMuX3J1bm5lcnMuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgdGhpcy5fcnVubmVySWRzLnNwbGljZShpbmRleCwgMSlcclxuXHJcbiAgICBydW5uZXIudGltZWxpbmUobnVsbClcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBDYWxjdWxhdGVzIHRoZSBlbmQgb2YgdGhlIHRpbWVsaW5lXHJcbiAgZ2V0RW5kVGltZSAoKSB7XHJcbiAgICB2YXIgbGFzdFJ1bm5lckluZm8gPSB0aGlzLl9ydW5uZXJzW3RoaXMuX3J1bm5lcklkcy5pbmRleE9mKHRoaXMuX2xhc3RSdW5uZXJJZCldXHJcbiAgICB2YXIgbGFzdER1cmF0aW9uID0gbGFzdFJ1bm5lckluZm8gPyBsYXN0UnVubmVySW5mby5ydW5uZXIuZHVyYXRpb24oKSA6IDBcclxuICAgIHZhciBsYXN0U3RhcnRUaW1lID0gbGFzdFJ1bm5lckluZm8gPyBsYXN0UnVubmVySW5mby5zdGFydCA6IDBcclxuICAgIHJldHVybiBsYXN0U3RhcnRUaW1lICsgbGFzdER1cmF0aW9uXHJcbiAgfVxyXG5cclxuICAvLyBNYWtlcyBzdXJlLCB0aGF0IGFmdGVyIHBhdXNpbmcgdGhlIHRpbWUgZG9lc24ndCBqdW1wXHJcbiAgdXBkYXRlVGltZSAoKSB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlKCkpIHtcclxuICAgICAgdGhpcy5fbGFzdFNvdXJjZVRpbWUgPSB0aGlzLl90aW1lU291cmNlKClcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBwbGF5ICgpIHtcclxuICAgIC8vIE5vdyBtYWtlIHN1cmUgd2UgYXJlIG5vdCBwYXVzZWQgYW5kIGNvbnRpbnVlIHRoZSBhbmltYXRpb25cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlXHJcbiAgICByZXR1cm4gdGhpcy51cGRhdGVUaW1lKCkuX2NvbnRpbnVlKClcclxuICB9XHJcblxyXG4gIHBhdXNlICgpIHtcclxuICAgIHRoaXMuX3BhdXNlZCA9IHRydWVcclxuICAgIHJldHVybiB0aGlzLl9jb250aW51ZSgpXHJcbiAgfVxyXG5cclxuICBzdG9wICgpIHtcclxuICAgIC8vIEdvIHRvIHN0YXJ0IGFuZCBwYXVzZVxyXG4gICAgdGhpcy50aW1lKDApXHJcbiAgICByZXR1cm4gdGhpcy5wYXVzZSgpXHJcbiAgfVxyXG5cclxuICBmaW5pc2ggKCkge1xyXG4gICAgLy8gR28gdG8gZW5kIGFuZCBwYXVzZVxyXG4gICAgdGhpcy50aW1lKHRoaXMuZ2V0RW5kVGltZSgpICsgMSlcclxuICAgIHJldHVybiB0aGlzLnBhdXNlKClcclxuICB9XHJcblxyXG4gIHNwZWVkIChzcGVlZCkge1xyXG4gICAgaWYgKHNwZWVkID09IG51bGwpIHJldHVybiB0aGlzLl9zcGVlZFxyXG4gICAgdGhpcy5fc3BlZWQgPSBzcGVlZFxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIHJldmVyc2UgKHllcykge1xyXG4gICAgdmFyIGN1cnJlbnRTcGVlZCA9IHRoaXMuc3BlZWQoKVxyXG4gICAgaWYgKHllcyA9PSBudWxsKSByZXR1cm4gdGhpcy5zcGVlZCgtY3VycmVudFNwZWVkKVxyXG5cclxuICAgIHZhciBwb3NpdGl2ZSA9IE1hdGguYWJzKGN1cnJlbnRTcGVlZClcclxuICAgIHJldHVybiB0aGlzLnNwZWVkKHllcyA/IHBvc2l0aXZlIDogLXBvc2l0aXZlKVxyXG4gIH1cclxuXHJcbiAgc2VlayAoZHQpIHtcclxuICAgIHJldHVybiB0aGlzLnRpbWUodGhpcy5fdGltZSArIGR0KVxyXG4gIH1cclxuXHJcbiAgdGltZSAodGltZSkge1xyXG4gICAgaWYgKHRpbWUgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX3RpbWVcclxuICAgIHRoaXMuX3RpbWUgPSB0aW1lXHJcbiAgICByZXR1cm4gdGhpcy5fY29udGludWUodHJ1ZSlcclxuICB9XHJcblxyXG4gIHBlcnNpc3QgKGR0T3JGb3JldmVyKSB7XHJcbiAgICBpZiAoZHRPckZvcmV2ZXIgPT0gbnVsbCkgcmV0dXJuIHRoaXMuX3BlcnNpc3RcclxuICAgIHRoaXMuX3BlcnNpc3QgPSBkdE9yRm9yZXZlclxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIHNvdXJjZSAoZm4pIHtcclxuICAgIGlmIChmbiA9PSBudWxsKSByZXR1cm4gdGhpcy5fdGltZVNvdXJjZVxyXG4gICAgdGhpcy5fdGltZVNvdXJjZSA9IGZuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgX3N0ZXBGbiAoaW1tZWRpYXRlU3RlcCA9IGZhbHNlKSB7XHJcbiAgICAvLyBHZXQgdGhlIHRpbWUgZGVsdGEgZnJvbSB0aGUgbGFzdCB0aW1lIGFuZCB1cGRhdGUgdGhlIHRpbWVcclxuICAgIHZhciB0aW1lID0gdGhpcy5fdGltZVNvdXJjZSgpXHJcbiAgICB2YXIgZHRTb3VyY2UgPSB0aW1lIC0gdGhpcy5fbGFzdFNvdXJjZVRpbWVcclxuXHJcbiAgICBpZiAoaW1tZWRpYXRlU3RlcCkgZHRTb3VyY2UgPSAwXHJcblxyXG4gICAgdmFyIGR0VGltZSA9IHRoaXMuX3NwZWVkICogZHRTb3VyY2UgKyAodGhpcy5fdGltZSAtIHRoaXMuX2xhc3RTdGVwVGltZSlcclxuICAgIHRoaXMuX2xhc3RTb3VyY2VUaW1lID0gdGltZVxyXG5cclxuICAgIC8vIE9ubHkgdXBkYXRlIHRoZSB0aW1lIGlmIHdlIHVzZSB0aGUgdGltZVNvdXJjZS5cclxuICAgIC8vIE90aGVyd2lzZSB1c2UgdGhlIGN1cnJlbnQgdGltZVxyXG4gICAgaWYgKCFpbW1lZGlhdGVTdGVwKSB7XHJcbiAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZVxyXG4gICAgICB0aGlzLl90aW1lICs9IGR0VGltZVxyXG4gICAgICB0aGlzLl90aW1lID0gdGhpcy5fdGltZSA8IDAgPyAwIDogdGhpcy5fdGltZVxyXG4gICAgfVxyXG4gICAgdGhpcy5fbGFzdFN0ZXBUaW1lID0gdGhpcy5fdGltZVxyXG4gICAgdGhpcy5maXJlKCd0aW1lJywgdGhpcy5fdGltZSlcclxuXHJcbiAgICAvLyBUaGlzIGlzIGZvciB0aGUgY2FzZSB0aGF0IHRoZSB0aW1lbGluZSB3YXMgc2Vla2VkIHNvIHRoYXQgdGhlIHRpbWVcclxuICAgIC8vIGlzIG5vdyBiZWZvcmUgdGhlIHN0YXJ0VGltZSBvZiB0aGUgcnVubmVyLiBUaGF0cyB3aHkgd2UgbmVlZCB0byBzZXRcclxuICAgIC8vIHRoZSBydW5uZXIgdG8gcG9zaXRpb24gMFxyXG5cclxuICAgIC8vIEZJWE1FOlxyXG4gICAgLy8gSG93ZXZlciwgcmVzZXRpbmcgaW4gaW5zZXJ0aW9uIG9yZGVyIGxlYWRzIHRvIGJ1Z3MuIENvbnNpZGVyaW5nIHRoZSBjYXNlLFxyXG4gICAgLy8gd2hlcmUgMiBydW5uZXJzIGNoYW5nZSB0aGUgc2FtZSBhdHRyaXV0ZSBidXQgaW4gZGlmZmVyZW50IHRpbWVzLFxyXG4gICAgLy8gcmVzZXRpbmcgYm90aCBvZiB0aGVtIHdpbGwgbGVhZCB0byB0aGUgY2FzZSB3aGVyZSB0aGUgbGF0ZXIgZGVmaW5lZFxyXG4gICAgLy8gcnVubmVyIGFsd2F5cyB3aW5zIHRoZSByZXNldCBldmVuIGlmIHRoZSBvdGhlciBydW5uZXIgc3RhcnRlZCBlYXJsaWVyXHJcbiAgICAvLyBhbmQgdGhlcmVmb3JlIHNob3VsZCB3aW4gdGhlIGF0dHJpYnV0ZSBiYXR0bGVcclxuICAgIC8vIHRoaXMgY2FuIGJlIHNvbHZlZCBieSByZXNldGluZyB0aGVtIGJhY2t3YXJkc1xyXG4gICAgZm9yICh2YXIgayA9IHRoaXMuX3J1bm5lcnMubGVuZ3RoOyBrLS07KSB7XHJcbiAgICAgIC8vIEdldCBhbmQgcnVuIHRoZSBjdXJyZW50IHJ1bm5lciBhbmQgaWdub3JlIGl0IGlmIGl0cyBpbmFjdGl2ZVxyXG4gICAgICBsZXQgcnVubmVySW5mbyA9IHRoaXMuX3J1bm5lcnNba11cclxuICAgICAgbGV0IHJ1bm5lciA9IHJ1bm5lckluZm8ucnVubmVyXHJcblxyXG4gICAgICAvLyBNYWtlIHN1cmUgdGhhdCB3ZSBnaXZlIHRoZSBhY3R1YWwgZGlmZmVyZW5jZVxyXG4gICAgICAvLyBiZXR3ZWVuIHJ1bm5lciBzdGFydCB0aW1lIGFuZCBub3dcclxuICAgICAgbGV0IGR0VG9TdGFydCA9IHRoaXMuX3RpbWUgLSBydW5uZXJJbmZvLnN0YXJ0XHJcblxyXG4gICAgICAvLyBEb250IHJ1biBydW5uZXIgaWYgbm90IHN0YXJ0ZWQgeWV0XHJcbiAgICAgIC8vIGFuZCB0cnkgdG8gcmVzZXQgaXRcclxuICAgICAgaWYgKGR0VG9TdGFydCA8PSAwKSB7XHJcbiAgICAgICAgcnVubmVyLnJlc2V0KClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJ1biBhbGwgb2YgdGhlIHJ1bm5lcnMgZGlyZWN0bHlcclxuICAgIHZhciBydW5uZXJzTGVmdCA9IGZhbHNlXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5fcnVubmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAvLyBHZXQgYW5kIHJ1biB0aGUgY3VycmVudCBydW5uZXIgYW5kIGlnbm9yZSBpdCBpZiBpdHMgaW5hY3RpdmVcclxuICAgICAgbGV0IHJ1bm5lckluZm8gPSB0aGlzLl9ydW5uZXJzW2ldXHJcbiAgICAgIGxldCBydW5uZXIgPSBydW5uZXJJbmZvLnJ1bm5lclxyXG4gICAgICBsZXQgZHQgPSBkdFRpbWVcclxuXHJcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlIGdpdmUgdGhlIGFjdHVhbCBkaWZmZXJlbmNlXHJcbiAgICAgIC8vIGJldHdlZW4gcnVubmVyIHN0YXJ0IHRpbWUgYW5kIG5vd1xyXG4gICAgICBsZXQgZHRUb1N0YXJ0ID0gdGhpcy5fdGltZSAtIHJ1bm5lckluZm8uc3RhcnRcclxuXHJcbiAgICAgIC8vIERvbnQgcnVuIHJ1bm5lciBpZiBub3Qgc3RhcnRlZCB5ZXRcclxuICAgICAgaWYgKGR0VG9TdGFydCA8PSAwKSB7XHJcbiAgICAgICAgcnVubmVyc0xlZnQgPSB0cnVlXHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfSBlbHNlIGlmIChkdFRvU3RhcnQgPCBkdCkge1xyXG4gICAgICAgIC8vIEFkanVzdCBkdCB0byBtYWtlIHN1cmUgdGhhdCBhbmltYXRpb24gaXMgb24gcG9pbnRcclxuICAgICAgICBkdCA9IGR0VG9TdGFydFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXJ1bm5lci5hY3RpdmUoKSkgY29udGludWVcclxuXHJcbiAgICAgIC8vIElmIHRoaXMgcnVubmVyIGlzIHN0aWxsIGdvaW5nLCBzaWduYWwgdGhhdCB3ZSBuZWVkIGFub3RoZXIgYW5pbWF0aW9uXHJcbiAgICAgIC8vIGZyYW1lLCBvdGhlcndpc2UsIHJlbW92ZSB0aGUgY29tcGxldGVkIHJ1bm5lclxyXG4gICAgICB2YXIgZmluaXNoZWQgPSBydW5uZXIuc3RlcChkdCkuZG9uZVxyXG4gICAgICBpZiAoIWZpbmlzaGVkKSB7XHJcbiAgICAgICAgcnVubmVyc0xlZnQgPSB0cnVlXHJcbiAgICAgICAgLy8gY29udGludWVcclxuICAgICAgfSBlbHNlIGlmIChydW5uZXJJbmZvLnBlcnNpc3QgIT09IHRydWUpIHtcclxuICAgICAgICAvLyBydW5uZXIgaXMgZmluaXNoZWQuIEFuZCBydW5uZXIgbWlnaHQgZ2V0IHJlbW92ZWRcclxuICAgICAgICB2YXIgZW5kVGltZSA9IHJ1bm5lci5kdXJhdGlvbigpIC0gcnVubmVyLnRpbWUoKSArIHRoaXMuX3RpbWVcclxuXHJcbiAgICAgICAgaWYgKGVuZFRpbWUgKyBydW5uZXJJbmZvLnBlcnNpc3QgPCB0aGlzLl90aW1lKSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgcnVubmVyIGFuZCBjb3JyZWN0IGluZGV4XHJcbiAgICAgICAgICBydW5uZXIudW5zY2hlZHVsZSgpXHJcbiAgICAgICAgICAtLWlcclxuICAgICAgICAgIC0tbGVuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmFzaWNhbGx5OiB3ZSBjb250aW51ZSB3aGVuIHRoZXJlIGFyZSBydW5uZXJzIHJpZ2h0IGZyb20gdXMgaW4gdGltZVxyXG4gICAgLy8gd2hlbiAtLT4sIGFuZCB3aGVuIHJ1bm5lcnMgYXJlIGxlZnQgZnJvbSB1cyB3aGVuIDwtLVxyXG4gICAgaWYgKChydW5uZXJzTGVmdCAmJiAhKHRoaXMuX3NwZWVkIDwgMCAmJiB0aGlzLl90aW1lID09PSAwKSkgfHwgKHRoaXMuX3J1bm5lcklkcy5sZW5ndGggJiYgdGhpcy5fc3BlZWQgPCAwICYmIHRoaXMuX3RpbWUgPiAwKSkge1xyXG4gICAgICB0aGlzLl9jb250aW51ZSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhdXNlKClcclxuICAgICAgdGhpcy5maXJlKCdmaW5pc2hlZCcpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIENoZWNrcyBpZiB3ZSBhcmUgcnVubmluZyBhbmQgY29udGludWVzIHRoZSBhbmltYXRpb25cclxuICBfY29udGludWUgKGltbWVkaWF0ZVN0ZXAgPSBmYWxzZSkge1xyXG4gICAgQW5pbWF0b3IuY2FuY2VsRnJhbWUodGhpcy5fbmV4dEZyYW1lKVxyXG4gICAgdGhpcy5fbmV4dEZyYW1lID0gbnVsbFxyXG5cclxuICAgIGlmIChpbW1lZGlhdGVTdGVwKSByZXR1cm4gdGhpcy5fc3RlcEltbWVkaWF0ZSgpXHJcbiAgICBpZiAodGhpcy5fcGF1c2VkKSByZXR1cm4gdGhpc1xyXG5cclxuICAgIHRoaXMuX25leHRGcmFtZSA9IEFuaW1hdG9yLmZyYW1lKHRoaXMuX3N0ZXApXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgYWN0aXZlICgpIHtcclxuICAgIHJldHVybiAhIXRoaXMuX25leHRGcmFtZVxyXG4gIH1cclxufVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBFbGVtZW50OiB7XHJcbiAgICB0aW1lbGluZTogZnVuY3Rpb24gKHRpbWVsaW5lKSB7XHJcbiAgICAgIGlmICh0aW1lbGluZSA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZWxpbmUgPSAodGhpcy5fdGltZWxpbmUgfHwgbmV3IFRpbWVsaW5lKCkpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVsaW5lXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fdGltZWxpbmUgPSB0aW1lbGluZVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuaW1wb3J0IHsgeGxpbmsgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvbmFtZXNwYWNlcy5qcydcclxuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEEgZXh0ZW5kcyBDb250YWluZXIge1xyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ2EnLCBub2RlKSwgbm9kZSlcclxuICB9XHJcblxyXG4gIC8vIExpbmsgdXJsXHJcbiAgdG8gKHVybCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0cignaHJlZicsIHVybCwgeGxpbmspXHJcbiAgfVxyXG5cclxuICAvLyBMaW5rIHRhcmdldCBhdHRyaWJ1dGVcclxuICB0YXJnZXQgKHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0cigndGFyZ2V0JywgdGFyZ2V0KVxyXG4gIH1cclxufVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBDb250YWluZXI6IHtcclxuICAgIC8vIENyZWF0ZSBhIGh5cGVybGluayBlbGVtZW50XHJcbiAgICBsaW5rOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgQSgpKS50byh1cmwpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgRWxlbWVudDoge1xyXG4gICAgLy8gQ3JlYXRlIGEgaHlwZXJsaW5rIGVsZW1lbnRcclxuICAgIGxpbmtUbzogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICB2YXIgbGluayA9IG5ldyBBKClcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgdXJsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdXJsLmNhbGwobGluaywgbGluaylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsaW5rLnRvKHVybClcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50KCkucHV0KGxpbmspLnB1dCh0aGlzKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbnJlZ2lzdGVyKEEpXHJcbiIsImltcG9ydCB7IGN4LCBjeSwgaGVpZ2h0LCB3aWR0aCwgeCwgeSB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9jaXJjbGVkLmpzJ1xyXG5pbXBvcnQge1xyXG4gIGV4dGVuZCxcclxuICBub2RlT3JOZXcsXHJcbiAgcmVnaXN0ZXIsXHJcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcclxufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uL3R5cGVzL1NWR051bWJlci5qcydcclxuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGUgZXh0ZW5kcyBTaGFwZSB7XHJcbiAgY29uc3RydWN0b3IgKG5vZGUpIHtcclxuICAgIHN1cGVyKG5vZGVPck5ldygnY2lyY2xlJywgbm9kZSksIG5vZGUpXHJcbiAgfVxyXG5cclxuICByYWRpdXMgKHIpIHtcclxuICAgIHJldHVybiB0aGlzLmF0dHIoJ3InLCByKVxyXG4gIH1cclxuXHJcbiAgLy8gUmFkaXVzIHggdmFsdWVcclxuICByeCAocngpIHtcclxuICAgIHJldHVybiB0aGlzLmF0dHIoJ3InLCByeClcclxuICB9XHJcblxyXG4gIC8vIEFsaWFzIHJhZGl1cyB4IHZhbHVlXHJcbiAgcnkgKHJ5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5yeChyeSlcclxuICB9XHJcblxyXG4gIHNpemUgKHNpemUpIHtcclxuICAgIHJldHVybiB0aGlzLnJhZGl1cyhuZXcgU1ZHTnVtYmVyKHNpemUpLmRpdmlkZSgyKSlcclxuICB9XHJcbn1cclxuXHJcbmV4dGVuZChDaXJjbGUsIHsgeCwgeSwgY3gsIGN5LCB3aWR0aCwgaGVpZ2h0IH0pXHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoe1xyXG4gIENvbnRhaW5lcjoge1xyXG4gICAgLy8gQ3JlYXRlIGNpcmNsZSBlbGVtZW50XHJcbiAgICBjaXJjbGU6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgQ2lyY2xlKCkpXHJcbiAgICAgICAgLnNpemUoc2l6ZSlcclxuICAgICAgICAubW92ZSgwLCAwKVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG5yZWdpc3RlcihDaXJjbGUpXHJcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcclxuaW1wb3J0IGJhc2VGaW5kIGZyb20gJy4uL21vZHVsZXMvY29yZS9zZWxlY3Rvci5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaXBQYXRoIGV4dGVuZHMgQ29udGFpbmVyIHtcclxuICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgc3VwZXIobm9kZU9yTmV3KCdjbGlwUGF0aCcsIG5vZGUpLCBub2RlKVxyXG4gIH1cclxuXHJcbiAgLy8gVW5jbGlwIGFsbCBjbGlwcGVkIGVsZW1lbnRzIGFuZCByZW1vdmUgaXRzZWxmXHJcbiAgcmVtb3ZlICgpIHtcclxuICAgIC8vIHVuY2xpcCBhbGwgdGFyZ2V0c1xyXG4gICAgdGhpcy50YXJnZXRzKCkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwudW5jbGlwKClcclxuICAgIH0pXHJcblxyXG4gICAgLy8gcmVtb3ZlIGNsaXBQYXRoIGZyb20gcGFyZW50XHJcbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlKClcclxuICB9XHJcblxyXG4gIHRhcmdldHMgKCkge1xyXG4gICAgcmV0dXJuIGJhc2VGaW5kKCdzdmcgW2NsaXAtcGF0aCo9XCInICsgdGhpcy5pZCgpICsgJ1wiXScpXHJcbiAgfVxyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoe1xyXG4gIENvbnRhaW5lcjoge1xyXG4gICAgLy8gQ3JlYXRlIGNsaXBwaW5nIGVsZW1lbnRcclxuICAgIGNsaXA6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLnB1dChuZXcgQ2xpcFBhdGgoKSlcclxuICAgIH0pXHJcbiAgfSxcclxuICBFbGVtZW50OiB7XHJcbiAgICAvLyBEaXN0cmlidXRlIGNsaXBQYXRoIHRvIHN2ZyBlbGVtZW50XHJcbiAgICBjbGlwV2l0aCAoZWxlbWVudCkge1xyXG4gICAgICAvLyB1c2UgZ2l2ZW4gY2xpcCBvciBjcmVhdGUgYSBuZXcgb25lXHJcbiAgICAgIGxldCBjbGlwcGVyID0gZWxlbWVudCBpbnN0YW5jZW9mIENsaXBQYXRoXHJcbiAgICAgICAgPyBlbGVtZW50XHJcbiAgICAgICAgOiB0aGlzLnBhcmVudCgpLmNsaXAoKS5hZGQoZWxlbWVudClcclxuXHJcbiAgICAgIC8vIGFwcGx5IG1hc2tcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cignY2xpcC1wYXRoJywgJ3VybChcIiMnICsgY2xpcHBlci5pZCgpICsgJ1wiKScpXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFVuY2xpcCBlbGVtZW50XHJcbiAgICB1bmNsaXAgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdjbGlwLXBhdGgnLCBudWxsKVxyXG4gICAgfSxcclxuXHJcbiAgICBjbGlwcGVyICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVmZXJlbmNlKCdjbGlwLXBhdGgnKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbnJlZ2lzdGVyKENsaXBQYXRoKVxyXG4iLCJpbXBvcnQgeyByZWdpc3RlciB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXHJcbmltcG9ydCBFbGVtZW50IGZyb20gJy4vRWxlbWVudC5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhaW5lciBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGZsYXR0ZW4gKHBhcmVudCkge1xyXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDb250YWluZXIpIHJldHVybiB0aGlzLmZsYXR0ZW4ocGFyZW50KS51bmdyb3VwKHBhcmVudClcclxuICAgICAgcmV0dXJuIHRoaXMudG9QYXJlbnQocGFyZW50KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyB3ZSBuZWVkIHRoaXMgc28gdGhhdCB0aGUgcm9vdCBkb2VzIG5vdCBnZXQgcmVtb3ZlZFxyXG4gICAgdGhpcy5ub2RlLmZpcnN0RWxlbWVudENoaWxkIHx8IHRoaXMucmVtb3ZlKClcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgdW5ncm91cCAocGFyZW50KSB7XHJcbiAgICBwYXJlbnQgPSBwYXJlbnQgfHwgdGhpcy5wYXJlbnQoKVxyXG5cclxuICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRvUGFyZW50KHBhcmVudClcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5yZW1vdmUoKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG59XHJcblxyXG5yZWdpc3RlcihDb250YWluZXIpXHJcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmcyBleHRlbmRzIENvbnRhaW5lciB7XHJcbiAgY29uc3RydWN0b3IgKG5vZGUpIHtcclxuICAgIHN1cGVyKG5vZGVPck5ldygnZGVmcycsIG5vZGUpLCBub2RlKVxyXG4gIH1cclxuXHJcbiAgZmxhdHRlbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuICB1bmdyb3VwICgpIHtcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG59XHJcblxyXG5yZWdpc3RlcihEZWZzKVxyXG4iLCJpbXBvcnQge1xyXG4gIGFkb3B0LFxyXG4gIGFzc2lnbk5ld0lkLFxyXG4gIGVpZCxcclxuICBleHRlbmQsXHJcbiAgbWFrZUluc3RhbmNlLFxyXG4gIGNyZWF0ZSxcclxuICByZWdpc3RlclxyXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXHJcbmltcG9ydCB7IGZpbmQsIGZpbmRPbmUgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvc2VsZWN0b3IuanMnXHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xyXG5pbXBvcnQgeyBucyB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9uYW1lc3BhY2VzLmpzJ1xyXG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSAnLi4vdHlwZXMvRXZlbnRUYXJnZXQuanMnXHJcbmltcG9ydCBMaXN0IGZyb20gJy4uL3R5cGVzL0xpc3QuanMnXHJcbmltcG9ydCBhdHRyIGZyb20gJy4uL21vZHVsZXMvY29yZS9hdHRyLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xyXG4gIGNvbnN0cnVjdG9yIChub2RlLCBhdHRycykge1xyXG4gICAgc3VwZXIobm9kZSlcclxuICAgIHRoaXMubm9kZSA9IG5vZGVcclxuICAgIHRoaXMudHlwZSA9IG5vZGUubm9kZU5hbWVcclxuXHJcbiAgICBpZiAoYXR0cnMgJiYgbm9kZSAhPT0gYXR0cnMpIHtcclxuICAgICAgdGhpcy5hdHRyKGF0dHJzKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQWRkIGdpdmVuIGVsZW1lbnQgYXQgYSBwb3NpdGlvblxyXG4gIGFkZCAoZWxlbWVudCwgaSkge1xyXG4gICAgZWxlbWVudCA9IG1ha2VJbnN0YW5jZShlbGVtZW50KVxyXG5cclxuICAgIGlmIChpID09IG51bGwpIHtcclxuICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKGVsZW1lbnQubm9kZSlcclxuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5ub2RlICE9PSB0aGlzLm5vZGUuY2hpbGROb2Rlc1tpXSkge1xyXG4gICAgICB0aGlzLm5vZGUuaW5zZXJ0QmVmb3JlKGVsZW1lbnQubm9kZSwgdGhpcy5ub2RlLmNoaWxkTm9kZXNbaV0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIEFkZCBlbGVtZW50IHRvIGdpdmVuIGNvbnRhaW5lciBhbmQgcmV0dXJuIHNlbGZcclxuICBhZGRUbyAocGFyZW50KSB7XHJcbiAgICByZXR1cm4gbWFrZUluc3RhbmNlKHBhcmVudCkucHV0KHRoaXMpXHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm5zIGFsbCBjaGlsZCBlbGVtZW50c1xyXG4gIGNoaWxkcmVuICgpIHtcclxuICAgIHJldHVybiBuZXcgTGlzdChtYXAodGhpcy5ub2RlLmNoaWxkcmVuLCBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICByZXR1cm4gYWRvcHQobm9kZSlcclxuICAgIH0pKVxyXG4gIH1cclxuXHJcbiAgLy8gUmVtb3ZlIGFsbCBlbGVtZW50cyBpbiB0aGlzIGNvbnRhaW5lclxyXG4gIGNsZWFyICgpIHtcclxuICAgIC8vIHJlbW92ZSBjaGlsZHJlblxyXG4gICAgd2hpbGUgKHRoaXMubm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZS5sYXN0Q2hpbGQpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIENsb25lIGVsZW1lbnRcclxuICBjbG9uZSAoKSB7XHJcbiAgICAvLyB3cml0ZSBkb20gZGF0YSB0byB0aGUgZG9tIHNvIHRoZSBjbG9uZSBjYW4gcGlja3VwIHRoZSBkYXRhXHJcbiAgICB0aGlzLndyaXRlRGF0YVRvRG9tKClcclxuXHJcbiAgICAvLyBjbG9uZSBlbGVtZW50IGFuZCBhc3NpZ24gbmV3IGlkXHJcbiAgICByZXR1cm4gYXNzaWduTmV3SWQodGhpcy5ub2RlLmNsb25lTm9kZSh0cnVlKSlcclxuICB9XHJcblxyXG4gIC8vIEl0ZXJhdGVzIG92ZXIgYWxsIGNoaWxkcmVuIGFuZCBpbnZva2VzIGEgZ2l2ZW4gYmxvY2tcclxuICBlYWNoIChibG9jaywgZGVlcCkge1xyXG4gICAgdmFyIGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbigpXHJcbiAgICB2YXIgaSwgaWxcclxuXHJcbiAgICBmb3IgKGkgPSAwLCBpbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcclxuICAgICAgYmxvY2suYXBwbHkoY2hpbGRyZW5baV0sIFsgaSwgY2hpbGRyZW4gXSlcclxuXHJcbiAgICAgIGlmIChkZWVwKSB7XHJcbiAgICAgICAgY2hpbGRyZW5baV0uZWFjaChibG9jaywgZGVlcClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBlbGVtZW50IChub2RlTmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucHV0KG5ldyBEb20oY3JlYXRlKG5vZGVOYW1lKSkpXHJcbiAgfVxyXG5cclxuICAvLyBHZXQgZmlyc3QgY2hpbGRcclxuICBmaXJzdCAoKSB7XHJcbiAgICByZXR1cm4gYWRvcHQodGhpcy5ub2RlLmZpcnN0Q2hpbGQpXHJcbiAgfVxyXG5cclxuICAvLyBHZXQgYSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleFxyXG4gIGdldCAoaSkge1xyXG4gICAgcmV0dXJuIGFkb3B0KHRoaXMubm9kZS5jaGlsZE5vZGVzW2ldKVxyXG4gIH1cclxuXHJcbiAgZ2V0RXZlbnRIb2xkZXIgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZVxyXG4gIH1cclxuXHJcbiAgZ2V0RXZlbnRUYXJnZXQgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZVxyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2tzIGlmIHRoZSBnaXZlbiBlbGVtZW50IGlzIGEgY2hpbGRcclxuICBoYXMgKGVsZW1lbnQpIHtcclxuICAgIHJldHVybiB0aGlzLmluZGV4KGVsZW1lbnQpID49IDBcclxuICB9XHJcblxyXG4gIC8vIEdldCAvIHNldCBpZFxyXG4gIGlkIChpZCkge1xyXG4gICAgLy8gZ2VuZXJhdGUgbmV3IGlkIGlmIG5vIGlkIHNldFxyXG4gICAgaWYgKHR5cGVvZiBpZCA9PT0gJ3VuZGVmaW5lZCcgJiYgIXRoaXMubm9kZS5pZCkge1xyXG4gICAgICB0aGlzLm5vZGUuaWQgPSBlaWQodGhpcy50eXBlKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRvbnQndCBzZXQgZGlyZWN0bHkgd2lkdGggdGhpcy5ub2RlLmlkIHRvIG1ha2UgYG51bGxgIHdvcmsgY29ycmVjdGx5XHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdpZCcsIGlkKVxyXG4gIH1cclxuXHJcbiAgLy8gR2V0cyBpbmRleCBvZiBnaXZlbiBlbGVtZW50XHJcbiAgaW5kZXggKGVsZW1lbnQpIHtcclxuICAgIHJldHVybiBbXS5zbGljZS5jYWxsKHRoaXMubm9kZS5jaGlsZE5vZGVzKS5pbmRleE9mKGVsZW1lbnQubm9kZSlcclxuICB9XHJcblxyXG4gIC8vIEdldCB0aGUgbGFzdCBjaGlsZFxyXG4gIGxhc3QgKCkge1xyXG4gICAgcmV0dXJuIGFkb3B0KHRoaXMubm9kZS5sYXN0Q2hpbGQpXHJcbiAgfVxyXG5cclxuICAvLyBtYXRjaGVzIHRoZSBlbGVtZW50IHZzIGEgY3NzIHNlbGVjdG9yXHJcbiAgbWF0Y2hlcyAoc2VsZWN0b3IpIHtcclxuICAgIGNvbnN0IGVsID0gdGhpcy5ub2RlXHJcbiAgICByZXR1cm4gKGVsLm1hdGNoZXMgfHwgZWwubWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwub01hdGNoZXNTZWxlY3RvcikuY2FsbChlbCwgc2VsZWN0b3IpXHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm5zIHRoZSBwYXJlbnQgZWxlbWVudCBpbnN0YW5jZVxyXG4gIHBhcmVudCAodHlwZSkge1xyXG4gICAgdmFyIHBhcmVudCA9IHRoaXNcclxuXHJcbiAgICAvLyBjaGVjayBmb3IgcGFyZW50XHJcbiAgICBpZiAoIXBhcmVudC5ub2RlLnBhcmVudE5vZGUpIHJldHVybiBudWxsXHJcblxyXG4gICAgLy8gZ2V0IHBhcmVudCBlbGVtZW50XHJcbiAgICBwYXJlbnQgPSBhZG9wdChwYXJlbnQubm9kZS5wYXJlbnROb2RlKVxyXG5cclxuICAgIGlmICghdHlwZSkgcmV0dXJuIHBhcmVudFxyXG5cclxuICAgIC8vIGxvb3AgdHJvdWdoIGFuY2VzdG9ycyBpZiB0eXBlIGlzIGdpdmVuXHJcbiAgICB3aGlsZSAocGFyZW50KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnQubWF0Y2hlcyh0eXBlKSA6IHBhcmVudCBpbnN0YW5jZW9mIHR5cGUpIHJldHVybiBwYXJlbnRcclxuICAgICAgaWYgKCFwYXJlbnQubm9kZS5wYXJlbnROb2RlIHx8IHBhcmVudC5ub2RlLnBhcmVudE5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnIHx8IHBhcmVudC5ub2RlLnBhcmVudE5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQtZnJhZ21lbnQnKSByZXR1cm4gbnVsbCAvLyAjNzU5LCAjNzIwXHJcbiAgICAgIHBhcmVudCA9IGFkb3B0KHBhcmVudC5ub2RlLnBhcmVudE5vZGUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBCYXNpY2FsbHkgZG9lcyB0aGUgc2FtZSBhcyBgYWRkKClgIGJ1dCByZXR1cm5zIHRoZSBhZGRlZCBlbGVtZW50IGluc3RlYWRcclxuICBwdXQgKGVsZW1lbnQsIGkpIHtcclxuICAgIHRoaXMuYWRkKGVsZW1lbnQsIGkpXHJcbiAgICByZXR1cm4gZWxlbWVudFxyXG4gIH1cclxuXHJcbiAgLy8gQWRkIGVsZW1lbnQgdG8gZ2l2ZW4gY29udGFpbmVyIGFuZCByZXR1cm4gY29udGFpbmVyXHJcbiAgcHV0SW4gKHBhcmVudCkge1xyXG4gICAgcmV0dXJuIG1ha2VJbnN0YW5jZShwYXJlbnQpLmFkZCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgLy8gUmVtb3ZlIGVsZW1lbnRcclxuICByZW1vdmUgKCkge1xyXG4gICAgaWYgKHRoaXMucGFyZW50KCkpIHtcclxuICAgICAgdGhpcy5wYXJlbnQoKS5yZW1vdmVFbGVtZW50KHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIFJlbW92ZSBhIGdpdmVuIGNoaWxkXHJcbiAgcmVtb3ZlRWxlbWVudCAoZWxlbWVudCkge1xyXG4gICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQubm9kZSlcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLy8gUmVwbGFjZSB0aGlzIHdpdGggZWxlbWVudFxyXG4gIHJlcGxhY2UgKGVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQgPSBtYWtlSW5zdGFuY2UoZWxlbWVudClcclxuICAgIHRoaXMubm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChlbGVtZW50Lm5vZGUsIHRoaXMubm9kZSlcclxuICAgIHJldHVybiBlbGVtZW50XHJcbiAgfVxyXG5cclxuICByb3VuZCAocHJlY2lzaW9uID0gMiwgbWFwKSB7XHJcbiAgICBjb25zdCBmYWN0b3IgPSAxMCAqKiBwcmVjaXNpb25cclxuICAgIGNvbnN0IGF0dHJzID0gdGhpcy5hdHRyKClcclxuXHJcbiAgICAvLyBJZiB3ZSBoYXZlIG5vIG1hcCwgYnVpbGQgb25lIGZyb20gYXR0cnNcclxuICAgIGlmICghbWFwKSB7XHJcbiAgICAgIG1hcCA9IE9iamVjdC5rZXlzKGF0dHJzKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEhvbGRzIHJvdW5kZWQgYXR0cmlidXRlc1xyXG4gICAgY29uc3QgbmV3QXR0cnMgPSB7fVxyXG4gICAgbWFwLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBuZXdBdHRyc1trZXldID0gTWF0aC5yb3VuZChhdHRyc1trZXldICogZmFjdG9yKSAvIGZhY3RvclxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmF0dHIobmV3QXR0cnMpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLy8gUmV0dXJuIGlkIG9uIHN0cmluZyBjb252ZXJzaW9uXHJcbiAgdG9TdHJpbmcgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWQoKVxyXG4gIH1cclxuXHJcbiAgLy8gSW1wb3J0IHJhdyBzdmdcclxuICBzdmcgKHN2Z09yRm4sIG91dGVySFRNTCkge1xyXG4gICAgdmFyIHdlbGwsIGxlbiwgZnJhZ21lbnRcclxuXHJcbiAgICBpZiAoc3ZnT3JGbiA9PT0gZmFsc2UpIHtcclxuICAgICAgb3V0ZXJIVE1MID0gZmFsc2VcclxuICAgICAgc3ZnT3JGbiA9IG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvLyBhY3QgYXMgZ2V0dGVyIGlmIG5vIHN2ZyBzdHJpbmcgaXMgZ2l2ZW5cclxuICAgIGlmIChzdmdPckZuID09IG51bGwgfHwgdHlwZW9mIHN2Z09yRm4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgLy8gVGhlIGRlZmF1bHQgZm9yIGV4cG9ydHMgaXMsIHRoYXQgdGhlIG91dGVyTm9kZSBpcyBpbmNsdWRlZFxyXG4gICAgICBvdXRlckhUTUwgPSBvdXRlckhUTUwgPT0gbnVsbCA/IHRydWUgOiBvdXRlckhUTUxcclxuXHJcbiAgICAgIC8vIHdyaXRlIHN2Z2pzIGRhdGEgdG8gdGhlIGRvbVxyXG4gICAgICB0aGlzLndyaXRlRGF0YVRvRG9tKClcclxuICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzXHJcblxyXG4gICAgICAvLyBBbiBleHBvcnQgbW9kaWZpZXIgd2FzIHBhc3NlZFxyXG4gICAgICBpZiAoc3ZnT3JGbiAhPSBudWxsKSB7XHJcbiAgICAgICAgY3VycmVudCA9IGFkb3B0KGN1cnJlbnQubm9kZS5jbG9uZU5vZGUodHJ1ZSkpXHJcblxyXG4gICAgICAgIC8vIElmIHRoZSB1c2VyIHdhbnRzIG91dGVySFRNTCB3ZSBuZWVkIHRvIHByb2Nlc3MgdGhpcyBub2RlLCB0b29cclxuICAgICAgICBpZiAob3V0ZXJIVE1MKSB7XHJcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gc3ZnT3JGbihjdXJyZW50KVxyXG4gICAgICAgICAgY3VycmVudCA9IHJlc3VsdCB8fCBjdXJyZW50XHJcblxyXG4gICAgICAgICAgLy8gVGhlIHVzZXIgZG9lcyBub3Qgd2FudCB0aGlzIG5vZGU/IFdlbGwsIHRoZW4gaGUgZ2V0cyBub3RoaW5nXHJcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkgcmV0dXJuICcnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWVwIGxvb3AgdGhyb3VnaCBhbGwgY2hpbGRyZW4gYW5kIGFwcGx5IG1vZGlmaWVyXHJcbiAgICAgICAgY3VycmVudC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGxldCByZXN1bHQgPSBzdmdPckZuKHRoaXMpXHJcbiAgICAgICAgICBsZXQgX3RoaXMgPSByZXN1bHQgfHwgdGhpc1xyXG5cclxuICAgICAgICAgIC8vIElmIG1vZGlmaWVyIHJldHVybnMgZmFsc2UsIGRpc2NhcmQgbm9kZVxyXG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgbW9kaWZpZXIgcmV0dXJucyBuZXcgbm9kZSwgdXNlIGl0XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCAmJiB0aGlzICE9PSBfdGhpcykge1xyXG4gICAgICAgICAgICB0aGlzLnJlcGxhY2UoX3RoaXMpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdHJ1ZSlcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmV0dXJuIG91dGVyIG9yIGlubmVyIGNvbnRlbnRcclxuICAgICAgcmV0dXJuIG91dGVySFRNTFxyXG4gICAgICAgID8gY3VycmVudC5ub2RlLm91dGVySFRNTFxyXG4gICAgICAgIDogY3VycmVudC5ub2RlLmlubmVySFRNTFxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFjdCBhcyBzZXR0ZXIgaWYgd2UgZ290IGEgc3RyaW5nXHJcblxyXG4gICAgLy8gVGhlIGRlZmF1bHQgZm9yIGltcG9ydCBpcywgdGhhdCB0aGUgY3VycmVudCBub2RlIGlzIG5vdCByZXBsYWNlZFxyXG4gICAgb3V0ZXJIVE1MID0gb3V0ZXJIVE1MID09IG51bGwgPyBmYWxzZSA6IG91dGVySFRNTFxyXG5cclxuICAgIC8vIENyZWF0ZSB0ZW1wb3JhcnkgaG9sZGVyXHJcbiAgICB3ZWxsID0gZ2xvYmFscy5kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMsICdzdmcnKVxyXG4gICAgZnJhZ21lbnQgPSBnbG9iYWxzLmRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG5cclxuICAgIC8vIER1bXAgcmF3IHN2Z1xyXG4gICAgd2VsbC5pbm5lckhUTUwgPSBzdmdPckZuXHJcblxyXG4gICAgLy8gVHJhbnNwbGFudCBub2RlcyBpbnRvIHRoZSBmcmFnbWVudFxyXG4gICAgZm9yIChsZW4gPSB3ZWxsLmNoaWxkcmVuLmxlbmd0aDsgbGVuLS07KSB7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHdlbGwuZmlyc3RFbGVtZW50Q2hpbGQpXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50KClcclxuXHJcbiAgICAvLyBBZGQgdGhlIHdob2xlIGZyYWdtZW50IGF0IG9uY2VcclxuICAgIHJldHVybiBvdXRlckhUTUxcclxuICAgICAgPyB0aGlzLnJlcGxhY2UoZnJhZ21lbnQpICYmIHBhcmVudFxyXG4gICAgICA6IHRoaXMuYWRkKGZyYWdtZW50KVxyXG4gIH1cclxuXHJcbiAgd29yZHMgKHRleHQpIHtcclxuICAgIC8vIFRoaXMgaXMgZmFzdGVyIHRoYW4gcmVtb3ZpbmcgYWxsIGNoaWxkcmVuIGFuZCBhZGRpbmcgYSBuZXcgb25lXHJcbiAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSB0ZXh0XHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLy8gd3JpdGUgc3ZnanMgZGF0YSB0byB0aGUgZG9tXHJcbiAgd3JpdGVEYXRhVG9Eb20gKCkge1xyXG4gICAgLy8gZHVtcCB2YXJpYWJsZXMgcmVjdXJzaXZlbHlcclxuICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMud3JpdGVEYXRhVG9Eb20oKVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG5cclxuZXh0ZW5kKERvbSwgeyBhdHRyLCBmaW5kLCBmaW5kT25lIH0pXHJcbnJlZ2lzdGVyKERvbSlcclxuIiwiaW1wb3J0IHsgYmJveCwgcmJveCB9IGZyb20gJy4uL3R5cGVzL0JveC5qcydcclxuaW1wb3J0IHsgY3RtLCBzY3JlZW5DVE0gfSBmcm9tICcuLi90eXBlcy9NYXRyaXguanMnXHJcbmltcG9ydCB7XHJcbiAgZXh0ZW5kLFxyXG4gIGdldENsYXNzLFxyXG4gIG1ha2VJbnN0YW5jZSxcclxuICByZWdpc3RlcixcclxuICByb290XHJcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uL3V0aWxzL3dpbmRvdy5qcydcclxuaW1wb3J0IHsgcG9pbnQgfSBmcm9tICcuLi90eXBlcy9Qb2ludC5qcydcclxuaW1wb3J0IHsgcHJvcG9ydGlvbmFsU2l6ZSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xyXG5pbXBvcnQgeyByZWZlcmVuY2UgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXHJcbmltcG9ydCBEb20gZnJvbSAnLi9Eb20uanMnXHJcbmltcG9ydCBMaXN0IGZyb20gJy4uL3R5cGVzL0xpc3QuanMnXHJcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudCBleHRlbmRzIERvbSB7XHJcbiAgY29uc3RydWN0b3IgKG5vZGUsIGF0dHJzKSB7XHJcbiAgICBzdXBlcihub2RlLCBhdHRycylcclxuXHJcbiAgICAvLyBpbml0aWFsaXplIGRhdGEgb2JqZWN0XHJcbiAgICB0aGlzLmRvbSA9IHt9XHJcblxyXG4gICAgLy8gY3JlYXRlIGNpcmN1bGFyIHJlZmVyZW5jZVxyXG4gICAgdGhpcy5ub2RlLmluc3RhbmNlID0gdGhpc1xyXG5cclxuICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZSgnc3ZnanM6ZGF0YScpKSB7XHJcbiAgICAgIC8vIHB1bGwgc3ZnanMgZGF0YSBmcm9tIHRoZSBkb20gKGdldEF0dHJpYnV0ZU5TIGRvZXNuJ3Qgd29yayBpbiBodG1sNSlcclxuICAgICAgdGhpcy5zZXREYXRhKEpTT04ucGFyc2Uobm9kZS5nZXRBdHRyaWJ1dGUoJ3N2Z2pzOmRhdGEnKSkgfHwge30pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBNb3ZlIGVsZW1lbnQgYnkgaXRzIGNlbnRlclxyXG4gIGNlbnRlciAoeCwgeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3goeCkuY3koeSlcclxuICB9XHJcblxyXG4gIC8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeC1heGlzXHJcbiAgY3ggKHgpIHtcclxuICAgIHJldHVybiB4ID09IG51bGwgPyB0aGlzLngoKSArIHRoaXMud2lkdGgoKSAvIDIgOiB0aGlzLngoeCAtIHRoaXMud2lkdGgoKSAvIDIpXHJcbiAgfVxyXG5cclxuICAvLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHktYXhpc1xyXG4gIGN5ICh5KSB7XHJcbiAgICByZXR1cm4geSA9PSBudWxsXHJcbiAgICAgID8gdGhpcy55KCkgKyB0aGlzLmhlaWdodCgpIC8gMlxyXG4gICAgICA6IHRoaXMueSh5IC0gdGhpcy5oZWlnaHQoKSAvIDIpXHJcbiAgfVxyXG5cclxuICAvLyBHZXQgZGVmc1xyXG4gIGRlZnMgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm9vdCgpLmRlZnMoKVxyXG4gIH1cclxuXHJcbiAgLy8gUmVsYXRpdmUgbW92ZSBvdmVyIHggYW5kIHkgYXhlc1xyXG4gIGRtb3ZlICh4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5keCh4KS5keSh5KVxyXG4gIH1cclxuXHJcbiAgLy8gUmVsYXRpdmUgbW92ZSBvdmVyIHggYXhpc1xyXG4gIGR4ICh4KSB7XHJcbiAgICByZXR1cm4gdGhpcy54KG5ldyBTVkdOdW1iZXIoeCkucGx1cyh0aGlzLngoKSkpXHJcbiAgfVxyXG5cclxuICAvLyBSZWxhdGl2ZSBtb3ZlIG92ZXIgeSBheGlzXHJcbiAgZHkgKHkpIHtcclxuICAgIHJldHVybiB0aGlzLnkobmV3IFNWR051bWJlcih5KS5wbHVzKHRoaXMueSgpKSlcclxuICB9XHJcblxyXG4gIC8vIEdldCBwYXJlbnQgZG9jdW1lbnRcclxuICByb290ICgpIHtcclxuICAgIGxldCBwID0gdGhpcy5wYXJlbnQoZ2V0Q2xhc3Mocm9vdCkpXHJcbiAgICByZXR1cm4gcCAmJiBwLnJvb3QoKVxyXG4gIH1cclxuXHJcbiAgZ2V0RXZlbnRIb2xkZXIgKCkge1xyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxyXG4gIGhlaWdodCAoaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgfVxyXG5cclxuICAvLyBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gcG9pbnQgaW5zaWRlIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGVsZW1lbnRcclxuICBpbnNpZGUgKHgsIHkpIHtcclxuICAgIGxldCBib3ggPSB0aGlzLmJib3goKVxyXG5cclxuICAgIHJldHVybiB4ID4gYm94LnhcclxuICAgICAgJiYgeSA+IGJveC55XHJcbiAgICAgICYmIHggPCBib3gueCArIGJveC53aWR0aFxyXG4gICAgICAmJiB5IDwgYm94LnkgKyBib3guaGVpZ2h0XHJcbiAgfVxyXG5cclxuICAvLyBNb3ZlIGVsZW1lbnQgdG8gZ2l2ZW4geCBhbmQgeSB2YWx1ZXNcclxuICBtb3ZlICh4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy54KHgpLnkoeSlcclxuICB9XHJcblxyXG4gIC8vIHJldHVybiBhcnJheSBvZiBhbGwgYW5jZXN0b3JzIG9mIGdpdmVuIHR5cGUgdXAgdG8gdGhlIHJvb3Qgc3ZnXHJcbiAgcGFyZW50cyAodW50aWwgPSBnbG9iYWxzLmRvY3VtZW50KSB7XHJcbiAgICB1bnRpbCA9IG1ha2VJbnN0YW5jZSh1bnRpbClcclxuICAgIGxldCBwYXJlbnRzID0gbmV3IExpc3QoKVxyXG4gICAgbGV0IHBhcmVudCA9IHRoaXNcclxuXHJcbiAgICB3aGlsZSAoXHJcbiAgICAgIChwYXJlbnQgPSBwYXJlbnQucGFyZW50KCkpXHJcbiAgICAgICYmIHBhcmVudC5ub2RlICE9PSB1bnRpbC5ub2RlXHJcbiAgICAgICYmIHBhcmVudC5ub2RlICE9PSBnbG9iYWxzLmRvY3VtZW50XHJcbiAgICApIHtcclxuICAgICAgcGFyZW50cy5wdXNoKHBhcmVudClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyZW50c1xyXG4gIH1cclxuXHJcbiAgLy8gR2V0IHJlZmVyZW5jZWQgZWxlbWVudCBmb3JtIGF0dHJpYnV0ZSB2YWx1ZVxyXG4gIHJlZmVyZW5jZSAoYXR0cikge1xyXG4gICAgYXR0ciA9IHRoaXMuYXR0cihhdHRyKVxyXG4gICAgaWYgKCFhdHRyKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGNvbnN0IG0gPSBhdHRyLm1hdGNoKHJlZmVyZW5jZSlcclxuICAgIHJldHVybiBtID8gbWFrZUluc3RhbmNlKG1bMV0pIDogbnVsbFxyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGdpdmVuIGRhdGEgdG8gdGhlIGVsZW1lbnRzIGRhdGEgcHJvcGVydHlcclxuICBzZXREYXRhIChvKSB7XHJcbiAgICB0aGlzLmRvbSA9IG9cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBTZXQgZWxlbWVudCBzaXplIHRvIGdpdmVuIHdpZHRoIGFuZCBoZWlnaHRcclxuICBzaXplICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICBsZXQgcCA9IHByb3BvcnRpb25hbFNpemUodGhpcywgd2lkdGgsIGhlaWdodClcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gICAgICAud2lkdGgobmV3IFNWR051bWJlcihwLndpZHRoKSlcclxuICAgICAgLmhlaWdodChuZXcgU1ZHTnVtYmVyKHAuaGVpZ2h0KSlcclxuICB9XHJcblxyXG4gIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XHJcbiAgd2lkdGggKHdpZHRoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCd3aWR0aCcsIHdpZHRoKVxyXG4gIH1cclxuXHJcbiAgLy8gd3JpdGUgc3ZnanMgZGF0YSB0byB0aGUgZG9tXHJcbiAgd3JpdGVEYXRhVG9Eb20gKCkge1xyXG4gICAgLy8gcmVtb3ZlIHByZXZpb3VzbHkgc2V0IGRhdGFcclxuICAgIHRoaXMubm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ3N2Z2pzOmRhdGEnKVxyXG5cclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmRvbSkubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N2Z2pzOmRhdGEnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRvbSkpIC8vIHNlZSAjNDI4XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN1cGVyLndyaXRlRGF0YVRvRG9tKClcclxuICB9XHJcblxyXG4gIC8vIE1vdmUgb3ZlciB4LWF4aXNcclxuICB4ICh4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCd4JywgeClcclxuICB9XHJcblxyXG4gIC8vIE1vdmUgb3ZlciB5LWF4aXNcclxuICB5ICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCd5JywgeSlcclxuICB9XHJcbn1cclxuXHJcbmV4dGVuZChFbGVtZW50LCB7XHJcbiAgYmJveCwgcmJveCwgcG9pbnQsIGN0bSwgc2NyZWVuQ1RNXHJcbn0pXHJcblxyXG5yZWdpc3RlcihFbGVtZW50KVxyXG4iLCJpbXBvcnQge1xyXG4gIGV4dGVuZCxcclxuICBub2RlT3JOZXcsXHJcbiAgcmVnaXN0ZXIsXHJcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcclxufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyBwcm9wb3J0aW9uYWxTaXplIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXHJcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXHJcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xyXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcclxuaW1wb3J0ICogYXMgY2lyY2xlZCBmcm9tICcuLi9tb2R1bGVzL2NvcmUvY2lyY2xlZC5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsbGlwc2UgZXh0ZW5kcyBTaGFwZSB7XHJcbiAgY29uc3RydWN0b3IgKG5vZGUpIHtcclxuICAgIHN1cGVyKG5vZGVPck5ldygnZWxsaXBzZScsIG5vZGUpLCBub2RlKVxyXG4gIH1cclxuXHJcbiAgc2l6ZSAod2lkdGgsIGhlaWdodCkge1xyXG4gICAgdmFyIHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMsIHdpZHRoLCBoZWlnaHQpXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICAgICAgLnJ4KG5ldyBTVkdOdW1iZXIocC53aWR0aCkuZGl2aWRlKDIpKVxyXG4gICAgICAucnkobmV3IFNWR051bWJlcihwLmhlaWdodCkuZGl2aWRlKDIpKVxyXG4gIH1cclxufVxyXG5cclxuZXh0ZW5kKEVsbGlwc2UsIGNpcmNsZWQpXHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoJ0NvbnRhaW5lcicsIHtcclxuICAvLyBDcmVhdGUgYW4gZWxsaXBzZVxyXG4gIGVsbGlwc2U6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh3aWR0aCA9IDAsIGhlaWdodCA9IHdpZHRoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wdXQobmV3IEVsbGlwc2UoKSkuc2l6ZSh3aWR0aCwgaGVpZ2h0KS5tb3ZlKDAsIDApXHJcbiAgfSlcclxufSlcclxuXHJcbnJlZ2lzdGVyKEVsbGlwc2UpXHJcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL0VsZW1lbnQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmVpZ25PYmplY3QgZXh0ZW5kcyBFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgc3VwZXIobm9kZU9yTmV3KCdmb3JlaWduT2JqZWN0Jywgbm9kZSksIG5vZGUpXHJcbiAgfVxyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoe1xyXG4gIENvbnRhaW5lcjoge1xyXG4gICAgZm9yZWlnbk9iamVjdDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBGb3JlaWduT2JqZWN0KCkpLnNpemUod2lkdGgsIGhlaWdodClcclxuICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXIoRm9yZWlnbk9iamVjdClcclxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyBwcm9wb3J0aW9uYWxTaXplIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXHJcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXIuanMnXHJcbmltcG9ydCBNYXRyaXggZnJvbSAnLi4vdHlwZXMvTWF0cml4LmpzJ1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vdHlwZXMvUG9pbnQuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHIGV4dGVuZHMgQ29udGFpbmVyIHtcclxuICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgc3VwZXIobm9kZU9yTmV3KCdnJywgbm9kZSksIG5vZGUpXHJcbiAgfVxyXG5cclxuICB4ICh4LCBib3ggPSB0aGlzLmJib3goKSkge1xyXG4gICAgaWYgKHggPT0gbnVsbCkgcmV0dXJuIGJveC54XHJcbiAgICByZXR1cm4gdGhpcy5tb3ZlKHgsIGJveC55LCBib3gpXHJcbiAgfVxyXG5cclxuICB5ICh5LCBib3ggPSB0aGlzLmJib3goKSkge1xyXG4gICAgaWYgKHkgPT0gbnVsbCkgcmV0dXJuIGJveC55XHJcbiAgICByZXR1cm4gdGhpcy5tb3ZlKGJveC54LCB5LCBib3gpXHJcbiAgfVxyXG5cclxuICBtb3ZlICh4ID0gMCwgeSA9IDAsIGJveCA9IHRoaXMuYmJveCgpKSB7XHJcbiAgICBjb25zdCBkeCA9IHggLSBib3gueFxyXG4gICAgY29uc3QgZHkgPSB5IC0gYm94LnlcclxuXHJcbiAgICByZXR1cm4gdGhpcy5kbW92ZShkeCwgZHkpXHJcbiAgfVxyXG5cclxuICBkeCAoZHgpIHtcclxuICAgIHJldHVybiB0aGlzLmRtb3ZlKGR4LCAwKVxyXG4gIH1cclxuXHJcbiAgZHkgKGR5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5kbW92ZSgwLCBkeSlcclxuICB9XHJcblxyXG4gIGRtb3ZlIChkeCwgZHkpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xyXG4gICAgICAvLyBHZXQgdGhlIGNoaWxkcyBiYm94XHJcbiAgICAgIGNvbnN0IGJib3ggPSBjaGlsZC5iYm94KClcclxuICAgICAgLy8gR2V0IGNoaWxkcyBtYXRyaXhcclxuICAgICAgY29uc3QgbSA9IG5ldyBNYXRyaXgoY2hpbGQpXHJcbiAgICAgIC8vIFRyYW5zbGF0ZSBjaGlsZHMgbWF0cml4IGJ5IGFtb3VudCBhbmRcclxuICAgICAgLy8gdHJhbnNmb3JtIGl0IGJhY2sgaW50byBwYXJlbnRzIHNwYWNlXHJcbiAgICAgIGNvbnN0IG1hdHJpeCA9IG0udHJhbnNsYXRlKGR4LCBkeSkudHJhbnNmb3JtKG0uaW52ZXJzZSgpKVxyXG4gICAgICAvLyBDYWxjdWxhdGUgbmV3IHggYW5kIHkgZnJvbSBvbGQgYm94XHJcbiAgICAgIGNvbnN0IHAgPSBuZXcgUG9pbnQoYmJveC54LCBiYm94LnkpLnRyYW5zZm9ybShtYXRyaXgpXHJcbiAgICAgIC8vIE1vdmUgZWxlbWVudFxyXG4gICAgICBjaGlsZC5tb3ZlKHAueCwgcC55KVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgd2lkdGggKHdpZHRoLCBib3ggPSB0aGlzLmJib3goKSkge1xyXG4gICAgaWYgKHdpZHRoID09IG51bGwpIHJldHVybiBib3gud2lkdGhcclxuICAgIHJldHVybiB0aGlzLnNpemUod2lkdGgsIGJveC5oZWlnaHQsIGJveClcclxuICB9XHJcblxyXG4gIGhlaWdodCAoaGVpZ2h0LCBib3ggPSB0aGlzLmJib3goKSkge1xyXG4gICAgaWYgKGhlaWdodCA9PSBudWxsKSByZXR1cm4gYm94LmhlaWdodFxyXG4gICAgcmV0dXJuIHRoaXMuc2l6ZShib3gud2lkdGgsIGhlaWdodCwgYm94KVxyXG4gIH1cclxuXHJcbiAgc2l6ZSAod2lkdGgsIGhlaWdodCwgYm94ID0gdGhpcy5iYm94KCkpIHtcclxuICAgIGNvbnN0IHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMsIHdpZHRoLCBoZWlnaHQsIGJveClcclxuICAgIGNvbnN0IHNjYWxlWCA9IHAud2lkdGggLyBib3gud2lkdGhcclxuICAgIGNvbnN0IHNjYWxlWSA9IHAuaGVpZ2h0IC8gYm94LmhlaWdodFxyXG5cclxuICAgIHRoaXMuY2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xyXG4gICAgICBjb25zdCBvID0gbmV3IFBvaW50KGJveCkudHJhbnNmb3JtKG5ldyBNYXRyaXgoY2hpbGQpLmludmVyc2UoKSlcclxuICAgICAgY2hpbGQuc2NhbGUoc2NhbGVYLCBzY2FsZVksIG8ueCwgby55KVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBDb250YWluZXI6IHtcclxuICAgIC8vIENyZWF0ZSBhIGdyb3VwIGVsZW1lbnRcclxuICAgIGdyb3VwOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgRygpKVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG5yZWdpc3RlcihHKVxyXG4iLCJpbXBvcnQge1xyXG4gIGV4dGVuZCxcclxuICBub2RlT3JOZXcsXHJcbiAgcmVnaXN0ZXIsXHJcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcclxufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgQm94IGZyb20gJy4uL3R5cGVzL0JveC5qcydcclxuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcclxuaW1wb3J0IFN0b3AgZnJvbSAnLi9TdG9wLmpzJ1xyXG5pbXBvcnQgYmFzZUZpbmQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzJ1xyXG5pbXBvcnQgKiBhcyBncmFkaWVudGVkIGZyb20gJy4uL21vZHVsZXMvY29yZS9ncmFkaWVudGVkLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhZGllbnQgZXh0ZW5kcyBDb250YWluZXIge1xyXG4gIGNvbnN0cnVjdG9yICh0eXBlLCBhdHRycykge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIG5vZGVPck5ldyh0eXBlICsgJ0dyYWRpZW50JywgdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gbnVsbCA6IHR5cGUpLFxyXG4gICAgICBhdHRyc1xyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgLy8gQWRkIGEgY29sb3Igc3RvcFxyXG4gIHN0b3AgKG9mZnNldCwgY29sb3IsIG9wYWNpdHkpIHtcclxuICAgIHJldHVybiB0aGlzLnB1dChuZXcgU3RvcCgpKS51cGRhdGUob2Zmc2V0LCBjb2xvciwgb3BhY2l0eSlcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZSBncmFkaWVudFxyXG4gIHVwZGF0ZSAoYmxvY2spIHtcclxuICAgIC8vIHJlbW92ZSBhbGwgc3RvcHNcclxuICAgIHRoaXMuY2xlYXIoKVxyXG5cclxuICAgIC8vIGludm9rZSBwYXNzZWQgYmxvY2tcclxuICAgIGlmICh0eXBlb2YgYmxvY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgYmxvY2suY2FsbCh0aGlzLCB0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm4gdGhlIGZpbGwgaWRcclxuICB1cmwgKCkge1xyXG4gICAgcmV0dXJuICd1cmwoIycgKyB0aGlzLmlkKCkgKyAnKSdcclxuICB9XHJcblxyXG4gIC8vIEFsaWFzIHN0cmluZyBjb252ZXJ0aW9uIHRvIGZpbGxcclxuICB0b1N0cmluZyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy51cmwoKVxyXG4gIH1cclxuXHJcbiAgLy8gY3VzdG9tIGF0dHIgdG8gaGFuZGxlIHRyYW5zZm9ybVxyXG4gIGF0dHIgKGEsIGIsIGMpIHtcclxuICAgIGlmIChhID09PSAndHJhbnNmb3JtJykgYSA9ICdncmFkaWVudFRyYW5zZm9ybSdcclxuICAgIHJldHVybiBzdXBlci5hdHRyKGEsIGIsIGMpXHJcbiAgfVxyXG5cclxuICB0YXJnZXRzICgpIHtcclxuICAgIHJldHVybiBiYXNlRmluZCgnc3ZnIFtmaWxsKj1cIicgKyB0aGlzLmlkKCkgKyAnXCJdJylcclxuICB9XHJcblxyXG4gIGJib3ggKCkge1xyXG4gICAgcmV0dXJuIG5ldyBCb3goKVxyXG4gIH1cclxufVxyXG5cclxuZXh0ZW5kKEdyYWRpZW50LCBncmFkaWVudGVkKVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBDb250YWluZXI6IHtcclxuICAgIC8vIENyZWF0ZSBncmFkaWVudCBlbGVtZW50IGluIGRlZnNcclxuICAgIGdyYWRpZW50OiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAodHlwZSwgYmxvY2spIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLmdyYWRpZW50KHR5cGUsIGJsb2NrKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIC8vIGRlZmluZSBncmFkaWVudFxyXG4gIERlZnM6IHtcclxuICAgIGdyYWRpZW50OiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAodHlwZSwgYmxvY2spIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBHcmFkaWVudCh0eXBlKSkudXBkYXRlKGJsb2NrKVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG5yZWdpc3RlcihHcmFkaWVudClcclxuIiwiaW1wb3J0IHsgaXNJbWFnZSB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcclxuaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyBvZmYsIG9uIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2V2ZW50LmpzJ1xyXG5pbXBvcnQgeyByZWdpc3RlckF0dHJIb29rIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL2F0dHIuanMnXHJcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXHJcbmltcG9ydCB7IHhsaW5rIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXHJcbmltcG9ydCBQYXR0ZXJuIGZyb20gJy4vUGF0dGVybi5qcydcclxuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZSBleHRlbmRzIFNoYXBlIHtcclxuICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgc3VwZXIobm9kZU9yTmV3KCdpbWFnZScsIG5vZGUpLCBub2RlKVxyXG4gIH1cclxuXHJcbiAgLy8gKHJlKWxvYWQgaW1hZ2VcclxuICBsb2FkICh1cmwsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoIXVybCkgcmV0dXJuIHRoaXNcclxuXHJcbiAgICB2YXIgaW1nID0gbmV3IGdsb2JhbHMud2luZG93LkltYWdlKClcclxuXHJcbiAgICBvbihpbWcsICdsb2FkJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdmFyIHAgPSB0aGlzLnBhcmVudChQYXR0ZXJuKVxyXG5cclxuICAgICAgLy8gZW5zdXJlIGltYWdlIHNpemVcclxuICAgICAgaWYgKHRoaXMud2lkdGgoKSA9PT0gMCAmJiB0aGlzLmhlaWdodCgpID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5zaXplKGltZy53aWR0aCwgaW1nLmhlaWdodClcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHAgaW5zdGFuY2VvZiBQYXR0ZXJuKSB7XHJcbiAgICAgICAgLy8gZW5zdXJlIHBhdHRlcm4gc2l6ZSBpZiBub3Qgc2V0XHJcbiAgICAgICAgaWYgKHAud2lkdGgoKSA9PT0gMCAmJiBwLmhlaWdodCgpID09PSAwKSB7XHJcbiAgICAgICAgICBwLnNpemUodGhpcy53aWR0aCgpLCB0aGlzLmhlaWdodCgpKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZSlcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcylcclxuXHJcbiAgICBvbihpbWcsICdsb2FkIGVycm9yJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBkb250IGZvcmdldCB0byB1bmJpbmQgbWVtb3J5IGxlYWtpbmcgZXZlbnRzXHJcbiAgICAgIG9mZihpbWcpXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiB0aGlzLmF0dHIoJ2hyZWYnLCAoaW1nLnNyYyA9IHVybCksIHhsaW5rKVxyXG4gIH1cclxufVxyXG5cclxucmVnaXN0ZXJBdHRySG9vayhmdW5jdGlvbiAoYXR0ciwgdmFsLCBfdGhpcykge1xyXG4gIC8vIGNvbnZlcnQgaW1hZ2UgZmlsbCBhbmQgc3Ryb2tlIHRvIHBhdHRlcm5zXHJcbiAgaWYgKGF0dHIgPT09ICdmaWxsJyB8fCBhdHRyID09PSAnc3Ryb2tlJykge1xyXG4gICAgaWYgKGlzSW1hZ2UudGVzdCh2YWwpKSB7XHJcbiAgICAgIHZhbCA9IF90aGlzLnJvb3QoKS5kZWZzKCkuaW1hZ2UodmFsKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEltYWdlKSB7XHJcbiAgICB2YWwgPSBfdGhpcy5yb290KCkuZGVmcygpLnBhdHRlcm4oMCwgMCwgKHBhdHRlcm4pID0+IHtcclxuICAgICAgcGF0dGVybi5hZGQodmFsKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJldHVybiB2YWxcclxufSlcclxuXHJcbnJlZ2lzdGVyTWV0aG9kcyh7XHJcbiAgQ29udGFpbmVyOiB7XHJcbiAgICAvLyBjcmVhdGUgaW1hZ2UgZWxlbWVudCwgbG9hZCBpbWFnZSBhbmQgc2V0IGl0cyBzaXplXHJcbiAgICBpbWFnZTogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHNvdXJjZSwgY2FsbGJhY2spIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBJbWFnZSgpKS5zaXplKDAsIDApLmxvYWQoc291cmNlLCBjYWxsYmFjaylcclxuICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXIoSW1hZ2UpXHJcbiIsImltcG9ydCB7XHJcbiAgZXh0ZW5kLFxyXG4gIG5vZGVPck5ldyxcclxuICByZWdpc3RlcixcclxuICB3cmFwV2l0aEF0dHJDaGVja1xyXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXHJcbmltcG9ydCB7IHByb3BvcnRpb25hbFNpemUgfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuaW1wb3J0IFBvaW50QXJyYXkgZnJvbSAnLi4vdHlwZXMvUG9pbnRBcnJheS5qcydcclxuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXHJcbmltcG9ydCAqIGFzIHBvaW50ZWQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3BvaW50ZWQuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lIGV4dGVuZHMgU2hhcGUge1xyXG4gIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ2xpbmUnLCBub2RlKSwgbm9kZSlcclxuICB9XHJcblxyXG4gIC8vIEdldCBhcnJheVxyXG4gIGFycmF5ICgpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnRBcnJheShbXHJcbiAgICAgIFsgdGhpcy5hdHRyKCd4MScpLCB0aGlzLmF0dHIoJ3kxJykgXSxcclxuICAgICAgWyB0aGlzLmF0dHIoJ3gyJyksIHRoaXMuYXR0cigneTInKSBdXHJcbiAgICBdKVxyXG4gIH1cclxuXHJcbiAgLy8gT3ZlcndyaXRlIG5hdGl2ZSBwbG90KCkgbWV0aG9kXHJcbiAgcGxvdCAoeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgIGlmICh4MSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFycmF5KClcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHkxICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB4MSA9IHsgeDE6IHgxLCB5MTogeTEsIHgyOiB4MiwgeTI6IHkyIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHgxID0gbmV3IFBvaW50QXJyYXkoeDEpLnRvTGluZSgpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXR0cih4MSlcclxuICB9XHJcblxyXG4gIC8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyXHJcbiAgbW92ZSAoeCwgeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0cih0aGlzLmFycmF5KCkubW92ZSh4LCB5KS50b0xpbmUoKSlcclxuICB9XHJcblxyXG4gIC8vIFNldCBlbGVtZW50IHNpemUgdG8gZ2l2ZW4gd2lkdGggYW5kIGhlaWdodFxyXG4gIHNpemUgKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBwID0gcHJvcG9ydGlvbmFsU2l6ZSh0aGlzLCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgcmV0dXJuIHRoaXMuYXR0cih0aGlzLmFycmF5KCkuc2l6ZShwLndpZHRoLCBwLmhlaWdodCkudG9MaW5lKCkpXHJcbiAgfVxyXG59XHJcblxyXG5leHRlbmQoTGluZSwgcG9pbnRlZClcclxuXHJcbnJlZ2lzdGVyTWV0aG9kcyh7XHJcbiAgQ29udGFpbmVyOiB7XHJcbiAgICAvLyBDcmVhdGUgYSBsaW5lIGVsZW1lbnRcclxuICAgIGxpbmU6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgIC8vIG1ha2Ugc3VyZSBwbG90IGlzIGNhbGxlZCBhcyBhIHNldHRlclxyXG4gICAgICAvLyB4MSBpcyBub3QgbmVjZXNzYXJpbHkgYSBudW1iZXIsIGl0IGNhbiBhbHNvIGJlIGFuIGFycmF5LCBhIHN0cmluZyBhbmQgYSBQb2ludEFycmF5XHJcbiAgICAgIHJldHVybiBMaW5lLnByb3RvdHlwZS5wbG90LmFwcGx5KFxyXG4gICAgICAgIHRoaXMucHV0KG5ldyBMaW5lKCkpXHJcbiAgICAgICAgLCBhcmdzWzBdICE9IG51bGwgPyBhcmdzIDogWyAwLCAwLCAwLCAwIF1cclxuICAgICAgKVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG5yZWdpc3RlcihMaW5lKVxyXG4iLCJpbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyLCB3cmFwV2l0aEF0dHJDaGVjayB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXHJcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXIuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXJrZXIgZXh0ZW5kcyBDb250YWluZXIge1xyXG4gIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ21hcmtlcicsIG5vZGUpLCBub2RlKVxyXG4gIH1cclxuXHJcbiAgLy8gU2V0IHdpZHRoIG9mIGVsZW1lbnRcclxuICB3aWR0aCAod2lkdGgpIHtcclxuICAgIHJldHVybiB0aGlzLmF0dHIoJ21hcmtlcldpZHRoJywgd2lkdGgpXHJcbiAgfVxyXG5cclxuICAvLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcclxuICBoZWlnaHQgKGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0cignbWFya2VySGVpZ2h0JywgaGVpZ2h0KVxyXG4gIH1cclxuXHJcbiAgLy8gU2V0IG1hcmtlciByZWZYIGFuZCByZWZZXHJcbiAgcmVmICh4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdyZWZYJywgeCkuYXR0cigncmVmWScsIHkpXHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGUgbWFya2VyXHJcbiAgdXBkYXRlIChibG9jaykge1xyXG4gICAgLy8gcmVtb3ZlIGFsbCBjb250ZW50XHJcbiAgICB0aGlzLmNsZWFyKClcclxuXHJcbiAgICAvLyBpbnZva2UgcGFzc2VkIGJsb2NrXHJcbiAgICBpZiAodHlwZW9mIGJsb2NrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGJsb2NrLmNhbGwodGhpcywgdGhpcylcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLy8gUmV0dXJuIHRoZSBmaWxsIGlkXHJcbiAgdG9TdHJpbmcgKCkge1xyXG4gICAgcmV0dXJuICd1cmwoIycgKyB0aGlzLmlkKCkgKyAnKSdcclxuICB9XHJcbn1cclxuXHJcbnJlZ2lzdGVyTWV0aG9kcyh7XHJcbiAgQ29udGFpbmVyOiB7XHJcbiAgICBtYXJrZXIgKC4uLmFyZ3MpIHtcclxuICAgICAgLy8gQ3JlYXRlIG1hcmtlciBlbGVtZW50IGluIGRlZnNcclxuICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLm1hcmtlciguLi5hcmdzKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgRGVmczoge1xyXG4gICAgLy8gQ3JlYXRlIG1hcmtlclxyXG4gICAgbWFya2VyOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgYmxvY2spIHtcclxuICAgICAgLy8gU2V0IGRlZmF1bHQgdmlld2JveCB0byBtYXRjaCB0aGUgd2lkdGggYW5kIGhlaWdodCwgc2V0IHJlZiB0byBjeCBhbmQgY3kgYW5kIHNldCBvcmllbnQgdG8gYXV0b1xyXG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IE1hcmtlcigpKVxyXG4gICAgICAgIC5zaXplKHdpZHRoLCBoZWlnaHQpXHJcbiAgICAgICAgLnJlZih3aWR0aCAvIDIsIGhlaWdodCAvIDIpXHJcbiAgICAgICAgLnZpZXdib3goMCwgMCwgd2lkdGgsIGhlaWdodClcclxuICAgICAgICAuYXR0cignb3JpZW50JywgJ2F1dG8nKVxyXG4gICAgICAgIC51cGRhdGUoYmxvY2spXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgbWFya2VyOiB7XHJcbiAgICAvLyBDcmVhdGUgYW5kIGF0dGFjaCBtYXJrZXJzXHJcbiAgICBtYXJrZXIgKG1hcmtlciwgd2lkdGgsIGhlaWdodCwgYmxvY2spIHtcclxuICAgICAgdmFyIGF0dHIgPSBbICdtYXJrZXInIF1cclxuXHJcbiAgICAgIC8vIEJ1aWxkIGF0dHJpYnV0ZSBuYW1lXHJcbiAgICAgIGlmIChtYXJrZXIgIT09ICdhbGwnKSBhdHRyLnB1c2gobWFya2VyKVxyXG4gICAgICBhdHRyID0gYXR0ci5qb2luKCctJylcclxuXHJcbiAgICAgIC8vIFNldCBtYXJrZXIgYXR0cmlidXRlXHJcbiAgICAgIG1hcmtlciA9IGFyZ3VtZW50c1sxXSBpbnN0YW5jZW9mIE1hcmtlclxyXG4gICAgICAgID8gYXJndW1lbnRzWzFdXHJcbiAgICAgICAgOiB0aGlzLmRlZnMoKS5tYXJrZXIod2lkdGgsIGhlaWdodCwgYmxvY2spXHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKGF0dHIsIG1hcmtlcilcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5yZWdpc3RlcihNYXJrZXIpXHJcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0NvbnRhaW5lci5qcydcclxuaW1wb3J0IGJhc2VGaW5kIGZyb20gJy4uL21vZHVsZXMvY29yZS9zZWxlY3Rvci5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc2sgZXh0ZW5kcyBDb250YWluZXIge1xyXG4gIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ21hc2snLCBub2RlKSwgbm9kZSlcclxuICB9XHJcblxyXG4gIC8vIFVubWFzayBhbGwgbWFza2VkIGVsZW1lbnRzIGFuZCByZW1vdmUgaXRzZWxmXHJcbiAgcmVtb3ZlICgpIHtcclxuICAgIC8vIHVubWFzayBhbGwgdGFyZ2V0c1xyXG4gICAgdGhpcy50YXJnZXRzKCkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwudW5tYXNrKClcclxuICAgIH0pXHJcblxyXG4gICAgLy8gcmVtb3ZlIG1hc2sgZnJvbSBwYXJlbnRcclxuICAgIHJldHVybiBzdXBlci5yZW1vdmUoKVxyXG4gIH1cclxuXHJcbiAgdGFyZ2V0cyAoKSB7XHJcbiAgICByZXR1cm4gYmFzZUZpbmQoJ3N2ZyBbbWFzayo9XCInICsgdGhpcy5pZCgpICsgJ1wiXScpXHJcbiAgfVxyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoe1xyXG4gIENvbnRhaW5lcjoge1xyXG4gICAgbWFzazogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kZWZzKCkucHV0KG5ldyBNYXNrKCkpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgRWxlbWVudDoge1xyXG4gICAgLy8gRGlzdHJpYnV0ZSBtYXNrIHRvIHN2ZyBlbGVtZW50XHJcbiAgICBtYXNrV2l0aCAoZWxlbWVudCkge1xyXG4gICAgICAvLyB1c2UgZ2l2ZW4gbWFzayBvciBjcmVhdGUgYSBuZXcgb25lXHJcbiAgICAgIHZhciBtYXNrZXIgPSBlbGVtZW50IGluc3RhbmNlb2YgTWFza1xyXG4gICAgICAgID8gZWxlbWVudFxyXG4gICAgICAgIDogdGhpcy5wYXJlbnQoKS5tYXNrKCkuYWRkKGVsZW1lbnQpXHJcblxyXG4gICAgICAvLyBhcHBseSBtYXNrXHJcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoJ21hc2snLCAndXJsKFwiIycgKyBtYXNrZXIuaWQoKSArICdcIiknKVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBVbm1hc2sgZWxlbWVudFxyXG4gICAgdW5tYXNrICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cignbWFzaycsIG51bGwpXHJcbiAgICB9LFxyXG5cclxuICAgIG1hc2tlciAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlZmVyZW5jZSgnbWFzaycpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXIoTWFzaylcclxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyBwcm9wb3J0aW9uYWxTaXplIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXHJcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXHJcbmltcG9ydCBQYXRoQXJyYXkgZnJvbSAnLi4vdHlwZXMvUGF0aEFycmF5LmpzJ1xyXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcclxuaW1wb3J0IGJhc2VGaW5kIGZyb20gJy4uL21vZHVsZXMvY29yZS9zZWxlY3Rvci5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGggZXh0ZW5kcyBTaGFwZSB7XHJcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgY29uc3RydWN0b3IgKG5vZGUpIHtcclxuICAgIHN1cGVyKG5vZGVPck5ldygncGF0aCcsIG5vZGUpLCBub2RlKVxyXG4gIH1cclxuXHJcbiAgLy8gR2V0IGFycmF5XHJcbiAgYXJyYXkgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FycmF5IHx8ICh0aGlzLl9hcnJheSA9IG5ldyBQYXRoQXJyYXkodGhpcy5hdHRyKCdkJykpKVxyXG4gIH1cclxuXHJcbiAgLy8gUGxvdCBuZXcgcGF0aFxyXG4gIHBsb3QgKGQpIHtcclxuICAgIHJldHVybiAoZCA9PSBudWxsKSA/IHRoaXMuYXJyYXkoKVxyXG4gICAgICA6IHRoaXMuY2xlYXIoKS5hdHRyKCdkJywgdHlwZW9mIGQgPT09ICdzdHJpbmcnID8gZCA6ICh0aGlzLl9hcnJheSA9IG5ldyBQYXRoQXJyYXkoZCkpKVxyXG4gIH1cclxuXHJcbiAgLy8gQ2xlYXIgYXJyYXkgY2FjaGVcclxuICBjbGVhciAoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fYXJyYXlcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lclxyXG4gIG1vdmUgKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmF0dHIoJ2QnLCB0aGlzLmFycmF5KCkubW92ZSh4LCB5KSlcclxuICB9XHJcblxyXG4gIC8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyIG92ZXIgeC1heGlzXHJcbiAgeCAoeCkge1xyXG4gICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMuYmJveCgpLnggOiB0aGlzLm1vdmUoeCwgdGhpcy5iYm94KCkueSlcclxuICB9XHJcblxyXG4gIC8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyIG92ZXIgeS1heGlzXHJcbiAgeSAoeSkge1xyXG4gICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMuYmJveCgpLnkgOiB0aGlzLm1vdmUodGhpcy5iYm94KCkueCwgeSlcclxuICB9XHJcblxyXG4gIC8vIFNldCBlbGVtZW50IHNpemUgdG8gZ2l2ZW4gd2lkdGggYW5kIGhlaWdodFxyXG4gIHNpemUgKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBwID0gcHJvcG9ydGlvbmFsU2l6ZSh0aGlzLCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgcmV0dXJuIHRoaXMuYXR0cignZCcsIHRoaXMuYXJyYXkoKS5zaXplKHAud2lkdGgsIHAuaGVpZ2h0KSlcclxuICB9XHJcblxyXG4gIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XHJcbiAgd2lkdGggKHdpZHRoKSB7XHJcbiAgICByZXR1cm4gd2lkdGggPT0gbnVsbCA/IHRoaXMuYmJveCgpLndpZHRoIDogdGhpcy5zaXplKHdpZHRoLCB0aGlzLmJib3goKS5oZWlnaHQpXHJcbiAgfVxyXG5cclxuICAvLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcclxuICBoZWlnaHQgKGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGhlaWdodCA9PSBudWxsID8gdGhpcy5iYm94KCkuaGVpZ2h0IDogdGhpcy5zaXplKHRoaXMuYmJveCgpLndpZHRoLCBoZWlnaHQpXHJcbiAgfVxyXG5cclxuICB0YXJnZXRzICgpIHtcclxuICAgIHJldHVybiBiYXNlRmluZCgnc3ZnIHRleHRwYXRoIFtocmVmKj1cIicgKyB0aGlzLmlkKCkgKyAnXCJdJylcclxuICB9XHJcbn1cclxuXHJcbi8vIERlZmluZSBtb3JwaGFibGUgYXJyYXlcclxuUGF0aC5wcm90b3R5cGUuTW9ycGhBcnJheSA9IFBhdGhBcnJheVxyXG5cclxuLy8gQWRkIHBhcmVudCBtZXRob2RcclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBDb250YWluZXI6IHtcclxuICAgIC8vIENyZWF0ZSBhIHdyYXBwZWQgcGF0aCBlbGVtZW50XHJcbiAgICBwYXRoOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoZCkge1xyXG4gICAgICAvLyBtYWtlIHN1cmUgcGxvdCBpcyBjYWxsZWQgYXMgYSBzZXR0ZXJcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBQYXRoKCkpLnBsb3QoZCB8fCBuZXcgUGF0aEFycmF5KCkpXHJcbiAgICB9KVxyXG4gIH1cclxufSlcclxuXHJcbnJlZ2lzdGVyKFBhdGgpXHJcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuaW1wb3J0IEJveCBmcm9tICcuLi90eXBlcy9Cb3guanMnXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXIuanMnXHJcbmltcG9ydCBiYXNlRmluZCBmcm9tICcuLi9tb2R1bGVzL2NvcmUvc2VsZWN0b3IuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXR0ZXJuIGV4dGVuZHMgQ29udGFpbmVyIHtcclxuICAvLyBJbml0aWFsaXplIG5vZGVcclxuICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgc3VwZXIobm9kZU9yTmV3KCdwYXR0ZXJuJywgbm9kZSksIG5vZGUpXHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm4gdGhlIGZpbGwgaWRcclxuICB1cmwgKCkge1xyXG4gICAgcmV0dXJuICd1cmwoIycgKyB0aGlzLmlkKCkgKyAnKSdcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZSBwYXR0ZXJuIGJ5IHJlYnVpbGRpbmdcclxuICB1cGRhdGUgKGJsb2NrKSB7XHJcbiAgICAvLyByZW1vdmUgY29udGVudFxyXG4gICAgdGhpcy5jbGVhcigpXHJcblxyXG4gICAgLy8gaW52b2tlIHBhc3NlZCBibG9ja1xyXG4gICAgaWYgKHR5cGVvZiBibG9jayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBibG9jay5jYWxsKHRoaXMsIHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIEFsaWFzIHN0cmluZyBjb252ZXJ0aW9uIHRvIGZpbGxcclxuICB0b1N0cmluZyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy51cmwoKVxyXG4gIH1cclxuXHJcbiAgLy8gY3VzdG9tIGF0dHIgdG8gaGFuZGxlIHRyYW5zZm9ybVxyXG4gIGF0dHIgKGEsIGIsIGMpIHtcclxuICAgIGlmIChhID09PSAndHJhbnNmb3JtJykgYSA9ICdwYXR0ZXJuVHJhbnNmb3JtJ1xyXG4gICAgcmV0dXJuIHN1cGVyLmF0dHIoYSwgYiwgYylcclxuICB9XHJcblxyXG4gIHRhcmdldHMgKCkge1xyXG4gICAgcmV0dXJuIGJhc2VGaW5kKCdzdmcgW2ZpbGwqPVwiJyArIHRoaXMuaWQoKSArICdcIl0nKVxyXG4gIH1cclxuXHJcbiAgYmJveCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IEJveCgpXHJcbiAgfVxyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoe1xyXG4gIENvbnRhaW5lcjoge1xyXG4gICAgLy8gQ3JlYXRlIHBhdHRlcm4gZWxlbWVudCBpbiBkZWZzXHJcbiAgICBwYXR0ZXJuICguLi5hcmdzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRlZnMoKS5wYXR0ZXJuKC4uLmFyZ3MpXHJcbiAgICB9XHJcbiAgfSxcclxuICBEZWZzOiB7XHJcbiAgICBwYXR0ZXJuOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgYmxvY2spIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBQYXR0ZXJuKCkpLnVwZGF0ZShibG9jaykuYXR0cih7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwLFxyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBwYXR0ZXJuVW5pdHM6ICd1c2VyU3BhY2VPblVzZSdcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXIoUGF0dGVybilcclxuIiwiaW1wb3J0IHtcclxuICBleHRlbmQsXHJcbiAgbm9kZU9yTmV3LFxyXG4gIHJlZ2lzdGVyLFxyXG4gIHdyYXBXaXRoQXR0ckNoZWNrXHJcbn0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuaW1wb3J0IFBvaW50QXJyYXkgZnJvbSAnLi4vdHlwZXMvUG9pbnRBcnJheS5qcydcclxuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXHJcbmltcG9ydCAqIGFzIHBvaW50ZWQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3BvaW50ZWQuanMnXHJcbmltcG9ydCAqIGFzIHBvbHkgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3BvbHkuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2x5Z29uIGV4dGVuZHMgU2hhcGUge1xyXG4gIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ3BvbHlnb24nLCBub2RlKSwgbm9kZSlcclxuICB9XHJcbn1cclxuXHJcbnJlZ2lzdGVyTWV0aG9kcyh7XHJcbiAgQ29udGFpbmVyOiB7XHJcbiAgICAvLyBDcmVhdGUgYSB3cmFwcGVkIHBvbHlnb24gZWxlbWVudFxyXG4gICAgcG9seWdvbjogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHApIHtcclxuICAgICAgLy8gbWFrZSBzdXJlIHBsb3QgaXMgY2FsbGVkIGFzIGEgc2V0dGVyXHJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgUG9seWdvbigpKS5wbG90KHAgfHwgbmV3IFBvaW50QXJyYXkoKSlcclxuICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxuZXh0ZW5kKFBvbHlnb24sIHBvaW50ZWQpXHJcbmV4dGVuZChQb2x5Z29uLCBwb2x5KVxyXG5yZWdpc3RlcihQb2x5Z29uKVxyXG4iLCJpbXBvcnQge1xyXG4gIGV4dGVuZCxcclxuICBub2RlT3JOZXcsXHJcbiAgcmVnaXN0ZXIsXHJcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcclxufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgUG9pbnRBcnJheSBmcm9tICcuLi90eXBlcy9Qb2ludEFycmF5LmpzJ1xyXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZS5qcydcclxuaW1wb3J0ICogYXMgcG9pbnRlZCBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcG9pbnRlZC5qcydcclxuaW1wb3J0ICogYXMgcG9seSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcG9seS5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlsaW5lIGV4dGVuZHMgU2hhcGUge1xyXG4gIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ3BvbHlsaW5lJywgbm9kZSksIG5vZGUpXHJcbiAgfVxyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoe1xyXG4gIENvbnRhaW5lcjoge1xyXG4gICAgLy8gQ3JlYXRlIGEgd3JhcHBlZCBwb2x5Z29uIGVsZW1lbnRcclxuICAgIHBvbHlsaW5lOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAocCkge1xyXG4gICAgICAvLyBtYWtlIHN1cmUgcGxvdCBpcyBjYWxsZWQgYXMgYSBzZXR0ZXJcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBQb2x5bGluZSgpKS5wbG90KHAgfHwgbmV3IFBvaW50QXJyYXkoKSlcclxuICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxuZXh0ZW5kKFBvbHlsaW5lLCBwb2ludGVkKVxyXG5leHRlbmQoUG9seWxpbmUsIHBvbHkpXHJcbnJlZ2lzdGVyKFBvbHlsaW5lKVxyXG4iLCJpbXBvcnQge1xyXG4gIGV4dGVuZCxcclxuICBub2RlT3JOZXcsXHJcbiAgcmVnaXN0ZXIsXHJcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcclxufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgeyByeCwgcnkgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvY2lyY2xlZC5qcydcclxuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0IGV4dGVuZHMgU2hhcGUge1xyXG4gIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ3JlY3QnLCBub2RlKSwgbm9kZSlcclxuICB9XHJcbn1cclxuXHJcbmV4dGVuZChSZWN0LCB7IHJ4LCByeSB9KVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBDb250YWluZXI6IHtcclxuICAgIC8vIENyZWF0ZSBhIHJlY3QgZWxlbWVudFxyXG4gICAgcmVjdDogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBSZWN0KCkpLnNpemUod2lkdGgsIGhlaWdodClcclxuICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXIoUmVjdClcclxuIiwiaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL0VsZW1lbnQuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIEVsZW1lbnQge31cclxuXHJcbnJlZ2lzdGVyKFNoYXBlKVxyXG4iLCJpbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi9FbGVtZW50LmpzJ1xyXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uL3R5cGVzL1NWR051bWJlci5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3AgZXh0ZW5kcyBFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgc3VwZXIobm9kZU9yTmV3KCdzdG9wJywgbm9kZSksIG5vZGUpXHJcbiAgfVxyXG5cclxuICAvLyBhZGQgY29sb3Igc3RvcHNcclxuICB1cGRhdGUgKG8pIHtcclxuICAgIGlmICh0eXBlb2YgbyA9PT0gJ251bWJlcicgfHwgbyBpbnN0YW5jZW9mIFNWR051bWJlcikge1xyXG4gICAgICBvID0ge1xyXG4gICAgICAgIG9mZnNldDogYXJndW1lbnRzWzBdLFxyXG4gICAgICAgIGNvbG9yOiBhcmd1bWVudHNbMV0sXHJcbiAgICAgICAgb3BhY2l0eTogYXJndW1lbnRzWzJdXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgYXR0cmlidXRlc1xyXG4gICAgaWYgKG8ub3BhY2l0eSAhPSBudWxsKSB0aGlzLmF0dHIoJ3N0b3Atb3BhY2l0eScsIG8ub3BhY2l0eSlcclxuICAgIGlmIChvLmNvbG9yICE9IG51bGwpIHRoaXMuYXR0cignc3RvcC1jb2xvcicsIG8uY29sb3IpXHJcbiAgICBpZiAoby5vZmZzZXQgIT0gbnVsbCkgdGhpcy5hdHRyKCdvZmZzZXQnLCBuZXcgU1ZHTnVtYmVyKG8ub2Zmc2V0KSlcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG5cclxucmVnaXN0ZXIoU3RvcClcclxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgeyB1bkNhbWVsQ2FzZSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xyXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL0VsZW1lbnQuanMnXHJcblxyXG5mdW5jdGlvbiBjc3NSdWxlIChzZWxlY3RvciwgcnVsZSkge1xyXG4gIGlmICghc2VsZWN0b3IpIHJldHVybiAnJ1xyXG4gIGlmICghcnVsZSkgcmV0dXJuIHNlbGVjdG9yXHJcblxyXG4gIHZhciByZXQgPSBzZWxlY3RvciArICd7J1xyXG5cclxuICBmb3IgKHZhciBpIGluIHJ1bGUpIHtcclxuICAgIHJldCArPSB1bkNhbWVsQ2FzZShpKSArICc6JyArIHJ1bGVbaV0gKyAnOydcclxuICB9XHJcblxyXG4gIHJldCArPSAnfSdcclxuXHJcbiAgcmV0dXJuIHJldFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZSBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ3N0eWxlJywgbm9kZSksIG5vZGUpXHJcbiAgfVxyXG5cclxuICBhZGRUZXh0ICh3ID0gJycpIHtcclxuICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCArPSB3XHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgZm9udCAobmFtZSwgc3JjLCBwYXJhbXMgPSB7fSkge1xyXG4gICAgcmV0dXJuIHRoaXMucnVsZSgnQGZvbnQtZmFjZScsIHtcclxuICAgICAgZm9udEZhbWlseTogbmFtZSxcclxuICAgICAgc3JjOiBzcmMsXHJcbiAgICAgIC4uLnBhcmFtc1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJ1bGUgKHNlbGVjdG9yLCBvYmopIHtcclxuICAgIHJldHVybiB0aGlzLmFkZFRleHQoY3NzUnVsZShzZWxlY3Rvciwgb2JqKSlcclxuICB9XHJcbn1cclxuXHJcbnJlZ2lzdGVyTWV0aG9kcygnRG9tJywge1xyXG4gIHN0eWxlOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAoc2VsZWN0b3IsIG9iaikge1xyXG4gICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTdHlsZSgpKS5ydWxlKHNlbGVjdG9yLCBvYmopXHJcbiAgfSksXHJcbiAgZm9udGZhY2U6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uIChuYW1lLCBzcmMsIHBhcmFtcykge1xyXG4gICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTdHlsZSgpKS5mb250KG5hbWUsIHNyYywgcGFyYW1zKVxyXG4gIH0pXHJcbn0pXHJcblxyXG5yZWdpc3RlcihTdHlsZSlcclxuIiwiaW1wb3J0IHtcclxuICBhZG9wdCxcclxuICBub2RlT3JOZXcsXHJcbiAgcmVnaXN0ZXIsXHJcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcclxufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyBucywgc3ZnanMsIHhsaW5rLCB4bWxucyB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9uYW1lc3BhY2VzLmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xyXG5pbXBvcnQgRGVmcyBmcm9tICcuL0RlZnMuanMnXHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdmcgZXh0ZW5kcyBDb250YWluZXIge1xyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ3N2ZycsIG5vZGUpLCBub2RlKVxyXG4gICAgdGhpcy5uYW1lc3BhY2UoKVxyXG4gIH1cclxuXHJcbiAgaXNSb290ICgpIHtcclxuICAgIHJldHVybiAhdGhpcy5ub2RlLnBhcmVudE5vZGVcclxuICAgICAgfHwgISh0aGlzLm5vZGUucGFyZW50Tm9kZSBpbnN0YW5jZW9mIGdsb2JhbHMud2luZG93LlNWR0VsZW1lbnQpXHJcbiAgICAgIHx8IHRoaXMubm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50J1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgaWYgdGhpcyBpcyBhIHJvb3Qgc3ZnXHJcbiAgLy8gSWYgbm90LCBjYWxsIGRvY3MgZnJvbSB0aGlzIGVsZW1lbnRcclxuICByb290ICgpIHtcclxuICAgIGlmICh0aGlzLmlzUm9vdCgpKSByZXR1cm4gdGhpc1xyXG4gICAgcmV0dXJuIHN1cGVyLnJvb3QoKVxyXG4gIH1cclxuXHJcbiAgLy8gQWRkIG5hbWVzcGFjZXNcclxuICBuYW1lc3BhY2UgKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzUm9vdCgpKSByZXR1cm4gdGhpcy5yb290KCkubmFtZXNwYWNlKClcclxuICAgIHJldHVybiB0aGlzXHJcbiAgICAgIC5hdHRyKHsgeG1sbnM6IG5zLCB2ZXJzaW9uOiAnMS4xJyB9KVxyXG4gICAgICAuYXR0cigneG1sbnM6eGxpbmsnLCB4bGluaywgeG1sbnMpXHJcbiAgICAgIC5hdHRyKCd4bWxuczpzdmdqcycsIHN2Z2pzLCB4bWxucylcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZXMgYW5kIHJldHVybnMgZGVmcyBlbGVtZW50XHJcbiAgZGVmcyAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNSb290KCkpIHJldHVybiB0aGlzLnJvb3QoKS5kZWZzKClcclxuXHJcbiAgICByZXR1cm4gYWRvcHQodGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJ2RlZnMnKSlcclxuICAgICAgfHwgdGhpcy5wdXQobmV3IERlZnMoKSlcclxuICB9XHJcblxyXG4gIC8vIGN1c3RvbSBwYXJlbnQgbWV0aG9kXHJcbiAgcGFyZW50ICh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy5pc1Jvb3QoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnBhcmVudE5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBhZG9wdCh0aGlzLm5vZGUucGFyZW50Tm9kZSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3VwZXIucGFyZW50KHR5cGUpXHJcbiAgfVxyXG5cclxuICBjbGVhciAoKSB7XHJcbiAgICAvLyByZW1vdmUgY2hpbGRyZW5cclxuICAgIHdoaWxlICh0aGlzLm5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUubGFzdENoaWxkKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSBkZWZzIHJlZmVyZW5jZVxyXG4gICAgZGVsZXRlIHRoaXMuX2RlZnNcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBDb250YWluZXI6IHtcclxuICAgIC8vIENyZWF0ZSBuZXN0ZWQgc3ZnIGRvY3VtZW50XHJcbiAgICBuZXN0ZWQ6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTdmcoKSlcclxuICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXIoU3ZnLCAnU3ZnJywgdHJ1ZSlcclxuIiwiaW1wb3J0IHsgbm9kZU9yTmV3LCByZWdpc3Rlciwgd3JhcFdpdGhBdHRyQ2hlY2sgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ltYm9sIGV4dGVuZHMgQ29udGFpbmVyIHtcclxuICAvLyBJbml0aWFsaXplIG5vZGVcclxuICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgc3VwZXIobm9kZU9yTmV3KCdzeW1ib2wnLCBub2RlKSwgbm9kZSlcclxuICB9XHJcbn1cclxuXHJcbnJlZ2lzdGVyTWV0aG9kcyh7XHJcbiAgQ29udGFpbmVyOiB7XHJcbiAgICBzeW1ib2w6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTeW1ib2woKSlcclxuICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXIoU3ltYm9sKVxyXG4iLCJpbXBvcnQge1xyXG4gIGFkb3B0LFxyXG4gIGV4dGVuZCxcclxuICBub2RlT3JOZXcsXHJcbiAgcmVnaXN0ZXIsXHJcbiAgd3JhcFdpdGhBdHRyQ2hlY2tcclxufSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uL3R5cGVzL1NWR051bWJlci5qcydcclxuaW1wb3J0IFNoYXBlIGZyb20gJy4vU2hhcGUuanMnXHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXHJcbmltcG9ydCAqIGFzIHRleHRhYmxlIGZyb20gJy4uL21vZHVsZXMvY29yZS90ZXh0YWJsZS5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBTaGFwZSB7XHJcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgY29uc3RydWN0b3IgKG5vZGUpIHtcclxuICAgIHN1cGVyKG5vZGVPck5ldygndGV4dCcsIG5vZGUpLCBub2RlKVxyXG5cclxuICAgIHRoaXMuZG9tLmxlYWRpbmcgPSBuZXcgU1ZHTnVtYmVyKDEuMykgLy8gc3RvcmUgbGVhZGluZyB2YWx1ZSBmb3IgcmVidWlsZGluZ1xyXG4gICAgdGhpcy5fcmVidWlsZCA9IHRydWUgLy8gZW5hYmxlIGF1dG9tYXRpYyB1cGRhdGluZyBvZiBkeSB2YWx1ZXNcclxuICAgIHRoaXMuX2J1aWxkID0gZmFsc2UgLy8gZGlzYWJsZSBidWlsZCBtb2RlIGZvciBhZGRpbmcgbXVsdGlwbGUgbGluZXNcclxuICB9XHJcblxyXG4gIC8vIE1vdmUgb3ZlciB4LWF4aXNcclxuICAvLyBUZXh0IGlzIG1vdmVkIGl0cyBib3VuZGluZyBib3hcclxuICAvLyB0ZXh0LWFuY2hvciBkb2VzIE5PVCBtYXR0ZXJcclxuICB4ICh4LCBib3ggPSB0aGlzLmJib3goKSkge1xyXG4gICAgaWYgKHggPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gYm94LnhcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCd4JywgdGhpcy5hdHRyKCd4JykgKyB4IC0gYm94LngpXHJcbiAgfVxyXG5cclxuICAvLyBNb3ZlIG92ZXIgeS1heGlzXHJcbiAgeSAoeSwgYm94ID0gdGhpcy5iYm94KCkpIHtcclxuICAgIGlmICh5ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIGJveC55XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXR0cigneScsIHRoaXMuYXR0cigneScpICsgeSAtIGJveC55KVxyXG4gIH1cclxuXHJcbiAgbW92ZSAoeCwgeSwgYm94ID0gdGhpcy5iYm94KCkpIHtcclxuICAgIHJldHVybiB0aGlzLngoeCwgYm94KS55KHksIGJveClcclxuICB9XHJcblxyXG4gIC8vIE1vdmUgY2VudGVyIG92ZXIgeC1heGlzXHJcbiAgY3ggKHgsIGJveCA9IHRoaXMuYmJveCgpKSB7XHJcbiAgICBpZiAoeCA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBib3guY3hcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCd4JywgdGhpcy5hdHRyKCd4JykgKyB4IC0gYm94LmN4KVxyXG4gIH1cclxuXHJcbiAgLy8gTW92ZSBjZW50ZXIgb3ZlciB5LWF4aXNcclxuICBjeSAoeSwgYm94ID0gdGhpcy5iYm94KCkpIHtcclxuICAgIGlmICh5ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIGJveC5jeVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmF0dHIoJ3knLCB0aGlzLmF0dHIoJ3knKSArIHkgLSBib3guY3kpXHJcbiAgfVxyXG5cclxuICBjZW50ZXIgKHgsIHksIGJveCA9IHRoaXMuYmJveCgpKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jeCh4LCBib3gpLmN5KHksIGJveClcclxuICB9XHJcblxyXG4gIC8vIFNldCB0aGUgdGV4dCBjb250ZW50XHJcbiAgdGV4dCAodGV4dCkge1xyXG4gICAgLy8gYWN0IGFzIGdldHRlclxyXG4gICAgaWYgKHRleHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGROb2Rlc1xyXG4gICAgICB2YXIgZmlyc3RMaW5lID0gMFxyXG4gICAgICB0ZXh0ID0gJydcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIC8vIHNraXAgdGV4dFBhdGhzIC0gdGhleSBhcmUgbm8gbGluZXNcclxuICAgICAgICBpZiAoY2hpbGRyZW5baV0ubm9kZU5hbWUgPT09ICd0ZXh0UGF0aCcpIHtcclxuICAgICAgICAgIGlmIChpID09PSAwKSBmaXJzdExpbmUgPSAxXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIG5ld2xpbmUgaWYgaXRzIG5vdCB0aGUgZmlyc3QgY2hpbGQgYW5kIG5ld0xpbmVkIGlzIHNldCB0byB0cnVlXHJcbiAgICAgICAgaWYgKGkgIT09IGZpcnN0TGluZSAmJiBjaGlsZHJlbltpXS5ub2RlVHlwZSAhPT0gMyAmJiBhZG9wdChjaGlsZHJlbltpXSkuZG9tLm5ld0xpbmVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICB0ZXh0ICs9ICdcXG4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgY29udGVudCBvZiB0aGlzIG5vZGVcclxuICAgICAgICB0ZXh0ICs9IGNoaWxkcmVuW2ldLnRleHRDb250ZW50XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0ZXh0XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVtb3ZlIGV4aXN0aW5nIGNvbnRlbnRcclxuICAgIHRoaXMuY2xlYXIoKS5idWlsZCh0cnVlKVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAvLyBjYWxsIGJsb2NrXHJcbiAgICAgIHRleHQuY2FsbCh0aGlzLCB0aGlzKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc3RvcmUgdGV4dCBhbmQgbWFrZSBzdXJlIHRleHQgaXMgbm90IGJsYW5rXHJcbiAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KCdcXG4nKVxyXG5cclxuICAgICAgLy8gYnVpbGQgbmV3IGxpbmVzXHJcbiAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IHRleHQubGVuZ3RoOyBqIDwgamw7IGorKykge1xyXG4gICAgICAgIHRoaXMudHNwYW4odGV4dFtqXSkubmV3TGluZSgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkaXNhYmxlIGJ1aWxkIG1vZGUgYW5kIHJlYnVpbGQgbGluZXNcclxuICAgIHJldHVybiB0aGlzLmJ1aWxkKGZhbHNlKS5yZWJ1aWxkKClcclxuICB9XHJcblxyXG4gIC8vIFNldCAvIGdldCBsZWFkaW5nXHJcbiAgbGVhZGluZyAodmFsdWUpIHtcclxuICAgIC8vIGFjdCBhcyBnZXR0ZXJcclxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRvbS5sZWFkaW5nXHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWN0IGFzIHNldHRlclxyXG4gICAgdGhpcy5kb20ubGVhZGluZyA9IG5ldyBTVkdOdW1iZXIodmFsdWUpXHJcblxyXG4gICAgcmV0dXJuIHRoaXMucmVidWlsZCgpXHJcbiAgfVxyXG5cclxuICAvLyBSZWJ1aWxkIGFwcGVhcmFuY2UgdHlwZVxyXG4gIHJlYnVpbGQgKHJlYnVpbGQpIHtcclxuICAgIC8vIHN0b3JlIG5ldyByZWJ1aWxkIGZsYWcgaWYgZ2l2ZW5cclxuICAgIGlmICh0eXBlb2YgcmVidWlsZCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHRoaXMuX3JlYnVpbGQgPSByZWJ1aWxkXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVmaW5lIHBvc2l0aW9uIG9mIGFsbCBsaW5lc1xyXG4gICAgaWYgKHRoaXMuX3JlYnVpbGQpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIHZhciBibGFua0xpbmVPZmZzZXQgPSAwXHJcbiAgICAgIHZhciBsZWFkaW5nID0gdGhpcy5kb20ubGVhZGluZ1xyXG5cclxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZm9udFNpemUgPSBnbG9iYWxzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubm9kZSlcclxuICAgICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKVxyXG4gICAgICAgIHZhciBkeSA9IGxlYWRpbmcgKiBuZXcgU1ZHTnVtYmVyKGZvbnRTaXplKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kb20ubmV3TGluZWQpIHtcclxuICAgICAgICAgIHRoaXMuYXR0cigneCcsIHNlbGYuYXR0cigneCcpKVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLnRleHQoKSA9PT0gJ1xcbicpIHtcclxuICAgICAgICAgICAgYmxhbmtMaW5lT2Zmc2V0ICs9IGR5XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF0dHIoJ2R5JywgZHkgKyBibGFua0xpbmVPZmZzZXQpXHJcbiAgICAgICAgICAgIGJsYW5rTGluZU9mZnNldCA9IDBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLmZpcmUoJ3JlYnVpbGQnKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBFbmFibGUgLyBkaXNhYmxlIGJ1aWxkIG1vZGVcclxuICBidWlsZCAoYnVpbGQpIHtcclxuICAgIHRoaXMuX2J1aWxkID0gISFidWlsZFxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIG92ZXJ3cml0ZSBtZXRob2QgZnJvbSBwYXJlbnQgdG8gc2V0IGRhdGEgcHJvcGVybHlcclxuICBzZXREYXRhIChvKSB7XHJcbiAgICB0aGlzLmRvbSA9IG9cclxuICAgIHRoaXMuZG9tLmxlYWRpbmcgPSBuZXcgU1ZHTnVtYmVyKG8ubGVhZGluZyB8fCAxLjMpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG5cclxuZXh0ZW5kKFRleHQsIHRleHRhYmxlKVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBDb250YWluZXI6IHtcclxuICAgIC8vIENyZWF0ZSB0ZXh0IGVsZW1lbnRcclxuICAgIHRleHQ6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgVGV4dCgpKS50ZXh0KHRleHQpXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBDcmVhdGUgcGxhaW4gdGV4dCBlbGVtZW50XHJcbiAgICBwbGFpbjogd3JhcFdpdGhBdHRyQ2hlY2soZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBUZXh0KCkpLnBsYWluKHRleHQpXHJcbiAgICB9KVxyXG4gIH1cclxufSlcclxuXHJcbnJlZ2lzdGVyKFRleHQpXHJcbiIsImltcG9ydCB7IG5vZGVPck5ldywgcmVnaXN0ZXIsIHdyYXBXaXRoQXR0ckNoZWNrIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuaW1wb3J0IHsgeGxpbmsgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvbmFtZXNwYWNlcy5qcydcclxuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJ1xyXG5pbXBvcnQgUGF0aEFycmF5IGZyb20gJy4uL3R5cGVzL1BhdGhBcnJheS5qcydcclxuaW1wb3J0IFRleHQgZnJvbSAnLi9UZXh0LmpzJ1xyXG5pbXBvcnQgYmFzZUZpbmQgZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3NlbGVjdG9yLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFBhdGggZXh0ZW5kcyBUZXh0IHtcclxuICAvLyBJbml0aWFsaXplIG5vZGVcclxuICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgc3VwZXIobm9kZU9yTmV3KCd0ZXh0UGF0aCcsIG5vZGUpLCBub2RlKVxyXG4gIH1cclxuXHJcbiAgLy8gcmV0dXJuIHRoZSBhcnJheSBvZiB0aGUgcGF0aCB0cmFjayBlbGVtZW50XHJcbiAgYXJyYXkgKCkge1xyXG4gICAgdmFyIHRyYWNrID0gdGhpcy50cmFjaygpXHJcblxyXG4gICAgcmV0dXJuIHRyYWNrID8gdHJhY2suYXJyYXkoKSA6IG51bGxcclxuICB9XHJcblxyXG4gIC8vIFBsb3QgcGF0aCBpZiBhbnlcclxuICBwbG90IChkKSB7XHJcbiAgICB2YXIgdHJhY2sgPSB0aGlzLnRyYWNrKClcclxuICAgIHZhciBwYXRoQXJyYXkgPSBudWxsXHJcblxyXG4gICAgaWYgKHRyYWNrKSB7XHJcbiAgICAgIHBhdGhBcnJheSA9IHRyYWNrLnBsb3QoZClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGQgPT0gbnVsbCkgPyBwYXRoQXJyYXkgOiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBHZXQgdGhlIHBhdGggZWxlbWVudFxyXG4gIHRyYWNrICgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZmVyZW5jZSgnaHJlZicpXHJcbiAgfVxyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoe1xyXG4gIENvbnRhaW5lcjoge1xyXG4gICAgdGV4dFBhdGg6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh0ZXh0LCBwYXRoKSB7XHJcbiAgICAgIC8vIENvbnZlcnQgdGV4dCB0byBpbnN0YW5jZSBpZiBuZWVkZWRcclxuICAgICAgaWYgKCEodGV4dCBpbnN0YW5jZW9mIFRleHQpKSB7XHJcbiAgICAgICAgdGV4dCA9IHRoaXMudGV4dCh0ZXh0KVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGV4dC5wYXRoKHBhdGgpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgVGV4dDoge1xyXG4gICAgLy8gQ3JlYXRlIHBhdGggZm9yIHRleHQgdG8gcnVuIG9uXHJcbiAgICBwYXRoOiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAodHJhY2ssIGltcG9ydE5vZGVzID0gdHJ1ZSkge1xyXG4gICAgICB2YXIgdGV4dFBhdGggPSBuZXcgVGV4dFBhdGgoKVxyXG5cclxuICAgICAgLy8gaWYgdHJhY2sgaXMgYSBwYXRoLCByZXVzZSBpdFxyXG4gICAgICBpZiAoISh0cmFjayBpbnN0YW5jZW9mIFBhdGgpKSB7XHJcbiAgICAgICAgLy8gY3JlYXRlIHBhdGggZWxlbWVudFxyXG4gICAgICAgIHRyYWNrID0gdGhpcy5kZWZzKCkucGF0aCh0cmFjaylcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbGluayB0ZXh0UGF0aCB0byBwYXRoIGFuZCBhZGQgY29udGVudFxyXG4gICAgICB0ZXh0UGF0aC5hdHRyKCdocmVmJywgJyMnICsgdHJhY2ssIHhsaW5rKVxyXG5cclxuICAgICAgLy8gVHJhbnNwbGFudCBhbGwgbm9kZXMgZnJvbSB0ZXh0IHRvIHRleHRQYXRoXHJcbiAgICAgIGxldCBub2RlXHJcbiAgICAgIGlmIChpbXBvcnROb2Rlcykge1xyXG4gICAgICAgIHdoaWxlICgobm9kZSA9IHRoaXMubm9kZS5maXJzdENoaWxkKSkge1xyXG4gICAgICAgICAgdGV4dFBhdGgubm9kZS5hcHBlbmRDaGlsZChub2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYWRkIHRleHRQYXRoIGVsZW1lbnQgYXMgY2hpbGQgbm9kZSBhbmQgcmV0dXJuIHRleHRQYXRoXHJcbiAgICAgIHJldHVybiB0aGlzLnB1dCh0ZXh0UGF0aClcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIEdldCB0aGUgdGV4dFBhdGggY2hpbGRyZW5cclxuICAgIHRleHRQYXRoICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZmluZE9uZSgndGV4dFBhdGgnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgUGF0aDoge1xyXG4gICAgLy8gY3JlYXRlcyBhIHRleHRQYXRoIGZyb20gdGhpcyBwYXRoXHJcbiAgICB0ZXh0OiB3cmFwV2l0aEF0dHJDaGVjayhmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAvLyBDb252ZXJ0IHRleHQgdG8gaW5zdGFuY2UgaWYgbmVlZGVkXHJcbiAgICAgIGlmICghKHRleHQgaW5zdGFuY2VvZiBUZXh0KSkge1xyXG4gICAgICAgIHRleHQgPSBuZXcgVGV4dCgpLmFkZFRvKHRoaXMucGFyZW50KCkpLnRleHQodGV4dClcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ3JlYXRlIHRleHRQYXRoIGZyb20gdGV4dCBhbmQgcGF0aCBhbmQgcmV0dXJuXHJcbiAgICAgIHJldHVybiB0ZXh0LnBhdGgodGhpcylcclxuICAgIH0pLFxyXG5cclxuICAgIHRhcmdldHMgKCkge1xyXG4gICAgICByZXR1cm4gYmFzZUZpbmQoJ3N2ZyBbaHJlZio9XCInICsgdGhpcy5pZCgpICsgJ1wiXScpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuVGV4dFBhdGgucHJvdG90eXBlLk1vcnBoQXJyYXkgPSBQYXRoQXJyYXlcclxucmVnaXN0ZXIoVGV4dFBhdGgpXHJcbiIsImltcG9ydCB7XHJcbiAgZXh0ZW5kLFxyXG4gIG5vZGVPck5ldyxcclxuICByZWdpc3RlcixcclxuICB3cmFwV2l0aEF0dHJDaGVja1xyXG59IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXHJcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXHJcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xyXG5pbXBvcnQgVGV4dCBmcm9tICcuL1RleHQuanMnXHJcbmltcG9ydCAqIGFzIHRleHRhYmxlIGZyb20gJy4uL21vZHVsZXMvY29yZS90ZXh0YWJsZS5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRzcGFuIGV4dGVuZHMgVGV4dCB7XHJcbiAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgY29uc3RydWN0b3IgKG5vZGUpIHtcclxuICAgIHN1cGVyKG5vZGVPck5ldygndHNwYW4nLCBub2RlKSwgbm9kZSlcclxuICB9XHJcblxyXG4gIC8vIFNldCB0ZXh0IGNvbnRlbnRcclxuICB0ZXh0ICh0ZXh0KSB7XHJcbiAgICBpZiAodGV4dCA9PSBudWxsKSByZXR1cm4gdGhpcy5ub2RlLnRleHRDb250ZW50ICsgKHRoaXMuZG9tLm5ld0xpbmVkID8gJ1xcbicgOiAnJylcclxuXHJcbiAgICB0eXBlb2YgdGV4dCA9PT0gJ2Z1bmN0aW9uJyA/IHRleHQuY2FsbCh0aGlzLCB0aGlzKSA6IHRoaXMucGxhaW4odGV4dClcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLy8gU2hvcnRjdXQgZHhcclxuICBkeCAoZHgpIHtcclxuICAgIHJldHVybiB0aGlzLmF0dHIoJ2R4JywgZHgpXHJcbiAgfVxyXG5cclxuICAvLyBTaG9ydGN1dCBkeVxyXG4gIGR5IChkeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0cignZHknLCBkeSlcclxuICB9XHJcblxyXG4gIHggKHgpIHtcclxuICAgIHJldHVybiB0aGlzLmF0dHIoJ3gnLCB4KVxyXG4gIH1cclxuXHJcbiAgeSAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0cigneCcsIHkpXHJcbiAgfVxyXG5cclxuICBtb3ZlICh4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy54KHgpLnkoeSlcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZSBuZXcgbGluZVxyXG4gIG5ld0xpbmUgKCkge1xyXG4gICAgLy8gZmV0Y2ggdGV4dCBwYXJlbnRcclxuICAgIHZhciB0ID0gdGhpcy5wYXJlbnQoVGV4dClcclxuXHJcbiAgICAvLyBtYXJrIG5ldyBsaW5lXHJcbiAgICB0aGlzLmRvbS5uZXdMaW5lZCA9IHRydWVcclxuXHJcbiAgICB2YXIgZm9udFNpemUgPSBnbG9iYWxzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubm9kZSlcclxuICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ2ZvbnQtc2l6ZScpXHJcbiAgICB2YXIgZHkgPSB0LmRvbS5sZWFkaW5nICogbmV3IFNWR051bWJlcihmb250U2l6ZSlcclxuXHJcbiAgICAvLyBhcHBseSBuZXcgcG9zaXRpb25cclxuICAgIHJldHVybiB0aGlzLmR5KGR5KS5hdHRyKCd4JywgdC54KCkpXHJcbiAgfVxyXG59XHJcblxyXG5leHRlbmQoVHNwYW4sIHRleHRhYmxlKVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBUc3Bhbjoge1xyXG4gICAgdHNwYW46IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgIHZhciB0c3BhbiA9IG5ldyBUc3BhbigpXHJcblxyXG4gICAgICAvLyBjbGVhciBpZiBidWlsZCBtb2RlIGlzIGRpc2FibGVkXHJcbiAgICAgIGlmICghdGhpcy5fYnVpbGQpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYWRkIG5ldyB0c3BhblxyXG4gICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodHNwYW4ubm9kZSlcclxuXHJcbiAgICAgIHJldHVybiB0c3Bhbi50ZXh0KHRleHQpXHJcbiAgICB9KVxyXG4gIH1cclxufSlcclxuXHJcbnJlZ2lzdGVyKFRzcGFuKVxyXG4iLCJpbXBvcnQgeyBub2RlT3JOZXcsIHJlZ2lzdGVyLCB3cmFwV2l0aEF0dHJDaGVjayB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXHJcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL21ldGhvZHMuanMnXHJcbmltcG9ydCB7IHhsaW5rIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXHJcbmltcG9ydCBTaGFwZSBmcm9tICcuL1NoYXBlLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlIGV4dGVuZHMgU2hhcGUge1xyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICBzdXBlcihub2RlT3JOZXcoJ3VzZScsIG5vZGUpLCBub2RlKVxyXG4gIH1cclxuXHJcbiAgLy8gVXNlIGVsZW1lbnQgYXMgYSByZWZlcmVuY2VcclxuICBlbGVtZW50IChlbGVtZW50LCBmaWxlKSB7XHJcbiAgICAvLyBTZXQgbGluZWQgZWxlbWVudFxyXG4gICAgcmV0dXJuIHRoaXMuYXR0cignaHJlZicsIChmaWxlIHx8ICcnKSArICcjJyArIGVsZW1lbnQsIHhsaW5rKVxyXG4gIH1cclxufVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKHtcclxuICBDb250YWluZXI6IHtcclxuICAgIC8vIENyZWF0ZSBhIHVzZSBlbGVtZW50XHJcbiAgICB1c2U6IHdyYXBXaXRoQXR0ckNoZWNrKGZ1bmN0aW9uIChlbGVtZW50LCBmaWxlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgVXNlKCkpLmVsZW1lbnQoZWxlbWVudCwgZmlsZSlcclxuICAgIH0pXHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXIoVXNlKVxyXG4iLCIvKiBPcHRpb25hbCBNb2R1bGVzICovXHJcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL2FycmFuZ2UuanMnXHJcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL2NsYXNzLmpzJ1xyXG5pbXBvcnQgJy4vbW9kdWxlcy9vcHRpb25hbC9jc3MuanMnXHJcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL2RhdGEuanMnXHJcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL21lbW9yeS5qcydcclxuaW1wb3J0ICcuL21vZHVsZXMvb3B0aW9uYWwvc3VnYXIuanMnXHJcbmltcG9ydCAnLi9tb2R1bGVzL29wdGlvbmFsL3RyYW5zZm9ybS5qcydcclxuXHJcbmltcG9ydCB7IGV4dGVuZCwgbWFrZUluc3RhbmNlIH0gZnJvbSAnLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyBnZXRNZXRob2ROYW1lcywgZ2V0TWV0aG9kc0ZvciB9IGZyb20gJy4vdXRpbHMvbWV0aG9kcy5qcydcclxuaW1wb3J0IEJveCBmcm9tICcuL3R5cGVzL0JveC5qcydcclxuaW1wb3J0IENpcmNsZSBmcm9tICcuL2VsZW1lbnRzL0NpcmNsZS5qcydcclxuaW1wb3J0IENvbG9yIGZyb20gJy4vdHlwZXMvQ29sb3IuanMnXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9lbGVtZW50cy9Db250YWluZXIuanMnXHJcbmltcG9ydCBEZWZzIGZyb20gJy4vZWxlbWVudHMvRGVmcy5qcydcclxuaW1wb3J0IERvbSBmcm9tICcuL2VsZW1lbnRzL0RvbS5qcydcclxuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi9lbGVtZW50cy9FbGVtZW50LmpzJ1xyXG5pbXBvcnQgRWxsaXBzZSBmcm9tICcuL2VsZW1lbnRzL0VsbGlwc2UuanMnXHJcbmltcG9ydCBFdmVudFRhcmdldCBmcm9tICcuL3R5cGVzL0V2ZW50VGFyZ2V0LmpzJ1xyXG5pbXBvcnQgR3JhZGllbnQgZnJvbSAnLi9lbGVtZW50cy9HcmFkaWVudC5qcydcclxuaW1wb3J0IEltYWdlIGZyb20gJy4vZWxlbWVudHMvSW1hZ2UuanMnXHJcbmltcG9ydCBMaW5lIGZyb20gJy4vZWxlbWVudHMvTGluZS5qcydcclxuaW1wb3J0IExpc3QgZnJvbSAnLi90eXBlcy9MaXN0LmpzJ1xyXG5pbXBvcnQgTWFya2VyIGZyb20gJy4vZWxlbWVudHMvTWFya2VyLmpzJ1xyXG5pbXBvcnQgTWF0cml4IGZyb20gJy4vdHlwZXMvTWF0cml4LmpzJ1xyXG5pbXBvcnQgTW9ycGhhYmxlLCB7XHJcbiAgTm9uTW9ycGhhYmxlLFxyXG4gIE9iamVjdEJhZyxcclxuICBUcmFuc2Zvcm1CYWcsXHJcbiAgbWFrZU1vcnBoYWJsZSxcclxuICByZWdpc3Rlck1vcnBoYWJsZVR5cGVcclxufSBmcm9tICcuL2FuaW1hdGlvbi9Nb3JwaGFibGUuanMnXHJcbmltcG9ydCBQYXRoIGZyb20gJy4vZWxlbWVudHMvUGF0aC5qcydcclxuaW1wb3J0IFBhdGhBcnJheSBmcm9tICcuL3R5cGVzL1BhdGhBcnJheS5qcydcclxuaW1wb3J0IFBhdHRlcm4gZnJvbSAnLi9lbGVtZW50cy9QYXR0ZXJuLmpzJ1xyXG5pbXBvcnQgUG9pbnRBcnJheSBmcm9tICcuL3R5cGVzL1BvaW50QXJyYXkuanMnXHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vZWxlbWVudHMvUG9seWdvbi5qcydcclxuaW1wb3J0IFBvbHlsaW5lIGZyb20gJy4vZWxlbWVudHMvUG9seWxpbmUuanMnXHJcbmltcG9ydCBSZWN0IGZyb20gJy4vZWxlbWVudHMvUmVjdC5qcydcclxuaW1wb3J0IFJ1bm5lciBmcm9tICcuL2FuaW1hdGlvbi9SdW5uZXIuanMnXHJcbmltcG9ydCBTVkdBcnJheSBmcm9tICcuL3R5cGVzL1NWR0FycmF5LmpzJ1xyXG5pbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xyXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9lbGVtZW50cy9TaGFwZS5qcydcclxuaW1wb3J0IFN2ZyBmcm9tICcuL2VsZW1lbnRzL1N2Zy5qcydcclxuaW1wb3J0IFN5bWJvbCBmcm9tICcuL2VsZW1lbnRzL1N5bWJvbC5qcydcclxuaW1wb3J0IFRleHQgZnJvbSAnLi9lbGVtZW50cy9UZXh0LmpzJ1xyXG5pbXBvcnQgVHNwYW4gZnJvbSAnLi9lbGVtZW50cy9Uc3Bhbi5qcydcclxuaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnLi9tb2R1bGVzL2NvcmUvZGVmYXVsdHMuanMnXHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMvdXRpbHMuanMnXHJcbmltcG9ydCAqIGFzIG5hbWVzcGFjZXMgZnJvbSAnLi9tb2R1bGVzL2NvcmUvbmFtZXNwYWNlcy5qcydcclxuaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXHJcblxyXG5leHBvcnQge1xyXG4gIE1vcnBoYWJsZSxcclxuICByZWdpc3Rlck1vcnBoYWJsZVR5cGUsXHJcbiAgbWFrZU1vcnBoYWJsZSxcclxuICBUcmFuc2Zvcm1CYWcsXHJcbiAgT2JqZWN0QmFnLFxyXG4gIE5vbk1vcnBoYWJsZVxyXG59XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0cywgdXRpbHMsIG5hbWVzcGFjZXMsIHJlZ2V4IH1cclxuZXhwb3J0IGNvbnN0IFNWRyA9IG1ha2VJbnN0YW5jZVxyXG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlciB9IGZyb20gJy4vbW9kdWxlcy9jb3JlL3BhcnNlci5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBmaW5kIH0gZnJvbSAnLi9tb2R1bGVzL2NvcmUvc2VsZWN0b3IuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlcy9jb3JlL2V2ZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2Fkb3B0ZXIuanMnXHJcbmV4cG9ydCB7IHJlZ2lzdGVyV2luZG93IH0gZnJvbSAnLi91dGlscy93aW5kb3cuanMnXHJcblxyXG4vKiBBbmltYXRpb24gTW9kdWxlcyAqL1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFuaW1hdG9yIH0gZnJvbSAnLi9hbmltYXRpb24vQW5pbWF0b3IuanMnXHJcbmV4cG9ydCB7IENvbnRyb2xsZXIsIEVhc2UsIFBJRCwgU3ByaW5nLCBlYXNpbmcgfSBmcm9tICcuL2FuaW1hdGlvbi9Db250cm9sbGVyLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFF1ZXVlIH0gZnJvbSAnLi9hbmltYXRpb24vUXVldWUuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUnVubmVyIH0gZnJvbSAnLi9hbmltYXRpb24vUnVubmVyLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFRpbWVsaW5lIH0gZnJvbSAnLi9hbmltYXRpb24vVGltZWxpbmUuanMnXHJcblxyXG4vKiBUeXBlcyAqL1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFycmF5IH0gZnJvbSAnLi90eXBlcy9TVkdBcnJheS5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb3ggfSBmcm9tICcuL3R5cGVzL0JveC5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDb2xvciB9IGZyb20gJy4vdHlwZXMvQ29sb3IuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRXZlbnRUYXJnZXQgfSBmcm9tICcuL3R5cGVzL0V2ZW50VGFyZ2V0LmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hdHJpeCB9IGZyb20gJy4vdHlwZXMvTWF0cml4LmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIE51bWJlciB9IGZyb20gJy4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBhdGhBcnJheSB9IGZyb20gJy4vdHlwZXMvUGF0aEFycmF5LmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBvaW50IH0gZnJvbSAnLi90eXBlcy9Qb2ludC5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQb2ludEFycmF5IH0gZnJvbSAnLi90eXBlcy9Qb2ludEFycmF5LmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIExpc3QgfSBmcm9tICcuL3R5cGVzL0xpc3QuanMnXHJcblxyXG4vKiBFbGVtZW50cyAqL1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIENpcmNsZSB9IGZyb20gJy4vZWxlbWVudHMvQ2lyY2xlLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIENsaXBQYXRoIH0gZnJvbSAnLi9lbGVtZW50cy9DbGlwUGF0aC5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDb250YWluZXIgfSBmcm9tICcuL2VsZW1lbnRzL0NvbnRhaW5lci5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBEZWZzIH0gZnJvbSAnLi9lbGVtZW50cy9EZWZzLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIERvbSB9IGZyb20gJy4vZWxlbWVudHMvRG9tLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEVsZW1lbnQgfSBmcm9tICcuL2VsZW1lbnRzL0VsZW1lbnQuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRWxsaXBzZSB9IGZyb20gJy4vZWxlbWVudHMvRWxsaXBzZS5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBGb3JlaWduT2JqZWN0IH0gZnJvbSAnLi9lbGVtZW50cy9Gb3JlaWduT2JqZWN0LmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEdyYWRpZW50IH0gZnJvbSAnLi9lbGVtZW50cy9HcmFkaWVudC5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBHIH0gZnJvbSAnLi9lbGVtZW50cy9HLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEEgfSBmcm9tICcuL2VsZW1lbnRzL0EuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW1hZ2UgfSBmcm9tICcuL2VsZW1lbnRzL0ltYWdlLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIExpbmUgfSBmcm9tICcuL2VsZW1lbnRzL0xpbmUuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFya2VyIH0gZnJvbSAnLi9lbGVtZW50cy9NYXJrZXIuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFzayB9IGZyb20gJy4vZWxlbWVudHMvTWFzay5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQYXRoIH0gZnJvbSAnLi9lbGVtZW50cy9QYXRoLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBhdHRlcm4gfSBmcm9tICcuL2VsZW1lbnRzL1BhdHRlcm4uanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUG9seWdvbiB9IGZyb20gJy4vZWxlbWVudHMvUG9seWdvbi5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQb2x5bGluZSB9IGZyb20gJy4vZWxlbWVudHMvUG9seWxpbmUuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUmVjdCB9IGZyb20gJy4vZWxlbWVudHMvUmVjdC5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBTaGFwZSB9IGZyb20gJy4vZWxlbWVudHMvU2hhcGUuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3RvcCB9IGZyb20gJy4vZWxlbWVudHMvU3RvcC5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdHlsZSB9IGZyb20gJy4vZWxlbWVudHMvU3R5bGUuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3ZnIH0gZnJvbSAnLi9lbGVtZW50cy9TdmcuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3ltYm9sIH0gZnJvbSAnLi9lbGVtZW50cy9TeW1ib2wuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dCB9IGZyb20gJy4vZWxlbWVudHMvVGV4dC5qcydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBUZXh0UGF0aCB9IGZyb20gJy4vZWxlbWVudHMvVGV4dFBhdGguanMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHNwYW4gfSBmcm9tICcuL2VsZW1lbnRzL1RzcGFuLmpzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFVzZSB9IGZyb20gJy4vZWxlbWVudHMvVXNlLmpzJ1xyXG5cclxuZXh0ZW5kKFtcclxuICBTdmcsXHJcbiAgU3ltYm9sLFxyXG4gIEltYWdlLFxyXG4gIFBhdHRlcm4sXHJcbiAgTWFya2VyXHJcbl0sIGdldE1ldGhvZHNGb3IoJ3ZpZXdib3gnKSlcclxuXHJcbmV4dGVuZChbXHJcbiAgTGluZSxcclxuICBQb2x5bGluZSxcclxuICBQb2x5Z29uLFxyXG4gIFBhdGhcclxuXSwgZ2V0TWV0aG9kc0ZvcignbWFya2VyJykpXHJcblxyXG5leHRlbmQoVGV4dCwgZ2V0TWV0aG9kc0ZvcignVGV4dCcpKVxyXG5leHRlbmQoUGF0aCwgZ2V0TWV0aG9kc0ZvcignUGF0aCcpKVxyXG5cclxuZXh0ZW5kKERlZnMsIGdldE1ldGhvZHNGb3IoJ0RlZnMnKSlcclxuXHJcbmV4dGVuZChbXHJcbiAgVGV4dCxcclxuICBUc3BhblxyXG5dLCBnZXRNZXRob2RzRm9yKCdUc3BhbicpKVxyXG5cclxuZXh0ZW5kKFtcclxuICBSZWN0LFxyXG4gIEVsbGlwc2UsXHJcbiAgQ2lyY2xlLFxyXG4gIEdyYWRpZW50XHJcbl0sIGdldE1ldGhvZHNGb3IoJ3JhZGl1cycpKVxyXG5cclxuZXh0ZW5kKEV2ZW50VGFyZ2V0LCBnZXRNZXRob2RzRm9yKCdFdmVudFRhcmdldCcpKVxyXG5leHRlbmQoRG9tLCBnZXRNZXRob2RzRm9yKCdEb20nKSlcclxuZXh0ZW5kKEVsZW1lbnQsIGdldE1ldGhvZHNGb3IoJ0VsZW1lbnQnKSlcclxuZXh0ZW5kKFNoYXBlLCBnZXRNZXRob2RzRm9yKCdTaGFwZScpKVxyXG4vLyBleHRlbmQoRWxlbWVudCwgZ2V0Q29uc3RydWN0b3IoJ01lbW9yeScpKVxyXG5leHRlbmQoQ29udGFpbmVyLCBnZXRNZXRob2RzRm9yKCdDb250YWluZXInKSlcclxuXHJcbmV4dGVuZChSdW5uZXIsIGdldE1ldGhvZHNGb3IoJ1J1bm5lcicpKVxyXG5cclxuTGlzdC5leHRlbmQoZ2V0TWV0aG9kTmFtZXMoKSlcclxuXHJcbnJlZ2lzdGVyTW9ycGhhYmxlVHlwZShbXHJcbiAgU1ZHTnVtYmVyLFxyXG4gIENvbG9yLFxyXG4gIEJveCxcclxuICBNYXRyaXgsXHJcbiAgU1ZHQXJyYXksXHJcbiAgUG9pbnRBcnJheSxcclxuICBQYXRoQXJyYXlcclxuXSlcclxuXHJcbm1ha2VNb3JwaGFibGUoKVxyXG4iLCJpbXBvcnQgeyBhdHRycyBhcyBkZWZhdWx0cyB9IGZyb20gJy4vZGVmYXVsdHMuanMnXHJcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi9yZWdleC5qcydcclxuaW1wb3J0IENvbG9yIGZyb20gJy4uLy4uL3R5cGVzL0NvbG9yLmpzJ1xyXG5pbXBvcnQgU1ZHQXJyYXkgZnJvbSAnLi4vLi4vdHlwZXMvU1ZHQXJyYXkuanMnXHJcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xyXG5cclxuY29uc3QgaG9va3MgPSBbXVxyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJBdHRySG9vayAoZm4pIHtcclxuICBob29rcy5wdXNoKGZuKVxyXG59XHJcblxyXG4vLyBTZXQgc3ZnIGVsZW1lbnQgYXR0cmlidXRlXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF0dHIgKGF0dHIsIHZhbCwgbnMpIHtcclxuICAvLyBhY3QgYXMgZnVsbCBnZXR0ZXJcclxuICBpZiAoYXR0ciA9PSBudWxsKSB7XHJcbiAgICAvLyBnZXQgYW4gb2JqZWN0IG9mIGF0dHJpYnV0ZXNcclxuICAgIGF0dHIgPSB7fVxyXG4gICAgdmFsID0gdGhpcy5ub2RlLmF0dHJpYnV0ZXNcclxuXHJcbiAgICBmb3IgKGxldCBub2RlIG9mIHZhbCkge1xyXG4gICAgICBhdHRyW25vZGUubm9kZU5hbWVdID0gaXNOdW1iZXIudGVzdChub2RlLm5vZGVWYWx1ZSlcclxuICAgICAgICA/IHBhcnNlRmxvYXQobm9kZS5ub2RlVmFsdWUpXHJcbiAgICAgICAgOiBub2RlLm5vZGVWYWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhdHRyXHJcbiAgfSBlbHNlIGlmIChhdHRyIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhcnJheSBhbmQgZ2V0IGFsbCB2YWx1ZXNcclxuICAgIHJldHVybiBhdHRyLnJlZHVjZSgobGFzdCwgY3VycikgPT4ge1xyXG4gICAgICBsYXN0W2N1cnJdID0gdGhpcy5hdHRyKGN1cnIpXHJcbiAgICAgIHJldHVybiBsYXN0XHJcbiAgICB9LCB7fSlcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyID09PSAnb2JqZWN0JyAmJiBhdHRyLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcclxuICAgIC8vIGFwcGx5IGV2ZXJ5IGF0dHJpYnV0ZSBpbmRpdmlkdWFsbHkgaWYgYW4gb2JqZWN0IGlzIHBhc3NlZFxyXG4gICAgZm9yICh2YWwgaW4gYXR0cikgdGhpcy5hdHRyKHZhbCwgYXR0clt2YWxdKVxyXG4gIH0gZWxzZSBpZiAodmFsID09PSBudWxsKSB7XHJcbiAgICAvLyByZW1vdmUgdmFsdWVcclxuICAgIHRoaXMubm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cilcclxuICB9IGVsc2UgaWYgKHZhbCA9PSBudWxsKSB7XHJcbiAgICAvLyBhY3QgYXMgYSBnZXR0ZXIgaWYgdGhlIGZpcnN0IGFuZCBvbmx5IGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3RcclxuICAgIHZhbCA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoYXR0cilcclxuICAgIHJldHVybiB2YWwgPT0gbnVsbCA/IGRlZmF1bHRzW2F0dHJdXHJcbiAgICAgIDogaXNOdW1iZXIudGVzdCh2YWwpID8gcGFyc2VGbG9hdCh2YWwpXHJcbiAgICAgIDogdmFsXHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIExvb3AgdGhyb3VnaCBob29rcyBhbmQgZXhlY3V0ZSB0aGVtIHRvIGNvbnZlcnQgdmFsdWVcclxuICAgIHZhbCA9IGhvb2tzLnJlZHVjZSgoX3ZhbCwgaG9vaykgPT4ge1xyXG4gICAgICByZXR1cm4gaG9vayhhdHRyLCBfdmFsLCB0aGlzKVxyXG4gICAgfSwgdmFsKVxyXG5cclxuICAgIC8vIGVuc3VyZSBjb3JyZWN0IG51bWVyaWMgdmFsdWVzIChhbHNvIGFjY2VwdHMgTmFOIGFuZCBJbmZpbml0eSlcclxuICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xyXG4gICAgICB2YWwgPSBuZXcgU1ZHTnVtYmVyKHZhbClcclxuICAgIH0gZWxzZSBpZiAoQ29sb3IuaXNDb2xvcih2YWwpKSB7XHJcbiAgICAgIC8vIGVuc3VyZSBmdWxsIGhleCBjb2xvclxyXG4gICAgICB2YWwgPSBuZXcgQ29sb3IodmFsKVxyXG4gICAgfSBlbHNlIGlmICh2YWwuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcbiAgICAgIC8vIENoZWNrIGZvciBwbGFpbiBhcnJheXMgYW5kIHBhcnNlIGFycmF5IHZhbHVlc1xyXG4gICAgICB2YWwgPSBuZXcgU1ZHQXJyYXkodmFsKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHRoZSBwYXNzZWQgYXR0cmlidXRlIGlzIGxlYWRpbmcuLi5cclxuICAgIGlmIChhdHRyID09PSAnbGVhZGluZycpIHtcclxuICAgICAgLy8gLi4uIGNhbGwgdGhlIGxlYWRpbmcgbWV0aG9kIGluc3RlYWRcclxuICAgICAgaWYgKHRoaXMubGVhZGluZykge1xyXG4gICAgICAgIHRoaXMubGVhZGluZyh2YWwpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHNldCBnaXZlbiBhdHRyaWJ1dGUgb24gbm9kZVxyXG4gICAgICB0eXBlb2YgbnMgPT09ICdzdHJpbmcnID8gdGhpcy5ub2RlLnNldEF0dHJpYnV0ZU5TKG5zLCBhdHRyLCB2YWwudG9TdHJpbmcoKSlcclxuICAgICAgICA6IHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsLnRvU3RyaW5nKCkpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVidWlsZCBpZiByZXF1aXJlZFxyXG4gICAgaWYgKHRoaXMucmVidWlsZCAmJiAoYXR0ciA9PT0gJ2ZvbnQtc2l6ZScgfHwgYXR0ciA9PT0gJ3gnKSkge1xyXG4gICAgICB0aGlzLnJlYnVpbGQoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXNcclxufVxyXG4iLCJpbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uLy4uL3R5cGVzL1NWR051bWJlci5qcydcclxuXHJcbi8vIFJhZGl1cyB4IHZhbHVlXHJcbmV4cG9ydCBmdW5jdGlvbiByeCAocngpIHtcclxuICByZXR1cm4gdGhpcy5hdHRyKCdyeCcsIHJ4KVxyXG59XHJcblxyXG4vLyBSYWRpdXMgeSB2YWx1ZVxyXG5leHBvcnQgZnVuY3Rpb24gcnkgKHJ5KSB7XHJcbiAgcmV0dXJuIHRoaXMuYXR0cigncnknLCByeSlcclxufVxyXG5cclxuLy8gTW92ZSBvdmVyIHgtYXhpc1xyXG5leHBvcnQgZnVuY3Rpb24geCAoeCkge1xyXG4gIHJldHVybiB4ID09IG51bGxcclxuICAgID8gdGhpcy5jeCgpIC0gdGhpcy5yeCgpXHJcbiAgICA6IHRoaXMuY3goeCArIHRoaXMucngoKSlcclxufVxyXG5cclxuLy8gTW92ZSBvdmVyIHktYXhpc1xyXG5leHBvcnQgZnVuY3Rpb24geSAoeSkge1xyXG4gIHJldHVybiB5ID09IG51bGxcclxuICAgID8gdGhpcy5jeSgpIC0gdGhpcy5yeSgpXHJcbiAgICA6IHRoaXMuY3koeSArIHRoaXMucnkoKSlcclxufVxyXG5cclxuLy8gTW92ZSBieSBjZW50ZXIgb3ZlciB4LWF4aXNcclxuZXhwb3J0IGZ1bmN0aW9uIGN4ICh4KSB7XHJcbiAgcmV0dXJuIHggPT0gbnVsbFxyXG4gICAgPyB0aGlzLmF0dHIoJ2N4JylcclxuICAgIDogdGhpcy5hdHRyKCdjeCcsIHgpXHJcbn1cclxuXHJcbi8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeS1heGlzXHJcbmV4cG9ydCBmdW5jdGlvbiBjeSAoeSkge1xyXG4gIHJldHVybiB5ID09IG51bGxcclxuICAgID8gdGhpcy5hdHRyKCdjeScpXHJcbiAgICA6IHRoaXMuYXR0cignY3knLCB5KVxyXG59XHJcblxyXG4vLyBTZXQgd2lkdGggb2YgZWxlbWVudFxyXG5leHBvcnQgZnVuY3Rpb24gd2lkdGggKHdpZHRoKSB7XHJcbiAgcmV0dXJuIHdpZHRoID09IG51bGxcclxuICAgID8gdGhpcy5yeCgpICogMlxyXG4gICAgOiB0aGlzLnJ4KG5ldyBTVkdOdW1iZXIod2lkdGgpLmRpdmlkZSgyKSlcclxufVxyXG5cclxuLy8gU2V0IGhlaWdodCBvZiBlbGVtZW50XHJcbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQgKGhlaWdodCkge1xyXG4gIHJldHVybiBoZWlnaHQgPT0gbnVsbFxyXG4gICAgPyB0aGlzLnJ5KCkgKiAyXHJcbiAgICA6IHRoaXMucnkobmV3IFNWR051bWJlcihoZWlnaHQpLmRpdmlkZSgyKSlcclxufVxyXG4iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AgKCkge31cclxuXHJcbi8vIERlZmF1bHQgYW5pbWF0aW9uIHZhbHVlc1xyXG5leHBvcnQgbGV0IHRpbWVsaW5lID0ge1xyXG4gIGR1cmF0aW9uOiA0MDAsXHJcbiAgZWFzZTogJz4nLFxyXG4gIGRlbGF5OiAwXHJcbn1cclxuXHJcbi8vIERlZmF1bHQgYXR0cmlidXRlIHZhbHVlc1xyXG5leHBvcnQgbGV0IGF0dHJzID0ge1xyXG5cclxuICAvLyBmaWxsIGFuZCBzdHJva2VcclxuICAnZmlsbC1vcGFjaXR5JzogMSxcclxuICAnc3Ryb2tlLW9wYWNpdHknOiAxLFxyXG4gICdzdHJva2Utd2lkdGgnOiAwLFxyXG4gICdzdHJva2UtbGluZWpvaW4nOiAnbWl0ZXInLFxyXG4gICdzdHJva2UtbGluZWNhcCc6ICdidXR0JyxcclxuICBmaWxsOiAnIzAwMDAwMCcsXHJcbiAgc3Ryb2tlOiAnIzAwMDAwMCcsXHJcbiAgb3BhY2l0eTogMSxcclxuXHJcbiAgLy8gcG9zaXRpb25cclxuICB4OiAwLFxyXG4gIHk6IDAsXHJcbiAgY3g6IDAsXHJcbiAgY3k6IDAsXHJcblxyXG4gIC8vIHNpemVcclxuICB3aWR0aDogMCxcclxuICBoZWlnaHQ6IDAsXHJcblxyXG4gIC8vIHJhZGl1c1xyXG4gIHI6IDAsXHJcbiAgcng6IDAsXHJcbiAgcnk6IDAsXHJcblxyXG4gIC8vIGdyYWRpZW50XHJcbiAgb2Zmc2V0OiAwLFxyXG4gICdzdG9wLW9wYWNpdHknOiAxLFxyXG4gICdzdG9wLWNvbG9yJzogJyMwMDAwMDAnLFxyXG5cclxuICAvLyB0ZXh0XHJcbiAgJ3RleHQtYW5jaG9yJzogJ3N0YXJ0J1xyXG59XHJcbiIsImltcG9ydCB7IGRlbGltaXRlciB9IGZyb20gJy4vcmVnZXguanMnXHJcbmltcG9ydCB7IG1ha2VJbnN0YW5jZSB9IGZyb20gJy4uLy4uL3V0aWxzL2Fkb3B0ZXIuanMnXHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi8uLi91dGlscy93aW5kb3cuanMnXHJcblxyXG5sZXQgbGlzdGVuZXJJZCA9IDBcclxubGV0IHdpbmRvd0V2ZW50cyA9IHt9XHJcblxyXG5mdW5jdGlvbiBnZXRFdmVudHMgKGluc3RhbmNlKSB7XHJcbiAgbGV0IG4gPSBpbnN0YW5jZS5nZXRFdmVudEhvbGRlcigpXHJcblxyXG4gIC8vIFdlIGRvbnQgd2FudCB0byBzYXZlIGV2ZW50cyBpbiBnbG9iYWwgc3BhY2VcclxuICBpZiAobiA9PT0gZ2xvYmFscy53aW5kb3cpIG4gPSB3aW5kb3dFdmVudHNcclxuICBpZiAoIW4uZXZlbnRzKSBuLmV2ZW50cyA9IHt9XHJcbiAgcmV0dXJuIG4uZXZlbnRzXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEV2ZW50VGFyZ2V0IChpbnN0YW5jZSkge1xyXG4gIHJldHVybiBpbnN0YW5jZS5nZXRFdmVudFRhcmdldCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRXZlbnRzIChpbnN0YW5jZSkge1xyXG4gIGNvbnN0IG4gPSBpbnN0YW5jZS5nZXRFdmVudEhvbGRlcigpXHJcbiAgaWYgKG4uZXZlbnRzKSBuLmV2ZW50cyA9IHt9XHJcbn1cclxuXHJcbi8vIEFkZCBldmVudCBiaW5kZXIgaW4gdGhlIFNWRyBuYW1lc3BhY2VcclxuZXhwb3J0IGZ1bmN0aW9uIG9uIChub2RlLCBldmVudHMsIGxpc3RlbmVyLCBiaW5kaW5nLCBvcHRpb25zKSB7XHJcbiAgdmFyIGwgPSBsaXN0ZW5lci5iaW5kKGJpbmRpbmcgfHwgbm9kZSlcclxuICB2YXIgaW5zdGFuY2UgPSBtYWtlSW5zdGFuY2Uobm9kZSlcclxuICB2YXIgYmFnID0gZ2V0RXZlbnRzKGluc3RhbmNlKVxyXG4gIHZhciBuID0gZ2V0RXZlbnRUYXJnZXQoaW5zdGFuY2UpXHJcblxyXG4gIC8vIGV2ZW50cyBjYW4gYmUgYW4gYXJyYXkgb2YgZXZlbnRzIG9yIGEgc3RyaW5nIG9mIGV2ZW50c1xyXG4gIGV2ZW50cyA9IEFycmF5LmlzQXJyYXkoZXZlbnRzKSA/IGV2ZW50cyA6IGV2ZW50cy5zcGxpdChkZWxpbWl0ZXIpXHJcblxyXG4gIC8vIGFkZCBpZCB0byBsaXN0ZW5lclxyXG4gIGlmICghbGlzdGVuZXIuX3N2Z2pzTGlzdGVuZXJJZCkge1xyXG4gICAgbGlzdGVuZXIuX3N2Z2pzTGlzdGVuZXJJZCA9ICsrbGlzdGVuZXJJZFxyXG4gIH1cclxuXHJcbiAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB2YXIgZXYgPSBldmVudC5zcGxpdCgnLicpWzBdXHJcbiAgICB2YXIgbnMgPSBldmVudC5zcGxpdCgnLicpWzFdIHx8ICcqJ1xyXG5cclxuICAgIC8vIGVuc3VyZSB2YWxpZCBvYmplY3RcclxuICAgIGJhZ1tldl0gPSBiYWdbZXZdIHx8IHt9XHJcbiAgICBiYWdbZXZdW25zXSA9IGJhZ1tldl1bbnNdIHx8IHt9XHJcblxyXG4gICAgLy8gcmVmZXJlbmNlIGxpc3RlbmVyXHJcbiAgICBiYWdbZXZdW25zXVtsaXN0ZW5lci5fc3ZnanNMaXN0ZW5lcklkXSA9IGxcclxuXHJcbiAgICAvLyBhZGQgbGlzdGVuZXJcclxuICAgIG4uYWRkRXZlbnRMaXN0ZW5lcihldiwgbCwgb3B0aW9ucyB8fCBmYWxzZSlcclxuICB9KVxyXG59XHJcblxyXG4vLyBBZGQgZXZlbnQgdW5iaW5kZXIgaW4gdGhlIFNWRyBuYW1lc3BhY2VcclxuZXhwb3J0IGZ1bmN0aW9uIG9mZiAobm9kZSwgZXZlbnRzLCBsaXN0ZW5lciwgb3B0aW9ucykge1xyXG4gIHZhciBpbnN0YW5jZSA9IG1ha2VJbnN0YW5jZShub2RlKVxyXG4gIHZhciBiYWcgPSBnZXRFdmVudHMoaW5zdGFuY2UpXHJcbiAgdmFyIG4gPSBnZXRFdmVudFRhcmdldChpbnN0YW5jZSlcclxuXHJcbiAgLy8gbGlzdGVuZXIgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYSBudW1iZXJcclxuICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBsaXN0ZW5lciA9IGxpc3RlbmVyLl9zdmdqc0xpc3RlbmVySWRcclxuICAgIGlmICghbGlzdGVuZXIpIHJldHVyblxyXG4gIH1cclxuXHJcbiAgLy8gZXZlbnRzIGNhbiBiZSBhbiBhcnJheSBvZiBldmVudHMgb3IgYSBzdHJpbmcgb3IgdW5kZWZpbmVkXHJcbiAgZXZlbnRzID0gQXJyYXkuaXNBcnJheShldmVudHMpID8gZXZlbnRzIDogKGV2ZW50cyB8fCAnJykuc3BsaXQoZGVsaW1pdGVyKVxyXG5cclxuICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHZhciBldiA9IGV2ZW50ICYmIGV2ZW50LnNwbGl0KCcuJylbMF1cclxuICAgIHZhciBucyA9IGV2ZW50ICYmIGV2ZW50LnNwbGl0KCcuJylbMV1cclxuICAgIHZhciBuYW1lc3BhY2UsIGxcclxuXHJcbiAgICBpZiAobGlzdGVuZXIpIHtcclxuICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIHJlZmVyZW5jZVxyXG4gICAgICBpZiAoYmFnW2V2XSAmJiBiYWdbZXZdW25zIHx8ICcqJ10pIHtcclxuICAgICAgICAvLyByZW1vdmVMaXN0ZW5lclxyXG4gICAgICAgIG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldiwgYmFnW2V2XVtucyB8fCAnKiddW2xpc3RlbmVyXSwgb3B0aW9ucyB8fCBmYWxzZSlcclxuXHJcbiAgICAgICAgZGVsZXRlIGJhZ1tldl1bbnMgfHwgJyonXVtsaXN0ZW5lcl1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChldiAmJiBucykge1xyXG4gICAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgYSBuYW1lc3BhY2VkIGV2ZW50XHJcbiAgICAgIGlmIChiYWdbZXZdICYmIGJhZ1tldl1bbnNdKSB7XHJcbiAgICAgICAgZm9yIChsIGluIGJhZ1tldl1bbnNdKSB7XHJcbiAgICAgICAgICBvZmYobiwgWyBldiwgbnMgXS5qb2luKCcuJyksIGwpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgYmFnW2V2XVtuc11cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChucykge1xyXG4gICAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgYSBzcGVjaWZpYyBuYW1lc3BhY2VcclxuICAgICAgZm9yIChldmVudCBpbiBiYWcpIHtcclxuICAgICAgICBmb3IgKG5hbWVzcGFjZSBpbiBiYWdbZXZlbnRdKSB7XHJcbiAgICAgICAgICBpZiAobnMgPT09IG5hbWVzcGFjZSkge1xyXG4gICAgICAgICAgICBvZmYobiwgWyBldmVudCwgbnMgXS5qb2luKCcuJykpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGV2KSB7XHJcbiAgICAgIC8vIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnRcclxuICAgICAgaWYgKGJhZ1tldl0pIHtcclxuICAgICAgICBmb3IgKG5hbWVzcGFjZSBpbiBiYWdbZXZdKSB7XHJcbiAgICAgICAgICBvZmYobiwgWyBldiwgbmFtZXNwYWNlIF0uam9pbignLicpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIGJhZ1tldl1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb24gYSBnaXZlbiBub2RlXHJcbiAgICAgIGZvciAoZXZlbnQgaW4gYmFnKSB7XHJcbiAgICAgICAgb2ZmKG4sIGV2ZW50KVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhckV2ZW50cyhpbnN0YW5jZSlcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2ggKG5vZGUsIGV2ZW50LCBkYXRhKSB7XHJcbiAgdmFyIG4gPSBnZXRFdmVudFRhcmdldChub2RlKVxyXG5cclxuICAvLyBEaXNwYXRjaCBldmVudFxyXG4gIGlmIChldmVudCBpbnN0YW5jZW9mIGdsb2JhbHMud2luZG93LkV2ZW50KSB7XHJcbiAgICBuLmRpc3BhdGNoRXZlbnQoZXZlbnQpXHJcbiAgfSBlbHNlIHtcclxuICAgIGV2ZW50ID0gbmV3IGdsb2JhbHMud2luZG93LkN1c3RvbUV2ZW50KGV2ZW50LCB7IGRldGFpbDogZGF0YSwgY2FuY2VsYWJsZTogdHJ1ZSB9KVxyXG4gICAgbi5kaXNwYXRjaEV2ZW50KGV2ZW50KVxyXG4gIH1cclxuICByZXR1cm4gZXZlbnRcclxufVxyXG4iLCJpbXBvcnQgU1ZHTnVtYmVyIGZyb20gJy4uLy4uL3R5cGVzL1NWR051bWJlci5qcydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmcm9tICh4LCB5KSB7XHJcbiAgcmV0dXJuICh0aGlzLl9lbGVtZW50IHx8IHRoaXMpLnR5cGUgPT09ICdyYWRpYWxHcmFkaWVudCdcclxuICAgID8gdGhpcy5hdHRyKHsgZng6IG5ldyBTVkdOdW1iZXIoeCksIGZ5OiBuZXcgU1ZHTnVtYmVyKHkpIH0pXHJcbiAgICA6IHRoaXMuYXR0cih7IHgxOiBuZXcgU1ZHTnVtYmVyKHgpLCB5MTogbmV3IFNWR051bWJlcih5KSB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG8gKHgsIHkpIHtcclxuICByZXR1cm4gKHRoaXMuX2VsZW1lbnQgfHwgdGhpcykudHlwZSA9PT0gJ3JhZGlhbEdyYWRpZW50J1xyXG4gICAgPyB0aGlzLmF0dHIoeyBjeDogbmV3IFNWR051bWJlcih4KSwgY3k6IG5ldyBTVkdOdW1iZXIoeSkgfSlcclxuICAgIDogdGhpcy5hdHRyKHsgeDI6IG5ldyBTVkdOdW1iZXIoeCksIHkyOiBuZXcgU1ZHTnVtYmVyKHkpIH0pXHJcbn1cclxuIiwiLy8gRGVmYXVsdCBuYW1lc3BhY2VzXHJcbmV4cG9ydCBsZXQgbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXHJcbmV4cG9ydCBsZXQgeG1sbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nXHJcbmV4cG9ydCBsZXQgeGxpbmsgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaydcclxuZXhwb3J0IGxldCBzdmdqcyA9ICdodHRwOi8vc3ZnanMuY29tL3N2Z2pzJ1xyXG4iLCJpbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvd2luZG93LmpzJ1xyXG5pbXBvcnQgeyBtYWtlSW5zdGFuY2UgfSBmcm9tICcuLi8uLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VyICgpIHtcclxuICAvLyBSZXVzZSBjYWNoZWQgZWxlbWVudCBpZiBwb3NzaWJsZVxyXG4gIGlmICghcGFyc2VyLm5vZGVzKSB7XHJcbiAgICBsZXQgc3ZnID0gbWFrZUluc3RhbmNlKCkuc2l6ZSgyLCAwKVxyXG4gICAgc3ZnLm5vZGUuc3R5bGUuY3NzVGV4dCA9IFtcclxuICAgICAgJ29wYWNpdHk6IDAnLFxyXG4gICAgICAncG9zaXRpb246IGFic29sdXRlJyxcclxuICAgICAgJ2xlZnQ6IC0xMDAlJyxcclxuICAgICAgJ3RvcDogLTEwMCUnLFxyXG4gICAgICAnb3ZlcmZsb3c6IGhpZGRlbidcclxuICAgIF0uam9pbignOycpXHJcblxyXG4gICAgc3ZnLmF0dHIoJ2ZvY3VzYWJsZScsICdmYWxzZScpXHJcblxyXG4gICAgbGV0IHBhdGggPSBzdmcucGF0aCgpLm5vZGVcclxuXHJcbiAgICBwYXJzZXIubm9kZXMgPSB7IHN2ZywgcGF0aCB9XHJcbiAgfVxyXG5cclxuICBpZiAoIXBhcnNlci5ub2Rlcy5zdmcubm9kZS5wYXJlbnROb2RlKSB7XHJcbiAgICBsZXQgYiA9IGdsb2JhbHMuZG9jdW1lbnQuYm9keSB8fCBnbG9iYWxzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxyXG4gICAgcGFyc2VyLm5vZGVzLnN2Zy5hZGRUbyhiKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBhcnNlci5ub2Rlc1xyXG59XHJcbiIsImltcG9ydCBQb2ludEFycmF5IGZyb20gJy4uLy4uL3R5cGVzL1BvaW50QXJyYXkuanMnXHJcblxyXG5leHBvcnQgbGV0IE1vcnBoQXJyYXkgPSBQb2ludEFycmF5XHJcblxyXG4vLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lciBvdmVyIHgtYXhpc1xyXG5leHBvcnQgZnVuY3Rpb24geCAoeCkge1xyXG4gIHJldHVybiB4ID09IG51bGwgPyB0aGlzLmJib3goKS54IDogdGhpcy5tb3ZlKHgsIHRoaXMuYmJveCgpLnkpXHJcbn1cclxuXHJcbi8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyIG92ZXIgeS1heGlzXHJcbmV4cG9ydCBmdW5jdGlvbiB5ICh5KSB7XHJcbiAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMuYmJveCgpLnkgOiB0aGlzLm1vdmUodGhpcy5iYm94KCkueCwgeSlcclxufVxyXG5cclxuLy8gU2V0IHdpZHRoIG9mIGVsZW1lbnRcclxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoICh3aWR0aCkge1xyXG4gIGxldCBiID0gdGhpcy5iYm94KClcclxuICByZXR1cm4gd2lkdGggPT0gbnVsbCA/IGIud2lkdGggOiB0aGlzLnNpemUod2lkdGgsIGIuaGVpZ2h0KVxyXG59XHJcblxyXG4vLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcclxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodCAoaGVpZ2h0KSB7XHJcbiAgbGV0IGIgPSB0aGlzLmJib3goKVxyXG4gIHJldHVybiBoZWlnaHQgPT0gbnVsbCA/IGIuaGVpZ2h0IDogdGhpcy5zaXplKGIud2lkdGgsIGhlaWdodClcclxufVxyXG4iLCJpbXBvcnQgeyBwcm9wb3J0aW9uYWxTaXplIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMuanMnXHJcbmltcG9ydCBQb2ludEFycmF5IGZyb20gJy4uLy4uL3R5cGVzL1BvaW50QXJyYXkuanMnXHJcblxyXG4vLyBHZXQgYXJyYXlcclxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5ICgpIHtcclxuICByZXR1cm4gdGhpcy5fYXJyYXkgfHwgKHRoaXMuX2FycmF5ID0gbmV3IFBvaW50QXJyYXkodGhpcy5hdHRyKCdwb2ludHMnKSkpXHJcbn1cclxuXHJcbi8vIFBsb3QgbmV3IHBhdGhcclxuZXhwb3J0IGZ1bmN0aW9uIHBsb3QgKHApIHtcclxuICByZXR1cm4gKHAgPT0gbnVsbCkgPyB0aGlzLmFycmF5KClcclxuICAgIDogdGhpcy5jbGVhcigpLmF0dHIoJ3BvaW50cycsIHR5cGVvZiBwID09PSAnc3RyaW5nJyA/IHBcclxuICAgIDogKHRoaXMuX2FycmF5ID0gbmV3IFBvaW50QXJyYXkocCkpKVxyXG59XHJcblxyXG4vLyBDbGVhciBhcnJheSBjYWNoZVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIgKCkge1xyXG4gIGRlbGV0ZSB0aGlzLl9hcnJheVxyXG4gIHJldHVybiB0aGlzXHJcbn1cclxuXHJcbi8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlICh4LCB5KSB7XHJcbiAgcmV0dXJuIHRoaXMuYXR0cigncG9pbnRzJywgdGhpcy5hcnJheSgpLm1vdmUoeCwgeSkpXHJcbn1cclxuXHJcbi8vIFNldCBlbGVtZW50IHNpemUgdG8gZ2l2ZW4gd2lkdGggYW5kIGhlaWdodFxyXG5leHBvcnQgZnVuY3Rpb24gc2l6ZSAod2lkdGgsIGhlaWdodCkge1xyXG4gIGxldCBwID0gcHJvcG9ydGlvbmFsU2l6ZSh0aGlzLCB3aWR0aCwgaGVpZ2h0KVxyXG4gIHJldHVybiB0aGlzLmF0dHIoJ3BvaW50cycsIHRoaXMuYXJyYXkoKS5zaXplKHAud2lkdGgsIHAuaGVpZ2h0KSlcclxufVxyXG4iLCIvLyBQYXJzZSB1bml0IHZhbHVlXHJcbmV4cG9ydCBsZXQgbnVtYmVyQW5kVW5pdCA9IC9eKFsrLV0/KFxcZCsoXFwuXFxkKik/fFxcLlxcZCspKGVbKy1dP1xcZCspPykoW2EteiVdKikkL2lcclxuXHJcbi8vIFBhcnNlIGhleCB2YWx1ZVxyXG5leHBvcnQgbGV0IGhleCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2lcclxuXHJcbi8vIFBhcnNlIHJnYiB2YWx1ZVxyXG5leHBvcnQgbGV0IHJnYiA9IC9yZ2JcXCgoXFxkKyksKFxcZCspLChcXGQrKVxcKS9cclxuXHJcbi8vIFBhcnNlIHJlZmVyZW5jZSBpZFxyXG5leHBvcnQgbGV0IHJlZmVyZW5jZSA9IC8oI1thLXowLTlcXC1fXSspL2lcclxuXHJcbi8vIHNwbGl0cyBhIHRyYW5zZm9ybWF0aW9uIGNoYWluXHJcbmV4cG9ydCBsZXQgdHJhbnNmb3JtcyA9IC9cXClcXHMqLD9cXHMqL1xyXG5cclxuLy8gV2hpdGVzcGFjZVxyXG5leHBvcnQgbGV0IHdoaXRlc3BhY2UgPSAvXFxzL2dcclxuXHJcbi8vIFRlc3QgaGV4IHZhbHVlXHJcbmV4cG9ydCBsZXQgaXNIZXggPSAvXiNbYS1mMC05XXszLDZ9JC9pXHJcblxyXG4vLyBUZXN0IHJnYiB2YWx1ZVxyXG5leHBvcnQgbGV0IGlzUmdiID0gL15yZ2JcXCgvXHJcblxyXG4vLyBUZXN0IGNzcyBkZWNsYXJhdGlvblxyXG5leHBvcnQgbGV0IGlzQ3NzID0gL1teOl0rOlteO10rOz8vXHJcblxyXG4vLyBUZXN0IGZvciBibGFuayBzdHJpbmdcclxuZXhwb3J0IGxldCBpc0JsYW5rID0gL14oXFxzKyk/JC9cclxuXHJcbi8vIFRlc3QgZm9yIG51bWVyaWMgc3RyaW5nXHJcbmV4cG9ydCBsZXQgaXNOdW1iZXIgPSAvXlsrLV0/KFxcZCsoXFwuXFxkKik/fFxcLlxcZCspKGVbKy1dP1xcZCspPyQvaVxyXG5cclxuLy8gVGVzdCBmb3IgcGVyY2VudCB2YWx1ZVxyXG5leHBvcnQgbGV0IGlzUGVyY2VudCA9IC9eLT9bXFxkLl0rJSQvXHJcblxyXG4vLyBUZXN0IGZvciBpbWFnZSB1cmxcclxuZXhwb3J0IGxldCBpc0ltYWdlID0gL1xcLihqcGd8anBlZ3xwbmd8Z2lmfHN2ZykoXFw/W149XSsuKik/L2lcclxuXHJcbi8vIHNwbGl0IGF0IHdoaXRlc3BhY2UgYW5kIGNvbW1hXHJcbmV4cG9ydCBsZXQgZGVsaW1pdGVyID0gL1tcXHMsXSsvXHJcblxyXG4vLyBUaGUgZm9sbG93aW5nIHJlZ2V4IGFyZSB1c2VkIHRvIHBhcnNlIHRoZSBkIGF0dHJpYnV0ZSBvZiBhIHBhdGhcclxuXHJcbi8vIE1hdGNoZXMgYWxsIGh5cGhlbnMgd2hpY2ggYXJlIG5vdCBhZnRlciBhbiBleHBvbmVudFxyXG5leHBvcnQgbGV0IGh5cGhlbiA9IC8oW15lXSktL2dpXHJcblxyXG4vLyBSZXBsYWNlcyBhbmQgdGVzdHMgZm9yIGFsbCBwYXRoIGxldHRlcnNcclxuZXhwb3J0IGxldCBwYXRoTGV0dGVycyA9IC9bTUxIVkNTUVRBWl0vZ2lcclxuXHJcbi8vIHllcyB3ZSBuZWVkIHRoaXMgb25lLCB0b29cclxuZXhwb3J0IGxldCBpc1BhdGhMZXR0ZXIgPSAvW01MSFZDU1FUQVpdL2lcclxuXHJcbi8vIG1hdGNoZXMgMC4xNTQuMjMuNDVcclxuZXhwb3J0IGxldCBudW1iZXJzV2l0aERvdHMgPSAvKChcXGQ/XFwuXFxkKyg/OmVbKy1dP1xcZCspPykoKD86XFwuXFxkKyg/OmVbKy1dP1xcZCspPykrKSkrL2dpXHJcblxyXG4vLyBtYXRjaGVzIC5cclxuZXhwb3J0IGxldCBkb3RzID0gL1xcLi9nXHJcbiIsImltcG9ydCB7IGFkb3B0IH0gZnJvbSAnLi4vLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uLy4uL3V0aWxzL3dpbmRvdy5qcydcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMuanMnXHJcbmltcG9ydCBMaXN0IGZyb20gJy4uLy4uL3R5cGVzL0xpc3QuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiYXNlRmluZCAocXVlcnksIHBhcmVudCkge1xyXG4gIHJldHVybiBuZXcgTGlzdChtYXAoKHBhcmVudCB8fCBnbG9iYWxzLmRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSwgZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIHJldHVybiBhZG9wdChub2RlKVxyXG4gIH0pKVxyXG59XHJcblxyXG4vLyBTY29wZWQgZmluZCBtZXRob2RcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQgKHF1ZXJ5KSB7XHJcbiAgcmV0dXJuIGJhc2VGaW5kKHF1ZXJ5LCB0aGlzLm5vZGUpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kT25lIChxdWVyeSkge1xyXG4gIHJldHVybiBhZG9wdCh0aGlzLm5vZGUucXVlcnlTZWxlY3RvcihxdWVyeSkpXHJcbn1cclxuIiwiaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uLy4uL3V0aWxzL3dpbmRvdy5qcydcclxuXHJcbi8vIENyZWF0ZSBwbGFpbiB0ZXh0IG5vZGVcclxuZXhwb3J0IGZ1bmN0aW9uIHBsYWluICh0ZXh0KSB7XHJcbiAgLy8gY2xlYXIgaWYgYnVpbGQgbW9kZSBpcyBkaXNhYmxlZFxyXG4gIGlmICh0aGlzLl9idWlsZCA9PT0gZmFsc2UpIHtcclxuICAgIHRoaXMuY2xlYXIoKVxyXG4gIH1cclxuXHJcbiAgLy8gY3JlYXRlIHRleHQgbm9kZVxyXG4gIHRoaXMubm9kZS5hcHBlbmRDaGlsZChnbG9iYWxzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKVxyXG5cclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG4vLyBHZXQgbGVuZ3RoIG9mIHRleHQgZWxlbWVudFxyXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoICgpIHtcclxuICByZXR1cm4gdGhpcy5ub2RlLmdldENvbXB1dGVkVGV4dExlbmd0aCgpXHJcbn1cclxuIiwiaW1wb3J0IHsgbWFrZUluc3RhbmNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuXHJcbi8vIEdldCBhbGwgc2libGluZ3MsIGluY2x1ZGluZyBteXNlbGZcclxuZXhwb3J0IGZ1bmN0aW9uIHNpYmxpbmdzICgpIHtcclxuICByZXR1cm4gdGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpXHJcbn1cclxuXHJcbi8vIEdldCB0aGUgY3VyZW50IHBvc2l0aW9uIHNpYmxpbmdzXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRoaXMucGFyZW50KCkuaW5kZXgodGhpcylcclxufVxyXG5cclxuLy8gR2V0IHRoZSBuZXh0IGVsZW1lbnQgKHdpbGwgcmV0dXJuIG51bGwgaWYgdGhlcmUgaXMgbm9uZSlcclxuZXhwb3J0IGZ1bmN0aW9uIG5leHQgKCkge1xyXG4gIHJldHVybiB0aGlzLnNpYmxpbmdzKClbdGhpcy5wb3NpdGlvbigpICsgMV1cclxufVxyXG5cclxuLy8gR2V0IHRoZSBuZXh0IGVsZW1lbnQgKHdpbGwgcmV0dXJuIG51bGwgaWYgdGhlcmUgaXMgbm9uZSlcclxuZXhwb3J0IGZ1bmN0aW9uIHByZXYgKCkge1xyXG4gIHJldHVybiB0aGlzLnNpYmxpbmdzKClbdGhpcy5wb3NpdGlvbigpIC0gMV1cclxufVxyXG5cclxuLy8gU2VuZCBnaXZlbiBlbGVtZW50IG9uZSBzdGVwIGZvcndhcmRcclxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQgKCkge1xyXG4gIHZhciBpID0gdGhpcy5wb3NpdGlvbigpICsgMVxyXG4gIHZhciBwID0gdGhpcy5wYXJlbnQoKVxyXG5cclxuICAvLyBtb3ZlIG5vZGUgb25lIHN0ZXAgZm9yd2FyZFxyXG4gIHAucmVtb3ZlRWxlbWVudCh0aGlzKS5hZGQodGhpcywgaSlcclxuXHJcbiAgLy8gbWFrZSBzdXJlIGRlZnMgbm9kZSBpcyBhbHdheXMgYXQgdGhlIHRvcFxyXG4gIGlmICh0eXBlb2YgcC5pc1Jvb3QgPT09ICdmdW5jdGlvbicgJiYgcC5pc1Jvb3QoKSkge1xyXG4gICAgcC5ub2RlLmFwcGVuZENoaWxkKHAuZGVmcygpLm5vZGUpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG4vLyBTZW5kIGdpdmVuIGVsZW1lbnQgb25lIHN0ZXAgYmFja3dhcmRcclxuZXhwb3J0IGZ1bmN0aW9uIGJhY2t3YXJkICgpIHtcclxuICB2YXIgaSA9IHRoaXMucG9zaXRpb24oKVxyXG5cclxuICBpZiAoaSA+IDApIHtcclxuICAgIHRoaXMucGFyZW50KCkucmVtb3ZlRWxlbWVudCh0aGlzKS5hZGQodGhpcywgaSAtIDEpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG4vLyBTZW5kIGdpdmVuIGVsZW1lbnQgYWxsIHRoZSB3YXkgdG8gdGhlIGZyb250XHJcbmV4cG9ydCBmdW5jdGlvbiBmcm9udCAoKSB7XHJcbiAgdmFyIHAgPSB0aGlzLnBhcmVudCgpXHJcblxyXG4gIC8vIE1vdmUgbm9kZSBmb3J3YXJkXHJcbiAgcC5ub2RlLmFwcGVuZENoaWxkKHRoaXMubm9kZSlcclxuXHJcbiAgLy8gTWFrZSBzdXJlIGRlZnMgbm9kZSBpcyBhbHdheXMgYXQgdGhlIHRvcFxyXG4gIGlmICh0eXBlb2YgcC5pc1Jvb3QgPT09ICdmdW5jdGlvbicgJiYgcC5pc1Jvb3QoKSkge1xyXG4gICAgcC5ub2RlLmFwcGVuZENoaWxkKHAuZGVmcygpLm5vZGUpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG4vLyBTZW5kIGdpdmVuIGVsZW1lbnQgYWxsIHRoZSB3YXkgdG8gdGhlIGJhY2tcclxuZXhwb3J0IGZ1bmN0aW9uIGJhY2sgKCkge1xyXG4gIGlmICh0aGlzLnBvc2l0aW9uKCkgPiAwKSB7XHJcbiAgICB0aGlzLnBhcmVudCgpLnJlbW92ZUVsZW1lbnQodGhpcykuYWRkKHRoaXMsIDApXHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG4vLyBJbnNlcnRzIGEgZ2l2ZW4gZWxlbWVudCBiZWZvcmUgdGhlIHRhcmdldGVkIGVsZW1lbnRcclxuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZSAoZWxlbWVudCkge1xyXG4gIGVsZW1lbnQgPSBtYWtlSW5zdGFuY2UoZWxlbWVudClcclxuICBlbGVtZW50LnJlbW92ZSgpXHJcblxyXG4gIHZhciBpID0gdGhpcy5wb3NpdGlvbigpXHJcblxyXG4gIHRoaXMucGFyZW50KCkuYWRkKGVsZW1lbnQsIGkpXHJcblxyXG4gIHJldHVybiB0aGlzXHJcbn1cclxuXHJcbi8vIEluc2VydHMgYSBnaXZlbiBlbGVtZW50IGFmdGVyIHRoZSB0YXJnZXRlZCBlbGVtZW50XHJcbmV4cG9ydCBmdW5jdGlvbiBhZnRlciAoZWxlbWVudCkge1xyXG4gIGVsZW1lbnQgPSBtYWtlSW5zdGFuY2UoZWxlbWVudClcclxuICBlbGVtZW50LnJlbW92ZSgpXHJcblxyXG4gIHZhciBpID0gdGhpcy5wb3NpdGlvbigpXHJcblxyXG4gIHRoaXMucGFyZW50KCkuYWRkKGVsZW1lbnQsIGkgKyAxKVxyXG5cclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlIChlbGVtZW50KSB7XHJcbiAgZWxlbWVudCA9IG1ha2VJbnN0YW5jZShlbGVtZW50KVxyXG4gIGVsZW1lbnQuYmVmb3JlKHRoaXMpXHJcbiAgcmV0dXJuIHRoaXNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyIChlbGVtZW50KSB7XHJcbiAgZWxlbWVudCA9IG1ha2VJbnN0YW5jZShlbGVtZW50KVxyXG4gIGVsZW1lbnQuYWZ0ZXIodGhpcylcclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoJ0RvbScsIHtcclxuICBzaWJsaW5ncyxcclxuICBwb3NpdGlvbixcclxuICBuZXh0LFxyXG4gIHByZXYsXHJcbiAgZm9yd2FyZCxcclxuICBiYWNrd2FyZCxcclxuICBmcm9udCxcclxuICBiYWNrLFxyXG4gIGJlZm9yZSxcclxuICBhZnRlcixcclxuICBpbnNlcnRCZWZvcmUsXHJcbiAgaW5zZXJ0QWZ0ZXJcclxufSlcclxuIiwiaW1wb3J0IHsgZGVsaW1pdGVyIH0gZnJvbSAnLi4vY29yZS9yZWdleC5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuXHJcbi8vIFJldHVybiBhcnJheSBvZiBjbGFzc2VzIG9uIHRoZSBub2RlXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGFzc2VzICgpIHtcclxuICB2YXIgYXR0ciA9IHRoaXMuYXR0cignY2xhc3MnKVxyXG4gIHJldHVybiBhdHRyID09IG51bGwgPyBbXSA6IGF0dHIudHJpbSgpLnNwbGl0KGRlbGltaXRlcilcclxufVxyXG5cclxuLy8gUmV0dXJuIHRydWUgaWYgY2xhc3MgZXhpc3RzIG9uIHRoZSBub2RlLCBmYWxzZSBvdGhlcndpc2VcclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzIChuYW1lKSB7XHJcbiAgcmV0dXJuIHRoaXMuY2xhc3NlcygpLmluZGV4T2YobmFtZSkgIT09IC0xXHJcbn1cclxuXHJcbi8vIEFkZCBjbGFzcyB0byB0aGUgbm9kZVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3MgKG5hbWUpIHtcclxuICBpZiAoIXRoaXMuaGFzQ2xhc3MobmFtZSkpIHtcclxuICAgIHZhciBhcnJheSA9IHRoaXMuY2xhc3NlcygpXHJcbiAgICBhcnJheS5wdXNoKG5hbWUpXHJcbiAgICB0aGlzLmF0dHIoJ2NsYXNzJywgYXJyYXkuam9pbignICcpKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXNcclxufVxyXG5cclxuLy8gUmVtb3ZlIGNsYXNzIGZyb20gdGhlIG5vZGVcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzIChuYW1lKSB7XHJcbiAgaWYgKHRoaXMuaGFzQ2xhc3MobmFtZSkpIHtcclxuICAgIHRoaXMuYXR0cignY2xhc3MnLCB0aGlzLmNsYXNzZXMoKS5maWx0ZXIoZnVuY3Rpb24gKGMpIHtcclxuICAgICAgcmV0dXJuIGMgIT09IG5hbWVcclxuICAgIH0pLmpvaW4oJyAnKSlcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzXHJcbn1cclxuXHJcbi8vIFRvZ2dsZSB0aGUgcHJlc2VuY2Ugb2YgYSBjbGFzcyBvbiB0aGUgbm9kZVxyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2xhc3MgKG5hbWUpIHtcclxuICByZXR1cm4gdGhpcy5oYXNDbGFzcyhuYW1lKSA/IHRoaXMucmVtb3ZlQ2xhc3MobmFtZSkgOiB0aGlzLmFkZENsYXNzKG5hbWUpXHJcbn1cclxuXHJcbnJlZ2lzdGVyTWV0aG9kcygnRG9tJywge1xyXG4gIGNsYXNzZXMsIGhhc0NsYXNzLCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MsIHRvZ2dsZUNsYXNzXHJcbn0pXHJcbiIsImltcG9ydCB7IGNhbWVsQ2FzZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzLmpzJ1xyXG5pbXBvcnQgeyBpc0JsYW5rIH0gZnJvbSAnLi4vY29yZS9yZWdleC5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXJNZXRob2RzIH0gZnJvbSAnLi4vLi4vdXRpbHMvbWV0aG9kcy5qcydcclxuXHJcbi8vIER5bmFtaWMgc3R5bGUgZ2VuZXJhdG9yXHJcbmV4cG9ydCBmdW5jdGlvbiBjc3MgKHN0eWxlLCB2YWwpIHtcclxuICBsZXQgcmV0ID0ge31cclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgLy8gZ2V0IGZ1bGwgc3R5bGUgYXMgb2JqZWN0XHJcbiAgICB0aGlzLm5vZGUuc3R5bGUuY3NzVGV4dC5zcGxpdCgvXFxzKjtcXHMqLylcclxuICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICByZXR1cm4gISFlbC5sZW5ndGhcclxuICAgICAgfSlcclxuICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgbGV0IHQgPSBlbC5zcGxpdCgvXFxzKjpcXHMqLylcclxuICAgICAgICByZXRbdFswXV0gPSB0WzFdXHJcbiAgICAgIH0pXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG5cclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcclxuICAgIC8vIGdldCBzdHlsZSBwcm9wZXJ0aWVzIGluIHRoZSBhcnJheVxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGUpKSB7XHJcbiAgICAgIGZvciAobGV0IG5hbWUgb2Ygc3R5bGUpIHtcclxuICAgICAgICBsZXQgY2FzZWQgPSBjYW1lbENhc2UobmFtZSlcclxuICAgICAgICByZXRbY2FzZWRdID0gdGhpcy5ub2RlLnN0eWxlW2Nhc2VkXVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXRcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgc3R5bGUgZm9yIHByb3BlcnR5XHJcbiAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnN0eWxlW2NhbWVsQ2FzZShzdHlsZSldXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IHN0eWxlcyBpbiBvYmplY3RcclxuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGZvciAobGV0IG5hbWUgaW4gc3R5bGUpIHtcclxuICAgICAgICAvLyBzZXQgZW1wdHkgc3RyaW5nIGlmIG51bGwvdW5kZWZpbmVkLycnIHdhcyBnaXZlblxyXG4gICAgICAgIHRoaXMubm9kZS5zdHlsZVtjYW1lbENhc2UobmFtZSldXHJcbiAgICAgICAgICA9IChzdHlsZVtuYW1lXSA9PSBudWxsIHx8IGlzQmxhbmsudGVzdChzdHlsZVtuYW1lXSkpID8gJycgOiBzdHlsZVtuYW1lXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgc3R5bGUgZm9yIHByb3BlcnR5XHJcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgIHRoaXMubm9kZS5zdHlsZVtjYW1lbENhc2Uoc3R5bGUpXVxyXG4gICAgICA9ICh2YWwgPT0gbnVsbCB8fCBpc0JsYW5rLnRlc3QodmFsKSkgPyAnJyA6IHZhbFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXNcclxufVxyXG5cclxuLy8gU2hvdyBlbGVtZW50XHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93ICgpIHtcclxuICByZXR1cm4gdGhpcy5jc3MoJ2Rpc3BsYXknLCAnJylcclxufVxyXG5cclxuLy8gSGlkZSBlbGVtZW50XHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlICgpIHtcclxuICByZXR1cm4gdGhpcy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXHJcbn1cclxuXHJcbi8vIElzIGVsZW1lbnQgdmlzaWJsZT9cclxuZXhwb3J0IGZ1bmN0aW9uIHZpc2libGUgKCkge1xyXG4gIHJldHVybiB0aGlzLmNzcygnZGlzcGxheScpICE9PSAnbm9uZSdcclxufVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKCdEb20nLCB7XHJcbiAgY3NzLCBzaG93LCBoaWRlLCB2aXNpYmxlXHJcbn0pXHJcbiIsImltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uLy4uL3V0aWxzL21ldGhvZHMuanMnXHJcblxyXG4vLyBTdG9yZSBkYXRhIHZhbHVlcyBvbiBzdmcgbm9kZXNcclxuZXhwb3J0IGZ1bmN0aW9uIGRhdGEgKGEsIHYsIHIpIHtcclxuICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XHJcbiAgICBmb3IgKHYgaW4gYSkge1xyXG4gICAgICB0aGlzLmRhdGEodiwgYVt2XSlcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmF0dHIoJ2RhdGEtJyArIGEpKVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdkYXRhLScgKyBhKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLmF0dHIoJ2RhdGEtJyArIGEsXHJcbiAgICAgIHYgPT09IG51bGwgPyBudWxsXHJcbiAgICAgIDogciA9PT0gdHJ1ZSB8fCB0eXBlb2YgdiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHYgPT09ICdudW1iZXInID8gdlxyXG4gICAgICA6IEpTT04uc3RyaW5naWZ5KHYpXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoJ0RvbScsIHsgZGF0YSB9KVxyXG4iLCJpbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi8uLi91dGlscy9tZXRob2RzLmpzJ1xyXG5cclxuLy8gUmVtZW1iZXIgYXJiaXRyYXJ5IGRhdGFcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbWVtYmVyIChrLCB2KSB7XHJcbiAgLy8gcmVtZW1iZXIgZXZlcnkgaXRlbSBpbiBhbiBvYmplY3QgaW5kaXZpZHVhbGx5XHJcbiAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gaykge1xyXG4gICAgICB0aGlzLnJlbWVtYmVyKGtleSwga1trZXldKVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgLy8gcmV0cmlldmUgbWVtb3J5XHJcbiAgICByZXR1cm4gdGhpcy5tZW1vcnkoKVtrXVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBzdG9yZSBtZW1vcnlcclxuICAgIHRoaXMubWVtb3J5KClba10gPSB2XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG4vLyBFcmFzZSBhIGdpdmVuIG1lbW9yeVxyXG5leHBvcnQgZnVuY3Rpb24gZm9yZ2V0ICgpIHtcclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgdGhpcy5fbWVtb3J5ID0ge31cclxuICB9IGVsc2Uge1xyXG4gICAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBkZWxldGUgdGhpcy5tZW1vcnkoKVthcmd1bWVudHNbaV1dXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzXHJcbn1cclxuXHJcbi8vIFRoaXMgdHJpZ2dlcnMgY3JlYXRpb24gb2YgYSBuZXcgaGlkZGVuIGNsYXNzIHdoaWNoIGlzIG5vdCBwZXJmb3JtYW50XHJcbi8vIEhvd2V2ZXIsIHRoaXMgZnVuY3Rpb24gaXMgbm90IHJhcmVseSB1c2VkIHNvIGl0IHdpbGwgbm90IGhhcHBlbiBmcmVxdWVudGx5XHJcbi8vIFJldHVybiBsb2NhbCBtZW1vcnkgb2JqZWN0XHJcbmV4cG9ydCBmdW5jdGlvbiBtZW1vcnkgKCkge1xyXG4gIHJldHVybiAodGhpcy5fbWVtb3J5ID0gdGhpcy5fbWVtb3J5IHx8IHt9KVxyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoJ0RvbScsIHsgcmVtZW1iZXIsIGZvcmdldCwgbWVtb3J5IH0pXHJcbiIsImltcG9ydCB7IG9uLCBvZmYgfSBmcm9tICcuLi9jb3JlL2V2ZW50LmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi8uLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgQ29sb3IgZnJvbSAnLi4vLi4vdHlwZXMvQ29sb3IuanMnXHJcbmltcG9ydCBFbGVtZW50IGZyb20gJy4uLy4uL2VsZW1lbnRzL0VsZW1lbnQuanMnXHJcbmltcG9ydCBNYXRyaXggZnJvbSAnLi4vLi4vdHlwZXMvTWF0cml4LmpzJ1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi4vLi4vdHlwZXMvUG9pbnQuanMnXHJcbmltcG9ydCBTVkdOdW1iZXIgZnJvbSAnLi4vLi4vdHlwZXMvU1ZHTnVtYmVyLmpzJ1xyXG5cclxuLy8gRGVmaW5lIGxpc3Qgb2YgYXZhaWxhYmxlIGF0dHJpYnV0ZXMgZm9yIHN0cm9rZSBhbmQgZmlsbFxyXG52YXIgc3VnYXIgPSB7XHJcbiAgc3Ryb2tlOiBbICdjb2xvcicsICd3aWR0aCcsICdvcGFjaXR5JywgJ2xpbmVjYXAnLCAnbGluZWpvaW4nLCAnbWl0ZXJsaW1pdCcsICdkYXNoYXJyYXknLCAnZGFzaG9mZnNldCcgXSxcclxuICBmaWxsOiBbICdjb2xvcicsICdvcGFjaXR5JywgJ3J1bGUnIF0sXHJcbiAgcHJlZml4OiBmdW5jdGlvbiAodCwgYSkge1xyXG4gICAgcmV0dXJuIGEgPT09ICdjb2xvcicgPyB0IDogdCArICctJyArIGFcclxuICB9XHJcbn1cclxuXHJcbi8vIEFkZCBzdWdhciBmb3IgZmlsbCBhbmQgc3Ryb2tlXHJcbjtbICdmaWxsJywgJ3N0cm9rZScgXS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XHJcbiAgdmFyIGV4dGVuc2lvbiA9IHt9XHJcbiAgdmFyIGlcclxuXHJcbiAgZXh0ZW5zaW9uW21dID0gZnVuY3Rpb24gKG8pIHtcclxuICAgIGlmICh0eXBlb2YgbyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cihtKVxyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBvID09PSAnc3RyaW5nJyB8fCBvIGluc3RhbmNlb2YgQ29sb3IgfHwgQ29sb3IuaXNSZ2IobykgfHwgKG8gaW5zdGFuY2VvZiBFbGVtZW50KSkge1xyXG4gICAgICB0aGlzLmF0dHIobSwgbylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHNldCBhbGwgYXR0cmlidXRlcyBmcm9tIHN1Z2FyLmZpbGwgYW5kIHN1Z2FyLnN0cm9rZSBsaXN0XHJcbiAgICAgIGZvciAoaSA9IHN1Z2FyW21dLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKG9bc3VnYXJbbV1baV1dICE9IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYXR0cihzdWdhci5wcmVmaXgobSwgc3VnYXJbbV1baV0pLCBvW3N1Z2FyW21dW2ldXSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJNZXRob2RzKFsgJ0VsZW1lbnQnLCAnUnVubmVyJyBdLCBleHRlbnNpb24pXHJcbn0pXHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoWyAnRWxlbWVudCcsICdSdW5uZXInIF0sIHtcclxuICAvLyBMZXQgdGhlIHVzZXIgc2V0IHRoZSBtYXRyaXggZGlyZWN0bHlcclxuICBtYXRyaXg6IGZ1bmN0aW9uIChtYXQsIGIsIGMsIGQsIGUsIGYpIHtcclxuICAgIC8vIEFjdCBhcyBhIGdldHRlclxyXG4gICAgaWYgKG1hdCA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTWF0cml4KHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWN0IGFzIGEgc2V0dGVyLCB0aGUgdXNlciBjYW4gcGFzcyBhIG1hdHJpeCBvciBhIHNldCBvZiBudW1iZXJzXHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCd0cmFuc2Zvcm0nLCBuZXcgTWF0cml4KG1hdCwgYiwgYywgZCwgZSwgZikpXHJcbiAgfSxcclxuXHJcbiAgLy8gTWFwIHJvdGF0aW9uIHRvIHRyYW5zZm9ybVxyXG4gIHJvdGF0ZTogZnVuY3Rpb24gKGFuZ2xlLCBjeCwgY3kpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IHJvdGF0ZTogYW5nbGUsIG94OiBjeCwgb3k6IGN5IH0sIHRydWUpXHJcbiAgfSxcclxuXHJcbiAgLy8gTWFwIHNrZXcgdG8gdHJhbnNmb3JtXHJcbiAgc2tldzogZnVuY3Rpb24gKHgsIHksIGN4LCBjeSkge1xyXG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gM1xyXG4gICAgICA/IHRoaXMudHJhbnNmb3JtKHsgc2tldzogeCwgb3g6IHksIG95OiBjeCB9LCB0cnVlKVxyXG4gICAgICA6IHRoaXMudHJhbnNmb3JtKHsgc2tldzogWyB4LCB5IF0sIG94OiBjeCwgb3k6IGN5IH0sIHRydWUpXHJcbiAgfSxcclxuXHJcbiAgc2hlYXI6IGZ1bmN0aW9uIChsYW0sIGN4LCBjeSkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgc2hlYXI6IGxhbSwgb3g6IGN4LCBveTogY3kgfSwgdHJ1ZSlcclxuICB9LFxyXG5cclxuICAvLyBNYXAgc2NhbGUgdG8gdHJhbnNmb3JtXHJcbiAgc2NhbGU6IGZ1bmN0aW9uICh4LCB5LCBjeCwgY3kpIHtcclxuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDNcclxuICAgICAgPyB0aGlzLnRyYW5zZm9ybSh7IHNjYWxlOiB4LCBveDogeSwgb3k6IGN4IH0sIHRydWUpXHJcbiAgICAgIDogdGhpcy50cmFuc2Zvcm0oeyBzY2FsZTogWyB4LCB5IF0sIG94OiBjeCwgb3k6IGN5IH0sIHRydWUpXHJcbiAgfSxcclxuXHJcbiAgLy8gTWFwIHRyYW5zbGF0ZSB0byB0cmFuc2Zvcm1cclxuICB0cmFuc2xhdGU6IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyB0cmFuc2xhdGU6IFsgeCwgeSBdIH0sIHRydWUpXHJcbiAgfSxcclxuXHJcbiAgLy8gTWFwIHJlbGF0aXZlIHRyYW5zbGF0aW9ucyB0byB0cmFuc2Zvcm1cclxuICByZWxhdGl2ZTogZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IHJlbGF0aXZlOiBbIHgsIHkgXSB9LCB0cnVlKVxyXG4gIH0sXHJcblxyXG4gIC8vIE1hcCBmbGlwIHRvIHRyYW5zZm9ybVxyXG4gIGZsaXA6IGZ1bmN0aW9uIChkaXJlY3Rpb24sIGFyb3VuZCkge1xyXG4gICAgdmFyIGRpcmVjdGlvblN0cmluZyA9IHR5cGVvZiBkaXJlY3Rpb24gPT09ICdzdHJpbmcnID8gZGlyZWN0aW9uXHJcbiAgICAgIDogaXNGaW5pdGUoZGlyZWN0aW9uKSA/ICdib3RoJ1xyXG4gICAgICA6ICdib3RoJ1xyXG4gICAgdmFyIG9yaWdpbiA9IChkaXJlY3Rpb24gPT09ICdib3RoJyAmJiBpc0Zpbml0ZShhcm91bmQpKSA/IFsgYXJvdW5kLCBhcm91bmQgXVxyXG4gICAgICA6IChkaXJlY3Rpb24gPT09ICd4JykgPyBbIGFyb3VuZCwgMCBdXHJcbiAgICAgIDogKGRpcmVjdGlvbiA9PT0gJ3knKSA/IFsgMCwgYXJvdW5kIF1cclxuICAgICAgOiBpc0Zpbml0ZShkaXJlY3Rpb24pID8gWyBkaXJlY3Rpb24sIGRpcmVjdGlvbiBdXHJcbiAgICAgIDogWyAwLCAwIF1cclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IGZsaXA6IGRpcmVjdGlvblN0cmluZywgb3JpZ2luOiBvcmlnaW4gfSwgdHJ1ZSlcclxuICB9LFxyXG5cclxuICAvLyBPcGFjaXR5XHJcbiAgb3BhY2l0eTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRyKCdvcGFjaXR5JywgdmFsdWUpXHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKCdyYWRpdXMnLCB7XHJcbiAgLy8gQWRkIHggYW5kIHkgcmFkaXVzXHJcbiAgcmFkaXVzOiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdmFyIHR5cGUgPSAodGhpcy5fZWxlbWVudCB8fCB0aGlzKS50eXBlXHJcbiAgICByZXR1cm4gdHlwZSA9PT0gJ3JhZGlhbEdyYWRpZW50JyB8fCB0eXBlID09PSAncmFkaWFsR3JhZGllbnQnXHJcbiAgICAgID8gdGhpcy5hdHRyKCdyJywgbmV3IFNWR051bWJlcih4KSlcclxuICAgICAgOiB0aGlzLnJ4KHgpLnJ5KHkgPT0gbnVsbCA/IHggOiB5KVxyXG4gIH1cclxufSlcclxuXHJcbnJlZ2lzdGVyTWV0aG9kcygnUGF0aCcsIHtcclxuICAvLyBHZXQgcGF0aCBsZW5ndGhcclxuICBsZW5ndGg6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0VG90YWxMZW5ndGgoKVxyXG4gIH0sXHJcbiAgLy8gR2V0IHBvaW50IGF0IGxlbmd0aFxyXG4gIHBvaW50QXQ6IGZ1bmN0aW9uIChsZW5ndGgpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5ub2RlLmdldFBvaW50QXRMZW5ndGgobGVuZ3RoKSlcclxuICB9XHJcbn0pXHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoWyAnRWxlbWVudCcsICdSdW5uZXInIF0sIHtcclxuICAvLyBTZXQgZm9udFxyXG4gIGZvbnQ6IGZ1bmN0aW9uIChhLCB2KSB7XHJcbiAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGZvciAodiBpbiBhKSB0aGlzLmZvbnQodiwgYVt2XSlcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYSA9PT0gJ2xlYWRpbmcnXHJcbiAgICAgID8gdGhpcy5sZWFkaW5nKHYpXHJcbiAgICAgIDogYSA9PT0gJ2FuY2hvcidcclxuICAgICAgICA/IHRoaXMuYXR0cigndGV4dC1hbmNob3InLCB2KVxyXG4gICAgICAgIDogYSA9PT0gJ3NpemUnIHx8IGEgPT09ICdmYW1pbHknIHx8IGEgPT09ICd3ZWlnaHQnIHx8IGEgPT09ICdzdHJldGNoJyB8fCBhID09PSAndmFyaWFudCcgfHwgYSA9PT0gJ3N0eWxlJ1xyXG4gICAgICAgICAgPyB0aGlzLmF0dHIoJ2ZvbnQtJyArIGEsIHYpXHJcbiAgICAgICAgICA6IHRoaXMuYXR0cihhLCB2KVxyXG4gIH1cclxufSlcclxuXHJcbnJlZ2lzdGVyTWV0aG9kcygnVGV4dCcsIHtcclxuICBheCAoeCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0cigneCcsIHgpXHJcbiAgfSxcclxuICBheSAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0cigneScsIHkpXHJcbiAgfSxcclxuICBhbW92ZSAoeCwgeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXgoeCkuYXkoeSlcclxuICB9XHJcbn0pXHJcblxyXG4vLyBBZGQgZXZlbnRzIHRvIGVsZW1lbnRzXHJcbmNvbnN0IG1ldGhvZHMgPSBbICdjbGljaycsXHJcbiAgJ2RibGNsaWNrJyxcclxuICAnbW91c2Vkb3duJyxcclxuICAnbW91c2V1cCcsXHJcbiAgJ21vdXNlb3ZlcicsXHJcbiAgJ21vdXNlb3V0JyxcclxuICAnbW91c2Vtb3ZlJyxcclxuICAnbW91c2VlbnRlcicsXHJcbiAgJ21vdXNlbGVhdmUnLFxyXG4gICd0b3VjaHN0YXJ0JyxcclxuICAndG91Y2htb3ZlJyxcclxuICAndG91Y2hsZWF2ZScsXHJcbiAgJ3RvdWNoZW5kJyxcclxuICAndG91Y2hjYW5jZWwnIF0ucmVkdWNlKGZ1bmN0aW9uIChsYXN0LCBldmVudCkge1xyXG4gIC8vIGFkZCBldmVudCB0byBFbGVtZW50XHJcbiAgY29uc3QgZm4gPSBmdW5jdGlvbiAoZikge1xyXG4gICAgaWYgKGYgPT09IG51bGwpIHtcclxuICAgICAgb2ZmKHRoaXMsIGV2ZW50KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb24odGhpcywgZXZlbnQsIGYpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgbGFzdFtldmVudF0gPSBmblxyXG4gIHJldHVybiBsYXN0XHJcbn0sIHt9KVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKCdFbGVtZW50JywgbWV0aG9kcylcclxuIiwiaW1wb3J0IHsgZ2V0T3JpZ2luIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMuanMnXHJcbmltcG9ydCB7IGRlbGltaXRlciwgdHJhbnNmb3JtcyB9IGZyb20gJy4uL2NvcmUvcmVnZXguanMnXHJcbmltcG9ydCB7IHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uLy4uL3V0aWxzL21ldGhvZHMuanMnXHJcbmltcG9ydCBNYXRyaXggZnJvbSAnLi4vLi4vdHlwZXMvTWF0cml4LmpzJ1xyXG5cclxuLy8gUmVzZXQgYWxsIHRyYW5zZm9ybWF0aW9uc1xyXG5leHBvcnQgZnVuY3Rpb24gdW50cmFuc2Zvcm0gKCkge1xyXG4gIHJldHVybiB0aGlzLmF0dHIoJ3RyYW5zZm9ybScsIG51bGwpXHJcbn1cclxuXHJcbi8vIG1lcmdlIHRoZSB3aG9sZSB0cmFuc2Zvcm1hdGlvbiBjaGFpbiBpbnRvIG9uZSBtYXRyaXggYW5kIHJldHVybnMgaXRcclxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJpeGlmeSAoKSB7XHJcbiAgdmFyIG1hdHJpeCA9ICh0aGlzLmF0dHIoJ3RyYW5zZm9ybScpIHx8ICcnKVxyXG4gICAgLy8gc3BsaXQgdHJhbnNmb3JtYXRpb25zXHJcbiAgICAuc3BsaXQodHJhbnNmb3Jtcykuc2xpY2UoMCwgLTEpLm1hcChmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgIC8vIGdlbmVyYXRlIGtleSA9PiB2YWx1ZSBwYWlyc1xyXG4gICAgICB2YXIga3YgPSBzdHIudHJpbSgpLnNwbGl0KCcoJylcclxuICAgICAgcmV0dXJuIFsga3ZbMF0sXHJcbiAgICAgICAga3ZbMV0uc3BsaXQoZGVsaW1pdGVyKVxyXG4gICAgICAgICAgLm1hcChmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0cilcclxuICAgICAgICAgIH0pXHJcbiAgICAgIF1cclxuICAgIH0pXHJcbiAgICAucmV2ZXJzZSgpXHJcbiAgICAvLyBtZXJnZSBldmVyeSB0cmFuc2Zvcm1hdGlvbiBpbnRvIG9uZSBtYXRyaXhcclxuICAgIC5yZWR1Y2UoZnVuY3Rpb24gKG1hdHJpeCwgdHJhbnNmb3JtKSB7XHJcbiAgICAgIGlmICh0cmFuc2Zvcm1bMF0gPT09ICdtYXRyaXgnKSB7XHJcbiAgICAgICAgcmV0dXJuIG1hdHJpeC5sbXVsdGlwbHkoTWF0cml4LmZyb21BcnJheSh0cmFuc2Zvcm1bMV0pKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBtYXRyaXhbdHJhbnNmb3JtWzBdXS5hcHBseShtYXRyaXgsIHRyYW5zZm9ybVsxXSlcclxuICAgIH0sIG5ldyBNYXRyaXgoKSlcclxuXHJcbiAgcmV0dXJuIG1hdHJpeFxyXG59XHJcblxyXG4vLyBhZGQgYW4gZWxlbWVudCB0byBhbm90aGVyIHBhcmVudCB3aXRob3V0IGNoYW5naW5nIHRoZSB2aXN1YWwgcmVwcmVzZW50YXRpb24gb24gdGhlIHNjcmVlblxyXG5leHBvcnQgZnVuY3Rpb24gdG9QYXJlbnQgKHBhcmVudCkge1xyXG4gIGlmICh0aGlzID09PSBwYXJlbnQpIHJldHVybiB0aGlzXHJcbiAgdmFyIGN0bSA9IHRoaXMuc2NyZWVuQ1RNKClcclxuICB2YXIgcEN0bSA9IHBhcmVudC5zY3JlZW5DVE0oKS5pbnZlcnNlKClcclxuXHJcbiAgdGhpcy5hZGRUbyhwYXJlbnQpLnVudHJhbnNmb3JtKCkudHJhbnNmb3JtKHBDdG0ubXVsdGlwbHkoY3RtKSlcclxuXHJcbiAgcmV0dXJuIHRoaXNcclxufVxyXG5cclxuLy8gc2FtZSBhcyBhYm92ZSB3aXRoIHBhcmVudCBlcXVhbHMgcm9vdC1zdmdcclxuZXhwb3J0IGZ1bmN0aW9uIHRvUm9vdCAoKSB7XHJcbiAgcmV0dXJuIHRoaXMudG9QYXJlbnQodGhpcy5yb290KCkpXHJcbn1cclxuXHJcbi8vIEFkZCB0cmFuc2Zvcm1hdGlvbnNcclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybSAobywgcmVsYXRpdmUpIHtcclxuICAvLyBBY3QgYXMgYSBnZXR0ZXIgaWYgbm8gb2JqZWN0IHdhcyBwYXNzZWRcclxuICBpZiAobyA9PSBudWxsIHx8IHR5cGVvZiBvID09PSAnc3RyaW5nJykge1xyXG4gICAgdmFyIGRlY29tcG9zZWQgPSBuZXcgTWF0cml4KHRoaXMpLmRlY29tcG9zZSgpXHJcbiAgICByZXR1cm4gZGVjb21wb3NlZFtvXSB8fCBkZWNvbXBvc2VkXHJcbiAgfVxyXG5cclxuICBpZiAoIU1hdHJpeC5pc01hdHJpeExpa2UobykpIHtcclxuICAgIC8vIFNldCB0aGUgb3JpZ2luIGFjY29yZGluZyB0byB0aGUgZGVmaW5lZCB0cmFuc2Zvcm1cclxuICAgIG8gPSB7IC4uLm8sIG9yaWdpbjogZ2V0T3JpZ2luKG8sIHRoaXMpIH1cclxuICB9XHJcblxyXG4gIC8vIFRoZSB1c2VyIGNhbiBwYXNzIGEgYm9vbGVhbiwgYW4gRWxlbWVudCBvciBhbiBNYXRyaXggb3Igbm90aGluZ1xyXG4gIHZhciBjbGVhblJlbGF0aXZlID0gcmVsYXRpdmUgPT09IHRydWUgPyB0aGlzIDogKHJlbGF0aXZlIHx8IGZhbHNlKVxyXG4gIHZhciByZXN1bHQgPSBuZXcgTWF0cml4KGNsZWFuUmVsYXRpdmUpLnRyYW5zZm9ybShvKVxyXG4gIHJldHVybiB0aGlzLmF0dHIoJ3RyYW5zZm9ybScsIHJlc3VsdClcclxufVxyXG5cclxucmVnaXN0ZXJNZXRob2RzKCdFbGVtZW50Jywge1xyXG4gIHVudHJhbnNmb3JtLCBtYXRyaXhpZnksIHRvUGFyZW50LCB0b1Jvb3QsIHRyYW5zZm9ybVxyXG59KVxyXG4iLCJpbXBvcnQgKiBhcyBzdmdNZW1iZXJzIGZyb20gJy4vbWFpbi5qcydcclxuaW1wb3J0IHsgbWFrZUluc3RhbmNlIH0gZnJvbSAnLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5cclxuLy8gVGhlIG1haW4gd3JhcHBpbmcgZWxlbWVudFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTVkcgKGVsZW1lbnQpIHtcclxuICByZXR1cm4gbWFrZUluc3RhbmNlKGVsZW1lbnQpXHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oU1ZHLCBzdmdNZW1iZXJzKVxyXG4iLCIvKiBlc2xpbnQgbm8tbmV3LWZ1bmM6IFwib2ZmXCIgKi9cclxuZXhwb3J0IGNvbnN0IHN1YkNsYXNzQXJyYXkgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyB0cnkgZXM2IHN1YmNsYXNzaW5nXHJcbiAgICByZXR1cm4gRnVuY3Rpb24oJ25hbWUnLCAnYmFzZUNsYXNzJywgJ19jb25zdHJ1Y3RvcicsIFtcclxuICAgICAgJ2Jhc2VDbGFzcyA9IGJhc2VDbGFzcyB8fCBBcnJheScsXHJcbiAgICAgICdyZXR1cm4geycsXHJcbiAgICAgICcgIFtuYW1lXTogY2xhc3MgZXh0ZW5kcyBiYXNlQ2xhc3MgeycsXHJcbiAgICAgICcgICAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHsnLFxyXG4gICAgICAnICAgICAgc3VwZXIoLi4uYXJncyknLFxyXG4gICAgICAnICAgICAgX2NvbnN0cnVjdG9yICYmIF9jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKScsXHJcbiAgICAgICcgICAgfScsXHJcbiAgICAgICcgIH0nLFxyXG4gICAgICAnfVtuYW1lXSdcclxuICAgIF0uam9pbignXFxuJykpXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgLy8gVXNlIGVzNSBhcHByb2FjaFxyXG4gICAgcmV0dXJuIChuYW1lLCBiYXNlQ2xhc3MgPSBBcnJheSwgX2NvbnN0cnVjdG9yKSA9PiB7XHJcbiAgICAgIGNvbnN0IEFyciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBiYXNlQ2xhc3MuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgIF9jb25zdHJ1Y3RvciAmJiBfY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBBcnIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlQ2xhc3MucHJvdG90eXBlKVxyXG4gICAgICBBcnIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXJyXHJcblxyXG4gICAgICBBcnIucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IG5ldyBBcnIoKVxyXG4gICAgICAgIGFyci5wdXNoLmFwcGx5KGFyciwgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHRoaXMsIGZuKSlcclxuICAgICAgICByZXR1cm4gYXJyXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBBcnJcclxuICAgIH1cclxuICB9XHJcbn0pKClcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSB7XHJcbiAgLy8gY29uc3RydWN0b3IgKG5vZGUvKiwge2V4dGVuc2lvbnMgPSBbXX0gKi8pIHtcclxuICAvLyAgIC8vIHRoaXMudGFncyA9IFtdXHJcbiAgLy8gICAvL1xyXG4gIC8vICAgLy8gZm9yIChsZXQgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcclxuICAvLyAgIC8vICAgZXh0ZW5zaW9uLnNldHVwLmNhbGwodGhpcywgbm9kZSlcclxuICAvLyAgIC8vICAgdGhpcy50YWdzLnB1c2goZXh0ZW5zaW9uLm5hbWUpXHJcbiAgLy8gICAvLyB9XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IGRlbGltaXRlciB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcclxuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uL3V0aWxzL3dpbmRvdy5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9tZXRob2RzLmpzJ1xyXG5pbXBvcnQgTWF0cml4IGZyb20gJy4vTWF0cml4LmpzJ1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9Qb2ludC5qcydcclxuaW1wb3J0IHBhcnNlciBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcGFyc2VyLmpzJ1xyXG5cclxuZnVuY3Rpb24gaXNOdWxsZWRCb3ggKGJveCkge1xyXG4gIHJldHVybiAhYm94LndpZHRoICYmICFib3guaGVpZ2h0ICYmICFib3gueCAmJiAhYm94LnlcclxufVxyXG5cclxuZnVuY3Rpb24gZG9tQ29udGFpbnMgKG5vZGUpIHtcclxuICByZXR1cm4gbm9kZSA9PT0gZ2xvYmFscy5kb2N1bWVudFxyXG4gICAgfHwgKGdsb2JhbHMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zIHx8IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgIC8vIFRoaXMgaXMgSUUgLSBpdCBkb2VzIG5vdCBzdXBwb3J0IGNvbnRhaW5zKCkgZm9yIHRvcC1sZXZlbCBTVkdzXHJcbiAgICAgIHdoaWxlIChub2RlLnBhcmVudE5vZGUpIHtcclxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5vZGUgPT09IGdsb2JhbHMuZG9jdW1lbnRcclxuICAgIH0pLmNhbGwoZ2xvYmFscy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIG5vZGUpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveCB7XHJcbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcclxuICAgIHRoaXMuaW5pdCguLi5hcmdzKVxyXG4gIH1cclxuXHJcbiAgaW5pdCAoc291cmNlKSB7XHJcbiAgICB2YXIgYmFzZSA9IFsgMCwgMCwgMCwgMCBdXHJcbiAgICBzb3VyY2UgPSB0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJyA/IHNvdXJjZS5zcGxpdChkZWxpbWl0ZXIpLm1hcChwYXJzZUZsb2F0KVxyXG4gICAgICA6IEFycmF5LmlzQXJyYXkoc291cmNlKSA/IHNvdXJjZVxyXG4gICAgICA6IHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnID8gWyBzb3VyY2UubGVmdCAhPSBudWxsID8gc291cmNlLmxlZnRcclxuICAgICAgOiBzb3VyY2UueCwgc291cmNlLnRvcCAhPSBudWxsID8gc291cmNlLnRvcCA6IHNvdXJjZS55LCBzb3VyY2Uud2lkdGgsIHNvdXJjZS5oZWlnaHQgXVxyXG4gICAgICA6IGFyZ3VtZW50cy5sZW5ndGggPT09IDQgPyBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcclxuICAgICAgOiBiYXNlXHJcblxyXG4gICAgdGhpcy54ID0gc291cmNlWzBdIHx8IDBcclxuICAgIHRoaXMueSA9IHNvdXJjZVsxXSB8fCAwXHJcbiAgICB0aGlzLndpZHRoID0gdGhpcy53ID0gc291cmNlWzJdIHx8IDBcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5oID0gc291cmNlWzNdIHx8IDBcclxuXHJcbiAgICAvLyBBZGQgbW9yZSBib3VuZGluZyBib3ggcHJvcGVydGllc1xyXG4gICAgdGhpcy54MiA9IHRoaXMueCArIHRoaXMud1xyXG4gICAgdGhpcy55MiA9IHRoaXMueSArIHRoaXMuaFxyXG4gICAgdGhpcy5jeCA9IHRoaXMueCArIHRoaXMudyAvIDJcclxuICAgIHRoaXMuY3kgPSB0aGlzLnkgKyB0aGlzLmggLyAyXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIE1lcmdlIHJlY3QgYm94IHdpdGggYW5vdGhlciwgcmV0dXJuIGEgbmV3IGluc3RhbmNlXHJcbiAgbWVyZ2UgKGJveCkge1xyXG4gICAgbGV0IHggPSBNYXRoLm1pbih0aGlzLngsIGJveC54KVxyXG4gICAgbGV0IHkgPSBNYXRoLm1pbih0aGlzLnksIGJveC55KVxyXG4gICAgbGV0IHdpZHRoID0gTWF0aC5tYXgodGhpcy54ICsgdGhpcy53aWR0aCwgYm94LnggKyBib3gud2lkdGgpIC0geFxyXG4gICAgbGV0IGhlaWdodCA9IE1hdGgubWF4KHRoaXMueSArIHRoaXMuaGVpZ2h0LCBib3gueSArIGJveC5oZWlnaHQpIC0geVxyXG5cclxuICAgIHJldHVybiBuZXcgQm94KHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0gKG0pIHtcclxuICAgIGlmICghKG0gaW5zdGFuY2VvZiBNYXRyaXgpKSB7XHJcbiAgICAgIG0gPSBuZXcgTWF0cml4KG0pXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHhNaW4gPSBJbmZpbml0eVxyXG4gICAgbGV0IHhNYXggPSAtSW5maW5pdHlcclxuICAgIGxldCB5TWluID0gSW5maW5pdHlcclxuICAgIGxldCB5TWF4ID0gLUluZmluaXR5XHJcblxyXG4gICAgbGV0IHB0cyA9IFtcclxuICAgICAgbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KSxcclxuICAgICAgbmV3IFBvaW50KHRoaXMueDIsIHRoaXMueSksXHJcbiAgICAgIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueTIpLFxyXG4gICAgICBuZXcgUG9pbnQodGhpcy54MiwgdGhpcy55MilcclxuICAgIF1cclxuXHJcbiAgICBwdHMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xyXG4gICAgICBwID0gcC50cmFuc2Zvcm0obSlcclxuICAgICAgeE1pbiA9IE1hdGgubWluKHhNaW4sIHAueClcclxuICAgICAgeE1heCA9IE1hdGgubWF4KHhNYXgsIHAueClcclxuICAgICAgeU1pbiA9IE1hdGgubWluKHlNaW4sIHAueSlcclxuICAgICAgeU1heCA9IE1hdGgubWF4KHlNYXgsIHAueSlcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIG5ldyBCb3goXHJcbiAgICAgIHhNaW4sIHlNaW4sXHJcbiAgICAgIHhNYXggLSB4TWluLFxyXG4gICAgICB5TWF4IC0geU1pblxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgYWRkT2Zmc2V0ICgpIHtcclxuICAgIC8vIG9mZnNldCBieSB3aW5kb3cgc2Nyb2xsIHBvc2l0aW9uLCBiZWNhdXNlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBjaGFuZ2VzIHdoZW4gd2luZG93IGlzIHNjcm9sbGVkXHJcbiAgICB0aGlzLnggKz0gZ2xvYmFscy53aW5kb3cucGFnZVhPZmZzZXRcclxuICAgIHRoaXMueSArPSBnbG9iYWxzLndpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nICgpIHtcclxuICAgIHJldHVybiB0aGlzLnggKyAnICcgKyB0aGlzLnkgKyAnICcgKyB0aGlzLndpZHRoICsgJyAnICsgdGhpcy5oZWlnaHRcclxuICB9XHJcblxyXG4gIHRvQXJyYXkgKCkge1xyXG4gICAgcmV0dXJuIFsgdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0IF1cclxuICB9XHJcblxyXG4gIGlzTnVsbGVkICgpIHtcclxuICAgIHJldHVybiBpc051bGxlZEJveCh0aGlzKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm94IChjYiwgcmV0cnkpIHtcclxuICBsZXQgYm94XHJcblxyXG4gIHRyeSB7XHJcbiAgICBib3ggPSBjYih0aGlzLm5vZGUpXHJcblxyXG4gICAgaWYgKGlzTnVsbGVkQm94KGJveCkgJiYgIWRvbUNvbnRhaW5zKHRoaXMubm9kZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IG5vdCBpbiB0aGUgZG9tJylcclxuICAgIH1cclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBib3ggPSByZXRyeSh0aGlzKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJveFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmJveCAoKSB7XHJcbiAgcmV0dXJuIG5ldyBCb3goZ2V0Qm94LmNhbGwodGhpcywgKG5vZGUpID0+IG5vZGUuZ2V0QkJveCgpLCAoZWwpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBjbG9uZSA9IGVsLmNsb25lKCkuYWRkVG8ocGFyc2VyKCkuc3ZnKS5zaG93KClcclxuICAgICAgbGV0IGJveCA9IGNsb25lLm5vZGUuZ2V0QkJveCgpXHJcbiAgICAgIGNsb25lLnJlbW92ZSgpXHJcbiAgICAgIHJldHVybiBib3hcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHZXR0aW5nIGJib3ggb2YgZWxlbWVudCBcIicgKyBlbC5ub2RlLm5vZGVOYW1lICsgJ1wiIGlzIG5vdCBwb3NzaWJsZS4gJyArIGUudG9TdHJpbmcoKSlcclxuICAgIH1cclxuICB9KSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJib3ggKGVsKSB7XHJcbiAgbGV0IGJveCA9IG5ldyBCb3goZ2V0Qm94LmNhbGwodGhpcywgKG5vZGUpID0+IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIChlbCkgPT4ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdHZXR0aW5nIHJib3ggb2YgZWxlbWVudCBcIicgKyBlbC5ub2RlLm5vZGVOYW1lICsgJ1wiIGlzIG5vdCBwb3NzaWJsZScpXHJcbiAgfSkpXHJcbiAgaWYgKGVsKSByZXR1cm4gYm94LnRyYW5zZm9ybShlbC5zY3JlZW5DVE0oKS5pbnZlcnNlKCkpXHJcbiAgcmV0dXJuIGJveC5hZGRPZmZzZXQoKVxyXG59XHJcblxyXG5yZWdpc3Rlck1ldGhvZHMoe1xyXG4gIHZpZXdib3g6IHtcclxuICAgIHZpZXdib3ggKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgLy8gYWN0IGFzIGdldHRlclxyXG4gICAgICBpZiAoeCA9PSBudWxsKSByZXR1cm4gbmV3IEJveCh0aGlzLmF0dHIoJ3ZpZXdCb3gnKSlcclxuXHJcbiAgICAgIC8vIGFjdCBhcyBzZXR0ZXJcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cigndmlld0JveCcsIG5ldyBCb3goeCwgeSwgd2lkdGgsIGhlaWdodCkpXHJcbiAgICB9LFxyXG5cclxuICAgIHpvb20gKGxldmVsLCBwb2ludCkge1xyXG4gICAgICBsZXQgd2lkdGggPSB0aGlzLm5vZGUuY2xpZW50V2lkdGhcclxuICAgICAgbGV0IGhlaWdodCA9IHRoaXMubm9kZS5jbGllbnRIZWlnaHRcclxuICAgICAgY29uc3QgdiA9IHRoaXMudmlld2JveCgpXHJcblxyXG4gICAgICAvLyBGaXJlZm94IGRvZXMgbm90IHN1cHBvcnQgY2xpZW50SGVpZ2h0IGFuZCByZXR1cm5zIDBcclxuICAgICAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9ODc0ODExXHJcbiAgICAgIGlmICghd2lkdGggJiYgIWhlaWdodCkge1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubm9kZSlcclxuICAgICAgICB3aWR0aCA9IHBhcnNlRmxvYXQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKSlcclxuICAgICAgICBoZWlnaHQgPSBwYXJzZUZsb2F0KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB6b29tWCA9IHdpZHRoIC8gdi53aWR0aFxyXG4gICAgICBjb25zdCB6b29tWSA9IGhlaWdodCAvIHYuaGVpZ2h0XHJcbiAgICAgIGNvbnN0IHpvb20gPSBNYXRoLm1pbih6b29tWCwgem9vbVkpXHJcblxyXG4gICAgICBpZiAobGV2ZWwgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB6b29tXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB6b29tQW1vdW50ID0gem9vbSAvIGxldmVsXHJcbiAgICAgIGlmICh6b29tQW1vdW50ID09PSBJbmZpbml0eSkgem9vbUFtb3VudCA9IE51bWJlci5NSU5fVkFMVUVcclxuXHJcbiAgICAgIHBvaW50ID0gcG9pbnQgfHwgbmV3IFBvaW50KHdpZHRoIC8gMiAvIHpvb21YICsgdi54LCBoZWlnaHQgLyAyIC8gem9vbVkgKyB2LnkpXHJcblxyXG4gICAgICBjb25zdCBib3ggPSBuZXcgQm94KHYpLnRyYW5zZm9ybShcclxuICAgICAgICBuZXcgTWF0cml4KHsgc2NhbGU6IHpvb21BbW91bnQsIG9yaWdpbjogcG9pbnQgfSlcclxuICAgICAgKVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMudmlld2JveChib3gpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxucmVnaXN0ZXIoQm94KVxyXG4iLCJcclxuaW1wb3J0IHsgaGV4LCBpc0hleCwgaXNSZ2IsIHJnYiwgd2hpdGVzcGFjZSB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcclxuXHJcbmZ1bmN0aW9uIHNpeERpZ2l0SGV4IChoZXgpIHtcclxuICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gNFxyXG4gICAgPyBbICcjJyxcclxuICAgICAgaGV4LnN1YnN0cmluZygxLCAyKSwgaGV4LnN1YnN0cmluZygxLCAyKSxcclxuICAgICAgaGV4LnN1YnN0cmluZygyLCAzKSwgaGV4LnN1YnN0cmluZygyLCAzKSxcclxuICAgICAgaGV4LnN1YnN0cmluZygzLCA0KSwgaGV4LnN1YnN0cmluZygzLCA0KVxyXG4gICAgXS5qb2luKCcnKVxyXG4gICAgOiBoZXhcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcG9uZW50SGV4IChjb21wb25lbnQpIHtcclxuICBjb25zdCBpbnRlZ2VyID0gTWF0aC5yb3VuZChjb21wb25lbnQpXHJcbiAgY29uc3QgYm91bmRlZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgaW50ZWdlcikpXHJcbiAgY29uc3QgaGV4ID0gYm91bmRlZC50b1N0cmluZygxNilcclxuICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gMSA/ICcwJyArIGhleCA6IGhleFxyXG59XHJcblxyXG5mdW5jdGlvbiBpcyAob2JqZWN0LCBzcGFjZSkge1xyXG4gIGZvciAobGV0IGkgPSBzcGFjZS5sZW5ndGg7IGktLTspIHtcclxuICAgIGlmIChvYmplY3Rbc3BhY2VbaV1dID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcmFtZXRlcnMgKGEsIGIpIHtcclxuICBjb25zdCBwYXJhbXMgPSBpcyhhLCAncmdiJykgPyB7IF9hOiBhLnIsIF9iOiBhLmcsIF9jOiBhLmIsIHNwYWNlOiAncmdiJyB9XHJcbiAgICA6IGlzKGEsICd4eXonKSA/IHsgX2E6IGEueCwgX2I6IGEueSwgX2M6IGEueiwgX2Q6IDAsIHNwYWNlOiAneHl6JyB9XHJcbiAgICA6IGlzKGEsICdoc2wnKSA/IHsgX2E6IGEuaCwgX2I6IGEucywgX2M6IGEubCwgX2Q6IDAsIHNwYWNlOiAnaHNsJyB9XHJcbiAgICA6IGlzKGEsICdsYWInKSA/IHsgX2E6IGEubCwgX2I6IGEuYSwgX2M6IGEuYiwgX2Q6IDAsIHNwYWNlOiAnbGFiJyB9XHJcbiAgICA6IGlzKGEsICdsY2gnKSA/IHsgX2E6IGEubCwgX2I6IGEuYywgX2M6IGEuaCwgX2Q6IDAsIHNwYWNlOiAnbGNoJyB9XHJcbiAgICA6IGlzKGEsICdjbXlrJykgPyB7IF9hOiBhLmMsIF9iOiBhLm0sIF9jOiBhLnksIF9kOiBhLmssIHNwYWNlOiAnY215aycgfVxyXG4gICAgOiB7IF9hOiAwLCBfYjogMCwgX2M6IDAsIHNwYWNlOiAncmdiJyB9XHJcblxyXG4gIHBhcmFtcy5zcGFjZSA9IGIgfHwgcGFyYW1zLnNwYWNlXHJcbiAgcmV0dXJuIHBhcmFtc1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaWVTcGFjZSAoc3BhY2UpIHtcclxuICBpZiAoc3BhY2UgPT09ICdsYWInIHx8IHNwYWNlID09PSAneHl6JyB8fCBzcGFjZSA9PT0gJ2xjaCcpIHtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaHVlVG9SZ2IgKHAsIHEsIHQpIHtcclxuICBpZiAodCA8IDApIHQgKz0gMVxyXG4gIGlmICh0ID4gMSkgdCAtPSAxXHJcbiAgaWYgKHQgPCAxIC8gNikgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHRcclxuICBpZiAodCA8IDEgLyAyKSByZXR1cm4gcVxyXG4gIGlmICh0IDwgMiAvIDMpIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNlxyXG4gIHJldHVybiBwXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yIHtcclxuICBjb25zdHJ1Y3RvciAoLi4uaW5wdXRzKSB7XHJcbiAgICB0aGlzLmluaXQoLi4uaW5wdXRzKVxyXG4gIH1cclxuXHJcbiAgaW5pdCAoYSA9IDAsIGIgPSAwLCBjID0gMCwgZCA9IDAsIHNwYWNlID0gJ3JnYicpIHtcclxuICAgIC8vIFRoaXMgY2F0Y2hlcyB0aGUgY2FzZSB3aGVuIGEgZmFsc3kgdmFsdWUgaXMgcGFzc2VkIGxpa2UgJydcclxuICAgIGEgPSAhYSA/IDAgOiBhXHJcblxyXG4gICAgLy8gUmVzZXQgYWxsIHZhbHVlcyBpbiBjYXNlIHRoZSBpbml0IGZ1bmN0aW9uIGlzIHJlcnVuIHdpdGggbmV3IGNvbG9yIHNwYWNlXHJcbiAgICBpZiAodGhpcy5zcGFjZSkge1xyXG4gICAgICBmb3IgKGxldCBjb21wb25lbnQgaW4gdGhpcy5zcGFjZSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzW3RoaXMuc3BhY2VbY29tcG9uZW50XV1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgYSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgLy8gQWxsb3cgZm9yIHRoZSBjYXNlIHRoYXQgd2UgZG9uJ3QgbmVlZCBkLi4uXHJcbiAgICAgIHNwYWNlID0gdHlwZW9mIGQgPT09ICdzdHJpbmcnID8gZCA6IHNwYWNlXHJcbiAgICAgIGQgPSB0eXBlb2YgZCA9PT0gJ3N0cmluZycgPyAwIDogZFxyXG5cclxuICAgICAgLy8gQXNzaWduIHRoZSB2YWx1ZXMgc3RyYWlnaHQgdG8gdGhlIGNvbG9yXHJcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyBfYTogYSwgX2I6IGIsIF9jOiBjLCBfZDogZCwgc3BhY2UgfSlcclxuICAgIC8vIElmIHRoZSB1c2VyIGdhdmUgdXMgYW4gYXJyYXksIG1ha2UgdGhlIGNvbG9yIGZyb20gaXRcclxuICAgIH0gZWxzZSBpZiAoYSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIHRoaXMuc3BhY2UgPSBiIHx8ICh0eXBlb2YgYVszXSA9PT0gJ3N0cmluZycgPyBhWzNdIDogYVs0XSkgfHwgJ3JnYidcclxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IF9hOiBhWzBdLCBfYjogYVsxXSwgX2M6IGFbMl0sIF9kOiBhWzNdIHx8IDAgfSlcclxuICAgIH0gZWxzZSBpZiAoYSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAvLyBTZXQgdGhlIG9iamVjdCB1cCBhbmQgYXNzaWduIGl0cyB2YWx1ZXMgZGlyZWN0bHlcclxuICAgICAgY29uc3QgdmFsdWVzID0gZ2V0UGFyYW1ldGVycyhhLCBiKVxyXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHZhbHVlcylcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGlmIChpc1JnYi50ZXN0KGEpKSB7XHJcbiAgICAgICAgY29uc3Qgbm9XaGl0ZXNwYWNlID0gYS5yZXBsYWNlKHdoaXRlc3BhY2UsICcnKVxyXG4gICAgICAgIGNvbnN0IFsgX2EsIF9iLCBfYyBdID0gcmdiLmV4ZWMobm9XaGl0ZXNwYWNlKVxyXG4gICAgICAgICAgLnNsaWNlKDEsIDQpLm1hcCh2ID0+IHBhcnNlSW50KHYpKVxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyBfYSwgX2IsIF9jLCBfZDogMCwgc3BhY2U6ICdyZ2InIH0pXHJcbiAgICAgIH0gZWxzZSBpZiAoaXNIZXgudGVzdChhKSkge1xyXG4gICAgICAgIGNvbnN0IGhleFBhcnNlID0gdiA9PiBwYXJzZUludCh2LCAxNilcclxuICAgICAgICBjb25zdCBbICwgX2EsIF9iLCBfYyBdID0gaGV4LmV4ZWMoc2l4RGlnaXRIZXgoYSkpLm1hcChoZXhQYXJzZSlcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHsgX2EsIF9iLCBfYywgX2Q6IDAsIHNwYWNlOiAncmdiJyB9KVxyXG4gICAgICB9IGVsc2UgdGhyb3cgRXJyb3IoYFVuc3VwcG9ydGVkIHN0cmluZyBmb3JtYXQsIGNhbid0IGNvbnN0cnVjdCBDb2xvcmApXHJcbiAgICB9XHJcblxyXG4gICAgLy8gTm93IGFkZCB0aGUgY29tcG9uZW50cyBhcyBhIGNvbnZlbmllbmNlXHJcbiAgICBjb25zdCB7IF9hLCBfYiwgX2MsIF9kIH0gPSB0aGlzXHJcbiAgICBjb25zdCBjb21wb25lbnRzID0gdGhpcy5zcGFjZSA9PT0gJ3JnYicgPyB7IHI6IF9hLCBnOiBfYiwgYjogX2MgfVxyXG4gICAgICA6IHRoaXMuc3BhY2UgPT09ICd4eXonID8geyB4OiBfYSwgeTogX2IsIHo6IF9jIH1cclxuICAgICAgOiB0aGlzLnNwYWNlID09PSAnaHNsJyA/IHsgaDogX2EsIHM6IF9iLCBsOiBfYyB9XHJcbiAgICAgIDogdGhpcy5zcGFjZSA9PT0gJ2xhYicgPyB7IGw6IF9hLCBhOiBfYiwgYjogX2MgfVxyXG4gICAgICA6IHRoaXMuc3BhY2UgPT09ICdsY2gnID8geyBsOiBfYSwgYzogX2IsIGg6IF9jIH1cclxuICAgICAgOiB0aGlzLnNwYWNlID09PSAnY215aycgPyB7IGM6IF9hLCBtOiBfYiwgeTogX2MsIGs6IF9kIH1cclxuICAgICAgOiB7fVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb21wb25lbnRzKVxyXG4gIH1cclxuXHJcbiAgLypcclxuICBDb252ZXJzaW9uIE1ldGhvZHNcclxuICAqL1xyXG5cclxuICByZ2IgKCkge1xyXG4gICAgaWYgKHRoaXMuc3BhY2UgPT09ICdyZ2InKSB7XHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9IGVsc2UgaWYgKGNpZVNwYWNlKHRoaXMuc3BhY2UpKSB7XHJcbiAgICAgIC8vIENvbnZlcnQgdG8gdGhlIHh5eiBjb2xvciBzcGFjZVxyXG4gICAgICBsZXQgeyB4LCB5LCB6IH0gPSB0aGlzXHJcbiAgICAgIGlmICh0aGlzLnNwYWNlID09PSAnbGFiJyB8fCB0aGlzLnNwYWNlID09PSAnbGNoJykge1xyXG4gICAgICAgIC8vIEdldCB0aGUgdmFsdWVzIGluIHRoZSBsYWIgc3BhY2VcclxuICAgICAgICBsZXQgeyBsLCBhLCBiIH0gPSB0aGlzXHJcbiAgICAgICAgaWYgKHRoaXMuc3BhY2UgPT09ICdsY2gnKSB7XHJcbiAgICAgICAgICBsZXQgeyBjLCBoIH0gPSB0aGlzXHJcbiAgICAgICAgICBjb25zdCBkVG9SID0gTWF0aC5QSSAvIDE4MFxyXG4gICAgICAgICAgYSA9IGMgKiBNYXRoLmNvcyhkVG9SICogaClcclxuICAgICAgICAgIGIgPSBjICogTWF0aC5zaW4oZFRvUiAqIGgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVbmRvIHRoZSBub25saW5lYXIgZnVuY3Rpb25cclxuICAgICAgICBjb25zdCB5TCA9IChsICsgMTYpIC8gMTE2XHJcbiAgICAgICAgY29uc3QgeEwgPSBhIC8gNTAwICsgeUxcclxuICAgICAgICBjb25zdCB6TCA9IHlMIC0gYiAvIDIwMFxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIHh5eiB2YWx1ZXNcclxuICAgICAgICBjb25zdCBjdCA9IDE2IC8gMTE2XHJcbiAgICAgICAgY29uc3QgbXggPSAwLjAwODg1NlxyXG4gICAgICAgIGNvbnN0IG5tID0gNy43ODdcclxuICAgICAgICB4ID0gMC45NTA0NyAqICgoeEwgKiogMyA+IG14KSA/IHhMICoqIDMgOiAoeEwgLSBjdCkgLyBubSlcclxuICAgICAgICB5ID0gMS4wMDAwMCAqICgoeUwgKiogMyA+IG14KSA/IHlMICoqIDMgOiAoeUwgLSBjdCkgLyBubSlcclxuICAgICAgICB6ID0gMS4wODg4MyAqICgoekwgKiogMyA+IG14KSA/IHpMICoqIDMgOiAoekwgLSBjdCkgLyBubSlcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ29udmVydCB4eXogdG8gdW5ib3VuZGVkIHJnYiB2YWx1ZXNcclxuICAgICAgY29uc3QgclUgPSB4ICogMy4yNDA2ICsgeSAqIC0xLjUzNzIgKyB6ICogLTAuNDk4NlxyXG4gICAgICBjb25zdCBnVSA9IHggKiAtMC45Njg5ICsgeSAqIDEuODc1OCArIHogKiAwLjA0MTVcclxuICAgICAgY29uc3QgYlUgPSB4ICogMC4wNTU3ICsgeSAqIC0wLjIwNDAgKyB6ICogMS4wNTcwXHJcblxyXG4gICAgICAvLyBDb252ZXJ0IHRoZSB2YWx1ZXMgdG8gdHJ1ZSByZ2IgdmFsdWVzXHJcbiAgICAgIGxldCBwb3cgPSBNYXRoLnBvd1xyXG4gICAgICBsZXQgYmQgPSAwLjAwMzEzMDhcclxuICAgICAgY29uc3QgciA9IChyVSA+IGJkKSA/ICgxLjA1NSAqIHBvdyhyVSwgMSAvIDIuNCkgLSAwLjA1NSkgOiAxMi45MiAqIHJVXHJcbiAgICAgIGNvbnN0IGcgPSAoZ1UgPiBiZCkgPyAoMS4wNTUgKiBwb3coZ1UsIDEgLyAyLjQpIC0gMC4wNTUpIDogMTIuOTIgKiBnVVxyXG4gICAgICBjb25zdCBiID0gKGJVID4gYmQpID8gKDEuMDU1ICogcG93KGJVLCAxIC8gMi40KSAtIDAuMDU1KSA6IDEyLjkyICogYlVcclxuXHJcbiAgICAgIC8vIE1ha2UgYW5kIHJldHVybiB0aGUgY29sb3JcclxuICAgICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IoMjU1ICogciwgMjU1ICogZywgMjU1ICogYilcclxuICAgICAgcmV0dXJuIGNvbG9yXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3BhY2UgPT09ICdoc2wnKSB7XHJcbiAgICAgIC8vIGh0dHBzOi8vYmdyaW5zLmdpdGh1Yi5pby9UaW55Q29sb3IvZG9jcy90aW55Y29sb3IuaHRtbFxyXG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgaHNsIHZhbHVlc1xyXG4gICAgICBsZXQgeyBoLCBzLCBsIH0gPSB0aGlzXHJcbiAgICAgIGggLz0gMzYwXHJcbiAgICAgIHMgLz0gMTAwXHJcbiAgICAgIGwgLz0gMTAwXHJcblxyXG4gICAgICAvLyBJZiB3ZSBhcmUgZ3JleSwgdGhlbiBqdXN0IG1ha2UgdGhlIGNvbG9yIGRpcmVjdGx5XHJcbiAgICAgIGlmIChzID09PSAwKSB7XHJcbiAgICAgICAgbCAqPSAyNTVcclxuICAgICAgICBsZXQgY29sb3IgPSBuZXcgQ29sb3IobCwgbCwgbClcclxuICAgICAgICByZXR1cm4gY29sb3JcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVE9ETyBJIGhhdmUgbm8gaWRlYSB3aGF0IHRoaXMgZG9lcyA6RCBJZiB5b3UgZmlndXJlIGl0IG91dCwgdGVsbCBtZSFcclxuICAgICAgY29uc3QgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHNcclxuICAgICAgY29uc3QgcCA9IDIgKiBsIC0gcVxyXG5cclxuICAgICAgLy8gR2V0IHRoZSByZ2IgdmFsdWVzXHJcbiAgICAgIGNvbnN0IHIgPSAyNTUgKiBodWVUb1JnYihwLCBxLCBoICsgMSAvIDMpXHJcbiAgICAgIGNvbnN0IGcgPSAyNTUgKiBodWVUb1JnYihwLCBxLCBoKVxyXG4gICAgICBjb25zdCBiID0gMjU1ICogaHVlVG9SZ2IocCwgcSwgaCAtIDEgLyAzKVxyXG5cclxuICAgICAgLy8gTWFrZSBhIG5ldyBjb2xvclxyXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihyLCBnLCBiKVxyXG4gICAgICByZXR1cm4gY29sb3JcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zcGFjZSA9PT0gJ2NteWsnKSB7XHJcbiAgICAgIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2ZlbGlwZXNhYmluby81MDY2MzM2XHJcbiAgICAgIC8vIEdldCB0aGUgbm9ybWFsaXNlZCBjbXlrIHZhbHVlc1xyXG4gICAgICBjb25zdCB7IGMsIG0sIHksIGsgfSA9IHRoaXNcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgcmdiIHZhbHVlc1xyXG4gICAgICBjb25zdCByID0gMjU1ICogKDEgLSBNYXRoLm1pbigxLCBjICogKDEgLSBrKSArIGspKVxyXG4gICAgICBjb25zdCBnID0gMjU1ICogKDEgLSBNYXRoLm1pbigxLCBtICogKDEgLSBrKSArIGspKVxyXG4gICAgICBjb25zdCBiID0gMjU1ICogKDEgLSBNYXRoLm1pbigxLCB5ICogKDEgLSBrKSArIGspKVxyXG5cclxuICAgICAgLy8gRm9ybSB0aGUgY29sb3IgYW5kIHJldHVybiBpdFxyXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihyLCBnLCBiKVxyXG4gICAgICByZXR1cm4gY29sb3JcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsYWIgKCkge1xyXG4gICAgLy8gR2V0IHRoZSB4eXogY29sb3JcclxuICAgIGNvbnN0IHsgeCwgeSwgeiB9ID0gdGhpcy54eXooKVxyXG5cclxuICAgIC8vIEdldCB0aGUgbGFiIGNvbXBvbmVudHNcclxuICAgIGNvbnN0IGwgPSAoMTE2ICogeSkgLSAxNlxyXG4gICAgY29uc3QgYSA9IDUwMCAqICh4IC0geSlcclxuICAgIGNvbnN0IGIgPSAyMDAgKiAoeSAtIHopXHJcblxyXG4gICAgLy8gQ29uc3RydWN0IGFuZCByZXR1cm4gYSBuZXcgY29sb3JcclxuICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGwsIGEsIGIsICdsYWInKVxyXG4gICAgcmV0dXJuIGNvbG9yXHJcbiAgfVxyXG5cclxuICB4eXogKCkge1xyXG5cclxuICAgIC8vIE5vcm1hbGlzZSB0aGUgcmVkLCBncmVlbiBhbmQgYmx1ZSB2YWx1ZXNcclxuICAgIGNvbnN0IHsgX2E6IHIyNTUsIF9iOiBnMjU1LCBfYzogYjI1NSB9ID0gdGhpcy5yZ2IoKVxyXG4gICAgY29uc3QgWyByLCBnLCBiIF0gPSBbIHIyNTUsIGcyNTUsIGIyNTUgXS5tYXAodiA9PiB2IC8gMjU1KVxyXG5cclxuICAgIC8vIENvbnZlcnQgdG8gdGhlIGxhYiByZ2Igc3BhY2VcclxuICAgIGNvbnN0IHJMID0gKHIgPiAwLjA0MDQ1KSA/IE1hdGgucG93KChyICsgMC4wNTUpIC8gMS4wNTUsIDIuNCkgOiByIC8gMTIuOTJcclxuICAgIGNvbnN0IGdMID0gKGcgPiAwLjA0MDQ1KSA/IE1hdGgucG93KChnICsgMC4wNTUpIC8gMS4wNTUsIDIuNCkgOiBnIC8gMTIuOTJcclxuICAgIGNvbnN0IGJMID0gKGIgPiAwLjA0MDQ1KSA/IE1hdGgucG93KChiICsgMC4wNTUpIC8gMS4wNTUsIDIuNCkgOiBiIC8gMTIuOTJcclxuXHJcbiAgICAvLyBDb252ZXJ0IHRvIHRoZSB4eXogY29sb3Igc3BhY2Ugd2l0aG91dCBib3VuZGluZyB0aGUgdmFsdWVzXHJcbiAgICBjb25zdCB4VSA9IChyTCAqIDAuNDEyNCArIGdMICogMC4zNTc2ICsgYkwgKiAwLjE4MDUpIC8gMC45NTA0N1xyXG4gICAgY29uc3QgeVUgPSAockwgKiAwLjIxMjYgKyBnTCAqIDAuNzE1MiArIGJMICogMC4wNzIyKSAvIDEuMDAwMDBcclxuICAgIGNvbnN0IHpVID0gKHJMICogMC4wMTkzICsgZ0wgKiAwLjExOTIgKyBiTCAqIDAuOTUwNSkgLyAxLjA4ODgzXHJcblxyXG4gICAgLy8gR2V0IHRoZSBwcm9wZXIgeHl6IHZhbHVlcyBieSBhcHBseWluZyB0aGUgYm91bmRpbmdcclxuICAgIGNvbnN0IHggPSAoeFUgPiAwLjAwODg1NikgPyBNYXRoLnBvdyh4VSwgMSAvIDMpIDogKDcuNzg3ICogeFUpICsgMTYgLyAxMTZcclxuICAgIGNvbnN0IHkgPSAoeVUgPiAwLjAwODg1NikgPyBNYXRoLnBvdyh5VSwgMSAvIDMpIDogKDcuNzg3ICogeVUpICsgMTYgLyAxMTZcclxuICAgIGNvbnN0IHogPSAoelUgPiAwLjAwODg1NikgPyBNYXRoLnBvdyh6VSwgMSAvIDMpIDogKDcuNzg3ICogelUpICsgMTYgLyAxMTZcclxuXHJcbiAgICAvLyBNYWtlIGFuZCByZXR1cm4gdGhlIGNvbG9yXHJcbiAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcih4LCB5LCB6LCAneHl6JylcclxuICAgIHJldHVybiBjb2xvclxyXG4gIH1cclxuXHJcbiAgbGNoICgpIHtcclxuXHJcbiAgICAvLyBHZXQgdGhlIGxhYiBjb2xvciBkaXJlY3RseVxyXG4gICAgY29uc3QgeyBsLCBhLCBiIH0gPSB0aGlzLmxhYigpXHJcblxyXG4gICAgLy8gR2V0IHRoZSBjaHJvbWF0aWNpdHkgYW5kIHRoZSBodWUgdXNpbmcgcG9sYXIgY29vcmRpbmF0ZXNcclxuICAgIGNvbnN0IGMgPSBNYXRoLnNxcnQoYSAqKiAyICsgYiAqKiAyKVxyXG4gICAgbGV0IGggPSAxODAgKiBNYXRoLmF0YW4yKGIsIGEpIC8gTWF0aC5QSVxyXG4gICAgaWYgKGggPCAwKSB7XHJcbiAgICAgIGggKj0gLTFcclxuICAgICAgaCA9IDM2MCAtIGhcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYWtlIGEgbmV3IGNvbG9yIGFuZCByZXR1cm4gaXRcclxuICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGwsIGMsIGgsICdsY2gnKVxyXG4gICAgcmV0dXJuIGNvbG9yXHJcbiAgfVxyXG5cclxuICBoc2wgKCkge1xyXG5cclxuICAgIC8vIEdldCB0aGUgcmdiIHZhbHVlc1xyXG4gICAgY29uc3QgeyBfYSwgX2IsIF9jIH0gPSB0aGlzLnJnYigpXHJcbiAgICBjb25zdCBbIHIsIGcsIGIgXSA9IFsgX2EsIF9iLCBfYyBdLm1hcCh2ID0+IHYgLyAyNTUpXHJcblxyXG4gICAgLy8gRmluZCB0aGUgbWF4aW11bSBhbmQgbWluaW11bSB2YWx1ZXMgdG8gZ2V0IHRoZSBsaWdodG5lc3NcclxuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpXHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKVxyXG4gICAgY29uc3QgbCA9IChtYXggKyBtaW4pIC8gMlxyXG5cclxuICAgIC8vIElmIHRoZSByLCBnLCB2IHZhbHVlcyBhcmUgaWRlbnRpY2FsIHRoZW4gd2UgYXJlIGdyZXlcclxuICAgIGNvbnN0IGlzR3JleSA9IG1heCA9PT0gbWluXHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBodWUgYW5kIHNhdHVyYXRpb25cclxuICAgIGNvbnN0IGRlbHRhID0gbWF4IC0gbWluXHJcbiAgICBjb25zdCBzID0gaXNHcmV5ID8gMFxyXG4gICAgICA6IGwgPiAwLjUgPyBkZWx0YSAvICgyIC0gbWF4IC0gbWluKVxyXG4gICAgICA6IGRlbHRhIC8gKG1heCArIG1pbilcclxuICAgIGNvbnN0IGggPSBpc0dyZXkgPyAwXHJcbiAgICAgIDogbWF4ID09PSByID8gKChnIC0gYikgLyBkZWx0YSArIChnIDwgYiA/IDYgOiAwKSkgLyA2XHJcbiAgICAgIDogbWF4ID09PSBnID8gKChiIC0gcikgLyBkZWx0YSArIDIpIC8gNlxyXG4gICAgICA6IG1heCA9PT0gYiA/ICgociAtIGcpIC8gZGVsdGEgKyA0KSAvIDZcclxuICAgICAgOiAwXHJcblxyXG4gICAgLy8gQ29uc3RydWN0IGFuZCByZXR1cm4gdGhlIG5ldyBjb2xvclxyXG4gICAgY29uc3QgY29sb3IgPSBuZXcgQ29sb3IoMzYwICogaCwgMTAwICogcywgMTAwICogbCwgJ2hzbCcpXHJcbiAgICByZXR1cm4gY29sb3JcclxuICB9XHJcblxyXG4gIGNteWsgKCkge1xyXG5cclxuICAgIC8vIEdldCB0aGUgcmdiIHZhbHVlcyBmb3IgdGhlIGN1cnJlbnQgY29sb3JcclxuICAgIGNvbnN0IHsgX2EsIF9iLCBfYyB9ID0gdGhpcy5yZ2IoKVxyXG4gICAgY29uc3QgWyByLCBnLCBiIF0gPSBbIF9hLCBfYiwgX2MgXS5tYXAodiA9PiB2IC8gMjU1KVxyXG5cclxuICAgIC8vIEdldCB0aGUgY215ayB2YWx1ZXMgaW4gYW4gdW5ib3VuZGVkIGZvcm1hdFxyXG4gICAgY29uc3QgayA9IE1hdGgubWluKDEgLSByLCAxIC0gZywgMSAtIGIpXHJcblxyXG4gICAgaWYgKGsgPT09IDEpIHtcclxuICAgICAgLy8gQ2F0Y2ggdGhlIGJsYWNrIGNhc2VcclxuICAgICAgcmV0dXJuIG5ldyBDb2xvcigwLCAwLCAwLCAxLCAnY215aycpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYyA9ICgxIC0gciAtIGspIC8gKDEgLSBrKVxyXG4gICAgY29uc3QgbSA9ICgxIC0gZyAtIGspIC8gKDEgLSBrKVxyXG4gICAgY29uc3QgeSA9ICgxIC0gYiAtIGspIC8gKDEgLSBrKVxyXG5cclxuICAgIC8vIENvbnN0cnVjdCB0aGUgbmV3IGNvbG9yXHJcbiAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihjLCBtLCB5LCBrLCAnY215aycpXHJcbiAgICByZXR1cm4gY29sb3JcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgSW5wdXQgYW5kIE91dHB1dCBtZXRob2RzXHJcbiAgKi9cclxuXHJcbiAgX2NsYW1wZWQgKCkge1xyXG4gICAgbGV0IHsgX2EsIF9iLCBfYyB9ID0gdGhpcy5yZ2IoKVxyXG4gICAgbGV0IHsgbWF4LCBtaW4sIHJvdW5kIH0gPSBNYXRoXHJcbiAgICBsZXQgZm9ybWF0ID0gdiA9PiBtYXgoMCwgbWluKHJvdW5kKHYpLCAyNTUpKVxyXG4gICAgcmV0dXJuIFsgX2EsIF9iLCBfYyBdLm1hcChmb3JtYXQpXHJcbiAgfVxyXG5cclxuICB0b0hleCAoKSB7XHJcbiAgICBsZXQgWyByLCBnLCBiIF0gPSB0aGlzLl9jbGFtcGVkKCkubWFwKGNvbXBvbmVudEhleClcclxuICAgIHJldHVybiBgIyR7cn0ke2d9JHtifWBcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvSGV4KClcclxuICB9XHJcblxyXG4gIHRvUmdiICgpIHtcclxuICAgIGxldCBbIHJWLCBnViwgYlYgXSA9IHRoaXMuX2NsYW1wZWQoKVxyXG4gICAgbGV0IHN0cmluZyA9IGByZ2IoJHtyVn0sJHtnVn0sJHtiVn0pYFxyXG4gICAgcmV0dXJuIHN0cmluZ1xyXG4gIH1cclxuXHJcbiAgdG9BcnJheSAoKSB7XHJcbiAgICBsZXQgeyBfYSwgX2IsIF9jLCBfZCwgc3BhY2UgfSA9IHRoaXNcclxuICAgIHJldHVybiBbIF9hLCBfYiwgX2MsIF9kLCBzcGFjZSBdXHJcbiAgfVxyXG5cclxuICAvKlxyXG4gIEdlbmVyYXRpbmcgcmFuZG9tIGNvbG9yc1xyXG4gICovXHJcblxyXG4gIHN0YXRpYyByYW5kb20gKG1vZGUgPSAndmlicmFudCcsIHQsIHUpIHtcclxuXHJcbiAgICAvLyBHZXQgdGhlIG1hdGggbW9kdWxlc1xyXG4gICAgY29uc3QgeyByYW5kb20sIHJvdW5kLCBzaW4sIFBJOiBwaSB9ID0gTWF0aFxyXG5cclxuICAgIC8vIFJ1biB0aGUgY29ycmVjdCBnZW5lcmF0b3JcclxuICAgIGlmIChtb2RlID09PSAndmlicmFudCcpIHtcclxuXHJcbiAgICAgIGNvbnN0IGwgPSAoODEgLSA1NykgKiByYW5kb20oKSArIDU3XHJcbiAgICAgIGNvbnN0IGMgPSAoODMgLSA0NSkgKiByYW5kb20oKSArIDQ1XHJcbiAgICAgIGNvbnN0IGggPSAzNjAgKiByYW5kb20oKVxyXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihsLCBjLCBoLCAnbGNoJylcclxuICAgICAgcmV0dXJuIGNvbG9yXHJcblxyXG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAnc2luZScpIHtcclxuXHJcbiAgICAgIHQgPSB0ID09IG51bGwgPyByYW5kb20oKSA6IHRcclxuICAgICAgY29uc3QgciA9IHJvdW5kKDgwICogc2luKDIgKiBwaSAqIHQgLyAwLjUgKyAwLjAxKSArIDE1MClcclxuICAgICAgY29uc3QgZyA9IHJvdW5kKDUwICogc2luKDIgKiBwaSAqIHQgLyAwLjUgKyA0LjYpICsgMjAwKVxyXG4gICAgICBjb25zdCBiID0gcm91bmQoMTAwICogc2luKDIgKiBwaSAqIHQgLyAwLjUgKyAyLjMpICsgMTUwKVxyXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihyLCBnLCBiKVxyXG4gICAgICByZXR1cm4gY29sb3JcclxuXHJcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdwYXN0ZWwnKSB7XHJcblxyXG4gICAgICBjb25zdCBsID0gKDk0IC0gODYpICogcmFuZG9tKCkgKyA4NlxyXG4gICAgICBjb25zdCBjID0gKDI2IC0gOSkgKiByYW5kb20oKSArIDlcclxuICAgICAgY29uc3QgaCA9IDM2MCAqIHJhbmRvbSgpXHJcbiAgICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGwsIGMsIGgsICdsY2gnKVxyXG4gICAgICByZXR1cm4gY29sb3JcclxuXHJcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdkYXJrJykge1xyXG5cclxuICAgICAgY29uc3QgbCA9IDEwICsgMTAgKiByYW5kb20oKVxyXG4gICAgICBjb25zdCBjID0gKDEyNSAtIDc1KSAqIHJhbmRvbSgpICsgODZcclxuICAgICAgY29uc3QgaCA9IDM2MCAqIHJhbmRvbSgpXHJcbiAgICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGwsIGMsIGgsICdsY2gnKVxyXG4gICAgICByZXR1cm4gY29sb3JcclxuXHJcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdyZ2InKSB7XHJcblxyXG4gICAgICBjb25zdCByID0gMjU1ICogcmFuZG9tKClcclxuICAgICAgY29uc3QgZyA9IDI1NSAqIHJhbmRvbSgpXHJcbiAgICAgIGNvbnN0IGIgPSAyNTUgKiByYW5kb20oKVxyXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihyLCBnLCBiKVxyXG4gICAgICByZXR1cm4gY29sb3JcclxuXHJcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdsYWInKSB7XHJcblxyXG4gICAgICBjb25zdCBsID0gMTAwICogcmFuZG9tKClcclxuICAgICAgY29uc3QgYSA9IDI1NiAqIHJhbmRvbSgpIC0gMTI4XHJcbiAgICAgIGNvbnN0IGIgPSAyNTYgKiByYW5kb20oKSAtIDEyOFxyXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihsLCBhLCBiLCAnbGFiJylcclxuICAgICAgcmV0dXJuIGNvbG9yXHJcblxyXG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAnZ3JleScpIHtcclxuXHJcbiAgICAgIGNvbnN0IGdyZXkgPSAyNTUgKiByYW5kb20oKVxyXG4gICAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihncmV5LCBncmV5LCBncmV5KVxyXG4gICAgICByZXR1cm4gY29sb3JcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gIENvbnN0cnVjdGluZyBjb2xvcnNcclxuICAqL1xyXG5cclxuICAvLyBUZXN0IGlmIGdpdmVuIHZhbHVlIGlzIGEgY29sb3Igc3RyaW5nXHJcbiAgc3RhdGljIHRlc3QgKGNvbG9yKSB7XHJcbiAgICByZXR1cm4gKHR5cGVvZiBjb2xvciA9PT0gJ3N0cmluZycpXHJcbiAgICAgICYmIChpc0hleC50ZXN0KGNvbG9yKSB8fCBpc1JnYi50ZXN0KGNvbG9yKSlcclxuICB9XHJcblxyXG4gIC8vIFRlc3QgaWYgZ2l2ZW4gdmFsdWUgaXMgYW4gcmdiIG9iamVjdFxyXG4gIHN0YXRpYyBpc1JnYiAoY29sb3IpIHtcclxuICAgIHJldHVybiBjb2xvciAmJiB0eXBlb2YgY29sb3IuciA9PT0gJ251bWJlcidcclxuICAgICAgJiYgdHlwZW9mIGNvbG9yLmcgPT09ICdudW1iZXInXHJcbiAgICAgICYmIHR5cGVvZiBjb2xvci5iID09PSAnbnVtYmVyJ1xyXG4gIH1cclxuXHJcbiAgLy8gVGVzdCBpZiBnaXZlbiB2YWx1ZSBpcyBhIGNvbG9yXHJcbiAgc3RhdGljIGlzQ29sb3IgKGNvbG9yKSB7XHJcbiAgICByZXR1cm4gY29sb3IgJiYgKFxyXG4gICAgICBjb2xvciBpbnN0YW5jZW9mIENvbG9yXHJcbiAgICAgIHx8IHRoaXMuaXNSZ2IoY29sb3IpXHJcbiAgICAgIHx8IHRoaXMudGVzdChjb2xvcilcclxuICAgIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZGlzcGF0Y2gsIG9mZiwgb24gfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvZXZlbnQuanMnXG5pbXBvcnQgeyByZWdpc3RlciB9IGZyb20gJy4uL3V0aWxzL2Fkb3B0ZXIuanMnXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UuanMnXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRUYXJnZXQgZXh0ZW5kcyBCYXNlIHtcclxuICBjb25zdHJ1Y3RvciAoeyBldmVudHMgPSB7fSB9ID0ge30pIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuZXZlbnRzID0gZXZlbnRzXHJcbiAgfVxyXG5cclxuICBhZGRFdmVudExpc3RlbmVyICgpIHt9XHJcblxyXG4gIGRpc3BhdGNoIChldmVudCwgZGF0YSkge1xyXG4gICAgcmV0dXJuIGRpc3BhdGNoKHRoaXMsIGV2ZW50LCBkYXRhKVxyXG4gIH1cclxuXHJcbiAgZGlzcGF0Y2hFdmVudCAoZXZlbnQpIHtcclxuICAgIGNvbnN0IGJhZyA9IHRoaXMuZ2V0RXZlbnRIb2xkZXIoKS5ldmVudHNcclxuICAgIGlmICghYmFnKSByZXR1cm4gdHJ1ZVxyXG5cclxuICAgIGNvbnN0IGV2ZW50cyA9IGJhZ1tldmVudC50eXBlXVxyXG5cclxuICAgIGZvciAobGV0IGkgaW4gZXZlbnRzKSB7XHJcbiAgICAgIGZvciAobGV0IGogaW4gZXZlbnRzW2ldKSB7XHJcbiAgICAgICAgZXZlbnRzW2ldW2pdKGV2ZW50KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkXHJcbiAgfVxyXG5cclxuICAvLyBGaXJlIGdpdmVuIGV2ZW50XHJcbiAgZmlyZSAoZXZlbnQsIGRhdGEpIHtcclxuICAgIHRoaXMuZGlzcGF0Y2goZXZlbnQsIGRhdGEpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgZ2V0RXZlbnRIb2xkZXIgKCkge1xyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIGdldEV2ZW50VGFyZ2V0ICgpIHtcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBVbmJpbmQgZXZlbnQgZnJvbSBsaXN0ZW5lclxyXG4gIG9mZiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICBvZmYodGhpcywgZXZlbnQsIGxpc3RlbmVyKVxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIEJpbmQgZ2l2ZW4gZXZlbnQgdG8gbGlzdGVuZXJcclxuICBvbiAoZXZlbnQsIGxpc3RlbmVyLCBiaW5kaW5nLCBvcHRpb25zKSB7XHJcbiAgICBvbih0aGlzLCBldmVudCwgbGlzdGVuZXIsIGJpbmRpbmcsIG9wdGlvbnMpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAoKSB7fVxyXG59XHJcblxyXG5yZWdpc3RlcihFdmVudFRhcmdldClcclxuIiwiaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgc3ViQ2xhc3NBcnJheSB9IGZyb20gJy4vQXJyYXlQb2x5ZmlsbC5qcydcclxuXHJcbmNvbnN0IExpc3QgPSBzdWJDbGFzc0FycmF5KCdMaXN0JywgQXJyYXksIGZ1bmN0aW9uIChhcnIgPSBbXSkge1xyXG4gIC8vIFRoaXMgY2F0Y2hlcyB0aGUgY2FzZSwgdGhhdCBuYXRpdmUgbWFwIHRyaWVzIHRvIGNyZWF0ZSBhbiBhcnJheSB3aXRoIG5ldyBBcnJheSgxKVxyXG4gIGlmICh0eXBlb2YgYXJyID09PSAnbnVtYmVyJykgcmV0dXJuIHRoaXNcclxuICB0aGlzLmxlbmd0aCA9IDBcclxuICB0aGlzLnB1c2goLi4uYXJyKVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdFxyXG5cclxuZXh0ZW5kKExpc3QsIHtcclxuICBlYWNoIChmbk9yTWV0aG9kTmFtZSwgLi4uYXJncykge1xyXG4gICAgaWYgKHR5cGVvZiBmbk9yTWV0aG9kTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5tYXAoKGVsKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZuT3JNZXRob2ROYW1lLmNhbGwoZWwsIGVsKVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubWFwKGVsID0+IHtcclxuICAgICAgICByZXR1cm4gZWxbZm5Pck1ldGhvZE5hbWVdKC4uLmFyZ3MpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdG9BcnJheSAoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgdGhpcylcclxuICB9XHJcbn0pXHJcblxyXG5jb25zdCByZXNlcnZlZCA9IFsndG9BcnJheScsICdjb25zdHJ1Y3RvcicsICdlYWNoJ11cclxuXHJcbkxpc3QuZXh0ZW5kID0gZnVuY3Rpb24gKG1ldGhvZHMpIHtcclxuICBtZXRob2RzID0gbWV0aG9kcy5yZWR1Y2UoKG9iaiwgbmFtZSkgPT4ge1xyXG4gICAgLy8gRG9uJ3Qgb3ZlcndyaXRlIG93biBtZXRob2RzXHJcbiAgICBpZiAocmVzZXJ2ZWQuaW5jbHVkZXMobmFtZSkpIHJldHVybiBvYmpcclxuXHJcbiAgICAvLyBEb24ndCBhZGQgcHJpdmF0ZSBtZXRob2RzXHJcbiAgICBpZiAobmFtZVswXSA9PT0gJ18nKSByZXR1cm4gb2JqXHJcblxyXG4gICAgLy8gUmVsYXkgZXZlcnkgY2FsbCB0byBlYWNoKClcclxuICAgIG9ialtuYW1lXSA9IGZ1bmN0aW9uICguLi5hdHRycykge1xyXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKG5hbWUsIC4uLmF0dHJzKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9ialxyXG4gIH0sIHt9KVxyXG5cclxuICBleHRlbmQoTGlzdCwgbWV0aG9kcylcclxufVxyXG4iLCJpbXBvcnQgeyBkZWxpbWl0ZXIgfSBmcm9tICcuLi9tb2R1bGVzL2NvcmUvcmVnZXguanMnXHJcbmltcG9ydCB7IHJhZGlhbnMgfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcclxuaW1wb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuLi9lbGVtZW50cy9FbGVtZW50LmpzJ1xyXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9Qb2ludC5qcydcclxuXHJcbmZ1bmN0aW9uIGNsb3NlRW5vdWdoIChhLCBiLCB0aHJlc2hvbGQpIHtcclxuICByZXR1cm4gTWF0aC5hYnMoYiAtIGEpIDwgKHRocmVzaG9sZCB8fCAxZS02KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXgge1xyXG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XHJcbiAgICB0aGlzLmluaXQoLi4uYXJncylcclxuICB9XHJcblxyXG4gIC8vIEluaXRpYWxpemVcclxuICBpbml0IChzb3VyY2UpIHtcclxuICAgIHZhciBiYXNlID0gTWF0cml4LmZyb21BcnJheShbIDEsIDAsIDAsIDEsIDAsIDAgXSlcclxuXHJcbiAgICAvLyBlbnN1cmUgc291cmNlIGFzIG9iamVjdFxyXG4gICAgc291cmNlID0gc291cmNlIGluc3RhbmNlb2YgRWxlbWVudCA/IHNvdXJjZS5tYXRyaXhpZnkoKVxyXG4gICAgICA6IHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnID8gTWF0cml4LmZyb21BcnJheShzb3VyY2Uuc3BsaXQoZGVsaW1pdGVyKS5tYXAocGFyc2VGbG9hdCkpXHJcbiAgICAgIDogQXJyYXkuaXNBcnJheShzb3VyY2UpID8gTWF0cml4LmZyb21BcnJheShzb3VyY2UpXHJcbiAgICAgIDogKHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnICYmIE1hdHJpeC5pc01hdHJpeExpa2Uoc291cmNlKSkgPyBzb3VyY2VcclxuICAgICAgOiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcpID8gbmV3IE1hdHJpeCgpLnRyYW5zZm9ybShzb3VyY2UpXHJcbiAgICAgIDogYXJndW1lbnRzLmxlbmd0aCA9PT0gNiA/IE1hdHJpeC5mcm9tQXJyYXkoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKVxyXG4gICAgICA6IGJhc2VcclxuXHJcbiAgICAvLyBNZXJnZSB0aGUgc291cmNlIG1hdHJpeCB3aXRoIHRoZSBiYXNlIG1hdHJpeFxyXG4gICAgdGhpcy5hID0gc291cmNlLmEgIT0gbnVsbCA/IHNvdXJjZS5hIDogYmFzZS5hXHJcbiAgICB0aGlzLmIgPSBzb3VyY2UuYiAhPSBudWxsID8gc291cmNlLmIgOiBiYXNlLmJcclxuICAgIHRoaXMuYyA9IHNvdXJjZS5jICE9IG51bGwgPyBzb3VyY2UuYyA6IGJhc2UuY1xyXG4gICAgdGhpcy5kID0gc291cmNlLmQgIT0gbnVsbCA/IHNvdXJjZS5kIDogYmFzZS5kXHJcbiAgICB0aGlzLmUgPSBzb3VyY2UuZSAhPSBudWxsID8gc291cmNlLmUgOiBiYXNlLmVcclxuICAgIHRoaXMuZiA9IHNvdXJjZS5mICE9IG51bGwgPyBzb3VyY2UuZiA6IGJhc2UuZlxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBDbG9uZXMgdGhpcyBtYXRyaXhcclxuICBjbG9uZSAoKSB7XHJcbiAgICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgLy8gVHJhbnNmb3JtIGEgbWF0cml4IGludG8gYW5vdGhlciBtYXRyaXggYnkgbWFuaXB1bGF0aW5nIHRoZSBzcGFjZVxyXG4gIHRyYW5zZm9ybSAobykge1xyXG4gICAgLy8gQ2hlY2sgaWYgbyBpcyBhIG1hdHJpeCBhbmQgdGhlbiBsZWZ0IG11bHRpcGx5IGl0IGRpcmVjdGx5XHJcbiAgICBpZiAoTWF0cml4LmlzTWF0cml4TGlrZShvKSkge1xyXG4gICAgICB2YXIgbWF0cml4ID0gbmV3IE1hdHJpeChvKVxyXG4gICAgICByZXR1cm4gbWF0cml4Lm11bHRpcGx5Tyh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB0aGUgcHJvcG9zZWQgdHJhbnNmb3JtYXRpb25zIGFuZCB0aGUgY3VycmVudCB0cmFuc2Zvcm1hdGlvbnNcclxuICAgIHZhciB0ID0gTWF0cml4LmZvcm1hdFRyYW5zZm9ybXMobylcclxuICAgIHZhciBjdXJyZW50ID0gdGhpc1xyXG4gICAgbGV0IHsgeDogb3gsIHk6IG95IH0gPSBuZXcgUG9pbnQodC5veCwgdC5veSkudHJhbnNmb3JtKGN1cnJlbnQpXHJcblxyXG4gICAgLy8gQ29uc3RydWN0IHRoZSByZXN1bHRpbmcgbWF0cml4XHJcbiAgICB2YXIgdHJhbnNmb3JtZXIgPSBuZXcgTWF0cml4KClcclxuICAgICAgLnRyYW5zbGF0ZU8odC5yeCwgdC5yeSlcclxuICAgICAgLmxtdWx0aXBseU8oY3VycmVudClcclxuICAgICAgLnRyYW5zbGF0ZU8oLW94LCAtb3kpXHJcbiAgICAgIC5zY2FsZU8odC5zY2FsZVgsIHQuc2NhbGVZKVxyXG4gICAgICAuc2tld08odC5za2V3WCwgdC5za2V3WSlcclxuICAgICAgLnNoZWFyTyh0LnNoZWFyKVxyXG4gICAgICAucm90YXRlTyh0LnRoZXRhKVxyXG4gICAgICAudHJhbnNsYXRlTyhveCwgb3kpXHJcblxyXG4gICAgLy8gSWYgd2Ugd2FudCB0aGUgb3JpZ2luIGF0IGEgcGFydGljdWxhciBwbGFjZSwgd2UgZm9yY2UgaXQgdGhlcmVcclxuICAgIGlmIChpc0Zpbml0ZSh0LnB4KSB8fCBpc0Zpbml0ZSh0LnB5KSkge1xyXG4gICAgICBjb25zdCBvcmlnaW4gPSBuZXcgUG9pbnQob3gsIG95KS50cmFuc2Zvcm0odHJhbnNmb3JtZXIpXHJcbiAgICAgIC8vIFRPRE86IFJlcGxhY2UgdC5weCB3aXRoIGlzRmluaXRlKHQucHgpXHJcbiAgICAgIGNvbnN0IGR4ID0gdC5weCA/IHQucHggLSBvcmlnaW4ueCA6IDBcclxuICAgICAgY29uc3QgZHkgPSB0LnB5ID8gdC5weSAtIG9yaWdpbi55IDogMFxyXG4gICAgICB0cmFuc2Zvcm1lci50cmFuc2xhdGVPKGR4LCBkeSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBUcmFuc2xhdGUgbm93IGFmdGVyIHBvc2l0aW9uaW5nXHJcbiAgICB0cmFuc2Zvcm1lci50cmFuc2xhdGVPKHQudHgsIHQudHkpXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZXJcclxuICB9XHJcblxyXG4gIC8vIEFwcGxpZXMgYSBtYXRyaXggZGVmaW5lZCBieSBpdHMgYWZmaW5lIHBhcmFtZXRlcnNcclxuICBjb21wb3NlIChvKSB7XHJcbiAgICBpZiAoby5vcmlnaW4pIHtcclxuICAgICAgby5vcmlnaW5YID0gby5vcmlnaW5bMF1cclxuICAgICAgby5vcmlnaW5ZID0gby5vcmlnaW5bMV1cclxuICAgIH1cclxuICAgIC8vIEdldCB0aGUgcGFyYW1ldGVyc1xyXG4gICAgdmFyIG94ID0gby5vcmlnaW5YIHx8IDBcclxuICAgIHZhciBveSA9IG8ub3JpZ2luWSB8fCAwXHJcbiAgICB2YXIgc3ggPSBvLnNjYWxlWCB8fCAxXHJcbiAgICB2YXIgc3kgPSBvLnNjYWxlWSB8fCAxXHJcbiAgICB2YXIgbGFtID0gby5zaGVhciB8fCAwXHJcbiAgICB2YXIgdGhldGEgPSBvLnJvdGF0ZSB8fCAwXHJcbiAgICB2YXIgdHggPSBvLnRyYW5zbGF0ZVggfHwgMFxyXG4gICAgdmFyIHR5ID0gby50cmFuc2xhdGVZIHx8IDBcclxuXHJcbiAgICAvLyBBcHBseSB0aGUgc3RhbmRhcmQgbWF0cml4XHJcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE1hdHJpeCgpXHJcbiAgICAgIC50cmFuc2xhdGVPKC1veCwgLW95KVxyXG4gICAgICAuc2NhbGVPKHN4LCBzeSlcclxuICAgICAgLnNoZWFyTyhsYW0pXHJcbiAgICAgIC5yb3RhdGVPKHRoZXRhKVxyXG4gICAgICAudHJhbnNsYXRlTyh0eCwgdHkpXHJcbiAgICAgIC5sbXVsdGlwbHlPKHRoaXMpXHJcbiAgICAgIC50cmFuc2xhdGVPKG94LCBveSlcclxuICAgIHJldHVybiByZXN1bHRcclxuICB9XHJcblxyXG4gIC8vIERlY29tcG9zZXMgdGhpcyBtYXRyaXggaW50byBpdHMgYWZmaW5lIHBhcmFtZXRlcnNcclxuICBkZWNvbXBvc2UgKGN4ID0gMCwgY3kgPSAwKSB7XHJcbiAgICAvLyBHZXQgdGhlIHBhcmFtZXRlcnMgZnJvbSB0aGUgbWF0cml4XHJcbiAgICB2YXIgYSA9IHRoaXMuYVxyXG4gICAgdmFyIGIgPSB0aGlzLmJcclxuICAgIHZhciBjID0gdGhpcy5jXHJcbiAgICB2YXIgZCA9IHRoaXMuZFxyXG4gICAgdmFyIGUgPSB0aGlzLmVcclxuICAgIHZhciBmID0gdGhpcy5mXHJcblxyXG4gICAgLy8gRmlndXJlIG91dCBpZiB0aGUgd2luZGluZyBkaXJlY3Rpb24gaXMgY2xvY2t3aXNlIG9yIGNvdW50ZXJjbG9ja3dpc2VcclxuICAgIHZhciBkZXRlcm1pbmFudCA9IGEgKiBkIC0gYiAqIGNcclxuICAgIHZhciBjY3cgPSBkZXRlcm1pbmFudCA+IDAgPyAxIDogLTFcclxuXHJcbiAgICAvLyBTaW5jZSB3ZSBvbmx5IHNoZWFyIGluIHgsIHdlIGNhbiB1c2UgdGhlIHggYmFzaXMgdG8gZ2V0IHRoZSB4IHNjYWxlXHJcbiAgICAvLyBhbmQgdGhlIHJvdGF0aW9uIG9mIHRoZSByZXN1bHRpbmcgbWF0cml4XHJcbiAgICB2YXIgc3ggPSBjY3cgKiBNYXRoLnNxcnQoYSAqIGEgKyBiICogYilcclxuICAgIHZhciB0aGV0YVJhZCA9IE1hdGguYXRhbjIoY2N3ICogYiwgY2N3ICogYSlcclxuICAgIHZhciB0aGV0YSA9IDE4MCAvIE1hdGguUEkgKiB0aGV0YVJhZFxyXG4gICAgdmFyIGN0ID0gTWF0aC5jb3ModGhldGFSYWQpXHJcbiAgICB2YXIgc3QgPSBNYXRoLnNpbih0aGV0YVJhZClcclxuXHJcbiAgICAvLyBXZSBjYW4gdGhlbiBzb2x2ZSB0aGUgeSBiYXNpcyB2ZWN0b3Igc2ltdWx0YW5lb3VzbHkgdG8gZ2V0IHRoZSBvdGhlclxyXG4gICAgLy8gdHdvIGFmZmluZSBwYXJhbWV0ZXJzIGRpcmVjdGx5IGZyb20gdGhlc2UgcGFyYW1ldGVyc1xyXG4gICAgdmFyIGxhbSA9IChhICogYyArIGIgKiBkKSAvIGRldGVybWluYW50XHJcbiAgICB2YXIgc3kgPSAoKGMgKiBzeCkgLyAobGFtICogYSAtIGIpKSB8fCAoKGQgKiBzeCkgLyAobGFtICogYiArIGEpKVxyXG5cclxuICAgIC8vIFVzZSB0aGUgdHJhbnNsYXRpb25zXHJcbiAgICBsZXQgdHggPSBlIC0gY3ggKyBjeCAqIGN0ICogc3ggKyBjeSAqIChsYW0gKiBjdCAqIHN4IC0gc3QgKiBzeSlcclxuICAgIGxldCB0eSA9IGYgLSBjeSArIGN4ICogc3QgKiBzeCArIGN5ICogKGxhbSAqIHN0ICogc3ggKyBjdCAqIHN5KVxyXG5cclxuICAgIC8vIENvbnN0cnVjdCB0aGUgZGVjb21wb3NpdGlvbiBhbmQgcmV0dXJuIGl0XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAvLyBSZXR1cm4gdGhlIGFmZmluZSBwYXJhbWV0ZXJzXHJcbiAgICAgIHNjYWxlWDogc3gsXHJcbiAgICAgIHNjYWxlWTogc3ksXHJcbiAgICAgIHNoZWFyOiBsYW0sXHJcbiAgICAgIHJvdGF0ZTogdGhldGEsXHJcbiAgICAgIHRyYW5zbGF0ZVg6IHR4LFxyXG4gICAgICB0cmFuc2xhdGVZOiB0eSxcclxuICAgICAgb3JpZ2luWDogY3gsXHJcbiAgICAgIG9yaWdpblk6IGN5LFxyXG5cclxuICAgICAgLy8gUmV0dXJuIHRoZSBtYXRyaXggcGFyYW1ldGVyc1xyXG4gICAgICBhOiB0aGlzLmEsXHJcbiAgICAgIGI6IHRoaXMuYixcclxuICAgICAgYzogdGhpcy5jLFxyXG4gICAgICBkOiB0aGlzLmQsXHJcbiAgICAgIGU6IHRoaXMuZSxcclxuICAgICAgZjogdGhpcy5mXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBMZWZ0IG11bHRpcGxpZXMgYnkgdGhlIGdpdmVuIG1hdHJpeFxyXG4gIG11bHRpcGx5IChtYXRyaXgpIHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKCkubXVsdGlwbHlPKG1hdHJpeClcclxuICB9XHJcblxyXG4gIG11bHRpcGx5TyAobWF0cml4KSB7XHJcbiAgICAvLyBHZXQgdGhlIG1hdHJpY2VzXHJcbiAgICB2YXIgbCA9IHRoaXNcclxuICAgIHZhciByID0gbWF0cml4IGluc3RhbmNlb2YgTWF0cml4XHJcbiAgICAgID8gbWF0cml4XHJcbiAgICAgIDogbmV3IE1hdHJpeChtYXRyaXgpXHJcblxyXG4gICAgcmV0dXJuIE1hdHJpeC5tYXRyaXhNdWx0aXBseShsLCByLCB0aGlzKVxyXG4gIH1cclxuXHJcbiAgbG11bHRpcGx5IChtYXRyaXgpIHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKCkubG11bHRpcGx5TyhtYXRyaXgpXHJcbiAgfVxyXG5cclxuICBsbXVsdGlwbHlPIChtYXRyaXgpIHtcclxuICAgIHZhciByID0gdGhpc1xyXG4gICAgdmFyIGwgPSBtYXRyaXggaW5zdGFuY2VvZiBNYXRyaXhcclxuICAgICAgPyBtYXRyaXhcclxuICAgICAgOiBuZXcgTWF0cml4KG1hdHJpeClcclxuXHJcbiAgICByZXR1cm4gTWF0cml4Lm1hdHJpeE11bHRpcGx5KGwsIHIsIHRoaXMpXHJcbiAgfVxyXG5cclxuICAvLyBJbnZlcnNlcyBtYXRyaXhcclxuICBpbnZlcnNlTyAoKSB7XHJcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcGFyYW1ldGVycyBvdXQgb2YgdGhlIG1hdHJpeFxyXG4gICAgdmFyIGEgPSB0aGlzLmFcclxuICAgIHZhciBiID0gdGhpcy5iXHJcbiAgICB2YXIgYyA9IHRoaXMuY1xyXG4gICAgdmFyIGQgPSB0aGlzLmRcclxuICAgIHZhciBlID0gdGhpcy5lXHJcbiAgICB2YXIgZiA9IHRoaXMuZlxyXG5cclxuICAgIC8vIEludmVydCB0aGUgMngyIG1hdHJpeCBpbiB0aGUgdG9wIGxlZnRcclxuICAgIHZhciBkZXQgPSBhICogZCAtIGIgKiBjXHJcbiAgICBpZiAoIWRldCkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW52ZXJ0ICcgKyB0aGlzKVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgdG9wIDJ4MiBtYXRyaXhcclxuICAgIHZhciBuYSA9IGQgLyBkZXRcclxuICAgIHZhciBuYiA9IC1iIC8gZGV0XHJcbiAgICB2YXIgbmMgPSAtYyAvIGRldFxyXG4gICAgdmFyIG5kID0gYSAvIGRldFxyXG5cclxuICAgIC8vIEFwcGx5IHRoZSBpbnZlcnRlZCBtYXRyaXggdG8gdGhlIHRvcCByaWdodFxyXG4gICAgdmFyIG5lID0gLShuYSAqIGUgKyBuYyAqIGYpXHJcbiAgICB2YXIgbmYgPSAtKG5iICogZSArIG5kICogZilcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGludmVydGVkIG1hdHJpeFxyXG4gICAgdGhpcy5hID0gbmFcclxuICAgIHRoaXMuYiA9IG5iXHJcbiAgICB0aGlzLmMgPSBuY1xyXG4gICAgdGhpcy5kID0gbmRcclxuICAgIHRoaXMuZSA9IG5lXHJcbiAgICB0aGlzLmYgPSBuZlxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBpbnZlcnNlICgpIHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaW52ZXJzZU8oKVxyXG4gIH1cclxuXHJcbiAgLy8gVHJhbnNsYXRlIG1hdHJpeFxyXG4gIHRyYW5zbGF0ZSAoeCwgeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS50cmFuc2xhdGVPKHgsIHkpXHJcbiAgfVxyXG5cclxuICB0cmFuc2xhdGVPICh4LCB5KSB7XHJcbiAgICB0aGlzLmUgKz0geCB8fCAwXHJcbiAgICB0aGlzLmYgKz0geSB8fCAwXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLy8gU2NhbGUgbWF0cml4XHJcbiAgc2NhbGUgKHgsIHksIGN4LCBjeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zY2FsZU8oLi4uYXJndW1lbnRzKVxyXG4gIH1cclxuXHJcbiAgc2NhbGVPICh4LCB5ID0geCwgY3ggPSAwLCBjeSA9IDApIHtcclxuICAgIC8vIFN1cHBvcnQgdW5pZm9ybSBzY2FsaW5nXHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICBjeSA9IGN4XHJcbiAgICAgIGN4ID0geVxyXG4gICAgICB5ID0geFxyXG4gICAgfVxyXG5cclxuICAgIGxldCB7IGEsIGIsIGMsIGQsIGUsIGYgfSA9IHRoaXNcclxuXHJcbiAgICB0aGlzLmEgPSBhICogeFxyXG4gICAgdGhpcy5iID0gYiAqIHlcclxuICAgIHRoaXMuYyA9IGMgKiB4XHJcbiAgICB0aGlzLmQgPSBkICogeVxyXG4gICAgdGhpcy5lID0gZSAqIHggLSBjeCAqIHggKyBjeFxyXG4gICAgdGhpcy5mID0gZiAqIHkgLSBjeSAqIHkgKyBjeVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBSb3RhdGUgbWF0cml4XHJcbiAgcm90YXRlIChyLCBjeCwgY3kpIHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKCkucm90YXRlTyhyLCBjeCwgY3kpXHJcbiAgfVxyXG5cclxuICByb3RhdGVPIChyLCBjeCA9IDAsIGN5ID0gMCkge1xyXG4gICAgLy8gQ29udmVydCBkZWdyZWVzIHRvIHJhZGlhbnNcclxuICAgIHIgPSByYWRpYW5zKHIpXHJcblxyXG4gICAgbGV0IGNvcyA9IE1hdGguY29zKHIpXHJcbiAgICBsZXQgc2luID0gTWF0aC5zaW4ocilcclxuXHJcbiAgICBsZXQgeyBhLCBiLCBjLCBkLCBlLCBmIH0gPSB0aGlzXHJcblxyXG4gICAgdGhpcy5hID0gYSAqIGNvcyAtIGIgKiBzaW5cclxuICAgIHRoaXMuYiA9IGIgKiBjb3MgKyBhICogc2luXHJcbiAgICB0aGlzLmMgPSBjICogY29zIC0gZCAqIHNpblxyXG4gICAgdGhpcy5kID0gZCAqIGNvcyArIGMgKiBzaW5cclxuICAgIHRoaXMuZSA9IGUgKiBjb3MgLSBmICogc2luICsgY3kgKiBzaW4gLSBjeCAqIGNvcyArIGN4XHJcbiAgICB0aGlzLmYgPSBmICogY29zICsgZSAqIHNpbiAtIGN4ICogc2luIC0gY3kgKiBjb3MgKyBjeVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBGbGlwIG1hdHJpeCBvbiB4IG9yIHksIGF0IGEgZ2l2ZW4gb2Zmc2V0XHJcbiAgZmxpcCAoYXhpcywgYXJvdW5kKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmZsaXBPKGF4aXMsIGFyb3VuZClcclxuICB9XHJcblxyXG4gIGZsaXBPIChheGlzLCBhcm91bmQpIHtcclxuICAgIHJldHVybiBheGlzID09PSAneCcgPyB0aGlzLnNjYWxlTygtMSwgMSwgYXJvdW5kLCAwKVxyXG4gICAgICA6IGF4aXMgPT09ICd5JyA/IHRoaXMuc2NhbGVPKDEsIC0xLCAwLCBhcm91bmQpXHJcbiAgICAgIDogdGhpcy5zY2FsZU8oLTEsIC0xLCBheGlzLCBhcm91bmQgfHwgYXhpcykgLy8gRGVmaW5lIGFuIHgsIHkgZmxpcCBwb2ludFxyXG4gIH1cclxuXHJcbiAgLy8gU2hlYXIgbWF0cml4XHJcbiAgc2hlYXIgKGEsIGN4LCBjeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zaGVhck8oYSwgY3gsIGN5KVxyXG4gIH1cclxuXHJcbiAgc2hlYXJPIChseCwgY3ggPSAwLCBjeSA9IDApIHtcclxuICAgIGxldCB7IGEsIGIsIGMsIGQsIGUsIGYgfSA9IHRoaXNcclxuXHJcbiAgICB0aGlzLmEgPSBhICsgYiAqIGx4XHJcbiAgICB0aGlzLmMgPSBjICsgZCAqIGx4XHJcbiAgICB0aGlzLmUgPSBlICsgZiAqIGx4IC0gY3kgKiBseFxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBTa2V3IE1hdHJpeFxyXG4gIHNrZXcgKHgsIHksIGN4LCBjeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5za2V3TyguLi5hcmd1bWVudHMpXHJcbiAgfVxyXG5cclxuICBza2V3TyAoeCwgeSA9IHgsIGN4ID0gMCwgY3kgPSAwKSB7XHJcbiAgICAvLyBzdXBwb3J0IHVuaWZvcm1hbCBza2V3XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICBjeSA9IGN4XHJcbiAgICAgIGN4ID0geVxyXG4gICAgICB5ID0geFxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnZlcnQgZGVncmVlcyB0byByYWRpYW5zXHJcbiAgICB4ID0gcmFkaWFucyh4KVxyXG4gICAgeSA9IHJhZGlhbnMoeSlcclxuXHJcbiAgICBsZXQgbHggPSBNYXRoLnRhbih4KVxyXG4gICAgbGV0IGx5ID0gTWF0aC50YW4oeSlcclxuXHJcbiAgICBsZXQgeyBhLCBiLCBjLCBkLCBlLCBmIH0gPSB0aGlzXHJcblxyXG4gICAgdGhpcy5hID0gYSArIGIgKiBseFxyXG4gICAgdGhpcy5iID0gYiArIGEgKiBseVxyXG4gICAgdGhpcy5jID0gYyArIGQgKiBseFxyXG4gICAgdGhpcy5kID0gZCArIGMgKiBseVxyXG4gICAgdGhpcy5lID0gZSArIGYgKiBseCAtIGN5ICogbHhcclxuICAgIHRoaXMuZiA9IGYgKyBlICogbHkgLSBjeCAqIGx5XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIFNrZXdYXHJcbiAgc2tld1ggKHgsIGN4LCBjeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2tldyh4LCAwLCBjeCwgY3kpXHJcbiAgfVxyXG5cclxuICBza2V3WE8gKHgsIGN4LCBjeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2tld08oeCwgMCwgY3gsIGN5KVxyXG4gIH1cclxuXHJcbiAgLy8gU2tld1lcclxuICBza2V3WSAoeSwgY3gsIGN5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5za2V3KDAsIHksIGN4LCBjeSlcclxuICB9XHJcblxyXG4gIHNrZXdZTyAoeSwgY3gsIGN5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5za2V3TygwLCB5LCBjeCwgY3kpXHJcbiAgfVxyXG5cclxuICAvLyBUcmFuc2Zvcm0gYXJvdW5kIGEgY2VudGVyIHBvaW50XHJcbiAgYXJvdW5kTyAoY3gsIGN5LCBtYXRyaXgpIHtcclxuICAgIHZhciBkeCA9IGN4IHx8IDBcclxuICAgIHZhciBkeSA9IGN5IHx8IDBcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZU8oLWR4LCAtZHkpLmxtdWx0aXBseU8obWF0cml4KS50cmFuc2xhdGVPKGR4LCBkeSlcclxuICB9XHJcblxyXG4gIGFyb3VuZCAoY3gsIGN5LCBtYXRyaXgpIHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKCkuYXJvdW5kTyhjeCwgY3ksIG1hdHJpeClcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIHR3byBtYXRyaWNlcyBhcmUgZXF1YWxcclxuICBlcXVhbHMgKG90aGVyKSB7XHJcbiAgICB2YXIgY29tcCA9IG5ldyBNYXRyaXgob3RoZXIpXHJcbiAgICByZXR1cm4gY2xvc2VFbm91Z2godGhpcy5hLCBjb21wLmEpICYmIGNsb3NlRW5vdWdoKHRoaXMuYiwgY29tcC5iKVxyXG4gICAgICAmJiBjbG9zZUVub3VnaCh0aGlzLmMsIGNvbXAuYykgJiYgY2xvc2VFbm91Z2godGhpcy5kLCBjb21wLmQpXHJcbiAgICAgICYmIGNsb3NlRW5vdWdoKHRoaXMuZSwgY29tcC5lKSAmJiBjbG9zZUVub3VnaCh0aGlzLmYsIGNvbXAuZilcclxuICB9XHJcblxyXG4gIC8vIENvbnZlcnQgbWF0cml4IHRvIHN0cmluZ1xyXG4gIHRvU3RyaW5nICgpIHtcclxuICAgIHJldHVybiAnbWF0cml4KCcgKyB0aGlzLmEgKyAnLCcgKyB0aGlzLmIgKyAnLCcgKyB0aGlzLmMgKyAnLCcgKyB0aGlzLmQgKyAnLCcgKyB0aGlzLmUgKyAnLCcgKyB0aGlzLmYgKyAnKSdcclxuICB9XHJcblxyXG4gIHRvQXJyYXkgKCkge1xyXG4gICAgcmV0dXJuIFsgdGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5kLCB0aGlzLmUsIHRoaXMuZiBdXHJcbiAgfVxyXG5cclxuICB2YWx1ZU9mICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGE6IHRoaXMuYSxcclxuICAgICAgYjogdGhpcy5iLFxyXG4gICAgICBjOiB0aGlzLmMsXHJcbiAgICAgIGQ6IHRoaXMuZCxcclxuICAgICAgZTogdGhpcy5lLFxyXG4gICAgICBmOiB0aGlzLmZcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tQXJyYXkgKGEpIHtcclxuICAgIHJldHVybiB7IGE6IGFbMF0sIGI6IGFbMV0sIGM6IGFbMl0sIGQ6IGFbM10sIGU6IGFbNF0sIGY6IGFbNV0gfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzTWF0cml4TGlrZSAobykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgby5hICE9IG51bGxcclxuICAgICAgfHwgby5iICE9IG51bGxcclxuICAgICAgfHwgby5jICE9IG51bGxcclxuICAgICAgfHwgby5kICE9IG51bGxcclxuICAgICAgfHwgby5lICE9IG51bGxcclxuICAgICAgfHwgby5mICE9IG51bGxcclxuICAgIClcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmb3JtYXRUcmFuc2Zvcm1zIChvKSB7XHJcbiAgICAvLyBHZXQgYWxsIG9mIHRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIHRvIGZvcm0gdGhlIG1hdHJpeFxyXG4gICAgdmFyIGZsaXBCb3RoID0gby5mbGlwID09PSAnYm90aCcgfHwgby5mbGlwID09PSB0cnVlXHJcbiAgICB2YXIgZmxpcFggPSBvLmZsaXAgJiYgKGZsaXBCb3RoIHx8IG8uZmxpcCA9PT0gJ3gnKSA/IC0xIDogMVxyXG4gICAgdmFyIGZsaXBZID0gby5mbGlwICYmIChmbGlwQm90aCB8fCBvLmZsaXAgPT09ICd5JykgPyAtMSA6IDFcclxuICAgIHZhciBza2V3WCA9IG8uc2tldyAmJiBvLnNrZXcubGVuZ3RoID8gby5za2V3WzBdXHJcbiAgICAgIDogaXNGaW5pdGUoby5za2V3KSA/IG8uc2tld1xyXG4gICAgICA6IGlzRmluaXRlKG8uc2tld1gpID8gby5za2V3WFxyXG4gICAgICA6IDBcclxuICAgIHZhciBza2V3WSA9IG8uc2tldyAmJiBvLnNrZXcubGVuZ3RoID8gby5za2V3WzFdXHJcbiAgICAgIDogaXNGaW5pdGUoby5za2V3KSA/IG8uc2tld1xyXG4gICAgICA6IGlzRmluaXRlKG8uc2tld1kpID8gby5za2V3WVxyXG4gICAgICA6IDBcclxuICAgIHZhciBzY2FsZVggPSBvLnNjYWxlICYmIG8uc2NhbGUubGVuZ3RoID8gby5zY2FsZVswXSAqIGZsaXBYXHJcbiAgICAgIDogaXNGaW5pdGUoby5zY2FsZSkgPyBvLnNjYWxlICogZmxpcFhcclxuICAgICAgOiBpc0Zpbml0ZShvLnNjYWxlWCkgPyBvLnNjYWxlWCAqIGZsaXBYXHJcbiAgICAgIDogZmxpcFhcclxuICAgIHZhciBzY2FsZVkgPSBvLnNjYWxlICYmIG8uc2NhbGUubGVuZ3RoID8gby5zY2FsZVsxXSAqIGZsaXBZXHJcbiAgICAgIDogaXNGaW5pdGUoby5zY2FsZSkgPyBvLnNjYWxlICogZmxpcFlcclxuICAgICAgOiBpc0Zpbml0ZShvLnNjYWxlWSkgPyBvLnNjYWxlWSAqIGZsaXBZXHJcbiAgICAgIDogZmxpcFlcclxuICAgIHZhciBzaGVhciA9IG8uc2hlYXIgfHwgMFxyXG4gICAgdmFyIHRoZXRhID0gby5yb3RhdGUgfHwgby50aGV0YSB8fCAwXHJcbiAgICB2YXIgb3JpZ2luID0gbmV3IFBvaW50KG8ub3JpZ2luIHx8IG8uYXJvdW5kIHx8IG8ub3ggfHwgby5vcmlnaW5YLCBvLm95IHx8IG8ub3JpZ2luWSlcclxuICAgIHZhciBveCA9IG9yaWdpbi54XHJcbiAgICB2YXIgb3kgPSBvcmlnaW4ueVxyXG4gICAgdmFyIHBvc2l0aW9uID0gbmV3IFBvaW50KG8ucG9zaXRpb24gfHwgby5weCB8fCBvLnBvc2l0aW9uWCwgby5weSB8fCBvLnBvc2l0aW9uWSlcclxuICAgIHZhciBweCA9IHBvc2l0aW9uLnhcclxuICAgIHZhciBweSA9IHBvc2l0aW9uLnlcclxuICAgIHZhciB0cmFuc2xhdGUgPSBuZXcgUG9pbnQoby50cmFuc2xhdGUgfHwgby50eCB8fCBvLnRyYW5zbGF0ZVgsIG8udHkgfHwgby50cmFuc2xhdGVZKVxyXG4gICAgdmFyIHR4ID0gdHJhbnNsYXRlLnhcclxuICAgIHZhciB0eSA9IHRyYW5zbGF0ZS55XHJcbiAgICB2YXIgcmVsYXRpdmUgPSBuZXcgUG9pbnQoby5yZWxhdGl2ZSB8fCBvLnJ4IHx8IG8ucmVsYXRpdmVYLCBvLnJ5IHx8IG8ucmVsYXRpdmVZKVxyXG4gICAgdmFyIHJ4ID0gcmVsYXRpdmUueFxyXG4gICAgdmFyIHJ5ID0gcmVsYXRpdmUueVxyXG5cclxuICAgIC8vIFBvcHVsYXRlIGFsbCBvZiB0aGUgdmFsdWVzXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzY2FsZVgsIHNjYWxlWSwgc2tld1gsIHNrZXdZLCBzaGVhciwgdGhldGEsIHJ4LCByeSwgdHgsIHR5LCBveCwgb3ksIHB4LCBweVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gbGVmdCBtYXRyaXgsIHJpZ2h0IG1hdHJpeCwgdGFyZ2V0IG1hdHJpeCB3aGljaCBpcyBvdmVyd3JpdHRlblxyXG4gIHN0YXRpYyBtYXRyaXhNdWx0aXBseSAobCwgciwgbykge1xyXG4gICAgLy8gV29yayBvdXQgdGhlIHByb2R1Y3QgZGlyZWN0bHlcclxuICAgIHZhciBhID0gbC5hICogci5hICsgbC5jICogci5iXHJcbiAgICB2YXIgYiA9IGwuYiAqIHIuYSArIGwuZCAqIHIuYlxyXG4gICAgdmFyIGMgPSBsLmEgKiByLmMgKyBsLmMgKiByLmRcclxuICAgIHZhciBkID0gbC5iICogci5jICsgbC5kICogci5kXHJcbiAgICB2YXIgZSA9IGwuZSArIGwuYSAqIHIuZSArIGwuYyAqIHIuZlxyXG4gICAgdmFyIGYgPSBsLmYgKyBsLmIgKiByLmUgKyBsLmQgKiByLmZcclxuXHJcbiAgICAvLyBtYWtlIHN1cmUgdG8gdXNlIGxvY2FsIHZhcmlhYmxlcyBiZWNhdXNlIGwvciBhbmQgbyBjb3VsZCBiZSB0aGUgc2FtZVxyXG4gICAgby5hID0gYVxyXG4gICAgby5iID0gYlxyXG4gICAgby5jID0gY1xyXG4gICAgby5kID0gZFxyXG4gICAgby5lID0gZVxyXG4gICAgby5mID0gZlxyXG5cclxuICAgIHJldHVybiBvXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3RtICgpIHtcclxuICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzLm5vZGUuZ2V0Q1RNKCkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzY3JlZW5DVE0gKCkge1xyXG4gIC8qIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEzNDQ1MzdcclxuICAgICBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIEZGIGRvZXMgbm90IHJldHVybiB0aGUgdHJhbnNmb3JtYXRpb24gbWF0cml4XHJcbiAgICAgZm9yIHRoZSBpbm5lciBjb29yZGluYXRlIHN5c3RlbSB3aGVuIGdldFNjcmVlbkNUTSgpIGlzIGNhbGxlZCBvbiBuZXN0ZWQgc3Zncy5cclxuICAgICBIb3dldmVyIGFsbCBvdGhlciBCcm93c2VycyBkbyB0aGF0ICovXHJcbiAgaWYgKHR5cGVvZiB0aGlzLmlzUm9vdCA9PT0gJ2Z1bmN0aW9uJyAmJiAhdGhpcy5pc1Jvb3QoKSkge1xyXG4gICAgdmFyIHJlY3QgPSB0aGlzLnJlY3QoMSwgMSlcclxuICAgIHZhciBtID0gcmVjdC5ub2RlLmdldFNjcmVlbkNUTSgpXHJcbiAgICByZWN0LnJlbW92ZSgpXHJcbiAgICByZXR1cm4gbmV3IE1hdHJpeChtKVxyXG4gIH1cclxuICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzLm5vZGUuZ2V0U2NyZWVuQ1RNKCkpXHJcbn1cclxuXHJcbnJlZ2lzdGVyKE1hdHJpeClcclxuIiwiaW1wb3J0IHtcclxuICBkZWxpbWl0ZXIsXHJcbiAgZG90cyxcclxuICBoeXBoZW4sXHJcbiAgaXNQYXRoTGV0dGVyLFxyXG4gIG51bWJlcnNXaXRoRG90cyxcclxuICBwYXRoTGV0dGVyc1xyXG59IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcclxuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgc3ViQ2xhc3NBcnJheSB9IGZyb20gJy4vQXJyYXlQb2x5ZmlsbC5qcydcclxuaW1wb3J0IFBvaW50IGZyb20gJy4vUG9pbnQuanMnXHJcbmltcG9ydCBTVkdBcnJheSBmcm9tICcuL1NWR0FycmF5LmpzJ1xyXG5pbXBvcnQgcGFyc2VyIGZyb20gJy4uL21vZHVsZXMvY29yZS9wYXJzZXIuanMnXHJcblxyXG5jb25zdCBQYXRoQXJyYXkgPSBzdWJDbGFzc0FycmF5KCdQYXRoQXJyYXknLCBTVkdBcnJheSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhdGhBcnJheVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhSZWdSZXBsYWNlIChhLCBiLCBjLCBkKSB7XHJcbiAgcmV0dXJuIGMgKyBkLnJlcGxhY2UoZG90cywgJyAuJylcclxufVxyXG5cclxuZnVuY3Rpb24gYXJyYXlUb1N0cmluZyAoYSkge1xyXG4gIGZvciAodmFyIGkgPSAwLCBpbCA9IGEubGVuZ3RoLCBzID0gJyc7IGkgPCBpbDsgaSsrKSB7XHJcbiAgICBzICs9IGFbaV1bMF1cclxuXHJcbiAgICBpZiAoYVtpXVsxXSAhPSBudWxsKSB7XHJcbiAgICAgIHMgKz0gYVtpXVsxXVxyXG5cclxuICAgICAgaWYgKGFbaV1bMl0gIT0gbnVsbCkge1xyXG4gICAgICAgIHMgKz0gJyAnXHJcbiAgICAgICAgcyArPSBhW2ldWzJdXHJcblxyXG4gICAgICAgIGlmIChhW2ldWzNdICE9IG51bGwpIHtcclxuICAgICAgICAgIHMgKz0gJyAnXHJcbiAgICAgICAgICBzICs9IGFbaV1bM11cclxuICAgICAgICAgIHMgKz0gJyAnXHJcbiAgICAgICAgICBzICs9IGFbaV1bNF1cclxuXHJcbiAgICAgICAgICBpZiAoYVtpXVs1XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHMgKz0gJyAnXHJcbiAgICAgICAgICAgIHMgKz0gYVtpXVs1XVxyXG4gICAgICAgICAgICBzICs9ICcgJ1xyXG4gICAgICAgICAgICBzICs9IGFbaV1bNl1cclxuXHJcbiAgICAgICAgICAgIGlmIChhW2ldWzddICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICBzICs9ICcgJ1xyXG4gICAgICAgICAgICAgIHMgKz0gYVtpXVs3XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcyArICcgJ1xyXG59XHJcblxyXG5jb25zdCBwYXRoSGFuZGxlcnMgPSB7XHJcbiAgTTogZnVuY3Rpb24gKGMsIHAsIHAwKSB7XHJcbiAgICBwLnggPSBwMC54ID0gY1swXVxyXG4gICAgcC55ID0gcDAueSA9IGNbMV1cclxuXHJcbiAgICByZXR1cm4gWyAnTScsIHAueCwgcC55IF1cclxuICB9LFxyXG4gIEw6IGZ1bmN0aW9uIChjLCBwKSB7XHJcbiAgICBwLnggPSBjWzBdXHJcbiAgICBwLnkgPSBjWzFdXHJcbiAgICByZXR1cm4gWyAnTCcsIGNbMF0sIGNbMV0gXVxyXG4gIH0sXHJcbiAgSDogZnVuY3Rpb24gKGMsIHApIHtcclxuICAgIHAueCA9IGNbMF1cclxuICAgIHJldHVybiBbICdIJywgY1swXSBdXHJcbiAgfSxcclxuICBWOiBmdW5jdGlvbiAoYywgcCkge1xyXG4gICAgcC55ID0gY1swXVxyXG4gICAgcmV0dXJuIFsgJ1YnLCBjWzBdIF1cclxuICB9LFxyXG4gIEM6IGZ1bmN0aW9uIChjLCBwKSB7XHJcbiAgICBwLnggPSBjWzRdXHJcbiAgICBwLnkgPSBjWzVdXHJcbiAgICByZXR1cm4gWyAnQycsIGNbMF0sIGNbMV0sIGNbMl0sIGNbM10sIGNbNF0sIGNbNV0gXVxyXG4gIH0sXHJcbiAgUzogZnVuY3Rpb24gKGMsIHApIHtcclxuICAgIHAueCA9IGNbMl1cclxuICAgIHAueSA9IGNbM11cclxuICAgIHJldHVybiBbICdTJywgY1swXSwgY1sxXSwgY1syXSwgY1szXSBdXHJcbiAgfSxcclxuICBROiBmdW5jdGlvbiAoYywgcCkge1xyXG4gICAgcC54ID0gY1syXVxyXG4gICAgcC55ID0gY1szXVxyXG4gICAgcmV0dXJuIFsgJ1EnLCBjWzBdLCBjWzFdLCBjWzJdLCBjWzNdIF1cclxuICB9LFxyXG4gIFQ6IGZ1bmN0aW9uIChjLCBwKSB7XHJcbiAgICBwLnggPSBjWzBdXHJcbiAgICBwLnkgPSBjWzFdXHJcbiAgICByZXR1cm4gWyAnVCcsIGNbMF0sIGNbMV0gXVxyXG4gIH0sXHJcbiAgWjogZnVuY3Rpb24gKGMsIHAsIHAwKSB7XHJcbiAgICBwLnggPSBwMC54XHJcbiAgICBwLnkgPSBwMC55XHJcbiAgICByZXR1cm4gWyAnWicgXVxyXG4gIH0sXHJcbiAgQTogZnVuY3Rpb24gKGMsIHApIHtcclxuICAgIHAueCA9IGNbNV1cclxuICAgIHAueSA9IGNbNl1cclxuICAgIHJldHVybiBbICdBJywgY1swXSwgY1sxXSwgY1syXSwgY1szXSwgY1s0XSwgY1s1XSwgY1s2XSBdXHJcbiAgfVxyXG59XHJcblxyXG5sZXQgbWxodnF0Y3NheiA9ICdtbGh2cXRjc2F6Jy5zcGxpdCgnJylcclxuXHJcbmZvciAodmFyIGkgPSAwLCBpbCA9IG1saHZxdGNzYXoubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xyXG4gIHBhdGhIYW5kbGVyc1ttbGh2cXRjc2F6W2ldXSA9IChmdW5jdGlvbiAoaSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjLCBwLCBwMCkge1xyXG4gICAgICBpZiAoaSA9PT0gJ0gnKSBjWzBdID0gY1swXSArIHAueFxyXG4gICAgICBlbHNlIGlmIChpID09PSAnVicpIGNbMF0gPSBjWzBdICsgcC55XHJcbiAgICAgIGVsc2UgaWYgKGkgPT09ICdBJykge1xyXG4gICAgICAgIGNbNV0gPSBjWzVdICsgcC54XHJcbiAgICAgICAgY1s2XSA9IGNbNl0gKyBwLnlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBjLmxlbmd0aDsgaiA8IGpsOyArK2opIHtcclxuICAgICAgICAgIGNbal0gPSBjW2pdICsgKGogJSAyID8gcC55IDogcC54KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHBhdGhIYW5kbGVyc1tpXShjLCBwLCBwMClcclxuICAgIH1cclxuICB9KShtbGh2cXRjc2F6W2ldLnRvVXBwZXJDYXNlKCkpXHJcbn1cclxuXHJcbmV4dGVuZChQYXRoQXJyYXksIHtcclxuICAvLyBDb252ZXJ0IGFycmF5IHRvIHN0cmluZ1xyXG4gIHRvU3RyaW5nICgpIHtcclxuICAgIHJldHVybiBhcnJheVRvU3RyaW5nKHRoaXMpXHJcbiAgfSxcclxuXHJcbiAgLy8gTW92ZSBwYXRoIHN0cmluZ1xyXG4gIG1vdmUgKHgsIHkpIHtcclxuICAgIC8vIGdldCBib3VuZGluZyBib3ggb2YgY3VycmVudCBzaXR1YXRpb25cclxuICAgIHZhciBib3ggPSB0aGlzLmJib3goKVxyXG5cclxuICAgIC8vIGdldCByZWxhdGl2ZSBvZmZzZXRcclxuICAgIHggLT0gYm94LnhcclxuICAgIHkgLT0gYm94LnlcclxuXHJcbiAgICBpZiAoIWlzTmFOKHgpICYmICFpc05hTih5KSkge1xyXG4gICAgICAvLyBtb3ZlIGV2ZXJ5IHBvaW50XHJcbiAgICAgIGZvciAodmFyIGwsIGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgbCA9IHRoaXNbaV1bMF1cclxuXHJcbiAgICAgICAgaWYgKGwgPT09ICdNJyB8fCBsID09PSAnTCcgfHwgbCA9PT0gJ1QnKSB7XHJcbiAgICAgICAgICB0aGlzW2ldWzFdICs9IHhcclxuICAgICAgICAgIHRoaXNbaV1bMl0gKz0geVxyXG4gICAgICAgIH0gZWxzZSBpZiAobCA9PT0gJ0gnKSB7XHJcbiAgICAgICAgICB0aGlzW2ldWzFdICs9IHhcclxuICAgICAgICB9IGVsc2UgaWYgKGwgPT09ICdWJykge1xyXG4gICAgICAgICAgdGhpc1tpXVsxXSArPSB5XHJcbiAgICAgICAgfSBlbHNlIGlmIChsID09PSAnQycgfHwgbCA9PT0gJ1MnIHx8IGwgPT09ICdRJykge1xyXG4gICAgICAgICAgdGhpc1tpXVsxXSArPSB4XHJcbiAgICAgICAgICB0aGlzW2ldWzJdICs9IHlcclxuICAgICAgICAgIHRoaXNbaV1bM10gKz0geFxyXG4gICAgICAgICAgdGhpc1tpXVs0XSArPSB5XHJcblxyXG4gICAgICAgICAgaWYgKGwgPT09ICdDJykge1xyXG4gICAgICAgICAgICB0aGlzW2ldWzVdICs9IHhcclxuICAgICAgICAgICAgdGhpc1tpXVs2XSArPSB5XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChsID09PSAnQScpIHtcclxuICAgICAgICAgIHRoaXNbaV1bNl0gKz0geFxyXG4gICAgICAgICAgdGhpc1tpXVs3XSArPSB5XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9LFxyXG5cclxuICAvLyBSZXNpemUgcGF0aCBzdHJpbmdcclxuICBzaXplICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAvLyBnZXQgYm91bmRpbmcgYm94IG9mIGN1cnJlbnQgc2l0dWF0aW9uXHJcbiAgICB2YXIgYm94ID0gdGhpcy5iYm94KClcclxuICAgIHZhciBpLCBsXHJcblxyXG4gICAgLy8gcmVjYWxjdWxhdGUgcG9zaXRpb24gb2YgYWxsIHBvaW50cyBhY2NvcmRpbmcgdG8gbmV3IHNpemVcclxuICAgIGZvciAoaSA9IHRoaXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgbCA9IHRoaXNbaV1bMF1cclxuXHJcbiAgICAgIGlmIChsID09PSAnTScgfHwgbCA9PT0gJ0wnIHx8IGwgPT09ICdUJykge1xyXG4gICAgICAgIHRoaXNbaV1bMV0gPSAoKHRoaXNbaV1bMV0gLSBib3gueCkgKiB3aWR0aCkgLyBib3gud2lkdGggKyBib3gueFxyXG4gICAgICAgIHRoaXNbaV1bMl0gPSAoKHRoaXNbaV1bMl0gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XHJcbiAgICAgIH0gZWxzZSBpZiAobCA9PT0gJ0gnKSB7XHJcbiAgICAgICAgdGhpc1tpXVsxXSA9ICgodGhpc1tpXVsxXSAtIGJveC54KSAqIHdpZHRoKSAvIGJveC53aWR0aCArIGJveC54XHJcbiAgICAgIH0gZWxzZSBpZiAobCA9PT0gJ1YnKSB7XHJcbiAgICAgICAgdGhpc1tpXVsxXSA9ICgodGhpc1tpXVsxXSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcclxuICAgICAgfSBlbHNlIGlmIChsID09PSAnQycgfHwgbCA9PT0gJ1MnIHx8IGwgPT09ICdRJykge1xyXG4gICAgICAgIHRoaXNbaV1bMV0gPSAoKHRoaXNbaV1bMV0gLSBib3gueCkgKiB3aWR0aCkgLyBib3gud2lkdGggKyBib3gueFxyXG4gICAgICAgIHRoaXNbaV1bMl0gPSAoKHRoaXNbaV1bMl0gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XHJcbiAgICAgICAgdGhpc1tpXVszXSA9ICgodGhpc1tpXVszXSAtIGJveC54KSAqIHdpZHRoKSAvIGJveC53aWR0aCArIGJveC54XHJcbiAgICAgICAgdGhpc1tpXVs0XSA9ICgodGhpc1tpXVs0XSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcclxuXHJcbiAgICAgICAgaWYgKGwgPT09ICdDJykge1xyXG4gICAgICAgICAgdGhpc1tpXVs1XSA9ICgodGhpc1tpXVs1XSAtIGJveC54KSAqIHdpZHRoKSAvIGJveC53aWR0aCArIGJveC54XHJcbiAgICAgICAgICB0aGlzW2ldWzZdID0gKCh0aGlzW2ldWzZdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChsID09PSAnQScpIHtcclxuICAgICAgICAvLyByZXNpemUgcmFkaWlcclxuICAgICAgICB0aGlzW2ldWzFdID0gKHRoaXNbaV1bMV0gKiB3aWR0aCkgLyBib3gud2lkdGhcclxuICAgICAgICB0aGlzW2ldWzJdID0gKHRoaXNbaV1bMl0gKiBoZWlnaHQpIC8gYm94LmhlaWdodFxyXG5cclxuICAgICAgICAvLyBtb3ZlIHBvc2l0aW9uIHZhbHVlc1xyXG4gICAgICAgIHRoaXNbaV1bNl0gPSAoKHRoaXNbaV1bNl0gLSBib3gueCkgKiB3aWR0aCkgLyBib3gud2lkdGggKyBib3gueFxyXG4gICAgICAgIHRoaXNbaV1bN10gPSAoKHRoaXNbaV1bN10gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH0sXHJcblxyXG4gIC8vIFRlc3QgaWYgdGhlIHBhc3NlZCBwYXRoIGFycmF5IHVzZSB0aGUgc2FtZSBwYXRoIGRhdGEgY29tbWFuZHMgYXMgdGhpcyBwYXRoIGFycmF5XHJcbiAgZXF1YWxDb21tYW5kcyAocGF0aEFycmF5KSB7XHJcbiAgICB2YXIgaSwgaWwsIGVxdWFsQ29tbWFuZHNcclxuXHJcbiAgICBwYXRoQXJyYXkgPSBuZXcgUGF0aEFycmF5KHBhdGhBcnJheSlcclxuXHJcbiAgICBlcXVhbENvbW1hbmRzID0gdGhpcy5sZW5ndGggPT09IHBhdGhBcnJheS5sZW5ndGhcclxuICAgIGZvciAoaSA9IDAsIGlsID0gdGhpcy5sZW5ndGg7IGVxdWFsQ29tbWFuZHMgJiYgaSA8IGlsOyBpKyspIHtcclxuICAgICAgZXF1YWxDb21tYW5kcyA9IHRoaXNbaV1bMF0gPT09IHBhdGhBcnJheVtpXVswXVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlcXVhbENvbW1hbmRzXHJcbiAgfSxcclxuXHJcbiAgLy8gTWFrZSBwYXRoIGFycmF5IG1vcnBoYWJsZVxyXG4gIG1vcnBoIChwYXRoQXJyYXkpIHtcclxuICAgIHBhdGhBcnJheSA9IG5ldyBQYXRoQXJyYXkocGF0aEFycmF5KVxyXG5cclxuICAgIGlmICh0aGlzLmVxdWFsQ29tbWFuZHMocGF0aEFycmF5KSkge1xyXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gcGF0aEFycmF5XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfSxcclxuXHJcbiAgLy8gR2V0IG1vcnBoZWQgcGF0aCBhcnJheSBhdCBnaXZlbiBwb3NpdGlvblxyXG4gIGF0IChwb3MpIHtcclxuICAgIC8vIG1ha2Ugc3VyZSBhIGRlc3RpbmF0aW9uIGlzIGRlZmluZWRcclxuICAgIGlmICghdGhpcy5kZXN0aW5hdGlvbikgcmV0dXJuIHRoaXNcclxuXHJcbiAgICB2YXIgc291cmNlQXJyYXkgPSB0aGlzXHJcbiAgICB2YXIgZGVzdGluYXRpb25BcnJheSA9IHRoaXMuZGVzdGluYXRpb24udmFsdWVcclxuICAgIHZhciBhcnJheSA9IFtdXHJcbiAgICB2YXIgcGF0aEFycmF5ID0gbmV3IFBhdGhBcnJheSgpXHJcbiAgICB2YXIgaSwgaWwsIGosIGpsXHJcblxyXG4gICAgLy8gQW5pbWF0ZSBoYXMgc3BlY2lmaWVkIGluIHRoZSBTVkcgc3BlY1xyXG4gICAgLy8gU2VlOiBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHMTEvcGF0aHMuaHRtbCNQYXRoRWxlbWVudFxyXG4gICAgZm9yIChpID0gMCwgaWwgPSBzb3VyY2VBcnJheS5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XHJcbiAgICAgIGFycmF5W2ldID0gWyBzb3VyY2VBcnJheVtpXVswXSBdXHJcbiAgICAgIGZvciAoaiA9IDEsIGpsID0gc291cmNlQXJyYXlbaV0ubGVuZ3RoOyBqIDwgamw7IGorKykge1xyXG4gICAgICAgIGFycmF5W2ldW2pdID0gc291cmNlQXJyYXlbaV1bal0gKyAoZGVzdGluYXRpb25BcnJheVtpXVtqXSAtIHNvdXJjZUFycmF5W2ldW2pdKSAqIHBvc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEZvciB0aGUgdHdvIGZsYWdzIG9mIHRoZSBlbGxpcHRpY2FsIGFyYyBjb21tYW5kLCB0aGUgU1ZHIHNwZWMgc2F5OlxyXG4gICAgICAvLyBGbGFncyBhbmQgYm9vbGVhbnMgYXJlIGludGVycG9sYXRlZCBhcyBmcmFjdGlvbnMgYmV0d2VlbiB6ZXJvIGFuZCBvbmUsIHdpdGggYW55IG5vbi16ZXJvIHZhbHVlIGNvbnNpZGVyZWQgdG8gYmUgYSB2YWx1ZSBvZiBvbmUvdHJ1ZVxyXG4gICAgICAvLyBFbGxpcHRpY2FsIGFyYyBjb21tYW5kIGFzIGFuIGFycmF5IGZvbGxvd2VkIGJ5IGNvcnJlc3BvbmRpbmcgaW5kZXhlczpcclxuICAgICAgLy8gWydBJywgcngsIHJ5LCB4LWF4aXMtcm90YXRpb24sIGxhcmdlLWFyYy1mbGFnLCBzd2VlcC1mbGFnLCB4LCB5XVxyXG4gICAgICAvLyAgIDAgICAgMSAgIDIgICAgICAgIDMgICAgICAgICAgICAgICAgIDQgICAgICAgICAgICAgNSAgICAgIDYgIDdcclxuICAgICAgaWYgKGFycmF5W2ldWzBdID09PSAnQScpIHtcclxuICAgICAgICBhcnJheVtpXVs0XSA9ICsoYXJyYXlbaV1bNF0gIT09IDApXHJcbiAgICAgICAgYXJyYXlbaV1bNV0gPSArKGFycmF5W2ldWzVdICE9PSAwKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlyZWN0bHkgbW9kaWZ5IHRoZSB2YWx1ZSBvZiBhIHBhdGggYXJyYXksIHRoaXMgaXMgZG9uZSB0aGlzIHdheSBmb3IgcGVyZm9ybWFuY2VcclxuICAgIHBhdGhBcnJheS52YWx1ZSA9IGFycmF5XHJcbiAgICByZXR1cm4gcGF0aEFycmF5XHJcbiAgfSxcclxuXHJcbiAgLy8gQWJzb2x1dGl6ZSBhbmQgcGFyc2UgcGF0aCB0byBhcnJheVxyXG4gIHBhcnNlIChhcnJheSA9IFsgWyAnTScsIDAsIDAgXSBdKSB7XHJcbiAgICAvLyBpZiBpdCdzIGFscmVhZHkgYSBwYXRoYXJyYXksIG5vIG5lZWQgdG8gcGFyc2UgaXRcclxuICAgIGlmIChhcnJheSBpbnN0YW5jZW9mIFBhdGhBcnJheSkgcmV0dXJuIGFycmF5XHJcblxyXG4gICAgLy8gcHJlcGFyZSBmb3IgcGFyc2luZ1xyXG4gICAgdmFyIHNcclxuICAgIHZhciBwYXJhbUNudCA9IHsgJ00nOiAyLCAnTCc6IDIsICdIJzogMSwgJ1YnOiAxLCAnQyc6IDYsICdTJzogNCwgJ1EnOiA0LCAnVCc6IDIsICdBJzogNywgJ1onOiAwIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGFycmF5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICBhcnJheSA9IGFycmF5XHJcbiAgICAgICAgLnJlcGxhY2UobnVtYmVyc1dpdGhEb3RzLCBwYXRoUmVnUmVwbGFjZSkgLy8gY29udmVydCA0NS4xMjMuMTIzIHRvIDQ1LjEyMyAuMTIzXHJcbiAgICAgICAgLnJlcGxhY2UocGF0aExldHRlcnMsICcgJCYgJykgLy8gcHV0IHNvbWUgcm9vbSBiZXR3ZWVuIGxldHRlcnMgYW5kIG51bWJlcnNcclxuICAgICAgICAucmVwbGFjZShoeXBoZW4sICckMSAtJykgLy8gYWRkIHNwYWNlIGJlZm9yZSBoeXBoZW5cclxuICAgICAgICAudHJpbSgpIC8vIHRyaW1cclxuICAgICAgICAuc3BsaXQoZGVsaW1pdGVyKSAvLyBzcGxpdCBpbnRvIGFycmF5XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcnJheSA9IGFycmF5LnJlZHVjZShmdW5jdGlvbiAocHJldiwgY3Vycikge1xyXG4gICAgICAgIHJldHVybiBbXS5jb25jYXQuY2FsbChwcmV2LCBjdXJyKVxyXG4gICAgICB9LCBbXSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcnJheSBub3cgaXMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgcGFydHMgb2YgYSBwYXRoIGUuZy4gWydNJywgJzAnLCAnMCcsICdMJywgJzMwJywgJzMwJyAuLi5dXHJcbiAgICB2YXIgcmVzdWx0ID0gW11cclxuICAgIHZhciBwID0gbmV3IFBvaW50KClcclxuICAgIHZhciBwMCA9IG5ldyBQb2ludCgpXHJcbiAgICB2YXIgaW5kZXggPSAwXHJcbiAgICB2YXIgbGVuID0gYXJyYXkubGVuZ3RoXHJcblxyXG4gICAgZG8ge1xyXG4gICAgICAvLyBUZXN0IGlmIHdlIGhhdmUgYSBwYXRoIGxldHRlclxyXG4gICAgICBpZiAoaXNQYXRoTGV0dGVyLnRlc3QoYXJyYXlbaW5kZXhdKSkge1xyXG4gICAgICAgIHMgPSBhcnJheVtpbmRleF1cclxuICAgICAgICArK2luZGV4XHJcbiAgICAgICAgLy8gSWYgbGFzdCBsZXR0ZXIgd2FzIGEgbW92ZSBjb21tYW5kIGFuZCB3ZSBnb3Qgbm8gbmV3LCBpdCBkZWZhdWx0cyB0byBbTF1pbmVcclxuICAgICAgfSBlbHNlIGlmIChzID09PSAnTScpIHtcclxuICAgICAgICBzID0gJ0wnXHJcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gJ20nKSB7XHJcbiAgICAgICAgcyA9ICdsJ1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXN1bHQucHVzaChwYXRoSGFuZGxlcnNbc10uY2FsbChudWxsLFxyXG4gICAgICAgIGFycmF5LnNsaWNlKGluZGV4LCAoaW5kZXggPSBpbmRleCArIHBhcmFtQ250W3MudG9VcHBlckNhc2UoKV0pKS5tYXAocGFyc2VGbG9hdCksXHJcbiAgICAgICAgcCwgcDBcclxuICAgICAgKVxyXG4gICAgICApXHJcbiAgICB9IHdoaWxlIChsZW4gPiBpbmRleClcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgfSxcclxuXHJcbiAgLy8gR2V0IGJvdW5kaW5nIGJveCBvZiBwYXRoXHJcbiAgYmJveCAoKSB7XHJcbiAgICBwYXJzZXIoKS5wYXRoLnNldEF0dHJpYnV0ZSgnZCcsIHRoaXMudG9TdHJpbmcoKSlcclxuICAgIHJldHVybiBwYXJzZXIubm9kZXMucGF0aC5nZXRCQm94KClcclxuICB9XHJcbn0pXHJcbiIsImltcG9ydCBNYXRyaXggZnJvbSAnLi9NYXRyaXguanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludCB7XHJcbiAgLy8gSW5pdGlhbGl6ZVxyXG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XHJcbiAgICB0aGlzLmluaXQoLi4uYXJncylcclxuICB9XHJcblxyXG4gIGluaXQgKHgsIHkpIHtcclxuICAgIGxldCBzb3VyY2VcclxuICAgIGxldCBiYXNlID0geyB4OiAwLCB5OiAwIH1cclxuXHJcbiAgICAvLyBlbnN1cmUgc291cmNlIGFzIG9iamVjdFxyXG4gICAgc291cmNlID0gQXJyYXkuaXNBcnJheSh4KSA/IHsgeDogeFswXSwgeTogeFsxXSB9XHJcbiAgICAgIDogdHlwZW9mIHggPT09ICdvYmplY3QnID8geyB4OiB4LngsIHk6IHgueSB9XHJcbiAgICAgIDogeyB4OiB4LCB5OiB5IH1cclxuXHJcbiAgICAvLyBtZXJnZSBzb3VyY2VcclxuICAgIHRoaXMueCA9IHNvdXJjZS54ID09IG51bGwgPyBiYXNlLnggOiBzb3VyY2UueFxyXG4gICAgdGhpcy55ID0gc291cmNlLnkgPT0gbnVsbCA/IGJhc2UueSA6IHNvdXJjZS55XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIENsb25lIHBvaW50XHJcbiAgY2xvbmUgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtIChtKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnRyYW5zZm9ybU8obSlcclxuICB9XHJcblxyXG4gIC8vIFRyYW5zZm9ybSBwb2ludCB3aXRoIG1hdHJpeFxyXG4gIHRyYW5zZm9ybU8gKG0pIHtcclxuICAgIGlmICghTWF0cml4LmlzTWF0cml4TGlrZShtKSkge1xyXG4gICAgICBtID0gbmV3IE1hdHJpeChtKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB7IHgsIHkgfSA9IHRoaXNcclxuXHJcbiAgICAvLyBQZXJmb3JtIHRoZSBtYXRyaXggbXVsdGlwbGljYXRpb25cclxuICAgIHRoaXMueCA9IG0uYSAqIHggKyBtLmMgKiB5ICsgbS5lXHJcbiAgICB0aGlzLnkgPSBtLmIgKiB4ICsgbS5kICogeSArIG0uZlxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICB0b0FycmF5ICgpIHtcclxuICAgIHJldHVybiBbIHRoaXMueCwgdGhpcy55IF1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb2ludCAoeCwgeSkge1xyXG4gIHJldHVybiBuZXcgUG9pbnQoeCwgeSkudHJhbnNmb3JtKHRoaXMuc2NyZWVuQ1RNKCkuaW52ZXJzZSgpKVxyXG59XHJcbiIsImltcG9ydCB7IGRlbGltaXRlciB9IGZyb20gJy4uL21vZHVsZXMvY29yZS9yZWdleC5qcydcclxuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvYWRvcHRlci5qcydcclxuaW1wb3J0IHsgc3ViQ2xhc3NBcnJheSB9IGZyb20gJy4vQXJyYXlQb2x5ZmlsbC5qcydcclxuaW1wb3J0IFNWR0FycmF5IGZyb20gJy4vU1ZHQXJyYXkuanMnXHJcblxyXG5jb25zdCBQb2ludEFycmF5ID0gc3ViQ2xhc3NBcnJheSgnUG9pbnRBcnJheScsIFNWR0FycmF5KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9pbnRBcnJheVxyXG5cclxuZXh0ZW5kKFBvaW50QXJyYXksIHtcclxuICAvLyBDb252ZXJ0IGFycmF5IHRvIHN0cmluZ1xyXG4gIHRvU3RyaW5nICgpIHtcclxuICAgIC8vIGNvbnZlcnQgdG8gYSBwb2x5IHBvaW50IHN0cmluZ1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdGhpcy5sZW5ndGgsIGFycmF5ID0gW107IGkgPCBpbDsgaSsrKSB7XHJcbiAgICAgIGFycmF5LnB1c2godGhpc1tpXS5qb2luKCcsJykpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycmF5LmpvaW4oJyAnKVxyXG4gIH0sXHJcblxyXG4gIC8vIENvbnZlcnQgYXJyYXkgdG8gbGluZSBvYmplY3RcclxuICB0b0xpbmUgKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDE6IHRoaXNbMF1bMF0sXHJcbiAgICAgIHkxOiB0aGlzWzBdWzFdLFxyXG4gICAgICB4MjogdGhpc1sxXVswXSxcclxuICAgICAgeTI6IHRoaXNbMV1bMV1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBHZXQgbW9ycGhlZCBhcnJheSBhdCBnaXZlbiBwb3NpdGlvblxyXG4gIGF0IChwb3MpIHtcclxuICAgIC8vIG1ha2Ugc3VyZSBhIGRlc3RpbmF0aW9uIGlzIGRlZmluZWRcclxuICAgIGlmICghdGhpcy5kZXN0aW5hdGlvbikgcmV0dXJuIHRoaXNcclxuXHJcbiAgICAvLyBnZW5lcmF0ZSBtb3JwaGVkIHBvaW50IHN0cmluZ1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdGhpcy5sZW5ndGgsIGFycmF5ID0gW107IGkgPCBpbDsgaSsrKSB7XHJcbiAgICAgIGFycmF5LnB1c2goW1xyXG4gICAgICAgIHRoaXNbaV1bMF0gKyAodGhpcy5kZXN0aW5hdGlvbltpXVswXSAtIHRoaXNbaV1bMF0pICogcG9zLFxyXG4gICAgICAgIHRoaXNbaV1bMV0gKyAodGhpcy5kZXN0aW5hdGlvbltpXVsxXSAtIHRoaXNbaV1bMV0pICogcG9zXHJcbiAgICAgIF0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQb2ludEFycmF5KGFycmF5KVxyXG4gIH0sXHJcblxyXG4gIC8vIFBhcnNlIHBvaW50IHN0cmluZyBhbmQgZmxhdCBhcnJheVxyXG4gIHBhcnNlIChhcnJheSA9IFsgWyAwLCAwIF0gXSkge1xyXG4gICAgdmFyIHBvaW50cyA9IFtdXHJcblxyXG4gICAgLy8gaWYgaXQgaXMgYW4gYXJyYXlcclxuICAgIGlmIChhcnJheSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIC8vIGFuZCBpdCBpcyBub3QgZmxhdCwgdGhlcmUgaXMgbm8gbmVlZCB0byBwYXJzZSBpdFxyXG4gICAgICBpZiAoYXJyYXlbMF0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgeyAvLyBFbHNlLCBpdCBpcyBjb25zaWRlcmVkIGFzIGEgc3RyaW5nXHJcbiAgICAgIC8vIHBhcnNlIHBvaW50c1xyXG4gICAgICBhcnJheSA9IGFycmF5LnRyaW0oKS5zcGxpdChkZWxpbWl0ZXIpLm1hcChwYXJzZUZsb2F0KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHZhbGlkYXRlIHBvaW50cyAtIGh0dHBzOi8vc3Znd2cub3JnL3N2ZzItZHJhZnQvc2hhcGVzLmh0bWwjRGF0YVR5cGVQb2ludHNcclxuICAgIC8vIE9kZCBudW1iZXIgb2YgY29vcmRpbmF0ZXMgaXMgYW4gZXJyb3IuIEluIHN1Y2ggY2FzZXMsIGRyb3AgdGhlIGxhc3Qgb2RkIGNvb3JkaW5hdGUuXHJcbiAgICBpZiAoYXJyYXkubGVuZ3RoICUgMiAhPT0gMCkgYXJyYXkucG9wKClcclxuXHJcbiAgICAvLyB3cmFwIHBvaW50cyBpbiB0d28tdHVwbGVzXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpID0gaSArIDIpIHtcclxuICAgICAgcG9pbnRzLnB1c2goWyBhcnJheVtpXSwgYXJyYXlbaSArIDFdIF0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBvaW50c1xyXG4gIH0sXHJcblxyXG4gIC8vIHRyYW5zZm9ybSBwb2ludHMgd2l0aCBtYXRyaXggKHNpbWlsYXIgdG8gUG9pbnQudHJhbnNmb3JtKVxyXG4gIHRyYW5zZm9ybSAobSkge1xyXG4gICAgY29uc3QgcG9pbnRzID0gW11cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgcG9pbnQgPSB0aGlzW2ldXHJcbiAgICAgIC8vIFBlcmZvcm0gdGhlIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxyXG4gICAgICBwb2ludHMucHVzaChbXHJcbiAgICAgICAgbS5hICogcG9pbnRbMF0gKyBtLmMgKiBwb2ludFsxXSArIG0uZSxcclxuICAgICAgICBtLmIgKiBwb2ludFswXSArIG0uZCAqIHBvaW50WzFdICsgbS5mXHJcbiAgICAgIF0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIHRoZSByZXF1aXJlZCBwb2ludFxyXG4gICAgcmV0dXJuIG5ldyBQb2ludEFycmF5KHBvaW50cylcclxuICB9LFxyXG5cclxuICAvLyBNb3ZlIHBvaW50IHN0cmluZ1xyXG4gIG1vdmUgKHgsIHkpIHtcclxuICAgIHZhciBib3ggPSB0aGlzLmJib3goKVxyXG5cclxuICAgIC8vIGdldCByZWxhdGl2ZSBvZmZzZXRcclxuICAgIHggLT0gYm94LnhcclxuICAgIHkgLT0gYm94LnlcclxuXHJcbiAgICAvLyBtb3ZlIGV2ZXJ5IHBvaW50XHJcbiAgICBpZiAoIWlzTmFOKHgpICYmICFpc05hTih5KSkge1xyXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHRoaXNbaV0gPSBbIHRoaXNbaV1bMF0gKyB4LCB0aGlzW2ldWzFdICsgeSBdXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH0sXHJcblxyXG4gIC8vIFJlc2l6ZSBwb2x5IHN0cmluZ1xyXG4gIHNpemUgKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBpXHJcbiAgICB2YXIgYm94ID0gdGhpcy5iYm94KClcclxuXHJcbiAgICAvLyByZWNhbGN1bGF0ZSBwb3NpdGlvbiBvZiBhbGwgcG9pbnRzIGFjY29yZGluZyB0byBuZXcgc2l6ZVxyXG4gICAgZm9yIChpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBpZiAoYm94LndpZHRoKSB0aGlzW2ldWzBdID0gKCh0aGlzW2ldWzBdIC0gYm94LngpICogd2lkdGgpIC8gYm94LndpZHRoICsgYm94LnhcclxuICAgICAgaWYgKGJveC5oZWlnaHQpIHRoaXNbaV1bMV0gPSAoKHRoaXNbaV1bMV0gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9LFxyXG5cclxuICAvLyBHZXQgYm91bmRpbmcgYm94IG9mIHBvaW50c1xyXG4gIGJib3ggKCkge1xyXG4gICAgdmFyIG1heFggPSAtSW5maW5pdHlcclxuICAgIHZhciBtYXhZID0gLUluZmluaXR5XHJcbiAgICB2YXIgbWluWCA9IEluZmluaXR5XHJcbiAgICB2YXIgbWluWSA9IEluZmluaXR5XHJcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIG1heFggPSBNYXRoLm1heChlbFswXSwgbWF4WClcclxuICAgICAgbWF4WSA9IE1hdGgubWF4KGVsWzFdLCBtYXhZKVxyXG4gICAgICBtaW5YID0gTWF0aC5taW4oZWxbMF0sIG1pblgpXHJcbiAgICAgIG1pblkgPSBNYXRoLm1pbihlbFsxXSwgbWluWSlcclxuICAgIH0pXHJcbiAgICByZXR1cm4geyB4OiBtaW5YLCB5OiBtaW5ZLCB3aWR0aDogbWF4WCAtIG1pblgsIGhlaWdodDogbWF4WSAtIG1pblkgfVxyXG4gIH1cclxufSlcclxuIiwiaW1wb3J0IHsgZGVsaW1pdGVyIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xyXG5pbXBvcnQgeyBleHRlbmQgfSBmcm9tICcuLi91dGlscy9hZG9wdGVyLmpzJ1xyXG5pbXBvcnQgeyBzdWJDbGFzc0FycmF5IH0gZnJvbSAnLi9BcnJheVBvbHlmaWxsLmpzJ1xyXG5cclxuY29uc3QgU1ZHQXJyYXkgPSBzdWJDbGFzc0FycmF5KCdTVkdBcnJheScsIEFycmF5LCBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgdGhpcy5pbml0KGFycilcclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNWR0FycmF5XHJcblxyXG5leHRlbmQoU1ZHQXJyYXksIHtcclxuICBpbml0IChhcnIpIHtcclxuICAgIC8vIFRoaXMgY2F0Y2hlcyB0aGUgY2FzZSwgdGhhdCBuYXRpdmUgbWFwIHRyaWVzIHRvIGNyZWF0ZSBhbiBhcnJheSB3aXRoIG5ldyBBcnJheSgxKVxyXG4gICAgaWYgKHR5cGVvZiBhcnIgPT09ICdudW1iZXInKSByZXR1cm4gdGhpc1xyXG4gICAgdGhpcy5sZW5ndGggPSAwXHJcbiAgICB0aGlzLnB1c2goLi4udGhpcy5wYXJzZShhcnIpKVxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9LFxyXG5cclxuICB0b0FycmF5ICgpIHtcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCB0aGlzKVxyXG4gIH0sXHJcblxyXG4gIHRvU3RyaW5nICgpIHtcclxuICAgIHJldHVybiB0aGlzLmpvaW4oJyAnKVxyXG4gIH0sXHJcblxyXG4gIC8vIEZsYXR0ZW5zIHRoZSBhcnJheSBpZiBuZWVkZWRcclxuICB2YWx1ZU9mICgpIHtcclxuICAgIGNvbnN0IHJldCA9IFtdXHJcbiAgICByZXQucHVzaCguLi50aGlzKVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH0sXHJcblxyXG4gIC8vIFBhcnNlIHdoaXRlc3BhY2Ugc2VwYXJhdGVkIHN0cmluZ1xyXG4gIHBhcnNlIChhcnJheSA9IFtdKSB7XHJcbiAgICAvLyBJZiBhbHJlYWR5IGlzIGFuIGFycmF5LCBubyBuZWVkIHRvIHBhcnNlIGl0XHJcbiAgICBpZiAoYXJyYXkgaW5zdGFuY2VvZiBBcnJheSkgcmV0dXJuIGFycmF5XHJcblxyXG4gICAgcmV0dXJuIGFycmF5LnRyaW0oKS5zcGxpdChkZWxpbWl0ZXIpLm1hcChwYXJzZUZsb2F0KVxyXG4gIH0sXHJcblxyXG4gIGNsb25lICgpIHtcclxuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKVxyXG4gIH0sXHJcblxyXG4gIHRvU2V0ICgpIHtcclxuICAgIHJldHVybiBuZXcgU2V0KHRoaXMpXHJcbiAgfVxyXG59KVxyXG4iLCJpbXBvcnQgeyBudW1iZXJBbmRVbml0IH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL3JlZ2V4LmpzJ1xyXG5cclxuLy8gTW9kdWxlIGZvciB1bml0IGNvbnZlcnRpb25zXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNWR051bWJlciB7XHJcbiAgLy8gSW5pdGlhbGl6ZVxyXG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XHJcbiAgICB0aGlzLmluaXQoLi4uYXJncylcclxuICB9XHJcblxyXG4gIGluaXQgKHZhbHVlLCB1bml0KSB7XHJcbiAgICB1bml0ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZVsxXSA6IHVuaXRcclxuICAgIHZhbHVlID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZVswXSA6IHZhbHVlXHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSBkZWZhdWx0c1xyXG4gICAgdGhpcy52YWx1ZSA9IDBcclxuICAgIHRoaXMudW5pdCA9IHVuaXQgfHwgJydcclxuXHJcbiAgICAvLyBwYXJzZSB2YWx1ZVxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgLy8gZW5zdXJlIGEgdmFsaWQgbnVtZXJpYyB2YWx1ZVxyXG4gICAgICB0aGlzLnZhbHVlID0gaXNOYU4odmFsdWUpID8gMCA6ICFpc0Zpbml0ZSh2YWx1ZSkgPyAodmFsdWUgPCAwID8gLTMuNGUrMzggOiArMy40ZSszOCkgOiB2YWx1ZVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHVuaXQgPSB2YWx1ZS5tYXRjaChudW1iZXJBbmRVbml0KVxyXG5cclxuICAgICAgaWYgKHVuaXQpIHtcclxuICAgICAgICAvLyBtYWtlIHZhbHVlIG51bWVyaWNcclxuICAgICAgICB0aGlzLnZhbHVlID0gcGFyc2VGbG9hdCh1bml0WzFdKVxyXG5cclxuICAgICAgICAvLyBub3JtYWxpemVcclxuICAgICAgICBpZiAodW5pdFs1XSA9PT0gJyUnKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlIC89IDEwMFxyXG4gICAgICAgIH0gZWxzZSBpZiAodW5pdFs1XSA9PT0gJ3MnKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlICo9IDEwMDBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHN0b3JlIHVuaXRcclxuICAgICAgICB0aGlzLnVuaXQgPSB1bml0WzVdXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNWR051bWJlcikge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZS52YWx1ZU9mKClcclxuICAgICAgICB0aGlzLnVuaXQgPSB2YWx1ZS51bml0XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcgKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLnVuaXQgPT09ICclJyA/IH5+KHRoaXMudmFsdWUgKiAxZTgpIC8gMWU2XHJcbiAgICAgIDogdGhpcy51bml0ID09PSAncycgPyB0aGlzLnZhbHVlIC8gMWUzXHJcbiAgICAgIDogdGhpcy52YWx1ZVxyXG4gICAgKSArIHRoaXMudW5pdFxyXG4gIH1cclxuXHJcbiAgdG9KU09OICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKClcclxuICB9XHJcblxyXG4gIHRvQXJyYXkgKCkge1xyXG4gICAgcmV0dXJuIFsgdGhpcy52YWx1ZSwgdGhpcy51bml0IF1cclxuICB9XHJcblxyXG4gIHZhbHVlT2YgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWVcclxuICB9XHJcblxyXG4gIC8vIEFkZCBudW1iZXJcclxuICBwbHVzIChudW1iZXIpIHtcclxuICAgIG51bWJlciA9IG5ldyBTVkdOdW1iZXIobnVtYmVyKVxyXG4gICAgcmV0dXJuIG5ldyBTVkdOdW1iZXIodGhpcyArIG51bWJlciwgdGhpcy51bml0IHx8IG51bWJlci51bml0KVxyXG4gIH1cclxuXHJcbiAgLy8gU3VidHJhY3QgbnVtYmVyXHJcbiAgbWludXMgKG51bWJlcikge1xyXG4gICAgbnVtYmVyID0gbmV3IFNWR051bWJlcihudW1iZXIpXHJcbiAgICByZXR1cm4gbmV3IFNWR051bWJlcih0aGlzIC0gbnVtYmVyLCB0aGlzLnVuaXQgfHwgbnVtYmVyLnVuaXQpXHJcbiAgfVxyXG5cclxuICAvLyBNdWx0aXBseSBudW1iZXJcclxuICB0aW1lcyAobnVtYmVyKSB7XHJcbiAgICBudW1iZXIgPSBuZXcgU1ZHTnVtYmVyKG51bWJlcilcclxuICAgIHJldHVybiBuZXcgU1ZHTnVtYmVyKHRoaXMgKiBudW1iZXIsIHRoaXMudW5pdCB8fCBudW1iZXIudW5pdClcclxuICB9XHJcblxyXG4gIC8vIERpdmlkZSBudW1iZXJcclxuICBkaXZpZGUgKG51bWJlcikge1xyXG4gICAgbnVtYmVyID0gbmV3IFNWR051bWJlcihudW1iZXIpXHJcbiAgICByZXR1cm4gbmV3IFNWR051bWJlcih0aGlzIC8gbnVtYmVyLCB0aGlzLnVuaXQgfHwgbnVtYmVyLnVuaXQpXHJcbiAgfVxyXG5cclxuICBjb252ZXJ0ICh1bml0KSB7XHJcbiAgICByZXR1cm4gbmV3IFNWR051bWJlcih0aGlzLnZhbHVlLCB1bml0KVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBhZGRNZXRob2ROYW1lcyB9IGZyb20gJy4vbWV0aG9kcy5qcydcclxuaW1wb3J0IHsgY2FwaXRhbGl6ZSB9IGZyb20gJy4vdXRpbHMuanMnXHJcbmltcG9ydCB7IG5zIH0gZnJvbSAnLi4vbW9kdWxlcy9jb3JlL25hbWVzcGFjZXMuanMnXHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuLi91dGlscy93aW5kb3cuanMnXHJcbmltcG9ydCBCYXNlIGZyb20gJy4uL3R5cGVzL0Jhc2UuanMnXHJcblxyXG5jb25zdCBlbGVtZW50cyA9IHt9XHJcbmV4cG9ydCBjb25zdCByb290ID0gJ19fX1NZTUJPTF9fX1JPT1RfX18nXHJcblxyXG4vLyBNZXRob2QgZm9yIGVsZW1lbnQgY3JlYXRpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSAobmFtZSkge1xyXG4gIC8vIGNyZWF0ZSBlbGVtZW50XHJcbiAgcmV0dXJuIGdsb2JhbHMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLCBuYW1lKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZUluc3RhbmNlIChlbGVtZW50KSB7XHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCYXNlKSByZXR1cm4gZWxlbWVudFxyXG5cclxuICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICByZXR1cm4gYWRvcHRlcihlbGVtZW50KVxyXG4gIH1cclxuXHJcbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIG5ldyBlbGVtZW50c1tyb290XSgpXHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnICYmIGVsZW1lbnQuY2hhckF0KDApICE9PSAnPCcpIHtcclxuICAgIHJldHVybiBhZG9wdGVyKGdsb2JhbHMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KSlcclxuICB9XHJcblxyXG4gIHZhciBub2RlID0gY3JlYXRlKCdzdmcnKVxyXG4gIG5vZGUuaW5uZXJIVE1MID0gZWxlbWVudFxyXG5cclxuICAvLyBXZSBjYW4gdXNlIGZpcnN0Q2hpbGQgaGVyZSBiZWNhdXNlIHdlIGtub3csXHJcbiAgLy8gdGhhdCB0aGUgZmlyc3QgY2hhciBpcyA8IGFuZCB0aHVzIGFuIGVsZW1lbnRcclxuICBlbGVtZW50ID0gYWRvcHRlcihub2RlLmZpcnN0Q2hpbGQpXHJcblxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBub2RlT3JOZXcgKG5hbWUsIG5vZGUpIHtcclxuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIGdsb2JhbHMud2luZG93Lk5vZGUgPyBub2RlIDogY3JlYXRlKG5hbWUpXHJcbn1cclxuXHJcbi8vIEFkb3B0IGV4aXN0aW5nIHN2ZyBlbGVtZW50c1xyXG5leHBvcnQgZnVuY3Rpb24gYWRvcHQgKG5vZGUpIHtcclxuICAvLyBjaGVjayBmb3IgcHJlc2VuY2Ugb2Ygbm9kZVxyXG4gIGlmICghbm9kZSkgcmV0dXJuIG51bGxcclxuXHJcbiAgLy8gbWFrZSBzdXJlIGEgbm9kZSBpc24ndCBhbHJlYWR5IGFkb3B0ZWRcclxuICBpZiAobm9kZS5pbnN0YW5jZSBpbnN0YW5jZW9mIEJhc2UpIHJldHVybiBub2RlLmluc3RhbmNlXHJcblxyXG4gIC8vIGluaXRpYWxpemUgdmFyaWFibGVzXHJcbiAgdmFyIGNsYXNzTmFtZSA9IGNhcGl0YWxpemUobm9kZS5ub2RlTmFtZSB8fCAnRG9tJylcclxuXHJcbiAgLy8gTWFrZSBzdXJlIHRoYXQgZ3JhZGllbnRzIGFyZSBhZG9wdGVkIGNvcnJlY3RseVxyXG4gIGlmIChjbGFzc05hbWUgPT09ICdMaW5lYXJHcmFkaWVudCcgfHwgY2xhc3NOYW1lID09PSAnUmFkaWFsR3JhZGllbnQnKSB7XHJcbiAgICBjbGFzc05hbWUgPSAnR3JhZGllbnQnXHJcblxyXG4gIC8vIEZhbGxiYWNrIHRvIERvbSBpZiBlbGVtZW50IGlzIG5vdCBrbm93blxyXG4gIH0gZWxzZSBpZiAoIWVsZW1lbnRzW2NsYXNzTmFtZV0pIHtcclxuICAgIGNsYXNzTmFtZSA9ICdEb20nXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IGVsZW1lbnRzW2NsYXNzTmFtZV0obm9kZSlcclxufVxyXG5cclxubGV0IGFkb3B0ZXIgPSBhZG9wdFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1vY2tBZG9wdCAobW9jayA9IGFkb3B0KSB7XHJcbiAgYWRvcHRlciA9IG1vY2tcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyIChlbGVtZW50LCBuYW1lID0gZWxlbWVudC5uYW1lLCBhc1Jvb3QgPSBmYWxzZSkge1xyXG4gIGVsZW1lbnRzW25hbWVdID0gZWxlbWVudFxyXG4gIGlmIChhc1Jvb3QpIGVsZW1lbnRzW3Jvb3RdID0gZWxlbWVudFxyXG5cclxuICBhZGRNZXRob2ROYW1lcyhPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlbGVtZW50LnByb3RvdHlwZSkpXHJcblxyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFzcyAobmFtZSkge1xyXG4gIHJldHVybiBlbGVtZW50c1tuYW1lXVxyXG59XHJcblxyXG4vLyBFbGVtZW50IGlkIHNlcXVlbmNlXHJcbmxldCBkaWQgPSAxMDAwXHJcblxyXG4vLyBHZXQgbmV4dCBuYW1lZCBlbGVtZW50IGlkXHJcbmV4cG9ydCBmdW5jdGlvbiBlaWQgKG5hbWUpIHtcclxuICByZXR1cm4gJ1N2Z2pzJyArIGNhcGl0YWxpemUobmFtZSkgKyAoZGlkKyspXHJcbn1cclxuXHJcbi8vIERlZXAgbmV3IGlkIGFzc2lnbm1lbnRcclxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk5ld0lkIChub2RlKSB7XHJcbiAgLy8gZG8gdGhlIHNhbWUgZm9yIFNWRyBjaGlsZCBub2RlcyBhcyB3ZWxsXHJcbiAgZm9yICh2YXIgaSA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGFzc2lnbk5ld0lkKG5vZGUuY2hpbGRyZW5baV0pXHJcbiAgfVxyXG5cclxuICBpZiAobm9kZS5pZCkge1xyXG4gICAgcmV0dXJuIGFkb3B0KG5vZGUpLmlkKGVpZChub2RlLm5vZGVOYW1lKSlcclxuICB9XHJcblxyXG4gIHJldHVybiBhZG9wdChub2RlKVxyXG59XHJcblxyXG4vLyBNZXRob2QgZm9yIGV4dGVuZGluZyBvYmplY3RzXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQgKG1vZHVsZXMsIG1ldGhvZHMsIGF0dHJDaGVjaykge1xyXG4gIHZhciBrZXksIGlcclxuXHJcbiAgbW9kdWxlcyA9IEFycmF5LmlzQXJyYXkobW9kdWxlcykgPyBtb2R1bGVzIDogWyBtb2R1bGVzIF1cclxuXHJcbiAgZm9yIChpID0gbW9kdWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgZm9yIChrZXkgaW4gbWV0aG9kcykge1xyXG4gICAgICBsZXQgbWV0aG9kID0gbWV0aG9kc1trZXldXHJcbiAgICAgIGlmIChhdHRyQ2hlY2spIHtcclxuICAgICAgICBtZXRob2QgPSB3cmFwV2l0aEF0dHJDaGVjayhtZXRob2RzW2tleV0pXHJcbiAgICAgIH1cclxuICAgICAgbW9kdWxlc1tpXS5wcm90b3R5cGVba2V5XSA9IG1ldGhvZFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZFdpdGhBdHRyQ2hlY2sgKC4uLmFyZ3MpIHtcclxuLy8gICBleHRlbmQoLi4uYXJncywgdHJ1ZSlcclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBXaXRoQXR0ckNoZWNrIChmbikge1xyXG4gIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgbGV0IG8gPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuXHJcbiAgICBpZiAobyAmJiBvLmNvbnN0cnVjdG9yID09PSBPYmplY3QgJiYgIShvIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzLnNsaWNlKDAsIC0xKSkuYXR0cihvKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW52ZW50IChjb25maWcpIHtcclxuICAvLyBDcmVhdGUgZWxlbWVudCBpbml0aWFsaXplclxyXG4gIHZhciBpbml0aWFsaXplciA9IHR5cGVvZiBjb25maWcuY3JlYXRlID09PSAnZnVuY3Rpb24nXHJcbiAgICA/IGNvbmZpZy5jcmVhdGVcclxuICAgIDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvcihub2RlIHx8IGNyZWF0ZShjb25maWcuY3JlYXRlKSlcclxuICAgIH1cclxuXHJcbiAgLy8gSW5oZXJpdCBwcm90b3R5cGVcclxuICBpZiAoY29uZmlnLmluaGVyaXQpIHtcclxuICAgIC8qIGVzbGludCBuZXctY2FwOiBvZmYgKi9cclxuICAgIGluaXRpYWxpemVyLnByb3RvdHlwZSA9IG5ldyBjb25maWcuaW5oZXJpdCgpXHJcbiAgICBpbml0aWFsaXplci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBpbml0aWFsaXplclxyXG4gIH1cclxuXHJcbiAgLy8gRXh0ZW5kIHdpdGggbWV0aG9kc1xyXG4gIGlmIChjb25maWcuZXh0ZW5kKSB7IGV4dGVuZChpbml0aWFsaXplciwgY29uZmlnLmV4dGVuZCkgfVxyXG5cclxuICAvLyBBdHRhY2ggY29uc3RydWN0IG1ldGhvZCB0byBwYXJlbnRcclxuICBpZiAoY29uZmlnLmNvbnN0cnVjdCkgeyBleHRlbmQoY29uZmlnLnBhcmVudCB8fCBlbGVtZW50c1snQ29udGFpbmVyJ10sIGNvbmZpZy5jb25zdHJ1Y3QpIH1cclxuXHJcbiAgcmV0dXJuIGluaXRpYWxpemVyXHJcbn1cclxuIiwiY29uc3QgbWV0aG9kcyA9IHt9XHJcbmNvbnN0IG5hbWVzID0gW11cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1ldGhvZHMgKG5hbWUsIG0pIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShuYW1lKSkge1xyXG4gICAgZm9yIChsZXQgX25hbWUgb2YgbmFtZSkge1xyXG4gICAgICByZWdpc3Rlck1ldGhvZHMoX25hbWUsIG0pXHJcbiAgICB9XHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcclxuICAgIGZvciAobGV0IF9uYW1lIGluIG5hbWUpIHtcclxuICAgICAgcmVnaXN0ZXJNZXRob2RzKF9uYW1lLCBuYW1lW19uYW1lXSlcclxuICAgIH1cclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgYWRkTWV0aG9kTmFtZXMoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobSkpXHJcbiAgbWV0aG9kc1tuYW1lXSA9IE9iamVjdC5hc3NpZ24obWV0aG9kc1tuYW1lXSB8fCB7fSwgbSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1ldGhvZHNGb3IgKG5hbWUpIHtcclxuICByZXR1cm4gbWV0aG9kc1tuYW1lXSB8fCB7fVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0aG9kTmFtZXMgKCkge1xyXG4gIHJldHVybiBbIC4uLm5ldyBTZXQobmFtZXMpIF1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1ldGhvZE5hbWVzIChfbmFtZXMpIHtcclxuICBuYW1lcy5wdXNoKC4uLl9uYW1lcylcclxufVxyXG4iLCIvLyBNYXAgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcCAoYXJyYXksIGJsb2NrKSB7XHJcbiAgdmFyIGlcclxuICB2YXIgaWwgPSBhcnJheS5sZW5ndGhcclxuICB2YXIgcmVzdWx0ID0gW11cclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IGlsOyBpKyspIHtcclxuICAgIHJlc3VsdC5wdXNoKGJsb2NrKGFycmF5W2ldKSlcclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuLy8gRmlsdGVyIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIgKGFycmF5LCBibG9jaykge1xyXG4gIHZhciBpXHJcbiAgdmFyIGlsID0gYXJyYXkubGVuZ3RoXHJcbiAgdmFyIHJlc3VsdCA9IFtdXHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBpbDsgaSsrKSB7XHJcbiAgICBpZiAoYmxvY2soYXJyYXlbaV0pKSB7XHJcbiAgICAgIHJlc3VsdC5wdXNoKGFycmF5W2ldKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG4vLyBEZWdyZWVzIHRvIHJhZGlhbnNcclxuZXhwb3J0IGZ1bmN0aW9uIHJhZGlhbnMgKGQpIHtcclxuICByZXR1cm4gZCAlIDM2MCAqIE1hdGguUEkgLyAxODBcclxufVxyXG5cclxuLy8gUmFkaWFucyB0byBkZWdyZWVzXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWdyZWVzIChyKSB7XHJcbiAgcmV0dXJuIHIgKiAxODAgLyBNYXRoLlBJICUgMzYwXHJcbn1cclxuXHJcbi8vIENvbnZlcnQgZGFzaC1zZXBhcmF0ZWQtc3RyaW5nIHRvIGNhbWVsQ2FzZVxyXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxDYXNlIChzKSB7XHJcbiAgcmV0dXJuIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tKC4pL2csIGZ1bmN0aW9uIChtLCBnKSB7XHJcbiAgICByZXR1cm4gZy50b1VwcGVyQ2FzZSgpXHJcbiAgfSlcclxufVxyXG5cclxuLy8gQ29udmVydCBjYW1lbCBjYXNlZCBzdHJpbmcgdG8gc3RyaW5nIHNlcGVyYXRlZFxyXG5leHBvcnQgZnVuY3Rpb24gdW5DYW1lbENhc2UgKHMpIHtcclxuICByZXR1cm4gcy5yZXBsYWNlKC8oW0EtWl0pL2csIGZ1bmN0aW9uIChtLCBnKSB7XHJcbiAgICByZXR1cm4gJy0nICsgZy50b0xvd2VyQ2FzZSgpXHJcbiAgfSlcclxufVxyXG5cclxuLy8gQ2FwaXRhbGl6ZSBmaXJzdCBsZXR0ZXIgb2YgYSBzdHJpbmdcclxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUgKHMpIHtcclxuICByZXR1cm4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSlcclxufVxyXG5cclxuLy8gQ2FsY3VsYXRlIHByb3BvcnRpb25hbCB3aWR0aCBhbmQgaGVpZ2h0IHZhbHVlcyB3aGVuIG5lY2Vzc2FyeVxyXG5leHBvcnQgZnVuY3Rpb24gcHJvcG9ydGlvbmFsU2l6ZSAoZWxlbWVudCwgd2lkdGgsIGhlaWdodCwgYm94KSB7XHJcbiAgaWYgKHdpZHRoID09IG51bGwgfHwgaGVpZ2h0ID09IG51bGwpIHtcclxuICAgIGJveCA9IGJveCB8fCBlbGVtZW50LmJib3goKVxyXG5cclxuICAgIGlmICh3aWR0aCA9PSBudWxsKSB7XHJcbiAgICAgIHdpZHRoID0gYm94LndpZHRoIC8gYm94LmhlaWdodCAqIGhlaWdodFxyXG4gICAgfSBlbHNlIGlmIChoZWlnaHQgPT0gbnVsbCkge1xyXG4gICAgICBoZWlnaHQgPSBib3guaGVpZ2h0IC8gYm94LndpZHRoICogd2lkdGhcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB3aWR0aDogd2lkdGgsXHJcbiAgICBoZWlnaHQ6IGhlaWdodFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yaWdpbiAobywgZWxlbWVudCkge1xyXG4gIC8vIEFsbG93IG9yaWdpbiBvciBhcm91bmQgYXMgdGhlIG5hbWVzXHJcbiAgbGV0IG9yaWdpbiA9IG8ub3JpZ2luIC8vIG8uYXJvdW5kID09IG51bGwgPyBvLm9yaWdpbiA6IG8uYXJvdW5kXHJcbiAgbGV0IG94LCBveVxyXG5cclxuICAvLyBBbGxvdyB0aGUgdXNlciB0byBwYXNzIGEgc3RyaW5nIHRvIHJvdGF0ZSBhcm91bmQgYSBnaXZlbiBwb2ludFxyXG4gIGlmICh0eXBlb2Ygb3JpZ2luID09PSAnc3RyaW5nJyB8fCBvcmlnaW4gPT0gbnVsbCkge1xyXG4gICAgLy8gR2V0IHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGVsZW1lbnQgd2l0aCBubyB0cmFuc2Zvcm1hdGlvbnMgYXBwbGllZFxyXG4gICAgY29uc3Qgc3RyaW5nID0gKG9yaWdpbiB8fCAnY2VudGVyJykudG9Mb3dlckNhc2UoKS50cmltKClcclxuICAgIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCwgeCwgeSB9ID0gZWxlbWVudC5iYm94KClcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIHRyYW5zZm9ybWVkIHggYW5kIHkgY29vcmRpbmF0ZXNcclxuICAgIGxldCBieCA9IHN0cmluZy5pbmNsdWRlcygnbGVmdCcpID8geFxyXG4gICAgICA6IHN0cmluZy5pbmNsdWRlcygncmlnaHQnKSA/IHggKyB3aWR0aFxyXG4gICAgICA6IHggKyB3aWR0aCAvIDJcclxuICAgIGxldCBieSA9IHN0cmluZy5pbmNsdWRlcygndG9wJykgPyB5XHJcbiAgICAgIDogc3RyaW5nLmluY2x1ZGVzKCdib3R0b20nKSA/IHkgKyBoZWlnaHRcclxuICAgICAgOiB5ICsgaGVpZ2h0IC8gMlxyXG5cclxuICAgIC8vIFNldCB0aGUgYm91bmRzIGVnIDogXCJib3R0b20tbGVmdFwiLCBcIlRvcCByaWdodFwiLCBcIm1pZGRsZVwiIGV0Yy4uLlxyXG4gICAgb3ggPSBvLm94ICE9IG51bGwgPyBvLm94IDogYnhcclxuICAgIG95ID0gby5veSAhPSBudWxsID8gby5veSA6IGJ5XHJcbiAgfSBlbHNlIHtcclxuICAgIG94ID0gb3JpZ2luWzBdXHJcbiAgICBveSA9IG9yaWdpblsxXVxyXG4gIH1cclxuXHJcbiAgLy8gUmV0dXJuIHRoZSBvcmlnaW4gYXMgaXQgaXMgaWYgaXQgd2Fzbid0IGEgc3RyaW5nXHJcbiAgcmV0dXJuIFsgb3gsIG95IF1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgZ2xvYmFscyA9IHtcclxuICB3aW5kb3c6IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdyxcclxuICBkb2N1bWVudDogdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBkb2N1bWVudFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJXaW5kb3cgKHdpbiA9IG51bGwsIGRvYyA9IG51bGwpIHtcclxuICBnbG9iYWxzLndpbmRvdyA9IHdpblxyXG4gIGdsb2JhbHMuZG9jdW1lbnQgPSBkb2NcclxufVxyXG5cclxuY29uc3Qgc2F2ZSA9IHt9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVdpbmRvdyAoKSB7XHJcbiAgc2F2ZS53aW5kb3cgPSBnbG9iYWxzLndpbmRvd1xyXG4gIHNhdmUuZG9jdW1lbnQgPSBnbG9iYWxzLmRvY3VtZW50XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlV2luZG93ICgpIHtcclxuICBnbG9iYWxzLndpbmRvdyA9IHNhdmUud2luZG93XHJcbiAgZ2xvYmFscy5kb2N1bWVudCA9IHNhdmUuZG9jdW1lbnRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhXaW5kb3cgKHdpbiwgZm4pIHtcclxuICBzYXZlV2luZG93KClcclxuICByZWdpc3RlcldpbmRvdyh3aW4sIHdpbi5kb2N1bWVudClcclxuICBmbih3aW4sIHdpbi5kb2N1bWVudClcclxuICByZXN0b3JlV2luZG93KClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpbmRvdyAoKSB7XHJcbiAgcmV0dXJuIGdsb2JhbHMud2luZG93XHJcbn1cclxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZm9vdGVye1xcclxcbiAgei1pbmRleDoxMDAyO1xcclxcbiAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICBtYXJnaW4tdG9wOiAtNTdweDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuLmZvb3Rlcj51bHtcXHJcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcbi5mb290ZXI+dWw+bGl7XFxyXFxuICBmbG9hdDogbGVmdDtcXHJcXG59XFxyXFxuLmZvb3Rlcj51bD5saT5he1xcclxcbiAgZm9udC1mYW1pbHk6IFxcXCLlrovkvZNcXFwiO1xcclxcbiAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcXHJcXG59XCIsIFwiXCJdKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1se1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbn1cXHJcXG5ib2R5e1xcclxcbiAgbWFyZ2luOiAwcHg7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBmb250LWZhbWlseTogXFxcIk1pY3Jvc29mdCBZYUhlaVxcXCI7XFxyXFxufVxcclxcbm9sLHVse1xcclxcblxcdGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXHJcXG59XFxyXFxuYXtcXHJcXG5cXHRjb2xvcjogIzY2NjtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuLmxlZnR7XFxyXFxuICBmbG9hdDogbGVmdDtcXHJcXG59XFxyXFxuLnJpZ2h0e1xcclxcbiAgZmxvYXQ6IHJpZ2h0O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBJbXBvcnRzXG52YXIgdXJsRXNjYXBlID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS91cmwtZXNjYXBlLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMF9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi4vaW1nL2hvbWUtaWNvbi5wbmdcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMV9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi8uLi9pbWcvY3MtaGVhZC5wbmdcIikpO1xuXG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi53cmFwe1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgbWluLWhlaWdodDogMTAwJTtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG4gIHBhZGRpbmctYm90dG9tOiAzMHB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcXHJcXG59XFxyXFxuLndyYXAgLmhlYWRlcntcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHotaW5kZXg6IDEwMDM7XFxyXFxuICBoZWlnaHQ6IDU2cHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTgyMjNkO1xcclxcbn1cXHJcXG4ud3JhcCAuaGVhZGVyIGF7XFxyXFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcclxcbn1cXHJcXG4ud3JhcCAucHVsbC1sZWZ0e1xcclxcbiAgcGFkZGluZzogNnB4IDAgMCAzM3B4O1xcclxcbiAgbGluZS1oZWlnaHQ6IDA7XFxyXFxuICBmbG9hdDogbGVmdDtcXHJcXG59XFxyXFxuLndyYXAgLm1lbnUtd3JhcHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHdpZHRoOiA2ODRweDtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG59XFxyXFxuLndyYXAgLm1lbnUtd3JhcD51bHtcXHJcXG4gIGxpbmUtaGVpZ2h0OiA1NnB4O1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG59XFxyXFxuLndyYXAgLm1lbnUtd3JhcD51bD5saXtcXHJcXG4gIGZsb2F0OiBsZWZ0O1xcclxcbn1cXHJcXG4ud3JhcCAubWVudS13cmFwIGxpOmZpcnN0LWNoaWxkIHNwYW57XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDIzcHg7XFxyXFxuICBsZWZ0OiAtM3B4O1xcclxcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgd2lkdGg6IDEycHg7XFxyXFxuICBoZWlnaHQ6IDEycHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDA5MGZmO1xcclxcbn1cXHJcXG4ud3JhcCAubWVudS13cmFwIGxpPmF7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICBoZWlnaHQ6IDU2cHg7XFxyXFxuICBwYWRkaW5nOiAwIDE3cHg7XFxyXFxufVxcclxcbi53cmFwIC5tZW51LXdyYXAgbGk+YTpob3ZlcntcXHJcXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xcclxcbn1cXHJcXG4jaGVhZGVyLWJsdWUtYmxvY2t7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDUycHg7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwOTBmZjtcXHJcXG4gIGhlaWdodDogNHB4O1xcclxcbiAgbGVmdDo1N3B4O1xcclxcbiAgd2lkdGg6IDMycHg7XFxyXFxuICB0cmFuc2l0aW9uOiBsZWZ0IDFzIGVhc2UsIHdpZHRoIDAuM3M7XFxyXFxufVxcclxcbi53cmFwIC5wdWxsLXJpZ2h0IGRpdntcXHJcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuLmhlYWRlci1zaGFyZS1ib3h7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBtYXJnaW46IDE1cHggMTBweCAwIDEwcHg7XFxyXFxufVxcclxcbi53ZWl4aW4taWNvbiB7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICB3aWR0aDogMzBweDtcXHJcXG4gIGhlaWdodDogMzBweDtcXHJcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMF9fXyArIFwiKSAtMTM2cHggLTM4cHg7XFxyXFxuICAvKnRyYW5zaXRpb246IGFsbCAwLjNzOyovXFxyXFxufVxcclxcbi53ZWl4aW4taWNvbjpob3ZlcntcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgycHgpO1xcclxcbn1cXHJcXG4jd2VpeGluLWNvZGUuaGlkZXtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcbi53ZWliby1pY29uIHtcXHJcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gIHdpZHRoOiAzMHB4O1xcclxcbiAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18wX19fICsgXCIpIC0xNzVweCAtMzhweDtcXHJcXG4gIC8qdHJhbnNpdGlvbjogYWxsIDAuM3M7Ki9cXHJcXG59XFxyXFxuLndlaWJvLWljb246aG92ZXJ7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMnB4KTtcXHJcXG59XFxyXFxuI3dlaXhpbi1jb2RlIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogNDNweDtcXHJcXG4gIHJpZ2h0OiAwO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuLndyYXAgLmxvZ28taWNvbntcXHJcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gIHdpZHRoOiAxMDRweDtcXHJcXG4gIGhlaWdodDogMzhweDtcXHJcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMF9fXyArIFwiKTtcXHJcXG59XFxyXFxuLmhlYWRlci1hY2NvdW50IHtcXHJcXG4gIHBhZGRpbmctdG9wOiAxMy41cHg7XFxyXFxuICBoZWlnaHQ6IDI5cHg7XFxyXFxufVxcclxcbi51bmxvZ2luIGEge1xcclxcbiAgcGFkZGluZzogM3B4IDEwcHggNXB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZjtcXHJcXG4gIGZvbnQtc2l6ZTogMTNweDtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAyOXB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcXHJcXG4gIHRyYW5zaXRpb246IC4ycztcXHJcXG59XFxyXFxuLnUtZCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgZm9udC1zaXplOiAxM3B4O1xcclxcbiAgbGluZS1oZWlnaHQ6IDI5cHg7XFxyXFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcclxcbn1cXHJcXG4udW5sb2dpbiBhOmhvdmVye1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxufVxcclxcbi53cmFwIC5ib2R5e1xcclxcbiAgbWluLWhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuLndyYXAgLmJvZHkgLmN1c3RvbWVyLXNlcnZpY2V7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB0b3A6IDM5MHB4O1xcclxcbiAgcmlnaHQ6IDA7XFxyXFxuICB6LWluZGV4OiA5OTk5O1xcclxcbiAgd2lkdGg6IDUxcHg7XFxyXFxuICBoZWlnaHQ6IDEzNnB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMxOENGMjtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDZweCAwIDAgNnB4O1xcclxcbn1cXHJcXG4ud3JhcCAuYm9keSAuY3VzdG9tZXItc2VydmljZSAuaWNvbntcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMV9fXyArIFwiKTtcXHJcXG4gIHdpZHRoOiAyNHB4O1xcclxcbiAgaGVpZ2h0OiAyMXB4O1xcclxcbiAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIG1hcmdpbi10b3A6IDEzcHg7XFxyXFxufVxcclxcbi53cmFwIC5ib2R5IC5jdXN0b21lci1zZXJ2aWNlIC50ZXh0e1xcclxcbiAgZm9udC1zaXplOiAxNnB4O1xcclxcbiAgbWFyZ2luLWxlZnQ6IDE4cHg7XFxyXFxuICBjb2xvcjogI2ZmZjtcXHJcXG4gIHdpZHRoOiAxOHB4O1xcclxcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XFxyXFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKua7muWKqOeahOWwj+WchiovXFxyXFxuI2NhbnZhc3tcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHotaW5kZXg6IDEwMDE7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcbiNjYW52YXMgLmltZ0F7XFxyXFxuICB3aWR0aDogNjk2LjE3M3B4O1xcclxcbiAgaGVpZ2h0OiA2OTYuMTczcHg7XFxyXFxuICBtYXJnaW4tbGVmdDogLTM2Mi4wMXB4O1xcclxcbiAgbWFyZ2luLXRvcDogLTM2MC42MThweDtcXHJcXG59XFxyXFxuI2NhbnZhcyAuaW1nQntcXHJcXG4gIHdpZHRoOiA2OTYuMTczcHg7XFxyXFxuICBoZWlnaHQ6IDY5Ni4xNzNweDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAtMzQ4LjA4NnB4O1xcclxcbiAgbWFyZ2luLXRvcDogLTM0OC4wODZweDtcXHJcXG59XFxyXFxuI2NhbnZhcyAuaW1nQ3tcXHJcXG4gIHdpZHRoOiAxMTYxLjNweDtcXHJcXG4gIGhlaWdodDogMTE2MS4zcHg7XFxyXFxuICBtYXJnaW4tbGVmdDogLTU4MC42NTJweDtcXHJcXG4gIG1hcmdpbi10b3A6IC01ODAuNjUycHg7XFxyXFxufVxcclxcbiNjYW52YXMgLmltZ0R7XFxyXFxuICB3aWR0aDogMzczLjk5NnB4O1xcclxcbiAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgbWFyZ2luLWxlZnQ6IC0yNTQuMzE3cHg7XFxyXFxuICBtYXJnaW4tdG9wOiAtMzQ0LjA3NnB4O1xcclxcbn1cXHJcXG4jY2FudmFzIC5jaXJjbGV7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDUwJTtcXHJcXG4gIGxlZnQ6IDUwJTtcXHJcXG59XFxyXFxuLypzdmcqL1xcclxcbiNjYW52YXMgc3Zne1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAwcHg7XFxyXFxuICBsZWZ0OiAwcHg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiAnQG1lZGlhICcgKyBpdGVtWzJdICsgJ3snICsgY29udGVudCArICd9JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSAnKCcgKyBpdGVtWzJdICsgJykgYW5kICgnICsgbWVkaWFRdWVyeSArICcpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJztcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcbiAgcmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsLCBuZWVkUXVvdGVzKSB7XG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB1cmw7XG4gIH0gLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSB8fCBuZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuICdcIicgKyB1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSArICdcIic7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ib3R0b20uY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2JvdHRvbS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2JvdHRvbS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90ZXN0LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90ZXN0LmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdGVzdC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90b3AuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3RvcC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3RvcC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI2NTM3ZDUxNDM1YzRkNjZlMDdhNjZlMTIxMDZiZDcxZC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI0ZGVlZWIyOThlNWM3ZDgwMWIwNDBmZDcyMDIwMGYyZS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJkNWVlYjljMjExYjljYTg1MzdkMDAwZDhmZjlhOTRhMy5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI3ZTM2MjgwMmIyOTAxYWM1NmY3MWNiODcxZDlhOTNjYi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI2MzUwNWJjZDY4ZTg1ZjVkYTkxNWY2NmY4M2IwMmIwNS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI5NzZlM2Y0MjMwZTIwNGI3ODI3ZDJkNGQ1MjI4YTM4OS5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI1MjRkNGIyOTQwZDJlMzM0NTUwZTQ3YTNkZmRmY2YxMS5wbmdcIjsiLCJpbXBvcnQgXCIuL2Nzcy90ZXN0LmNzc1wiO1xyXG5pbXBvcnQgXCIuL2Nzcy90b3AuY3NzXCI7XHJcbmltcG9ydCBcIi4vY3NzL2JvdHRvbS5jc3NcIlxyXG5pbXBvcnQgd2VpeGluQ29kZSBmcm9tIFwiLi9pbWcvMTJjbS5qcGdcIjtcclxuaW1wb3J0IGhvbWVCbGFja0JnIGZyb20gXCIuL2ltZy9ob21lLWJsYWNrLWJnLmpwZ1wiO1xyXG5pbXBvcnQgZWFydGhJZ25vcmUgZnJvbSBcIi4vaW1nL2VhcnRoLWlnbm9yZS5wbmdcIjtcclxuaW1wb3J0IGMzSWdub3JlIGZyb20gXCIuL2ltZy9jMy1pZ25vcmUucG5nXCI7XHJcbmltcG9ydCBob21lQmlndGl0bGVJZ25vcmUgZnJvbSBcIi4vaW1nL2hvbWUtYmlndGl0bGUtaWdub3JlLnBuZ1wiO1xyXG5pbXBvcnQgU1ZHIGZyb20nQHN2Z2RvdGpzL3N2Zy5qcy9zcmMvc3ZnLmpzJ1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VpeGluLWNvZGU+aW1nJykuc3JjPXdlaXhpbkNvZGU7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3ZpZXc+aW1nJykuc3JjPWhvbWVCbGFja0JnO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nQScpLnNyYz1lYXJ0aElnbm9yZTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ0InKS5zcmM9YzNJZ25vcmU7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdDJykuc3JjPWMzSWdub3JlO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nRCcpLnNyYz1ob21lQmlndGl0bGVJZ25vcmU7XHJcbi8v6byg5qCH5oKs5YGc77yM5L2/5b6u5L+h5LqM57u056CB5pi+56S65Ye65p2lXHJcbmxldCBvV2VpeGluQT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VpeGluLWljb24nKTtcclxubGV0IG9XZWl4aW5Db2RlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWl4aW4tY29kZScpO1xyXG5vV2VpeGluQS5vbm1vdXNlb3Zlcj1mdW5jdGlvbigpe1xyXG4gIG9XZWl4aW5Db2RlLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiXHJcbn1cclxub1dlaXhpbkEub25tb3VzZW91dD1mdW5jdGlvbigpe1xyXG4gIG9XZWl4aW5Db2RlLnN0eWxlLmRpc3BsYXk9XCJub25lXCJcclxufVxyXG4vL+WvvOiIquadoem8oOagh+aCrOWBnOS6i+S7tlxyXG5sZXQgb1VsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LXdyYXA+dWwnKTtcclxubGV0IG9OYXZCbG9jaz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlci1ibHVlLWJsb2NrXCIpO1xyXG5vVWwub25tb3VzZW92ZXI9ZnVuY3Rpb24oZXZlbnQpe1xyXG4gIGxldCB0ZXh0PWV2ZW50LnRhcmdldC50ZXh0Q29udGVudDtcclxuICBzd2l0Y2godGV4dCl7XHJcbiAgICBjYXNlICfnpL7kvJrmi5vogZgnOlxyXG4gICAgICAgIG9OYXZCbG9jay5zdHlsZS5sZWZ0PScxMjNweCc7XHJcbiAgICAgICAgb05hdkJsb2NrLnN0eWxlLndpZHRoPSc2NHB4JztcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ+agoeWbreaLm+iBmCc6XHJcbiAgICAgICAgb05hdkJsb2NrLnN0eWxlLmxlZnQ9JzIyMXB4JztcclxuICAgICAgICBvTmF2QmxvY2suc3R5bGUud2lkdGg9JzY0cHgnO1xyXG4gICAgICAgIGJyZWFrOyAgICAgIFxyXG4gICAgY2FzZSAn5a6e5Lmg55Sf5oub6IGYJzpcclxuICAgICAgICBvTmF2QmxvY2suc3R5bGUubGVmdD0nMzE5cHgnO1xyXG4gICAgICAgIG9OYXZCbG9jay5zdHlsZS53aWR0aD0nODBweCc7XHJcbiAgICAgICAgYnJlYWs7ICAgICAgXHJcbiAgICBjYXNlICdHbG9iYWwgVGFsZW50JzpcclxuICAgICAgICBvTmF2QmxvY2suc3R5bGUubGVmdD0nNDMzcHgnO1xyXG4gICAgICAgIG9OYXZCbG9jay5zdHlsZS53aWR0aD0nMTAycHgnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAn5LqG6Kej55m+5bqmJzpcclxuICAgICAgICBvTmF2QmxvY2suc3R5bGUubGVmdD0nNTY4LjU2M3B4JztcclxuICAgICAgICBvTmF2QmxvY2suc3R5bGUud2lkdGg9JzY0cHgnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICB9XHJcbn1cclxub1VsLm9ubW91c2VvdXQ9ZnVuY3Rpb24oKXtcclxuICBvTmF2QmxvY2suc3R5bGUubGVmdD0nNTdweCc7XHJcbiAgb05hdkJsb2NrLnN0eWxlLndpZHRoPSczMnB4JztcclxufVxyXG4vL+WumuS5ieWchueql+aXi+i9rCDmr4/np5Lpkp/pgIbml7bpkojml4vovawx5bqmXHJcbmxldCBvSW1hQj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nQicpO1xyXG5sZXQgb0ltYUM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ0MnKTtcclxubGV0IGRlZ0I9MDtcclxubGV0IGRlZ0M9MDtcclxuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gIG9JbWFCLnN0eWxlLnRyYW5zZm9ybT1gcm90YXRlKCR7ZGVnQn1kZWcpYFxyXG4gIG9JbWFDLnN0eWxlLnRyYW5zZm9ybT1gcm90YXRlKCR7ZGVnQ31kZWcpYFxyXG4gIGRlZ0ItPTAuMlxyXG4gIGRlZ0MrPTAuMlxyXG59LCAxMDApO1xyXG4vL1NWR+mDqOWIhlxyXG5sZXQgb1N2Zz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI215c3ZnXCIpO1xyXG5sZXQgZHJhdz1uZXcgU1ZHLlN2ZyhvU3ZnKS5zaXplKCcxMDAlJywnMTAwJScpO1xyXG5sZXQgcG9seWdvbkxlZnQ9ZHJhdy5wb2x5Z29uKCcyNDYuOSw1NTIuNCAyMjYuOSw0NzIuNCAyNzYuOSw0MjIuNCAzNDAuOSw1NjIuNCAzNTYuOSw0ODIuNCcpLmF0dHIoe1xyXG4gIGZpbGw6J3JnYmEoMjU1LDI1NSwyNTUsMCknLFxyXG4gIFwiZmlsbC1vcGFjaXR5XCI6IDAuNSxcclxuICBzdHJva2U6ICcjZmZmJyxcclxuICAnc3Ryb2tlLXdpZHRoJzogMFxyXG59KVxyXG4vL+S4gOS4quWujOaVtOeahOeCuSDmmbrog73msb3ovaZcclxubGV0IGVsbGlwc2VBPWRyYXcuZWxsaXBzZSgoMjQ2LjkrNikqMiwoNTU5LjQtMTYpKjIpLnJhZGl1cygzLjUsMy41KS5hdHRyKHtcclxuICBmaWxsOidyZWQnLFxyXG59KVxyXG5sZXQgbGlua0E9ZHJhdy5saW5rKFwiaHR0cHM6Ly90YWxlbnQuYmFpZHUuY29tL2V4dGVybmFsL2JhaWR1L2luZGV4Lmh0bWwjL3NvY2lhbC8yLyVFNiU5OSVCQSVFOCU4MyVCRCVFNiVCMSVCRCVFOCVCRCVBNiVFNCVCQSU4QiVFNCVCOCU5QSVFOSU4MyVBOFwiKS50YXJnZXQoJ19zZWxmJykudGV4dChmdW5jdGlvbihhZGQpe1xyXG4gIGFkZC50c3BhbihcIuaZuuiDveaxvei9plwiKS5hdHRyKHtcclxuICAgIGZpbGw6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNSknXHJcbiAgfSlcclxufSkuYXR0cih7XHJcbiAgeDogJzI0Ni45JyxcclxuICB5OiAnNTU5LjQnLFxyXG4gICdmb250LXNpemUnOiAnMTAnLFxyXG59KVxyXG4vL+S4gOS4quWujOaVtOeahOeCuSDoh6rliqjpqb7pqbZcclxubGV0IGVsbGlwc2VCPWRyYXcuZWxsaXBzZSgoMjI2LjkrNTApKjIsKDQ3OS40LTMpKjIpLnJhZGl1cygzLjUsMy41KS5hdHRyKHtcclxuICBmaWxsOidyZWQnLFxyXG59KVxyXG5sZXQgbGlua0I9ZHJhdy5saW5rKFwiaHR0cHM6Ly90YWxlbnQuYmFpZHUuY29tL2V4dGVybmFsL2JhaWR1L2luZGV4Lmh0bWwjL3NvY2lhbC8yLyVFOCU4NyVBQSVFNSU4QSVBOCVFOSVBOSVCRSVFOSVBOSVCNiVFNCVCQSU4QiVFNCVCOCU5QSVFOSU4MyVBOHwlRTglODclQUElRTUlOEElQTglRTklQTklQkUlRTklQTklQjYlRTYlOEElODAlRTYlOUMlQUYlRTklODMlQThcIikudGFyZ2V0KCdfc2VsZicpLnRleHQoZnVuY3Rpb24oYWRkKXtcclxuICBhZGQudHNwYW4oXCLoh6rliqjpqb7pqbZcIikuYXR0cih7XHJcbiAgICBmaWxsOiAncmdiYSgyNTUsMjU1LDI1NSwwLjUpJ1xyXG4gIH0pXHJcbn0pLmF0dHIoe1xyXG4gIHg6ICcyMjYuOScsXHJcbiAgeTogJzQ3OS40JyxcclxuICAnZm9udC1zaXplJzogJzEwJyxcclxufSlcclxuLy/kuIDkuKrlrozmlbTnmoTngrkg6L2m6IGU572RXHJcbmxldCBlbGxpcHNlQz1kcmF3LmVsbGlwc2UoKDI3Ni45KzQwKSoyLCg0MzQuNC04KSoyKS5yYWRpdXMoMy41LDMuNSkuYXR0cih7XHJcbiAgZmlsbDoncmVkJyxcclxufSlcclxubGV0IGxpbmtDPWRyYXcubGluayhcImh0dHBzOi8vdGFsZW50LmJhaWR1LmNvbS9leHRlcm5hbC9iYWlkdS9pbmRleC5odG1sIy9zb2NpYWwvMi/ovabogZTnvZHkuovkuJrpg6hcIikudGFyZ2V0KCdfc2VsZicpLnRleHQoZnVuY3Rpb24oYWRkKXtcclxuICBhZGQudHNwYW4oXCLovabogZTnvZFcIikuYXR0cih7XHJcbiAgICBmaWxsOiAncmdiYSgyNTUsMjU1LDI1NSwwLjUpJ1xyXG4gIH0pXHJcbn0pLmF0dHIoe1xyXG4gIHg6ICcyNzYuOScsXHJcbiAgeTogJzQyOS40JyxcclxuICAnZm9udC1zaXplJzogJzEwJyxcclxufSlcclxuLy/kuIDkuKrlrozmlbTnmoTngrkg5pm66IO96am+6am2IOWkp+Wtl+S9k1xyXG5sZXQgZWxsaXBzZUQ9ZHJhdy5lbGxpcHNlKCg0MjApKjIsKDQ4OS40LTUpKjIpLnJhZGl1cygzLjUsMy41KS5hdHRyKHtcclxuICBmaWxsOidyZWQnLFxyXG59KVxyXG5sZXQgbGlua0Q9ZHJhdy5saW5rKFwiaHR0cHM6Ly90YWxlbnQuYmFpZHUuY29tL2V4dGVybmFsL2JhaWR1L2luZGV4Lmh0bWwjL3NvY2lhbC8yL0lER+WQiOS9nOWPkeWxlemDqHxJREfnu7zlkIjnrqHnkIbpg6h8SURH5pm66IO96am+6am25L2T6aqM6K6+6K6h5Lit5b+DfOi9puiBlOe9keS6i+S4mumDqHzoh6rliqjpqb7pqbbkuovkuJrpg6h86Ieq5Yqo6am+6am25oqA5pyv6YOofOaZuuiDveaxvei9puS6i+S4mumDqFwiKS50YXJnZXQoJ19zZWxmJykudGV4dChmdW5jdGlvbihhZGQpe1xyXG4gIGFkZC50c3BhbihcIuaZuuiDvempvumptlwiKS5hdHRyKHtcclxuICAgIGZpbGw6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNSknXHJcbiAgfSlcclxufSkuYXR0cih7XHJcbiAgeDogJzM1Ni45JyxcclxuICB5OiAnNDg5LjQnLFxyXG4gICdmb250LXNpemUnOiAnMTMnLFxyXG59KVxyXG4vL+S4gOS4quWujOaVtOeahOeCuSDmmbrog73pqb7pqbYg5bCP5a2X5L2TXHJcbmxldCBlbGxpcHNlRT1kcmF3LmVsbGlwc2UoKDMzNSkqMiwoNTY5LjQtMykqMikucmFkaXVzKDMuNSwzLjUpLmF0dHIoe1xyXG4gIGZpbGw6J3JlZCcsXHJcbn0pXHJcbmxldCBsaW5rRT1kcmF3LmxpbmsoXCJodHRwczovL3RhbGVudC5iYWlkdS5jb20vZXh0ZXJuYWwvYmFpZHUvaW5kZXguaHRtbCMvc29jaWFsLzIvSURH5ZCI5L2c5Y+R5bGV6YOofElER+e7vOWQiOeuoeeQhumDqHxJREfmmbrog73pqb7pqbbkvZPpqozorr7orqHkuK3lv4NcIikudGFyZ2V0KCdfc2VsZicpLnRleHQoZnVuY3Rpb24oYWRkKXtcclxuICBhZGQudHNwYW4oXCLmmbrog73pqb7pqbZcIikuYXR0cih7XHJcbiAgICBmaWxsOiAncmdiYSgyNTUsMjU1LDI1NSwwLjUpJ1xyXG4gIH0pXHJcbn0pLmF0dHIoe1xyXG4gIHg6ICczNDAuOScsXHJcbiAgeTogJzU2OS40JyxcclxuICAnZm9udC1zaXplJzogJzEwJyxcclxufSlcclxuLy/pvKDmoIfnp7vliLDmpK3lnIbkuIrnmoTngrnop6blj5HvvIzmiJHku6zlj6rpnIDopoHnn6XpgZPmpK3lnIbnmoTkuK3lv4PlnZDmoIfljbPlj69cclxubGV0IHNtYWxsPWRyYXcuZWxsaXBzZSgwLDApLnJhZGl1cygwLDApLmF0dHIoe1xyXG4gIGZpbGw6J3JnYmEoMjU1LDI1NSwyNTUsMC40KScsXHJcbiAgc3Ryb2tlOiAncmdiYSgyNTUsMjU1LDI1NSwwLjUpJyxcclxuICBvcGFjaXR5OiAwXHJcbn0pXHJcbmxldCBiaWc9ZHJhdy5lbGxpcHNlKDAsMCkucmFkaXVzKDAsMCkuYXR0cih7XHJcbiAgZmlsbDoncmdiYSgyNTUsMjU1LDI1NSwwLjQpJyxcclxuICBzdHJva2U6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNSknLFxyXG4gIG9wYWNpdHk6IDBcclxufSlcclxuLy/pvKDmoIfnp7vkuIrmnaXml7bov5vooYzliJLnur/mk43kvZxcclxubGV0IGxpbmVBID0gZHJhdy5saW5lKDAsIDAsIDAsIDApLmF0dHIoe1xyXG4gIHN0cm9rZTogJ3JnYmEoMjU1LDI1NSwyNTUsMC4zKScsXHJcbiAgJ3N0cm9rZS13aWR0aCc6MVxyXG59KVxyXG5sZXQgbGluZUIgPSBkcmF3LmxpbmUoMCwgMCwgMCwgMCkuYXR0cih7XHJcbiAgc3Ryb2tlOiAncmdiYSgyNTUsMjU1LDI1NSwwLjMpJyxcclxuICAnc3Ryb2tlLXdpZHRoJzoxXHJcbn0pXHJcbmxldCBsaW5lQyA9IGRyYXcubGluZSgwLCAwLCAwLCAwKS5hdHRyKHtcclxuICBzdHJva2U6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuMyknLFxyXG4gICdzdHJva2Utd2lkdGgnOjFcclxufSlcclxubGV0IGxpbmVEID0gZHJhdy5saW5lKDAsIDAsIDAsIDApLmF0dHIoe1xyXG4gIHN0cm9rZTogJ3JnYmEoMjU1LDI1NSwyNTUsMC4zKScsXHJcbiAgJ3N0cm9rZS13aWR0aCc6MVxyXG59KVxyXG5sZXQgbGluZUUgPSBkcmF3LmxpbmUoMCwgMCwgMCwgMCkuYXR0cih7XHJcbiAgc3Ryb2tlOiAncmdiYSgyNTUsMjU1LDI1NSwwLjMpJyxcclxuICAnc3Ryb2tlLXdpZHRoJzoxXHJcbn0pXHJcbmxldCBsaW5lRiA9IGRyYXcubGluZSgwLCAwLCAwLCAwKS5hdHRyKHtcclxuICBzdHJva2U6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuMyknLFxyXG4gICdzdHJva2Utd2lkdGgnOjFcclxufSlcclxubGV0IGxpbmVHID0gZHJhdy5saW5lKDAsIDAsIDAsIDApLmF0dHIoe1xyXG4gIHN0cm9rZTogJ3JnYmEoMjU1LDI1NSwyNTUsMC4zKScsXHJcbiAgJ3N0cm9rZS13aWR0aCc6MVxyXG59KVxyXG4vL+WIneWni+WMluebtOe6v+aTjeS9nFxyXG5mdW5jdGlvbiBpbml0TGluZUFsbCgpe1xyXG4gIGxpbmVBLmF0dHIoe1xyXG4gICAgeDE6NDIwLFxyXG4gICAgeTE6NDg0LjQsXHJcbiAgICB4Mjo0MjAsXHJcbiAgICB5Mjo0ODQuNFxyXG4gIH0pXHJcbiAgbGluZUIuYXR0cih7XHJcbiAgICB4MTo0MjAsXHJcbiAgICB5MTo0ODQuNCxcclxuICAgIHgyOjQyMCxcclxuICAgIHkyOjQ4NC40XHJcbiAgfSlcclxuICBsaW5lQy5hdHRyKHtcclxuICAgIHgxOjQyMCxcclxuICAgIHkxOjQ4NC40LFxyXG4gICAgeDI6NDIwLFxyXG4gICAgeTI6NDg0LjRcclxuICB9KVxyXG4gIGxpbmVELmF0dHIoe1xyXG4gICAgeDE6NDIwLFxyXG4gICAgeTE6NDg0LjQsXHJcbiAgICB4Mjo0MjAsXHJcbiAgICB5Mjo0ODQuNFxyXG4gIH0pXHJcbiAgbGluZUUuYXR0cih7XHJcbiAgICB4MTozMzUsXHJcbiAgICB5MTo1NjYuNCxcclxuICAgIHgyOjMzNSxcclxuICAgIHkyOjU2Ni40XHJcbiAgfSlcclxuICBsaW5lRi5hdHRyKHtcclxuICAgIHgxOjI1Mi45LFxyXG4gICAgeTE6NTQzLjQsXHJcbiAgICB4MjoyNTIuOSxcclxuICAgIHkyOjU0My40XHJcbiAgfSlcclxuICBsaW5lRy5hdHRyKHtcclxuICAgIHgxOjI3Ni45LFxyXG4gICAgeTE6NDc2LjQsXHJcbiAgICB4MjoyNzYuOSxcclxuICAgIHkyOjQ3Ni40XHJcbiAgfSlcclxufVxyXG5mdW5jdGlvbiBjaXJjbGVDaGFuZ2Uob2JqLHNtYWxsLGJpZyl7XHJcbiAgb2JqLm1vdXNlb3ZlcihmdW5jdGlvbihldmVudCkge1xyXG4gICAgbGV0IGN4PXRoaXMubm9kZS5jeC5iYXNlVmFsLnZhbHVlO1xyXG4gICAgbGV0IGN5PXRoaXMubm9kZS5jeS5iYXNlVmFsLnZhbHVlO1xyXG4gICAgc21hbGwuYXR0cih7XHJcbiAgICAgIGN4OmN4LFxyXG4gICAgICBjeTpjeSxcclxuICAgIH0pXHJcbiAgICBiaWcuYXR0cih7XHJcbiAgICAgIGN4OmN4LFxyXG4gICAgICBjeTpjeSxcclxuICAgIH0pXHJcbiAgICBpbml0TGluZUFsbCgpO1xyXG4gICAgbGluZUEuYW5pbWF0ZSgxMDAwKS5hdHRyKHtcclxuICAgICAgeDI6MzE2LjksXHJcbiAgICAgIHkyOjQyNi40XHJcbiAgICB9KVxyXG4gICAgbGluZUIuYW5pbWF0ZSgxMDAwKS5hdHRyKHtcclxuICAgICAgeDI6Mjc2LjksXHJcbiAgICAgIHkyOjQ3Ni40XHJcbiAgICB9KVxyXG4gICAgbGluZUMuYW5pbWF0ZSgxMDAwKS5hdHRyKHtcclxuICAgICAgeDI6MjUyLjksXHJcbiAgICAgIHkyOjU0My40XHJcbiAgICB9KVxyXG4gICAgbGluZUQuYW5pbWF0ZSgxMDAwKS5hdHRyKHtcclxuICAgICAgeDI6MzM1LFxyXG4gICAgICB5Mjo1NjYuNFxyXG4gICAgfSlcclxuICAgIGxpbmVFLmFuaW1hdGUoMTAwMCkuYXR0cih7XHJcbiAgICAgIHgyOjI1Mi45LFxyXG4gICAgICB5Mjo1NDMuNFxyXG4gICAgfSlcclxuICAgIGxpbmVGLmFuaW1hdGUoMTAwMCkuYXR0cih7XHJcbiAgICAgIHgyOjI3Ni45LFxyXG4gICAgICB5Mjo0NzYuNFxyXG4gICAgfSlcclxuICAgIGxpbmVHLmFuaW1hdGUoMTAwMCkuYXR0cih7XHJcbiAgICAgIHgyOjMxNi45LFxyXG4gICAgICB5Mjo0MjYuNFxyXG4gICAgfSlcclxuICAgIHNtYWxsLmFuaW1hdGUoMTAwMCwnYm91bmNlJykuYXR0cih7XHJcbiAgICAgIHJ4OjE0LFxyXG4gICAgICByeToxNCxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgIH0pLmxvb3AoKVxyXG4gICAgYmlnLmFuaW1hdGUoMTAwMCwnYm91bmNlJykuYXR0cih7XHJcbiAgICAgIHJ4OjI0LFxyXG4gICAgICByeToyNCxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgIH0pLmxvb3AoKVxyXG4gIH0pXHJcbiAgb2JqLm1vdXNlb3V0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBzbWFsbC5fdGltZWxpbmUuc3RvcCgpO1xyXG4gICAgYmlnLl90aW1lbGluZS5zdG9wKCk7XHJcbiAgICBsaW5lQS5fdGltZWxpbmUuc3RvcCgpO1xyXG4gICAgbGluZUIuX3RpbWVsaW5lLnN0b3AoKTtcclxuICAgIGxpbmVDLl90aW1lbGluZS5zdG9wKCk7XHJcbiAgICBsaW5lRC5fdGltZWxpbmUuc3RvcCgpO1xyXG4gICAgbGluZUUuX3RpbWVsaW5lLnN0b3AoKTtcclxuICAgIGxpbmVGLl90aW1lbGluZS5zdG9wKCk7XHJcbiAgICBsaW5lRy5fdGltZWxpbmUuc3RvcCgpO1xyXG4gICAgaW5pdExpbmVBbGwoKTtcclxuICB9KVxyXG59XHJcbmNpcmNsZUNoYW5nZShlbGxpcHNlQSxzbWFsbCxiaWcpXHJcbmNpcmNsZUNoYW5nZShlbGxpcHNlQixzbWFsbCxiaWcpXHJcbmNpcmNsZUNoYW5nZShlbGxpcHNlQyxzbWFsbCxiaWcpXHJcbmNpcmNsZUNoYW5nZShlbGxpcHNlRCxzbWFsbCxiaWcpXHJcbmNpcmNsZUNoYW5nZShlbGxpcHNlRSxzbWFsbCxiaWcpXHJcblxyXG5mdW5jdGlvbiBsaW5rQUNoYW5nZShvYmope1xyXG4gIG9iai5tb3VzZW92ZXIoZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGluaXRMaW5lQWxsKCk7XHJcbiAgICBsaW5lQS5hbmltYXRlKDEwMDApLmF0dHIoe1xyXG4gICAgICB4MjozMTYuOSxcclxuICAgICAgeTI6NDI2LjRcclxuICAgIH0pXHJcbiAgICBsaW5lQi5hbmltYXRlKDEwMDApLmF0dHIoe1xyXG4gICAgICB4MjoyNzYuOSxcclxuICAgICAgeTI6NDc2LjRcclxuICAgIH0pXHJcbiAgICBsaW5lQy5hbmltYXRlKDEwMDApLmF0dHIoe1xyXG4gICAgICB4MjoyNTIuOSxcclxuICAgICAgeTI6NTQzLjRcclxuICAgIH0pXHJcbiAgICBsaW5lRC5hbmltYXRlKDEwMDApLmF0dHIoe1xyXG4gICAgICB4MjozMzUsXHJcbiAgICAgIHkyOjU2Ni40XHJcbiAgICB9KVxyXG4gICAgbGluZUUuYW5pbWF0ZSgxMDAwKS5hdHRyKHtcclxuICAgICAgeDI6MjUyLjksXHJcbiAgICAgIHkyOjU0My40XHJcbiAgICB9KVxyXG4gICAgbGluZUYuYW5pbWF0ZSgxMDAwKS5hdHRyKHtcclxuICAgICAgeDI6Mjc2LjksXHJcbiAgICAgIHkyOjQ3Ni40XHJcbiAgICB9KVxyXG4gICAgbGluZUcuYW5pbWF0ZSgxMDAwKS5hdHRyKHtcclxuICAgICAgeDI6MzE2LjksXHJcbiAgICAgIHkyOjQyNi40XHJcbiAgICB9KVxyXG4gIH0pXHJcbiAgb2JqLm1vdXNlb3V0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBsaW5lQS5fdGltZWxpbmUuc3RvcCgpO1xyXG4gICAgbGluZUIuX3RpbWVsaW5lLnN0b3AoKTtcclxuICAgIGxpbmVDLl90aW1lbGluZS5zdG9wKCk7XHJcbiAgICBsaW5lRC5fdGltZWxpbmUuc3RvcCgpO1xyXG4gICAgbGluZUUuX3RpbWVsaW5lLnN0b3AoKTtcclxuICAgIGxpbmVGLl90aW1lbGluZS5zdG9wKCk7XHJcbiAgICBsaW5lRy5fdGltZWxpbmUuc3RvcCgpO1xyXG4gICAgaW5pdExpbmVBbGwoKTtcclxuICB9KVxyXG59XHJcbmxpbmtBQ2hhbmdlKGxpbmtBKVxyXG5saW5rQUNoYW5nZShsaW5rQilcclxubGlua0FDaGFuZ2UobGlua0MpXHJcbmxpbmtBQ2hhbmdlKGxpbmtEKVxyXG5saW5rQUNoYW5nZShsaW5rRSkiXSwic291cmNlUm9vdCI6IiJ9