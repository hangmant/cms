import React, { useState } from 'react'

const login = () => {
  const [username, setUsername] = useState('calderon@gmail.com')
  const [password, setPassword] = useState('mailero')

  const onClickLogIn = async () => {
    try {
      const response = await fetch(`http://localhost:8087/api/auth/login/jwt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }).then(res => res.text())

      if (response) {
        localStorage.setItem('token', response)
      } else {
        throw new Error('Response is empty')
      }
      console.log('Dante: onClickLogIn -> response', response)
    } catch (error) {
      console.error('Error on login', error)
    }
  }

  return (
    <div>
      <input value={username} type="string" onChange={e => setUsername(e.target.value)} />
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={onClickLogIn}>Login</button>
    </div>
  )
}

export default login
