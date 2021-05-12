import { Fragment } from 'react'
import { connect } from 'react-redux'

import BranchItem from './branchItem'

const Branches = ({ branches, history }) => {
    return <div className='container'>

        {branches && branches.length !== 0 ?
            <Fragment>
                <h2>Here are the branches you could choose <i className='fas fa-smile'></i></h2>
                <div className='cards'>
                    {branches.map(branch => <BranchItem branch={branch} key={branch._id} />)}
                </div>
            </Fragment>
            :
            <Fragment>
                <p className='large center my-bottom-1'>Bad Bad Luck, No Donuts for you ! <i className='far fa-frown'></i></p>
                <p className='medium center'>Want to search another branch ? <button className='btn btn-large btn-dark' onClick={() => history.push('/dashboard')}>Click me</button></p>
            </Fragment>
        }

    </div>
}

const mapStateToProps = state => ({
    branches: state.branch.branches
})

export default connect(mapStateToProps)(Branches)