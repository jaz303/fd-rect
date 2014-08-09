var Vec2 = require('fd-vec2').Vec2;
var Size = require('fd-size').Size;

//
// Smart constructor

module.exports = exports = smartConstructor;
function smartConstructor(x, y, width, height) {
    switch (arguments.length) {
        case 0: return empty();
        case 1: return clone(x);
        case 2: return make2(x, y);
        case 3: return make3(x, y, width);
        case 4: return make4(x, y, width, height);
        default: throw new Error("invalid params to smart constructor");
    }
}

//
// Class

var Rect = require('./Rect');
exports.Rect = Rect;

//
// Constructors

exports.empty = empty;
function empty() {
    return new Rect(new Vec2(0,0), new Size(0,0));
}

exports.clone = clone;
function clone(rect) {
    return new Rect(rect.origin.clone(), rect.size.clone());
}

exports.make2 = make2;
function make2(origin, size) {
    return new Rect(origin, size);
}

exports.make3 = make3;
function make3(origin, size, clone) {
    return clone
        ? new Rect(origin.clone(), size.clone())
        : new Rect(origin, size);
}

exports.make4 = make4;
function make4(x, y, width, height) {
    return new Rect(new Vec2(x,y), new Size(width, height));
}

//
// Equality

exports.eq = eq;
function eq(left, right) {
    return left.origin.eq(right.origin) && left.size.eq(right.size);
}

//
// Operations

exports.isEmpty = function(rect) {
    return rect.origin.x === 0
        && rect.origin.y === 0
        && rect.size.width === 0
        && rect.size.height === 0;
}

exports.isSquare = function(rect) {
    return rect.size.width === rect.size.height;
}

exports.aspectRatio = function(rect) {
    return rect.size.width / rect.size.height;
}

exports.area = function(rect) {
    return rect.size.width * rect.size.height;
}

exports.perimeter = function(rect) {
    return (rect.size.width * 2) + (rect.size.height * 2);
}

exports.flip = function(rect, out) {
    out.origin.x = rect.origin.x;
    out.origin.y = rect.origin.y;
    var tmp = rect.size.width;
    out.size.width = rect.size.height;
    out.size.height = tmp;
}

exports.scale = function(rect, scale, out) {
    out.origin.x = rect.origin.x;
    out.origin.y = rect.origin.y;
    out.size.width = rect.size.width * scale;
    out.size.height = rect.size.height * scale;
}

exports.translate = function(rect, dx, dy, out) {
    out.origin.x = rect.origin.x + dx;
    out.origin.y = rect.origin.y + dy;
    out.size.width = rect.size.width;
    out.size.height = rect.size.height;
}

exports.containsVec2 = function(rect, vec) {
    return containsPoint(rect, vec.x, vec.y);
}

exports.containsPoint = containsPoint;
function containsPoint(rect, x, y) {
    return x >= rect.origin.x
        && x <= (rect.origin.x + rect.size.width)
        && y >= rect.origin.y
        && y <= (rect.origin.y + rect.size.height);
}

exports.containsRect = function(rect, otherRect) {
    return otherRect.origin.x >= rect.origin.x
        && (otherRect.origin.x + otherRect.size.width) <= (rect.origin.x + rect.size.width)
        && otherRect.origin.y >= rect.origin.y
        && (otherRect.origin.y + otherRect.size.height) <= (rect.origin.y + rect.size.height);
}

exports.union = function(rect1, rect2, out) {

    var l1 = rect1.origin.x,
        l2 = rect2.origin.x,
        r1 = l1 + rect1.size.width,
        r2 = l2 + rect2.size.width,
        t1 = rect1.origin.y,
        t2 = rect2.origin.y,
        b1 = t1 + rect1.size.height,
        b2 = t2 + rect2.size.height;

    var l = l1 < l2 ? l1 : l2;
    var t = t1 < t2 ? t1 : t2;
    var r = r1 > r2 ? r1 : r2;
    var b = b1 > b2 ? b1 : b2;

    out.origin.x = l;
    out.origin.y = t;
    out.size.width = r-l;
    out.size.height = b-t;

}

exports.intersects = function(rect1, rect2) {
    return !(
        rect1.origin.x + rect1.size.width <= rect2.origin.x
        || rect1.origin.y + rect1.size.height <= rect2.origin.y
        || rect1.origin.x >= rect2.origin.x + rect2.size.width
        || rect1.origin.y >= rect2.origin.y + rect2.size.height
    );
}

// TODO: intersect
