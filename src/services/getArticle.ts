import fetcher from "../utils/fetcher";
import {Article} from "../types/ArticleType";

export default async function getArticle(slug: string): Promise<{ article: Article }> {
	return await fetcher(`articles/${slug}`, "GET");
}