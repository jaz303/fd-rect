var test = require('tape');
var rect = require('..');

test("getters", function(assert) {

    var r = rect(10, 20, 30, 40);

    assert.equal(r.x, 10);
    assert.equal(r.y, 20);
    assert.equal(r.width, 30);
    assert.equal(r.height, 40);

    assert.end();

});

test("getters", function(assert) {

    var r = rect();

    r.x = 10;
    r.y = 20;
    r.width = 30;
    r.height = 40;

    assert.equal(r.x, 10);
    assert.equal(r.origin.x, 10);

    assert.equal(r.y, 20);
    assert.equal(r.origin.y, 20);

    assert.equal(r.width, 30);
    assert.equal(r.size.width, 30);

    assert.equal(r.height, 40);
    assert.equal(r.size.height, 40);

    assert.end();

});

test("getters, calculated", function(assert) {

    var r = rect(1,2,3,4);

    assert.equal(r.left, 1);
    assert.equal(r.right, 4);
    assert.equal(r.top, 2);
    assert.equal(r.bottom, 6);

    assert.end();

});