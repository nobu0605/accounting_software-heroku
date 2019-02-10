import React, { Component } from 'react'
import axios from 'axios'
import Header from '../components/Header.js'
import styled from 'styled-components'
import Cookies from 'universal-cookie'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '',
      password: '',
      headers: '',
      users: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, input) {
    this.setState({ [input]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const loginInfo = {
      grant_type: 'password',
      client_id: 4,
      client_secret: 'cU97UanxU2ohxILgxcKiGtvTVWqRelnlr0U8QP89',
      username: 'sssublack@gmail.com',
      password: 'hogehoge',
      scope: '*'
    }
    let uri = 'https://api-accounting-software.herokuapp.com/api/oauth/token'
    axios
      .post(uri, loginInfo)
      .then(response => {
        const headers = response.data.access_token
        axios.defaults.headers.common['Authorization'] = `Bearer ${headers}`
        this.setState({
          headers: headers,
          success: 'ログインに成功しました！'
        })
        const cookies = new Cookies()
        cookies.set('pass', headers)
      })
      .catch(error => {
        if (error.response) {
          this.setState({
            errors: error.response.data
          })
          console.log(error.response.data)
        }
      })
  }

  render() {
    return (
      <div>
        <Header />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 40
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <h1>ログイン</h1>
              <br />
              <LoginForm
                type="text"
                placeholder="メールアドレスを入力してください"
                onChange={e => this.handleChange(e, 'mail')}
              />
              <br />
              <LoginForm
                type="password"
                placeholder="パスワードを入力してください"
                onChange={e => this.handleChange(e, 'password')}
              />
              <br />
              <LoginButton
                style={{ width: 400 }}
                type="submit"
                value="ログイン"
              />
            </div>
          </form>
        </div>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <div style={{ fontSize: 25, marginTop: 30, marginLeft: 30 }}>
            {this.state.success}
          </div>
        </div>
      </div>
    )
  }
}

const LoginButton = styled.input`
  font-size: 14px;
  display: block;
  font-family: HiraginoSans;
  font-weight: 300;
  margin-left: 10px;
  line-height: 1;
  padding: 10px 30px 10px 30px;
  border-radius: 10px;
  background: #386cbf;
  color: white;
`
const LoginForm = styled.input`
  margin-bottom: 5px;
  width: 400px;
  height: 40px;
  &::placeholder {
    font-size: 13px;
    text-align: center;
  }
`
