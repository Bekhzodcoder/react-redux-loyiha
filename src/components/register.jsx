import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../ui';
import { signUserFailure, signUserStart, signUserSuccess } from '../slice/auth';
import AuthService from '../service/auth';
import {ValidationError} from './index';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const {isLoading} = useSelector((state)=>state.auth);

    const registerHandler = async (e)=>{
        e.preventDefault();
        dispatch(signUserStart())
        const user = {username:name, email, password}
        try{
            const response = await AuthService.userRegister(user)
            dispatch(signUserSuccess(response.user))
        }catch(error){
            dispatch(signUserFailure(error.response.data.errors))
        }
    }

    return (
        <div className='text-center mt-5'>
            <main className="form-signin w-25 m-auto">
                <form>
                    <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                    <ValidationError />
                    <Input label="User name" state={name} setState={setName} type="text" />
                    <Input label="Email address" state={email} setState={setEmail} type="email" />
                    <Input label="Password" state={password} setState={setPassword} type="password" />

                    <button 
                        className="w-100 btn btn-lg btn-primary mt-2" 
                        type="submit"
                        disabled={isLoading}
                        onClick={registerHandler}>
                            {isLoading ? "Loading...":"Register"}
                        </button>
                   
                </form>
            </main>
        </div>
    );
}

export default Register;
