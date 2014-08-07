var Vec2 = require('fd-vec2').Vec2;

var x = module.exports = smartConstructor;

function smartConstructor(x, y, w, h) {
    switch (arguments.length) {
        case 1: return clone(x);
        case 2: return make(x, y);
        case 4: return make(new Vec2(x, y), new Vec2(w, h));
        default: throw new Error("invalid params to smart constructor");
    }
}

x.Rect = require('./Rect');

x.clone = clone;
function clone(rect) {
    return new Rect(rect.origin.clone(), rect.size.clone());
}

x.make = make;
function make(origin, size) {
    return new Rect(origin, size);
}

x.containsPoint = function(rect, point) {
    return point.x >= rect.origin.x
        && point.x <= (rect.origin.x + rect.size.width)
        && point.y >= rect.origin.y
        && point.y <= (rect.origin.y + rect.size.height);
}

x.containsRect = function(rect, otherRect) {
    return otherRect.origin.x >= rect.origin.x
        && (otherRect.origin.x + otherRect.size.width) <= (rect.origin.x + rect.size.width)
        && otherRect.origin.y >= rect.origin.y
        && (otherRect.origin.y + otherRect.size.height) <= (rect.origin.y + rect.size.height);
}

x.intersects = function(rect, otherRect) {

}

x.intersect = function(rect, otherRect, out) {

}

x.union = function(rect, otherRect, out) {

}