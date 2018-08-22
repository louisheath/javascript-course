// BUDGET CONTROLLER
var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0 && this.value > 0)
      this.percentage = Math.round(1000 * this.value / totalIncome) / 10;
    else
      this.percentage = -1;
  }

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  }

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // function to find total income / expenses
  var calculateTotal = function(type) {
    var sum = 0;

    data.allItems[ type ].forEach(function(item) {
      sum += item.value;
    });

    data.totals[ type ] = sum;
  }

  // all budget-related data
  var data = {
    allItems : {
      exp : [],
      inc : []
    },
    totals : {
      exp : 0,
      inc : 0
    },
    budget : 0,
    percentage : -1
  }

  return {
    addItem : function(type, desc, value) {

      var newItem;
      // Create new ID which is one larger than the id of the last expense/income in array
      if (data.allItems[ type ].length === 0)
        var id = 0;
      else
        var id = data.allItems[ type ][ data.allItems[ type ].length - 1].id + 1;

      if (type === 'exp')
        newItem = new Expense(id, desc, value);
      else if (type === 'inc')
        newItem = new Income(id, desc, value);

      // append new item to data structure
      data.allItems[ type ].push(newItem);

      return newItem;
    },

    calculateBudget : function() {
      // total incomes and expenses
      calculateTotal('inc');
      calculateTotal('exp');

      // calculate remaining budget
      data.budget = data.totals[ 'inc' ] - data.totals[ 'exp' ];

      // calculate percentage of income currently spent
      if (data.totals[ 'inc' ] > 0)
        data.percentage = Math.round(100 * data.totals[ 'exp' ] / data.totals[ 'inc' ]);
      else
        data.percentage = -1;
    },

    calculatePercentages : function () {
      data.allItems.exp.forEach(exp => {
        exp.calcPercentage(data.totals.inc);
      });
    },

    getBudget : function() {
      return {
        budget : data.budget,
        totalInc : data.totals.inc,
        totalExp : data.totals.exp,
        percentage : data.percentage
      };
    },

    getPercentages : function () {
      var allPercentages = data.allItems.exp.map(exp => {
        return exp.getPercentage();
      });
      return allPercentages;
    },

    deleteItem : function(type, id) {
      var ids, index;

      // get ids of all inc/exp items
      ids = data.allItems[ type ].map(function(current) {
        return current.id;
      });
      // get index of target item
      index = ids.indexOf(parseInt(id));

      // remove item
      if (index !== -1) {
        data.allItems[ type ].splice(index, 1);
      }
    }
  };
})();
