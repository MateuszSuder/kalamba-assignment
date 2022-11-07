import React, {FunctionComponent, useEffect, useState} from "react";
import useAuth from "../context/AuthContext";
import {Article} from "../types/ArticleType";
import {useHistory} from "react-router-dom";

type FavoriteButtonProps = Pick<Article, "favoritesCount" | "favorited" | "slug"> & { wide?: boolean }

const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({ favoritesCount, slug, favorited, wide = true }) => {
	const [localFavorite, setLocalFavorite] = useState<boolean>(false);
	const [localFavoritesCount, setLocalFavoritesCount] = useState<number>(0);
	const { fetcher } = useAuth();
	const history = useHistory();

	useEffect(() => {
		setLocalFavorite(favorited);
		setLocalFavoritesCount(favoritesCount);
	}, [favoritesCount, favorited])

	const toggleFavorite = () => {
		fetcher<{article: Article}>(`/articles/${slug}/favorite`, localFavorite ? "DELETE" : "POST")
			.then(({ article: { favorited, favoritesCount } }) => {
				setLocalFavorite(favorited);
				setLocalFavoritesCount(favoritesCount);
			})
			.catch(() => history.push("/login"))
	}

	return (
		<>
			{wide ?
				<button className={`btn btn-sm ${localFavorite ? "btn-primary" : "btn-outline-primary"}`} onClick={toggleFavorite}>
					<i className="ion-heart" />
					&nbsp; {localFavorite ? "Unfavorite" : "Favorite"} Post <span className="counter">({localFavoritesCount})</span>
				</button>
				:
				<button className={`btn btn-sm pull-xs-right ${localFavorite ? "btn-primary" : "btn-outline-primary"}`} onClick={toggleFavorite}>
					<i className="ion-heart" /> { localFavoritesCount }
				</button>
			}
		</>

	);
};

export default FavoriteButton;