import React from 'react';
import dateParser from "../utils/dateParser";

const UserLink: React.FunctionComponent<{ username: string, date: Date }> = ({ username, date }) => {
	return (
		<div className="info">
			<a href={`/#/profile/${username}`} className="author">
				{ username }
			</a>
			<span className="date">{ dateParser(date) }</span>
		</div>
	);
};

export default UserLink;