import React from 'react'

type ChatMessageProps = {
  message: {
    body: string
    date: string
  }
}

function ChatMessage(props: ChatMessageProps) {
  return <div>{props.message.body}</div>
}

export default ChatMessage
