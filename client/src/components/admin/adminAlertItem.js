import moment from 'moment'

const AdminAlertItem = ({ alert }) => {

    //time formatting using moment js library
    const time = moment(alert.date).format('MMMM Do YYYY, h:mm:ss a')

    return <div className='alert-card'>

        {alert.msg}<br />

        <strong>Time: </strong>{time}

        {alert.branchids.length !== 0 && <p><strong>Mobile: </strong>{alert.info.mobile}</p>}

        {alert.branchids.length !== 0 && <p><strong>Email: </strong>{alert.info.email}</p>}
        
    </div>
}

export default AdminAlertItem