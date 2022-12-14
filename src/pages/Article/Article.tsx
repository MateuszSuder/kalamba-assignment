import {useHistory, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Article as ArticleType} from "../../types/ArticleType";
import UserAvatarLink from "../../components/UserAvatarLink";
import UserLink from "../../components/UserLink";
import FavoriteButton from "../../components/FavoriteButton";
import ReactMarkdown from 'react-markdown'
import FollowButton from "../../components/FollowButton";
import useAuth from "../../context/AuthContext";

const Article: React.FunctionComponent = () => {
  const [article, setArticle] = useState<ArticleType>();
  const { slug } = useParams<{ slug?: string }>();
  const history = useHistory();
  const { fetcher } = useAuth();

  useEffect(() => {
    fetcher<{ article: ArticleType }>(`articles/${slug}`, "GET")
      .then(data => setArticle(data.article))
      .catch(() => history.push("/"))
  }, [slug])

  return (
    <>
      {
        article &&
          <div className="article-page">
            <div className="banner">
              <div className="container">
                <h1>{ article.title }</h1>
  
                <div className="article-meta">
                  <UserAvatarLink  image={article.author.image} username={article.author.username || ""} />
                  <UserLink username={article.author.username} date={article.createdAt} />
                  <FollowButton username={article.author.username} following={article.author.following} />
                  &nbsp;&nbsp;
                  <FavoriteButton favoritesCount={article.favoritesCount} favorited={article.favorited} slug={article.slug} />
                </div>
              </div>
            </div>
  
            <div className="container page">
              <div className="row article-content">
                <div className="col-md-12">
                  <ReactMarkdown>
                    {article.body}
                  </ReactMarkdown>
                </div>
              </div>
  
              <hr />
  
              <div className="article-actions">
                <div className="article-meta">
                  <UserAvatarLink  image={article.author.image} username={article.author.username || ""} />
                  <UserLink username={article.author.username || ""} date={article.createdAt} />
                  <FollowButton username={article.author.username} following={article.author.following} />
                  &nbsp;
                  <FavoriteButton favoritesCount={article.favoritesCount} favorited={article.favorited} slug={article.slug} />
                </div>
              </div>
  
              {/* Comments */}
  
              <div className="row">
                <div className="col-xs-12 col-md-8 offset-md-2">
                  <form className="card comment-form">
                    <div className="card-block">
                      <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                    </div>
                    <div className="card-footer">
                      <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                      <button className="btn btn-sm btn-primary">Post Comment</button>
                    </div>
                  </form>
  
                  <div className="card">
                    <div className="card-block">
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div className="card-footer">
                      <a href="/#/profile/jacobschmidt" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                      </a>
                      &nbsp;
                      <a href="/#/profile/jacobschmidt" className="comment-author">
                        Jacob Schmidt
                      </a>
                      <span className="date-posted">Dec 29th</span>
                    </div>
                  </div>
  
                  <div className="card">
                    <div className="card-block">
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div className="card-footer">
                      <a href="/#/profile/jacobschmidt" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                      </a>
                      &nbsp;
                      <a href="/#/profile/jacobschmidt" className="comment-author">
                        Jacob Schmidt
                      </a>
                      <span className="date-posted">Dec 29th</span>
                      <span className="mod-options">
                      <i className="ion-edit" />
                      <i className="ion-trash-a" />
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default Article;
