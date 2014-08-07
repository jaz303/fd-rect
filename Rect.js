module.exports = Rect;

function Rect(origin, size) {
    this.origin = origin;
    this.size = size;
}

Rect.prototype.containsPoint = function(point) {
    return point.x >= this.origin.x
        && point.x <= (this.origin.x + this.size.width)
        && point.y >= this.origin.y
        && point.y <= (this.origin.y + this.size.height);
}

Rect.prototype.containsRect = function(otherRect) {
    return otherRect.origin.x >= this.origin.x
        && (otherRect.origin.x + otherRect.size.width) <= (this.origin.x + this.size.width)
        && otherRect.origin.y >= this.origin.y
        && (otherRect.origin.y + otherRect.size.height) <= (this.origin.y + this.size.height);
}

Rect.prototype.intersects = function(rect) {
    
}

Rect.prototype.intersect = function(rect) {

}

Rect.prototype.union = function(rect) {

}

Rect.prototype.intersect_ = function(rect) {

}

Rect.prototype.union_ = function(rect) {

}