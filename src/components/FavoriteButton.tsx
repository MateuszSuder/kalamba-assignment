import React, {FunctionComponent} from "react";

/* todo add favorite logic */
const FavoriteButton: FunctionComponent<{ favoriteCount: number, onFavorite: () => void, wide?: boolean }> = ({ favoriteCount, onFavorite, wide = true }) => {
	return (
		<>
			{wide ?
				<button className="btn btn-sm btn-outline-primary">
					<i className="ion-heart" />
					&nbsp; Favorite Post <span className="counter">({favoriteCount})</span>
				</button>
				:
				<button className="btn btn-outline-primary btn-sm pull-xs-right">
					<i className="ion-heart" /> { favoriteCount }
				</button>
			}
		</>

	);
};

export default FavoriteButton;