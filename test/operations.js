var rect = require('..');
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