import AdminAlertItem from './adminAlertItem'

const AdminAlerts = ({ alerts }) => {

    if (alerts === null || alerts.length === 0) {
        return <div className='container'>

            <h2>No alerts to display</h2>

        </div>
    } else return <div>

        <h2>Here are the alerts for you! <i className='fas fa-tool'></i></h2>

        <div className='cards'>
            {alerts.map(alert => <AdminAlertItem alert={alert} key={alert._id} />)}
        </div>
        
    </div>
}

export default AdminAlerts