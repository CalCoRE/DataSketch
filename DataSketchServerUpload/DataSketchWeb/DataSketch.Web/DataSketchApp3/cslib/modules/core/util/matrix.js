(function() {
  var slice = [].slice;

  define(function() {
    var MatrixUtils;
    return MatrixUtils = {
      multiplyTransformMatrices: function() {
        var matrices, ms;
        matrices = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        ms = matrices.slice(0);
        return ms.reduce(function(prev, curr, ind, arr) {
          var col, i, j, k, l, result, row, sum;
          result = [];
          for (row = i = 0; i <= 2; row = ++i) {
            result[row] = [];
            for (col = j = 0; j <= 2; col = ++j) {
              sum = 0;
              for (k = l = 0; l <= 2; k = ++l) {
                sum += prev[row][k] * curr[k][col];
              }
              result[row][col] = sum;
            }
          }
          return result;
        });
      },
      determinant: function(mtx) {
        var m, size;
        size = mtx.length;
        m = MatrixUtils._toLetters(mtx);
        if (size === 2) {
          m.a * m.d - m.b * m.c;
          mtx[0][0] * mtx[1][1] - mtx[0][1] * mtx[1][0];
        }
        if (size === 3) {
          return m.a * m.e * m.i + m.b * m.f * m.g + m.c * m.d * m.h - m.a * m.f * m.h - m.b * m.d * m.i - m.c * m.e * m.g;
        }
      },
      invert: function(mtx) {
        var c, det, i, inverse, j, m, r;
        det = MatrixUtils.determinant(mtx);
        m = MatrixUtils._toLetters(mtx);
        inverse = [[m.e * m.i - m.f * m.h, m.c * m.h - m.b * m.i, m.b * m.f - m.c * m.e], [m.f * m.g - m.d * m.i, m.a * m.i - m.c * m.g, m.c * m.d - m.a * m.f], [m.d * m.h - m.e * m.g, m.b * m.g - m.a * m.h, m.a * m.e - m.b * m.d]];
        for (r = i = 0; i <= 2; r = ++i) {
          for (c = j = 0; j <= 2; c = ++j) {
            inverse[r][c] *= det;
          }
        }
        return inverse;
      },
      _toLetters: function(mtx) {
        var letters, size;
        size = mtx.length;
        if (size === 2) {
          letters = {
            a: mtx[0][0],
            b: mtx[0][1],
            c: mtx[1][0],
            d: mtx[1][1]
          };
        }
        if (size === 3) {
          letters = {
            a: mtx[0][0],
            b: mtx[0][1],
            c: mtx[0][2],
            d: mtx[1][0],
            e: mtx[1][1],
            f: mtx[1][2],
            g: mtx[2][0],
            h: mtx[2][1],
            i: mtx[2][2]
          };
        }
        return letters;
      }
    };
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/util/matrix.js.map
