import React, { Component, Fragment } from 'react'
import logo from './logo.svg'
import KingTable from './components/table'
import Players from './components/players'
import './App.css'
import KH from './King_of_hearts.svg'

class App extends Component {
  state = {
    activeGame: null,
    turn: 1,
    finished: true,
    players: []
  }

  saveToLocalStorage = state => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state', serializedState)
    } catch (e) {
      console.log(e)
    }
  }

  loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('state')
      if (serializedState === null) return undefined
      return JSON.parse(serializedState)
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  componentDidMount() {
    const persistedState = this.loadFromLocalStorage()
    if (persistedState) {
      this.setState(persistedState)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.saveToLocalStorage(this.state)
    }
  }

  addNewPlayers = async names => {
    const playerNmes = Object.values(names)
    // console.log(playerNmes)
    let no = 0
    const players = playerNmes
      .map(name => {
        // console.log(name)
        const randomName = `Player-${Math.floor(
          Math.random() * Math.floor(999)
        )}`
        // const newName = name != '' ? name : return
        if (name === '') return
        no++
        return {
          no,
          name,
          games: [
            { no: 1, game: 'Tricks+', played: false },
            { no: 2, game: 'Tricks++', played: false },
            { no: 3, game: 'Tricks-', played: false },
            { no: 4, game: 'Hearts', played: false },
            { no: 5, game: 'Queens', played: false },
            { no: 6, game: 'Jacks', played: false },
            { no: 7, game: 'King', played: false },
            { no: 8, game: 'Last 2 Tricks', played: false }
          ],
          score: 0
        }
      })
      .filter(i => i !== undefined)
    console.log(players)

    // const players = [{ ...this.state.players, newPlayer }]
    await this.setState({ players })
    window.location.reload()
    // location.reload();
  }

  selectNewGame = (activeGame, playerName) => {
    const r = window.confirm('Do you really want to play this game?')
    if (r == true) {
      const playerData = this.state.players.filter(
        p => p.name === playerName
      )[0]
      // console.log(playerData)

      const game = playerData.games.filter(g => g.game == activeGame)[0]
      // console.log(game)

      const updatedGame = { ...game, played: true }
      // console.log(updatedGame)

      const withoutGame = playerData.games.filter(g => g.game !== activeGame)
      // console.log(withoutGame)

      const updatedGames = [...withoutGame, updatedGame]
      // console.log(updatedGames)
      const sorted = updatedGames.sort((a, b) => a.no - b.no)

      const newPlayerData = {
        ...playerData,
        games: sorted
      }

      const withoutPlayer = this.state.players.filter(
        p => p.name !== playerName
      )
      // console.log(newPlayerData)

      const players = [...withoutPlayer, newPlayerData].sort(
        (a, b) => a.no - b.no
      )
      // console.log(players)
      this.setState({ players, activeGame, finished: !this.state.finished })
    }
  }
  changeTotalScore = data => {
    // console.log(data)
    const players = this.state.players.map(player => {
      if (player.name === data[0].name) {
        const score = player.score + data[0].score
        return { ...player, score }
      }
      if (player.name === data[1].name) {
        const score = player.score + data[1].score
        return { ...player, score }
      }
      if (player.name === data[2].name) {
        const score = player.score + data[2].score
        return { ...player, score }
      }
      if (player.name === data[3].name) {
        const score = player.score + data[3].score
        return { ...player, score }
      }
    })
    const totalPlayers = this.state.players.length
    // console.log(totalPlayers)
    let currentTurn = this.state.turn
    const turn =
      currentTurn >= 1 && currentTurn < totalPlayers ? ++currentTurn : 1
    console.log(turn)
    this.setState({
      players,
      activeGame: null,
      finished: !this.state.finished,
      turn
    })
  }

  render() {
    return (
      <Fragment>
        <div className='flex justify-center mv5'>
          <Players
            state={this.state}
            onAddNewPlayers={this.addNewPlayers}
            onSelectNewGame={this.selectNewGame}
          />
          <div className='pl7'>
            <img src={KH} className='App-logo' alt='logo' />
          </div>
        </div>
        <div>
          <KingTable
            state={this.state}
            onChangeTotalScore={this.changeTotalScore}
          />
        </div>
      </Fragment>
    )
  }
}

export default App
