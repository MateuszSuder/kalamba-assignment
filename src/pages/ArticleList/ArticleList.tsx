import {ArticleList as ArticleListType} from "../../types/ArticleList";
import {useEffect, useState} from "react";
import articleList from "../../services/getArticleList";
import ArticleListPreview from "../../components/ArticleList/ArticleListPreview";

export default function ArticleList() {
  const [articles, setArticles] = useState<ArticleListType>();

  useEffect(() => {
    articleList()
      .then(data => {
        setArticles(data)
      })
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {
                articles && articles.articles.map(({author, title, description, slug, createdAt, favoritesCount}, id) => (
                  <ArticleListPreview
                    author={author}
                    title={title}
                    createdAt={createdAt}
                    slug={slug}
                    favoritesCount={favoritesCount}
                    description={description}
                    key={title + id}
                  />
                ))
              }
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
