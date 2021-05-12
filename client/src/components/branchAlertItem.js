import moment from 'moment'

const BranchAlertItem = ({ alert }) => {

    //Format time using moment js library
    const time = moment(alert.date).format('MMMM Do YYYY, h:mm:ss a')

    return <div className='alert-card'>

        <strong>{alert.info.name} </strong>searched for donuts at: {time}<br />

        <strong>Mobile: </strong>{alert.info.mobile}<br />

        <strong>Email: </strong>{alert.info.email}<br />

    </div>
}

export default BranchAlertItem