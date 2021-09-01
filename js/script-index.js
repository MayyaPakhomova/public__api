function pageNumber() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  return page ? page : 1;
}

function loadPage(num) {
  fetch(`https://gorest.co.in/public-api/posts?page=${num}`)
    .then((response) => response.json())
    .then((data) => renderPage(data));
}

loadPage(pageNumber());

function renderPage(data) {
  const listGroup = document.getElementById('list-group');
  for (const elem of data.data) {
    const linkTitle = document.createElement('a');
    linkTitle.setAttribute('href', 'post.html?id=' + elem.id);
    linkTitle.innerText = elem.title;
    linkTitle.classList.add(
      'list-group-item',
      'list-group-item-action',
      'list-group-item-dark',
      'link-secondary'
    );
    listGroup.append(linkTitle);
  }

  const paginationList = document.getElementById('pagination-list');
  for (let allPages = 1; allPages <= data.data.length; allPages++) {
    const itemListPageNumber = document.createElement('li');
    const linkPageNumber = document.createElement('a');
    linkPageNumber.href = '?page=' + allPages;
    linkPageNumber.innerText = allPages;
    itemListPageNumber.classList.add('page-item', 'p-1');
    itemListPageNumber.style.cursor = 'pointer';
    linkPageNumber.classList.add(
      'page-link',
      'link-secondary',
      'list-group-item-action',
      'list-group-item-dark'
    );
    paginationList.append(itemListPageNumber);
    itemListPageNumber.append(linkPageNumber);
  }
}
