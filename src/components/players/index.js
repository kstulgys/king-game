import React from 'react'
import { Header, Image, Table, Label, Divider, Button } from 'semantic-ui-react'
import PlayersModal from '../players-modal'

const GameLabel = ({ game, played, onSelectNewGame, name, finished }) => (
  <Label
    onClick={finished ? () => onSelectNewGame(game, name) : null}
    circular
    color={`${played ? 'grey' : 'red'}`}
    className='pointer'
  >
    {game}
  </Label>
)

const PlayerRow = ({ turn, name, games, score, onSelectNewGame, finished }) => (
  <Table.Row>
    <Table.Cell>
      {turn && <Label color='teal' ribbon />}
      <Header as='h4' image>
        <Image
          src={`https://api.adorable.io/avatars/285/${name}.io.png`}
          rounded
          size='massive'
        />
        <Header.Content>{name}</Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell textAlign='left'>
      {games &&
        games.map(g => (
          <GameLabel
            finished={finished}
            name={name}
            onSelectNewGame={onSelectNewGame}
            key={g.game}
            game={g.game}
            played={g.played}
          />
        ))}
    </Table.Cell>

    <Table.Cell textAlign='center'>
      <span>{score}</span>
    </Table.Cell>
  </Table.Row>
)

const TableExampleCollapsing = ({
  state,
  onAddNewPlayers,
  onSelectNewGame
}) => (
  <Table basic='very' celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Players</Table.HeaderCell>
        <Table.HeaderCell>Games</Table.HeaderCell>
        <Table.HeaderCell>Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <PlayersModal onAddNewPlayers={onAddNewPlayers} players={state.players} />
      {state.players.map(n => {
        console.log(state)
        return (
          <PlayerRow
            turn={state.turn == n.no}
            finished={state.finished}
            onSelectNewGame={onSelectNewGame}
            key={n && n.name}
            name={n && n.name}
            games={n && n.games}
            score={n && n.score}
          />
        )
      })}
    </Table.Body>
  </Table>
)

export default TableExampleCollapsing
