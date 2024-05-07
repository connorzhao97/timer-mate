const API_URI = process.env.API_URI || "http://localhost:5000/api/graphql";
export const gql = ([content]: TemplateStringsArray) => content;

export async function fetchGraphQL(
  query: string,
  variables?: Record<string, any>,
  cacheTag?: string
) {
  return fetch(API_URI, {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: { "Content-Type": "application/json" },
    next: { tags: cacheTag ? [cacheTag] : undefined },
  })
    .then((x) => x.json())
    .then(({ data, errors }) => {
      if (errors) {
        throw new Error(
          `GraphQL errors occurred:\n${errors
            .map((x: any) => x.message)
            .join("\n")}`
        );
      }
      return data;
    });
}
