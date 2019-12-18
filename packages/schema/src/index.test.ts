import { GraphQLSchema, buildSchema } from "graphql";
import schemaLang from ".";

describe("schema", () => {
  describe("WHEN the schema language is turned into a schema object", () => {
    it("THEN it should be an instance of a GraphQLSchema", () => {
      expect(buildSchema(schemaLang)).toBeInstanceOf(GraphQLSchema);
    });
  });
});
