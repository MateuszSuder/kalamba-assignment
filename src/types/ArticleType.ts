export interface Article {
	author:         Author;
	body:           string;
	createdAt:      Date;
	description:    string;
	favorited:      boolean;
	favoritesCount: number;
	slug:           string;
	tagList:        string[];
	title:          string;
	updatedAt:      Date;
}

export interface Author {
	bio:       string;
	following: boolean;
	image:     string;
	username:  string;
}