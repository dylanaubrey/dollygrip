import { CERTIFICATIONS_PATH, ShortcutMethodNames } from "@dollygrip/rest-client";
import fetchMock from "fetch-mock";
import { Getta, ShortcutProperties } from "getta";
import movieCertifications from "./__tests__/data/certifications/movie.json";
import tvCertifications from "./__tests__/data/certifications/tv.json";
import buildEndpoint from "./__tests__/helpers/build-endpoint";
import createRestClient from "./__tests__/helpers/create-rest-client";
import resolveCertifications from "./certifications";
import { ScreenType } from "./types";

describe("resolveCertifications", () => {
  let restClient: Getta & ShortcutProperties<ShortcutMethodNames>;

  describe("GIVEN the screenType is 'MOVIE'", () => {
    beforeEach(() => {
      fetchMock.get(buildEndpoint(CERTIFICATIONS_PATH, { type: ScreenType.MOVIE }), movieCertifications);
      restClient = createRestClient();
    });

    it("THEN the resolver should return the movie certifications", async () => {
      expect(await resolveCertifications({}, { screenType: ScreenType.MOVIE }, { restClient })).toMatchSnapshot();
    });
  });

  describe("GIVEN the screenType is 'TV'", () => {
    beforeEach(() => {
      fetchMock.get(buildEndpoint(CERTIFICATIONS_PATH, { type: ScreenType.TV }), tvCertifications);
      restClient = createRestClient();
    });

    it("THEN the resolver should return the movie certifications", async () => {
      expect(await resolveCertifications({}, { screenType: ScreenType.TV }, { restClient })).toMatchSnapshot();
    });
  });
});
