import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Icon, Dialog } from '@icedesign/base';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from '../../../../utils/injectReducer';
import transactionReducer from '../../../../store/transaction/reducer';
import { fetchTransactionList, refundTransaction } from '../../../../store/transaction/action';
import styled from 'styled-components';

const TransactionContainer = styled.div`
  table th {
    background: #f4f4f4;
  }
`;

const Splitter = styled.span`
  margin: 0 8px;
`;

const Circle = styled.span`
display: inline-block;
width: 8px;
height: 8px;
border-radius: 50px;
margin-right: 4px;
`;

const ColumnContainer = styled.div`
`;

const GreenCircle = styled(Circle)`
  background-color: #28a745;
`;

const RedCircle = styled(Circle)`
  background-color: #d73535;
`;

const GreenLabel = styled.span`
  color: #28a745;
`;

const RedLabel = styled.span`
  color: #d73535;
`;

const StyledPagination = styled(Pagination)`
  margin: 20px 0;
  text-align: center;
`;

class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
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

  handlePagination = (currentPage) => {
    // TODO: Handle Pagination
    this.setState({
      currentPage,
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
      <ColumnContainer>
        {value == 'REFUNDED'? <RedCircle/>: <GreenCircle/>}
        {value == 'REFUNDED'? <RedLabel>{value}</RedLabel>: <GreenLabel>{value}</GreenLabel>}
      </ColumnContainer>
    );
  };

  renderAction = (value, index) => {
    const viewAction = <Link to="view">View</Link>;
    const refundAction = <a href="javascrpt:void(0)" onClick={this.onClickRefund.bind(this, value, index)}>Refund</a>;
    return (
      <ColumnContainer>
        {viewAction}
        <Splitter>|</Splitter>
        {refundAction}
      </ColumnContainer>
    );
  };

  render() {
    const { transactionList = [] } = this.props;
    return (
      <TransactionContainer>
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
        <StyledPagination
          locale={{
            prev: 'Previous',
            next: 'Next',
            goTo: 'Go to',
            page: 'Page',
            go: 'Go',
            pageSize: 'Items per page:'
          }}
          current={this.state.currentPage}
          onChange={this.handlePagination}
        />
      </TransactionContainer>
    );
  }
}

const mapDispatchToProps = {
  fetchTransactionList, refundTransaction
};

const mapStateToProps = (state) => {
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
