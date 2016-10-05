import React, { Component } from 'react';

class ExpenseForm extends Component {
  
  constructor(props) {
    super(props);
    this.addExpense = this.addExpense.bind(this);
    this.state = { 
      description: "",
      cost: 0,
      worthIt: false,
    };
  }

  addExpense(eid){
    var expenseDetails = this.state;

    expenseDetails.cost = parseFloat(expenseDetails.cost).toFixed(2);
    expenseDetails.id = new Date().getTime();

    this.props._addExpense(expenseDetails);

    this.setState({
      description: "",
      cost: 0,
      worthIt: false,
    })
  }

  changeDescription(e){
    this.setState({
      description: e.target.value,
    })
  }

  changeCost(e){
    this.setState({
      cost: e.target.value,
    })
  }

  changeWorthIt(e) {
    console.log(e.target);
    this.setState({
      worthIt: e.target.value,
    })
  }


  render() {
  	const self = this;
    return (
    	<div className="expense-add-contain">
          <input id="add-expense" className="input input--description" type="text" placeholder="Description" value={self.state.description} onChange={(e)=>self.changeDescription(e)}/>
          <input className="input input--cost" type="number" placeholder="Cost" min="0.01" step="0.01" max="2500" value={self.state.cost} onChange={(e)=>self.changeCost(e)}/>

          <input  onChange={(e)=>self.changeWorthIt(e)} type="checkbox"/>
      		<button className="button add" onClick={()=>self.addExpense()}>Add</button>
    	</div>
      
    );
  }
}

export default ExpenseForm;


