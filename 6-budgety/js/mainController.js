// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

  var setupEventListeners = function() {

    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
  }

  var ctrlAddItem = function () {
    var input, newItem;

    // get input field data
    input = UICtrl.getInput();

    // validate inputs
    if (input.description === "" || isNaN(input.value) || input.value <= 0)
      return;

    // create new input object and store values
    newItem = budgetCtrl.addItem(input.type, input.desc, parseFloat(input.value));

    // add item to UI
    UICtrl.addListItem(newItem, input.type);

    // clear input fields
    UICtrl.clearFields();

    // update budget
    updateBudget();

    // update percentages
    updatePercentages();
  }

  var ctrlDeleteItem = function(event) {
    var itemId, splitId, type, id;

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      splitId = itemId.split('-');

      type = splitId[ 0 ];
      id = splitId[ 1 ];

      // delete item from data structure
      budgetCtrl.deleteItem(type, id);

      // delete item from UI
      UICtrl.deleteItem(itemId);

      // update and show the new budget
      updateBudget();

      // update percentages
      updatePercentages();
    }
  }

  var updateBudget = function() {
    // calculate the budget
    budgetCtrl.calculateBudget();

    // get budget
    var budget = budgetCtrl.getBudget();

    // display the budget on the UI
    UICtrl.displayBudget(budget);
  }

  var updatePercentages = function() {
    // calculate the percentages
    budgetCtrl.calculatePercentages();

    // get them from the budget controller
    var allPercentages = budgetCtrl.getPercentages();

    // update the UI
    UICtrl.displayPercentages(allPercentages);
  }

  return {
    init : function() {
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget : 0,
        totalInc : 0,
        totalExp : 0,
        percentage : -1
      });
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();
