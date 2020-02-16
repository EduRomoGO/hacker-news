import React, { useEffect, useState } from 'react';
import axios from 'axios';


const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
// category : new top best
// const searchUrl = `${baseUrl}${category}stories`;


const appConfig = {
  paginationItems: 10,
};

const getMoreStories = ({paginationItems, nextPage, category, state}) => {
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
      .then(({data}) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${data[0]}.json?print=pretty`))
      // .then(({data}) => axios.get(`https://hacker-news.firebaseio.com/v0/${data[0]}`))
      .then(res => console.log(res))
      // .catch(err => { throw new Error(err)});
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const renderLanding = () => {
    return <section className='b-landing'>
      <div className='b-landing__subwrapper'>
        <article onClick={() => handleCategoryClick('top')} className='b-landing__category'>Top</article>
        <article onClick={() => handleCategoryClick('new')} className='b-landing__category'>New</article>
        <article onClick={() => handleCategoryClick('best')} className='b-landing__category'>Best</article>
      </div>
    </section>
  };

  // const renderList = (category, state) =>

  return <section className='c-hacker-news'>
    { category ? '' : renderLanding() }
  </section>
};

export default HackerNews;
