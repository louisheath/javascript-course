// UI CONTROLLER
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    monthLabel: '.budget__title--month'
  }

  // function to prettify numbers
  var formatNumber = function(num, type) {
    var int, dec, commas;

    // cast to int
    num = Math.abs(num);

    // 2 decimal places
    num = num.toFixed(2);

    numSplit = num.split('.');
    int = numSplit[ 0 ];
    dec = numSplit[ 1 ];

    // commas every thousand
    commas = int.length / 3;
    for (var i = 1; i < commas; i++)
      // math: (i*3) is the number of zeros on that iteration. (i-1) accounts for the new commas
      int = int.substring(0, int.length - (i * 3) - (i - 1)) + ',' + int.substring(int.length - (i * 3) - (i - 1), int.length);

    type === 'exp' ? sign = '- ' : sign = '+ ';

    return sign + int + '.' + dec;
  }

  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[ i ], i);
    }
  };

  return {
    getInput : function() {
      return {
        type : document.querySelector(DOMstrings.inputType).value, // will be 'inc' or 'exp'
        desc : document.querySelector(DOMstrings.inputDescription).value,
        value : document.querySelector(DOMstrings.inputValue).value
      }
    },

    clearFields : function() {
      var fields;

      // returns a list, not an array
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      // convert to array
      fields = Array.prototype.slice.call(fields);

      fields.forEach(function(field) {
        field.value = "";
      })
      // set focus on description input
      fields[ 0 ].focus();
    },

    addListItem : function (obj, type) {
      var html, container;

      // create html templates
      if (type === 'inc') {
        container = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      else if (type === 'exp') {
        container = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // replace placeholder text
      html = html.replace('%id%', obj.id);
      html = html.replace('%desc%', obj.description);
      html = html.replace('%val%', formatNumber(obj.value, type));

      // insert into DOM
      document.querySelector(container).insertAdjacentHTML('beforeend', html);
    },

    displayBudget : function(obj) {

      var type = (obj.budget >= 0) ? 'inc' : 'exp';

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
      // only show percentage if positive
      if (obj.percentage > 0)
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      else
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
    },

    displayPercentages : function(percentages) {
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      nodeListForEach(fields, function(field, index) {
        if (percentages[ index ] > 0)
          field.textContent = percentages[ index ] + '%';
        else
          field.textContent = '---';
      });
    },

    displayMonth : function() {
      var now, months;

      now = new Date();
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      month = months[ now.getMonth() ];

      document.querySelector(DOMstrings.monthLabel).textContent = month;
    },

    changeType : function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputType + ',' +
        DOMstrings.inputDescription + ',' +
        DOMstrings.inputValue
      );

      nodeListForEach(fields, function(field, index) {
        field.classList.toggle('red-focus');
      });

      document.querySelector(DOMstrings.inputButton).classList.toggle('red');
    },

    deleteItem : function(selectorId) {
      // we can only remove a child element, so traverse to parent
      var el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);
    },

    getDOMstrings : function() {
      return DOMstrings;
    }
  };
})();
