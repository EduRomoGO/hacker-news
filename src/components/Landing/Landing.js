import React from 'react';
import bestImg from '../../static/img/best.jpg';
import newImg from '../../static/img/new.jpg';
import topImg from '../../static/img/top.jpg';
import './Landing.css';

const Landing = ({onCategoryClick}) => {
  return <section className='b-landing'>
    <div className='b-landing__subwrapper'>
      <article onClick={() => onCategoryClick('top')} className='b-landing__category b-landing__category-top'>
        <img className='b-landing__category-img' src={topImg} alt="top category img" />
        <div className='b-landing__category-title'>Top</div>
      </article>
      <article onClick={() => onCategoryClick('new')} className='b-landing__category b-landing__category-new'>
        <img className='b-landing__category-img' src={newImg} alt="new category img" />
        <div className='b-landing__category-title'>New</div>
      </article>
      <article onClick={() => onCategoryClick('best')} className='b-landing__category b-landing__category-best'>
        <img className='b-landing__category-img' src={bestImg} alt="Best category img" />
        <div className='b-landing__category-title'>Best</div>
      </article>
    </div>
  </section>
};

export default Landing;
