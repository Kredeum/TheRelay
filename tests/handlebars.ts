import Handlebars from "handlebars";

const main = () => {
  const queryRaw = `{
    tokenContract(id: "{{tokenAddress}}") {
      id
    }
  }`;
  console.log("queryRaw", queryRaw);

  const queryVariables = { tokenAddress: "0x42" };
  console.log("queryVariables", queryVariables);

  const template = Handlebars.compile(queryRaw);
  const query = template(queryVariables);

  console.log("query", query);
};

main();
