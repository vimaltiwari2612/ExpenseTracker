({
    doInit : function(component, event, helper) {
        var mydate = component.get("v.expense.Date__c");
        if(mydate){
            component.set("v.formatdate", new Date(mydate));
        }
    },
     clickReimbursed: function(component, event, helper) {
        var expense = component.get("v.expense");
        var updateEvent = component.getEvent("updateExpense");
        updateEvent.setParams({ "expense": expense });
        updateEvent.fire();
    },
    
     deleteRecord: function(component, event, helper) {
        var expense = component.get("v.expense");
         event.getSource().set("v.alternativeText","Deleting this Expense");
         event.getSource().set('v.variant',"destructive");
        var updateEvent = component.getEvent("deleteExpense");
        updateEvent.setParams({ "expense": expense });
        updateEvent.fire();
        
    }
    
    
})