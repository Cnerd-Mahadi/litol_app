export const contentfulUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/`;

export const subjectsQuery = `{ subjectCollection{ items{
        sys{ id }, name, image{ url }}}}`;

export const contentsQuery = (subjectId: string) =>
	`{contentCollection(where: { subjectRef: {	sys: {
        id: "${subjectId}"   }}}){ items{
            sys{ id}, title, image{ url }, subjectRef{ name, sys{id} }}}}`;

export const contentQuery = (contentId: string) =>
	`{content(id: "${contentId}"){
        sys{id, publishedAt}, title, image{url}, subjectRef{name, sys{id}}, authorRef{name, authorImage{url}}, details{json},usefulLinks{ json } }}`;

export const contentFeymanQuery = (contentId: string) =>
	`{content(id: "${contentId}"){
            sys{id}, title, image{url}, subjectRef{name, sys{id}}, authorRef{name} }}`;
