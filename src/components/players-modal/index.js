import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

class FormContent extends Component {
  state = {
    player1: '',
    player2: '',
    player3: '',
    player4: ''
  }

  // disableFromSubmit = () => {
  //   const namesLength = Object.values(this.state).filter(n => n !== '').length >= 3 && false
  //   // console.log(namesLength)
  //   return namesLength >= 3 && true
  // }

  render() {
    // console.log(this.state)
    const isValid =
      Object.values(this.state).filter(n => n !== '').length < 3 ? true : false
    // console.log(isValid)
    return (
      <Form className='pa5' size='large'>
        <Form.Group unstackable widths={2}>
          <Form.Input
            label='Player-1'
            placeholder='name'
            onChange={(event, data) => this.setState({ player1: data.value })}
          />
          <Form.Input
            label='Player-2'
            placeholder='name'
            onChange={(event, data) => this.setState({ player2: data.value })}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label='Player-3'
            placeholder='name'
            onChange={(event, data) => this.setState({ player3: data.value })}
          />
          <Form.Input
            label='Player-4'
            placeholder='name'
            onChange={(event, data) => this.setState({ player4: data.value })}
          />
        </Form.Group>
        <Button
          disabled={isValid}
          type='submit'
          color='teal'
          onClick={() => this.props.onAddNewPlayers(this.state)}
        >
          Submit
        </Button>
      </Form>
    )
  }
}

const OpenPlayersModal = ({ onAddNewPlayers, players }) => (
  <Modal
    trigger={
      players && players[0] ? null : <Button color='teal'>Add Players</Button>
    }
    // header='Reminder!'
    content={<FormContent onAddNewPlayers={onAddNewPlayers} />}
    // actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
  />
)

export default OpenPlayersModal
