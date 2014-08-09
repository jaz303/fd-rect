module.exports = Rect;

var Size = require('fd-size').Size;

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

Rect.prototype.flip_ = function() {
    var tmp = this.size.width;
    this.size.width = this.size.height;
    this.size.height = tmp;
}

// Rect.prototype.containsPoint = function(point) {
//     return point.x >= this.origin.x
//         && point.x <= (this.origin.x + this.size.width)
//         && point.y >= this.origin.y
//         && point.y <= (this.origin.y + this.size.height);
// }

// Rect.prototype.containsRect = function(otherRect) {
//     return otherRect.origin.x >= this.origin.x
//         && (otherRect.origin.x + otherRect.size.width) <= (this.origin.x + this.size.width)
//         && otherRect.origin.y >= this.origin.y
//         && (otherRect.origin.y + otherRect.size.height) <= (this.origin.y + this.size.height);
// }

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