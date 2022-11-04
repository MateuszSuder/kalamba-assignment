import {ArticleList} from "../types/ArticleList";
import fetcher from "../utils/fetcher";

export default async function articleList(): Promise<ArticleList> {
	return await fetcher("articles", "GET");
}