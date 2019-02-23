import React from 'react'
import Head from '../components/Head.js'
import Header from '../components/Header.js'
import axios from 'axios'
import styled from 'styled-components'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      type: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDeletion = this.handleDeletion.bind(this)
  }
  static async getInitialProps() {
    const resonse = await axios.get(
      'https://api-accounting-software.herokuapp.com/api/accounts'
    )
    return { accounts: resonse.data }
  }

  handleChange(e, input) {
    this.setState({ [input]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const account = {
      account: this.state.account,
      type: this.state.type
    }
    let uri = 'https://api-accounting-software.herokuapp.com/api/accounts'
    axios.post(uri, account).then(response => {
      location.href = 'https://accounting-soft.herokuapp.com/config'
    })
  }

  handleDeletion(id) {
    let uri = 'https://api-accounting-software.herokuapp.com/api/accounts/' + id
    axios.delete(uri)
    location.href = 'https://accounting-soft.herokuapp.com/config'
  }

  render() {
    return (
      <div>
        <Head />
        <Header />
        <div style={{ display: 'flex' }}>
          <div>
            <h1 style={{ margin: 20 }}>勘定科目登録</h1>
            <form onSubmit={this.handleSubmit}>
              <div style={{ margin: 20 }}>
                <label>勘定科目:</label>
                <input
                  style={{ fontSize: 20, marginLeft: 10 }}
                  type="text"
                  onChange={e => this.handleChange(e, 'account')}
                />
              </div>
              <div style={{ margin: 20 }}>
                <label>区分</label>
                <select
                  style={{ fontSize: 17, marginLeft: 10 }}
                  onChange={e => this.handleChange(e, 'type')}
                >
                  <option value="">選択してください</option>
                  <option value="流動資産">流動資産</option>
                  <option value="固定資産">固定資産</option>
                  <option value="流動負債">流動負債</option>
                  <option value="固定負債">固定負債</option>
                  <option value="純資産">純資産</option>
                  <option value="売上高">売上高</option>
                  <option value="売上原価">売上原価</option>
                  <option value="販管費">販管費</option>
                  <option value="営業外収益">営業外収益</option>
                  <option value="営業外費用">営業外費用</option>
                  <option value="特別利益">特別利益</option>
                  <option value="特別損失">特別損失</option>
                  <option value="法人税等">法人税等</option>
                </select>
              </div>
              <div style={{ marginLeft: 20 }}>
                <EnrollButton>登録</EnrollButton>
              </div>
            </form>
          </div>

          <table style={{ margin: 20 }} border="1" rules="all">
            <thead>
              <tr>
                <TableData>No</TableData>
                <TableData>勘定科目</TableData>
                <TableData>区分</TableData>
                {/* <TableData>削除</TableData> */}
              </tr>
            </thead>
            <tbody>
              {this.props.accounts.map((account, Index) => {
                return (
                  <tr key={Index}>
                    <TableData>{account.id}</TableData>
                    <TableData>{account.account}</TableData>
                    <TableData>{account.type}</TableData>
                    {/* <TableData>
                      <form onClick={() => this.handleDeletion(account.id)}>
                        <input type="submit" value="Delete" />
                      </form>
                    </TableData> */}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const TableData = styled.td`
  height: 40px;
  padding: 10px;
  text-align: center;
`
const EnrollButton = styled.button`
  font-size: 14px;
  display: block;
  font-family: HiraginoSans;
  font-weight: 300;
  margin-left: 20px;
  line-height: 1;
  padding: 10px 30px 10px 30px;
  border-radius: 10px;
  background: #386cbf;
  color: white;
`
