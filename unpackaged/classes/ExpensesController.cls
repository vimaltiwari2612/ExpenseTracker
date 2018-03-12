public with sharing class ExpensesController {

    public static List<Expense__c> expenses {get;set;}
     
 
    public ExpensesController()
    {
        expenses=getExpenses();
    }
    
    @AuraEnabled
    public static List<Expense__c> getExpenses() {
        // Perform isAccessible() checking first, then
        expenses= [SELECT Id, Name, Amount__c, Client__c, Date__c, 
                       Reimbursed__c, CreatedDate 
                FROM Expense__c order by CreatedDate desc ];
        return expenses;
    }
    
    
    @AuraEnabled
    public static List<Expense__c> getExpensesByReimbursedState(String value) {
        Boolean val=Boolean.valueOf(value);
        
        expenses =[SELECT Id, Name, Amount__c, Client__c, Date__c, 
                       Reimbursed__c, CreatedDate 
                FROM Expense__c where Reimbursed__c=:val order by CreatedDate desc ];
        return expenses;
    }
    
    
    @AuraEnabled
    public static List<Expense__c> saveExpense(Expense__c expense , String value) {
         upsert expense;
        if(value.trim()=='All' || value.trim()=='')
            return getExpenses();
        return getExpensesByReimbursedState(value);
    }
    
    @AuraEnabled
    public static List<Expense__c> deleteExpense(Expense__c expense , String value) {
        // Perform isUpdatable() checking first, then
     	delete expense;
       if(value.trim()=='All' || value.trim()=='')
          	return getExpenses();
       return getExpensesByReimbursedState(value);
    }
}