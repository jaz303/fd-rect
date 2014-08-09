var rect = require('..');
var test = require('tape');

var Vec2 = require('fd-vec2').Vec2;
var Size = require('fd-size').Size;

test("empty", function(assert) {

    var r = rect.empty();

    assert.ok(r instanceof rect.Rect);

    assert.ok(r.origin.x === 0);
    assert.ok(r.origin.y === 0);
    assert.ok(r.size.width === 0);
    assert.ok(r.size.height === 0);

    assert.end();

});

test("clone", function(assert) {

    var origin = new Vec2(13, 19);
    var size = new Vec2(5, 5);

    var r1 = new rect.Rect(origin, size);
    var r2 = rect.clone(r1);

    assert.ok(r2 instanceof rect.Rect);

    assert.ok(r1.origin !== r2.origin);
    assert.ok(r1.origin.eq(r2.origin));

    assert.ok(r1.size !== r2.size);
    assert.ok(r1.size.eq(r2.size));

    assert.end();

});

test("make2", function(assert) {

    var origin = new Vec2(1,2);
    var size = new Size(3,4);

    var r = rect.make2(origin, size);

    assert.ok(r instanceof rect.Rect);
    
    assert.ok(r.origin === origin);
    assert.ok(r.size === size);

    assert.end();

});

test("make3 - clone", function(assert) {

    var origin = new Vec2(5,6);
    var size = new Size(7,8);

    var r = rect.make3(origin, size, true);

    assert.ok(r instanceof rect.Rect);

    assert.ok(r.origin !== origin);
    assert.ok(r.origin.eq(origin));

    assert.ok(r.size !== size);
    assert.ok(r.size.eq(size));

    assert.end();

});

test("make3 - no clone", function(assert) {

    var origin = new Vec2(5,6);
    var size = new Size(7,8);

    var r = rect.make3(origin, size, false);

    assert.ok(r instanceof rect.Rect);

    assert.ok(r.origin === origin);
    assert.ok(r.size === size);
    
    assert.end();

});

test("make4", function(assert) {

    var r = rect.make4(10, 11, 12, 13);

    assert.ok(r instanceof rect.Rect);

    assert.ok(r.origin.x === 10);
    assert.ok(r.origin.y === 11);
    assert.ok(r.size.width === 12);
    assert.ok(r.size.height === 13);

    assert.end();

});