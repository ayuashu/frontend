import React, { Component } from 'react';
import FetchAPI from './FetchAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      groupByUser: null, // Store grouped data here
      apiData: null, // Store fetched API data here
    };
  }

  // Callback function to handle the fetched data
  handleDataFetch = (data) => {
    this.setState({ apiData: data });
  };

  // Group by user id
  groupByUserId(data) {
    const groupedData = {};

    for (const item of data) {
      const userId = item.userId;

      if (!groupedData[userId]) {
        groupedData[userId] = [];
      }

      groupedData[userId].push(item);
    }

    return groupedData;
  }

  handleGroupByUser = () => {
    const { apiData } = this.state; // Access apiData from state, not props
    const groupedData = this.groupByUserId(apiData.tickets);
    this.setState({ groupByUser: groupedData });
  };

  // Group by status
  groupByStatus(data) {
    const groupedData = {};

    for (const item of data) {
      const status = item.status;

      if (!groupedData[status]) {
        groupedData[status] = [];
      }

      groupedData[status].push(item);
    }

    return groupedData;
  }

  handleGroupByStatus = () => {
    const { apiData } = this.state; // Access apiData from state, not props
    const groupedData = this.groupByStatus(apiData.tickets);
    this.setState({ groupByUser: null, groupByStatus: groupedData }); // Clear previous grouping
  };

  // Group by priority
  groupByPriority(data) {
    const groupedData = {};

    for (const item of data) {
      const priority = item.priority;

      if (!groupedData[priority]) {
        groupedData[priority] = [];
      }

      groupedData[priority].push(item);
    }

    return groupedData;
  }

  handleGroupByPriority = () => {
    const { apiData } = this.state; // Access apiData from state, not props
    const groupedData = this.groupByPriority(apiData.tickets);
    this.setState({ groupByUser: null, groupByStatus: null, groupByPriority: groupedData }); // Clear previous grouping
  };

  // Function to order the API data by priority
  orderDataByPriority(data) {
    return data.order((a, b) => a.priority - b.priority);
  }

  // Function to order the API data by title
  orderDataByTitle(data) {
    return data.order((a, b) => a.title.localeCompare(b.title));
  }

  handleOrderByPriority = () => {
    const { apiData } = this.state; // Access apiData from state, not props
    const orderedData = this.orderDataByPriority(apiData.tickets);
    this.setState({ orderedData });
  };

  handleOrderByTitle = () => {
    const { apiData } = this.state; // Access apiData from state, not props
    const orderedData = this.orderDataByTitle(apiData.tickets);
    this.setState({ orderedData });
  };

  renderOrderedData(orderedData) {
    return (
      <div>
        {orderedData.map((item) => (
          <div key={item.id}>
            <p>Title: {item.title}</p>
            <p>Status: {item.status}</p>
            <p>Priority: {item.priority}</p>
          </div>
        ))}
      </div>
    );
  }

  renderGroupedData(groupedData) {
    return (
      <div>
        {Object.keys(groupedData).map((key) => (
          <div key={key}>
            <h2>{key}</h2>
            {groupedData[key].map((item) => (
              <div key={item.id}>
                <p>Title: {item.title}</p>
                <p>Status: {item.status}</p>
                <p>Priority: {item.priority}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { groupByUser, groupByStatus, groupByPriority, orderedData, apiData } = this.state;

    return (
      <div className="container">
        <h1>Search</h1>
        <FetchAPI onDataFetched={this.handleDataFetch} />
        <div>
          <h1>Group by</h1>
          <button onClick={this.handleGroupByUser}>User</button>
          <button onClick={this.handleGroupByStatus}>Status</button>
          <button onClick={this.handleGroupByPriority}>Priority</button>
        </div>
        <div>
          <h1>Order</h1>
          <button onClick={this.handleOrderByPriority}>Priority</button>
          <button onClick={this.handleOrderByTitle}>Title</button>
        </div>
        {orderedData ? this.renderOrderedData(orderedData) : null}
        {groupByUser ? this.renderGroupedData(groupByUser) : null}
        {groupByStatus ? this.renderGroupedData(groupByStatus) : null}
        {groupByPriority ? this.renderGroupedData(groupByPriority) : null}
      </div>
    );
  }
}

export default Search;
