import Phaser from 'phaser'
import { SCENE_GAME } from '../constants/Constants'
import { gameConfig } from '../constants/GameConfig'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super(SCENE_GAME)
    this.clickCount = 0
    this.board = 3
  }
  create () {
    const group = this.add.group()
    for (let i = 0; i < this.board; i++) {
      group.createMultiple({
        key: 'square',
        repeat: this.board - 1,
        setXY: {
          x: 0,
          y: i * 150,
          stepX: 150,
        }
      })
    }
    Phaser.Actions.IncX(group.getChildren(), 250)
    Phaser.Actions.IncY(group.getChildren(), 135)

    // const square = this.add.sprite(135, 290, 'square')
    // square.setScale(SCALE_SIZE)
    // const squareSize = square.width * SCALE_SIZE
    // square.destroy()
    // this.drawBoard(squareSize)
  }

  // drawBoard (squareSize) {
  //   this.matrix = []
  //   const spaceSize = 10
  //   const boardLeft = (gameConfig.width - (3 * squareSize + 2 * spaceSize)) / 2
  //   const boardTop = (gameConfig.height - (3 * squareSize + 2 * spaceSize)) / 2
  //   for (let i = 0; i < 3; i++) {
  //     this.matrix.push([])
  //     for (let j = 0; j < 3; j++) {
  //       this.matrix[i][j] = null
  //       const x = boardLeft + j * squareSize + j * spaceSize + squareSize / 2
  //       const y = boardTop + i * squareSize + i * spaceSize + squareSize / 2
  //       const square = this.add.sprite(x, y, 'square').setInteractive()
  //       square.once('pointerdown', () => this.drawSymbol(x, y, squareSize, i, j))
  //       square.setScale(SCALE_SIZE)
  //     }
  //   }
  // }
  
  // drawSymbol (squareX, squareY, squareSize, i, j) {
  //   const symbol = (this.clickCount % 2 === 0) ? 'X' : 'O'
  //   this.matrix[i][j] = symbol
  //   const text = this.add.text(0, 0, symbol, { fontSize: 40, fontStyle: 'bold' })
  //   const { width, height } = text
  //   const textX = squareX + (squareSize - width) / 2 - squareSize / 2
  //   const textY = squareY + (squareSize - height) / 2 - squareSize / 2
  //   text.x = textX
  //   text.y = textY
  //   this.clickCount++
  //   this.checkWinner()
  // }

  // checkWinner () {
  //   console.log(this.matrix)
  // }
}
