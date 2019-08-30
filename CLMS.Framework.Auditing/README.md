# zAppDev Framework AuditTrailManager

## How to

This walkthrough tutorial will show how to use the zAppDev Framework AuditTrailManager

1. The classes you want to trail should implement the IAuditable interface.

2. In your startup.cs register the AuditTrailManager service.

		services.AddSingleton<INHAuditTrailManager, NHAuditTrailManager>();

3. In the configuration section, configure the manager to include the target class to audit as follows.

		ServiceLocator.SetLocatorProvider(app.ApplicationServices);

        var manager = app.ApplicationServices.GetService(typeof(INHAuditTrailManager)) as INHAuditTrailManager;
        var type = typeof(DBSessionManager);
        var auditableTypes = type.Assembly
            .GetTypes()
            .Where(t => t.GetInterfaces().Contains(typeof(IAuditable)))
            .ToList();
        manager.Enable(auditableTypes, () => new AuditContext
        {
            Username = "Public User"
        });

    The manager will track changes by the username. Leave it unchanged if your app has no users, or retrieve the value from your authentication system.

4. Now you need to configure the **AuditTrail Manager** to track the properties you want. The model is as follows: 

   1. **AuditEntityConfiguration** represents the Auditable types you have configured in the previous step. 
   2. **AuditPropertyConfiguration** represents the persisted properties of the auditable types.
   3.  Select which properties you want to Audit Trail. Change the value of the IsAuditable property to true.

    Remeber to save the changes.
   
   On Application Startup, the manager populates the database with a AuditEntityConfiguration instance for each auditable type.

5. In your DBSessionManager you need to register listeners for the Save/Delete events. Every time a save or delete happens, NHibernate raises an event. This event is caught by the AuditTrailManager. The manager handles the chagnes of the items. For each auditable property the manager checks if has changes and logs all the information needed.

6. The Audit trail Manager logs the changes in the AuditLogEntries table in the database.
