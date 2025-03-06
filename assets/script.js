(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]'))
        s(r);
    new MutationObserver(r => {
        for (const o of r)
            if (o.type === "childList")
                for (const i of o.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && s(i)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(r) {
        const o = {};
        return r.integrity && (o.integrity = r.integrity),
        r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
        r.crossOrigin === "use-credentials" ? o.credentials = "include" : r.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
        o
    }
    function s(r) {
        if (r.ep)
            return;
        r.ep = !0;
        const o = n(r);
        fetch(r.href, o)
    }
}
)();
/**
* @vue/shared v3.4.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function qn(e, t) {
    const n = new Set(e.split(","));
    return t ? s => n.has(s.toLowerCase()) : s => n.has(s)
}
const J = {}
  , ft = []
  , _e = () => {}
  , Po = () => !1
  , on = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97)
  , Gn = e => e.startsWith("onUpdate:")
  , se = Object.assign
  , Yn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
  , So = Object.prototype.hasOwnProperty
  , K = (e, t) => So.call(e, t)
  , B = Array.isArray
  , Pt = e => cn(e) === "[object Map]"
  , Co = e => cn(e) === "[object Set]"
  , U = e => typeof e == "function"
  , re = e => typeof e == "string"
  , ln = e => typeof e == "symbol"
  , Z = e => e !== null && typeof e == "object"
  , gr = e => (Z(e) || U(e)) && U(e.then) && U(e.catch)
  , Ao = Object.prototype.toString
  , cn = e => Ao.call(e)
  , Oo = e => cn(e).slice(8, -1)
  , To = e => cn(e) === "[object Object]"
  , Qn = e => re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , St = qn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , un = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n))
}
  , Io = /-(\w)/g
  , pt = un(e => e.replace(Io, (t, n) => n ? n.toUpperCase() : ""))
  , Mo = /\B([A-Z])/g
  , vt = un(e => e.replace(Mo, "-$1").toLowerCase())
  , mr = un(e => e.charAt(0).toUpperCase() + e.slice(1))
  , xn = un(e => e ? `on${mr(e)}` : "")
  , Ge = (e, t) => !Object.is(e, t)
  , En = (e, t) => {
    for (let n = 0; n < e.length; n++)
        e[n](t)
}
  , en = (e, t, n) => {
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
    })
}
  , Lo = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
;
let xs;
const _r = () => xs || (xs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Xn(e) {
    if (B(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n]
              , r = re(s) ? jo(s) : Xn(s);
            if (r)
                for (const o in r)
                    t[o] = r[o]
        }
        return t
    } else if (re(e) || Z(e))
        return e
}
const Fo = /;(?![^(]*\))/g
  , No = /:([^]+)/
  , $o = /\/\*[^]*?\*\//g;
function jo(e) {
    const t = {};
    return e.replace($o, "").split(Fo).forEach(n => {
        if (n) {
            const s = n.split(No);
            s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
    }
    ),
    t
}
function Jn(e) {
    let t = "";
    if (re(e))
        t = e;
    else if (B(e))
        for (let n = 0; n < e.length; n++) {
            const s = Jn(e[n]);
            s && (t += s + " ")
        }
    else if (Z(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
const Ho = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , Bo = qn(Ho);
function yr(e) {
    return !!e || e === ""
}
/**
* @vue/reactivity v3.4.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ve;
class vr {
    constructor(t=!1) {
        this.detached = t,
        this._active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = ve,
        !t && ve && (this.index = (ve.scopes || (ve.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const n = ve;
            try {
                return ve = this,
                t()
            } finally {
                ve = n
            }
        }
    }
    on() {
        ve = this
    }
    off() {
        ve = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, s;
            for (n = 0,
            s = this.effects.length; n < s; n++)
                this.effects[n].stop();
            for (n = 0,
            s = this.cleanups.length; n < s; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                s = this.scopes.length; n < s; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const r = this.parent.scopes.pop();
                r && r !== this && (this.parent.scopes[this.index] = r,
                r.index = this.index)
            }
            this.parent = void 0,
            this._active = !1
        }
    }
}
function Uo(e) {
    return new vr(e)
}
function Vo(e, t=ve) {
    t && t.active && t.effects.push(e)
}
function Ko() {
    return ve
}
let et;
class Zn {
    constructor(t, n, s, r) {
        this.fn = t,
        this.trigger = n,
        this.scheduler = s,
        this.active = !0,
        this.deps = [],
        this._dirtyLevel = 4,
        this._trackId = 0,
        this._runnings = 0,
        this._shouldSchedule = !1,
        this._depsLength = 0,
        Vo(this, r)
    }
    get dirty() {
        if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
            this._dirtyLevel = 1,
            nt();
            for (let t = 0; t < this._depsLength; t++) {
                const n = this.deps[t];
                if (n.computed && (Do(n.computed),
                this._dirtyLevel >= 4))
                    break
            }
            this._dirtyLevel === 1 && (this._dirtyLevel = 0),
            st()
        }
        return this._dirtyLevel >= 4
    }
    set dirty(t) {
        this._dirtyLevel = t ? 4 : 0
    }
    run() {
        if (this._dirtyLevel = 0,
        !this.active)
            return this.fn();
        let t = ze
          , n = et;
        try {
            return ze = !0,
            et = this,
            this._runnings++,
            Es(this),
            this.fn()
        } finally {
            ws(this),
            this._runnings--,
            et = n,
            ze = t
        }
    }
    stop() {
        var t;
        this.active && (Es(this),
        ws(this),
        (t = this.onStop) == null || t.call(this),
        this.active = !1)
    }
}
function Do(e) {
    return e.value
}
function Es(e) {
    e._trackId++,
    e._depsLength = 0
}
function ws(e) {
    if (e.deps.length > e._depsLength) {
        for (let t = e._depsLength; t < e.deps.length; t++)
            br(e.deps[t], e);
        e.deps.length = e._depsLength
    }
}
function br(e, t) {
    const n = e.get(t);
    n !== void 0 && t._trackId !== n && (e.delete(t),
    e.size === 0 && e.cleanup())
}
let ze = !0
  , Mn = 0;
const xr = [];
function nt() {
    xr.push(ze),
    ze = !1
}
function st() {
    const e = xr.pop();
    ze = e === void 0 ? !0 : e
}
function es() {
    Mn++
}
function ts() {
    for (Mn--; !Mn && Ln.length; )
        Ln.shift()()
}
function Er(e, t, n) {
    if (t.get(e) !== e._trackId) {
        t.set(e, e._trackId);
        const s = e.deps[e._depsLength];
        s !== t ? (s && br(s, e),
        e.deps[e._depsLength++] = t) : e._depsLength++
    }
}
const Ln = [];
function wr(e, t, n) {
    es();
    for (const s of e.keys()) {
        let r;
        s._dirtyLevel < t && (r ?? (r = e.get(s) === s._trackId)) && (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0),
        s._dirtyLevel = t),
        s._shouldSchedule && (r ?? (r = e.get(s) === s._trackId)) && (s.trigger(),
        (!s._runnings || s.allowRecurse) && s._dirtyLevel !== 2 && (s._shouldSchedule = !1,
        s.scheduler && Ln.push(s.scheduler)))
    }
    ts()
}
const Rr = (e, t) => {
    const n = new Map;
    return n.cleanup = e,
    n.computed = t,
    n
}
  , Fn = new WeakMap
  , tt = Symbol("")
  , Nn = Symbol("");
function he(e, t, n) {
    if (ze && et) {
        let s = Fn.get(e);
        s || Fn.set(e, s = new Map);
        let r = s.get(n);
        r || s.set(n, r = Rr( () => s.delete(n))),
        Er(et, r)
    }
}
function Ne(e, t, n, s, r, o) {
    const i = Fn.get(e);
    if (!i)
        return;
    let u = [];
    if (t === "clear")
        u = [...i.values()];
    else if (n === "length" && B(e)) {
        const l = Number(s);
        i.forEach( (h, a) => {
            (a === "length" || !ln(a) && a >= l) && u.push(h)
        }
        )
    } else
        switch (n !== void 0 && u.push(i.get(n)),
        t) {
        case "add":
            B(e) ? Qn(n) && u.push(i.get("length")) : (u.push(i.get(tt)),
            Pt(e) && u.push(i.get(Nn)));
            break;
        case "delete":
            B(e) || (u.push(i.get(tt)),
            Pt(e) && u.push(i.get(Nn)));
            break;
        case "set":
            Pt(e) && u.push(i.get(tt));
            break
        }
    es();
    for (const l of u)
        l && wr(l, 4);
    ts()
}
const ko = qn("__proto__,__v_isRef,__isVue")
  , Pr = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(ln))
  , Rs = Wo();
function Wo() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function(...n) {
            const s = D(this);
            for (let o = 0, i = this.length; o < i; o++)
                he(s, "get", o + "");
            const r = s[t](...n);
            return r === -1 || r === !1 ? s[t](...n.map(D)) : r
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function(...n) {
            nt(),
            es();
            const s = D(this)[t].apply(this, n);
            return ts(),
            st(),
            s
        }
    }
    ),
    e
}
function zo(e) {
    const t = D(this);
    return he(t, "has", e),
    t.hasOwnProperty(e)
}
class Sr {
    constructor(t=!1, n=!1) {
        this._isReadonly = t,
        this._isShallow = n
    }
    get(t, n, s) {
        const r = this._isReadonly
          , o = this._isShallow;
        if (n === "__v_isReactive")
            return !r;
        if (n === "__v_isReadonly")
            return r;
        if (n === "__v_isShallow")
            return o;
        if (n === "__v_raw")
            return s === (r ? o ? oi : Tr : o ? Or : Ar).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
        const i = B(t);
        if (!r) {
            if (i && K(Rs, n))
                return Reflect.get(Rs, n, s);
            if (n === "hasOwnProperty")
                return zo
        }
        const u = Reflect.get(t, n, s);
        return (ln(n) ? Pr.has(n) : ko(n)) || (r || he(t, "get", n),
        o) ? u : de(u) ? i && Qn(n) ? u : u.value : Z(u) ? r ? Mr(u) : an(u) : u
    }
}
class Cr extends Sr {
    constructor(t=!1) {
        super(!1, t)
    }
    set(t, n, s, r) {
        let o = t[n];
        if (!this._isShallow) {
            const l = gt(o);
            if (!tn(s) && !gt(s) && (o = D(o),
            s = D(s)),
            !B(t) && de(o) && !de(s))
                return l ? !1 : (o.value = s,
                !0)
        }
        const i = B(t) && Qn(n) ? Number(n) < t.length : K(t, n)
          , u = Reflect.set(t, n, s, r);
        return t === D(r) && (i ? Ge(s, o) && Ne(t, "set", n, s) : Ne(t, "add", n, s)),
        u
    }
    deleteProperty(t, n) {
        const s = K(t, n);
        t[n];
        const r = Reflect.deleteProperty(t, n);
        return r && s && Ne(t, "delete", n, void 0),
        r
    }
    has(t, n) {
        const s = Reflect.has(t, n);
        return (!ln(n) || !Pr.has(n)) && he(t, "has", n),
        s
    }
    ownKeys(t) {
        return he(t, "iterate", B(t) ? "length" : tt),
        Reflect.ownKeys(t)
    }
}
class qo extends Sr {
    constructor(t=!1) {
        super(!0, t)
    }
    set(t, n) {
        return !0
    }
    deleteProperty(t, n) {
        return !0
    }
}
const Go = new Cr
  , Yo = new qo
  , Qo = new Cr(!0)
  , ns = e => e
  , fn = e => Reflect.getPrototypeOf(e);
function Kt(e, t, n=!1, s=!1) {
    e = e.__v_raw;
    const r = D(e)
      , o = D(t);
    n || (Ge(t, o) && he(r, "get", t),
    he(r, "get", o));
    const {has: i} = fn(r)
      , u = s ? ns : n ? is : Mt;
    if (i.call(r, t))
        return u(e.get(t));
    if (i.call(r, o))
        return u(e.get(o));
    e !== r && e.get(t)
}
function Dt(e, t=!1) {
    const n = this.__v_raw
      , s = D(n)
      , r = D(e);
    return t || (Ge(e, r) && he(s, "has", e),
    he(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
}
function kt(e, t=!1) {
    return e = e.__v_raw,
    !t && he(D(e), "iterate", tt),
    Reflect.get(e, "size", e)
}
function Ps(e) {
    e = D(e);
    const t = D(this);
    return fn(t).has.call(t, e) || (t.add(e),
    Ne(t, "add", e, e)),
    this
}
function Ss(e, t) {
    t = D(t);
    const n = D(this)
      , {has: s, get: r} = fn(n);
    let o = s.call(n, e);
    o || (e = D(e),
    o = s.call(n, e));
    const i = r.call(n, e);
    return n.set(e, t),
    o ? Ge(t, i) && Ne(n, "set", e, t) : Ne(n, "add", e, t),
    this
}
function Cs(e) {
    const t = D(this)
      , {has: n, get: s} = fn(t);
    let r = n.call(t, e);
    r || (e = D(e),
    r = n.call(t, e)),
    s && s.call(t, e);
    const o = t.delete(e);
    return r && Ne(t, "delete", e, void 0),
    o
}
function As() {
    const e = D(this)
      , t = e.size !== 0
      , n = e.clear();
    return t && Ne(e, "clear", void 0, void 0),
    n
}
function Wt(e, t) {
    return function(s, r) {
        const o = this
          , i = o.__v_raw
          , u = D(i)
          , l = t ? ns : e ? is : Mt;
        return !e && he(u, "iterate", tt),
        i.forEach( (h, a) => s.call(r, l(h), l(a), o))
    }
}
function zt(e, t, n) {
    return function(...s) {
        const r = this.__v_raw
          , o = D(r)
          , i = Pt(o)
          , u = e === "entries" || e === Symbol.iterator && i
          , l = e === "keys" && i
          , h = r[e](...s)
          , a = n ? ns : t ? is : Mt;
        return !t && he(o, "iterate", l ? Nn : tt),
        {
            next() {
                const {value: d, done: p} = h.next();
                return p ? {
                    value: d,
                    done: p
                } : {
                    value: u ? [a(d[0]), a(d[1])] : a(d),
                    done: p
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function Ue(e) {
    return function(...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}
function Xo() {
    const e = {
        get(o) {
            return Kt(this, o)
        },
        get size() {
            return kt(this)
        },
        has: Dt,
        add: Ps,
        set: Ss,
        delete: Cs,
        clear: As,
        forEach: Wt(!1, !1)
    }
      , t = {
        get(o) {
            return Kt(this, o, !1, !0)
        },
        get size() {
            return kt(this)
        },
        has: Dt,
        add: Ps,
        set: Ss,
        delete: Cs,
        clear: As,
        forEach: Wt(!1, !0)
    }
      , n = {
        get(o) {
            return Kt(this, o, !0)
        },
        get size() {
            return kt(this, !0)
        },
        has(o) {
            return Dt.call(this, o, !0)
        },
        add: Ue("add"),
        set: Ue("set"),
        delete: Ue("delete"),
        clear: Ue("clear"),
        forEach: Wt(!0, !1)
    }
      , s = {
        get(o) {
            return Kt(this, o, !0, !0)
        },
        get size() {
            return kt(this, !0)
        },
        has(o) {
            return Dt.call(this, o, !0)
        },
        add: Ue("add"),
        set: Ue("set"),
        delete: Ue("delete"),
        clear: Ue("clear"),
        forEach: Wt(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
        e[o] = zt(o, !1, !1),
        n[o] = zt(o, !0, !1),
        t[o] = zt(o, !1, !0),
        s[o] = zt(o, !0, !0)
    }
    ),
    [e, n, t, s]
}
const [Jo,Zo,ei,ti] = Xo();
function ss(e, t) {
    const n = t ? e ? ti : ei : e ? Zo : Jo;
    return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(K(n, r) && r in s ? n : s, r, o)
}
const ni = {
    get: ss(!1, !1)
}
  , si = {
    get: ss(!1, !0)
}
  , ri = {
    get: ss(!0, !1)
}
  , Ar = new WeakMap
  , Or = new WeakMap
  , Tr = new WeakMap
  , oi = new WeakMap;
function ii(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function li(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : ii(Oo(e))
}
function an(e) {
    return gt(e) ? e : rs(e, !1, Go, ni, Ar)
}
function Ir(e) {
    return rs(e, !1, Qo, si, Or)
}
function Mr(e) {
    return rs(e, !0, Yo, ri, Tr)
}
function rs(e, t, n, s, r) {
    if (!Z(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const o = r.get(e);
    if (o)
        return o;
    const i = li(e);
    if (i === 0)
        return e;
    const u = new Proxy(e,i === 2 ? s : n);
    return r.set(e, u),
    u
}
function at(e) {
    return gt(e) ? at(e.__v_raw) : !!(e && e.__v_isReactive)
}
function gt(e) {
    return !!(e && e.__v_isReadonly)
}
function tn(e) {
    return !!(e && e.__v_isShallow)
}
function Lr(e) {
    return at(e) || gt(e)
}
function D(e) {
    const t = e && e.__v_raw;
    return t ? D(t) : e
}
function os(e) {
    return Object.isExtensible(e) && en(e, "__v_skip", !0),
    e
}
const Mt = e => Z(e) ? an(e) : e
  , is = e => Z(e) ? Mr(e) : e;
class Fr {
    constructor(t, n, s, r) {
        this.getter = t,
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this.__v_isReadonly = !1,
        this.effect = new Zn( () => t(this._value), () => Gt(this, this.effect._dirtyLevel === 2 ? 2 : 3)),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !r,
        this.__v_isReadonly = s
    }
    get value() {
        const t = D(this);
        return (!t._cacheable || t.effect.dirty) && Ge(t._value, t._value = t.effect.run()) && Gt(t, 4),
        Nr(t),
        t.effect._dirtyLevel >= 2 && Gt(t, 2),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
    get _dirty() {
        return this.effect.dirty
    }
    set _dirty(t) {
        this.effect.dirty = t
    }
}
function ci(e, t, n=!1) {
    let s, r;
    const o = U(e);
    return o ? (s = e,
    r = _e) : (s = e.get,
    r = e.set),
    new Fr(s,r,o || !r,n)
}
function Nr(e) {
    var t;
    ze && et && (e = D(e),
    Er(et, (t = e.dep) != null ? t : e.dep = Rr( () => e.dep = void 0, e instanceof Fr ? e : void 0)))
}
function Gt(e, t=4, n) {
    e = D(e);
    const s = e.dep;
    s && wr(s, t)
}
function de(e) {
    return !!(e && e.__v_isRef === !0)
}
function $r(e) {
    return jr(e, !1)
}
function ui(e) {
    return jr(e, !0)
}
function jr(e, t) {
    return de(e) ? e : new fi(e,t)
}
class fi {
    constructor(t, n) {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : D(t),
        this._value = n ? t : Mt(t)
    }
    get value() {
        return Nr(this),
        this._value
    }
    set value(t) {
        const n = this.__v_isShallow || tn(t) || gt(t);
        t = n ? t : D(t),
        Ge(t, this._rawValue) && (this._rawValue = t,
        this._value = n ? t : Mt(t),
        Gt(this, 4))
    }
}
function ht(e) {
    return de(e) ? e.value : e
}
const ai = {
    get: (e, t, n) => ht(Reflect.get(e, t, n)),
    set: (e, t, n, s) => {
        const r = e[t];
        return de(r) && !de(n) ? (r.value = n,
        !0) : Reflect.set(e, t, n, s)
    }
};
function Hr(e) {
    return at(e) ? e : new Proxy(e,ai)
}
/**
* @vue/runtime-core v3.4.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function qe(e, t, n, s) {
    try {
        return s ? e(...s) : e()
    } catch (r) {
        hn(r, t, n)
    }
}
function Ee(e, t, n, s) {
    if (U(e)) {
        const o = qe(e, t, n, s);
        return o && gr(o) && o.catch(i => {
            hn(i, t, n)
        }
        ),
        o
    }
    const r = [];
    for (let o = 0; o < e.length; o++)
        r.push(Ee(e[o], t, n, s));
    return r
}
function hn(e, t, n, s=!0) {
    const r = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy
          , u = `https://vuejs.org/error-reference/#runtime-${n}`;
        for (; o; ) {
            const h = o.ec;
            if (h) {
                for (let a = 0; a < h.length; a++)
                    if (h[a](e, i, u) === !1)
                        return
            }
            o = o.parent
        }
        const l = t.appContext.config.errorHandler;
        if (l) {
            qe(l, null, 10, [e, i, u]);
            return
        }
    }
    hi(e, n, r, s)
}
function hi(e, t, n, s=!0) {
    console.error(e)
}
let Lt = !1
  , $n = !1;
const ie = [];
let Ie = 0;
const dt = [];
let Ke = null
  , Ze = 0;
const Br = Promise.resolve();
let ls = null;
function Ur(e) {
    const t = ls || Br;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function di(e) {
    let t = Ie + 1
      , n = ie.length;
    for (; t < n; ) {
        const s = t + n >>> 1
          , r = ie[s]
          , o = Ft(r);
        o < e || o === e && r.pre ? t = s + 1 : n = s
    }
    return t
}
function cs(e) {
    (!ie.length || !ie.includes(e, Lt && e.allowRecurse ? Ie + 1 : Ie)) && (e.id == null ? ie.push(e) : ie.splice(di(e.id), 0, e),
    Vr())
}
function Vr() {
    !Lt && !$n && ($n = !0,
    ls = Br.then(Dr))
}
function pi(e) {
    const t = ie.indexOf(e);
    t > Ie && ie.splice(t, 1)
}
function gi(e) {
    B(e) ? dt.push(...e) : (!Ke || !Ke.includes(e, e.allowRecurse ? Ze + 1 : Ze)) && dt.push(e),
    Vr()
}
function Os(e, t, n=Lt ? Ie + 1 : 0) {
    for (; n < ie.length; n++) {
        const s = ie[n];
        if (s && s.pre) {
            if (e && s.id !== e.uid)
                continue;
            ie.splice(n, 1),
            n--,
            s()
        }
    }
}
function Kr(e) {
    if (dt.length) {
        const t = [...new Set(dt)].sort( (n, s) => Ft(n) - Ft(s));
        if (dt.length = 0,
        Ke) {
            Ke.push(...t);
            return
        }
        for (Ke = t,
        Ze = 0; Ze < Ke.length; Ze++)
            Ke[Ze]();
        Ke = null,
        Ze = 0
    }
}
const Ft = e => e.id == null ? 1 / 0 : e.id
  , mi = (e, t) => {
    const n = Ft(e) - Ft(t);
    if (n === 0) {
        if (e.pre && !t.pre)
            return -1;
        if (t.pre && !e.pre)
            return 1
    }
    return n
}
;
function Dr(e) {
    $n = !1,
    Lt = !0,
    ie.sort(mi);
    try {
        for (Ie = 0; Ie < ie.length; Ie++) {
            const t = ie[Ie];
            t && t.active !== !1 && qe(t, null, 14)
        }
    } finally {
        Ie = 0,
        ie.length = 0,
        Kr(),
        Lt = !1,
        ls = null,
        (ie.length || dt.length) && Dr()
    }
}
function _i(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const s = e.vnode.props || J;
    let r = n;
    const o = t.startsWith("update:")
      , i = o && t.slice(7);
    if (i && i in s) {
        const a = `${i === "modelValue" ? "model" : i}Modifiers`
          , {number: d, trim: p} = s[a] || J;
        p && (r = n.map(v => re(v) ? v.trim() : v)),
        d && (r = n.map(Lo))
    }
    let u, l = s[u = xn(t)] || s[u = xn(pt(t))];
    !l && o && (l = s[u = xn(vt(t))]),
    l && Ee(l, e, 6, r);
    const h = s[u + "Once"];
    if (h) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[u])
            return;
        e.emitted[u] = !0,
        Ee(h, e, 6, r)
    }
}
function kr(e, t, n=!1) {
    const s = t.emitsCache
      , r = s.get(e);
    if (r !== void 0)
        return r;
    const o = e.emits;
    let i = {}
      , u = !1;
    if (!U(e)) {
        const l = h => {
            const a = kr(h, t, !0);
            a && (u = !0,
            se(i, a))
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(l),
        e.extends && l(e.extends),
        e.mixins && e.mixins.forEach(l)
    }
    return !o && !u ? (Z(e) && s.set(e, null),
    null) : (B(o) ? o.forEach(l => i[l] = null) : se(i, o),
    Z(e) && s.set(e, i),
    i)
}
function dn(e, t) {
    return !e || !on(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    K(e, t[0].toLowerCase() + t.slice(1)) || K(e, vt(t)) || K(e, t))
}
let Me = null
  , pn = null;
function nn(e) {
    const t = Me;
    return Me = e,
    pn = e && e.type.__scopeId || null,
    t
}
function yi(e) {
    pn = e
}
function vi() {
    pn = null
}
function bi(e, t=Me, n) {
    if (!t || e._n)
        return e;
    const s = (...r) => {
        s._d && Bs(-1);
        const o = nn(t);
        let i;
        try {
            i = e(...r)
        } finally {
            nn(o),
            s._d && Bs(1)
        }
        return i
    }
    ;
    return s._n = !0,
    s._c = !0,
    s._d = !0,
    s
}
function wn(e) {
    const {type: t, vnode: n, proxy: s, withProxy: r, props: o, propsOptions: [i], slots: u, attrs: l, emit: h, render: a, renderCache: d, data: p, setupState: v, ctx: O, inheritAttrs: S} = e;
    let N, T;
    const F = nn(e);
    try {
        if (n.shapeFlag & 4) {
            const k = r || s
              , ee = k;
            N = Te(a.call(ee, k, d, o, v, p, O)),
            T = l
        } else {
            const k = t;
            N = Te(k.length > 1 ? k(o, {
                attrs: l,
                slots: u,
                emit: h
            }) : k(o, null)),
            T = t.props ? l : xi(l)
        }
    } catch (k) {
        Ot.length = 0,
        hn(k, e, 1),
        N = ge(Nt)
    }
    let j = N;
    if (T && S !== !1) {
        const k = Object.keys(T)
          , {shapeFlag: ee} = j;
        k.length && ee & 7 && (i && k.some(Gn) && (T = Ei(T, i)),
        j = mt(j, T))
    }
    return n.dirs && (j = mt(j),
    j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs),
    n.transition && (j.transition = n.transition),
    N = j,
    nn(F),
    N
}
const xi = e => {
    let t;
    for (const n in e)
        (n === "class" || n === "style" || on(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}
  , Ei = (e, t) => {
    const n = {};
    for (const s in e)
        (!Gn(s) || !(s.slice(9)in t)) && (n[s] = e[s]);
    return n
}
;
function wi(e, t, n) {
    const {props: s, children: r, component: o} = e
      , {props: i, children: u, patchFlag: l} = t
      , h = o.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && l >= 0) {
        if (l & 1024)
            return !0;
        if (l & 16)
            return s ? Ts(s, i, h) : !!i;
        if (l & 8) {
            const a = t.dynamicProps;
            for (let d = 0; d < a.length; d++) {
                const p = a[d];
                if (i[p] !== s[p] && !dn(h, p))
                    return !0
            }
        }
    } else
        return (r || u) && (!u || !u.$stable) ? !0 : s === i ? !1 : s ? i ? Ts(s, i, h) : !0 : !!i;
    return !1
}
function Ts(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length)
        return !0;
    for (let r = 0; r < s.length; r++) {
        const o = s[r];
        if (t[o] !== e[o] && !dn(n, o))
            return !0
    }
    return !1
}
function Ri({vnode: e, parent: t}, n) {
    for (; t; ) {
        const s = t.subTree;
        if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el),
        s === e)
            (e = t.vnode).el = n,
            t = t.parent;
        else
            break
    }
}
const Pi = Symbol.for("v-ndc")
  , Si = e => e.__isSuspense;
function Ci(e, t) {
    t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : gi(e)
}
const Ai = Symbol.for("v-scx")
  , Oi = () => $e(Ai)
  , qt = {};
function Yt(e, t, n) {
    return Wr(e, t, n)
}
function Wr(e, t, {immediate: n, deep: s, flush: r, once: o, onTrack: i, onTrigger: u}=J) {
    if (t && o) {
        const H = t;
        t = (...le) => {
            H(...le),
            ee()
        }
    }
    const l = ue
      , h = H => s === !0 ? H : ut(H, s === !1 ? 1 : void 0);
    let a, d = !1, p = !1;
    if (de(e) ? (a = () => e.value,
    d = tn(e)) : at(e) ? (a = () => h(e),
    d = !0) : B(e) ? (p = !0,
    d = e.some(H => at(H) || tn(H)),
    a = () => e.map(H => {
        if (de(H))
            return H.value;
        if (at(H))
            return h(H);
        if (U(H))
            return qe(H, l, 2)
    }
    )) : U(e) ? t ? a = () => qe(e, l, 2) : a = () => (v && v(),
    Ee(e, l, 3, [O])) : a = _e,
    t && s) {
        const H = a;
        a = () => ut(H())
    }
    let v, O = H => {
        v = j.onStop = () => {
            qe(H, l, 4),
            v = j.onStop = void 0
        }
    }
    , S;
    if (vn)
        if (O = _e,
        t ? n && Ee(t, l, 3, [a(), p ? [] : void 0, O]) : a(),
        r === "sync") {
            const H = Oi();
            S = H.__watcherHandles || (H.__watcherHandles = [])
        } else
            return _e;
    let N = p ? new Array(e.length).fill(qt) : qt;
    const T = () => {
        if (!(!j.active || !j.dirty))
            if (t) {
                const H = j.run();
                (s || d || (p ? H.some( (le, me) => Ge(le, N[me])) : Ge(H, N))) && (v && v(),
                Ee(t, l, 3, [H, N === qt ? void 0 : p && N[0] === qt ? [] : N, O]),
                N = H)
            } else
                j.run()
    }
    ;
    T.allowRecurse = !!t;
    let F;
    r === "sync" ? F = T : r === "post" ? F = () => ae(T, l && l.suspense) : (T.pre = !0,
    l && (T.id = l.uid),
    F = () => cs(T));
    const j = new Zn(a,_e,F)
      , k = Ko()
      , ee = () => {
        j.stop(),
        k && Yn(k.effects, j)
    }
    ;
    return t ? n ? T() : N = j.run() : r === "post" ? ae(j.run.bind(j), l && l.suspense) : j.run(),
    S && S.push(ee),
    ee
}
function Ti(e, t, n) {
    const s = this.proxy
      , r = re(e) ? e.includes(".") ? zr(s, e) : () => s[e] : e.bind(s, s);
    let o;
    U(t) ? o = t : (o = t.handler,
    n = t);
    const i = Ut(this)
      , u = Wr(r, o.bind(s), n);
    return i(),
    u
}
function zr(e, t) {
    const n = t.split(".");
    return () => {
        let s = e;
        for (let r = 0; r < n.length && s; r++)
            s = s[n[r]];
        return s
    }
}
function ut(e, t, n=0, s) {
    if (!Z(e) || e.__v_skip)
        return e;
    if (t && t > 0) {
        if (n >= t)
            return e;
        n++
    }
    if (s = s || new Set,
    s.has(e))
        return e;
    if (s.add(e),
    de(e))
        ut(e.value, t, n, s);
    else if (B(e))
        for (let r = 0; r < e.length; r++)
            ut(e[r], t, n, s);
    else if (Co(e) || Pt(e))
        e.forEach(r => {
            ut(r, t, n, s)
        }
        );
    else if (To(e))
        for (const r in e)
            ut(e[r], t, n, s);
    return e
}
function Xe(e, t, n, s) {
    const r = e.dirs
      , o = t && t.dirs;
    for (let i = 0; i < r.length; i++) {
        const u = r[i];
        o && (u.oldValue = o[i].value);
        let l = u.dir[s];
        l && (nt(),
        Ee(l, n, 8, [e.el, u, e, t]),
        st())
    }
}
/*! #__NO_SIDE_EFFECTS__ */
function qr(e, t) {
    return U(e) ? se({
        name: e.name
    }, t, {
        setup: e
    }) : e
}
const Qt = e => !!e.type.__asyncLoader
  , Gr = e => e.type.__isKeepAlive;
function Ii(e, t) {
    Yr(e, "a", t)
}
function Mi(e, t) {
    Yr(e, "da", t)
}
function Yr(e, t, n=ue) {
    const s = e.__wdc || (e.__wdc = () => {
        let r = n;
        for (; r; ) {
            if (r.isDeactivated)
                return;
            r = r.parent
        }
        return e()
    }
    );
    if (gn(t, s, n),
    n) {
        let r = n.parent;
        for (; r && r.parent; )
            Gr(r.parent.vnode) && Li(s, t, n, r),
            r = r.parent
    }
}
function Li(e, t, n, s) {
    const r = gn(t, e, s, !0);
    Qr( () => {
        Yn(s[t], r)
    }
    , n)
}
function gn(e, t, n=ue, s=!1) {
    if (n) {
        const r = n[e] || (n[e] = [])
          , o = t.__weh || (t.__weh = (...i) => {
            if (n.isUnmounted)
                return;
            nt();
            const u = Ut(n)
              , l = Ee(t, n, e, i);
            return u(),
            st(),
            l
        }
        );
        return s ? r.unshift(o) : r.push(o),
        o
    }
}
const je = e => (t, n=ue) => (!vn || e === "sp") && gn(e, (...s) => t(...s), n)
  , Fi = je("bm")
  , Ni = je("m")
  , $i = je("bu")
  , ji = je("u")
  , Hi = je("bum")
  , Qr = je("um")
  , Bi = je("sp")
  , Ui = je("rtg")
  , Vi = je("rtc");
function Ki(e, t=ue) {
    gn("ec", e, t)
}
const jn = e => e ? co(e) ? ds(e) || e.proxy : jn(e.parent) : null
  , Ct = se(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => jn(e.parent),
    $root: e => jn(e.root),
    $emit: e => e.emit,
    $options: e => us(e),
    $forceUpdate: e => e.f || (e.f = () => {
        e.effect.dirty = !0,
        cs(e.update)
    }
    ),
    $nextTick: e => e.n || (e.n = Ur.bind(e.proxy)),
    $watch: e => Ti.bind(e)
})
  , Rn = (e, t) => e !== J && !e.__isScriptSetup && K(e, t)
  , Di = {
    get({_: e}, t) {
        const {ctx: n, setupState: s, data: r, props: o, accessCache: i, type: u, appContext: l} = e;
        let h;
        if (t[0] !== "$") {
            const v = i[t];
            if (v !== void 0)
                switch (v) {
                case 1:
                    return s[t];
                case 2:
                    return r[t];
                case 4:
                    return n[t];
                case 3:
                    return o[t]
                }
            else {
                if (Rn(s, t))
                    return i[t] = 1,
                    s[t];
                if (r !== J && K(r, t))
                    return i[t] = 2,
                    r[t];
                if ((h = e.propsOptions[0]) && K(h, t))
                    return i[t] = 3,
                    o[t];
                if (n !== J && K(n, t))
                    return i[t] = 4,
                    n[t];
                Hn && (i[t] = 0)
            }
        }
        const a = Ct[t];
        let d, p;
        if (a)
            return t === "$attrs" && he(e, "get", t),
            a(e);
        if ((d = u.__cssModules) && (d = d[t]))
            return d;
        if (n !== J && K(n, t))
            return i[t] = 4,
            n[t];
        if (p = l.config.globalProperties,
        K(p, t))
            return p[t]
    },
    set({_: e}, t, n) {
        const {data: s, setupState: r, ctx: o} = e;
        return Rn(r, t) ? (r[t] = n,
        !0) : s !== J && K(s, t) ? (s[t] = n,
        !0) : K(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (o[t] = n,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o}}, i) {
        let u;
        return !!n[i] || e !== J && K(e, i) || Rn(t, i) || (u = o[0]) && K(u, i) || K(s, i) || K(Ct, i) || K(r.config.globalProperties, i)
    },
    defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : K(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
    }
};
function Is(e) {
    return B(e) ? e.reduce( (t, n) => (t[n] = null,
    t), {}) : e
}
let Hn = !0;
function ki(e) {
    const t = us(e)
      , n = e.proxy
      , s = e.ctx;
    Hn = !1,
    t.beforeCreate && Ms(t.beforeCreate, e, "bc");
    const {data: r, computed: o, methods: i, watch: u, provide: l, inject: h, created: a, beforeMount: d, mounted: p, beforeUpdate: v, updated: O, activated: S, deactivated: N, beforeDestroy: T, beforeUnmount: F, destroyed: j, unmounted: k, render: ee, renderTracked: H, renderTriggered: le, errorCaptured: me, serverPrefetch: Ye, expose: Re, inheritAttrs: He, components: Qe, directives: Pe, filters: bt} = t;
    if (h && Wi(h, s, null),
    i)
        for (const G in i) {
            const W = i[G];
            U(W) && (s[G] = W.bind(n))
        }
    if (r) {
        const G = r.call(n, n);
        Z(G) && (e.data = an(G))
    }
    if (Hn = !0,
    o)
        for (const G in o) {
            const W = o[G]
              , Le = U(W) ? W.bind(n, n) : U(W.get) ? W.get.bind(n, n) : _e
              , Be = !U(W) && U(W.set) ? W.set.bind(n) : _e
              , Se = be({
                get: Le,
                set: Be
            });
            Object.defineProperty(s, G, {
                enumerable: !0,
                configurable: !0,
                get: () => Se.value,
                set: fe => Se.value = fe
            })
        }
    if (u)
        for (const G in u)
            Xr(u[G], s, n, G);
    if (l) {
        const G = U(l) ? l.call(n) : l;
        Reflect.ownKeys(G).forEach(W => {
            Xt(W, G[W])
        }
        )
    }
    a && Ms(a, e, "c");
    function te(G, W) {
        B(W) ? W.forEach(Le => G(Le.bind(n))) : W && G(W.bind(n))
    }
    if (te(Fi, d),
    te(Ni, p),
    te($i, v),
    te(ji, O),
    te(Ii, S),
    te(Mi, N),
    te(Ki, me),
    te(Vi, H),
    te(Ui, le),
    te(Hi, F),
    te(Qr, k),
    te(Bi, Ye),
    B(Re))
        if (Re.length) {
            const G = e.exposed || (e.exposed = {});
            Re.forEach(W => {
                Object.defineProperty(G, W, {
                    get: () => n[W],
                    set: Le => n[W] = Le
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    ee && e.render === _e && (e.render = ee),
    He != null && (e.inheritAttrs = He),
    Qe && (e.components = Qe),
    Pe && (e.directives = Pe)
}
function Wi(e, t, n=_e) {
    B(e) && (e = Bn(e));
    for (const s in e) {
        const r = e[s];
        let o;
        Z(r) ? "default"in r ? o = $e(r.from || s, r.default, !0) : o = $e(r.from || s) : o = $e(r),
        de(o) ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: i => o.value = i
        }) : t[s] = o
    }
}
function Ms(e, t, n) {
    Ee(B(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Xr(e, t, n, s) {
    const r = s.includes(".") ? zr(n, s) : () => n[s];
    if (re(e)) {
        const o = t[e];
        U(o) && Yt(r, o)
    } else if (U(e))
        Yt(r, e.bind(n));
    else if (Z(e))
        if (B(e))
            e.forEach(o => Xr(o, t, n, s));
        else {
            const o = U(e.handler) ? e.handler.bind(n) : t[e.handler];
            U(o) && Yt(r, o, e)
        }
}
function us(e) {
    const t = e.type
      , {mixins: n, extends: s} = t
      , {mixins: r, optionsCache: o, config: {optionMergeStrategies: i}} = e.appContext
      , u = o.get(t);
    let l;
    return u ? l = u : !r.length && !n && !s ? l = t : (l = {},
    r.length && r.forEach(h => sn(l, h, i, !0)),
    sn(l, t, i)),
    Z(t) && o.set(t, l),
    l
}
function sn(e, t, n, s=!1) {
    const {mixins: r, extends: o} = t;
    o && sn(e, o, n, !0),
    r && r.forEach(i => sn(e, i, n, !0));
    for (const i in t)
        if (!(s && i === "expose")) {
            const u = zi[i] || n && n[i];
            e[i] = u ? u(e[i], t[i]) : t[i]
        }
    return e
}
const zi = {
    data: Ls,
    props: Fs,
    emits: Fs,
    methods: Rt,
    computed: Rt,
    beforeCreate: ce,
    created: ce,
    beforeMount: ce,
    mounted: ce,
    beforeUpdate: ce,
    updated: ce,
    beforeDestroy: ce,
    beforeUnmount: ce,
    destroyed: ce,
    unmounted: ce,
    activated: ce,
    deactivated: ce,
    errorCaptured: ce,
    serverPrefetch: ce,
    components: Rt,
    directives: Rt,
    watch: Gi,
    provide: Ls,
    inject: qi
};
function Ls(e, t) {
    return t ? e ? function() {
        return se(U(e) ? e.call(this, this) : e, U(t) ? t.call(this, this) : t)
    }
    : t : e
}
function qi(e, t) {
    return Rt(Bn(e), Bn(t))
}
function Bn(e) {
    if (B(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function ce(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function Rt(e, t) {
    return e ? se(Object.create(null), e, t) : t
}
function Fs(e, t) {
    return e ? B(e) && B(t) ? [...new Set([...e, ...t])] : se(Object.create(null), Is(e), Is(t ?? {})) : t
}
function Gi(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = se(Object.create(null), e);
    for (const s in t)
        n[s] = ce(e[s], t[s]);
    return n
}
function Jr() {
    return {
        app: null,
        config: {
            isNativeTag: Po,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Yi = 0;
function Qi(e, t) {
    return function(s, r=null) {
        U(s) || (s = se({}, s)),
        r != null && !Z(r) && (r = null);
        const o = Jr()
          , i = new WeakSet;
        let u = !1;
        const l = o.app = {
            _uid: Yi++,
            _component: s,
            _props: r,
            _container: null,
            _context: o,
            _instance: null,
            version: xl,
            get config() {
                return o.config
            },
            set config(h) {},
            use(h, ...a) {
                return i.has(h) || (h && U(h.install) ? (i.add(h),
                h.install(l, ...a)) : U(h) && (i.add(h),
                h(l, ...a))),
                l
            },
            mixin(h) {
                return o.mixins.includes(h) || o.mixins.push(h),
                l
            },
            component(h, a) {
                return a ? (o.components[h] = a,
                l) : o.components[h]
            },
            directive(h, a) {
                return a ? (o.directives[h] = a,
                l) : o.directives[h]
            },
            mount(h, a, d) {
                if (!u) {
                    const p = ge(s, r);
                    return p.appContext = o,
                    d === !0 ? d = "svg" : d === !1 && (d = void 0),
                    a && t ? t(p, h) : e(p, h, d),
                    u = !0,
                    l._container = h,
                    h.__vue_app__ = l,
                    ds(p.component) || p.component.proxy
                }
            },
            unmount() {
                u && (e(null, l._container),
                delete l._container.__vue_app__)
            },
            provide(h, a) {
                return o.provides[h] = a,
                l
            },
            runWithContext(h) {
                const a = At;
                At = l;
                try {
                    return h()
                } finally {
                    At = a
                }
            }
        };
        return l
    }
}
let At = null;
function Xt(e, t) {
    if (ue) {
        let n = ue.provides;
        const s = ue.parent && ue.parent.provides;
        s === n && (n = ue.provides = Object.create(s)),
        n[e] = t
    }
}
function $e(e, t, n=!1) {
    const s = ue || Me;
    if (s || At) {
        const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : At._context.provides;
        if (r && e in r)
            return r[e];
        if (arguments.length > 1)
            return n && U(t) ? t.call(s && s.proxy) : t
    }
}
function Xi(e, t, n, s=!1) {
    const r = {}
      , o = {};
    en(o, yn, 1),
    e.propsDefaults = Object.create(null),
    Zr(e, t, r, o);
    for (const i in e.propsOptions[0])
        i in r || (r[i] = void 0);
    n ? e.props = s ? r : Ir(r) : e.type.props ? e.props = r : e.props = o,
    e.attrs = o
}
function Ji(e, t, n, s) {
    const {props: r, attrs: o, vnode: {patchFlag: i}} = e
      , u = D(r)
      , [l] = e.propsOptions;
    let h = !1;
    if ((s || i > 0) && !(i & 16)) {
        if (i & 8) {
            const a = e.vnode.dynamicProps;
            for (let d = 0; d < a.length; d++) {
                let p = a[d];
                if (dn(e.emitsOptions, p))
                    continue;
                const v = t[p];
                if (l)
                    if (K(o, p))
                        v !== o[p] && (o[p] = v,
                        h = !0);
                    else {
                        const O = pt(p);
                        r[O] = Un(l, u, O, v, e, !1)
                    }
                else
                    v !== o[p] && (o[p] = v,
                    h = !0)
            }
        }
    } else {
        Zr(e, t, r, o) && (h = !0);
        let a;
        for (const d in u)
            (!t || !K(t, d) && ((a = vt(d)) === d || !K(t, a))) && (l ? n && (n[d] !== void 0 || n[a] !== void 0) && (r[d] = Un(l, u, d, void 0, e, !0)) : delete r[d]);
        if (o !== u)
            for (const d in o)
                (!t || !K(t, d)) && (delete o[d],
                h = !0)
    }
    h && Ne(e, "set", "$attrs")
}
function Zr(e, t, n, s) {
    const [r,o] = e.propsOptions;
    let i = !1, u;
    if (t)
        for (let l in t) {
            if (St(l))
                continue;
            const h = t[l];
            let a;
            r && K(r, a = pt(l)) ? !o || !o.includes(a) ? n[a] = h : (u || (u = {}))[a] = h : dn(e.emitsOptions, l) || (!(l in s) || h !== s[l]) && (s[l] = h,
            i = !0)
        }
    if (o) {
        const l = D(n)
          , h = u || J;
        for (let a = 0; a < o.length; a++) {
            const d = o[a];
            n[d] = Un(r, l, d, h[d], e, !K(h, d))
        }
    }
    return i
}
function Un(e, t, n, s, r, o) {
    const i = e[n];
    if (i != null) {
        const u = K(i, "default");
        if (u && s === void 0) {
            const l = i.default;
            if (i.type !== Function && !i.skipFactory && U(l)) {
                const {propsDefaults: h} = r;
                if (n in h)
                    s = h[n];
                else {
                    const a = Ut(r);
                    s = h[n] = l.call(null, t),
                    a()
                }
            } else
                s = l
        }
        i[0] && (o && !u ? s = !1 : i[1] && (s === "" || s === vt(n)) && (s = !0))
    }
    return s
}
function eo(e, t, n=!1) {
    const s = t.propsCache
      , r = s.get(e);
    if (r)
        return r;
    const o = e.props
      , i = {}
      , u = [];
    let l = !1;
    if (!U(e)) {
        const a = d => {
            l = !0;
            const [p,v] = eo(d, t, !0);
            se(i, p),
            v && u.push(...v)
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(a),
        e.extends && a(e.extends),
        e.mixins && e.mixins.forEach(a)
    }
    if (!o && !l)
        return Z(e) && s.set(e, ft),
        ft;
    if (B(o))
        for (let a = 0; a < o.length; a++) {
            const d = pt(o[a]);
            Ns(d) && (i[d] = J)
        }
    else if (o)
        for (const a in o) {
            const d = pt(a);
            if (Ns(d)) {
                const p = o[a]
                  , v = i[d] = B(p) || U(p) ? {
                    type: p
                } : se({}, p);
                if (v) {
                    const O = Hs(Boolean, v.type)
                      , S = Hs(String, v.type);
                    v[0] = O > -1,
                    v[1] = S < 0 || O < S,
                    (O > -1 || K(v, "default")) && u.push(d)
                }
            }
        }
    const h = [i, u];
    return Z(e) && s.set(e, h),
    h
}
function Ns(e) {
    return e[0] !== "$" && !St(e)
}
function $s(e) {
    return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || ""
}
function js(e, t) {
    return $s(e) === $s(t)
}
function Hs(e, t) {
    return B(t) ? t.findIndex(n => js(n, e)) : U(t) && js(t, e) ? 0 : -1
}
const to = e => e[0] === "_" || e === "$stable"
  , fs = e => B(e) ? e.map(Te) : [Te(e)]
  , Zi = (e, t, n) => {
    if (t._n)
        return t;
    const s = bi( (...r) => fs(t(...r)), n);
    return s._c = !1,
    s
}
  , no = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
        if (to(r))
            continue;
        const o = e[r];
        if (U(o))
            t[r] = Zi(r, o, s);
        else if (o != null) {
            const i = fs(o);
            t[r] = () => i
        }
    }
}
  , so = (e, t) => {
    const n = fs(t);
    e.slots.default = () => n
}
  , el = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = D(t),
        en(t, "_", n)) : no(t, e.slots = {})
    } else
        e.slots = {},
        t && so(e, t);
    en(e.slots, yn, 1)
}
  , tl = (e, t, n) => {
    const {vnode: s, slots: r} = e;
    let o = !0
      , i = J;
    if (s.shapeFlag & 32) {
        const u = t._;
        u ? n && u === 1 ? o = !1 : (se(r, t),
        !n && u === 1 && delete r._) : (o = !t.$stable,
        no(t, r)),
        i = t
    } else
        t && (so(e, t),
        i = {
            default: 1
        });
    if (o)
        for (const u in r)
            !to(u) && i[u] == null && delete r[u]
}
;
function Vn(e, t, n, s, r=!1) {
    if (B(e)) {
        e.forEach( (p, v) => Vn(p, t && (B(t) ? t[v] : t), n, s, r));
        return
    }
    if (Qt(s) && !r)
        return;
    const o = s.shapeFlag & 4 ? ds(s.component) || s.component.proxy : s.el
      , i = r ? null : o
      , {i: u, r: l} = e
      , h = t && t.r
      , a = u.refs === J ? u.refs = {} : u.refs
      , d = u.setupState;
    if (h != null && h !== l && (re(h) ? (a[h] = null,
    K(d, h) && (d[h] = null)) : de(h) && (h.value = null)),
    U(l))
        qe(l, u, 12, [i, a]);
    else {
        const p = re(l)
          , v = de(l);
        if (p || v) {
            const O = () => {
                if (e.f) {
                    const S = p ? K(d, l) ? d[l] : a[l] : l.value;
                    r ? B(S) && Yn(S, o) : B(S) ? S.includes(o) || S.push(o) : p ? (a[l] = [o],
                    K(d, l) && (d[l] = a[l])) : (l.value = [o],
                    e.k && (a[e.k] = l.value))
                } else
                    p ? (a[l] = i,
                    K(d, l) && (d[l] = i)) : v && (l.value = i,
                    e.k && (a[e.k] = i))
            }
            ;
            i ? (O.id = -1,
            ae(O, n)) : O()
        }
    }
}
const ae = Ci;
function nl(e) {
    return sl(e)
}
function sl(e, t) {
    const n = _r();
    n.__VUE__ = !0;
    const {insert: s, remove: r, patchProp: o, createElement: i, createText: u, createComment: l, setText: h, setElementText: a, parentNode: d, nextSibling: p, setScopeId: v=_e, insertStaticContent: O} = e
      , S = (c, f, g, y=null, m=null, E=null, P=void 0, x=null, w=!!f.dynamicChildren) => {
        if (c === f)
            return;
        c && !Et(c, f) && (y = _(c),
        fe(c, m, E, !0),
        c = null),
        f.patchFlag === -2 && (w = !1,
        f.dynamicChildren = null);
        const {type: b, ref: A, shapeFlag: L} = f;
        switch (b) {
        case mn:
            N(c, f, g, y);
            break;
        case Nt:
            T(c, f, g, y);
            break;
        case Sn:
            c == null && F(f, g, y, P);
            break;
        case Oe:
            Qe(c, f, g, y, m, E, P, x, w);
            break;
        default:
            L & 1 ? ee(c, f, g, y, m, E, P, x, w) : L & 6 ? Pe(c, f, g, y, m, E, P, x, w) : (L & 64 || L & 128) && b.process(c, f, g, y, m, E, P, x, w, I)
        }
        A != null && m && Vn(A, c && c.ref, E, f || c, !f)
    }
      , N = (c, f, g, y) => {
        if (c == null)
            s(f.el = u(f.children), g, y);
        else {
            const m = f.el = c.el;
            f.children !== c.children && h(m, f.children)
        }
    }
      , T = (c, f, g, y) => {
        c == null ? s(f.el = l(f.children || ""), g, y) : f.el = c.el
    }
      , F = (c, f, g, y) => {
        [c.el,c.anchor] = O(c.children, f, g, y, c.el, c.anchor)
    }
      , j = ({el: c, anchor: f}, g, y) => {
        let m;
        for (; c && c !== f; )
            m = p(c),
            s(c, g, y),
            c = m;
        s(f, g, y)
    }
      , k = ({el: c, anchor: f}) => {
        let g;
        for (; c && c !== f; )
            g = p(c),
            r(c),
            c = g;
        r(f)
    }
      , ee = (c, f, g, y, m, E, P, x, w) => {
        f.type === "svg" ? P = "svg" : f.type === "math" && (P = "mathml"),
        c == null ? H(f, g, y, m, E, P, x, w) : Ye(c, f, m, E, P, x, w)
    }
      , H = (c, f, g, y, m, E, P, x) => {
        let w, b;
        const {props: A, shapeFlag: L, transition: M, dirs: $} = c;
        if (w = c.el = i(c.type, E, A && A.is, A),
        L & 8 ? a(w, c.children) : L & 16 && me(c.children, w, null, y, m, Pn(c, E), P, x),
        $ && Xe(c, null, y, "created"),
        le(w, c, c.scopeId, P, y),
        A) {
            for (const Y in A)
                Y !== "value" && !St(Y) && o(w, Y, null, A[Y], E, c.children, y, m, oe);
            "value"in A && o(w, "value", null, A.value, E),
            (b = A.onVnodeBeforeMount) && Ae(b, y, c)
        }
        $ && Xe(c, null, y, "beforeMount");
        const V = rl(m, M);
        V && M.beforeEnter(w),
        s(w, f, g),
        ((b = A && A.onVnodeMounted) || V || $) && ae( () => {
            b && Ae(b, y, c),
            V && M.enter(w),
            $ && Xe(c, null, y, "mounted")
        }
        , m)
    }
      , le = (c, f, g, y, m) => {
        if (g && v(c, g),
        y)
            for (let E = 0; E < y.length; E++)
                v(c, y[E]);
        if (m) {
            let E = m.subTree;
            if (f === E) {
                const P = m.vnode;
                le(c, P, P.scopeId, P.slotScopeIds, m.parent)
            }
        }
    }
      , me = (c, f, g, y, m, E, P, x, w=0) => {
        for (let b = w; b < c.length; b++) {
            const A = c[b] = x ? De(c[b]) : Te(c[b]);
            S(null, A, f, g, y, m, E, P, x)
        }
    }
      , Ye = (c, f, g, y, m, E, P) => {
        const x = f.el = c.el;
        let {patchFlag: w, dynamicChildren: b, dirs: A} = f;
        w |= c.patchFlag & 16;
        const L = c.props || J
          , M = f.props || J;
        let $;
        if (g && Je(g, !1),
        ($ = M.onVnodeBeforeUpdate) && Ae($, g, f, c),
        A && Xe(f, c, g, "beforeUpdate"),
        g && Je(g, !0),
        b ? Re(c.dynamicChildren, b, x, g, y, Pn(f, m), E) : P || W(c, f, x, null, g, y, Pn(f, m), E, !1),
        w > 0) {
            if (w & 16)
                He(x, f, L, M, g, y, m);
            else if (w & 2 && L.class !== M.class && o(x, "class", null, M.class, m),
            w & 4 && o(x, "style", L.style, M.style, m),
            w & 8) {
                const V = f.dynamicProps;
                for (let Y = 0; Y < V.length; Y++) {
                    const X = V[Y]
                      , ne = L[X]
                      , ye = M[X];
                    (ye !== ne || X === "value") && o(x, X, ne, ye, m, c.children, g, y, oe)
                }
            }
            w & 1 && c.children !== f.children && a(x, f.children)
        } else
            !P && b == null && He(x, f, L, M, g, y, m);
        (($ = M.onVnodeUpdated) || A) && ae( () => {
            $ && Ae($, g, f, c),
            A && Xe(f, c, g, "updated")
        }
        , y)
    }
      , Re = (c, f, g, y, m, E, P) => {
        for (let x = 0; x < f.length; x++) {
            const w = c[x]
              , b = f[x]
              , A = w.el && (w.type === Oe || !Et(w, b) || w.shapeFlag & 70) ? d(w.el) : g;
            S(w, b, A, null, y, m, E, P, !0)
        }
    }
      , He = (c, f, g, y, m, E, P) => {
        if (g !== y) {
            if (g !== J)
                for (const x in g)
                    !St(x) && !(x in y) && o(c, x, g[x], null, P, f.children, m, E, oe);
            for (const x in y) {
                if (St(x))
                    continue;
                const w = y[x]
                  , b = g[x];
                w !== b && x !== "value" && o(c, x, b, w, P, f.children, m, E, oe)
            }
            "value"in y && o(c, "value", g.value, y.value, P)
        }
    }
      , Qe = (c, f, g, y, m, E, P, x, w) => {
        const b = f.el = c ? c.el : u("")
          , A = f.anchor = c ? c.anchor : u("");
        let {patchFlag: L, dynamicChildren: M, slotScopeIds: $} = f;
        $ && (x = x ? x.concat($) : $),
        c == null ? (s(b, g, y),
        s(A, g, y),
        me(f.children || [], g, A, m, E, P, x, w)) : L > 0 && L & 64 && M && c.dynamicChildren ? (Re(c.dynamicChildren, M, g, m, E, P, x),
        (f.key != null || m && f === m.subTree) && ro(c, f, !0)) : W(c, f, g, A, m, E, P, x, w)
    }
      , Pe = (c, f, g, y, m, E, P, x, w) => {
        f.slotScopeIds = x,
        c == null ? f.shapeFlag & 512 ? m.ctx.activate(f, g, y, P, w) : bt(f, g, y, m, E, P, w) : rt(c, f, w)
    }
      , bt = (c, f, g, y, m, E, P) => {
        const x = c.component = gl(c, y, m);
        if (Gr(c) && (x.ctx.renderer = I),
        ml(x),
        x.asyncDep) {
            if (m && m.registerDep(x, te),
            !c.el) {
                const w = x.subTree = ge(Nt);
                T(null, w, f, g)
            }
        } else
            te(x, c, f, g, m, E, P)
    }
      , rt = (c, f, g) => {
        const y = f.component = c.component;
        if (wi(c, f, g))
            if (y.asyncDep && !y.asyncResolved) {
                G(y, f, g);
                return
            } else
                y.next = f,
                pi(y.update),
                y.effect.dirty = !0,
                y.update();
        else
            f.el = c.el,
            y.vnode = f
    }
      , te = (c, f, g, y, m, E, P) => {
        const x = () => {
            if (c.isMounted) {
                let {next: A, bu: L, u: M, parent: $, vnode: V} = c;
                {
                    const lt = oo(c);
                    if (lt) {
                        A && (A.el = V.el,
                        G(c, A, P)),
                        lt.asyncDep.then( () => {
                            c.isUnmounted || x()
                        }
                        );
                        return
                    }
                }
                let Y = A, X;
                Je(c, !1),
                A ? (A.el = V.el,
                G(c, A, P)) : A = V,
                L && En(L),
                (X = A.props && A.props.onVnodeBeforeUpdate) && Ae(X, $, A, V),
                Je(c, !0);
                const ne = wn(c)
                  , ye = c.subTree;
                c.subTree = ne,
                S(ye, ne, d(ye.el), _(ye), c, m, E),
                A.el = ne.el,
                Y === null && Ri(c, ne.el),
                M && ae(M, m),
                (X = A.props && A.props.onVnodeUpdated) && ae( () => Ae(X, $, A, V), m)
            } else {
                let A;
                const {el: L, props: M} = f
                  , {bm: $, m: V, parent: Y} = c
                  , X = Qt(f);
                if (Je(c, !1),
                $ && En($),
                !X && (A = M && M.onVnodeBeforeMount) && Ae(A, Y, f),
                Je(c, !0),
                L && Q) {
                    const ne = () => {
                        c.subTree = wn(c),
                        Q(L, c.subTree, c, m, null)
                    }
                    ;
                    X ? f.type.__asyncLoader().then( () => !c.isUnmounted && ne()) : ne()
                } else {
                    const ne = c.subTree = wn(c);
                    S(null, ne, g, y, c, m, E),
                    f.el = ne.el
                }
                if (V && ae(V, m),
                !X && (A = M && M.onVnodeMounted)) {
                    const ne = f;
                    ae( () => Ae(A, Y, ne), m)
                }
                (f.shapeFlag & 256 || Y && Qt(Y.vnode) && Y.vnode.shapeFlag & 256) && c.a && ae(c.a, m),
                c.isMounted = !0,
                f = g = y = null
            }
        }
          , w = c.effect = new Zn(x,_e, () => cs(b),c.scope)
          , b = c.update = () => {
            w.dirty && w.run()
        }
        ;
        b.id = c.uid,
        Je(c, !0),
        b()
    }
      , G = (c, f, g) => {
        f.component = c;
        const y = c.vnode.props;
        c.vnode = f,
        c.next = null,
        Ji(c, f.props, y, g),
        tl(c, f.children, g),
        nt(),
        Os(c),
        st()
    }
      , W = (c, f, g, y, m, E, P, x, w=!1) => {
        const b = c && c.children
          , A = c ? c.shapeFlag : 0
          , L = f.children
          , {patchFlag: M, shapeFlag: $} = f;
        if (M > 0) {
            if (M & 128) {
                Be(b, L, g, y, m, E, P, x, w);
                return
            } else if (M & 256) {
                Le(b, L, g, y, m, E, P, x, w);
                return
            }
        }
        $ & 8 ? (A & 16 && oe(b, m, E),
        L !== b && a(g, L)) : A & 16 ? $ & 16 ? Be(b, L, g, y, m, E, P, x, w) : oe(b, m, E, !0) : (A & 8 && a(g, ""),
        $ & 16 && me(L, g, y, m, E, P, x, w))
    }
      , Le = (c, f, g, y, m, E, P, x, w) => {
        c = c || ft,
        f = f || ft;
        const b = c.length
          , A = f.length
          , L = Math.min(b, A);
        let M;
        for (M = 0; M < L; M++) {
            const $ = f[M] = w ? De(f[M]) : Te(f[M]);
            S(c[M], $, g, null, m, E, P, x, w)
        }
        b > A ? oe(c, m, E, !0, !1, L) : me(f, g, y, m, E, P, x, w, L)
    }
      , Be = (c, f, g, y, m, E, P, x, w) => {
        let b = 0;
        const A = f.length;
        let L = c.length - 1
          , M = A - 1;
        for (; b <= L && b <= M; ) {
            const $ = c[b]
              , V = f[b] = w ? De(f[b]) : Te(f[b]);
            if (Et($, V))
                S($, V, g, null, m, E, P, x, w);
            else
                break;
            b++
        }
        for (; b <= L && b <= M; ) {
            const $ = c[L]
              , V = f[M] = w ? De(f[M]) : Te(f[M]);
            if (Et($, V))
                S($, V, g, null, m, E, P, x, w);
            else
                break;
            L--,
            M--
        }
        if (b > L) {
            if (b <= M) {
                const $ = M + 1
                  , V = $ < A ? f[$].el : y;
                for (; b <= M; )
                    S(null, f[b] = w ? De(f[b]) : Te(f[b]), g, V, m, E, P, x, w),
                    b++
            }
        } else if (b > M)
            for (; b <= L; )
                fe(c[b], m, E, !0),
                b++;
        else {
            const $ = b
              , V = b
              , Y = new Map;
            for (b = V; b <= M; b++) {
                const pe = f[b] = w ? De(f[b]) : Te(f[b]);
                pe.key != null && Y.set(pe.key, b)
            }
            let X, ne = 0;
            const ye = M - V + 1;
            let lt = !1
              , ys = 0;
            const xt = new Array(ye);
            for (b = 0; b < ye; b++)
                xt[b] = 0;
            for (b = $; b <= L; b++) {
                const pe = c[b];
                if (ne >= ye) {
                    fe(pe, m, E, !0);
                    continue
                }
                let Ce;
                if (pe.key != null)
                    Ce = Y.get(pe.key);
                else
                    for (X = V; X <= M; X++)
                        if (xt[X - V] === 0 && Et(pe, f[X])) {
                            Ce = X;
                            break
                        }
                Ce === void 0 ? fe(pe, m, E, !0) : (xt[Ce - V] = b + 1,
                Ce >= ys ? ys = Ce : lt = !0,
                S(pe, f[Ce], g, null, m, E, P, x, w),
                ne++)
            }
            const vs = lt ? ol(xt) : ft;
            for (X = vs.length - 1,
            b = ye - 1; b >= 0; b--) {
                const pe = V + b
                  , Ce = f[pe]
                  , bs = pe + 1 < A ? f[pe + 1].el : y;
                xt[b] === 0 ? S(null, Ce, g, bs, m, E, P, x, w) : lt && (X < 0 || b !== vs[X] ? Se(Ce, g, bs, 2) : X--)
            }
        }
    }
      , Se = (c, f, g, y, m=null) => {
        const {el: E, type: P, transition: x, children: w, shapeFlag: b} = c;
        if (b & 6) {
            Se(c.component.subTree, f, g, y);
            return
        }
        if (b & 128) {
            c.suspense.move(f, g, y);
            return
        }
        if (b & 64) {
            P.move(c, f, g, I);
            return
        }
        if (P === Oe) {
            s(E, f, g);
            for (let L = 0; L < w.length; L++)
                Se(w[L], f, g, y);
            s(c.anchor, f, g);
            return
        }
        if (P === Sn) {
            j(c, f, g);
            return
        }
        if (y !== 2 && b & 1 && x)
            if (y === 0)
                x.beforeEnter(E),
                s(E, f, g),
                ae( () => x.enter(E), m);
            else {
                const {leave: L, delayLeave: M, afterLeave: $} = x
                  , V = () => s(E, f, g)
                  , Y = () => {
                    L(E, () => {
                        V(),
                        $ && $()
                    }
                    )
                }
                ;
                M ? M(E, V, Y) : Y()
            }
        else
            s(E, f, g)
    }
      , fe = (c, f, g, y=!1, m=!1) => {
        const {type: E, props: P, ref: x, children: w, dynamicChildren: b, shapeFlag: A, patchFlag: L, dirs: M} = c;
        if (x != null && Vn(x, null, g, c, !0),
        A & 256) {
            f.ctx.deactivate(c);
            return
        }
        const $ = A & 1 && M
          , V = !Qt(c);
        let Y;
        if (V && (Y = P && P.onVnodeBeforeUnmount) && Ae(Y, f, c),
        A & 6)
            Vt(c.component, g, y);
        else {
            if (A & 128) {
                c.suspense.unmount(g, y);
                return
            }
            $ && Xe(c, null, f, "beforeUnmount"),
            A & 64 ? c.type.remove(c, f, g, m, I, y) : b && (E !== Oe || L > 0 && L & 64) ? oe(b, f, g, !1, !0) : (E === Oe && L & 384 || !m && A & 16) && oe(w, f, g),
            y && ot(c)
        }
        (V && (Y = P && P.onVnodeUnmounted) || $) && ae( () => {
            Y && Ae(Y, f, c),
            $ && Xe(c, null, f, "unmounted")
        }
        , g)
    }
      , ot = c => {
        const {type: f, el: g, anchor: y, transition: m} = c;
        if (f === Oe) {
            it(g, y);
            return
        }
        if (f === Sn) {
            k(c);
            return
        }
        const E = () => {
            r(g),
            m && !m.persisted && m.afterLeave && m.afterLeave()
        }
        ;
        if (c.shapeFlag & 1 && m && !m.persisted) {
            const {leave: P, delayLeave: x} = m
              , w = () => P(g, E);
            x ? x(c.el, E, w) : w()
        } else
            E()
    }
      , it = (c, f) => {
        let g;
        for (; c !== f; )
            g = p(c),
            r(c),
            c = g;
        r(f)
    }
      , Vt = (c, f, g) => {
        const {bum: y, scope: m, update: E, subTree: P, um: x} = c;
        y && En(y),
        m.stop(),
        E && (E.active = !1,
        fe(P, c, f, g)),
        x && ae(x, f),
        ae( () => {
            c.isUnmounted = !0
        }
        , f),
        f && f.pendingBranch && !f.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === f.pendingId && (f.deps--,
        f.deps === 0 && f.resolve())
    }
      , oe = (c, f, g, y=!1, m=!1, E=0) => {
        for (let P = E; P < c.length; P++)
            fe(c[P], f, g, y, m)
    }
      , _ = c => c.shapeFlag & 6 ? _(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : p(c.anchor || c.el);
    let C = !1;
    const R = (c, f, g) => {
        c == null ? f._vnode && fe(f._vnode, null, null, !0) : S(f._vnode || null, c, f, null, null, null, g),
        C || (C = !0,
        Os(),
        Kr(),
        C = !1),
        f._vnode = c
    }
      , I = {
        p: S,
        um: fe,
        m: Se,
        r: ot,
        mt: bt,
        mc: me,
        pc: W,
        pbc: Re,
        n: _,
        o: e
    };
    let z, Q;
    return t && ([z,Q] = t(I)),
    {
        render: R,
        hydrate: z,
        createApp: Qi(R, z)
    }
}
function Pn({type: e, props: t}, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n
}
function Je({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function rl(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}
function ro(e, t, n=!1) {
    const s = e.children
      , r = t.children;
    if (B(s) && B(r))
        for (let o = 0; o < s.length; o++) {
            const i = s[o];
            let u = r[o];
            u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = r[o] = De(r[o]),
            u.el = i.el),
            n || ro(i, u)),
            u.type === mn && (u.el = i.el)
        }
}
function ol(e) {
    const t = e.slice()
      , n = [0];
    let s, r, o, i, u;
    const l = e.length;
    for (s = 0; s < l; s++) {
        const h = e[s];
        if (h !== 0) {
            if (r = n[n.length - 1],
            e[r] < h) {
                t[s] = r,
                n.push(s);
                continue
            }
            for (o = 0,
            i = n.length - 1; o < i; )
                u = o + i >> 1,
                e[n[u]] < h ? o = u + 1 : i = u;
            h < e[n[o]] && (o > 0 && (t[s] = n[o - 1]),
            n[o] = s)
        }
    }
    for (o = n.length,
    i = n[o - 1]; o-- > 0; )
        n[o] = i,
        i = t[i];
    return n
}
function oo(e) {
    const t = e.subTree.component;
    if (t)
        return t.asyncDep && !t.asyncResolved ? t : oo(t)
}
const il = e => e.__isTeleport
  , Oe = Symbol.for("v-fgt")
  , mn = Symbol.for("v-txt")
  , Nt = Symbol.for("v-cmt")
  , Sn = Symbol.for("v-stc")
  , Ot = [];
let xe = null;
function _n(e=!1) {
    Ot.push(xe = e ? null : [])
}
function ll() {
    Ot.pop(),
    xe = Ot[Ot.length - 1] || null
}
let $t = 1;
function Bs(e) {
    $t += e
}
function io(e) {
    return e.dynamicChildren = $t > 0 ? xe || ft : null,
    ll(),
    $t > 0 && xe && xe.push(e),
    e
}
function as(e, t, n, s, r, o) {
    return io(Bt(e, t, n, s, r, o, !0))
}
function cl(e, t, n, s, r) {
    return io(ge(e, t, n, s, r, !0))
}
function Kn(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function Et(e, t) {
    return e.type === t.type && e.key === t.key
}
const yn = "__vInternal"
  , lo = ({key: e}) => e ?? null
  , Jt = ({ref: e, ref_key: t, ref_for: n}) => (typeof e == "number" && (e = "" + e),
e != null ? re(e) || de(e) || U(e) ? {
    i: Me,
    r: e,
    k: t,
    f: !!n
} : e : null);
function Bt(e, t=null, n=null, s=0, r=null, o=e === Oe ? 0 : 1, i=!1, u=!1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && lo(t),
        ref: t && Jt(t),
        scopeId: pn,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: s,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
        ctx: Me
    };
    return u ? (hs(l, n),
    o & 128 && e.normalize(l)) : n && (l.shapeFlag |= re(n) ? 8 : 16),
    $t > 0 && !i && xe && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 && xe.push(l),
    l
}
const ge = ul;
function ul(e, t=null, n=null, s=0, r=null, o=!1) {
    if ((!e || e === Pi) && (e = Nt),
    Kn(e)) {
        const u = mt(e, t, !0);
        return n && hs(u, n),
        $t > 0 && !o && xe && (u.shapeFlag & 6 ? xe[xe.indexOf(e)] = u : xe.push(u)),
        u.patchFlag |= -2,
        u
    }
    if (bl(e) && (e = e.__vccOpts),
    t) {
        t = fl(t);
        let {class: u, style: l} = t;
        u && !re(u) && (t.class = Jn(u)),
        Z(l) && (Lr(l) && !B(l) && (l = se({}, l)),
        t.style = Xn(l))
    }
    const i = re(e) ? 1 : Si(e) ? 128 : il(e) ? 64 : Z(e) ? 4 : U(e) ? 2 : 0;
    return Bt(e, t, n, s, r, i, o, !0)
}
function fl(e) {
    return e ? Lr(e) || yn in e ? se({}, e) : e : null
}
function mt(e, t, n=!1) {
    const {props: s, ref: r, patchFlag: o, children: i} = e
      , u = t ? hl(s || {}, t) : s;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: u,
        key: u && lo(u),
        ref: t && t.ref ? n && r ? B(r) ? r.concat(Jt(t)) : [r, Jt(t)] : Jt(t) : r,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Oe ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && mt(e.ssContent),
        ssFallback: e.ssFallback && mt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}
function al(e=" ", t=0) {
    return ge(mn, null, e, t)
}
function Te(e) {
    return e == null || typeof e == "boolean" ? ge(Nt) : B(e) ? ge(Oe, null, e.slice()) : typeof e == "object" ? De(e) : ge(mn, null, String(e))
}
function De(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : mt(e)
}
function hs(e, t) {
    let n = 0;
    const {shapeFlag: s} = e;
    if (t == null)
        t = null;
    else if (B(t))
        n = 16;
    else if (typeof t == "object")
        if (s & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1),
            hs(e, r()),
            r._c && (r._d = !0));
            return
        } else {
            n = 32;
            const r = t._;
            !r && !(yn in t) ? t._ctx = Me : r === 3 && Me && (Me.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        U(t) ? (t = {
            default: t,
            _ctx: Me
        },
        n = 32) : (t = String(t),
        s & 64 ? (n = 16,
        t = [al(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function hl(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === "class")
                t.class !== s.class && (t.class = Jn([t.class, s.class]));
            else if (r === "style")
                t.style = Xn([t.style, s.style]);
            else if (on(r)) {
                const o = t[r]
                  , i = s[r];
                i && o !== i && !(B(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i)
            } else
                r !== "" && (t[r] = s[r])
    }
    return t
}
function Ae(e, t, n, s=null) {
    Ee(e, t, 7, [n, s])
}
const dl = Jr();
let pl = 0;
function gl(e, t, n) {
    const s = e.type
      , r = (t ? t.appContext : e.appContext) || dl
      , o = {
        uid: pl++,
        vnode: e,
        type: s,
        parent: t,
        appContext: r,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new vr(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(r.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: eo(s, r),
        emitsOptions: kr(s, r),
        emit: null,
        emitted: null,
        propsDefaults: J,
        inheritAttrs: s.inheritAttrs,
        ctx: J,
        data: J,
        props: J,
        attrs: J,
        slots: J,
        refs: J,
        setupState: J,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return o.ctx = {
        _: o
    },
    o.root = t ? t.root : o,
    o.emit = _i.bind(null, o),
    e.ce && e.ce(o),
    o
}
let ue = null, rn, Dn;
{
    const e = _r()
      , t = (n, s) => {
        let r;
        return (r = e[n]) || (r = e[n] = []),
        r.push(s),
        o => {
            r.length > 1 ? r.forEach(i => i(o)) : r[0](o)
        }
    }
    ;
    rn = t("__VUE_INSTANCE_SETTERS__", n => ue = n),
    Dn = t("__VUE_SSR_SETTERS__", n => vn = n)
}
const Ut = e => {
    const t = ue;
    return rn(e),
    e.scope.on(),
    () => {
        e.scope.off(),
        rn(t)
    }
}
  , Us = () => {
    ue && ue.scope.off(),
    rn(null)
}
;
function co(e) {
    return e.vnode.shapeFlag & 4
}
let vn = !1;
function ml(e, t=!1) {
    t && Dn(t);
    const {props: n, children: s} = e.vnode
      , r = co(e);
    Xi(e, n, r, t),
    el(e, s);
    const o = r ? _l(e, t) : void 0;
    return t && Dn(!1),
    o
}
function _l(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = os(new Proxy(e.ctx,Di));
    const {setup: s} = n;
    if (s) {
        const r = e.setupContext = s.length > 1 ? vl(e) : null
          , o = Ut(e);
        nt();
        const i = qe(s, e, 0, [e.props, r]);
        if (st(),
        o(),
        gr(i)) {
            if (i.then(Us, Us),
            t)
                return i.then(u => {
                    Vs(e, u, t)
                }
                ).catch(u => {
                    hn(u, e, 0)
                }
                );
            e.asyncDep = i
        } else
            Vs(e, i, t)
    } else
        uo(e, t)
}
function Vs(e, t, n) {
    U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Z(t) && (e.setupState = Hr(t)),
    uo(e, n)
}
let Ks;
function uo(e, t, n) {
    const s = e.type;
    if (!e.render) {
        if (!t && Ks && !s.render) {
            const r = s.template || us(e).template;
            if (r) {
                const {isCustomElement: o, compilerOptions: i} = e.appContext.config
                  , {delimiters: u, compilerOptions: l} = s
                  , h = se(se({
                    isCustomElement: o,
                    delimiters: u
                }, i), l);
                s.render = Ks(r, h)
            }
        }
        e.render = s.render || _e
    }
    {
        const r = Ut(e);
        nt();
        try {
            ki(e)
        } finally {
            st(),
            r()
        }
    }
}
function yl(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs,{
        get(t, n) {
            return he(e, "get", "$attrs"),
            t[n]
        }
    }))
}
function vl(e) {
    const t = n => {
        e.exposed = n || {}
    }
    ;
    return {
        get attrs() {
            return yl(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function ds(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(Hr(os(e.exposed)),{
            get(t, n) {
                if (n in t)
                    return t[n];
                if (n in Ct)
                    return Ct[n](e)
            },
            has(t, n) {
                return n in t || n in Ct
            }
        }))
}
function bl(e) {
    return U(e) && "__vccOpts"in e
}
const be = (e, t) => ci(e, t, vn);
function fo(e, t, n) {
    const s = arguments.length;
    return s === 2 ? Z(t) && !B(t) ? Kn(t) ? ge(e, null, [t]) : ge(e, t) : ge(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Kn(n) && (n = [n]),
    ge(e, t, n))
}
const xl = "3.4.20";
/**
* @vue/runtime-dom v3.4.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const El = "http://www.w3.org/2000/svg"
  , wl = "http://www.w3.org/1998/Math/MathML"
  , ke = typeof document < "u" ? document : null
  , Ds = ke && ke.createElement("template")
  , Rl = {
    insert: (e, t, n) => {
        t.insertBefore(e, n || null)
    }
    ,
    remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e, t, n, s) => {
        const r = t === "svg" ? ke.createElementNS(El, e) : t === "mathml" ? ke.createElementNS(wl, e) : ke.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple),
        r
    }
    ,
    createText: e => ke.createTextNode(e),
    createComment: e => ke.createComment(e),
    setText: (e, t) => {
        e.nodeValue = t
    }
    ,
    setElementText: (e, t) => {
        e.textContent = t
    }
    ,
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => ke.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, s, r, o) {
        const i = n ? n.previousSibling : t.lastChild;
        if (r && (r === o || r.nextSibling))
            for (; t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling)); )
                ;
        else {
            Ds.innerHTML = s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e;
            const u = Ds.content;
            if (s === "svg" || s === "mathml") {
                const l = u.firstChild;
                for (; l.firstChild; )
                    u.appendChild(l.firstChild);
                u.removeChild(l)
            }
            t.insertBefore(u, n)
        }
        return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
}
  , Pl = Symbol("_vtc");
function Sl(e, t, n) {
    const s = e[Pl];
    s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
const ks = Symbol("_vod")
  , Cl = Symbol("_vsh")
  , Al = Symbol("")
  , Ol = /(^|;)\s*display\s*:/;
function Tl(e, t, n) {
    const s = e.style
      , r = re(n);
    let o = !1;
    if (n && !r) {
        if (t)
            if (re(t))
                for (const i of t.split(";")) {
                    const u = i.slice(0, i.indexOf(":")).trim();
                    n[u] == null && Zt(s, u, "")
                }
            else
                for (const i in t)
                    n[i] == null && Zt(s, i, "");
        for (const i in n)
            i === "display" && (o = !0),
            Zt(s, i, n[i])
    } else if (r) {
        if (t !== n) {
            const i = s[Al];
            i && (n += ";" + i),
            s.cssText = n,
            o = Ol.test(n)
        }
    } else
        t && e.removeAttribute("style");
    ks in e && (e[ks] = o ? s.display : "",
    e[Cl] && (s.display = "none"))
}
const Ws = /\s*!important$/;
function Zt(e, t, n) {
    if (B(n))
        n.forEach(s => Zt(e, t, s));
    else if (n == null && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const s = Il(e, t);
        Ws.test(n) ? e.setProperty(vt(s), n.replace(Ws, ""), "important") : e[s] = n
    }
}
const zs = ["Webkit", "Moz", "ms"]
  , Cn = {};
function Il(e, t) {
    const n = Cn[t];
    if (n)
        return n;
    let s = pt(t);
    if (s !== "filter" && s in e)
        return Cn[t] = s;
    s = mr(s);
    for (let r = 0; r < zs.length; r++) {
        const o = zs[r] + s;
        if (o in e)
            return Cn[t] = o
    }
    return t
}
const qs = "http://www.w3.org/1999/xlink";
function Ml(e, t, n, s, r) {
    if (s && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(qs, t.slice(6, t.length)) : e.setAttributeNS(qs, t, n);
    else {
        const o = Bo(t);
        n == null || o && !yr(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}
function Ll(e, t, n, s, r, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        s && i(s, r, o),
        e[t] = n ?? "";
        return
    }
    const u = e.tagName;
    if (t === "value" && u !== "PROGRESS" && !u.includes("-")) {
        e._value = n;
        const h = u === "OPTION" ? e.getAttribute("value") || "" : e.value
          , a = n ?? "";
        h !== a && (e.value = a),
        n == null && e.removeAttribute(t);
        return
    }
    let l = !1;
    if (n === "" || n == null) {
        const h = typeof e[t];
        h === "boolean" ? n = yr(n) : n == null && h === "string" ? (n = "",
        l = !0) : h === "number" && (n = 0,
        l = !0)
    }
    try {
        e[t] = n
    } catch {}
    l && e.removeAttribute(t)
}
function Fl(e, t, n, s) {
    e.addEventListener(t, n, s)
}
function Nl(e, t, n, s) {
    e.removeEventListener(t, n, s)
}
const Gs = Symbol("_vei");
function $l(e, t, n, s, r=null) {
    const o = e[Gs] || (e[Gs] = {})
      , i = o[t];
    if (s && i)
        i.value = s;
    else {
        const [u,l] = jl(t);
        if (s) {
            const h = o[t] = Ul(s, r);
            Fl(e, u, h, l)
        } else
            i && (Nl(e, u, i, l),
            o[t] = void 0)
    }
}
const Ys = /(?:Once|Passive|Capture)$/;
function jl(e) {
    let t;
    if (Ys.test(e)) {
        t = {};
        let s;
        for (; s = e.match(Ys); )
            e = e.slice(0, e.length - s[0].length),
            t[s[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : vt(e.slice(2)), t]
}
let An = 0;
const Hl = Promise.resolve()
  , Bl = () => An || (Hl.then( () => An = 0),
An = Date.now());
function Ul(e, t) {
    const n = s => {
        if (!s._vts)
            s._vts = Date.now();
        else if (s._vts <= n.attached)
            return;
        Ee(Vl(s, n.value), t, 5, [s])
    }
    ;
    return n.value = e,
    n.attached = Bl(),
    n
}
function Vl(e, t) {
    if (B(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map(s => r => !r._stopped && s && s(r))
    } else
        return t
}
const Qs = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123
  , Kl = (e, t, n, s, r, o, i, u, l) => {
    const h = r === "svg";
    t === "class" ? Sl(e, s, h) : t === "style" ? Tl(e, n, s) : on(t) ? Gn(t) || $l(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : Dl(e, t, s, h)) ? Ll(e, t, s, o, i, u, l) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s),
    Ml(e, t, s, h))
}
;
function Dl(e, t, n, s) {
    if (s)
        return !!(t === "innerHTML" || t === "textContent" || t in e && Qs(t) && U(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
        return !1;
    if (t === "width" || t === "height") {
        const r = e.tagName;
        if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
            return !1
    }
    return Qs(t) && re(n) ? !1 : t in e
}
const kl = se({
    patchProp: Kl
}, Rl);
let Xs;
function Wl() {
    return Xs || (Xs = nl(kl))
}
const zl = (...e) => {
    const t = Wl().createApp(...e)
      , {mount: n} = t;
    return t.mount = s => {
        const r = Gl(s);
        if (!r)
            return;
        const o = t._component;
        !U(o) && !o.render && !o.template && (o.template = r.innerHTML),
        r.innerHTML = "";
        const i = n(r, !1, ql(r));
        return r instanceof Element && (r.removeAttribute("v-cloak"),
        r.setAttribute("data-v-app", "")),
        i
    }
    ,
    t
}
;
function ql(e) {
    if (e instanceof SVGElement)
        return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement)
        return "mathml"
}
function Gl(e) {
    return re(e) ? document.querySelector(e) : e
}
var Yl = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
const Ql = Symbol();
var Js;
(function(e) {
    e.direct = "direct",
    e.patchObject = "patch object",
    e.patchFunction = "patch function"
}
)(Js || (Js = {}));
function Xl() {
    const e = Uo(!0)
      , t = e.run( () => $r({}));
    let n = []
      , s = [];
    const r = os({
        install(o) {
            r._a = o,
            o.provide(Ql, r),
            o.config.globalProperties.$pinia = r,
            s.forEach(i => n.push(i)),
            s = []
        },
        use(o) {
            return !this._a && !Yl ? s.push(o) : n.push(o),
            this
        },
        _p: n,
        _a: null,
        _e: e,
        _s: new Map,
        state: t
    });
    return r
}
const Jl = "/assets/logo.png";
class Zl {
    constructor(t=0, n=0, s=64) {
        this.x = t,
        this.y = n,
        this.radius = s ** 2
    }
}
function ec(e, t) {
    e.x = t.clientX,
    e.y = t.clientY
}
function tc(e, t) {
    e.x = t.changedTouches[0].clientX,
    e.y = t.changedTouches[0].clientY
}
function nc(e, t) {
    t.preventDefault(),
    e.x = t.targetTouches[0].clientX,
    e.y = t.targetTouches[0].clientY
}
function sc(e, t) {
    t.preventDefault(),
    e.x = 0,
    e.y = 0
}
const ps = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s,r] of t)
        n[s] = r;
    return n
}
  , ao = e => (yi("data-v-5cc52e33"),
e = e(),
vi(),
e)
  , rc = ao( () => Bt("canvas", {
    id: "canvas"
}, null, -1))
  , oc = ao( () => Bt("img", {
    id: "myLogo",
    src: Jl
}, null, -1))
  , ic = {
    __name: "ParticlesLogo",
    setup(e) {
        const t = new Zl
          , n = []
          , s = {
            friction: .99,
            ease: .01,
            spacing: 4,
            size: 2,
            color: "#fff"
        };
        return window.addEventListener("load", () => {
            const r = document.getElementById("myLogo")
              , o = document.getElementById("canvas")
              , i = o.getContext("2d")
              , u = o.getContext("2d")
              , l = o.width = window.innerWidth - 2
              , h = o.height = window.innerHeight - 2;
            class a {
                constructor(N, T) {
                    this.x = this.originX = N,
                    this.y = this.originY = T,
                    this.rx = 0,
                    this.ry = 0,
                    this.vx = 0,
                    this.vy = 0,
                    this.force = 0,
                    this.angle = 0,
                    this.distance = 0
                }
                update() {
                    this.rx = t.x - this.x,
                    this.ry = t.y - this.y,
                    this.distance = this.rx ** 2 + this.ry ** 2,
                    this.force = -t.radius / this.distance,
                    this.distance < t.radius && (this.angle = Math.atan2(this.ry, this.rx),
                    this.vx += this.force * Math.cos(this.angle),
                    this.vy += this.force * Math.sin(this.angle)),
                    this.x += (this.vx *= s.friction) + (this.originX - this.x) * s.ease,
                    this.y += (this.vy *= s.friction) + (this.originY - this.y) * s.ease
                }
            }
            function d() {
                u.drawImage(r, (l - r.width) / 2, (h - r.height) / 2);
                const S = u.getImageData(0, 0, l, h).data;
                let N;
                for (let T = 0; T < h; T += s.spacing)
                    for (let F = 0; F < l; F += s.spacing)
                        N = (T * l + F) * 4,
                        S[++N] > 0 && n.push(new a(F,T))
            }
            d();
            function p() {
                for (const S of n)
                    S.update()
            }
            function v() {
                i.clearRect(0, 0, l, h),
                i.fillStyle = s.color;
                for (const S of n)
                    i.fillRect(S.x, S.y, s.size, s.size)
            }
            function O() {
                p(),
                v(),
                requestAnimationFrame(O)
            }
            O(),
            document.body.addEventListener("mousemove", S => {
                ec(t, S)
            }
            ),
            document.body.addEventListener("touchstart", S => {
                tc(t, S)
            }
            , !1),
            document.body.addEventListener("touchmove", S => {
                nc(t, S)
            }
            , !1),
            document.body.addEventListener("touchend", S => {
                sc(t, S)
            }
            , !1)
        }
        ),
        (r, o) => (_n(),
        as(Oe, null, [rc, oc], 64))
    }
}
  , lc = ps(ic, [["__scopeId", "data-v-5cc52e33"]])
  , cc = {};
function uc(e, t) {
    const n = lc;
    return _n(),
    as("main", null, [ge(n)])
}
const ho = ps(cc, [["render", uc]])
  , fc = {
    __name: "App",
    setup(e) {
        return (t, n) => {
            const s = ho;
            return _n(),
            cl(s)
        }
    }
};
/*!
  * vue-router v4.3.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const ct = typeof document < "u";
function ac(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const q = Object.assign;
function On(e, t) {
    const n = {};
    for (const s in t) {
        const r = t[s];
        n[s] = we(r) ? r.map(e) : e(r)
    }
    return n
}
const Tt = () => {}
  , we = Array.isArray
  , po = /#/g
  , hc = /&/g
  , dc = /\//g
  , pc = /=/g
  , gc = /\?/g
  , go = /\+/g
  , mc = /%5B/g
  , _c = /%5D/g
  , mo = /%5E/g
  , yc = /%60/g
  , _o = /%7B/g
  , vc = /%7C/g
  , yo = /%7D/g
  , bc = /%20/g;
function gs(e) {
    return encodeURI("" + e).replace(vc, "|").replace(mc, "[").replace(_c, "]")
}
function xc(e) {
    return gs(e).replace(_o, "{").replace(yo, "}").replace(mo, "^")
}
function kn(e) {
    return gs(e).replace(go, "%2B").replace(bc, "+").replace(po, "%23").replace(hc, "%26").replace(yc, "`").replace(_o, "{").replace(yo, "}").replace(mo, "^")
}
function Ec(e) {
    return kn(e).replace(pc, "%3D")
}
function wc(e) {
    return gs(e).replace(po, "%23").replace(gc, "%3F")
}
function Rc(e) {
    return e == null ? "" : wc(e).replace(dc, "%2F")
}
function jt(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {}
    return "" + e
}
const Pc = /\/$/
  , Sc = e => e.replace(Pc, "");
function Tn(e, t, n="/") {
    let s, r = {}, o = "", i = "";
    const u = t.indexOf("#");
    let l = t.indexOf("?");
    return u < l && u >= 0 && (l = -1),
    l > -1 && (s = t.slice(0, l),
    o = t.slice(l + 1, u > -1 ? u : t.length),
    r = e(o)),
    u > -1 && (s = s || t.slice(0, u),
    i = t.slice(u, t.length)),
    s = Tc(s ?? t, n),
    {
        fullPath: s + (o && "?") + o + i,
        path: s,
        query: r,
        hash: jt(i)
    }
}
function Cc(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}
function Zs(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}
function Ac(e, t, n) {
    const s = t.matched.length - 1
      , r = n.matched.length - 1;
    return s > -1 && s === r && _t(t.matched[s], n.matched[r]) && vo(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}
function _t(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}
function vo(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
        return !1;
    for (const n in e)
        if (!Oc(e[n], t[n]))
            return !1;
    return !0
}
function Oc(e, t) {
    return we(e) ? er(e, t) : we(t) ? er(t, e) : e === t
}
function er(e, t) {
    return we(t) ? e.length === t.length && e.every( (n, s) => n === t[s]) : e.length === 1 && e[0] === t
}
function Tc(e, t) {
    if (e.startsWith("/"))
        return e;
    if (!e)
        return t;
    const n = t.split("/")
      , s = e.split("/")
      , r = s[s.length - 1];
    (r === ".." || r === ".") && s.push("");
    let o = n.length - 1, i, u;
    for (i = 0; i < s.length; i++)
        if (u = s[i],
        u !== ".")
            if (u === "..")
                o > 1 && o--;
            else
                break;
    return n.slice(0, o).join("/") + "/" + s.slice(i).join("/")
}
var Ht;
(function(e) {
    e.pop = "pop",
    e.push = "push"
}
)(Ht || (Ht = {}));
var It;
(function(e) {
    e.back = "back",
    e.forward = "forward",
    e.unknown = ""
}
)(It || (It = {}));
function Ic(e) {
    if (!e)
        if (ct) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/",
            e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else
            e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e),
    Sc(e)
}
const Mc = /^[^#]+#/;
function Lc(e, t) {
    return e.replace(Mc, "#") + t
}
function Fc(e, t) {
    const n = document.documentElement.getBoundingClientRect()
      , s = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: s.left - n.left - (t.left || 0),
        top: s.top - n.top - (t.top || 0)
    }
}
const bn = () => ({
    left: window.scrollX,
    top: window.scrollY
});
function Nc(e) {
    let t;
    if ("el"in e) {
        const n = e.el
          , s = typeof n == "string" && n.startsWith("#")
          , r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!r)
            return;
        t = Fc(r, e)
    } else
        t = e;
    "scrollBehavior"in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY)
}
function tr(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const Wn = new Map;
function $c(e, t) {
    Wn.set(e, t)
}
function jc(e) {
    const t = Wn.get(e);
    return Wn.delete(e),
    t
}
let Hc = () => location.protocol + "//" + location.host;
function bo(e, t) {
    const {pathname: n, search: s, hash: r} = t
      , o = e.indexOf("#");
    if (o > -1) {
        let u = r.includes(e.slice(o)) ? e.slice(o).length : 1
          , l = r.slice(u);
        return l[0] !== "/" && (l = "/" + l),
        Zs(l, "")
    }
    return Zs(n, e) + s + r
}
function Bc(e, t, n, s) {
    let r = []
      , o = []
      , i = null;
    const u = ({state: p}) => {
        const v = bo(e, location)
          , O = n.value
          , S = t.value;
        let N = 0;
        if (p) {
            if (n.value = v,
            t.value = p,
            i && i === O) {
                i = null;
                return
            }
            N = S ? p.position - S.position : 0
        } else
            s(v);
        r.forEach(T => {
            T(n.value, O, {
                delta: N,
                type: Ht.pop,
                direction: N ? N > 0 ? It.forward : It.back : It.unknown
            })
        }
        )
    }
    ;
    function l() {
        i = n.value
    }
    function h(p) {
        r.push(p);
        const v = () => {
            const O = r.indexOf(p);
            O > -1 && r.splice(O, 1)
        }
        ;
        return o.push(v),
        v
    }
    function a() {
        const {history: p} = window;
        p.state && p.replaceState(q({}, p.state, {
            scroll: bn()
        }), "")
    }
    function d() {
        for (const p of o)
            p();
        o = [],
        window.removeEventListener("popstate", u),
        window.removeEventListener("beforeunload", a)
    }
    return window.addEventListener("popstate", u),
    window.addEventListener("beforeunload", a, {
        passive: !0
    }),
    {
        pauseListeners: l,
        listen: h,
        destroy: d
    }
}
function nr(e, t, n, s=!1, r=!1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: s,
        position: window.history.length,
        scroll: r ? bn() : null
    }
}
function Uc(e) {
    const {history: t, location: n} = window
      , s = {
        value: bo(e, n)
    }
      , r = {
        value: t.state
    };
    r.value || o(s.value, {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);
    function o(l, h, a) {
        const d = e.indexOf("#")
          , p = d > -1 ? (n.host && document.querySelector("base") ? e : e.slice(d)) + l : Hc() + e + l;
        try {
            t[a ? "replaceState" : "pushState"](h, "", p),
            r.value = h
        } catch (v) {
            console.error(v),
            n[a ? "replace" : "assign"](p)
        }
    }
    function i(l, h) {
        const a = q({}, t.state, nr(r.value.back, l, r.value.forward, !0), h, {
            position: r.value.position
        });
        o(l, a, !0),
        s.value = l
    }
    function u(l, h) {
        const a = q({}, r.value, t.state, {
            forward: l,
            scroll: bn()
        });
        o(a.current, a, !0);
        const d = q({}, nr(s.value, l, null), {
            position: a.position + 1
        }, h);
        o(l, d, !1),
        s.value = l
    }
    return {
        location: s,
        state: r,
        push: u,
        replace: i
    }
}
function Vc(e) {
    e = Ic(e);
    const t = Uc(e)
      , n = Bc(e, t.state, t.location, t.replace);
    function s(o, i=!0) {
        i || n.pauseListeners(),
        history.go(o)
    }
    const r = q({
        location: "",
        base: e,
        go: s,
        createHref: Lc.bind(null, e)
    }, t, n);
    return Object.defineProperty(r, "location", {
        enumerable: !0,
        get: () => t.location.value
    }),
    Object.defineProperty(r, "state", {
        enumerable: !0,
        get: () => t.state.value
    }),
    r
}
function Kc(e) {
    return typeof e == "string" || e && typeof e == "object"
}
function xo(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const Ve = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
}
  , Eo = Symbol("");
var sr;
(function(e) {
    e[e.aborted = 4] = "aborted",
    e[e.cancelled = 8] = "cancelled",
    e[e.duplicated = 16] = "duplicated"
}
)(sr || (sr = {}));
function yt(e, t) {
    return q(new Error, {
        type: e,
        [Eo]: !0
    }, t)
}
function Fe(e, t) {
    return e instanceof Error && Eo in e && (t == null || !!(e.type & t))
}
const rr = "[^/]+?"
  , Dc = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
}
  , kc = /[.+*?^${}()[\]/\\]/g;
function Wc(e, t) {
    const n = q({}, Dc, t)
      , s = [];
    let r = n.start ? "^" : "";
    const o = [];
    for (const h of e) {
        const a = h.length ? [] : [90];
        n.strict && !h.length && (r += "/");
        for (let d = 0; d < h.length; d++) {
            const p = h[d];
            let v = 40 + (n.sensitive ? .25 : 0);
            if (p.type === 0)
                d || (r += "/"),
                r += p.value.replace(kc, "\\$&"),
                v += 40;
            else if (p.type === 1) {
                const {value: O, repeatable: S, optional: N, regexp: T} = p;
                o.push({
                    name: O,
                    repeatable: S,
                    optional: N
                });
                const F = T || rr;
                if (F !== rr) {
                    v += 10;
                    try {
                        new RegExp(`(${F})`)
                    } catch (k) {
                        throw new Error(`Invalid custom RegExp for param "${O}" (${F}): ` + k.message)
                    }
                }
                let j = S ? `((?:${F})(?:/(?:${F}))*)` : `(${F})`;
                d || (j = N && h.length < 2 ? `(?:/${j})` : "/" + j),
                N && (j += "?"),
                r += j,
                v += 20,
                N && (v += -8),
                S && (v += -20),
                F === ".*" && (v += -50)
            }
            a.push(v)
        }
        s.push(a)
    }
    if (n.strict && n.end) {
        const h = s.length - 1;
        s[h][s[h].length - 1] += .7000000000000001
    }
    n.strict || (r += "/?"),
    n.end ? r += "$" : n.strict && (r += "(?:/|$)");
    const i = new RegExp(r,n.sensitive ? "" : "i");
    function u(h) {
        const a = h.match(i)
          , d = {};
        if (!a)
            return null;
        for (let p = 1; p < a.length; p++) {
            const v = a[p] || ""
              , O = o[p - 1];
            d[O.name] = v && O.repeatable ? v.split("/") : v
        }
        return d
    }
    function l(h) {
        let a = ""
          , d = !1;
        for (const p of e) {
            (!d || !a.endsWith("/")) && (a += "/"),
            d = !1;
            for (const v of p)
                if (v.type === 0)
                    a += v.value;
                else if (v.type === 1) {
                    const {value: O, repeatable: S, optional: N} = v
                      , T = O in h ? h[O] : "";
                    if (we(T) && !S)
                        throw new Error(`Provided param "${O}" is an array but it is not repeatable (* or + modifiers)`);
                    const F = we(T) ? T.join("/") : T;
                    if (!F)
                        if (N)
                            p.length < 2 && (a.endsWith("/") ? a = a.slice(0, -1) : d = !0);
                        else
                            throw new Error(`Missing required param "${O}"`);
                    a += F
                }
        }
        return a || "/"
    }
    return {
        re: i,
        score: s,
        keys: o,
        parse: u,
        stringify: l
    }
}
function zc(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const s = t[n] - e[n];
        if (s)
            return s;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0
}
function qc(e, t) {
    let n = 0;
    const s = e.score
      , r = t.score;
    for (; n < s.length && n < r.length; ) {
        const o = zc(s[n], r[n]);
        if (o)
            return o;
        n++
    }
    if (Math.abs(r.length - s.length) === 1) {
        if (or(s))
            return 1;
        if (or(r))
            return -1
    }
    return r.length - s.length
}
function or(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const Gc = {
    type: 0,
    value: ""
}
  , Yc = /[a-zA-Z0-9_]/;
function Qc(e) {
    if (!e)
        return [[]];
    if (e === "/")
        return [[Gc]];
    if (!e.startsWith("/"))
        throw new Error(`Invalid path "${e}"`);
    function t(v) {
        throw new Error(`ERR (${n})/"${h}": ${v}`)
    }
    let n = 0
      , s = n;
    const r = [];
    let o;
    function i() {
        o && r.push(o),
        o = []
    }
    let u = 0, l, h = "", a = "";
    function d() {
        h && (n === 0 ? o.push({
            type: 0,
            value: h
        }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),
        o.push({
            type: 1,
            value: h,
            regexp: a,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?"
        })) : t("Invalid state to consume buffer"),
        h = "")
    }
    function p() {
        h += l
    }
    for (; u < e.length; ) {
        if (l = e[u++],
        l === "\\" && n !== 2) {
            s = n,
            n = 4;
            continue
        }
        switch (n) {
        case 0:
            l === "/" ? (h && d(),
            i()) : l === ":" ? (d(),
            n = 1) : p();
            break;
        case 4:
            p(),
            n = s;
            break;
        case 1:
            l === "(" ? n = 2 : Yc.test(l) ? p() : (d(),
            n = 0,
            l !== "*" && l !== "?" && l !== "+" && u--);
            break;
        case 2:
            l === ")" ? a[a.length - 1] == "\\" ? a = a.slice(0, -1) + l : n = 3 : a += l;
            break;
        case 3:
            d(),
            n = 0,
            l !== "*" && l !== "?" && l !== "+" && u--,
            a = "";
            break;
        default:
            t("Unknown state");
            break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${h}"`),
    d(),
    i(),
    r
}
function Xc(e, t, n) {
    const s = Wc(Qc(e.path), n)
      , r = q(s, {
        record: e,
        parent: t,
        children: [],
        alias: []
    });
    return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r),
    r
}
function Jc(e, t) {
    const n = []
      , s = new Map;
    t = cr({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t);
    function r(a) {
        return s.get(a)
    }
    function o(a, d, p) {
        const v = !p
          , O = Zc(a);
        O.aliasOf = p && p.record;
        const S = cr(t, a)
          , N = [O];
        if ("alias"in a) {
            const j = typeof a.alias == "string" ? [a.alias] : a.alias;
            for (const k of j)
                N.push(q({}, O, {
                    components: p ? p.record.components : O.components,
                    path: k,
                    aliasOf: p ? p.record : O
                }))
        }
        let T, F;
        for (const j of N) {
            const {path: k} = j;
            if (d && k[0] !== "/") {
                const ee = d.record.path
                  , H = ee[ee.length - 1] === "/" ? "" : "/";
                j.path = d.record.path + (k && H + k)
            }
            if (T = Xc(j, d, S),
            p ? p.alias.push(T) : (F = F || T,
            F !== T && F.alias.push(T),
            v && a.name && !lr(T) && i(a.name)),
            O.children) {
                const ee = O.children;
                for (let H = 0; H < ee.length; H++)
                    o(ee[H], T, p && p.children[H])
            }
            p = p || T,
            (T.record.components && Object.keys(T.record.components).length || T.record.name || T.record.redirect) && l(T)
        }
        return F ? () => {
            i(F)
        }
        : Tt
    }
    function i(a) {
        if (xo(a)) {
            const d = s.get(a);
            d && (s.delete(a),
            n.splice(n.indexOf(d), 1),
            d.children.forEach(i),
            d.alias.forEach(i))
        } else {
            const d = n.indexOf(a);
            d > -1 && (n.splice(d, 1),
            a.record.name && s.delete(a.record.name),
            a.children.forEach(i),
            a.alias.forEach(i))
        }
    }
    function u() {
        return n
    }
    function l(a) {
        let d = 0;
        for (; d < n.length && qc(a, n[d]) >= 0 && (a.record.path !== n[d].record.path || !wo(a, n[d])); )
            d++;
        n.splice(d, 0, a),
        a.record.name && !lr(a) && s.set(a.record.name, a)
    }
    function h(a, d) {
        let p, v = {}, O, S;
        if ("name"in a && a.name) {
            if (p = s.get(a.name),
            !p)
                throw yt(1, {
                    location: a
                });
            S = p.record.name,
            v = q(ir(d.params, p.keys.filter(F => !F.optional).concat(p.parent ? p.parent.keys.filter(F => F.optional) : []).map(F => F.name)), a.params && ir(a.params, p.keys.map(F => F.name))),
            O = p.stringify(v)
        } else if (a.path != null)
            O = a.path,
            p = n.find(F => F.re.test(O)),
            p && (v = p.parse(O),
            S = p.record.name);
        else {
            if (p = d.name ? s.get(d.name) : n.find(F => F.re.test(d.path)),
            !p)
                throw yt(1, {
                    location: a,
                    currentLocation: d
                });
            S = p.record.name,
            v = q({}, d.params, a.params),
            O = p.stringify(v)
        }
        const N = [];
        let T = p;
        for (; T; )
            N.unshift(T.record),
            T = T.parent;
        return {
            name: S,
            path: O,
            params: v,
            matched: N,
            meta: tu(N)
        }
    }
    return e.forEach(a => o(a)),
    {
        addRoute: o,
        resolve: h,
        removeRoute: i,
        getRoutes: u,
        getRecordMatcher: r
    }
}
function ir(e, t) {
    const n = {};
    for (const s of t)
        s in e && (n[s] = e[s]);
    return n
}
function Zc(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: eu(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components"in e ? e.components || null : e.component && {
            default: e.component
        }
    }
}
function eu(e) {
    const t = {}
      , n = e.props || !1;
    if ("component"in e)
        t.default = n;
    else
        for (const s in e.components)
            t[s] = typeof n == "object" ? n[s] : n;
    return t
}
function lr(e) {
    for (; e; ) {
        if (e.record.aliasOf)
            return !0;
        e = e.parent
    }
    return !1
}
function tu(e) {
    return e.reduce( (t, n) => q(t, n.meta), {})
}
function cr(e, t) {
    const n = {};
    for (const s in e)
        n[s] = s in t ? t[s] : e[s];
    return n
}
function wo(e, t) {
    return t.children.some(n => n === e || wo(e, n))
}
function nu(e) {
    const t = {};
    if (e === "" || e === "?")
        return t;
    const s = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let r = 0; r < s.length; ++r) {
        const o = s[r].replace(go, " ")
          , i = o.indexOf("=")
          , u = jt(i < 0 ? o : o.slice(0, i))
          , l = i < 0 ? null : jt(o.slice(i + 1));
        if (u in t) {
            let h = t[u];
            we(h) || (h = t[u] = [h]),
            h.push(l)
        } else
            t[u] = l
    }
    return t
}
function ur(e) {
    let t = "";
    for (let n in e) {
        const s = e[n];
        if (n = Ec(n),
        s == null) {
            s !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        }
        (we(s) ? s.map(o => o && kn(o)) : [s && kn(s)]).forEach(o => {
            o !== void 0 && (t += (t.length ? "&" : "") + n,
            o != null && (t += "=" + o))
        }
        )
    }
    return t
}
function su(e) {
    const t = {};
    for (const n in e) {
        const s = e[n];
        s !== void 0 && (t[n] = we(s) ? s.map(r => r == null ? null : "" + r) : s == null ? s : "" + s)
    }
    return t
}
const ru = Symbol("")
  , fr = Symbol("")
  , ms = Symbol("")
  , Ro = Symbol("")
  , zn = Symbol("");
function wt() {
    let e = [];
    function t(s) {
        return e.push(s),
        () => {
            const r = e.indexOf(s);
            r > -1 && e.splice(r, 1)
        }
    }
    function n() {
        e = []
    }
    return {
        add: t,
        list: () => e.slice(),
        reset: n
    }
}
function We(e, t, n, s, r, o=i => i()) {
    const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
    return () => new Promise( (u, l) => {
        const h = p => {
            p === !1 ? l(yt(4, {
                from: n,
                to: t
            })) : p instanceof Error ? l(p) : Kc(p) ? l(yt(2, {
                from: t,
                to: p
            })) : (i && s.enterCallbacks[r] === i && typeof p == "function" && i.push(p),
            u())
        }
          , a = o( () => e.call(s && s.instances[r], t, n, h));
        let d = Promise.resolve(a);
        e.length < 3 && (d = d.then(h)),
        d.catch(p => l(p))
    }
    )
}
function In(e, t, n, s, r=o => o()) {
    const o = [];
    for (const i of e)
        for (const u in i.components) {
            let l = i.components[u];
            if (!(t !== "beforeRouteEnter" && !i.instances[u]))
                if (ou(l)) {
                    const a = (l.__vccOpts || l)[t];
                    a && o.push(We(a, n, s, i, u, r))
                } else {
                    let h = l();
                    o.push( () => h.then(a => {
                        if (!a)
                            return Promise.reject(new Error(`Couldn't resolve component "${u}" at "${i.path}"`));
                        const d = ac(a) ? a.default : a;
                        i.components[u] = d;
                        const v = (d.__vccOpts || d)[t];
                        return v && We(v, n, s, i, u, r)()
                    }
                    ))
                }
        }
    return o
}
function ou(e) {
    return typeof e == "object" || "displayName"in e || "props"in e || "__vccOpts"in e
}
function ar(e) {
    const t = $e(ms)
      , n = $e(Ro)
      , s = be( () => t.resolve(ht(e.to)))
      , r = be( () => {
        const {matched: l} = s.value
          , {length: h} = l
          , a = l[h - 1]
          , d = n.matched;
        if (!a || !d.length)
            return -1;
        const p = d.findIndex(_t.bind(null, a));
        if (p > -1)
            return p;
        const v = hr(l[h - 2]);
        return h > 1 && hr(a) === v && d[d.length - 1].path !== v ? d.findIndex(_t.bind(null, l[h - 2])) : p
    }
    )
      , o = be( () => r.value > -1 && uu(n.params, s.value.params))
      , i = be( () => r.value > -1 && r.value === n.matched.length - 1 && vo(n.params, s.value.params));
    function u(l={}) {
        return cu(l) ? t[ht(e.replace) ? "replace" : "push"](ht(e.to)).catch(Tt) : Promise.resolve()
    }
    return {
        route: s,
        href: be( () => s.value.href),
        isActive: o,
        isExactActive: i,
        navigate: u
    }
}
const iu = qr({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    useLink: ar,
    setup(e, {slots: t}) {
        const n = an(ar(e))
          , {options: s} = $e(ms)
          , r = be( () => ({
            [dr(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
            [dr(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        }));
        return () => {
            const o = t.default && t.default(n);
            return e.custom ? o : fo("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value
            }, o)
        }
    }
})
  , lu = iu;
function cu(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t))
                return
        }
        return e.preventDefault && e.preventDefault(),
        !0
    }
}
function uu(e, t) {
    for (const n in t) {
        const s = t[n]
          , r = e[n];
        if (typeof s == "string") {
            if (s !== r)
                return !1
        } else if (!we(r) || r.length !== s.length || s.some( (o, i) => o !== r[i]))
            return !1
    }
    return !0
}
function hr(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const dr = (e, t, n) => e ?? t ?? n
  , fu = qr({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    compatConfig: {
        MODE: 3
    },
    setup(e, {attrs: t, slots: n}) {
        const s = $e(zn)
          , r = be( () => e.route || s.value)
          , o = $e(fr, 0)
          , i = be( () => {
            let h = ht(o);
            const {matched: a} = r.value;
            let d;
            for (; (d = a[h]) && !d.components; )
                h++;
            return h
        }
        )
          , u = be( () => r.value.matched[i.value]);
        Xt(fr, be( () => i.value + 1)),
        Xt(ru, u),
        Xt(zn, r);
        const l = $r();
        return Yt( () => [l.value, u.value, e.name], ([h,a,d], [p,v,O]) => {
            a && (a.instances[d] = h,
            v && v !== a && h && h === p && (a.leaveGuards.size || (a.leaveGuards = v.leaveGuards),
            a.updateGuards.size || (a.updateGuards = v.updateGuards))),
            h && a && (!v || !_t(a, v) || !p) && (a.enterCallbacks[d] || []).forEach(S => S(h))
        }
        , {
            flush: "post"
        }),
        () => {
            const h = r.value
              , a = e.name
              , d = u.value
              , p = d && d.components[a];
            if (!p)
                return pr(n.default, {
                    Component: p,
                    route: h
                });
            const v = d.props[a]
              , O = v ? v === !0 ? h.params : typeof v == "function" ? v(h) : v : null
              , N = fo(p, q({}, O, t, {
                onVnodeUnmounted: T => {
                    T.component.isUnmounted && (d.instances[a] = null)
                }
                ,
                ref: l
            }));
            return pr(n.default, {
                Component: N,
                route: h
            }) || N
        }
    }
});
function pr(e, t) {
    if (!e)
        return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}
const au = fu;
function hu(e) {
    const t = Jc(e.routes, e)
      , n = e.parseQuery || nu
      , s = e.stringifyQuery || ur
      , r = e.history
      , o = wt()
      , i = wt()
      , u = wt()
      , l = ui(Ve);
    let h = Ve;
    ct && e.scrollBehavior && "scrollRestoration"in history && (history.scrollRestoration = "manual");
    const a = On.bind(null, _ => "" + _)
      , d = On.bind(null, Rc)
      , p = On.bind(null, jt);
    function v(_, C) {
        let R, I;
        return xo(_) ? (R = t.getRecordMatcher(_),
        I = C) : I = _,
        t.addRoute(I, R)
    }
    function O(_) {
        const C = t.getRecordMatcher(_);
        C && t.removeRoute(C)
    }
    function S() {
        return t.getRoutes().map(_ => _.record)
    }
    function N(_) {
        return !!t.getRecordMatcher(_)
    }
    function T(_, C) {
        if (C = q({}, C || l.value),
        typeof _ == "string") {
            const f = Tn(n, _, C.path)
              , g = t.resolve({
                path: f.path
            }, C)
              , y = r.createHref(f.fullPath);
            return q(f, g, {
                params: p(g.params),
                hash: jt(f.hash),
                redirectedFrom: void 0,
                href: y
            })
        }
        let R;
        if (_.path != null)
            R = q({}, _, {
                path: Tn(n, _.path, C.path).path
            });
        else {
            const f = q({}, _.params);
            for (const g in f)
                f[g] == null && delete f[g];
            R = q({}, _, {
                params: d(f)
            }),
            C.params = d(C.params)
        }
        const I = t.resolve(R, C)
          , z = _.hash || "";
        I.params = a(p(I.params));
        const Q = Cc(s, q({}, _, {
            hash: xc(z),
            path: I.path
        }))
          , c = r.createHref(Q);
        return q({
            fullPath: Q,
            hash: z,
            query: s === ur ? su(_.query) : _.query || {}
        }, I, {
            redirectedFrom: void 0,
            href: c
        })
    }
    function F(_) {
        return typeof _ == "string" ? Tn(n, _, l.value.path) : q({}, _)
    }
    function j(_, C) {
        if (h !== _)
            return yt(8, {
                from: C,
                to: _
            })
    }
    function k(_) {
        return le(_)
    }
    function ee(_) {
        return k(q(F(_), {
            replace: !0
        }))
    }
    function H(_) {
        const C = _.matched[_.matched.length - 1];
        if (C && C.redirect) {
            const {redirect: R} = C;
            let I = typeof R == "function" ? R(_) : R;
            return typeof I == "string" && (I = I.includes("?") || I.includes("#") ? I = F(I) : {
                path: I
            },
            I.params = {}),
            q({
                query: _.query,
                hash: _.hash,
                params: I.path != null ? {} : _.params
            }, I)
        }
    }
    function le(_, C) {
        const R = h = T(_)
          , I = l.value
          , z = _.state
          , Q = _.force
          , c = _.replace === !0
          , f = H(R);
        if (f)
            return le(q(F(f), {
                state: typeof f == "object" ? q({}, z, f.state) : z,
                force: Q,
                replace: c
            }), C || R);
        const g = R;
        g.redirectedFrom = C;
        let y;
        return !Q && Ac(s, I, R) && (y = yt(16, {
            to: g,
            from: I
        }),
        Se(I, I, !0, !1)),
        (y ? Promise.resolve(y) : Re(g, I)).catch(m => Fe(m) ? Fe(m, 2) ? m : Be(m) : W(m, g, I)).then(m => {
            if (m) {
                if (Fe(m, 2))
                    return le(q({
                        replace: c
                    }, F(m.to), {
                        state: typeof m.to == "object" ? q({}, z, m.to.state) : z,
                        force: Q
                    }), C || g)
            } else
                m = Qe(g, I, !0, c, z);
            return He(g, I, m),
            m
        }
        )
    }
    function me(_, C) {
        const R = j(_, C);
        return R ? Promise.reject(R) : Promise.resolve()
    }
    function Ye(_) {
        const C = it.values().next().value;
        return C && typeof C.runWithContext == "function" ? C.runWithContext(_) : _()
    }
    function Re(_, C) {
        let R;
        const [I,z,Q] = du(_, C);
        R = In(I.reverse(), "beforeRouteLeave", _, C);
        for (const f of I)
            f.leaveGuards.forEach(g => {
                R.push(We(g, _, C))
            }
            );
        const c = me.bind(null, _, C);
        return R.push(c),
        oe(R).then( () => {
            R = [];
            for (const f of o.list())
                R.push(We(f, _, C));
            return R.push(c),
            oe(R)
        }
        ).then( () => {
            R = In(z, "beforeRouteUpdate", _, C);
            for (const f of z)
                f.updateGuards.forEach(g => {
                    R.push(We(g, _, C))
                }
                );
            return R.push(c),
            oe(R)
        }
        ).then( () => {
            R = [];
            for (const f of Q)
                if (f.beforeEnter)
                    if (we(f.beforeEnter))
                        for (const g of f.beforeEnter)
                            R.push(We(g, _, C));
                    else
                        R.push(We(f.beforeEnter, _, C));
            return R.push(c),
            oe(R)
        }
        ).then( () => (_.matched.forEach(f => f.enterCallbacks = {}),
        R = In(Q, "beforeRouteEnter", _, C, Ye),
        R.push(c),
        oe(R))).then( () => {
            R = [];
            for (const f of i.list())
                R.push(We(f, _, C));
            return R.push(c),
            oe(R)
        }
        ).catch(f => Fe(f, 8) ? f : Promise.reject(f))
    }
    function He(_, C, R) {
        u.list().forEach(I => Ye( () => I(_, C, R)))
    }
    function Qe(_, C, R, I, z) {
        const Q = j(_, C);
        if (Q)
            return Q;
        const c = C === Ve
          , f = ct ? history.state : {};
        R && (I || c ? r.replace(_.fullPath, q({
            scroll: c && f && f.scroll
        }, z)) : r.push(_.fullPath, z)),
        l.value = _,
        Se(_, C, R, c),
        Be()
    }
    let Pe;
    function bt() {
        Pe || (Pe = r.listen( (_, C, R) => {
            if (!Vt.listening)
                return;
            const I = T(_)
              , z = H(I);
            if (z) {
                le(q(z, {
                    replace: !0
                }), I).catch(Tt);
                return
            }
            h = I;
            const Q = l.value;
            ct && $c(tr(Q.fullPath, R.delta), bn()),
            Re(I, Q).catch(c => Fe(c, 12) ? c : Fe(c, 2) ? (le(c.to, I).then(f => {
                Fe(f, 20) && !R.delta && R.type === Ht.pop && r.go(-1, !1)
            }
            ).catch(Tt),
            Promise.reject()) : (R.delta && r.go(-R.delta, !1),
            W(c, I, Q))).then(c => {
                c = c || Qe(I, Q, !1),
                c && (R.delta && !Fe(c, 8) ? r.go(-R.delta, !1) : R.type === Ht.pop && Fe(c, 20) && r.go(-1, !1)),
                He(I, Q, c)
            }
            ).catch(Tt)
        }
        ))
    }
    let rt = wt(), te = wt(), G;
    function W(_, C, R) {
        Be(_);
        const I = te.list();
        return I.length ? I.forEach(z => z(_, C, R)) : console.error(_),
        Promise.reject(_)
    }
    function Le() {
        return G && l.value !== Ve ? Promise.resolve() : new Promise( (_, C) => {
            rt.add([_, C])
        }
        )
    }
    function Be(_) {
        return G || (G = !_,
        bt(),
        rt.list().forEach( ([C,R]) => _ ? R(_) : C()),
        rt.reset()),
        _
    }
    function Se(_, C, R, I) {
        const {scrollBehavior: z} = e;
        if (!ct || !z)
            return Promise.resolve();
        const Q = !R && jc(tr(_.fullPath, 0)) || (I || !R) && history.state && history.state.scroll || null;
        return Ur().then( () => z(_, C, Q)).then(c => c && Nc(c)).catch(c => W(c, _, C))
    }
    const fe = _ => r.go(_);
    let ot;
    const it = new Set
      , Vt = {
        currentRoute: l,
        listening: !0,
        addRoute: v,
        removeRoute: O,
        hasRoute: N,
        getRoutes: S,
        resolve: T,
        options: e,
        push: k,
        replace: ee,
        go: fe,
        back: () => fe(-1),
        forward: () => fe(1),
        beforeEach: o.add,
        beforeResolve: i.add,
        afterEach: u.add,
        onError: te.add,
        isReady: Le,
        install(_) {
            const C = this;
            _.component("RouterLink", lu),
            _.component("RouterView", au),
            _.config.globalProperties.$router = C,
            Object.defineProperty(_.config.globalProperties, "$route", {
                enumerable: !0,
                get: () => ht(l)
            }),
            ct && !ot && l.value === Ve && (ot = !0,
            k(r.location).catch(z => {}
            ));
            const R = {};
            for (const z in Ve)
                Object.defineProperty(R, z, {
                    get: () => l.value[z],
                    enumerable: !0
                });
            _.provide(ms, C),
            _.provide(Ro, Ir(R)),
            _.provide(zn, l);
            const I = _.unmount;
            it.add(_),
            _.unmount = function() {
                it.delete(_),
                it.size < 1 && (h = Ve,
                Pe && Pe(),
                Pe = null,
                l.value = Ve,
                ot = !1,
                G = !1),
                I()
            }
        }
    };
    function oe(_) {
        return _.reduce( (C, R) => C.then( () => Ye(R)), Promise.resolve())
    }
    return Vt
}
function du(e, t) {
    const n = []
      , s = []
      , r = []
      , o = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < o; i++) {
        const u = t.matched[i];
        u && (e.matched.find(h => _t(h, u)) ? s.push(u) : n.push(u));
        const l = e.matched[i];
        l && (t.matched.find(h => _t(h, l)) || r.push(l))
    }
    return [n, s, r]
}
const pu = {}
  , gu = Bt("h1", null, "About page", -1)
  , mu = [gu];
function _u(e, t) {
    return _n(),
    as("div", null, mu)
}
const yu = ps(pu, [["render", _u]])
  , vu = hu({
    history: Vc("/"),
    routes: [{
        path: "/",
        name: "home",
        component: ho
    }, {
        path: "/about",
        name: "about",
        component: yu
    }]
})
  , _s = zl(fc);
_s.use(Xl());
_s.use(vu);
_s.mount("#app");
