import Handlebars from "handlebars";

const main = () => {
  const queryRaw = `{
    tokenContract(id: "{{tokenAddress}}") {
      id
    }
  }`;
  console.log("queryRaw", queryRaw);

  const queryParams = { tokenAddress: "0x42" };
  console.log("queryParams", queryParams);

  const template = Handlebars.compile(queryRaw);
  const query = template(queryParams);

  console.log("query", query);
};

main();
