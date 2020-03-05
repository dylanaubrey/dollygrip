import { importSchema } from "graphql-import";

export * from "./types";
export default importSchema(`${__dirname}/schema.graphql`);
