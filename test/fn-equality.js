var rect = require('..');
var test = require('tape');

var vec2 = require('fd-vec2');
var size = require('fd-size');

test("eq", function(assert) {

    var r1 = new rect.Rect(vec2(10, 20), size(30, 40));
    var r2 = new rect.Rect(vec2(50, 60), size(70, 80));
    var r3 = new rect.Rect(vec2(10, 20), size(30, 40));

    assert.ok(rect.eq(r1, r1));
    assert.notOk(rect.eq(r1, r2));
    assert.ok(rect.eq(r1, r3));

    assert.end();
    
});