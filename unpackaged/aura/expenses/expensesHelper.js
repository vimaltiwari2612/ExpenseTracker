({
    createExpense: function(component, expense ,selectOption) {
       /* var theExpenses = component.get("v.expenses");
 
        // Copy the expense to a new object
        // THIS IS A DISGUSTING, TEMPORARY HACK
        var newExpense = JSON.parse(JSON.stringify(expense));
        console.log("Expenses before 'create': " + JSON.stringify(theExpenses));
        theExpenses.push(newExpense);
        component.set("v.expenses", theExpenses);
        console.log("Expenses after 'create': " + JSON.stringify(theExpenses));
*/        
        var action = component.get("c.saveExpense");
        action.setParams({
            "expense": expense ,
            "value":selectOption
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.expenses", response.getReturnValue());
                component.set("v.expensesCount", response.getReturnValue().length);
                component.set("v.newExpense",{'sobjectType': 'Expense__c',
                        'Name': '',
                        'Amount__c': 0,
                        'Client__c': '',
                        'Date__c': '',
                        'Reimbursed__c': false});
            }
        });
        $A.enqueueAction(action);
    },
       
    
       updateExpense: function(component, expense , selectOption) {
        var action = component.get("c.saveExpense");
        action.setParams({
            "expense": expense,
            "value" : selectOption
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
               	component.set("v.expenses", response.getReturnValue());
                 component.set("v.expensesCount", response.getReturnValue().length);
            }
        });
        $A.enqueueAction(action);
    },

    deleteExpense: function(component, expense ,selectOption) {
        var action = component.get("c.deleteExpense");
        action.setParams({
            "expense": expense,
            "value" : selectOption
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                	component.set("v.expenses", response.getReturnValue());
                 component.set("v.expensesCount", response.getReturnValue().length);
            }
        });
        $A.enqueueAction(action);
    },


	filterData : function(component, value) {
        var action = component.get("c.getExpensesByReimbursedState");
        action.setParams({
            "value": value
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.expenses", response.getReturnValue());
                 component.set("v.expensesCount", response.getReturnValue().length);
            }
        });
        $A.enqueueAction(action);
    }
})