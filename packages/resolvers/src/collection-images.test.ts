import { COLLECTION_PATH, ShortcutMethodNames } from "@dollygrip/rest-client";
import fetchMock from "fetch-mock";
import { Getta, ShortcutProperties } from "getta";
import collectionDetails from "./__tests__/data/collection/details.json";
import collectionImages from "./__tests__/data/collection/images.json";
import buildEndpoint from "./__tests__/helpers/build-endpoint";
import buildResolveInfoArg from "./__tests__/helpers/build-resolve-info-arg";
import createRestClient from "./__tests__/helpers/create-rest-client";
import resolveCollectionImages from "./collection-images";

describe("resolveCollectionImages >", () => {
  let restClient: Getta & ShortcutProperties<ShortcutMethodNames>;

  beforeAll(() => {
    fetchMock.get(buildEndpoint(COLLECTION_PATH, { id: "10", type: "images" }), collectionImages);
    restClient = createRestClient();
  });

  describe("GIVEN a query has specified backdrops >", () => {
    it("THEN the resolver should return the collection details and images", async () => {
      const resolveInfo = buildResolveInfoArg(
        `
          {
            collection(id: "10") {
              backdrops {
                filePath
              }
              id
              name
            }
          }
        `,
        ["collection", "backdrops"],
      );

      expect(
        await resolveCollectionImages(collectionDetails, undefined, { restClient }, resolveInfo),
      ).toMatchSnapshot();
    });
  });

  describe("GIVEN a query has specified posters >", () => {
    it("THEN the resolver should return the collection details and images", async () => {
      const resolveInfo = buildResolveInfoArg(
        `
          {
            collection(id: "10") {
              id
              name
              posters {
                filePath
              }
            }
          }
        `,
        ["collection", "posters"],
      );

      expect(
        await resolveCollectionImages(collectionDetails, undefined, { restClient }, resolveInfo),
      ).toMatchSnapshot();
    });
  });
});
