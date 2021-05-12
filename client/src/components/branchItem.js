import { Fragment } from 'react'

const BranchItem = ({ branch }) => {
    return <Fragment>
        <div className='card'>

            <h3>{branch["Branch Name"]}, {branch["City"]}</h3>

            <p>{branch["Address"]}</p>

            <p>Branch Incharge: {branch["Branch Incharge"]}</p>
            
            <p>Mobile: {branch["Contact Number"]}</p>

        </div>
    </Fragment>
}

export default BranchItem