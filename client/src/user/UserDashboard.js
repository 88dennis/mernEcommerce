import React from 'react';
import LayoutComp from '../core/LayoutComp';
import {isAuthenticated} from '../authClient/authClient';
import { Link } from 'react-router-dom';
const UserDashboard = () => {

    //get the user to display in this component
    const {user: {_id, name, email, role}} = isAuthenticated();
    console.log(isAuthenticated())

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">
                    Actions
                </h4>
                <ul className="list-group">
                  <li className="list-group-item"><Link className="nav-link" to="/cart">My Cart</Link></li>
                  <li className="list-group-item"><Link className="nav-link" to="/profile/update">Update Profile</Link></li>

              </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div class="card mb-5">
            <h3 className='card-header'>Info</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
            </ul>

          </div>
        )
    }

    const purchaseHistory = () =>{
        return (
             
            <div className="card mb-5">
              <h4 className='card-header'>Purchase History</h4>
                <ul className="list-group">
                <li className="list-group-item">history</li>
                </ul>
            </div>
        )
    }

    return (
        <LayoutComp title="Dashboard" description={`Hi ${name}!`} className="container"> 
        {/* mb margin-bottom 5 */}
          <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-3 mb-5">
                {userLinks()}
              </div>
              <div className="col-xs-12 col-sm-12 col-md-9 mb-5">
                  {userInfo()}
                  {purchaseHistory()}
              </div>
          </div>
        </LayoutComp>
    )
}

export default UserDashboard
