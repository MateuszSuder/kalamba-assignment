import React, {FunctionComponent} from "react";

/* todo add favorite logic */
const FollowButton: FunctionComponent<{ username: string, className?: string }> = ({ username, className = "" }) => {
	return (
		<button className={`btn btn-sm btn-outline-secondary ${className}`}>
			<i className="ion-plus-round" />
			&nbsp; Follow { username }
		</button>
	);
};

export default FollowButton;