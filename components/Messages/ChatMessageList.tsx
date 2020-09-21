import { List } from '@material-ui/core'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Message } from '../../interfaces/chat/message.interface'
import { ChatMessage } from './ChatMessage'

type ChatMessageListProps = {
  messages: Message[]
}

export type ChatMessageListFunctions = {
  scrollToEnd: () => void
}

const ChatMessageListComponent = ({ messages }: ChatMessageListProps, ref) => {
  const scrollableListRef = useRef(null)

  const handleScrollToEnd = () => {
    if (scrollableListRef) {
      const data = {
        scrollTop: scrollableListRef?.current?.scrollTop,
        scrollHeight: scrollableListRef?.current?.scrollHeight,
        offsetHeight: scrollableListRef?.current?.offsetHeight,
        offsetTop: scrollableListRef?.current?.offsetTop,
      }
      scrollableListRef.current.scrollTop = data.scrollHeight - data.offsetHeight
    }
  }

  useImperativeHandle(
    ref,
    () =>
      ({
        scrollToEnd: handleScrollToEnd,
      } as ChatMessageListFunctions)
  )

  return (
    <List
      style={{
        height: 550,
        overflowY: 'scroll',
      }}
      innerRef={scrollableListRef}
      className="messages-here"
    >
      {messages.map(message => (
        <ChatMessage key={message._id} message={message} />
      ))}
    </List>
  )
}

export default forwardRef<ChatMessageListFunctions, ChatMessageListProps>(
  ChatMessageListComponent
)
