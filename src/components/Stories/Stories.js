import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Stories = ({ category, stories, loadMoreStories }) => {
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

export default Stories;
