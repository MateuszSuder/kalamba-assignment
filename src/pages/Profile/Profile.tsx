import {FunctionComponent, useEffect, useState} from "react";
import useAuth from "../../context/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import {Profile as ProfileType} from "../../types/Profile";
import FollowButton from "../../components/FollowButton";
import {Article} from "../../types/ArticleType";
import {ArticleList} from "../../types/ArticleList";
import ArticleListPreview from "../../components/ArticleList/ArticleListPreview";

const Profile: FunctionComponent = () => {
  const { fetcher } = useAuth();
  const { username } = useParams<Record<string, string>>();
  const history = useHistory();
  const [profile, setProfile] = useState<ProfileType>();
  const [articles, setArticles] = useState<Article[]>([]);


  useEffect(() => {
    if(username) {
      fetcher<{profile: ProfileType}>(`profiles/${username}`, "GET")
        .then(data => setProfile(data.profile))
        .catch(() => history.push("/"))

      fetcher<ArticleList>(`articles?author=${username}`, "GET")
        .then(data => setArticles(data.articles))
        .catch(() => history.push("/"))
    } else {
      history.push("/")
    }
  }, [username])

  return (
    <>
      {profile &&
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={profile.image || "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"} className="user-img"/>
                  <h4>{ profile.username }</h4>
                  <p>
                    { profile.bio }
                  </p>
                  <FollowButton username={profile.username} following={profile.following} className="action-btn" />
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <a className="nav-link active" href="">
                        My Articles
                      </a>
                    </li>
                  </ul>
                </div>
                {
                  articles.map(({author, title, description, slug, createdAt, favoritesCount, favorited}, id) => (
                    <ArticleListPreview
                      author={author}
                      title={title}
                      createdAt={createdAt}
                      slug={slug}
                      favoritesCount={favoritesCount}
                      description={description}
                      wide={false}
                      key={title + id}
                      favorited={favorited}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Profile;
