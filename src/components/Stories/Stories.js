import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Stories.css';
import Spinner from '../Spinner/Spinner.js';

const Stories = ({ category, stories, loadMoreStories }) => {
  const renderItem = ({ id, title, url, score, by }) => {
    return <article className='b-stories__item' key={id}>
      <header className='b-stories__item-header'>
        <div className='b-stories__item-title'>{title}</div>
        <div className='b-stories__item-score'><div className='b-stories__item-score-value'>{score}</div></div>
      </header>
      <section className='b-stories__item-content'>
        <div className='b-stories__item-url'>Source: <a href={url}>{url}</a></div>
      </section>
      <footer className='b-stories__item-footer'>
        <div className='b-stories__item-by'>By: {by}</div>
      </footer>
    </article>;
  };

  const hasMore = (stories, category) => {
    if (stories[category].articleList.length === 0) {
      return true;
    } else {
      return stories[category].articleList.length < stories[category].idList.length;
    }
  }

  const missingInfo = ({title, url, by, score}) => {
    return title && url && by && score;
  };

  return <section className='b-stories'>
    <InfiniteScroll
      className='b-stories__infinite-scroll'
      dataLength={stories[category].articleList.length}
      next={() => loadMoreStories({ category, stories })}
      hasMore={hasMore(stories, category)}
      loader={<Spinner />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }>
      {stories[category].articleList.filter(missingInfo).map(item => renderItem(item))}
    </InfiniteScroll>
  </section>
};

export default Stories;
