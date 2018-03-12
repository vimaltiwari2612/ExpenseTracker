@isTest(seeAllData=false)
private class ExpensesControllerTest {
    
    static testMethod void testAllMethods()
    {
         List<Expense__c> expenses=ExpensesController.getExpenses();
        ExpensesController e= new ExpensesController();
       expenses= ExpensesController.getExpensesByReimbursedState('');
       expenses= ExpensesController.getExpensesByReimbursedState('false');
        expenses=ExpensesController.saveExpense(new Expense__c(),'');
        expenses=ExpensesController.saveExpense(new Expense__c(),'false');
        Expense__C e1=[select id from Expense__c limit 1];
        expenses= ExpensesController.deleteExpense(e1,'false');
      Expense__C e2=[select id from Expense__c limit 1];
        expenses=ExpensesController.deleteExpense(e2,'');
        
    }
	
}