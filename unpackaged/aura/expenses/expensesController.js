({
    clickCreate: function(component, event, helper) {
        var validExpense = component.find('expenseform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
            // Create the new expense
            var newExpense = component.get("v.newExpense");
            console.log("Create expense: " + JSON.stringify(newExpense));
             var selectOption = component.get('v.selectedFilter');
            helper.createExpense(component, newExpense ,selectOption);
          
        }
    },
    
        handleUpdateExpense: function(component, event, helper) {
        var updatedExp = event.getParam("expense");
        var selectOption = component.get('v.selectedFilter');
        helper.updateExpense(component, updatedExp , selectOption);
    },

	handleDeleteExpense: function(component, event, helper) {
        var deletedExp = event.getParam("expense");
         var selectOption = component.get('v.selectedFilter');
        helper.deleteExpense(component, deletedExp ,selectOption);
    },
    
          // Load expenses from Salesforce
    doInit: function(component, event, helper) {

        // Create the action
        var action = component.get("c.getExpenses");

        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.expenses", response.getReturnValue());
                 component.set("v.expensesCount", response.getReturnValue().length);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });

        // Send action off to be executed
        $A.enqueueAction(action);
    },  
    
    filterItems : function(component , event , helper)
    {
        var selectOption = component.get('v.selectedFilter');
        if(selectOption == "")
            component.refreshDatabase();
        else
        	helper.filterData(component,selectOption);
    },
    
    getData : function(component , event , helper)
    {
        console.log(component.get('v.dataToBeSearched'));
        
    }
    
})