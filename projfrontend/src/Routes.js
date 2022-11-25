import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashboard from './user/UserDashBoard';
import AdminDashboard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import { updateProduct } from './admin/helper/adminapicall';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';
import PageNotFound from './core/PageNotFound';
import UpdateCategory from './admin/UpdateCategory';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/cart' exact component={Cart} />

        <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute
          path='/admin/create/category'
          exact
          component={AddCategory}
        />
        <AdminRoute
          path='/admin/categories'
          exact
          component={ManageCategories}
        />
        <AdminRoute path='/admin/create/product' exact component={AddProduct} />
        <AdminRoute path='/admin/products' exact component={ManageProducts} />
        <AdminRoute
          path='/admin/product/update/:productId'
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path='/admin/category/update/:categoryId'
          exact
          component={UpdateCategory}
        />
        <Route path='*' exact component={PageNotFound} />
      </Switch>
    </Router>
  );
}
