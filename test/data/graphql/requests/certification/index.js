/**
 *
 * @type {string}
 */
export const movieQuery = `
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
