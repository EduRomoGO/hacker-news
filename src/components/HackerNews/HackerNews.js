import React, { useEffect, useState } from 'react';
import './HackerNews.css';
import anime from 'animejs/lib/anime.es.js';
import Landing from '../Landing/Landing.js';
import Stories from '../Stories/Stories.js';
import { loadMoreData } from '../../util/dataProvider.js';


const HackerNews = () => {
  const [stories, setStories] = useState({
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
  });
  const [category, setCategory] = useState(undefined);
  useEffect(() => {
    anime({
      targets: '.b-landing',
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeInOutQuad',
    });

  });

  const setCategoryData = (categoryData, category) => {
    setStories(state => ({...state, [category]: categoryData }));
  }

  const loadMoreStories = ({ category, stories }) => {
    loadMoreData(category, stories)
      .then((categoryData) => {
        setCategoryData(categoryData, category);
      })
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    loadMoreStories({ stories, category });
  };

  const onChangeCategoryClick = () => {
    setCategory(undefined);
  }

  return <section className='c-hacker-news'>
    <header className='c-hacker-news__header'>
      <h1>Hacker News</h1>
    </header>
    <section className='c-hacker-news__main'>
      <section className='c-hacker-news__browser'>
        {
          category
            ? <Stories onChangeCategoryClick={onChangeCategoryClick} category={category} stories={stories} loadMoreStories={loadMoreStories} />
            : <Landing onCategoryClick={handleCategoryClick} />
        }
      </section>
    </section>
  </section>
};

export default HackerNews;
