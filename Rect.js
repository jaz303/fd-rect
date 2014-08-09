module.exports = Rect;

var Size = require('fd-size').Size;
var Vec2 = require('fd-vec2').Vec2;

//
// Ctor

function Rect(origin, size) {
    this.origin = origin;
    this.size = size;
}

//
// Getters/setters

Object.defineProperty(Rect.prototype, 'x', {
    get: function() { return this.origin.x; },
    set: function(x) { this.origin.x = x; },
});

Object.defineProperty(Rect.prototype, 'y', {
    get: function() { return this.origin.y; },
    set: function(y) { this.origin.y = y; },
});

Object.defineProperty(Rect.prototype, 'width', {
    get: function() { return this.size.width; },
    set: function(width) { this.size.width = width; },
});

Object.defineProperty(Rect.prototype, 'height', {
    get: function() { return this.size.height; },
    set: function(height) { this.size.height = height; },
});

//
// Clone

Rect.prototype.clone = function() {
    return new Rect(this.origin.clone(), this.size.clone());
}

//
// Equality

Rect.prototype.eq = function(rhs) {
    return this.origin.eq(rhs.origin) && this.size.eq(rhs.size);
}

//
// Operations

Rect.prototype.isEmpty = function() {
    return this.origin.x === 0
        && this.origin.y === 0
        && this.size.width === 0
        && this.size.height === 0;
}

Rect.prototype.isSquare = function() {
    return this.size.width === this.size.height;
}

Rect.prototype.aspectRatio = function() {
    return this.size.width / this.size.height;
}

Rect.prototype.area = function() {
    return this.size.width * this.size.height;
}

Rect.prototype.perimeter = function() {
    return (this.size.width * 2) + (this.size.height * 2);
}

Rect.prototype.intersects = function(rect) {
    return !(
        this.origin.x + this.size.width <= rect.origin.x
        || this.origin.y + this.size.height <= rect.origin.y
        || this.origin.x >= rect.origin.x + rect.size.width
        || this.origin.y >= rect.origin.y + rect.size.height
    );
}

Rect.prototype.flip = function() {
    return new Rect(
        this.origin.clone(),
        new Size(this.size.height, this.size.width)
    );
}

Rect.prototype.scale = function(scale) {
    return new Rect(
        this.origin.clone(),
        new Size(this.size.width * scale, this.size.height * scale)
    );
}

Rect.prototype.translate = function(dx, dy) {
    return new Rect(
        new Vec2(this.origin.x + dx, this.origin.y + dy),
        this.size.clone()
    );
}

Rect.prototype.union = function(otherRect) {
    
    var l1 = this.origin.x,
        l2 = otherRect.origin.x,
        r1 = l1 + this.size.width,
        r2 = l2 + otherRect.size.width,
        t1 = this.origin.y,
        t2 = otherRect.origin.y,
        b1 = t1 + this.size.height,
        b2 = t2 + otherRect.size.height;

    var l = l1 < l2 ? l1 : l2;
    var t = t1 < t2 ? t1 : t2;
    var r = r1 > r2 ? r1 : r2;
    var b = b1 > b2 ? b1 : b2;

    return new Rect(new Vec2(l,t), new Size(r-l, b-t));

}

// Rect.prototype.intersect = function(rect) {

// }

Rect.prototype.flip_ = function() {
    var tmp = this.size.width;
    this.size.width = this.size.height;
    this.size.height = tmp;
}

Rect.prototype.scale_ = function(scale) {
    this.size.width *= scale;
    this.size.height *= scale;
}

Rect.prototype.translate_ = function(dx, dy) {
    this.origin.x += dx;
    this.origin.y += dy;
}

Rect.prototype.union_ = function(otherRect) {
    
    var l1 = this.origin.x,
        l2 = otherRect.origin.x,
        r1 = l1 + this.size.width,
        r2 = l2 + otherRect.size.width,
        t1 = this.origin.y,
        t2 = otherRect.origin.y,
        b1 = t1 + this.size.height,
        b2 = t2 + otherRect.size.height;

    var l = l1 < l2 ? l1 : l2;
    var t = t1 < t2 ? t1 : t2;
    var r = r1 > r2 ? r1 : r2;
    var b = b1 > b2 ? b1 : b2;

    this.origin.x = l;
    this.origin.y = t;
    this.size.width = r - l;
    this.size.height = b - t;

}

// Rect.prototype.intersect_ = function(rect) {

// }

Rect.prototype.containsVec2 = function(vec) {
    return this.containsPoint(vec.x, vec.y);
}

Rect.prototype.containsPoint = function(x, y) {
    return x >= this.origin.x
        && x <= (this.origin.x + this.size.width)
        && y >= this.origin.y
        && y <= (this.origin.y + this.size.height);
}

Rect.prototype.containsRect = function(otherRect) {
    return otherRect.origin.x >= this.origin.x
        && (otherRect.origin.x + otherRect.size.width) <= (this.origin.x + this.size.width)
        && otherRect.origin.y >= this.origin.y
        && (otherRect.origin.y + otherRect.size.height) <= (this.origin.y + this.size.height);
}
