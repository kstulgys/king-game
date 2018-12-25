import React, { Fragment } from 'react'
import { Header, Image, Table, Label, Divider, Button } from 'semantic-ui-react'
import PlayersModal from '../players-modal'

const GameLabel = ({
  result,
  game,
  played,
  onSelectNewGame,
  name,
  finished,
  turn,
  no
}) => (
  <Label
    onClick={finished && turn === no ? () => onSelectNewGame(game, name) : null}
    circular
    color={`${played ? 'grey' : 'red'}`}
    as='a'
    size='big'
  >
    <div>{result && result.map(r => <span>{r}/</span>)}</div>
    <span>{game}</span>
  </Label>
)

const PlayerRow = ({
  turn,
  no,
  name,
  games,
  score,
  onSelectNewGame,
  finished
}) => (
  <Table.Row>
    <Table.Cell>
      {turn == no && <Label color='teal' ribbon />}
      <Header as='h4' image>
        <Image
          src={`https://api.adorable.io/avatars/285/${name}.io.png`}
          rounded
          size='massive'
        />
        <Header.Content>{name}</Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>
      {games &&
        games.map(g => (
          <GameLabel
            result={g.result && g.result}
            turn={turn}
            no={no}
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
        return (
          <PlayerRow
            turn={state.turn}
            no={n && n.no}
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
