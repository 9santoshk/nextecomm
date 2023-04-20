import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react'
import { Store } from '../utils/Store';
// import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';


export default function Layout({ title, children }) {
    const { status, data: session } = useSession();

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
      }, [cart.cartItems]);
    
    return (
        <>
            <Head>
                <title> {title ? title + ' - Color My Space' : 'Color My Space'} </title>
                <meta name="description" conten="ecommerce website" />
                <link rel="icon" href='/favicon.ico' />
            </Head>
            <ToastContainer position="bottom-center" limit={1} />
            <div className="flex min-h-screen flex-col justify-between ">
                <header>
                    <nav className="flex h-12 items-center px-4 justify-between shadow-md">
                        <Link href="/" className="text-lg font-bold">
                            Colour My Space
                        </Link>
                        <div>
                        <Link href="/cart" legacyBehavior={true} >
                        <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
                </Link>


                {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link href="/login" legacyBehavior={true}>
                  <a className="p-2">Login</a>
                </Link>
              )}
                                      </div>
                    </nav>
                </header>

                <main>
                    {children}
                </main>

                <footer className="flex h-10 justify-center items-center shadow-inner">
                    <p>Copyright © 2023 Colour My Space</p>

                </footer>
            </div>
        </>

    )
}