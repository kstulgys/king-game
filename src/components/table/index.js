import React, { Component } from 'react'
import { Icon, Label, Menu, Table, Dropdown, Button } from 'semantic-ui-react'
import {
  optionsTricks,
  optionsQueens,
  optionsKJ,
  optionsTwo,
  optionsKing
} from './options'

const TableCell = ({
  options,
  playerName,
  playerValue,
  onChangePlayerValue,
  each
}) => (
  <Table.Cell textAlign='center'>
    <p>{playerValue}</p>
    <Dropdown
      placeholder='0'
      compact
      selection
      defaultValue={0}
      // value={value}
      options={options}
      onChange={(event, data) =>
        onChangePlayerValue(playerName, each, data.value)
      }
    />
  </Table.Cell>
)

const TableRow = ({
  onGameComplete,
  no,
  each,
  total,
  activeGame,
  options,
  players,
  onChangePlayerValue,
  currentTotal,
  onChangeTotal
}) => (
  <Table.Row warning={activeGame === no} disabled={activeGame !== no}>
    <Table.HeaderCell>{no}</Table.HeaderCell>
    <Table.Cell>{each}</Table.Cell>
    <TableCell
      onChangeTotal={onChangeTotal}
      each={each}
      playerName={players && players.player1.name}
      options={options}
      playerValue={activeGame === no ? players.player1.value : '-'}
      onChangePlayerValue={onChangePlayerValue}
    />
    <TableCell
      onChangeTotal={onChangeTotal}
      each={each}
      playerName={players && players.player2.name}
      options={options}
      playerValue={activeGame === no ? players.player2.value : '-'}
      onChangePlayerValue={onChangePlayerValue}
    />
    <TableCell
      onChangeTotal={onChangeTotal}
      each={each}
      playerName={players && players.player3.name}
      options={options}
      playerValue={activeGame === no ? players.player3.value : '-'}
      onChangePlayerValue={onChangePlayerValue}
    />
    <TableCell
      onChangeTotal={onChangeTotal}
      each={each}
      playerName={players && players.player4.name}
      options={options}
      playerValue={activeGame === no ? players.player4.value : '-'}
      onChangePlayerValue={onChangePlayerValue}
    />
    <Table.Cell>
      <h4>
        {currentTotal}/{total}
      </h4>
      <div>
        <Button
          onClick={() => onGameComplete()}
          color='teal'
          disabled={!(activeGame == no && currentTotal === total)}
        >
          Finish
        </Button>
      </div>
    </Table.Cell>
  </Table.Row>
)

class TableExamplePagination extends Component {
  state = {
    player1: { name: 'player1', value: 0 },
    player2: { name: 'player2', value: 0 },
    player3: { name: 'player3', value: 0 },
    player4: { name: 'player4', value: 0 },
    currentTotal: 0
  }

  changePlayerValue = (player, each, value) => {
    // console.log(player, each, value)
    const newValue = each * value
    const update = { [player]: { name: player, value: newValue } }
    // const newState = {...this.state, ...update}
    this.setState({ ...this.state, ...update }, () => this.changeTotal())
  }

  changeTotal = () => {
    const currentTotal =
      this.state.player1.value +
      this.state.player2.value +
      this.state.player3.value +
      this.state.player4.value
    this.setState({ currentTotal })
  }

  gameComplete = () => {
    const data = [
      {
        name: this.props.state.players[0].name,
        score: this.state.player1.value
      },
      {
        name: this.props.state.players[1].name,
        score: this.state.player2.value
      },
      {
        name: this.props.state.players[2].name,
        score: this.state.player3.value
      },
      this.props.state.players[3] && {
        name: this.props.state.players[3].name,
        score: this.state.player4.value
      }
    ]

    const filterData = data.filter(i => i !== null)

    this.props.onChangeTotalScore(data)
    const state = {
      player1: { name: 'player1', value: 0 },
      player2: { name: 'player2', value: 0 },
      player3: { name: 'player3', value: 0 },
      player4: { name: 'player4', value: 0 },
      currentTotal: 0
    }
    this.setState(state)
  }

  render() {
    const state = this.props.state
    return (
      <Table definition textAlign='center' basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Game</Table.HeaderCell>
            <Table.HeaderCell>Each</Table.HeaderCell>
            <Table.HeaderCell>
              {state.players[0] ? state.players[0].name : 'player-1'}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {state.players[1] ? state.players[1].name : 'player-2'}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {state.players[2] ? state.players[2].name : 'player-3'}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {state.players[3] ? state.players[3].name : 'player-4'}
            </Table.HeaderCell>
            <Table.HeaderCell>Hands Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <TableRow
            onGameComplete={this.gameComplete}
            currentTotal={this.state.currentTotal}
            onChangeTotal={this.changeTotal}
            players={this.state}
            onChangePlayerValue={this.changePlayerValue}
            options={optionsTricks}
            activeGame={state.activeGame}
            no={'Tricks+'}
            each={12}
            total={120}
          />
          <TableRow
            onGameComplete={this.gameComplete}
            currentTotal={this.state.currentTotal}
            onChangeTotal={this.changeTotal}
            players={this.state}
            onChangePlayerValue={this.changePlayerValue}
            options={optionsTricks}
            activeGame={state.activeGame}
            no={'Tricks++'}
            each={12}
            total={120}
          />
          <TableRow
            onGameComplete={this.gameComplete}
            currentTotal={this.state.currentTotal}
            onChangeTotal={this.changeTotal}
            players={this.state}
            onChangePlayerValue={this.changePlayerValue}
            options={optionsTricks}
            activeGame={state.activeGame}
            no={'Tricks-'}
            each={-4}
            total={-40}
          />
          <TableRow
            onGameComplete={this.gameComplete}
            currentTotal={this.state.currentTotal}
            onChangeTotal={this.changeTotal}
            players={this.state}
            onChangePlayerValue={this.changePlayerValue}
            options={optionsKJ}
            activeGame={state.activeGame}
            no={'Hearts'}
            each={-5}
            total={-40}
          />
          <TableRow
            onGameComplete={this.gameComplete}
            currentTotal={this.state.currentTotal}
            onChangeTotal={this.changeTotal}
            players={this.state}
            onChangePlayerValue={this.changePlayerValue}
            options={optionsQueens}
            activeGame={state.activeGame}
            no={'Queens'}
            each={-10}
            total={-40}
          />
          <TableRow
            onGameComplete={this.gameComplete}
            currentTotal={this.state.currentTotal}
            onChangeTotal={this.changeTotal}
            players={this.state}
            onChangePlayerValue={this.changePlayerValue}
            options={optionsKJ}
            activeGame={state.activeGame}
            no={'Kings & Jacks'}
            each={-5}
            total={-40}
          />
          <TableRow
            onGameComplete={this.gameComplete}
            currentTotal={this.state.currentTotal}
            onChangeTotal={this.changeTotal}
            players={this.state}
            onChangePlayerValue={this.changePlayerValue}
            options={optionsKing}
            activeGame={state.activeGame}
            no={'King of Hearts'}
            each={-40}
            total={-40}
          />
          <TableRow
            onGameComplete={this.gameComplete}
            currentTotal={this.state.currentTotal}
            onChangeTotal={this.changeTotal}
            players={this.state}
            onChangePlayerValue={this.changePlayerValue}
            options={optionsTwo}
            activeGame={state.activeGame}
            no={'Last 2 Tricks'}
            each={-20}
            total={-40}
          />

          {/* <Table.Row>
            <Table.Cell colSpan='2'>Totals</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>-1300</Table.Cell>
          </Table.Row> */}
        </Table.Body>
      </Table>
    )
  }
}

export default TableExamplePagination

{
  /* <Table.Footer>
<Table.Row>
  <Table.HeaderCell colSpan='3'>
    <Menu floated='right' pagination>
      <Menu.Item as='a' icon>
        <Icon name='chevron left' />
      </Menu.Item>
      <Menu.Item as='a'>1</Menu.Item>
      <Menu.Item as='a'>2</Menu.Item>
      <Menu.Item as='a'>3</Menu.Item>
      <Menu.Item as='a'>4</Menu.Item>
      <Menu.Item as='a' icon>
        <Icon name='chevron right' />
      </Menu.Item>
    </Menu>
  </Table.HeaderCell>
</Table.Row>
</Table.Footer> */
}
