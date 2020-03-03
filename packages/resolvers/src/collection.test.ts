import { COLLECTION_PATH, ShortcutMethodNames } from "@dollygrip/rest-client";
import fetchMock from "fetch-mock";
import { Getta, ShortcutProperties } from "getta";
import collectionDetails from "./__tests__/data/collection/details.json";
import collectionImages from "./__tests__/data/collection/images.json";
import collectionTranslations from "./__tests__/data/collection/translations.json";
import buildEndpoint from "./__tests__/helpers/build-endpoint";
import buildResolveInfoArg from "./__tests__/helpers/build-resolve-info-arg";
import createRestClient from "./__tests__/helpers/create-rest-client";
import resolveCollection from "./collection";

describe("resolveCollection", () => {
  let restClient: Getta & ShortcutProperties<ShortcutMethodNames>;

  beforeAll(() => {
    fetchMock.get(buildEndpoint(COLLECTION_PATH, { id: "10" }), collectionDetails);
  });

  afterAll(() => {
    fetchMock.restore();
  });

  describe("GIVEN a collection id", () => {
    beforeEach(() => {
      restClient = createRestClient();
    });

    it("THEN the resolver should return the collection details", async () => {
      const resolveInfo = buildResolveInfoArg(
        `
        {
          collection(id: "10") {
            id
            name
          }
        }
      `,
        "collection",
      );

      expect(await resolveCollection({}, { id: "10" }, { restClient }, resolveInfo)).toMatchSnapshot();
    });
  });
});
