/**
 *
 * @type {string}
 */
export const movieQueryOne = `
  {
    certifications(media: "movie") {
      CA {
        certification
        meaning
        order
      }
      GB {
        certification
        meaning
        order
      }
      US {
        certification
        meaning
        order
      }
    }
  }
`;

/**
 *
 * @type {string}
 */
export const movieQueryTwo = `
  {
    certifications(media: "movie") {
      US {
        certification
        meaning
        order
      }
    }
  }
`;

/**
 *
 * @type {string}
 */
export const movieQueryThree = `
  {
    certifications(media: "movie") {
      US {
        certification
        meaning
        order
      }
      FR {
        certification
        meaning
        order
      }
    }
  }
`;

/**
 *
 * @type {string}
 */
export const tvQuery = `
  {
    certifications(media: "tv") {
      CA {
        certification
        meaning
        order
      }
      GB {
        certification
        meaning
        order
      }
      US {
        certification
        meaning
        order
      }
    }
  }
`;

/**
 *
 * @type {string}
 */
export const variableQuery = `
  query ($media: String) {
    certifications(media: $media) {
      CA {
        certification
        meaning
        order
      }
      GB {
        certification
        meaning
        order
      }
      US {
        certification
        meaning
        order
      }
    }
  }
`;
