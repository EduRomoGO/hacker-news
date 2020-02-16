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
  useEffect(() => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    // axios.get('https://hacker-news.firebaseio.com/v0/')
      .then(({data}) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${data[0]}.json?print=pretty`))
      // .then(({data}) => axios.get(`https://hacker-news.firebaseio.com/v0/${data[0]}`))
      .then(res => console.log(res))
      // .catch(err => { throw new Error(err)});
  }, []);

  return <div>Hack</div>
};

export default HackerNews;
