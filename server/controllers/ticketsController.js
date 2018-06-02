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
        const worker_name = null;
        const completed_status = false;
        const { 
                complex_id, 
                issue_type, 
                issue_description, 
                urgency_level, 
                permission_enter, 
                permission_notifications,
                unit_number,
                tenant_disclaimer, 
                user_complex,
                owner_id
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
            unit_number,
            tenant_disclaimer, 
            worker_name,
            user_complex,
            owner_id,
            completed_status
        ])
            .then(ticket => {
                res.status(200).send(ticket);
            })
    },
    updateTicket: (req, res, next) => {
        let dbInstance = req.app.get('db');
        console.log(req.params.id)
        console.log(req.body)
        const assigned_date = new Date();
        let completedDate = null;
        let { 
            complex_id, 
            issue_type, 
            issue_description, 
            urgency_level, 
            permission_enter, 
            permission_notifications,
            assigned_status,
            assignedDate,
            worker_id,
            ticket_status,
            completion_date,
            unit_number,
            tenant_disclaimer,
            worker_name,
            completed_status
        } = req.body;
        console.log('this is completedDate: ', completedDate)
        console.log('this is completion_date: ', completion_date)
        console.log('this is completed_status: ', completed_status)
        if(completed_status){
            completedDate = new Date()
        }
        //console.log('this is completedDate: ', completedDate)
        completed_status && completion_date === null ? completion_date = completedDate : completion_date
        //console.log('this is my completion_date: ', completion_date)
        console.log('this is assigned_status: ', assigned_status)
        console.log('this is assignedDate: ', assignedDate)
        console.log('this is assigned_date: ', assigned_date)
       /*  if(assigned_status && assignedDate === null){
            assigned_date = new Date()
        } */
        assigned_status && assignedDate === null ? assignedDate = assigned_date : assignedDate
        console.log('this is my assigned_date: ', assignedDate)
        dbInstance.updateTicket([
            req.params.id,
            complex_id,
            issue_type,
            issue_description,
            urgency_level,
            permission_enter,
            permission_notifications,
            assigned_status,
            assignedDate,
            worker_id,
            ticket_status,
            completion_date,
            unit_number,
            tenant_disclaimer,
            worker_name,
            completed_status
        ])
            .then(ticket => {
                res.status(200).send(ticket);
            }); 
    },
    updateTicketStatus: (req, res, next) => {
        let dbInstance = req.app.get('db');
        
        const {
            ticket_status
        } = req.body;

        dbInstance.updateTicketStatus([
            req.params.id,
            ticket_status
        ])
            .then(ticket => {
                res.status(200).send(ticket);
            })
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

        dbInstance.readOwnerTickets( [ req.session.passport.user.complex] )
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