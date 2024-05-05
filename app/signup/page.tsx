'use client';

import { useState } from "react";
import { createClient } from '@supabase/supabase-js'

const supabase_url = 'https://rxhngregjdeukgydbwlt.supabase.co'
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4aG5ncmVnamRldWtneWRid2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0OTI3OTQsImV4cCI6MjAyMDA2ODc5NH0.pGuO8b1KZjHvTSkA3iAoQ_k5mkE5nX-x-m-unAT7cxw'

const supabase = createClient(supabase_url, anon_key)

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={HandleEmail}/>
                <input type="text" placeholder="password" onChange={handlePassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Page;