import React from 'react';

const UserAvatarLink: React.FunctionComponent<{ username: string, image: string | undefined }> = ({ username, image }) => {
	return (
		<a href={`/#/profile/${username}`}>
			<img src={ image || "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg" } alt="User avatar" />
		</a>
	);
};

export default UserAvatarLink;