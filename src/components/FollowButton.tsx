import React, {FunctionComponent} from "react";

/* todo add favorite logic */
const FollowButton: FunctionComponent<{ username: string }> = ({ username }) => {
	return (
		<button className="btn btn-sm btn-outline-secondary">
			<i className="ion-plus-round" />
			&nbsp; Follow { username }
		</button>
	);
};

export default FollowButton;