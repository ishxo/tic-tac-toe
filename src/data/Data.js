export const BOARD_SIZE = 3

export class GameData {
  constructor () {
    this.x = new Player()
    this.o = new Player()
    this.platformSize = 150
    this.spaceSize = 10
    this._winner = null
    this._endGame = false
    this._randomI = null
    this._randomJ = null
  }

  get randomValues () {
    return { i: this._randomI, j: this._randomJ }
  }

  get letter () {
    const count = this.getCountAll()
    return count % 2 ? 'o' : 'x'
  }

  get winner () {
    return this._winner
  }

  get endGame () {
    return this._endGame
  }

  getCount (letter) {
    let count = 0
    for (let key in this[letter].data.rows) {
      count += this[letter].data.rows[key].length
    }
    return count
  }

  getCountAll () {
    return this.getCount('x') + this.getCount('o')
  }

  updatePlayerData (i, j, letter) {
    this[letter].updateData(i, j)
    if (this[letter].maxLength === BOARD_SIZE) {
      this._winner = letter
    } else if (this.count === BOARD_SIZE ** 2 - 1) {
      this._endGame = true
    }
  }

  autoSetLetter () {
    const matrix = this.getMatrix()
    let i, j
    do {
      i = Math.floor(Math.random() * BOARD_SIZE)
      j = Math.floor(Math.random() * BOARD_SIZE)
    } while (matrix[i][j] !== null)

    this._randomI = i
    this._randomJ = j
    this.o.updateData(this._randomI, this._randomJ)
  }

  getMatrix () {
    const matrix = []
    const array = new Array(BOARD_SIZE).fill(null)
    for (let i = 0; i < BOARD_SIZE; i++) {
      matrix.push([...array])
    }

    this.setMatrixLetter(matrix, 'o')
    this.setMatrixLetter(matrix, 'x')

    return matrix
  }

  setMatrixLetter (matrix, letter) {
    for (let i in this[letter].data.rows) {
      const arrayJ = this[letter].data.rows[i]
      if (arrayJ.length) {
        for (let j = 0; j < arrayJ.length; j++) {
          matrix[i][arrayJ[j]] = letter
        }
      }
    }
  }
}

class Player {
  constructor () {
    this.maxLength = 0
    this._data = {
      rows: this.getRowsColumnsData(),
      columns: this.getRowsColumnsData(),
      mainDiaganal: [],
      secondaryDiaganal: [],
    }
  }

  get data () {
    return this._data
  }

  updateData (i, j) {
    this.data.rows[i].push(j)
    this.data.columns[j].push(i)
    if (i === j) {
      this.data.mainDiaganal.push(i)
    }
    if (i + j === BOARD_SIZE - 1) {
      this.data.secondaryDiaganal.push(i)
    }

    this.maxLength = Math.max(
      this.data.rows[i].length,
      this.data.columns[j].length,
      this.data.mainDiaganal.length,
      this.data.secondaryDiaganal.length,
    )
  }

  getRowsColumnsData () {
    const object = {}
    for (let i = 0; i < BOARD_SIZE; i++) {
      object[i] = []
    }
    return object
  }
}
