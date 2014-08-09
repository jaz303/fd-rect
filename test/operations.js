var rect = require('..');
var vec2 = require('fd-vec2');
var gt = require('fd-geom-test')(require('tape'), rect);

gt.unaryOperator(
    'isEmpty',
    rect(10, 20, 30, 40),
    false
);

gt.unaryOperator(
    'isEmpty',
    rect(0, 0, 0, 0),
    true
);

gt.unaryOperator(
    'isSquare',
    rect(0, 0, 10, 10),
    true
);

gt.unaryOperator(
    'isSquare',
    rect(0, 0, 20, 10),
    false
);

gt.unaryOperator(
    'aspectRatio',
    rect(100, 500, 16, 9),
    16/9
);

gt.unaryOperator(
    'area',
    rect(20, 10, 50, 40),
    2000
);

gt.unaryOperator(
    'perimeter',
    rect(19, 29, 30, 40),
    140
);

gt.unaryOperator(
    'flip',
    rect(10, 10, 50, 20),
    rect(10, 10, 20, 50)
);

gt.test(
    'scale',
    rect(20, 30, 100, 200),
    [0.5],
    rect(20, 30, 50, 100)
);

gt.test(
    'translate',
    rect(15, 23, 500, 600),
    [20, 30],
    rect(35, 53, 500, 600)
);

gt.test('containsPoint', rect(0, 0, 1, 1), [-0.5, 0.5], false);
gt.test('containsPoint', rect(0, 0, 1, 1), [0, 0], true);
gt.test('containsPoint', rect(0, 0, 1, 1), [0.5, 0.5], true);
gt.test('containsPoint', rect(0, 0, 1, 1), [1, 1], true);
gt.test('containsPoint', rect(0, 0, 1, 1), [1.5, 0.5], false);

gt.test('containsVec2', rect(0, 0, 1, 1), [vec2(-0.5,0.5)], false);
gt.test('containsVec2', rect(0, 0, 1, 1), [vec2(0,0)], true);
gt.test('containsVec2', rect(0, 0, 1, 1), [vec2(0.5,0.5)], true);
gt.test('containsVec2', rect(0, 0, 1, 1), [vec2(1,1)], true);
gt.test('containsVec2', rect(0, 0, 1, 1), [vec2(1.5,0.5)], false);

gt.test('containsRect',
    rect(0,0,1,1),
    [ rect(0.2,0.2,0.5,0.5) ],
    true
);

gt.test('containsRect',
    rect(0,0,1,1),
    [ rect(0.0,0.0,0.5,0.5) ],
    true
);

gt.test('containsRect',
    rect(0,0,1,1),
    [ rect(0.5,0.5,0.5,0.5) ],
    true
);

gt.test('containsRect',
    rect(0,0,1,1),
    [ rect(0,0,1,1) ],
    true
);

gt.test('containsRect',
    rect(0,0,1,1),
    [ rect(0.5,0.5,1,0.5) ],
    false
);

gt.test('containsRect',
    rect(0,0,1,1),
    [ rect(0.5,0.5,0.5,1) ],
    false
);

gt.test('containsRect',
    rect(0,0,1,1),
    [ rect(-1,-1,3,3) ],
    false
);

gt.test('union',
    rect(10,10,10,10),
    [ rect(30,30,20,100) ],
    rect(10,10,40,120)
);

// partial - left
gt.test('intersects', rect(0,0,10,10), [ rect(-5,5,10,1) ], true);

// partial - right
gt.test('intersects', rect(0,0,10,10), [ rect(5,5,10,1) ], true);

// partial - top
gt.test('intersects', rect(0,0,10,10), [ rect(5,-5,1,10) ], true);

// partial - bottom
gt.test('intersects', rect(0,0,10,10), [ rect(5,5,1,10) ], true);

// full
gt.test('intersects', rect(0,0,10,10), [ rect(-5,-5,20,20) ], true);

// touching
gt.test('intersects', rect(0,0,10,10), [ rect(10,0,10,10) ], false);
gt.test('intersects', rect(0,0,10,10), [ rect(-10,0,10,10) ], false);
gt.test('intersects', rect(0,0,10,10), [ rect(0,-10,10,10) ], false);
gt.test('intersects', rect(0,0,10,10), [ rect(0,10,10,10) ], false);

// no intersection
gt.test('intersects', rect(0,0,10,10), [ rect(-10,0,5,5) ], false);
gt.test('intersects', rect(0,0,10,10), [ rect(15,0,5,5) ], false);
gt.test('intersects', rect(0,0,10,10), [ rect(0,-10,5,5) ], false);
gt.test('intersects', rect(0,0,10,10), [ rect(0,15,5,5) ], false);

//
// Intersect calculation

var intersectCases = [

    {   name    : "surrounded",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(-1, -1, 12, 12),
        expect  : rect(0, 0, 10, 10)
    },

    {   name    : "contained",
        r1      : rect(10, 10, 10, 10),
        r2      : rect(12, 12, 6, 6),
        expect  : rect(12, 12, 6, 6)
    },

    {   name    : "left -> inside",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(-5, 5, 10, 1),
        expect  : rect(0, 5, 5, 1)
    },
    {   name    : "left -> right",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(-5, 5, 20, 1),
        expect  : rect(0, 5, 10, 1)
    },
    {   name    : "top -> inside",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(5, -5, 1, 10),
        expect  : rect(5, 0, 1, 5)
    },
    {   name    : "top -> bottom",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(5, -5, 1, 20),
        expect  : rect(5, 0, 1, 10)
    },

    {   name    : "outside, right",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(11, 0, 10, 10),
        expect  : null
    },
    {   name    : "outside, left",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(-11, 0, 10, 10),
        expect  : null
    },
    {   name    : "outside, top",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(0, -11, 10, 10),
        expect  : null
    },
    {   name    : "outside, bottom",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(0, 11, 10, 10),
        expect  : null
    },

    {   name    : "touching, right",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(10, 0, 10, 10),
        expect  : null
    },
    {   name    : "touching, left",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(-10, 0, 10, 10),
        expect  : null
    },
    {   name    : "touching, top",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(0, -10, 10, 10),
        expect  : null
    },
    {   name    : "touching, bottom",
        r1      : rect(0, 0, 10, 10),
        r2      : rect(0, 10, 10, 10),
        expect  : null
    }

];

var test = require('tape');

test("intersect (imperative)", function(assert) {

    intersectCases.forEach(function(ic) {

        function check(r1, r2, append) {
            var r1  = r1.clone(),
                r2  = r2.clone(),
                out = rect.empty();

            var res = rect.intersect(r1, r2, out);

            if (ic.expect === null) {
                assert.equal(res, false, ic.name + ", " + append);
            } else {
                assert.equal(res, true, ic.name + ", " + append);
                assert.ok(out.eq(ic.expect), ic.name + ", " + append);
            }
        }

        check(ic.r1, ic.r2, "normal");
        check(ic.r2, ic.r1, "reversed");

    });

    assert.end();

});

test("intersect (object)", function(assert) {

    intersectCases.forEach(function(ic) {

        function check(r1, r2, append) {
            var res = r1.clone().intersect(r2.clone());
            if (ic.expect === null) {
                assert.equal(res, null, ic.name + ", " + append);
            } else {
                assert.ok(res.eq(ic.expect), ic.name + ", " + append);
            }
        }

        check(ic.r1, ic.r2, "normal");
        check(ic.r2, ic.r1, "reversed");

    });

    assert.end();

});

test("intersect (object, self-mutating)", function(assert) {

    intersectCases.forEach(function(ic) {

        function check(r1, r2, append) {
            var receiver = r1.clone();
            var res = receiver.intersect_(r2.clone());
            if (ic.expect === null) {
                assert.equal(res, false, ic.name + ", " + append);
            } else {
                assert.equal(res, true, ic.name + ", " + append);
                assert.ok(receiver.eq(ic.expect), ic.name + ", " + append);
            }
        }

        check(ic.r1, ic.r2, "normal");
        check(ic.r2, ic.r1, "reversed");

    });

    assert.end();

});