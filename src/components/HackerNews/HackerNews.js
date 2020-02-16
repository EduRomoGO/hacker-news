import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HackerNews.css';
import anime from 'animejs/lib/anime.es.js';
import Landing from '../Landing/Landing.js';
import Stories from '../Stories/Stories.js';

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
  const setIdListInState = (idList, category) => {
    setStories(state => {
      return {
        ...state,
        [category]: {
          ...state[category],
          idList: [...new Set(idList)],
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
      .then(({ data: idList }) => {
        setIdListInState(idList, category);
        return idList;
      })
      .then(idList => selectIdsToSearch(idList, stories, category))
      .then(idList => loadNextStories(idList))
      .then(res => res.map(item => item.data))
      .then(stories => setStoriesInState(stories, category))
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    loadMoreStories({ stories, category });
  };

  return <section className='c-hacker-news'>
    <header className='c-hacker-news__header'>
      <h1>Hacker News</h1>
    </header>
    <section className='c-hacker-news__main'>
      <section className='c-hacker-news__browser'>
        {category ? <Stories category={category} stories={stories} loadMoreStories={loadMoreStories} /> : <Landing onCategoryClick={handleCategoryClick}/>}
      </section>
    </section>
  </section>
};

export default HackerNews;
