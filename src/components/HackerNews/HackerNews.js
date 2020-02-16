import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HackerNews.css';
import bestImg from '../../static/img/best.jpg';
import newImg from '../../static/img/new.jpg';
import topImg from '../../static/img/top.jpg';
import anime from 'animejs/lib/anime.es.js';


const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
// category : new top best
// const searchUrl = `${baseUrl}${category}stories`;


const appConfig = {
  paginationItems: 10,
};

const getMoreStories = ({ paginationItems, nextPage, category, state }) => {
  // nextPage * paginationItems
  return // list
};

const initialState = {
  stories: {
    top: {
      idList: [],
      articleList: [],
    },
    new: {
      idList: [],
      articleList: [],
    },
    best: {
      idList: [],
      articleList: [],
    },
  }
};



const HackerNews = () => {
  const [category, setCategory] = useState(undefined);
  useEffect(() => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      // axios.get('https://hacker-news.firebaseio.com/v0/')
      .then(({ data }) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${data[0]}.json?print=pretty`))
      // .then(({data}) => axios.get(`https://hacker-news.firebaseio.com/v0/${data[0]}`))
      .then(res => console.log(res))
    // .catch(err => { throw new Error(err)});

    anime({
      targets: '.b-landing',
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeInOutQuad',
    });

  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const renderLanding = () => {
    return <section className='b-landing'>
      <div className='b-landing__subwrapper'>
        <article onClick={() => handleCategoryClick('top')} className='b-landing__category b-landing__category-top'>
          <img className='b-landing__category-img' src={topImg} alt="top category img" />
          <div className='b-landing__category-title'>Top</div>
        </article>
        <article onClick={() => handleCategoryClick('new')} className='b-landing__category b-landing__category-new'>
          <img className='b-landing__category-img' src={newImg} alt="new category img" />
          <div className='b-landing__category-title'>New</div>
        </article>
        <article onClick={() => handleCategoryClick('best')} className='b-landing__category b-landing__category-best'>
          <img className='b-landing__category-img' src={bestImg} alt="Best category img" />
          <div className='b-landing__category-title'>Best</div>
        </article>
      </div>
    </section>
  };

  // const renderList = (category, state) =>

  return <section className='c-hacker-news'>
    <header className='c-hacker-news__header'>
      <h1>Hacker News</h1>
    </header>
    <section className='c-hacker-news__main'>
      <section className='c-hacker-news__browser'>
        {category ? '' : renderLanding()}
      </section>
    </section>
  </section>
};

export default HackerNews;
