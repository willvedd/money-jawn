import React, { Component } from 'react';

class Expense extends Component {
  
  constructor(props) {
    super(props);
    this.tick = this.deleteExpense.bind(this);

    this.state = {
    	edit: false,
    	cost: this.props.cost,
    	description: this.props.description,
    }
  }

  deleteExpense(eid){
  	this.props._deleteExpense(eid);
  }

  toggleEdit(){
  	this.setState({
  		edit: !this.state.edit,
  	})
  }

  saveEdit(eid,editDetails){
  	this.props._editExpense(eid,editDetails);
  	this.setState({
  		edit: false,
  	})
  }


  editCost(e){
  	this.setState({
  		cost: e.target.value,
  	})
  }

  editDescription(e){
  	this.setState({
  		description: e.target.value,
  	})
  }

  render() {
  	const self = this;

  	if(self.state.edit){
  		return (
  			<div className="expense-item edit-mode">
	      		<div className="expense-edit-form">
		      		<input className="input input--description" type="text" value={self.state.description} onChange={(e)=>self.editDescription(e)} placeholder="Description" />
		      		<input className="input input--cost" type="number" min="0.01" step="0.01" max="2500"  value={self.state.cost}  onChange={(e)=>self.editCost(e)} placeholder="Cost"/>
	      		</div>
	      		<div className="buttons-contain">
		      		<button className="button save" onClick={()=>self.saveEdit(self.props.eid,self.state)}>Save</button>
		      		<button className="button delete" onClick={()=>self.deleteExpense(self.props.eid)}>Delete</button>
	      		</div>
	      	</div>
	    )
  	}
  	else{
  		return (
  			<div className="expense-item">
	      		<span className="expense-description">{self.props.description}</span> - <span className="expense-cost">{"$" + self.props.cost}</span>
	      		<button className="button edit" onClick={()=>self.toggleEdit()}>Edit</button>
	      	</div> 
	     )    	
  	}
  }
}

export default Expense;


