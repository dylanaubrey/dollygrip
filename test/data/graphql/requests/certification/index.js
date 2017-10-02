/**
 *
 * @type {string}
 */
export const movieQueryOne = `
  {
    certifications(format: "movie") {
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
    certifications(format: "movie") {
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
    certifications(format: "movie") {
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
    certifications(format: "tv") {
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
  query ($format: String) {
    certifications(format: $format) {
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
