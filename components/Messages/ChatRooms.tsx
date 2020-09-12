import { List } from '@material-ui/core'
import React from 'react'
import { Room } from '../../interfaces/chat/room.interface'
import { ChatRoomsItem } from './ChatRoomsItem'

type ChatRoomsProps = {
  rooms: Room[]
}

export function ChatRooms({ rooms = [] }: ChatRoomsProps) {
  return (
    <List>
      {rooms.map((room, idx) => (
        <ChatRoomsItem key={idx} room={room} />
      ))}
    </List>
  )
}
