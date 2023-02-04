import React, { FC, useState, useEffect, useRef, FormEventHandler } from 'react';
import { useSession, getProviders, signOut, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';


const SignIn: FC = () => {

    const [providers,setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>,ClientSafeProvider>|null>()

    const { data: session, status } = useSession();

    useEffect(() => {
        const setTheProviders = async () => {
            const setupProviders = await getProviders();
            setProviders(setupProviders);
        };

        setTheProviders();
    },[]);

    const email = useRef<HTMLInputElement | null>(null)
    const password = useRef<HTMLInputElement | null>(null)

    const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        console.log("email",email.current?.value)
        console.log("email",password.current?.value)
        const res = await signIn('credentials', { 
            email: email?.current?.value,
            password: password?.current?.value,
            redirection: false
            })

        

    }

    if(status == 'loading') {
        return <h1>Loading ...</h1>
    }

    if(session) {
        // user is logged in
        <>
            Signed in as {session.user?.email }
            <button type="button" onClick={() => { signOut()}}>Sign Out</button>
        </>
    }

    return (

        <>
            Not Signed in but in the custom page!
            <br />
            <button type="button" onClick={() => { signIn()}}>Sign In!</button>

            <br />
            <br />
            <>
            Not signed in <br />
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" ref={email}/>
                <input type="password" name="password" id="password" ref={password} />
                <input type="submit" value="Login" />
            </form>
            </>
            
            
            
            { console.log(providers)}
            

            { providers?.google && (
                <>
                    <br />
                    <br />
                    <button type="button">
                        <a href={providers?.google.signinUrl ?? 'http://localhost:3000'}>
                            Sign In Using Google
                        </a>
                    </button>
                </>
            )}
        </>

    )
}

export default SignIn;