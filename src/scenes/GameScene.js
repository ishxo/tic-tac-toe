import Phaser from 'phaser'
import { SCENE_GAME } from '../constants/Constants'
import { gameConfig } from '../constants/GameConfig'
import { BOARD_SIZE, GameData } from '../data/Data'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super(SCENE_GAME)
    this.tileContainersData = []
    this.gameModel = new GameData()
  }

  drawBoard () {
    const { platformSize, spaceSize } = this.gameModel
    const boardContainerX =
      (gameConfig.width -
        (BOARD_SIZE * platformSize + BOARD_SIZE - 1 * spaceSize)) /
        2 +
      platformSize / 2
    const boardContainerY =
      (gameConfig.height -
        (BOARD_SIZE * platformSize + BOARD_SIZE - 1 * spaceSize)) /
        2 +
      platformSize / 2
    const boardContainer = this.add.container(boardContainerX, boardContainerY)
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.tileContainersData.push([])
      for (let j = 0; j < BOARD_SIZE; j++) {
        const tileContainer = this.add.container(
          i * (platformSize + spaceSize),
          j * (platformSize + spaceSize),
        )
        this.tileContainersData[i].push(tileContainer)
        const tile = this.add.image(0, 0, 'platform')
        tileContainer.setInteractive(
          new Phaser.Geom.Rectangle(
            -platformSize / 2,
            -platformSize / 2,
            platformSize,
            platformSize,
          ),
          Phaser.Geom.Rectangle.Contains,
        )
        tileContainer.add(tile)
        boardContainer.add(tileContainer)
        tileContainer.setData({ i, j })
      }
    }
  }

  create () {
    this.drawBoard()
    this.input.on('gameobjectdown', this.handleClick, this)
  }

  handleClick (pointer, target) {
    const letter = this.gameModel.letter
    this.drawLetter(target, letter)
    const [i, j] = target.getData(['i', 'j'])
    this.gameModel.updatePlayerData(j, i, letter)

    if (this.gameModel.winner) {
      const winnerText = this.add.text(
        10,
        10,
        'Winner ' + this.gameModel.letter,
      )
      winnerText.setX((gameConfig.width - winnerText.width) / 2)
      this.scene.pause(SCENE_GAME)
    } else if (this.gameModel.endGame) {
      const noWinnerText = this.add.text(10, 10, 'No Winner')
      noWinnerText.setX((gameConfig.width - noWinnerText.width) / 2)
    }

    this.autoBot()
  }

  drawLetter (target, letter) {
    const letterImage = this.add.image(0, 0, letter)
    target.removeInteractive()
    target.add(letterImage)
  }

  autoBot () {
    this.gameModel.autoSetLetter()
    const { i, j } = this.gameModel.randomValues
    const container = this.tileContainersData[j][i]
    this.drawLetter(container, 'o')
  }
}
