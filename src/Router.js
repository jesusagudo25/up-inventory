import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { DashboardLayout } from './layouts/dashboard/DashboardLayout'
import { Suppliers } from './pages/Suppliers'
import { Products } from './pages/Products'
import { Orders } from './pages/Orders'
import { Checkout } from './pages/Checkout'
import { Subsidiaries } from './pages/Subsidiaries'
import { Dashboard } from './pages/Dashboard'
import { Notfound } from './pages/Notfound'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardLayout />} >
                    <Route path="" element={<Navigate to="/app" />} />
                    <Route path="app" element={<Dashboard />} />
                    <Route path="suppliers" element={<Suppliers />} />
                    <Route path="suppliers/:id/products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="subsidiaries" element={<Subsidiaries />} />
                </Route>

                <Route path="*" element={<Notfound />} />
            </Routes>
        </BrowserRouter>
    );
}
