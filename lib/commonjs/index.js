"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _IronSource = require("./IronSource");
Object.keys(_IronSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IronSource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IronSource[key];
    }
  });
});
var _events = require("./events");
Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _events[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _events[key];
    }
  });
});
var _models = require("./models");
Object.keys(_models).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _models[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _models[key];
    }
  });
});
var _ATTrackingManager = require("./ios14/ATTrackingManager");
Object.keys(_ATTrackingManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ATTrackingManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ATTrackingManager[key];
    }
  });
});
//# sourceMappingURL=index.js.map