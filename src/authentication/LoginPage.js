import React, { useState } from 'react'
import {
  Button,
  Container,
  Typography,
  TextField,
  Box,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { loginReq } from '../requests/AuthenticationRequests'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainBox: {
    height: window.innerHeight - theme.spacing(4),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '320px',
    minWidth: '300px',
    flex: 1,
    display: 'flex',
  },
  centralBox: {
    paddingBottom: theme.spacing(2),
    width: '80%',
  },
  innerBox: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    margin: theme.spacing(2),
  },
  innards: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
}))

export default function LoginPage({ onLogin, errorMessage }) {
  const classes = useStyles()
  const [login, setLogin] = useState('')
  const [pswd, setPswd] = useState('')
  const [error, setError] = useState(errorMessage)

  const loginFunc = () => {
    const login_ = login.trim()
    const pswd_ = pswd.trim()
    if (login_.length === 0) {
      setError('Введите логин')
      return
    }
    if (pswd_.length === 0) {
      setError('Введите пароль')
      return
    }

    loginReq(login_, pswd_, (response) => {
      if (response && response.status) {
        if (response.status === 'ok') {
          onLogin(response.token)
        } else {
          setError('Такого пользователя не существует')
        }
      }
    })
  }

  return (
    <Container maxWidth="sm" className={classes.mainBox}>
      <Box className={classes.centralBox}>
        <Box className={classes.innerBox}>
          <Typography variant={'h5'} className={classes.innards}>
            Добро пожаловать в CHED
          </Typography>
        </Box>
        <Box className={classes.innerBox}>
          <TextField
            required
            id="login"
            label="Логин/почта"
            variant="outlined"
            className={classes.innards}
            onChange={(event) => setLogin(event.target.value)}
          />
        </Box>
        <Box className={classes.innerBox}>
          <TextField
            required
            id="pswd"
            label="Пароль"
            type="password"
            variant="outlined"
            className={classes.innards}
            onChange={(event) => setPswd(event.target.value)}
          />
        </Box>
        <Box className={classes.innerBox}>
          <Button
            variant="contained"
            color="primary"
            className={classes.innards}
            onClick={() => loginFunc()}
          >
            Войти
          </Button>
        </Box>
        <Box className={classes.innerBox}>
          <Typography className={classes.innards} color="error">
            {error}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
