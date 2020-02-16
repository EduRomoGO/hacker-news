import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HackerNews.css';
import bestImg from '../../static/img/best.jpg';
import newImg from '../../static/img/new.jpg';
import topImg from '../../static/img/top.jpg';
import anime from 'animejs/lib/anime.es.js';
import InfiniteScroll from 'react-infinite-scroll-component';

// const appConfig = {
//   paginationItems: 10,
// };
const getBaseUrl = () => 'https://hacker-news.firebaseio.com/v0/';
const getStoryUrl = ({ baseUrl, id }) => `${baseUrl}item/${id}.json?print=pretty`;

const loadNextStories = idList => {
  return Promise.all(idList.slice(0, 20).map(id => axios.get(getStoryUrl({ baseUrl: getBaseUrl(), id }))));
}

const getIdsList = (category, stories) => {
  const storiesIdsListUrl = `${getBaseUrl()}${category}stories.json?print=pretty`;

  if (stories[category].idList.length) {
    return Promise.resolve({ data: stories[category].idList });
  } else {
    return axios.get(storiesIdsListUrl);
  }
};


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

  }, []);


  const setStoriesInState = (stories, category) => {
    setStories(state => {
      return {
        ...state,
        [category]: {
          ...state[category],
          articleList: [...state[category].articleList, ...stories]
        }
      };
    });
  };

  const selectIdsToSearch = (idList, stories, category) => {
    const categoryStoriesIdList = stories[category].articleList.map(item => item.id);

    return idList.filter(id => !categoryStoriesIdList.includes(id));
  };

  const loadMoreStories = ({ nextPage, category, stories }) => {
    getIdsList(category, stories)
      .then(({ data: idList }) => selectIdsToSearch(idList, stories, category))
      .then(idList => loadNextStories(idList))
      .then(res => res.map(item => item.data))
      .then(stories => setStoriesInState(stories, category))
  };


  const renderList = (category, stories) => {
    return <section className='b-stories'>
      <InfiniteScroll
        dataLength={stories[category].articleList.length}
        next={() => loadMoreStories(category, stories)}
        hasMore={stories[category].articleList.length < stories[category].idList.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        {stories[category].articleList.map(item => <article className='b-stories__item' key={item.id}>{item.id}</article>)}
      </InfiniteScroll>
    </section>
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    loadMoreStories({ stories, category });
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

  return <section className='c-hacker-news'>
    <header className='c-hacker-news__header'>
      <h1>Hacker News</h1>
    </header>
    <section className='c-hacker-news__main'>
      <section className='c-hacker-news__browser'>
        {category ? renderList(category, stories) : renderLanding()}
      </section>
    </section>
  </section>
};

export default HackerNews;
