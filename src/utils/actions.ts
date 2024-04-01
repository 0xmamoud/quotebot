import { JsonDB, Config } from "node-json-db";

const db = new JsonDB(new Config("myDataBase", true, false, "/"));

export const addCitation = async (interaction: string) =>
  db.push("/citations[]", interaction);

export const getCitation = async () => {
  try {
    const citations = await db.getData("/citations");
    const citation = citations[Math.floor(Math.random() * citations.length)];
    return citation;
  } catch (error) {
    console.error(error);
  }
  return "No citations found";
};

export const getAllCitations = async () => {
  const citations = await db.getData("/citations");
  return citations.join("\n");
};

export const removeCitation = async (interaction: string) => {
  const citations = await db.getData("/citations");
  const index = citations.indexOf(interaction);
  if (index === -1) return -1;
  await db.delete(`/citations[${index}]`);
};
