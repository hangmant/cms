import { Card } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { redirect } from '../apis/auth.utils'
import { getJwt } from '../apis/auth/auth'
import { Login } from '../components/Login'
import { SignUp } from '../components/SignUp'

const LoginPage = () => {
  const [toggleShowSignUp, setToggleShowSignUp] = useState<boolean>(false)

  const handleTogggleForm = () => setToggleShowSignUp(si => !si)

  return (
    <AllContainer>
      <Container>
        {toggleShowSignUp ? (
          <SignUp handleToggleForm={handleTogggleForm} />
        ) : (
          <Login handleToggleForm={handleTogggleForm} />
        )}
      </Container>
    </AllContainer>
  )
}

LoginPage.getInitialProps = async context => {
  const token = getJwt(context)
  // const authenticatedUser: User = await isAuthenticated(token)

  if (token) {
    redirect(context, '/words')
    return {}
  }

  return {}
}

const Container = styled(Card)`
  max-width: 400px;
  width: 100%;
  padding: 30px 30px;
`

const AllContainer = styled.div`
  display: flex;
  background-image: url('https://images.unsplash.com/photo-1548780977-74a1f9089b9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2091&q=80');
  justify-content: center;
  padding: 10px;
  align-items: center;
  height: 100vh;
`

export default LoginPage
