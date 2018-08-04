// ==UserScript==
// @name         Github超链接跳转——CatJump
// @namespace    https://github.com/yhyzgn/CatJump
// @version      0.0.2
// @description  给Github各个超链接添加 target=_blank 属性
// @author       yhyzgn
// @match        *://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function C(arg) {
		return new Cat(arg);
	}

	function Cat(arg) {
		this.elements = [];

		if (typeof arg === "function") {
			this.ready(arg);
		} else if (typeof arg === "string") {
			this.elements = document.getElementsByTagName(arg);
		} else if (typeof arg === "object" && arg !== undefined) {
			this.elements.push(arg);
		}
	}

	Cat.prototype = {
		ready: function(fn) {
			if (document.readyState === "interactive" || document.readyState === "complete") {
				setTimeout(fn, 1);
			} else {
				this.evt(document, "DOMContentLoaded", fn);
			}
			return this;
		},
		length: function() {
			return this.elements.length;
		},
		get: function(index) {
			if (index === undefined) {
				return this.elements;
			}
			if (index < 0 || index >= this.length()) {
				return null;
			}
			return this.elements[index];
		},
		attr: function() {
			if (arguments.length === 1) {
				if (typeof arguments[0] === "object") {
					// 设置attr
					for (var i = 0; i < this.elements.length; i++) {
						for (var key in arguments[0]) {
							this.elements[i].setAttribute(key, arguments[0][key]);
						}
					}
				} else {
					// 获取attr
					return this.elements[0].getAttribute(arguments[0]);
				}
			} else {
				// 设置attr
				for (var j = 0; j < this.elements.length; j++) {
					this.elements[j].setAttribute(arguments[0], arguments[1]);
				}
			}
			return this;
		},
		evt: function(element, evt, fn) {
			element.addEventListener(evt, fn, false);
			return this;
		}
	};

	window.C = C;

	C(function() {
		var all = [];

		setInterval(function() {
			var as = C("a");
			var href;
			for (var i = 0; i < as.length(); i++) {
				href = C(as.get(i)).attr("href");
				if (href && href !== "/" && href !== location.href && href.indexOf("javascript:") === -1 && href.indexOf("#") !== 0) {
					if (all.indexOf(as.get(i)) > -1 && C(as.get(i)).attr("target") === "_blank") {
						continue;
					}
					C(as.get(i)).attr({
						"target": "_blank"
					});
					all.push(as.get(i));
				}
			}
		}, 200);
	});
})();
