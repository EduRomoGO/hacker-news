import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HackerNews.css';
import anime from 'animejs/lib/anime.es.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import Landing from '../Landing/Landing.js';

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


  const renderItem = ({ id, title, url, score, by }) => {
    return <article className='b-stories__item' key={id}>
      <header className='b-stories__item-header'>
        <div className='b-stories__item-title'>{title}</div>
        <div className='b-stories__item-score'><div className='b-stories__item-score-value'>{score}</div></div>
      </header>
      <section>
        <div className='b-stories__item-url'>{url}</div>
      </section>
      <footer>
        <div className='b-stories__item-by'>{by}</div>
      </footer>
    </article>;
  };

  const renderList = (category, stories) => {
    const hasMore = (stories, category) => {
      if (stories[category].articleList.length === 0) {
        return true;
      } else {
        return stories[category].articleList.length < stories[category].idList.length;
      }
    }

    return <section className='b-stories'>
      <InfiniteScroll
        className='b-stories__infinite-scroll'
        dataLength={stories[category].articleList.length}
        next={() => loadMoreStories({ category, stories })}
        hasMore={hasMore(stories, category)}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        {stories[category].articleList.map(item => renderItem(item))}
      </InfiniteScroll>
    </section>
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
        {category ? renderList(category, stories) : <Landing onCategoryClick={handleCategoryClick}/>}
      </section>
    </section>
  </section>
};

export default HackerNews;
