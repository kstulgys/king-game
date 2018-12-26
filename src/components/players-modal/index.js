import React, { Component, useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

function FormContent({ onAddNewPlayers }) {
  const [playerNames, setName] = useState({
    player1: '',
    player2: '',
    player3: '',
    player4: ''
  })

  const handleName = data => {
    setName({
      ...playerNames,
      [data.name]: data.value
    })
  }

  const isValid =
    Object.values(playerNames).filter(n => n !== '').length < 3 ? true : false
  return (
    <Form className='pa5' size='large'>
      <Form.Group unstackable widths={2}>
        <Form.Input
          label='Player-1'
          name='player1'
          placeholder='name'
          onChange={(event, data) => handleName(data)}
        />
        <Form.Input
          label='Player-2'
          name='player2'
          placeholder='name'
          onChange={(event, data) => handleName(data)}
        />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input
          label='Player-3'
          name='player3'
          placeholder='name'
          onChange={(event, data) => handleName(data)}
        />
        <Form.Input
          label='Player-4'
          name='player4'
          placeholder='name'
          onChange={(event, data) => handleName(data)}
        />
      </Form.Group>
      <Button
        disabled={isValid}
        type='submit'
        color='teal'
        onClick={() => onAddNewPlayers(playerNames)}
      >
        Submit
      </Button>
    </Form>
  )
}

export default function PlayersModal({ onAddNewPlayers, players }) {
  return (
    <Modal
      trigger={
        players && players[0] ? null : <Button color='teal'>Add Players</Button>
      }
      content={<FormContent onAddNewPlayers={onAddNewPlayers} />}
      // actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
    />
  )
}
