import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Icon, Dialog } from '@icedesign/base';
import './CustomTable.scss';

const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      transactionID: 'T6569400-1516-0A3F-E3FA-7F222CC79221',
      transactionDate: '2018-12-08',
      transactionType: 'Payment',
      paymentMethod: 'Card',
      amount: 412,
      currency: 'MYR',
      amountText: 'RM 412.00',
      statusCode: 1,
      status: 'OK',
      description: 'Ride',
      createdAt: 1544235050
    }
  });
};

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      dataSource: getData(),
    };
  }

  onClickDelete = () => {
    Dialog.confirm({
      title: 'Refund Transaction',
      locale: {
        ok: 'OK',
      cancel: 'Cancel' },
      style: { width: '400px' },
      content: 'Are you sure you want to refund this transaction',
      onOk: () => {
        // TODO
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
    return (
      <div style={styles.state}>
        <span style={styles.circle} />
        <span style={styles.stateText}>{value}</span>
      </div>
    );
  };

  renderAction = () => {
    const splitSpan = <span className="actions-split">|</span>;
    const viewAction = <Link to="view">View</Link>;
    const refundAction = <a href="javascrpt:void(0)" onClick={this.onClickDelete}>Refund</a>;
    return (
      <div>
        {viewAction}
        {splitSpan}
        {refundAction}
      </div>
    );
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <Table
          dataSource={dataSource}
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
          <Table.Column title="Action" cell={this.renderAction} />
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
    background: '#28a745',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
  stateText: {
    color: '#28a745',
  },
};
