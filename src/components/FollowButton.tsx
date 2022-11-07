import React, {FunctionComponent, useEffect, useState} from "react";
import useAuth from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {Profile} from "../types/Profile";

/* todo add favorite logic */
const FollowButton: FunctionComponent<{ username: string, following: boolean, className?: string }> = ({ username, following, className = "" }) => {
	const [localFollow, setLocalFollow] = useState<boolean>(false);
	const { fetcher } = useAuth();
	const history = useHistory();

	useEffect(() => {
		setLocalFollow(following);
	}, [following])

	const followUser = () => {
		fetcher<{ profile: Profile }>(`/profiles/${username}/follow`, localFollow ? "DELETE" : "POST")
			.then(({ profile: { following }}) => setLocalFollow(following))
			.catch(() => history.push("/login"))
	}

	return (
		<button className={`btn btn-sm ${localFollow ? "btn-secondary" : "btn-outline-secondary"} ${className}`} onClick={followUser}>
			<i className="ion-plus-round" />
			&nbsp; {localFollow ? "Unfollow" : "Follow"} { username }
		</button>
	);
};

export default FollowButton;