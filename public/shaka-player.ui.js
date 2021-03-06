(function () {
    var innerGlobal = typeof window != "undefined" ? window : global;
    var exportTo = {};
    (function (window, global) {
        var n, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function (b, c, d) {
                b != Array.prototype && b != Object.prototype && (b[c] = d.value)
            },
            ba = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;

        function da() {
            da = function () {};
            ba.Symbol || (ba.Symbol = ea)
        }
        var ea = function () {
            var b = 0;
            return function (c) {
                return "jscomp_symbol_" + (c || "") + b++
            }
        }();

        function fa() {
            da();
            var b = ba.Symbol.iterator;
            b || (b = ba.Symbol.iterator = ba.Symbol("iterator"));
            "function" != typeof Array.prototype[b] && aa(Array.prototype, b, {
                configurable: !0,
                writable: !0,
                value: function () {
                    return ha(this)
                }
            });
            fa = function () {}
        }

        function ha(b) {
            var c = 0;
            return ia(function () {
                return c < b.length ? {
                    done: !1,
                    value: b[c++]
                } : {
                    done: !0
                }
            })
        }

        function ia(b) {
            fa();
            b = {
                next: b
            };
            b[ba.Symbol.iterator] = function () {
                return this
            };
            return b
        }

        function q(b) {
            fa();
            var c = b[Symbol.iterator];
            return c ? c.call(b) : ha(b)
        }

        function ja(b, c) {
            if (c) {
                for (var d = ba, e = b.split("."), f = 0; f < e.length - 1; f++) {
                    var g = e[f];
                    g in d || (d[g] = {});
                    d = d[g]
                }
                e = e[e.length - 1];
                f = d[e];
                g = c(f);
                g != f && null != g && aa(d, e, {
                    configurable: !0,
                    writable: !0,
                    value: g
                })
            }
        }
        ja("Promise", function (b) {
            function c(b) {
                this.b = 0;
                this.i = void 0;
                this.a = [];
                var c = this.c();
                try {
                    b(c.resolve, c.reject)
                } catch (l) {
                    c.reject(l)
                }
            }

            function d() {
                this.a = null
            }

            function e(b) {
                return b instanceof c ? b : new c(function (c) {
                    c(b)
                })
            }
            if (b) return b;
            d.prototype.b = function (b) {
                null == this.a && (this.a = [], this.f());
                this.a.push(b)
            };
            d.prototype.f = function () {
                var b = this;
                this.c(function () {
                    b.j()
                })
            };
            var f = ba.setTimeout;
            d.prototype.c = function (b) {
                f(b, 0)
            };
            d.prototype.j = function () {
                for (; this.a && this.a.length;) {
                    var b = this.a;
                    this.a = [];
                    for (var c = 0; c < b.length; ++c) {
                        var d = b[c];
                        b[c] = null;
                        try {
                            d()
                        } catch (m) {
                            this.i(m)
                        }
                    }
                }
                this.a = null
            };
            d.prototype.i = function (b) {
                this.c(function () {
                    throw b;
                })
            };
            c.prototype.c = function () {
                function b(b) {
                    return function (e) {
                        d || (d = !0, b.call(c, e))
                    }
                }
                var c = this,
                    d = !1;
                return {
                    resolve: b(this.u),
                    reject: b(this.f)
                }
            };
            c.prototype.u = function (b) {
                if (b === this) this.f(new TypeError("A Promise cannot resolve to itself"));
                else if (b instanceof c) this.v(b);
                else {
                    a: switch (typeof b) {
                        case "object":
                            var d = null != b;
                            break a;
                        case "function":
                            d = !0;
                            break a;
                        default:
                            d = !1
                    }
                    d ? this.o(b) : this.j(b)
                }
            };
            c.prototype.o = function (b) {
                var c = void 0;
                try {
                    c = b.then
                } catch (l) {
                    this.f(l);
                    return
                }
                "function" == typeof c ? this.w(c, b) : this.j(b)
            };
            c.prototype.f = function (b) {
                this.l(2, b)
            };
            c.prototype.j = function (b) {
                this.l(1, b)
            };
            c.prototype.l = function (b, c) {
                if (0 != this.b) throw Error("Cannot settle(" + b + ", " + c + "): Promise already settled in state" + this.b);
                this.b = b;
                this.i = c;
                this.m()
            };
            c.prototype.m = function () {
                if (null != this.a) {
                    for (var b = 0; b < this.a.length; ++b) g.b(this.a[b]);
                    this.a = null
                }
            };
            var g = new d;
            c.prototype.v = function (b) {
                var c = this.c();
                b.ic(c.resolve, c.reject)
            };
            c.prototype.w = function (b, c) {
                var d = this.c();
                try {
                    b.call(c, d.resolve, d.reject)
                } catch (m) {
                    d.reject(m)
                }
            };
            c.prototype.then = function (b, d) {
                function e(b, c) {
                    return "function" == typeof b ? function (c) {
                        try {
                            f(b(c))
                        } catch (K) {
                            g(K)
                        }
                    } : c
                }
                var f, g, h = new c(function (b, c) {
                    f = b;
                    g = c
                });
                this.ic(e(b, f), e(d, g));
                return h
            };
            c.prototype["catch"] = function (b) {
                return this.then(void 0, b)
            };
            c.prototype.ic = function (b, c) {
                function d() {
                    switch (e.b) {
                        case 1:
                            b(e.i);
                            break;
                        case 2:
                            c(e.i);
                            break;
                        default:
                            throw Error("Unexpected state: " + e.b);
                    }
                }
                var e = this;
                null == this.a ? g.b(d) : this.a.push(d)
            };
            c.resolve = e;
            c.reject = function (b) {
                return new c(function (c, d) {
                    d(b)
                })
            };
            c.race = function (b) {
                return new c(function (c, d) {
                    for (var f = q(b), g = f.next(); !g.done; g = f.next()) e(g.value).ic(c, d)
                })
            };
            c.all = function (b) {
                var d = q(b),
                    f = d.next();
                return f.done ? e([]) : new c(function (b, c) {
                    function g(c) {
                        return function (d) {
                            h[c] = d;
                            k--;
                            0 == k && b(h)
                        }
                    }
                    var h = [],
                        k = 0;
                    do h.push(void 0), k++, e(f.value).ic(g(h.length - 1), c), f = d.next();
                    while (!f.done)
                })
            };
            return c
        });
        ja("Promise.prototype.finally", function (b) {
            return b ? b : function (b) {
                return this.then(function (c) {
                    return Promise.resolve(b()).then(function () {
                        return c
                    })
                }, function (c) {
                    return Promise.resolve(b()).then(function () {
                        throw c;
                    })
                })
            }
        });

        function ka(b) {
            function c(c) {
                return b.next(c)
            }

            function d(c) {
                return b["throw"](c)
            }
            return new Promise(function (e, f) {
                function g(b) {
                    b.done ? e(b.value) : Promise.resolve(b.value).then(c, d).then(g, f)
                }
                g(b.next())
            })
        }

        function r(b) {
            return ka(b())
        }

        function la() {
            this.i = !1;
            this.c = null;
            this.F = void 0;
            this.s = 1;
            this.b = this.f = 0;
            this.l = this.a = null
        }

        function ma(b) {
            if (b.i) throw new TypeError("Generator is already running");
            b.i = !0
        }
        la.prototype.j = function (b) {
            this.F = b
        };

        function na(b, c) {
            b.a = {
                fe: c,
                we: !0
            };
            b.s = b.f || b.b
        }
        la.prototype["return"] = function (b) {
            this.a = {
                "return": b
            };
            this.s = this.b
        };

        function t(b, c, d) {
            b.s = d;
            return {
                value: c
            }
        }
        la.prototype.I = function (b) {
            this.s = b
        };

        function oa(b, c, d) {
            b.f = c;
            void 0 != d && (b.b = d)
        }

        function pa(b, c) {
            b.f = 0;
            b.b = c || 0
        }

        function qa(b, c) {
            b.s = c;
            b.f = 0
        }

        function ra(b) {
            b.f = 0;
            var c = b.a.fe;
            b.a = null;
            return c
        }

        function ta(b) {
            b.l = [b.a];
            b.f = 0;
            b.b = 0
        }

        function ua(b, c) {
            var d = b.l.splice(0)[0];
            (d = b.a = b.a || d) ? d.we ? b.s = b.f || b.b : void 0 != d.I && b.b < d.I ? (b.s = d.I, b.a = null) : b.s = b.b: b.s = c
        }

        function va(b) {
            this.a = new la;
            this.b = b
        }

        function wa(b, c) {
            ma(b.a);
            var d = b.a.c;
            if (d) return xa(b, "return" in d ? d["return"] : function (b) {
                return {
                    value: b,
                    done: !0
                }
            }, c, b.a["return"]);
            b.a["return"](c);
            return ya(b)
        }

        function xa(b, c, d, e) {
            try {
                var f = c.call(b.a.c, d);
                if (!(f instanceof Object)) throw new TypeError("Iterator result " + f + " is not an object");
                if (!f.done) return b.a.i = !1, f;
                var g = f.value
            } catch (h) {
                return b.a.c = null, na(b.a, h), ya(b)
            }
            b.a.c = null;
            e.call(b.a, g);
            return ya(b)
        }

        function ya(b) {
            for (; b.a.s;) try {
                var c = b.b(b.a);
                if (c) return b.a.i = !1, {
                    value: c.value,
                    done: !1
                }
            } catch (d) {
                b.a.F = void 0, na(b.a, d)
            }
            b.a.i = !1;
            if (b.a.a) {
                c = b.a.a;
                b.a.a = null;
                if (c.we) throw c.fe;
                return {
                    value: c["return"],
                    done: !0
                }
            }
            return {
                value: void 0,
                done: !0
            }
        }

        function Aa(b) {
            this.next = function (c) {
                ma(b.a);
                b.a.c ? c = xa(b, b.a.c.next, c, b.a.j) : (b.a.j(c), c = ya(b));
                return c
            };
            this["throw"] = function (c) {
                ma(b.a);
                b.a.c ? c = xa(b, b.a.c["throw"], c, b.a.j) : (na(b.a, c), c = ya(b));
                return c
            };
            this["return"] = function (c) {
                return wa(b, c)
            };
            fa();
            this[Symbol.iterator] = function () {
                return this
            }
        }

        function v(b, c) {
            Aa.prototype = b.prototype;
            return new Aa(new va(c))
        }

        function Ba(b, c) {
            return Object.prototype.hasOwnProperty.call(b, c)
        }
        ja("WeakMap", function (b) {
            function c(b) {
                this.a = (g += Math.random() + 1).toString();
                if (b) {
                    da();
                    fa();
                    b = q(b);
                    for (var c; !(c = b.next()).done;) c = c.value, this.set(c[0], c[1])
                }
            }

            function d(b) {
                Ba(b, f) || aa(b, f, {
                    value: {}
                })
            }

            function e(b) {
                var c = Object[b];
                c && (Object[b] = function (b) {
                    d(b);
                    return c(b)
                })
            }
            if (function () {
                    if (!b || !Object.seal) return !1;
                    try {
                        var c = Object.seal({}),
                            d = Object.seal({}),
                            e = new b([
                                [c, 2],
                                [d, 3]
                            ]);
                        if (2 != e.get(c) || 3 != e.get(d)) return !1;
                        e["delete"](c);
                        e.set(d, 4);
                        return !e.has(c) && 4 == e.get(d)
                    } catch (m) {
                        return !1
                    }
                }()) return b;
            var f = "$jscomp_hidden_" + Math.random();
            e("freeze");
            e("preventExtensions");
            e("seal");
            var g = 0;
            c.prototype.set = function (b, c) {
                d(b);
                if (!Ba(b, f)) throw Error("WeakMap key fail: " + b);
                b[f][this.a] = c;
                return this
            };
            c.prototype.get = function (b) {
                return Ba(b, f) ? b[f][this.a] : void 0
            };
            c.prototype.has = function (b) {
                return Ba(b, f) && Ba(b[f], this.a)
            };
            c.prototype["delete"] = function (b) {
                return Ba(b, f) && Ba(b[f], this.a) ? delete b[f][this.a] : !1
            };
            return c
        });
        ja("Map", function (b) {
            function c() {
                var b = {};
                return b.Va = b.next = b.head = b
            }

            function d(b, c) {
                var d = b.a;
                return ia(function () {
                    if (d) {
                        for (; d.head != b.a;) d = d.Va;
                        for (; d.next != d.head;) return d = d.next, {
                            done: !1,
                            value: c(d)
                        };
                        d = null
                    }
                    return {
                        done: !0,
                        value: void 0
                    }
                })
            }

            function e(b, c) {
                var d = c && typeof c;
                "object" == d || "function" == d ? g.has(c) ? d = g.get(c) : (d = "" + ++h, g.set(c, d)) : d = "p_" + c;
                var e = b.b[d];
                if (e && Ba(b.b, d))
                    for (var f = 0; f < e.length; f++) {
                        var k = e[f];
                        if (c !== c && k.key !== k.key || c === k.key) return {
                            id: d,
                            list: e,
                            index: f,
                            ea: k
                        }
                    }
                return {
                    id: d,
                    list: e,
                    index: -1,
                    ea: void 0
                }
            }

            function f(b) {
                this.b = {};
                this.a = c();
                this.size = 0;
                if (b) {
                    b = q(b);
                    for (var d; !(d = b.next()).done;) d = d.value, this.set(d[0], d[1])
                }
            }
            if (function () {
                    if (!b || "function" != typeof b || !b.prototype.entries || "function" != typeof Object.seal) return !1;
                    try {
                        var c = Object.seal({
                                x: 4
                            }),
                            d = new b(q([
                                [c, "s"]
                            ]));
                        if ("s" != d.get(c) || 1 != d.size || d.get({
                                x: 4
                            }) || d.set({
                                x: 4
                            }, "t") != d || 2 != d.size) return !1;
                        var e = d.entries(),
                            f = e.next();
                        if (f.done || f.value[0] != c || "s" != f.value[1]) return !1;
                        f = e.next();
                        return f.done || 4 != f.value[0].x ||
                            "t" != f.value[1] || !e.next().done ? !1 : !0
                    } catch (u) {
                        return !1
                    }
                }()) return b;
            da();
            fa();
            var g = new WeakMap;
            f.prototype.set = function (b, c) {
                var d = e(this, b);
                d.list || (d.list = this.b[d.id] = []);
                d.ea ? d.ea.value = c : (d.ea = {
                    next: this.a,
                    Va: this.a.Va,
                    head: this.a,
                    key: b,
                    value: c
                }, d.list.push(d.ea), this.a.Va.next = d.ea, this.a.Va = d.ea, this.size++);
                return this
            };
            f.prototype["delete"] = function (b) {
                b = e(this, b);
                return b.ea && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.b[b.id], b.ea.Va.next = b.ea.next, b.ea.next.Va = b.ea.Va,
                    b.ea.head = null, this.size--, !0) : !1
            };
            f.prototype.clear = function () {
                this.b = {};
                this.a = this.a.Va = c();
                this.size = 0
            };
            f.prototype.has = function (b) {
                return !!e(this, b).ea
            };
            f.prototype.get = function (b) {
                return (b = e(this, b).ea) && b.value
            };
            f.prototype.entries = function () {
                return d(this, function (b) {
                    return [b.key, b.value]
                })
            };
            f.prototype.keys = function () {
                return d(this, function (b) {
                    return b.key
                })
            };
            f.prototype.values = function () {
                return d(this, function (b) {
                    return b.value
                })
            };
            f.prototype.forEach = function (b, c) {
                for (var d = this.entries(),
                        e; !(e = d.next()).done;) e = e.value, b.call(c, e[1], e[0], this)
            };
            f.prototype[Symbol.iterator] = f.prototype.entries;
            var h = 0;
            return f
        });
        ja("Set", function (b) {
            function c(b) {
                this.a = new Map;
                if (b) {
                    b = q(b);
                    for (var c; !(c = b.next()).done;) this.add(c.value)
                }
                this.size = this.a.size
            }
            if (function () {
                    if (!b || "function" != typeof b || !b.prototype.entries || "function" != typeof Object.seal) return !1;
                    try {
                        var c = Object.seal({
                                x: 4
                            }),
                            e = new b(q([c]));
                        if (!e.has(c) || 1 != e.size || e.add(c) != e || 1 != e.size || e.add({
                                x: 4
                            }) != e || 2 != e.size) return !1;
                        var f = e.entries(),
                            g = f.next();
                        if (g.done || g.value[0] != c || g.value[1] != c) return !1;
                        g = f.next();
                        return g.done || g.value[0] == c || 4 != g.value[0].x ||
                            g.value[1] != g.value[0] ? !1 : f.next().done
                    } catch (h) {
                        return !1
                    }
                }()) return b;
            da();
            fa();
            c.prototype.add = function (b) {
                this.a.set(b, b);
                this.size = this.a.size;
                return this
            };
            c.prototype["delete"] = function (b) {
                b = this.a["delete"](b);
                this.size = this.a.size;
                return b
            };
            c.prototype.clear = function () {
                this.a.clear();
                this.size = 0
            };
            c.prototype.has = function (b) {
                return this.a.has(b)
            };
            c.prototype.entries = function () {
                return this.a.entries()
            };
            c.prototype.values = function () {
                return this.a.values()
            };
            c.prototype.keys = c.prototype.values;
            c.prototype[Symbol.iterator] = c.prototype.values;
            c.prototype.forEach = function (b, c) {
                var d = this;
                this.a.forEach(function (e) {
                    return b.call(c, e, e, d)
                })
            };
            return c
        });

        function Ca(b, c, d) {
            b instanceof String && (b = String(b));
            for (var e = b.length, f = 0; f < e; f++) {
                var g = b[f];
                if (c.call(d, g, f, b)) return {
                    re: f,
                    nf: g
                }
            }
            return {
                re: -1,
                nf: void 0
            }
        }
        ja("Array.prototype.findIndex", function (b) {
            return b ? b : function (b, d) {
                return Ca(this, b, d).re
            }
        });

        function Da(b, c) {
            fa();
            b instanceof String && (b += "");
            var d = 0,
                e = {
                    next: function () {
                        if (d < b.length) {
                            var f = d++;
                            return {
                                value: c(f, b[f]),
                                done: !1
                            }
                        }
                        e.next = function () {
                            return {
                                done: !0,
                                value: void 0
                            }
                        };
                        return e.next()
                    }
                };
            e[Symbol.iterator] = function () {
                return e
            };
            return e
        }
        ja("Array.prototype.keys", function (b) {
            return b ? b : function () {
                return Da(this, function (b) {
                    return b
                })
            }
        });
        ja("Array.from", function (b) {
            return b ? b : function (b, d, e) {
                fa();
                d = null != d ? d : function (b) {
                    return b
                };
                var c = [],
                    g = b[Symbol.iterator];
                if ("function" == typeof g)
                    for (b = g.call(b); !(g = b.next()).done;) c.push(d.call(e, g.value));
                else {
                    g = b.length;
                    for (var h = 0; h < g; h++) c.push(d.call(e, b[h]))
                }
                return c
            }
        });
        ja("Object.is", function (b) {
            return b ? b : function (b, d) {
                return b === d ? 0 !== b || 1 / b === 1 / d : b !== b && d !== d
            }
        });
        ja("Array.prototype.includes", function (b) {
            return b ? b : function (b, d) {
                var c = this;
                c instanceof String && (c = String(c));
                var f = c.length,
                    g = d || 0;
                for (0 > g && (g = Math.max(g + f, 0)); g < f; g++) {
                    var h = c[g];
                    if (h === b || Object.is(h, b)) return !0
                }
                return !1
            }
        });

        function Ea(b, c, d) {
            if (null == b) throw new TypeError("The 'this' value for String.prototype." + d + " must not be null or undefined");
            if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + d + " must not be a regular expression");
            return b + ""
        }
        ja("String.prototype.includes", function (b) {
            return b ? b : function (b, d) {
                return -1 !== Ea(this, b, "includes").indexOf(b, d || 0)
            }
        });
        ja("Array.prototype.find", function (b) {
            return b ? b : function (b, d) {
                return Ca(this, b, d).nf
            }
        });
        ja("String.prototype.startsWith", function (b) {
            return b ? b : function (b, d) {
                for (var c = Ea(this, b, "startsWith"), f = c.length, g = b.length, h = Math.max(0, Math.min(d | 0, c.length)), k = 0; k < g && h < f;)
                    if (c[h++] != b[k++]) return !1;
                return k >= g
            }
        });
        var Fa = this;
        Fa.a = !0;

        function y(b, c) {
            var d = b.split("."),
                e = Fa;
            d[0] in e || !e.execScript || e.execScript("var " + d[0]);
            for (var f; d.length && (f = d.shift());) d.length || void 0 === c ? e[f] ? e = e[f] : e = e[f] = {} : e[f] = c
        }

        function Ga(b, c) {
            function d() {}
            d.prototype = c.prototype;
            b.Fi = c.prototype;
            b.prototype = new d;
            b.prototype.constructor = b;
            b.xi = function (b, d, g) {
                return c.prototype[d].apply(b, Array.prototype.slice.call(arguments, 2))
            }
        };
        /*

         Copyright 2016 Google Inc.

         Licensed under the Apache License, Version 2.0 (the "License");
         you may not use this file except in compliance with the License.
         You may obtain a copy of the License at

             http://www.apache.org/licenses/LICENSE-2.0

         Unless required by applicable law or agreed to in writing, software
         distributed under the License is distributed on an "AS IS" BASIS,
         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         See the License for the specific language governing permissions and
         limitations under the License.
        */
        function Ha(b) {
            this.c = Math.exp(Math.log(.5) / b);
            this.b = this.a = 0
        }

        function Ia(b, c, d) {
            var e = Math.pow(b.c, c);
            d = d * (1 - e) + e * b.a;
            isNaN(d) || (b.a = d, b.b += c)
        }

        function Ja(b) {
            return b.a / (1 - Math.pow(b.c, b.b))
        };

        function Ka() {
            this.b = new Ha(2);
            this.c = new Ha(5);
            this.a = 0
        }
        Ka.prototype.getBandwidthEstimate = function (b) {
            return 128E3 > this.a ? b : Math.min(Ja(this.b), Ja(this.c))
        };

        function La() {}

        function Ma() {}
        window.console && window.console.log.bind && (La = console.warn.bind(console));
        var Na = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;

        function Oa(b) {
            var c;
            b instanceof Oa ? (Pa(this, b.Ia), this.rb = b.rb, this.Oa = b.Oa, Qa(this, b.Fb), this.Aa = b.Aa, Ra(this, b.a.clone()), this.gb = b.gb) : b && (c = String(b).match(Na)) ? (Pa(this, c[1] || "", !0), this.rb = Sa(c[2] || ""), this.Oa = Sa(c[3] || "", !0), Qa(this, c[4]), this.Aa = Sa(c[5] || "", !0), Ra(this, c[6] || "", !0), this.gb = Sa(c[7] || "")) : this.a = new Ta(null)
        }
        n = Oa.prototype;
        n.Ia = "";
        n.rb = "";
        n.Oa = "";
        n.Fb = null;
        n.Aa = "";
        n.gb = "";
        n.toString = function () {
            var b = [],
                c = this.Ia;
            c && b.push(Ua(c, Va, !0), ":");
            if (c = this.Oa) {
                b.push("//");
                var d = this.rb;
                d && b.push(Ua(d, Va, !0), "@");
                b.push(encodeURIComponent(c).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
                c = this.Fb;
                null != c && b.push(":", String(c))
            }
            if (c = this.Aa) this.Oa && "/" != c.charAt(0) && b.push("/"), b.push(Ua(c, "/" == c.charAt(0) ? Wa : Za, !0));
            (c = this.a.toString()) && b.push("?", c);
            (c = this.gb) && b.push("#", Ua(c, $a));
            return b.join("")
        };
        n.resolve = function (b) {
            var c = this.clone();
            "data" === c.Ia && (c = new Oa);
            var d = !!b.Ia;
            d ? Pa(c, b.Ia) : d = !!b.rb;
            d ? c.rb = b.rb : d = !!b.Oa;
            d ? c.Oa = b.Oa : d = null != b.Fb;
            var e = b.Aa;
            if (d) Qa(c, b.Fb);
            else if (d = !!b.Aa) {
                if ("/" != e.charAt(0))
                    if (this.Oa && !this.Aa) e = "/" + e;
                    else {
                        var f = c.Aa.lastIndexOf("/"); - 1 != f && (e = c.Aa.substr(0, f + 1) + e)
                    } if (".." == e || "." == e) e = "";
                else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                    f = 0 == e.lastIndexOf("/", 0);
                    e = e.split("/");
                    for (var g = [], h = 0; h < e.length;) {
                        var k = e[h++];
                        "." == k ? f && h == e.length && g.push("") : ".." ==
                            k ? ((1 < g.length || 1 == g.length && "" != g[0]) && g.pop(), f && h == e.length && g.push("")) : (g.push(k), f = !0)
                    }
                    e = g.join("/")
                }
            }
            d ? c.Aa = e : d = "" !== b.a.toString();
            d ? Ra(c, b.a.clone()) : d = !!b.gb;
            d && (c.gb = b.gb);
            return c
        };
        n.clone = function () {
            return new Oa(this)
        };

        function Pa(b, c, d) {
            b.Ia = d ? Sa(c, !0) : c;
            b.Ia && (b.Ia = b.Ia.replace(/:$/, ""))
        }

        function Qa(b, c) {
            if (c) {
                c = Number(c);
                if (isNaN(c) || 0 > c) throw Error("Bad port number " + c);
                b.Fb = c
            } else b.Fb = null
        }

        function Ra(b, c, d) {
            c instanceof Ta ? b.a = c : (d || (c = Ua(c, ab)), b.a = new Ta(c))
        }

        function Sa(b, c) {
            return b ? c ? decodeURI(b) : decodeURIComponent(b) : ""
        }

        function Ua(b, c, d) {
            return "string" == typeof b ? (b = encodeURI(b).replace(c, bb), d && (b = b.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), b) : null
        }

        function bb(b) {
            b = b.charCodeAt(0);
            return "%" + (b >> 4 & 15).toString(16) + (b & 15).toString(16)
        }
        var Va = /[#\/\?@]/g,
            Za = /[#\?:]/g,
            Wa = /[#\?]/g,
            ab = /[#\?@]/g,
            $a = /#/g;

        function Ta(b) {
            this.a = b || null
        }
        n = Ta.prototype;
        n.za = null;
        n.kc = null;
        n.add = function (b, c) {
            if (!this.za && (this.za = {}, this.kc = 0, this.a))
                for (var d = this.a.split("&"), e = 0; e < d.length; e++) {
                    var f = d[e].indexOf("="),
                        g = null;
                    if (0 <= f) {
                        var h = d[e].substring(0, f);
                        g = d[e].substring(f + 1)
                    } else h = d[e];
                    h = decodeURIComponent(h.replace(/\+/g, " "));
                    g = g || "";
                    this.add(h, decodeURIComponent(g.replace(/\+/g, " ")))
                }
            this.a = null;
            (d = this.za.hasOwnProperty(b) && this.za[b]) || (this.za[b] = d = []);
            d.push(c);
            this.kc++;
            return this
        };
        n.toString = function () {
            if (this.a) return this.a;
            if (!this.za) return "";
            var b = [],
                c;
            for (c in this.za)
                for (var d = encodeURIComponent(c), e = this.za[c], f = 0; f < e.length; f++) {
                    var g = d;
                    "" !== e[f] && (g += "=" + encodeURIComponent(e[f]));
                    b.push(g)
                }
            return this.a = b.join("&")
        };
        n.clone = function () {
            var b = new Ta;
            b.a = this.a;
            if (this.za) {
                var c = {},
                    d;
                for (d in this.za) c[d] = this.za[d].concat();
                b.za = c;
                b.kc = this.kc
            }
            return b
        };

        function z() {
            var b, c, d = new Promise(function (d, f) {
                b = d;
                c = f
            });
            d.resolve = b;
            d.reject = c;
            return d
        }
        z.prototype.resolve = function () {};
        z.prototype.reject = function () {};

        function cb(b, c) {
            var d = db();
            this.l = null == b.maxAttempts ? d.maxAttempts : b.maxAttempts;
            this.f = null == b.baseDelay ? d.baseDelay : b.baseDelay;
            this.j = null == b.fuzzFactor ? d.fuzzFactor : b.fuzzFactor;
            this.i = null == b.backoffFactor ? d.backoffFactor : b.backoffFactor;
            this.a = 0;
            this.b = this.f;
            if (this.c = void 0 === c ? !1 : c) this.a = 1
        }

        function eb(b) {
            if (b.a >= b.l)
                if (b.c) b.a = 1, b.b = b.f;
                else return Promise.reject();
            var c = new z;
            b.a ? (window.setTimeout(c.resolve, b.b * (1 + (2 * Math.random() - 1) * b.j)), b.b *= b.i) : c.resolve();
            b.a++;
            return c
        }

        function db() {
            return {
                maxAttempts: 2,
                baseDelay: 1E3,
                backoffFactor: 2,
                fuzzFactor: .5,
                timeout: 0
            }
        };

        function A(b, c, d, e) {
            for (var f = [], g = 3; g < arguments.length; ++g) f[g - 3] = arguments[g];
            this.severity = b;
            this.category = c;
            this.code = d;
            this.data = f;
            this.handled = !1
        }
        y("shaka.util.Error", A);
        A.prototype.toString = function () {
            return "shaka.util.Error " + JSON.stringify(this, null, "  ")
        };
        A.Severity = {
            RECOVERABLE: 1,
            CRITICAL: 2
        };
        A.Category = {
            NETWORK: 1,
            TEXT: 2,
            MEDIA: 3,
            MANIFEST: 4,
            STREAMING: 5,
            DRM: 6,
            PLAYER: 7,
            CAST: 8,
            STORAGE: 9
        };
        A.Code = {
            UNSUPPORTED_SCHEME: 1E3,
            BAD_HTTP_STATUS: 1001,
            HTTP_ERROR: 1002,
            TIMEOUT: 1003,
            MALFORMED_DATA_URI: 1004,
            UNKNOWN_DATA_URI_ENCODING: 1005,
            REQUEST_FILTER_ERROR: 1006,
            RESPONSE_FILTER_ERROR: 1007,
            MALFORMED_TEST_URI: 1008,
            UNEXPECTED_TEST_REQUEST: 1009,
            INVALID_TEXT_HEADER: 2E3,
            INVALID_TEXT_CUE: 2001,
            UNABLE_TO_DETECT_ENCODING: 2003,
            BAD_ENCODING: 2004,
            INVALID_XML: 2005,
            INVALID_MP4_TTML: 2007,
            INVALID_MP4_VTT: 2008,
            UNABLE_TO_EXTRACT_CUE_START_TIME: 2009,
            BUFFER_READ_OUT_OF_BOUNDS: 3E3,
            JS_INTEGER_OVERFLOW: 3001,
            EBML_OVERFLOW: 3002,
            EBML_BAD_FLOATING_POINT_SIZE: 3003,
            MP4_SIDX_WRONG_BOX_TYPE: 3004,
            MP4_SIDX_INVALID_TIMESCALE: 3005,
            MP4_SIDX_TYPE_NOT_SUPPORTED: 3006,
            WEBM_CUES_ELEMENT_MISSING: 3007,
            WEBM_EBML_HEADER_ELEMENT_MISSING: 3008,
            WEBM_SEGMENT_ELEMENT_MISSING: 3009,
            WEBM_INFO_ELEMENT_MISSING: 3010,
            WEBM_DURATION_ELEMENT_MISSING: 3011,
            WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING: 3012,
            WEBM_CUE_TIME_ELEMENT_MISSING: 3013,
            MEDIA_SOURCE_OPERATION_FAILED: 3014,
            MEDIA_SOURCE_OPERATION_THREW: 3015,
            VIDEO_ERROR: 3016,
            QUOTA_EXCEEDED_ERROR: 3017,
            TRANSMUXING_FAILED: 3018,
            UNABLE_TO_GUESS_MANIFEST_TYPE: 4E3,
            DASH_INVALID_XML: 4001,
            DASH_NO_SEGMENT_INFO: 4002,
            DASH_EMPTY_ADAPTATION_SET: 4003,
            DASH_EMPTY_PERIOD: 4004,
            DASH_WEBM_MISSING_INIT: 4005,
            DASH_UNSUPPORTED_CONTAINER: 4006,
            DASH_PSSH_BAD_ENCODING: 4007,
            DASH_NO_COMMON_KEY_SYSTEM: 4008,
            DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED: 4009,
            DASH_CONFLICTING_KEY_IDS: 4010,
            UNPLAYABLE_PERIOD: 4011,
            RESTRICTIONS_CANNOT_BE_MET: 4012,
            NO_PERIODS: 4014,
            HLS_PLAYLIST_HEADER_MISSING: 4015,
            INVALID_HLS_TAG: 4016,
            HLS_INVALID_PLAYLIST_HIERARCHY: 4017,
            DASH_DUPLICATE_REPRESENTATION_ID: 4018,
            HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND: 4020,
            HLS_COULD_NOT_GUESS_MIME_TYPE: 4021,
            HLS_MASTER_PLAYLIST_NOT_PROVIDED: 4022,
            HLS_REQUIRED_ATTRIBUTE_MISSING: 4023,
            HLS_REQUIRED_TAG_MISSING: 4024,
            HLS_COULD_NOT_GUESS_CODECS: 4025,
            HLS_KEYFORMATS_NOT_SUPPORTED: 4026,
            DASH_UNSUPPORTED_XLINK_ACTUATE: 4027,
            DASH_XLINK_DEPTH_LIMIT: 4028,
            HLS_COULD_NOT_PARSE_SEGMENT_START_TIME: 4030,
            CONTENT_UNSUPPORTED_BY_BROWSER: 4032,
            CANNOT_ADD_EXTERNAL_TEXT_TO_LIVE_STREAM: 4033,
            INVALID_STREAMS_CHOSEN: 5005,
            NO_RECOGNIZED_KEY_SYSTEMS: 6E3,
            REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE: 6001,
            FAILED_TO_CREATE_CDM: 6002,
            FAILED_TO_ATTACH_TO_VIDEO: 6003,
            INVALID_SERVER_CERTIFICATE: 6004,
            FAILED_TO_CREATE_SESSION: 6005,
            FAILED_TO_GENERATE_LICENSE_REQUEST: 6006,
            LICENSE_REQUEST_FAILED: 6007,
            LICENSE_RESPONSE_REJECTED: 6008,
            ENCRYPTED_CONTENT_WITHOUT_DRM_INFO: 6010,
            NO_LICENSE_SERVER_GIVEN: 6012,
            OFFLINE_SESSION_REMOVED: 6013,
            EXPIRED: 6014,
            LOAD_INTERRUPTED: 7E3,
            OPERATION_ABORTED: 7001,
            NO_VIDEO_ELEMENT: 7002,
            CAST_API_UNAVAILABLE: 8E3,
            NO_CAST_RECEIVERS: 8001,
            ALREADY_CASTING: 8002,
            UNEXPECTED_CAST_ERROR: 8003,
            CAST_CANCELED_BY_USER: 8004,
            CAST_CONNECTION_TIMED_OUT: 8005,
            CAST_RECEIVER_APP_UNAVAILABLE: 8006,
            STORAGE_NOT_SUPPORTED: 9E3,
            INDEXED_DB_ERROR: 9001,
            DEPRECATED_OPERATION_ABORTED: 9002,
            REQUESTED_ITEM_NOT_FOUND: 9003,
            MALFORMED_OFFLINE_URI: 9004,
            CANNOT_STORE_LIVE_OFFLINE: 9005,
            STORE_ALREADY_IN_PROGRESS: 9006,
            NO_INIT_DATA_FOR_OFFLINE: 9007,
            LOCAL_PLAYER_INSTANCE_REQUIRED: 9008,
            NEW_KEY_OPERATION_NOT_SUPPORTED: 9011,
            KEY_NOT_FOUND: 9012,
            MISSING_STORAGE_CELL: 9013
        };

        function C(b, c) {
            this.promise = b;
            this.b = c;
            this.a = !1
        }
        y("shaka.util.AbortableOperation", C);

        function fb(b) {
            return new C(Promise.reject(b), function () {
                return Promise.resolve()
            })
        }
        C.failed = fb;

        function gb() {
            var b = Promise.reject(new A(2, 7, 7001));
            b["catch"](function () {});
            return new C(b, function () {
                return Promise.resolve()
            })
        }
        C.aborted = gb;

        function hb(b) {
            return new C(Promise.resolve(b), function () {
                return Promise.resolve()
            })
        }
        C.completed = hb;

        function jb(b) {
            return new C(b, function () {
                return b["catch"](function () {})
            })
        }
        C.notAbortable = jb;
        C.prototype.abort = function () {
            this.a = !0;
            return this.b()
        };
        C.prototype.abort = C.prototype.abort;

        function kb(b) {
            return new C(Promise.all(b.map(function (b) {
                return b.promise
            })), function () {
                return Promise.all(b.map(function (b) {
                    return b.abort()
                }))
            })
        }
        C.all = kb;
        C.prototype["finally"] = function (b) {
            this.promise.then(function () {
                return b(!0)
            }, function () {
                return b(!1)
            });
            return this
        };
        C.prototype["finally"] = C.prototype["finally"];
        C.prototype.wa = function (b, c) {
            function d() {
                f.reject(new A(2, 7, 7001));
                return e.abort()
            }
            var e = this,
                f = new z;
            this.promise.then(function (c) {
                e.a ? f.reject(new A(2, 7, 7001)) : b ? d = lb(b, c, f) : f.resolve(c)
            }, function (b) {
                c ? d = lb(c, b, f) : f.reject(b)
            });
            return new C(f, function () {
                return d()
            })
        };
        C.prototype.chain = C.prototype.wa;

        function lb(b, c, d) {
            try {
                var e = b(c);
                if (e && e.promise && e.abort) return d.resolve(e.promise),
                    function () {
                        return e.abort()
                    };
                d.resolve(e);
                return function () {
                    return Promise.resolve(e).then(function () {})["catch"](function () {})
                }
            } catch (f) {
                return d.reject(f),
                    function () {
                        return Promise.resolve()
                    }
            }
        };

        function D(b, c) {
            c = void 0 === c ? {} : c;
            for (var d in c) this[d] = c[d];
            this.defaultPrevented = this.cancelable = this.bubbles = !1;
            this.timeStamp = window.performance && window.performance.now ? window.performance.now() : Date.now();
            this.type = b;
            this.isTrusted = !1;
            this.target = this.currentTarget = null;
            this.a = !1
        }
        D.prototype.preventDefault = function () {
            this.cancelable && (this.defaultPrevented = !0)
        };
        D.prototype.stopImmediatePropagation = function () {
            this.a = !0
        };
        D.prototype.stopPropagation = function () {};

        function mb() {
            this.a = {}
        }
        n = mb.prototype;
        n.push = function (b, c) {
            this.a.hasOwnProperty(b) ? this.a[b].push(c) : this.a[b] = [c]
        };
        n.get = function (b) {
            return (b = this.a[b]) ? b.slice() : null
        };
        n.getAll = function () {
            var b = [],
                c;
            for (c in this.a) b.push.apply(b, this.a[c]);
            return b
        };
        n.remove = function (b, c) {
            var d = this.a[b];
            if (d)
                for (var e = 0; e < d.length; ++e) d[e] == c && (d.splice(e, 1), --e)
        };
        n.forEach = function (b) {
            for (var c in this.a) b(c, this.a[c])
        };

        function E() {
            this.Dd = new mb;
            this.wc = this
        }
        E.prototype.addEventListener = function (b, c) {
            this.Dd.push(b, c)
        };
        E.prototype.removeEventListener = function (b, c) {
            this.Dd.remove(b, c)
        };
        E.prototype.dispatchEvent = function (b) {
            for (var c = this.Dd.get(b.type) || [], d = 0; d < c.length; ++d) {
                b.target = this.wc;
                b.currentTarget = this.wc;
                var e = c[d];
                try {
                    e.handleEvent ? e.handleEvent(b) : e.call(this, b)
                } catch (f) {}
                if (b.a) break
            }
            return b.defaultPrevented
        };

        function nb(b) {
            function c(b) {
                switch (typeof b) {
                    case "undefined":
                    case "boolean":
                    case "number":
                    case "string":
                    case "symbol":
                    case "function":
                        return b;
                    default:
                        if (!b || b.buffer && b.buffer.constructor == ArrayBuffer) return b;
                        if (d.has(b)) return null;
                        var e = b.constructor == Array;
                        if (b.constructor != Object && !e) return null;
                        d.add(b);
                        var g = e ? [] : {},
                            h;
                        for (h in b) g[h] = c(b[h]);
                        e && (g.length = b.length);
                        return g
                }
            }
            var d = new Set;
            return c(b)
        };

        function ob(b, c) {
            return "number" === typeof b && "number" === typeof c && isNaN(b) && isNaN(c) ? !0 : b === c
        }

        function pb(b, c) {
            var d = b.indexOf(c); - 1 < d && b.splice(d, 1)
        }

        function qb(b, c) {
            var d = 0;
            b.forEach(function (b) {
                d += c(b) ? 1 : 0
            });
            return d
        }

        function rb(b, c, d) {
            d || (d = ob);
            if (b.length != c.length) return !1;
            c = c.slice();
            var e = {};
            b = q(b);
            for (var f = b.next(); !f.done; e = {
                    item: e.item
                }, f = b.next()) {
                e.item = f.value;
                f = c.findIndex(function (b) {
                    return function (c) {
                        return d(b.item, c)
                    }
                }(e));
                if (-1 == f) return !1;
                c[f] = c[c.length - 1];
                c.pop()
            }
            return 0 == c.length
        };

        function sb() {
            this.a = []
        }

        function tb(b, c) {
            b.a.push(c["finally"](function () {
                pb(b.a, c)
            }))
        }
        sb.prototype.destroy = function () {
            var b = [];
            this.a.forEach(function (c) {
                c.promise["catch"](function () {});
                b.push(c.abort())
            });
            this.a = [];
            return Promise.all(b)
        };

        function F(b) {
            E.call(this);
            this.f = !1;
            this.i = new sb;
            this.a = new Set;
            this.b = new Set;
            this.c = b || null
        }
        Ga(F, E);
        y("shaka.net.NetworkingEngine", F);
        F.RequestType = {
            MANIFEST: 0,
            SEGMENT: 1,
            LICENSE: 2,
            APP: 3,
            TIMING: 4
        };
        F.PluginPriority = {
            FALLBACK: 1,
            PREFERRED: 2,
            APPLICATION: 3
        };
        var ub = {};

        function xb(b, c, d) {
            d = d || 3;
            var e = ub[b];
            if (!e || d >= e.priority) ub[b] = {
                priority: d,
                Fh: c
            }
        }
        F.registerScheme = xb;
        F.unregisterScheme = function (b) {
            delete ub[b]
        };
        F.prototype.Gh = function (b) {
            this.a.add(b)
        };
        F.prototype.registerRequestFilter = F.prototype.Gh;
        F.prototype.ii = function (b) {
            this.a["delete"](b)
        };
        F.prototype.unregisterRequestFilter = F.prototype.ii;
        F.prototype.Sf = function () {
            this.a.clear()
        };
        F.prototype.clearAllRequestFilters = F.prototype.Sf;
        F.prototype.Hh = function (b) {
            this.b.add(b)
        };
        F.prototype.registerResponseFilter = F.prototype.Hh;
        F.prototype.ji = function (b) {
            this.b["delete"](b)
        };
        F.prototype.unregisterResponseFilter = F.prototype.ji;
        F.prototype.Tf = function () {
            this.b.clear()
        };
        F.prototype.clearAllResponseFilters = F.prototype.Tf;

        function yb(b, c) {
            return {
                uris: b,
                method: "GET",
                body: null,
                headers: {},
                allowCrossSiteCredentials: !1,
                retryParameters: c,
                licenseRequestType: null
            }
        }
        F.prototype.destroy = function () {
            this.f = !0;
            this.a.clear();
            this.b.clear();
            return this.i.destroy()
        };
        F.prototype.destroy = F.prototype.destroy;

        function zb(b) {
            b.then = function (c, d) {
                La("The network request interface has changed!  Please update your application to the new interface, which allows operations to be aborted.  Support for the old API will be removed in v2.5.");
                return b.promise.then(c, d)
            };
            b["catch"] = function (c) {
                La("The network request interface has changed!  Please update your application to the new interface, which allows operations to be aborted.  Support for the old API will be removed in v2.5.");
                return b.promise["catch"](c)
            };
            return b
        }
        F.prototype.request = function (b, c) {
            var d = this;
            if (this.f) return zb(gb());
            c.method = c.method || "GET";
            c.headers = c.headers || {};
            c.retryParameters = c.retryParameters ? nb(c.retryParameters) : db();
            c.uris = nb(c.uris);
            var e = Ab(this, b, c),
                f = e.wa(function () {
                    return Bb(d, b, c, new cb(c.retryParameters, !1), 0, null)
                }),
                g = f.wa(function (c) {
                    return Cb(d, b, c)
                }),
                h = Date.now(),
                k = 0;
            e.promise.then(function () {
                k = Date.now() - h
            }, function () {});
            var l = 0;
            f.promise.then(function () {
                l = Date.now()
            }, function () {});
            e = g.wa(function (c) {
                var e = Date.now() - l,
                    f = c.response;
                f.timeMs += k;
                f.timeMs += e;
                c.ug || !d.c || f.fromCache || 1 != b || d.c(f.timeMs, f.data.byteLength);
                return f
            }, function (b) {
                b && (b.severity = 2);
                throw b;
            });
            tb(this.i, e);
            return zb(e)
        };
        F.prototype.request = F.prototype.request;

        function Ab(b, c, d) {
            var e = hb(void 0),
                f = {};
            b = q(b.a);
            for (var g = b.next(); !g.done; f = {
                    md: f.md
                }, g = b.next()) f.md = g.value, e = e.wa(function (b) {
                return function () {
                    return b.md(c, d)
                }
            }(f));
            return e.wa(void 0, function (b) {
                if (b && 7001 == b.code) throw b;
                throw new A(2, 1, 1006, b);
            })
        }

        function Bb(b, c, d, e, f, g) {
            var h = new Oa(d.uris[f]),
                k = h.Ia,
                l = !1;
            k || (k = location.protocol, k = k.slice(0, -1), Pa(h, k), d.uris[f] = h.toString());
            var m = (k = ub[k]) ? k.Fh : null;
            if (!m) return fb(new A(2, 1, 1E3, h));
            var p;
            return jb(eb(e)).wa(function () {
                if (b.f) return gb();
                p = Date.now();
                var e = m(d.uris[f], d, c, function (d, e) {
                    b.c && 1 == c && (b.c(d, e), l = !0)
                });
                void 0 == e.promise && (La("The scheme plugin interface has changed!  Please update your scheme plugins to the new interface to add support for abort().  Support for the old plugin interface will be removed in v2.5."),
                    e = jb(e));
                return e
            }).wa(function (b) {
                void 0 == b.timeMs && (b.timeMs = Date.now() - p);
                return {
                    response: b,
                    ug: l
                }
            }, function (h) {
                if (h && 7001 == h.code) throw h;
                if (b.f) return gb();
                if (h && 1 == h.severity) return b.dispatchEvent(new D("retry", {
                    error: h instanceof A ? h : null
                })), f = (f + 1) % d.uris.length, Bb(b, c, d, e, f, h);
                throw h || g;
            })
        }

        function Cb(b, c, d) {
            var e = hb(void 0);
            b = q(b.b);
            for (var f = b.next(); !f.done; f = b.next()) e = e.wa(f.value.bind(null, c, d.response));
            return e.wa(function () {
                return d
            }, function (b) {
                if (b && 7001 == b.code) throw b;
                var c = 2;
                b instanceof A && (c = b.severity);
                throw new A(c, 1, 1007, b);
            })
        };

        function Db() {
            this.a = new mb
        }
        Db.prototype.destroy = function () {
            Eb(this);
            this.a = null;
            return Promise.resolve()
        };

        function G(b, c, d, e) {
            b.a && (c = new Fb(c, d, e), b.a.push(d, c))
        }

        function Gb(b, c, d, e) {
            G(b, c, d, function (b) {
                this.Ka(c, d);
                e(b)
            }.bind(b))
        }
        Db.prototype.Ka = function (b, c) {
            if (this.a)
                for (var d = this.a.get(c) || [], e = 0; e < d.length; ++e) {
                    var f = d[e];
                    f.target == b && (f.Ka(), this.a.remove(c, f))
                }
        };

        function Eb(b) {
            if (b.a) {
                for (var c = b.a.getAll(), d = 0; d < c.length; ++d) c[d].Ka();
                b.a.a = {}
            }
        }

        function Fb(b, c, d) {
            this.target = b;
            this.type = c;
            this.a = d;
            this.target.addEventListener(c, d, !1)
        }
        Fb.prototype.Ka = function () {
            this.target.removeEventListener(this.type, this.a, !1);
            this.a = this.target = null
        };
        var Hb = {
            Uf: function (b, c) {
                return b.reduce(function (b, c, f) {
                    return c["catch"](b.bind(null, f))
                }.bind(null, c), Promise.reject())
            },
            Mc: function (b, c) {
                return b.concat(c)
            },
            jb: function () {},
            Xa: function (b) {
                return null != b
            }
        };

        function Ib(b, c) {
            for (var d = [], e = q(b), f = e.next(); !f.done; f = e.next()) d.push(c(f.value));
            return d
        }

        function Jb(b, c) {
            for (var d = q(b), e = d.next(); !e.done; e = d.next())
                if (!c(e.value)) return !1;
            return !0
        }

        function Kb(b, c) {
            for (var d = q(b), e = d.next(); !e.done; e = d.next())
                if (c(e.value)) return !0;
            return !1
        }

        function Lb(b, c) {
            for (var d = [], e = q(b), f = e.next(); !f.done; f = e.next()) f = f.value, c(f) && d.push(f);
            return d
        };

        function Mb(b) {
            var c = new Map;
            Object.keys(b).forEach(function (d) {
                c.set(d, b[d])
            });
            return c
        }

        function Nb(b) {
            var c = {};
            b.forEach(function (b, e) {
                c[e] = b
            });
            return c
        };

        function Ob(b, c) {
            var d = b;
            c && (d += '; codecs="' + c + '"');
            return d
        }

        function Pb(b) {
            var c = [b.mimeType];
            Qb.forEach(function (d, e) {
                var f = b[e];
                f && c.push(d + '="' + f + '"')
            });
            return c.join(";")
        }

        function Rb(b) {
            b = b.split(".");
            var c = b[0];
            b.pop();
            return [c, b.join(".")]
        }
        var Qb = (new Map).set("codecs", "codecs").set("frameRate", "framerate").set("bandwidth", "bitrate").set("width", "width").set("height", "height").set("channelsCount", "channels");

        function Sb(b) {
            if (!b) return "";
            b = new Uint8Array(b);
            239 == b[0] && 187 == b[1] && 191 == b[2] && (b = b.subarray(3));
            b = escape(Tb(b));
            try {
                return decodeURIComponent(b)
            } catch (c) {
                throw new A(2, 2, 2004);
            }
        }
        y("shaka.util.StringUtils.fromUTF8", Sb);

        function Ub(b, c, d) {
            if (!b) return "";
            if (!d && 0 != b.byteLength % 2) throw new A(2, 2, 2004);
            if (b instanceof ArrayBuffer) var e = b;
            else d = new Uint8Array(b.byteLength), d.set(new Uint8Array(b)), e = d.buffer;
            b = Math.floor(b.byteLength / 2);
            d = new Uint16Array(b);
            e = new DataView(e);
            for (var f = 0; f < b; f++) d[f] = e.getUint16(2 * f, c);
            return Tb(d)
        }
        y("shaka.util.StringUtils.fromUTF16", Ub);

        function Vb(b) {
            var c = new Uint8Array(b);
            if (239 == c[0] && 187 == c[1] && 191 == c[2]) return Sb(c);
            if (254 == c[0] && 255 == c[1]) return Ub(c.subarray(2), !1);
            if (255 == c[0] && 254 == c[1]) return Ub(c.subarray(2), !0);
            var d = function (b, c) {
                return b.byteLength <= c || 32 <= b[c] && 126 >= b[c]
            }.bind(null, c);
            if (0 == c[0] && 0 == c[2]) return Ub(b, !1);
            if (0 == c[1] && 0 == c[3]) return Ub(b, !0);
            if (d(0) && d(1) && d(2) && d(3)) return Sb(b);
            throw new A(2, 2, 2003);
        }
        y("shaka.util.StringUtils.fromBytesAutoDetect", Vb);

        function Wb(b) {
            b = encodeURIComponent(b);
            b = unescape(b);
            for (var c = new Uint8Array(b.length), d = 0; d < b.length; ++d) c[d] = b.charCodeAt(d);
            return c.buffer
        }
        y("shaka.util.StringUtils.toUTF8", Wb);

        function Tb(b) {
            for (var c = "", d = 0; d < b.length; d += 16E3) c += String.fromCharCode.apply(null, b.subarray(d, d + 16E3));
            return c
        };

        function Xb(b) {
            this.a = null;
            this.b = function () {
                this.a = null;
                b()
            }.bind(this)
        }
        y("shaka.util.Timer", Xb);
        Xb.prototype.cancel = function () {
            null != this.a && (clearTimeout(this.a), this.a = null)
        };
        Xb.prototype.cancel = Xb.prototype.cancel;
        Xb.prototype.pd = function (b) {
            this.cancel();
            this.a = setTimeout(this.b, 1E3 * b)
        };
        Xb.prototype.schedule = Xb.prototype.pd;
        Xb.prototype.Ib = function (b) {
            this.cancel();
            var c = function () {
                this.b();
                this.a = setTimeout(c, 1E3 * b)
            }.bind(this);
            this.a = setTimeout(c, 1E3 * b)
        };
        Xb.prototype.scheduleRepeated = Xb.prototype.Ib;

        function bc(b, c) {
            var d = Tb(b);
            c = void 0 == c ? !0 : c;
            d = window.btoa(d).replace(/\+/g, "-").replace(/\//g, "_");
            return c ? d : d.replace(/=*$/, "")
        }
        y("shaka.util.Uint8ArrayUtils.toBase64", bc);

        function cc(b) {
            b = window.atob(b.replace(/-/g, "+").replace(/_/g, "/"));
            for (var c = new Uint8Array(b.length), d = 0; d < b.length; ++d) c[d] = b.charCodeAt(d);
            return c
        }
        y("shaka.util.Uint8ArrayUtils.fromBase64", cc);

        function dc(b) {
            for (var c = new Uint8Array(b.length / 2), d = 0; d < b.length; d += 2) c[d / 2] = window.parseInt(b.substr(d, 2), 16);
            return c
        }
        y("shaka.util.Uint8ArrayUtils.fromHex", dc);

        function ec(b) {
            for (var c = "", d = 0; d < b.length; ++d) {
                var e = b[d].toString(16);
                1 == e.length && (e = "0" + e);
                c += e
            }
            return c
        }
        y("shaka.util.Uint8ArrayUtils.toHex", ec);

        function fc(b, c) {
            if (!b && !c) return !0;
            if (!b || !c || b.length != c.length) return !1;
            for (var d = 0; d < b.length; ++d)
                if (b[d] != c[d]) return !1;
            return !0
        }
        y("shaka.util.Uint8ArrayUtils.equal", fc);

        function gc(b) {
            for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];
            for (var e = d = 0; e < c.length; ++e) d += c[e].length;
            d = new Uint8Array(d);
            for (var f = e = 0; f < c.length; ++f) d.set(c[f], e), e += c[f].length;
            return d
        }
        y("shaka.util.Uint8ArrayUtils.concat", gc);

        function hc(b) {
            var c = this;
            this.w = b;
            this.o = this.l = this.u = null;
            this.H = !1;
            this.a = null;
            this.i = new Db;
            this.b = new Map;
            this.v = [];
            this.m = new z;
            this.f = null;
            this.j = function (d) {
                c.m.reject(d);
                b.onError(d)
            };
            this.T = new Map;
            this.K = new Map;
            this.C = new Xb(function () {
                return ic(c)
            });
            this.A = this.c = !1;
            this.G = [];
            this.P = !1;
            this.B = new Xb(function () {
                return jc(c)
            });
            this.B.Ib(1);
            this.m["catch"](function () {})
        }
        n = hc.prototype;
        n.destroy = function () {
            this.c = !0;
            var b = [],
                c = this.b.keys(),
                d = {};
            c = q(c);
            for (var e = c.next(); !e.done; d = {
                    Wc: d.Wc
                }, e = c.next()) {
                e = e.value;
                d.Wc = !1;
                e = e.close().then(function (b) {
                    return function () {
                        b.Wc = !0
                    }
                }(d), Hb.jb);
                var f = kc(lc).then(function () {
                    return function () {}
                }(d));
                b.push(Promise.race([e, f]))
            }
            this.m.reject();
            this.i && b.push(this.i.destroy());
            this.o && b.push(this.o.setMediaKeys(null)["catch"](Hb.jb));
            this.B && (this.B.cancel(), this.B = null);
            this.C && (this.C.cancel(), this.C = null);
            this.i = this.o = this.l = this.u = this.a =
                null;
            this.b.clear();
            this.v = [];
            this.w = this.j = this.f = null;
            return Promise.all(b)
        };
        n.configure = function (b) {
            this.f = b
        };

        function mc(b, c, d) {
            b.v = [];
            b.A = d;
            return nc(b, c)
        }

        function oc(b, c, d) {
            b.v = d;
            b.A = 0 < d.length;
            return nc(b, c)
        }

        function nc(b, c) {
            var d = c.some(function (b) {
                return 0 < b.drmInfos.length
            });
            if (!d) {
                var e = Mb(b.f.servers);
                pc(c, e)
            }
            var f = qc(b);
            if (f) {
                var g = q(c);
                for (e = g.next(); !e.done; e = g.next()) e.value.drmInfos = [f]
            }
            f = q(c);
            for (e = f.next(); !e.done; e = f.next())
                for (e = q(e.value.drmInfos), g = e.next(); !g.done; g = e.next()) rc(g.value, Mb(b.f.servers), Mb(b.f.advanced || {}));
            e = sc(b, c);
            if (!e.size) return b.H = !0, Promise.resolve();
            e = tc(b, e);
            return d ? e : e["catch"](function () {})
        }
        n.hc = function (b) {
            var c = this;
            if (!this.l) return Gb(this.i, b, "encrypted", function () {
                c.j(new A(2, 6, 6010))
            }), Promise.resolve();
            this.o = b;
            Gb(this.i, this.o, "play", function () {
                for (var b = 0; b < c.G.length; b++) uc(c, c.G[b]);
                c.P = !0;
                c.G = []
            });
            b = this.o.setMediaKeys(this.l);
            b = b["catch"](function (b) {
                return Promise.reject(new A(2, 6, 6003, b.message))
            });
            var d = vc(this);
            return Promise.all([b, d]).then(function () {
                if (c.c) return Promise.reject();
                wc(c);
                c.a.initData.length || c.v.length || G(c.i, c.o, "encrypted", function (b) {
                    return xc(c,
                        b.initDataType, new Uint8Array(b.initData))
                })
            })["catch"](function (b) {
                return c.c ? Promise.resolve() : Promise.reject(b)
            })
        };

        function vc(b) {
            return r(function d() {
                var e;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            if (!(b.l && b.a && b.a.serverCertificate && b.a.serverCertificate.length)) {
                                d.I(0);
                                break
                            }
                            oa(d, 3);
                            return t(d, b.l.setServerCertificate(b.a.serverCertificate), 5);
                        case 5:
                            qa(d, 0);
                            break;
                        case 3:
                            return e = ra(d), d["return"](Promise.reject(new A(2, 6, 6004, e.message)))
                    }
                })
            })
        }

        function wc(b) {
            var c = b.a ? b.a.initData : [];
            c.forEach(function (c) {
                return yc(b, c.initDataType, c.initData)
            });
            b.v.forEach(function (c) {
                return zc(b, c)
            });
            c.length || b.v.length || b.m.resolve();
            return b.m
        }

        function xc(b, c, d) {
            var e = b.b.values();
            e = q(e);
            for (var f = e.next(); !f.done; f = e.next())
                if (fc(d, f.value.initData)) return;
            yc(b, c, d)
        }
        n.keySystem = function () {
            return this.a ? this.a.keySystem : ""
        };

        function Ac(b) {
            b = b.b.keys();
            b = Ib(b, function (b) {
                return b.sessionId
            });
            return Array.from(b)
        }
        n.qc = function () {
            var b = Infinity,
                c = this.b.keys();
            c = q(c);
            for (var d = c.next(); !d.done; d = c.next()) d = d.value, isNaN(d.expiration) || (b = Math.min(b, d.expiration));
            return b
        };

        function sc(b, c) {
            for (var d = new Set, e = q(c), f = e.next(); !f.done; f = e.next()) {
                var g = q(f.value.drmInfos);
                for (f = g.next(); !f.done; f = g.next()) d.add(f.value)
            }
            e = q(d);
            for (f = e.next(); !f.done; f = e.next()) rc(f.value, Mb(b.f.servers), Mb(b.f.advanced || {}));
            g = b.A ? "required" : "optional";
            var h = b.A ? ["persistent-license"] : ["temporary"];
            e = new Map;
            d = q(d);
            for (f = d.next(); !f.done; f = d.next()) f = f.value, e.set(f.keySystem, {
                audioCapabilities: [],
                videoCapabilities: [],
                distinctiveIdentifier: "optional",
                persistentState: g,
                sessionTypes: h,
                label: f.keySystem,
                drmInfos: []
            });
            d = q(c);
            for (f = d.next(); !f.done; f = d.next()) {
                f = f.value;
                g = f.audio;
                h = f.video;
                var k = g ? Ob(g.mimeType, g.codecs) : "",
                    l = h ? Ob(h.mimeType, h.codecs) : "",
                    m = q(f.drmInfos);
                for (f = m.next(); !f.done; f = m.next()) {
                    f = f.value;
                    var p = e.get(f.keySystem);
                    p.drmInfos.push(f);
                    f.distinctiveIdentifierRequired && (p.distinctiveIdentifier = "required");
                    f.persistentStateRequired && (p.persistentState = "required");
                    g && p.audioCapabilities.push({
                        robustness: f.audioRobustness || "",
                        contentType: k
                    });
                    h && p.videoCapabilities.push({
                        robustness: f.videoRobustness ||
                            "",
                        contentType: l
                    })
                }
            }
            return e
        }

        function tc(b, c) {
            if (1 == c.size && c.has("")) return Promise.reject(new A(2, 6, 6E3));
            for (var d = q(c.values()), e = d.next(); !e.done; e = d.next()) e = e.value, 0 == e.audioCapabilities.length && delete e.audioCapabilities, 0 == e.videoCapabilities.length && delete e.videoCapabilities;
            var f = d = new z;
            [!0, !1].forEach(function (b) {
                var d = this;
                c.forEach(function (c, e) {
                    c.drmInfos.some(function (b) {
                        return !!b.licenseServerUri
                    }) == b && (f = f["catch"](function () {
                        return this.c ? Promise.reject() : navigator.requestMediaKeySystemAccess(e, [c])
                    }.bind(d)))
                })
            }.bind(b));
            f = f["catch"](function () {
                return Promise.reject(new A(2, 6, 6001))
            });
            f = f.then(function (b) {
                if (this.c) return Promise.reject();
                var d = navigator.userAgent.includes("Edge/"),
                    e = b.getConfiguration(),
                    f = e.audioCapabilities || [];
                e = e.videoCapabilities || [];
                this.u = new Set;
                var g = q(f);
                for (f = g.next(); !f.done; f = g.next()) this.u.add(f.value.contentType);
                e = q(e);
                for (f = e.next(); !f.done; f = e.next()) this.u.add(f.value.contentType);
                d && (this.u = null);
                d = b.keySystem;
                e = c.get(b.keySystem);
                f = [];
                g = [];
                var p = [],
                    u = [];
                Bc(e.drmInfos, f, g, p, u);
                this.a = {
                    keySystem: d,
                    licenseServerUri: f[0],
                    distinctiveIdentifierRequired: "required" == e.distinctiveIdentifier,
                    persistentStateRequired: "required" == e.persistentState,
                    audioRobustness: e.audioCapabilities ? e.audioCapabilities[0].robustness : "",
                    videoRobustness: e.videoCapabilities ? e.videoCapabilities[0].robustness : "",
                    serverCertificate: g[0],
                    initData: p,
                    keyIds: u
                };
                return this.a.licenseServerUri ? b.createMediaKeys() : Promise.reject(new A(2, 6, 6012))
            }.bind(b)).then(function (b) {
                if (this.c) return Promise.reject();
                this.l =
                    b;
                this.H = !0
            }.bind(b))["catch"](function (b) {
                if (this.c) return Promise.resolve();
                this.u = this.a = null;
                return b instanceof A ? Promise.reject(b) : Promise.reject(new A(2, 6, 6002, b.message))
            }.bind(b));
            d.reject();
            return f
        }

        function qc(b) {
            b = Mb(b.f.clearKeys);
            if (0 == b.size) return null;
            var c = [],
                d = [];
            b.forEach(function (b, e) {
                var f = dc(e),
                    g = dc(b);
                f = {
                    kty: "oct",
                    kid: bc(f, !1),
                    k: bc(g, !1)
                };
                c.push(f);
                d.push(f.kid)
            });
            b = JSON.stringify({
                keys: c
            });
            var e = JSON.stringify({
                kids: d
            });
            e = [{
                initData: new Uint8Array(Wb(e)),
                initDataType: "keyids"
            }];
            return {
                keySystem: "org.w3.clearkey",
                licenseServerUri: "data:application/json;base64," + window.btoa(b),
                distinctiveIdentifierRequired: !1,
                persistentStateRequired: !1,
                audioRobustness: "",
                videoRobustness: "",
                serverCertificate: null,
                initData: e,
                keyIds: []
            }
        }

        function zc(b, c) {
            try {
                var d = b.l.createSession("persistent-license")
            } catch (g) {
                var e = new A(2, 6, 6005, g.message);
                b.j(e);
                return Promise.reject(e)
            }
            G(b.i, d, "message", b.Ne.bind(b));
            G(b.i, d, "keystatuseschange", b.Fe.bind(b));
            var f = {
                initData: null,
                loaded: !1,
                fd: Infinity,
                ab: null
            };
            b.b.set(d, f);
            return d.load(c).then(function (b) {
                if (!this.c) {
                    if (b) return f.loaded = !0, Cc(this) && this.m.resolve(), d;
                    this.b["delete"](d);
                    this.j(new A(2, 6, 6013))
                }
            }.bind(b), function (b) {
                this.c || (this.b["delete"](d), this.j(new A(2, 6, 6005, b.message)))
            }.bind(b))
        }

        function yc(b, c, d) {
            try {
                var e = b.A ? b.l.createSession("persistent-license") : b.l.createSession()
            } catch (f) {
                b.j(new A(2, 6, 6005, f.message));
                return
            }
            G(b.i, e, "message", b.Ne.bind(b));
            G(b.i, e, "keystatuseschange", b.Fe.bind(b));
            b.b.set(e, {
                initData: d,
                loaded: !1,
                fd: Infinity,
                ab: null
            });
            e.generateRequest(c, d.buffer)["catch"](function (c) {
                b.c || (b.b["delete"](e), b.j(new A(2, 6, 6006, c.message)))
            })
        }
        n.Ne = function (b) {
            this.f.delayLicenseRequestUntilPlayed && this.o.paused && !this.P ? this.G.push(b) : uc(this, b)
        };

        function uc(b, c) {
            var d = c.target,
                e = b.b.get(d),
                f = b.a.licenseServerUri,
                g = b.f.advanced[b.a.keySystem];
            "individualization-request" == c.messageType && g && g.individualizationServer && (f = g.individualizationServer);
            f = yb([f], b.f.retryParameters);
            f.body = c.message;
            f.method = "POST";
            f.licenseRequestType = c.messageType;
            "com.microsoft.playready" != b.a.keySystem && "com.chromecast.playready" != b.a.keySystem || Dc(f);
            b.w.vc.request(2, f).promise.then(function (b) {
                return this.c ? Promise.reject() : d.update(b.data).then(function () {
                    var b =
                        this;
                    this.w.onEvent(new D("drmsessionupdate"));
                    e && (e.ab && e.ab.resolve(), kc(Ec).then(function () {
                        e.loaded = !0;
                        Cc(b) && b.m.resolve()
                    }))
                }.bind(this))
            }.bind(b), function (b) {
                if (this.c) return Promise.resolve();
                b = new A(2, 6, 6007, b);
                this.j(b);
                e && e.ab && e.ab.reject(b)
            }.bind(b))["catch"](function (b) {
                if (this.c) return Promise.resolve();
                b = new A(2, 6, 6008, b.message);
                this.j(b);
                e && e.ab && e.ab.reject(b)
            }.bind(b))
        }

        function Dc(b) {
            var c = Ub(b.body, !0, !0);
            if (c.includes("PlayReadyKeyMessage")) {
                c = (new DOMParser).parseFromString(c, "application/xml");
                for (var d = c.getElementsByTagName("HttpHeader"), e = 0; e < d.length; ++e) b.headers[d[e].querySelector("name").textContent] = d[e].querySelector("value").textContent;
                b.body = cc(c.querySelector("Challenge").textContent).buffer
            } else b.headers["Content-Type"] = "text/xml; charset=utf-8"
        }
        n.Fe = function (b) {
            b = b.target;
            var c = this.b.get(b);
            if (c) {
                var d = !1;
                b.keyStatuses.forEach(function (b, e) {
                    if ("string" == typeof e) {
                        var f = e;
                        e = b;
                        b = f
                    }
                    if ("com.microsoft.playready" == this.a.keySystem && 16 == e.byteLength) {
                        f = new DataView(e);
                        var g = f.getUint32(0, !0),
                            l = f.getUint16(4, !0),
                            m = f.getUint16(6, !0);
                        f.setUint32(0, g, !1);
                        f.setUint16(4, l, !1);
                        f.setUint16(6, m, !1)
                    }
                    "com.microsoft.playready" == this.a.keySystem && "status-pending" == b && (b = "usable");
                    "status-pending" != b && (c.loaded = !0);
                    "expired" == b && (d = !0);
                    f = ec(new Uint8Array(e));
                    this.T.set(f, b)
                }.bind(this));
                var e = b.expiration - Date.now();
                (0 > e || d && 1E3 > e) && !c.ab && (this.b["delete"](b), b.close()["catch"](function () {}));
                Cc(this) && (this.m.resolve(), this.C.pd(Fc))
            }
        };

        function ic(b) {
            var c = b.T,
                d = b.K;
            d.clear();
            c.forEach(function (b, c) {
                return d.set(c, b)
            });
            c = Array.from(d.values());
            c.length && c.every(function (b) {
                return "expired" == b
            }) && b.j(new A(2, 6, 6014));
            b.w.Ee(Nb(d))
        }

        function Gc() {
            function b(b) {
                return r(function h() {
                    var c, f, m;
                    return v(h, function (h) {
                        switch (h.s) {
                            case 1:
                                return oa(h, 2), t(h, navigator.requestMediaKeySystemAccess(b, d), 4);
                            case 4:
                                return c = h.F, m = (f = c.getConfiguration().sessionTypes) ? f.includes("persistent-license") : !1, navigator.userAgent.includes("Tizen 3") && (m = !1), e.set(b, {
                                    persistentState: m
                                }), t(h, c.createMediaKeys(), 5);
                            case 5:
                                qa(h, 0);
                                break;
                            case 2:
                                ra(h), e.set(b, null), h.s = 0
                        }
                    })
                })
            }
            var c = [{
                    contentType: 'video/mp4; codecs="avc1.42E01E"'
                }, {
                    contentType: 'video/webm; codecs="vp8"'
                }],
                d = [{
                    videoCapabilities: c,
                    persistentState: "required",
                    sessionTypes: ["persistent-license"]
                }, {
                    videoCapabilities: c
                }],
                e = new Map;
            c = "org.w3.clearkey com.widevine.alpha com.microsoft.playready com.apple.fps.2_0 com.apple.fps.1_0 com.apple.fps com.adobe.primetime".split(" ").map(function (c) {
                return b(c)
            });
            return Promise.all(c).then(function () {
                return Nb(e)
            })
        }

        function Hc(b, c) {
            if (c.audio && c.audio.encrypted && !Ic(b, c.audio) || c.video && c.video.encrypted && !Ic(b, c.video)) return !1;
            var d = b.keySystem();
            return 0 == c.drmInfos.length || c.drmInfos.some(function (b) {
                return b.keySystem == d
            })
        }

        function Ic(b, c) {
            return null == b.u ? !0 : b.u.has(Ob(c.mimeType, c.codecs))
        }

        function Jc(b, c) {
            if (!b.length) return c;
            if (!c.length) return b;
            for (var d = [], e = 0; e < b.length; e++)
                for (var f = 0; f < c.length; f++)
                    if (b[e].keySystem == c[f].keySystem) {
                        var g = b[e];
                        f = c[f];
                        var h = [];
                        h = h.concat(g.initData || []);
                        h = h.concat(f.initData || []);
                        var k = [];
                        k = k.concat(g.keyIds);
                        k = k.concat(f.keyIds);
                        d.push({
                            keySystem: g.keySystem,
                            licenseServerUri: g.licenseServerUri || f.licenseServerUri,
                            distinctiveIdentifierRequired: g.distinctiveIdentifierRequired || f.distinctiveIdentifierRequired,
                            persistentStateRequired: g.persistentStateRequired ||
                                f.persistentStateRequired,
                            videoRobustness: g.videoRobustness || f.videoRobustness,
                            audioRobustness: g.audioRobustness || f.audioRobustness,
                            serverCertificate: g.serverCertificate || f.serverCertificate,
                            initData: h,
                            keyIds: k
                        });
                        break
                    } return d
        }

        function jc(b) {
            b.b.forEach(function (c, d) {
                var e = c.fd,
                    f = d.expiration;
                isNaN(f) && (f = Infinity);
                f != e && (b.w.onExpirationUpdated(d.sessionId, f), c.fd = f)
            })
        }

        function Cc(b) {
            b = b.b.values();
            return Jb(b, function (b) {
                return b.loaded
            })
        }

        function kc(b) {
            return new Promise(function (c) {
                return setTimeout(c, 1E3 * b)
            })
        }

        function pc(b, c) {
            var d = [];
            c.forEach(function (b, c) {
                d.push({
                    keySystem: c,
                    licenseServerUri: b,
                    distinctiveIdentifierRequired: !1,
                    persistentStateRequired: !1,
                    audioRobustness: "",
                    videoRobustness: "",
                    serverCertificate: null,
                    initData: [],
                    keyIds: []
                })
            });
            for (var e = q(b), f = e.next(); !f.done; f = e.next()) f.value.drmInfos = d
        }

        function Bc(b, c, d, e, f) {
            b.forEach(function (b) {
                c.includes(b.licenseServerUri) || c.push(b.licenseServerUri);
                b.serverCertificate && (d.some(function (c) {
                    return fc(c, b.serverCertificate)
                }) || d.push(b.serverCertificate));
                b.initData && b.initData.forEach(function (b) {
                    e.some(function (c) {
                        return c.keyId && c.keyId == b.keyId ? !0 : c.initDataType == b.initDataType && fc(c.initData, b.initData)
                    }) || e.push(b)
                });
                if (b.keyIds)
                    for (var g = 0; g < b.keyIds.length; ++g) f.includes(b.keyIds[g]) || f.push(b.keyIds[g])
            })
        }

        function rc(b, c, d) {
            var e = b.keySystem;
            if (e) {
                !b.licenseServerUri && (c = c.get(e)) && (b.licenseServerUri = c);
                b.keyIds || (b.keyIds = []);
                if (d = d.get(e)) b.distinctiveIdentifierRequired || (b.distinctiveIdentifierRequired = d.distinctiveIdentifierRequired), b.persistentStateRequired || (b.persistentStateRequired = d.persistentStateRequired), b.videoRobustness || (b.videoRobustness = d.videoRobustness), b.audioRobustness || (b.audioRobustness = d.audioRobustness), b.serverCertificate || (b.serverCertificate = d.serverCertificate);
                window.cast &&
                    window.cast.__platform__ && "com.microsoft.playready" == b.keySystem && (b.keySystem = "com.chromecast.playready")
            }
        }
        var lc = 1,
            Ec = 5,
            Fc = .5;

        function Kc(b) {
            return !b || 1 == b.length && 1E-6 > b.end(0) - b.start(0) ? null : b.length ? b.end(b.length - 1) : null
        }

        function Lc(b, c, d) {
            d = void 0 === d ? 0 : d;
            return !b || !b.length || 1 == b.length && 1E-6 > b.end(0) - b.start(0) || c > b.end(b.length - 1) ? !1 : c + d >= b.start(0)
        }

        function Mc(b, c) {
            if (!b || !b.length || 1 == b.length && 1E-6 > b.end(0) - b.start(0)) return 0;
            for (var d = 0, e = b.length - 1; 0 <= e && b.end(e) > c; --e) d += b.end(e) - Math.max(b.start(e), c);
            return d
        }

        function Nc(b) {
            if (!b) return [];
            for (var c = [], d = 0; d < b.length; d++) c.push({
                start: b.start(d),
                end: b.end(d)
            });
            return c
        };

        function Oc(b, c, d) {
            this.startTime = b;
            this.endTime = c;
            this.payload = d;
            this.region = new Pc;
            this.position = null;
            this.positionAlign = Qc;
            this.size = 100;
            this.textAlign = Rc;
            this.writingDirection = Wc;
            this.lineInterpretation = Xc;
            this.line = null;
            this.lineHeight = "";
            this.lineAlign = Yc;
            this.displayAlign = Zc;
            this.fontSize = this.backgroundColor = this.color = "";
            this.fontWeight = $c;
            this.fontStyle = ad;
            this.fontFamily = "";
            this.textDecoration = [];
            this.wrapLine = !0;
            this.id = ""
        }
        y("shaka.text.Cue", Oc);
        var Qc = "auto";
        Oc.positionAlign = {
            LEFT: "line-left",
            RIGHT: "line-right",
            CENTER: "center",
            AUTO: Qc
        };
        var Rc = "center",
            bd = {
                LEFT: "left",
                RIGHT: "right",
                CENTER: Rc,
                START: "start",
                END: "end"
            };
        Oc.textAlign = bd;
        var Zc = "before",
            cd = {
                BEFORE: Zc,
                CENTER: "center",
                AFTER: "after"
            };
        Oc.displayAlign = cd;
        var Wc = 0;
        Oc.writingDirection = {
            HORIZONTAL_LEFT_TO_RIGHT: Wc,
            HORIZONTAL_RIGHT_TO_LEFT: 1,
            VERTICAL_LEFT_TO_RIGHT: 2,
            VERTICAL_RIGHT_TO_LEFT: 3
        };
        var Xc = 0;
        Oc.lineInterpretation = {
            LINE_NUMBER: Xc,
            PERCENTAGE: 1
        };
        var Yc = "center",
            dd = {
                CENTER: Yc,
                START: "start",
                END: "end"
            };
        Oc.lineAlign = dd;
        var $c = 400;
        Oc.fontWeight = {
            NORMAL: $c,
            BOLD: 700
        };
        var ad = "normal",
            ed = {
                NORMAL: ad,
                ITALIC: "italic",
                OBLIQUE: "oblique"
            };
        Oc.fontStyle = ed;
        Oc.textDecoration = {
            UNDERLINE: "underline",
            LINE_THROUGH: "lineThrough",
            OVERLINE: "overline"
        };

        function Pc() {
            this.id = "";
            this.regionAnchorY = this.regionAnchorX = this.viewportAnchorY = this.viewportAnchorX = 0;
            this.height = this.width = 100;
            this.viewportAnchorUnits = this.widthUnits = this.heightUnits = fd;
            this.scroll = gd
        }
        y("shaka.text.CueRegion", Pc);
        var fd = 1;
        Pc.units = {
            PX: 0,
            PERCENTAGE: fd,
            LINES: 2
        };
        var gd = "";
        Pc.scrollMode = {
            NONE: gd,
            UP: "up"
        };

        function hd(b, c) {
            if (0 == c.length) return b;
            var d = c.map(function (b) {
                return new Oa(b)
            });
            return b.map(function (b) {
                return new Oa(b)
            }).map(function (b) {
                return d.map(b.resolve.bind(b))
            }).reduce(Hb.Mc, []).map(function (b) {
                return b.toString()
            })
        }

        function id(b, c) {
            return {
                keySystem: b,
                licenseServerUri: "",
                distinctiveIdentifierRequired: !1,
                persistentStateRequired: !1,
                audioRobustness: "",
                videoRobustness: "",
                serverCertificate: null,
                initData: c || [],
                keyIds: []
            }
        }
        var jd = {
                Mf: "video",
                zf: "audio",
                tb: "text",
                ri: "application"
            },
            kd = 1 / 15;

        function ld() {
            this.a = new muxjs.mp4.Transmuxer({
                keepOriginalTimestamps: !0
            });
            this.b = null;
            this.i = [];
            this.c = [];
            this.f = !1;
            this.a.on("data", this.l.bind(this));
            this.a.on("done", this.j.bind(this))
        }
        ld.prototype.destroy = function () {
            this.a.dispose();
            this.a = null;
            return Promise.resolve()
        };

        function md(b, c) {
            return window.muxjs && "mp2t" == b.split(";")[0].split("/")[1] ? c ? MediaSource.isTypeSupported(nd(c, b)) : MediaSource.isTypeSupported(nd("audio", b)) || MediaSource.isTypeSupported(nd("video", b)) : !1
        }

        function nd(b, c) {
            var d = c.replace("mp2t", "mp4");
            "audio" == b && (d = d.replace("video", "audio"));
            var e = /avc1\.(66|77|100)\.(\d+)/.exec(d);
            if (e) {
                var f = "avc1.",
                    g = e[1],
                    h = Number(e[2]);
                f = ("66" == g ? f + "4200" : "77" == g ? f + "4d00" : f + "6400") + (h >> 4).toString(16);
                f += (h & 15).toString(16);
                d = d.replace(e[0], f)
            }
            return d
        }

        function od(b, c) {
            b.f = !0;
            b.b = new z;
            b.i = [];
            b.c = [];
            var d = new Uint8Array(c);
            b.a.push(d);
            b.a.flush();
            b.f && b.b.reject(new A(2, 3, 3018));
            return b.b
        }
        ld.prototype.l = function (b) {
            for (var c = 0; c < b.captions.length; c++) {
                var d = b.captions[c];
                this.c.push(new Oc(d.startTime, d.endTime, d.text))
            }
            c = new Uint8Array(b.data.byteLength + b.initSegment.byteLength);
            c.set(b.initSegment, 0);
            c.set(b.data, b.initSegment.byteLength);
            this.i.push(c)
        };
        ld.prototype.j = function () {
            var b = {
                data: gc.apply(null, this.i),
                cues: this.c
            };
            this.b.resolve(b);
            this.f = !1
        };

        function pd(b) {
            this.i = null;
            this.c = b;
            this.f = this.o = 0;
            this.j = Infinity;
            this.b = this.a = null;
            this.m = "";
            this.l = new Map
        }
        var qd = {};
        y("shaka.text.TextEngine.registerParser", function (b, c) {
            qd[b] = c
        });
        y("shaka.text.TextEngine.unregisterParser", function (b) {
            delete qd[b]
        });

        function rd(b) {
            return qd[b] || window.muxjs && "application/cea-608" == b ? !0 : !1
        }
        pd.prototype.destroy = function () {
            this.c = this.i = null;
            return Promise.resolve()
        };
        pd.prototype.Vh = function (b) {
            this.c = b
        };
        pd.prototype.setDisplayer = pd.prototype.Vh;

        function sd(b, c) {
            "application/cea-608" != c && (b.i = new qd[c])
        }
        pd.prototype.Uc = function (b) {
            var c = {
                periodStart: 0,
                segmentStart: null,
                segmentEnd: 0
            };
            try {
                return this.i.parseMedia(new Uint8Array(b), c)[0].startTime
            } catch (d) {
                throw new A(2, 2, 2009, d);
            }
        };

        function td(b, c, d, e) {
            return Promise.resolve().then(function () {
                if (this.i && this.c)
                    if (null == d || null == e) this.i.parseInit(new Uint8Array(c));
                    else {
                        var b = {
                            periodStart: this.o,
                            segmentStart: d,
                            segmentEnd: e
                        };
                        b = this.i.parseMedia(new Uint8Array(c), b).filter(function (b) {
                            return b.startTime >= this.f && b.startTime < this.j
                        }.bind(this));
                        this.c.append(b);
                        null == this.a && (this.a = Math.max(d, this.f));
                        this.b = Math.min(e, this.j)
                    }
            }.bind(b))
        }
        pd.prototype.remove = function (b, c) {
            return Promise.resolve().then(function () {
                !this.c || !this.c.remove(b, c) || null == this.a || c <= this.a || b >= this.b || (b <= this.a && c >= this.b ? this.a = this.b = null : b <= this.a && c < this.b ? this.a = c : b > this.a && c >= this.b && (this.b = b))
            }.bind(this))
        };
        pd.prototype.Vd = function (b) {
            this.c.append(b)
        };
        pd.prototype.appendCues = pd.prototype.Vd;
        pd.prototype.Ec = function (b, c) {
            this.m = b;
            var d = this.l.get(b);
            if (d)
                for (var e = q(d.keys()), f = e.next(); !f.done; f = e.next())
                    if (f = d.get(f.value)) f = f.filter(function (b) {
                        return b.endTime <= c
                    }), this.c.append(f)
        };
        pd.prototype.setSelectedClosedCaptionId = pd.prototype.Ec;

        function ud(b, c, d, e) {
            var f = d + " " + e,
                g = new Map;
            c = q(c);
            for (var h = c.next(); !h.done; h = c.next()) {
                var k = h.value;
                h = k.stream;
                g.has(h) || g.set(h, new Map);
                g.get(h).has(f) || g.get(h).set(f, []);
                k = new Oc(k.startTime, k.endTime, k.text);
                k.startTime >= b.f && k.startTime < b.j && (g.get(h).get(f).push(k), h == b.m && b.c.append([k]))
            }
            f = q(g.keys());
            for (c = f.next(); !c.done; c = f.next())
                for (c = c.value, b.l.has(c) || b.l.set(c, new Map), h = q(g.get(c).keys()), k = h.next(); !k.done; k = h.next()) {
                    k = k.value;
                    var l = g.get(c).get(k);
                    b.l.get(c).set(k, l)
                }
            b.a =
                null == b.a ? Math.max(d, b.f) : Math.min(b.a, Math.max(d, b.f));
            b.b = Math.max(b.b, Math.min(e, b.j))
        };

        function vd(b) {
            this.f = b;
            this.w = null;
            this.b = {};
            this.a = null;
            this.c = {};
            this.l = new Db;
            this.v = !1;
            this.m = {};
            this.u = !1;
            this.j = null;
            this.B = [];
            this.A = {};
            b = this.o = new z;
            var c = new MediaSource;
            Gb(this.l, c, "sourceopen", b.resolve);
            this.f.src = window.URL.createObjectURL(c);
            this.i = c
        }

        function wd(b) {
            var c = Ob(b.mimeType, b.codecs),
                d = Pb(b);
            return rd(c) || MediaSource.isTypeSupported(d) || md(c, b.type)
        }

        function xd() {
            var b = {};
            'video/mp4; codecs="avc1.42E01E",video/mp4; codecs="avc3.42E01E",video/mp4; codecs="hev1.1.6.L93.90",video/mp4; codecs="hvc1.1.6.L93.90",video/mp4; codecs="hev1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="hvc1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="vp9",video/mp4; codecs="vp09.00.10.08",audio/mp4; codecs="mp4a.40.2",audio/mp4; codecs="ac-3",audio/mp4; codecs="ec-3",audio/mp4; codecs="opus",audio/mp4; codecs="flac",video/webm; codecs="vp8",video/webm; codecs="vp9",video/webm; codecs="vp09.00.10.08",audio/webm; codecs="vorbis",audio/webm; codecs="opus",video/mp2t; codecs="avc1.42E01E",video/mp2t; codecs="avc3.42E01E",video/mp2t; codecs="hvc1.1.6.L93.90",video/mp2t; codecs="mp4a.40.2",video/mp2t; codecs="ac-3",video/mp2t; codecs="ec-3",text/vtt,application/mp4; codecs="wvtt",application/ttml+xml,application/mp4; codecs="stpp"'.split(",").forEach(function (c) {
                b[c] = rd(c) ||
                    MediaSource.isTypeSupported(c) || md(c);
                var d = c.split(";")[0];
                b[d] = b[d] || b[c]
            });
            return b
        }
        n = vd.prototype;
        n.destroy = function () {
            this.v = !0;
            var b = [],
                c;
            for (c in this.c) {
                var d = this.c[c],
                    e = d[0];
                this.c[c] = d.slice(0, 1);
                e && b.push(e.p["catch"](Hb.jb));
                for (e = 1; e < d.length; ++e) d[e].p["catch"](Hb.jb), d[e].p.reject()
            }
            this.a && b.push(this.a.destroy());
            for (var f in this.m) b.push(this.m[f].destroy());
            return Promise.all(b).then(function () {
                var b = this.l ? this.l.destroy() : null;
                this.f && (this.f.removeAttribute("src"), this.f.load());
                this.w = this.a = this.i = this.f = this.l = null;
                this.b = {};
                this.m = {};
                this.j = null;
                this.B = [];
                this.A = {};
                this.c = {};
                return b
            }.bind(this))
        };
        n.init = function (b, c) {
            var d = this;
            return r(function f() {
                var g;
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            return g = jd, t(f, d.o, 2);
                        case 2:
                            b.forEach(function (b, f) {
                                var h = Ob(b.mimeType, b.codecs);
                                f == g.tb ? yd(d, h) : (!c && MediaSource.isTypeSupported(h) || !md(h, f) || (d.m[f] = new ld, h = nd(f, h)), h = d.i.addSourceBuffer(h), G(d.l, h, "error", d.ei.bind(d, f)), G(d.l, h, "updateend", d.Db.bind(d, f)), d.b[f] = h, d.c[f] = [])
                            }), f.s = 0
                    }
                })
            })
        };

        function yd(b, c) {
            b.a || (b.a = new pd(b.w));
            sd(b.a, c)
        }

        function zd(b, c) {
            if ("text" == c) var d = b.a.a;
            else d = Ad(b, c), d = !d || 1 == d.length && 1E-6 > d.end(0) - d.start(0) ? null : 1 == d.length && 0 > d.start(0) ? 0 : d.length ? d.start(0) : null;
            return d
        }

        function Bd(b, c) {
            return "text" == c ? b.a.b : Kc(Ad(b, c))
        }

        function Cd(b, c, d) {
            if ("text" == c) return b = b.a, null == b.b || b.b < d ? 0 : b.b - Math.max(d, b.a);
            b = Ad(b, c);
            return Mc(b, d)
        }
        n.Rc = function () {
            var b = this.a && null != this.a.a ? [{
                start: this.a.a,
                end: this.a.b
            }] : [];
            return {
                total: Nc(this.f.buffered),
                audio: Nc(Ad(this, "audio")),
                video: Nc(Ad(this, "video")),
                text: b
            }
        };

        function Ad(b, c) {
            try {
                return b.b[c].buffered
            } catch (d) {
                return null
            }
        }

        function Dd(b, c, d, e, f, g) {
            if ("text" == c) return td(b.a, d, e, f);
            if (b.m[c]) return od(b.m[c], d).then(function (b) {
                this.a || yd(this, "text/vtt");
                this.u && this.a.Vd(b.cues);
                return Ed(this, c, this.gf.bind(this, c, b.data.buffer))
            }.bind(b));
            g && window.muxjs && (b.a || yd(b, "text/vtt"), null == e && null == f ? (b.j = new muxjs.mp4.CaptionParser, e = muxjs.mp4.probe, f = new Uint8Array(d), b.B = e.videoTrackIds(f), b.A = e.timescale(f), b.j.init()) : (g = new Uint8Array(d), (g = b.j.parse(g, b.B, b.A)) && (g = g.captions) && 0 < g.length && ud(b.a, g, e, f), b.j.clearParsedCaptions()));
            return Ed(b, c, b.gf.bind(b, c, d))
        }
        n.Ec = function (b) {
            var c = Bd(this, "video") || 0;
            this.a.Ec(b, c)
        };
        n.remove = function (b, c, d) {
            return "text" == b ? this.a.remove(c, d) : Ed(this, b, this.hf.bind(this, b, c, d))
        };

        function Fd(b, c) {
            if ("text" == c) {
                if (!b.a) return Promise.resolve();
                b.j && b.j.resetCaptionStream();
                return b.a.remove(0, Infinity)
            }
            return Ed(b, c, b.hf.bind(b, c, 0, b.i.duration))
        }
        n.flush = function (b) {
            return "text" == b ? Promise.resolve() : Ed(this, b, this.ag.bind(this, b))
        };

        function Gd(b, c, d, e, f) {
            return "text" == c ? (b.a.o = d, b = b.a, b.f = e, b.j = f, Promise.resolve()) : Promise.all([Ed(b, c, b.Nf.bind(b, c)), Ed(b, c, b.Xh.bind(b, c, d)), Ed(b, c, b.Th.bind(b, c, e, f))])
        }
        n.endOfStream = function (b) {
            return Hd(this, function () {
                b ? this.i.endOfStream(b) : this.i.endOfStream()
            }.bind(this))
        };
        n.Ja = function (b) {
            return Hd(this, function () {
                this.i.duration = b
            }.bind(this))
        };
        n.ha = function () {
            return this.i.duration
        };
        n.gf = function (b, c) {
            this.b[b].appendBuffer(c)
        };
        n.hf = function (b, c, d) {
            d <= c ? this.Db(b) : this.b[b].remove(c, d)
        };
        n.Nf = function (b) {
            var c = this.b[b].appendWindowStart,
                d = this.b[b].appendWindowEnd;
            this.b[b].abort();
            this.b[b].appendWindowStart = c;
            this.b[b].appendWindowEnd = d;
            this.Db(b)
        };
        n.ag = function (b) {
            this.f.currentTime -= .001;
            this.Db(b)
        };
        n.Xh = function (b, c) {
            0 > c && (c += .001);
            this.b[b].timestampOffset = c;
            this.Db(b)
        };
        n.Th = function (b, c, d) {
            this.b[b].appendWindowStart = 0;
            this.b[b].appendWindowEnd = d;
            this.b[b].appendWindowStart = c;
            this.Db(b)
        };
        n.ei = function (b) {
            this.c[b][0].p.reject(new A(2, 3, 3014, this.f.error ? this.f.error.code : 0))
        };
        n.Db = function (b) {
            var c = this.c[b][0];
            c && (c.p.resolve(), Id(this, b))
        };

        function Ed(b, c, d) {
            if (b.v) return Promise.reject();
            d = {
                start: d,
                p: new z
            };
            b.c[c].push(d);
            if (1 == b.c[c].length) try {
                d.start()
            } catch (e) {
                "QuotaExceededError" == e.name ? d.p.reject(new A(2, 3, 3017, c)) : d.p.reject(new A(2, 3, 3015, e)), Id(b, c)
            }
            return d.p
        }

        function Hd(b, c) {
            if (b.v) return Promise.reject();
            var d = [],
                e;
            for (e in b.b) {
                var f = new z,
                    g = {
                        start: function (b) {
                            b.resolve()
                        }.bind(null, f),
                        p: f
                    };
                b.c[e].push(g);
                d.push(f);
                1 == b.c[e].length && g.start()
            }
            return Promise.all(d).then(function () {
                try {
                    c()
                } catch (l) {
                    var b = Promise.reject(new A(2, 3, 3015, l))
                }
                for (var d in this.b) Id(this, d);
                return b
            }.bind(b), function () {
                return Promise.reject()
            }.bind(b))
        }

        function Id(b, c) {
            b.c[c].shift();
            var d = b.c[c][0];
            if (d) try {
                d.start()
            } catch (e) {
                d.p.reject(new A(2, 3, 3015, e)), Id(b, c)
            }
        };

        function Jd(b, c) {
            b = H(b);
            c = H(c);
            return b.split("-")[0] == c.split("-")[0]
        }

        function Kd(b, c) {
            b = H(b);
            c = H(c);
            var d = b.split("-"),
                e = c.split("-");
            return d[0] == e[0] && 1 == d.length && 2 == e.length
        }

        function H(b) {
            var c = b.split("-");
            b = c[0] || "";
            c = c[1] || "";
            b = b.toLowerCase();
            b = Ld.get(b) || b;
            return (c = c.toUpperCase()) ? b + "-" + c : b
        }

        function Md(b) {
            var c = b.indexOf("-");
            b = 0 <= c ? b.substring(0, c) : b;
            b = b.toLowerCase();
            return b = Ld.get(b) || b
        }

        function Nd(b) {
            return b.language ? H(b.language) : b.audio && b.audio.language ? H(b.audio.language) : b.video && b.video.language ? H(b.video.language) : "und"
        }

        function Od(b, c) {
            for (var d = H(b), e = new Set, f = q(c), g = f.next(); !g.done; g = f.next()) e.add(H(g.value));
            f = q(e);
            for (g = f.next(); !g.done; g = f.next())
                if (g = g.value, g == d) return g;
            f = q(e);
            for (g = f.next(); !g.done; g = f.next())
                if (g = g.value, Kd(g, d)) return g;
            f = q(e);
            for (g = f.next(); !g.done; g = f.next()) {
                var h = g = g.value,
                    k = d;
                h = H(h);
                k = H(k);
                h = h.split("-");
                k = k.split("-");
                if (2 == h.length && 2 == k.length && h[0] == k[0]) return g
            }
            e = q(e);
            for (g = e.next(); !g.done; g = e.next())
                if (f = g.value, Kd(d, f)) return f;
            return null
        }
        var Ld = new Map([
            ["aar", "aa"],
            ["abk", "ab"],
            ["afr", "af"],
            ["aka", "ak"],
            ["alb", "sq"],
            ["amh", "am"],
            ["ara", "ar"],
            ["arg", "an"],
            ["arm", "hy"],
            ["asm", "as"],
            ["ava", "av"],
            ["ave", "ae"],
            ["aym", "ay"],
            ["aze", "az"],
            ["bak", "ba"],
            ["bam", "bm"],
            ["baq", "eu"],
            ["bel", "be"],
            ["ben", "bn"],
            ["bih", "bh"],
            ["bis", "bi"],
            ["bod", "bo"],
            ["bos", "bs"],
            ["bre", "br"],
            ["bul", "bg"],
            ["bur", "my"],
            ["cat", "ca"],
            ["ces", "cs"],
            ["cha", "ch"],
            ["che", "ce"],
            ["chi", "zh"],
            ["chu", "cu"],
            ["chv", "cv"],
            ["cor", "kw"],
            ["cos", "co"],
            ["cre", "cr"],
            ["cym", "cy"],
            ["cze",
                "cs"
            ],
            ["dan", "da"],
            ["deu", "de"],
            ["div", "dv"],
            ["dut", "nl"],
            ["dzo", "dz"],
            ["ell", "el"],
            ["eng", "en"],
            ["epo", "eo"],
            ["est", "et"],
            ["eus", "eu"],
            ["ewe", "ee"],
            ["fao", "fo"],
            ["fas", "fa"],
            ["fij", "fj"],
            ["fin", "fi"],
            ["fra", "fr"],
            ["fre", "fr"],
            ["fry", "fy"],
            ["ful", "ff"],
            ["geo", "ka"],
            ["ger", "de"],
            ["gla", "gd"],
            ["gle", "ga"],
            ["glg", "gl"],
            ["glv", "gv"],
            ["gre", "el"],
            ["grn", "gn"],
            ["guj", "gu"],
            ["hat", "ht"],
            ["hau", "ha"],
            ["heb", "he"],
            ["her", "hz"],
            ["hin", "hi"],
            ["hmo", "ho"],
            ["hrv", "hr"],
            ["hun", "hu"],
            ["hye", "hy"],
            ["ibo", "ig"],
            ["ice",
                "is"
            ],
            ["ido", "io"],
            ["iii", "ii"],
            ["iku", "iu"],
            ["ile", "ie"],
            ["ina", "ia"],
            ["ind", "id"],
            ["ipk", "ik"],
            ["isl", "is"],
            ["ita", "it"],
            ["jav", "jv"],
            ["jpn", "ja"],
            ["kal", "kl"],
            ["kan", "kn"],
            ["kas", "ks"],
            ["kat", "ka"],
            ["kau", "kr"],
            ["kaz", "kk"],
            ["khm", "km"],
            ["kik", "ki"],
            ["kin", "rw"],
            ["kir", "ky"],
            ["kom", "kv"],
            ["kon", "kg"],
            ["kor", "ko"],
            ["kua", "kj"],
            ["kur", "ku"],
            ["lao", "lo"],
            ["lat", "la"],
            ["lav", "lv"],
            ["lim", "li"],
            ["lin", "ln"],
            ["lit", "lt"],
            ["ltz", "lb"],
            ["lub", "lu"],
            ["lug", "lg"],
            ["mac", "mk"],
            ["mah", "mh"],
            ["mal", "ml"],
            ["mao",
                "mi"
            ],
            ["mar", "mr"],
            ["may", "ms"],
            ["mkd", "mk"],
            ["mlg", "mg"],
            ["mlt", "mt"],
            ["mon", "mn"],
            ["mri", "mi"],
            ["msa", "ms"],
            ["mya", "my"],
            ["nau", "na"],
            ["nav", "nv"],
            ["nbl", "nr"],
            ["nde", "nd"],
            ["ndo", "ng"],
            ["nep", "ne"],
            ["nld", "nl"],
            ["nno", "nn"],
            ["nob", "nb"],
            ["nor", "no"],
            ["nya", "ny"],
            ["oci", "oc"],
            ["oji", "oj"],
            ["ori", "or"],
            ["orm", "om"],
            ["oss", "os"],
            ["pan", "pa"],
            ["per", "fa"],
            ["pli", "pi"],
            ["pol", "pl"],
            ["por", "pt"],
            ["pus", "ps"],
            ["que", "qu"],
            ["roh", "rm"],
            ["ron", "ro"],
            ["rum", "ro"],
            ["run", "rn"],
            ["rus", "ru"],
            ["sag", "sg"],
            ["san",
                "sa"
            ],
            ["sin", "si"],
            ["slk", "sk"],
            ["slo", "sk"],
            ["slv", "sl"],
            ["sme", "se"],
            ["smo", "sm"],
            ["sna", "sn"],
            ["snd", "sd"],
            ["som", "so"],
            ["sot", "st"],
            ["spa", "es"],
            ["sqi", "sq"],
            ["srd", "sc"],
            ["srp", "sr"],
            ["ssw", "ss"],
            ["sun", "su"],
            ["swa", "sw"],
            ["swe", "sv"],
            ["tah", "ty"],
            ["tam", "ta"],
            ["tat", "tt"],
            ["tel", "te"],
            ["tgk", "tg"],
            ["tgl", "tl"],
            ["tha", "th"],
            ["tib", "bo"],
            ["tir", "ti"],
            ["ton", "to"],
            ["tsn", "tn"],
            ["tso", "ts"],
            ["tuk", "tk"],
            ["tur", "tr"],
            ["twi", "tw"],
            ["uig", "ug"],
            ["ukr", "uk"],
            ["urd", "ur"],
            ["uzb", "uz"],
            ["ven", "ve"],
            ["vie",
                "vi"
            ],
            ["vol", "vo"],
            ["wel", "cy"],
            ["wln", "wa"],
            ["wol", "wo"],
            ["xho", "xh"],
            ["yid", "yi"],
            ["yor", "yo"],
            ["zha", "za"],
            ["zho", "zh"],
            ["zul", "zu"]
        ]);
        var I = {
            $c: function (b, c, d) {
                function e(b, c, d) {
                    return b >= c && b <= d
                }
                var f = b.video;
                return f && f.width && f.height && !(e(f.width, c.minWidth, Math.min(c.maxWidth, d.width)) && e(f.height, c.minHeight, Math.min(c.maxHeight, d.height)) && e(f.width * f.height, c.minPixels, c.maxPixels)) || !e(b.bandwidth, c.minBandwidth, c.maxBandwidth) ? !1 : !0
            },
            Wd: function (b, c, d) {
                var e = !1;
                b.forEach(function (b) {
                    var f = b.allowedByApplication;
                    b.allowedByApplication = I.$c(b, c, d);
                    f != b.allowedByApplication && (e = !0)
                });
                return e
            },
            filterNewPeriod: function (b,
                c, d, e) {
                e.variants = e.variants.filter(function (e) {
                    if (b && b.H && !Hc(b, e)) return !1;
                    var f = e.audio;
                    e = e.video;
                    return f && !wd(f) || e && !wd(e) || f && c && !I.Xd(f, c) || e && d && !I.Xd(e, d) ? !1 : !0
                });
                e.textStreams = e.textStreams.filter(function (b) {
                    return rd(Ob(b.mimeType, b.codecs))
                })
            },
            Xd: function (b, c) {
                return b.mimeType != c.mimeType || b.codecs.split(".")[0] != c.codecs.split(".")[0] ? !1 : !0
            },
            pf: function (b) {
                var c = b.audio,
                    d = b.video,
                    e = c ? c.codecs : null,
                    f = d ? d.codecs : null,
                    g = [];
                f && g.push(f);
                e && g.push(e);
                var h = [];
                d && h.push(d.mimeType);
                c && h.push(c.mimeType);
                h = h[0] || null;
                var k = [];
                c && k.push(c.kind);
                d && k.push(d.kind);
                k = k[0] || null;
                var l = new Set;
                c && c.roles.forEach(function (b) {
                    return l.add(b)
                });
                d && d.roles.forEach(function (b) {
                    return l.add(b)
                });
                b = {
                    id: b.id,
                    active: !1,
                    type: "variant",
                    bandwidth: b.bandwidth,
                    language: b.language,
                    label: null,
                    kind: k,
                    width: null,
                    height: null,
                    frameRate: null,
                    mimeType: h,
                    codecs: g.join(", "),
                    audioCodec: e,
                    videoCodec: f,
                    primary: b.primary,
                    roles: Array.from(l),
                    videoId: null,
                    audioId: null,
                    channelsCount: null,
                    audioBandwidth: null,
                    videoBandwidth: null,
                    originalVideoId: null,
                    originalAudioId: null,
                    originalTextId: null
                };
                d && (b.videoId = d.id, b.originalVideoId = d.originalId, b.width = d.width || null, b.height = d.height || null, b.frameRate = d.frameRate || null, b.videoBandwidth = d.bandwidth || null);
                c && (b.audioId = c.id, b.originalAudioId = c.originalId, b.channelsCount = c.channelsCount, b.audioBandwidth = c.bandwidth || null, b.label = c.label);
                return b
            },
            kf: function (b) {
                return {
                    id: b.id,
                    active: !1,
                    type: "text",
                    bandwidth: 0,
                    language: b.language,
                    label: b.label,
                    kind: b.kind || null,
                    width: null,
                    height: null,
                    frameRate: null,
                    mimeType: b.mimeType,
                    codecs: b.codecs || null,
                    audioCodec: null,
                    videoCodec: null,
                    primary: b.primary,
                    roles: b.roles,
                    videoId: null,
                    audioId: null,
                    channelsCount: null,
                    audioBandwidth: null,
                    videoBandwidth: null,
                    originalVideoId: null,
                    originalAudioId: null,
                    originalTextId: b.originalId
                }
            },
            Sa: function (b, c, d) {
                return I.pe(b.variants).map(function (b) {
                    var e = I.pf(b);
                    b.video && b.audio ? e.active = d == b.video.id && c == b.audio.id : b.video ? e.active = d == b.video.id : b.audio && (e.active = c == b.audio.id);
                    return e
                })
            },
            Wa: function (b, c) {
                return b.textStreams.map(function (b) {
                    var d =
                        I.kf(b);
                    d.active = c == b.id;
                    return d
                })
            },
            $f: function (b, c) {
                for (var d = 0; d < b.variants.length; d++)
                    if (b.variants[d].id == c.id) return b.variants[d];
                return null
            },
            Zf: function (b, c) {
                for (var d = 0; d < b.textStreams.length; d++)
                    if (b.textStreams[d].id == c.id) return b.textStreams[d];
                return null
            },
            Ub: function (b) {
                return b.allowedByApplication && b.allowedByKeySystem
            },
            pe: function (b) {
                return b.filter(function (b) {
                    return I.Ub(b)
                })
            },
            je: function (b, c) {
                var d = b.filter(function (b) {
                        return b.audio && b.audio.channelsCount
                    }).reduce(function (b,
                        c) {
                        var d = c.audio.channelsCount;
                        b[d] ? b[d].push(c) : b[d] = [c];
                        return b
                    }, {}),
                    e = Object.keys(d);
                if (0 == e.length) return b;
                var f = e.filter(function (b) {
                    return b <= c
                });
                return f.length ? d[Math.max.apply(null, f)] : d[Math.min.apply(null, e)]
            },
            lc: function (b, c, d) {
                var e = b,
                    f = b.filter(function (b) {
                        return b.primary
                    });
                f.length && (e = f);
                var g = e.length ? e[0].language : "";
                e = e.filter(function (b) {
                    return b.language == g
                });
                if (c) {
                    var h = Od(H(c), b.map(function (b) {
                        return b.language
                    }));
                    h && (e = b.filter(function (b) {
                        return H(b.language) == h
                    }))
                }
                if (d) {
                    if (b =
                        I.ie(e, d), b.length) return b
                } else if (b = e.filter(function (b) {
                        return 0 == b.roles.length
                    }), b.length) return b;
                b = e.map(function (b) {
                    return b.roles
                }).reduce(Hb.Mc, []);
                return b.length ? I.ie(e, b[0]) : e
            },
            ie: function (b, c) {
                return b.filter(function (b) {
                    return b.roles.includes(c)
                })
            },
            Vc: function (b, c, d) {
                for (var e = 0; e < d.length; e++)
                    if (d[e].audio == b && d[e].video == c) return d[e];
                return null
            },
            qg: function (b, c, d) {
                function e(b, c) {
                    return null == b ? null == c : c.id == b
                }
                for (var f = 0; f < d.length; f++)
                    if (e(b, d[f].audio) && e(c, d[f].video)) return d[f];
                return null
            },
            Qa: function (b, c) {
                for (var d = b.periods.length - 1; 0 < d; --d)
                    if (c + kd >= b.periods[d].startTime) return d;
                return 0
            },
            Pa: function (b, c) {
                for (var d = 0; d < b.periods.length; ++d) {
                    var e = b.periods[d];
                    if ("text" == c.type)
                        for (var f = 0; f < e.textStreams.length; ++f) {
                            if (e.textStreams[f] == c) return d
                        } else
                            for (f = 0; f < e.variants.length; ++f) {
                                var g = e.variants[f];
                                if (g.audio == c || g.video == c || g.video && g.video.trickModeVideo == c) return d
                            }
                }
                return -1
            },
            Yf: function (b, c) {
                for (var d = 0; d < b.periods.length; ++d)
                    for (var e = b.periods[d], f = 0; f <
                        e.variants.length; ++f)
                        if (e.variants[f] == c) return d;
                return -1
            },
            wg: function (b) {
                return "audio" == b.type
            },
            zg: function (b) {
                return "video" == b.type
            },
            le: function (b) {
                var c = [];
                b.periods.forEach(function (b) {
                    b.variants.forEach(function (b) {
                        c.push(b)
                    })
                });
                return c
            },
            rg: function (b) {
                var c = [];
                b.audio && c.push(b.audio);
                b.video && c.push(b.video);
                return c
            },
            Bi: function (b) {
                return I.wg(b) ? "type=audio codecs=" + b.codecs + " bandwidth=" + b.bandwidth + " channelsCount=" + b.channelsCount : I.zg(b) ? "type=video codecs=" + b.codecs + " bandwidth=" +
                    b.bandwidth + " frameRate=" + b.frameRate + " width=" + b.width + " height=" + b.height : "unexpected stream type"
            }
        };

        function J() {
            this.j = null;
            this.i = !1;
            this.b = new Ka;
            this.c = [];
            this.l = !1;
            this.a = this.f = null
        }
        y("shaka.abr.SimpleAbrManager", J);
        J.prototype.stop = function () {
            this.j = null;
            this.i = !1;
            this.c = [];
            this.f = null
        };
        J.prototype.stop = J.prototype.stop;
        J.prototype.init = function (b) {
            this.j = b
        };
        J.prototype.init = J.prototype.init;
        J.prototype.chooseVariant = function () {
            var b = Pd(this.a.restrictions, this.c),
                c = this.b.getBandwidthEstimate(this.a.defaultBandwidthEstimate);
            this.c.length && !b.length && (b = Pd(null, this.c), b = [b[0]]);
            for (var d = b[0] || null, e = 0; e < b.length; ++e) {
                var f = b[e],
                    g = (b[e + 1] || {
                        bandwidth: Infinity
                    }).bandwidth / this.a.bandwidthUpgradeTarget;
                c >= f.bandwidth / this.a.bandwidthDowngradeTarget && c <= g && (d = f)
            }
            this.f = Date.now();
            return d
        };
        J.prototype.chooseVariant = J.prototype.chooseVariant;
        J.prototype.enable = function () {
            this.i = !0
        };
        J.prototype.enable = J.prototype.enable;
        J.prototype.disable = function () {
            this.i = !1
        };
        J.prototype.disable = J.prototype.disable;
        J.prototype.segmentDownloaded = function (b, c) {
            var d = this.b;
            if (!(16E3 > c)) {
                var e = 8E3 * c / b,
                    f = b / 1E3;
                d.a += c;
                Ia(d.b, f, e);
                Ia(d.c, f, e)
            }
            if (null != this.f && this.i) a: {
                if (!this.l) {
                    if (!(128E3 <= this.b.a)) break a;
                    this.l = !0
                } else if (Date.now() - this.f < 1E3 * this.a.switchInterval) break a;d = this.chooseVariant();this.b.getBandwidthEstimate(this.a.defaultBandwidthEstimate);this.j(d)
            }
        };
        J.prototype.segmentDownloaded = J.prototype.segmentDownloaded;
        J.prototype.getBandwidthEstimate = function () {
            return this.b.getBandwidthEstimate(this.a.defaultBandwidthEstimate)
        };
        J.prototype.getBandwidthEstimate = J.prototype.getBandwidthEstimate;
        J.prototype.setVariants = function (b) {
            this.c = b
        };
        J.prototype.setVariants = J.prototype.setVariants;
        J.prototype.configure = function (b) {
            this.a = b
        };
        J.prototype.configure = J.prototype.configure;

        function Pd(b, c) {
            b && (c = c.filter(function (c) {
                return I.$c(c, b, {
                    width: Infinity,
                    height: Infinity
                })
            }));
            return c.sort(function (b, c) {
                return b.bandwidth - c.bandwidth
            })
        };
        var Qd = "ended play playing pause pausing ratechange seeked seeking timeupdate volumechange resize".split(" "),
            Rd = "buffered currentTime duration ended loop muted paused playbackRate seeking videoHeight videoWidth volume".split(" "),
            Sd = ["loop", "playbackRate"],
            Td = ["pause", "play"],
            Ud = "adaptation buffering emsg error loading streaming texttrackvisibility timelineregionadded timelineregionenter timelineregionexit trackschanged unloading variantchanged textchanged".split(" "),
            Vd = {
                getAssetUri: 2,
                getAudioLanguages: 2,
                getAudioLanguagesAndRoles: 2,
                getBufferedInfo: 2,
                getConfiguration: 2,
                getExpiration: 2,
                getPlaybackRate: 2,
                getTextLanguages: 2,
                getTextLanguagesAndRoles: 2,
                getTextTracks: 2,
                getStats: 5,
                usingEmbeddedTextTrack: 2,
                getVariantTracks: 2,
                isAudioOnly: 10,
                isBuffering: 1,
                isInProgress: 1,
                isLive: 10,
                isTextTrackVisible: 1,
                keySystem: 10,
                seekRange: 1
            },
            Wd = {
                getPlayheadTimeAsDate: 1,
                getPresentationStartTimeAsDate: 20
            },
            Xd = [
                ["getConfiguration", "configure"]
            ],
            Yd = [
                ["isTextTrackVisible", "setTextTrackVisibility"]
            ],
            Zd = "addTextTrack cancelTrickPlay configure resetConfiguration retryStreaming selectAudioLanguage selectEmbeddedTextTrack selectTextLanguage selectTextTrack selectVariantTrack setTextTrackVisibility trickPlay".split(" "),
            $d = ["attach", "detach", "load", "unload"];

        function ae(b) {
            return JSON.stringify(b, function (b, d) {
                if ("function" != typeof d) {
                    if (d instanceof Event || d instanceof D) {
                        var c = {},
                            f;
                        for (f in d) {
                            var g = d[f];
                            g && "object" == typeof g ? "detail" == f && (c[f] = g) : f in Event || (c[f] = g)
                        }
                        return c
                    }
                    if (d instanceof TimeRanges)
                        for (c = {
                                __type__: "TimeRanges",
                                length: d.length,
                                start: [],
                                end: []
                            }, f = 0; f < d.length; ++f) c.start.push(d.start(f)), c.end.push(d.end(f));
                    else c = "number" == typeof d ? isNaN(d) ? "NaN" : isFinite(d) ? d : 0 > d ? "-Infinity" : "Infinity" : d;
                    return c
                }
            })
        }

        function be(b) {
            return JSON.parse(b, function (b, d) {
                return "NaN" == d ? NaN : "-Infinity" == d ? -Infinity : "Infinity" == d ? Infinity : d && "object" == typeof d && "TimeRanges" == d.__type__ ? ce(d) : d
            })
        }

        function ce(b) {
            return {
                length: b.length,
                start: function (c) {
                    return b.start[c]
                },
                end: function (c) {
                    return b.end[c]
                }
            }
        };

        function de(b, c, d, e, f, g) {
            this.G = b;
            this.i = c;
            this.H = d;
            this.m = !1;
            this.B = e;
            this.C = f;
            this.w = g;
            this.b = this.j = !1;
            this.A = "";
            this.l = null;
            this.o = this.Be.bind(this);
            this.u = this.Ug.bind(this);
            this.a = {
                video: {},
                player: {}
            };
            this.v = 0;
            this.c = {};
            this.f = null
        }
        var ee = !1,
            fe = null;
        n = de.prototype;
        n.destroy = function () {
            ge(this);
            fe && he(this);
            this.C = this.B = this.i = null;
            this.b = this.j = !1;
            this.u = this.o = this.f = this.c = this.a = this.l = null;
            return Promise.resolve()
        };
        n.Y = function () {
            return this.b
        };
        n.Dc = function () {
            return this.A
        };
        n.init = function () {
            if (window.chrome && chrome.cast && chrome.cast.isAvailable) {
                delete window.__onGCastApiAvailable;
                this.j = !0;
                this.i();
                var b = new chrome.cast.SessionRequest(this.G);
                b = new chrome.cast.ApiConfig(b, this.Ce.bind(this), this.eh.bind(this), "origin_scoped");
                chrome.cast.initialize(b, function () {}, function () {});
                ee && setTimeout(this.i.bind(this), 20);
                (b = fe) && b.status != chrome.cast.SessionStatus.STOPPED ? this.Ce(b) : fe = null
            } else window.__onGCastApiAvailable = function (b) {
                b && this.init()
            }.bind(this)
        };
        n.qd = function (b) {
            this.l = b;
            this.b && ie({
                type: "appData",
                appData: this.l
            })
        };
        n.cast = function (b) {
            if (!this.j) return Promise.reject(new A(1, 8, 8E3));
            if (!ee) return Promise.reject(new A(1, 8, 8001));
            if (this.b) return Promise.reject(new A(1, 8, 8002));
            this.f = new z;
            chrome.cast.requestSession(this.hd.bind(this, b), this.Ae.bind(this));
            return this.f
        };
        n.nc = function () {
            this.b && (ge(this), fe && (he(this), fe.stop(function () {}, function () {}), fe = null))
        };
        n.get = function (b, c) {
            if ("video" == b) {
                if (Td.includes(c)) return this.Te.bind(this, b, c)
            } else if ("player" == b) {
                if (Wd[c] && !this.get("player", "isLive")()) return function () {};
                if (Zd.includes(c)) return this.Te.bind(this, b, c);
                if ($d.includes(c)) return this.Jh.bind(this, b, c);
                if (Vd[c]) return this.Qe.bind(this, b, c)
            }
            return this.Qe(b, c)
        };
        n.set = function (b, c, d) {
            this.a[b][c] = d;
            ie({
                type: "set",
                targetName: b,
                property: c,
                value: d
            })
        };
        n.hd = function (b, c) {
            fe = c;
            c.addUpdateListener(this.o);
            c.addMessageListener("urn:x-cast:com.google.shaka.v2", this.u);
            this.Be();
            ie({
                type: "init",
                initState: b,
                appData: this.l
            });
            this.f.resolve()
        };
        n.Ae = function (b) {
            var c = 8003;
            switch (b.code) {
                case "cancel":
                    c = 8004;
                    break;
                case "timeout":
                    c = 8005;
                    break;
                case "receiver_unavailable":
                    c = 8006
            }
            this.f.reject(new A(2, 8, c, b))
        };
        n.Qe = function (b, c) {
            return this.a[b][c]
        };
        n.Te = function (b, c, d) {
            for (var e = [], f = 2; f < arguments.length; ++f) e[f - 2] = arguments[f];
            ie({
                type: "call",
                targetName: b,
                methodName: c,
                args: e
            })
        };
        n.Jh = function (b, c, d) {
            for (var e = [], f = 2; f < arguments.length; ++f) e[f - 2] = arguments[f];
            f = new z;
            var g = this.v.toString();
            this.v++;
            this.c[g] = f;
            ie({
                type: "asyncCall",
                targetName: b,
                methodName: c,
                args: e,
                id: g
            });
            return f
        };
        n.Ce = function (b) {
            var c = this.w();
            this.f = new z;
            this.m = !0;
            this.hd(c, b)
        };
        n.eh = function (b) {
            ee = "available" == b;
            this.i()
        };

        function he(b) {
            var c = fe;
            c.removeUpdateListener(b.o);
            c.removeMessageListener("urn:x-cast:com.google.shaka.v2", b.u)
        }
        n.Be = function () {
            var b = fe ? "connected" == fe.status : !1;
            if (this.b && !b) {
                this.C();
                for (var c in this.a) this.a[c] = {};
                ge(this)
            }
            this.A = (this.b = b) ? fe.receiver.friendlyName : "";
            this.i()
        };

        function ge(b) {
            for (var c in b.c) {
                var d = b.c[c];
                delete b.c[c];
                d.reject(new A(1, 7, 7E3))
            }
        }
        n.Ug = function (b, c) {
            var d = be(c);
            switch (d.type) {
                case "event":
                    var e = d.event;
                    this.B(d.targetName, new D(e.type, e));
                    break;
                case "update":
                    e = d.update;
                    for (var f in e) {
                        d = this.a[f] || {};
                        for (var g in e[f]) d[g] = e[f][g]
                    }
                    this.m && (this.H(), this.m = !1);
                    break;
                case "asyncComplete":
                    if (f = d.id, d = d.error, g = this.c[f], delete this.c[f], g)
                        if (d) {
                            f = new A(d.severity, d.category, d.code);
                            for (e in d) f[e] = d[e];
                            g.reject(f)
                        } else g.resolve()
            }
        };

        function ie(b) {
            b = ae(b);
            fe.sendMessage("urn:x-cast:com.google.shaka.v2", b, function () {}, Ma)
        };

        function L(b, c, d) {
            E.call(this);
            this.c = b;
            this.b = c;
            this.l = this.i = this.f = this.m = this.j = null;
            this.a = new de(d, this.$h.bind(this), this.ai.bind(this), this.bi.bind(this), this.ci.bind(this), this.oe.bind(this));
            je(this)
        }
        Ga(L, E);
        y("shaka.cast.CastProxy", L);
        L.prototype.destroy = function (b) {
            b && this.a && this.a.nc();
            b = [this.l ? this.l.destroy() : null, this.b ? this.b.destroy() : null, this.a ? this.a.destroy() : null];
            this.a = this.l = this.m = this.j = this.b = this.c = null;
            return Promise.all(b)
        };
        L.prototype.destroy = L.prototype.destroy;
        L.prototype.sg = function () {
            return this.j
        };
        L.prototype.getVideo = L.prototype.sg;
        L.prototype.rc = function () {
            return this.m
        };
        L.prototype.getPlayer = L.prototype.rc;
        L.prototype.Yd = function () {
            return this.a ? this.a.j && ee : !1
        };
        L.prototype.canCast = L.prototype.Yd;
        L.prototype.Y = function () {
            return this.a ? this.a.Y() : !1
        };
        L.prototype.isCasting = L.prototype.Y;
        L.prototype.Dc = function () {
            return this.a ? this.a.Dc() : ""
        };
        L.prototype.receiverName = L.prototype.Dc;
        L.prototype.cast = function () {
            var b = this.oe();
            return this.a.cast(b).then(function () {
                if (this.b) return this.b.gc()
            }.bind(this))
        };
        L.prototype.cast = L.prototype.cast;
        L.prototype.qd = function (b) {
            this.a.qd(b)
        };
        L.prototype.setAppData = L.prototype.qd;
        L.prototype.jf = function () {
            var b = this.a;
            if (b.b) {
                var c = b.w();
                chrome.cast.requestSession(b.hd.bind(b, c), b.Ae.bind(b))
            }
        };
        L.prototype.suggestDisconnect = L.prototype.jf;
        L.prototype.nc = function () {
            this.a.nc()
        };
        L.prototype.forceDisconnect = L.prototype.nc;

        function je(b) {
            b.a.init();
            b.l = new Db;
            Qd.forEach(function (b) {
                G(this.l, this.c, b, this.oi.bind(this))
            }.bind(b));
            Ud.forEach(function (b) {
                G(this.l, this.b, b, this.Eh.bind(this))
            }.bind(b));
            b.j = {};
            for (var c in b.c) Object.defineProperty(b.j, c, {
                configurable: !1,
                enumerable: !0,
                get: b.ni.bind(b, c),
                set: b.pi.bind(b, c)
            });
            b.m = {};
            for (var d in b.b) Object.defineProperty(b.m, d, {
                configurable: !1,
                enumerable: !0,
                get: b.Pe.bind(b, d)
            });
            b.f = new E;
            b.f.wc = b.j;
            b.i = new E;
            b.i.wc = b.m
        }
        n = L.prototype;
        n.oe = function () {
            var b = {
                video: {},
                player: {},
                playerAfterLoad: {},
                manifest: this.b.Qc(),
                startTime: null
            };
            this.c.pause();
            Sd.forEach(function (c) {
                b.video[c] = this.c[c]
            }.bind(this));
            this.c.ended || (b.startTime = this.c.currentTime);
            Xd.forEach(function (c) {
                var d = c[1];
                c = this.b[c[0]]();
                b.player[d] = c
            }.bind(this));
            Yd.forEach(function (c) {
                var d = c[1];
                c = this.b[c[0]]();
                b.playerAfterLoad[d] = c
            }.bind(this));
            return b
        };
        n.$h = function () {
            this.dispatchEvent(new D("caststatuschanged"))
        };
        n.ai = function () {
            this.f.dispatchEvent(new D(this.j.paused ? "pause" : "play"))
        };
        n.ci = function () {
            var b = this;
            Xd.forEach(function (b) {
                var c = b[1];
                b = this.a.get("player", b[0])();
                this.b[c](b)
            }.bind(this));
            var c = this.a.get("player", "getAssetUri")(),
                d = this.a.get("video", "ended"),
                e = Promise.resolve(),
                f = this.c.autoplay,
                g = null;
            d || (g = this.a.get("video", "currentTime"));
            c && (this.c.autoplay = !1, e = this.b.load(c, g));
            var h = {};
            Sd.forEach(function (b) {
                h[b] = this.a.get("video", b)
            }.bind(this));
            e.then(function () {
                b.c && (Sd.forEach(function (b) {
                    this.c[b] = h[b]
                }.bind(b)), Yd.forEach(function (b) {
                    var c = b[1];
                    b = this.a.get("player",
                        b[0])();
                    this.b[c](b)
                }.bind(b)), b.c.autoplay = f, c && b.c.play())
            }, function (c) {
                b.b.dispatchEvent(new D("error", {
                    detail: c
                }))
            })
        };
        n.ni = function (b) {
            if ("addEventListener" == b) return this.f.addEventListener.bind(this.f);
            if ("removeEventListener" == b) return this.f.removeEventListener.bind(this.f);
            if (this.a.Y() && 0 == Object.keys(this.a.a.video).length) {
                var c = this.c[b];
                if ("function" != typeof c) return c
            }
            return this.a.Y() ? this.a.get("video", b) : (b = this.c[b], "function" == typeof b && (b = b.bind(this.c)), b)
        };
        n.pi = function (b, c) {
            this.a.Y() ? this.a.set("video", b, c) : this.c[b] = c
        };
        n.oi = function (b) {
            this.a.Y() || this.f.dispatchEvent(new D(b.type, b))
        };
        n.Pe = function (b) {
            if ("addEventListener" == b) return this.i.addEventListener.bind(this.i);
            if ("removeEventListener" == b) return this.i.removeEventListener.bind(this.i);
            if ("getMediaElement" == b) return function () {
                return this.j
            }.bind(this);
            if ("getSharedConfiguration" == b) return this.a.get("player", "getConfiguration");
            if ("getNetworkingEngine" == b) return this.b.Mb.bind(this.b);
            if (this.a.Y()) {
                if ("getManifest" == b || "drmInfo" == b) return function () {
                    La(b + "() does not work while casting!");
                    return null
                };
                if ("getManifestUri" ==
                    b) return La('"getManifestUri" is deprecated. Please use "getAssetUri".'), this.Pe("getAssetUri");
                if ("attach" == b || "detach" == b) return function () {
                    La(b + "() does not work while casting!");
                    return Promise.resolve()
                }
            }
            return this.a.Y() && 0 == Object.keys(this.a.a.video).length && Vd[b] || !this.a.Y() ? this.b[b].bind(this.b) : this.a.get("player", b)
        };
        n.Eh = function (b) {
            this.a.Y() || this.i.dispatchEvent(b)
        };
        n.bi = function (b, c) {
            this.a.Y() && ("video" == b ? this.f.dispatchEvent(c) : "player" == b && this.i.dispatchEvent(c))
        };

        function ke(b, c, d, e) {
            E.call(this);
            this.a = b;
            this.b = c;
            this.c = new Db;
            this.w = {
                video: b,
                player: c
            };
            this.A = d || function () {};
            this.B = e || function (b) {
                return b
            };
            this.v = !1;
            this.j = !0;
            this.i = 0;
            this.u = !1;
            this.m = !0;
            this.o = this.l = this.f = null;
            le(this)
        }
        Ga(ke, E);
        y("shaka.cast.CastReceiver", ke);
        ke.prototype.isConnected = function () {
            return this.v
        };
        ke.prototype.isConnected = ke.prototype.isConnected;
        ke.prototype.yg = function () {
            return this.j
        };
        ke.prototype.isIdle = ke.prototype.yg;
        ke.prototype.destroy = function () {
            var b = [this.c ? this.c.destroy() : null, this.b ? this.b.destroy() : null];
            null != this.o && window.clearTimeout(this.o);
            this.A = this.w = this.c = this.b = this.a = null;
            this.v = !1;
            this.j = !0;
            this.o = this.l = this.f = null;
            return Promise.all(b).then(function () {
                cast.receiver.CastReceiverManager.getInstance().stop()
            })
        };
        ke.prototype.destroy = ke.prototype.destroy;

        function le(b) {
            var c = cast.receiver.CastReceiverManager.getInstance();
            c.onSenderConnected = b.Me.bind(b);
            c.onSenderDisconnected = b.Me.bind(b);
            c.onSystemVolumeChanged = b.Wf.bind(b);
            b.l = c.getCastMessageBus("urn:x-cast:com.google.cast.media");
            b.l.onMessage = b.Og.bind(b);
            b.f = c.getCastMessageBus("urn:x-cast:com.google.shaka.v2");
            b.f.onMessage = b.lh.bind(b);
            c.start();
            Qd.forEach(function (b) {
                G(this.c, this.a, b, this.Re.bind(this, "video"))
            }.bind(b));
            Ud.forEach(function (b) {
                G(this.c, this.b, b, this.Re.bind(this, "player"))
            }.bind(b));
            cast.__platform__ && cast.__platform__.canDisplayType('video/mp4; codecs="avc1.640028"; width=3840; height=2160') ? b.b.sd(3840, 2160) : b.b.sd(1920, 1080);
            G(b.c, b.a, "loadeddata", function () {
                this.u = !0
            }.bind(b));
            G(b.c, b.b, "loading", function () {
                this.j = !1;
                me(this)
            }.bind(b));
            G(b.c, b.a, "playing", function () {
                this.j = !1;
                me(this)
            }.bind(b));
            G(b.c, b.a, "pause", function () {
                me(this)
            }.bind(b));
            G(b.c, b.b, "unloading", function () {
                this.j = !0;
                me(this)
            }.bind(b));
            G(b.c, b.a, "ended", function () {
                window.setTimeout(function () {
                    this.a && this.a.ended &&
                        (this.j = !0, me(this))
                }.bind(this), 5E3)
            }.bind(b))
        }
        n = ke.prototype;
        n.Me = function () {
            this.i = 0;
            this.m = !0;
            this.v = 0 != cast.receiver.CastReceiverManager.getInstance().getSenders().length;
            me(this)
        };

        function me(b) {
            Promise.resolve().then(function () {
                this.b && (this.dispatchEvent(new D("caststatuschanged")), ne(this) || oe(this, 0))
            }.bind(b))
        }

        function pe(b, c, d) {
            for (var e in c.player) b.b[e](c.player[e]);
            b.A(d);
            d = Promise.resolve();
            var f = b.a.autoplay;
            c.manifest && (b.a.autoplay = !1, d = b.b.load(c.manifest, c.startTime));
            d.then(function () {
                if (b.b) {
                    for (var d in c.video) b.a[d] = c.video[d];
                    for (var e in c.playerAfterLoad) b.b[e](c.playerAfterLoad[e]);
                    b.a.autoplay = f;
                    c.manifest && (b.a.play(), oe(b, 0))
                }
            }, function (c) {
                b.b.dispatchEvent(new D("error", {
                    detail: c
                }))
            })
        }
        n.Re = function (b, c) {
            this.b && (this.jd(), qe(this, {
                type: "event",
                targetName: b,
                event: c
            }, this.f))
        };
        n.jd = function () {
            null != this.o && window.clearTimeout(this.o);
            this.o = window.setTimeout(this.jd.bind(this), 500);
            var b = {
                video: {},
                player: {}
            };
            Rd.forEach(function (c) {
                b.video[c] = this.a[c]
            }.bind(this));
            if (this.b.aa())
                for (var c in Wd) 0 == this.i % Wd[c] && (b.player[c] = this.b[c]());
            for (var d in Vd) 0 == this.i % Vd[d] && (b.player[d] = this.b[d]());
            if (c = cast.receiver.CastReceiverManager.getInstance().getSystemVolume()) b.video.volume = c.level, b.video.muted = c.muted;
            this.u && (this.i += 1);
            qe(this, {
                type: "update",
                update: b
            }, this.f);
            ne(this)
        };

        function ne(b) {
            return b.m && (b.a.duration || b.b.aa()) ? (re(b), b.m = !1, !0) : !1
        }

        function re(b) {
            var c = {
                contentId: b.b.Qc(),
                streamType: b.b.aa() ? "LIVE" : "BUFFERED",
                duration: b.a.duration,
                contentType: ""
            };
            oe(b, 0, c)
        }
        n.Wf = function () {
            var b = cast.receiver.CastReceiverManager.getInstance().getSystemVolume();
            b && qe(this, {
                type: "update",
                update: {
                    video: {
                        volume: b.level,
                        muted: b.muted
                    }
                }
            }, this.f);
            qe(this, {
                type: "event",
                targetName: "video",
                event: {
                    type: "volumechange"
                }
            }, this.f)
        };
        n.lh = function (b) {
            var c = be(b.data);
            switch (c.type) {
                case "init":
                    this.i = 0;
                    this.u = !1;
                    this.m = !0;
                    pe(this, c.initState, c.appData);
                    this.jd();
                    break;
                case "appData":
                    this.A(c.appData);
                    break;
                case "set":
                    var d = c.targetName,
                        e = c.property;
                    c = c.value;
                    if ("video" == d) {
                        var f = cast.receiver.CastReceiverManager.getInstance();
                        if ("volume" == e) {
                            f.setSystemVolumeLevel(c);
                            break
                        } else if ("muted" == e) {
                            f.setSystemVolumeMuted(c);
                            break
                        }
                    }
                    this.w[d][e] = c;
                    break;
                case "call":
                    d = this.w[c.targetName];
                    d[c.methodName].apply(d, c.args);
                    break;
                case "asyncCall":
                    d =
                        c.targetName;
                    e = c.methodName;
                    "player" == d && "load" == e && (this.i = 0, this.u = !1);
                    f = c.id;
                    b = b.senderId;
                    var g = this.w[d];
                    c = g[e].apply(g, c.args);
                    "player" == d && "load" == e && (c = c.then(function () {
                        this.m = !0
                    }.bind(this)));
                    c.then(this.$e.bind(this, b, f, null), this.$e.bind(this, b, f))
            }
        };
        n.Og = function (b) {
            var c = be(b.data);
            switch (c.type) {
                case "PLAY":
                    this.a.play();
                    oe(this, 0);
                    break;
                case "PAUSE":
                    this.a.pause();
                    oe(this, 0);
                    break;
                case "SEEK":
                    b = c.currentTime;
                    var d = c.resumeState;
                    null != b && (this.a.currentTime = Number(b));
                    d && "PLAYBACK_START" == d ? (this.a.play(), oe(this, 0)) : d && "PLAYBACK_PAUSE" == d && (this.a.pause(), oe(this, 0));
                    break;
                case "STOP":
                    this.b.gc().then(function () {
                        this.b && oe(this, 0)
                    }.bind(this));
                    break;
                case "GET_STATUS":
                    oe(this, Number(c.requestId));
                    break;
                case "VOLUME":
                    d = c.volume;
                    b = d.level;
                    d =
                        d.muted;
                    var e = this.a.volume,
                        f = this.a.muted;
                    null != b && (this.a.volume = Number(b));
                    null != d && (this.a.muted = d);
                    e == this.a.volume && f == this.a.muted || oe(this, 0);
                    break;
                case "LOAD":
                    this.i = 0;
                    this.m = this.u = !1;
                    b = c.currentTime;
                    d = this.B(c.media.contentId);
                    this.a.autoplay = !0;
                    this.b.load(d, b).then(function () {
                        this.b && re(this)
                    }.bind(this))["catch"](function (b) {
                        var d = "LOAD_FAILED";
                        7 == b.category && 7E3 == b.code && (d = "LOAD_CANCELLED");
                        qe(this, {
                            requestId: Number(c.requestId),
                            type: d
                        }, this.l)
                    }.bind(this));
                    break;
                default:
                    qe(this, {
                        requestId: Number(c.requestId),
                        type: "INVALID_REQUEST",
                        reason: "INVALID_COMMAND"
                    }, this.l)
            }
        };
        n.$e = function (b, c, d) {
            this.b && qe(this, {
                type: "asyncComplete",
                id: c,
                error: d
            }, this.f, b)
        };

        function qe(b, c, d, e) {
            b.v && (b = ae(c), e ? d.getCastChannel(e).send(b) : d.broadcast(b))
        }

        function oe(b, c, d) {
            var e = b.a.playbackRate;
            var f = se;
            f = b.j ? f.IDLE : b.b.ve() ? f.Af : b.a.paused ? f.Jf : f.Kf;
            e = {
                mediaSessionId: 0,
                playbackRate: e,
                playerState: f,
                currentTime: b.a.currentTime,
                supportedMediaCommands: 15,
                volume: {
                    level: b.a.volume,
                    muted: b.a.muted
                }
            };
            d && (e.media = d);
            qe(b, {
                requestId: c,
                type: "MEDIA_STATUS",
                status: [e]
            }, b.l)
        }
        var se = {
            IDLE: "IDLE",
            Kf: "PLAYING",
            Af: "BUFFERING",
            Jf: "PAUSED"
        };
        var M = {
            mc: function (b, c) {
                var d = M.V(b, c);
                return 1 != d.length ? null : d[0]
            },
            V: function (b, c) {
                return Array.prototype.filter.call(b.childNodes, function (b) {
                    return b instanceof Element && b.tagName == c
                })
            },
            Xf: function (b, c, d) {
                return Array.prototype.filter.call(b.childNodes, function (b) {
                    return b instanceof Element && b.localName == d && b.namespaceURI == c
                })
            },
            getAttributeNS: function (b, c, d) {
                return b.hasAttributeNS(c, d) ? b.getAttributeNS(c, d) : null
            },
            pc: function (b) {
                return Array.prototype.every.call(b.childNodes, function (b) {
                    return b.nodeType ==
                        Node.TEXT_NODE || b.nodeType == Node.CDATA_SECTION_NODE
                }) ? b.textContent.trim() : null
            },
            M: function (b, c, d, e) {
                e = void 0 === e ? null : e;
                var f = null;
                b = b.getAttribute(c);
                null != b && (f = d(b));
                return null == f ? e : f
            },
            Ah: function (b) {
                if (!b) return null;
                /^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(b) && (b += "Z");
                b = Date.parse(b);
                return isNaN(b) ? null : Math.floor(b / 1E3)
            },
            Ua: function (b) {
                if (!b) return null;
                b = /^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$/.exec(b);
                if (!b) return null;
                b = 31536E3 *
                    Number(b[1] || null) + 2592E3 * Number(b[2] || null) + 86400 * Number(b[3] || null) + 3600 * Number(b[4] || null) + 60 * Number(b[5] || null) + Number(b[6] || null);
                return isFinite(b) ? b : null
            },
            zc: function (b) {
                var c = /([0-9]+)-([0-9]+)/.exec(b);
                if (!c) return null;
                b = Number(c[1]);
                if (!isFinite(b)) return null;
                c = Number(c[2]);
                return isFinite(c) ? {
                    start: b,
                    end: c
                } : null
            },
            parseInt: function (b) {
                b = Number(b);
                return 0 === b % 1 ? b : null
            },
            yc: function (b) {
                b = Number(b);
                return 0 === b % 1 && 0 < b ? b : null
            },
            Eb: function (b) {
                b = Number(b);
                return 0 === b % 1 && 0 <= b ? b : null
            },
            parseFloat: function (b) {
                b =
                    Number(b);
                return isNaN(b) ? null : b
            },
            Vf: function (b) {
                var c;
                b = (c = b.match(/^(\d+)\/(\d+)$/)) ? Number(c[1] / c[2]) : Number(b);
                return isNaN(b) ? null : b
            }
        };
        var te = (new Map).set("urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b", "org.w3.clearkey").set("urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed", "com.widevine.alpha").set("urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95", "com.microsoft.playready").set("urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb", "com.adobe.primetime");

        function ue(b, c, d) {
            var e = ve(b),
                f = null;
            b = [];
            var g = [],
                h = new Set(e.map(function (b) {
                    return b.keyId
                }));
            h["delete"](null);
            if (1 < h.size) throw new A(2, 4, 4010);
            d || (g = e.filter(function (b) {
                return "urn:mpeg:dash:mp4protection:2011" == b.We ? (f = b.init || f, !1) : !0
            }), g.length && (b = we(f, c, g), 0 == b.length && (b = [id("", f)])));
            if (e.length && (d || !g.length))
                for (b = [], c = q(te.values()), d = c.next(); !d.done; d = c.next()) d = d.value, "org.w3.clearkey" != d && b.push(id(d, f));
            if (h = Array.from(h)[0] || null)
                for (c = q(b), d = c.next(); !d.done; d = c.next())
                    for (d =
                        q(d.value.initData), e = d.next(); !e.done; e = d.next()) e.value.keyId = h;
            return {
                be: h,
                zi: f,
                drmInfos: b,
                ke: !0
            }
        }

        function xe(b, c, d, e) {
            var f = ue(b, c, e);
            if (d.ke) {
                b = 1 == d.drmInfos.length && !d.drmInfos[0].keySystem;
                c = 0 == f.drmInfos.length;
                if (0 == d.drmInfos.length || b && !c) d.drmInfos = f.drmInfos;
                d.ke = !1
            } else if (0 < f.drmInfos.length && (d.drmInfos = d.drmInfos.filter(function (b) {
                    return f.drmInfos.some(function (c) {
                        return c.keySystem == b.keySystem
                    })
                }), 0 == d.drmInfos.length)) throw new A(2, 4, 4008);
            return f.be || d.be
        }

        function we(b, c, d) {
            var e = [];
            d = q(d);
            for (var f = d.next(); !f.done; f = d.next()) {
                f = f.value;
                var g = te.get(f.We);
                if (g) e.push(id(g, f.init || b));
                else
                    for (f = c(f.node) || [], f = q(f), g = f.next(); !g.done; g = f.next()) e.push(g.value)
            }
            return e
        }

        function ve(b) {
            var c = [];
            b = q(b);
            for (var d = b.next(); !d.done; d = b.next())(d = ye(d.value)) && c.push(d);
            return c
        }

        function ye(b) {
            var c = b.getAttribute("schemeIdUri"),
                d = M.getAttributeNS(b, "urn:mpeg:cenc:2013", "default_KID"),
                e = M.Xf(b, "urn:mpeg:cenc:2013", "pssh").map(M.pc);
            if (!c) return null;
            c = c.toLowerCase();
            if (d && (d = d.replace(/-/g, "").toLowerCase(), d.includes(" "))) throw new A(2, 4, 4009);
            var f = [];
            try {
                f = e.map(function (b) {
                    return {
                        initDataType: "cenc",
                        initData: cc(b),
                        keyId: null
                    }
                })
            } catch (g) {
                throw new A(2, 4, 4007);
            }
            return {
                node: b,
                We: c,
                keyId: d,
                init: 0 < f.length ? f : null
            }
        };

        function ze(b, c, d, e, f) {
            var g = {
                RepresentationID: c,
                Number: d,
                Bandwidth: e,
                Time: f
            };
            return b.replace(/\$(RepresentationID|Number|Bandwidth|Time)?(?:%0([0-9]+)([diouxX]))?\$/g, function (b, c, d, e) {
                if ("$$" == b) return "$";
                var f = g[c];
                if (null == f) return b;
                "RepresentationID" == c && d && (d = void 0);
                "Time" == c && (f = Math.round(f));
                switch (e) {
                    case void 0:
                    case "d":
                    case "i":
                    case "u":
                        b = f.toString();
                        break;
                    case "o":
                        b = f.toString(8);
                        break;
                    case "x":
                        b = f.toString(16);
                        break;
                    case "X":
                        b = f.toString(16).toUpperCase();
                        break;
                    default:
                        b = f.toString()
                }
                d =
                    window.parseInt(d, 10) || 1;
                return Array(Math.max(0, d - b.length) + 1).join("0") + b
            })
        }

        function Ae(b, c) {
            var d = Be(b, c, "timescale"),
                e = 1;
            d && (e = M.yc(d) || 1);
            d = Be(b, c, "duration");
            (d = M.yc(d || "")) && (d /= e);
            var f = Be(b, c, "startNumber"),
                g = Number(Be(b, c, "presentationTimeOffset")) || 0,
                h = M.Eb(f || "");
            if (null == f || null == h) h = 1;
            var k = Ce(b, c, "SegmentTimeline");
            f = null;
            if (k) {
                f = e;
                var l = b.W.duration || Infinity;
                k = M.V(k, "S");
                for (var m = [], p = 0, u = 0; u < k.length; ++u) {
                    var w = k[u],
                        x = M.M(w, "t", M.Eb),
                        B = M.M(w, "d", M.Eb);
                    w = M.M(w, "r", M.parseInt);
                    null != x && (x -= g);
                    if (!B) break;
                    x = null != x ? x : p;
                    w = w || 0;
                    if (0 > w)
                        if (u + 1 < k.length) {
                            w = M.M(k[u +
                                1], "t", M.Eb);
                            if (null == w) break;
                            else if (x >= w) break;
                            w = Math.ceil((w - x) / B) - 1
                        } else {
                            if (Infinity == l) break;
                            else if (x / f >= l) break;
                            w = Math.ceil((l * f - x) / B) - 1
                        } 0 < m.length && x != p && (m[m.length - 1].end = x / f);
                    for (var K = 0; K <= w; ++K) p = x + B, m.push({
                        start: x / f,
                        end: p / f,
                        ki: x
                    }), x = p
                }
                f = m
            }
            return {
                timescale: e,
                ia: d,
                qb: h,
                Da: g / e || 0,
                zd: g,
                S: f
            }
        }

        function Be(b, c, d) {
            return [c(b.D), c(b.va), c(b.Ba)].filter(Hb.Xa).map(function (b) {
                return b.getAttribute(d)
            }).reduce(function (b, c) {
                return b || c
            })
        }

        function Ce(b, c, d) {
            return [c(b.D), c(b.va), c(b.Ba)].filter(Hb.Xa).map(function (b) {
                return M.mc(b, d)
            }).reduce(function (b, c) {
                return b || c
            })
        }

        function De(b, c) {
            var d = new DOMParser;
            try {
                var e = Sb(b);
                var f = d.parseFromString(e, "text/xml")
            } catch (h) {}
            if (f && f.documentElement.tagName == c) var g = f.documentElement;
            return g && 0 < g.getElementsByTagName("parsererror").length ? null : g
        }

        function Ee(b, c, d, e, f, g) {
            for (var h = M.getAttributeNS(b, "http://www.w3.org/1999/xlink", "href"), k = M.getAttributeNS(b, "http://www.w3.org/1999/xlink", "actuate") || "onRequest", l = 0; l < b.attributes.length; l++) {
                var m = b.attributes[l];
                "http://www.w3.org/1999/xlink" == m.namespaceURI && (b.removeAttributeNS(m.namespaceURI, m.localName), --l)
            }
            if (5 <= g) return fb(new A(2, 4, 4028));
            if ("onLoad" != k) return fb(new A(2, 4, 4027));
            var p = hd([e], [h]);
            return f.request(0, yb(p, c)).wa(function (e) {
                e = De(e.data, b.tagName);
                if (!e) return fb(new A(2,
                    4, 4001, h));
                for (; b.childNodes.length;) b.removeChild(b.childNodes[0]);
                for (; e.childNodes.length;) {
                    var k = e.childNodes[0];
                    e.removeChild(k);
                    b.appendChild(k)
                }
                for (k = 0; k < e.attributes.length; k++) {
                    var l = e.attributes[k].nodeName,
                        m = e.getAttribute(l);
                    b.setAttribute(l, m)
                }
                return Fe(b, c, d, p[0], f, g + 1)
            })
        }

        function Fe(b, c, d, e, f, g) {
            g = void 0 === g ? 0 : g;
            if (M.getAttributeNS(b, "http://www.w3.org/1999/xlink", "href")) {
                var h = Ee(b, c, d, e, f, g);
                d && (h = h.wa(void 0, function () {
                    return Fe(b, c, d, e, f, g)
                }));
                return h
            }
            h = [];
            for (var k = 0; k < b.childNodes.length; k++) {
                var l = b.childNodes[k];
                l instanceof Element && ("urn:mpeg:dash:resolve-to-zero:2013" == M.getAttributeNS(l, "http://www.w3.org/1999/xlink", "href") ? (b.removeChild(l), --k) : "SegmentTimeline" != l.tagName && h.push(Fe(l, c, d, e, f, g)))
            }
            return kb(h).wa(function () {
                return b
            })
        };

        function Ge(b, c, d) {
            this.c = b;
            this.b = c;
            this.a = d
        }
        y("shaka.media.InitSegmentReference", Ge);
        Ge.prototype.Nc = function () {
            return this.c()
        };
        Ge.prototype.createUris = Ge.prototype.Nc;
        Ge.prototype.Tc = function () {
            return this.b
        };
        Ge.prototype.getStartByte = Ge.prototype.Tc;
        Ge.prototype.Sc = function () {
            return this.a
        };
        Ge.prototype.getEndByte = Ge.prototype.Sc;

        function N(b, c, d, e, f, g) {
            this.position = b;
            this.startTime = c;
            this.endTime = d;
            this.c = e;
            this.b = f;
            this.a = g
        }
        y("shaka.media.SegmentReference", N);
        N.prototype.qa = function () {
            return this.position
        };
        N.prototype.getPosition = N.prototype.qa;
        N.prototype.Uc = function () {
            return this.startTime
        };
        N.prototype.getStartTime = N.prototype.Uc;
        N.prototype.gg = function () {
            return this.endTime
        };
        N.prototype.getEndTime = N.prototype.gg;
        N.prototype.Nc = function () {
            return this.c()
        };
        N.prototype.createUris = N.prototype.Nc;
        N.prototype.Tc = function () {
            return this.b
        };
        N.prototype.getStartByte = N.prototype.Tc;
        N.prototype.Sc = function () {
            return this.a
        };
        N.prototype.getEndByte = N.prototype.Sc;

        function O(b, c) {
            this.N = b;
            this.b = c == He;
            this.a = 0
        }
        y("shaka.util.DataViewReader", O);
        var He = 1;
        O.Endianness = {
            ti: 0,
            wi: He
        };
        O.prototype.Ga = function () {
            return this.a < this.N.byteLength
        };
        O.prototype.hasMoreData = O.prototype.Ga;
        O.prototype.qa = function () {
            return this.a
        };
        O.prototype.getPosition = O.prototype.qa;
        O.prototype.hg = function () {
            return this.N.byteLength
        };
        O.prototype.getLength = O.prototype.hg;
        O.prototype.Ca = function () {
            try {
                var b = this.N.getUint8(this.a);
                this.a += 1;
                return b
            } catch (c) {
                Ie()
            }
        };
        O.prototype.readUint8 = O.prototype.Ca;
        O.prototype.$b = function () {
            try {
                var b = this.N.getUint16(this.a, this.b);
                this.a += 2;
                return b
            } catch (c) {
                Ie()
            }
        };
        O.prototype.readUint16 = O.prototype.$b;
        O.prototype.J = function () {
            try {
                var b = this.N.getUint32(this.a, this.b);
                this.a += 4;
                return b
            } catch (c) {
                Ie()
            }
        };
        O.prototype.readUint32 = O.prototype.J;
        O.prototype.Se = function () {
            try {
                var b = this.N.getInt32(this.a, this.b);
                this.a += 4;
                return b
            } catch (c) {
                Ie()
            }
        };
        O.prototype.readInt32 = O.prototype.Se;
        O.prototype.Gb = function () {
            try {
                if (this.b) {
                    var b = this.N.getUint32(this.a, !0);
                    var c = this.N.getUint32(this.a + 4, !0)
                } else c = this.N.getUint32(this.a, !1), b = this.N.getUint32(this.a + 4, !1)
            } catch (d) {
                Ie()
            }
            if (2097151 < c) throw new A(2, 3, 3001);
            this.a += 8;
            return c * Math.pow(2, 32) + b
        };
        O.prototype.readUint64 = O.prototype.Gb;
        O.prototype.ob = function (b) {
            this.a + b > this.N.byteLength && Ie();
            var c = new Uint8Array(this.N.buffer, this.N.byteOffset + this.a, b);
            this.a += b;
            return new Uint8Array(c)
        };
        O.prototype.readBytes = O.prototype.ob;
        O.prototype.O = function (b) {
            this.a + b > this.N.byteLength && Ie();
            this.a += b
        };
        O.prototype.skip = O.prototype.O;
        O.prototype.Ve = function (b) {
            this.a < b && Ie();
            this.a -= b
        };
        O.prototype.rewind = O.prototype.Ve;
        O.prototype.seek = function (b) {
            (0 > b || b > this.N.byteLength) && Ie();
            this.a = b
        };
        O.prototype.seek = O.prototype.seek;
        O.prototype.kd = function () {
            for (var b = this.a; this.Ga() && 0 != this.N.getUint8(this.a);) this.a += 1;
            b = new Uint8Array(this.N.buffer, this.N.byteOffset + b, this.a - b);
            this.a += 1;
            return Sb(b)
        };
        O.prototype.readTerminatedString = O.prototype.kd;

        function Ie() {
            throw new A(2, 3, 3E3);
        };

        function P() {
            this.c = [];
            this.b = [];
            this.a = !1
        }
        y("shaka.util.Mp4Parser", P);
        P.prototype.L = function (b, c) {
            var d = Je(b);
            this.c[d] = 0;
            this.b[d] = c;
            return this
        };
        P.prototype.box = P.prototype.L;
        P.prototype.ya = function (b, c) {
            var d = Je(b);
            this.c[d] = 1;
            this.b[d] = c;
            return this
        };
        P.prototype.fullBox = P.prototype.ya;
        P.prototype.stop = function () {
            this.a = !0
        };
        P.prototype.stop = P.prototype.stop;
        P.prototype.parse = function (b, c) {
            var d = new Uint8Array(b);
            d = new O(new DataView(d.buffer, d.byteOffset, d.byteLength), 0);
            for (this.a = !1; d.Ga() && !this.a;) this.xc(0, d, c)
        };
        P.prototype.parse = P.prototype.parse;
        P.prototype.xc = function (b, c, d) {
            var e = c.qa(),
                f = c.J(),
                g = c.J();
            switch (f) {
                case 0:
                    f = c.N.byteLength - e;
                    break;
                case 1:
                    f = c.Gb()
            }
            var h = this.b[g];
            if (h) {
                var k = null,
                    l = null;
                1 == this.c[g] && (l = c.J(), k = l >>> 24, l &= 16777215);
                g = e + f;
                d && g > c.N.byteLength && (g = c.N.byteLength);
                g -= c.qa();
                c = 0 < g ? c.ob(g) : new Uint8Array(0);
                c = new O(new DataView(c.buffer, c.byteOffset, c.byteLength), 0);
                h({
                    parser: this,
                    partialOkay: d || !1,
                    version: k,
                    flags: l,
                    reader: c,
                    size: f,
                    start: e + b
                })
            } else c.O(Math.min(e + f - c.qa(), c.N.byteLength - c.qa()))
        };
        P.prototype.parseNext = P.prototype.xc;

        function Ke(b) {
            for (; b.reader.Ga() && !b.parser.a;) b.parser.xc(b.start, b.reader, b.partialOkay)
        }
        P.children = Ke;

        function Le(b) {
            for (var c = b.reader.J(); 0 < c && !b.parser.a; --c) b.parser.xc(b.start, b.reader, b.partialOkay)
        }
        P.sampleDescription = Le;

        function Me(b) {
            return function (c) {
                b(c.reader.ob(c.reader.N.byteLength - c.reader.qa()))
            }
        }
        P.allData = Me;

        function Je(b) {
            for (var c = 0, d = 0; d < b.length; d++) c = c << 8 | b.charCodeAt(d);
            return c
        }

        function Ne(b) {
            return String.fromCharCode(b >> 24 & 255, b >> 16 & 255, b >> 8 & 255, b & 255)
        }
        P.typeToString = Ne;

        function Oe(b, c, d, e) {
            var f, g = (new P).ya("sidx", function (b) {
                f = Pe(c, e, d, b)
            });
            b && g.parse(b);
            if (f) return f;
            throw new A(2, 3, 3004);
        }

        function Pe(b, c, d, e) {
            var f = [];
            e.reader.O(4);
            var g = e.reader.J();
            if (0 == g) throw new A(2, 3, 3005);
            if (0 == e.version) {
                var h = e.reader.J();
                var k = e.reader.J()
            } else h = e.reader.Gb(), k = e.reader.Gb();
            e.reader.O(2);
            var l = e.reader.$b();
            b = b + e.size + k;
            for (k = 0; k < l; k++) {
                var m = e.reader.J(),
                    p = (m & 2147483648) >>> 31;
                m &= 2147483647;
                var u = e.reader.J();
                e.reader.O(4);
                if (1 == p) throw new A(2, 3, 3006);
                f.push(new N(f.length, h / g - c, (h + u) / g - c, function () {
                    return d
                }, b, b + m - 1));
                h += u;
                b += m
            }
            e.parser.stop();
            return f
        };

        function Q(b) {
            this.a = b
        }
        y("shaka.media.SegmentIndex", Q);
        Q.prototype.destroy = function () {
            this.a = null;
            return Promise.resolve()
        };
        Q.prototype.destroy = Q.prototype.destroy;
        Q.prototype.find = function (b) {
            for (var c = this.a.length - 1; 0 <= c; --c) {
                var d = this.a[c];
                if (b >= d.startTime && b < d.endTime) return d.position
            }
            return this.a.length && b < this.a[0].startTime ? this.a[0].position : null
        };
        Q.prototype.find = Q.prototype.find;
        Q.prototype.get = function (b) {
            if (0 == this.a.length) return null;
            b -= this.a[0].position;
            return 0 > b || b >= this.a.length ? null : this.a[b]
        };
        Q.prototype.get = Q.prototype.get;
        Q.prototype.offset = function (b) {
            for (var c = 0; c < this.a.length; ++c) this.a[c].startTime += b, this.a[c].endTime += b
        };
        Q.prototype.offset = Q.prototype.offset;
        Q.prototype.ad = function (b) {
            for (var c = [], d = 0, e = 0; d < this.a.length && e < b.length;) {
                var f = this.a[d],
                    g = b[e];
                f.startTime < g.startTime ? (c.push(f), d++) : (f.startTime > g.startTime ? 0 == d && c.push(g) : (.1 < Math.abs(f.endTime - g.endTime) ? c.push(new N(f.position, g.startTime, g.endTime, g.c, g.b, g.a)) : c.push(f), d++), e++)
            }
            for (; d < this.a.length;) c.push(this.a[d++]);
            if (c.length)
                for (d = c[c.length - 1].position + 1; e < b.length;) f = b[e++], f = new N(d++, f.startTime, f.endTime, f.c, f.b, f.a), c.push(f);
            else c = b;
            this.a = c
        };
        Q.prototype.merge = Q.prototype.ad;
        Q.prototype.Oc = function (b) {
            for (var c = 0; c < this.a.length; ++c)
                if (this.a[c].endTime > b) {
                    this.a.splice(0, c);
                    return
                } this.a = []
        };
        Q.prototype.evict = Q.prototype.Oc;

        function Qe(b, c) {
            for (; b.a.length;)
                if (b.a[b.a.length - 1].startTime >= c) b.a.pop();
                else break;
            for (; b.a.length;)
                if (0 >= b.a[0].endTime) b.a.shift();
                else break;
            if (0 != b.a.length) {
                var d = b.a[b.a.length - 1];
                b.a[b.a.length - 1] = new N(d.position, d.startTime, c, d.c, d.b, d.a)
            }
        };

        function Re(b) {
            this.b = b;
            this.a = new O(b, 0);
            Se || (Se = [new Uint8Array([255]), new Uint8Array([127, 255]), new Uint8Array([63, 255, 255]), new Uint8Array([31, 255, 255, 255]), new Uint8Array([15, 255, 255, 255, 255]), new Uint8Array([7, 255, 255, 255, 255, 255]), new Uint8Array([3, 255, 255, 255, 255, 255, 255]), new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255])])
        }
        var Se;
        Re.prototype.Ga = function () {
            return this.a.Ga()
        };

        function Te(b) {
            var c = Ue(b);
            if (7 < c.length) throw new A(2, 3, 3002);
            for (var d = 0, e = 0; e < c.length; e++) d = 256 * d + c[e];
            c = d;
            d = Ue(b);
            a: {
                for (e = 0; e < Se.length; e++)
                    if (fc(d, Se[e])) {
                        e = !0;
                        break a
                    } e = !1
            }
            if (e) d = b.b.byteLength - b.a.qa();
            else {
                if (8 == d.length && d[1] & 224) throw new A(2, 3, 3001);
                e = d[0] & (1 << 8 - d.length) - 1;
                for (var f = 1; f < d.length; f++) e = 256 * e + d[f];
                d = e
            }
            d = b.a.qa() + d <= b.b.byteLength ? d : b.b.byteLength - b.a.qa();
            e = new DataView(b.b.buffer, b.b.byteOffset + b.a.qa(), d);
            b.a.O(d);
            return new Ve(c, e)
        }

        function Ue(b) {
            var c = b.a.Ca(),
                d;
            for (d = 1; 8 >= d && !(c & 1 << 8 - d); d++);
            if (8 < d) throw new A(2, 3, 3002);
            var e = new Uint8Array(d);
            e[0] = c;
            for (c = 1; c < d; c++) e[c] = b.a.Ca();
            return e
        }

        function Ve(b, c) {
            this.id = b;
            this.a = c
        }

        function We(b) {
            if (8 < b.a.byteLength) throw new A(2, 3, 3002);
            if (8 == b.a.byteLength && b.a.getUint8(0) & 224) throw new A(2, 3, 3001);
            for (var c = 0, d = 0; d < b.a.byteLength; d++) {
                var e = b.a.getUint8(d);
                c = 256 * c + e
            }
            return c
        };

        function Xe() {}
        Xe.prototype.parse = function (b, c, d, e) {
            var f;
            c = new Re(new DataView(c));
            if (440786851 != Te(c).id) throw new A(2, 3, 3008);
            var g = Te(c);
            if (408125543 != g.id) throw new A(2, 3, 3009);
            c = g.a.byteOffset;
            g = new Re(g.a);
            for (f = null; g.Ga();) {
                var h = Te(g);
                if (357149030 == h.id) {
                    f = h;
                    break
                }
            }
            if (!f) throw new A(2, 3, 3010);
            g = new Re(f.a);
            f = 1E6;
            for (h = null; g.Ga();) {
                var k = Te(g);
                if (2807729 == k.id) f = We(k);
                else if (17545 == k.id)
                    if (h = k, 4 == h.a.byteLength) h = h.a.getFloat32(0);
                    else if (8 == h.a.byteLength) h = h.a.getFloat64(0);
                else throw new A(2, 3, 3003);
            }
            if (null == h) throw new A(2, 3, 3011);
            g = f / 1E9;
            f = h * g;
            b = Te(new Re(new DataView(b)));
            if (475249515 != b.id) throw new A(2, 3, 3007);
            return Ye(b, c, g, f, d, e)
        };

        function Ye(b, c, d, e, f, g) {
            function h() {
                return f
            }
            var k = [];
            b = new Re(b.a);
            for (var l = null, m = null; b.Ga();) {
                var p = Te(b);
                if (187 == p.id) {
                    var u = Ze(p);
                    u && (p = d * u.li, u = c + u.Ih, null != l && k.push(new N(k.length, l - g, p - g, h, m, u - 1)), l = p, m = u)
                }
            }
            null != l && k.push(new N(k.length, l - g, e - g, h, m, null));
            return k
        }

        function Ze(b) {
            var c = new Re(b.a);
            b = Te(c);
            if (179 != b.id) throw new A(2, 3, 3013);
            b = We(b);
            c = Te(c);
            if (183 != c.id) throw new A(2, 3, 3012);
            c = new Re(c.a);
            for (var d = 0; c.Ga();) {
                var e = Te(c);
                if (241 == e.id) {
                    d = We(e);
                    break
                }
            }
            return {
                li: b,
                Ih: d
            }
        };

        function $e(b, c) {
            var d = Ce(b, c, "Initialization");
            if (!d) return null;
            var e = b.D.Ea,
                f = d.getAttribute("sourceURL");
            f && (e = hd(b.D.Ea, [f]));
            f = 0;
            var g = null;
            if (d = M.M(d, "range", M.zc)) f = d.start, g = d.end;
            return new Ge(function () {
                return e
            }, f, g)
        }

        function af(b, c) {
            var d = Number(Be(b, bf, "presentationTimeOffset")) || 0,
                e = Be(b, bf, "timescale"),
                f = 1;
            e && (f = M.yc(e) || 1);
            d = d / f || 0;
            e = $e(b, bf);
            var g = b.D.contentType;
            f = b.D.mimeType.split("/")[1];
            if ("text" != g && "mp4" != f && "webm" != f) throw new A(2, 4, 4006);
            if ("webm" == f && !e) throw new A(2, 4, 4005);
            g = Ce(b, bf, "RepresentationIndex");
            var h = Be(b, bf, "indexRange"),
                k = b.D.Ea;
            h = M.zc(h || "");
            if (g) {
                var l = g.getAttribute("sourceURL");
                l && (k = hd(b.D.Ea, [l]));
                h = M.M(g, "range", M.zc, h)
            }
            if (!h) throw new A(2, 4, 4002);
            f = cf(b, c, e, k, h.start, h.end,
                f, d);
            return {
                createSegmentIndex: f.createSegmentIndex,
                findSegmentPosition: f.findSegmentPosition,
                getSegmentReference: f.getSegmentReference,
                initSegmentReference: e,
                Da: d
            }
        }

        function cf(b, c, d, e, f, g, h, k) {
            var l = b.presentationTimeline,
                m = !b.xb || !b.W.Xc,
                p = b.W.start,
                u = b.W.duration,
                w = c,
                x = null;
            return {
                createSegmentIndex: function () {
                    var b = [w(e, f, g), "webm" == h ? w(d.c(), d.b, d.a) : null];
                    w = null;
                    return Promise.all(b).then(function (b) {
                        var c = b[0];
                        b = b[1] || null;
                        c = "mp4" == h ? Oe(c, f, e, k) : (new Xe).parse(c, b, e, k);
                        l.Cb(c, p);
                        x = new Q(c);
                        m && Qe(x, u)
                    })
                },
                findSegmentPosition: function (b) {
                    return x.find(b)
                },
                getSegmentReference: function (b) {
                    return x.get(b)
                }
            }
        }

        function bf(b) {
            return b.bc
        };

        function df(b, c) {
            var d = $e(b, ef);
            var e = ff(b);
            var f = Ae(b, ef),
                g = f.qb;
            0 == g && (g = 1);
            var h = 0;
            f.ia ? h = f.ia * (g - 1) : f.S && 0 < f.S.length && (h = f.S[0].start);
            e = {
                ia: f.ia,
                startTime: h,
                qb: g,
                Da: f.Da,
                S: f.S,
                Bb: e
            };
            if (!e.ia && !e.S && 1 < e.Bb.length) throw new A(2, 4, 4002);
            if (!e.ia && !b.W.duration && !e.S && 1 == e.Bb.length) throw new A(2, 4, 4002);
            if (e.S && 0 == e.S.length) throw new A(2, 4, 4002);
            g = f = null;
            b.Ba.id && b.D.id && (g = b.Ba.id + "," + b.D.id, f = c[g]);
            h = gf(b.W.duration, e.qb, b.D.Ea, e);
            f ? (f.ad(h), g = b.presentationTimeline.Pb(), f.Oc(g - b.W.start)) :
                (b.presentationTimeline.Cb(h, b.W.start), f = new Q(h), g && b.xb && (c[g] = f));
            b.xb && b.W.Xc || Qe(f, b.W.duration);
            return {
                createSegmentIndex: Promise.resolve.bind(Promise),
                findSegmentPosition: f.find.bind(f),
                getSegmentReference: f.get.bind(f),
                initSegmentReference: d,
                Da: e.Da
            }
        }

        function ef(b) {
            return b.$a
        }

        function gf(b, c, d, e) {
            var f = e.Bb.length;
            e.S && e.S.length != e.Bb.length && (f = Math.min(e.S.length, e.Bb.length));
            for (var g = [], h = e.startTime, k = 0; k < f; k++) {
                var l = e.Bb[k],
                    m = hd(d, [l.Cg]),
                    p = void 0;
                p = null != e.ia ? h + e.ia : e.S ? e.S[k].end : h + b;
                g.push(new N(k + c, h, p, function (b) {
                    return b
                }.bind(null, m), l.start, l.end));
                h = p
            }
            return g
        }

        function ff(b) {
            return [b.D.$a, b.va.$a, b.Ba.$a].filter(Hb.Xa).map(function (b) {
                return M.V(b, "SegmentURL")
            }).reduce(function (b, d) {
                return 0 < b.length ? b : d
            }).map(function (c) {
                c.getAttribute("indexRange") && !b.ue && (b.ue = !0);
                var d = c.getAttribute("media");
                c = M.M(c, "mediaRange", M.zc, {
                    start: 0,
                    end: null
                });
                return {
                    Cg: d,
                    start: c.start,
                    end: c.end
                }
            })
        };

        function hf(b, c, d, e) {
            var f = jf(b);
            var g = Ae(b, kf);
            var h = Be(b, kf, "media"),
                k = Be(b, kf, "index");
            g = {
                ia: g.ia,
                timescale: g.timescale,
                qb: g.qb,
                Da: g.Da,
                zd: g.zd,
                S: g.S,
                Zc: h,
                Tb: k
            };
            h = g.Tb ? 1 : 0;
            h += g.S ? 1 : 0;
            h += g.ia ? 1 : 0;
            if (0 == h) throw new A(2, 4, 4002);
            1 != h && (g.Tb && (g.S = null), g.ia = null);
            if (!g.Tb && !g.Zc) throw new A(2, 4, 4002);
            if (g.Tb) {
                d = b.D.mimeType.split("/")[1];
                if ("mp4" != d && "webm" != d) throw new A(2, 4, 4006);
                if ("webm" == d && !f) throw new A(2, 4, 4005);
                e = ze(g.Tb, b.D.id, null, b.bandwidth || null, null);
                e = hd(b.D.Ea, [e]);
                b = cf(b, c, f, e, 0,
                    null, d, g.Da)
            } else g.ia ? (e || (b.presentationTimeline.cd(g.ia), b.presentationTimeline.dd(b.W.start)), b = lf(b, g)) : (h = c = null, b.Ba.id && b.D.id && (h = b.Ba.id + "," + b.D.id, c = d[h]), k = mf(b, g), e = !b.xb || !b.W.Xc, c ? (e && Qe(new Q(k), b.W.duration), c.ad(k), d = b.presentationTimeline.Pb(), c.Oc(d - b.W.start)) : (b.presentationTimeline.Cb(k, b.W.start), c = new Q(k), h && b.xb && (d[h] = c)), e && Qe(c, b.W.duration), b = {
                createSegmentIndex: Promise.resolve.bind(Promise),
                findSegmentPosition: c.find.bind(c),
                getSegmentReference: c.get.bind(c)
            });
            return {
                createSegmentIndex: b.createSegmentIndex,
                findSegmentPosition: b.findSegmentPosition,
                getSegmentReference: b.getSegmentReference,
                initSegmentReference: f,
                Da: g.Da
            }
        }

        function kf(b) {
            return b.dc
        }

        function lf(b, c) {
            var d = b.W.duration,
                e = c.ia,
                f = c.qb,
                g = c.timescale,
                h = c.Zc,
                k = b.bandwidth || null,
                l = b.D.id,
                m = b.D.Ea;
            return {
                createSegmentIndex: Promise.resolve.bind(Promise),
                findSegmentPosition: function (b) {
                    return 0 > b || d && b >= d ? null : Math.floor(b / e)
                },
                getSegmentReference: function (b) {
                    var c = b * e,
                        p = c + e;
                    d && (p = Math.min(p, d));
                    return 0 > p || d && c >= d ? null : new N(b, c, p, function () {
                        var d = ze(h, l, b + f, k, c * g);
                        return hd(m, [d])
                    }, 0, null)
                }
            }
        }

        function mf(b, c) {
            for (var d = [], e = 0; e < c.S.length; e++) {
                var f = e + c.qb;
                d.push(new N(f, c.S[e].start, c.S[e].end, function (b, c, d, e, f, p) {
                    b = ze(b, c, f, d, p);
                    return hd(e, [b]).map(function (b) {
                        return b.toString()
                    })
                }.bind(null, c.Zc, b.D.id, b.bandwidth || null, b.D.Ea, f, c.S[e].ki + c.zd), 0, null))
            }
            return d
        }

        function jf(b) {
            var c = Be(b, kf, "initialization");
            if (!c) return null;
            var d = b.D.id,
                e = b.bandwidth || null,
                f = b.D.Ea;
            return new Ge(function () {
                var b = ze(c, d, null, e, null);
                return hd(f, [b])
            }, 0, null)
        };
        var nf = {},
            of = {};
        y("shaka.media.ManifestParser.registerParserByExtension", function (b, c) {
            of [b] = c
        });
        y("shaka.media.ManifestParser.registerParserByMime", function (b, c) {
            nf[b] = c
        });

        function pf() {
            var b = {},
                c;
            for (c in nf) b[c] = !0;
            for (var d in of ) b[d] = !0;
            ["application/dash+xml", "application/x-mpegurl", "application/vnd.apple.mpegurl", "application/vnd.ms-sstr+xml"].forEach(function (c) {
                b[c] = !!nf[c]
            });
            ["mpd", "m3u8", "ism"].forEach(function (c) {
                b[c] = !! of [c]
            });
            return b
        }

        function qf(b, c, d, e) {
            return r(function g() {
                var h;
                return v(g, function (g) {
                    switch (g.s) {
                        case 1:
                            return oa(g, 2), t(g, rf(b, c, d, e), 4);
                        case 4:
                            return g["return"](g.F);
                        case 2:
                            throw h = ra(g), h.severity = 2, h;
                    }
                })
            })
        }

        function rf(b, c, d, e) {
            return r(function g() {
                var h, k, l, m, p, u, w, x, B, K;
                return v(g, function (g) {
                    switch (g.s) {
                        case 1:
                            if (e && (h = e.toLowerCase(), k = nf[h])) return g["return"](k);
                            l = new Oa(b);
                            m = l.Aa.split("/");
                            p = m.pop();
                            u = p.split(".");
                            return 1 < u.length && (w = u.pop().toLowerCase(), x = of [w]) ? g["return"](x) : t(g, sf(b, c, d), 2);
                        case 2:
                            B = g.F;
                            if (K = nf[B]) return g["return"](K);
                            throw new A(2, 4, 4E3, b);
                    }
                })
            })
        }

        function sf(b, c, d) {
            return r(function f() {
                var g, h, k;
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            return g = yb([b], d), g.method = "HEAD", t(f, c.request(0, g).promise, 2);
                        case 2:
                            return h = f.F, k = h.headers["content-type"], f["return"](k ? k.toLowerCase() : "")
                    }
                })
            })
        };

        function S(b, c) {
            this.f = b;
            this.Ac = c;
            this.j = this.i = Infinity;
            this.a = 1;
            this.b = this.c = null;
            this.m = 0;
            this.o = !0;
            this.l = 0
        }
        y("shaka.media.PresentationTimeline", S);
        S.prototype.ha = function () {
            return this.i
        };
        S.prototype.getDuration = S.prototype.ha;
        S.prototype.Ja = function (b) {
            this.i = b
        };
        S.prototype.setDuration = S.prototype.Ja;
        S.prototype.ng = function () {
            return this.f
        };
        S.prototype.getPresentationStartTime = S.prototype.ng;
        S.prototype.bf = function (b) {
            this.m = b
        };
        S.prototype.setClockOffset = S.prototype.bf;
        S.prototype.ec = function (b) {
            this.o = b
        };
        S.prototype.setStatic = S.prototype.ec;
        S.prototype.td = function (b) {
            this.j = b
        };
        S.prototype.setSegmentAvailabilityDuration = S.prototype.td;
        S.prototype.Uh = function (b) {
            this.Ac = b
        };
        S.prototype.setDelay = S.prototype.Uh;
        S.prototype.fg = function () {
            return this.Ac
        };
        S.prototype.getDelay = S.prototype.fg;
        S.prototype.Cb = function (b, c) {
            if (0 != b.length) {
                var d = b[b.length - 1].endTime + c;
                this.dd(b[0].startTime + c);
                this.a = b.reduce(function (b, c) {
                    return Math.max(b, c.endTime - c.startTime)
                }, this.a);
                this.b = Math.max(this.b, d);
                null != this.f && (this.f = (Date.now() + this.m) / 1E3 - this.b - this.a)
            }
        };
        S.prototype.notifySegments = S.prototype.Cb;
        S.prototype.dd = function (b) {
            this.c = null == this.c ? b : Math.min(this.c, b)
        };
        S.prototype.notifyMinSegmentStartTime = S.prototype.dd;
        S.prototype.cd = function (b) {
            this.a = Math.max(this.a, b)
        };
        S.prototype.notifyMaxSegmentDuration = S.prototype.cd;
        S.prototype.offset = function (b) {
            null != this.c && (this.c += b);
            null != this.b && (this.b += b)
        };
        S.prototype.offset = S.prototype.offset;
        S.prototype.aa = function () {
            return Infinity == this.i && !this.o
        };
        S.prototype.isLive = S.prototype.aa;
        S.prototype.hb = function () {
            return Infinity != this.i && !this.o
        };
        S.prototype.isInProgress = S.prototype.hb;
        S.prototype.Pb = function () {
            if (Infinity == this.j) return this.l;
            var b = this.zb() - this.j;
            return Math.max(this.l, b)
        };
        S.prototype.getSegmentAvailabilityStart = S.prototype.Pb;
        S.prototype.df = function (b) {
            this.l = b
        };
        S.prototype.setUserSeekStart = S.prototype.df;
        S.prototype.zb = function () {
            return this.aa() || this.hb() ? Math.min(Math.max(0, (Date.now() + this.m) / 1E3 - this.a - this.f), this.i) : this.i
        };
        S.prototype.getSegmentAvailabilityEnd = S.prototype.zb;
        S.prototype.Ob = function (b) {
            var c = Math.max(this.c, this.l);
            if (Infinity == this.j) return c;
            var d = this.zb() - this.j;
            b = Math.min(d + b, this.Ra());
            return Math.max(c, b)
        };
        S.prototype.getSafeSeekRangeStart = S.prototype.Ob;
        S.prototype.yb = function () {
            return this.Ob(0)
        };
        S.prototype.getSeekRangeStart = S.prototype.yb;
        S.prototype.Ra = function () {
            var b = this.aa() || this.hb() ? this.Ac : 0;
            return Math.max(0, this.zb() - b)
        };
        S.prototype.getSeekRangeEnd = S.prototype.Ra;
        S.prototype.mf = function () {
            return null == this.f || null != this.b ? !1 : !0
        };
        S.prototype.usingPresentationStartTime = S.prototype.mf;

        function tf() {
            this.a = this.b = null;
            this.j = [];
            this.c = null;
            this.m = [];
            this.l = 1;
            this.o = {};
            this.u = 0;
            this.v = new Ha(5);
            this.i = null;
            this.f = new sb
        }
        y("shaka.dash.DashParser", tf);
        n = tf.prototype;
        n.configure = function (b) {
            this.b = b
        };
        n.start = function (b, c) {
            this.j = [b];
            this.a = c;
            return uf(this).then(function (b) {
                this.a && vf(this, b);
                return this.c
            }.bind(this))
        };
        n.stop = function () {
            this.b = this.a = null;
            this.j = [];
            this.c = null;
            this.m = [];
            this.o = {};
            null != this.i && (window.clearTimeout(this.i), this.i = null);
            return this.f.destroy()
        };
        n.update = function () {
            uf(this)["catch"](function (b) {
                if (this.a) this.a.onError(b)
            }.bind(this))
        };
        n.onExpirationUpdated = function () {};

        function uf(b) {
            var c = Date.now(),
                d = b.a.networkingEngine.request(0, yb(b.j, b.b.retryParameters));
            tb(b.f, d);
            return d.promise.then(function (c) {
                if (b.a) return wf(b, c.data, c.uri)
            }).then(function () {
                var d = (Date.now() - c) / 1E3;
                Ia(b.v, 1, d);
                return d
            })
        }

        function wf(b, c, d) {
            c = De(c, "MPD");
            if (!c) throw new A(2, 4, 4001, d);
            c = Fe(c, b.b.retryParameters, b.b.dash.xlinkFailGracefully, d, b.a.networkingEngine);
            tb(b.f, c);
            return c.promise.then(function (c) {
                return xf(b, c, d)
            })
        }

        function xf(b, c, d) {
            return r(function f() {
                var g, h, k, l, m, p, u, w, x, B, K, U, R, Y, sa, za, ca, Yb, Zb, Sc, $b, vb, Ag, Bg, Cg;
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            l = Hb;
                            m = M;
                            p = [d];
                            u = m.V(c, "Location").map(m.pc).filter(l.Xa);
                            0 < u.length && (p = b.j = u);
                            w = m.V(c, "BaseURL").map(m.pc);
                            x = hd(p, w);
                            (B = b.b.dash.ignoreMinBufferTime) || (K = m.M(c, "minBufferTime", m.Ua));
                            b.u = m.M(c, "minimumUpdatePeriod", m.Ua, -1);
                            U = m.M(c, "availabilityStartTime", m.Ah);
                            R = m.M(c, "timeShiftBufferDepth", m.Ua);
                            Y = m.M(c, "suggestedPresentationDelay", m.Ua);
                            sa = m.M(c,
                                "maxSegmentDuration", m.Ua);
                            za = c.getAttribute("type") || "static";
                            b.c ? ca = b.c.presentationTimeline : (Yb = Math.max(b.b.dash.defaultPresentationDelay, 1.5 * K), Zb = null != Y ? Y : Yb, ca = new S(U, Zb));
                            Sc = {
                                xb: "static" != za,
                                presentationTimeline: ca,
                                Ba: null,
                                W: null,
                                va: null,
                                D: null,
                                bandwidth: 0,
                                ue: !1
                            };
                            for (var Dg = Sc, lk = x, Tc = M.M(c, "mediaPresentationDuration", M.Ua), Uc = [], Xa = 0, ac = M.V(c, "Period"), wb = 0; wb < ac.length; wb++) {
                                var ib = ac[wb];
                                Xa = M.M(ib, "start", M.Ua, Xa);
                                var Vc = M.M(ib, "duration", M.Ua),
                                    Ya = null;
                                if (wb != ac.length - 1) {
                                    var Eg = M.M(ac[wb +
                                        1], "start", M.Ua);
                                    null != Eg && (Ya = Eg - Xa)
                                } else null != Tc && (Ya = Tc - Xa);
                                null == Ya && (Ya = Vc);
                                ib = yf(b, Dg, lk, {
                                    start: Xa,
                                    duration: Ya,
                                    node: ib,
                                    Xc: null == Ya || wb == ac.length - 1
                                });
                                Uc.push(ib);
                                Vc = Dg.Ba.id;
                                b.m.includes(Vc) || (b.m.push(Vc), b.c && (b.a.filterNewPeriod(ib), b.c.periods.push(ib)));
                                if (null == Ya) {
                                    Xa = null;
                                    break
                                }
                                Xa += Ya
                            }
                            null == b.c && b.a.filterAllPeriods(Uc);
                            null != Tc ? (g = Uc, h = Tc, k = !1) : (g = Uc, h = Xa, k = !0);
                            $b = h;
                            vb = g;
                            ca.ec("static" == za);
                            "static" != za && k || ca.Ja($b || Infinity);
                            (Ag = ca.aa()) && !isNaN(b.b.availabilityWindowOverride) && (R =
                                b.b.availabilityWindowOverride);
                            null == R && (R = Infinity);
                            ca.td(R);
                            ca.cd(sa || 1);
                            if (b.c) {
                                f.I(0);
                                break
                            }
                            b.c = {
                                presentationTimeline: ca,
                                periods: vb,
                                offlineSessionIds: [],
                                minBufferTime: K || 0
                            };
                            if (!ca.mf()) {
                                f.I(0);
                                break
                            }
                            Bg = m.V(c, "UTCTiming");
                            return t(f, zf(b, x, Bg, Ag), 4);
                        case 4:
                            Cg = f.F;
                            if (!b.a) return f["return"]();
                            ca.bf(Cg);
                            f.s = 0
                    }
                })
            })
        }

        function yf(b, c, d, e) {
            c.Ba = Af(e.node, null, d);
            c.W = e;
            c.Ba.id || (c.Ba.id = "__shaka_period_" + e.start);
            M.V(e.node, "EventStream").forEach(b.Ch.bind(b, e.start, e.duration));
            d = M.V(e.node, "AdaptationSet").map(b.yh.bind(b, c)).filter(Hb.Xa);
            if (c.xb) {
                c = [];
                for (var f = q(d), g = f.next(); !g.done; g = f.next()) {
                    g = q(g.value.Lh);
                    for (var h = g.next(); !h.done; h = g.next()) c.push(h.value)
                }
                if (c.length != (new Set(c)).size) throw new A(2, 4, 4018);
            }
            var k = d.filter(function (b) {
                return !b.wd
            });
            d.filter(function (b) {
                return b.wd
            }).forEach(function (b) {
                var c =
                    b.streams[0],
                    d = b.wd;
                k.forEach(function (b) {
                    b.id == d && b.streams.forEach(function (b) {
                        b.trickModeVideo = c
                    })
                })
            });
            c = Bf(k, "video");
            f = Bf(k, "audio");
            if (!c.length && !f.length) throw new A(2, 4, 4004);
            f.length || (f = [null]);
            c.length || (c = [null]);
            d = [];
            for (g = 0; g < f.length; g++)
                for (h = 0; h < c.length; h++) Cf(b, f[g], c[h], d);
            b = Bf(k, "text");
            c = [];
            for (f = 0; f < b.length; f++) c.push.apply(c, b[f].streams);
            return {
                startTime: e.start,
                textStreams: c,
                variants: d
            }
        }

        function Bf(b, c) {
            return b.filter(function (b) {
                return b.contentType == c
            })
        }

        function Cf(b, c, d, e) {
            if (c || d)
                if (c && d) {
                    var f = c.drmInfos;
                    var g = d.drmInfos;
                    if (f.length && g.length ? 0 < Jc(f, g).length : 1) {
                        g = Jc(c.drmInfos, d.drmInfos);
                        for (var h = 0; h < c.streams.length; h++)
                            for (var k = 0; k < d.streams.length; k++) f = (d.streams[k].bandwidth || 0) + (c.streams[h].bandwidth || 0), f = {
                                id: b.l++,
                                language: c.language,
                                primary: c.Yc || d.Yc,
                                audio: c.streams[h],
                                video: d.streams[k],
                                bandwidth: f,
                                drmInfos: g,
                                allowedByApplication: !0,
                                allowedByKeySystem: !0
                            }, e.push(f)
                    }
                } else
                    for (g = c || d, h = 0; h < g.streams.length; h++) f = g.streams[h].bandwidth ||
                        0, f = {
                            id: b.l++,
                            language: g.language || "und",
                            primary: g.Yc,
                            audio: c ? g.streams[h] : null,
                            video: d ? g.streams[h] : null,
                            bandwidth: f,
                            drmInfos: g.drmInfos,
                            allowedByApplication: !0,
                            allowedByKeySystem: !0
                        }, e.push(f)
        }
        n.yh = function (b, c) {
            b.va = Af(c, b.Ba, null);
            var d = !1,
                e = M.V(c, "Role"),
                f = e.map(function (b) {
                    return b.getAttribute("value")
                }).filter(Hb.Xa),
                g = void 0,
                h = "text" == b.va.contentType;
            h && (g = "subtitle");
            for (var k = 0; k < e.length; k++) {
                var l = e[k].getAttribute("schemeIdUri");
                if (null == l || "urn:mpeg:dash:role:2011" == l) switch (l = e[k].getAttribute("value"), l) {
                    case "main":
                        d = !0;
                        break;
                    case "caption":
                    case "subtitle":
                        g = l
                }
            }
            var m = null,
                p = !1;
            M.V(c, "EssentialProperty").forEach(function (b) {
                "http://dashif.org/guidelines/trickmode" == b.getAttribute("schemeIdUri") ?
                    m = b.getAttribute("value") : p = !0
            });
            k = M.V(c, "Accessibility");
            var u = new Map;
            e = {};
            k = q(k);
            for (l = k.next(); !l.done; e = {
                    Kb: e.Kb
                }, l = k.next()) {
                l = l.value;
                var w = l.getAttribute("schemeIdUri");
                if ("urn:scte:dash:cc:cea-608:2015" == w || "urn:scte:dash:cc:cea-708:2015" == w) e.Kb = 1, l = l.getAttribute("value"), null != l ? l.split(";").forEach(function (b) {
                        return function (c) {
                            if (c.includes("=")) {
                                c = c.split("=");
                                var d = c[0].startsWith("CC") ? c[0] : "CC" + c[0];
                                c = c[1].split(",")[0].split(":").pop()
                            } else d = "CC" + b.Kb, b.Kb += 2;
                            u.set(d, H(c))
                        }
                    }(e)) :
                    u.set("CC1", "und")
            }
            if (p) return null;
            e = M.V(c, "ContentProtection");
            var x = ue(e, this.b.dash.customScheme, this.b.dash.ignoreDrmInfo);
            e = H(c.getAttribute("lang") || "und");
            l = c.getAttribute("label");
            k = M.V(c, "Representation");
            f = k.map(this.Dh.bind(this, b, x, g, e, l, d, f, u)).filter(function (b) {
                return !!b
            });
            if (0 == f.length) {
                if (h) return null;
                throw new A(2, 4, 4003);
            }
            b.va.contentType && "application" != b.va.contentType || (b.va.contentType = Df(f[0].mimeType, f[0].codecs), f.forEach(function (c) {
                c.type = b.va.contentType
            }));
            f.forEach(function (b) {
                x.drmInfos.forEach(function (c) {
                    b.keyId &&
                        c.keyIds.push(b.keyId)
                })
            });
            h = k.map(function (b) {
                return b.getAttribute("id")
            }).filter(Hb.Xa);
            return {
                id: b.va.id || "__fake__" + this.l++,
                contentType: b.va.contentType,
                language: e,
                Yc: d,
                streams: f,
                drmInfos: x.drmInfos,
                wd: m,
                Lh: h
            }
        };
        n.Dh = function (b, c, d, e, f, g, h, k, l) {
            b.D = Af(l, b.va, null);
            if (!Ef(b.D)) return null;
            b.bandwidth = M.M(l, "bandwidth", M.yc) || 0;
            var m = b.D.contentType;
            m = "text" == m || "application" == m;
            try {
                var p = this.Mh.bind(this);
                if (b.D.bc) var u = af(b, p);
                else if (b.D.$a) u = df(b, this.o);
                else if (b.D.dc) u = hf(b, p, this.o, !!this.c);
                else {
                    var w = b.D.Ea,
                        x = b.W.duration || 0;
                    u = {
                        createSegmentIndex: Promise.resolve.bind(Promise),
                        findSegmentPosition: function (b) {
                            return 0 <= b && b < x ? 1 : null
                        },
                        getSegmentReference: function (b) {
                            return 1 != b ? null : new N(1, 0, x, function () {
                                    return w
                                },
                                0, null)
                        },
                        initSegmentReference: null,
                        Da: 0
                    }
                }
            } catch (B) {
                if (m && 4002 == B.code) return null;
                throw B;
            }
            l = M.V(l, "ContentProtection");
            l = xe(l, this.b.dash.customScheme, c, this.b.dash.ignoreDrmInfo);
            return {
                id: this.l++,
                originalId: b.D.id,
                createSegmentIndex: u.createSegmentIndex,
                findSegmentPosition: u.findSegmentPosition,
                getSegmentReference: u.getSegmentReference,
                initSegmentReference: u.initSegmentReference,
                presentationTimeOffset: u.Da,
                mimeType: b.D.mimeType,
                codecs: b.D.codecs,
                frameRate: b.D.frameRate,
                bandwidth: b.bandwidth,
                width: b.D.width,
                height: b.D.height,
                kind: d,
                encrypted: 0 < c.drmInfos.length,
                keyId: l,
                language: e,
                label: f,
                type: b.va.contentType,
                primary: g,
                trickModeVideo: null,
                emsgSchemeIdUris: b.D.emsgSchemeIdUris,
                roles: h,
                channelsCount: b.D.ed,
                closedCaptions: k
            }
        };
        n.di = function () {
            this.i = null;
            uf(this).then(function (b) {
                this.a && vf(this, b)
            }.bind(this))["catch"](function (b) {
                this.a && (b.severity = 1, this.a.onError(b), vf(this, 0))
            }.bind(this))
        };

        function vf(b, c) {
            0 > b.u || (b.i = window.setTimeout(b.di.bind(b), 1E3 * Math.max(3, b.u - c, Ja(b.v))))
        }

        function Af(b, c, d) {
            c = c || {
                contentType: "",
                mimeType: "",
                codecs: "",
                emsgSchemeIdUris: [],
                frameRate: void 0,
                ed: null
            };
            d = d || c.Ea;
            var e = M.Eb,
                f = M.Vf,
                g = M.V(b, "BaseURL").map(M.pc),
                h = b.getAttribute("contentType") || c.contentType,
                k = b.getAttribute("mimeType") || c.mimeType,
                l = b.getAttribute("codecs") || c.codecs;
            f = M.M(b, "frameRate", f) || c.frameRate;
            var m = M.V(b, "InbandEventStream"),
                p = c.emsgSchemeIdUris.slice();
            m = q(m);
            for (var u = m.next(); !u.done; u = m.next()) u = u.value.getAttribute("schemeIdUri"), p.includes(u) || p.push(u);
            m = M.V(b,
                "AudioChannelConfiguration");
            m = Ff(m) || c.ed;
            h || (h = Df(k, l));
            return {
                Ea: hd(d, g),
                bc: M.mc(b, "SegmentBase") || c.bc,
                $a: M.mc(b, "SegmentList") || c.$a,
                dc: M.mc(b, "SegmentTemplate") || c.dc,
                width: M.M(b, "width", e) || c.width,
                height: M.M(b, "height", e) || c.height,
                contentType: h,
                mimeType: k,
                codecs: l,
                frameRate: f,
                emsgSchemeIdUris: p,
                id: b.getAttribute("id"),
                ed: m
            }
        }

        function Ff(b) {
            for (var c = 0; c < b.length; ++c) {
                var d = b[c],
                    e = d.getAttribute("schemeIdUri");
                if (e && (d = d.getAttribute("value"))) switch (e) {
                    case "urn:mpeg:dash:outputChannelPositionList:2012":
                        return d.trim().split(/ +/).length;
                    case "urn:mpeg:dash:23003:3:audio_channel_configuration:2011":
                    case "urn:dts:dash:audio_channel_configuration:2012":
                        e = parseInt(d, 10);
                        if (!e) continue;
                        return e;
                    case "tag:dolby.com,2014:dash:audio_channel_configuration:2011":
                    case "urn:dolby:dash:audio_channel_configuration:2011":
                        if (e = parseInt(d,
                                16)) {
                            for (b = 0; e;) e & 1 && ++b, e >>= 1;
                            return b
                        }
                }
            }
            return null
        }

        function Ef(b) {
            var c = b.bc ? 1 : 0;
            c += b.$a ? 1 : 0;
            c += b.dc ? 1 : 0;
            if (0 == c) return "text" == b.contentType || "application" == b.contentType ? !0 : !1;
            1 != c && (b.bc && (b.$a = null), b.dc = null);
            return !0
        }

        function Gf(b, c, d, e) {
            c = hd(c, [d]);
            c = yb(c, b.b.retryParameters);
            c.method = e;
            c = b.a.networkingEngine.request(4, c);
            tb(b.f, c);
            return c.promise.then(function (b) {
                if ("HEAD" == e) {
                    if (!b.headers || !b.headers.date) return 0;
                    b = b.headers.date
                } else b = Sb(b.data);
                b = Date.parse(b);
                return isNaN(b) ? 0 : b - Date.now()
            })
        }

        function zf(b, c, d, e) {
            d = d.map(function (b) {
                return {
                    scheme: b.getAttribute("schemeIdUri"),
                    value: b.getAttribute("value")
                }
            });
            var f = b.b.dash.clockSyncUri;
            e && !d.length && f && d.push({
                scheme: "urn:mpeg:dash:utc:http-head:2014",
                value: f
            });
            return Hb.Uf(d, function (b) {
                var d = b.value;
                switch (b.scheme) {
                    case "urn:mpeg:dash:utc:http-head:2014":
                    case "urn:mpeg:dash:utc:http-head:2012":
                        return Gf(this, c, d, "HEAD");
                    case "urn:mpeg:dash:utc:http-xsdate:2014":
                    case "urn:mpeg:dash:utc:http-iso:2014":
                    case "urn:mpeg:dash:utc:http-xsdate:2012":
                    case "urn:mpeg:dash:utc:http-iso:2012":
                        return Gf(this,
                            c, d, "GET");
                    case "urn:mpeg:dash:utc:direct:2014":
                    case "urn:mpeg:dash:utc:direct:2012":
                        return b = Date.parse(d), isNaN(b) ? 0 : b - Date.now();
                    case "urn:mpeg:dash:utc:http-ntp:2014":
                    case "urn:mpeg:dash:utc:ntp:2014":
                    case "urn:mpeg:dash:utc:sntp:2014":
                        return Promise.reject();
                    default:
                        return Promise.reject()
                }
            }.bind(b))["catch"](function () {
                return 0
            })
        }
        n.Ch = function (b, c, d) {
            var e = M.Eb,
                f = d.getAttribute("schemeIdUri") || "",
                g = d.getAttribute("value") || "",
                h = M.M(d, "timescale", e) || 1;
            M.V(d, "Event").forEach(function (d) {
                var k = M.M(d, "presentationTime", e) || 0,
                    m = M.M(d, "duration", e) || 0;
                k = k / h + b;
                m = k + m / h;
                null != c && (k = Math.min(k, b + c), m = Math.min(m, b + c));
                d = {
                    schemeIdUri: f,
                    value: g,
                    startTime: k,
                    endTime: m,
                    id: d.getAttribute("id") || "",
                    eventElement: d
                };
                this.a.onTimelineRegionAdded(d)
            }.bind(this))
        };
        n.Mh = function (b, c, d) {
            b = yb(b, this.b.retryParameters);
            null != c && (b.headers.Range = "bytes=" + c + "-" + (null != d ? d : ""));
            c = this.a.networkingEngine.request(1, b);
            tb(this.f, c);
            return c.promise.then(function (b) {
                return b.data
            })
        };

        function Df(b, c) {
            return rd(Ob(b, c)) ? "text" : b.split("/")[0]
        } of .mpd = tf;
        nf["application/dash+xml"] = tf;

        function Hf(b, c, d, e) {
            this.b = b;
            this.type = c;
            this.a = d;
            this.segments = e || null
        }

        function If(b, c, d, e) {
            this.id = b;
            this.name = c;
            this.a = d;
            this.value = void 0 === e ? null : e
        }
        If.prototype.toString = function () {
            function b(b) {
                return b.name + '="' + b.value + '"'
            }
            return this.value ? "#" + this.name + ":" + this.value : 0 < this.a.length ? "#" + this.name + ":" + this.a.map(b).join(",") : "#" + this.name
        };

        function Jf(b, c) {
            this.name = b;
            this.value = c
        }
        If.prototype.getAttribute = function (b) {
            var c = this.a.filter(function (c) {
                return c.name == b
            });
            return c.length ? c[0] : null
        };

        function Kf(b, c, d) {
            return (b = b.getAttribute(c)) ? b.value : d || null
        }

        function Lf(b, c) {
            this.b = c;
            this.a = b
        };

        function Mf(b, c) {
            return b.filter(function (b) {
                return b.name == c
            })
        }

        function Nf(b, c) {
            var d = Mf(b, c);
            return d.length ? d[0] : null
        }

        function Of(b, c, d) {
            return b.filter(function (b) {
                var e = b.getAttribute("TYPE");
                b = b.getAttribute("GROUP-ID");
                return e.value == c && b.value == d
            })
        };

        function Pf(b) {
            this.b = b;
            this.a = 0
        }

        function Qf(b) {
            Rf(b, /[ \t]+/gm)
        }

        function Rf(b, c) {
            c.lastIndex = b.a;
            var d = c.exec(b.b);
            d = null == d ? null : {
                position: d.index,
                length: d[0].length,
                Qh: d
            };
            if (b.a == b.b.length || null == d || d.position != b.a) return null;
            b.a += d.length;
            return d.Qh
        }

        function Sf(b) {
            return b.a == b.b.length ? null : (b = Rf(b, /[^ \t\n]*/gm)) ? b[0] : null
        };

        function Tf() {
            this.a = 0
        }

        function Uf(b, c, d) {
            c = Sb(c);
            c = c.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n").trim();
            var e = c.split(/\n+/m);
            if (!/^#EXTM3U($|[ \t\n])/m.test(e[0])) throw new A(2, 4, 4015);
            c = 0;
            for (var f = 1; f < e.length; f++)
                if (!/^#(?!EXT)/m.test(e[f])) {
                    var g = Vf(b, e[f]);
                    --b.a;
                    if (Wf.includes(g.name)) {
                        c = 1;
                        break
                    } else "EXT-X-STREAM-INF" == g.name && (f += 1)
                } f = [];
            for (g = 1; g < e.length;)
                if (/^#(?!EXT)/m.test(e[g])) g += 1;
                else {
                    var h = Vf(b, e[g]);
                    if (Xf.includes(h.name)) {
                        if (1 != c) throw new A(2, 4, 4017);
                        e = e.splice(g, e.length - g);
                        b = Yf(b, d, e, f);
                        return new Hf(d,
                            c, f, b)
                    }
                    f.push(h);
                    g += 1;
                    "EXT-X-STREAM-INF" == h.name && (h.a.push(new Jf("URI", e[g])), g += 1)
                } return new Hf(d, c, f)
        }

        function Yf(b, c, d, e) {
            var f = [],
                g = [];
            d.forEach(function (d) {
                if (/^(#EXT)/.test(d)) d = Vf(b, d), Wf.includes(d.name) ? e.push(d) : g.push(d);
                else {
                    if (/^#(?!EXT)/m.test(d)) return [];
                    d = hd([c], [d.trim()])[0];
                    f.push(new Lf(d, g));
                    g = []
                }
            });
            return f
        }

        function Vf(b, c) {
            a: {
                var d = b.a++;
                var e = c.match(/^#(EXT[^:]*)(?::(.*))?$/);
                if (!e) throw new A(2, 4, 4016, c);
                var f = e[1],
                    g = e[2];e = [];
                if (g && g.includes("=")) {
                    g = new Pf(g);
                    for (var h, k = /([^=]+)=(?:"([^"]*)"|([^",]*))(?:,|$)/g; h = Rf(g, k);) e.push(new Jf(h[1], h[2] || h[3]))
                } else if (g) {
                    d = new If(d, f, e, g);
                    break a
                }
                d = new If(d, f, e)
            }
            return d
        }
        var Wf = "EXT-X-TARGETDURATION EXT-X-MEDIA-SEQUENCE EXT-X-DISCONTINUITY-SEQUENCE EXT-X-PLAYLIST-TYPE EXT-X-MAP EXT-X-I-FRAMES-ONLY EXT-X-ENDLIST".split(" "),
            Xf = "EXTINF EXT-X-BYTERANGE EXT-X-DISCONTINUITY EXT-X-PROGRAM-DATE-TIME EXT-X-KEY EXT-X-DATERANGE".split(" ");

        function Zf(b) {
            try {
                var c = Zf.parse(b);
                return hb({
                    uri: b,
                    data: c.data,
                    headers: {
                        "content-type": c.contentType
                    }
                })
            } catch (d) {
                return fb(d)
            }
        }
        y("shaka.net.DataUriPlugin", Zf);
        Zf.parse = function (b) {
            var c = b.split(":");
            if (2 > c.length || "data" != c[0]) throw new A(2, 1, 1004, b);
            c = c.slice(1).join(":").split(",");
            if (2 > c.length) throw new A(2, 1, 1004, b);
            var d = c[0];
            c = window.decodeURIComponent(c.slice(1).join(","));
            d = d.split(";");
            var e = null;
            1 < d.length && (e = d[1]);
            if ("base64" == e) b = cc(c).buffer;
            else {
                if (e) throw new A(2, 1, 1005, b);
                b = Wb(c)
            }
            return {
                data: b,
                contentType: d[0]
            }
        };
        xb("data", Zf);

        function $f() {
            this.i = this.c = null;
            this.H = 1;
            this.A = new Map;
            this.G = new Set;
            this.a = new Map;
            this.b = null;
            this.v = "";
            this.u = new Tf;
            this.m = this.l = null;
            this.f = ag;
            this.o = null;
            this.w = 0;
            this.B = Infinity;
            this.j = new sb;
            this.C = []
        }
        y("shaka.hls.HlsParser", $f);
        n = $f.prototype;
        n.configure = function (b) {
            this.i = b
        };
        n.start = function (b, c) {
            this.c = c;
            return bg(this, b).then(function (b) {
                this.v = b.uri;
                return cg(this, b.data).then(function () {
                    dg(this, this.l);
                    return this.o
                }.bind(this))
            }.bind(this))
        };
        n.stop = function () {
            this.i = this.c = null;
            this.A.clear();
            this.G.clear();
            this.a.clear();
            this.o = null;
            return this.j.destroy()
        };
        n.update = function () {
            if (this.f != eg.eb) {
                for (var b = [], c = q(this.a.values()), d = c.next(); !d.done; d = c.next()) b.push(fg(this, d.value));
                return Promise.all(b)
            }
        };

        function fg(b, c) {
            bg(b, c.Of).then(function (b) {
                var d = eg,
                    f = Uf(this.u, b.data, b.uri);
                if (1 != f.type) throw new A(2, 4, 4017);
                b = Nf(f.a, "EXT-X-MEDIA-SEQUENCE");
                var g = c.stream;
                gg(this, c.Ic, f, b ? Number(b.value) : 0, g.mimeType, g.codecs).then(function (b) {
                    c.cc.a = b;
                    b = b[b.length - 1];
                    Nf(f.a, "EXT-X-ENDLIST") && (hg(this, d.eb), this.b.Ja(b.endTime))
                }.bind(this))
            }.bind(b))
        }
        n.onExpirationUpdated = function () {};

        function cg(b, c) {
            var d = Uf(b.u, c, b.v);
            if (0 != d.type) throw new A(2, 4, 4022);
            return ig(b, d).then(function (b) {
                this.c.filterAllPeriods([b]);
                for (var c = Infinity, d = 0, e = Infinity, k = q(this.a.values()), l = k.next(); !l.done; l = k.next()) l = l.value, c = Math.min(c, l.bd), d = Math.max(d, l.bd), "text" != l.stream.type && (e = Math.min(e, l.duration));
                this.f != eg.eb ? (this.b = new S(0, 3 * this.w), this.b.ec(!1)) : (this.b = new S(null, 0), this.b.ec(!0));
                jg(this);
                if (this.f != eg.eb) {
                    this.l = this.B;
                    this.f == eg.Ud && (c = this.b.Ac, isNaN(this.i.availabilityWindowOverride) ||
                        (c = this.i.availabilityWindowOverride), this.b.td(c));
                    for (c = 0; 95443.7176888889 <= d;) c += 95443.7176888889, d -= 95443.7176888889;
                    if (c)
                        for (d = q(this.a.values()), l = d.next(); !l.done; l = d.next()) e = l.value, 95443.7176888889 > e.bd && (e.stream.presentationTimeOffset = -c, e.cc.offset(c))
                } else
                    for (this.b.Ja(e), this.b.offset(-c), d = q(this.a.values()), l = d.next(); !l.done; l = d.next()) l = l.value, l.stream.presentationTimeOffset = c, l.cc.offset(-c), Qe(l.cc, e);
                this.o = {
                    presentationTimeline: this.b,
                    periods: [b],
                    offlineSessionIds: [],
                    minBufferTime: 0
                }
            }.bind(b))
        }

        function ig(b, c) {
            var d = c.a,
                e = Mf(c.a, "EXT-X-MEDIA").filter(function (b) {
                    return "SUBTITLES" == kg(b, "TYPE")
                }.bind(b)).map(function (b) {
                    return lg(this, b)
                }.bind(b));
            return Promise.all(e).then(function (b) {
                var e = Mf(d, "EXT-X-STREAM-INF").map(function (b) {
                    return mg(this, b, c)
                }.bind(this));
                return Promise.all(e).then(function (c) {
                    return {
                        startTime: 0,
                        variants: c.reduce(Hb.Mc, []),
                        textStreams: b
                    }
                }.bind(this))
            }.bind(b))
        }

        function mg(b, c, d) {
            var e = Kf(c, "CODECS", "avc1.42E01E,mp4a.40.2").split(/\s*,\s*/),
                f = c.getAttribute("RESOLUTION"),
                g = null,
                h = null,
                k = Kf(c, "FRAME-RATE"),
                l = Number(kg(c, "BANDWIDTH"));
            if (f) {
                var m = f.value.split("x");
                g = m[0];
                h = m[1]
            }
            d = Mf(d.a, "EXT-X-MEDIA");
            var p = Kf(c, "AUDIO"),
                u = Kf(c, "VIDEO");
            p ? d = Of(d, "AUDIO", p) : u && (d = Of(d, "VIDEO", u));
            if (m = ng("text", e)) {
                var w = Kf(c, "SUBTITLES");
                w && (w = Of(d, "SUBTITLES", w), w.length && (b.A.get(w[0].id).stream.codecs = m));
                pb(e, m)
            }
            d = d.map(function (b) {
                return og(this, b, e)
            }.bind(b));
            var x = [],
                B = [];
            return Promise.all(d).then(function (b) {
                p ? x = b : u && (B = b);
                b = !1;
                if (x.length || B.length)
                    if (x.length)
                        if (kg(c, "URI") == x[0].Ic) {
                            var d = "audio";
                            b = !0
                        } else d = "video";
                else d = "audio";
                else 1 == e.length ? (d = ng("video", e), d = f || k || d ? "video" : "audio") : (d = "video", e = [e.join(",")]);
                return b ? Promise.resolve() : pg(this, c, e, d)
            }.bind(b)).then(function (b) {
                b && ("audio" == b.stream.type ? x = [b] : B = [b]);
                B && qg(B);
                x && qg(x);
                return rg(this, x, B, l, g, h, k)
            }.bind(b))
        }

        function qg(b) {
            b.forEach(function (b) {
                var c = b.stream.codecs.split(",");
                c = c.filter(function (b) {
                    return "mp4a.40.34" != b
                });
                b.stream.codecs = c.join(",")
            })
        }

        function rg(b, c, d, e, f, g, h) {
            d.forEach(function (b) {
                if (b = b.stream) b.width = Number(f) || void 0, b.height = Number(g) || void 0, b.frameRate = Number(h) || void 0
            }.bind(b));
            c.length || (c = [null]);
            d.length || (d = [null]);
            for (var k = [], l = 0; l < c.length; l++)
                for (var m = 0; m < d.length; m++) {
                    var p = c[l] ? c[l].stream : null,
                        u = d[m] ? d[m].stream : null,
                        w = c[l] ? c[l].drmInfos : null,
                        x = d[m] ? d[m].drmInfos : null,
                        B = void 0;
                    if (p && u)
                        if (w.length && x.length ? 0 < Jc(w, x).length : 1) B = Jc(w, x);
                        else continue;
                    else p ? B = w : u && (B = x);
                    w = (d[l] ? d[l].Ic : "") + " - " + (c[l] ? c[l].Ic :
                        "");
                    b.G.has(w) || (p = sg(b, p, u, e, B), k.push(p), b.G.add(w))
                }
            return k
        }

        function sg(b, c, d, e, f) {
            return {
                id: b.H++,
                language: c ? c.language : "und",
                primary: !!c && c.primary || !!d && d.primary,
                audio: c,
                video: d,
                bandwidth: e,
                drmInfos: f,
                allowedByApplication: !0,
                allowedByKeySystem: !0
            }
        }

        function lg(b, c) {
            kg(c, "TYPE");
            return og(b, c, []).then(function (b) {
                return b.stream
            })
        }

        function og(b, c, d) {
            var e = kg(c, "URI");
            if (b.a.has(e)) return Promise.resolve(b.a.get(e));
            var f = kg(c, "TYPE").toLowerCase();
            "subtitles" == f && (f = "text");
            var g = H(Kf(c, "LANGUAGE", "und")),
                h = Kf(c, "NAME"),
                k = c.getAttribute("DEFAULT"),
                l = c.getAttribute("AUTOSELECT"),
                m = Kf(c, "CHANNELS");
            return tg(b, e, d, f, g, !!k || !!l, h, "audio" == f ? ug(m) : null).then(function (b) {
                if (this.a.has(e)) return this.a.get(e);
                this.A.set(c.id, b);
                this.a.set(e, b);
                return b
            }.bind(b))
        }

        function ug(b) {
            if (!b) return null;
            b = b.split("/")[0];
            return parseInt(b, 10)
        }

        function pg(b, c, d, e) {
            var f = kg(c, "URI");
            return b.a.has(f) ? Promise.resolve(b.a.get(f)) : tg(b, f, d, e, "und", !1, null, null).then(function (b) {
                if (this.a.has(f)) return this.a.get(f);
                this.a.set(f, b);
                return b
            }.bind(b))
        }

        function tg(b, c, d, e, f, g, h, k) {
            var l = hd([b.v], [c])[0],
                m, p = "",
                u;
            return bg(b, l).then(function (c) {
                l = c.uri;
                m = Uf(b.u, c.data, l);
                if (1 != m.type) throw new A(2, 4, 4017);
                c = m;
                var f = eg,
                    g = Nf(c.a, "EXT-X-PLAYLIST-TYPE"),
                    h = Nf(c.a, "EXT-X-ENDLIST");
                h = g && "VOD" == g.value || h;
                g = g && "EVENT" == g.value && !h;
                g = !h && !g;
                h ? hg(b, f.eb) : (g ? hg(b, f.Ud) : hg(b, f.Bf), c = vg(c.a, "EXT-X-TARGETDURATION"), c = Number(c.value), b.w = Math.max(c, b.w), b.B = Math.min(c, b.B));
                if (1 == d.length) p = d[0];
                else if (c = ng(e, d), null != c) p = c;
                else throw new A(2, 4, 4025, d);
                return wg(b,
                    e, p, m)
            }).then(function (d) {
                u = d;
                d = Nf(m.a, "EXT-X-MEDIA-SEQUENCE");
                return gg(b, c, m, d ? Number(d.value) : 0, u, p)
            }).then(function (d) {
                var w = d[0].startTime,
                    B = d[d.length - 1].endTime,
                    K = B - w;
                d = new Q(d);
                var U = xg(m),
                    R = void 0;
                "text" == e && (R = "subtitle");
                var Y = [];
                m.segments.forEach(function (b) {
                    b = Mf(b.b, "EXT-X-KEY");
                    Y.push.apply(Y, b)
                });
                var sa = !1,
                    za = [],
                    ca = null;
                Y.forEach(function (b) {
                    if ("NONE" != kg(b, "METHOD")) {
                        sa = !0;
                        var c = kg(b, "KEYFORMAT");
                        if (b = (c = yg[c]) ? c(b) : null) b.keyIds.length && (ca = b.keyIds[0]), za.push(b)
                    }
                });
                if (sa && !za.length) throw new A(2,
                    4, 4026);
                return {
                    stream: {
                        id: b.H++,
                        originalId: h,
                        createSegmentIndex: Promise.resolve.bind(Promise),
                        findSegmentPosition: d.find.bind(d),
                        getSegmentReference: d.get.bind(d),
                        initSegmentReference: U,
                        presentationTimeOffset: 0,
                        mimeType: u,
                        codecs: p,
                        kind: R,
                        encrypted: sa,
                        keyId: ca,
                        language: f,
                        label: h,
                        type: e,
                        primary: g,
                        trickModeVideo: null,
                        emsgSchemeIdUris: null,
                        frameRate: void 0,
                        width: void 0,
                        height: void 0,
                        bandwidth: void 0,
                        roles: [],
                        channelsCount: k,
                        closedCaptions: null
                    },
                    cc: d,
                    drmInfos: za,
                    Ic: c,
                    Of: l,
                    bd: w,
                    Ci: B,
                    duration: K
                }
            })
        }

        function xg(b) {
            var c = Mf(b.a, "EXT-X-MAP");
            if (!c.length) return null;
            if (1 < c.length) throw new A(2, 4, 4020);
            c = c[0];
            var d = kg(c, "URI"),
                e = hd([b.b], [d])[0];
            b = 0;
            d = null;
            if (c = Kf(c, "BYTERANGE")) b = c.split("@"), c = Number(b[0]), b = Number(b[1]), d = b + c - 1;
            return new Ge(function () {
                return [e]
            }, b, d)
        }

        function zg(b, c, d, e) {
            var f = c.b,
                g = c.a;
            c = vg(f, "EXTINF").value.split(",");
            c = e + Number(c[0]);
            var h = 0,
                k = null;
            if (f = Nf(f, "EXT-X-BYTERANGE")) h = f.value.split("@"), f = Number(h[0]), h = h[1] ? Number(h[1]) : b.a + 1, k = h + f - 1;
            return new N(d, e, c, function () {
                return [g]
            }, h, k)
        }

        function jg(b) {
            b.b && (b.C.forEach(function (c) {
                b.b.Cb(c, 0)
            }), b.C = [])
        }

        function gg(b, c, d, e, f, g) {
            var h = d.segments,
                k = [],
                l = h[0].a,
                m = zg(null, h[0], e, 0);
            d = xg(d);
            return Fg(b, c, d, m, f, g).then(function (b) {
                l.split("/").pop();
                for (var c = 0; c < h.length; ++c) {
                    var d = k[k.length - 1];
                    d = zg(d, h[c], e + c, 0 == c ? b : d.endTime);
                    k.push(d)
                }
                this.C.push(k);
                jg(this);
                return k
            }.bind(b))
        }

        function Gg(b, c) {
            var d = b.c.networkingEngine,
                e = yb(c.c(), b.i.retryParameters),
                f = {},
                g = c.b;
            f.Range = "bytes=" + g + "-" + (g + 2048 - 1);
            var h = {};
            if (0 != g || null != c.a) g = "bytes=" + g + "-", null != c.a && (g += c.a), h.Range = g;
            e.headers = f;
            f = d.request(1, e);
            tb(b.j, f);
            return f.promise["catch"](function () {
                La("Unable to fetch a partial HLS segment! Falling back to a full segment request, which is expensive!  Your server should support Range requests and CORS preflights.", e.uris[0]);
                e.headers = h;
                var c = d.request(1, e);
                tb(b.j, c);
                return c.promise
            })
        }

        function Fg(b, c, d, e, f, g) {
            if (b.o && (c = b.a.get(c).cc.get(e.position))) return Promise.resolve(c.startTime);
            e = [Gg(b, e)];
            if ("video/mp4" == f || "audio/mp4" == f) d ? e.push(Gg(b, d)) : e.push(e[0]);
            return Promise.all(e).then(function (b) {
                if ("video/mp4" == f || "audio/mp4" == f) return Hg(b[0].data, b[1].data);
                if ("audio/mpeg" == f) return 0;
                if ("video/mp2t" == f) return Ig(b[0].data);
                if ("application/mp4" == f || f.startsWith("text/")) {
                    b = b[0].data;
                    var c = Ob(f, g);
                    if (rd(c)) {
                        var d = new pd(null);
                        sd(d, c);
                        b = d.Uc(b)
                    } else b = 0;
                    return b
                }
                throw new A(2,
                    4, 4030);
            }.bind(b))
        }

        function Hg(b, c) {
            var d = 0;
            (new P).L("moov", Ke).L("trak", Ke).L("mdia", Ke).ya("mdhd", function (b) {
                b.reader.O(0 == b.version ? 8 : 16);
                d = b.reader.J();
                b.parser.stop()
            }).parse(c, !0);
            if (!d) throw new A(2, 4, 4030);
            var e = 0,
                f = !1;
            (new P).L("moof", Ke).L("traf", Ke).ya("tfdt", function (b) {
                e = (0 == b.version ? b.reader.J() : b.reader.Gb()) / d;
                f = !0;
                b.parser.stop()
            }).parse(b, !0);
            if (!f) throw new A(2, 4, 4030);
            return e
        }

        function Ig(b) {
            function c() {
                throw new A(2, 4, 4030);
            }
            b = new O(new DataView(b), 0);
            for (var d = 0, e = 0;;)
                if (d = b.qa(), e = b.Ca(), 71 != e && c(), b.$b() & 16384 || c(), e = (b.Ca() & 48) >> 4, 0 != e && 2 != e || c(), 3 == e && (e = b.Ca(), b.O(e)), 1 != b.J() >> 8) b.seek(d + 188), e = b.Ca(), 71 != e && (b.seek(d + 192), e = b.Ca()), 71 != e && (b.seek(d + 204), e = b.Ca()), 71 != e && c(), b.Ve(1);
                else return b.O(3), d = b.Ca() >> 6, 0 != d && 1 != d || c(), 0 == b.Ca() && c(), d = b.Ca(), e = b.$b(), b = b.$b(), (1073741824 * ((d & 14) >> 1) + ((e & 65534) << 14 | (b & 65534) >> 1)) / 9E4
        }

        function ng(b, c) {
            for (var d = Jg[b], e = 0; e < d.length; e++)
                for (var f = 0; f < c.length; f++)
                    if (d[e].test(c[f].trim())) return c[f].trim();
            return "text" == b ? "" : null
        }

        function wg(b, c, d, e) {
            e = e.segments[0].a;
            var f = (new Oa(e)).Aa.split(".").pop(),
                g = Kg[c][f];
            if (g) return Promise.resolve(g);
            if ("text" == c) return d && "vtt" != d ? Promise.resolve("application/mp4") : Promise.resolve("text/vtt");
            c = yb([e], b.i.retryParameters);
            c.method = "HEAD";
            c = b.c.networkingEngine.request(1, c);
            tb(b.j, c);
            return c.promise.then(function (b) {
                b = b.headers["content-type"];
                if (!b) throw new A(2, 4, 4021, f);
                return b.split(";")[0]
            })
        }

        function kg(b, c) {
            var d = b.getAttribute(c);
            if (!d) throw new A(2, 4, 4023, c);
            return d.value
        }

        function vg(b, c) {
            var d = Nf(b, c);
            if (!d) throw new A(2, 4, 4024, c);
            return d
        }

        function bg(b, c) {
            var d = b.c.networkingEngine.request(0, yb([c], b.i.retryParameters));
            tb(b.j, d);
            return d.promise
        }
        var Jg = {
                audio: [/^vorbis$/, /^opus$/, /^flac$/, /^mp4a/, /^[ae]c-3$/],
                video: [/^avc/, /^hev/, /^hvc/, /^vp0?[89]/, /^av1$/],
                text: [/^vtt$/, /^wvtt/, /^stpp/]
            },
            Kg = {
                audio: {
                    mp4: "audio/mp4",
                    m4s: "audio/mp4",
                    m4i: "audio/mp4",
                    m4a: "audio/mp4",
                    ts: "video/mp2t"
                },
                video: {
                    mp4: "video/mp4",
                    m4s: "video/mp4",
                    m4i: "video/mp4",
                    m4v: "video/mp4",
                    ts: "video/mp2t"
                },
                text: {
                    mp4: "application/mp4",
                    m4s: "application/mp4",
                    m4i: "application/mp4",
                    vtt: "text/vtt",
                    ttml: "application/ttml+xml"
                }
            };
        $f.prototype.K = function () {
            this.c && (this.m = null, this.update().then(function () {
                dg(this, this.l)
            }.bind(this))["catch"](function (b) {
                this.c && (b.severity = 1, this.c.onError(b), dg(this, 0))
            }.bind(this)))
        };

        function dg(b, c) {
            null != b.l && null != c && (b.m = window.setTimeout(b.K.bind(b), 1E3 * c))
        }

        function hg(b, c) {
            b.f = c;
            b.b && b.b.ec(b.f == eg.eb);
            b.f == eg.eb && null != b.m && (window.clearTimeout(b.m), b.m = null, b.l = null)
        }
        var yg = {
                "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed": function (b) {
                    var c = kg(b, "METHOD");
                    if (!["SAMPLE-AES", "SAMPLE-AES-CTR", "SAMPLE-AES-CENC"].includes(c)) return null;
                    c = kg(b, "URI");
                    c = Zf.parse(c);
                    c = new Uint8Array(c.data);
                    c = id("com.widevine.alpha", [{
                        initDataType: "cenc",
                        initData: c
                    }]);
                    if (b = Kf(b, "KEYID")) c.keyIds = [b.substr(2).toLowerCase()];
                    return c
                }
            },
            ag = "VOD",
            eg = {
                eb: ag,
                Bf: "EVENT",
                Ud: "LIVE"
            }; of .m3u8 = $f;
        nf["application/x-mpegurl"] = $f;
        nf["application/vnd.apple.mpegurl"] = $f;

        function Lg() {
            this.a = {}
        }

        function Mg(b, c, d, e) {
            b.a[c] = b.a[c] || new Ng;
            b.a[c].a[d] = e
        }
        Lg.prototype.get = function (b, c) {
            var d = this.a[b];
            return d ? d.get(c) : null
        };

        function Ng() {
            this.a = {}
        }
        Ng.prototype.get = function (b) {
            return this.a[b]
        };

        function Og(b, c) {
            this.a = b;
            this.b = new Set([b]);
            c = c || [];
            for (var d = q(c), e = d.next(); !e.done; e = d.next()) this.add(e.value)
        }
        Og.prototype.add = function (b) {
            return Pg(this.a, b) ? (this.b.add(b), !0) : !1
        };

        function Pg(b, c) {
            var d;
            if (!(d = !!b.audio != !!c.audio || !!b.video != !!c.video || b.language != c.language) && (d = b.audio && c.audio)) {
                d = b.audio;
                var e = c.audio;
                d = !(d.channelsCount == e.channelsCount && Qg(d, e) && Rg(d.roles, e.roles))
            }!d && (d = b.video && c.video) && (d = b.video, e = c.video, d = !(Qg(d, e) && Rg(d.roles, e.roles)));
            return d ? !1 : !0
        }
        Og.prototype.values = function () {
            return this.b.values()
        };

        function Qg(b, c) {
            if (b.mimeType != c.mimeType) return !1;
            var d = b.codecs.split(",").map(function (b) {
                    return Rb(b)[0]
                }),
                e = c.codecs.split(",").map(function (b) {
                    return Rb(b)[0]
                });
            if (d.length != e.length) return !1;
            d.sort();
            e.sort();
            for (var f = 0; f < d.length; f++)
                if (d[f] != e[f]) return !1;
            return !0
        }

        function Rg(b, c) {
            var d = new Set(b),
                e = new Set(c);
            d["delete"]("main");
            e["delete"]("main");
            if (d.size != e.size) return !1;
            d = q(d);
            for (var f = d.next(); !f.done; f = d.next())
                if (!e.has(f.value)) return !1;
            return !0
        };

        function Sg(b) {
            this.a = b;
            this.b = new Tg(b.language, "", b.audio && b.audio.channelsCount ? b.audio.channelsCount : 0)
        }
        Sg.prototype.create = function (b) {
            var c = this,
                d = b.filter(function (b) {
                    return Pg(c.a, b)
                });
            return d.length ? new Og(d[0], d) : this.b.create(b)
        };

        function Tg(b, c, d) {
            this.c = b;
            this.b = c;
            this.a = d
        }
        Tg.prototype.create = function (b) {
            var c = [];
            c = Ug(b, this.c);
            var d = b.filter(function (b) {
                return b.primary
            });
            c = c.length ? c : d.length ? d : b;
            this.b && (b = Vg(c, this.b), b.length && (c = b));
            this.a && (b = I.je(c, this.a), b.length && (c = b));
            b = new Og(c[0]);
            c = q(c);
            for (d = c.next(); !d.done; d = c.next()) d = d.value, Pg(b.a, d) && b.add(d);
            return b
        };

        function Ug(b, c) {
            var d = H(c),
                e = Od(d, b.map(function (b) {
                    return Nd(b)
                }));
            return e ? b.filter(function (b) {
                return e == Nd(b)
            }) : []
        }

        function Vg(b, c) {
            return b.filter(function (b) {
                var d = b.audio;
                b = b.video;
                return d && 0 <= d.roles.indexOf(c) || b && 0 <= b.roles.indexOf(c)
            })
        };

        function Wg(b, c, d, e) {
            this.a = b;
            this.A = c;
            this.v = d;
            this.w = e;
            this.j = new Db;
            this.b = null;
            this.i = !1;
            this.u = b.readyState;
            this.c = !1;
            this.m = this.B = -1;
            this.f = this.l = !1;
            c = this.o.bind(this);
            G(this.j, b, "waiting", c);
            this.b = new Xb(c);
            this.b.Ib(.25)
        }
        Wg.prototype.destroy = function () {
            var b = this.j.destroy();
            this.w = this.A = this.a = this.j = null;
            null != this.b && (this.b.cancel(), this.b = null);
            return b
        };
        Wg.prototype.Zb = function () {
            this.f = !0;
            this.o()
        };
        Wg.prototype.o = function () {
            if (0 != this.a.readyState) {
                if (this.a.seeking) {
                    if (!this.i) return
                } else this.i = !1;
                if (!this.a.paused) {
                    this.a.readyState != this.u && (this.c = !1, this.u = this.a.readyState);
                    var b = this.v.smallGapLimit,
                        c = this.a.currentTime,
                        d = this.a.buffered;
                    a: {
                        if (d && d.length && !(1 == d.length && 1E-6 > d.end(0) - d.start(0))) {
                            var e = .1;
                            /(Edge\/|Trident\/|Tizen)/.test(navigator.userAgent) && (e = .5);
                            for (var f = 0; f < d.length; f++)
                                if (d.start(f) > c && (0 == f || d.end(f - 1) - c <= e)) {
                                    e = f;
                                    break a
                                }
                        }
                        e = null
                    }
                    if (null == e) {
                        if (d = this.a.currentTime,
                            c = this.a.buffered, !this.a.paused && 0 < this.a.playbackRate)
                            if (this.m != d) this.m = d, this.B = Date.now(), this.l = !1;
                            else if (!this.l && this.B < Date.now() - 1E3)
                            for (e = 0; e < c.length; e++)
                                if (d >= c.start(e) && d < c.end(e) - .5) {
                                    this.a.currentTime += .1;
                                    this.m = this.a.currentTime;
                                    this.l = !0;
                                    break
                                }
                    } else if (0 != e || this.f) {
                        f = d.start(e);
                        var g = this.A.Ra();
                        if (!(f >= g)) {
                            g = f - c;
                            b = g <= b;
                            var h = !1;
                            .001 > g || (b || this.c || (this.c = !0, c = new D("largegap", {
                                currentTime: c,
                                gapSize: g
                            }), c.cancelable = !0, this.w(c), this.v.jumpLargeGaps && !c.defaultPrevented && (h = !0)), !b && !h) || (0 != e && d.end(e - 1), this.a.currentTime = f)
                        }
                    }
                }
            }
        };

        function Xg(b, c, d) {
            this.a = b;
            this.l = c;
            this.j = d;
            this.c = new Db;
            this.f = 1;
            this.i = !1;
            this.b = null;
            0 < b.readyState ? this.Ge() : Gb(this.c, b, "loadedmetadata", this.Ge.bind(this));
            G(this.c, b, "ratechange", this.dh.bind(this))
        }
        n = Xg.prototype;
        n.destroy = function () {
            var b = this.c.destroy();
            this.c = null;
            null != this.b && (this.b.cancel(), this.b = null);
            this.l = this.a = null;
            return b
        };

        function Yg(b) {
            return 0 < b.a.readyState ? b.a.currentTime : b.j
        }

        function Zg(b, c) {
            0 < b.a.readyState ? $g(b, b.a.currentTime, c) : (b.j = c, setTimeout(b.l, 0))
        }
        n.Nb = function () {
            return this.f
        };

        function ah(b, c) {
            null != b.b && (b.b.cancel(), b.b = null);
            b.f = c;
            b.a.playbackRate = b.i || 0 > c ? 0 : c;
            !b.i && 0 > c && (b.b = new Xb(function () {
                b.a.currentTime += c / 4
            }), b.b.Ib(.25))
        }
        n.dh = function () {
            var b = this.i || 0 > this.f ? 0 : this.f;
            this.a.playbackRate && this.a.playbackRate != b && ah(this, this.a.playbackRate)
        };
        n.Ge = function () {
            .001 > Math.abs(this.a.currentTime - this.j) ? this.Le() : (Gb(this.c, this.a, "seeking", this.Le.bind(this)), this.a.currentTime = 0 == this.a.currentTime ? this.j : this.a.currentTime)
        };
        n.Le = function () {
            var b = this;
            G(this.c, this.a, "seeking", function () {
                return b.l()
            })
        };

        function $g(b, c, d) {
            function e() {
                !b.a || 10 <= f++ || b.a.currentTime != c || (b.a.currentTime = d, setTimeout(e, 100))
            }
            b.a.currentTime = d;
            var f = 0;
            setTimeout(e, 100)
        };

        function bh(b, c, d, e, f, g, h) {
            this.c = b;
            this.a = c;
            this.o = d;
            this.j = e;
            this.m = g;
            this.f = null;
            this.i = new Wg(b, c, e, h);
            c = this.jh.bind(this);
            null == f ? f = Infinity > this.a.ha() ? this.a.yb() : this.a.Ra() : 0 > f && (f = this.a.Ra() + f);
            f = ch(this, dh(this, f));
            this.b = new Xg(b, c, f);
            this.f = new Xb(this.bh.bind(this));
            this.f.Ib(.25)
        }
        n = bh.prototype;
        n.destroy = function () {
            var b = Promise.all([this.b.destroy(), this.i.destroy()]);
            this.i = this.b = null;
            null != this.f && (this.f.cancel(), this.f = null);
            this.m = this.j = this.a = this.c = null;
            return b
        };

        function eh(b) {
            var c = Yg(b.b);
            0 < b.c.readyState && (b.c.paused || (c = dh(b, c)));
            return c
        }
        n.Nb = function () {
            return this.b.Nb()
        };
        n.Zb = function () {
            this.i.Zb()
        };
        n.bh = function () {
            if (0 != this.c.readyState && !this.c.paused) {
                var b = this.c.currentTime,
                    c = this.a.yb(),
                    d = this.a.Ra();
                3 > d - c && (c = d - 3);
                b < c && (b = fh(this, b), this.c.currentTime = b)
            }
        };
        n.jh = function () {
            var b = this.i;
            b.i = !0;
            b.f = !1;
            b.c = !1;
            var c = Yg(this.b);
            b = fh(this, c);
            if (.001 < Math.abs(b - c) && (c = (new Date).getTime() / 1E3, !this.l || this.l < c - 1)) {
                this.l = c;
                Zg(this.b, b);
                return
            }
            this.m()
        };

        function ch(b, c) {
            var d = b.a.ha();
            return c >= d ? d - b.j.durationBackoff : c
        }

        function fh(b, c) {
            var d = Lc.bind(null, b.c.buffered),
                e = Math.max(b.o, b.j.rebufferingGoal),
                f = b.a.yb(),
                g = b.a.Ra(),
                h = b.a.ha();
            3 > g - f && (f = g - 3);
            var k = b.a.Ob(e),
                l = b.a.Ob(5);
            e = b.a.Ob(e + 5);
            return c >= h ? ch(b, c) : c > g ? g : c < f ? d(l) ? l : e : c >= k || d(c) ? c : e
        }

        function dh(b, c) {
            var d = b.a.yb();
            if (c < d) return d;
            d = b.a.Ra();
            return c > d ? d : c
        };

        function gh(b) {
            this.a = !1;
            this.b = new z;
            this.c = b
        }
        gh.prototype.destroy = function () {
            var b = this;
            if (this.a) return this.b;
            this.a = !0;
            return this.c().then(function () {
                b.b.resolve()
            }, function () {
                b.b.resolve()
            })
        };

        function hh(b, c) {
            return r(function e() {
                return v(e, function (e) {
                    switch (e.s) {
                        case 1:
                            return pa(e, 2), t(e, Promise.resolve(c()), 4);
                        case 4:
                            return e["return"](e.F);
                        case 2:
                            return ta(e), t(e, Promise.all(b.map(function (b) {
                                return b.destroy()
                            })), 5);
                        case 5:
                            ua(e, 0)
                    }
                })
            })
        };

        function ih(b, c, d, e, f, g, h) {
            var k = this;
            this.a = b;
            this.C = c;
            this.v = d;
            this.o = e;
            this.j = f;
            this.w = g;
            this.f = [];
            this.m = new Db;
            this.c = !1;
            this.l = -1;
            this.i = null;
            this.b = h;
            this.B = new gh(function () {
                var b = Promise.all([k.m ? k.m.destroy() : null, k.b ? k.b.destroy() : null]);
                k.m = null;
                jh(k);
                k.a = null;
                k.v = null;
                k.o = null;
                k.j = null;
                k.w = null;
                k.f = [];
                k.b = null;
                return b
            });
            kh(this)
        }
        ih.prototype.destroy = function () {
            return this.B.destroy()
        };

        function lh(b, c) {
            if (!b.f.some(function (b) {
                    return b.info.schemeIdUri == c.schemeIdUri && b.info.startTime == c.startTime && b.info.endTime == c.endTime
                })) {
                var d = {
                    info: c,
                    status: 1
                };
                b.f.push(d);
                var e = new D("timelineregionadded", {
                    detail: mh(c)
                });
                b.j(e);
                b.u(!0, d)
            }
        }

        function mh(b) {
            var c = nb(b);
            c.eventElement = b.eventElement;
            return c
        }
        ih.prototype.u = function (b, c) {
            var d = c.info.startTime > this.a.currentTime ? 1 : c.info.endTime < this.a.currentTime ? 3 : 2,
                e = 2 == c.status,
                f = 2 == d;
            if (d != c.status) {
                if (!b || e || f) e || this.j(new D("timelineregionenter", {
                    detail: mh(c.info)
                })), f || this.j(new D("timelineregionexit", {
                    detail: mh(c.info)
                }));
                c.status = d
            }
        };

        function kh(b) {
            jh(b);
            b.i = window.setTimeout(b.A.bind(b), 250)
        }

        function jh(b) {
            b.i && (window.clearTimeout(b.i), b.i = null)
        }
        ih.prototype.A = function () {
            this.i = null;
            kh(this);
            var b = I.Qa(this.b.a, this.a.currentTime);
            b != this.l && (-1 != this.l && this.w(), this.l = b);
            b = Mc(this.a.buffered, this.a.currentTime);
            var c = Kc(this.a.buffered);
            var d = this.b;
            c = c || 0;
            var e = d.a.presentationTimeline,
                f = e.zb();
            c = e.aa() && c >= f;
            e = d.b;
            e = e.i ? "ended" == e.i.readyState : !0;
            d = c || e || d.c.ended;
            this.c ? (c = Math.max(this.C, this.v.rebufferingGoal), (d || b >= c) && 0 != this.c && (this.c = !1, this.o(!1))) : !d && .5 > b && 1 != this.c && (this.c = !0, this.o(!0));
            this.f.forEach(this.u.bind(this,
                !1))
        };

        function nh(b, c, d) {
            this.c = b;
            this.b = c;
            this.a = d
        }
        nh.prototype.destroy = function () {
            this.a = this.b = this.c = null;
            return Promise.resolve()
        };

        function oh(b, c) {
            this.a = c;
            this.b = b;
            this.i = null;
            this.m = 1;
            this.u = Promise.resolve();
            this.j = [];
            this.l = new Map;
            this.c = new Map;
            this.v = !1;
            this.B = null;
            this.A = this.f = this.o = !1;
            this.w = 0
        }
        n = oh.prototype;
        n.destroy = function () {
            for (var b = q(this.c.values()), c = b.next(); !c.done; c = b.next()) ph(c.value);
            this.c.clear();
            this.l.clear();
            this.i = this.j = this.u = this.b = this.a = null;
            this.f = !0;
            return Promise.resolve()
        };
        n.configure = function (b) {
            this.i = b;
            this.B = new cb({
                maxAttempts: Math.max(b.retryParameters.maxAttempts, 2),
                baseDelay: b.retryParameters.baseDelay,
                backoffFactor: b.retryParameters.backoffFactor,
                fuzzFactor: b.retryParameters.fuzzFactor,
                timeout: 0
            }, !0)
        };
        n.init = function () {
            var b = eh(this.a.mb);
            b = this.a.ze(this.b.periods[I.Qa(this.b, b)]);
            return b.variant || b.text ? qh(this, b).then(function () {
                !this.f && this.a && this.a.Pg && this.a.Pg()
            }.bind(this)) : Promise.reject(new A(2, 5, 5005))
        };

        function rh(b) {
            var c = eh(b.a.mb);
            return b.b.periods[I.Qa(b.b, c)]
        }

        function sh(b) {
            var c = b.c.get("video");
            return c ? b.b.periods[c.Ya] : (c = b.c.get("audio")) ? b.b.periods[c.Ya] : null
        }

        function th(b) {
            return uh(b, "audio")
        }

        function vh(b) {
            return uh(b, "video")
        }

        function uh(b, c) {
            var d = b.c.get(c);
            return d ? d.Za || d.stream : null
        }

        function wh(b, c) {
            return r(function e() {
                var f, g, h, k, l, m, p, u;
                return v(e, function (e) {
                    switch (e.s) {
                        case 1:
                            return f = jd, Fd(b.a.R, f.tb), b.w++, b.A = !1, g = b.w, h = b.a.R, k = new Map, l = new Set, k.set(f.tb, c), l.add(c), t(e, h.init(k, !1), 2);
                        case 2:
                            return b.f ? e["return"]() : t(e, xh(b, l), 3);
                        case 3:
                            if (b.f) return e["return"]();
                            b.w != g || b.c.has(f.tb) || b.A || (m = eh(b.a.mb), p = I.Qa(b.b, m), u = yh(c, p), b.c.set(f.tb, u), zh(b, u, 0));
                            e.s = 0
                    }
                })
            })
        }

        function Ah(b) {
            b.A = !0;
            var c = b.c.get("text");
            c && (ph(c), b.c["delete"]("text"))
        }

        function Bh(b, c) {
            var d = b.c.get("video");
            if (d) {
                var e = d.stream;
                if (e)
                    if (c) {
                        var f = e.trickModeVideo;
                        f && !d.Za && (Ch(b, f, !1, 0), d.Za = e)
                    } else if (e = d.Za) d.Za = null, Ch(b, e, !0, 0)
            }
        }

        function Dh(b, c, d, e) {
            c.video && Ch(b, c.video, d, e);
            c.audio && Ch(b, c.audio, d, e)
        }

        function Ch(b, c, d, e) {
            var f = b.c.get(c.type);
            if (!f && "text" == c.type && b.i.ignoreTextStreamFailures) wh(b, c);
            else if (f) {
                var g = I.Pa(b.b, c);
                d && g != f.Ya ? Eh(b) : (f.Za && (c.trickModeVideo ? (f.Za = c, c = c.trickModeVideo) : f.Za = null), (g = b.j[g]) && g.Hb && (g = b.l.get(c.id)) && g.Hb && f.stream != c && ("text" == c.type && yd(b.a.R, Ob(c.mimeType, c.codecs)), f.stream = c, f.uc = !0, d && (f.fb ? f.Jc = !0 : f.kb ? (f.cb = !0, f.jc = e, f.Jc = !0) : (ph(f), Fh(b, f, !0, e)))))
            }
        }

        function Gh(b) {
            var c = eh(b.a.mb),
                d = b.i.smallGapLimit;
            Array.from(b.c.keys()).every(function (e) {
                var f = b.a.R;
                "text" == e ? (e = f.a, e = c >= e.a && c < e.b) : (e = Ad(f, e), e = Lc(e, c, d));
                return e
            }) || Eh(b)
        }

        function Eh(b) {
            b.c.forEach(function (c, d) {
                c.fb || c.cb || (c.kb ? (c.cb = !0, c.jc = 0) : null == zd(b.a.R, d) ? null == c.bb && zh(b, c, 0) : (ph(c), Fh(b, c, !1, 0)))
            })
        }

        function qh(b, c, d) {
            return r(function f() {
                var g, h, k, l, m, p, u;
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            return g = eh(b.a.mb), h = I.Qa(b.b, g), k = jd, l = new Map, m = new Set, c.variant && c.variant.audio && (l.set(k.zf, c.variant.audio), m.add(c.variant.audio)), c.variant && c.variant.video && (l.set(k.Mf, c.variant.video), m.add(c.variant.video)), c.text && (l.set(k.tb, c.text), m.add(c.text)), p = b.a.R, u = b.i.forceTransmuxTS, t(f, p.init(l, u), 2);
                        case 2:
                            if (b.f) return f["return"]();
                            Hh(b);
                            return t(f, xh(b, m), 3);
                        case 3:
                            if (b.f) return f["return"]();
                            l.forEach(function (c, f) {
                                if (!b.c.has(f)) {
                                    var g = yh(c, h, d);
                                    b.c.set(f, g);
                                    zh(b, g, 0)
                                }
                            });
                            f.s = 0
                    }
                })
            })
        }

        function yh(b, c, d) {
            return {
                stream: b,
                type: b.type,
                Ab: null,
                Ta: null,
                Za: null,
                uc: !0,
                Ya: c,
                endOfStream: !1,
                kb: !1,
                bb: null,
                cb: !1,
                jc: 0,
                Jc: !1,
                fb: !1,
                ld: !1,
                Rb: !1,
                Ue: d || 0
            }
        }

        function Ih(b, c) {
            var d = b.j[c];
            if (d) return d.promise;
            d = {
                promise: new z,
                Hb: !1
            };
            b.j[c] = d;
            for (var e = new Set, f = q(b.b.periods[c].variants), g = f.next(); !g.done; g = f.next()) g = g.value, g.video && e.add(g.video), g.video && g.video.trickModeVideo && e.add(g.video.trickModeVideo), g.audio && e.add(g.audio);
            f = q(b.b.periods[c].textStreams);
            for (g = f.next(); !g.done; g = f.next()) e.add(g.value);
            b.u = b.u.then(function () {
                if (!this.f) return xh(this, e)
            }.bind(b)).then(function () {
                this.f || (this.j[c].promise.resolve(), this.j[c].Hb = !0)
            }.bind(b))["catch"](function (b) {
                this.f ||
                    (this.j[c].promise["catch"](function () {}), this.j[c].promise.reject(), delete this.j[c], this.a.onError(b))
            }.bind(b));
            return d.promise
        }

        function xh(b, c) {
            return r(function e() {
                var f, g, h, k, l, m, p;
                return v(e, function (e) {
                    switch (e.s) {
                        case 1:
                            f = [];
                            for (var u = q(c), x = u.next(); !x.done; x = u.next()) g = x.value, (h = b.l.get(g.id)) ? f.push(h.promise) : (b.l.set(g.id, {
                                promise: new z,
                                Hb: !1
                            }), f.push(g.createSegmentIndex()));
                            oa(e, 2);
                            return t(e, Promise.all(f), 4);
                        case 4:
                            if (b.f) return e["return"]();
                            qa(e, 3);
                            break;
                        case 2:
                            k = ra(e);
                            if (b.f) return e["return"]();
                            e = q(c);
                            for (x = e.next(); !x.done; x = e.next()) l = x.value, b.l.get(l.id).promise["catch"](function () {}), b.l.get(l.id).promise.reject(),
                                b.l["delete"](l.id);
                            throw k;
                        case 3:
                            u = q(c);
                            for (x = u.next(); !x.done; x = u.next()) m = x.value, p = b.l.get(m.id), p.Hb || (p.promise.resolve(), p.Hb = !0);
                            e.s = 0
                    }
                })
            })
        }

        function Hh(b) {
            var c = b.b.presentationTimeline.ha();
            Infinity > c ? b.a.R.Ja(c) : b.a.R.Ja(Math.pow(2, 32))
        }
        n.gi = function (b) {
            if (!this.f && !b.kb && null != b.bb && !b.fb)
                if (b.bb = null, b.cb) Fh(this, b, b.Jc, b.jc);
                else {
                    try {
                        var c = Jh(this, b);
                        null != c && (zh(this, b, c), b.Rb = !1)
                    } catch (d) {
                        Kh(this, d);
                        return
                    }
                    c = Array.from(this.c.values());
                    Lh(this, b);
                    c.every(function (b) {
                        return b.endOfStream
                    }) && this.a.R.endOfStream().then(function () {
                        if (!this.f) {
                            var b = this.a.R.ha();
                            b < this.b.presentationTimeline.ha() && this.b.presentationTimeline.Ja(b)
                        }
                    }.bind(this))
                }
        };

        function Jh(b, c) {
            function d(b) {
                return "text" == b.type && "application/cea-608" == b.stream.mimeType
            }
            if (d(c)) return b.a.R.Ec(c.stream.originalId || ""), null;
            var e = eh(b.a.mb),
                f = Mh(b, c, e),
                g = I.Pa(b.b, c.stream),
                h = I.Qa(b.b, f),
                k = Cd(b.a.R, c.type, e),
                l = Math.max(b.b.minBufferTime || 0, b.i.rebufferingGoal, b.i.bufferingGoal) * b.m;
            if (f >= b.b.presentationTimeline.ha()) return c.endOfStream = !0, "video" == c.type && (f = b.c.get("text")) && "application/cea-608" == f.stream.mimeType && (f.endOfStream = !0), null;
            c.endOfStream = !1;
            c.Ya = h;
            if (h !=
                g) return null;
            if (k >= l) return .5;
            h = Bd(b.a.R, c.type);
            h = Nh(b, c, e, h, g);
            if (!h) return 1;
            var m = Infinity;
            Array.from(b.c.values()).forEach(function (c) {
                d(c) || (m = Math.min(m, Mh(b, c, e)))
            });
            if (f >= m + b.b.presentationTimeline.a) return 1;
            c.Ue = 0;
            Oh(b, c, e, g, h);
            return null
        }

        function Mh(b, c, d) {
            return c.Ab && c.Ta ? b.b.periods[I.Pa(b.b, c.Ab)].startTime + c.Ta.endTime : Math.max(d, c.Ue)
        }

        function Nh(b, c, d, e, f) {
            if (c.Ta && c.stream == c.Ab) return Ph(b, c, f, c.Ta.position + 1);
            d = c.Ta ? c.stream.findSegmentPosition(Math.max(0, b.b.periods[I.Pa(b.b, c.Ab)].startTime + c.Ta.endTime - b.b.periods[f].startTime)) : c.stream.findSegmentPosition(Math.max(0, (e || d) - b.b.periods[f].startTime));
            if (null == d) return null;
            var g = null;
            null == e && (g = Ph(b, c, f, Math.max(0, d - 1)));
            return g || Ph(b, c, f, d)
        }

        function Ph(b, c, d, e) {
            d = b.b.periods[d];
            c = c.stream.getSegmentReference(e);
            if (!c) return null;
            e = b.b.presentationTimeline;
            b = e.Pb();
            e = e.zb();
            return d.startTime + c.endTime < b || d.startTime + c.startTime > e ? null : c
        }

        function Oh(b, c, d, e, f) {
            var g = b.b.periods[e],
                h = c.stream,
                k = b.b.presentationTimeline.ha(),
                l = b.b.periods[e + 1];
            e = Qh(b, c, e, Math.max(0, g.startTime - .1), l ? l.startTime : k);
            c.kb = !0;
            c.uc = !1;
            k = Rh(b, f);
            Promise.all([e, k]).then(function (b) {
                if (!this.f && !this.o) return Sh(this, c, d, g, h, f, b[1])
            }.bind(b)).then(function () {
                this.f || this.o || (c.kb = !1, c.ld = !1, c.cb || this.a.Zb(), zh(this, c, 0), Th(this, h))
            }.bind(b))["catch"](function (b) {
                this.f || this.o || (c.kb = !1, "text" == c.type && this.i.ignoreTextStreamFailures ? this.c["delete"]("text") :
                    3017 == b.code ? Uh(this, c, b) : (c.Rb = !0, b.severity = 2, Kh(this, b)))
            }.bind(b))
        }

        function Uh(b, c, d) {
            if (!Array.from(b.c.values()).some(function (b) {
                    return b != c && b.ld
                })) {
                var e = Math.round(100 * b.m);
                if (20 < e) b.m -= .2;
                else if (4 < e) b.m -= .04;
                else {
                    c.Rb = !0;
                    b.o = !0;
                    b.a.onError(d);
                    return
                }
                c.ld = !0
            }
            zh(b, c, 4)
        }

        function Qh(b, c, d, e, f) {
            if (!c.uc) return Promise.resolve();
            d = Gd(b.a.R, c.type, b.b.periods[d].startTime - c.stream.presentationTimeOffset, e, f);
            if (!c.stream.initSegmentReference) return d;
            b = Rh(b, c.stream.initSegmentReference).then(function (b) {
                if (!this.f) return Dd(this.a.R, c.type, b, null, null, c.stream.closedCaptions && 0 < c.stream.closedCaptions.size)
            }.bind(b))["catch"](function (b) {
                c.uc = !0;
                return Promise.reject(b)
            });
            return Promise.all([d, b])
        }

        function Sh(b, c, d, e, f, g, h) {
            var k = f.closedCaptions && 0 < f.closedCaptions.size;
            null != f.emsgSchemeIdUris && 0 < f.emsgSchemeIdUris.length && (new P).ya("emsg", b.Bh.bind(b, e, g, f.emsgSchemeIdUris)).parse(h);
            return Vh(b, c, d).then(function () {
                if (!this.f) return Dd(this.a.R, c.type, h, g.startTime + e.startTime, g.endTime + e.startTime, k)
            }.bind(b)).then(function () {
                if (!this.f) return c.Ab = f, c.Ta = g, Promise.resolve()
            }.bind(b))
        }
        n.Bh = function (b, c, d, e) {
            var f = e.reader.kd(),
                g = e.reader.kd(),
                h = e.reader.J(),
                k = e.reader.J(),
                l = e.reader.J(),
                m = e.reader.J();
            e = e.reader.ob(e.reader.N.byteLength - e.reader.qa());
            b = b.startTime + c.startTime + k / h;
            if (d.includes(f))
                if ("urn:mpeg:dash:event:2012" == f) this.a.Sg();
                else this.a.onEvent(new D("emsg", {
                    detail: {
                        startTime: b,
                        endTime: b + l / h,
                        schemeIdUri: f,
                        value: g,
                        timescale: h,
                        presentationTimeDelta: k,
                        eventDuration: l,
                        id: m,
                        messageData: e
                    }
                }))
        };

        function Vh(b, c, d) {
            var e = Math.max(b.i.bufferBehind, b.b.presentationTimeline.a),
                f = zd(b.a.R, c.type);
            if (null == f) return Promise.resolve();
            d = d - f - e;
            return 0 >= d ? Promise.resolve() : b.a.R.remove(c.type, f, f + d).then(function () {}.bind(b))
        }

        function Th(b, c) {
            if (!b.v && (b.v = Array.from(b.c.values()).every(function (b) {
                    return "text" == b.type ? !0 : !b.cb && !b.fb && b.Ta
                }), b.v)) {
                var d = I.Pa(b.b, c);
                b.j[d] || Ih(b, d).then(function () {
                    this.f || this.a.xe()
                }.bind(b))["catch"](Hb.jb);
                for (d = 0; d < b.b.periods.length; ++d) Ih(b, d)["catch"](Hb.jb);
                b.a.mh && b.a.mh()
            }
        }

        function Lh(b, c) {
            if (c.Ya != I.Pa(b.b, c.stream)) {
                var d = c.Ya,
                    e = Array.from(b.c.values());
                e.every(function (b) {
                    return b.Ya == d
                }) && e.every(Wh) && Ih(b, d).then(function () {
                    if (!this.f && e.every(function (b) {
                            var c = I.Pa(this.b, b.stream);
                            return Wh(b) && b.Ya == d && c != d
                        }.bind(this))) {
                        var b = this.b.periods[d],
                            c = this.a.ze(b),
                            h = new Map;
                        c.variant && c.variant.video && h.set("video", c.variant.video);
                        c.variant && c.variant.audio && h.set("audio", c.variant.audio);
                        c.text && h.set("text", c.text);
                        var k = q(this.c.keys());
                        for (c = k.next(); !c.done; c =
                            k.next())
                            if (c = c.value, !h.has(c) && "text" != c) {
                                this.a.onError(new A(2, 5, 5005));
                                return
                            } k = q(Array.from(h.keys()));
                        for (c = k.next(); !c.done; c = k.next())
                            if (c = c.value, !this.c.has(c))
                                if ("text" == c) qh(this, {
                                    text: h.get("text")
                                }, b.startTime), h["delete"](c);
                                else {
                                    this.a.onError(new A(2, 5, 5005));
                                    return
                                } b = q(Array.from(this.c.keys()));
                        for (c = b.next(); !c.done; c = b.next()) c = c.value, (k = h.get(c)) ? (Ch(this, k, !1, 0), zh(this, this.c.get(c), 0)) : this.c["delete"](c);
                        this.a.xe()
                    }
                }.bind(b))["catch"](Hb.jb)
            }
        }

        function Wh(b) {
            return !b.kb && null == b.bb && !b.cb && !b.fb
        }

        function Rh(b, c) {
            var d = yb(c.c(), b.i.retryParameters);
            if (0 != c.b || null != c.a) {
                var e = "bytes=" + c.b + "-";
                null != c.a && (e += c.a);
                d.headers.Range = e
            }
            return b.a.vc.request(1, d).promise.then(function (b) {
                return b.data
            })
        }

        function Fh(b, c, d, e) {
            r(function g() {
                var h, k, l;
                return v(g, function (g) {
                    switch (g.s) {
                        case 1:
                            return c.cb = !1, c.Jc = !1, c.jc = 0, c.fb = !0, e ? (k = eh(b.a.mb), l = b.a.R.ha(), h = b.a.R.remove(c.type, k + e, l)) : h = Fd(b.a.R, c.type).then(function () {
                                if (!this.f && d) return this.a.R.flush(c.type)
                            }.bind(b)), t(g, h, 2);
                        case 2:
                            if (b.f) return g["return"]();
                            c.Ab = null;
                            c.Ta = null;
                            c.fb = !1;
                            c.endOfStream = !1;
                            zh(b, c, 0);
                            g.s = 0
                    }
                })
            })
        }

        function zh(b, c, d) {
            c.bb = window.setTimeout(b.gi.bind(b, c), 1E3 * d)
        }

        function ph(b) {
            null != b.bb && (window.clearTimeout(b.bb), b.bb = null)
        }

        function Kh(b, c) {
            eb(b.B).then(function () {
                this.f || (this.a.onError(c), c.handled || this.i.failureCallback(c))
            }.bind(b))
        };

        function Xh(b, c, d, e, f, g) {
            if (200 <= d && 299 >= d && 202 != d) return f && (e = f), {
                uri: e,
                data: c,
                headers: b,
                fromCache: !!b["x-shaka-from-cache"]
            };
            f = null;
            try {
                f = Vb(c)
            } catch (h) {}
            throw new A(401 == d || 403 == d ? 2 : 1, 1, 1001, e, d, f, b, g);
        };

        function Yh(b, c, d, e) {
            var f = new Yh.b;
            Mb(c.headers).forEach(function (b, c) {
                f.append(c, b)
            });
            var g = new Yh.a,
                h = {
                    body: c.body || void 0,
                    headers: f,
                    method: c.method,
                    signal: g.signal,
                    credentials: c.allowCrossSiteCredentials ? "include" : void 0
                },
                k = {
                    $d: !1,
                    lf: !1
                },
                l;
            c.retryParameters.timeout && (l = setTimeout(function () {
                k.lf = !0;
                g.abort()
            }, c.retryParameters.timeout));
            b = Yh.j(b, d, h, k, l, e);
            return new C(b, function () {
                k.$d = !0;
                g.abort();
                return Promise.resolve()
            })
        }
        y("shaka.net.HttpFetchPlugin", Yh);
        Yh.j = function (b, c, d, e, f, g) {
            return r(function k() {
                var l, m, p, u, w, x, B, K, U, R, Y, sa;
                return v(k, function (k) {
                    switch (k.s) {
                        case 1:
                            return l = Yh.i, m = Yh.c, x = w = 0, B = Date.now(), oa(k, 2, 3), t(k, l(b, d), 5);
                        case 5:
                            return p = k.F, K = p.clone().body.getReader(), U = function (b) {
                                function c() {
                                    return r(function Sc() {
                                        var d, e;
                                        return v(Sc, function (f) {
                                            switch (f.s) {
                                                case 1:
                                                    return t(f, K.read(), 2);
                                                case 2:
                                                    d = f.F;
                                                    d.done || (w += d.value.byteLength);
                                                    e = Date.now();
                                                    if (100 < e - B || d.done) g(e - B, w - x), x = w, B = e;
                                                    d.done ? b.close() : (b.enqueue(d.value), c());
                                                    f.s = 0
                                            }
                                        })
                                    })
                                }
                                c()
                            }, new m({
                                start: U
                            }), t(k, p.arrayBuffer(), 6);
                        case 6:
                            u = k.F;
                        case 3:
                            ta(k);
                            clearTimeout(f);
                            ua(k, 4);
                            break;
                        case 2:
                            R = ra(k);
                            if (e.$d) throw new A(1, 1, 7001, b, c);
                            if (e.lf) throw new A(1, 1, 1003, b, c);
                            throw new A(1, 1, 1002, b, R, c);
                        case 4:
                            return Y = {}, sa = p.headers, sa.forEach(function (b, c) {
                                Y[c.trim()] = b
                            }), k["return"](Xh(Y, u, p.status, b, p.url, c))
                    }
                })
            })
        };
        Yh.isSupported = function () {
            if (window.ReadableStream) try {
                new ReadableStream({})
            } catch (b) {
                return !1
            } else return !1;
            return !(!window.fetch || !window.AbortController)
        };
        Yh.isSupported = Yh.isSupported;
        Yh.i = window.fetch;
        Yh.a = window.AbortController;
        Yh.c = window.ReadableStream;
        Yh.b = window.Headers;
        Yh.isSupported() && (xb("http", Yh, 2), xb("https", Yh, 2));

        function Zh(b, c, d, e) {
            var f = new Zh.f,
                g = Date.now(),
                h = 0,
                k = new Promise(function (k, m) {
                    f.open(c.method, b, !0);
                    f.responseType = "arraybuffer";
                    f.timeout = c.retryParameters.timeout;
                    f.withCredentials = c.allowCrossSiteCredentials;
                    f.onabort = function () {
                        m(new A(1, 1, 7001, b, d))
                    };
                    f.onload = function (c) {
                        c = c.target;
                        var e = c.getAllResponseHeaders().trim().split("\r\n"),
                            f = {};
                        e = q(e);
                        for (var g = e.next(); !g.done; g = e.next()) g = g.value.split(": "), f[g[0].toLowerCase()] = g.slice(1).join(": ");
                        try {
                            var h = Xh(f, c.response, c.status, b, c.responseURL,
                                d);
                            k(h)
                        } catch (U) {
                            m(U)
                        }
                    };
                    f.onerror = function (c) {
                        m(new A(1, 1, 1002, b, c, d))
                    };
                    f.ontimeout = function () {
                        m(new A(1, 1, 1003, b, d))
                    };
                    f.onprogress = function (b) {
                        var c = Date.now();
                        if (100 < c - g || b.lengthComputable && b.loaded == b.total) e(c - g, b.loaded - h), h = b.loaded, g = c
                    };
                    for (var l in c.headers) f.setRequestHeader(l.toLowerCase(), c.headers[l]);
                    f.send(c.body)
                });
            return new C(k, function () {
                f.abort();
                return Promise.resolve()
            })
        }
        y("shaka.net.HttpXHRPlugin", Zh);
        Zh.f = window.XMLHttpRequest;
        xb("http", Zh, 1);
        xb("https", Zh, 1);

        function $h(b) {
            this.b = new Map;
            this.c = Promise.resolve();
            this.j = !1;
            this.l = b;
            this.f = this.a = this.i = 0
        }
        $h.prototype.destroy = function () {
            this.j = !0;
            var b = this.c["catch"](function () {});
            this.c = Promise.resolve();
            return b
        };

        function ai(b, c, d, e, f) {
            var g = b.b.get(c) || [];
            g.push({
                request: d,
                ce: e,
                Lg: f
            });
            b.b.set(c, g)
        }

        function bi(b, c) {
            var d = Array.from(b.b.values());
            b.b.clear();
            for (var e = q(d), f = e.next(); !f.done; f = e.next()) {
                f = q(f.value);
                for (var g = f.next(); !g.done; g = f.next()) b.a += g.value.ce
            }
            var h = Promise.all(d.map(function (d) {
                return ci(b, c, d)
            }));
            b.c = b.c.then(function () {
                return h
            });
            return h
        }

        function ci(b, c, d) {
            var e = Promise.resolve();
            d.forEach(function (d) {
                e = e.then(function () {
                    di(b);
                    return ei(b, c, d)
                })
            });
            return e
        }

        function ei(b, c, d) {
            return Promise.resolve().then(function () {
                di(b);
                return c.request(1, d.request).promise
            }).then(function (c) {
                di(b);
                b.i += d.ce;
                b.f += c.data.byteLength;
                b.l(b.a ? b.i / b.a : 0, b.f);
                return d.Lg(c.data)
            })
        }

        function di(b) {
            if (b.j) throw new A(2, 9, 7001);
        };

        function fi(b, c) {
            var d = this;
            this.c = b;
            this.b = b.objectStore(c);
            this.a = new z;
            b.onabort = function (b) {
                b.preventDefault();
                d.a.reject()
            };
            b.onerror = function (b) {
                b.preventDefault();
                d.a.reject()
            };
            b.oncomplete = function () {
                d.a.resolve()
            }
        }
        fi.prototype.abort = function () {
            try {
                this.c.abort()
            } catch (b) {}
            return this.a["catch"](function () {})
        };

        function gi(b, c) {
            return new Promise(function (d, e) {
                var f = b.b.openCursor();
                f.onerror = e;
                f.onsuccess = function (b) {
                    b = b.target.result;
                    if (!b) return d();
                    c(b.key, b.value, b);
                    b["continue"]()
                }
            })
        }
        fi.prototype.store = function () {
            return this.b
        };
        fi.prototype.promise = function () {
            return this.a
        };

        function hi(b) {
            this.b = b;
            this.a = []
        }
        hi.prototype.destroy = function () {
            return Promise.all(this.a.map(function (b) {
                return b.abort()
            }))
        };

        function ii(b, c) {
            return ji(b, c, "readonly")
        }

        function ki(b, c) {
            return ji(b, c, "readwrite")
        }

        function ji(b, c, d) {
            d = b.b.transaction([c], d);
            var e = new fi(d, c);
            b.a.push(e);
            e.promise().then(function () {
                pb(b.a, e)
            }, function () {
                pb(b.a, e)
            });
            return e
        };

        function li(b) {
            this.a = new hi(b)
        }
        li.prototype.destroy = function () {
            return this.a.destroy()
        };
        li.prototype.getAll = function () {
            var b = this;
            return r(function d() {
                var e, f;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return e = ii(b.a, "session-ids"), f = [], t(d, gi(e, function (b, d) {
                                f.push(d)
                            }), 2);
                        case 2:
                            return t(d, e.promise(), 3);
                        case 3:
                            return d["return"](f)
                    }
                })
            })
        };
        li.prototype.add = function (b) {
            var c = ki(this.a, "session-ids"),
                d = c.store();
            b = q(b);
            for (var e = b.next(); !e.done; e = b.next()) d.add(e.value);
            return c.promise()
        };
        li.prototype.remove = function (b) {
            var c = this;
            return r(function e() {
                var f;
                return v(e, function (e) {
                    switch (e.s) {
                        case 1:
                            return f = ki(c.a, "session-ids"), t(e, gi(f, function (c, e, f) {
                                0 <= b.indexOf(e.sessionId) && f["delete"]()
                            }), 2);
                        case 2:
                            return t(e, f.promise(), 0)
                    }
                })
            })
        };

        function mi() {
            this.a = new Map
        }
        mi.prototype.destroy = function () {
            for (var b = [], c = q(this.a.values()), d = c.next(); !d.done; d = c.next()) b.push(d.value.destroy());
            this.a.clear();
            return Promise.all(b)
        };
        mi.prototype.init = function () {
            var b = this;
            ni.forEach(function (c, d) {
                var e = c();
                e && b.a.set(d, e)
            });
            for (var c = [], d = q(this.a.values()), e = d.next(); !e.done; e = d.next()) c.push(e.value.init());
            return Promise.all(c)
        };

        function oi(b) {
            var c = null;
            b.a.forEach(function (b, e) {
                b.getCells().forEach(function (b, d) {
                    b.hasFixedKeySpace() || c || (c = {
                        path: {
                            Ha: e,
                            oa: d
                        },
                        oa: b
                    })
                })
            });
            if (c) return c;
            throw new A(2, 9, 9013, "Could not find a cell that supports add-operations");
        }

        function pi(b, c) {
            b.a.forEach(function (b, e) {
                b.getCells().forEach(function (b, d) {
                    c({
                        Ha: e,
                        oa: d
                    }, b)
                })
            })
        }

        function qi(b, c, d) {
            b = b.a.get(c);
            if (!b) throw new A(2, 9, 9013, "Could not find mechanism with name " + c);
            c = b.getCells().get(d);
            if (!c) throw new A(2, 9, 9013, "Could not find cell with name " + d);
            return c
        }

        function ri(b, c) {
            b.a.forEach(function (b) {
                c(b.getEmeSessionCell())
            })
        }

        function si(b) {
            var c = Array.from(b.a.keys());
            if (!c.length) throw new A(2, 9, 9E3, "No supported storage mechanisms found");
            return b.a.get(c[0]).getEmeSessionCell()
        }
        mi.prototype.erase = function () {
            var b = this;
            return r(function d() {
                var e, f, g;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return e = Array.from(b.a.values()), f = 0 < e.length, f || (g = ni, g.forEach(function (b) {
                                (b = b()) && e.push(b)
                            })), t(d, Promise.all(e.map(function (b) {
                                return b.erase()
                            })), 2);
                        case 2:
                            if (f) d.I(0);
                            else return t(d, Promise.all(e.map(function (b) {
                                return b.destroy()
                            })), 0)
                    }
                })
            })
        };

        function ti(b, c) {
            ni.set(b, c)
        }
        y("shaka.offline.StorageMuxer.register", ti);
        y("shaka.offline.StorageMuxer.unregister", function (b) {
            ni["delete"](b)
        });

        function ui() {
            for (var b = q(ni.values()), c = b.next(); !c.done; c = b.next())
                if (c = c.value, c = c()) return c.destroy(), !0;
            return !1
        }
        var ni = new Map;

        function vi(b) {
            this.a = new hi(b)
        }
        n = vi.prototype;
        n.destroy = function () {
            return this.a.destroy()
        };
        n.hasFixedKeySpace = function () {
            return !0
        };
        n.addSegments = function () {
            return wi("segment")
        };
        n.removeSegments = function (b, c) {
            return xi(this, "segment", b, c)
        };
        n.getSegments = function (b) {
            return yi(this, "segment", b).then(function (b) {
                return b.map(zi)
            })
        };
        n.addManifests = function () {
            return wi("manifest")
        };
        n.updateManifestExpiration = function (b, c) {
            var d = ki(this.a, "manifest"),
                e = d.store(),
                f = new z;
            e.get(b).onsuccess = function (d) {
                (d = d.target.result) ? (d.expiration = c, e.put(d), f.resolve()) : f.reject(new A(2, 9, 9012, "Could not find values for " + b))
            };
            return d.promise().then(function () {
                return f
            })
        };
        n.removeManifests = function (b, c) {
            return xi(this, "manifest", b, c)
        };
        n.getManifests = function (b) {
            return yi(this, "manifest", b).then(function (b) {
                return b.map(Ai)
            })
        };
        n.getAllManifests = function () {
            var b = this;
            return r(function d() {
                var e, f, g;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return e = Ai, f = ii(b.a, "manifest"), g = new Map, t(d, gi(f, function (b, d) {
                                g.set(b, e(d))
                            }), 2);
                        case 2:
                            return t(d, f.promise(), 3);
                        case 3:
                            return d["return"](g)
                    }
                })
            })
        };

        function wi(b) {
            return Promise.reject(new A(2, 9, 9011, "Cannot add new value to " + b))
        }

        function xi(b, c, d, e) {
            b = ki(b.a, c);
            var f = b.store();
            d.forEach(function (b) {
                f["delete"](b).onsuccess = function () {
                    return e(b)
                }
            });
            return b.promise()
        }

        function yi(b, c, d) {
            b = ii(b.a, c);
            var e = b.store(),
                f = {},
                g = [];
            d.forEach(function (b) {
                e.get(b).onsuccess = function (c) {
                    c = c.target.result;
                    void 0 == c && g.push(b);
                    f[b] = c
                }
            });
            return b.promise().then(function () {
                return g.length ? Promise.reject(new A(2, 9, 9012, "Could not find values for " + g)) : d.map(function (b) {
                    return f[b]
                })
            })
        }

        function Ai(b) {
            return {
                originalManifestUri: b.originalManifestUri,
                duration: b.duration,
                size: b.size,
                expiration: null == b.expiration ? Infinity : b.expiration,
                periods: b.periods.map(Bi),
                sessionIds: b.sessionIds,
                drmInfo: b.drmInfo,
                appMetadata: b.appMetadata
            }
        }

        function Bi(b) {
            Ci(b);
            b.streams.forEach(function () {});
            return {
                startTime: b.startTime,
                streams: b.streams.map(Di)
            }
        }

        function Di(b) {
            var c = b.vg ? Ei(b.vg) : null;
            return {
                id: b.id,
                originalId: null,
                primary: b.primary,
                presentationTimeOffset: b.presentationTimeOffset,
                contentType: b.contentType,
                mimeType: b.mimeType,
                codecs: b.codecs,
                frameRate: b.frameRate,
                kind: b.kind,
                language: b.language,
                label: b.label,
                width: b.width,
                height: b.height,
                initSegmentKey: c,
                encrypted: b.encrypted,
                keyId: b.keyId,
                segments: b.segments.map(Fi),
                variantIds: b.variantIds
            }
        }

        function Fi(b) {
            var c = Ei(b.uri);
            return {
                startTime: b.startTime,
                endTime: b.endTime,
                dataKey: c
            }
        }

        function zi(b) {
            return {
                data: b.data
            }
        }

        function Ei(b) {
            var c;
            if ((c = /^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(b)) || (c = /^offline:segment\/([0-9]+)$/.exec(b))) return Number(c[1]);
            throw new A(2, 9, 9004, "Could not parse uri " + b);
        }

        function Ci(b) {
            var c = b.streams.filter(function (b) {
                    return "audio" == b.contentType
                }),
                d = b.streams.filter(function (b) {
                    return "video" == b.contentType
                });
            if (!c.every(function (b) {
                    return b.variantIds
                }) || !d.every(function (b) {
                    return b.variantIds
                })) {
                c.forEach(function (b) {
                    b.variantIds = []
                });
                d.forEach(function (b) {
                    b.variantIds = []
                });
                var e = 0;
                if (d.length && !c.length) {
                    var f = e++;
                    d.forEach(function (b) {
                        b.variantIds.push(f)
                    })
                }
                if (!d.length && c.length) {
                    var g = e++;
                    c.forEach(function (b) {
                        b.variantIds.push(g)
                    })
                }
                d.length && c.length && c.forEach(function (b) {
                    d.forEach(function (c) {
                        var d =
                            e++;
                        b.variantIds.push(d);
                        c.variantIds.push(d)
                    })
                })
            }
        };

        function Gi(b, c, d, e) {
            this.a = new hi(b);
            this.c = c;
            this.b = d;
            this.f = e
        }
        n = Gi.prototype;
        n.destroy = function () {
            return this.a.destroy()
        };
        n.hasFixedKeySpace = function () {
            return this.f
        };
        n.addSegments = function (b) {
            return Hi(this, this.c, b)
        };
        n.removeSegments = function (b, c) {
            return Ii(this, this.c, b, c)
        };
        n.getSegments = function (b) {
            return Ji(this, this.c, b)
        };
        n.addManifests = function (b) {
            return Hi(this, this.b, b)
        };
        n.updateManifestExpiration = function (b, c) {
            var d = ki(this.a, this.b),
                e = d.store();
            e.get(b).onsuccess = function (d) {
                if (d = d.target.result) d.expiration = c, e.put(d, b)
            };
            return d.promise()
        };
        n.removeManifests = function (b, c) {
            return Ii(this, this.b, b, c)
        };
        n.getManifests = function (b) {
            return Ji(this, this.b, b)
        };
        n.getAllManifests = function () {
            var b = this;
            return r(function d() {
                var e, f;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return e = ii(b.a, b.b), f = new Map, t(d, gi(e, function (b, d) {
                                f.set(b, d)
                            }), 2);
                        case 2:
                            return t(d, e.promise(), 3);
                        case 3:
                            return d["return"](f)
                    }
                })
            })
        };

        function Hi(b, c, d) {
            if (b.f) return Promise.reject(new A(1, 9, 9011, "Cannot add new value to " + c));
            b = ki(b.a, c);
            var e = b.store(),
                f = [];
            d.forEach(function (b) {
                e.add(b).onsuccess = function (b) {
                    f.push(b.target.result)
                }
            });
            return b.promise().then(function () {
                return f
            })
        }

        function Ii(b, c, d, e) {
            b = ki(b.a, c);
            var f = b.store();
            d.forEach(function (b) {
                f["delete"](b).onsuccess = function () {
                    return e(b)
                }
            });
            return b.promise()
        }

        function Ji(b, c, d) {
            b = ii(b.a, c);
            var e = b.store(),
                f = {},
                g = [];
            d.forEach(function (b) {
                var c = e.get(b);
                c.onsuccess = function () {
                    void 0 == c.result && g.push(b);
                    f[b] = c.result
                }
            });
            return b.promise().then(function () {
                return g.length ? Promise.reject(new A(1, 9, 9012, "Could not find values for " + g)) : d.map(function (b) {
                    return f[b]
                })
            })
        };

        function Ki() {
            this.i = this.c = this.b = this.a = this.f = null
        }
        n = Ki.prototype;
        n.init = function () {
            var b = this,
                c = new z,
                d = window.indexedDB.open("shaka_offline_db", 4);
            d.onsuccess = function (d) {
                d = d.target.result;
                b.f = d;
                var e = d.objectStoreNames;
                e = e.contains("manifest") && e.contains("segment") ? new vi(d) : null;
                b.a = e;
                e = d.objectStoreNames;
                e = e.contains("manifest-v2") && e.contains("segment-v2") ? new Gi(d, "segment-v2", "manifest-v2", !0) : null;
                b.b = e;
                e = d.objectStoreNames;
                e = e.contains("manifest-v3") && e.contains("segment-v3") ? new Gi(d, "segment-v3", "manifest-v3", !1) : null;
                b.c = e;
                d = d.objectStoreNames.contains("session-ids") ?
                    new li(d) : null;
                b.i = d;
                c.resolve()
            };
            d.onupgradeneeded = function (b) {
                b = b.target.result;
                for (var c = q(["segment-v3", "manifest-v3", "session-ids"]), d = c.next(); !d.done; d = c.next()) d = d.value, b.objectStoreNames.contains(d) || b.createObjectStore(d, {
                    autoIncrement: !0
                })
            };
            d.onerror = function (b) {
                c.reject(new A(2, 9, 9001, d.error));
                b.preventDefault()
            };
            return c
        };
        n.destroy = function () {
            var b = this;
            return r(function d() {
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            if (!b.a) {
                                d.I(2);
                                break
                            }
                            return t(d, b.a.destroy(), 2);
                        case 2:
                            if (!b.b) {
                                d.I(4);
                                break
                            }
                            return t(d, b.b.destroy(), 4);
                        case 4:
                            if (!b.c) {
                                d.I(6);
                                break
                            }
                            return t(d, b.c.destroy(), 6);
                        case 6:
                            if (!b.i) {
                                d.I(8);
                                break
                            }
                            return t(d, b.i.destroy(), 8);
                        case 8:
                            b.f && b.f.close(), d.s = 0
                    }
                })
            })
        };
        n.getCells = function () {
            var b = new Map;
            this.a && b.set("v1", this.a);
            this.b && b.set("v2", this.b);
            this.c && b.set("v3", this.c);
            return b
        };
        n.getEmeSessionCell = function () {
            return this.i
        };
        n.erase = function () {
            var b = this;
            return r(function d() {
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            if (!b.a) {
                                d.I(2);
                                break
                            }
                            return t(d, b.a.destroy(), 2);
                        case 2:
                            if (!b.b) {
                                d.I(4);
                                break
                            }
                            return t(d, b.b.destroy(), 4);
                        case 4:
                            if (!b.c) {
                                d.I(6);
                                break
                            }
                            return t(d, b.c.destroy(), 6);
                        case 6:
                            return b.f && b.f.close(), t(d, Li(), 8);
                        case 8:
                            return b.f = null, b.a = null, b.b = null, b.c = null, t(d, b.init(), 0)
                    }
                })
            })
        };

        function Li() {
            var b = new z,
                c = window.indexedDB.deleteDatabase("shaka_offline_db");
            c.onblocked = function () {};
            c.onsuccess = function () {
                b.resolve()
            };
            c.onerror = function (d) {
                b.reject(new A(2, 9, 9001, c.error));
                d.preventDefault()
            };
            return b
        }
        ti("idb", function () {
            return window.indexedDB ? new Ki : null
        });

        function Mi(b, c, d, e) {
            this.a = b;
            this.i = c;
            this.f = d;
            this.c = e;
            this.b = ["offline:", b, "/", c, "/", d, "/", e].join("")
        }
        Mi.prototype.Ha = function () {
            return this.i
        };
        Mi.prototype.oa = function () {
            return this.f
        };
        Mi.prototype.key = function () {
            return this.c
        };
        Mi.prototype.toString = function () {
            return this.b
        };

        function Ni(b) {
            b = /^offline:([a-z]+)\/([^/]+)\/([^/]+)\/([0-9]+)$/.exec(b);
            if (null == b) return null;
            var c = b[1];
            if ("manifest" != c && "segment" != c) return null;
            var d = b[2];
            if (!d) return null;
            var e = b[3];
            return e && null != c ? new Mi(c, d, e, Number(b[4])) : null
        };

        function Oi(b, c) {
            this.b = b;
            this.a = c
        }

        function Pi(b, c) {
            var d = new S(null, 0);
            d.Ja(c.duration);
            var e = c.periods.map(function (c) {
                    return Qi(b, c, d)
                }),
                f = c.drmInfo ? [c.drmInfo] : [];
            c.drmInfo && e.forEach(function (b) {
                b.variants.forEach(function (b) {
                    b.drmInfos = f
                })
            });
            return {
                presentationTimeline: d,
                minBufferTime: 2,
                offlineSessionIds: c.sessionIds,
                periods: e
            }
        }

        function Qi(b, c, d) {
            var e = c.streams.filter(function (b) {
                    return "audio" == b.contentType
                }),
                f = c.streams.filter(function (b) {
                    return "video" == b.contentType
                });
            e = Ri(b, e, f);
            f = c.streams.filter(function (b) {
                return "text" == b.contentType
            }).map(function (c) {
                return Si(b, c)
            });
            c.streams.forEach(function (e) {
                e = e.segments.map(function (c, d) {
                    return Ti(b, d, c)
                });
                d.Cb(e, c.startTime)
            });
            return {
                startTime: c.startTime,
                variants: Array.from(e.values()),
                textStreams: f
            }
        }

        function Ri(b, c, d) {
            for (var e = new Set, f = q(c), g = f.next(); !g.done; g = f.next()) {
                var h = q(g.value.variantIds);
                for (g = h.next(); !g.done; g = h.next()) e.add(g.value)
            }
            f = q(d);
            for (g = f.next(); !g.done; g = f.next())
                for (h = q(g.value.variantIds), g = h.next(); !g.done; g = h.next()) e.add(g.value);
            f = new Map;
            e = q(e);
            for (g = e.next(); !g.done; g = e.next()) g = g.value, f.set(g, {
                id: g,
                language: "",
                primary: !1,
                audio: null,
                video: null,
                bandwidth: 0,
                drmInfos: [],
                allowedByApplication: !0,
                allowedByKeySystem: !0
            });
            c = q(c);
            for (e = c.next(); !e.done; e = c.next())
                for (e =
                    e.value, g = Si(b, e), h = q(e.variantIds), e = h.next(); !e.done; e = h.next()) e = f.get(e.value), e.language = g.language, e.primary = e.primary || g.primary, e.audio = g;
            d = q(d);
            for (c = d.next(); !c.done; c = d.next())
                for (e = c.value, c = Si(b, e), g = q(e.variantIds), e = g.next(); !e.done; e = g.next()) e = f.get(e.value), e.primary = e.primary || c.primary, e.video = c;
            return f
        }

        function Si(b, c) {
            var d = c.segments.map(function (c, d) {
                    return Ti(b, d, c)
                }),
                e = new Q(d);
            d = {
                id: c.id,
                originalId: c.originalId,
                createSegmentIndex: function () {
                    return Promise.resolve()
                },
                findSegmentPosition: function (b) {
                    return e.find(b)
                },
                getSegmentReference: function (b) {
                    return e.get(b)
                },
                initSegmentReference: null,
                presentationTimeOffset: c.presentationTimeOffset,
                mimeType: c.mimeType,
                codecs: c.codecs,
                width: c.width || void 0,
                height: c.height || void 0,
                frameRate: c.frameRate || void 0,
                kind: c.kind,
                encrypted: c.encrypted,
                keyId: c.keyId,
                language: c.language,
                label: c.label || null,
                type: c.contentType,
                primary: c.primary,
                trickModeVideo: null,
                emsgSchemeIdUris: null,
                roles: [],
                channelsCount: null,
                closedCaptions: null
            };
            null != c.initSegmentKey && (d.initSegmentReference = Ui(b, c.initSegmentKey));
            return d
        }

        function Ti(b, c, d) {
            var e = new Mi("segment", b.b, b.a, d.dataKey);
            return new N(c, d.startTime, d.endTime, function () {
                return [e.toString()]
            }, 0, null)
        }

        function Ui(b, c) {
            var d = new Mi("segment", b.b, b.a, c);
            return new Ge(function () {
                return [d.toString()]
            }, 0, null)
        };

        function Vi() {
            this.a = null
        }
        n = Vi.prototype;
        n.configure = function () {};
        n.start = function (b) {
            var c = Ni(b);
            this.a = c;
            if (null == c || "manifest" != c.a) return Promise.reject(new A(2, 1, 9004, c));
            var d = new mi;
            return hh([d], function () {
                return r(function f() {
                    var b, h, k, l;
                    return v(f, function (f) {
                        switch (f.s) {
                            case 1:
                                return t(f, d.init(), 2);
                            case 2:
                                return t(f, qi(d, c.Ha(), c.oa()), 3);
                            case 3:
                                return b = f.F, t(f, b.getManifests([c.key()]), 4);
                            case 4:
                                return h = f.F, k = h[0], l = new Oi(c.Ha(), c.oa()), f["return"](Pi(l, k))
                        }
                    })
                })
            })
        };
        n.stop = function () {
            return Promise.resolve()
        };
        n.update = function () {};
        n.onExpirationUpdated = function (b, c) {
            var d = this.a,
                e = new mi;
            return hh([e], function () {
                return r(function g() {
                    var h, k, l, m, p;
                    return v(g, function (g) {
                        switch (g.s) {
                            case 1:
                                return t(g, e.init(), 2);
                            case 2:
                                return t(g, qi(e, d.Ha(), d.oa()), 3);
                            case 3:
                                return h = g.F, t(g, h.getManifests([d.key()]), 4);
                            case 4:
                                k = g.F;
                                l = k[0];
                                m = l.sessionIds.includes(b);
                                p = void 0 == l.expiration || l.expiration > c;
                                if (m && p) return t(g, h.updateManifestExpiration(d.key(), c), 0);
                                g.I(0)
                        }
                    })
                })
            })["catch"](function () {})
        };
        nf["application/x-offline-manifest"] = Vi;

        function Wi(b) {
            var c = Ni(b);
            return c && "manifest" == c.a ? Wi.a(b) : c && "segment" == c.a ? Wi.b(c.key(), c) : fb(new A(2, 1, 9004, b))
        }
        y("shaka.offline.OfflineScheme", Wi);
        Wi.a = function (b) {
            b = {
                uri: b,
                data: new ArrayBuffer(0),
                headers: {
                    "content-type": "application/x-offline-manifest"
                }
            };
            return hb(b)
        };
        Wi.b = function (b, c) {
            var d = new mi,
                e = hh([d], function () {
                    return r(function g() {
                        var b, e, l;
                        return v(g, function (g) {
                            switch (g.s) {
                                case 1:
                                    return t(g, d.init(), 2);
                                case 2:
                                    return t(g, qi(d, c.Ha(), c.oa()), 3);
                                case 3:
                                    return b = g.F, t(g, b.getSegments([c.key()]), 4);
                                case 4:
                                    return e = g.F, l = e[0], g["return"]({
                                        uri: c,
                                        data: l.data,
                                        headers: {}
                                    })
                            }
                        })
                    })
                });
            return jb(e)
        };
        xb("offline", Wi);

        function Xi() {}

        function Yi(b, c, d) {
            return r(function f() {
                var g, h, k, l, m, p, u;
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            g = Xi;
                            h = [];
                            for (var x = [], w = q(d), K = w.next(); !K.done; K = w.next()) {
                                K = K.value;
                                for (var U = !1, R = q(x), Y = R.next(); !Y.done; Y = R.next())
                                    if (Y = Y.value, Zi(Y.info, K)) {
                                        Y.sessionIds.push(K.sessionId);
                                        U = !0;
                                        break
                                    } U || x.push({
                                    info: K,
                                    sessionIds: [K.sessionId]
                                })
                            }
                            k = q(x);
                            l = k.next();
                        case 2:
                            if (l.done) {
                                f.I(4);
                                break
                            }
                            m = l.value;
                            p = g.a(b, c, m);
                            return t(f, p, 5);
                        case 5:
                            u = f.F;
                            h = h.concat(u);
                            l = k.next();
                            f.I(2);
                            break;
                        case 4:
                            return f["return"](h)
                    }
                })
            })
        }

        function Zi(b, c) {
            function d(b, c) {
                return b.robustness == c.robustness && b.contentType == c.contentType
            }
            return b.keySystem == c.keySystem && b.licenseUri == c.licenseUri && rb(b.audioCapabilities, c.audioCapabilities, d) && rb(b.videoCapabilities, c.videoCapabilities, d)
        };

        function $i(b) {
            this.a = null;
            for (var c = 0; c < b.textTracks.length; ++c) {
                var d = b.textTracks[c];
                d.mode = "disabled";
                "Shaka Player TextTrack" == d.label && (this.a = d)
            }
            this.a || (this.a = b.addTextTrack("subtitles", "Shaka Player TextTrack"));
            this.a.mode = "hidden"
        }
        y("shaka.text.SimpleTextDisplayer", $i);
        $i.prototype.remove = function (b, c) {
            if (!this.a) return !1;
            aj(this.a, function (d) {
                return d.startTime < c && d.endTime > b
            });
            return !0
        };
        $i.prototype.remove = $i.prototype.remove;
        $i.prototype.append = function (b) {
            for (var c = bj, d = [], e = 0; e < b.length; e++) {
                var f = c(b[e]);
                f && d.push(f)
            }
            d.slice().sort(function (b, c) {
                return b.startTime != c.startTime ? b.startTime - c.startTime : b.endTime != c.endTime ? b.endTime - c.startTime : d.indexOf(c) - d.indexOf(b)
            }).forEach(function (b) {
                this.a.addCue(b)
            }.bind(this))
        };
        $i.prototype.append = $i.prototype.append;
        $i.prototype.destroy = function () {
            this.a && aj(this.a, function () {
                return !0
            });
            this.a = null;
            return Promise.resolve()
        };
        $i.prototype.destroy = $i.prototype.destroy;
        $i.prototype.isTextVisible = function () {
            return "showing" == this.a.mode
        };
        $i.prototype.isTextVisible = $i.prototype.isTextVisible;
        $i.prototype.setTextVisibility = function (b) {
            this.a.mode = b ? "showing" : "hidden"
        };
        $i.prototype.setTextVisibility = $i.prototype.setTextVisibility;

        function bj(b) {
            if (b.startTime >= b.endTime) return null;
            var c = new VTTCue(b.startTime, b.endTime, b.payload);
            c.lineAlign = b.lineAlign;
            c.positionAlign = b.positionAlign;
            c.size = b.size;
            try {
                c.align = b.textAlign
            } catch (d) {}
            "center" == b.textAlign && "center" != c.align && (c.align = "middle");
            2 == b.writingDirection ? c.vertical = "lr" : 3 == b.writingDirection && (c.vertical = "rl");
            1 == b.lineInterpretation && (c.snapToLines = !1);
            null != b.line && (c.line = b.line);
            null != b.position && (c.position = b.position);
            return c
        }

        function aj(b, c) {
            var d = b.mode;
            b.mode = "showing" == d ? "showing" : "hidden";
            for (var e = b.cues, f = e.length - 1; 0 <= f; f--) {
                var g = e[f];
                g && c(g) && b.removeCue(g)
            }
            b.mode = d
        };

        function cj(b, c, d, e, f) {
            var g = f in e,
                h = !0,
                k;
            for (k in c) {
                var l = f + "." + k,
                    m = g ? e[f] : d[k];
                g || k in d ? void 0 === c[k] ? void 0 === m || g ? delete b[k] : b[k] = nb(m) : m.constructor == Object && c[k] && c[k].constructor == Object ? (b[k] || (b[k] = nb(m)), l = cj(b[k], c[k], m, e, l), h = h && l) : typeof c[k] != typeof m || null == c[k] || c[k].constructor != m.constructor ? h = !1 : b[k] = c[k] : h = !1
            }
            return h
        }
        y("shaka.util.ConfigUtils.mergeConfigObjects", cj);

        function dj() {
            var b = 5E5,
                c = Infinity;
            navigator.connection && navigator.connection.type && (b = 1E6 * navigator.connection.downlink, navigator.connection.saveData && (c = 360));
            var d = {
                    trackSelectionCallback: function (b) {
                        return b
                    },
                    progressCallback: function () {},
                    usePersistentLicense: !0
                },
                e = {
                    drm: {
                        retryParameters: db(),
                        servers: {},
                        clearKeys: {},
                        advanced: {},
                        delayLicenseRequestUntilPlayed: !1
                    },
                    manifest: {
                        retryParameters: db(),
                        availabilityWindowOverride: NaN,
                        dash: {
                            customScheme: function (b) {
                                if (b) return null
                            },
                            clockSyncUri: "",
                            ignoreDrmInfo: !1,
                            xlinkFailGracefully: !1,
                            defaultPresentationDelay: 10,
                            ignoreMinBufferTime: !1
                        }
                    },
                    streaming: {
                        retryParameters: db(),
                        failureCallback: function () {},
                        rebufferingGoal: 2,
                        bufferingGoal: 10,
                        bufferBehind: 30,
                        ignoreTextStreamFailures: !1,
                        alwaysStreamText: !1,
                        startAtSegmentBoundary: !1,
                        smallGapLimit: .5,
                        jumpLargeGaps: !1,
                        durationBackoff: 1,
                        forceTransmuxTS: !1
                    },
                    offline: d,
                    abrFactory: J,
                    abr: {
                        enabled: !0,
                        defaultBandwidthEstimate: b,
                        switchInterval: 8,
                        bandwidthUpgradeTarget: .85,
                        bandwidthDowngradeTarget: .95,
                        restrictions: {
                            minWidth: 0,
                            maxWidth: Infinity,
                            minHeight: 0,
                            maxHeight: c,
                            minPixels: 0,
                            maxPixels: Infinity,
                            minBandwidth: 0,
                            maxBandwidth: Infinity
                        }
                    },
                    preferredAudioLanguage: "",
                    preferredTextLanguage: "",
                    preferredVariantRole: "",
                    preferredTextRole: "",
                    preferredAudioChannelCount: 2,
                    restrictions: {
                        minWidth: 0,
                        maxWidth: Infinity,
                        minHeight: 0,
                        maxHeight: Infinity,
                        minPixels: 0,
                        maxPixels: Infinity,
                        minBandwidth: 0,
                        maxBandwidth: Infinity
                    },
                    playRangeStart: 0,
                    playRangeEnd: Infinity,
                    textDisplayFactory: function () {
                        return null
                    }
                };
            d.trackSelectionCallback = function (b) {
                return ej(b, e.preferredAudioLanguage)
            };
            return e
        }

        function fj(b, c, d) {
            return cj(b, c, d || dj(), {
                ".drm.servers": "",
                ".drm.clearKeys": "",
                ".drm.advanced": {
                    distinctiveIdentifierRequired: !1,
                    persistentStateRequired: !1,
                    videoRobustness: "",
                    audioRobustness: "",
                    serverCertificate: new Uint8Array(0),
                    individualizationServer: ""
                }
            }, "")
        }

        function ej(b, c) {
            var d = b.filter(function (b) {
                    return "variant" == b.type
                }),
                e = [],
                f = Od(c, d.map(function (b) {
                    return b.language
                }));
            f && (e = d.filter(function (b) {
                return H(b.language) == f
            }));
            0 == e.length && (e = d.filter(function (b) {
                return b.primary
            }));
            0 == e.length && (d.map(function (b) {
                return b.language
            }), e = d);
            var g = e.filter(function (b) {
                return b.height && 480 >= b.height
            });
            g.length && (g.sort(function (b, c) {
                return c.height - b.height
            }), e = g.filter(function (b) {
                return b.height == g[0].height
            }));
            d = [];
            if (e.length) {
                var h = Math.floor(e.length /
                    2);
                e.sort(function (b, c) {
                    return b.bandwidth - c.bandwidth
                });
                d.push(e[h])
            }
            e = q(b);
            for (h = e.next(); !h.done; h = e.next()) h = h.value, "text" == h.type && d.push(h);
            return d
        };

        function T(b, c) {
            var d = this;
            E.call(this);
            this.f = null;
            this.ba = !1;
            this.A = null;
            this.v = new Db;
            this.xa = this.j = this.Z = this.b = this.u = this.a = this.B = this.i = this.m = this.l = this.G = null;
            this.Na = 1E9;
            this.Fa = [];
            this.sa = !1;
            this.X = !0;
            this.K = this.ua = this.T = null;
            this.Ma = !1;
            this.La = 0;
            this.H = null;
            this.ra = [];
            this.w = new Lg;
            this.c = gj(this);
            this.na = {
                width: Infinity,
                height: Infinity
            };
            this.o = hj();
            this.ma = 0;
            this.ka = new Tg(this.c.preferredAudioLanguage, this.c.preferredVariantRole, this.c.preferredAudioChannelCount);
            this.P = this.c.preferredTextLanguage;
            this.$ = this.c.preferredTextRole;
            c && c(this);
            this.G = ij(this);
            b && this.hc(b, !0);
            this.C = new gh(function () {
                return r(function f() {
                    var b;
                    return v(f, function (c) {
                        switch (c.s) {
                            case 1:
                                return b = Promise.all([d.v ? d.v.destroy() : null, d.G ? d.G.destroy() : null]), d.ba = !1, d.v = null, d.j = null, d.xa = null, d.G = null, d.c = null, t(c, b, 0)
                        }
                    })
                })
            });
            G(this.v, window, "online", function () {
                d.nd()
            })
        }
        Ga(T, E);
        y("shaka.Player", T);

        function jj(b) {
            if (!b.T) return Promise.resolve();
            var c = Promise.resolve();
            b.u && (c = b.u.stop(), b.u = null);
            return Promise.all([c, b.T()])
        }
        T.prototype.destroy = function () {
            var b = this;
            return r(function d() {
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return t(d, b.detach(), 2);
                        case 2:
                            return t(d, b.C.destroy(), 0)
                    }
                })
            })
        };
        T.prototype.destroy = T.prototype.destroy;
        T.version = "v2.5.0-beta2-master-uncompiled";
        var kj = ["output-restricted", "internal-error"],
            lj = {};
        T.registerSupportPlugin = function (b, c) {
            lj[b] = c
        };

        function mj() {
            return !!window.Promise && !!window.Uint8Array && !!Array.prototype.forEach && !!window.MediaSource && !!MediaSource.isTypeSupported && !!window.MediaKeys && !!window.navigator && !!window.navigator.requestMediaKeySystemAccess && !!window.MediaKeySystemAccess && !!window.MediaKeySystemAccess.prototype.getConfiguration
        }
        T.isBrowserSupported = mj;
        T.probeSupport = function () {
            return Gc().then(function (b) {
                var c = pf(),
                    d = xd();
                b = {
                    manifest: c,
                    media: d,
                    drm: b
                };
                for (var e in lj) b[e] = lj[e]();
                return b
            })
        };
        T.prototype.hc = function (b, c) {
            var d = this;
            return r(function f() {
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            void 0 === c && (c = !0);
                            if (!d.f) {
                                f.I(2);
                                break
                            }
                            return t(f, d.detach(), 2);
                        case 2:
                            d.f = b;
                            G(d.v, d.f, "error", d.rh.bind(d));
                            if (c) return d.m = new vd(d.f), t(f, d.m.o, 0);
                            f.I(0)
                    }
                })
            })
        };
        T.prototype.attach = T.prototype.hc;
        T.prototype.detach = function () {
            var b = this;
            return r(function d() {
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return b.f ? t(d, b.gc(!1), 2) : d["return"]();
                        case 2:
                            b.v.Ka(b.f, "error"), b.f = null, d.s = 0
                    }
                })
            })
        };
        T.prototype.detach = T.prototype.detach;

        function nj(b, c, d) {
            return r(function f() {
                var g;
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            return t(f, qf(c, b.G, b.c.manifest.retryParameters, d), 2);
                        case 2:
                            return g = f.F, f["return"](new g)
                    }
                })
            })
        }

        function oj(b) {
            return b.u.start(b.Z, {
                networkingEngine: b.G,
                filterNewPeriod: b.Pc.bind(b),
                filterAllPeriods: b.ge.bind(b),
                onTimelineRegionAdded: function (c) {
                    b.B ? lh(b.B, c) : b.ra.push(c)
                },
                onEvent: b.fc.bind(b),
                onError: b.pb.bind(b)
            })
        }

        function pj(b) {
            function c(b) {
                return b.video && b.audio || b.video && b.video.codecs.includes(",")
            }
            b.b.periods.some(function (b) {
                return b.variants.some(c)
            }) && b.b.periods.forEach(function (b) {
                b.variants = b.variants.filter(c)
            });
            if (0 == b.b.periods.length) throw new A(2, 4, 4014);
        }
        T.prototype.load = function (b, c, d) {
            c = void 0 === c ? null : c;
            var e = this;
            return r(function g() {
                var h, k, l, m, p, u, w, x, B, K, U, R, Y, sa, za, ca, Yb, Zb;
                return v(g, function (g) {
                    switch (g.s) {
                        case 1:
                            if (!e.f) throw new A(2, 7, 7002);
                            k = new z;
                            l = function () {
                                h = new A(2, 7, 7E3);
                                return k
                            };
                            e.dispatchEvent(new D("loading"));
                            m = Date.now();
                            oa(g, 2);
                            p = e.f;
                            u = e.gc();
                            e.T = l;
                            return t(g, u, 4);
                        case 4:
                            e.o = hj();
                            G(e.v, p, "playing", function () {
                                return qj(e)
                            });
                            G(e.v, p, "pause", function () {
                                return qj(e)
                            });
                            G(e.v, p, "ended", function () {
                                return qj(e)
                            });
                            w = e.c.abrFactory;
                            e.j && e.xa == w || (e.xa = w, e.j = new w, e.j.configure(e.c.abr));
                            x = e.c.textDisplayFactory;
                            e.A = new x;
                            e.A.setTextVisibility(e.ba);
                            if (h) throw h;
                            K = B = null;
                            d && ("string" == typeof d ? K = d : (La("Loading with a manifest parser factory is deprecated. Instead please register a manifest parser and pass in the mime type."), B = d));
                            U = e;
                            if (B) {
                                R = new B;
                                g.I(5);
                                break
                            }
                            return t(g, nj(e, b, K), 6);
                        case 6:
                            R = g.F;
                        case 5:
                            return U.u = R, e.u.configure(e.c.manifest), e.Z = b, t(g, oj(e), 7);
                        case 7:
                            Y = g.F;
                            e.b = Y;
                            if (h) throw h;
                            pj(e);
                            sa = e;
                            return t(g, rj(e, Y),
                                8);
                        case 8:
                            sa.l = g.F;
                            if (h) throw h;
                            e.ge(e.b.periods);
                            sj(e, e.b.periods);
                            e.ma = Date.now() / 1E3;
                            e.ka = new Tg(e.c.preferredAudioLanguage, e.c.preferredVariantRole, e.c.preferredAudioChannelCount);
                            e.P = e.c.preferredTextLanguage;
                            tj(e.b.presentationTimeline, e.c.playRangeStart, e.c.playRangeEnd, e.aa());
                            return t(g, e.l.hc(p), 9);
                        case 9:
                            if (h) throw h;
                            e.j.init(function (b, c, d) {
                                c = void 0 === c ? !1 : c;
                                d = void 0 === d ? 0 : d;
                                uj(e, b, !0);
                                e.a && (Dh(e.a, b, c, d), vj(e))
                            });
                            e.m || (e.m = new vd(e.f));
                            e.m.w = e.A;
                            e.i = new bh(e.f, e.b.presentationTimeline,
                                e.b.minBufferTime || 0, e.c.streaming, c, e.Zh.bind(e), e.fc.bind(e));
                            e.B = new ih(e.f, e.b.minBufferTime, e.c.streaming, e.ef.bind(e), e.fc.bind(e), e.Yh.bind(e), new nh(e.f, e.m, e.b));
                            e.a = new oh(e.b, {
                                mb: e.i,
                                R: e.m,
                                vc: e.G,
                                ze: e.Hg.bind(e),
                                xe: e.Rf.bind(e),
                                onError: e.pb.bind(e),
                                onEvent: e.fc.bind(e),
                                Sg: e.Tg.bind(e),
                                Zb: e.kh.bind(e)
                            });
                            e.a.configure(e.c.streaming);
                            wj(e);
                            e.dispatchEvent(new D("streaming"));
                            return t(g, e.a.init(), 10);
                        case 10:
                            if (h) throw h;
                            e.c.streaming.startAtSegmentBoundary && (za = xj(e, eh(e.i)), Zg(e.i.b, za));
                            e.b.periods.forEach(e.Pc.bind(e));
                            yj(e);
                            vj(e);
                            ca = rh(e.a);
                            ca.variants.some(function (b) {
                                return b.primary
                            });
                            zj(e, ca.variants);
                            for (var $b = q(e.ra), vb = $b.next(); !vb.done; vb = $b.next()) Yb = vb.value, lh(e.B, Yb);
                            e.ra = [];
                            Gb(e.v, p, "loadeddata", function () {
                                e.o.loadLatency = (Date.now() - m) / 1E3
                            });
                            if (h) throw h;
                            e.T = null;
                            qa(g, 0);
                            break;
                        case 2:
                            return Zb = ra(g), k.resolve(), e.T == l && (e.T = null, e.dispatchEvent(new D("unloading"))), h ? g["return"](Promise.reject(h)) : g["return"](Promise.reject(Zb))
                    }
                })
            })
        };
        T.prototype.load = T.prototype.load;

        function wj(b) {
            function c(b) {
                var c = "";
                b.video && (c = Rb(b.video.codecs)[0]);
                var d = "";
                b.audio && (d = Rb(b.audio.codecs)[0]);
                return c + "-" + d
            }
            var d = b.b.periods.reduce(function (b, c) {
                return b.concat(c.variants)
            }, []);
            d = I.je(d, b.c.preferredAudioChannelCount);
            var e = new mb;
            d.forEach(function (b) {
                var d = c(b);
                e.push(d, b)
            });
            var f = null,
                g = Infinity;
            e.forEach(function (b, c) {
                var d = 0,
                    e = 0;
                c.forEach(function (b) {
                    d += b.bandwidth || 0;
                    ++e
                });
                var h = d / e;
                h < g && (f = b, g = h)
            });
            b.b.periods.forEach(function (b) {
                b.variants = b.variants.filter(function (b) {
                    return c(b) ==
                        f ? !0 : !1
                })
            })
        }

        function rj(b, c) {
            return r(function e() {
                var f, g, h;
                return v(e, function (e) {
                    switch (e.s) {
                        case 1:
                            return f = {
                                vc: b.G,
                                onError: function (c) {
                                    b.pb(c)
                                },
                                Ee: function (c) {
                                    Aj(b, c)
                                },
                                onExpirationUpdated: function (c, e) {
                                    if (b.u && b.u.onExpirationUpdated) b.u.onExpirationUpdated(c, e);
                                    b.dispatchEvent(new D("expirationupdated"))
                                },
                                onEvent: function (c) {
                                    b.fc(c)
                                }
                            }, g = new hc(f), g.configure(b.c.drm), h = I.le(c), t(e, oc(g, h, c.offlineSessionIds), 2);
                        case 2:
                            return e["return"](g)
                    }
                })
            })
        }

        function ij(b) {
            return new F(function (c, d) {
                b.j && b.j.segmentDownloaded(c, d)
            })
        }
        T.prototype.configure = function (b, c) {
            if (2 == arguments.length && "string" == typeof b) {
                for (var d = b, e = {}, f = e, g = 0, h = 0;;) {
                    g = d.indexOf(".", g);
                    if (0 > g) break;
                    if (0 == g || "\\" != d[g - 1]) h = d.substring(h, g).replace(/\\\./g, "."), f[h] = {}, f = f[h], h = g + 1;
                    g += 1
                }
                f[d.substring(h).replace(/\\\./g, ".")] = c;
                b = e
            }
            d = fj(this.c, b, gj(this));
            Bj(this);
            return d
        };
        T.prototype.configure = T.prototype.configure;

        function Bj(b) {
            b.u && b.u.configure(b.c.manifest);
            b.l && b.l.configure(b.c.drm);
            if (b.a) {
                b.a.configure(b.c.streaming);
                try {
                    b.b.periods.forEach(b.Pc.bind(b))
                } catch (f) {
                    b.pb(f)
                }
                var c = th(b.a),
                    d = vh(b.a),
                    e = rh(b.a);
                c = I.Vc(c, d, e.variants);
                b.j && c && c.allowedByApplication && c.allowedByKeySystem ? zj(b, e.variants) : Cj(b, e)
            }
            b.j && (b.j.configure(b.c.abr), b.c.abr.enabled && !b.X ? b.j.enable() : b.j.disable())
        }
        T.prototype.getConfiguration = function () {
            var b = gj(this);
            fj(b, this.c, gj(this));
            return b
        };
        T.prototype.getConfiguration = T.prototype.getConfiguration;
        T.prototype.Nh = function () {
            for (var b in this.c) delete this.c[b];
            fj(this.c, gj(this), gj(this));
            Bj(this)
        };
        T.prototype.resetConfiguration = T.prototype.Nh;
        T.prototype.lg = function () {
            return this.f
        };
        T.prototype.getMediaElement = T.prototype.lg;
        T.prototype.Mb = function () {
            return this.G
        };
        T.prototype.getNetworkingEngine = T.prototype.Mb;
        T.prototype.Qc = function () {
            return this.Z
        };
        T.prototype.getAssetUri = T.prototype.Qc;
        T.prototype.kg = function () {
            La('"getManifestUri" is deprecated and will be removed in v2.6. Please use "getAssetUri" instead.');
            return this.Z
        };
        T.prototype.getManifestUri = T.prototype.kg;
        T.prototype.aa = function () {
            return this.b ? this.b.presentationTimeline.aa() : !1
        };
        T.prototype.isLive = T.prototype.aa;
        T.prototype.hb = function () {
            return this.b ? this.b.presentationTimeline.hb() : !1
        };
        T.prototype.isInProgress = T.prototype.hb;
        T.prototype.xg = function () {
            if (!this.b || !this.b.periods.length) return !1;
            var b = this.b.periods[0].variants;
            return b.length ? !b[0].video : !1
        };
        T.prototype.isAudioOnly = T.prototype.xg;
        T.prototype.ac = function () {
            var b = 0,
                c = 0;
            this.b && (c = this.b.presentationTimeline, b = c.yb(), c = c.Ra());
            return {
                start: b,
                end: c
            }
        };
        T.prototype.seekRange = T.prototype.ac;
        T.prototype.keySystem = function () {
            return this.l ? this.l.keySystem() : ""
        };
        T.prototype.keySystem = T.prototype.keySystem;
        T.prototype.drmInfo = function () {
            return this.l ? this.l.a : null
        };
        T.prototype.drmInfo = T.prototype.drmInfo;
        T.prototype.qc = function () {
            return this.l ? this.l.qc() : Infinity
        };
        T.prototype.getExpiration = T.prototype.qc;
        T.prototype.ve = function () {
            return this.sa
        };
        T.prototype.isBuffering = T.prototype.ve;
        T.prototype.gc = function (b) {
            var c = this;
            return r(function e() {
                return v(e, function (e) {
                    switch (e.s) {
                        case 1:
                            if (c.C.a) return e["return"]();
                            void 0 === b && (b = !0);
                            c.dispatchEvent(new D("unloading"));
                            return t(e, jj(c), 2);
                        case 2:
                            return c.ua || (c.ua = Dj(c).then(function () {
                                c.ef(!1);
                                c.ua = null
                            })), t(e, c.ua, 3);
                        case 3:
                            if (b) return c.m = new vd(c.f), t(e, c.m.o, 0);
                            e.I(0)
                    }
                })
            })
        };
        T.prototype.unload = T.prototype.gc;
        T.prototype.Nb = function () {
            return this.i ? this.i.Nb() : 0
        };
        T.prototype.getPlaybackRate = T.prototype.Nb;
        T.prototype.xd = function (b) {
            this.i && ah(this.i.b, b);
            this.a && Bh(this.a, 1 != b)
        };
        T.prototype.trickPlay = T.prototype.xd;
        T.prototype.Zd = function () {
            this.i && ah(this.i.b, 1);
            this.a && Bh(this.a, !1)
        };
        T.prototype.cancelTrickPlay = T.prototype.Zd;
        T.prototype.Sa = function () {
            if (!this.b || !this.i) return [];
            var b = I.Qa(this.b, eh(this.i));
            return I.Sa(this.b.periods[b], this.w.get(b, "audio"), this.w.get(b, "video"))
        };
        T.prototype.getVariantTracks = T.prototype.Sa;
        T.prototype.Wa = function () {
            if (!this.b || !this.i) return [];
            var b = I.Qa(this.b, eh(this.i));
            if (!this.w.get(b, "text")) {
                var c = I.lc(this.b.periods[b].textStreams, this.P, this.$);
                c.length && Mg(this.w, b, "text", c[0].id)
            }
            return I.Wa(this.b.periods[b], this.w.get(b, "text")).filter(function (b) {
                return !this.Fa.includes(b.id)
            }.bind(this))
        };
        T.prototype.getTextTracks = T.prototype.Wa;
        T.prototype.Sh = function (b) {
            if (this.a) {
                var c = rh(this.a);
                if (b = I.Zf(c, b)) this.m.u = !1, Ej(this, b, !1), Fj(this, b), this.P = b.language
            }
        };
        T.prototype.selectTextTrack = T.prototype.Sh;
        T.prototype.Rh = function () {
            this.m.u = !0;
            Ah(this.a)
        };
        T.prototype.selectEmbeddedTextTrack = T.prototype.Rh;
        T.prototype.mi = function () {
            return this.m ? this.m.u : !1
        };
        T.prototype.usingEmbeddedTextTrack = T.prototype.mi;
        T.prototype.Ze = function (b, c, d) {
            d = void 0 === d ? 0 : d;
            if (this.a) {
                this.c.abr.enabled && La("Changing tracks while abr manager is enabled will likely result in the selected track being overriden. Consider disabling abr before calling selectVariantTrack().");
                var e = rh(this.a);
                (b = I.$f(e, b)) && I.Ub(b) && (uj(this, b, !1), Gj(this, b, c, d), this.ka = new Sg(b), zj(this, e.variants))
            }
        };
        T.prototype.selectVariantTrack = T.prototype.Ze;
        T.prototype.me = function () {
            return Hj(this.Sa())
        };
        T.prototype.getAudioLanguagesAndRoles = T.prototype.me;
        T.prototype.qe = function () {
            return Hj(this.Wa())
        };
        T.prototype.getTextLanguagesAndRoles = T.prototype.qe;
        T.prototype.cg = function () {
            var b = this.Sa();
            return Array.from(Ij(b))
        };
        T.prototype.getAudioLanguages = T.prototype.cg;
        T.prototype.pg = function () {
            var b = this.Wa();
            return Array.from(Ij(b))
        };
        T.prototype.getTextLanguages = T.prototype.pg;
        T.prototype.Xe = function (b, c) {
            if (this.a) {
                this.ka = new Tg(b, c || "", 0);
                var d = rh(this.a);
                Cj(this, d)
            }
        };
        T.prototype.selectAudioLanguage = T.prototype.Xe;
        T.prototype.Ye = function (b, c) {
            if (this.a) {
                var d = rh(this.a);
                this.P = b;
                this.$ = c || "";
                Cj(this, d)
            }
        };
        T.prototype.selectTextLanguage = T.prototype.Ye;
        T.prototype.ib = function () {
            return this.A ? this.A.isTextVisible() : this.ba
        };
        T.prototype.isTextTrackVisible = T.prototype.ib;
        T.prototype.Fc = function (b) {
            var c = this;
            return r(function e() {
                var f, g, h, k;
                return v(e, function (e) {
                    switch (e.s) {
                        case 1:
                            if (b == c.ba) return e["return"]();
                            c.A && c.A.setTextVisibility(b);
                            c.ba = b;
                            Jj(c);
                            if (c.c.streaming.alwaysStreamText || !c.a) return e["return"]();
                            f = I;
                            if (b) {
                                if (g = rh(c.a), h = f.lc(g.textStreams, c.P, c.$), k = h[0]) return t(e, wh(c.a, k), 0)
                            } else Ah(c.a);
                            e.I(0)
                    }
                })
            })
        };
        T.prototype.setTextTrackVisibility = T.prototype.Fc;
        T.prototype.mg = function () {
            return this.b ? new Date(1E3 * this.b.presentationTimeline.f + 1E3 * this.f.currentTime) : null
        };
        T.prototype.getPlayheadTimeAsDate = T.prototype.mg;
        T.prototype.og = function () {
            return this.b ? new Date(1E3 * this.b.presentationTimeline.f) : null
        };
        T.prototype.getPresentationStartTimeAsDate = T.prototype.og;
        T.prototype.Rc = function () {
            return this.m ? this.m.Rc() : {
                total: [],
                audio: [],
                video: [],
                text: []
            }
        };
        T.prototype.getBufferedInfo = T.prototype.Rc;
        T.prototype.getStats = function () {
            Kj(this);
            qj(this);
            var b = null,
                c = null,
                d = this.f;
            d = d && d.getVideoPlaybackQuality ? d.getVideoPlaybackQuality() : {};
            if (this.i && this.b) {
                var e = I.Qa(this.b, eh(this.i)),
                    f = this.b.periods[e];
                null != this.w.a[e] && (c = I.qg(this.w.get(e, "audio"), this.w.get(e, "video"), f.variants), b = c.video || {})
            }
            b || (b = {});
            c || (c = {});
            return {
                width: b.width || 0,
                height: b.height || 0,
                streamBandwidth: c.bandwidth || 0,
                decodedFrames: Number(d.totalVideoFrames),
                droppedFrames: Number(d.droppedVideoFrames),
                estimatedBandwidth: this.j ?
                    this.j.getBandwidthEstimate() : NaN,
                loadLatency: this.o.loadLatency,
                playTime: this.o.playTime,
                bufferingTime: this.o.bufferingTime,
                switchHistory: nb(this.o.switchHistory),
                stateHistory: nb(this.o.stateHistory)
            }
        };
        T.prototype.getStats = T.prototype.getStats;
        T.prototype.addTextTrack = function (b, c, d, e, f, g) {
            if (!this.a) return Promise.reject();
            var h = rh(this.a),
                k = this.b.periods.indexOf(h) + 1,
                l = (k >= this.b.periods.length ? this.b.presentationTimeline.ha() : this.b.periods[k].startTime) - h.startTime;
            if (Infinity == l) return Promise.reject(new A(1, 4, 4033));
            var m = {
                id: this.Na++,
                originalId: null,
                createSegmentIndex: Promise.resolve.bind(Promise),
                findSegmentPosition: function () {
                    return 1
                },
                getSegmentReference: function (c) {
                    return 1 != c ? null : new N(1, 0, l, function () {
                        return [b]
                    }, 0, null)
                },
                initSegmentReference: null,
                presentationTimeOffset: 0,
                mimeType: e,
                codecs: f || "",
                kind: d,
                encrypted: !1,
                keyId: null,
                language: c,
                label: g || null,
                type: "text",
                primary: !1,
                trickModeVideo: null,
                emsgSchemeIdUris: null,
                roles: [],
                channelsCount: null,
                closedCaptions: null
            };
            this.Fa.push(m.id);
            h.textStreams.push(m);
            return wh(this.a, m).then(function () {
                if (!this.C.a) {
                    var b = this.b.periods.indexOf(h),
                        e = uh(this.a, "text");
                    e && Mg(this.w, b, "text", e.id);
                    pb(this.Fa, m.id);
                    Cj(this, h);
                    yj(this);
                    return {
                        id: m.id,
                        active: !1,
                        type: "text",
                        bandwidth: 0,
                        language: c,
                        label: g || null,
                        kind: d,
                        width: null,
                        height: null
                    }
                }
            }.bind(this))
        };
        T.prototype.addTextTrack = T.prototype.addTextTrack;
        T.prototype.sd = function (b, c) {
            this.na.width = b;
            this.na.height = c
        };
        T.prototype.setMaxHardwareResolution = T.prototype.sd;
        T.prototype.nd = function () {
            if (this.a) {
                var b = this.a;
                if (b.f) b = !1;
                else if (b.o) b = !1;
                else {
                    for (var c = q(b.c.values()), d = c.next(); !d.done; d = c.next()) d = d.value, d.Rb && (d.Rb = !1, zh(b, d, .1));
                    b = !0
                }
            } else b = !1;
            return b
        };
        T.prototype.retryStreaming = T.prototype.nd;
        T.prototype.jg = function () {
            return this.b
        };
        T.prototype.getManifest = T.prototype.jg;

        function uj(b, c, d) {
            c.video && Lj(b, c.video);
            c.audio && Lj(b, c.audio);
            var e = sh(b.a);
            e = I.Vc(th(b.a), vh(b.a), e ? e.variants : []);
            c != e && b.o.switchHistory.push({
                timestamp: Date.now() / 1E3,
                id: c.id,
                type: "variant",
                fromAdaptation: d,
                bandwidth: c.bandwidth
            })
        }

        function Ej(b, c, d) {
            Lj(b, c);
            b.o.switchHistory.push({
                timestamp: Date.now() / 1E3,
                id: c.id,
                type: "text",
                fromAdaptation: d,
                bandwidth: null
            })
        }

        function Lj(b, c) {
            Mg(b.w, I.Pa(b.b, c), c.type, c.id)
        }

        function Dj(b) {
            b.v && (b.v.Ka(b.f, "loadeddata"), b.v.Ka(b.f, "playing"), b.v.Ka(b.f, "pause"), b.v.Ka(b.f, "ended"));
            var c = b.l,
                d = Promise.all([b.j ? b.j.stop() : null, b.m ? b.m.destroy() : null, b.i ? b.i.destroy() : null, b.B ? b.B.destroy() : null, b.a ? b.a.destroy() : null, b.u ? b.u.stop() : null, b.A ? b.A.destroy() : null]).then(function () {
                    return c ? c.destroy() : null
                });
            b.X = !0;
            b.l = null;
            b.m = null;
            b.i = null;
            b.B = null;
            b.a = null;
            b.u = null;
            b.A = null;
            b.b = null;
            b.Z = null;
            b.ra = [];
            b.w = new Lg;
            b.o = hj();
            return d
        }

        function gj(b) {
            var c = dj();
            c.streaming.failureCallback = function (c) {
                var d = [1001, 1002, 1003];
                b.aa() && d.includes(c.code) && (c.severity = 1, b.nd())
            };
            c.textDisplayFactory = function () {
                return new $i(b.f)
            };
            return c
        }

        function hj() {
            return {
                width: NaN,
                height: NaN,
                streamBandwidth: NaN,
                decodedFrames: NaN,
                droppedFrames: NaN,
                estimatedBandwidth: NaN,
                loadLatency: NaN,
                playTime: 0,
                bufferingTime: 0,
                switchHistory: [],
                stateHistory: []
            }
        }

        function sj(b, c) {
            for (var d = 0; d < c.length; d++) {
                for (var e = c[d], f = new Map, g = q(e.variants), h = g.next(); !h.done; h = g.next())
                    if (h = h.value, h.video && h.video.closedCaptions) {
                        h = h.video;
                        for (var k = q(h.closedCaptions.keys()), l = k.next(); !l.done; l = k.next())
                            if (l = l.value, !f.has(l)) {
                                var m = {
                                    id: b.Na++,
                                    originalId: l,
                                    createSegmentIndex: Promise.resolve.bind(Promise),
                                    findSegmentPosition: function () {
                                        return null
                                    },
                                    getSegmentReference: function () {
                                        return null
                                    },
                                    initSegmentReference: null,
                                    presentationTimeOffset: 0,
                                    mimeType: "application/cea-608",
                                    codecs: "",
                                    kind: "caption",
                                    encrypted: !1,
                                    keyId: null,
                                    language: h.closedCaptions.get(l),
                                    label: null,
                                    type: "text",
                                    primary: !1,
                                    trickModeVideo: null,
                                    emsgSchemeIdUris: null,
                                    roles: h.roles,
                                    channelsCount: null,
                                    closedCaptions: {}
                                };
                                f.set(l, m)
                            }
                    } f = q(f.values());
                for (g = f.next(); !g.done; g = f.next()) e.textStreams.push(g.value)
            }
        }
        n = T.prototype;
        n.ge = function (b) {
            var c = this.a ? th(this.a) : null,
                d = this.a ? vh(this.a) : null;
            b.forEach(I.filterNewPeriod.bind(null, this.l, c, d));
            c = qb(b, function (b) {
                return b.variants.some(I.Ub)
            });
            if (0 == c) throw new A(2, 4, 4032);
            if (c < b.length) throw new A(2, 4, 4011);
            b.forEach(function (b) {
                I.Wd(b.variants, this.c.restrictions, this.na) && this.a && rh(this.a) == b && yj(this);
                Mj(this, b.variants)
            }.bind(this))
        };
        n.Pc = function (b) {
            var c = this.a ? th(this.a) : null,
                d = this.a ? vh(this.a) : null;
            I.filterNewPeriod(this.l, c, d, b);
            c = b.variants;
            if (!c.some(I.Ub)) throw new A(2, 4, 4011);
            Mj(this, b.variants);
            I.Wd(c, this.c.restrictions, this.na) && this.a && rh(this.a) == b && yj(this);
            if (b = this.l ? this.l.a : null)
                for (c = q(c), d = c.next(); !d.done; d = c.next()) {
                    d = q(d.value.drmInfos);
                    for (var e = d.next(); !e.done; e = d.next())
                        if (e = e.value, e.keySystem == b.keySystem) {
                            e = q(e.initData || []);
                            for (var f = e.next(); !f.done; f = e.next()) f = f.value, xc(this.l, f.initDataType,
                                f.initData)
                        }
                }
        };

        function Gj(b, c, d, e) {
            d = void 0 === d ? !1 : d;
            e = void 0 === e ? 0 : e;
            b.X ? (b.K = c, b.Ma = d, b.La = e) : (Dh(b.a, c, d, e), Nj(b))
        }

        function Fj(b, c) {
            b.X ? b.H = c : (Ch(b.a, c, !0, 0), Oj(b))
        }

        function Kj(b) {
            if (b.b) {
                var c = Date.now() / 1E3;
                b.sa ? b.o.bufferingTime += c - b.ma : b.o.playTime += c - b.ma;
                b.ma = c
            }
        }

        function xj(b, c) {
            function d(b, c) {
                if (!b) return null;
                var d = b.findSegmentPosition(c - g.startTime);
                return null == d ? null : (d = b.getSegmentReference(d)) ? d.startTime + g.startTime : null
            }
            var e = th(b.a),
                f = vh(b.a),
                g = rh(b.a);
            e = d(e, c);
            f = d(f, c);
            return null != f && null != e ? Math.max(f, e) : null != f ? f : null != e ? e : c
        }
        n.ef = function (b) {
            Kj(this);
            this.sa = b;
            qj(this);
            if (this.i) {
                var c = this.i.b;
                b != c.i && (c.i = b, ah(c, c.f))
            }
            this.dispatchEvent(new D("buffering", {
                buffering: b
            }))
        };
        n.Yh = function () {
            yj(this)
        };

        function qj(b) {
            if (!b.C.a) {
                var c = b.sa ? "buffering" : b.f.ended ? "ended" : b.f.paused ? "paused" : "playing";
                var d = Date.now() / 1E3;
                if (b.o.stateHistory.length) {
                    var e = b.o.stateHistory[b.o.stateHistory.length - 1];
                    e.duration = d - e.timestamp;
                    if (c == e.state) return
                }
                b.o.stateHistory.push({
                    timestamp: d,
                    state: c,
                    duration: 0
                })
            }
        }
        n.Zh = function () {
            if (this.B) {
                var b = this.B;
                b.f.forEach(b.u.bind(b, !0))
            }
            this.a && Gh(this.a)
        };

        function zj(b, c) {
            try {
                Mj(b, c)
            } catch (e) {
                return b.pb(e), null
            }
            var d = c.filter(function (b) {
                return I.Ub(b)
            });
            d = b.ka.create(d);
            b.j.setVariants(Array.from(d.values()));
            return b.j.chooseVariant()
        }

        function Cj(b, c) {
            var d = zj(b, c.variants);
            d && (uj(b, d, !0), Gj(b, d, !0));
            (d = I.lc(c.textStreams, b.P, b.$)[0] || null) && (b.c.streaming.alwaysStreamText || b.ib()) && (Ej(b, d, !0), Fj(b, d));
            vj(b)
        }
        n.Hg = function (b) {
            try {
                var c = this.b;
                this.X = !0;
                this.j.disable();
                var d = zj(this, b.variants),
                    e = I.lc(b.textStreams, this.P, this.$)[0] || null;
                this.K && (c.periods[I.Yf(c, this.K)] == b && (d = this.K), this.K = null);
                this.H && (c.periods[I.Pa(c, this.H)] == b && (e = this.H), this.H = null);
                d && uj(this, d, !0);
                e && Ej(this, e, !0);
                var f = !sh(this.a),
                    g = d ? d.audio : null,
                    h;
                if (h = f && g && e) {
                    b = e;
                    var k = H(this.c.preferredTextLanguage),
                        l = H(g.language),
                        m = H(b.language);
                    h = Jd(m, k) && !Jd(l, k)
                }
                h && (this.Fc(!0), Jj(this));
                return this.c.streaming.alwaysStreamText ||
                    this.ib() ? {
                        variant: d,
                        text: e
                    } : {
                        variant: d,
                        text: null
                    }
            } catch (p) {
                return this.pb(p), {
                    variant: null,
                    text: null
                }
            }
        };
        n.Rf = function () {
            this.X = !1;
            this.c.abr.enabled && this.j.enable();
            this.K && (Dh(this.a, this.K, this.Ma, this.La), this.K = null);
            this.H && (Ch(this.a, this.H, !0, 0), this.H = null)
        };
        n.Tg = function () {
            this.u && this.u.update && this.u.update()
        };
        n.kh = function () {
            this.i && this.i.Zb()
        };

        function vj(b) {
            r(function d() {
                var e;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return t(d, Promise.resolve(), 2);
                        case 2:
                            if (b.C.a) return d["return"]();
                            e = new D("adaptation");
                            b.dispatchEvent(e);
                            d.s = 0
                    }
                })
            })
        }

        function yj(b) {
            r(function d() {
                var e;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return t(d, Promise.resolve(), 2);
                        case 2:
                            if (b.C.a) return d["return"]();
                            e = new D("trackschanged");
                            b.dispatchEvent(e);
                            d.s = 0
                    }
                })
            })
        }

        function Nj(b) {
            r(function d() {
                var e;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return t(d, Promise.resolve(), 2);
                        case 2:
                            if (b.C.a) return d["return"]();
                            e = new D("variantchanged");
                            b.dispatchEvent(e);
                            d.s = 0
                    }
                })
            })
        }

        function Oj(b) {
            r(function d() {
                var e;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return t(d, Promise.resolve(), 2);
                        case 2:
                            if (b.C.a) return d["return"]();
                            e = new D("trackschanged");
                            b.dispatchEvent(e);
                            d.s = 0
                    }
                })
            })
        }

        function Jj(b) {
            b.dispatchEvent(new D("texttrackvisibility"))
        }
        n.pb = function (b) {
            if (!this.C.a) {
                var c = new D("error", {
                    detail: b
                });
                this.dispatchEvent(c);
                c.defaultPrevented && (b.handled = !0)
            }
        };
        n.fc = function (b) {
            this.dispatchEvent(b)
        };
        n.rh = function () {
            if (this.f.error) {
                var b = this.f.error.code;
                if (1 != b) {
                    var c = this.f.error.msExtendedCode;
                    c && (0 > c && (c += Math.pow(2, 32)), c = c.toString(16));
                    this.pb(new A(2, 3, 3016, b, c, this.f.error.message))
                }
            }
        };

        function Aj(b, c) {
            var d = rh(b.a),
                e = !1,
                f = Object.keys(c),
                g = 1 == f.length && "00" == f[0];
            f.length && d.variants.forEach(function (b) {
                I.rg(b).forEach(function (d) {
                    var f = b.allowedByKeySystem;
                    d.keyId && (d = c[g ? "00" : d.keyId], b.allowedByKeySystem = !!d && !kj.includes(d));
                    f != b.allowedByKeySystem && (e = !0)
                })
            });
            f = th(b.a);
            var h = vh(b.a);
            (f = I.Vc(f, h, d.variants)) && !f.allowedByKeySystem && Cj(b, d);
            e && (yj(b), zj(b, d.variants))
        }

        function tj(b, c, d, e) {
            0 < c && (e || b.df(c));
            d < b.ha() && (e || b.Ja(d))
        }

        function Mj(b, c) {
            var d = b.l ? Nb(b.l.K) : {},
                e = Object.keys(d);
            e = e.length && "00" == e[0];
            for (var f = !1, g = !1, h = [], k = [], l = q(c), m = l.next(); !m.done; m = l.next()) {
                m = m.value;
                var p = [];
                m.audio && p.push(m.audio);
                m.video && p.push(m.video);
                p = q(p);
                for (var u = p.next(); !u.done; u = p.next())
                    if (u = u.value, u.keyId) {
                        var w = d[e ? "00" : u.keyId];
                        w ? kj.includes(w) && (k.includes(w) || k.push(w)) : h.includes(u.keyId) || h.push(u.keyId)
                    } m.allowedByApplication ? m.allowedByKeySystem && (f = !0) : g = !0
            }
            if (!f) throw new A(2, 4, 4012, {
                hasAppRestrictions: g,
                missingKeys: h,
                restrictedKeyStatuses: k
            });
        }

        function Hj(b) {
            var c = new Map;
            b = q(b);
            for (var d = b.next(); !d.done; d = b.next()) {
                var e = d.value;
                d = H(e.language);
                var f = c.get(d) || new Set;
                e = q(e.roles);
                for (var g = e.next(); !g.done; g = e.next()) f.add(g.value);
                c.set(d, f)
            }
            c.forEach(function (b) {
                0 == b.size && b.add("")
            });
            var h = [];
            c.forEach(function (b, c) {
                for (var d = q(b), e = d.next(); !e.done; e = d.next()) h.push({
                    language: c,
                    role: e.value
                })
            });
            return h
        }

        function Ij(b) {
            var c = new Set;
            b = q(b);
            for (var d = b.next(); !d.done; d = b.next()) d = H(d.value.language), c.add(d);
            return c
        };

        function Pj(b, c, d) {
            var e = void 0 == c.expiration ? Infinity : c.expiration,
                f = c.presentationTimeline.ha();
            c = Qj(c.periods[0]);
            return {
                offlineUri: null,
                originalManifestUri: b,
                duration: f,
                size: 0,
                expiration: e,
                tracks: c,
                appMetadata: d
            }
        }

        function Rj(b, c) {
            var d = Qi(new Oi(b.Ha(), b.oa()), c.periods[0], new S(null, 0)),
                e = c.appMetadata || {};
            d = Qj(d);
            return {
                offlineUri: b.toString(),
                originalManifestUri: c.originalManifestUri,
                duration: c.duration,
                size: c.size,
                expiration: c.expiration,
                tracks: d,
                appMetadata: e
            }
        }

        function Qj(b) {
            var c = [],
                d = I.pe(b.variants);
            d = q(d);
            for (var e = d.next(); !e.done; e = d.next()) c.push(I.pf(e.value));
            b = q(b.textStreams);
            for (d = b.next(); !d.done; d = b.next()) c.push(I.kf(d.value));
            return c
        };

        function Sj() {
            this.a = {}
        }

        function Tj(b, c, d) {
            d = d.endTime - d.startTime;
            return Uj(b, c) * d
        }

        function Uj(b, c) {
            var d = b.a[c];
            null == d && (d = 0);
            return d
        };

        function Vj(b, c) {
            for (var d = {
                    width: Infinity,
                    height: Infinity
                }, e = q(b.periods), f = e.next(); !f.done; f = e.next()) f = f.value, f.variants = f.variants.filter(function (b) {
                return I.$c(b, c, d)
            })
        }

        function Wj(b) {
            b = q(b.periods);
            for (var c = b.next(); !c.done; c = b.next()) c = c.value, c.variants = c.variants.filter(function (b) {
                var c = !0;
                b.audio && (c = c && wd(b.audio));
                b.video && (c = c && wd(b.video));
                return c
            })
        }

        function Xj(b, c) {
            for (var d = q(b.periods), e = d.next(); !e.done; e = d.next()) e = e.value, e.variants = e.variants.filter(function (b) {
                return Hc(c, b)
            })
        }

        function Yj(b) {
            var c = new Zj;
            b.periods.forEach(function (b, d) {
                var e = ak(b.variants);
                if (0 == d) {
                    e = q(e.a);
                    for (var f = e.next(); !f.done; f = e.next()) c.add(f.value)
                } else bk(c, e)
            });
            b = q(b.periods);
            for (var d = b.next(); !d.done; d = b.next()) d = d.value, d.variants = d.variants.filter(function (b) {
                return c.contains(new ck(b))
            })
        }

        function dk(b, c) {
            var d = new Zj;
            b.periods.forEach(function (b, f) {
                0 < f && (b.variants = b.variants.filter(function (b) {
                    return d.contains(new ck(b))
                }));
                c(b);
                d = ak(b.variants)
            })
        }

        function ck(b) {
            var c = b.audio;
            b = b.video;
            this.b = c ? c.mimeType : null;
            this.a = c ? c.codecs.split(".")[0] : null;
            this.f = b ? b.mimeType : null;
            this.c = b ? b.codecs.split(".")[0] : null
        }

        function Zj() {
            this.a = []
        }
        Zj.prototype.add = function (b) {
            this.contains(b) || this.a.push(b)
        };

        function bk(b, c) {
            b.a = b.a.filter(function (b) {
                return c.contains(b)
            })
        }
        Zj.prototype.contains = function (b) {
            return this.a.some(function (c) {
                return b.b == c.b && b.a == c.a && b.f == c.f && b.c == c.c
            })
        };

        function ak(b) {
            var c = new Zj;
            b = q(b);
            for (var d = b.next(); !d.done; d = b.next()) c.add(new ck(d.value));
            return c
        };

        function V(b) {
            var c = this;
            if (b && b.constructor != T) throw new A(2, 9, 9008);
            this.b = this.a = null;
            b ? (this.a = b.c, this.b = b.Mb()) : (this.a = dj(), this.b = new F);
            this.i = !1;
            this.c = [];
            this.f = [];
            var d = !b;
            this.j = new gh(function () {
                return r(function f() {
                    var b;
                    return v(f, function (f) {
                        switch (f.s) {
                            case 1:
                                return b = function () {}, t(f, Promise.all(c.f.map(function (c) {
                                    return c.then(b, b)
                                })), 2);
                            case 2:
                                if (!d) {
                                    f.I(3);
                                    break
                                }
                                return t(f, c.b.destroy(), 3);
                            case 3:
                                c.a = null, c.b = null, f.s = 0
                        }
                    })
                })
            })
        }
        y("shaka.offline.Storage", V);

        function ek() {
            return ui()
        }
        V.support = ek;
        V.prototype.destroy = function () {
            return this.j.destroy()
        };
        V.prototype.destroy = V.prototype.destroy;
        V.prototype.configure = function (b) {
            var c = !1;
            null != b.trackSelectionCallback && (c = !0, b.offline = b.offline || {}, b.offline.trackSelectionCallback = b.trackSelectionCallback);
            null != b.progressCallback && (c = !0, b.offline = b.offline || {}, b.offline.progressCallback = b.progressCallback);
            null != b.usePersistentLicense && (c = !0, b.offline = b.offline || {}, b.offline.usePersistentLicense = b.usePersistentLicense);
            c && La("Storage.configure should now be passed a player configuration structure. Using a non-player configuration will be deprecated in v2.6.");
            return fj(this.a, b)
        };
        V.prototype.configure = V.prototype.configure;
        V.prototype.Mb = function () {
            return this.b
        };
        V.prototype.getNetworkingEngine = V.prototype.Mb;
        V.prototype.store = function (b, c, d) {
            var e = this;
            return fk(this, gk(this, b, c || {}, function () {
                return r(function g() {
                    var c;
                    return v(g, function (g) {
                        switch (g.s) {
                            case 1:
                                if (d && "string" != typeof d) {
                                    La("Loading with a manifest parser factory is deprecated. Instead please register a manifest parser and pass in the mime type.");
                                    c = d;
                                    g.I(2);
                                    break
                                }
                                return t(g, qf(b, e.b, e.a.manifest.retryParameters, d), 3);
                            case 3:
                                c = g.F;
                            case 2:
                                return g["return"](new c)
                        }
                    })
                })
            }))
        };
        V.prototype.store = V.prototype.store;

        function gk(b, c, d, e) {
            return r(function g() {
                var h, k, l, m, p, u, w, x, B, K;
                return v(g, function (g) {
                    switch (g.s) {
                        case 1:
                            hk();
                            if (b.i) return g["return"](Promise.reject(new A(2, 9, 9006)));
                            b.i = !0;
                            return t(g, ik(b, c, e), 2);
                        case 2:
                            h = g.F;
                            jk(b);
                            k = !h.presentationTimeline.aa() && !h.presentationTimeline.hb();
                            if (!k) throw new A(2, 9, 9005, c);
                            l = null;
                            m = new mi;
                            u = p = null;
                            oa(g, 3, 4);
                            return t(g, kk(b, h, function (b) {
                                u = u || b
                            }), 6);
                        case 6:
                            l = g.F;
                            jk(b);
                            if (u) throw u;
                            mk(b, h, l);
                            return t(g, m.init(), 7);
                        case 7:
                            return jk(b), t(g, oi(m), 8);
                        case 8:
                            return p =
                                g.F, jk(b), t(g, nk(b, p.oa, l, h, c, d), 9);
                        case 9:
                            w = g.F;
                            jk(b);
                            if (u) throw u;
                            return t(g, p.oa.addManifests([w]), 10);
                        case 10:
                            return x = g.F, jk(b), B = new Mi("manifest", p.path.Ha, p.path.oa, x[0]), g["return"](Rj(B, w));
                        case 4:
                            return ta(g), b.i = !1, b.c = [], t(g, m.destroy(), 11);
                        case 11:
                            if (!l) {
                                g.I(12);
                                break
                            }
                            return t(g, l.destroy(), 12);
                        case 12:
                            ua(g, 0);
                            break;
                        case 3:
                            K = ra(g);
                            if (!p) {
                                g.I(14);
                                break
                            }
                            return t(g, p.oa.removeSegments(b.c, function () {}), 14);
                        case 14:
                            throw u || K;
                    }
                })
            })
        }

        function mk(b, c, d) {
            Vj(c, b.a.restrictions);
            Wj(c);
            Xj(c, d);
            Yj(c);
            dk(c, function (c) {
                var d = [];
                d = d.concat(I.Sa(c, null, null));
                d = d.concat(I.Wa(c, null));
                d = b.a.offline.trackSelectionCallback(d);
                var e = new Set,
                    h = new Set;
                d = q(d);
                for (var k = d.next(); !k.done; k = d.next()) k = k.value, "variant" == k.type && e.add(k.id), "text" == k.type && h.add(k.id);
                c.variants = c.variants.filter(function (b) {
                    return e.has(b.id)
                });
                c.textStreams = c.textStreams.filter(function (b) {
                    return h.has(b.id)
                })
            });
            ok(c)
        }

        function nk(b, c, d, e, f, g) {
            return r(function k() {
                var l, m, p;
                return v(k, function (k) {
                    switch (k.s) {
                        case 1:
                            return l = Pj(f, e, g), m = new $h(function (c, d) {
                                l.size = d;
                                b.a.offline.progressCallback(l, c)
                            }), pa(k, 2), p = pk(b, m, c, d, e, f, g), t(k, bi(m, b.b), 4);
                        case 4:
                            return p.size = l.size, k["return"](p);
                        case 2:
                            return ta(k), t(k, m.destroy(), 5);
                        case 5:
                            ua(k, 0)
                    }
                })
            })
        }
        V.prototype.remove = function (b) {
            return fk(this, qk(this, b))
        };
        V.prototype.remove = V.prototype.remove;

        function qk(b, c) {
            hk();
            var d = Ni(c);
            if (null == d || "manifest" != d.a) return Promise.reject(new A(2, 9, 9004, c));
            var e = new mi;
            return hh([e], function () {
                return r(function g() {
                    var c, k, l;
                    return v(g, function (g) {
                        switch (g.s) {
                            case 1:
                                return t(g, e.init(), 2);
                            case 2:
                                return t(g, qi(e, d.Ha(), d.oa()), 3);
                            case 3:
                                return c = g.F, t(g, c.getManifests([d.key()]), 4);
                            case 4:
                                return k = g.F, l = k[0], t(g, Promise.all([rk(b, l, e), sk(b, c, d, l)]), 0)
                        }
                    })
                })
            })
        }

        function tk(b, c) {
            for (var d = [], e = q(b.periods), f = e.next(); !f.done; f = e.next()) {
                f = q(f.value.streams);
                for (var g = f.next(); !g.done; g = f.next()) g = g.value, c && "video" == g.contentType ? d.push({
                    contentType: Ob(g.mimeType, g.codecs),
                    robustness: b.drmInfo.videoRobustness
                }) : c || "audio" != g.contentType || d.push({
                    contentType: Ob(g.mimeType, g.codecs),
                    robustness: b.drmInfo.audioRobustness
                })
            }
            return d
        }

        function rk(b, c, d) {
            return r(function f() {
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            return t(f, uk(b.b, b.a.drm, d, c), 0)
                    }
                })
            })
        }

        function sk(b, c, d, e) {
            function f() {
                k += 1;
                b.a.offline.progressCallback(l, k / h)
            }
            var g = vk(e),
                h = g.length + 1,
                k = 0,
                l = Rj(d, e);
            return Promise.all([c.removeSegments(g, f), c.removeManifests([d.key()], f)])
        }
        V.prototype.Kh = function () {
            return fk(this, wk(this))
        };
        V.prototype.removeEmeSessions = V.prototype.Kh;

        function wk(b) {
            hk();
            var c = b.b,
                d = b.a.drm,
                e = new mi;
            return hh([e], function () {
                return r(function g() {
                    var b, k, l, m, p, u, w;
                    return v(g, function (g) {
                        switch (g.s) {
                            case 1:
                                return t(g, e.init(), 2);
                            case 2:
                                b = !1, k = [], ri(e, function (b) {
                                    return k.push(b)
                                }), l = q(k), m = l.next();
                            case 3:
                                if (m.done) {
                                    g.I(5);
                                    break
                                }
                                p = m.value;
                                return t(g, p.getAll(), 6);
                            case 6:
                                return u = g.F, t(g, Yi(d, c, u), 7);
                            case 7:
                                return w = g.F, t(g, p.remove(w), 8);
                            case 8:
                                w.length != u.length && (b = !0);
                                m = l.next();
                                g.I(3);
                                break;
                            case 5:
                                return g["return"](!b)
                        }
                    })
                })
            })
        }
        V.prototype.list = function () {
            return fk(this, xk())
        };
        V.prototype.list = V.prototype.list;

        function xk() {
            function b(b, d) {
                return r(function h() {
                    var e;
                    return v(h, function (f) {
                        switch (f.s) {
                            case 1:
                                return t(f, d.getAllManifests(), 2);
                            case 2:
                                e = f.F, e.forEach(function (d, e) {
                                    var f = Rj(new Mi("manifest", b.Ha, b.oa, e), d);
                                    c.push(f)
                                }), f.s = 0
                        }
                    })
                })
            }
            hk();
            var c = [],
                d = new mi;
            return hh([d], function () {
                return r(function f() {
                    var c;
                    return v(f, function (f) {
                        switch (f.s) {
                            case 1:
                                return t(f, d.init(), 2);
                            case 2:
                                return c = Promise.resolve(), pi(d, function (d, f) {
                                    c = c.then(function () {
                                        return b(d, f)
                                    })
                                }), t(f, c, 0)
                        }
                    })
                })
            }).then(function () {
                return c
            })
        }

        function ik(b, c, d) {
            return r(function f() {
                var g, h, k, l, m, p, u, w, x;
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            return g = null, h = b.b, k = {
                                networkingEngine: h,
                                filterAllPeriods: function () {},
                                filterNewPeriod: function () {},
                                onTimelineRegionAdded: function () {},
                                onEvent: function () {},
                                onError: function (b) {
                                    g = b
                                }
                            }, t(f, d(), 2);
                        case 2:
                            return l = f.F, l.configure(b.a.manifest), jk(b), pa(f, 3), t(f, l.start(c, k), 5);
                        case 5:
                            m = f.F;
                            jk(b);
                            p = new Set;
                            for (var B = q(m.periods), U = B.next(); !U.done; U = B.next()) {
                                u = U.value;
                                U = q(u.variants);
                                for (var R = U.next(); !R.done; R =
                                    U.next()) w = R.value, w.audio && p.add(w.audio), w.video && p.add(w.video);
                                U = q(u.textStreams);
                                for (R = U.next(); !R.done; R = U.next()) x = R.value, p.add(x)
                            }
                            return t(f, Promise.all(Array.from(p).map(function (b) {
                                return b.createSegmentIndex()
                            })), 6);
                        case 6:
                            jk(b);
                            if (g) throw g;
                            return f["return"](m);
                        case 3:
                            return ta(f), t(f, l.stop(), 7);
                        case 7:
                            ua(f, 0)
                    }
                })
            })
        }

        function kk(b, c, d) {
            return r(function f() {
                var g, h, k;
                return v(f, function (f) {
                    switch (f.s) {
                        case 1:
                            return g = new hc({
                                vc: b.b,
                                onError: d,
                                Ee: function () {},
                                onExpirationUpdated: function () {},
                                onEvent: function () {}
                            }), h = I.le(c), k = b.a, g.configure(k.drm), t(f, mc(g, h, k.offline.usePersistentLicense), 2);
                        case 2:
                            return t(f, vc(g), 3);
                        case 3:
                            return t(f, wc(g), 4);
                        case 4:
                            return f["return"](g)
                    }
                })
            })
        }

        function pk(b, c, d, e, f, g, h) {
            var k = new Sj,
                l = f.periods.map(function (e) {
                    return yk(b, c, d, k, f, e)
                }),
                m = e.a,
                p = Ac(e);
            if (m && b.a.offline.usePersistentLicense) {
                if (!p.length) throw new A(2, 9, 9007, g);
                m.initData = []
            }
            return {
                originalManifestUri: g,
                duration: f.presentationTimeline.ha(),
                size: 0,
                expiration: e.qc(),
                periods: l,
                sessionIds: b.a.offline.usePersistentLicense ? p : [],
                drmInfo: m,
                appMetadata: h
            }
        }

        function yk(b, c, d, e, f, g) {
            f.periods.forEach(function (b) {
                b.variants.forEach(function (b) {
                    var c = b.audio,
                        d = b.video;
                    c && !d && (e.a[c.id] = c.bandwidth || b.bandwidth);
                    !c && d && (e.a[d.id] = d.bandwidth || b.bandwidth);
                    if (c && d) {
                        var f = c.bandwidth || 393216,
                            g = d.bandwidth || b.bandwidth - f;
                        0 >= g && (g = b.bandwidth);
                        e.a[c.id] = f;
                        e.a[d.id] = g
                    }
                });
                b.textStreams.forEach(function (b) {
                    e.a[b.id] = 52
                })
            });
            var h = zk(f),
                k = new Map;
            h = q(h);
            for (var l = h.next(); !l.done; l = h.next()) {
                l = l.value;
                var m = Ak(b, c, d, e, f, l);
                k.set(l.id, m)
            }
            g.variants.forEach(function (b) {
                b.audio &&
                    k.get(b.audio.id).variantIds.push(b.id);
                b.video && k.get(b.video.id).variantIds.push(b.id)
            });
            return {
                startTime: g.startTime,
                streams: Array.from(k.values())
            }
        }

        function Ak(b, c, d, e, f, g) {
            var h = {
                id: g.id,
                originalId: g.originalId,
                primary: g.primary,
                presentationTimeOffset: g.presentationTimeOffset || 0,
                contentType: g.type,
                mimeType: g.mimeType,
                codecs: g.codecs,
                frameRate: g.frameRate,
                kind: g.kind,
                language: g.language,
                label: g.label,
                width: g.width || null,
                height: g.height || null,
                initSegmentKey: null,
                encrypted: g.encrypted,
                keyId: g.keyId,
                segments: [],
                variantIds: []
            };
            f = f.presentationTimeline.Pb();
            var k = g.id;
            Bk(g, f, function (f) {
                ai(c, k, Ck(b, f), Tj(e, g.id, f), function (c) {
                    return d.addSegments([{
                        data: c
                    }]).then(function (c) {
                        b.c.push(c[0]);
                        h.segments.push({
                            startTime: f.startTime,
                            endTime: f.endTime,
                            dataKey: c[0]
                        })
                    })
                })
            });
            (f = g.initSegmentReference) && ai(c, k, Ck(b, f), .5 * Uj(e, g.id), function (c) {
                return d.addSegments([{
                    data: c
                }]).then(function (c) {
                    b.c.push(c[0]);
                    h.initSegmentKey = c[0]
                })
            });
            return h
        }

        function Bk(b, c, d) {
            c = b.findSegmentPosition(c);
            for (var e = null == c ? null : b.getSegmentReference(c); e;) d(e), e = b.getSegmentReference(++c)
        }

        function jk(b) {
            if (b.j.a) throw new A(2, 9, 7001);
        }

        function hk() {
            if (!ui()) throw new A(2, 9, 9E3);
        }

        function Ck(b, c) {
            var d = b.a.streaming.retryParameters;
            d = yb(c.c(), d);
            if (0 != c.b || null != c.a) d.headers.Range = "bytes=" + c.b + "-" + (null == c.a ? "" : c.a);
            return d
        }

        function fk(b, c) {
            return r(function e() {
                return v(e, function (e) {
                    switch (e.s) {
                        case 1:
                            return b.f.push(c), pa(e, 2), t(e, c, 4);
                        case 4:
                            return e["return"](e.F);
                        case 2:
                            ta(e), pb(b.f, c), ua(e, 0)
                    }
                })
            })
        }

        function vk(b) {
            var c = [];
            b.periods.forEach(function (b) {
                b.streams.forEach(function (b) {
                    null != b.initSegmentKey && c.push(b.initSegmentKey);
                    b.segments.forEach(function (b) {
                        c.push(b.dataKey)
                    })
                })
            });
            return c
        }
        V.deleteAll = function () {
            return r(function c() {
                var d;
                return v(c, function (c) {
                    switch (c.s) {
                        case 1:
                            return d = new mi, pa(c, 2), t(c, d.erase(), 2);
                        case 2:
                            return ta(c), t(c, d.destroy(), 5);
                        case 5:
                            ua(c, 0)
                    }
                })
            })
        };

        function uk(b, c, d, e) {
            return r(function g() {
                var h, k, l;
                return v(g, function (g) {
                    switch (g.s) {
                        case 1:
                            if (!e.drmInfo) return g["return"]();
                            h = si(d);
                            k = e.sessionIds.map(function (b) {
                                return {
                                    sessionId: b,
                                    keySystem: e.drmInfo.keySystem,
                                    licenseUri: e.drmInfo.licenseServerUri,
                                    serverCertificate: e.drmInfo.serverCertificate,
                                    audioCapabilities: tk(e, !1),
                                    videoCapabilities: tk(e, !0)
                                }
                            });
                            return t(g, Yi(c, b, k), 2);
                        case 2:
                            return l = g.F, t(g, h.remove(l), 3);
                        case 3:
                            return t(g, h.add(k.filter(function (b) {
                                    return -1 == l.indexOf(b.sessionId)
                                })),
                                0)
                    }
                })
            })
        }

        function zk(b) {
            var c = new Set;
            b.periods.forEach(function (b) {
                b.textStreams.forEach(function (b) {
                    c.add(b)
                });
                b.variants.forEach(function (b) {
                    b.audio && c.add(b.audio);
                    b.video && c.add(b.video)
                })
            });
            return c
        }

        function ok(b) {
            if (0 == b.periods.length) throw new A(2, 4, 4014);
            b = q(b.periods);
            for (var c = b.next(); !c.done; c = b.next()) Dk(c.value)
        }

        function Dk(b) {
            b.variants.map(function (b) {
                return b.video
            });
            var c = new Set(b.variants.map(function (b) {
                return b.audio
            }));
            b = b.textStreams;
            for (var d = q(c), e = d.next(); !e.done; e = d.next()) {
                e = q(c);
                for (var f = e.next(); !f.done; f = e.next());
            }
            c = q(b);
            for (d = c.next(); !d.done; d = c.next())
                for (d = q(b), e = d.next(); !e.done; e = d.next());
        }
        lj.offline = ek;

        function Ek() {
            for (var b = 0; b < Fk.length; ++b) Fk[b].Qf()
        }
        y("shaka.polyfill.installAll", Ek);
        var Fk = [];

        function Gk(b, c) {
            c = c || 0;
            for (var d = {
                    priority: c,
                    Qf: b
                }, e = 0; e < Fk.length; e++)
                if (Fk[e].priority < c) {
                    Fk.splice(e, 0, d);
                    return
                } Fk.push(d)
        }
        y("shaka.polyfill.register", Gk);

        function Hk(b) {
            var c = b.type.replace(/^(webkit|moz|MS)/, "").toLowerCase();
            if ("function" === typeof Event) var d = new Event(c, b);
            else d = document.createEvent("Event"), d.initEvent(c, b.bubbles, b.cancelable);
            b.target.dispatchEvent(d)
        }
        Gk(function () {
            if (window.Document) {
                var b = Element.prototype;
                b.requestFullscreen = b.requestFullscreen || b.mozRequestFullScreen || b.msRequestFullscreen || b.webkitRequestFullscreen;
                b = Document.prototype;
                b.exitFullscreen = b.exitFullscreen || b.mozCancelFullScreen || b.msExitFullscreen || b.webkitExitFullscreen;
                "fullscreenElement" in document || (Object.defineProperty(document, "fullscreenElement", {
                    get: function () {
                        return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement
                    }
                }), Object.defineProperty(document,
                    "fullscreenEnabled", {
                        get: function () {
                            return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled
                        }
                    }));
                document.addEventListener("webkitfullscreenchange", Hk);
                document.addEventListener("webkitfullscreenerror", Hk);
                document.addEventListener("mozfullscreenchange", Hk);
                document.addEventListener("mozfullscreenerror", Hk);
                document.addEventListener("MSFullscreenChange", Hk);
                document.addEventListener("MSFullscreenError", Hk)
            }
        });
        Gk(function () {
            var b = navigator.userAgent;
            b && b.includes("CrKey") && delete window.indexedDB
        });
        var Ik;

        function Jk(b, c, d) {
            if ("input" == b) switch (this.type) {
                case "range":
                    b = "change"
            }
            Ik.call(this, b, c, d)
        }
        Gk(function () {
            navigator.userAgent.includes("Trident/") && HTMLInputElement.prototype.addEventListener != Jk && (Ik = HTMLInputElement.prototype.addEventListener, HTMLInputElement.prototype.addEventListener = Jk)
        });
        Gk(function () {});

        function Kk() {
            var b = MediaSource.prototype.addSourceBuffer;
            MediaSource.prototype.addSourceBuffer = function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];
                d = b.apply(this, d);
                d.abort = function () {};
                return d
            }
        }

        function Lk() {
            var b = SourceBuffer.prototype.remove;
            SourceBuffer.prototype.remove = function (c, d) {
                return b.call(this, c, d - .001)
            }
        }

        function Mk() {
            var b = MediaSource.prototype.endOfStream;
            MediaSource.prototype.endOfStream = function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];
                for (var h = e = 0; h < this.sourceBuffers.length; ++h) {
                    var k = this.sourceBuffers[h];
                    k = k.buffered.end(k.buffered.length - 1);
                    e = Math.max(e, k)
                }
                if (!isNaN(this.duration) && e < this.duration)
                    for (this.se = !0, e = 0; e < this.sourceBuffers.length; ++e) this.sourceBuffers[e].ee = !1;
                return b.apply(this, d)
            };
            var c = !1,
                d = MediaSource.prototype.addSourceBuffer;
            MediaSource.prototype.addSourceBuffer =
                function (b) {
                    for (var e = [], g = 0; g < arguments.length; ++g) e[g] = arguments[g];
                    e = d.apply(this, e);
                    e.mediaSource_ = this;
                    e.addEventListener("updateend", Nk, !1);
                    c || (this.addEventListener("sourceclose", Ok, !1), c = !0);
                    return e
                }
        }

        function Nk(b) {
            var c = b.target,
                d = c.mediaSource_;
            if (d.se) {
                b.preventDefault();
                b.stopPropagation();
                b.stopImmediatePropagation();
                c.ee = !0;
                for (b = 0; b < d.sourceBuffers.length; ++b)
                    if (0 == d.sourceBuffers[b].ee) return;
                d.se = !1
            }
        }

        function Ok(b) {
            b = b.target;
            for (var c = 0; c < b.sourceBuffers.length; ++c) b.sourceBuffers[c].removeEventListener("updateend", Nk, !1);
            b.removeEventListener("sourceclose", Ok, !1)
        }

        function Pk() {
            var b = MediaSource.isTypeSupported;
            MediaSource.isTypeSupported = function (c) {
                return "mp2t" == c.split(/ *; */)[0].split("/")[1] ? !1 : b(c)
            }
        }

        function Qk() {
            var b = MediaSource.isTypeSupported,
                c = /^dv(?:he|av)\./;
            MediaSource.isTypeSupported = function (d) {
                for (var e = d.split(/ *; */), f = e[0], g = {}, h = 1; h < e.length; ++h) {
                    var k = e[h].split("="),
                        l = k[0];
                    k = k[1].replace(/"(.*)"/, "$1");
                    g[l] = k
                }
                e = g.codecs;
                if (!e) return b(d);
                var m = !1,
                    p = !1;
                d = e.split(",").filter(function (b) {
                    if (c.test(b)) return p = !0, !1;
                    /^(hev|hvc)1\.2/.test(b) && (m = !0);
                    return !0
                });
                p && (m = !1);
                g.codecs = d.join(",");
                m && (g.eotf = "smpte2084");
                for (var u in g) f += "; " + u + '="' + g[u] + '"';
                return cast.__platform__.canDisplayType(f)
            }
        }
        Gk(function () {
            if (window.MediaSource)
                if (window.cast && cast.__platform__ && cast.__platform__.canDisplayType) Qk();
                else if (navigator.vendor && navigator.vendor.includes("Apple")) {
                var b = navigator.appVersion;
                Pk();
                b.includes("Version/8") ? window.MediaSource = null : b.includes("Version/9") ? Kk() : b.includes("Version/10") ? (Kk(), Mk()) : b.includes("Version/11") && (Kk(), Lk())
            }
        });

        function Rk(b) {
            this.f = [];
            this.b = [];
            this.a = [];
            (new P).ya("pssh", this.c.bind(this)).parse(b.buffer)
        }
        Rk.prototype.c = function (b) {
            if (!(1 < b.version)) {
                var c = ec(b.reader.ob(16)),
                    d = [];
                if (0 < b.version)
                    for (var e = b.reader.J(), f = 0; f < e; ++f) {
                        var g = ec(b.reader.ob(16));
                        d.push(g)
                    }
                e = b.reader.J();
                b.reader.O(e);
                this.b.push.apply(this.b, d);
                this.f.push(c);
                this.a.push({
                    start: b.start,
                    end: b.start + b.size - 1
                })
            }
        };

        function Sk(b, c) {
            try {
                var d = new Tk(b, c);
                return Promise.resolve(d)
            } catch (e) {
                return Promise.reject(e)
            }
        }

        function Tk(b, c) {
            this.keySystem = b;
            for (var d = !1, e = 0; e < c.length; ++e) {
                var f = c[e],
                    g = {
                        audioCapabilities: [],
                        videoCapabilities: [],
                        persistentState: "optional",
                        distinctiveIdentifier: "optional",
                        initDataTypes: f.initDataTypes,
                        sessionTypes: ["temporary"],
                        label: f.label
                    },
                    h = !1;
                if (f.audioCapabilities)
                    for (var k = 0; k < f.audioCapabilities.length; ++k) {
                        var l = f.audioCapabilities[k];
                        if (l.contentType) {
                            h = !0;
                            var m = l.contentType.split(";")[0];
                            MSMediaKeys.isTypeSupported(this.keySystem, m) && (g.audioCapabilities.push(l), d = !0)
                        }
                    }
                if (f.videoCapabilities)
                    for (k =
                        0; k < f.videoCapabilities.length; ++k) l = f.videoCapabilities[k], l.contentType && (h = !0, m = l.contentType.split(";")[0], MSMediaKeys.isTypeSupported(this.keySystem, m) && (g.videoCapabilities.push(l), d = !0));
                h || (d = MSMediaKeys.isTypeSupported(this.keySystem, "video/mp4"));
                "required" == f.persistentState && (d = !1);
                if (d) {
                    this.a = g;
                    return
                }
            }
            d = Error("Unsupported keySystem");
            d.name = "NotSupportedError";
            d.code = DOMException.NOT_SUPPORTED_ERR;
            throw d;
        }
        Tk.prototype.createMediaKeys = function () {
            var b = new Uk(this.keySystem);
            return Promise.resolve(b)
        };
        Tk.prototype.getConfiguration = function () {
            return this.a
        };

        function Vk(b) {
            var c = this.mediaKeys;
            c && c != b && Wk(c, null);
            delete this.mediaKeys;
            return (this.mediaKeys = b) ? Wk(b, this) : Promise.resolve()
        }

        function Uk(b) {
            this.a = new MSMediaKeys(b);
            this.b = new Db
        }
        Uk.prototype.createSession = function (b) {
            b = b || "temporary";
            if ("temporary" != b) throw new TypeError("Session type " + b + " is unsupported on this platform.");
            return new Xk(this.a, b)
        };
        Uk.prototype.setServerCertificate = function () {
            return Promise.resolve(!1)
        };

        function Wk(b, c) {
            function d() {
                c.msSetMediaKeys(e.a);
                c.removeEventListener("loadedmetadata", d)
            }
            Eb(b.b);
            if (!c) return Promise.resolve();
            G(b.b, c, "msneedkey", Yk);
            var e = b;
            try {
                return 1 <= c.readyState ? c.msSetMediaKeys(b.a) : c.addEventListener("loadedmetadata", d), Promise.resolve()
            } catch (f) {
                return Promise.reject(f)
            }
        }

        function Xk(b) {
            E.call(this);
            this.c = null;
            this.i = b;
            this.b = this.a = null;
            this.f = new Db;
            this.sessionId = "";
            this.expiration = NaN;
            this.closed = new z;
            this.keyStatuses = new Zk
        }
        Ga(Xk, E);
        n = Xk.prototype;
        n.generateRequest = function (b, c) {
            this.a = new z;
            try {
                this.c = this.i.createSession("video/mp4", new Uint8Array(c), null), G(this.f, this.c, "mskeymessage", this.Zg.bind(this)), G(this.f, this.c, "mskeyadded", this.Xg.bind(this)), G(this.f, this.c, "mskeyerror", this.Yg.bind(this)), $k(this, "status-pending")
            } catch (d) {
                this.a.reject(d)
            }
            return this.a
        };
        n.load = function () {
            return Promise.reject(Error("MediaKeySession.load not yet supported"))
        };
        n.update = function (b) {
            this.b = new z;
            try {
                this.c.update(new Uint8Array(b))
            } catch (c) {
                this.b.reject(c)
            }
            return this.b
        };
        n.close = function () {
            try {
                this.c.close(), this.closed.resolve(), Eb(this.f)
            } catch (b) {
                this.closed.reject(b)
            }
            return this.closed
        };
        n.remove = function () {
            return Promise.reject(Error("MediaKeySession.remove is only applicable for persistent licenses, which are not supported on this platform"))
        };

        function Yk(b) {
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent("encrypted", !1, !1, null);
            c.initDataType = "cenc";
            c.initData = al(b.initData);
            this.dispatchEvent(c)
        }

        function al(b) {
            if (!b) return b;
            var c = new Rk(b);
            if (1 >= c.a.length) return b;
            for (var d = [], e = 0; e < c.a.length; e++) d.push(b.subarray(c.a[e].start, c.a[e].end + 1));
            b = [];
            c = {};
            e = q(d);
            for (d = e.next(); !d.done; c = {
                    sc: c.sc
                }, d = e.next()) c.sc = d.value, b.some(function (b) {
                return function (c) {
                    return fc(c, b.sc)
                }
            }(c)) || b.push(c.sc);
            c = 0;
            e = q(b);
            for (d = e.next(); !d.done; d = e.next()) c += d.value.length;
            c = new Uint8Array(c);
            e = 0;
            b = q(b);
            for (d = b.next(); !d.done; d = b.next()) d = d.value, c.set(d, e), e += d.length;
            return c
        }
        n.Zg = function (b) {
            this.a && (this.a.resolve(), this.a = null);
            this.dispatchEvent(new D("message", {
                messageType: void 0 == this.keyStatuses.a ? "licenserequest" : "licenserenewal",
                message: b.message.buffer
            }))
        };
        n.Xg = function () {
            this.a ? ($k(this, "usable"), this.a.resolve(), this.a = null) : this.b && ($k(this, "usable"), this.b.resolve(), this.b = null)
        };
        n.Yg = function () {
            var b = Error("EME PatchedMediaKeysMs key error");
            b.errorCode = this.c.error;
            if (null != this.a) this.a.reject(b), this.a = null;
            else if (null != this.b) this.b.reject(b), this.b = null;
            else switch (this.c.error.code) {
                case MSMediaKeyError.MS_MEDIA_KEYERR_OUTPUT:
                case MSMediaKeyError.MS_MEDIA_KEYERR_HARDWARECHANGE:
                    $k(this, "output-not-allowed");
                    break;
                default:
                    $k(this, "internal-error")
            }
        };

        function $k(b, c) {
            var d = b.keyStatuses;
            d.size = void 0 == c ? 0 : 1;
            d.a = c;
            b.dispatchEvent(new D("keystatuseschange"))
        }

        function Zk() {
            this.size = 0;
            this.a = void 0
        }
        var bl;
        n = Zk.prototype;
        n.forEach = function (b) {
            this.a && b(this.a, bl)
        };
        n.get = function (b) {
            if (this.has(b)) return this.a
        };
        n.has = function (b) {
            var c = bl;
            return this.a && fc(new Uint8Array(b), new Uint8Array(c)) ? !0 : !1
        };
        n.entries = function () {};
        n.keys = function () {};
        n.values = function () {};
        Gk(function () {
            !window.HTMLVideoElement || !window.MSMediaKeys || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration || (bl = (new Uint8Array([0])).buffer, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = Vk, window.MediaKeys = Uk, window.MediaKeySystemAccess = Tk, navigator.requestMediaKeySystemAccess = Sk)
        });

        function cl() {
            return Promise.reject(Error("The key system specified is not supported."))
        }

        function dl(b) {
            return null == b ? Promise.resolve() : Promise.reject(Error("MediaKeys not supported."))
        }

        function el() {
            throw new TypeError("Illegal constructor.");
        }
        el.prototype.createSession = function () {};
        el.prototype.setServerCertificate = function () {};

        function fl() {
            throw new TypeError("Illegal constructor.");
        }
        fl.prototype.getConfiguration = function () {};
        fl.prototype.createMediaKeys = function () {};
        Gk(function () {
            !window.HTMLVideoElement || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration || (navigator.requestMediaKeySystemAccess = cl, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = dl, window.MediaKeys = el, window.MediaKeySystemAccess = fl)
        }, -10);
        var gl = "";

        function hl(b) {
            var c = gl;
            return c ? c + b.charAt(0).toUpperCase() + b.slice(1) : b
        }

        function il(b, c) {
            try {
                var d = new jl(b, c);
                return Promise.resolve(d)
            } catch (e) {
                return Promise.reject(e)
            }
        }

        function kl(b) {
            var c = this.mediaKeys;
            c && c != b && ll(c, null);
            delete this.mediaKeys;
            (this.mediaKeys = b) && ll(b, this);
            return Promise.resolve()
        }

        function jl(b, c) {
            this.a = this.keySystem = b;
            var d = !1;
            "org.w3.clearkey" == b && (this.a = "webkit-org.w3.clearkey", d = !1);
            var e = !1;
            var f = document.getElementsByTagName("video");
            f = f.length ? f[0] : document.createElement("video");
            for (var g = 0; g < c.length; ++g) {
                var h = c[g],
                    k = {
                        audioCapabilities: [],
                        videoCapabilities: [],
                        persistentState: "optional",
                        distinctiveIdentifier: "optional",
                        initDataTypes: h.initDataTypes,
                        sessionTypes: ["temporary"],
                        label: h.label
                    },
                    l = !1;
                if (h.audioCapabilities)
                    for (var m = 0; m < h.audioCapabilities.length; ++m) {
                        var p =
                            h.audioCapabilities[m];
                        if (p.contentType) {
                            l = !0;
                            var u = p.contentType.split(";")[0];
                            f.canPlayType(u, this.a) && (k.audioCapabilities.push(p), e = !0)
                        }
                    }
                if (h.videoCapabilities)
                    for (m = 0; m < h.videoCapabilities.length; ++m) p = h.videoCapabilities[m], p.contentType && (l = !0, f.canPlayType(p.contentType, this.a) && (k.videoCapabilities.push(p), e = !0));
                l || (e = f.canPlayType("video/mp4", this.a) || f.canPlayType("video/webm", this.a));
                "required" == h.persistentState && (d ? (k.persistentState = "required", k.sessionTypes = ["persistent-license"]) :
                    e = !1);
                if (e) {
                    this.b = k;
                    return
                }
            }
            d = "Unsupported keySystem";
            if ("org.w3.clearkey" == b || "com.widevine.alpha" == b) d = "None of the requested configurations were supported.";
            d = Error(d);
            d.name = "NotSupportedError";
            d.code = DOMException.NOT_SUPPORTED_ERR;
            throw d;
        }
        jl.prototype.createMediaKeys = function () {
            var b = new ml(this.a);
            return Promise.resolve(b)
        };
        jl.prototype.getConfiguration = function () {
            return this.b
        };

        function ml(b) {
            this.i = b;
            this.b = null;
            this.a = new Db;
            this.c = [];
            this.f = {}
        }

        function ll(b, c) {
            b.b = c;
            Eb(b.a);
            var d = gl;
            c && (G(b.a, c, d + "needkey", b.xh.bind(b)), G(b.a, c, d + "keymessage", b.wh.bind(b)), G(b.a, c, d + "keyadded", b.uh.bind(b)), G(b.a, c, d + "keyerror", b.vh.bind(b)))
        }
        n = ml.prototype;
        n.createSession = function (b) {
            b = b || "temporary";
            if ("temporary" != b && "persistent-license" != b) throw new TypeError("Session type " + b + " is unsupported on this platform.");
            var c = this.b || document.createElement("video");
            c.src || (c.src = "about:blank");
            b = new nl(c, this.i, b);
            this.c.push(b);
            return b
        };
        n.setServerCertificate = function () {
            return Promise.resolve(!1)
        };
        n.xh = function (b) {
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent("encrypted", !1, !1, null);
            c.initDataType = "webm";
            c.initData = b.initData;
            this.b.dispatchEvent(c)
        };
        n.wh = function (b) {
            var c = ol(this, b.sessionId);
            c && (b = new D("message", {
                messageType: void 0 == c.keyStatuses.a ? "licenserequest" : "licenserenewal",
                message: b.message
            }), c.b && (c.b.resolve(), c.b = null), c.dispatchEvent(b))
        };
        n.uh = function (b) {
            if (b = ol(this, b.sessionId)) pl(b, "usable"), b.a && b.a.resolve(), b.a = null
        };
        n.vh = function (b) {
            var c = ol(this, b.sessionId);
            if (c) {
                var d = Error("EME v0.1b key error");
                d.errorCode = b.errorCode;
                d.errorCode.systemCode = b.systemCode;
                !b.sessionId && c.b ? (d.method = "generateRequest", 45 == b.systemCode && (d.message = "Unsupported session type."), c.b.reject(d), c.b = null) : b.sessionId && c.a ? (d.method = "update", c.a.reject(d), c.a = null) : (d = b.systemCode, b.errorCode.code == MediaKeyError.MEDIA_KEYERR_OUTPUT ? pl(c, "output-restricted") : 1 == d ? pl(c, "expired") : pl(c, "internal-error"))
            }
        };

        function ol(b, c) {
            var d = b.f[c];
            return d ? d : (d = b.c.shift()) ? (d.sessionId = c, b.f[c] = d) : null
        }

        function nl(b, c, d) {
            E.call(this);
            this.f = b;
            this.j = !1;
            this.a = this.b = null;
            this.c = c;
            this.i = d;
            this.sessionId = "";
            this.expiration = NaN;
            this.closed = new z;
            this.keyStatuses = new ql
        }
        Ga(nl, E);

        function rl(b, c, d) {
            if (b.j) return Promise.reject(Error("The session is already initialized."));
            b.j = !0;
            try {
                if ("persistent-license" == b.i)
                    if (d) var e = new Uint8Array(Wb("LOAD_SESSION|" + d));
                    else {
                        var f = Wb("PERSISTENT|"),
                            g = new Uint8Array(f.byteLength + c.byteLength);
                        g.set(new Uint8Array(f), 0);
                        g.set(new Uint8Array(c), f.byteLength);
                        e = g
                    }
                else e = new Uint8Array(c)
            } catch (k) {
                return Promise.reject(k)
            }
            b.b = new z;
            var h = hl("generateKeyRequest");
            try {
                b.f[h](b.c, e)
            } catch (k) {
                if ("InvalidStateError" != k.name) return b.b = null, Promise.reject(k);
                setTimeout(function () {
                    try {
                        this.f[h](this.c, e)
                    } catch (l) {
                        this.b.reject(l), this.b = null
                    }
                }.bind(b), 10)
            }
            return b.b
        }
        n = nl.prototype;
        n.ud = function (b, c) {
            if (this.a) this.a.then(this.ud.bind(this, b, c))["catch"](this.ud.bind(this, b, c));
            else {
                this.a = b;
                if ("webkit-org.w3.clearkey" == this.c) {
                    var d = Sb(c);
                    var e = JSON.parse(d);
                    "oct" != e.keys[0].kty && (this.a.reject(Error("Response is not a valid JSON Web Key Set.")), this.a = null);
                    d = cc(e.keys[0].k);
                    e = cc(e.keys[0].kid)
                } else d = new Uint8Array(c), e = null;
                var f = hl("addKey");
                try {
                    this.f[f](this.c, d, e, this.sessionId)
                } catch (g) {
                    this.a.reject(g), this.a = null
                }
            }
        };

        function pl(b, c) {
            var d = b.keyStatuses;
            d.size = void 0 == c ? 0 : 1;
            d.a = c;
            b.dispatchEvent(new D("keystatuseschange"))
        }
        n.generateRequest = function (b, c) {
            return rl(this, c, null)
        };
        n.load = function (b) {
            return "persistent-license" == this.i ? rl(this, null, b) : Promise.reject(Error("Not a persistent session."))
        };
        n.update = function (b) {
            var c = new z;
            this.ud(c, b);
            return c
        };
        n.close = function () {
            if ("persistent-license" != this.i) {
                if (!this.sessionId) return this.closed.reject(Error("The session is not callable.")), this.closed;
                var b = hl("cancelKeyRequest");
                try {
                    this.f[b](this.c, this.sessionId)
                } catch (c) {}
            }
            this.closed.resolve();
            return this.closed
        };
        n.remove = function () {
            return "persistent-license" != this.i ? Promise.reject(Error("Not a persistent session.")) : this.close()
        };

        function ql() {
            this.size = 0;
            this.a = void 0
        }
        var sl;
        n = ql.prototype;
        n.forEach = function (b) {
            this.a && b(this.a, sl)
        };
        n.get = function (b) {
            if (this.has(b)) return this.a
        };
        n.has = function (b) {
            var c = sl;
            return this.a && fc(new Uint8Array(b), new Uint8Array(c)) ? !0 : !1
        };
        n.entries = function () {};
        n.keys = function () {};
        n.values = function () {};
        Gk(function () {
            if (!(!window.HTMLVideoElement || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration)) {
                if (HTMLMediaElement.prototype.webkitGenerateKeyRequest) gl = "webkit";
                else if (!HTMLMediaElement.prototype.generateKeyRequest) return;
                sl = (new Uint8Array([0])).buffer;
                navigator.requestMediaKeySystemAccess = il;
                delete HTMLMediaElement.prototype.mediaKeys;
                HTMLMediaElement.prototype.mediaKeys = null;
                HTMLMediaElement.prototype.setMediaKeys = kl;
                window.MediaKeys = ml;
                window.MediaKeySystemAccess =
                    jl
            }
        });
        Gk(function () {
            if (window.HTMLMediaElement) {
                var b = HTMLMediaElement.prototype.play;
                HTMLMediaElement.prototype.play = function () {
                    var c = b.apply(this);
                    c && c["catch"](function () {});
                    return c
                }
            }
        });

        function tl() {
            return {
                droppedVideoFrames: this.webkitDroppedFrameCount,
                totalVideoFrames: this.webkitDecodedFrameCount,
                corruptedVideoFrames: 0,
                creationTime: NaN,
                totalFrameDelay: 0
            }
        }
        Gk(function () {
            if (window.HTMLVideoElement) {
                var b = HTMLVideoElement.prototype;
                !b.getVideoPlaybackQuality && "webkitDroppedFrameCount" in b && (b.getVideoPlaybackQuality = tl)
            }
        });

        function ul(b, c, d) {
            return new window.TextTrackCue(b, c, d)
        }

        function vl(b, c, d) {
            return new window.TextTrackCue(b + "-" + c + "-" + d, b, c, d)
        }
        Gk(function () {
            if (!window.VTTCue && window.TextTrackCue) {
                var b = TextTrackCue.length;
                if (3 == b) window.VTTCue = ul;
                else if (6 == b) window.VTTCue = vl;
                else {
                    try {
                        var c = !!ul(1, 2, "")
                    } catch (d) {
                        c = !1
                    }
                    c && (window.VTTCue = ul)
                }
            }
        });

        function wl() {}
        wl.prototype.parseInit = function () {};
        wl.prototype.parseMedia = function (b, c) {
            var d = Sb(b),
                e = [],
                f = new DOMParser,
                g = null;
            try {
                g = f.parseFromString(d, "text/xml")
            } catch (K) {
                throw new A(2, 2, 2005);
            }
            if (g) {
                if (f = g.getElementsByTagName("tt")[0]) {
                    g = M.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "frameRate");
                    var h = M.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "subFrameRate");
                    var k = M.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "frameRateMultiplier");
                    var l = M.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "tickRate");
                    d = f.getAttribute("xml:space") || "default"
                } else throw new A(2, 2, 2005);
                if ("default" != d && "preserve" != d) throw new A(2, 2, 2005);
                d = "default" == d;
                g = new xl(g, h, k, l);
                h = yl(f.getElementsByTagName("styling")[0]);
                k = yl(f.getElementsByTagName("layout")[0]);
                l = [];
                for (var m = 0; m < k.length; m++) {
                    var p = k[m],
                        u = h;
                    var w = new Pc;
                    var x = p.getAttribute("xml:id");
                    if (x) {
                        w.id = x;
                        var B;
                        if (B = zl(p, u, "extent")) B = (x = Al.exec(B)) || Bl.exec(B), null != B && (w.width = Number(B[1]), w.height = Number(B[2]), w.widthUnits = x ? fd : 0, w.heightUnits = x ? fd : 0);
                        if (p =
                            zl(p, u, "origin")) B = (x = Al.exec(p)) || Bl.exec(p), null != B && (w.viewportAnchorX = Number(B[1]), w.viewportAnchorY = Number(B[2]), w.viewportAnchorUnits = x ? fd : 0)
                    } else w = null;
                    w && l.push(w)
                }
                f = yl(f.getElementsByTagName("body")[0]);
                for (m = 0; m < f.length; m++)(w = Cl(f[m], c.periodStart, g, h, k, l, d)) && e.push(w)
            }
            return e
        };
        var Al = /^(\d{1,2}|100)% (\d{1,2}|100)%$/,
            Dl = /^(\d+px|\d+em)$/,
            Bl = /^(\d+)px (\d+)px$/,
            El = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,
            Fl = /^(?:(\d{2,}):)?(\d{2}):(\d{2})$/,
            Gl = /^(?:(\d{2,}):)?(\d{2}):(\d{2}\.\d{2,})$/,
            Hl = /^(\d*(?:\.\d*)?)f$/,
            Il = /^(\d*(?:\.\d*)?)t$/,
            Jl = /^(?:(\d*(?:\.\d*)?)h)?(?:(\d*(?:\.\d*)?)m)?(?:(\d*(?:\.\d*)?)s)?(?:(\d*(?:\.\d*)?)ms)?$/,
            Kl = {
                left: "start",
                center: Yc,
                right: "end",
                start: "start",
                end: "end"
            },
            Ll = {
                left: "line-left",
                center: "center",
                right: "line-right"
            };

        function yl(b) {
            var c = [];
            if (!b) return c;
            for (var d = b.childNodes, e = 0; e < d.length; e++) {
                var f = "span" == d[e].nodeName && "p" == b.nodeName;
                d[e].nodeType != Node.ELEMENT_NODE || "br" == d[e].nodeName || f || (f = yl(d[e]), c = c.concat(f))
            }
            c.length || c.push(b);
            return c
        }

        function Ml(b, c) {
            for (var d = b.childNodes, e = 0; e < d.length; e++)
                if ("br" == d[e].nodeName && 0 < e) d[e - 1].textContent += "\n";
                else if (0 < d[e].childNodes.length) Ml(d[e], c);
            else if (c) {
                var f = d[e].textContent.trim();
                f = f.replace(/\s+/g, " ");
                d[e].textContent = f
            }
        }

        function Cl(b, c, d, e, f, g, h) {
            if (!b.hasAttribute("begin") && !b.hasAttribute("end") && /^\s*$/.test(b.textContent)) return null;
            Ml(b, h);
            h = Nl(b.getAttribute("begin"), d);
            var k = Nl(b.getAttribute("end"), d);
            d = Nl(b.getAttribute("dur"), d);
            var l = b.textContent;
            null == k && null != d && (k = h + d);
            if (null == h || null == k) throw new A(2, 2, 2001);
            c = new Oc(h + c, k + c, l);
            if ((f = Ol(b, "region", f)) && f.getAttribute("xml:id")) {
                var m = f.getAttribute("xml:id");
                g = g.filter(function (b) {
                    return b.id == m
                });
                c.region = g[0]
            }
            Pl(c, b, f, e);
            return c
        }

        function Pl(b, c, d, e) {
            "rtl" == Ql(c, d, e, "direction") && (b.writingDirection = 1);
            var f = Ql(c, d, e, "writingMode");
            "tb" == f || "tblr" == f ? b.writingDirection = 2 : "tbrl" == f ? b.writingDirection = 3 : "rltb" == f || "rl" == f ? b.writingDirection = 1 : f && (b.writingDirection = Wc);
            if (f = Ql(c, d, e, "textAlign")) b.positionAlign = Ll[f], b.lineAlign = Kl[f], b.textAlign = bd[f.toUpperCase()];
            if (f = Ql(c, d, e, "displayAlign")) b.displayAlign = cd[f.toUpperCase()];
            if (f = Ql(c, d, e, "color")) b.color = f;
            if (f = Ql(c, d, e, "backgroundColor")) b.backgroundColor = f;
            if (f = Ql(c,
                    d, e, "fontFamily")) b.fontFamily = f;
            (f = Ql(c, d, e, "fontWeight")) && "bold" == f && (b.fontWeight = 700);
            (f = Ql(c, d, e, "wrapOption")) && "noWrap" == f && (b.wrapLine = !1);
            (f = Ql(c, d, e, "lineHeight")) && f.match(Dl) && (b.lineHeight = f);
            (f = Ql(c, d, e, "fontSize")) && f.match(Dl) && (b.fontSize = f);
            if (f = Ql(c, d, e, "fontStyle")) b.fontStyle = ed[f.toUpperCase()];
            (d = zl(d, e, "textDecoration")) && Rl(b, d);
            (c = Sl(c, e, "textDecoration")) && Rl(b, c)
        }

        function Rl(b, c) {
            for (var d = c.split(" "), e = 0; e < d.length; e++) switch (d[e]) {
                case "underline":
                    b.textDecoration.includes("underline") || b.textDecoration.push("underline");
                    break;
                case "noUnderline":
                    b.textDecoration.includes("underline") && pb(b.textDecoration, "underline");
                    break;
                case "lineThrough":
                    b.textDecoration.includes("lineThrough") || b.textDecoration.push("lineThrough");
                    break;
                case "noLineThrough":
                    b.textDecoration.includes("lineThrough") && pb(b.textDecoration, "lineThrough");
                    break;
                case "overline":
                    b.textDecoration.includes("overline") ||
                        b.textDecoration.push("overline");
                    break;
                case "noOverline":
                    b.textDecoration.includes("overline") && pb(b.textDecoration, "overline")
            }
        }

        function Ql(b, c, d, e) {
            return (b = Sl(b, d, e)) ? b : zl(c, d, e)
        }

        function zl(b, c, d) {
            for (var e = yl(b), f = 0; f < e.length; f++) {
                var g = M.getAttributeNS(e[f], "http://www.w3.org/ns/ttml#styling", d);
                if (g) return g
            }
            return (b = Ol(b, "style", c)) ? M.getAttributeNS(b, "http://www.w3.org/ns/ttml#styling", d) : null
        }

        function Sl(b, c, d) {
            return (b = Ol(b, "style", c)) ? M.getAttributeNS(b, "http://www.w3.org/ns/ttml#styling", d) : null
        }

        function Ol(b, c, d) {
            if (!b || 1 > d.length) return null;
            var e = null,
                f = b;
            for (b = null; f && !(b = f.getAttribute(c)) && (f = f.parentNode, f instanceof Element););
            if (c = b)
                for (b = 0; b < d.length; b++)
                    if (d[b].getAttribute("xml:id") == c) {
                        e = d[b];
                        break
                    } return e
        }

        function Nl(b, c) {
            var d = null;
            if (El.test(b)) {
                d = El.exec(b);
                var e = Number(d[1]),
                    f = Number(d[2]),
                    g = Number(d[3]),
                    h = Number(d[4]);
                h += (Number(d[5]) || 0) / c.b;
                g += h / c.frameRate;
                d = g + 60 * f + 3600 * e
            } else Fl.test(b) ? d = Tl(Fl, b) : Gl.test(b) ? d = Tl(Gl, b) : Hl.test(b) ? (d = Hl.exec(b), d = Number(d[1]) / c.frameRate) : Il.test(b) ? (d = Il.exec(b), d = Number(d[1]) / c.a) : Jl.test(b) && (d = Tl(Jl, b));
            return d
        }

        function Tl(b, c) {
            var d = b.exec(c);
            return null == d || "" == d[0] ? null : (Number(d[4]) || 0) / 1E3 + (Number(d[3]) || 0) + 60 * (Number(d[2]) || 0) + 3600 * (Number(d[1]) || 0)
        }

        function xl(b, c, d, e) {
            this.frameRate = Number(b) || 30;
            this.b = Number(c) || 1;
            this.a = Number(e);
            0 == this.a && (this.a = b ? this.frameRate * this.b : 1);
            d && (b = /^(\d+) (\d+)$/g.exec(d)) && (this.frameRate *= b[1] / b[2])
        }
        qd["application/ttml+xml"] = wl;

        function Ul() {
            this.a = new wl
        }
        Ul.prototype.parseInit = function (b) {
            var c = !1;
            (new P).L("moov", Ke).L("trak", Ke).L("mdia", Ke).L("minf", Ke).L("stbl", Ke).ya("stsd", Le).L("stpp", function (b) {
                c = !0;
                b.parser.stop()
            }).parse(b);
            if (!c) throw new A(2, 2, 2007);
        };
        Ul.prototype.parseMedia = function (b, c) {
            var d = !1,
                e = [];
            (new P).L("mdat", Me(function (b) {
                d = !0;
                e = e.concat(this.a.parseMedia(b, c))
            }.bind(this))).parse(b);
            if (!d) throw new A(2, 2, 2007);
            return e
        };
        qd['application/mp4; codecs="stpp"'] = Ul;
        qd['application/mp4; codecs="stpp.TTML.im1t"'] = Ul;

        function Vl() {}
        Vl.prototype.parseInit = function () {};
        Vl.prototype.parseMedia = function (b, c) {
            var d = Sb(b);
            d = d.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n");
            d = d.split(/\n{2,}/m);
            if (!/^WEBVTT($|[ \t\n])/m.test(d[0])) throw new A(2, 2, 2E3);
            var e = c.segmentStart;
            if (null == e && (e = 0, d[0].includes("X-TIMESTAMP-MAP"))) {
                var f = d[0].match(/LOCAL:((?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3}))/m),
                    g = d[0].match(/MPEGTS:(\d+)/m);
                f && g && (e = Wl(new Pf(f[1])), e = c.periodStart + (Number(g[1]) / 9E4 - e))
            }
            g = [];
            var h = d[0].split("\n");
            for (f = 1; f < h.length; f++)
                if (/^Region:/.test(h[f])) {
                    var k = new Pf(h[f]),
                        l = new Pc;
                    Sf(k);
                    Qf(k);
                    for (var m = Sf(k); m;) {
                        var p = l,
                            u = m;
                        (m = /^id=(.*)$/.exec(u)) ? p.id = m[1]: (m = /^width=(\d{1,2}|100)%$/.exec(u)) ? p.width = Number(m[1]) : (m = /^lines=(\d+)$/.exec(u)) ? (p.height = Number(m[1]), p.heightUnits = 2) : (m = /^regionanchor=(\d{1,2}|100)%,(\d{1,2}|100)%$/.exec(u)) ? (p.regionAnchorX = Number(m[1]), p.regionAnchorY = Number(m[2])) : (m = /^viewportanchor=(\d{1,2}|100)%,(\d{1,2}|100)%$/.exec(u)) ? (p.viewportAnchorX = Number(m[1]), p.viewportAnchorY = Number(m[2])) : /^scroll=up$/.exec(u) && (p.scroll = "up");
                        Qf(k);
                        m = Sf(k)
                    }
                    g.push(l)
                } f = [];
            for (k = 1; k < d.length; k++) {
                h = d[k].split("\n");
                m = h;
                u = e;
                h = g;
                if (1 == m.length && !m[0] || /^NOTE($|[ \t])/.test(m[0]) || "STYLE" == m[0]) h = null;
                else {
                    l = null;
                    m[0].includes("--\x3e") || (l = m[0], m.splice(0, 1));
                    p = new Pf(m[0]);
                    var w = Wl(p),
                        x = Rf(p, /[ \t]+--\x3e[ \t]+/g),
                        B = Wl(p);
                    if (null == w || null == x || null == B) throw new A(2, 2, 2001);
                    m = new Oc(w + u, B + u, m.slice(1).join("\n").trim());
                    Qf(p);
                    for (u = Sf(p); u;) Xl(m, u, h), Qf(p), u = Sf(p);
                    null != l && (m.id = l);
                    h = m
                }
                h && f.push(h)
            }
            return f
        };

        function Xl(b, c, d) {
            var e;
            if (e = /^align:(start|middle|center|end|left|right)$/.exec(c)) c = e[1], "middle" == c ? b.textAlign = Rc : b.textAlign = bd[c.toUpperCase()];
            else if (e = /^vertical:(lr|rl)$/.exec(c)) b.writingDirection = "lr" == e[1] ? 2 : 3;
            else if (e = /^size:([\d.]+)%$/.exec(c)) b.size = Number(e[1]);
            else if (e = /^position:([\d.]+)%(?:,(line-left|line-right|center|start|end))?$/.exec(c)) b.position = Number(e[1]), e[2] && (c = e[2], b.positionAlign = "line-left" == c || "start" == c ? "line-left" : "line-right" == c || "end" == c ? "line-right" : "center");
            else if (e = /^region:(.*)$/.exec(c)) {
                if (c = Yl(d, e[1])) b.region = c
            } else if (d = /^line:([\d.]+)%(?:,(start|end|center))?$/.exec(c)) b.lineInterpretation = 1, b.line = Number(d[1]), d[2] && (b.lineAlign = dd[d[2].toUpperCase()]);
            else if (d = /^line:(-?\d+)(?:,(start|end|center))?$/.exec(c)) b.lineInterpretation = Xc, b.line = Number(d[1]), d[2] && (b.lineAlign = dd[d[2].toUpperCase()])
        }

        function Yl(b, c) {
            var d = b.filter(function (b) {
                return b.id == c
            });
            return d.length ? d[0] : null
        }

        function Wl(b) {
            b = Rf(b, /(?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3})/g);
            if (null == b) return null;
            var c = Number(b[2]),
                d = Number(b[3]);
            return 59 < c || 59 < d ? null : Number(b[4]) / 1E3 + d + 60 * c + 3600 * (Number(b[1]) || 0)
        }
        qd["text/vtt"] = Vl;
        qd['text/vtt; codecs="vtt"'] = Vl;

        function Zl() {
            this.a = null
        }
        Zl.prototype.parseInit = function (b) {
            var c = !1;
            (new P).L("moov", Ke).L("trak", Ke).L("mdia", Ke).ya("mdhd", function (b) {
                0 == b.version ? (b.reader.O(4), b.reader.O(4), this.a = b.reader.J(), b.reader.O(4)) : (b.reader.O(8), b.reader.O(8), this.a = b.reader.J(), b.reader.O(8));
                b.reader.O(4)
            }.bind(this)).L("minf", Ke).L("stbl", Ke).ya("stsd", Le).L("wvtt", function () {
                c = !0
            }).parse(b);
            if (!this.a) throw new A(2, 2, 2008);
            if (!c) throw new A(2, 2, 2008);
        };
        Zl.prototype.parseMedia = function (b, c) {
            var d = this;
            if (!this.a) throw new A(2, 2, 2008);
            var e = 0,
                f = [],
                g, h = [],
                k = !1,
                l = !1,
                m = !1,
                p = null;
            (new P).L("moof", Ke).L("traf", Ke).ya("tfdt", function (b) {
                k = !0;
                e = 0 == b.version ? b.reader.J() : b.reader.Gb()
            }).ya("tfhd", function (b) {
                var c = b.flags;
                b = b.reader;
                b.O(4);
                c & 1 && b.O(8);
                c & 2 && b.O(4);
                p = c & 8 ? b.J() : null
            }).ya("trun", function (b) {
                l = !0;
                var c = b.version,
                    d = b.flags;
                b = b.reader;
                var e = b.J();
                d & 1 && b.O(4);
                d & 4 && b.O(4);
                for (var g = [], h = 0; h < e; h++) {
                    var k = {
                        duration: null,
                        sampleSize: null,
                        vd: null
                    };
                    d & 256 &&
                        (k.duration = b.J());
                    d & 512 && (k.sampleSize = b.J());
                    d & 1024 && b.O(4);
                    d & 2048 && (k.vd = 0 == c ? b.J() : b.Se());
                    g.push(k)
                }
                f = g
            }).L("mdat", Me(function (b) {
                m = !0;
                g = b
            })).parse(b);
            if (!m && !k && !l) throw new A(2, 2, 2008);
            var u = e,
                w = new DataView(g.buffer, g.byteOffset, g.byteLength),
                x = new O(w, 0);
            f.forEach(function (b) {
                var f = b.duration || p,
                    g = b.vd ? e + b.vd : u;
                u = g + (f || 0);
                var k = 0;
                do {
                    var l = x.J();
                    k += l;
                    var m = x.J(),
                        w = null;
                    "vttc" == Ne(m) ? 8 < l && (w = x.ob(l - 8)) : x.O(l - 8);
                    f && w && h.push($l(w, c.periodStart + g / d.a, c.periodStart + u / d.a))
                } while (b.sampleSize &&
                    k < b.sampleSize)
            });
            return h.filter(Hb.Xa)
        };

        function $l(b, c, d) {
            var e, f, g;
            (new P).L("payl", Me(function (b) {
                e = Sb(b)
            })).L("iden", Me(function (b) {
                f = Sb(b)
            })).L("sttg", Me(function (b) {
                g = Sb(b)
            })).parse(b);
            return e ? am(e, f, g, c, d) : null
        }

        function am(b, c, d, e, f) {
            b = new Oc(e, f, b);
            c && (b.id = c);
            if (d)
                for (c = new Pf(d), d = Sf(c); d;) Xl(b, d, []), Qf(c), d = Sf(c);
            return b
        }
        qd['application/mp4; codecs="wvtt"'] = Zl;
        /*

         Copyright 2013 Ali Al Dallal

         Licensed under the MIT license.

         Permission is hereby granted, free of charge, to any person obtaining a copy
         of this software and associated documentation files (the "Software"), to deal
         in the Software without restriction, including without limitation the rights
         to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         copies of the Software, and to permit persons to whom the Software is
         furnished to do so, subject to the following conditions:

         The above copyright notice and this permission notice shall be included in
         all copies or substantial portions of the Software.

         THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
         SOFTWARE.
        */
        for (var bm = {
                ach: {
                    g: "Lwo",
                    h: "Acholi"
                },
                ady: {
                    g: "\u0410\u0434\u044b\u0433\u044d\u0431\u0437\u044d",
                    h: "Adyghe"
                },
                af: {
                    g: "Afrikaans",
                    h: "Afrikaans"
                },
                "af-NA": {
                    g: "Afrikaans (Namibia)",
                    h: "Afrikaans (Namibia)"
                },
                "af-ZA": {
                    g: "Afrikaans (South Africa)",
                    h: "Afrikaans (South Africa)"
                },
                ak: {
                    g: "T\u0255\u0265i",
                    h: "Akan"
                },
                ar: {
                    g: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
                    h: "Arabic"
                },
                "ar-AR": {
                    g: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
                    h: "Arabic"
                },
                "ar-MA": {
                    g: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
                    h: "Arabic (Morocco)"
                },
                "ar-SA": {
                    g: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629)",
                    h: "Arabic (Saudi Arabia)"
                },
                "ay-BO": {
                    g: "Aymar aru",
                    h: "Aymara"
                },
                az: {
                    g: "Az\u0259rbaycan dili",
                    h: "Azerbaijani"
                },
                "az-AZ": {
                    g: "Az\u0259rbaycan dili",
                    h: "Azerbaijani"
                },
                "be-BY": {
                    g: "\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f",
                    h: "Belarusian"
                },
                bg: {
                    g: "\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438",
                    h: "Bulgarian"
                },
                "bg-BG": {
                    g: "\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438",
                    h: "Bulgarian"
                },
                bn: {
                    g: "\u09ac\u09be\u0982\u09b2\u09be",
                    h: "Bengali"
                },
                "bn-IN": {
                    g: "\u09ac\u09be\u0982\u09b2\u09be (\u09ad\u09be\u09b0\u09a4)",
                    h: "Bengali (India)"
                },
                "bn-BD": {
                    g: "\u09ac\u09be\u0982\u09b2\u09be(\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6)",
                    h: "Bengali (Bangladesh)"
                },
                "bs-BA": {
                    g: "Bosanski",
                    h: "Bosnian"
                },
                ca: {
                    g: "Catal\u00e0",
                    h: "Catalan"
                },
                "ca-ES": {
                    g: "Catal\u00e0",
                    h: "Catalan"
                },
                cak: {
                    g: "Maya Kaqchikel",
                    h: "Kaqchikel"
                },
                "ck-US": {
                    g: "\u13e3\u13b3\u13a9 (tsalagi)",
                    h: "Cherokee"
                },
                cs: {
                    g: "\u010ce\u0161tina",
                    h: "Czech"
                },
                "cs-CZ": {
                    g: "\u010ce\u0161tina",
                    h: "Czech"
                },
                cy: {
                    g: "Cymraeg",
                    h: "Welsh"
                },
                "cy-GB": {
                    g: "Cymraeg",
                    h: "Welsh"
                },
                da: {
                    g: "Dansk",
                    h: "Danish"
                },
                "da-DK": {
                    g: "Dansk",
                    h: "Danish"
                },
                de: {
                    g: "Deutsch",
                    h: "German"
                },
                "de-AT": {
                    g: "Deutsch (\u00d6sterreich)",
                    h: "German (Austria)"
                },
                "de-DE": {
                    g: "Deutsch (Deutschland)",
                    h: "German (Germany)"
                },
                "de-CH": {
                    g: "Deutsch (Schweiz)",
                    h: "German (Switzerland)"
                },
                dsb: {
                    g: "Dolnoserb\u0161\u0107ina",
                    h: "Lower Sorbian"
                },
                el: {
                    g: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
                    h: "Greek"
                },
                "el-GR": {
                    g: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
                    h: "Greek (Greece)"
                },
                en: {
                    g: "English",
                    h: "English"
                },
                "en-GB": {
                    g: "English (UK)",
                    h: "English (UK)"
                },
                "en-AU": {
                    g: "English (Australia)",
                    h: "English (Australia)"
                },
                "en-CA": {
                    g: "English (Canada)",
                    h: "English (Canada)"
                },
                "en-IE": {
                    g: "English (Ireland)",
                    h: "English (Ireland)"
                },
                "en-IN": {
                    g: "English (India)",
                    h: "English (India)"
                },
                "en-PI": {
                    g: "English (Pirate)",
                    h: "English (Pirate)"
                },
                "en-UD": {
                    g: "English (Upside Down)",
                    h: "English (Upside Down)"
                },
                "en-US": {
                    g: "English (US)",
                    h: "English (US)"
                },
                "en-ZA": {
                    g: "English (South Africa)",
                    h: "English (South Africa)"
                },
                "en@pirate": {
                    g: "English (Pirate)",
                    h: "English (Pirate)"
                },
                eo: {
                    g: "Esperanto",
                    h: "Esperanto"
                },
                "eo-EO": {
                    g: "Esperanto",
                    h: "Esperanto"
                },
                es: {
                    g: "Espa\u00f1ol",
                    h: "Spanish"
                },
                "es-AR": {
                    g: "Espa\u00f1ol (Argentine)",
                    h: "Spanish (Argentina)"
                },
                "es-419": {
                    g: "Espa\u00f1ol (Latinoam\u00e9rica)",
                    h: "Spanish (Latin America)"
                },
                "es-CL": {
                    g: "Espa\u00f1ol (Chile)",
                    h: "Spanish (Chile)"
                },
                "es-CO": {
                    g: "Espa\u00f1ol (Colombia)",
                    h: "Spanish (Colombia)"
                },
                "es-EC": {
                    g: "Espa\u00f1ol (Ecuador)",
                    h: "Spanish (Ecuador)"
                },
                "es-ES": {
                    g: "Espa\u00f1ol (Espa\u00f1a)",
                    h: "Spanish (Spain)"
                },
                "es-LA": {
                    g: "Espa\u00f1ol (Latinoam\u00e9rica)",
                    h: "Spanish (Latin America)"
                },
                "es-NI": {
                    g: "Espa\u00f1ol (Nicaragua)",
                    h: "Spanish (Nicaragua)"
                },
                "es-MX": {
                    g: "Espa\u00f1ol (M\u00e9xico)",
                    h: "Spanish (Mexico)"
                },
                "es-US": {
                    g: "Espa\u00f1ol (Estados Unidos)",
                    h: "Spanish (United States)"
                },
                "es-VE": {
                    g: "Espa\u00f1ol (Venezuela)",
                    h: "Spanish (Venezuela)"
                },
                et: {
                    g: "eesti keel",
                    h: "Estonian"
                },
                "et-EE": {
                    g: "Eesti (Estonia)",
                    h: "Estonian (Estonia)"
                },
                eu: {
                    g: "Euskara",
                    h: "Basque"
                },
                "eu-ES": {
                    g: "Euskara",
                    h: "Basque"
                },
                fa: {
                    g: "\u0641\u0627\u0631\u0633\u06cc",
                    h: "Persian"
                },
                "fa-IR": {
                    g: "\u0641\u0627\u0631\u0633\u06cc",
                    h: "Persian"
                },
                "fb-LT": {
                    g: "Leet Speak",
                    h: "Leet"
                },
                ff: {
                    g: "Fulah",
                    h: "Fulah"
                },
                fi: {
                    g: "Suomi",
                    h: "Finnish"
                },
                "fi-FI": {
                    g: "Suomi",
                    h: "Finnish"
                },
                "fo-FO": {
                    g: "F\u00f8royskt",
                    h: "Faroese"
                },
                fr: {
                    g: "Fran\u00e7ais",
                    h: "French"
                },
                "fr-CA": {
                    g: "Fran\u00e7ais (Canada)",
                    h: "French (Canada)"
                },
                "fr-FR": {
                    g: "Fran\u00e7ais (France)",
                    h: "French (France)"
                },
                "fr-BE": {
                    g: "Fran\u00e7ais (Belgique)",
                    h: "French (Belgium)"
                },
                "fr-CH": {
                    g: "Fran\u00e7ais (Suisse)",
                    h: "French (Switzerland)"
                },
                "fy-NL": {
                    g: "Frysk",
                    h: "Frisian (West)"
                },
                ga: {
                    g: "Gaeilge",
                    h: "Irish"
                },
                "ga-IE": {
                    g: "Gaeilge (Gaelic)",
                    h: "Irish (Gaelic)"
                },
                gl: {
                    g: "Galego",
                    h: "Galician"
                },
                "gl-ES": {
                    g: "Galego",
                    h: "Galician"
                },
                "gn-PY": {
                    g: "Ava\u00f1e'\u1ebd",
                    h: "Guarani"
                },
                "gu-IN": {
                    g: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0",
                    h: "Gujarati"
                },
                "gx-GR": {
                    g: "\u1f19\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ae \u1f00\u03c1\u03c7\u03b1\u03af\u03b1",
                    h: "Classical Greek"
                },
                he: {
                    g: "\u05e2\u05d1\u05e8\u05d9\u05ea\u200f",
                    h: "Hebrew"
                },
                "he-IL": {
                    g: "\u05e2\u05d1\u05e8\u05d9\u05ea\u200f",
                    h: "Hebrew"
                },
                hi: {
                    g: "\u0939\u093f\u0928\u094d\u0926\u0940",
                    h: "Hindi"
                },
                "hi-IN": {
                    g: "\u0939\u093f\u0928\u094d\u0926\u0940",
                    h: "Hindi"
                },
                hr: {
                    g: "Hrvatski",
                    h: "Croatian"
                },
                "hr-HR": {
                    g: "Hrvatski",
                    h: "Croatian"
                },
                hsb: {
                    g: "Hornjoserb\u0161\u0107ina",
                    h: "Upper Sorbian"
                },
                ht: {
                    g: "Krey\u00f2l",
                    h: "Haitian Creole"
                },
                hu: {
                    g: "Magyar",
                    h: "Hungarian"
                },
                "hu-HU": {
                    g: "Magyar",
                    h: "Hungarian"
                },
                "hy-AM": {
                    g: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576",
                    h: "Armenian"
                },
                id: {
                    g: "Bahasa Indonesia",
                    h: "Indonesian"
                },
                "id-ID": {
                    g: "Bahasa Indonesia",
                    h: "Indonesian"
                },
                is: {
                    g: "\u00cdslenska",
                    h: "Icelandic"
                },
                "is-IS": {
                    g: "\u00cdslenska (Iceland)",
                    h: "Icelandic (Iceland)"
                },
                it: {
                    g: "Italiano",
                    h: "Italian"
                },
                "it-IT": {
                    g: "Italiano",
                    h: "Italian"
                },
                ja: {
                    g: "\u65e5\u672c\u8a9e",
                    h: "Japanese"
                },
                "ja-JP": {
                    g: "\u65e5\u672c\u8a9e",
                    h: "Japanese"
                },
                "jv-ID": {
                    g: "Basa Jawa",
                    h: "Javanese"
                },
                "ka-GE": {
                    g: "\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8",
                    h: "Georgian"
                },
                "kk-KZ": {
                    g: "\u049a\u0430\u0437\u0430\u049b\u0448\u0430",
                    h: "Kazakh"
                },
                km: {
                    g: "\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a",
                    h: "Khmer"
                },
                "km-KH": {
                    g: "\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a",
                    h: "Khmer"
                },
                kab: {
                    g: "Taqbaylit",
                    h: "Kabyle"
                },
                kn: {
                    g: "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1",
                    h: "Kannada"
                },
                "kn-IN": {
                    g: "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1 (India)",
                    h: "Kannada (India)"
                },
                ko: {
                    g: "\ud55c\uad6d\uc5b4",
                    h: "Korean"
                },
                "ko-KR": {
                    g: "\ud55c\uad6d\uc5b4 (\u97e9\u56fd)",
                    h: "Korean (Korea)"
                },
                "ku-TR": {
                    g: "Kurd\u00ee",
                    h: "Kurdish"
                },
                la: {
                    g: "Latin",
                    h: "Latin"
                },
                "la-VA": {
                    g: "Latin",
                    h: "Latin"
                },
                lb: {
                    g: "L\u00ebtzebuergesch",
                    h: "Luxembourgish"
                },
                "li-NL": {
                    g: "L\u00e8mb\u00f6rgs",
                    h: "Limburgish"
                },
                lt: {
                    g: "Lietuvi\u0173",
                    h: "Lithuanian"
                },
                "lt-LT": {
                    g: "Lietuvi\u0173",
                    h: "Lithuanian"
                },
                lv: {
                    g: "Latvie\u0161u",
                    h: "Latvian"
                },
                "lv-LV": {
                    g: "Latvie\u0161u",
                    h: "Latvian"
                },
                mai: {
                    g: "\u092e\u0948\u0925\u093f\u0932\u0940, \u09ae\u09c8\u09a5\u09bf\u09b2\u09c0",
                    h: "Maithili"
                },
                "mg-MG": {
                    g: "Malagasy",
                    h: "Malagasy"
                },
                mk: {
                    g: "\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438",
                    h: "Macedonian"
                },
                "mk-MK": {
                    g: "\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438 (\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438)",
                    h: "Macedonian (Macedonian)"
                },
                ml: {
                    g: "\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02",
                    h: "Malayalam"
                },
                "ml-IN": {
                    g: "\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02",
                    h: "Malayalam"
                },
                "mn-MN": {
                    g: "\u041c\u043e\u043d\u0433\u043e\u043b",
                    h: "Mongolian"
                },
                mr: {
                    g: "\u092e\u0930\u093e\u0920\u0940",
                    h: "Marathi"
                },
                "mr-IN": {
                    g: "\u092e\u0930\u093e\u0920\u0940",
                    h: "Marathi"
                },
                ms: {
                    g: "Bahasa Melayu",
                    h: "Malay"
                },
                "ms-MY": {
                    g: "Bahasa Melayu",
                    h: "Malay"
                },
                mt: {
                    g: "Malti",
                    h: "Maltese"
                },
                "mt-MT": {
                    g: "Malti",
                    h: "Maltese"
                },
                my: {
                    g: "\u1017\u1019\u102c\u1005\u1000\u102c",
                    h: "Burmese"
                },
                no: {
                    g: "Norsk",
                    h: "Norwegian"
                },
                nb: {
                    g: "Norsk (bokm\u00e5l)",
                    h: "Norwegian (bokmal)"
                },
                "nb-NO": {
                    g: "Norsk (bokm\u00e5l)",
                    h: "Norwegian (bokmal)"
                },
                ne: {
                    g: "\u0928\u0947\u092a\u093e\u0932\u0940",
                    h: "Nepali"
                },
                "ne-NP": {
                    g: "\u0928\u0947\u092a\u093e\u0932\u0940",
                    h: "Nepali"
                },
                nl: {
                    g: "Nederlands",
                    h: "Dutch"
                },
                "nl-BE": {
                    g: "Nederlands (Belgi\u00eb)",
                    h: "Dutch (Belgium)"
                },
                "nl-NL": {
                    g: "Nederlands (Nederland)",
                    h: "Dutch (Netherlands)"
                },
                "nn-NO": {
                    g: "Norsk (nynorsk)",
                    h: "Norwegian (nynorsk)"
                },
                oc: {
                    g: "Occitan",
                    h: "Occitan"
                },
                "or-IN": {
                    g: "\u0b13\u0b21\u0b3c\u0b3f\u0b06",
                    h: "Oriya"
                },
                pa: {
                    g: "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40",
                    h: "Punjabi"
                },
                "pa-IN": {
                    g: "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40 (\u0a2d\u0a3e\u0a30\u0a24 \u0a28\u0a42\u0a70)",
                    h: "Punjabi (India)"
                },
                pl: {
                    g: "Polski",
                    h: "Polish"
                },
                "pl-PL": {
                    g: "Polski",
                    h: "Polish"
                },
                "ps-AF": {
                    g: "\u067e\u069a\u062a\u0648",
                    h: "Pashto"
                },
                pt: {
                    g: "Portugu\u00eas",
                    h: "Portuguese"
                },
                "pt-BR": {
                    g: "Portugu\u00eas (Brasil)",
                    h: "Portuguese (Brazil)"
                },
                "pt-PT": {
                    g: "Portugu\u00eas (Portugal)",
                    h: "Portuguese (Portugal)"
                },
                "qu-PE": {
                    g: "Qhichwa",
                    h: "Quechua"
                },
                "rm-CH": {
                    g: "Rumantsch",
                    h: "Romansh"
                },
                ro: {
                    g: "Rom\u00e2n\u0103",
                    h: "Romanian"
                },
                "ro-RO": {
                    g: "Rom\u00e2n\u0103",
                    h: "Romanian"
                },
                ru: {
                    g: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
                    h: "Russian"
                },
                "ru-RU": {
                    g: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
                    h: "Russian"
                },
                "sa-IN": {
                    g: "\u0938\u0902\u0938\u094d\u0915\u0943\u0924\u092e\u094d",
                    h: "Sanskrit"
                },
                "se-NO": {
                    g: "Davvis\u00e1megiella",
                    h: "Northern S\u00e1mi"
                },
                "si-LK": {
                    g: "\u0db4\u0dc5\u0dcf\u0dad",
                    h: "Sinhala (Sri Lanka)"
                },
                sk: {
                    g: "Sloven\u010dina",
                    h: "Slovak"
                },
                "sk-SK": {
                    g: "Sloven\u010dina (Slovakia)",
                    h: "Slovak (Slovakia)"
                },
                sl: {
                    g: "Sloven\u0161\u010dina",
                    h: "Slovenian"
                },
                "sl-SI": {
                    g: "Sloven\u0161\u010dina",
                    h: "Slovenian"
                },
                "so-SO": {
                    g: "Soomaaliga",
                    h: "Somali"
                },
                sq: {
                    g: "Shqip",
                    h: "Albanian"
                },
                "sq-AL": {
                    g: "Shqip",
                    h: "Albanian"
                },
                sr: {
                    g: "\u0421\u0440\u043f\u0441\u043a\u0438",
                    h: "Serbian"
                },
                "sr-RS": {
                    g: "\u0421\u0440\u043f\u0441\u043a\u0438 (Serbia)",
                    h: "Serbian (Serbia)"
                },
                su: {
                    g: "Basa Sunda",
                    h: "Sundanese"
                },
                sv: {
                    g: "Svenska",
                    h: "Swedish"
                },
                "sv-SE": {
                    g: "Svenska",
                    h: "Swedish"
                },
                sw: {
                    g: "Kiswahili",
                    h: "Swahili"
                },
                "sw-KE": {
                    g: "Kiswahili",
                    h: "Swahili (Kenya)"
                },
                ta: {
                    g: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd",
                    h: "Tamil"
                },
                "ta-IN": {
                    g: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd",
                    h: "Tamil"
                },
                te: {
                    g: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41",
                    h: "Telugu"
                },
                "te-IN": {
                    g: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41",
                    h: "Telugu"
                },
                tg: {
                    g: "\u0437\u0430\u0431\u043e\u0301\u043d\u0438 \u0442\u043e\u04b7\u0438\u043a\u04e3\u0301",
                    h: "Tajik"
                },
                "tg-TJ": {
                    g: "\u0442\u043e\u04b7\u0438\u043a\u04e3",
                    h: "Tajik"
                },
                th: {
                    g: "\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22",
                    h: "Thai"
                },
                "th-TH": {
                    g: "\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22 (\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e44\u0e17\u0e22)",
                    h: "Thai (Thailand)"
                },
                tl: {
                    g: "Filipino",
                    h: "Filipino"
                },
                "tl-PH": {
                    g: "Filipino",
                    h: "Filipino"
                },
                tlh: {
                    g: "tlhIngan-Hol",
                    h: "Klingon"
                },
                tr: {
                    g: "T\u00fcrk\u00e7e",
                    h: "Turkish"
                },
                "tr-TR": {
                    g: "T\u00fcrk\u00e7e",
                    h: "Turkish"
                },
                "tt-RU": {
                    g: "\u0442\u0430\u0442\u0430\u0440\u0447\u0430",
                    h: "Tatar"
                },
                uk: {
                    g: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",
                    h: "Ukrainian"
                },
                "uk-UA": {
                    g: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",
                    h: "Ukrainian"
                },
                ur: {
                    g: "\u0627\u0631\u062f\u0648",
                    h: "Urdu"
                },
                "ur-PK": {
                    g: "\u0627\u0631\u062f\u0648",
                    h: "Urdu"
                },
                uz: {
                    g: "O'zbek",
                    h: "Uzbek"
                },
                "uz-UZ": {
                    g: "O'zbek",
                    h: "Uzbek"
                },
                vi: {
                    g: "Ti\u1ebfng Vi\u1ec7t",
                    h: "Vietnamese"
                },
                "vi-VN": {
                    g: "Ti\u1ebfng Vi\u1ec7t",
                    h: "Vietnamese"
                },
                "xh-ZA": {
                    g: "isiXhosa",
                    h: "Xhosa"
                },
                yi: {
                    g: "\u05d9\u05d9\u05b4\u05d3\u05d9\u05e9",
                    h: "Yiddish"
                },
                "yi-DE": {
                    g: "\u05d9\u05d9\u05b4\u05d3\u05d9\u05e9 (German)",
                    h: "Yiddish (German)"
                },
                zh: {
                    g: "\u4e2d\u6587",
                    h: "Chinese"
                },
                "zh-Hans": {
                    g: "\u4e2d\u6587\u7b80\u4f53",
                    h: "Chinese Simplified"
                },
                "zh-Hant": {
                    g: "\u4e2d\u6587\u7e41\u9ad4",
                    h: "Chinese Traditional"
                },
                "zh-CN": {
                    g: "\u4e2d\u6587\uff08\u4e2d\u56fd\uff09",
                    h: "Chinese Simplified (China)"
                },
                "zh-HK": {
                    g: "\u4e2d\u6587\uff08\u9999\u6e2f\uff09",
                    h: "Chinese Traditional (Hong Kong)"
                },
                "zh-SG": {
                    g: "\u4e2d\u6587\uff08\u65b0\u52a0\u5761\uff09",
                    h: "Chinese Simplified (Singapore)"
                },
                "zh-TW": {
                    g: "\u4e2d\u6587\uff08\u53f0\u7063\uff09",
                    h: "Chinese Traditional (Taiwan)"
                },
                "zu-ZA": {
                    g: "isiZulu",
                    h: "Zulu"
                }
            }, cm = q(Object.keys(bm)), dm = cm.next(); !dm.done; dm =
            cm.next()) {
            var em = dm.value;
            bm[em.toLowerCase()] = bm[em]
        };

        function W(b) {
            this.i = H(b);
            this.f = new Map;
            this.b = new Set;
            this.c = new Map;
            this.a = new E
        }
        y("shaka.ui.Localization", W);
        W.prototype.addEventListener = function (b, c, d) {
            this.a.addEventListener(b, c, d)
        };
        W.prototype.addEventListener = W.prototype.addEventListener;
        W.prototype.removeEventListener = function (b, c, d) {
            this.a.removeEventListener(b, c, d || void 0)
        };
        W.prototype.removeEventListener = W.prototype.removeEventListener;
        W.prototype.dispatchEvent = function (b) {
            return this.a.dispatchEvent(b)
        };
        W.prototype.dispatchEvent = W.prototype.dispatchEvent;
        W.prototype.ae = function (b) {
            var c = this;
            this.b.clear();
            b = q(b);
            for (var d = b.next(); !d.done; d = b.next()) this.b.add(H(d.value));
            fm(this);
            this.a.dispatchEvent(new D("locale-changed"));
            b = Lb(this.b, function (b) {
                return !c.c.has(b)
            });
            b.length && this.a.dispatchEvent(new D("unknown-locales", {
                Bg: b
            }))
        };
        W.prototype.changeLocale = W.prototype.ae;
        W.prototype.U = function (b, c, d) {
            var e = gm;
            b = H(b);
            void 0 === d && (d = e.Lf);
            var f = this.c.get(b) || new Map;
            c.forEach(function (b, c) {
                f.has(c) && d != e.Lf || f.set(c, b)
            });
            this.c.set(b, f);
            fm(this);
            this.a.dispatchEvent(new D("locale-updated"));
            return this
        };
        W.prototype.insert = W.prototype.U;
        W.prototype.Ph = function (b) {
            for (var c = q(b.keys()), d = c.next(); !d.done; d = c.next()) d = d.value, b.set(d, this.resolve(d))
        };
        W.prototype.resolveDictionary = W.prototype.Ph;
        W.prototype.resolve = function (b) {
            var c = this.f.get(b);
            if (c) return c;
            b = {
                locales: Array.from(this.b),
                missing: b
            };
            this.a.dispatchEvent(new D("unknown-localization", b));
            return ""
        };
        W.prototype.resolve = W.prototype.resolve;

        function fm(b) {
            for (var c = b.c, d = b.i, e = b.b, f = new Set, g = {}, h = q(e), k = h.next(); !k.done; g = {
                    locale: g.locale
                }, k = h.next()) {
                g.locale = k.value;
                f.add(g.locale);
                f.add(Md(g.locale));
                k = Lb(c.keys(), function (b) {
                    return function (c) {
                        var d = b.locale,
                            e = Md(c),
                            f = Md(d);
                        return c != e && d != f && e == f
                    }
                }(g));
                k.sort();
                var l = q(k);
                for (k = l.next(); !k.done; k = l.next()) f.add(k.value);
                k = Lb(c.keys(), function (b) {
                    return function (c) {
                        return Md(c) == b.locale
                    }
                }(g));
                k.sort();
                l = q(k);
                for (k = l.next(); !k.done; k = l.next()) f.add(k.value)
            }
            f.add(d);
            d = [];
            f = q(f);
            for (k = f.next(); !k.done; k = f.next())(k = c.get(k.value)) && d.push(k);
            d.reverse();
            b.f.clear();
            c = q(d);
            for (k = c.next(); !k.done; k = c.next()) k.value.forEach(function (c, d) {
                b.f.set(d, c)
            });
            c = b.f.keys();
            f = new Set;
            d = q(b.b);
            for (k = d.next(); !k.done; k = d.next()) k = b.c.get(k.value) || new Map, hm(k, c, f);
            0 < f.size && (e = {
                Bg: Array.from(e),
                Di: Array.from(f)
            }, b.a.dispatchEvent(new D("missing-localizations", e)))
        }

        function hm(b, c, d) {
            c = q(c);
            for (var e = c.next(); !e.done; e = c.next()) e = e.value, b.get(e) || d.add(e)
        }
        var gm = {
            USE_OLD: 0,
            USE_NEW: 1
        };
        W.ConflictResolution = gm;
        var X = {
            Kc: "1077325112364709655",
            qf: "1911090580951495029",
            rf: "7071612439610534706",
            Fd: "6161306839322897077",
            sf: "1774834209035716827",
            Gd: "8345190086337560158",
            tf: "3278592358864783064",
            si: "3045980486001972586",
            uf: "4388316720828367903",
            Hd: "5963689277976480680",
            Id: "9042260521669277115",
            Jd: "836055097473758014",
            vf: "6073266792045231479",
            wf: "1142734805932039923",
            xf: "5553522235935533682",
            Kd: "2023925063728908356",
            yf: "1050953507607739202",
            Lc: "4259064532355692191",
            Qd: "1911090580951495029",
            Rd: "8145129506114534451",
            Df: "7071612439610534706",
            Sd: "3278592358864783064",
            Ef: "3045980486001972586",
            Ff: "411375375680850814",
            Gf: "411375375680850814",
            Hf: "8145129506114534451",
            Td: "6073266792045231479",
            If: "298626259350585300"
        };
        y("shaka.ui.Utils.getFirstDescendantWithClassName", function (b, c) {
            return im(b, c)
        });

        function im(b, c) {
            var d = b.getElementsByClassName(c);
            return d.length ? d[0] : null
        }

        function jm(b) {
            return (b = b.Sa().filter(function (b) {
                return 1 == b.active
            })[0]) ? "video/mp2t" == b.mimeType : !1
        };

        function Z(b, c, d, e) {
            var f = this;
            E.call(this);
            this.Bc = new Map([
                ["time_and_duration", function () {
                    var b = document.createElement("div");
                    b.classList.add("shaka-time-container");
                    f.u = document.createElement("div");
                    f.u.textContent = "0:00";
                    b.appendChild(f.u);
                    f.w.appendChild(b)
                }],
                ["mute", function () {
                    f.B = document.createElement("button");
                    f.B.classList.add("shaka-mute-button");
                    f.B.classList.add("material-icons");
                    f.B.textContent = "volume_up";
                    f.w.appendChild(f.B)
                }],
                ["volume", function () {
                    f.m = document.createElement("input");
                    f.m.classList.add("shaka-volume-bar");
                    f.m.setAttribute("type", "range");
                    f.m.setAttribute("step", "any");
                    f.m.setAttribute("min", "0");
                    f.m.setAttribute("max", "1");
                    f.m.setAttribute("value", "0");
                    f.w.appendChild(f.m)
                }],
                ["fullscreen", function () {
                    f.K = document.createElement("button");
                    f.K.classList.add("shaka-fullscreen-button");
                    f.K.classList.add("material-icons");
                    f.K.textContent = "fullscreen";
                    f.w.appendChild(f.K)
                }],
                ["overflow_menu", function () {
                    f.na = document.createElement("button");
                    f.na.classList.add("shaka-overflow-menu-button");
                    f.na.classList.add("shaka-no-propagation");
                    f.na.classList.add("material-icons");
                    f.na.textContent = "more_vert";
                    f.w.appendChild(f.na)
                }],
                ["captions", function () {
                    f.C = document.createElement("button");
                    f.C.classList.add("shaka-caption-button");
                    f.ba = document.createElement("i");
                    f.ba.classList.add("material-icons");
                    f.ba.textContent = "closed_caption";
                    f.b && f.b.ib() ? f.C.setAttribute("aria-pressed", "true") : f.C.setAttribute("aria-pressed", "false");
                    f.C.appendChild(f.ba);
                    var b = document.createElement("label");
                    b.classList.add("shaka-overflow-button-label");
                    f.Bd = document.createElement("span");
                    b.appendChild(f.Bd);
                    f.vb = document.createElement("span");
                    f.vb.classList.add("shaka-current-selection-span");
                    b.appendChild(f.vb);
                    f.C.appendChild(b);
                    f.j.appendChild(f.C)
                }],
                ["cast", function () {
                    f.o = document.createElement("button");
                    f.o.classList.add("shaka-cast-button");
                    f.o.classList.add("shaka-hidden");
                    f.o.setAttribute("aria-pressed", "false");
                    f.Lb = document.createElement("i");
                    f.Lb.classList.add("material-icons");
                    f.Lb.textContent = "cast";
                    f.o.appendChild(f.Lb);
                    var b = document.createElement("label");
                    b.classList.add("shaka-overflow-button-label");
                    f.Cd = document.createElement("span");
                    b.appendChild(f.Cd);
                    f.Jb = document.createElement("span");
                    f.Jb.classList.add("shaka-current-selection-span");
                    b.appendChild(f.Jb);
                    f.o.appendChild(b);
                    f.j.appendChild(f.o)
                }],
                ["rewind", function () {
                    f.xa = document.createElement("button");
                    f.xa.classList.add("shaka-rewind-button");
                    f.xa.classList.add("material-icons");
                    f.xa.textContent = "fast_rewind";
                    f.w.appendChild(f.xa)
                }],
                ["fast_forward", function () {
                    f.sa = document.createElement("button");
                    f.sa.classList.add("shaka-fast-forward-button");
                    f.sa.classList.add("material-icons");
                    f.sa.textContent = "fast_forward";
                    f.w.appendChild(f.sa)
                }],
                ["quality", function () {
                    f.Z = document.createElement("button");
                    f.Z.classList.add("shaka-resolution-button");
                    var b = document.createElement("i");
                    b.classList.add("material-icons");
                    b.textContent = "settings";
                    f.Z.appendChild(b);
                    b = document.createElement("label");
                    b.classList.add("shaka-overflow-button-label");
                    f.Ed = document.createElement("span");
                    b.appendChild(f.Ed);
                    f.Qb = document.createElement("span");
                    f.Qb.classList.add("shaka-current-selection-span");
                    b.appendChild(f.Qb);
                    f.Z.appendChild(b);
                    f.j.appendChild(f.Z)
                }],
                ["language", function () {
                    f.ma = document.createElement("button");
                    f.ma.classList.add("shaka-language-button");
                    var b = document.createElement("i");
                    b.classList.add("material-icons");
                    b.textContent = "language";
                    f.ma.appendChild(b);
                    b = document.createElement("label");
                    b.classList.add("shaka-overflow-button-label");
                    f.Cc = document.createElement("span");
                    f.Cc.classList.add("languageSpan");
                    b.appendChild(f.Cc);
                    f.ub = document.createElement("span");
                    f.ub.classList.add("shaka-current-selection-span");
                    var c = f.b.getConfiguration().preferredAudioLanguage;
                    km(f, f.ub, c);
                    b.appendChild(f.ub);
                    f.ma.appendChild(b);
                    f.j.appendChild(f.ma)
                }]
            ]);
            this.v = !0;
            this.Sb = !1;
            this.$ = e;
            this.G = new L(d, b, this.$.castReceiverAppId);
            this.Nd = !0;
            this.a = this.G.j;
            this.b = this.G.rc();
            this.A = c;
            this.ka = !1;
            this.T = 1;
            this.ua = this.sb = this.wb = null;
            this.i = lm();
            mm(this);
            this.Ld = (new Map).set(this.c, X.xf).set(this.C, X.qf).set(this.Fa, X.Kc).set(this.Ma, X.Kc).set(this.La,
                X.Kc).set(this.xa, X.wf).set(this.sa, X.sf).set(this.Z, X.vf).set(this.ma, X.tf).set(this.o, X.rf).set(this.m, X.yf).set(this.na, X.uf);
            this.Pd = (new Map).set(this.Bd, X.Qd).set(this.od, X.Qd).set(this.Na, X.Rd).set(this.Cd, X.Df).set(this.Ad, X.Td).set(this.Ed, X.Td).set(this.tc, X.Lc).set(this.Cc, X.Sd).set(this.yd, X.Sd);
            nm(this);
            this.Cf = new Xb(this.Hc.bind(this));
            this.Cf.Ib(.125);
            this.Wb = new Db;
            om(this);
            this.Od = new Xb(function () {
                pm(f)
            });
            this.ye();
            this.gd(null)
        }
        Ga(Z, E);
        y("shaka.ui.Controls", Z);
        Z.prototype.destroy = function () {
            var b = this;
            return r(function d() {
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            return t(d, b.Wb.destroy(), 2);
                        case 2:
                            b.i = null, d.s = 0
                    }
                })
            })
        };
        Z.prototype.destroy = Z.prototype.destroy;

        function nm(b) {
            var c = b.Ld.keys();
            c = q(c);
            for (var d = c.next(); !d.done; d = c.next())
                if (d = d.value, null != d) {
                    var e = b.Ld.get(d);
                    d.setAttribute("aria-label", b.i.resolve(e))
                } b.X.setAttribute("aria-label", b.i.resolve(b.a.paused && !b.ka ? X.Jd : X.Id));
            b.B && b.B.setAttribute("aria-label", b.i.resolve(b.a.muted ? X.Kd : X.Hd));
            b.K && b.K.setAttribute("aria-label", b.i.resolve(document.fullscreenElement ? X.Fd : X.Gd));
            qm(b);
            rm(b);
            b.Gc();
            c = b.Pd.keys();
            c = q(c);
            for (d = c.next(); !d.done; d = c.next()) d = d.value, null != d && (e = b.Pd.get(d), d.textContent =
                b.i.resolve(e))
        }

        function mm(b) {
            b.c = null;
            b.B = null;
            b.m = null;
            b.C = null;
            b.ba = null;
            b.K = null;
            b.u = null;
            b.o = null;
            b.Lb = null;
            b.na = null;
            b.xa = null;
            b.sa = null;
            b.Z = null;
            b.ma = null;
            b.l = null;
            b.P = null;
            b.H = null;
            b.Qb = null;
            b.Cd = null;
            b.ub = null;
            b.vb = null;
            b.Bd = null;
            b.od = null;
            b.Ma = null;
            b.La = null;
            b.Na = null;
            b.Jb = null;
            b.Ad = null;
            b.Ed = null;
            b.Cc = null;
            b.yd = null;
            b.tc = null;
            b.Fa = null;
            b.A.classList.add("shaka-video-container");
            b.A.classList.add("shaka-overlay-parent");
            b.a.classList.add("shaka-video");
            b.f = document.createElement("div");
            b.f.classList.add("shaka-controls-container");
            b.f.classList.add("shaka-overlay");
            b.A.appendChild(b.f);
            var c = document.createElement("div");
            c.classList.add("shaka-play-button-container");
            c.classList.add("shaka-overlay-parent");
            b.f.appendChild(c);
            b.X = document.createElement("button");
            b.X.classList.add("shaka-play-button");
            b.X.setAttribute("icon", "play");
            c.appendChild(b.X);
            b.ra = document.createElement("div");
            b.ra.classList.add("shaka-buffering-spinner");
            b.ra.classList.add("shaka-overlay");
            b.f.appendChild(b.ra);
            c = document.createElementNS("http://www.w3.org/2000/svg",
                "svg");
            c.setAttribute("class", "shaka-spinner-svg");
            c.setAttribute("viewBox", "25 25 50 50");
            b.ra.appendChild(c);
            var d = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            d.setAttribute("class", "shaka-spinner-path");
            d.setAttribute("cx", "50");
            d.setAttribute("cy", "50");
            d.setAttribute("r", "15");
            d.setAttribute("fill", "none");
            d.setAttribute("stroke-width", "1");
            d.setAttribute("stroke-miterlimit", "10");
            c.appendChild(d);
            b.w = document.createElement("div");
            b.w.classList.add("shaka-controls-button-panel");
            b.w.classList.add("shaka-no-propagation");
            b.w.classList.add("shaka-show-controls-on-mouse-over");
            b.f.appendChild(b.w);
            for (c = 0; c < b.$.controlPanelElements.length; c++) d = b.$.controlPanelElements[c], b.Bc.get(d) && (-1 == sm.indexOf(d) || b.Bc.get(d)());
            b.j = document.createElement("div");
            b.j.classList.add("shaka-overflow-menu");
            b.j.classList.add("shaka-no-propagation");
            b.j.classList.add("shaka-show-controls-on-mouse-over");
            b.j.classList.add("shaka-settings-menu");
            b.f.appendChild(b.j);
            for (c = 0; c < b.$.overflowMenuButtons.length; c++) d =
                b.$.overflowMenuButtons[c], b.Bc.get(d) && (-1 == tm.indexOf(d) || b.Bc.get(d)()); - 1 < b.$.overflowMenuButtons.indexOf("quality") && (b.l = document.createElement("div"), b.l.classList.add("shaka-resolutions"), b.l.classList.add("shaka-no-propagation"), b.l.classList.add("shaka-show-controls-on-mouse-over"), b.l.classList.add("shaka-settings-menu"), b.Ma = document.createElement("button"), b.Ma.classList.add("shaka-back-to-overflow-button"), b.l.appendChild(b.Ma), c = document.createElement("i"), c.classList.add("material-icons"),
                c.textContent = "arrow_back", b.Ma.appendChild(c), b.Ad = document.createElement("span"), b.Ma.appendChild(b.Ad), c = document.createElement("button"), c.setAttribute("aria-selected", "true"), b.l.appendChild(c), d = document.createElement("i"), d.classList.add("material-icons"), d.classList.add("shaka-chosen-item"), d.textContent = "done", d.setAttribute("aria-hidden", "true"), c.appendChild(d), b.tc = document.createElement("span"), b.tc.classList.add("shaka-auto-span"), c.appendChild(b.tc), b.f.appendChild(b.l)); - 1 < b.$.overflowMenuButtons.indexOf("language") &&
                (b.P = document.createElement("div"), b.P.classList.add("shaka-audio-languages"), b.P.classList.add("shaka-no-propagation"), b.P.classList.add("shaka-show-controls-on-mouse-over"), b.P.classList.add("shaka-settings-menu"), b.La = document.createElement("button"), b.La.classList.add("shaka-back-to-overflow-button"), b.P.appendChild(b.La), c = document.createElement("i"), c.classList.add("material-icons"), c.textContent = "arrow_back", b.La.appendChild(c), b.yd = document.createElement("span"), b.La.appendChild(b.yd), b.f.appendChild(b.P)); -
            1 < b.$.overflowMenuButtons.indexOf("captions") && (b.H = document.createElement("div"), b.H.classList.add("shaka-text-languages"), b.H.classList.add("shaka-no-propagation"), b.H.classList.add("shaka-show-controls-on-mouse-over"), b.H.classList.add("shaka-settings-menu"), b.Fa = document.createElement("button"), b.Fa.classList.add("shaka-back-to-overflow-button"), b.H.appendChild(b.Fa), c = document.createElement("i"), c.classList.add("material-icons"), c.textContent = "arrow_back", b.Fa.appendChild(c), b.od = document.createElement("span"),
                b.Fa.appendChild(b.od), c = document.createElement("button"), c.setAttribute("aria-selected", "true"), b.H.appendChild(c), d = document.createElement("i"), d.classList.add("material-icons"), d.classList.add("shaka-chosen-item"), d.textContent = "done", d.setAttribute("aria-hidden", "true"), c.appendChild(d), b.Na = document.createElement("span"), b.Na.classList.add("shaka-auto-span"), c.appendChild(b.Na), b.f.appendChild(b.H));
            b.$.addSeekBar && (b.c = document.createElement("input"), b.c.classList.add("shaka-seek-bar"), b.c.type =
                "range", b.c.setAttribute("step", "any"), b.c.setAttribute("min", "0"), b.c.setAttribute("max", "1"), b.c.value = "0", b.c.classList.add("shaka-no-propagation"), b.c.classList.add("shaka-show-controls-on-mouse-over"), b.f.appendChild(b.c));
            b.Md = b.A.getElementsByClassName("shaka-back-to-overflow-button");
            b.Vb = Array.from(b.A.getElementsByClassName("shaka-settings-menu"));
            if (!b.c)
                for (b = q(b.Vb), c = b.next(); !c.done; c = b.next()) c.value.classList.add("shaka-low-position")
        }

        function om(b) {
            b.b.addEventListener("buffering", b.Eg.bind(b));
            G(b.Wb, window, "keydown", b.De.bind(b));
            b.a.addEventListener("play", b.Yb.bind(b));
            b.a.addEventListener("pause", b.Yb.bind(b));
            b.a.addEventListener("ended", b.Yb.bind(b));
            b.$.adaptPlayButtonSize && b.a.addEventListener("resize", b.Oh.bind(b));
            b.c && (b.c.addEventListener("mousedown", b.Ke.bind(b)), b.c.addEventListener("touchstart", b.Ke.bind(b), {
                passive: !0
            }), b.c.addEventListener("input", b.ih.bind(b)), b.c.addEventListener("touchend", b.Ie.bind(b)), b.c.addEventListener("mouseup",
                b.Ie.bind(b)));
            b.B && b.B.addEventListener("click", b.$g.bind(b));
            b.m && b.m.addEventListener("input", b.sh.bind(b));
            b.a.addEventListener("volumechange", b.Oe.bind(b));
            b.Oe();
            b.C && b.C.addEventListener("click", b.Fg.bind(b));
            b.b.addEventListener("texttrackvisibility", b.ye.bind(b));
            b.b.addEventListener("trackschanged", b.ph.bind(b));
            b.b.addEventListener("variantchanged", b.qh.bind(b));
            b.b.addEventListener("textchanged", b.Gc.bind(b));
            b.K && b.K.addEventListener("click", b.Ng.bind(b));
            b.u && b.u.addEventListener("click",
                b.Kg.bind(b));
            b.xa && b.xa.addEventListener("click", b.gh.bind(b));
            b.sa && b.sa.addEventListener("click", b.Mg.bind(b));
            b.o && b.o.addEventListener("click", b.Gg.bind(b));
            b.f.addEventListener("touchstart", b.Jg.bind(b), {
                passive: !1
            });
            b.f.addEventListener("click", b.Ig.bind(b));
            b.j.addEventListener("touchstart", function (b) {
                this.ua = Date.now();
                b.stopPropagation()
            }.bind(b));
            for (var c = b.A.getElementsByClassName("shaka-no-propagation"), d = 0; d < c.length; d++) c[d].addEventListener("click", function (b) {
                b.stopPropagation()
            });
            c = b.A.getElementsByClassName("shaka-show-controls-on-mouse-over");
            for (d = 0; d < c.length; d++) {
                var e = c[d];
                e.addEventListener("mouseover", function () {
                    b.Sb = !0
                });
                e.addEventListener("mouseleave", function () {
                    b.Sb = !1
                })
            }
            b.na && b.na.addEventListener("click", b.ah.bind(b));
            b.Z && b.Z.addEventListener("click", b.fh.bind(b));
            b.ma && b.ma.addEventListener("click", b.Rg.bind(b));
            b.A.addEventListener("mousemove", b.Xb.bind(b));
            b.A.addEventListener("touchmove", b.Xb.bind(b), {
                passive: !0
            });
            b.A.addEventListener("touchend", b.Xb.bind(b), {
                passive: !0
            });
            b.A.addEventListener("mouseout", b.Wg.bind(b));
            b.w.addEventListener("click", function () {
                um(b) && pm(b)
            });
            b.G.addEventListener("caststatuschanged", b.gd.bind(b));
            b.A.addEventListener("keyup", b.Qg.bind(b));
            for (c = 0; c < b.Md.length; c++) b.Md[c].addEventListener("click", function () {
                pm(b);
                vm(b.j, !0);
                b.j.childNodes.length && b.j.childNodes[0].focus();
                b.Sb = !0
            });
            screen.orientation && screen.orientation.addEventListener("change", b.hh.bind(b));
            b.i.addEventListener("locale-updated", function () {
                return nm(b)
            });
            b.i.addEventListener("locale-changed", function () {
                return nm(b)
            })
        }

        function km(b, c, d) {
            d.length && (b = bm[d] ? bm[d].g : b.i.resolve("mul" == d ? X.Ff : "zxx" == d ? X.Gf : X.If), c.textContent = b)
        }
        Z.prototype.Pf = function (b) {
            this.Nd = b;
            this.gd(null)
        };
        Z.prototype.allowCast = Z.prototype.Pf;
        Z.prototype.Ag = function () {
            this.Yb()
        };
        Z.prototype.loadComplete = Z.prototype.Ag;
        Z.prototype.rd = function (b) {
            (this.v = b) ? (vm(this.w.parentElement, !0), this.a.controls = !1) : vm(this.w.parentElement, !1);
            this.Yb()
        };
        Z.prototype.setEnabledShakaControls = Z.prototype.rd;
        Z.prototype.cf = function (b) {
            (this.a.controls = b) && this.rd(!1)
        };
        Z.prototype.setEnabledNativeControls = Z.prototype.cf;
        Z.prototype.dg = function () {
            return this.G
        };
        Z.prototype.getCastProxy = Z.prototype.dg;
        Z.prototype.ig = function () {
            return this.i
        };
        Z.prototype.getLocalization = Z.prototype.ig;
        n = Z.prototype;
        n.hh = function () {
            this.a && 0 != this.a.readyState && !this.G.Y() && (screen.orientation.type.includes("landscape") && !document.fullscreenElement ? this.A.requestFullscreen() : screen.orientation.type.includes("portrait") && document.fullscreenElement && document.exitFullscreen())
        };
        n.Xb = function (b) {
            "touchstart" == b.type || "touchmove" == b.type || "touchend" == b.type || "keyup" == b.type ? this.ua = Date.now() : this.ua + 1E3 < Date.now() && (this.ua = null);
            this.ua && "mousemove" == b.type || (this.A.style.cursor = "", wm(this, xm), this.Od.cancel(), this.Hc(), this.sb && window.clearTimeout(this.sb), "touchend" != b.type && "keyup" != b.type && this.ua || (this.sb = window.setTimeout(this.He.bind(this), 3E3)))
        };
        n.Wg = function () {
            this.ua || (this.sb && window.clearTimeout(this.sb), this.He())
        };
        n.He = function () {
            this.sb = null;
            this.A.style.cursor = "none";
            this.a.paused && !this.ka || this.Sb ? wm(this, xm) : wm(this, ym)
        };
        n.Jg = function (b) {
            this.a.duration && (this.j.classList.contains("shaka-displayed") && (vm(this.j, !1), b.preventDefault()), zm(this) ? this.ua = Date.now() : (this.Xb(b), b.preventDefault()))
        };
        n.Ig = function () {
            this.v && (um(this) ? pm(this) : Am(this))
        };

        function Am(b) {
            b.v && b.a.duration && (b.b.Zd(), b.T = 1, b.a.paused ? b.a.play() : b.a.pause())
        }
        n.Yb = function () {
            this.a.ended && !this.a.paused && this.a.pause();
            this.v && this.a.paused && !this.ka ? (this.X.setAttribute("icon", "play"), this.X.setAttribute("aria-label", this.i.resolve(X.Jd))) : (this.X.setAttribute("icon", "pause"), this.X.setAttribute("aria-label", this.i.resolve(X.Id)))
        };
        n.Ke = function () {
            this.v && (this.ka = !0, this.a.pause())
        };
        n.ih = function () {
            this.v && this.a.duration && (this.Hc(), null != this.wb && window.clearTimeout(this.wb), this.wb = window.setTimeout(this.Je.bind(this), 125))
        };
        n.Je = function () {
            this.wb = null;
            this.a.currentTime = parseFloat(this.c.value)
        };
        n.Ie = function () {
            this.v && (null != this.wb && (window.clearTimeout(this.wb), this.Je()), this.ka = !1, this.a.play())
        };
        n.Qg = function (b) {
            var c = b.key,
                d = document.activeElement,
                e = d && d.classList ? d.classList.contains("shaka-volume-bar") : !1,
                f = d && d.classList && d.classList.contains("shaka-seek-bar");
            this.f.contains(d) && this.Xb(b);
            switch (c) {
                case "ArrowLeft":
                    e || Bm(this, this.a.currentTime - 5);
                    break;
                case "ArrowRight":
                    e || Bm(this, this.a.currentTime + 5);
                    break;
                case "Home":
                    Bm(this, this.b.ac().start);
                    break;
                case "End":
                    Bm(this, this.b.ac().end);
                    break;
                case " ":
                    f && Am(this)
            }
        };
        n.$g = function () {
            this.v && (this.a.muted = !this.a.muted)
        };
        n.Oe = function () {
            this.a.muted ? (this.B && (this.B.textContent = "volume_off", this.B.setAttribute("aria-label", this.i.resolve(X.Kd))), this.m && (this.m.value = 0)) : (this.B && (this.B.textContent = "volume_up", this.B.setAttribute("aria-label", this.i.resolve(X.Hd))), this.m && (this.m.value = this.a.volume));
            if (this.m) {
                var b = ["to right"];
                b.push("rgb(255, 255, 255)" + 100 * this.m.value + "%");
                b.push("rgba(255, 255, 255, 0.54)" + 100 * this.m.value + "%");
                b.push("rgba(255, 255, 255, 0.54)100%");
                this.m.style.background = "linear-gradient(" +
                    b.join(",") + ")"
            }
        };
        n.sh = function () {
            this.a.volume = parseFloat(this.m.value);
            this.a.muted = 0 == this.a.volume ? !0 : !1
        };
        n.Fg = function () {
            this.v && (vm(this.j, !1), vm(this.H, !0), Cm(this.H))
        };
        n.fh = function () {
            this.v && (vm(this.j, !1), vm(this.l, !0), Cm(this.l))
        };
        n.Rg = function () {
            this.v && (vm(this.j, !1), vm(this.P, !0), Cm(this.P))
        };
        n.ph = function () {
            if (this.C)
                if (jm(this.b)) vm(this.C, !0);
                else {
                    var b = this.b.Wa().length;
                    vm(this.C, 0 < b)
                } rm(this);
            Dm(this);
            this.Gc()
        };
        n.qh = function () {
            rm(this);
            Dm(this)
        };

        function rm(b) {
            if (b.Z && b.l) {
                var c = b.b.Sa();
                if (c.length && !c[0].height) vm(b.l, !1), vm(b.Z, !1);
                else {
                    c.sort(function (b, c) {
                        return b.height - c.height
                    });
                    c.reverse();
                    var d = c.find(function (b) {
                        return b.active
                    });
                    if (d) {
                        var e = d.language;
                        c = c.filter(function (b) {
                            return b.language == e
                        })
                    }
                    for (var f = im(b.l, "shaka-back-to-overflow-button"); b.l.firstChild;) b.l.removeChild(b.l.firstChild);
                    b.l.appendChild(f);
                    var g = b.b.getConfiguration().abr.enabled;
                    c.forEach(function (c) {
                        var e = document.createElement("button");
                        e.classList.add("explicit-resolution");
                        e.addEventListener("click", b.oh.bind(b, c));
                        var f = document.createElement("span");
                        f.textContent = c.height + "p";
                        e.appendChild(f);
                        g || c != d || (e.setAttribute("aria-selected", "true"), e.appendChild(Em()), f.classList.add("shaka-chosen-item"), b.Qb.textContent = f.textContent);
                        b.l.appendChild(e)
                    });
                    c = document.createElement("button");
                    c.addEventListener("click", function () {
                        this.b.configure({
                            abr: {
                                enabled: !0
                            }
                        });
                        rm(this)
                    }.bind(b));
                    f = document.createElement("span");
                    f.textContent = b.i.resolve(X.Lc);
                    c.appendChild(f);
                    g && (c.setAttribute("aria-selected",
                        "true"), c.appendChild(Em()), f.classList.add("shaka-chosen-item"), b.Qb.textContent = b.i.resolve(X.Lc));
                    b.l.appendChild(c);
                    Cm(b.l)
                }
            }
        }

        function Dm(b) {
            if (b.ma && b.P && b.ub) {
                var c = b.b.Sa(),
                    d = b.b.me().map(function (b) {
                        return b.language
                    });
                Fm(b, c, b.P, d, b.Dg, !0, b.ub);
                Cm(b.P)
            }
        }
        n.Gc = function () {
            var b = this;
            if (this.C && this.H && this.vb) {
                var c = this.b.Wa(),
                    d = this.b.qe().map(function (b) {
                        return b.language
                    });
                Fm(this, c, this.H, d, this.nh, this.b.ib(), this.vb);
                c = document.createElement("button");
                c.addEventListener("click", function () {
                    b.b.Fc(!1);
                    b.Gc()
                });
                c.appendChild(this.Na);
                this.H.appendChild(c);
                this.b.ib() || (c.setAttribute("aria-selected", "true"), c.appendChild(Em()), this.Na.classList.add("shaka-chosen-item"), this.vb.textContent = this.i.resolve(X.Rd));
                Cm(this.H)
            }
        };

        function Fm(b, c, d, e, f, g, h) {
            var k = c.filter(function (b) {
                return 1 == b.active
            })[0];
            for (c = im(d, "shaka-back-to-overflow-button"); d.firstChild;) d.removeChild(d.firstChild);
            d.appendChild(c);
            e.forEach(function (c) {
                var e = document.createElement("button");
                e.addEventListener("click", f.bind(b, c));
                var l = document.createElement("span");
                km(b, l, c);
                e.appendChild(l);
                g && c == k.language && (e.appendChild(Em()), l.classList.add("shaka-chosen-item"), e.setAttribute("aria-selected", "true"), h.textContent = l.textContent);
                d.appendChild(e)
            })
        }
        n.oh = function (b) {
            this.b.configure({
                abr: {
                    enabled: !1
                }
            });
            this.b.Ze(b, !0)
        };
        n.Dg = function (b) {
            this.b.Xe(b)
        };
        n.nh = function (b) {
            var c = this;
            return r(function e() {
                return v(e, function (e) {
                    switch (e.s) {
                        case 1:
                            return t(e, c.b.Fc(!0), 2);
                        case 2:
                            c.b.Ye(b), e.s = 0
                    }
                })
            })
        };

        function Cm(b) {
            b && (b = im(b, "shaka-chosen-item")) && b.parentElement.focus()
        }

        function Em() {
            var b = document.createElement("i");
            b.classList.add("material-icons");
            b.textContent = "done";
            b.setAttribute("aria-hidden", "true");
            return b
        }
        n.ye = function () {
            this.ba && (this.b.ib() ? (this.ba.classList.add("shaka-captions-on"), this.ba.classList.remove("shaka-captions-off")) : (this.ba.classList.add("shaka-captions-off"), this.ba.classList.remove("shaka-captions-on")))
        };
        n.Ng = function () {
            var b = this;
            return r(function d() {
                var e, f;
                return v(d, function (d) {
                    switch (d.s) {
                        case 1:
                            if (!b.v) return d["return"]();
                            e = Z;
                            f = X;
                            if (document.fullscreenElement) {
                                document.exitFullscreen();
                                b.K.textContent = "fullscreen";
                                b.K.setAttribute("aria-label", b.i.resolve(f.Gd));
                                d.I(0);
                                break
                            }
                            return t(d, b.A.requestFullscreen(), 3);
                        case 3:
                            b.K.textContent = "fullscreen_exit", b.K.setAttribute(e.a, b.i.resolve(f.Fd)), d.s = 0
                    }
                })
            })
        };
        n.Kg = function () {
            this.v && this.b.aa() && this.c && (this.a.currentTime = Number(this.c.max))
        };
        n.gh = function () {
            this.v && this.a.duration && (this.T = 0 < this.T || -4 > this.T ? -1 : 2 * this.T, this.b.xd(this.T))
        };
        n.Mg = function () {
            this.v && this.a.duration && (this.T = 0 > this.T || 4 < this.T ? 1 : 2 * this.T, this.b.xd(this.T))
        };
        n.Gg = function () {
            this.v && (this.G.Y() ? this.G.jf() : (this.o.disabled = !0, this.G.cast().then(function () {
                this.o.disabled = !1
            }.bind(this), function (b) {
                this.o.disabled = !1;
                8004 != b.code && this.dispatchEvent(new D("error", {
                    Ai: b
                }))
            }.bind(this))))
        };
        n.ah = function () {
            if (um(this)) pm(this);
            else {
                vm(this.j, !0);
                this.Sb = !0;
                var b = function (b) {
                    return 0 == b.classList.contains("shaka-hidden")
                };
                Kb(this.j.childNodes, b) && Lb(this.j.childNodes, b)[0].focus()
            }
        };
        n.gd = function () {
            var b = this.G.Yd() && this.Nd,
                c = this.G.Y();
            this.dispatchEvent(new D("caststatuschanged", {
                Ei: c
            }));
            this.o && (vm(this.o, b), this.Lb.textContent = c ? "cast_connected" : "cast", b && (c ? this.o.setAttribute("aria-pressed", "true") : this.o.setAttribute("aria-pressed", "false")));
            qm(this);
            c ? this.w.classList.add("shaka-casting") : this.w.classList.remove("shaka-casting")
        };
        n.Eg = function (b) {
            var c = b.buffering ? "shaka-hidden" : "shaka-displayed";
            this.ra.classList.add(b.buffering ? "shaka-displayed" : "shaka-hidden");
            this.ra.classList.remove(c)
        };

        function qm(b) {
            b.Jb && (b.Jb.textContent = b.G.Y() ? b.G.Dc() : b.i.resolve(X.Hf))
        }

        function zm(b) {
            return b.v ? b.G && b.G.Y() ? !0 : b.f.classList.contains("shaka-opaque") : !1
        }

        function Bm(b, c) {
            b.a.currentTime = c;
            b.Hc()
        }
        n.Hc = function () {
            if (zm(this)) {
                var b = this.ka ? Number(this.c.value) : Number(this.a.currentTime),
                    c = this.a.duration,
                    d = this.a.buffered.length,
                    e = d ? this.a.buffered.start(0) : 0,
                    f = d ? this.a.buffered.end(d - 1) : 0,
                    g = this.b.ac(),
                    h = g.end - g.start;
                this.c && (this.c.min = g.start, this.c.max = g.end);
                this.b.aa() ? (b = Math.max(0, Math.floor(g.end - b)), c = 3600 <= h, this.u && (1 <= b || this.ka ? (this.u.textContent = "- " + Gm(b, c), this.u.style.cursor = "pointer") : (this.u.textContent = this.i.resolve(X.Ef), this.u.style.cursor = "")), !this.ka && this.c && (this.c.value =
                    g.end - b)) : (g = 3600 <= c, this.u && (this.u.textContent = Gm(b, g)), c && this.u && (this.u.textContent += " / " + Gm(c, g)), !this.ka && this.c && (this.c.value = b), this.u && (this.u.style.cursor = ""));
                if (this.c)
                    if (c = this.b.ac(), 5 > c.end - c.start)
                        for (this.c.classList.add("shaka-hidden"), b = q(this.Vb), g = b.next(); !g.done; g = b.next()) g.value.classList.add("shaka-low-position");
                    else {
                        this.c.classList.remove("shaka-hidden");
                        var k = q(this.Vb);
                        for (g = k.next(); !g.done; g = k.next()) g.value.classList.remove("shaka-low-position");
                        g = ["to right"];
                        0 == d ? g.push("#000 0%") : (d = (Math.max(e, c.start) - c.start) / h || 0, f = (Math.min(f, c.end) - c.start) / h || 0, b = (b - c.start) / h || 0, g.push("rgba(255, 255, 255, 0.3) " + 100 * d + "%"), g.push("rgb(255, 255, 255) " + 100 * d + "%"), g.push("rgb(255, 255, 255) " + 100 * b + "%"), g.push("rgba(255, 255, 255, 0.54) " + 100 * b + "%"), g.push("rgba(255, 255, 255, 0.54) " + 100 * f + "%"), g.push("rgba(255, 255, 255, 0.3) " + 100 * f + "%"));
                        this.c.style.background = "linear-gradient(" + g.join(",") + ")"
                    }
            }
        };

        function Gm(b, c) {
            var d = Math.floor(b / 3600),
                e = Math.floor(b / 60 % 60),
                f = Math.floor(b % 60);
            10 > f && (f = "0" + f);
            f = e + ":" + f;
            c && (10 > e && (f = "0" + f), f = d + ":" + f);
            return f
        }
        n.Oh = function () {
            var b = this.a.clientWidth,
                c = this.a.clientHeight,
                d = .11;
            741 > b ? d = .25 : 1441 > b && (d = .15);
            b = Math.max(48, Math.min(b, c) * d);
            this.X.style.width = b + "px";
            this.X.style.height = b + "px";
            b = .62 * b / .38;
            this.ra.style.width = b + "px";
            this.ra.style.height = b + "px"
        };
        n.De = function (b) {
            9 == b.keyCode ? (this.f.classList.add("shaka-keyboard-navigation"), G(this.Wb, window, "mousedown", this.Vg.bind(this))) : 27 == b.keyCode && um(this) && pm(this)
        };
        n.Vg = function () {
            this.f.classList.remove("shaka-keyboard-navigation");
            this.Wb.Ka(window, "mousedown");
            G(this.Wb, window, "keydown", this.De.bind(this))
        };

        function vm(b, c) {
            b && (c ? (b.classList.add("shaka-displayed"), b.classList.remove("shaka-hidden")) : (b.classList.add("shaka-hidden"), b.classList.remove("shaka-displayed")))
        }

        function pm(b) {
            b = q(b.Vb);
            for (var c = b.next(); !c.done; c = b.next()) vm(c.value, !1)
        }

        function um(b) {
            return b.Vb.some(function (b) {
                return b.classList.contains("shaka-displayed")
            })
        }

        function wm(b, c) {
            c == xm ? (b.f.classList.add("shaka-opaque"), b.f.classList.remove("shaka-transparent")) : (b.f.classList.add("shaka-transparent"), b.f.classList.remove("shaka-opaque"), b.Od.pd(2))
        }

        function lm() {
            var b = new W("en");
            b.U("ar", new Map([
                ["1050953507607739202", "\u0627\u0644\u062d\u062c\u0645"],
                ["1077325112364709655", "\u0631\u062c\u0648\u0639"],
                ["1142734805932039923", "\u0625\u0631\u062c\u0627\u0639"],
                ["1774834209035716827", "\u062a\u0642\u062f\u064a\u0645 \u0633\u0631\u064a\u0639"],
                ["1911090580951495029", "\u0627\u0644\u062a\u0631\u062c\u0645\u0629"],
                ["2023925063728908356", "\u0625\u0644\u063a\u0627\u0621 \u0643\u062a\u0645 \u0627\u0644\u0635\u0648\u062a"],
                ["298626259350585300", "\u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641\u0629"],
                ["3045980486001972586", "\u0645\u0628\u0627\u0634\u0631"],
                ["3278592358864783064", "\u0627\u0644\u0644\u063a\u0629"],
                ["4259064532355692191", "\u062a\u0644\u0642\u0627\u0626\u064a"],
                ["4388316720828367903", "\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0625\u0636\u0627\u0641\u064a\u0629"],
                ["5553522235935533682", "\u0634\u0631\u064a\u0637 \u062a\u0645\u0631\u064a\u0631 \u0627\u0644\u0628\u062d\u062b"],
                ["5963689277976480680", "\u0643\u062a\u0645 \u0627\u0644\u0635\u0648\u062a"],
                ["6161306839322897077", "\u0625\u0646\u0647\u0627\u0621 \u0648\u0636\u0639 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"],
                ["7071612439610534706", "\u0625\u0631\u0633\u0627\u0644..."],
                ["8145129506114534451", "\u0625\u064a\u0642\u0627\u0641"],
                ["8345190086337560158", "\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"],
                ["836055097473758014", "\u062a\u0634\u063a\u064a\u0644"],
                ["9042260521669277115", "\u0625\u064a\u0642\u0627\u0641 \u0645\u0624\u0642\u062a"]
            ]));
            b.U("de", new Map([
                ["1050953507607739202", "Lautst\u00e4rke"],
                ["1077325112364709655", "Zur\u00fcck"],
                ["1142734805932039923", "Zur\u00fcckspulen"],
                ["1774834209035716827",
                    "Vorspulen"
                ],
                ["1911090580951495029", "Untertitel"],
                ["2023925063728908356", "Stummschaltung aufheben"],
                ["298626259350585300", "Unbekannt"],
                ["3045980486001972586", "Live"],
                ["3278592358864783064", "Sprache"],
                ["411375375680850814", "Nicht zutreffend"],
                ["4259064532355692191", "Automatisch"],
                ["4388316720828367903", "Weitere Einstellungen"],
                ["5553522235935533682", "Schieberegler f\u00fcr Suche"],
                ["5963689277976480680", "Stummschalten"],
                ["6073266792045231479", "Aufl\u00f6sung"],
                ["6161306839322897077", "Vollbildmodus beenden"],
                ["7071612439610534706", "Streamen\u2026"],
                ["8145129506114534451", "Aus"],
                ["8345190086337560158", "Vollbild"],
                ["836055097473758014", "Wiedergeben"],
                ["9042260521669277115", "Pausieren"]
            ]));
            b.U("en", new Map([
                ["1050953507607739202", "volume"],
                ["1077325112364709655", "Back"],
                ["1142734805932039923", "Rewind"],
                ["1774834209035716827", "Fast-forward"],
                ["1911090580951495029", "Captions"],
                ["2023925063728908356", "Unmute"],
                ["298626259350585300", "Unknown"],
                ["3045980486001972586", "Live"],
                ["3278592358864783064", "Language"],
                ["411375375680850814", "N/A"],
                ["4259064532355692191", "Auto"],
                ["4388316720828367903", "More settings"],
                ["5553522235935533682", "Seek slider"],
                ["5963689277976480680", "Mute"],
                ["6073266792045231479", "Resolution"],
                ["6161306839322897077", "Exit full screen"],
                ["7071612439610534706", "Cast..."],
                ["8145129506114534451", "Off"],
                ["8345190086337560158", "Full screen"],
                ["836055097473758014", "Play"],
                ["9042260521669277115", "Pause"]
            ]));
            b.U("en-GB", new Map([
                ["1050953507607739202", "volume"],
                ["1077325112364709655", "Back"],
                ["1142734805932039923", "Rewind"],
                ["1774834209035716827", "Fast-forward"],
                ["1911090580951495029", "Captions"],
                ["2023925063728908356", "Unmute"],
                ["298626259350585300", "Unknown"],
                ["3045980486001972586", "Live"],
                ["3278592358864783064", "Language"],
                ["4259064532355692191", "Auto"],
                ["4388316720828367903", "More settings"],
                ["5553522235935533682", "Seek slider"],
                ["5963689277976480680", "Mute"],
                ["6073266792045231479", "Resolution"],
                ["6161306839322897077", "Exit full screen"],
                ["7071612439610534706", "Cast..."],
                ["8145129506114534451",
                    "Off"
                ],
                ["8345190086337560158", "Full screen"],
                ["836055097473758014", "Play"],
                ["9042260521669277115", "Pause"]
            ]));
            b.U("es", new Map([
                ["1050953507607739202", "volumen"],
                ["1077325112364709655", "Atr\u00e1s"],
                ["1142734805932039923", "Retroceder"],
                ["1774834209035716827", "Avance r\u00e1pido"],
                ["1911090580951495029", "Subt\u00edtulos"],
                ["2023925063728908356", "Activar sonido"],
                ["298626259350585300", "Desconocido"],
                ["3045980486001972586", "En directo"],
                ["3278592358864783064", "Idioma"],
                ["411375375680850814", "No aplicable"],
                ["4259064532355692191", "Autom\u00e1tica"],
                ["4388316720828367903", "M\u00e1s ajustes"],
                ["5553522235935533682", "Barra deslizante de b\u00fasqueda"],
                ["5963689277976480680", "Silenciar"],
                ["6073266792045231479", "Resoluci\u00f3n"],
                ["6161306839322897077", "Salir del modo de pantalla completa"],
                ["7071612439610534706", "Reparto..."],
                ["8145129506114534451", "No"],
                ["8345190086337560158", "Pantalla completa"],
                ["836055097473758014", "Reproducir"],
                ["9042260521669277115", "Pausa"]
            ]));
            b.U("es-419", new Map([
                ["1050953507607739202",
                    "volumen"
                ],
                ["1077325112364709655", "Atr\u00e1s"],
                ["1142734805932039923", "Retroceder"],
                ["1774834209035716827", "Avance r\u00e1pido"],
                ["1911090580951495029", "Subt\u00edtulos"],
                ["2023925063728908356", "Activar sonido"],
                ["298626259350585300", "Desconocido"],
                ["3045980486001972586", "En vivo"],
                ["3278592358864783064", "Idioma"],
                ["4259064532355692191", "Auto"],
                ["4388316720828367903", "M\u00e1s opciones de configuraci\u00f3n"],
                ["5553522235935533682", "Barra deslizante de b\u00fasqueda"],
                ["5963689277976480680", "Silenciar"],
                ["6073266792045231479", "Resoluci\u00f3n"],
                ["6161306839322897077", "Salir de pantalla completa"],
                ["7071612439610534706", "Transmitir\u2026"],
                ["8145129506114534451", "Desactivado"],
                ["8345190086337560158", "Pantalla completa"],
                ["836055097473758014", "Jugar"],
                ["9042260521669277115", "Detener"]
            ]));
            b.U("fr", new Map([
                ["1050953507607739202", "volume"],
                ["1077325112364709655", "Retour"],
                ["1142734805932039923", "Retour arri\u00e8re"],
                ["1774834209035716827", "Avance rapide"],
                ["1911090580951495029", "Sous-titres"],
                ["2023925063728908356",
                    "Activer le son"
                ],
                ["298626259350585300", "Inconnue"],
                ["3045980486001972586", "En direct"],
                ["3278592358864783064", "Langue"],
                ["411375375680850814", "Sans objet"],
                ["4259064532355692191", "Auto"],
                ["4388316720828367903", "Autres param\u00e8tres"],
                ["5553522235935533682", "Barre de recherche"],
                ["5963689277976480680", "D\u00e9sactiver le son"],
                ["6073266792045231479", "R\u00e9solution"],
                ["6161306839322897077", "Quitter le mode plein \u00e9cran"],
                ["7071612439610534706", "Caster sur\u2026"],
                ["8145129506114534451", "D\u00e9sactiv\u00e9e"],
                ["8345190086337560158", "Plein \u00e9cran"],
                ["836055097473758014", "Lire"],
                ["9042260521669277115", "Mettre en veille"]
            ]));
            b.U("it", new Map([
                ["1050953507607739202", "volume"],
                ["1077325112364709655", "Indietro"],
                ["1142734805932039923", "Riavvolgi"],
                ["1774834209035716827", "Avanti veloce"],
                ["1911090580951495029", "Sottotitoli"],
                ["2023925063728908356", "Riattiva audio"],
                ["298626259350585300", "Sconosciuto"],
                ["3045980486001972586", "Dal vivo"],
                ["3278592358864783064", "Lingua"],
                ["411375375680850814", "N/A"],
                ["4259064532355692191",
                    "Auto"
                ],
                ["4388316720828367903", "Altre impostazioni"],
                ["5553522235935533682", "Dispositivo di scorrimento"],
                ["5963689277976480680", "Disattiva audio"],
                ["6073266792045231479", "Risoluzione"],
                ["6161306839322897077", "Esci dalla modalit\u00e0 a schermo intero"],
                ["7071612439610534706", "Trasmetti\u2026"],
                ["8145129506114534451", "Disattivato"],
                ["8345190086337560158", "Schermo intero"],
                ["836055097473758014", "Riproduci"],
                ["9042260521669277115", "Metti in pausa"]
            ]));
            b.U("ja", new Map([
                ["1050953507607739202", "\u97f3\u91cf"],
                ["1077325112364709655", "\u623b\u308b"],
                ["1142734805932039923", "\u5dfb\u304d\u623b\u3057"],
                ["1774834209035716827", "\u65e9\u9001\u308a"],
                ["1911090580951495029", "\u5b57\u5e55"],
                ["2023925063728908356", "\u30df\u30e5\u30fc\u30c8\u89e3\u9664"],
                ["298626259350585300", "\u4e0d\u660e"],
                ["3045980486001972586", "\u30e9\u30a4\u30d6"],
                ["3278592358864783064", "\u8a00\u8a9e"],
                ["411375375680850814", "\u8a72\u5f53\u306a\u3057"],
                ["4259064532355692191", "\u81ea\u52d5"],
                ["4388316720828367903", "\u305d\u306e\u4ed6\u306e\u8a2d\u5b9a"],
                ["5553522235935533682", "\u30b7\u30fc\u30af \u30d0\u30fc"],
                ["5963689277976480680", "\u30df\u30e5\u30fc\u30c8"],
                ["6073266792045231479", "\u89e3\u50cf\u5ea6"],
                ["6161306839322897077", "\u5168\u753b\u9762\u30e2\u30fc\u30c9\u306e\u7d42\u4e86"],
                ["7071612439610534706", "\u30ad\u30e3\u30b9\u30c8..."],
                ["8145129506114534451", "\u30aa\u30d5"],
                ["8345190086337560158", "\u5168\u753b\u9762"],
                ["836055097473758014", "\u518d\u751f"],
                ["9042260521669277115", "\u4e00\u6642\u505c\u6b62"]
            ]));
            b.U("ko", new Map([
                ["1050953507607739202",
                    "\ubcfc\ub968"
                ],
                ["1077325112364709655", "\ub4a4\ub85c"],
                ["1142734805932039923", "\ub418\uac10\uae30"],
                ["1774834209035716827", "\ube68\ub9ac\uac10\uae30"],
                ["1911090580951495029", "\uc790\ub9c9"],
                ["2023925063728908356", "\uc74c\uc18c\uac70 \ud574\uc81c"],
                ["298626259350585300", "\uc54c \uc218 \uc5c6\uc74c"],
                ["3045980486001972586", "\ub77c\uc774\ube0c"],
                ["3278592358864783064", "\uc5b8\uc5b4"],
                ["411375375680850814", "\ud574\ub2f9 \uc5c6\uc74c"],
                ["4259064532355692191", "\uc790\ub3d9"],
                ["4388316720828367903", "\uc124\uc815 \ub354\ubcf4\uae30"],
                ["5553522235935533682", "\ud0d0\uc0c9 \uc2ac\ub77c\uc774\ub354"],
                ["5963689277976480680", "\uc74c\uc18c\uac70"],
                ["6073266792045231479", "\ud574\uc0c1\ub3c4"],
                ["6161306839322897077", "\uc804\uccb4\ud654\uba74 \uc885\ub8cc"],
                ["7071612439610534706", "\uc804\uc1a1..."],
                ["8145129506114534451", "\uc0ac\uc6a9 \uc548\ud568"],
                ["8345190086337560158", "\uc804\uccb4\ud654\uba74"],
                ["836055097473758014", "\uc7ac\uc0dd"],
                ["9042260521669277115", "\uc77c\uc2dc\uc911\uc9c0"]
            ]));
            b.U("nl", new Map([
                ["1050953507607739202", "volume"],
                ["1077325112364709655", "Terug"],
                ["1142734805932039923", "Terugspoelen"],
                ["1774834209035716827", "Vooruitspoelen"],
                ["1911090580951495029", "Ondertiteling"],
                ["2023925063728908356", "Dempen opheffen"],
                ["298626259350585300", "Onbekend"],
                ["3045980486001972586", "Live"],
                ["3278592358864783064", "Taal"],
                ["411375375680850814", "N.v.t."],
                ["4259064532355692191", "Automatisch"],
                ["4388316720828367903", "Meer instellingen"],
                ["5553522235935533682", "Zoekschuifbalk"],
                ["5963689277976480680", "Dempen"],
                ["6073266792045231479",
                    "Resolutie"
                ],
                ["6161306839322897077", "Volledig scherm afsluiten"],
                ["7071612439610534706", "Casten..."],
                ["8145129506114534451", "Uit"],
                ["8345190086337560158", "Volledig scherm"],
                ["836055097473758014", "Afspelen"],
                ["9042260521669277115", "Onderbreken"]
            ]));
            b.U("pl", new Map([
                ["1050953507607739202", "g\u0142o\u015bno\u015b\u0107"],
                ["1077325112364709655", "Wstecz"],
                ["1142734805932039923", "Przewi\u0144 do ty\u0142u"],
                ["1774834209035716827", "Przewi\u0144 do przodu"],
                ["1911090580951495029", "Napisy"],
                ["2023925063728908356",
                    "Wy\u0142\u0105cz wyciszenie"
                ],
                ["298626259350585300", "Nieznane"],
                ["3045980486001972586", "Na \u017cywo"],
                ["3278592358864783064", "J\u0119zyk"],
                ["411375375680850814", "N/d"],
                ["4259064532355692191", "Automatyczna"],
                ["4388316720828367903", "Wi\u0119cej ustawie\u0144"],
                ["5553522235935533682", "Suwak przewijania"],
                ["5963689277976480680", "Wycisz"],
                ["6073266792045231479", "Rozdzielczo\u015b\u0107"],
                ["6161306839322897077", "Zamknij pe\u0142ny ekran"],
                ["7071612439610534706", "Prze\u015blij..."],
                ["8145129506114534451",
                    "Wy\u0142\u0105czone"
                ],
                ["8345190086337560158", "Pe\u0142ny ekran"],
                ["836055097473758014", "Odtwarzaj"],
                ["9042260521669277115", "Wstrzymaj"]
            ]));
            b.U("pt-BR", new Map([
                ["1050953507607739202", "volume"],
                ["1077325112364709655", "Voltar"],
                ["1142734805932039923", "Retroceder"],
                ["1774834209035716827", "Avan\u00e7ar"],
                ["1911090580951495029", "Legendas ocultas"],
                ["2023925063728908356", "Ativar som"],
                ["298626259350585300", "Desconhecido"],
                ["3045980486001972586", "Ao vivo"],
                ["3278592358864783064", "Idioma"],
                ["411375375680850814",
                    "N/A"
                ],
                ["4259064532355692191", "Autom\u00e1tico"],
                ["4388316720828367903", "Mais configura\u00e7\u00f5es"],
                ["5553522235935533682", "Bot\u00e3o deslizante de busca"],
                ["5963689277976480680", "Desativar som"],
                ["6073266792045231479", "Resolu\u00e7\u00e3o"],
                ["6161306839322897077", "Sair da tela inteira"],
                ["7071612439610534706", "Elenco..."],
                ["8145129506114534451", "Desativado"],
                ["8345190086337560158", "Tela inteira"],
                ["836055097473758014", "Reproduzir"],
                ["9042260521669277115", "Pausar"]
            ]));
            b.U("pt-PT", new Map([
                ["1050953507607739202",
                    "volume"
                ],
                ["1077325112364709655", "Anterior"],
                ["1142734805932039923", "Recuar"],
                ["1774834209035716827", "Avan\u00e7ar"],
                ["1911090580951495029", "Legendas"],
                ["2023925063728908356", "Reativar o som"],
                ["298626259350585300", "Desconhecida"],
                ["3045980486001972586", "Em direto"],
                ["3278592358864783064", "Idioma"],
                ["411375375680850814", "N/A"],
                ["4259064532355692191", "Autom\u00e1tico"],
                ["4388316720828367903", "Mais defini\u00e7\u00f5es"],
                ["5553522235935533682", "Controlo de deslize da procura"],
                ["5963689277976480680",
                    "Desativar o som"
                ],
                ["6073266792045231479", "Resolu\u00e7\u00e3o"],
                ["6161306839322897077", "Sair do ecr\u00e3 inteiro"],
                ["7071612439610534706", "Transmitir..."],
                ["8145129506114534451", "Desativado"],
                ["8345190086337560158", "Ecr\u00e3 inteiro"],
                ["836055097473758014", "Reproduzir"],
                ["9042260521669277115", "Colocar em pausa"]
            ]));
            b.U("ru", new Map([
                ["1050953507607739202", "\u0433\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u044c"],
                ["1077325112364709655", "\u041d\u0430\u0437\u0430\u0434"],
                ["1142734805932039923", "\u041f\u0435\u0440\u0435\u043c\u043e\u0442\u0430\u0442\u044c \u043d\u0430\u0437\u0430\u0434"],
                ["1774834209035716827", "\u041f\u0435\u0440\u0435\u043c\u043e\u0442\u0430\u0442\u044c \u0432\u043f\u0435\u0440\u0435\u0434"],
                ["1911090580951495029", "\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u044b"],
                ["2023925063728908356", "\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0437\u0432\u0443\u043a"],
                ["298626259350585300", "\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u043e"],
                ["3045980486001972586", "\u0412 \u044d\u0444\u0438\u0440\u0435"],
                ["3278592358864783064", "\u042f\u0437\u044b\u043a"],
                ["411375375680850814",
                    "\u2013"
                ],
                ["4259064532355692191", "\u0410\u0432\u0442\u043e\u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430"],
                ["4388316720828367903", "\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"],
                ["5553522235935533682", "\u041f\u043e\u043b\u0437\u0443\u043d\u043e\u043a \u043f\u043e\u0438\u0441\u043a\u0430"],
                ["5963689277976480680", "\u041e\u0442\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0437\u0432\u0443\u043a"],
                ["6073266792045231479",
                    "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u0435"
                ],
                ["6161306839322897077", "\u0412\u044b\u0445\u043e\u0434 \u0438\u0437 \u043f\u043e\u043b\u043d\u043e\u044d\u043a\u0440\u0430\u043d\u043d\u043e\u0433\u043e \u0440\u0435\u0436\u0438\u043c\u0430"],
                ["7071612439610534706", "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"],
                ["8145129506114534451", "\u0412\u044b\u043a\u043b."],
                ["8345190086337560158", "\u0412\u043e \u0432\u0435\u0441\u044c \u044d\u043a\u0440\u0430\u043d"],
                ["836055097473758014", "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c"],
                ["9042260521669277115", "\u041f\u0440\u0438\u043e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"]
            ]));
            b.U("th", new Map([
                ["1050953507607739202", "\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e40\u0e2a\u0e35\u0e22\u0e07"],
                ["1077325112364709655", "\u0e01\u0e25\u0e31\u0e1a"],
                ["1142734805932039923", "\u0e01\u0e23\u0e2d\u0e01\u0e25\u0e31\u0e1a"],
                ["1774834209035716827", "\u0e01\u0e23\u0e2d\u0e44\u0e1b\u0e02\u0e49\u0e32\u0e07\u0e2b\u0e19\u0e49\u0e32"],
                ["1911090580951495029", "\u0e04\u0e33\u0e2d\u0e18\u0e34\u0e1a\u0e32\u0e22\u0e27\u0e34\u0e14\u0e35\u0e42\u0e2d"],
                ["2023925063728908356", "\u0e40\u0e1b\u0e34\u0e14\u0e40\u0e2a\u0e35\u0e22\u0e07"],
                ["298626259350585300", "\u0e44\u0e21\u0e48\u0e17\u0e23\u0e32\u0e1a"],
                ["3045980486001972586", "\u0e2a\u0e14"],
                ["3278592358864783064", "\u0e20\u0e32\u0e29\u0e32"],
                ["4259064532355692191", "\u0e2d\u0e31\u0e15\u0e42\u0e19\u0e21\u0e31\u0e15\u0e34"],
                ["4388316720828367903", "\u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e40\u0e15\u0e34\u0e21"],
                ["5553522235935533682", "\u0e41\u0e16\u0e1a\u0e40\u0e25\u0e37\u0e48\u0e2d\u0e19\u0e04\u0e49\u0e19\u0e2b\u0e32"],
                ["5963689277976480680", "\u0e1b\u0e34\u0e14\u0e40\u0e2a\u0e35\u0e22\u0e07"],
                ["6073266792045231479", "\u0e04\u0e27\u0e32\u0e21\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14"],
                ["6161306839322897077", "\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e42\u0e2b\u0e21\u0e14\u0e40\u0e15\u0e47\u0e21\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d"],
                ["7071612439610534706", "\u0e41\u0e04\u0e2a\u0e15\u0e4c..."],
                ["8145129506114534451", "\u0e1b\u0e34\u0e14"],
                ["8345190086337560158", "\u0e40\u0e15\u0e47\u0e21\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d"],
                ["836055097473758014", "\u0e40\u0e25\u0e48\u0e19"],
                ["9042260521669277115", "\u0e2b\u0e22\u0e38\u0e14\u0e0a\u0e31\u0e48\u0e27\u0e04\u0e23\u0e32\u0e27"]
            ]));
            b.U("tr", new Map([
                ["1050953507607739202", "ses d\u00fczeyi"],
                ["1077325112364709655", "Geri"],
                ["1142734805932039923", "Geri sar"],
                ["1774834209035716827", "\u0130leri sar"],
                ["1911090580951495029", "Altyaz\u0131lar"],
                ["2023925063728908356", "Sesi a\u00e7"],
                ["298626259350585300", "Bilinmiyor"],
                ["3045980486001972586", "Canl\u0131"],
                ["3278592358864783064", "Dil"],
                ["4259064532355692191", "Otomatik"],
                ["4388316720828367903", "Di\u011fer ayarlar"],
                ["5553522235935533682", "Arama kayd\u0131rma \u00e7ubu\u011fu"],
                ["5963689277976480680", "Sesi kapat"],
                ["6073266792045231479", "\u00c7\u00f6z\u00fcn\u00fcrl\u00fck"],
                ["6161306839322897077", "Tam ekrandan \u00e7\u0131k"],
                ["7071612439610534706", "Yay\u0131nla..."],
                ["8145129506114534451", "Kapal\u0131"],
                ["8345190086337560158", "Tam ekran"],
                ["836055097473758014", "Oynat"],
                ["9042260521669277115", "Duraklat"]
            ]));
            b.U("zh-CN", new Map([
                ["1050953507607739202",
                    "\u97f3\u91cf"
                ],
                ["1077325112364709655", "\u8fd4\u56de"],
                ["1142734805932039923", "\u5feb\u9000"],
                ["1774834209035716827", "\u5feb\u8fdb"],
                ["1911090580951495029", "\u5b57\u5e55"],
                ["2023925063728908356", "\u53d6\u6d88\u9759\u97f3"],
                ["298626259350585300", "\u672a\u77e5"],
                ["3045980486001972586", "\u76f4\u64ad"],
                ["3278592358864783064", "\u8bed\u8a00"],
                ["4259064532355692191", "\u81ea\u52a8"],
                ["4388316720828367903", "\u66f4\u591a\u8bbe\u7f6e"],
                ["5553522235935533682", "\u64ad\u653e\u6ed1\u5757"],
                ["5963689277976480680",
                    "\u9759\u97f3"
                ],
                ["6073266792045231479", "\u5206\u8fa8\u7387"],
                ["6161306839322897077", "\u9000\u51fa\u5168\u5c4f"],
                ["7071612439610534706", "\u6295\u5c04\u2026"],
                ["8145129506114534451", "\u5173\u95ed"],
                ["8345190086337560158", "\u5168\u5c4f"],
                ["836055097473758014", "\u64ad\u653e"],
                ["9042260521669277115", "\u6682\u505c"]
            ]));
            b.U("zh-HK", new Map([
                ["1050953507607739202", "\u97f3\u91cf"],
                ["1077325112364709655", "\u8fd4\u56de"],
                ["1142734805932039923", "\u5012\u5e36"],
                ["1774834209035716827", "\u5feb\u8f49"],
                ["1911090580951495029",
                    "\u5b57\u5e55"
                ],
                ["2023925063728908356", "\u89e3\u9664\u975c\u97f3"],
                ["298626259350585300", "\u4e0d\u660e"],
                ["3045980486001972586", "\u76f4\u64ad"],
                ["3278592358864783064", "\u8a9e\u8a00"],
                ["4259064532355692191", "\u81ea\u52d5"],
                ["4388316720828367903", "\u66f4\u591a\u8a2d\u5b9a"],
                ["5553522235935533682", "\u641c\u5c0b\u6ed1\u687f"],
                ["5963689277976480680", "\u975c\u97f3"],
                ["6161306839322897077", "\u7d50\u675f\u5168\u87a2\u5e55"],
                ["7071612439610534706", "\u6295\u653e\u2026"],
                ["8145129506114534451", "\u672a\u9078\u53d6"],
                ["8345190086337560158", "\u5168\u87a2\u5e55"],
                ["836055097473758014", "\u64ad\u653e"],
                ["9042260521669277115", "\u66ab\u505c"]
            ]));
            b.U("zh-TW", new Map([
                ["1050953507607739202", "\u97f3\u91cf"],
                ["1077325112364709655", "\u8fd4\u56de"],
                ["1142734805932039923", "\u5012\u8f49"],
                ["1774834209035716827", "\u5feb\u8f49"],
                ["1911090580951495029", "\u5b57\u5e55"],
                ["2023925063728908356", "\u89e3\u9664\u975c\u97f3"],
                ["298626259350585300", "\u672a\u77e5"],
                ["3045980486001972586", "\u76f4\u64ad"],
                ["3278592358864783064", "\u8a9e\u8a00"],
                ["411375375680850814", "\u4e0d\u9069\u7528"],
                ["4259064532355692191", "\u81ea\u52d5"],
                ["4388316720828367903", "\u66f4\u591a\u8a2d\u5b9a"],
                ["5553522235935533682", "\u641c\u5c0b\u6ed1\u687f"],
                ["5963689277976480680", "\u975c\u97f3"],
                ["6073266792045231479", "\u89e3\u6790\u5ea6"],
                ["6161306839322897077", "\u7d50\u675f\u5168\u87a2\u5e55"],
                ["7071612439610534706", "\u6295\u653e\u2026"],
                ["8145129506114534451", "\u95dc\u9589"],
                ["8345190086337560158", "\u5168\u87a2\u5e55"],
                ["836055097473758014", "\u64ad\u653e"],
                ["9042260521669277115",
                    "\u66ab\u505c"
                ]
            ]));
            b.ae(navigator.languages || []);
            return b
        }
        var ym = 0,
            xm = 1,
            sm = "time_and_duration mute volume fullscreen overflow_menu rewind fast_forward".split(" "),
            tm = ["captions", "cast", "quality", "language"];

        function Hm(b, c, d, e) {
            this.c = b;
            this.a = Im();
            e && cj(this.a, e, Im(), {}, "");
            this.a.castReceiverAppId && !this.a.overflowMenuButtons.includes("cast") && this.a.overflowMenuButtons.push("cast");
            this.b = new Z(b, c, d, this.a)
        }
        y("shaka.ui.Overlay", Hm);
        Hm.prototype.rc = function () {
            return this.c
        };
        Hm.prototype.getPlayer = Hm.prototype.rc;
        Hm.prototype.eg = function () {
            return this.b
        };
        Hm.prototype.getControls = Hm.prototype.eg;
        Hm.prototype.Wh = function (b) {
            this.b.rd(b)
        };
        Hm.prototype.setEnabled = Hm.prototype.Wh;

        function Im() {
            return {
                controlPanelElements: ["time_and_duration", "mute", "volume", "fullscreen", "overflow_menu"],
                overflowMenuButtons: ["captions", "quality", "language"],
                addSeekBar: !0,
                adaptPlayButtonSize: !0,
                castReceiverAppId: ""
            }
        }

        function Jm() {
            Ek();
            if (mj()) {
                var b = document.querySelectorAll("[data-shaka-player-container]"),
                    c = document.querySelectorAll("[data-shaka-player]");
                if (c.length || b.length)
                    if (c.length && !b.length)
                        for (b = 0; b < c.length; b++) {
                            var d = c[b];
                            d.classList.add("video");
                            var e = document.createElement("div");
                            d.parentElement.replaceChild(e, d);
                            e.appendChild(d);
                            var f = "";
                            d.dataset && d.dataset.shakaPlayerCastReceiverId && (f = d.dataset.shakaPlayerCastReceiverId);
                            e = Km(e, d, {
                                castReceiverAppId: f
                            });
                            d.controls && e.b.cf(!0)
                        } else
                            for (e = 0; e <
                                b.length; e++) {
                                f = b[e];
                                d = "";
                                f.dataset && f.dataset.shakaPlayerCastReceiverId && (d = f.dataset.shakaPlayerCastReceiverId);
                                for (var g = null, h = 0; h < c.length; h++)
                                    if (c[h].parentElement == f) {
                                        g = c[h];
                                        break
                                    } g || (g = document.createElement("video"), f.appendChild(g));
                                g.dataset && g.dataset.shakaPlayerCastReceiverId && (d = g.dataset.shakaPlayerCastReceiverId);
                                Km(f, g, {
                                    castReceiverAppId: d
                                })
                            }
                c = document.createEvent("CustomEvent");
                c.initCustomEvent("shaka-ui-loaded", !1, !1, null);
                document.dispatchEvent(c)
            }
        }

        function Km(b, c, d) {
            var e = new T(c);
            d = new Hm(e, b, c, d);
            b.ui = d;
            return c.ui = d
        }
        "complete" == document.readyState ? Promise.resolve().then(Jm) : window.addEventListener("load", Jm);
    }).call(exportTo, innerGlobal, innerGlobal);
    if (typeof exports != "undefined")
        for (var k in exportTo.shaka) exports[k] = exportTo.shaka[k];
    else if (typeof define != "undefined" && define.amd) define(function () {
        return exportTo.shaka
    });
    else innerGlobal.shaka = exportTo.shaka
})();

//# sourceMappingURL=shaka-player.ui.map