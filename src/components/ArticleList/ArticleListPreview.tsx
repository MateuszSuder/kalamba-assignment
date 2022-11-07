import React from 'react';
import {Article} from "../../types/ArticleType";
import UserAvatarLink from "../UserAvatarLink";
import UserLink from "../UserLink";
import FavoriteButton from "../FavoriteButton";

type ArticleListPreviewType = Pick<Article, "author" | "createdAt" | "favoritesCount" | "slug" | "title" | "description" | "favorited">;

const ArticleListPreview = ({ author, title, description, slug, createdAt, favoritesCount, favorited, wide = true }: ArticleListPreviewType & { wide?: boolean }) => {
	return (
		<div className="article-preview">
			<div className="article-meta">
				<UserAvatarLink  image={author.image} username={author.username} />
				<UserLink username={author.username} date={createdAt} />
				<FavoriteButton favoritesCount={favoritesCount} wide={wide} slug={slug} favorited={favorited} />
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