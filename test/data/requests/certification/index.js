/**
 *
 * @type {string}
 */
export const movieQuery = `
{
  certifications(format: "movie") {
    AU {
      certification
      meaning
      order
    }
    BR {
      certification
      meaning
      order
    }
    CA {
      certification
      meaning
      order
    }
    DE {
      certification
      meaning
      order
    }
    FR {
      certification
      meaning
      order
    }
    GB {
      certification
      meaning
      order
    }
    KR {
      certification
      meaning
      order
    }
    RU {
      certification
      meaning
      order
    }
    TH {
      certification
      meaning
      order
    }
    US {
      certification
      meaning
      order
    }
    NZ {
      certification
      meaning
      order
    }
    IN {
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
    AU {
      certification
      meaning
      order
    }
    BR {
      certification
      meaning
      order
    }
    CA {
      certification
      meaning
      order
    }
    DE {
      certification
      meaning
      order
    }
    FR {
      certification
      meaning
      order
    }
    GB {
      certification
      meaning
      order
    }
    KR {
      certification
      meaning
      order
    }
    RU {
      certification
      meaning
      order
    }
    TH {
      certification
      meaning
      order
    }
    US {
      certification
      meaning
      order
    }
    NZ {
      certification
      meaning
      order
    }
    IN {
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
      AU {
        certification
        meaning
        order
      }
      BR {
        certification
        meaning
        order
      }
      CA {
        certification
        meaning
        order
      }
      DE {
        certification
        meaning
        order
      }
      FR {
        certification
        meaning
        order
      }
      GB {
        certification
        meaning
        order
      }
      KR {
        certification
        meaning
        order
      }
      RU {
        certification
        meaning
        order
      }
      TH {
        certification
        meaning
        order
      }
      US {
        certification
        meaning
        order
      }
      NZ {
        certification
        meaning
        order
      }
      IN {
        certification
        meaning
        order
      }
    }
  }
`;
