import React from 'react';
import LayoutComp from '../core/LayoutComp';
import {isAuthenticated} from '../authClient/authClient';
import { Link } from 'react-router-dom';
const AdminDashboard = () => {

    //get the user to display in this component
    const {user: {_id, name, email, role}} = isAuthenticated();
    console.log(isAuthenticated())

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">
                    Actions
                </h4>
                <ul className="list-group">
                  <li className="list-group-item"><Link className="nav-link" to="/create/category">Create Category</Link></li>
                  <li className="list-group-item"><Link className="nav-link" to="/create/product">Create Product</Link></li>

              </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div class="card mb-5">
            <h4 className='card-header'>Information</h4>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
            </ul>

          </div>
        )
    }

    

    return (
        <LayoutComp title="Admin Dashboard" description={`Hi ${name}!`} className="container"> 
        {/* mb margin-bottom 5 */}
          <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-3 mb-5">
                {adminLinks()}
              </div>
              <div className="col-xs-12 col-sm-12 col-md-9 mb-5">
                  {adminInfo()}
              </div>
          </div>
        </LayoutComp>
    )
}

export default AdminDashboard
