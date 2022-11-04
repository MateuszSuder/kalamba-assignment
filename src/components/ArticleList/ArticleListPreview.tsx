import React from 'react';
import {Article} from "../../types/ArticleType";
import dateParser from "../../utils/dateParser";

type ArticleListPreviewType = Pick<Article, "author" | "createdAt" | "favoritesCount" | "slug" | "title" | "description">;

const ArticleListPreview = ({ author, title, description, slug, createdAt, favoritesCount }: ArticleListPreviewType) => {
	return (
		<div className="article-preview">
			<div className="article-meta">
				<a href={`/#/profile/${author.username}`}>
					<img src={ author.image || "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg" } />
				</a>
				<div className="info">
					<a href={`/#/profile/${ author.username }`} className="author">
						{ author.username }
					</a>
					<span className="date">{ dateParser(createdAt) }</span>
				</div>
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