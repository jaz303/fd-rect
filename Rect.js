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

// Rect.prototype.intersects = function(rect) {
    
// }

// Rect.prototype.intersect = function(rect) {

// }

// Rect.prototype.union = function(rect) {

// }

// Rect.prototype.intersect_ = function(rect) {

// }

// Rect.prototype.union_ = function(rect) {

// }