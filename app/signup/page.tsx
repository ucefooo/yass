'use client';

import { useEffect, useState, useTransition } from "react";
import { createClient } from '@supabase/supabase-js'

const supabase_url = 'https://fzqhueqhjhuhrixycabl.supabase.co'
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6cWh1ZXFoamh1aHJpeHljYWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5MjUxMDMsImV4cCI6MjAzMDUwMTEwM30.Yk1uOX5qwc1vL2K72ruVp-x0ncM2keGndxwMs2vgw4w'

const supabase = createClient(supabase_url, anon_key)

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, startTransition] = useTransition();
    const [login, setLogin] = useState(false);

    const HandleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('email:', email);
        console.log('password:', password);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          })
          console.log(data, error)
          
    };

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })
          console.log(data, error)
    }

    useEffect(() => {
        startTransition(async () => {
            const {data} = await supabase.auth.getUser();
            console.log(data);
            if (data.user)
                setLogin(true)
            else
                setLogin(false)
        })
    },[])


    return (
        <div>
            <h1>Sign Up</h1>
            {isPending ? <p>Loading...</p> : null}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={HandleEmail}/>
                <input type="text" placeholder="password" onChange={handlePassword}/>
                <button type="submit">Sign Up</button>

            </form>
                <button onClick={handleLogin}>Sign</button>
            {login ? <p>Logged in</p> : <p>Not logged in</p>}
        </div>
    );
};

export default Page;