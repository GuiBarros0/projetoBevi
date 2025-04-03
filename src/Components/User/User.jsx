import React from 'react';
import UserHeader from './UserHeader';
import { Route, Routes } from 'react-router-dom';
import UserProductPost from './UserProductPost';
import UserEditProducts from './UserEditProducts';
import Feed from '../Products/Feed';
import NotFound from '../NotFound';

const User = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <UserHeader />
      <div className="mt-8">
        <Routes>
          <Route
            index
            element={
              <>
                <div className="w-full mt-8">
                  <Feed />
                </div>
              </>
            }
          />
          <Route path="post" element={<UserProductPost />} />
          <Route path="edit" element={<UserEditProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default User;
