export const requestUrl =
	"https://graphql.contentful.com/content/v1/spaces/7rnn7g1ycvnr/";

export const subjectsQuery = `{ subjectCollection{ items{
        sys{ id }, name, image{ url }}}}`;

export const contentsQuery = (subjectId) =>
	`{contentCollection(where: { subjectRef: {	sys: {
        id: "${subjectId}"   }}}){ items{
            sys{ id}, title, image{ url }, subjectRef{ name }}}}`;

export const contentQuery = (contentId) =>
	`{content(id: "${contentId}"){
        sys{id}, title, image{url}, subjectRef{name, sys{id}}, authorRef{name, authorImage{url}}, details{json},usefulLinks{ json } }}`;

export const contentFeymanQuery = (contentId) =>
	`{content(id: "${contentId}"){
            sys{id}, title, image{url}, subjectRef{name, sys{id}}, authorRef{name} }}`;
