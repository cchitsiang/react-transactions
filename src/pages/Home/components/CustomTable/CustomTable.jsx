import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Icon, Dialog } from '@icedesign/base';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from '../../../../utils/injectReducer';
import transactionReducer from '../../../../store/transaction/reducer';
import { fetchTransactionList, refundTransaction } from '../../../../store/transaction/action';

import './CustomTable.scss';

class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  componentDidMount() {
    this.props.fetchTransactionList();
  }

  onClickRefund = (transactionId, index) => {
    Dialog.confirm({
      title: 'Refund Transaction',
      locale: {
        ok: 'OK',
        cancel: 'Cancel'
      },
      style: { width: '400px' },
      content: 'Are you sure you want to refund this transaction',
      onOk: () => {
        this.props.refundTransaction({ transactionId });
      },
    });
  }

  handlePagination = (current) => {
    this.setState({
      current,
    });
  };

  handleSort = (dataIndex, order) => {
    const dataSource = this.state.dataSource.sort((a, b) => {
      const result = a[dataIndex] - b[dataIndex];
      if (order === 'asc') {
        return result > 0 ? 1 : -1;
      }
      return result > 0 ? -1 : 1;
    });

    this.setState({
      dataSource,
    });
  };

  renderState = (value) => {
    var color = '#28a745';
    switch (value) {
      //TODO: Move REFUNDED to constant
      case 'REFUNDED':
        color = '#d73535';
        break;
      default:
        break;
    }
    return (
      <div style={styles.state}>
        <span style={Object.assign({}, styles.circle, {background: color})} />
        <span style={{color: color}}>{value}</span>
      </div>
    );
  };

  renderAction = (value, index) => {
    const splitSpan = <span className="actions-split">|</span>;
    const viewAction = <Link to="view">View</Link>;
    const refundAction = <a href="javascrpt:void(0)" onClick={this.onClickRefund.bind(this, value, index)}>Refund</a>;
    return (
      <div>
        {viewAction}
        {splitSpan}
        {refundAction}
      </div>
    );
  };

  render() {
    const { transactionList = [] } = this.props;
    return (
      <div>
        <Table
          dataSource={transactionList}
          onSort={this.handleSort}
          hasBorder={false}
          className="custom-table"
        >
          <Table.Column title="Date" dataIndex="transactionDate" sortable />
          <Table.Column title="Transaction ID" dataIndex="transactionID" sortable />
          <Table.Column title="Description" dataIndex="description" />
          <Table.Column title="Amount" dataIndex="amountText" />
          <Table.Column
            title="Transaction Type"
            dataIndex="transactionType"
          />
          <Table.Column
            title="Status"
            dataIndex="status"
            cell={this.renderState}
          />
          <Table.Column title="Action" dataIndex="transactionID" cell={this.renderAction} />
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handlePagination}
        />
      </div>
    );
  }
}

const styles = {
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
  editIcon: {
    color: '#999',
    cursor: 'pointer',
  },
  circle: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
};

const mapDispatchToProps = {
  fetchTransactionList, refundTransaction
};

const mapStateToProps = (state) => {
  console.log(state);
  return { transactionList: state.transaction && state.transaction.data || [], };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withTransactionReducer = injectReducer({
  key: 'transaction',
  reducer: transactionReducer,
});

export default compose(
  withTransactionReducer,
  withConnect
)(Home);
