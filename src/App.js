import React, { Component } from 'react';
import './App.css';
import Expense from './components/expense.js';
import ExpenseForm from './components/expense-form.js';
import Stats from './components/stats.js';


var defaultExpenses = [];
if(typeof localStorage.expenses != 'undefined'){
  defaultExpenses = JSON.parse(localStorage.expenses);
}

var expense_set = defaultExpenses;

class App extends Component {
  constructor(){
    super();
    this.addExpense = this.addExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  addExpense(expenseData){
    expenseData.cost = parseFloat(expenseData.cost).toFixed(2);
    expense_set.push(expenseData)
    localStorage.setItem('expenses', JSON.stringify(expense_set));
    this.forceUpdate();
  }

  deleteExpense(eid){
    expense_set = expense_set.filter(function(expense){
      return (expense.id !== eid);
    })
    localStorage.setItem('expenses', JSON.stringify(expense_set));
    this.forceUpdate();
  }

  editExpense(eid,editInfo){
    expense_set.forEach(function(expense){
      if(expense.id === eid){
        expense.cost = parseFloat(editInfo.cost).toFixed(2);
        expense.description = editInfo.description;
      }
    })
    localStorage.setItem('expenses', JSON.stringify(expense_set));
    this.forceUpdate();
  }

  clearAll(){
    localStorage.setItem('expenses','');
    expense_set = [];
    this.forceUpdate();
  }


  focusOnForm(){
    document.getElementById("add-expense").focus();
  }

  render() {
    const self = this;
    return (
      <div className="App">
        <div id="add"></div>      
        <nav className="navigation">
          <a href="#add" onClick={()=>self.focusOnForm()}>Add</a>
          <a href="#history">History</a>
          <a href="#stats">Stats</a>
        </nav>
        <div className="push"></div>
        <ExpenseForm _addExpense={self.addExpense}/>
        <div className="expenses-contain" id="history">
          {
            expense_set.map(function(expense){
              return(
                <Expense 
                  eid={expense.id}
                  key={expense.id}
                  cost={expense.cost}
                  description={expense.description}
                  worthIt={expense.wasWorthIt}
                  _deleteExpense={self.deleteExpense} 
                  _editExpense={self.editExpense}/>
              )
            })
          }
        </div>
        <hr/>
        <Stats data={expense_set}/>
      </div>
    );
  }
}

export default App;
