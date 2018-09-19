export const BOARD_SIZE = 3

export class GameData {
  constructor () {
    this.platformSize = 150
    this.spaceSize = 10
    this.x = new Player()
    this.o = new Player()
    this.count = 0
    this._winner = null
    this._endGame = false
    this._randomI = null
    this._randomJ = null
  }

  get randomValues () {
    return { i: this._randomI, j: this._randomJ }
  }

  get letter () {
    return this.count % 2 ? 'o' : 'x'
  }

  get winner () {
    return this._winner
  }

  get endGame () {
    return this._endGame
  }

  getCount (letter) {
    let count = 0
    for (let key in this[letter].rows) {
      count += this[letter].rows[key].length
    }
    return count
  }

  getCountAll () {
    return this.getCount('x') + this.getCount('o')
  }

  updatePlayerData (i, j) {
    this[this.letter].updateData(i, j)
    if (this[this.letter].maxLength === BOARD_SIZE) {
      this._winner = this.letter
    } else if (this.count === BOARD_SIZE ** 2 - 1) {
      this._endGame = true
    } else {
      this.count++
    }
  }

  // autoSetLetter () {
  //   this._randomI = 0
  //   this._randomJ = 2
  //   this.o.updateData(this._randomI, this._randomJ)
  //   this.count++
  // }
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
    this._data.rows[i].push(j)
    this._data.columns[j].push(i)
    if (i === j) {
      this._data.mainDiaganal.push(i)
    }
    if (i + j === BOARD_SIZE - 1) {
      this._data.secondaryDiaganal.push(i)
    }

    this.maxLength = Math.max(
      this._data.rows[i].length,
      this._data.columns[j].length,
      this._data.mainDiaganal.length,
      this._data.secondaryDiaganal.length,
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
