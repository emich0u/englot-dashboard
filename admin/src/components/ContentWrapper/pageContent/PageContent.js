import React, { Component } from "react";

import Heading from "./Heading";
import CardUser from "./CardUser";
import CardSell from "./CardSell";
import CardFeed from "./CardFeed";
import DataTable from "./DataTable";

class PageContent extends Component {
  render() {
    return (
      <div class="container-fluid">
        <Heading />
        {/* <!-- Content Row --> */}
        <div className="row">
          <CardUser />
          <CardSell />
          <CardFeed />
          <DataTable />
        </div>
      </div>
    );
  }
}
export default PageContent;
