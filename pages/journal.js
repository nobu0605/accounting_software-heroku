import React from 'react'
import Head from '../components/Head.js'
import Header from '../components/Header.js'
import axios from 'axios'
import styled from 'styled-components'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      debit: '',
      debit_sub_account: '',
      credit: '',
      credit_sub_account: '',
      amount: 0,
      creditAmount: 0,
      remark: '',
      user_id: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  static async getInitialProps() {
    const response = await axios.get(
      'https://api-accounting-software.herokuapp.com/api/accounts'
    )
    return { accounts: response.data, errors: response.data }
  }

  handleChange(e, input) {
    this.setState({ [input]: e.target.value })
    if (input == 'amount') {
      this.setState({ creditAmount: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const journal = {
      date: this.state.date,
      debit: this.state.debit,
      debit_sub_account: this.state.debit_sub_account,
      credit: this.state.credit,
      credit_sub_account: this.state.credit_sub_account,
      amount: this.state.amount == 0 ? '' : this.state.amount,
      remark: this.state.remark,
      user_id: this.state.user_id
    }
    let uri = 'https://api-accounting-software.herokuapp.com/api/journals'
    axios
      .post(uri, journal)
      .then(response => {
        location.href = 'https://accounting-soft.herokuapp.com/list'
      })
      .catch(error => {
        if (error.response) {
          this.setState({
            errors: error.response.data
          })
        }
      })
  }

  render() {
    const {
      date,
      debit,
      debit_sub_account,
      credit,
      credit_sub_account,
      amount,
      remark
    } = this.state.errors == undefined ? '' : this.state.errors.errors

    return (
      <div>
        <Head />
        <Header />
        <h1 style={{ margin: 20 }}>振替伝票</h1>
        <form onSubmit={this.handleSubmit}>
          <table style={{ margin: 20 }} border="1" rules="all">
            <thead>
              <tr>
                <TableData>取引日</TableData>
                <TableData>借方科目</TableData>
                <TableData>補助科目</TableData>
                <TableData>借方金額</TableData>
                <TableData>貸方科目</TableData>
                <TableData>補助科目</TableData>
                <TableData>貸方金額</TableData>
                <TableData>摘要</TableData>
                <TableData>登録</TableData>
              </tr>
            </thead>

            <tbody>
              <tr>
                <TableData>
                  <input
                    type="date"
                    onChange={e => this.handleChange(e, 'date')}
                  />
                  <ErrorData
                    style={{
                      display: this.state.errors == undefined ? 'none' : 'block'
                    }}
                  >
                    {this.state.errors == undefined ? '' : date}
                  </ErrorData>
                </TableData>

                <TableData>
                  <select
                    style={{ fontSize: 15, marginLeft: 10, width: 150 }}
                    onChange={e => this.handleChange(e, 'debit')}
                  >
                    <option value="">選択してください</option>
                    {this.props.accounts.map((account, Index) => {
                      return (
                        <option key={Index} value={account.id}>
                          {account.account}
                        </option>
                      )
                    })}
                  </select>
                  <ErrorData
                    style={{
                      display: this.state.errors == undefined ? 'none' : 'block'
                    }}
                  >
                    {this.state.errors == undefined ? '' : debit}
                  </ErrorData>
                </TableData>

                <TableData>
                  <JournalInput
                    type="text"
                    onChange={e => this.handleChange(e, 'debit_sub_account')}
                  />
                  <ErrorData
                    style={{
                      display: this.state.errors == undefined ? 'none' : 'block'
                    }}
                  >
                    {this.state.errors == undefined ? '' : debit_sub_account}
                  </ErrorData>
                </TableData>

                <TableData>
                  <JournalInput
                    type="number"
                    min="0"
                    onChange={e => this.handleChange(e, 'amount')}
                  />
                  <ErrorData
                    style={{
                      display: this.state.errors == undefined ? 'none' : 'block'
                    }}
                  >
                    {this.state.errors == undefined ? '' : amount}
                  </ErrorData>
                </TableData>

                <TableData>
                  <select
                    style={{ fontSize: 15, marginLeft: 10, width: 150 }}
                    onChange={e => this.handleChange(e, 'credit')}
                  >
                    <option value="">選択してください</option>
                    {this.props.accounts.map((account, Index) => {
                      return (
                        <option key={Index} value={account.id}>
                          {account.account}
                        </option>
                      )
                    })}
                  </select>
                  <ErrorData
                    style={{
                      display: this.state.errors == undefined ? 'none' : 'block'
                    }}
                  >
                    {this.state.errors == undefined ? '' : credit}
                  </ErrorData>
                </TableData>

                <TableData>
                  <JournalInput
                    type="text"
                    onChange={e => this.handleChange(e, 'credit_sub_account')}
                  />
                  <ErrorData
                    style={{
                      display: this.state.errors == undefined ? 'none' : 'block'
                    }}
                  >
                    {this.state.errors == undefined ? '' : credit_sub_account}
                  </ErrorData>
                </TableData>

                <TableData>{this.state.creditAmount}</TableData>

                <TableData>
                  <JournalInput
                    type="text"
                    onChange={e => this.handleChange(e, 'remark')}
                  />
                  <ErrorData
                    style={{
                      display: this.state.errors == undefined ? 'none' : 'block'
                    }}
                  >
                    {this.state.errors == undefined ? '' : remark}
                  </ErrorData>
                </TableData>

                <TableData>
                  <EnrollButton>登録</EnrollButton>
                </TableData>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

const ErrorData = styled.span`
  color: red;
  padding-top: 10px;
  font-size: 15px;
`
const TableData = styled.td`
  height: 40px;
  width: 150px;
  padding: 10px;
  text-align: center;
`
const JournalInput = styled.input`
  width: 100px;
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
