import axios from 'axios';

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


const selectIdsToSearch = (idList, stories, category) => {
  const categoryStoriesIdList = stories[category].articleList.map(item => item.id);

  return idList.filter(id => !categoryStoriesIdList.includes(id));
};

export const loadMoreData = (category, stories) => {
  const categoryData = {};

  return getIdsList(category, stories)
    .then(({ data: idList }) => {
      categoryData.idList = idList;
      return idList;
    })
    .then(idList => selectIdsToSearch(idList, stories, category))
    .then(idList => loadNextStories(idList))
    .then(res => res.map(item => item.data))
    .then(stories => {
      categoryData.articleList = stories;

      return categoryData
    })
};
