import BranchItem from '../branchItem'

const AdminBranches = ({ branches }) => {

    if (branches === null || branches.length === 0) {
        return <div className='container'>

            <h2>No branches to display</h2>

        </div>
    } else return <div>

        <h2>Here is the list of branches ! <i className='fas fa-tool'></i></h2>

        <div className='cards'>
            {branches.map(branch => <BranchItem branch={branch} key={branch._id} />)}
        </div>
        
    </div>
}

export default AdminBranches