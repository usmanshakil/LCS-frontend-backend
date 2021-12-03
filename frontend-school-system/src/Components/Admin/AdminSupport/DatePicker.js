import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

var SelectedStartDate = moment(new Date());
var SelectedEndDate = moment(new Date().setFullYear(new Date().getFullYear() + 1));


export class HomePageDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: SelectedStartDate,
      endDate: SelectedEndDate
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate }, () => {
      this.props.getStartEndValue(this.state.startDate, this.state.endDate)
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    return (
      <div>
        <DateRangePicker
          {...this.props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          startDateId="datepicker_start_home"
          endDateId="datepicker_end_home"
          startDatePlaceholderText="Check In"
          endDatePlaceholderText="Check Out"
          isOutsideRange={() => false}
        />
      </div>
    );
  }
}