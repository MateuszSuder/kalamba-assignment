export default function dateParser(date: Date): string{
	const dateObject = new Date(date);  // 2009-11-10
	return dateObject.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}