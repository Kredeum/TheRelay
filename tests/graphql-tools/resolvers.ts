import _ from "underscore";

const posts = [
  { id: "1", authorId: "c", votes: 3 },
  { id: "2", authorId: "b", votes: 0 },
  { id: "3", authorId: "c", votes: 7 },
];
const authors = [{ id: "a" }, { id: "b" }, { id: "b" }];

const resolvers = {
  Query: {
    posts() {
      return posts;
    },
  },
  Author: {
    posts(author: { id: string }) {
      return _.filter(posts, { authorId: author.id });
    },
  },
  Post: {
    author(post: { id: string; authorId: string; votes: number }) {
      return [_.find(authors, { id: post.authorId })];
    },
  },
};

export default resolvers;
