import React, {FunctionComponent} from "react";

/* todo add favorite logic */
const FavoriteButton: FunctionComponent<{ favoriteCount: number, onFavorite: () => void }> = ({ favoriteCount, onFavorite }) => {
	return (
		<button className="btn btn-sm btn-outline-primary">
			<i className="ion-heart" />
			&nbsp; Favorite Post <span className="counter">({favoriteCount})</span>
		</button>
	);
};

export default FavoriteButton;