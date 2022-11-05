import React from 'react';
import {Article} from "../../types/ArticleType";
import UserAvatarLink from "../UserAvatarLink";
import UserLink from "../UserLink";

type ArticleListPreviewType = Pick<Article, "author" | "createdAt" | "favoritesCount" | "slug" | "title" | "description">;

const ArticleListPreview = ({ author, title, description, slug, createdAt, favoritesCount }: ArticleListPreviewType) => {
	return (
		<div className="article-preview">
			<div className="article-meta">
				<UserAvatarLink  image={author.image} username={author.username} />
				<UserLink username={author.username} date={createdAt} />
				{ /* todo add favorite implementation */}
				<button className="btn btn-outline-primary btn-sm pull-xs-right">
					<i className="ion-heart" /> { favoritesCount }
				</button>
			</div>
			<a href={`/#/${ slug }`} className="preview-link">
				<h1>{ title }</h1>
				<p>{ description }</p>
				<span>Read more...</span>
			</a>
		</div>
	);
};

export default ArticleListPreview;