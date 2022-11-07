const tokenAddress = "0x42";

const gql = (strings: TemplateStringsArray, tok: string) => {
  const str0 = strings[0];
  const str1 = strings[1];
  return `${str0}${tok}${str1}`;
};

const queryString = `{
  tokenContract(id: "\${tokenAddress}") {
    id
  }
}`;
console.log("queryString\n", queryString);

const queryGql = gql`{
  tokenContract(id: "${tokenAddress}") {
    id
  }
}`;
console.log("queryGql\n", queryGql);
