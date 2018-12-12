import React, { Component } from 'react';
import { Button, DatePicker, Select } from '@icedesign/base';

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  }

  disabledStartDate = (startValue) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value) => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div style={styles.tableFilter}>
        <div style={styles.filterItem}>
          <span style={styles.filterLabel}>Transaction Date：</span>
          <DatePicker
            disabledDate={this.disabledStartDate}
            value={startValue}
            placeholder="Start"
            locale={{
              datePlaceholder: 'Start date',
              monthPlaceholder: 'Select month',
              yearPlaceholder: 'Select year',
              rangeStartPlaceholder: 'Start date',
              rangeEndPlaceholder: 'End date',
              now: 'Now',
              selectTime: 'Select time',
              selectDate: 'Select date',
              ok: 'OK',
              clear: 'Clear'
          }}
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          &nbsp;-&nbsp;
          <DatePicker
            disabledDate={this.disabledEndDate}
            value={endValue}
            locale={{
              datePlaceholder: 'End date',
              monthPlaceholder: 'Select month',
              yearPlaceholder: 'Select year',
              rangeStartPlaceholder: 'Start date',
              rangeEndPlaceholder: 'End date',
              now: 'Now',
              selectTime: 'Select time',
              selectDate: 'Select date',
              ok: 'OK',
              clear: 'Clear'
          }}
            placeholder="End"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
        </div>
        <div style={styles.filterItem}>
          <span style={styles.filterLabel}>Status:&nbsp;&nbsp;</span>
          <Select placeholder="-">
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="checked">OK</Select.Option>
            <Select.Option value="unCheck">Refunded</Select.Option>
          </Select>
        </div>
        <Button type="primary" style={styles.submitButton}>
          Search
        </Button>
      </div>
    );
  }
}

const styles = {
  tableFilter: {
    display: 'flex',
    background: '#f4f4f4',
    padding: '10px 0',
    marginBottom: '20px',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '15px',
  },
  submitButton: {
    marginLeft: '15px',
  },
};
