
const addMetadata = async (json: string): Promise<string> => {
  console.log("addMetadata", json);

  const jsonWithMetadata = json;

  console.log("addMetadata", jsonWithMetadata);
  return jsonWithMetadata;
};

export { addMetadata };