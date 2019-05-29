define () ->
  MatrixUtils =
    multiplyTransformMatrices: (matrices...) ->
      ms = matrices.slice(0)
      ms.reduce (prev, curr, ind, arr) ->
        result = []
        for row in [0..2]
          result[row] = []
          for col in [0..2]
            sum = 0
            for k in [0..2]
              sum += prev[row][k] * curr[k][col]
            result[row][col] = sum
        result

    determinant: (mtx) ->
      size = mtx.length
      m = MatrixUtils._toLetters mtx
      if size == 2
        m.a * m.d - m.b * m.c 
        mtx[0][0] * mtx[1][1] - mtx[0][1] * mtx[1][0]
      if size == 3
        m.a * m.e * m.i + m.b * m.f * m.g + m.c * m.d * m.h - m.a * m.f * m.h - m.b * m.d * m.i - m.c * m.e * m.g

    invert: (mtx) ->
      det = MatrixUtils.determinant mtx
      m = MatrixUtils._toLetters mtx
      inverse = [
        [(m.e * m.i - m.f * m.h), (m.c * m.h - m.b * m.i), (m.b * m.f - m.c * m.e)]
        [(m.f * m.g - m.d * m.i), (m.a * m.i - m.c * m.g), (m.c * m.d - m.a * m.f)]
        [(m.d * m.h - m.e * m.g), (m.b * m.g - m.a * m.h), (m.a * m.e - m.b * m.d)]
      ]
      for r in [0..2]
        for c in [0..2]
          inverse[r][c] *= det
      inverse

    _toLetters: (mtx) ->
      size = mtx.length
      if size == 2
        letters =
          a: mtx[0][0]
          b: mtx[0][1]
          c: mtx[1][0]
          d: mtx[1][1]
      if size == 3
        letters =
          a: mtx[0][0]
          b: mtx[0][1]
          c: mtx[0][2]
          d: mtx[1][0]
          e: mtx[1][1]
          f: mtx[1][2]
          g: mtx[2][0]
          h: mtx[2][1]
          i: mtx[2][2]
      letters