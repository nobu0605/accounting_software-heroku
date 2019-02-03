import React, { Component } from 'react'
import axios from 'axios'
import Header from '../components/Header.js'
import styled from 'styled-components'
import moment from 'moment'
import ModalWindow from '../components/modal.js'
import Cookies from 'universal-cookie'
import { CSVLink } from 'react-csv'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      csv: ''
    }
    this.handleDeletion = this.handleDeletion.bind(this)
  }

  static async getInitialProps() {
    const res = await axios.get('http://167.99.71.79/api/journals')
    const resonse = await axios.get('http://167.99.71.79/api/accounts')
    return { journals: res.data, account: resonse.data }
  }

  handleDeletion(id) {
    let uri = 'http://167.99.71.79/api/journals/' + id
    axios.delete(uri)
    location.href = 'http://localhost:3000/list'
  }

  render() {
    const account = this.props.account

    return (
      <div>
        <Header />
        <h1 style={{ margin: 20 }}>仕訳日記帳</h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CsvButton>
            <CSVLink style={{ color: 'white' }} data={this.props.journals}>
              CSVダウンロード
            </CSVLink>
          </CsvButton>
        </div>
        <table style={{ margin: 20 }} border="1" rules="all">
          <thead>
            <tr>
              <TableData>伝票No</TableData>
              <TableData>日付</TableData>
              <TableData>借方科目</TableData>
              <TableData>補助科目</TableData>
              <TableData>借方金額</TableData>
              <TableData>貸方科目</TableData>
              <TableData>補助科目</TableData>
              <TableData>貸方金額</TableData>
              <TableData>摘要</TableData>
              <TableData>編集</TableData>
              <TableData>削除</TableData>
            </tr>
          </thead>
          <tbody>
            {this.props.journals.map((journal, Index) => {
              return (
                <tr key={Index}>
                  <TableData>{journal.id}</TableData>
                  <TableData>{moment(journal.date).format('Y/M/DD')}</TableData>
                  <TableData>{account[journal.debit - 1].account}</TableData>
                  <TableData>{journal.debit_sub_account}</TableData>
                  <TableData>{journal.amount}</TableData>
                  <TableData>{account[journal.credit - 1].account}</TableData>
                  <TableData>{journal.credit_sub_account}</TableData>
                  <TableData>{journal.amount}</TableData>
                  <TableData>{journal.remark}</TableData>
                  <TableData>
                    <ModalWindow journalData={journal} account={account} />
                  </TableData>
                  <TableData>
                    <form onClick={() => this.handleDeletion(journal.id)}>
                      <DeleteButton type="submit" value="Delete" />
                    </form>
                  </TableData>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const TableData = styled.td`
  height: 40px;
  padding: 10px;
  text-align: center;
`
const DeleteButton = styled.input`
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
const CsvButton = styled.button`
  font-size: 14px;
  display: inline-block;
  font-family: HiraginoSans;
  font-weight: 300;
  margin-right: 100px;
  margin-top: -20px;
  line-height: 1;
  padding: 10px 30px 10px 30px;
  border-radius: 10px;
  background: #386cbf;
  color: white;
`
