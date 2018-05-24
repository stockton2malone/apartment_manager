module.exports = {
    getTicket: (req, res, next) => {
        let dbInstance = req.app.get('db');

        dbInstance.readTicket( [req.params.id] )
            .then(ticket => {
                res.status(200).send(ticket);
            });
    },
    createTicket: (req, res, next) => {
        let dbInstance = req.app.get('db');
        const created_by_id = req.session.passport.user.id;
        //might need to be req.session.passport.user.user_id above
        const creation_date = new Date();
        const ticket_status = 'New';
        const assigned_status = false;
        const assigned_date = null;
        const worker_id = null;
        const completion_date = null;
        const { 
                complex_id, 
                issue_type, 
                issue_description, 
                urgency_level, 
                permission_enter, 
                permission_notifications,
                unit_number
            } = req.body;

        dbInstance.createTicket([ 
            created_by_id,
            complex_id,
            creation_date,
            issue_type,
            issue_description,
            urgency_level,
            permission_enter,
            permission_notifications,
            assigned_status,
            assigned_date,
            worker_id,
            ticket_status,
            completion_date,
            unit_number
        ])
            .then(ticket => {
                res.status(200).send(ticket);
            })
    },
    updateTicket: (req, res, next) => {
        let dbInstance = req.app.get('db');

        const { 
            complex_id, 
            issue_type, 
            issue_description, 
            urgency_level, 
            permission_enter, 
            permission_notifications,
            assigned_status,
            assigned_date,
            worker_id,
            ticket_status,
            completion_date,
            unit_number
        } = req.body;

        dbInstance.updateTicket([
            req.params.id,
            complex_id,
            issue_type,
            issue_description,
            urgency_level,
            permission_enter,
            permission_notifications,
            assigned_status,
            assigned_date,
            worker_id,
            ticket_status,
            completion_date,
            unit_number
        ])
            .then(ticket => {
                res.status(200).send(ticket);
            }); 
    },
    deleteTicket: (req, res, next) => {
        let dbInstance = req.app.get('db');

        dbInstance.deleteTicket( [ req.params.id ] )
            .then( () => {
                res.status(200);
            });
    },
    getOwnerTickets: (req, res, next) => {
        let dbInstance = req.app.get('db');

        dbInstance.readOwnerTickets( [ req.session.passport.user.id] )
            .then( ownerTickets => {
                res.status(200).send(ownerTickets);
            });
    },
    getMaintenanceTickets: (req, res, next) => {
        let dbInstance = req.app.get('db');
        dbInstance.readMaintenanceTickets( [ req.session.passport.user.id ] )
            //might need to be req.session.passport.user.user_id above
            .then( maintenanceTickets => {
                res.status(200).send(maintenanceTickets);
            });
    },
    getTenantTickets: (req, res, next) => {
        let dbInstance = req.app.get('db');

        dbInstance.readTenantTickets( [ req.session.passport.user.id ] )
            //might need to be req.session.passport.user.user_id above
            .then( tenantTickets => {
                res.status(200).send(tenantTickets);
            });
    }
}