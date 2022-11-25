import React from 'react';
import Footer from './Footer';
import Menu from './Menu';

export default function Base({
  title = 'My Title',
  description = 'My Description',
  className = 'bg-dark text-white ',
  children,
}) {
  return (
    <div>
      <Menu />
      <div className='container-fluid'>
        <div className='jumbotron bg-dark text-white text-center'>
          <h2 className='display-4 '>{title}</h2>
          <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
