import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import axios from 'axios'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '50%',
    width: '80%',
    borderRadius: '20px',
    textAlign: 'center'
  },
  overlay: {
    backgroundColor: '#2E2E2E'
  }
}

export default class ModalWindow extends React.Component {
  constructor(props) {
    super(props)
    const {
      id,
      date,
      debit,
      debit_sub_account,
      amount,
      credit,
      credit_sub_account,
      remark
    } = props.journalData

    const account = props.account

    this.state = {
      modalIsOpen: false,
      id: id,
      date: date,
      debit: debit,
      debitAccount: account[debit - 1].account,
      debit_sub_account: debit_sub_account,
      credit: credit,
      creditAccount: account[credit - 1].account,
      credit_sub_account: credit_sub_account,
      amount: amount,
      remark: remark,
      user_id: 1,
      account: account
    }
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    this.subtitle.style.color = 'black'
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  handleChange(e, input) {
    this.setState({ [input]: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const journals = {
      date: this.state.date,
      debit: this.state.debit,
      debit_sub_account: this.state.debit_sub_account,
      credit: this.state.credit,
      credit_sub_account: this.state.credit_sub_account,
      amount: this.state.amount == 0 ? '' : this.state.amount,
      remark: this.state.remark,
      user_id: this.state.user_id
    }
    let uri =
      'https://api-accounting-software.herokuapp.com/api/journals/' +
      this.props.journalData.id
    axios.patch(uri, journals).then(response => {
      location.href = 'https://accounting-soft.herokuapp.com/list'
    })
  }

  render() {
    return (
      <div>
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
          onClick={this.openModal}
        >
          <button
            style={{
              fontSize: 14,
              display: 'block',
              fontFamily: 'HiraginoSans',
              fontWeight: 300,
              textAlign: 'center',
              lineHeight: 1,
              padding: '10px 30px 10px 30px ',
              borderRadius: 10,
              background: '#2E2E2E',
              color: 'white'
            }}
          >
            Edit
          </button>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>伝票修正</h2>
          <form onSubmit={this.handleSubmit}>
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
                </tr>
              </thead>

              <tbody>
                <tr>
                  <TableData>
                    <JournalInput type="hidden" value={this.state.id} />
                    {this.state.id}
                  </TableData>

                  <TableData>
                    <input
                      type="date"
                      value={this.state.date}
                      onChange={e => this.handleChange(e, 'date')}
                    />
                  </TableData>

                  <TableData>
                    <select
                      style={{ fontSize: 15, marginLeft: 10, width: 80 }}
                      onChange={e => this.handleChange(e, 'debit')}
                    >
                      <option value="">選択してください</option>
                      {this.state.account.map((account, Index) => {
                        return account.account == this.state.debitAccount ? (
                          <option key={Index} value={account.id} selected>
                            {account.account}
                          </option>
                        ) : (
                          <option key={Index} value={account.id}>
                            {account.account}
                          </option>
                        )
                      })}
                    </select>
                  </TableData>

                  <TableData>
                    <JournalInput
                      type="text"
                      value={this.state.debit_sub_account}
                      onChange={e => this.handleChange(e, 'debit_sub_account')}
                    />
                  </TableData>

                  <TableData>
                    <JournalInput
                      type="number"
                      value={this.state.amount}
                      onChange={e => this.handleChange(e, 'amount')}
                    />
                  </TableData>

                  <TableData>
                    <select
                      style={{ fontSize: 15, marginLeft: 10, width: 80 }}
                      onChange={e => this.handleChange(e, 'credit')}
                    >
                      <option value="">選択してください</option>
                      {this.state.account.map((account, Index) => {
                        return account.account == this.state.creditAccount ? (
                          <option key={Index} value={account.id} selected>
                            {account.account}
                          </option>
                        ) : (
                          <option key={Index} value={account.id}>
                            {account.account}
                          </option>
                        )
                      })}
                    </select>
                  </TableData>

                  <TableData>
                    <JournalInput
                      type="text"
                      value={this.state.credit_sub_account}
                      onChange={e => this.handleChange(e, 'credit_sub_account')}
                    />
                  </TableData>

                  <TableData>{this.state.amount}</TableData>

                  <TableData>
                    <JournalInput
                      type="text"
                      value={this.state.remark}
                      onChange={e => this.handleChange(e, 'remark')}
                    />
                  </TableData>

                  <TableData>
                    <button
                      style={{
                        fontSize: 14,
                        display: 'block',
                        fontFamily: 'HiraginoSans',
                        fontWeight: 300,
                        textAlign: 'center',
                        lineHeight: 1,
                        padding: '10px 30px 10px 30px ',
                        borderRadius: 10,
                        background: '#2E2E2E',
                        color: 'white'
                      }}
                    >
                      Edit
                    </button>
                  </TableData>
                </tr>
              </tbody>
            </table>
          </form>
        </Modal>
      </div>
    )
  }
}

const TableData = styled.td`
  height: 40px;
  width: 100px;
  padding: 10px;
  text-align: center;
`
const JournalInput = styled.input`
  width: 100px;
`
