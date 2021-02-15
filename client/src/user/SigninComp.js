import React, {useState} from 'react'
import LayoutComp from '../core/LayoutComp';
import {API} from '../config';

const SigninComp = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password} = state;
     
    function handleChange(inputVal){
        return function(e) {
            setState({
                ...state,
                error: false,
                [inputVal] : e.target.value
    
            })
        }
    }

    const signup = async (user) => {
        await fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const clickSubmit = (e) =>{
        e.preventDefault();
        //signup({ name: name, email: email, password: password})
        signup({name, email, password});
    }
    // const handleChange = inputVal => e => {
    //     setState({
    //         ...state,
    //         error: false,
    //         [inputVal] : e.target.value
    //     })
    // }


    const signupForm = () => {
       return ( <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control"/>
            </div>
            <button type="submit" onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form> )
    }
    return (
        <LayoutComp title='Sign In' className="container col-md-8 offset-md-2" description='Sign in and get started' >
        {signupForm()}

        {/* test your onChange */}
        {JSON.stringify({...state})}
    </LayoutComp>
    )
}

export default SigninComp
