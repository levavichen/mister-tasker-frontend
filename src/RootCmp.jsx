import React from 'react'
import { Routes, Route } from 'react-router'

import { TaskIndex } from './pages/TaskIndex.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { TaskDetails } from './cmps/TaskDetails'
import { UserDetails } from './pages/UserDetails'

import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <UserMsg />
            <AppHeader/>

            <main >
                <Routes>
                    <Route path="" element={<TaskIndex />} />
                    <Route path="" element={<TaskDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


