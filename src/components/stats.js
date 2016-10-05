import React, { Component } from 'react';

class Stats extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
  	const self = this;
    var total = 0;
    var numberOf = 0;


    var monthData = {};

    self.props.data.map(function(item){
      const date = new Date(item.id);
      const monthYear =  date.getMonth() +  date.getFullYear();
      if( !(monthYear in monthData)){
        monthData[monthYear] = {display: "October 2016" , dataset:[item]};
      }else{
        monthData[monthYear].dataset.push(item);
      }
      total += parseFloat(item.cost);
      numberOf++;
    })
    console.log("monthData",monthData);

    return (
    	<div className="stats-contain" id="stats">
    		<h1>Stats - </h1>
        <p>Total: {total.toFixed(2)}</p>
        <p>Number Expenses: {numberOf}</p>
    	</div>
    );
  }
}

export default Stats;


