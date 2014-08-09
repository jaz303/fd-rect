var rect = require('..');
var test = require('tape');

var vec2 = require('fd-vec2');
var size = require('fd-size');

test("constructor - rectangle value is correct", function(assert) {

    var origin = vec2(10,15);
    var sz = size(30,30);   

    var r = new rect.Rect(origin, sz);

    assert.ok(r.origin.eq(origin));
    assert.ok(r.size.eq(sz));

    assert.end();

});

test("constructor - doesn't clone arguments", function(assert) {

    var origin = vec2(10,15);
    var sz = size(30,30);   

    var r = new rect.Rect(origin, sz);

    assert.ok(r.origin === origin);
    assert.ok(r.size === sz);

    assert.end();

});

test("eq", function(assert) {

    var r1 = new rect.Rect(vec2(10, 20), size(30, 40));
    var r2 = new rect.Rect(vec2(50, 60), size(70, 80));
    var r3 = new rect.Rect(vec2(10, 20), size(30, 40));

    assert.ok(r1.eq(r1));
    assert.notOk(r1.eq(r2));
    assert.ok(r1.eq(r3));

    assert.end();
    
});

test("clone", function(assert) {

    var origin = vec2(15,16);
    var sz = size(20,40);

    var r1 = new rect.Rect(origin, sz);
    var r2 = r1.clone();

    assert.ok(r2 instanceof rect.Rect);
    assert.ok(r2.eq(r1));

    assert.ok(r2.origin !== r1.origin);
    assert.ok(r2.size !== r1.size);

    assert.end();

});
